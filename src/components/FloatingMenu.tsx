import React from 'react';
import { translations } from '../utils/i18n';
import { Language } from '../types';

type Page = 'starmap' | 'planner' | 'compass' | 'knowledge' | 'guide' | 'quiz';

interface FloatingMenuProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  lang: Language;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ currentPage, onNavigate, lang }) => {
    const t = translations[lang];
    const [isExpanded, setIsExpanded] = React.useState(false);

    const menuItems: { id: Page; label: string; icon: string }[] = [
    { id: 'starmap', label: t.menuMap || 'Star Map', icon: 'fa-map' },
    { id: 'planner', label: t.menuPlanner || 'Planner', icon: 'fa-calendar-alt' },
    { id: 'compass', label: t.menuCompass || 'Compass', icon: 'fa-compass' },
    { id: 'knowledge', label: t.menuLearn || 'Learn', icon: 'fa-book-open' },
    { id: 'guide', label: t.menuGuide || 'Guide', icon: 'fa-binoculars' },
    { id: 'quiz', label: t.menuQuiz || 'Quiz', icon: 'fa-puzzle-piece' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Expanded Menu */}
      <div className={`flex flex-col gap-3 mb-4 transition-all duration-300 origin-bottom-right ${isExpanded ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} pointer-events-auto`}>
         {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
                onNavigate(item.id);
                setIsExpanded(false);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-xl transition-all ${
              currentPage === item.id
                ? 'bg-kidrise-orange text-white'
                : 'bg-[#161825]/90 backdrop-blur-md text-gray-200 hover:bg-white/10'
            }`}
          >
            <span className="text-sm font-bold">{item.label}</span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === item.id ? 'bg-white/20' : 'bg-white/5'}`}>
                 <i className={`fas ${item.icon}`}></i>
            </div>
          </button>
        ))}
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`pointer-events-auto w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
            isExpanded ? 'bg-gray-700 text-white rotate-90' : 'bg-kidrise-orange text-white'
        }`}
      >
        <i className={`fas ${isExpanded ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

    </div>
  );
};

export default FloatingMenu;
