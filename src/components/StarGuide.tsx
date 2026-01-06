import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';

interface Props {
  lang: Language;
}

type GuideItem = 'polaris' | 'sirius' | 'betelgeuse' | 'orionNebula' | 'pleiades' | 'rigel' | 'aldebaran' | 'arcturus' | 'vega' | 'altair' | 'antares' | 'andromedaGalaxy';

const StarGuide: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const [selectedItem, setSelectedItem] = useState<GuideItem | null>(null);

  const items: { id: GuideItem; title: string; subtitle: string; color: string }[] = [
    { id: 'polaris', title: t.guidePolaris, subtitle: t.guidePolarisSub, color: 'from-blue-600 to-indigo-800' },
    { id: 'sirius', title: t.guideSirius, subtitle: t.guideSiriusSub, color: 'from-cyan-400 to-blue-600' },
    { id: 'betelgeuse', title: t.guideBetelgeuse, subtitle: t.guideBetelgeuseSub, color: 'from-orange-500 to-red-600' },
    { id: 'rigel', title: t.guideRigel, subtitle: t.guideRigelSub, color: 'from-blue-500 to-cyan-400' },
    { id: 'aldebaran', title: t.guideAldebaran, subtitle: t.guideAldebaranSub, color: 'from-orange-400 to-red-500' },
    { id: 'arcturus', title: t.guideArcturus, subtitle: t.guideArcturusSub, color: 'from-yellow-500 to-orange-600' },
    { id: 'vega', title: t.guideVega, subtitle: t.guideVegaSub, color: 'from-blue-300 to-indigo-400' },
    { id: 'altair', title: t.guideAltair, subtitle: t.guideAltairSub, color: 'from-slate-300 to-blue-300' },
    { id: 'antares', title: t.guideAntares, subtitle: t.guideAntaresSub, color: 'from-red-600 to-orange-700' },
    { id: 'orionNebula', title: t.guideOrionNebula, subtitle: t.guideOrionNebulaSub, color: 'from-purple-500 to-pink-600' },
    { id: 'pleiades', title: t.guidePleiades, subtitle: t.guidePleiadesSub, color: 'from-blue-300 to-indigo-500' },
    { id: 'andromedaGalaxy', title: t.guideAndromedaGalaxy, subtitle: t.guideAndromedaGalaxySub, color: 'from-indigo-600 to-purple-800' },
  ];

  const details = {
    polaris: {
        desc: t.guidePolarisDesc,
        find: t.guidePolarisFind,
        observe: t.guidePolarisObserve,
        fact: t.guidePolarisFact,
        img: new URL('../assets/knowledge/polaris.png', import.meta.url).href
    },
    sirius: {
        desc: t.guideSiriusDesc,
        find: t.guideSiriusFind,
        observe: t.guideSiriusObserve,
        fact: t.guideSiriusFact,
        img: new URL('../assets/knowledge/sirius.png', import.meta.url).href
    },
    betelgeuse: {
        desc: t.guideBetelgeuseDesc,
        find: t.guideBetelgeuseFind,
        observe: t.guideBetelgeuseObserve,
        fact: t.guideBetelgeuseFact,
        img: new URL('../assets/knowledge/betelgeuse.png', import.meta.url).href
    },
    orionNebula: {
        desc: t.guideOrionNebulaDesc,
        find: t.guideOrionNebulaFind,
        observe: t.guideOrionNebulaObserve,
        fact: t.guideOrionNebulaFact,
        img: new URL('../assets/knowledge/orion_nebula.png', import.meta.url).href
    },
    pleiades: {
        desc: t.guidePleiadesDesc,
        find: t.guidePleiadesFind,
        observe: t.guidePleiadesObserve,
        fact: t.guidePleiadesFact,
        img: new URL('../assets/knowledge/pleiades.png', import.meta.url).href
    },
    rigel: {
       desc: t.guideRigelDesc,
       find: t.guideRigelFind,
       observe: t.guideRigelObserve,
       fact: t.guideRigelFact,
       img: new URL('../assets/knowledge/rigel.png', import.meta.url).href
    },
    aldebaran: {
       desc: t.guideAldebaranDesc,
       find: t.guideAldebaranFind,
       observe: t.guideAldebaranObserve,
       fact: t.guideAldebaranFact,
       img: new URL('../assets/knowledge/aldebaran.png', import.meta.url).href
    },
    arcturus: {
       desc: t.guideArcturusDesc,
       find: t.guideArcturusFind,
       observe: t.guideArcturusObserve,
       fact: t.guideArcturusFact,
       img: new URL('../assets/knowledge/arcturus.png', import.meta.url).href
    },
    vega: {
       desc: t.guideVegaDesc,
       find: t.guideVegaFind,
       observe: t.guideVegaObserve,
       fact: t.guideVegaFact,
       img: new URL('../assets/knowledge/vega.png', import.meta.url).href
    },
    altair: {
       desc: t.guideAltairDesc,
       find: t.guideAltairFind,
       observe: t.guideAltairObserve,
       fact: t.guideAltairFact,
       img: new URL('../assets/knowledge/altair.png', import.meta.url).href
    },
    antares: {
       desc: t.guideAntaresDesc,
       find: t.guideAntaresFind,
       observe: t.guideAntaresObserve,
       fact: t.guideAntaresFact,
       img: new URL('../assets/knowledge/antares.png', import.meta.url).href
    },
    andromedaGalaxy: {
       desc: t.guideAndromedaGalaxyDesc,
       find: t.guideAndromedaGalaxyFind,
       observe: t.guideAndromedaGalaxyObserve,
       fact: t.guideAndromedaGalaxyFact,
       img: new URL('../assets/knowledge/andromeda_galaxy.png', import.meta.url).href
    },
  };

  return (
    <div className="absolute inset-0 z-20 h-full w-full pt-20 px-4 pb-24 overflow-y-auto bg-[#0B0D14]">
      {!selectedItem ? (
        <>
            <h2 className="text-3xl font-bold mb-2 text-center text-white">{t.menuGuide}</h2>
            <p className="text-center text-gray-400 mb-8">{t.guideIntro}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setSelectedItem(item.id)}
                        className="relative group overflow-hidden rounded-2xl text-left transition-transform hover:scale-105 shadow-lg border border-white/10"
                    >
                         <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                         {/* Add a subtle image background if available later, for now just gradient */}
                         <div className="relative p-6 h-32 flex flex-col justify-between">
                             <div className="flex justify-between items-start">
                                 <div>
                                     <h3 className="text-2xl font-bold text-white drop-shadow-md">{item.title}</h3>
                                     <p className="text-white/90 text-sm font-medium">{item.subtitle}</p>
                                 </div>
                                 <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                                    <i className="fas fa-arrow-right text-white text-sm"></i>
                                 </div>
                             </div>
                             <div className="self-end opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                <span className="text-xs font-bold text-white bg-black/20 px-2 py-1 rounded-lg backdrop-blur-md">Explore</span>
                             </div>
                         </div>
                    </button>
                ))}
            </div>
        </>
      ) : (
        <div className="max-w-4xl mx-auto animate-fade-in-up-simple pb-10">
            <button 
                onClick={() => setSelectedItem(null)}
                className="mb-6 px-5 py-2.5 bg-white/10 rounded-full text-sm font-bold hover:bg-white/20 transition-all text-white flex items-center gap-2 backdrop-blur-md border border-white/10"
            >
                <i className="fas fa-arrow-left"></i> {t.btnBack}
            </button>

            <div className="bg-[#1a1d2d] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="relative h-64 md:h-96 group">
                    <img 
                        src={details[selectedItem].img} 
                        alt={items.find(i => i.id === selectedItem)?.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d2d] via-transparent to-black/30"></div>
                    <div className="absolute bottom-0 left-0 p-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">{items.find(i => i.id === selectedItem)?.title}</h2>
                        <p className="text-kidrise-orange font-bold text-base uppercase tracking-widest bg-black/50 inline-block px-3 py-1 rounded-lg backdrop-blur-sm border border-kidrise-orange/30">
                            {items.find(i => i.id === selectedItem)?.subtitle}
                        </p>
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                    <section>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed">{details[selectedItem].desc}</p>
                    </section>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <section className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 hover:bg-blue-500/15 transition-colors">
                            <h4 className="flex items-center gap-3 text-blue-400 font-bold mb-3 text-lg">
                                <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center"><i className="fas fa-search-location"></i></span>
                                {t.lblFind}
                            </h4>
                            <p className="text-gray-300 leading-relaxed">{details[selectedItem].find}</p>
                        </section>

                        <section className="bg-green-500/10 p-6 rounded-2xl border border-green-500/20 hover:bg-green-500/15 transition-colors">
                            <h4 className="flex items-center gap-3 text-green-400 font-bold mb-3 text-lg">
                                <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><i className="fas fa-eye"></i></span>
                                {t.lblObserve}
                            </h4>
                            <p className="text-gray-300 leading-relaxed">{details[selectedItem].observe}</p>
                        </section>
                    </div>

                    <section className="bg-gradient-to-br from-kidrise-orange/10 to-yellow-600/10 p-6 rounded-2xl border border-kidrise-orange/20 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-10">
                            <i className="fas fa-lightbulb text-6xl text-kidrise-orange"></i>
                         </div>
                         <h4 className="flex items-center gap-3 text-kidrise-orange font-bold mb-3 text-lg relative z-10">
                            <span className="w-8 h-8 rounded-full bg-kidrise-orange/20 flex items-center justify-center"><i className="fas fa-lightbulb"></i></span>
                            {t.planetFact}
                        </h4>
                        <p className="text-gray-300 leading-relaxed relative z-10 font-medium italic">"{details[selectedItem].fact}"</p>
                    </section>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default StarGuide;
