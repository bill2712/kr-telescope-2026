import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Coordinates, Language, Star } from '../types';
import { BRIGHT_STARS, CONSTELLATION_LINES, CONSTELLATION_ART } from '../utils/starData';
import { getLocalSiderealTime, raToDegrees, getSunPosition, getMoonPosition, getMarsPosition, getJupiterPosition } from '../utils/astroUtils';
import { translations } from '../utils/i18n';

interface StarMapProps {
  location: Coordinates;
  date: Date;
  viewMode: 'stereo' | 'ortho';
  lang: Language;
  showArt: boolean;
  enableGyro: boolean;
  onStarClick?: (star: Star, x: number, y: number) => void;
  // Scavenger Hunt
  targetBody?: string | null; // 'mars', 'jupiter', 'sun', 'moon', 'Sirius'...
  onTargetLock?: (locked: boolean) => void;
}

const StarMap: React.FC<StarMapProps> = ({ 
    location, date, viewMode, lang, showArt, enableGyro, onStarClick,
    targetBody, onTargetLock
}) => {
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
  const isLockedRef = useRef<boolean>(false); // Track lock state to prevent spamming callbacks

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

  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [debugInfo, setDebugInfo] = useState({ alpha: 0, beta: 0, gamma: 0 });

  // iOS 13+ Request Permission
  const requestAccess = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
          try {
              const permissionState = await (DeviceOrientationEvent as any).requestPermission();
              if (permissionState === 'granted') {
                  setIsPermissionGranted(true);
              } else {
                  alert('Gyroscope permission denied.');
              }
          } catch (e) {
              console.error(e);
              // Non-secure context or other error
              setIsPermissionGranted(true); // Fallback for non-iOS or dev env
          }
      } else {
          // Non-iOS 13+ devices don't need permission
          setIsPermissionGranted(true);
      }
  };

  // Auto-request or check on mount if gyro enabled? 
  // Browser requires user interaction for requestPermission. 
  // So we show a button if enableGyro is true but !isPermissionGranted.

  // Handle Gyroscope
  useEffect(() => {
    if (!enableGyro || !isPermissionGranted) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const alpha = event.alpha || 0; 
      const beta = event.beta || 0;
      const gamma = event.gamma || 0;
      
      setDebugInfo({ alpha: Math.round(alpha), beta: Math.round(beta), gamma: Math.round(gamma) });

      // Calculate Rotation
      // Simple logic: alpha varies 0-360 (compass heading)
      // beta varies -180 to 180 (front/back tilt)
      // We map this to projection rotation [lambda, phi, gamma]
      // Rotation order? d3.geoProjection.rotate([lambda, phi, gamma])
      // Typically:
      // lambda (yaw) = -alpha
      // phi (pitch) = -beta + 90 (horizon correction)
      // gamma (roll) = -gamma
      
      // Note: Device orientation reference frame may vary.
      // For now, use simple mapping:
      rotationRef.current = [-alpha, -(beta - 90), -gamma];
      draw();
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [enableGyro, isPermissionGranted]);

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

  // Compute Celestial Bodies (Sun, Moon, Planets) - recalculated on date change
  const { sunFeature, moonFeature, marsFeature, jupiterFeature } = useMemo(() => {
    const sunPos = getSunPosition(date);
    const moonPos = getMoonPosition(date);
    const marsPos = getMarsPosition(date);
    const jupiterPos = getJupiterPosition(date);

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

    const marsF = {
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: [raToDegrees(marsPos.ra), marsPos.dec] },
        properties: { type: 'mars', name: t.mars || 'Mars' }
    };

    const jupiterF = {
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: [raToDegrees(jupiterPos.ra), jupiterPos.dec] },
        properties: { type: 'jupiter', name: t.jupiter || 'Jupiter' }
    };

    return { sunFeature: sFeature, moonFeature: mFeature, marsFeature: marsF, jupiterFeature: jupiterF };
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
          if (d.properties && (d.properties.type === 'mars' || d.properties.type === 'jupiter')) return 6;

          if (d.properties && typeof d.properties.mag === 'number') {
               return Math.max(1.5, 4 - d.properties.mag);
          }
          return 2; 
      });

      // --- Scavenger Hunt Logic ---
      const updateScavengerState = () => {
          if (!targetBody) { 
              svg.select(".guidance-arrow").style("display", "none");
              svg.select(".target-reticle").style("display", "none");
              return; 
          }

          let targetCoords: [number, number] | null = null;
          let targetName = "";

          // Resolve Target
          if (targetBody === 'sun') targetCoords = sunFeature.geometry.coordinates as [number, number];
          else if (targetBody === 'moon') targetCoords = moonFeature.geometry.coordinates as [number, number];
          else if (targetBody === 'mars') targetCoords = marsFeature.geometry.coordinates as [number, number];
          else if (targetBody === 'jupiter') targetCoords = jupiterFeature.geometry.coordinates as [number, number];
          else {
              // Try finding star
              const star = BRIGHT_STARS.find(s => s.proper === targetBody);
              if (star) {
                  targetCoords = [raToDegrees(star.ra), star.dec];
                  targetName = star.proper;
              }
          }

          if (targetCoords) {
              const projected = projection(targetCoords);
              // projected is [x, y] or null (if clipped in ortho, or far away)
              // Note: Stereo might return coords even if "behind" but projected to infinity or large numbers?
              // d3.geoStereographic with clipAngle will return null if clipped.
              
              const cx = width / 2;
              const cy = height / 2;
              
              if (projected) {
                  const [x, y] = projected;
                  const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
                  const isVisible = x >= 0 && x <= width && y >= 0 && y <= height;

                  if (isVisible) {
                      // Target is ON SCREEN
                      svg.select(".guidance-arrow").style("display", "none");
                      
                      const reticle = svg.select(".target-reticle")
                         .style("display", "block")
                         .attr("transform", `translate(${x},${y})`);
                      
                      // Check Lock (near center)
                      if (dist < 50) { // 50px threshold
                          reticle.select("circle").attr("stroke", "#00ff00");
                          if (!isLockedRef.current && onTargetLock) {
                              isLockedRef.current = true;
                              onTargetLock(true);
                          }
                      } else {
                          reticle.select("circle").attr("stroke", "#ff0000");
                          if (isLockedRef.current && onTargetLock) {
                              isLockedRef.current = false;
                              onTargetLock(false);
                          }
                      }

                  } else {
                      // Projected but off-screen (e.g. just outside bounds)
                      // Show arrow
                      showArrow(x, y);
                  }
              } else {
                  // Clipped (Behind the earth/viewer)
                  // We need to find the "direction" to rotate towards.
                  // We can query the rotation and target geo coords.
                  // Or, use a second projection (Orthographic without clip) to get the "direction" even if behind?
                  // No, simpler: Calculate bearing from center [lambda0, phi0] to target [lambda1, phi1].
                  
                  // Get current center in Geo coords
                  const centerGeo = projection.invert ? projection.invert([cx, cy]) : null;
                  if (centerGeo) {
                      // Calculate bearing from centerGeo to targetCoords
                      // D3 doesn't have direct bearing, implement simple formula or use logic (delta lambda etc)
                      // Or simple heuristic:
                      // If we rotate "towards" it...
                      // Use d3.geoCircle to find the path?
                      
                      // Robust trick:
                      // Project with ClipAngle = 180 (Full Sphere) to get X,Y even if behind.
                      // Then normalize vector from center.
                      // NOTE: Stereo projects "behind" points to infinity. 
                      // Equirectangular might be better for direction finding?
                      // Let's rely on Azimuthal Equidistant centered on current rotation?
                      
                      // Let's try to just use the projected point if available (d3 often returns coordinates for slightly clipped points or we can unclip).
                      // But simpler:
                      // Just show "Turn Around" or calculate manually?
                      // I'll assume users will just drag around randomly if fully lost, but guidance is better.
                      // Let's look at the delta of rotation needed.
                      
                      // For now, if "Projected" is null, it means it's > 90/120 deg away.
                      // Display a generic "Search" arrow or calculate?
                      svg.select(".guidance-arrow").style("display", "none"); // Hide for now if totally lost to avoid confusing arrow
                      
                      // Better: Let's assume Scavenger Hunt uses Stereo mostly or provides arrows based on simple RA/Dec delta.
                      // if (targetCoords[0] > ...) like looking at a flat map.
                  }
              }

              // Helper to show arrow at screen edge
              function showArrow(tx: number, ty: number) {
                  const angle = Math.atan2(ty - cy, tx - cx);
                  const r = Math.min(width, height) / 2 - 40; // Arrow circle radius
                  const arrowX = cx + r * Math.cos(angle);
                  const arrowY = cy + r * Math.sin(angle);
                  
                  svg.select(".guidance-arrow")
                     .style("display", "block")
                     .attr("transform", `translate(${arrowX},${arrowY}) rotate(${angle * 180 / Math.PI + 90})`);
                  
                  if (isLockedRef.current && onTargetLock) {
                      isLockedRef.current = false;
                      onTargetLock(false);
                  }
              }
          }
      };


      // --- UPDATING DOM ---
      
      // ... existing updates ...
      
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
    <div id="starmap-container" ref={wrapperRef} className="w-full h-full relative cursor-move overflow-hidden">
      <svg ref={svgRef} width={width} height={height} className="block w-full h-full touch-none" />
      
      {/* Compass / Gyro UI Layer */}
      {enableGyro && (
          <div className="absolute inset-0 z-50 pointer-events-none flex flex-col items-center justify-center">
              {!isPermissionGranted ? (
                  <button 
                    onClick={() => requestAccess()} // Must be direct user action
                    className="pointer-events-auto bg-kidrise-orange text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg animate-bounce"
                  >
                      <i className="fas fa-compass mr-2"></i> {t.btnGyro} / Start Compass
                  </button>
              ) : (
                  <div className="absolute bottom-32 left-0 right-0 text-center opacity-50">
                      <p className="text-[10px] text-green-400 font-mono">
                          SENSOR: a:{debugInfo.alpha} b:{debugInfo.beta} g:{debugInfo.gamma}
                      </p>
                  </div>
              )}
          </div>
      )}
    </div>
  );
};

export default StarMap;