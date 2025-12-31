import React from 'react';
import { translations } from '../utils/i18n';
import { Language, Coordinates } from '../types';

interface MissionControlProps {
    lang: Language;
    currentDate: Date;
    location: Coordinates;
    viewMode: 'stereo' | 'ortho';
    isLiveTime: boolean;
    enableGyro: boolean;
    locationName?: string;
    onSetViewMode: (mode: 'stereo' | 'ortho') => void;
    onShiftTime: (hours: number) => void;
    onSetLiveTime: () => void;
    onToggleGyro: () => void;
    onLocationUpdate: () => void;
}

const MissionControl: React.FC<MissionControlProps> = ({
    lang, currentDate, location, viewMode, isLiveTime, enableGyro, locationName,
    onSetViewMode, onShiftTime, onSetLiveTime, onToggleGyro, onLocationUpdate
}) => {
    const t = translations[lang];

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-[95%] max-w-2xl">
            <div className="bg-[#161825]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] 
                      p-2 flex flex-nowrap items-center justify-between gap-2 overflow-x-auto scrollbar-hide">

                {/* Time Control Group */}
                <div className="flex items-center gap-1 bg-black/20 rounded-2xl p-1.5 border border-white/5 flex-shrink-0">
                    <button onClick={() => onShiftTime(-1)} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all active:scale-95">
                        <i className="fas fa-backward text-xs"></i>
                    </button>

                    <div className="flex flex-col items-center min-w-[80px] px-2 cursor-pointer" onClick={onSetLiveTime}>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isLiveTime ? 'text-kidrise-orange animate-pulse' : 'text-gray-500'}`}>
                            {isLiveTime ? 'LIVE' : 'MANUAL'}
                        </span>
                        <span className="text-sm font-mono font-bold text-white">
                            {currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>

                    <button onClick={() => onShiftTime(1)} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all active:scale-95">
                        <i className="fas fa-forward text-xs"></i>
                    </button>
                </div>

                <div className="h-8 w-px bg-white/10 mx-1 flex-shrink-0"></div>

                {/* View Mode */}
                <div className="flex bg-black/20 p-1 rounded-2xl flex-shrink-0">
                    <button
                        onClick={() => onSetViewMode('stereo')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'stereo' ? 'bg-kidrise-orange text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <i className="fas fa-expand mr-1"></i> 2D
                    </button>
                    <button
                        onClick={() => onSetViewMode('ortho')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'ortho' ? 'bg-kidrise-orange text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        3D <i className="fas fa-globe ml-1"></i>
                    </button>
                </div>

                <div className="h-8 w-px bg-white/10 mx-1 flex-shrink-0"></div>

                {/* Tools */}
                <div className="flex items-center gap-2 flex-shrink-0 pr-2">
                    
                    {/* Location Info */}
                    <div className="flex flex-col items-end mr-1">
                        {locationName && (
                             <span className="text-[10px] font-bold text-blue-200">{locationName}</span>
                        )}
                        <span className="text-[9px] font-mono text-gray-400">
                             {location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°
                        </span>
                    </div>

                    {/* Gyro */}
                    <button
                        onClick={onToggleGyro}
                        className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all shadow-lg active:scale-95
                    ${enableGyro ? 'bg-red-500 border-red-400 text-white animate-pulse' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                    >
                        <i className="fas fa-mobile-alt"></i>
                    </button>

                    {/* Location */}
                    <button
                        onClick={onLocationUpdate}
                        className="w-11 h-11 rounded-full bg-blue-600/80 hover:bg-blue-500 border border-blue-400 text-white flex items-center justify-center transition-all shadow-lg shadow-blue-500/30 active:scale-95"
                    >
                        <i className="fas fa-crosshairs"></i>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MissionControl;
