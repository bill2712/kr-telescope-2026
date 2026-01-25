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
    onZoomToSky?: () => void; // Added new prop
    
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
    const [showStyleInfo, setShowStyleInfo] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handleGo = () => {
        const now = new Date();
        const year = now.getFullYear(); 
        const [hours, minutes] = tempDate.time.split(':').map(Number);
        const newDate = new Date(year, tempDate.month - 1, tempDate.day, hours, minutes);
        onDateChange(newDate);
    };

    // --- TIME LOGIC (AM vs PM) ---
    const currentHour = parseInt(tempDate.time.split(':')[0]);
    // Determine current period based on time (0-6 is AM, others treated as PM range start)
    const period = currentHour < 12 ? 'AM' : 'PM';

    const handlePeriodChange = (newPeriod: string) => {
        // Default times when switching periods
        const defaultTime = newPeriod === 'AM' ? '00:00' : '18:00';
        setTempDate({ ...tempDate, time: defaultTime });
    };

    const periodOptions = [
        { value: 'AM', label: lang === 'zh-HK' ? '上午' : 'Morning (00-06)' },
        { value: 'PM', label: lang === 'zh-HK' ? '下午' : 'Night (18-23)' }
    ];

    // Generate specific time options based on current Period
    const timeOptions = [];
    if (period === 'PM') {
        // PM Slots: 18:00 to 23:45
        for (let h = 18; h <= 23; h++) {
            for (let m = 0; m < 60; m += 15) {
                const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                const labelH = h > 12 ? h - 12 : h;
                const label = `${labelH}:${m.toString().padStart(2, '0')} PM`;
                timeOptions.push({ value: timeStr, label });
            }
        }
    } else {
        // AM Slots: 00:00 to 06:00
        for (let h = 0; h <= 6; h++) {
            for (let m = 0; m < 60; m += 15) {
                if (h === 6 && m > 0) break;
                const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                const labelH = h === 0 ? 12 : h;
                const label = `${labelH}:${m.toString().padStart(2, '0')} AM`;
                timeOptions.push({ value: timeStr, label });
            }
        }
    }

    // Helper to generate Month Options
    const monthOptions = Array.from({length: 12}, (_, i) => {
        const m = i + 1;
        const label = lang === 'zh-HK' ? `${m}月` : new Date(2000, i, 1).toLocaleString('en-US', { month: 'short' });
        return { value: m, label };
    });

    // Helper to generate Day Options
    const dayOptions = Array.from({length: 31}, (_, i) => {
        const d = i + 1;
        const label = lang === 'zh-HK' ? `${d}日` : `${d}`;
        return { value: d, label };
    });


    // Cycle speeds
    const handleSpeedClick = () => {
        const speeds = [1, 5, 10, 100];
        const currentIndex = speeds.indexOf(animationSpeed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        onSetSpeed(speeds[nextIndex]);
    };

    return (
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-end items-center pb-32 px-4 md:pb-8 md:px-6">
            
            {!isVisible ? (
                <div className="w-full flex justify-center pointer-events-auto">
                    <button 
                        onClick={() => setIsVisible(true)}
                        className="glass-panel text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-white/10 transition-all flex items-center gap-2 group"
                    >
                        <i className="fas fa-sliders-h group-hover:scale-110 transition-transform"></i>
                        <span>{lang === 'zh-HK' ? '顯示設定' : 'Show Controls'}</span>
                    </button>
                </div>
            ) : (
                <div className="w-full pointer-events-auto flex justify-center">
                    <div className="glass-panel rounded-3xl p-3 shadow-2xl flex flex-col md:flex-row items-center gap-3 md:gap-4 text-white w-auto max-w-[95vw] relative overflow-visible">
                        
                        {/* LEFT: Prominent Help Button */}
                        <button
                            onClick={onToggleGuide}
                            className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg transform transition-all active:scale-95"
                        >
                            <i className="fas fa-book-open text-lg"></i>
                            <span className="text-sm md:text-base whitespace-nowrap">
                                {lang === 'zh-HK' ? '使用說明' : 'How to Use'}
                            </span>
                        </button>

                        <div className="hidden md:block w-px h-10 bg-white/10 mx-1"></div>

                        {/* CENTER: Compact Time Travel */}
                        <div className="flex items-center gap-2 flex-nowrap overflow-visible">
                            {/* Period (AM/PM) */}
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider ml-1">
                                    {lang === 'zh-HK' ? '時段' : 'Period'}
                                </span>
                                <CustomSelect 
                                    options={periodOptions}
                                    value={period}
                                    onChange={(val) => handlePeriodChange(String(val))}
                                    width="w-20"
                                    placeholder={lang === 'zh-HK' ? '選擇' : 'Select'}
                                />
                            </div>

                            {/* Month */}
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider ml-1">
                                    {lang === 'zh-HK' ? '月份' : 'Month'}
                                </span>
                                <CustomSelect 
                                    options={monthOptions}
                                    value={tempDate.month}
                                    onChange={(val) => setTempDate({...tempDate, month: Number(val)})}
                                    width="w-20"
                                    placeholder={lang === 'zh-HK' ? '選擇' : 'Select'}
                                />
                            </div>
                            
                            {/* Day */}
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider ml-1">
                                    {lang === 'zh-HK' ? '日期' : 'Day'}
                                </span>
                                <CustomSelect 
                                    options={dayOptions}
                                    value={tempDate.day}
                                    onChange={(val) => setTempDate({...tempDate, day: Number(val)})}
                                    width="w-20"
                                    placeholder={lang === 'zh-HK' ? '選擇' : 'Select'}
                                />
                            </div>

                             {/* Time Select */}
                             <div className="flex flex-col gap-1">
                                 <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider ml-1">
                                    {lang === 'zh-HK' ? '時間' : 'Time'}
                                </span>
                                 <CustomSelect 
                                    options={timeOptions}
                                    value={tempDate.time}
                                    onChange={(val) => setTempDate({...tempDate, time: String(val)})}
                                    width="w-28"
                                    placeholder={lang === 'zh-HK' ? '選擇' : 'Select'}
                                />
                             </div>

                            <div className="flex flex-col justify-end h-full pt-6"> 
                                <button 
                                    onClick={handleGo}
                                    className="bg-white/10 hover:bg-white/20 text-blue-300 hover:text-white font-bold px-4 rounded-lg border border-white/10 transition-all active:scale-95 h-9 flex items-center"
                                >
                                    {lang === 'zh-HK' ? '前往' : 'GO'}
                                </button>
                            </div>
                        </div>

                        <div className="h-0.5 w-full bg-white/10 md:w-0.5 md:h-12"></div>

                        {/* Middle: Map Style Selector */}
                        <div className="flex flex-col gap-1">
                             <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider ml-1">
                                {lang === 'zh-HK' ? '風格' : 'Style'}
                            </span>
                            <div className="relative flex items-center gap-2 h-full">
                                <div className="flex bg-black/40 backdrop-blur-md rounded-lg p-1 gap-1 border border-white/10">
                                    {(['western', 'chinese', 'urban'] as MapStyle[]).map((style) => (
                                        <button
                                            key={style}
                                            onClick={() => onMapStyleChange(style)}
                                            className={`px-3 rounded-md text-xs font-bold transition-colors uppercase tracking-wider h-7 flex items-center justify-center ${
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
                                
                                {/* Style Info Button */}
                                <button
                                    onClick={() => setShowStyleInfo(!showStyleInfo)}
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border transition-all ${
                                        showStyleInfo ? 'bg-white text-black border-white' : 'bg-white/10 text-gray-400 border-white/10 hover:text-white'
                                    }`}
                                >
                                    ?
                                </button>

                                {/* Tooltip Popup */}
                                {showStyleInfo && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl z-50 animate-fade-in text-left">
                                        <div className="space-y-3">
                                            <div>
                                                <div className="text-kidrise-orange font-bold text-xs mb-1 border-b border-white/10 pb-1">
                                                    {lang === 'zh-HK' ? '國際 (IAU)' : 'IAU (Western)'}
                                                </div>
                                                <p className="text-[10px] text-gray-300 leading-normal">
                                                    {t.mapStyleInfo.western}
                                                </p>
                                            </div>
                                            <div>
                                                <div className="text-kidrise-orange font-bold text-xs mb-1 border-b border-white/10 pb-1">
                                                    {lang === 'zh-HK' ? '中國星官' : 'Chinese Asterisms'}
                                                </div>
                                                <p className="text-[10px] text-gray-300 leading-normal">
                                                    {t.mapStyleInfo.chinese}
                                                </p>
                                            </div>
                                            <div>
                                                <div className="text-kidrise-orange font-bold text-xs mb-1 border-b border-white/10 pb-1">
                                                    {lang === 'zh-HK' ? '市區 (Urban)' : 'Urban View'}
                                                </div>
                                                <p className="text-[10px] text-gray-300 leading-normal">
                                                    {t.mapStyleInfo.urban}
                                                </p>
                                            </div>
                                        </div>
                                        {/* Arrow */}
                                        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-3 h-3 bg-black/90 border-r border-b border-white/20 transform rotate-45"></div>
                                        
                                        {/* Close Overlay for Mobile */}
                                        <div className="fixed inset-0 z-[-1]" onClick={() => setShowStyleInfo(false)}></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="h-0.5 w-full bg-white/10 md:w-0.5 md:h-12"></div>

                        {/* RIGHT: Tools Split */}
                        <div className="flex items-center gap-3">
                            {/* Animation Group */}
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider ml-1">
                                    {lang === 'zh-HK' ? '轉動／速度' : 'Rotation / Speed'}
                                </span>
                                <div className="flex bg-black/20 rounded-lg p-1 border border-white/5 h-9 box-border items-center">
                                    <button
                                        onClick={onToggleAnimation}
                                        className={`h-7 w-8 flex items-center justify-center rounded-md transition-all ${
                                            isAnimating 
                                            ? 'bg-red-500/20 text-red-400' 
                                            : 'text-white hover:bg-white/10'
                                        }`}
                                        title={isAnimating ? "Stop" : "Play"}
                                    >
                                        <i className={`fas ${isAnimating ? 'fa-stop' : 'fa-play'} text-xs`}></i>
                                    </button>
                                    <button
                                        onClick={handleSpeedClick}
                                        className={`h-7 w-8 flex items-center justify-center rounded-md transition-all ${
                                            animationSpeed > 1
                                            ? 'text-yellow-400 font-bold'
                                            : 'text-gray-400 hover:text-white'
                                        }`}
                                        title="Speed"
                                    >
                                        <span className="text-[10px]">{animationSpeed}x</span>
                                    </button>
                                </div>
                            </div>

                            <div className="hidden md:block w-px h-10 bg-white/10 mx-1"></div>

                            {/* Zoom Group */}
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider ml-1">
                                    {lang === 'zh-HK' ? '放大' : 'Zoom'}
                                </span>
                                <div className="flex bg-black/20 rounded-lg p-1 border border-white/5 h-9 box-border items-center">
                                    <button onClick={onZoomOut} className="h-7 w-8 flex items-center justify-center rounded-md text-white hover:bg-white/10 transition-all">
                                        <i className="fas fa-minus text-xs"></i>
                                    </button>
                                    <button onClick={onResetZoom} className="h-7 px-2 flex items-center justify-center rounded-md text-gray-400 hover:text-white transition-all font-bold text-xs" title={lang === 'zh-HK' ? '重置' : 'Reset'}>
                                        {lang === 'zh-HK' ? '重置' : 'R'}
                                    </button>
                                    <button onClick={onZoomIn} className="h-7 w-8 flex items-center justify-center rounded-md text-white hover:bg-white/10 transition-all">
                                        <i className="fas fa-plus text-xs"></i>
                                    </button>
                                    
                                    <div className="w-[1px] h-4 bg-white/10 mx-1 self-center"></div>

                                    {/* Zoom to Sky Button */}
                                    <button 
                                        onClick={onZoomToSky}
                                        className="h-7 w-8 flex items-center justify-center rounded-md text-white hover:bg-white/10 transition-all active:scale-95"
                                        title={lang === 'zh-HK' ? '將天空置中' : 'Zoom to Sky'}
                                    >
                                         <svg viewBox="0 0 1182 1182" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" className="w-[14px] h-[14px]">
                                            <path d="M593.352,191.596C1037.26,200.331 1152.14,411.603 1131.2,572.477C1096.86,836.357 826.467,989.517 593.352,989.517C249.565,989.517 68.179,726.567 49.478,572.477C33.265,438.885 120.438,309.582 285.011,243.282C418.548,189.486 593.352,191.596 593.352,191.596ZM587.751,350.79L529.704,529.44L341.86,529.44L493.829,639.851L435.782,818.501L587.751,708.09L739.719,818.501L681.673,639.851L833.641,529.44L645.798,529.44L587.751,350.79Z" fill="currentColor"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* NEW: Hide Button integrated into the bar */}
                        <div className="hidden md:block w-px h-10 bg-white/10 mx-1"></div>

                         <div className="flex flex-col gap-1 h-full justify-end">
                            <button
                                onClick={() => setIsVisible(false)}
                                className="flex items-center gap-2 px-3 h-9 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-all font-bold text-xs border border-white/5 hover:border-white/20 whitespace-nowrap self-end"
                                title={lang === 'zh-HK' ? '隱藏設定' : 'Hide Controls'}
                            >
                                <span>{lang === 'zh-HK' ? '隱藏' : 'Hide'}</span>
                                <i className="fas fa-chevron-down text-xs"></i>
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default StarMapControls;
