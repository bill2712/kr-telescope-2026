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
  
  // Calculate Rotation based on User-Specified Planisphere Rules (Iteration 3)
  useEffect(() => {
    const calculateRotation = () => {
       const currentYear = date.getFullYear();
       
       // Reference: January 1st at 00:00
       const jan1 = new Date(currentYear, 0, 1, 0, 0, 0);
       
       // Calculate Total Hours since Jan 1 00:00
       const diffMs = date.getTime() - jan1.getTime();
       const diffHours = diffMs / (1000 * 60 * 60);
       
       // Rotation Rate derivation from User Rules:
       // 1. Date Ring: Clockwise (Jan 1 -> Dec 31). Rate: ~0.9856 deg/day (CW).
       // 2. Time Ring: Clockwise (6am-Left -> 12pm-Top -> 6pm-Right). Rate: 15 deg/hour (CW).
       //    Note: Noon is Top (0 deg). Midnight is Bottom (180 deg).
       // 3. Alignment Goal: Align Date Mark (CW) with Time Mark (CW).
       //    Rot_CW = Angle_Time_CW - Angle_Date_CW
       //    Rot_CW = (Time_Hours_from_Noon * 15) - (Days * 0.9856)
       //    Time_Hours_from_Noon = (Time_Hours_from_Midnight - 12)
       //    Rot_CW = ((H - 12) * 15) - (D * 0.9856)
       //           = 15H - 180 - (H/24 * 0.9856)  [Since D = TotalHours/24]
       //           = H * (15 - 0.9856/24) - 180
       //           = H * (15 - 0.041066) - 180
       //           = H * 14.958934 - 180
       
       const rate = 14.958934;
       const offset = -180;
       
       const totalRotation = (diffHours * rate) + offset;
       
       // Apply as Positive for Clockwise CSS rotation
       setRotation(totalRotation);
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