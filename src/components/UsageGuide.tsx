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
                            <span key={j} className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-white/10 mx-1 align-middle">
                                <span className="w-5 h-5 rounded bg-kidrise-orange flex items-center justify-center text-white shadow-sm">
                                    <i className="fas fa-clock text-[10px]"></i>
                                </span>
                            </span>
                        );
                    }
                    if (part === '[SKY]') {
                         return (
                            <span key={j} className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-white/10 mx-1 align-middle">
                                    <svg viewBox="0 0 1182 1182" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-cyan-400 fill-current">
                                    <path d="M593.352,191.596C1037.26,200.331 1152.14,411.603 1131.2,572.477C1096.86,836.357 826.467,989.517 593.352,989.517C249.565,989.517 68.179,726.567 49.478,572.477C33.265,438.885 120.438,309.582 285.011,243.282C418.548,189.486 593.352,191.596 593.352,191.596ZM587.751,350.79L529.704,529.44L341.86,529.44L493.829,639.851L435.782,818.501L587.751,708.09L739.719,818.501L681.673,639.851L833.641,529.44L645.798,529.44L587.751,350.79Z"/>
                                </svg>
                            </span>
                        );
                    }
                    if (part === '[PLUS]') {
                         return (
                             <span key={j} className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-white/10 mx-1 align-middle">
                                <i className="fas fa-plus text-[10px] text-white"></i>
                            </span>
                        );
                    }
                    if (part === '[COMPASS]') {
                          return (
                            <span key={j} className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-white/10 mx-1 align-middle">
                                <i className="fas fa-compass text-sm text-cyan-400 animate-pulse-slow"></i>
                            </span>
                        );
                    }
                    return <span key={j}>{part}</span>;
                })}
            </p>
        ));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            {/* Main Interactive Card Container - Matches ButtonLegend Dimensions */}
            <div 
                className="bg-dark border border-white/20 rounded-2xl w-[90%] max-w-lg overflow-hidden shadow-2xl relative flex flex-col max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center shrink-0">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <i className="fas fa-question-circle text-kidrise-orange"></i>
                        {lang === 'zh-HK' ? '使用教學' : 'How to Use'}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Content Area (Wizard) */}
                <div className="p-4 overflow-y-auto custom-scrollbar flex-1 min-h-0">
                   
                   {/* Step Progress Indicator (Dots) */}
                   <div className="flex justify-center gap-1.5 mb-6">
                        {steps.map((_, idx) => (
                            <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === step ? 'bg-kidrise-orange w-6' : 'bg-white/20 w-1.5'}`} />
                        ))}
                    </div>

                   {/* Step Content */}
                   <div className="space-y-6 animate-fade-in key={step}">
                        {/* Image Section */}
                        <div className="w-full relative rounded-xl overflow-hidden border border-white/10 bg-black/30 aspect-[4/3] flex items-center justify-center p-4 group">
                             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                             <img 
                                key={`img-${step}`}
                                src={steps[step].image} 
                                alt="Step Illustration" 
                                className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Text Section */}
                        <div>
                             <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                <span className="bg-white/10 text-xs px-2 py-0.5 rounded text-kidrise-orange border border-kidrise-orange/30">
                                   {lang === 'zh-HK' ? `步驟 ${step + 1}` : `Step ${step + 1}`}
                                </span>
                                {steps[step].title}
                             </h3>
                             <div className="text-sm text-slate-300 leading-relaxed space-y-2">
                                {renderDesc(steps[step].desc)}
                             </div>
                        </div>

                        {/* Tip Section */}
                        {steps[step].tip && (
                            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg flex gap-3 items-start">
                                <span className="text-lg">💡</span>
                                <p className="text-amber-200/90 text-xs font-medium leading-relaxed mt-0.5">
                                    {steps[step].tip}
                                </p>
                            </div>
                        )}
                   </div>
                </div>

                {/* Footer Action Bar */}
                <div className="p-4 border-t border-white/10 bg-white/5 text-center shrink-0">
                     <div className="flex items-center gap-3">
                        {/* Prev Button */}
                        <button 
                            onClick={prevStep}
                            disabled={step === 0}
                            className={`flex-1 py-2.5 rounded-lg font-bold transition-all text-sm border border-white/10 ${
                                step === 0 
                                ? 'opacity-30 cursor-not-allowed text-slate-500 bg-transparent' 
                                : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
                            }`}
                        >
                            {lang === 'zh-HK' ? '上一步' : 'Prev'}
                        </button>

                        {/* Next / Start Button */}
                        {step === totalSteps - 1 ? (
                            <button 
                                onClick={onClose}
                                className="flex-[2] py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors text-sm shadow-lg shadow-blue-500/20"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {lang === 'zh-HK' ? '開始探索' : 'Start'} 
                                    <i className="fas fa-rocket text-xs"></i>
                                </span>
                            </button>
                        ) : (
                            <button 
                                onClick={nextStep}
                                className="flex-[2] py-2.5 rounded-lg bg-white hover:bg-gray-100 text-black font-bold transition-colors text-sm shadow-lg"
                            >
                                {lang === 'zh-HK' ? '下一步' : 'Next'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsageGuide;
