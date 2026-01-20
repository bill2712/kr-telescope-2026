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
  
  // Calculate Rotation based on Ho Koon Planisphere Rules
  useEffect(() => {
    // Rule: October 1st at 00:00 is the reference point (0 degrees).
    // Rotation Rate: 15.04107 degrees per hour (Sidereal rate).
    // Direction: Counter-Clockwise (Negative rotation in CSS).

    const calculateRotation = () => {
       // Reference Date: October 1st of the *previous* year if current date is before Oct 1?
       // Actually, simplified: Just find the offset from a fixed Oct 1 (e.g. 2023) and modulo 360.
       // However, to be precise with the user's current year context:
       
       const currentYear = date.getFullYear();
       
       // Construct Reference Date: Oct 1 of Current Year at 00:00
       let refDate = new Date(currentYear, 9, 1, 0, 0, 0); // Month is 0-indexed (9 = Oct)

       // If current date is BEFORE Oct 1, we should probably compare to Oct 1 of PREVIOUS year
       // so the continuity is smooth?
       // Actually, let's keep it simple: Compare to the nearest Oct 1 in the past?
       // Or just use any Oct 1 reference.
       // Let's use the Oct 1 of the same year. If result is negative, it just rotates back.
       // But wait, Planisphere cycles are annual.
       
       // Let's use specific logic:
       // The ring is fixed. Oct 1 on the ring aligns with 00:00 on the jacket.
       // So we just need to measure how much time has passed since THAT alignment.
       
       const diffMs = date.getTime() - refDate.getTime();
       const diffHours = diffMs / (1000 * 60 * 60);

       // 15.04107 deg/hr = 360.9856 deg/day
       const rate = 15.04107; 
       
       // Calculate rotation.
       // Positive diffHours means we are AFTER Oct 1. 
       // Stars move West (CW? No, usually East to West).
       // On planisphere:
       // 2 hours later = Stars rotate 30 deg.
       // If standard rotate is CW.
       // Planisphere stars rotate Clockwise or Counter-Clockwise?
       // Real sky: Stars rotate Counter-Clockwise around Polaris (North celestial pole).
       // Planisphere disk: Usually rotates CLOCKWISE to simulate time passing (because sky moves CCW, or wait).
       // Let's check the report: "Rotation (Counter-Clockwise)..." logic found in research.
       // "6:00 AM = 90 deg (Left)". 
       // If Oct 1 @ 00:00 is 0 deg.
       // Oct 1 @ 06:00 (6 hours later).
       // Disk should match 6am mark? No, the mask is fixed. The disk rotates.
       // Using "Ho Koon Rule": Rotation is `(Hours * 15) + (Days * 0.9856)`.
       // This value is POSITIVE.
       // And they said "Rotation (Counter-Clockwise)".
       // So we need `transform: rotate(-Xdeg)`.
       
       const totalRotation = diffHours * rate;
       
       // Invert for CSS (CCW)
       setRotation(-totalRotation);
    };

    calculateRotation();
  }, [date]);


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