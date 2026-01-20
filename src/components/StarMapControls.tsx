import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import { MapStyle } from './StarMap';

interface StarMapControlsProps {
    lang: Language;
    currentDate: Date;
    onDateChange: (date: Date) => void;
    isAnimating: boolean;
    onToggleAnimation: () => void;
    animationSpeed: number;
    onSetSpeed: (speed: number) => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onResetZoom: () => void;
    onToggleLang: () => void;
    locationName: string;
    
    // Map Style (New)
    mapStyle: MapStyle;
    onMapStyleChange: (style: MapStyle) => void;

    // Map Tools Props
    viewMode: 'stereo' | 'ortho';
    onSetViewMode: (mode: 'stereo' | 'ortho') => void;
    enableGyro: boolean;
    onToggleGyro: () => void;
    showArt: boolean;
    onToggleArt: () => void;
    onCameraClick: () => void;
    onLocationUpdate: () => void;
    // Scavenger Hunt
    onStartScavengerHunt?: () => void;
}

const StarMapControls: React.FC<StarMapControlsProps> = ({
    lang,
    currentDate,
    onDateChange,
    isAnimating,
    onToggleAnimation,
    animationSpeed,
    onSetSpeed,
    onZoomIn,
    onZoomOut,
    onResetZoom,
    onToggleLang,
    locationName,
    mapStyle,
    onMapStyleChange,
    viewMode,
    onSetViewMode,
    enableGyro,
    onToggleGyro,
    showArt,
    onToggleArt,
    onCameraClick,
    onLocationUpdate,
    onStartScavengerHunt
}) => {
    const t = translations[lang];
    const [tempDate, setTempDate] = useState({
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate(),
        time: currentDate.toTimeString().slice(0, 5) // HH:MM
    });

    const handleGo = () => {
        const now = new Date();
        const year = now.getFullYear(); 
        const [hours, minutes] = tempDate.time.split(':').map(Number);
        const newDate = new Date(year, tempDate.month - 1, tempDate.day, hours, minutes);
        onDateChange(newDate);
    };

    return (
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between pt-24 pb-32 px-4">
            {/* Top Controls (View Mode & Scavenger Hunt) */}
            {/* Positioned to sit below the fixed TopBar */}
            <div className="w-full flex justify-between items-start pointer-events-auto">
                <div className="flex flex-col gap-2">
                    {/* Scavenger Hunt Start Button */}
                    {onStartScavengerHunt && (
                        <button 
                            onClick={onStartScavengerHunt}
                            className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold py-2 px-4 rounded-full shadow-lg border border-white/20 hover:scale-105 transition-transform animate-pulse text-sm w-fit flex items-center gap-2"
                        >
                            <i className="fas fa-gamepad"></i>
                            {lang === 'zh-HK' ? '開始尋寶' : 'Start Hunt'}
                        </button>
                    )}
                </div>
                
                <div className="flex gap-2">
                     {/* View Mode Toggle */}
                    <div className="bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10 flex shadow-lg">
                        <button
                            onClick={() => onSetViewMode('stereo')}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${viewMode === 'stereo' ? 'bg-kidrise-orange text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            <i className="fas fa-map text-xs"></i>
                        </button>
                        <button
                            onClick={() => onSetViewMode('ortho')}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${viewMode === 'ortho' ? 'bg-kidrise-orange text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            <i className="fas fa-globe text-xs"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Controls Container */}
            <div className="w-full pointer-events-auto">
                <div className="max-w-4xl mx-auto bg-[#0F1420]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl flex flex-col gap-4 text-white">
                    
                    {/* Row 1: Time Travel (Big & Prominent) */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-2">
                             <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                <i className="fas fa-calendar-alt"></i>
                             </div>
                             <span className="text-sm font-bold tracking-wider text-gray-300">
                                {lang === 'zh-HK' ? '前往時間' : 'TIME TRAVEL'}
                             </span>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-grow justify-end">
                            {/* Month */}
                            <div className="relative">
                                <select 
                                    className="appearance-none bg-black/40 border border-white/20 rounded-lg py-2 pl-3 pr-8 text-sm focus:border-blue-500 outline-none cursor-pointer"
                                    value={tempDate.month}
                                    onChange={(e) => setTempDate({...tempDate, month: parseInt(e.target.value)})}
                                >
                                    {Array.from({length: 12}, (_, i) => i + 1).map(m => (
                                        <option key={m} value={m}>{m} {lang === 'zh-HK' ? '月' : 'Mon'}</option>
                                    ))}
                                </select>
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▼</div>
                            </div>
                            
                            {/* Day */}
                            <div className="relative">
                                <select 
                                    className="appearance-none bg-black/40 border border-white/20 rounded-lg py-2 pl-3 pr-8 text-sm focus:border-blue-500 outline-none cursor-pointer"
                                    value={tempDate.day}
                                    onChange={(e) => setTempDate({...tempDate, day: parseInt(e.target.value)})}
                                >
                                    {Array.from({length: 31}, (_, i) => i + 1).map(d => (
                                        <option key={d} value={d}>{d} {lang === 'zh-HK' ? '日' : 'Day'}</option>
                                    ))}
                                </select>
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▼</div>
                            </div>

                             {/* Time */}
                             <input 
                                type="time"
                                className="bg-black/40 border border-white/20 rounded-lg py-1.5 px-3 text-sm focus:border-blue-500 outline-none"
                                value={tempDate.time}
                                onChange={(e) => setTempDate({...tempDate, time: e.target.value})}
                            />

                            <button 
                                onClick={handleGo}
                                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-bold px-5 py-2 rounded-lg shadow-lg active:scale-95 transition-transform"
                            >
                                GO
                            </button>
                        </div>
                    </div>


                    {/* Row 2: Actions & Tools */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        
                        {/* Left Side: Simulation Controls */}
                        <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                            {/* Rotate Controls */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest hidden sm:block">
                                    {lang === 'zh-HK' ? '自動旋轉' : 'AUTO ROTATE'}
                                </span>
                                <button
                                    onClick={onToggleAnimation}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                                        isAnimating 
                                        ? 'bg-red-500/10 border-red-500/50 text-red-400' 
                                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                                    }`}
                                >
                                    <i className={`fas ${isAnimating ? 'fa-stop' : 'fa-play'}`}></i>
                                </button>

                                <button
                                    onClick={() => onSetSpeed(animationSpeed === 1 ? 100 : 1)}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                                        animationSpeed > 1
                                        ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
                                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                                    }`}
                                >
                                    <i className="fas fa-forward text-xs"></i>
                                </button>
                            </div>

                             {/* Zoom Controls */}
                            <div className="flex items-center gap-1 bg-black/20 p-1 rounded-lg border border-white/5">
                                <button onClick={onZoomOut} className="w-8 h-8 rounded-md text-white hover:bg-white/10 flex items-center justify-center">
                                    <i className="fas fa-minus text-xs"></i>
                                </button>
                                <button onClick={onResetZoom} className="px-2 text-xs font-bold text-gray-400 hover:text-white transition-colors">
                                    {lang === 'zh-HK' ? '重置' : 'R'}
                                </button>
                                <button onClick={onZoomIn} className="w-8 h-8 rounded-md text-white hover:bg-white/10 flex items-center justify-center">
                                    <i className="fas fa-plus text-xs"></i>
                                </button>
                            </div>
                        </div>

                        {/* Middle: Map Style Selector (New) */}
                        <div className="hidden md:flex bg-black/40 backdrop-blur-md rounded-lg p-1 gap-1 border border-white/10">
                            {(['western', 'chinese', 'urban'] as MapStyle[]).map((style) => (
                                <button
                                    key={style}
                                    onClick={() => onMapStyleChange(style)}
                                    className={`px-3 py-1 rounded-md text-xs font-bold transition-colors uppercase tracking-wider ${
                                        mapStyle === style 
                                        ? 'bg-kidrise-orange text-white shadow-sm' 
                                        : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {style === 'western' ? (lang === 'zh-HK' ? '國際' : 'IAU') : 
                                     style === 'chinese' ? (lang === 'zh-HK' ? '中國' : 'CHN') : 
                                     (lang === 'zh-HK' ? '市區' : 'Urban')}
                                </button>
                            ))}
                        </div>

                        {/* Right Side: Visual Tools (Art, Gyro, Camera) */}
                        <div className="flex items-center gap-3">
                             {/* Art Toggle */}
                             <button
                                onClick={onToggleArt}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                                    showArt ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-white/5 border-white/10 text-gray-400'
                                }`}
                                title="Toggle Constellation Art"
                            >
                                <i className="fas fa-star text-xs"></i>
                                <span className="text-xs font-bold">{lang === 'zh-HK' ? '星座' : 'Art'}</span>
                            </button>

                             {/* Gyro Toggle */}
                             <button
                                onClick={onToggleGyro}
                                className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all ${
                                    enableGyro ? 'bg-green-500/20 border-green-500 text-green-400 animate-pulse' : 'bg-white/5 border-white/10 text-gray-400'
                                }`}
                                title="Gyroscope Mode"
                            >
                                <i className="fas fa-mobile-alt"></i>
                            </button>
                            
                             {/* Camera */}
                             <button
                                onClick={onCameraClick}
                                className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/10 bg-gradient-to-br from-pink-500/20 to-purple-500/20 text-pink-300 hover:text-white hover:border-pink-500/50 transition-all"
                                title="Take Screenshot"
                            >
                                <i className="fas fa-camera"></i>
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default StarMapControls;
