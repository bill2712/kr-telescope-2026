import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Coordinates, Language, Star } from '../types';
import { BRIGHT_STARS, CONSTELLATION_LINES, CONSTELLATION_ART } from '../utils/starData';
import { getLocalSiderealTime, raToDegrees, getSunPosition, getMoonPosition } from '../utils/astroUtils';
import { translations } from '../utils/i18n';

interface StarMapProps {
  location: Coordinates;
  date: Date;
  viewMode: 'stereo' | 'ortho';
  lang: Language;
  showArt: boolean;
  enableGyro: boolean;
  onStarClick?: (star: Star, x: number, y: number) => void;
}

const StarMap: React.FC<StarMapProps> = ({ location, date, viewMode, lang, showArt, enableGyro, onStarClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // Use refs for high-frequency interaction state to avoid re-renders
  const rotationRef = useRef<[number, number, number]>([0, -90, 0]);
  const scaleRef = useRef<number>(1);
  const transformRef = useRef<d3.ZoomTransform>(d3.zoomIdentity);
  
  // Keep track if we are currently interacting to prevent external updates from overriding user interaction
  const isInteractingRef = useRef<boolean>(false);

  const t = translations[lang];

  // Handle Resize
  useEffect(() => {
    if (!wrapperRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
            setWidth(entry.contentRect.width);
            setHeight(entry.contentRect.height);
        }
      }
    });
    resizeObserver.observe(wrapperRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Initialize Rotation based on Time/Location (only if not using gyro)
  useEffect(() => {
    if (!enableGyro && !isInteractingRef.current) {
      const lst = getLocalSiderealTime(date, location.longitude);
      // Align LST with Center. Lat determines tilt.
      rotationRef.current = [-lst, -location.latitude, 0];
      // Trigger a redraw
      draw();
    }
  }, [date, location, enableGyro]);

  // Handle Gyroscope
  useEffect(() => {
    if (!enableGyro) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const alpha = event.alpha || 0; 
      const beta = event.beta || 0;   
      // Update ref directly
      rotationRef.current = [-(alpha), -(beta - 90), 0];
      draw();
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [enableGyro]);

  // Data Preparation
  const { starFeatures, lineFeatures } = useMemo(() => {
      const sFeatures = BRIGHT_STARS.map(star => ({
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: [raToDegrees(star.ra), star.dec] },
        properties: star
      }));

      const getStar = (nameOrId: string) => BRIGHT_STARS.find(s => s.proper === nameOrId || s.id.toString() === nameOrId);
      const lFeatures = CONSTELLATION_LINES.map(line => {
        const s1 = getStar(line.source);
        const s2 = getStar(line.target);
        if (s1 && s2) {
            return {
            type: "Feature" as const,
            geometry: {
                type: "LineString" as const,
                coordinates: [[raToDegrees(s1.ra), s1.dec], [raToDegrees(s2.ra), s2.dec]]
            }
            };
        }
        return null;
      }).filter((f): f is NonNullable<typeof f> => f !== null);
      
      return { starFeatures: sFeatures, lineFeatures: lFeatures };
  }, []);

  // Compute Celestial Bodies (Sun, Moon) - recalculated on date change
  const { sunFeature, moonFeature } = useMemo(() => {
    const sunPos = getSunPosition(date);
    const moonPos = getMoonPosition(date);

    const sFeature = {
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: [raToDegrees(sunPos.ra), sunPos.dec] },
        properties: { type: 'sun', name: t.sun || 'Sun' }
    };

    const mFeature = {
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: [raToDegrees(moonPos.ra), moonPos.dec] },
        properties: { type: 'moon', name: t.moon || 'Moon' }
    };

    return { sunFeature: sFeature, moonFeature: mFeature };
  }, [date, t]);


  // Main Drawing Function
  const draw = () => {
      if (!svgRef.current || width === 0 || height === 0) return;
      const svg = d3.select(svgRef.current);

      const baseScale = Math.min(width, height) / 2;
      const currentScale = baseScale * scaleRef.current;
      const currentRotation = rotationRef.current; // Use ref value

      // Configure Projection
      let projection: d3.GeoProjection;
      if (viewMode === 'ortho') {
        projection = d3.geoOrthographic()
          .scale(currentScale)
          .translate([width / 2, height / 2])
          .clipAngle(90)
          .rotate(currentRotation);
      } else {
        projection = d3.geoStereographic()
          .scale(currentScale)
          .translate([width / 2, height / 2])
          .clipAngle(120) 
          .rotate(currentRotation);
      }

      const pathGenerator = d3.geoPath().projection(projection);

      // Point Radius Logic
      pathGenerator.pointRadius((d: any) => {
          if (d.properties && d.properties.type === 'sun') return 12;
          if (d.properties && d.properties.type === 'moon') return 8;

          if (d.properties && typeof d.properties.mag === 'number') {
               return Math.max(1.5, 4 - d.properties.mag);
          }
          return 2; 
      });

      // --- UPDATING DOM ---
      
      // Update Background
      svg.select<SVGPathElement>(".background-sphere")
         .attr("d", pathGenerator({type: "Sphere"} as any) || "");

      // Update Graticule
      svg.select<SVGPathElement>(".graticule")
         .attr("d", pathGenerator(d3.geoGraticule()() as any) || "");

      // Update Constellation Lines
      svg.select(".constellation-lines")
         .selectAll("path")
         .attr("d", pathGenerator as any);
         
      // Update Stars
      svg.select(".stars-group")
         .selectAll("path")
         .attr("d", pathGenerator as any)
         .style("display", (d: any) => {
             // Optimization: Hide stars that are null (clipped)
             // geoPath returns null string for clipped, but let's check projection
             // Actually d3.geoPath output is null if clipped? 
             // pathGenerator(d) returns null if clipped in some projections, '' in others.
             // Rely on d3 to handle 'd' attribute, but explicit display none can help hit testing?
             // for now rely on 'd'.
             // Note: d3 geoPath with projection clipAngle automatically handles clipping.
             return null;
         });

      // Update Celestial Bodies (Sun/Moon)
      // Check visibility by checking projection
      const sunCoords = projection(sunFeature.geometry.coordinates as [number, number]);
      svg.select(".sun-body")
         .datum(sunFeature)
         .attr("d", pathGenerator as any)
         .style("display", sunCoords ? "block" : "none");

      const moonCoords = projection(moonFeature.geometry.coordinates as [number, number]);
      svg.select(".moon-body")
         .datum(moonFeature)
         .attr("d", pathGenerator as any)
         .style("display", moonCoords ? "block" : "none");

      // Update Celestial Labels
      svg.select(".sun-label")
         .attr("x", sunCoords ? sunCoords[0] : 0)
         .attr("y", sunCoords ? sunCoords[1] + 20 : 0) // Offset below sun
         .text(t.sun || 'Sun')
         .style("display", sunCoords ? "block" : "none");

      svg.select(".moon-label")
         .attr("x", moonCoords ? moonCoords[0] : 0)
         .attr("y", moonCoords ? moonCoords[1] + 20 : 0) // Offset below moon
         .text(t.moon || 'Moon')
         .style("display", moonCoords ? "block" : "none");


      // Update Labels
      svg.select(".labels-group")
         .selectAll("text")
         .data(starFeatures.filter(d => d.properties.mag < 1.6)) // Re-bind data on draw? Or just update text.
         // Actually, if we just select existing texts, we need to update their content if lang changes.
         // But d3 data binding best practice is to handle enter/update. 
         // Since we nuked everything in effect, 'draw' function assumes structure is there.
         // Wait, the main useEffect nukes, so draw is called after nuke.
         // BUT, draw is also called on zoom/drag where we DO NOT nuke.  
         // So we should update text content here to be safe or rely on the nuke effect for lang change.
         // The user said it reverted to English. My previous edit removed the ternary for Chinese.
         // I will put it back in the ENTER selection in useEffect, and also here in update loop just in case interactions need it (though usually only position updates).
         .text((d: any) => lang === 'zh-HK' && d.properties.proper_zh ? d.properties.proper_zh : d.properties.proper)
         .attr("transform", (d: any) => {
             const coords = projection(d.geometry.coordinates as [number, number]);
             return coords ? `translate(${coords[0] + 8},${coords[1] + 4})` : null;
         })
         .style("display", (d: any) => {
             const coords = projection(d.geometry.coordinates as [number, number]);
             return coords ? "block" : "none";
         });

      // Update Art
      if (showArt) {
          const artGroup = svg.select(".art-group");
          
          // Update Paths (GeoJSON)
          artGroup.selectAll("path")
             .attr("d", pathGenerator as any);

          // Update Emojis (Legacy or Fallback)
          artGroup.selectAll(".art-emoji")
             .attr("display", "none") // Hide all first
             .each(function(d: any) {
                 const star = BRIGHT_STARS.find(s => s.con === d.con && (s.proper === 'Betelgeuse' || s.proper === 'Dubhe' || s.proper === 'Alioth' || s.proper === 'Rigel'));
                 if(star) {
                     const coords = projection([raToDegrees(star.ra), star.dec]);
                     if(coords) {
                         d3.select(this)
                           .attr("display", "block")
                           .attr("x", coords[0])
                           .attr("y", coords[1])
                           .attr("font-size", (100 * scaleRef.current) + "px");
                     }
                 } else {
                     // Try finding ANY star in con
                     const anyStar = BRIGHT_STARS.find(s => s.con === d.con);
                     if(anyStar) {
                        const coords = projection([raToDegrees(anyStar.ra), anyStar.dec]);
                        if(coords) {
                             d3.select(this)
                               .attr("display", "block")
                               .attr("x", coords[0])
                               .attr("y", coords[1])
                               .attr("font-size", (50 * scaleRef.current) + "px");
                        }
                     }
                 }
             });
      }

      // Update Compass - Make it always visible if zoomed quite a bit, and clearer
      if (scaleRef.current < 4) {
          const r = currentScale;
          const cx = width / 2;
          const cy = height / 2;
          const compass = svg.select(".compass").style("display", "block");
          
          compass.select("circle")
                 .attr("cx", cx)
                 .attr("cy", cy)
                 .attr("r", r);

          const directions = [
            { label: t.dirN, x: cx, y: cy - r - 25 },
            { label: t.dirS, x: cx, y: cy + r + 25 },
            { label: t.dirE, x: cx - r - 25, y: cy },
            { label: t.dirW, x: cx + r + 25, y: cy },
          ];
          
          compass.selectAll("text")
                 .data(directions)
                 .attr("x", d => d.x)
                 .attr("y", d => d.y)
                 .text(d => d.label);

      } else {
          svg.select(".compass").style("display", "none");
      }
  };


  // One-time Setup of interactions and static DOM structure
  useEffect(() => {
    if (!svgRef.current || width === 0 || height === 0) return;
    const svg = d3.select(svgRef.current);
    
    // Clear previous contents if any (simplest way to handle viewMode changes necessitating structure changes)
    svg.selectAll("*").remove();

    // --- SETUP STATIC LAYERS ---
    
    // 1. Definition
    const defs = svg.append("defs");
    const filter = defs.append("filter").attr("id", "glow");
    filter.append("feGaussianBlur").attr("stdDeviation", "2.5").attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Sun Glow
    const sunFilter = defs.append("filter").attr("id", "sun-glow");
    sunFilter.append("feGaussianBlur").attr("stdDeviation", "8").attr("result", "coloredBlur");
    const feMergeSun = sunFilter.append("feMerge");
    feMergeSun.append("feMergeNode").attr("in", "coloredBlur");
    feMergeSun.append("feMergeNode").attr("in", "SourceGraphic");


    // 2. Background
    svg.append("path")
       .attr("class", "background-sphere")
       .attr("fill", "#0b0d17")
       .attr("stroke", "#444")
       .attr("stroke-width", 1)
       .attr("cursor", enableGyro ? "default" : "grab");

    // 3. Graticule
    svg.append("path")
       .attr("class", "graticule")
       .attr("fill", "none")
       .attr("stroke", "#2d304a") 
       .attr("stroke-width", 0.5)
       .attr("opacity", 0.4);

    // 4. Constellation Lines
    svg.append("g")
        .attr("class", "constellation-lines")
        .selectAll("path")
        .data(lineFeatures)
        .enter()
        .append("path")
        .attr("stroke", "rgba(100, 200, 255, 0.3)") // Base color, updated in effect
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4,2")
        .attr("fill", "none")
        .attr("pointer-events", "none");

    // 5. Art Group
    const artGroup = svg.append("g").attr("class", "art-group");
    
    // Process Art Data
    if(showArt) {
        CONSTELLATION_ART.forEach(art => {
            if (art.geojson) {
                // If GeoJSON is provided, use geoPath
                artGroup.append("path")
                    .datum(art.geojson)
                    .attr("class", "art-path")
                    .attr("fill", "rgba(255, 255, 255, 0.05)")
                    .attr("stroke", "rgba(255, 255, 255, 0.1)")
                    .attr("stroke-width", 1)
                    .attr("pointer-events", "none");
            } else {
                 // Fallback to Emoji Text (Legacy) for now if no geojson
                 // We place it at the centroid or first star of constellation
                 const star = BRIGHT_STARS.find(s => s.con === art.con);
                 if(star) {
                     // We need to project it in the render loop or here?
                     // Here we're inside useEffect (setup), we need it in draw() or use data binding
                     // Data binding is better
                     artGroup.append("text")
                        .datum(art)
                        .attr("class", "art-emoji")
                        .text(art.con === 'Ori' ? '🏹' : (art.con === 'UMa' ? '🐻' : '✨'));
                 }
            }
        });
    }

    // 6. Stars
    const starsGroup = svg.append("g").attr("class", "stars-group");
    // ... existing stars code ... 
    starsGroup.selectAll("path")
      .data(starFeatures)
      .enter()
      .append("path")
      .attr("class", "star-point") 
      .attr("fill", (d) => {
         const colors = ["#ffffff", "#ffe87f", "#a0cfff"];
         return colors[d.properties.id % 3];
      })
      .attr("stroke", "none")
      .attr("filter", "url(#glow)")
      .attr("cursor", "pointer")
      .on("click", (event, d) => {
         event.stopPropagation();
         if (d.properties && onStarClick) {
             onStarClick(d.properties, event.clientX, event.clientY);
         }
      })
      .on("mouseover", function() {
          d3.select(this).attr("fill", "#ff8c00").attr("opacity", 1);
      })
      .on("mouseout", function(event, d) {
          const colors = ["#ffffff", "#ffe87f", "#a0cfff"];
          d3.select(this).attr("fill", colors[d.properties.id % 3]);
      });

    // 7. Celestial Bodies (Sun, Moon)
    // Sun
    svg.append("path")
       .attr("class", "sun-body")
       .attr("fill", "#FFD700")
       .attr("filter", "url(#sun-glow)")
       .attr("pointer-events", "none"); 
    
    svg.append("text")
        .attr("class", "sun-label")
        .attr("text-anchor", "middle")
        .attr("fill", "#FFD700")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .style("text-shadow", "0px 0px 4px #000"); // Shadow for visibility

    // Moon
    svg.append("path")
       .attr("class", "moon-body")
       .attr("fill", "#dcdcdc")
       .attr("filter", "url(#glow)")
       .attr("pointer-events", "none");

    svg.append("text")
        .attr("class", "moon-label")
        .attr("text-anchor", "middle")
        .attr("fill", "#dcdcdc")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .style("text-shadow", "0px 0px 4px #000");


    // 8. Labels
    const labelsGroup = svg.append("g").attr("class", "labels-group");
    labelsGroup.selectAll("text")
      .data(starFeatures.filter(d => d.properties.mag < 1.6)) 
      .enter()
      .append("text")
      .text((d) => lang === 'zh-HK' && d.properties.proper_zh ? d.properties.proper_zh : d.properties.proper) // Base text, updated in effect
      .attr("fill", "rgba(255,255,255,0.7)")
      .attr("font-size", "10px")
      .attr("font-weight", "500")
      .attr("font-family", "system-ui")
      .attr("pointer-events", "none");

    // 9. Compass
    const compass = svg.append("g").attr("class", "compass");
    compass.append("circle")
           .attr("fill", "none")
           .attr("stroke", "#ff8c00")
           .attr("stroke-width", 2) // Bolder circle
           .attr("opacity", 0.6);
           
     // Initial Directions Text Placeholders
    const directions = [
        { label: "N", x: 0, y: 0 },
        { label: "S", x: 0, y: 0 },
        { label: "E", x: 0, y: 0 },
        { label: "W", x: 0, y: 0 },
    ];
    compass.selectAll("text")
            .data(directions)
            .enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("fill", "#ff8c00")
            .attr("font-weight", "900") // Bolder text
            .attr("font-size", "16px"); // Larger text

    // --- INTERACTIONS ---
    
    // Zoom
    const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 10]) 
      .filter((event) => {
         // Allow wheel
         if (event.type === 'wheel') return true;
         // Allow multi-touch (pinch)
         // Note: d3-zoom internally checks checks touches length for pinch
         // But we want to BLOCK single touch drag (which corresponds to panning in d3-zoom)
         // d3-zoom treats single touch as drag-pan.
         // We want drag-pan to be handled by d3-drag (for rotation).
         // So we block single touch from d3-zoom.
         if (event.type === 'touchstart' && event.touches.length <= 1) return false;
         // Also block mousedown (mouse drag) from d3-zoom?
         // Yes, mouse drag should rotate, not pan x/y.
         if (event.type === 'mousedown') return false;
         
         return true;
      })
      .on("start", () => { isInteractingRef.current = true; })
      .on("zoom", (event) => {
          scaleRef.current = event.transform.k;
          transformRef.current = event.transform; // save for syncing?
          draw();
      })
      .on("end", () => { isInteractingRef.current = false; });
      
    
    svg.call(zoomBehavior as any)
       .on("dblclick.zoom", null); // Disable double click zoom

    // Manually handle Drag for Rotation (because d3.zoom handles pan as translation, but we want rotation)
    // We can use d3.drag for this.
    
    const dragBehavior = d3.drag<SVGSVGElement, unknown>()
      .on("start", () => { isInteractingRef.current = true; })
      .on("drag", (event) => {
        if (enableGyro) return;
        const k = 0.5 / scaleRef.current; 
        const [r0, r1, r2] = rotationRef.current;
        const newRot: [number, number, number] = [r0 + event.dx * k, r1 - event.dy * k, r2];
        rotationRef.current = newRot;
        draw();
      })
      .on("end", () => { isInteractingRef.current = false; });

    if (!enableGyro) {
        svg.call(dragBehavior);
    }
    
    // Initial Draw
    draw();

  }, [width, height, starFeatures, lineFeatures, showArt, viewMode, enableGyro, lang, t, sunFeature, moonFeature]); 

  // Update Draw function to render art-emoji correctly
  // Line 243 in original file
 

  // Secondary effect removed as the main effect now handles all prop changes by rebuilding/rebinding.
  // This ensures 'draw' in the event closures always has the fresh props.



  return (
    <div ref={wrapperRef} className="w-full h-full relative cursor-move overflow-hidden">
      <svg ref={svgRef} width={width} height={height} className="block w-full h-full touch-none" />
    </div>
  );
};

export default StarMap;