
import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { translations } from '../../utils/i18n';

import ExplanationCard from '../ui/ExplanationCard';

interface Props {
  lang: Language;
  expl?: { what: string; why: string; anim: string };
}

const SolarSystem: React.FC<Props> = ({ lang, expl }) => {
  const t = translations[lang];
  const [activePlanet, setActivePlanet] = useState<string | null>(null);

  // Planet Data: Size relative to Earth, Distance relative, Speed
  const planets = [
    { id: 'mercury', name: t.mercury, color: '#A0522D', size: 0.38, dist: 1.5, speed: 4.1, fact: t.mercuryFact },
    { id: 'venus', name: t.venus, color: '#DEB887', size: 0.95, dist: 2.2, speed: 1.6, fact: t.venusFact },
    { id: 'earth', name: t.earth, color: '#4169E1', size: 1, dist: 3.0, speed: 1, fact: t.earthFact },
    { id: 'mars', name: t.mars, color: '#CD5C5C', size: 0.53, dist: 4.0, speed: 0.5, fact: t.marsFact },
    { id: 'jupiter', name: t.jupiter, color: '#DAA520', size: 3.5, dist: 6.0, speed: 0.08, fact: t.jupiterFact }, // Size scaled down for UI
    { id: 'saturn', name: t.saturn, color: '#F4A460', size: 3.0, dist: 7.5, speed: 0.03, fact: t.saturnFact },
    { id: 'uranus', name: t.uranus, color: '#87CEEB', size: 2.0, dist: 9.0, speed: 0.01, fact: t.uranusFact },
    { id: 'neptune', name: t.neptune, color: '#000080', size: 2.0, dist: 10.5, speed: 0.006, fact: t.neptuneFact },
  ];

  return (
    <div className="flex flex-col h-full bg-black/60 rounded-3xl p-4 overflow-hidden relative overflow-y-auto custom-scrollbar">
       <h3 className="text-xl font-bold text-center mb-4 text-white z-10">{t.knowSolar}</h3>
       <p className="text-xs text-gray-300 text-center mb-4 z-10">{t.solarDesc}</p>

       {expl && (
         <div className="mb-4 z-20 relative">
            <ExplanationCard 
                what={expl.what} 
                why={expl.why} 
                anim={expl.anim} 
            />
         </div>
       )}

       {/* Solar System Visual */}
       <div className="flex-1 relative flex items-center justify-center min-h-[300px] overflow-hidden">
           
           {/* Sun */}
           <div 
             className="absolute w-16 h-16 bg-yellow-400 rounded-full shadow-[0_0_50px_#FFA500] z-20 cursor-pointer hover:scale-110 transition-transform"
             onClick={() => setActivePlanet('sun')}
           ></div>

           {/* Orbits & Planets */}
           {planets.map((p, i) => {
               const orbitSize = 80 + (i * 35); // Base radius
               return (
                   <div 
                        key={p.id}
                        className="absolute rounded-full border border-white/10"
                        style={{ width: orbitSize * 2, height: orbitSize * 2 }}
                   >
                       {/* Planet Container (Rotates) */}
                       <div 
                         className="w-full h-full absolute top-0 left-0 animate-spin-slow"
                         style={{ 
                             animation: `spin ${20 / p.speed}s linear infinite`,
                             animationPlayState: activePlanet ? 'paused' : 'running'
                         }}
                       >
                           {/* Planet Body */}
                           <div 
                             className="absolute top-1/2 -right-[6px] -mt-[6px] rounded-full shadow-lg cursor-pointer hover:scale-150 transition-transform"
                             style={{ 
                                 backgroundColor: p.color, 
                                 width: 12 * Math.max(0.5, p.size), 
                                 height: 12 * Math.max(0.5, p.size),
                                 marginTop: -6 * Math.max(0.5, p.size),
                                 right: -(6 * Math.max(0.5, p.size))
                             }}
                             onClick={() => setActivePlanet(p.id)}
                           ></div>
                       </div>
                   </div>
               );
           })}
       </div>

       {/* Fact Card Popup */}
       {activePlanet && (
           <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
               <div className="bg-[#1c1e2e] border border-white/20 p-6 rounded-2xl max-w-sm text-center relative animate-fade-in-up">
                   <button 
                     onClick={() => setActivePlanet(null)}
                     className="absolute top-2 right-3 text-gray-400 hover:text-white"
                   >
                       <i className="fas fa-times"></i>
                   </button>
                   <div className="w-20 h-20 mx-auto mb-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                        style={{ backgroundColor: activePlanet === 'sun' ? 'gold' : planets.find(p => p.id === activePlanet)?.color }}
                   ></div>
                   <h4 className="text-2xl font-bold mb-2 text-white capitalize">
                       {activePlanet === 'sun' ? t.sun : planets.find(p => p.id === activePlanet)?.name}
                   </h4>
                   <h5 className="text-xs font-bold text-kidrise-orange uppercase mb-2">{t.planetFact}</h5>
                   <p className="text-gray-300">
                       {activePlanet === 'sun' ? t.sunFact : planets.find(p => p.id === activePlanet)?.fact}
                   </p>
               </div>
           </div>
       )}

       <style>{`
          @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
          }
       `}</style>
    </div>
  );
};

export default SolarSystem;
