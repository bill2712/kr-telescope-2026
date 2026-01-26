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
    <div className="w-full text-white flex flex-col pt-24 pb-20 max-w-7xl mx-auto px-4 lg:px-8">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-[#161825]/80 border border-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-xl">
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

      <div className="flex flex-col lg:flex-row gap-8 relative">
          
          {/* Sidebar (Desktop Sticky / Mobile Scroll) */}
          <div className="w-full lg:w-72 flex-shrink-0">
             <div className="lg:sticky lg:top-32 bg-[#161825]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible shadow-lg">
                 {data.map((section) => (
                     <button
                        key={section.id}
                        onClick={() => setActiveTabId(section.id)}
                        className={`
                            flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left shrink-0
                            ${activeTabId === section.id 
                                ? 'bg-gradient-to-r from-cyan-900/60 to-blue-900/60 border border-cyan-500/50 text-white shadow-lg shadow-cyan-900/20' 
                                : 'hover:bg-white/5 text-gray-400 hover:text-white border border-transparent'
                            }
                        `}
                     >
                         <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${activeTabId === section.id ? 'bg-cyan-500 text-black' : 'bg-white/10 text-gray-400'}`}>
                             <i className={`fas ${section.icon}`}></i>
                         </div>
                         <span className={`font-bold text-sm whitespace-nowrap ${activeTabId === section.id ? 'text-cyan-100' : ''}`}>{section.title}</span>
                     </button>
                 ))}
             </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
              
              {/* Background Glow */}
              <div className="fixed top-1/2 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen z-0"></div>

              <div key={activeTabId} className="space-y-8 animate-fadeIn relative z-10">
                  
                  {/* Title Header */}
                  <div className="border-l-4 border-cyan-500 pl-6 py-2 mb-8 bg-gradient-to-r from-white/5 to-transparent rounded-r-xl">
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{activeSection.title}</h2>
                      <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-transparent rounded-full"></div>
                  </div>

                  {/* Content Blocks */}
                  <div className="grid grid-cols-1 gap-6">
                      {activeSection.content.map((block, idx) => (
                          <div 
                            key={idx} 
                            className="bg-[#161825]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.07] transition-colors group shadow-lg"
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
                                  <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start gap-3">
                                      <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                                        <i className="fas fa-lightbulb text-yellow-400 text-sm"></i>
                                      </div>
                                      <p className="text-yellow-100/80 text-sm font-medium pt-1">{block.tips}</p>
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
