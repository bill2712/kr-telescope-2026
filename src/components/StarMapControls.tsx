import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import { MapStyle } from './StarMap';
import CustomSelect from './ui/CustomSelect';

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
    onZoomToSky?: () => void;
    
    // Map Style
    mapStyle: MapStyle;
    onMapStyleChange: (style: MapStyle) => void;

    // Usage Guide
    onToggleGuide: () => void;
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
    onZoomToSky,
    mapStyle,
    onMapStyleChange,
    onToggleGuide
}) => {
    const t = translations[lang];
    const [tempDate, setTempDate] = useState({
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate(),
        time: currentDate.toTimeString().slice(0, 5) // HH:MM
    });
    const [activePanel, setActivePanel] = useState<'none' | 'time' | 'style'>('none');

    // --- TIME LOGIC ---
    const handleGo = () => {
        const now = new Date();
        const year = now.getFullYear(); 
        const [hours, minutes] = tempDate.time.split(':').map(Number);
        const newDate = new Date(year, tempDate.month - 1, tempDate.day, hours, minutes);
        onDateChange(newDate);
        setActivePanel('none');
    };

    const currentHour = parseInt(tempDate.time.split(':')[0]);
    const period = currentHour < 12 ? 'AM' : 'PM';

    const handlePeriodChange = (newPeriod: string) => {
        const defaultTime = newPeriod === 'AM' ? '00:00' : '18:00';
        setTempDate({ ...tempDate, time: defaultTime });
    };

    const periodOptions = [
        { value: 'AM', label: lang === 'zh-HK' ? '上午' : 'Morning' },
        { value: 'PM', label: lang === 'zh-HK' ? '下午' : 'Night' }
    ];

    const timeOptions = [];
    if (period === 'PM') {
        for (let h = 18; h <= 23; h++) {
            for (let m = 0; m < 60; m += 15) {
                const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                const labelH = h > 12 ? h - 12 : h;
                timeOptions.push({ value: timeStr, label: `${labelH}:${m.toString().padStart(2, '0')} PM` });
            }
        }
    } else {
        for (let h = 0; h <= 6; h++) {
            for (let m = 0; m < 60; m += 15) {
                if (h === 6 && m > 0) break;
                const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                const labelH = h === 0 ? 12 : h;
                timeOptions.push({ value: timeStr, label: `${labelH}:${m.toString().padStart(2, '0')} AM` });
            }
        }
    }

    const monthOptions = Array.from({length: 12}, (_, i) => {
        const m = i + 1;
        const label = lang === 'zh-HK' ? `${m}月` : new Date(2000, i, 1).toLocaleString('en-US', { month: 'short' });
        return { value: m, label };
    });

    const dayOptions = Array.from({length: 31}, (_, i) => {
        const d = i + 1;
        const label = lang === 'zh-HK' ? `${d}日` : `${d}`;
        return { value: d, label };
    });

    // Speed Cycle
    const handleSpeedClick = () => {
        const speeds = [1, 5, 10, 100];
        const currentIndex = speeds.indexOf(animationSpeed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        onSetSpeed(speeds[nextIndex]);
    };

    return (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col items-end gap-3 pointer-events-none">
            
            {/* Status Overlay (Top Left of this sidebar? No, keep it separate or attached. 
                Let's put it floating near the top of the sidebar for context, or just rely on the map text) 
                Actually, user asked for layout change, let's keep the sidebar clean.
            */}

            {/* MAIN SIDEBAR */}
            <div className="pointer-events-auto flex flex-col gap-3">
                
                {/* 1. Time & Animation Group */}
                <div className="glass-panel rounded-2xl p-2 flex flex-col items-center gap-2 w-14 shadow-xl">
                     {/* Time Panel Toggle */}
                     <div className="relative">
                        <button 
                            onClick={() => setActivePanel(activePanel === 'time' ? 'none' : 'time')}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                activePanel === 'time' 
                                ? 'bg-kidrise-orange text-white shadow-lg' 
                                : 'text-kidrise-orange hover:bg-white/10'
                            }`}
                            title={lang === 'zh-HK' ? '時間設定' : 'Time Settings'}
                        >
                            <i className="fas fa-clock text-lg"></i>
                        </button>
                        
                        {/* Time Panel Popover */}
                        {activePanel === 'time' && (
                            <div className="absolute right-full top-0 mr-4 bg-dark/95 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl w-64 animate-fade-in origin-top-right z-50">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">
                                    {lang === 'zh-HK' ? '時間旅行' : 'Time Travel'}
                                </h3>
                                <div className="space-y-3">
                                    {/* Period */}
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs text-gray-300">{lang === 'zh-HK' ? '時段' : 'Period'}</label>
                                        <CustomSelect options={periodOptions} value={period} onChange={(v) => handlePeriodChange(String(v))} width="w-28" />
                                    </div>
                                    {/* Month */}
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs text-gray-300">{lang === 'zh-HK' ? '月份' : 'Month'}</label>
                                        <CustomSelect options={monthOptions} value={tempDate.month} onChange={(v) => setTempDate({...tempDate, month: Number(v)})} width="w-28" />
                                    </div>
                                    {/* Day */}
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs text-gray-300">{lang === 'zh-HK' ? '日期' : 'Day'}</label>
                                        <CustomSelect options={dayOptions} value={tempDate.day} onChange={(v) => setTempDate({...tempDate, day: Number(v)})} width="w-28" />
                                    </div>
                                    {/* Time */}
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs text-gray-300">{lang === 'zh-HK' ? '時間' : 'Time'}</label>
                                        <CustomSelect options={timeOptions} value={tempDate.time} onChange={(v) => setTempDate({...tempDate, time: String(v)})} width="w-28" />
                                    </div>
                                    <button 
                                        onClick={handleGo}
                                        className="w-full mt-2 bg-primary hover:bg-primary/80 text-white font-bold py-2 rounded-lg transition-colors"
                                    >
                                        {lang === 'zh-HK' ? '前往' : 'Go'}
                                    </button>
                                </div>
                            </div>
                        )}
                     </div>

                     <div className="w-8 h-px bg-white/10"></div>

                     {/* Animation Controls */}
                     <button
                        onClick={onToggleAnimation}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                            isAnimating ? 'bg-secondary text-white shadow-lg animate-pulse-slow' : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                        title={isAnimating ? 'Pause' : 'Play'}
                     >
                         <i className={`fas ${isAnimating ? 'fa-pause' : 'fa-play'}`}></i>
                     </button>

                     <button
                        onClick={handleSpeedClick}
                        className={`w-10 h-8 rounded-lg flex items-center justify-center transition-all text-[10px] font-bold font-mono ${
                            animationSpeed > 1 ? 'text-secondary' : 'text-gray-400 hover:text-white'
                        }`}
                        title="Speed"
                     >
                         {animationSpeed}x
                     </button>
                </div>

                {/* 2. Map Style & Overlay */}
                <div className="glass-panel rounded-2xl p-2 flex flex-col items-center gap-2 w-14 shadow-xl">
                    <div className="relative">
                        <button 
                            onClick={() => setActivePanel(activePanel === 'style' ? 'none' : 'style')}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                activePanel === 'style' 
                                ? 'bg-indigo-500 text-white shadow-lg' 
                                : 'text-indigo-400 hover:bg-white/10'
                            }`}
                            title={lang === 'zh-HK' ? '星圖風格' : 'Map Style'}
                        >
                            <i className="fas fa-layer-group text-lg"></i>
                        </button>

                        {/* Style Panel Popover */}
                         {activePanel === 'style' && (
                            <div className="absolute right-full top-0 mr-4 bg-dark/95 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl w-64 animate-fade-in origin-top-right z-50">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">
                                    {lang === 'zh-HK' ? '風格' : 'Style'}
                                </h3>
                                <div className="space-y-3">
                                    {(['western', 'chinese', 'urban'] as MapStyle[]).map((style) => (
                                        <button
                                            key={style}
                                            onClick={() => { onMapStyleChange(style); setActivePanel('none'); }}
                                            className={`w-full text-left px-3 py-3 rounded-xl transition-all border border-transparent ${
                                                mapStyle === style 
                                                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50' 
                                                : 'hover:bg-white/5 text-gray-400 border-white/5'
                                            }`}
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <span className={`text-sm font-bold ${mapStyle === style ? 'text-indigo-200' : 'text-gray-200'}`}>
                                                    {style === 'western' ? (lang === 'zh-HK' ? '國際 (IAU)' : 'IAU') : 
                                                     style === 'chinese' ? (lang === 'zh-HK' ? '中國星官' : 'Chinese') : 
                                                     (lang === 'zh-HK' ? '市區觀測' : 'Urban')}
                                                </span>
                                                {mapStyle === style && <i className="fas fa-check text-indigo-400"></i>}
                                            </div>
                                            <p className="text-[10px] leading-snug opacity-80">
                                                {style === 'western' ? t.mapStyleInfo.western : 
                                                 style === 'chinese' ? t.mapStyleInfo.chinese : 
                                                 t.mapStyleInfo.urban}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. Zoom Controls */}
                <div className="glass-panel rounded-2xl p-2 flex flex-col items-center gap-2 w-14 shadow-xl">
                    <button onClick={onZoomIn} className="w-10 h-10 rounded-xl hover:bg-white/10 text-white flex items-center justify-center transition-colors">
                        <i className="fas fa-plus"></i>
                    </button>
                    <button onClick={onResetZoom} className="w-10 h-8 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors text-xs font-bold">
                        100%
                    </button>
                    <button onClick={onZoomOut} className="w-10 h-10 rounded-xl hover:bg-white/10 text-white flex items-center justify-center transition-colors">
                        <i className="fas fa-minus"></i>
                    </button>
                    <div className="w-8 h-px bg-white/10"></div>
                     <button onClick={onZoomToSky} className="w-10 h-10 rounded-xl hover:bg-white/10 text-cyan-400 hover:text-cyan-300 flex items-center justify-center transition-colors" title="Zoom to Sky">
                         <svg viewBox="0 0 1182 1182" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" className="w-4 h-4">
                            <path d="M593.352,191.596C1037.26,200.331 1152.14,411.603 1131.2,572.477C1096.86,836.357 826.467,989.517 593.352,989.517C249.565,989.517 68.179,726.567 49.478,572.477C33.265,438.885 120.438,309.582 285.011,243.282C418.548,189.486 593.352,191.596 593.352,191.596ZM587.751,350.79L529.704,529.44L341.86,529.44L493.829,639.851L435.782,818.501L587.751,708.09L739.719,818.501L681.673,639.851L833.641,529.44L645.798,529.44L587.751,350.79Z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>

                {/* 4. Guide Button */}
                <button
                    onClick={onToggleGuide}
                    className="glass-panel w-14 h-14 rounded-2xl flex items-center justify-center text-secondary hover:text-white hover:bg-secondary transition-all shadow-xl group"
                >
                    <i className="fas fa-question text-xl group-hover:scale-110 transition-transform"></i>
                </button>

            </div>
        </div>
    );
};

export default StarMapControls;
