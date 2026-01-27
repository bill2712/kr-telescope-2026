import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Language } from '../types';
import { translations } from '../utils/i18n';

interface CompassProps {
    lang: Language;
    onClose: () => void;
}

const Compass: React.FC<CompassProps> = ({ lang, onClose }) => {
    // Add type assertion to treat translations[lang] as any to avoid strict type checking on dynamic keys if types.ts isn't updated yet
    const t = translations[lang] as any;
    const [heading, setHeading] = useState<number>(0);
    const [permissionGranted, setPermissionGranted] = useState(false);
    
    // Refs for logic state that updates frequently or doesn't need re-render
    const stateRef = useRef({
        rotationCount: 0,
        lastRawAzimuth: 0,
    });

    // --- Orientation Handling ---
    const handleOrientation = (event: DeviceOrientationEvent) => {
        let alpha = (event as any).webkitCompassHeading || event.alpha;
        if (alpha === null || alpha === undefined) return;
        
        // Normalize for visual rotation smooth wrapping
        let visualHeading = alpha;
        
        let diff = visualHeading - stateRef.current.lastRawAzimuth;
        if (Math.abs(diff) > 180) {
           if (diff > 0) stateRef.current.rotationCount--;
           else stateRef.current.rotationCount++;
        }
        stateRef.current.lastRawAzimuth = visualHeading;
        
        setHeading(visualHeading);
    };

    const requestPermission = async () => {
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            try {
                const resp = await (DeviceOrientationEvent as any).requestPermission();
                if (resp === 'granted') {
                    setPermissionGranted(true);
                    window.addEventListener('deviceorientation', handleOrientation, true);
                } else {
                    alert("需要權限才能使用指南針");
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            setPermissionGranted(true);
            window.addEventListener('deviceorientation', handleOrientation, true);
        }
    };

    useEffect(() => {
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation, true);
        };
    }, []);

    const getDirectionStr = (deg: number) => {
        const directions = t.directions || ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;
        return directions[index];
    };

    return createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/90 text-white font-sans flex flex-col animate-fade-in overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-white/5 backdrop-blur-md border-b border-white/10 shrink-0">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <i className="fas fa-compass text-cyan-400"></i>
                    {lang === 'zh-HK' ? '實時指南針' : 'Real-time Compass'}
                </h2>
                <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                    <i className="fas fa-times"></i>
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
                
                {!permissionGranted ? (
                    <div className="bg-white/10 rounded-3xl p-8 text-center max-w-sm border border-white/20 shadow-2xl">
                         <div className="text-5xl mb-6">🧭</div>
                         <h3 className="text-2xl font-bold mb-4">{t.enableCompass || "啟用指南針"}</h3>
                         <p className="text-gray-300 mb-8">{t.compassPermDesc || "為了讓指南針正常運作，我們需要您授權存取裝置的方向感測器。"}</p>
                         <button 
                            onClick={requestPermission}
                            className="w-full py-4 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-1"
                        >
                            {t.btnGrantPerm || "✅ 同意並啟用"}
                         </button>
                    </div>
                ) : (
                    <>
                        {/* Status Hint */}
                        <div className="text-xs text-slate-400 mb-10 font-mono bg-black/40 px-4 py-2 rounded-full border border-white/5">
                            {t.compassCalibrate || (lang === 'zh-HK' ? '請以「8」字形揮動手機校準' : 'Wave phone in figure 8 to calibrate')}
                        </div>

                        {/* Compass Visual */}
                        <div className="relative w-80 h-80 mb-12 shrink-0">
                             {/* Static Rose (Background) */}
                             <img 
                                src={`${import.meta.env.BASE_URL}assets/knowledge/compass-rose.svg`}
                                alt="Compass Rose"
                                className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                             />
                             
                             {/* Needle (Rotates) */}
                             <img 
                                src={`${import.meta.env.BASE_URL}assets/knowledge/compass-needle.svg`}
                                alt="Needle"
                                className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 ease-out"
                                style={{ transform: `rotate(${heading}deg)` }} 
                             />
                        </div>

                        {/* Reading */}
                        <div className="text-center pb-10">
                             <div className="text-7xl font-black text-white font-mono tracking-tighter drop-shadow-lg">
                                 {Math.round(heading)}°
                             </div>
                             <div className="text-2xl font-bold text-secondary mt-2 tracking-[0.2em] uppercase">
                                 {getDirectionStr(heading)}
                             </div>
                        </div>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
};

export default Compass;
