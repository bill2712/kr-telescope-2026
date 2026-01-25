import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Language } from '../../types';

interface LayoutProps {
  children: ReactNode;
  lang: Language;
  currentPage: 'starmap' | 'planner' | 'learn' | 'quiz' | 'guide';
  onNavigate: (page: 'starmap' | 'planner' | 'learn' | 'quiz' | 'guide') => void;
  // TopBar Props - Deprecated for Header but passed for logic if needed (Time/Location moved to overlay)
  locationName?: string;
  currentDate: Date;
  isLiveTime: boolean;
  onSetLiveTime: () => void;
  onShiftTime: (hours: number) => void;
  onToggleLang: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  lang,
  currentPage,
  onNavigate,
  onToggleLang,
  // Unused props in Layout now, but kept for interface compatibility
  locationName,
  currentDate,
  isLiveTime,
  onSetLiveTime,
  onShiftTime,
}) => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col relative bg-dark text-white font-sans selection:bg-secondary/30 selection:text-secondary">
      {/* Subtle grid background overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay z-0"></div>

      {/* Header */}
      <Header 
        lang={lang} 
        onToggleLang={onToggleLang} 
        currentPage={currentPage} 
        onNavigate={onNavigate} 
      />

      {/* Main Content Area */}
      <main className="flex-1 relative w-full h-full z-10 overflow-hidden"> 
        {children}
      </main>

      {/* Footer - Only show if current page allows scrolling or is not full-screen interactive */}
      {/* For Telescope, StarMap is full screen. We might want Footer only on other pages, 
          OR overlay footer at bottom. 
          Microscope has sticky footer? No, it's at bottom of content.
          Let's render it but it might be hidden behind StarMap if absolute positioning is used there. */}
      {currentPage !== 'starmap' && <Footer lang={lang} />}
    </div>
  );
};

export default Layout;
