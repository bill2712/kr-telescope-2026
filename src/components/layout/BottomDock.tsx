import React from 'react';
import { translations } from '../../utils/i18n';
import { Language } from '../../types';

// We define our pages in a separate type or reuse existing one, 
// for now let's assume specific strings we will adapt App.tsx to.
type Page = 'starmap' | 'planner' | 'learn' | 'quiz' | 'guide';

interface BottomDockProps {
  lang: Language;
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const BottomDock: React.FC<BottomDockProps> = ({ lang, activePage, onNavigate }) => {
  const t = translations[lang];

  const items: { id: Page; icon: string; label: string; color: string }[] = [
    { id: 'starmap', icon: 'fa-globe-asia', label: t.menuMap, color: 'text-blue-400' },
    { id: 'planner', icon: 'fa-calendar-alt', label: t.menuPlanner, color: 'text-green-400' },
    { id: 'learn', icon: 'fa-book-open', label: t.menuLearn, color: 'text-purple-400' },
    { id: 'guide', icon: 'fa-scroll', label: t.menuGuide, color: 'text-cyan-400' },
    { id: 'quiz', icon: 'fa-rocket', label: t.menuQuiz, color: 'text-orange-400' }
  ];

  return (
    <div className="fixed bottom-6 left-4 right-4 z-50 md:top-1/2 md:-translate-y-1/2 md:left-4 md:right-auto md:bottom-auto md:w-auto">
      <div className="bg-[#161825]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-2 flex justify-around items-center max-w-lg mx-auto md:flex-col md:gap-4 md:p-3">
        {items.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300 w-20 
                ${isActive ? 'bg-white/10 scale-110 -translate-y-2 pb-4 shadow-lg ring-1 ring-white/10' : 'hover:bg-white/5 opacity-70 hover:opacity-100 hover:scale-105'}`}
            >
              <div className={`text-2xl mb-1 filter drop-shadow-md ${isActive ? item.color : 'text-gray-300'}`}>
                <i className={`fas ${item.icon}`}></i>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-gray-400'}`}>
                {item.label}
              </span>
              
              {/* Active Indicator Dot */}
              {isActive && (
                <div className={`absolute bottom-1.5 w-1 h-1 rounded-full ${item.color.replace('text-', 'bg-')}`}></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomDock;
