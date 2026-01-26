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

  return (
    <div className="absolute inset-0 z-40 bg-[#0B0D17] text-white flex flex-col pt-16 pb-20 overflow-hidden">
      
      {/* Header Bar */}
      <div className="px-6 md:px-12 py-4 flex justify-between items-center bg-white/5 border-b border-white/10 backdrop-blur-md z-50">
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
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
          
          {/* Sidebar (Desktop) / Topbar (Mobile) */}
          <div className="w-full md:w-64 lg:w-72 bg-[#050608]/80 backdrop-blur-xl border-r border-white/10 flex flex-col overflow-y-auto no-scrollbar md:flex-shrink-0">
             
             {/* Mobile: Horizontal Scroll. Desktop: Vertical List */}
             <div className="flex md:flex-col p-2 md:p-4 gap-2 overflow-x-auto md:overflow-x-visible">
                 {data.map((section) => (
                     <button
                        key={section.id}
                        onClick={() => setActiveTabId(section.id)}
                        className={`
                            flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left shrink-0 md:shrink
                            ${activeTabId === section.id 
                                ? 'bg-gradient-to-r from-cyan-900/60 to-blue-900/60 border border-cyan-500/50 text-white shadow-lg shadow-cyan-900/20' 
                                : 'hover:bg-white/5 text-gray-400 hover:text-white border border-transparent'
                            }
                        `}
                     >
                         <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${activeTabId === section.id ? 'bg-cyan-500 text-black' : 'bg-white/10 text-gray-400'}`}>
                             <i className={`fas ${section.icon}`}></i>
                         </div>
                         <span className={`font-bold text-sm ${activeTabId === section.id ? 'text-cyan-100' : ''}`}>{section.title}</span>
                     </button>
                 ))}
             </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 scroll-smooth relative">
              
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

              <div key={activeTabId} className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
                  
                  {/* Title Header */}
                  <div className="border-l-4 border-cyan-500 pl-6 py-2 mb-8">
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{activeSection.title}</h2>
                      <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-transparent rounded-full"></div>
                  </div>

                  {/* Content Blocks */}
                  <div className="grid grid-cols-1 gap-6">
                      {activeSection.content.map((block, idx) => (
                          <div 
                            key={idx} 
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.07] transition-colors group"
                          >
                              {block.subtitle && (
                                  <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                                      {block.subtitle}
                                      <i className="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-50 transition-opacity -translate-x-2 group-hover:translate-x-0"></i>
                                  </h3>
                              )}
                              
                              <p className="text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-line">
                                  {block.text}
                              </p>

                              {block.tips && (
                                  <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start gap-3">
                                      <i className="fas fa-lightbulb text-yellow-400 mt-1"></i>
                                      <p className="text-yellow-100/80 text-sm font-medium">{block.tips}</p>
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>

                  {/* Footer Decoration */}
                  <div className="flex justify-center mt-12 opacity-30">
                      <div className="w-16 h-1 bg-white/20 rounded-full"></div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default TelescopeManual;
