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

    const menuItems: { id: Page; label: string; icon: string; color: string }[] = [
    { id: 'starmap', label: t.menuMap || 'Star Map', icon: 'fa-map', color: 'bg-blue-500' },
    { id: 'planner', label: t.menuPlanner || 'Planner', icon: 'fa-calendar-alt', color: 'bg-green-500' },
    { id: 'compass', label: t.menuCompass || 'Compass', icon: 'fa-compass', color: 'bg-red-500' },
    { id: 'knowledge', label: t.menuLearn || 'Learn', icon: 'fa-book-open', color: 'bg-purple-500' },
    { id: 'guide', label: t.menuGuide || 'Guide', icon: 'fa-binoculars', color: 'bg-yellow-500' },
    { id: 'quiz', label: t.menuQuiz || 'Quiz', icon: 'fa-puzzle-piece', color: 'bg-orange-500' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Expanded Menu */}
      <div className={`flex flex-col gap-4 mb-4 transition-all duration-300 origin-bottom-right ${isExpanded ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} pointer-events-auto`}>
         {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
                onNavigate(item.id);
                setIsExpanded(false);
            }}
            className={`flex items-center gap-4 pl-6 pr-2 py-2 rounded-full shadow-xl transition-all transform hover:scale-105 ${
              currentPage === item.id
                ? 'bg-white text-black'
                : 'bg-[#1a1d2d]/95 backdrop-blur-md text-white border border-white/10'
            }`}
          >
            <span className={`text-lg font-bold ${currentPage === item.id ? 'text-black' : 'text-gray-100'}`}>{item.label}</span>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg text-white text-xl ${item.color}`}>
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
