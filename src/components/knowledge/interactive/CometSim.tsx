import React, { useState } from 'react';
import { translations } from '../../../utils/i18n';
import { Language } from '../../../types';

const CometSim: React.FC<{lang: Language}> = ({lang}) => {
  const t = translations[lang];
  const [orbitPos, setOrbitPos] = useState(0); // 0 to 100

  // Calculate position on ellipse
  const a = 140; // semi-major
  const b = 60;  // semi-minor
  const angle = (orbitPos / 100) * Math.PI * 2;
  const x = Math.cos(angle) * a;
  const y = Math.sin(angle) * b;

  // Sun is at focus, offset a bit
  const sunX = 50; 
  const cometX = x;
  const cometY = y;

  // Tail Calculation (Always points away from Sun (0,0 is center of ellipse, sun is offset))
  // Center of SVG is 150,150.
  const cx = 150;
  const cy = 150;
  const sunAbsX = cx + sunX;
  const sunAbsY = cy; // center y
  const cometAbsX = cx + cometX;
  const cometAbsY = cy + cometY;

  const vectorX = cometAbsX - sunAbsX;
  const vectorY = cometAbsY - sunAbsY;
  const dist = Math.sqrt(vectorX*vectorX + vectorY*vectorY);
  
  // Angle for tail rotation
  const tailAngle = Math.atan2(vectorY, vectorX) * (180 / Math.PI);
  
  // Tail length depends on proximity to Sun (closer = longer)
  // Max dist approx 200, min dist approx 50
  const tailLength = Math.max(20, 100 - (dist / 2));
  const opacity = Math.max(0.2, 1 - (dist / 250));

  return (
    <div className="relative w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-[#0a0a2a] rounded-3xl overflow-hidden border border-white/20 p-8">
      
      <div className="relative w-[300px] h-[300px]">
          <svg width="300" height="300" viewBox="0 0 300 300">
              {/* Orbit Path */}
              <ellipse cx="150" cy="150" rx={a} ry={b} fill="none" stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5" />
              
              {/* Sun */}
              <circle cx={sunAbsX} cy={sunAbsY} r="15" fill="orange" className="animate-pulse">
                  <animate attributeName="r" values="14;16;14" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Comet Group */}
              <g transform={`translate(${cometAbsX}, ${cometAbsY})`}>
                   {/* Tail Group rotated to point away from Sun */}
                   <g transform={`rotate(${tailAngle})`}>
                       {/* Tail Gradient */}
                       <linearGradient id="tailGrad" x1="0" y1="0" x2="1" y2="0">
                           <stop offset="0%" stopColor="rgba(200, 240, 255, 0.8)" />
                           <stop offset="100%" stopColor="rgba(200, 240, 255, 0)" />
                       </linearGradient>
                       {/* Tail Shape */}
                       <path 
                         d={`M 0,-5 L ${tailLength}, -10 L ${tailLength + 20}, 0 L ${tailLength}, 10 L 0, 5 Z`} 
                         fill="url(#tailGrad)" 
                         style={{ opacity: opacity }}
                       />
                   </g>
                   
                   {/* Comet Nucleus */}
                   <circle cx="0" cy="0" r="6" fill="#AEE" stroke="white" strokeWidth="2" />
              </g>
          </svg>
      </div>

      <div className="mt-8 w-64 bg-white/10 p-4 rounded-xl backdrop-blur">
          <label className="text-white text-xs font-bold uppercase mb-2 block flex justify-between">
              <span>{t.interactive.orbitPos}</span>
              <span>{Math.round(dist)}m km</span>
          </label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={orbitPos} 
            onChange={(e) => setOrbitPos(Number(e.target.value))}
            className="w-full accent-cyan-400"
          />
          <p className="text-[10px] text-gray-400 mt-2 text-center leading-tight">
              {t.interactive.cometTip}
          </p>
      </div>
    </div>
  );
};

export default CometSim;
