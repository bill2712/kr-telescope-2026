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
    <div className="h-screen w-screen overflow-hidden flex flex-col relative bg-[#0B0D17]">
      {/* Background (Optional, if not handled by StarMap) */}
      
      {/* Top Status Bar */}
      <TopBar 
        lang={lang}
        locationName={locationName}
        currentDate={currentDate}
        isLiveTime={isLiveTime}
        onSetLiveTime={onSetLiveTime}
        onShiftTime={onShiftTime}
        onToggleLang={onToggleLang}
      />

      {/* Main Content Area */}
      {/* We add padding to top and bottom to account for the fixed bars */}
      <main className="flex-1 relative w-full h-full"> 
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
