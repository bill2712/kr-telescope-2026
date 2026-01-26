
import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../utils/i18n';

import ExplanationCard from '../ui/ExplanationCard';

interface Props {
  lang: Language;
  expl?: { what: string; why: string; anim: string };
}

const StarColors: React.FC<Props> = ({ lang, expl }) => {
  const t = translations[lang];
  const [temp, setTemp] = useState(6000); // 3000 to 30000

  // Determine Color and Info based on Temp
  const getColor = (k: number) => {
      if (k < 3500) return { r: 255, g: 100, b: 100, label: t.starRed, desc: t.tempLow, glow: '#ff0000' };
      if (k < 5000) return { r: 255, g: 200, b: 100, label: t.starOrange, desc: t.tempMid, glow: '#ffaa00' };
      if (k < 7500) return { r: 255, g: 255, b: 200, label: t.starYellow, desc: t.tempMid, glow: '#ffff00' };
      if (k < 10000) return { r: 240, g: 240, b: 255, label: t.starWhite, desc: t.tempHigh, glow: '#ffffff' };
      return { r: 150, g: 200, b: 255, label: t.starBlue, desc: t.tempHigh, glow: '#0088ff' };
  };

  const info = getColor(temp);
  const colorString = `rgb(${info.r}, ${info.g}, ${info.b})`;

  return (
    <div className="flex flex-col h-full bg-black/60 rounded-3xl p-4 relative overflow-y-auto custom-scrollbar">
        <h3 className="text-xl font-bold text-center mb-2 text-white">{t.starColorTitle}</h3>
        
        {expl && (
         <div className="mb-4">
            <ExplanationCard 
                what={expl.what} 
                why={expl.why} 
                anim={expl.anim} 
            />
         </div>
       )}
        <p className="text-xs text-center text-gray-400 mb-6 px-4">{t.starColorDesc}</p>

        <div className="flex-1 flex flex-col items-center justify-center">
            
            {/* Simulation Area */}
            <div className="relative w-full max-w-sm h-64 border-b border-white/10 flex items-end justify-center pb-8 mb-8">
                
                {/* The Star */}
                <div 
                  className="rounded-full blur-sm transition-all duration-300 animate-pulse-slow"
                  style={{
                      width: Math.min(120, 50 + (temp / 300)), // Hotter = Bigger (Visual simplification)
                      height: Math.min(120, 50 + (temp / 300)),
                      backgroundColor: colorString,
                      boxShadow: `0 0 ${temp/200}px ${info.glow}, 0 0 ${temp/50}px ${info.glow}`
                  }}
                ></div>

                {/* Thermometer Visual (Optional sidebar) */}
            </div>

            {/* Info Metrics */}
            <div className="grid grid-cols-2 gap-8 w-full max-w-xs mb-8">
                <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-xs text-gray-400 mb-1 uppercase">Temp</div>
                    <div className="text-2xl font-bold font-mono text-white">{temp.toLocaleString()}°C</div>
                    <div className="text-xs text-kidrise-orange mt-1">{info.desc}</div>
                </div>
                 <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-xs text-gray-400 mb-1 uppercase">Class</div>
                    <div className="text-2xl font-bold text-white whitespace-nowrap">{info.label}</div>
                    <div className="text-xs" style={{ color: colorString }}>● Example</div>
                </div>
            </div>

            {/* Controls */}
            <div className="w-full max-w-xs px-4">
                 <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                     <span className="text-red-400">{t.tempCold}</span>
                     <span className="text-blue-400">{t.tempHot}</span>
                 </div>
                 <input 
                  type="range" 
                  min="3000" 
                  max="30000" 
                  step="1000"
                  value={temp} 
                  onChange={(e) => setTemp(parseFloat(e.target.value))}
                  className="w-full h-4 bg-gradient-to-r from-red-600 via-yellow-400 to-blue-600 rounded-full appearance-none cursor-pointer"
                />
            </div>

        </div>
    </div>
  );
};

export default StarColors;
