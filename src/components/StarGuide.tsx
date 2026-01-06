import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';

interface Props {
  lang: Language;
}

type GuideItem = 'polaris' | 'sirius' | 'betelgeuse' | 'orionNebula' | 'pleiades';

const StarGuide: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const [selectedItem, setSelectedItem] = useState<GuideItem | null>(null);

  const items: { id: GuideItem; title: string; subtitle: string; color: string }[] = [
    { id: 'polaris', title: t.guidePolaris, subtitle: t.guidePolarisSub, color: 'from-blue-600 to-indigo-800' },
    { id: 'sirius', title: t.guideSirius, subtitle: t.guideSiriusSub, color: 'from-cyan-400 to-blue-600' },
    { id: 'betelgeuse', title: t.guideBetelgeuse, subtitle: t.guideBetelgeuseSub, color: 'from-orange-500 to-red-600' },
    { id: 'orionNebula', title: t.guideOrionNebula, subtitle: t.guideOrionNebulaSub, color: 'from-purple-500 to-pink-600' },
    { id: 'pleiades', title: t.guidePleiades, subtitle: t.guidePleiadesSub, color: 'from-blue-300 to-indigo-500' },
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
    }
  };

  return (
    <div className="h-full pt-20 px-4 pb-24 overflow-y-auto">
      {!selectedItem ? (
        <>
            <h2 className="text-3xl font-bold mb-2 text-center text-white">{t.menuGuide}</h2>
            <p className="text-center text-gray-400 mb-8">{t.guideIntro}</p>

            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setSelectedItem(item.id)}
                        className="relative group overflow-hidden rounded-2xl text-left transition-transform hover:scale-105"
                    >
                         <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                         <div className="relative p-5 flex items-center justify-between">
                             <div>
                                 <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                 <p className="text-white/80 text-sm">{item.subtitle}</p>
                             </div>
                             <i className="fas fa-chevron-right text-white/50"></i>
                         </div>
                    </button>
                ))}
            </div>
        </>
      ) : (
        <div className="max-w-2xl mx-auto animate-fade-in-up">
            <button 
                onClick={() => setSelectedItem(null)}
                className="mb-4 px-4 py-2 bg-white/10 rounded-full text-sm font-bold hover:bg-white/20 transition-colors text-white"
            >
                <i className="fas fa-arrow-left mr-2"></i> {t.btnBack}
            </button>

            <div className="bg-[#1a1d2d] rounded-3xl overflow-hidden border border-white/10">
                <div className="relative h-64 md:h-80">
                    <img 
                        src={details[selectedItem].img} 
                        alt={items.find(i => i.id === selectedItem)?.title} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d2d] to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                        <h2 className="text-3xl font-bold text-white">{items.find(i => i.id === selectedItem)?.title}</h2>
                        <p className="text-kidrise-orange font-bold text-sm uppercase tracking-wider">{items.find(i => i.id === selectedItem)?.subtitle}</p>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <section>
                        <p className="text-gray-300 text-lg leading-relaxed">{details[selectedItem].desc}</p>
                    </section>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <section className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <h4 className="flex items-center gap-2 text-blue-400 font-bold mb-2">
                                <i className="fas fa-search-location"></i> {t.lblFind}
                            </h4>
                            <p className="text-sm text-gray-300">{details[selectedItem].find}</p>
                        </section>

                        <section className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <h4 className="flex items-center gap-2 text-green-400 font-bold mb-2">
                                <i className="fas fa-eye"></i> {t.lblObserve}
                            </h4>
                            <p className="text-sm text-gray-300">{details[selectedItem].observe}</p>
                        </section>
                    </div>

                    <section className="bg-kidrise-orange/10 p-4 rounded-xl border border-kidrise-orange/20">
                         <h4 className="flex items-center gap-2 text-kidrise-orange font-bold mb-2">
                            <i className="fas fa-lightbulb"></i> {t.planetFact}
                        </h4>
                        <p className="text-sm text-gray-300">{details[selectedItem].fact}</p>
                    </section>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default StarGuide;
