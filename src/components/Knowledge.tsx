
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import SolarSystem from './knowledge/SolarSystem';
import MoonPhaseLearn from './knowledge/MoonPhaseLearn';
import StarColors from './knowledge/StarColors';
import SpaceScale from './knowledge/SpaceScale';

// New Interactive Modules
import BlackHoleSim from './knowledge/interactive/BlackHoleSim';
import MeteorSim from './knowledge/interactive/MeteorSim';
import CometSim from './knowledge/interactive/CometSim';
import GalaxySim from './knowledge/interactive/GalaxySim';
import NebulaSim from './knowledge/interactive/NebulaSim';
import EclipseSim from './knowledge/interactive/EclipseSim';
import ExplanationCard from './ui/ExplanationCard';

interface KnowledgeProps {
    lang: Language;
}

type ModuleType = 'solar' | 'moon' | 'star' | 'blackhole' | 'meteor' | 'comet' | 'galaxy' | 'nebula' | 'eclipse' | 'spacescale' | null;

const Knowledge: React.FC<KnowledgeProps> = ({ lang }) => {
    const t = translations[lang];
    const [activeModule, setActiveModule] = useState<ModuleType>(null);

    const topics = [
        { id: 'solar', title: t.knowSolar, desc: t.solarDesc, icon: "fa-sun", color: "from-orange-400 to-red-500", size: 'large' },
        { id: 'moon', title: t.knowMoon, desc: t.moonDesc, icon: "fa-moon", color: "from-gray-300 to-slate-400", size: 'small' },
        { id: 'star', title: t.knowStar, desc: t.starDesc, icon: "fa-star", color: "from-blue-400 to-indigo-600", size: 'small' }, 
        
        { id: 'blackhole', title: t.knowBlackHole, desc: t.blackHoleDesc, icon: "fa-circle", color: "from-gray-900 to-black", size: 'large' }, 
        { id: 'galaxy', title: t.knowGalaxy, desc: t.galaxyDesc, icon: "fa-atom", color: "from-purple-500 to-pink-600", size: 'small' },
        { id: 'nebula', title: t.knowNebula, desc: t.nebulaDesc, icon: "fa-cloud", color: "from-fuchsia-500 to-purple-800", size: 'small' },

        { id: 'eclipse', title: t.knowEclipse, desc: t.eclipseDesc, icon: "fa-adjust", color: "from-yellow-400 to-orange-600", size: 'small' },
        { id: 'comet', title: t.knowComet, desc: t.cometDesc, icon: "fa-star-of-life", color: "from-cyan-400 to-blue-500", size: 'small' },
        { id: 'spacescale', title: t.scaleTitle || 'Space Scale', desc: t.scaleDesc || 'Gravity Checker', icon: "fa-weight-hanging", color: "from-rose-500 to-red-600", size: 'wide' },
        { id: 'meteor', title: t.knowMeteor, desc: t.meteorDesc, icon: "fa-meteor", color: "from-teal-400 to-emerald-600", size: 'small' },
    ];

    // Reset scroll when entering/exiting a module
    React.useEffect(() => {
        document.querySelector('main')?.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }, [activeModule]);

    if (activeModule) {
        return (
            <div className="min-h-full pt-16 px-4 pb-16 flex flex-col">
                <div className="flex-1 w-full max-w-5xl mx-auto bg-[#1a1d2d]/80 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl relative">
                     {/* Dynamic Background based on type */}
                     <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-gradient-to-br from-indigo-900 to-black"></div>

                     {/* Back Button (Moved Inside) */}
                     <div className="absolute top-6 left-6 z-50">
                        <button 
                            onClick={() => setActiveModule(null)}
                            className="px-4 py-2 bg-black/40 hover:bg-black/60 rounded-xl text-sm font-bold text-white transition-all flex items-center gap-2 backdrop-blur-md border border-white/10 shadow-lg group"
                        >
                            <i className="fas fa-chevron-left group-hover:-translate-x-1 transition-transform"></i>
                            {t.btnBack || 'Back'}
                        </button>
                     </div>

                    {/* Content Container */}
                     <div className="relative z-10 w-full h-full p-4 md:p-8 flex flex-col pt-16 md:pt-8">
                        {activeModule === 'solar' && <SolarSystem lang={lang} expl={t.expl?.solar} />}
                        {activeModule === 'moon' && <MoonPhaseLearn lang={lang} expl={t.expl?.moonPhase} />}
                        {activeModule === 'star' && <StarColors lang={lang} expl={t.expl?.starColor} />}
                        {activeModule === 'spacescale' && <SpaceScale lang={lang} expl={t.expl?.spaceScale} onBack={() => setActiveModule(null)} />}
                        
                       {/* Interactive Modules */}
                        {activeModule === 'blackhole' && (
                            <InteractiveWrapper title={t.knowBlackHole} desc={t.blackHoleDesc} explanation={t.expl?.blackHole}>
                                <BlackHoleSim lang={lang} />
                            </InteractiveWrapper>
                        )}
                        {activeModule === 'meteor' && (
                            <InteractiveWrapper title={t.knowMeteor} desc={t.meteorDesc} explanation={t.expl?.meteor}>
                                <MeteorSim lang={lang} />
                            </InteractiveWrapper>
                        )}
                         {activeModule === 'comet' && (
                            <InteractiveWrapper title={t.knowComet} desc={t.cometDesc} explanation={t.expl?.comet}>
                                <CometSim lang={lang} />
                            </InteractiveWrapper>
                        )}
                         {activeModule === 'galaxy' && (
                            <InteractiveWrapper title={t.knowGalaxy} desc={t.galaxyDesc} explanation={t.expl?.galaxy}>
                                <GalaxySim lang={lang} />
                            </InteractiveWrapper>
                        )}
                         {activeModule === 'nebula' && (
                            <InteractiveWrapper title={t.knowNebula} desc={t.nebulaDesc} explanation={t.expl?.nebula}>
                                <NebulaSim lang={lang} />
                            </InteractiveWrapper>
                        )}
                        {activeModule === 'eclipse' && (
                            <InteractiveWrapper title={t.knowEclipse} desc={t.eclipseDesc} explanation={t.expl?.eclipse}>
                                <EclipseSim lang={lang} />
                            </InteractiveWrapper>
                        )}
                     </div>
                </div>
            </div>
        );
    }

  return (
    <div className="pt-20 px-4 pb-20 max-w-6xl mx-auto">
       <div className="text-center mb-6">
            <h2 className="text-4xl font-black mb-2 text-white tracking-tight drop-shadow-lg">{t.menuLearn}</h2>
            <p className="text-blue-200">{t.interactive?.tapCard || 'Tap a card to start your space adventure!'}</p>
       </div>

       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px]">
           {topics.map((item, i) => (
               <div 
                 key={i} 
                 onClick={() => setActiveModule(item.id as ModuleType)}
                 className={`
                    relative group cursor-pointer rounded-3xl overflow-hidden border border-white/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-white/30
                    ${item.size === 'large' ? 'col-span-2 row-span-2' : ''}
                    ${item.size === 'wide' ? 'col-span-2 row-span-1' : ''}
                    ${item.size === 'small' ? 'col-span-1 row-span-1' : ''}
                 `}
               >
                   {/* Background Gradient */}
                   <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                   
                   {/* Decorative Icon (Large Faded) */}
                   <i className={`fas ${item.icon} absolute -bottom-6 -right-6 text-[8rem] text-white opacity-10 rotate-12 group-hover:rotate-6 transition-transform duration-500`}></i>

                   {/* Content */}
                   <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl text-white shadow-inner mb-4">
                            <i className={`fas ${item.icon}`}></i>
                        </div>
                        <div>
                            <h3 className={`${item.size === 'large' ? 'text-3xl' : 'text-xl'} font-bold text-white mb-2 leading-tight shadow-black drop-shadow-md`}>{item.title}</h3>
                            <p className="text-white/80 text-xs font-medium line-clamp-2 md:text-sm">{item.desc}</p>
                        </div>
                   </div>
               </div>
           ))}
       </div>
    </div>
  );
};

// Wrapper for interactive components to give them a consistent header/layout
interface WrapperProps {
    title: string;
    desc: string;
    children: React.ReactNode;
    explanation?: { what: string; why: string; anim: string };
}

const InteractiveWrapper: React.FC<WrapperProps> = ({title, desc, children, explanation}) => {
    return (
        <div className="w-full h-full flex flex-col overflow-y-auto custom-scrollbar">
            <div className="mb-6 text-center shrink-0">
                <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
                <p className="text-blue-200">{desc}</p>
            </div>
            
            {/* Detailed Explanation */}
            {explanation && (
                <div className="mb-6 shrink-0 z-20 relative">
                    <ExplanationCard 
                        what={explanation.what}
                        why={explanation.why}
                        anim={explanation.anim}
                    />
                </div>
            )}
            
            {/* Simulation Container */}
            <div className="w-full min-h-[400px] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative bg-black/50 backdrop-blur-xl shrink-0">
                {children}
            </div>
        </div>
    );
};

export default Knowledge;
