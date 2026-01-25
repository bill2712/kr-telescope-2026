import React, { ReactNode } from 'react';
import TopBar from './TopBar';
import BottomDock from './BottomDock';
import { Language } from '../../types';

interface LayoutProps {
  children: ReactNode;
  lang: Language;
  currentPage: 'starmap' | 'planner' | 'learn' | 'quiz' | 'guide';
  onNavigate: (page: 'starmap' | 'planner' | 'learn' | 'quiz' | 'guide') => void;
  // TopBar Props
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
  locationName,
  currentDate,
  isLiveTime,
  onSetLiveTime,
  onShiftTime,
  onToggleLang
}) => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col relative bg-dark text-white font-sans selection:bg-secondary/30 selection:text-secondary">
      {/* Subtle grid background overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay z-0"></div>

      {/* Top Status Bar */}
      <div className="relative z-20">
        <TopBar 
          lang={lang}
          locationName={locationName}
          currentDate={currentDate}
          isLiveTime={isLiveTime}
          onSetLiveTime={onSetLiveTime}
          onShiftTime={onShiftTime}
          onToggleLang={onToggleLang}
        />
      </div>

      {/* Main Content Area */}
      {/* We add padding to top and bottom to account for the fixed bars */}
      <main className="flex-1 relative w-full h-full z-10"> 
        {children}
      </main>

      {/* Bottom Navigation Dock */}
      <BottomDock 
        lang={lang}
        activePage={currentPage}
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default Layout;
