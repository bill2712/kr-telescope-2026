import React, { useState } from 'react';
import { translations } from '../../utils/i18n';
import { Language } from '../../types';

interface SpaceScaleProps {
  lang: Language;
  onBack: () => void;
}

const GRAVITY_DATA = [
  { id: 'moon', factor: 0.166, icon: 'fa-moon', color: 'bg-gray-400' },
  { id: 'mercury', factor: 0.38, icon: 'fa-thermometer-half', color: 'bg-orange-300' },
  { id: 'mars', factor: 0.38, icon: 'fa-rocket', color: 'bg-red-500' },
  { id: 'venus', factor: 0.91, icon: 'fa-cloud', color: 'bg-yellow-200' },
  { id: 'earth', factor: 1.0, icon: 'fa-globe-americas', color: 'bg-blue-500' },
  { id: 'uranus', factor: 0.92, icon: 'fa-circle', color: 'bg-cyan-300' },
  { id: 'neptune', factor: 1.19, icon: 'fa-wind', color: 'bg-blue-700' },
  { id: 'saturn', factor: 1.06, icon: 'fa-ring', color: 'bg-yellow-600' },
  { id: 'jupiter', factor: 2.34, icon: 'fa-meteor', color: 'bg-orange-400' },
  { id: 'pluto', factor: 0.06, icon: 'fa-snowflake', color: 'bg-blue-200' },
  { id: 'sun', factor: 27.07, icon: 'fa-sun', color: 'bg-yellow-500' }
];

const SpaceScale: React.FC<SpaceScaleProps> = ({ lang, onBack }) => {
  const t = translations[lang] as any;
  const [weight, setWeight] = useState<string>('30'); // Default 30kg

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d+$/.test(val)) {
        setWeight(val);
    }
  };

  const numWeight = parseFloat(weight) || 0;

  return (
    <div className="flex flex-col h-full bg-[#0B0D17] text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
         <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
            <i className="fas fa-arrow-left"></i>
         </button>
         <h2 className="text-xl font-bold">{t.scaleTitle}</h2>
         <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Input Section */}
          <div className="bg-[#1c1e33] border border-kidrise-orange rounded-3xl p-6 text-center shadow-[0_0_30px_rgba(255,140,0,0.1)]">
              <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wider">{t.enterWeight}</label>
              <div className="flex items-center justify-center gap-4">
                  <input 
                      type="number" 
                      value={weight}
                      onChange={handleWeightChange}
                      className="w-32 bg-black/50 border-2 border-white/20 rounded-2xl p-3 text-3xl font-bold text-center text-white focus:border-kidrise-orange focus:outline-none transition-colors"
                  />
                  <span className="text-2xl font-bold text-gray-500">kg</span>
              </div>
          </div>

          {/* Intro Text */}
          <div className="text-center text-gray-300 text-sm px-4">
              <p>{t.scaleDesc}</p>
          </div>

          {/* Planet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
              {GRAVITY_DATA.map((planet) => (
                  <div key={planet.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden">
                      {/* Background Visual Bar for "Heaviness" relative to Earth */}
                      <div 
                        className={`absolute bottom-0 left-0 top-0 opacity-10 ${planet.color}`}
                        style={{ width: `${Math.min((planet.factor / 3) * 100, 100)}%` }}
                      ></div>

                      <div className={`w-12 h-12 rounded-full ${planet.color} flex items-center justify-center text-xl text-black/70 shadow-lg shrink-0`}>
                          <i className={`fas ${planet.icon}`}></i>
                      </div>
                      
                      <div className="flex-1 z-10">
                          <h3 className="font-bold text-gray-300 text-sm uppercase">{t[planet.id] || planet.id}</h3>
                          <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold text-white">
                                  {(numWeight * planet.factor).toFixed(1)}
                              </span>
                              <span className="text-xs text-gray-500">kg</span>
                          </div>
                      </div>

                      {/* Jump Height Comparison (Inverse of Gravity) */}
                      <div className="text-right z-10">
                           <div className="text-[10px] text-gray-400">Jump Height</div>
                           <div className="text-lg font-bold text-kidrise-orange">
                               {planet.factor > 0.01 ? (1 / planet.factor).toFixed(1) : '?'}x
                           </div>
                      </div>
                  </div>
              ))}
          </div>

      </div>
    </div>
  );
};

export default SpaceScale;
