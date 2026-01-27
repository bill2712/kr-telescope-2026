import React, { useState } from 'react';
import { translations } from '../../utils/i18n';
import { Language } from '../../types';
import { encyclopediaData } from '../../data/encyclopediaData';

interface TelescopeManualProps {
  lang: Language;
  onClose: () => void;
}

const TelescopeManual: React.FC<TelescopeManualProps> = ({ lang, onClose }) => {
  const t = translations[lang];
  const data = encyclopediaData[lang];
  const [activeTabId, setActiveTabId] = useState<string>(data[0].id);

  // Find active content
  const activeSection = data.find(s => s.id === activeTabId) || data[0];

  // Scroll to top when switching tabs
  React.useEffect(() => {
    document.querySelector('main')?.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [activeTabId]);

  return (
    <div className="w-full text-white flex flex-col pt-4 md:pt-20 pb-10 max-w-7xl mx-auto px-4 lg:px-8 h-[100dvh] md:h-auto overflow-y-auto md:overflow-visible custom-scrollbar">
      
      {/* Mobile Header (Sticky & Compact) */}
      <div className="md:hidden sticky top-0 z-50 bg-[#0B0D14]/90 backdrop-blur-xl border-b border-white/10 -mx-4 px-4 py-3 flex justify-between items-center mb-6 shadow-2xl">
          <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <i className="fas fa-book-open text-white text-xs"></i>
              </div>
              <h1 className="text-lg font-bold text-white tracking-wide">
                  {t.menuEncyclopedia}
              </h1>
          </div>
          <button 
             onClick={onClose}
             className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors border border-white/5 active:scale-95"
          >
             <i className="fas fa-times"></i>
          </button>
      </div>

      {/* Desktop Header Bar (Original) */}
      <div className="hidden md:flex flex-col md:flex-row justify-between items-center bg-[#161825]/80 border border-white/10 backdrop-blur-md rounded-2xl p-4 mb-4 shadow-xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-wider">
            {t.menuEncyclopedia}
          </h1>
          <p className="text-xs text-cyan-300/70 font-bold tracking-widest uppercase mt-1">
             KIDRISE TELESCOPE ACADEMY
          </p>
        </div>
        <button 
          onClick={onClose}
          className="mt-4 md:mt-0 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-sm font-bold flex items-center gap-2"
        >
          <i className="fas fa-arrow-left"></i> {t.btnBack}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 relative">
          
          {/* Navigation Tabs (Mobile: Horizontal Scroll / Desktop: Sticky Sidebar) */}
          <div className="w-full lg:w-72 flex-shrink-0 sticky top-[60px] md:static z-40">
             <div className="bg-[#161825]/90 md:bg-[#161825]/90 backdrop-blur-xl border border-white/10 rounded-xl p-1.5 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible shadow-lg no-scrollbar md:custom-scrollbar">
                 {data.map((section) => (
                     <button
                        key={section.id}
                        onClick={() => {
                            setActiveTabId(section.id);
                            // On mobile, maybe scroll slightly up to content but not needed if sticky header
                        }}
                        className={`
                            flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-300 text-left shrink-0 whitespace-nowrap lg:whitespace-normal
                            ${activeTabId === section.id 
                                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md' 
                                : 'hover:bg-white/5 text-slate-400 hover:text-white'
                            }
                        `}
                     >
                         <div className={`w-6 h-6 rounded flex items-center justify-center text-xs shrink-0 ${activeTabId === section.id ? 'bg-black/20 text-white' : 'bg-white/5 text-slate-500'}`}>
                             <i className={`fas ${section.icon}`}></i>
                         </div>
                         <span className={`font-bold text-sm ${activeTabId === section.id ? 'text-white' : ''}`}>{section.title}</span>
                     </button>
                 ))}
             </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0 pb-20 md:pb-0">
              
              <div key={activeTabId} className="space-y-6 animate-fade-in relative z-10">
                  
                  {/* Section Title Header */}
                  <div className="flex items-center gap-4 mb-2">
                       <div className="h-8 w-1 bg-cyan-500 rounded-full"></div>
                       <h2 className="text-2xl md:text-4xl font-black text-white">{activeSection.title}</h2>
                  </div>

                  {/* Content Blocks */}
                  <div className="grid grid-cols-1 gap-4 md:gap-6">
                      {activeSection.content.map((block, idx) => (
                          <div 
                            key={idx} 
                            className="bg-[#161825] border border-white/10 rounded-2xl p-5 md:p-8 hover:bg-[#1c1f2e] transition-colors shadow-sm"
                          >
                              {block.subtitle && (
                                  <h3 className="text-lg md:text-xl font-bold text-cyan-300 mb-3 flex items-center gap-2">
                                      {block.subtitle}
                                  </h3>
                              )}
                              
                              <p className="text-slate-300 leading-relaxed text-sm md:text-lg whitespace-pre-line">
                                  {block.text}
                              </p>

                              {block.tips && (
                                  <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
                                      <i className="fas fa-lightbulb text-amber-400 mt-1 shrink-0"></i>
                                      <p className="text-amber-100/80 text-sm font-medium">{block.tips}</p>
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>

                  {/* End Decoration */}
                  <div className="flex justify-center mt-12 opacity-20">
                      <i className="fas fa-star text-white text-xs"></i>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default TelescopeManual;
