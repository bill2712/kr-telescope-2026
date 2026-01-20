import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Coordinates, Language } from '../types';
import { getLocalSiderealTime } from '../utils/astroUtils';
import { translations } from '../utils/i18n';

export type MapStyle = 'western' | 'chinese' | 'urban';

export interface StarMapHandle {
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;
}

interface StarMapProps {
  location: Coordinates;
  date: Date; // Drives rotation
  lang: Language;
  mapStyle?: MapStyle;
  enableGyro?: boolean;
  isPlanisphere?: boolean; // Always true for this clone?
}

const StarMap = forwardRef<StarMapHandle, StarMapProps>(({
  location,
  date,
  lang,
  mapStyle = 'western',
  enableGyro,
  isPlanisphere = true
}, ref) => {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Expose Zoom Methods
  useImperativeHandle(ref, () => ({
      zoomIn: () => setScale(s => Math.min(s * 1.2, 5)),
      zoomOut: () => setScale(s => Math.max(s / 1.2, 0.5)),
      resetZoom: () => setScale(1)
  }));
  
  // Calculate LST for rotation
  useEffect(() => {
    // 1. Calculate Local Sidereal Time
    const lstHours = getLocalSiderealTime(date, location.longitude);
    
    // 2. Convert to Degrees
    // Rotation Direction: 
    // - Stars move East to West (Left to Right on this map).
    // - Rotation should be CLOCKWISE (Positive).
    // Offset Calibration:
    // - At LST ~2h (Jan 19, 18:00), we expect 90 deg rotation (3 o'clock).
    // - Formula: (LST + Offset) * 15 = Rotation
    // - (2 + Offset) * 15 = 90  => 2 + Offset = 6  => Offset = +4h?
    // - Wait, previous calc was +6h. Let's try +5h. 
    // - If LST=2, (2+5)*15 = 7 * 15 = 105 deg (3:30). Close.
    // - Let's try +4.5h. (6.5*15) = 97.5.
    // - Let's stick to integer +5 first.
    // - Or, look at native image: Jan 19 (RA 20h) is at 330 deg (-30).
    // - We want it at 90 deg. Difference +120 deg (+8h).
    // - If LST = 2h. We need +8h rotation.
    // - (2 + 6) * 15 = 120.
    // - So Offset = +6h.
    
    // Calibrated Offset: -6h
    // This value ensures that at Midnight, the Date mark on the disk aligns with the Midnight mark on the Jacket.
    const deg = (lstHours - 6) * 15;
    setRotation(deg);
  }, [date, location]);


  // Resolve Assets based on State
  const getDiskImage = () => {
    // mapStyle: western (IAU), chinese (CHN), urban (URBAN)
    // lang: zh-HK, en
    // Files: STARMAP_IAU_CHN.svg, STARMAP_IAU_ENG.svg ...
    
    let styleKey = 'IAU';
    if (mapStyle === 'chinese') styleKey = 'CHN';
    if (mapStyle === 'urban') styleKey = 'URBAN';
    
    let langKey = 'ENG';
    if (lang === 'zh-HK') langKey = 'CHN';
    
    return `${import.meta.env.BASE_URL}planisphere/STARMAP_${styleKey}_${langKey}.svg`;
  };

  const diskUrl = getDiskImage();
  const maskUrl = `${import.meta.env.BASE_URL}planisphere/STARMAP_jacket_front.svg`;

  // Gyro Rotation (Device Orientation)
  const [deviceHeading, setDeviceHeading] = useState(0);
  
  useEffect(() => {
     if (!enableGyro) {
         setDeviceHeading(0);
         return;
     }
     
     const handleOrientation = (e: DeviceOrientationEvent) => {
         // @ts-ignore - webkitCompassHeading is standard on iOS
         if (e.webkitCompassHeading) {
             // @ts-ignore
             setDeviceHeading(e.webkitCompassHeading);
         } else if (e.alpha) {
             setDeviceHeading(360 - e.alpha);
         }
     };
     
     window.addEventListener('deviceorientation', handleOrientation);
     return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [enableGyro]);


  return (
    <div 
        className="w-full h-full relative overflow-hidden bg-black select-none"
        ref={containerRef}
    >
        {/* Container for Gyro Rotation */}
        <div 
            className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
            style={{ 
                transform: `rotate(${-deviceHeading}deg) scale(${scale})` 
            }}
        >
            {/* The Planisphere Assembly */}
            <div className="relative w-[95vmin] h-[95vmin] max-w-[800px] max-h-[800px]">
                
                {/* 1. Underlying Star Disk (Rotates with Time) */}
                <div 
                    className="absolute inset-0 transition-transform duration-75 ease-linear will-change-transform"
                    style={{ 
                        transform: `rotate(${rotation}deg)`,
                    }}
                >
                    <img 
                        src={diskUrl} 
                        alt="Star Disk" 
                        className="w-full h-full object-contain pointer-events-auto"
                        draggable={false}
                    />
                </div>

                {/* 2. Horizon Mask (Fixed relative to Holder) */}
                <div className="absolute inset-0 pointer-events-none z-10">
                    <img 
                        src={maskUrl} 
                        alt="Horizon Mask" 
                        className="w-full h-full object-contain" 
                    />
                </div>
            </div>
        </div>

    </div>
  );
});

export default StarMap;