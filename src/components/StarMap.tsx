import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import * as d3 from 'd3';
import { Coordinates, Language } from '../types';

export type MapStyle = 'western' | 'chinese' | 'urban';

export interface StarMapHandle {
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;
}

interface StarMapProps {
  location: Coordinates;
  date: Date; // Drives rotation
  onDateChange?: (newDate: Date) => void;
  lang: Language;
  mapStyle?: MapStyle;
  enableGyro?: boolean;
  isPlanisphere?: boolean; 
}

const StarMap = forwardRef<StarMapHandle, StarMapProps>(({
  location,
  date,
  onDateChange,
  lang,
  mapStyle = 'western',
  enableGyro,
  isPlanisphere = true
}, ref) => {
  const [rotation, setRotation] = useState(0);
  const [jacketSvg, setJacketSvg] = useState<string>('');
  
  // D3 Transform State (x, y, k)
  const [transform, setTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const diskRef = useRef<HTMLDivElement>(null);
  
  // Keep track of zoom behavior to call it imperatively
  const zoomBehavior = useRef<d3.ZoomBehavior<HTMLDivElement, unknown> | null>(null);

  // Expose Zoom Methods via D3
  useImperativeHandle(ref, () => ({
      zoomIn: () => {
          if (containerRef.current && zoomBehavior.current) {
              d3.select(containerRef.current).transition().call(zoomBehavior.current.scaleBy, 1.2);
          }
      },
      zoomOut: () => {
          if (containerRef.current && zoomBehavior.current) {
              d3.select(containerRef.current).transition().call(zoomBehavior.current.scaleBy, 1 / 1.2);
          }
      },
      resetZoom: () => {
          if (containerRef.current && zoomBehavior.current) {
              d3.select(containerRef.current).transition().call(zoomBehavior.current.transform, d3.zoomIdentity);
          }
      }
  }));

  // 0. Fetch Jacket SVG for inline rendering
  useEffect(() => {
    const fetchJacket = async () => {
        try {
            const response = await fetch(`${import.meta.env.BASE_URL}planisphere/STARMAP_jacket_front.svg`);
            const text = await response.text();
            setJacketSvg(text);
        } catch (e) {
            console.error('Failed to load jacket svg', e);
        }
    };
    fetchJacket();
  }, []);
  
  // 1. Calculate Rotation based on Time (Your existing logic)
  useEffect(() => {
    const calculateRotation = () => {
       const currentYear = date.getFullYear();
       const jan1 = new Date(currentYear, 0, 1, 0, 0, 0);
       const diffMs = date.getTime() - jan1.getTime();
       const diffHours = diffMs / (1000 * 60 * 60);
       
       // Derived Rate (Iteration 3)
       const rate = 14.958934;
       const offset = -180;
       
       const totalRotation = (diffHours * rate) + offset;
       setRotation(totalRotation);
    };
    calculateRotation();
  }, [date]);

  // 2. Setup D3 Zoom & Drag on Container
  // Combined logic to handle event filtering on the SAME element
  useEffect(() => {
    if (!containerRef.current || !onDateChange) return;

    const selection = d3.select(containerRef.current);

    // --- ZOOM BEHAVIOR (Pan Map) ---
    // Active if: 
    // 1. Event is Wheel
    // 2. OR Event targeted "jacket-path" (The Outer Ring)
    const zoom = d3.zoom<HTMLDivElement, unknown>()
        .scaleExtent([0.5, 5])
        .filter((event) => {
             // Always allow wheel
             if (event.type === 'wheel') return true;
             // Allow mousedown/touchstart ONLY if target is part of Jacket
             // We'll class the SVG paths in the jacket as 'jacket-path' via parent
             // But simplest check: Check if target is inside the .jacket-layer
             // AND NOT transparent (Inline SVG clicks only fire on paths usually if pointer-events:auto)
             const target = event.target as Element;
             return target.closest('.jacket-layer') !== null;
        })
        .on('zoom', (event) => {
            setTransform(event.transform);
        });

    zoomBehavior.current = zoom;
    selection.call(zoom);

    // --- DRAG BEHAVIOR (Rotate Disk) ---
    // Active if:
    // 1. Target is NOT .jacket-layer (i.e., it fell through to background or disk)
    const rate = 14.958934;
    let startAngle = 0;
    let startDate = date;

    const drag = d3.drag<HTMLDivElement, unknown>()
        .filter((event) => {
             // Allow ONLY if target is NOT the jacket
             const target = event.target as Element;
             // If we clicked the text/stars (pointer-events-none on disk), it falls through to container?
             // Actually, we want to catch clicks on the "Hole" or "Background".
             // If we clicked Jacket, we return false (handled by zoom/pan).
             return target.closest('.jacket-layer') === null;
        })
        .on('start', (event) => {
            // Calculate initial angle relative to Center of Map
            // Note: We need center of the ROTATING DISK, which is center of the container roughly.
            // We can use the container's center since we only pan the container's content, not the container itself?
            // Actually, the transform moves the inner div. 
            // We need the center of the visual disk on screen.
            
            // To get accurate center, we can query the ring's bounding box ??
            // OR just use the container center if the map is centered.
            // But the map might be panned.
            
            // Ref to the disk Wrapper
            if (!diskRef.current) return;
            const rect = diskRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            
            startAngle = Math.atan2(event.sourceEvent.clientY - cy, event.sourceEvent.clientX - cx) * (180 / Math.PI);
            startDate = date; 
        })
        .on('drag', (event) => {
           if (!diskRef.current) return;
           const rect = diskRef.current.getBoundingClientRect();
           const cx = rect.left + rect.width / 2;
           const cy = rect.top + rect.height / 2;
           
           const currentAngle = Math.atan2(event.sourceEvent.clientY - cy, event.sourceEvent.clientX - cx) * (180 / Math.PI);
           
           let deltaRaw = currentAngle - startAngle;
           const hoursDelta = deltaRaw / rate;
           const newTime = startDate.getTime() + (hoursDelta * 60 * 60 * 1000);
           onDateChange(new Date(newTime));
        });

    // Apply drag to the same container logic, BUT D3 Zoom consumes events.
    // To make them coexist, typically Zoom is on Parent, Drag on Child.
    // OR we register both on Parent but use strict filters (which we did).
    // HOWEVER, D3 Zoom usually `preventDefaults` everything.
    // We might need to manually call the drag handler if the zoom filter rejects it?
    // No, if Zoom filter returns false, it ignores the event, allowing it to bubble or be handled by other listeners.
    selection.call(drag);

    return () => {
       selection.on('.zoom', null);
       selection.on('.drag', null);
    };

  }, [date, onDateChange]); 


  // Resolve Assets based on State
  const getDiskImage = () => {
    let styleKey = 'IAU';
    if (mapStyle === 'chinese') styleKey = 'CHN';
    if (mapStyle === 'urban') styleKey = 'URBAN';
    let langKey = 'ENG';
    if (lang === 'zh-HK') langKey = 'CHN';
    return `${import.meta.env.BASE_URL}planisphere/STARMAP_${styleKey}_${langKey}.svg`;
  };

  const diskUrl = getDiskImage();

  // Gyro Rotation (Device Orientation)
  const [deviceHeading, setDeviceHeading] = useState(0);
  useEffect(() => {
     if (!enableGyro) { setDeviceHeading(0); return; }
     const handleOrientation = (e: DeviceOrientationEvent) => {
         // @ts-ignore
         if (e.webkitCompassHeading) { setDeviceHeading(e.webkitCompassHeading); } 
         // @ts-ignore
         else if (e.alpha) { setDeviceHeading(360 - e.alpha); }
     };
     window.addEventListener('deviceorientation', handleOrientation);
     return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [enableGyro]);

  return (
    <div 
        className="w-full h-full relative overflow-hidden bg-black select-none"
        ref={containerRef}
    >
        {/* Container for D3 Zoom + Gyro Rotation */}
        <div 
            className="absolute inset-0 flex items-center justify-center transition-transform duration-0 ease-out origin-top-left"
            style={{ 
                // Apply D3 Transform (k, x, y) AND Gyro Rotation
                transformOrigin: '0 0',
                transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.k}) rotate(${-deviceHeading}deg)` 
            }}
        >
            {/* The Planisphere Assembly */}
            <div className="relative w-[95vmin] h-[95vmin] max-w-[800px] max-h-[800px]">
                
                {/* 1. Underlying Star Disk (Rotates with Time) */}
                <div 
                    ref={diskRef}
                    className="absolute inset-0 will-change-transform"
                    style={{ 
                        transform: `rotate(${rotation}deg)`,
                    }}
                >
                    {/* Replaced img with object for sharpness (Vector) */}
                    <object
                        data={diskUrl}
                        type="image/svg+xml"
                        className="w-full h-full pointer-events-none"
                        title="Star Disk"
                    />
                </div>

                {/* 2. Horizon Mask (Fixed relative to Holder) - INLINE SVG */}
                <div 
                    className="absolute inset-0 z-10 jacket-layer cursor-move pointer-events-none [&_svg]:pointer-events-none [&_path]:pointer-events-auto [&_rect]:pointer-events-auto [&_circle]:pointer-events-auto"
                    dangerouslySetInnerHTML={{ __html: jacketSvg }}
                    /* The SVG itself should be sized 100% 100% via CSS inside or here if needed. 
                       Usually SVGs respond well, but we ensure it fits. 
                       We also pointer-events-auto on the PATHS (default) but checking transparency. */
                    style={{
                         // Ensure internal SVG scales correctly
                         // width: '100%', height: '100%' 
                    }}
                >
                </div>
            </div>
        </div>
    </div>
  );
});

export default StarMap;