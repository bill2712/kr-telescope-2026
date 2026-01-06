
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
      const images: Record<string, string> = {
          blackhole: new URL('../../assets/knowledge/blackhole.png', import.meta.url).href,
          meteor: new URL('../../assets/knowledge/meteor.png', import.meta.url).href,
          comet: new URL('../../assets/knowledge/comet.png', import.meta.url).href,
          galaxy: new URL('../../assets/knowledge/galaxy.png', import.meta.url).href,
          nebula: new URL('../../assets/knowledge/nebula.png', import.meta.url).href,
          eclipse: new URL('../../assets/knowledge/eclipse.png', import.meta.url).href,
          constellation: new URL('../../assets/knowledge/constellation.png', import.meta.url).href,
      };

      return (
          <div className="relative w-full h-48 md:h-64 flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 group">
              <img 
                  src={images[type]} 
                  alt={config.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
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
