import React from 'react';
import { createPortal } from 'react-dom';
import { ExperienceMode, Language, Page } from '../../types';
import { translations } from '../../utils/i18n';

// Update Page type to include hero
interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  // Navigation
  currentPage: Page;
  onNavigate: (page: Page) => void;
  mode: ExperienceMode;
  onToggleMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, onToggleLang, currentPage, onNavigate, mode, onToggleMode }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const text = translations[lang];

  // Map to Microscope icons where possible, or use FontAwesome as before
  const navItems: { id: 'starmap' | 'planner' | 'learn' | 'quiz' | 'guide' | 'encyclopedia'; label: string }[] = [
    { id: 'starmap', label: text.menuMap },
    { id: 'planner', label: text.menuPlanner },
    { id: 'learn', label: text.menuLearn },
    { id: 'quiz', label: text.menuQuiz },
    { id: 'guide', label: text.menuGuide },
    { id: 'encyclopedia', label: text.menuEncyclopedia },
  ];
  const visibleNavItems = mode === 'beginner'
    ? navItems.filter((item) => ['starmap', 'planner', 'guide'].includes(item.id))
    : navItems;

  const handleNavigate = (id: Page) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[100] w-full backdrop-blur-xl bg-slate-900/75 border-b border-white/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between">
        
        {/* Logo */}
        <button
          type="button"
          aria-label={text.homeTitle}
          className="flex items-center gap-2 cursor-pointer group z-50 relative text-left"
          onClick={() => handleNavigate('hero')}
        >
          <img src={`${import.meta.env.BASE_URL}images/kidrise-logo_new.png`} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:rotate-12 transition-transform" />
          <span className="font-bold text-lg md:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:to-white transition-colors">
            {text.homeTitle}
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-1 bg-black/20 backdrop-blur-sm p-1 rounded-full border border-white/5">
          {visibleNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                currentPage === item.id 
                ? 'bg-secondary text-white shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 z-50 relative">
            <button type="button" onClick={onToggleMode} className="hidden min-h-10 items-center rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-bold text-slate-200 hover:bg-white/10 lg:inline-flex">
              {mode === 'beginner' ? text.homeExperience.beginner : text.homeExperience.advanced}
            </button>
            {/* Language Toggle */}
            <button 
            type="button"
            aria-label={lang === 'zh-HK' ? 'Switch to English' : '切換至繁體中文'}
            onClick={onToggleLang}
            className="flex items-center gap-2 px-3 py-1.5 md:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors active:scale-95"
            >
            <i className="fas fa-globe text-secondary text-sm"></i>
            <span className="font-bold text-xs md:text-sm">{lang === 'zh-HK' ? 'EN' : '中'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button 
                type="button"
                aria-label={isMenuOpen ? (lang === 'zh-HK' ? '關閉選單' : 'Close menu') : (lang === 'zh-HK' ? '開啟選單' : 'Open menu')}
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 active:bg-white/10 w-9 h-9 flex items-center justify-center"
            >
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && createPortal(
        <div className="fixed inset-0 top-[56px] z-[9999] bg-dark opacity-100 border-t border-white/10 flex flex-col p-4 md:hidden">
            <nav className="flex flex-col gap-2">
                {visibleNavItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className={`p-4 rounded-xl text-left font-bold text-lg transition-all flex items-center justify-between group ${
                            currentPage === item.id
                            ? 'bg-secondary/20 text-secondary border border-secondary/50' 
                            : 'bg-white/5 text-slate-300 border border-white/5 active:bg-white/10'
                        }`}
                    >
                        <span>{item.label}</span>
                        {currentPage === item.id && <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_#06b6d4]"></div>}
                    </button>
                ))}
            </nav>
            <button type="button" onClick={onToggleMode} className="mt-3 min-h-12 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 text-left font-bold text-cyan-200">
              {mode === 'beginner' ? `${text.homeExperience.beginner} → ${text.homeExperience.advanced}` : `${text.homeExperience.advanced} → ${text.homeExperience.beginner}`}
            </button>
            
            <div className="mt-auto pt-6 pb-8 text-center text-slate-500 text-sm">
                KidRise Telescope Explorer
            </div>
        </div>,
        document.body
      )}
    </header>
  );
};
