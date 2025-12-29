import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Coordinates, Language, Star } from '../types';
import { BRIGHT_STARS, CONSTELLATION_LINES, CONSTELLATION_ART } from '../utils/starData';
import { getLocalSiderealTime, raToDegrees } from '../utils/astroUtils';
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
  
  // User interaction states
  const [rotation, setRotation] = useState<[number, number, number]>([0, -90, 0]); 
  const [scaleK, setScaleK] = useState(1);
  const [gyroRotation, setGyroRotation] = useState<[number, number, number] | null>(null);

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

  // Update base rotation when time/location changes (if not manually interacting or using gyro)
  useEffect(() => {
    if (!enableGyro) {
      const lst = getLocalSiderealTime(date, location.longitude);
      // Align LST with Center. Lat determines tilt.
      setRotation([-lst, -location.latitude, 0]);
    }
  }, [date, location, enableGyro]);

  // Handle Gyroscope
  useEffect(() => {
    if (!enableGyro) {
      setGyroRotation(null);
      return;
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const alpha = event.alpha || 0; 
      const beta = event.beta || 0;   
      setGyroRotation([-(alpha), -(beta - 90), 0]);
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [enableGyro]);

  // Create GeoJson features once to avoid re-calculating on every render if data doesn't change
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


  useEffect(() => {
    if (!svgRef.current || width === 0 || height === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); 

    // Determine final rotation and projection
    const finalRotation = gyroRotation || rotation;

    const baseScale = Math.min(width, height) / 2;
    
    // Configure Projection
    let projection: d3.GeoProjection;
    if (viewMode === 'ortho') {
      projection = d3.geoOrthographic()
        .scale(baseScale * scaleK)
        .translate([width / 2, height / 2])
        .clipAngle(90)
        .rotate(finalRotation);
    } else {
      projection = d3.geoStereographic()
        .scale(baseScale * scaleK)
        .translate([width / 2, height / 2])
        .clipAngle(120) // Widen view for better usability
        .rotate(finalRotation);
    }

    const pathGenerator = d3.geoPath().projection(projection);

    // Set point radius explicitly based on magnitude property of the feature
    pathGenerator.pointRadius((d: any) => {
        // d is the feature. d.properties is our star data.
        if (d.properties && typeof d.properties.mag === 'number') {
             // Brighter stars (lower mag) -> larger radius
             // Mag -1.5 -> radius ~4
             // Mag 2.0 -> radius ~1.5
             return Math.max(1.5, 4 - d.properties.mag);
        }
        return 2; 
    });

    // Zoom Handling
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 10]) 
      .on("zoom", (event) => {
        setScaleK(event.transform.k);
      });
      
    svg.call(zoom as any)
       .on("mousedown.zoom", null) 
       .on("touchstart.zoom", null)
       .on("touchmove.zoom", null)
       .on("touchend.zoom", null);
       
    // Rotation Drag
    const drag = d3.drag<SVGSVGElement, unknown>()
      .on("drag", (event) => {
        if (enableGyro) return;
        const k = 0.5 / scaleK; 
        const [r0, r1, r2] = projection.rotate();
        const newRot: [number, number, number] = [r0 + event.dx * k, r1 - event.dy * k, r2];
        setRotation(newRot);
      });

    svg.call(drag);


    // --- RENDERING ---

    // 1. Background Sphere (Clickable area)
    svg.append("path")
      .datum({type: "Sphere"})
      .attr("d", pathGenerator)
      .attr("fill", "#0b0d17")
      .attr("stroke", "#444")
      .attr("stroke-width", 1)
      .attr("cursor", enableGyro ? "default" : "grab");

    // 2. Graticule
    const graticule = d3.geoGraticule();
    svg.append("path")
      .datum(graticule)
      .attr("d", pathGenerator)
      .attr("fill", "none")
      .attr("stroke", "#2d304a") 
      .attr("stroke-width", 0.5)
      .attr("opacity", 0.4);

    // 3. Constellation Lines
    svg.append("g")
        .selectAll("path")
        .data(lineFeatures)
        .enter()
        .append("path")
        .attr("d", pathGenerator as any)
        .attr("stroke", showArt ? "rgba(255, 160, 50, 0.4)" : "rgba(100, 200, 255, 0.3)")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4,2")
        .attr("fill", "none")
        .attr("pointer-events", "none");

    // 4. Constellation Art (Icons)
    if (showArt) {
        CONSTELLATION_ART.forEach(art => {
            const star = BRIGHT_STARS.find(s => s.con === art.con && (s.proper === 'Betelgeuse' || s.proper === 'Dubhe' || s.proper === 'Alioth' || s.proper === 'Rigel')); 
            // Simplified positioning: find a bright star in that constellation to anchor the art
            if(star) {
                const coords = projection([raToDegrees(star.ra), star.dec]);
                if (coords) {
                     svg.append("text")
                        .attr("x", coords[0])
                        .attr("y", coords[1])
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "central")
                        .attr("font-size", (100 * scaleK) + "px") // Scale art with zoom
                        .attr("opacity", 0.15)
                        .attr("pointer-events", "none")
                        .text(art.con === 'Ori' ? '🏹' : '🐻'); 
                }
            }
        });
    }

    // 5. Stars (Glow Effect Layer)
    // Add a glow filter definition
    const defs = svg.append("defs");
    const filter = defs.append("filter")
        .attr("id", "glow");
    filter.append("feGaussianBlur")
        .attr("stdDeviation", "2.5")
        .attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Draw Stars
    const starsGroup = svg.append("g");
    
    starsGroup.selectAll("path")
      .data(starFeatures)
      .enter()
      .append("path")
      .attr("d", pathGenerator as any)
      .attr("className", "star-point") 
      .attr("fill", (d) => {
         // Color hint based on index or type? For now just slight variations
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


    // 6. Labels
    starsGroup.selectAll("text")
      .data(starFeatures.filter(d => d.properties.mag < 1.6)) 
      .enter()
      .append("text")
      .attr("transform", (d) => {
        const coords = projection(d.geometry.coordinates as [number, number]);
        return coords ? `translate(${coords[0] + 8},${coords[1] + 4})` : null;
      })
      .text((d) => lang === 'zh-HK' && d.properties.proper_zh ? d.properties.proper_zh : d.properties.proper)
      .attr("fill", "rgba(255,255,255,0.7)")
      .attr("font-size", "10px")
      .attr("font-weight", "500")
      .attr("font-family", "system-ui")
      .style("display", (d) => {
        // Hide label if star is clipped (not projected)
        // d3.geoPath returns null for clipped features if configured, but here we check projection result manually for center
        const coords = projection(d.geometry.coordinates as [number, number]);
        return coords ? "block" : "none";
      })
      .attr("pointer-events", "none");

    // 7. Compass / Horizon only if zoomed out
    if (scaleK < 2.5) {
        const r = (baseScale * scaleK);
        const cx = width / 2;
        const cy = height / 2;
        const directions = [
            { label: t.dirN, x: cx, y: cy - r - 20 },
            { label: t.dirS, x: cx, y: cy + r + 20 },
            { label: t.dirE, x: cx - r - 20, y: cy }, 
            { label: t.dirW, x: cx + r + 20, y: cy },
        ];
        
        const compass = svg.append("g").attr("class", "compass");
        compass.selectAll("text")
               .data(directions)
               .enter()
               .append("text")
               .attr("x", d => d.x)
               .attr("y", d => d.y)
               .text(d => d.label)
               .attr("text-anchor", "middle")
               .attr("dominant-baseline", "middle")
               .attr("fill", "#ff8c00")
               .attr("font-weight", "bold")
               .attr("font-size", "12px");
               
        compass.append("circle")
               .attr("cx", cx)
               .attr("cy", cy)
               .attr("r", r)
               .attr("fill", "none")
               .attr("stroke", "#ff8c00")
               .attr("stroke-width", 1)
               .attr("stroke-dasharray", "4,4")
               .attr("opacity", 0.5);
    }

  }, [width, height, rotation, gyroRotation, scaleK, viewMode, showArt, enableGyro, lang, onStarClick, starFeatures, lineFeatures, t]);

  return (
    <div ref={wrapperRef} className="w-full h-full relative cursor-move overflow-hidden">
      <svg ref={svgRef} width={width} height={height} className="block w-full h-full touch-none" />
    </div>
  );
};

export default StarMap;