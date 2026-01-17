import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';

interface ScavengerHuntModeProps {
    lang: Language;
    targetName: string; // The localized name of the target
    isLocked: boolean;  // Whether the target is currently in the crosshair
    onClose: () => void;
    onNextLevel: () => void; // Called when user successfully finds the target and dismisses success screen
    level: number;
    totalLevels: number;
}

const ScavengerHuntMode: React.FC<ScavengerHuntModeProps> = ({ 
    lang, 
    targetName, 
    isLocked, 
    onClose, 
    onNextLevel,
    level,
    totalLevels
}) => {
    const t = translations[lang];
    const [showSuccess, setShowSuccess] = useState(false);
    
    // Lock-on logic
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (isLocked) {
            timer = setTimeout(() => {
                setShowSuccess(true);
                // Trigger confetti or sound here if possible
                import('canvas-confetti').then(confetti => {
                    confetti.default({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#FFD700', '#FFA500', '#00BFFF']
                    });
                });
            }, 1000); // Hold for 1 second to confirm
        }
        return () => clearTimeout(timer);
    }, [isLocked]);

    if (showSuccess) {
        return (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
                <div className="bg-[#1c1e33] border-4 border-yellow-400 rounded-3xl p-8 text-center max-w-sm mx-4 shadow-[0_0_50px_rgba(255,215,0,0.5)]">
                    <div className="w-24 h-24 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <i className="fas fa-trophy text-5xl text-yellow-400"></i>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">{t.scavenger.foundIt}</h2>
                    <p className="text-xl text-gray-300 mb-8">{t.scavenger.foundMsg} <span className="text-yellow-400 font-bold">{targetName}</span>!</p>
                    <button 
                        onClick={() => {
                            setShowSuccess(false);
                            onNextLevel();
                        }}
                        className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-white font-bold text-xl shadow-lg hover:scale-105 transition-transform"
                    >
                        {level < totalLevels ? t.scavenger.nextTarget : t.scavenger.complete}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="absolute inset-0 z-40 pointer-events-none flex flex-col justify-between pb-8">
            
            {/* HUD Header */}
            <div className="pt-20 px-4 w-full text-center pointer-events-auto">
                <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 inline-flex items-center gap-4 shadow-lg">
                    <div className="flex flex-col items-start">
                        <span className="text-xs text-kidrise-orange font-bold uppercase tracking-wider">{t.scavenger.mission} {level}/{totalLevels}</span>
                        <span className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                            {t.scavenger.find} <span className="text-yellow-400 text-2xl">{targetName}</span>
                        </span>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white ml-2"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>

            {/* Crosshair Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                {/* Outer Ring */}
                <div className={`w-24 h-24 border-2 rounded-full transition-all duration-300 ${isLocked ? 'border-green-500 scale-110 shadow-[0_0_30px_rgba(0,255,0,0.5)]' : 'border-white/50'}`}></div>
                {/* Cross */}
                <div className="absolute w-1 h-4 bg-white/50"></div>
                <div className="absolute w-4 h-1 bg-white/50"></div>
                
                {/* Locking Text */}
                {isLocked && (
                    <div className="absolute top-14 text-green-500 font-mono font-bold text-sm tracking-widest animate-pulse">
                        LOCKING...
                    </div>
                )}
            </div>

            {/* Bottom/Direction Hint is handled by StarMap arrows, but we can add text hint here if needed */}
            <div className="text-center text-white/70 text-sm font-mono animate-pulse">
                {isLocked ? t.scavenger.keepSteady : t.scavenger.lookAround}
            </div>

        </div>
    );
};

export default ScavengerHuntMode;
