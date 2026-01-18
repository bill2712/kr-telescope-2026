import React, { useState } from 'react';
import { translations } from '../../utils/i18n';
import { Language } from '../../types';

interface TelescopeManualProps {
  lang: Language;
  onClose: () => void;
}

const TelescopeManual: React.FC<TelescopeManualProps> = ({ lang, onClose }) => {
  const t = translations[lang];
  const m = t.manual;
  const [activeSection, setActiveSection] = useState<'intro' | 'components' | 'assembly' | 'nightSky' | 'solar' | 'observing'>('intro');

  const SectionButton: React.FC<{ id: string; label: string; active: boolean; onClick: () => void }> = ({ id, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
        active 
          ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' 
          : 'bg-white/10 text-cyan-200 hover:bg-white/20'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="absolute inset-0 z-40 bg-[#0B0D17] text-white flex flex-col pt-24 pb-24 overflow-hidden">
      {/* Header */}
      <div className="px-6 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-wider">
            {m.title}
          </h1>
          <p className="text-xs text-cyan-300/70 font-bold tracking-widest uppercase">
            {m.subtitle}
          </p>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-colors"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 mb-6 overflow-x-auto no-scrollbar pb-2">
        <div className="flex gap-3">
          <SectionButton 
            id="intro" 
            label={m.intro} 
            active={activeSection === 'intro'} 
            onClick={() => setActiveSection('intro')} 
          />
          <SectionButton 
            id="components" 
            label={m.componentsTitle} 
            active={activeSection === 'components'} 
            onClick={() => setActiveSection('components')} 
          />
          <SectionButton 
            id="assembly" 
            label={m.assemblyTitle} 
            active={activeSection === 'assembly'} 
            onClick={() => setActiveSection('assembly')} 
          />
          <SectionButton 
            id="nightSky" 
            label={m.nightSkyTitle} 
            active={activeSection === 'nightSky'} 
            onClick={() => setActiveSection('nightSky')} 
          />
          <SectionButton 
            id="solar" 
            label={m.solarSystemTitle} 
            active={activeSection === 'solar'} 
            onClick={() => setActiveSection('solar')} 
          />
          <SectionButton 
            id="observing" 
            label={m.observingTitle} 
            active={activeSection === 'observing'} 
            onClick={() => setActiveSection('observing')} 
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-12 space-y-8 scroll-smooth">
        
        {activeSection === 'intro' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
              <h2 className="text-xl font-bold text-cyan-300 mb-2">{m.features}</h2>
              <p className="text-gray-300 leading-relaxed">{m.featuresDesc}</p>
              <div className="mt-4 flex gap-2 flex-wrap">
                {m.specs.split('|').map((spec, i) => (
                  <span key={i} className="px-3 py-1 bg-cyan-500/20 rounded-md text-xs font-mono text-cyan-200 border border-cyan-500/30">
                    {spec.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-orange-400 mb-2">{m.careTitle}</h3>
              <p className="text-gray-300 text-sm">{m.careDesc}</p>
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex gap-3 items-start">
                 <i className="fas fa-exclamation-triangle text-red-400 mt-1"></i>
                 <p className="text-red-200 text-sm font-bold">{m.caution}</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'components' && (
          <div className="space-y-6 animate-fadeIn">
             <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
               <h3 className="text-lg font-bold text-cyan-300 mb-4">{m.componentsTitle}</h3>
               <div className="grid grid-cols-2 gap-3 text-sm">
                 {Object.entries(m.parts).map(([key, value]) => (
                   <div key={key} className="flex items-center gap-2 text-gray-300">
                     <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                     {value as string}
                   </div>
                 ))}
               </div>
             </div>
          </div>
        )}

        {activeSection === 'assembly' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
               <h3 className="text-lg font-bold text-cyan-300 mb-4">{m.assemblyTitle}</h3>
               <div className="space-y-4">
                 {Object.entries(m.assemblySteps).map(([key, value]) => (
                   <div key={key} className="p-4 bg-black/20 rounded-xl border border-white/5">
                     <p className="font-bold text-cyan-100">{value as string}</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

        {activeSection === 'nightSky' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-b from-indigo-900/40 to-purple-900/40 rounded-3xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">{m.nightSkyTitle}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">{m.nightSkyDesc}</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="font-bold text-orange-300 mb-2">{m.measuringSpaceTitle}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{m.measuringSpaceDesc}</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="font-bold text-yellow-300 mb-2">{m.brightStarsTitle}</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">{m.brightStarsDesc}</p>
              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <p className="text-blue-200 text-xs italic">{m.pleiadesDesc}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h4 className="font-bold text-purple-300 mb-2">{m.galaxiesTitle}</h4>
                <p className="text-gray-400 text-sm">{m.galaxiesDesc}</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h4 className="font-bold text-green-300 mb-2">{m.changingSkyTitle}</h4>
                <p className="text-gray-400 text-sm">{m.changingSkyDesc}</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'solar' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 rounded-3xl p-6 border border-orange-500/20">
              <h3 className="text-xl font-bold text-orange-200 mb-2">{m.solarSystemTitle}</h3>
              <p className="text-orange-100/80 mb-4 leading-relaxed">{m.solarSystemDesc}</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="font-bold text-cyan-300 mb-2">{m.planetsMoonsTitle}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{m.planetsMoonsDesc}</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="font-bold text-gray-200 mb-2">{m.moonTitle}</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">{m.moonDesc}</p>
              <div className="p-3 bg-gray-800 rounded-xl border border-gray-700">
                <p className="text-gray-300 text-xs">{m.moonPhases}</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="font-bold text-yellow-200 mb-2">{m.eclipseTitle}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{m.eclipseDesc}</p>
            </div>
          </div>
        )}

        {activeSection === 'observing' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-green-900/20 rounded-3xl p-6 border border-green-500/20">
              <h3 className="text-xl font-bold text-green-300 mb-4">{m.observingTitle}</h3>
              <div className="space-y-3">
                 {Object.entries(m.observingSteps).map(([key, value]) => (
                   <div key={key} className="flex gap-3">
                     <p className="text-gray-300 text-sm">{value as string}</p>
                   </div>
                 ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="font-bold text-blue-300 mb-2">{m.usingTelescopeTitle}</h4>
              <p className="text-gray-400 text-sm mb-3">{m.telescopeTypesDesc}</p>
              <div className="space-y-2">
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <span className="text-blue-300 font-bold block text-xs mb-1">REFRACTOR</span>
                  <p className="text-blue-100 text-xs">{m.refractorDesc}</p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <span className="text-purple-300 font-bold block text-xs mb-1">REFLECTOR</span>
                  <p className="text-purple-100 text-xs">{m.reflectorDesc}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="font-bold text-orange-300 mb-2">{m.powerTitle}</h4>
              <p className="text-gray-400 text-sm">{m.powerDesc}</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-8 text-center opacity-50">
          <p className="text-[10px] tracking-widest uppercase">{m.footer}</p>
          <p className="text-[10px] mt-1 text-cyan-500">{m.kidrise}</p>
        </div>

      </div>
    </div>
  );
};

export default TelescopeManual;
