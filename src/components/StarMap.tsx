import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import * as d3 from 'd3';
import { Language } from '../types';

export type MapStyle = 'western' | 'chinese' | 'urban';

export interface StarMapHandle {
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;
    zoomToSky: () => void;
}

interface StarMapProps {
  date: Date; // Drives rotation
  onDateChange: (newDate: Date) => void;
  lang: Language;
  mapStyle?: MapStyle;
  enableGyro?: boolean;
}

const sanitizeSvg = (source: string): string => {
  const parsed = new DOMParser().parseFromString(source, 'image/svg+xml');
  if (parsed.querySelector('parsererror') || parsed.documentElement.localName !== 'svg') {
    throw new Error('Response is not a valid SVG document');
  }

  parsed.querySelectorAll('script, foreignObject').forEach((node) => node.remove());
  parsed.querySelectorAll('*').forEach((node) => {
    for (const attribute of Array.from(node.attributes)) {
      const value = attribute.value.trim().toLowerCase();
      if (attribute.name.toLowerCase().startsWith('on') || value.startsWith('javascript:')) {
        node.removeAttribute(attribute.name);
      }
    }
  });

  return new XMLSerializer().serializeToString(parsed.documentElement);
};

const fetchSvg = async (url: string, signal: AbortSignal): Promise<string> => {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Unable to load ${url} (${response.status})`);
  return sanitizeSvg(await response.text());
};

const StarMap = forwardRef((props: StarMapProps, ref: React.Ref<StarMapHandle>) => {
  const {
    date,
    onDateChange,
    lang,
    mapStyle = 'western',
    enableGyro,
  } = props;
  const [rotation, setRotation] = useState(0);
  const [jacketSvg, setJacketSvg] = useState<string>('');
  const [diskSvg, setDiskSvg] = useState<string>('');
  const [assetError, setAssetError] = useState(false);
  
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
      },
      zoomToSky: () => {
          if (containerRef.current && zoomBehavior.current) {
               const { width, height } = containerRef.current.getBoundingClientRect();
               // Reduced scale to ensure visibility of the whole oval
               const k = 1.6; 
               
               // The visual center of the black oval is lower than the container center.
               // We need to target a point slightly below the center.
               const verticalOffset = height * 0.18; // Shift target down by 18% of height to move map UP
               
               // Calculate translation to center the Target Point (W/2, H/2 + Offset)
               // ScreenCenter = Target * k + Translate
               // Translate = ScreenCenter - Target * k
               const x = (width / 2) - (width / 2) * k;
               const y = (height / 2) - ((height / 2) + verticalOffset) * k;
               
               const t = d3.zoomIdentity.translate(x, y).scale(k);

               d3.select(containerRef.current).transition().duration(750)
                   .call(zoomBehavior.current.transform, t);
          }
      }
  }));

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

  // 0. Fetch Jacket SVG for inline rendering
  useEffect(() => {
    const controller = new AbortController();
    const fetchJacket = async () => {
        try {
            const svg = await fetchSvg(`${import.meta.env.BASE_URL}planisphere/STARMAP_jacket_front.svg`, controller.signal);
            setJacketSvg(svg);
        } catch (e) {
            if (controller.signal.aborted) return;
            console.error('Failed to load jacket svg', e);
            setAssetError(true);
        }
    };
    void fetchJacket();
    return () => controller.abort();
  }, []);

  // 0.1 Fetch Disk SVG for inline rendering
  useEffect(() => {
    const controller = new AbortController();
    const fetchDisk = async () => {
        try {
            setAssetError(false);
            const svg = await fetchSvg(diskUrl, controller.signal);
            setDiskSvg(svg);
        } catch (e) {
            if (controller.signal.aborted) return;
            console.error('Failed to load disk svg', e);
            setAssetError(true);
        }
    };
    void fetchDisk();
    return () => controller.abort();
  }, [diskUrl]);
  

  // 1. Calculate Rotation based on Legacy Logic (Reverse engineered from original app)
  useEffect(() => {
    // Constants from original app
    const monthOffsets = [0, 30.49, 58.11, 88.65, 118.33, 148.86, 178.52, 209.04, 239.64, 269.15, 299.78, 329.37];
    // Rate appears to be ~14.9 deg/hour or ~0.98 deg/day
    // Formula from snippet: i = -1 * e[Month] + -1 * (Day - 1) * .98 + r[Time]
    
    if (!date) return;
    
    const month = date.getMonth(); // 0-11
    const day = date.getDate(); // 1-31
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    // 1. Month Offset
    const mOffset = monthOffsets[month];
    
    // 2. Day Offset
    const dOffset = (day - 1) * 0.98;
    
    // 3. Time Offset
    // Logic: 12:00 AM = 0. 1:00 AM = -14.9. 11:00 PM = +14.9.
    // Map time to hours relative to midnight (0).
    // range: -12 to +12 approx (centered at midnight).
    let tHours = hours + minutes / 60;
    
    // Adjust to be relative to closest Midnight (0 or 24)
    // If time is > 12 (e.g. 13:00 - 23:59), we treat it as approaching midnight from left (negative hours relative to 24).
    // Actually, simply:
    // If tHours > 12, subtract 24.
    // 13:00 (1 PM) -> -11. (offset = -(-11)*14.9 = +163.9).
    // Wait, 6 PM (18:00) -> -6. offset = +89.4. Correct.
    if (tHours > 12) {
        tHours -= 24;
    }
    
    const tOffset = -1 * tHours * 14.9;
    
    // Total Rotation
    const totalRotation = -1 * mOffset - dOffset + tOffset;
    
    setRotation(totalRotation);
    
  }, [date]);

  // 2. Setup D3 Zoom & Drag on Container
  // Combined logic to handle event filtering on the SAME element
  // 2. Setup D3 Zoom & Drag on Container
  // Ref to access latest date/props inside D3 callbacks without re-running effect
  const latestProps = useRef({ date, onDateChange });
  useEffect(() => {
    latestProps.current = { date, onDateChange };
  }, [date, onDateChange]);

  // 2. Setup D3 Zoom on Container (Panning & Zooming)
  useEffect(() => {
    if (!containerRef.current) return;

    const selection = d3.select(containerRef.current);

    // --- ZOOM BEHAVIOR (Pan & Scale) ---
    const zoom = d3.zoom<HTMLDivElement, unknown>()
        .scaleExtent([0.5, 5])
        .filter((event: MouseEvent | WheelEvent | TouchEvent) => {
             // 1. Always allow Wheel (Desktop Zoom)
             if (event.type === 'wheel') return true;
             
             // 2. Always allow Multi-touch (Pinch Zoom)
             if ('touches' in event && event.touches.length > 1) return true;

             // 3. For Single Touch / Mouse Down:
             //    Allow panning everywhere else (Jacket, Background, etc.)
             //    (Disk touches are handled by the separate Drag listener which stops propagation, preventing Zoom here)
             return true; 
        })
        .on('zoom', (event: d3.D3ZoomEvent<HTMLDivElement, unknown>) => {
            setTransform(event.transform);
        });

    zoomBehavior.current = zoom;
    selection.call(zoom);

    return () => {
       selection.on('.zoom', null);
    };
  }, []); 

  // 3. Setup D3 Drag on Disk (Rotation) - SEPARATE LISTENER
  useEffect(() => {
    if (!diskRef.current) return;
    
    // We bind drag strictly to the DISK element
    // Because disk is "under" the jacket visually in the center, we rely on pointer-events passing through the hole.
    const selection = d3.select(diskRef.current);
    const rate = 15.04107;
    let startAngle = 0;
    let dragStartDate = new Date();

    const drag = d3.drag<HTMLDivElement, unknown>()
         // No complex filter needed here because we attach ONLY to the disk (and events bubble to it)
         // But we should ensure we ignore multi-touch
        .filter((event: MouseEvent | TouchEvent) => {
             if (event instanceof MouseEvent && event.button !== 0) return false;
             if ('touches' in event && event.touches.length > 1) return false;
             return true;
        })
        .on('start', (event: d3.D3DragEvent<HTMLDivElement, unknown, unknown>) => {
            // CRITICAL: Stop propagation so Container doesn't start Panning!
            if(event.sourceEvent && event.sourceEvent.stopPropagation) {
                event.sourceEvent.stopPropagation();
            }

            const rect = diskRef.current!.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            
            const clientX = event.sourceEvent.touches ? event.sourceEvent.touches[0].clientX : event.sourceEvent.clientX;
            const clientY = event.sourceEvent.touches ? event.sourceEvent.touches[0].clientY : event.sourceEvent.clientY;
            
            startAngle = Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
            dragStartDate = latestProps.current.date; 
        })
        .on('drag', (event: d3.D3DragEvent<HTMLDivElement, unknown, unknown>) => {
            // Stop propagation during drag too
            if(event.sourceEvent && event.sourceEvent.stopPropagation) {
                event.sourceEvent.stopPropagation();
            }

           const rect = diskRef.current!.getBoundingClientRect();
           const cx = rect.left + rect.width / 2;
           const cy = rect.top + rect.height / 2;
           
           const clientX = event.sourceEvent.touches ? event.sourceEvent.touches[0].clientX : event.sourceEvent.clientX;
           const clientY = event.sourceEvent.touches ? event.sourceEvent.touches[0].clientY : event.sourceEvent.clientY;

           const currentAngle = Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
           
           let deltaRaw = currentAngle - startAngle;
           const hoursDelta = deltaRaw / rate;
           const newTime = dragStartDate.getTime() - (hoursDelta * 60 * 60 * 1000);
           
           latestProps.current.onDateChange(new Date(newTime));
        });

    selection.call(drag);
    
    return () => {
        selection.on('.drag', null);
    };
  }, []); 




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
        id="starmap-container"
        className="w-full h-full relative overflow-hidden bg-black select-none touch-none"
        ref={containerRef}
    >
        {assetError && (
          <div role="alert" className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950 p-6 text-center text-red-200">
            {lang === 'zh-HK' ? '星圖載入失敗，請重新整理再試。' : 'The star map could not be loaded. Please refresh and try again.'}
          </div>
        )}
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
                    className="absolute inset-0" // Removed will-change-transform to prevent bitmap caching
                    style={{ 
                        transform: `rotate(${rotation}deg)`,
                    }}
                >
                    {/* High-Res Container: Render at 5x size, scale down to fit. 
                        This forces the SVG to rasterize at a higher resolution (1:1 with max zoom).
                    */}
                    <div 
                        className="w-full h-full pointer-events-none [&_svg]:w-full [&_svg]:h-full [&_svg]:block"
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                        }}
                        dangerouslySetInnerHTML={{ __html: diskSvg }}
                    >
                    </div>
                </div>

                {/* 2. Horizon Mask (Fixed relative to Holder) - INLINE SVG 
                    Applied the same High-Res Container fix to the Jacket 
                */}
                <div 
                    className="absolute inset-0 z-10 jacket-layer cursor-move pointer-events-none [&_path]:pointer-events-auto [&_rect]:pointer-events-auto [&_circle]:pointer-events-auto"
                    style={{}}
                >
     <div
        style={{
            width: '100%',
            height: '100%',
        }}
        dangerouslySetInnerHTML={{ __html: jacketSvg }}
        className="w-full h-full pointer-events-none [&_svg]:w-full [&_svg]:h-full [&_svg]:block"
    >
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
});

export default StarMap;
