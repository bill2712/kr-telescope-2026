
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import SolarSystem from './knowledge/SolarSystem';
import MoonPhaseLearn from './knowledge/MoonPhaseLearn';
import StarColors from './knowledge/StarColors';
import SimpleModule from './knowledge/SimpleModule';

interface KnowledgeProps {
    lang: Language;
}

type ModuleType = 'solar' | 'moon' | 'star' | 'blackhole' | 'meteor' | 'comet' | 'galaxy' | 'nebula' | 'eclipse' | 'constellation' | null;

const Knowledge: React.FC<KnowledgeProps> = ({ lang }) => {
    const t = translations[lang];
    const [activeModule, setActiveModule] = useState<ModuleType>(null);

    const topics = [
        { id: 'solar', title: t.knowSolar, desc: t.solarDesc, icon: "fa-sun", color: "from-yellow-400 to-orange-500" },
        { id: 'moon', title: t.knowMoon, desc: t.moonDesc, icon: "fa-moon", color: "from-gray-300 to-gray-500" },
        { id: 'star', title: t.knowStar, desc: t.starDesc, icon: "fa-star", color: "from-blue-400 to-purple-500" }, 
        
        { id: 'blackhole', title: t.knowBlackHole, desc: t.blackHoleDesc, icon: "fa-circle", color: "from-gray-900 to-purple-900" },
        { id: 'meteor', title: t.knowMeteor, desc: t.meteorDesc, icon: "fa-meteor", color: "from-teal-400 to-blue-500" },
        { id: 'comet', title: t.knowComet, desc: t.cometDesc, icon: "fa-star-of-life", color: "from-cyan-300 to-blue-400" },
        { id: 'galaxy', title: t.knowGalaxy, desc: t.galaxyDesc, icon: "fa-atom", color: "from-pink-500 to-purple-600" },
        { id: 'nebula', title: t.knowNebula, desc: t.nebulaDesc, icon: "fa-cloud", color: "from-purple-400 to-pink-400" },
        { id: 'eclipse', title: t.knowEclipse, desc: t.eclipseDesc, icon: "fa-adjust", color: "from-yellow-200 to-black" },
        { id: 'constellation', title: t.knowConstellation, desc: t.constellationDesc, icon: "fa-project-diagram", color: "from-indigo-400 to-blue-600" },
    ];

    if (activeModule) {
        return (
            <div className="h-full pt-20 px-4 pb-24 flex flex-col">
                <button 
                  onClick={() => setActiveModule(null)}
                  className="self-start mb-4 px-4 py-2 bg-white/10 rounded-full text-sm font-bold hover:bg-white/20 transition-colors"
                >
                    <i className="fas fa-arrow-left mr-2"></i> Back
                </button>
                <div className="flex-1 overflow-hidden">
                    {activeModule === 'solar' && <SolarSystem lang={lang} />}
                    {activeModule === 'moon' && <MoonPhaseLearn lang={lang} />}
                    {activeModule === 'star' && <StarColors lang={lang} />}
                    
                    {(['blackhole', 'meteor', 'comet', 'galaxy', 'nebula', 'eclipse', 'constellation'] as const).includes(activeModule as any) && (
                        <SimpleModule lang={lang} type={activeModule as any} />
                    )}
                </div>
            </div>
        );
    }

  return (
    <div className="h-full overflow-y-auto pt-24 px-4 pb-32">
       <h2 className="text-3xl font-bold mb-2 text-center text-white">{t.menuLearn}</h2>
       <p className="text-center text-gray-400 mb-8">Tap a card to start learning!</p>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
           {topics.map((item, i) => (
               <div 
                 key={i} 
                 onClick={() => setActiveModule(item.id as ModuleType)}
                 className="relative group cursor-pointer"
               >
                   <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                   <div className="relative bg-[#1a1d2d] border border-white/10 rounded-3xl p-4 flex items-center gap-4 hover:-translate-y-1 transition-transform overflow-hidden min-h-[100px]">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl text-white shadow-lg shrink-0`}>
                            <i className={`fas ${item.icon}`}></i>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-0.5 leading-tight">{item.title}</h3>
                            <p className="text-xs text-gray-400 line-clamp-2">{item.desc}</p>
                        </div>
                   </div>
               </div>
           ))}
       </div>
    </div>
  );
};

export default Knowledge;
