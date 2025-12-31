
import React from 'react';

type Page = 'starmap' | 'planner' | 'compass' | 'knowledge' | 'quiz';

interface FloatingMenuProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ currentPage, onNavigate }) => {
  const menuItems: { id: Page; label: string; icon: string }[] = [
    { id: 'starmap', label: 'Star Map', icon: 'fa-map' },
    { id: 'planner', label: 'Planner', icon: 'fa-calendar-alt' },
    { id: 'compass', label: 'Compass', icon: 'fa-compass' },
    { id: 'knowledge', label: 'Learn', icon: 'fa-book-open' },
    { id: 'quiz', label: 'Quiz', icon: 'fa-puzzle-piece' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-8 flex justify-center pointer-events-none">
      <div className="pointer-events-auto bg-[#161825]/90 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 shadow-2xl flex items-center gap-1 md:gap-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${
              currentPage === item.id
                ? 'bg-gradient-to-br from-kidrise-orange to-red-500 text-white shadow-lg scale-110 -translate-y-2'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <i className={`fas ${item.icon} text-lg mb-0.5`}></i>
            <span className="text-[9px] font-bold tracking-wide">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloatingMenu;
