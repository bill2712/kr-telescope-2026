import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import telescopeImg from '../assets/knowledge/amazing-telescope-transparent.png';
// Import new step images
import step1En from '../assets/knowledge/step1-en.png';
import step1Zh from '../assets/knowledge/step1-zh.png';
import step1_5En from '../assets/knowledge/step1.5-en.png';
import step1_5Zh from '../assets/knowledge/step1.5-zh.png';
import step2En from '../assets/knowledge/step2-en.png';
import step2Zh from '../assets/knowledge/step2-zh.png';
import step3En from '../assets/knowledge/step3-en.png';
import step3Zh from '../assets/knowledge/step3-zh.png';
import step5En from '../assets/knowledge/step5-en.png';
import step5Zh from '../assets/knowledge/step5-zh.png';


interface UsageGuideProps {
    lang: Language;
    onClose: () => void;
}

const UsageGuide: React.FC<UsageGuideProps> = ({ lang, onClose }) => {
    const t = translations[lang];
    const g = t.howToUse as any; // Cast to any to avoid type errors with recent changes
    const [step, setStep] = useState(0);

    // Map existing content into an array format for the wizard
    const steps = [
        {
            title: g.step1Title,
            desc: g.step1Desc,
            image: lang === 'zh-HK' ? step1Zh : step1En,
            tip: null
        },
        {
            title: g.step2Title,
            desc: g.step2Desc,
            image: lang === 'zh-HK' ? step1_5Zh : step1_5En,
            tip: null
        },
        {
            title: g.step3Title,
            desc: g.step3Desc,
            image: lang === 'zh-HK' ? step2Zh : step2En,
            tip: null
        },
        {
            title: g.step4Title,
            desc: g.step4Desc,
            image: lang === 'zh-HK' ? step3Zh : step3En,
            tip: lang === 'zh-HK' ? '觀察北方時，找北極星！' : 'Find Polaris when looking North!'
        },
        {
            title: g.step5Title || (lang === 'zh-HK' ? 'App 操作指南' : 'App Controls'),
            desc: g.note,
            image: lang === 'zh-HK' ? step5Zh : step5En,
            tip: null
        }
    ];

    const totalSteps = steps.length;
    const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/90 backdrop-blur-md animate-fade-in" onClick={onClose}>
            <div 
                className="bg-dark/80 border border-white/10 rounded-[32px] w-full max-w-5xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                 <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/40 hover:bg-white/20 flex items-center justify-center text-white/50 hover:text-white transition-all backdrop-blur-sm"
                >
                    <i className="fas fa-times"></i>
                </button>

                {/* Left: Image Section */}
                <div className="w-full md:w-1/2 relative bg-gradient-to-br from-indigo-900/30 to-purple-900/10 flex items-center justify-center p-8 md:p-12">
                    {/* Glowing effect background */}
                    <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full transform scale-75"></div>
                    
                    <img 
                        src={steps[step].image} 
                        alt="Telescope" 
                        className="relative z-10 w-full max-h-[300px] md:max-h-[500px] object-contain drop-shadow-[0_0_50px_rgba(100,200,255,0.2)] animate-float"
                    />
                    
                    {/* Step Indicators (Mobile overlay) */}
                     <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2 md:hidden z-20">
                        {steps.map((_, idx) => (
                            <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === step ? 'bg-primary w-6' : 'bg-white/20 w-1.5'}`} />
                        ))}
                    </div>
                </div>

                {/* Right: Content Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-black/20 backdrop-blur-xl relative">
                    
                    {/* Progress (Desktop) */}
                    <div className="hidden md:flex justify-between items-center mb-8">
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
                            {lang === 'zh-HK' ? `步驟 ${step + 1}` : `Step ${step + 1}`}
                        </span>
                        <div className="flex gap-1.5">
                            {steps.map((_, idx) => (
                                <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === step ? 'bg-primary w-8' : 'bg-white/10 w-1.5'}`} />
                            ))}
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 flex flex-col justify-center animate-fade-in key={step}"> {/* Key reset animation */}
                        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 mb-6">
                            {steps[step].title}
                        </h2>
                        

                        <div className="text-lg text-slate-300 leading-relaxed space-y-4">
                            {steps[step].desc.split('\n').map((line, i) => (
                                <p key={i} className="flex flex-wrap items-center gap-1">
                                    {line.split(/(\[.*?\])/).map((part, j) => {
                                        if (part === '[CLOCK]') {
                                            return (
                                                <span key={j} className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/10 mx-1 align-middle">
                                                    <span className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-kidrise-orange flex items-center justify-center text-white shadow-sm">
                                                        <i className="fas fa-clock text-xs"></i>
                                                    </span>
                                                </span>
                                            );
                                        }
                                        if (part === '[SKY]') {
                                            return (
                                                <span key={j} className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/10 mx-1 align-middle">
                                                     <svg viewBox="0 0 1182 1182" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" className="w-4 h-4 text-cyan-400 fill-current">
                                                        <path d="M593.352,191.596C1037.26,200.331 1152.14,411.603 1131.2,572.477C1096.86,836.357 826.467,989.517 593.352,989.517C249.565,989.517 68.179,726.567 49.478,572.477C33.265,438.885 120.438,309.582 285.011,243.282C418.548,189.486 593.352,191.596 593.352,191.596ZM587.751,350.79L529.704,529.44L341.86,529.44L493.829,639.851L435.782,818.501L587.751,708.09L739.719,818.501L681.673,639.851L833.641,529.44L645.798,529.44L587.751,350.79Z"/>
                                                    </svg>
                                                </span>
                                            );
                                        }
                                        if (part === '[PLUS]') {
                                            return (
                                                <span key={j} className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/10 mx-1 align-middle">
                                                    <i className="fas fa-plus text-xs text-white"></i>
                                                </span>
                                            );
                                        }
                                        if (part === '[COMPASS]') {
                                            return (
                                                <span key={j} className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/10 mx-1 align-middle">
                                                    <i className="fas fa-compass text-lg text-cyan-400 animate-pulse-slow"></i>
                                                </span>
                                            );
                                        }
                                        return <span key={j}>{part}</span>;
                                    })}
                                </p>
                            ))}
                        </div>

                        {/* Extra Tip Box */}
                        {steps[step].tip && (
                            <div className="mt-8 bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex gap-3 items-start">
                                <span className="text-xl">💡</span>
                                <p className="text-amber-200/90 text-sm font-medium leading-relaxed mt-0.5">
                                    {steps[step].tip}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-4 mt-8 md:mt-12 pt-6 border-t border-white/5">
                        <button 
                            onClick={prevStep}
                            disabled={step === 0}
                            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                                step === 0 
                                ? 'opacity-0 pointer-events-none' 
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <i className="fas fa-chevron-left text-xs"></i>
                            <span>{lang === 'zh-HK' ? '上一步' : 'Prev'}</span>
                        </button>

                        {step === totalSteps - 1 ? (
                            <button 
                                onClick={onClose}
                                className="ml-auto px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                            >
                                <span>{lang === 'zh-HK' ? '開始探索' : 'Start Exploring'}</span>
                                <i className="fas fa-rocket"></i>
                            </button>
                        ) : (
                            <button 
                                onClick={nextStep}
                                className="ml-auto px-8 py-3 rounded-xl bg-white text-black font-bold shadow-lg hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                            >
                                <span>{lang === 'zh-HK' ? '下一步' : 'Next'}</span>
                                <i className="fas fa-chevron-right text-xs"></i>
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UsageGuide;
