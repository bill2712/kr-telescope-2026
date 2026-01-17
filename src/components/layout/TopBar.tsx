import React from 'react';
import { translations } from '../../utils/i18n';
import { Language } from '../../types';

interface TopBarProps {
  lang: Language;
  locationName?: string;
  currentDate: Date;
  isLiveTime: boolean;
  onSetLiveTime: () => void;
  onShiftTime: (hours: number) => void;
  onToggleLang: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  lang,
  locationName,
  currentDate,
  isLiveTime,
  onSetLiveTime,
  onShiftTime,
  onToggleLang
}) => {
  const t = translations[lang];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="flex justify-between items-start">
        
        {/* Left: Location Badge & Logo? */}
        <div className="flex gap-2 pointer-events-auto">
             {/* Logo / Brand - Mini */}
             <div className="bg-[#161825]/90 backdrop-blur-md border border-white/10 rounded-2xl p-2 w-16 flex items-center justify-center shadow-lg">
                <i className="fas fa-meteor text-kidrise-orange text-xl"></i>
             </div>

            <div className="bg-[#161825]/80 backdrop-blur-md border border-white/10 rounded-2xl p-2 px-3 shadow-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                    <i className="fas fa-map-marker-alt text-sm"></i>
                </div>
                <div className="flex flex-col">
                    <span className="text-[8px] text-gray-400 uppercase tracking-widest">{t.locationTitle}</span>
                    <span className="text-xs font-bold text-white max-w-[100px] truncate">
                    {locationName || t.myGps}
                    </span>
                </div>
            </div>
        </div>

        {/* Right: Time & Settings */}
        <div className="flex gap-2 pointer-events-auto">
             {/* Time Control */}
            <div className="bg-[#161825]/80 backdrop-blur-md border border-white/10 rounded-2xl p-1.5 shadow-lg flex items-center gap-1">
                <button 
                    onClick={() => onShiftTime(-1)}
                    className="w-9 h-9 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
                >
                    <i className="fas fa-chevron-left text-xs"></i>
                </button>

                <div 
                    onClick={onSetLiveTime}
                    className="flex flex-col items-center px-2 cursor-pointer min-w-[80px]"
                >
                    <div className={`flex items-center gap-1 text-[9px] uppercase font-bold tracking-widest ${isLiveTime ? 'text-green-400' : 'text-kidrise-orange'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isLiveTime ? 'bg-green-500 animate-pulse' : 'bg-kidrise-orange'}`}></div>
                    {isLiveTime ? 'LIVE' : 'TRAVEL'}
                    </div>
                    <div className="text-sm font-mono font-bold text-white">
                    {currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>

                <button 
                    onClick={() => onShiftTime(1)}
                    className="w-9 h-9 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
                >
                    <i className="fas fa-chevron-right text-xs"></i>
                </button>
            </div>

            {/* Lang Toggle */}
            <button
                onClick={onToggleLang}
                className="w-12 h-12 rounded-2xl bg-[#161825]/80 backdrop-blur-md border border-white/10 text-white font-bold text-xs shadow-lg hover:bg-white/10 transition-colors"
            >
                {lang === 'en' ? '中' : 'EN'}
            </button>
        </div>

      </div>
    </div>
  );
};

export default TopBar;
