import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as d3Geo from 'd3-geo';
import { Coordinates, Language } from '../types';
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
}

const StarMap: React.FC<StarMapProps> = ({ location, date, viewMode, lang, showArt, enableGyro }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(600);
  
  // User interaction states
  const [rotation, setRotation] = useState<[number, number, number]>([0, -90, 0]); // Init default
  const [scaleK, setScaleK] = useState(1);
  const [gyroRotation, setGyroRotation] = useState<[number, number, number] | null>(null);

  const t = translations[lang];

  // Handle Resize
  useEffect(() => {
    if (!wrapperRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
        setHeight(entry.contentRect.height);
      }
    });
    resizeObserver.observe(wrapperRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Update base rotation when time/location changes (if not manually interacting or using gyro)
  useEffect(() => {
    if (!enableGyro) {
      const lst = getLocalSiderealTime(date, location.longitude);
      // Align LST with Center. 
      // Lat determines tilt.
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
      const alpha = event.alpha || 0; // Compass direction (0-360)
      const beta = event.beta || 0;   // Front-to-back tilt (-180 to 180)
      
      // Simple mapping for a kid's toy experience:
      // Alpha rotates the sky horizontally (Azimuth)
      // Beta rotates vertically (Altitude)
      // Note: This is a simplified approximation for "looking through the window"
      setGyroRotation([-(alpha), -(beta - 90), 0]);
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [enableGyro]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); 

    // Determine final rotation and projection
    const finalRotation = gyroRotation || rotation;

    let projection: d3Geo.GeoProjection;
    const baseScale = Math.min(width, height) / 2;
    
    if (viewMode === 'ortho') {
      projection = d3Geo.geoOrthographic()
        .scale(baseScale * scaleK)
        .translate([width / 2, height / 2])
        .clipAngle(90)
        .rotate(finalRotation);
    } else {
      projection = d3Geo.geoStereographic()
        .scale(baseScale * scaleK)
        .translate([width / 2, height / 2])
        .clipAngle(100)
        .rotate(finalRotation);
    }

    const path = d3Geo.geoPath().projection(projection);

    // Zoom/Pan Behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.8, 8]) // Zoom limits
      .on("zoom", (event) => {
        // Handle Scale
        setScaleK(event.transform.k);
        
        // Handle Pan (Drag) -> Rotate
        // If not gyro mode, allow dragging
        if (!enableGyro) {
            // We need to access the drag delta, but d3.zoom gives us a transform.
            // d3.zoom on sphere is tricky.
            // Simplified: use d3.drag for rotation, d3.zoom for scaling if possible, 
            // but standard d3.zoom handles both on a flat plane.
            // For sphere, we usually separate them or implement Euler rotation math.
            
            // Re-implement simpler Drag behavior for rotation, Zoom for scale
            // See the separate drag implementation below.
        }
      });
      
    // We attach zoom for the wheel/pinch event, but we manually handle drag for rotation
    // to keep the "Globe" feel.
    svg.call(zoom as any)
       .on("mousedown.zoom", null) // Disable default zoom drag (pan)
       .on("touchstart.zoom", null)
       .on("touchmove.zoom", null)
       .on("touchend.zoom", null);
       
    // Custom Drag for Rotation
    const drag = d3.drag<SVGSVGElement, unknown>()
      .on("drag", (event) => {
        if (enableGyro) return; // Disable drag if gyro is on
        const k = 0.5 / scaleK; // Slower rotation when zoomed in
        const [r0, r1, r2] = projection.rotate();
        const newRot: [number, number, number] = [r0 + event.dx * k, r1 - event.dy * k, r2];
        setRotation(newRot);
      });

    svg.call(drag);


    // --- RENDERING ---

    // 1. Background (Space)
    svg.append("path")
      .datum({type: "Sphere"})
      .attr("d", path)
      .attr("fill", "#0b0d17")
      .attr("stroke", "#444")
      .attr("stroke-width", 2);

    // 2. Graticule
    const graticule = d3Geo.geoGraticule();
    svg.append("path")
      .datum(graticule)
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "#1c1e33")
      .attr("stroke-width", 0.5)
      .attr("opacity", 0.5);

    // 3. Constellation Art (If Enabled)
    if (showArt) {
        // Since we don't have real SVG paths for the sky sphere, we map Art to specific star centroids or areas.
        // For this demo, we will check if "Betelgeuse" (Orion) is visible and draw a graphic near it.
        const orionCenter = BRIGHT_STARS.find(s => s.proper === "Betelgeuse");
        if (orionCenter) {
            const coords = projection([raToDegrees(orionCenter.ra), orionCenter.dec]);
            if (coords) {
                // Draw a simple Hunter Icon
                 svg.append("text")
                    .attr("x", coords[0])
                    .attr("y", coords[1])
                    .attr("text-anchor", "middle")
                    .attr("font-size", "100px")
                    .attr("opacity", 0.2)
                    .attr("pointer-events", "none")
                    .text("🏹"); // Using Emoji as a kid-friendly fallback for "Art"
            }
        }
        
         const bearCenter = BRIGHT_STARS.find(s => s.proper === "Dubhe");
         if (bearCenter) {
            const coords = projection([raToDegrees(bearCenter.ra), bearCenter.dec]);
            if (coords) {
                 svg.append("text")
                    .attr("x", coords[0])
                    .attr("y", coords[1])
                    .attr("text-anchor", "middle")
                    .attr("font-size", "100px")
                    .attr("opacity", 0.2)
                    .attr("pointer-events", "none")
                    .text("🐻");
            }
        }
    }

    // 4. Lines
    const getStar = (nameOrId: string) => BRIGHT_STARS.find(s => s.proper === nameOrId || s.id.toString() === nameOrId);
    const lineFeatures = CONSTELLATION_LINES.map(line => {
      const s1 = getStar(line.source);
      const s2 = getStar(line.target);
      if (s1 && s2) {
        return {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [[raToDegrees(s1.ra), s1.dec], [raToDegrees(s2.ra), s2.dec]]
          }
        };
      }
      return null;
    }).filter(Boolean);

    svg.append("g")
      .selectAll("path")
      .data(lineFeatures)
      .enter()
      .append("path")
      .attr("d", path as any)
      .attr("stroke", showArt ? "rgba(255, 140, 0, 0.6)" : "rgba(75, 192, 192, 0.5)")
      .attr("stroke-width", showArt ? 2 : 1.5)
      .attr("stroke-dasharray", showArt ? "none" : "4,2")
      .attr("fill", "none");

    // 5. Stars
    const starFeatures = BRIGHT_STARS.map(star => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [raToDegrees(star.ra), star.dec] },
      properties: star
    }));

    const starsGroup = svg.append("g");
    
    starsGroup.selectAll("path")
      .data(starFeatures)
      .enter()
      .append("path")
      .attr("d", path as any)
      .attr("fill", (d: any) => "#ffe87f")
      .attr("stroke", "none")
      .attr("opacity", 0.9);

    // Labels
    starsGroup.selectAll("text")
      .data(starFeatures.filter((d: any) => d.properties.mag < 1.8)) 
      .enter()
      .append("text")
      .attr("transform", (d: any) => {
        const coords = projection(d.geometry.coordinates as [number, number]);
        return coords ? `translate(${coords[0] + 8},${coords[1] + 4})` : null;
      })
      .text((d: any) => lang === 'zh-HK' && d.properties.proper_zh ? d.properties.proper_zh : d.properties.proper)
      .attr("fill", "#e0e0e0")
      .attr("font-size", "11px")
      .attr("font-weight", "bold")
      .attr("font-family", "Inter, sans-serif")
      .attr("text-shadow", "0px 0px 3px black")
      .style("display", (d: any) => {
        const coords = projection(d.geometry.coordinates as [number, number]);
        return coords ? "block" : "none";
      });

    // 6. Compass Directions (Horizon)
    // We draw these on the SVG overlay, not part of the projection, 
    // but positioned relative to the circle.
    // In Celestial Sphere looking up: North is Top, East is Left.
    const r = (baseScale * scaleK); // current radius
    const cx = width / 2;
    const cy = height / 2;
    
    // Only show compass if we are zoomed out enough to see the horizon or close to it
    if (scaleK < 3) {
        const directions = [
            { label: t.dirN, x: cx, y: cy - r - 15 },
            { label: t.dirS, x: cx, y: cy + r + 25 },
            { label: t.dirE, x: cx - r - 20, y: cy + 5 }, // East is Left in sky maps
            { label: t.dirW, x: cx + r + 20, y: cy + 5 },
        ];
        
        svg.append("g")
           .selectAll("text")
           .data(directions)
           .enter()
           .append("text")
           .attr("x", d => d.x)
           .attr("y", d => d.y)
           .text(d => d.label)
           .attr("text-anchor", "middle")
           .attr("fill", "#ff8c00")
           .attr("font-weight", "bold")
           .attr("font-size", "14px");
           
        // Draw Horizon circle outline
        svg.append("circle")
           .attr("cx", cx)
           .attr("cy", cy)
           .attr("r", r)
           .attr("fill", "none")
           .attr("stroke", "#ff8c00")
           .attr("stroke-width", 2)
           .attr("opacity", 0.3)
           .attr("pointer-events", "none");
    }

  }, [location, date, viewMode, width, height, rotation, lang, showArt, enableGyro, scaleK]);

  return (
    <div ref={wrapperRef} className="w-full h-full relative bg-space-black overflow-hidden rounded-3xl shadow-[0_0_30px_rgba(28,30,51,0.5)] border-2 border-white/10 group">
      <svg ref={svgRef} width={width} height={height} className="block cursor-move active:cursor-grabbing touch-none" />
      
      {/* Overlay Info */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl text-xs md:text-sm text-gray-300 pointer-events-none border border-white/10">
        <p><span className="text-kidrise-orange font-bold">{t.lat}:</span> {location.latitude.toFixed(2)}°</p>
        <p><span className="text-kidrise-orange font-bold">{t.lon}:</span> {location.longitude.toFixed(2)}°</p>
      </div>
      
      {/* Zoom hint */}
      {scaleK === 1 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-white/10 text-6xl animate-pulse">
            <i className="fas fa-arrows-alt"></i>
        </div>
      )}

      {enableGyro && (
        <div className="absolute top-4 right-4 bg-red-500/80 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            Gyroscope ON
        </div>
      )}

      <div className="absolute bottom-4 right-4 text-white/20 text-[10px] font-mono pointer-events-none">
        {t.rendering}: D3-Geo
      </div>
    </div>
  );
};

export default StarMap;