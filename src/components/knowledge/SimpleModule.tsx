
import React from 'react';
import { Language } from '../../types';
import { translations } from '../../utils/i18n';

interface Props {
  lang: Language;
  type: 'blackhole' | 'meteor' | 'comet' | 'galaxy' | 'nebula' | 'eclipse' | 'constellation';
}

const SimpleModule: React.FC<Props> = ({ lang, type }) => {
  const t = translations[lang];

  // Map type to config
  const config = {
      blackhole: { title: t.knowBlackHole, desc: t.blackHoleDesc, context: t.blackHoleContext, color: '#000' },
      meteor: { title: t.knowMeteor, desc: t.meteorDesc, context: t.meteorContext, color: '#1a1a4a' },
      comet: { title: t.knowComet, desc: t.cometDesc, context: t.cometContext, color: '#0a0a2a' },
      galaxy: { title: t.knowGalaxy, desc: t.galaxyDesc, context: t.galaxyContext, color: '#2a0a2a' },
      nebula: { title: t.knowNebula, desc: t.nebulaDesc, context: t.nebulaContext, color: '#2a0a1a' },
      eclipse: { title: t.knowEclipse, desc: t.eclipseDesc, context: t.eclipseContext, color: '#1a1a1a' },
      constellation: { title: t.knowConstellation, desc: t.constellationDesc, context: t.constellationContext, color: '#0a1a2a' },
  }[type];

  // Unique Simulations
  const renderVisual = () => {
      if (type === 'blackhole') {
          return (
              <div className="relative w-48 h-48 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black rounded-full shadow-[0_0_50px_#4b0082]"></div>
                  <div className="absolute inset-2 border-4 border-white/20 rounded-full animate-spin-slow" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}></div>
                  <div className="absolute inset-0 border border-white/10 rounded-full animate-ping opacity-20"></div>
                  {/* Accretion Disk */}
                   <div 
                     className="absolute w-[140%] h-[20%] bg-gradient-to-r from-transparent via-orange-500 to-transparent blur-md"
                     style={{ top: '50%', transform: 'translateY(-50%) rotate(-15deg)' }}
                   ></div>
              </div>
          );
      }
      if (type === 'meteor') {
          return (
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-b from-[#0b0d17] to-[#1a1d2d]">
                  {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute h-0.5 bg-gradient-to-l from-transparent to-white animate-meteor"
                        style={{
                            width: '100px',
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            opacity: 0
                        }}
                      ></div>
                  ))}
                  <style>{`
                    @keyframes meteor {
                        0% { transform: translateX(200px) translateY(-200px) rotate(-45deg); opacity: 1; }
                        100% { transform: translateX(-200px) translateY(200px) rotate(-45deg); opacity: 0; }
                    }
                    .animate-meteor {
                        animation: meteor 2s linear infinite;
                    }
                  `}</style>
              </div>
          );
      }
      if (type === 'galaxy') {
          return (
             <div className="relative w-48 h-48 animate-spin-slow">
                 <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-blue-500/20 to-transparent rounded-full blur-xl"></div>
                 {/* Arms */}
                 {[...Array(3)].map((_, i) => (
                     <div 
                       key={i}
                       className="absolute top-1/2 left-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent blur-sm"
                       style={{ 
                           transform: `translate(-50%, -50%) rotate(${i * 60}deg)`,
                           borderRadius: '50%'
                        }}
                     ></div>
                 ))}
                 {/* Spiral Logic is hard in pure CSS without an image, using a placeholder "Swirl" */}
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-80">🌀</div>
             </div>
          );
      }
      // Basics for others...
      return (
          <div className="text-6xl animate-bounce">
              {type === 'comet' && '☄️'}
              {type === 'nebula' && '🌫️'}
              {type === 'eclipse' && '🌑'}
              {type === 'constellation' && '✨'}
          </div>
      );
  };

  return (
    <div className="flex flex-col h-full bg-black/60 rounded-3xl p-6 relative overflow-hidden">
       {/* Background Tint */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundColor: config.color }}></div>

       <h3 className="text-2xl font-bold text-center mb-2 text-white z-10">{config.title}</h3>
       <p className="text-sm text-center text-gray-300 mb-8 z-10 border-b border-white/10 pb-4">{config.desc}</p>

       <div className="flex-1 flex flex-col items-center justify-center z-10">
           {renderVisual()}
       </div>

       <div className="mt-8 bg-white/10 p-4 rounded-xl backdrop-blur-md z-10">
           <div className="text-xs font-bold text-kidrise-orange mb-1 uppercase">Did You Know?</div>
           <p className="text-white text-sm leading-relaxed">{config.context}</p>
       </div>
    </div>
  );
};

export default SimpleModule;
