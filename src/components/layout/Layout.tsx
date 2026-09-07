import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ExperienceMode, Language, Page } from '../../types';

interface LayoutProps {
  children: ReactNode;
  lang: Language;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onToggleLang: () => void;
  mode: ExperienceMode;
  onToggleMode: () => void;
  nightVision: boolean;
  onToggleNightVision: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  lang,
  currentPage,
  onNavigate,
  onToggleLang,
  mode,
  onToggleMode,
  nightVision,
  onToggleNightVision,
}) => {
  // Scroll to top when page changes
  React.useEffect(() => {
    document.querySelector('main')?.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col relative bg-dark text-white font-sans selection:bg-secondary/30 selection:text-secondary">
      {/* Subtle grid background overlay */}
      <div className="noise-overlay absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay z-0"></div>

      {/* Header */}
      <Header 
        lang={lang} 
        onToggleLang={onToggleLang} 
        currentPage={currentPage} 
        onNavigate={onNavigate} 
        mode={mode}
        onToggleMode={onToggleMode}
        nightVision={nightVision}
        onToggleNightVision={onToggleNightVision}
      />

      {/* Main Content Area */}
      {/* If Starmap, we use full screen hidden overflow. Else we use scrollable main. */}
      <main className={`flex-1 relative w-full h-full z-10 ${currentPage === 'starmap' ? 'overflow-hidden' : 'overflow-y-auto scrollbar-hide'}`}> 
        <div className="min-h-full flex flex-col">
            <div className="flex-1">
                {children}
            </div>
            
            {/* Footer - Only show if not on Starmap */}
            {currentPage !== 'starmap' && currentPage !== 'hero' && <Footer lang={lang} />}
        </div>
      </main>
    </div>
  );
};

export default Layout;
