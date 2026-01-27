import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
// Import step images
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
    const g = t.howToUse as any;
    const [step, setStep] = useState(0);

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

    // Helper to render special text tokens
    const renderDesc = (text: string) => {
        return text.split('\n').map((line, i) => (
            <p key={i} className="flex flex-wrap items-center gap-1">
                {line.split(/(\[.*?\])/).map((part, j) => {
                    if (part === '[CLOCK]') {
                        return (
                            <span key={j} className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white/10 mx-1 align-middle">
                                <span className="w-5 h-5 md:w-6 md:h-6 rounded bg-kidrise-orange flex items-center justify-center text-white shadow-sm">
                                    <i className="fas fa-clock text-[10px] md:text-xs"></i>
                                </span>
                            </span>
                        );
                    }
                    if (part === '[SKY]') {
                        return (
                            <span key={j} className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white/10 mx-1 align-middle">
                                    <svg viewBox="0 0 1182 1182" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 md:w-4 md:h-4 text-cyan-400 fill-current">
                                    <path d="M593.352,191.596C1037.26,200.331 1152.14,411.603 1131.2,572.477C1096.86,836.357 826.467,989.517 593.352,989.517C249.565,989.517 68.179,726.567 49.478,572.477C33.265,438.885 120.438,309.582 285.011,243.282C418.548,189.486 593.352,191.596 593.352,191.596ZM587.751,350.79L529.704,529.44L341.86,529.44L493.829,639.851L435.782,818.501L587.751,708.09L739.719,818.501L681.673,639.851L833.641,529.44L645.798,529.44L587.751,350.79Z"/>
                                </svg>
                            </span>
                        );
                    }
                    if (part === '[PLUS]') {
                        return (
                             <span key={j} className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white/10 mx-1 align-middle">
                                <i className="fas fa-plus text-[10px] md:text-xs text-white"></i>
                            </span>
                        );
                    }
                    if (part === '[COMPASS]') {
                         return (
                            <span key={j} className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white/10 mx-1 align-middle">
                                <i className="fas fa-compass text-sm md:text-lg text-cyan-400 animate-pulse-slow"></i>
                            </span>
                        );
                    }
                    return <span key={j}>{part}</span>;
                })}
            </p>
        ));
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col md:flex-row md:items-center md:justify-center p-0 md:p-4 bg-[#0B0D14] md:bg-dark/90 md:backdrop-blur-md animate-fade-in">
            {/* Desktop Container Wrapper */}
            <div 
                className="w-full h-full md:w-full md:max-w-5xl md:h-[85vh] md:bg-dark/80 md:border md:border-white/10 md:rounded-[32px] md:shadow-2xl relative flex flex-col md:flex-row overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button - Responsive Positioning */}
                 <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all backdrop-blur-md border border-white/10"
                >
                    <i className="fas fa-times"></i>
                </button>

                {/* --- IMAGE SECTION --- */}
                <div className="w-full h-[45%] md:h-full md:w-1/2 relative bg-gradient-to-br from-indigo-950 via-[#0B0D14] to-purple-950/20 flex items-center justify-center p-6 md:p-12 shrink-0">
                    {/* Background Effects */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-blue-500/20 blur-[60px] md:blur-[100px] rounded-full"></div>
                    
                    <img 
                        key={`img-${step}`} // Force re-render for animation
                        src={steps[step].image} 
                        alt="Guide Step" 
                        className="relative z-10 w-auto h-full max-h-[85%] object-contain drop-shadow-[0_0_30px_rgba(100,200,255,0.15)] animate-fade-in-up-simple"
                    />

                    {/* Mobile Progress Dots (Overlay on Image Bottom) */}
                     <div className="absolute bottom-6 left-0 w-full flex justify-center gap-1.5 md:hidden z-20">
                        {steps.map((_, idx) => (
                            <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${idx === step ? 'bg-white w-6' : 'bg-white/30 w-1.5'}`} />
                        ))}
                    </div>
                </div>

                {/* --- CONTENT SECTION --- */}
                <div className="w-full h-[55%] md:h-full md:w-1/2 bg-[#151725] md:bg-transparent md:backdrop-blur-xl relative flex flex-col -mt-6 rounded-t-[30px] md:mt-0 md:rounded-none shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-none z-20">
                    
                    {/* Content Scroll Container */}
                    <div className="flex-1 overflow-y-auto px-6 py-8 md:p-12 md:pb-8 custom-scrollbar">
                        
                        {/* Desktop Progress */}
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

                        {/* Title & Description */}
                        <div className="animate-fade-in key={step}">
                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">
                                <span className='md:hidden text-blue-400 text-lg block mb-1 font-bold tracking-wide uppercase'>
                                     {lang === 'zh-HK' ? `步驟 ${step + 1}` : `Step ${step + 1}`}
                                </span>
                                {steps[step].title}
                            </h2>
                            
                            <div className="text-base md:text-lg text-slate-300 leading-relaxed md:leading-relaxed space-y-3 font-medium">
                                {renderDesc(steps[step].desc)}
                            </div>

                            {/* Tip Box */}
                            {steps[step].tip && (
                                <div className="mt-6 md:mt-8 bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex gap-3 items-start">
                                    <span className="text-xl">💡</span>
                                    <p className="text-amber-200/90 text-sm font-medium leading-relaxed mt-0.5">
                                        {steps[step].tip}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bottom Action Bar (Mobile & Desktop) */}
                    <div className="p-4 md:p-12 md:pt-4 border-t border-white/5 bg-[#12141c] md:bg-transparent shrink-0">
                        <div className="flex items-center gap-3 md:gap-4">
                            {/* Prev Button */}
                            <button 
                                onClick={prevStep}
                                disabled={step === 0}
                                className={`flex-1 md:flex-none px-4 py-3 md:px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border border-white/10 md:border-transparent ${
                                    step === 0 
                                    ? 'opacity-30 cursor-not-allowed text-slate-500' 
                                    : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
                                }`}
                            >
                                <i className="fas fa-chevron-left text-xs"></i>
                                <span>{lang === 'zh-HK' ? '上一步' : 'Prev'}</span>
                            </button>

                            {/* Next / Start Button */}
                            {step === totalSteps - 1 ? (
                                <button 
                                    onClick={onClose}
                                    className="flex-[2] md:ml-auto md:flex-none px-6 py-3 md:px-8 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <span>{lang === 'zh-HK' ? '開始探索' : 'Start'}</span>
                                    <i className="fas fa-rocket"></i>
                                </button>
                            ) : (
                                <button 
                                    onClick={nextStep}
                                    className="flex-[2] md:ml-auto md:flex-none px-6 py-3 md:px-8 rounded-xl bg-white text-black font-bold shadow-lg hover:bg-gray-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <span>{lang === 'zh-HK' ? '下一步' : 'Next'}</span>
                                    <i className="fas fa-chevron-right text-xs"></i>
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UsageGuide;
