import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import telescopeImg from '../assets/knowledge/amazing-telescope-transparent.png'; // Import the new image

interface UsageGuideProps {
    lang: Language;
    onClose: () => void;
}

const UsageGuide: React.FC<UsageGuideProps> = ({ lang, onClose }) => {
    const t = translations[lang];
    const g = t.howToUse;
    const [step, setStep] = useState(0);

    // Map existing content into an array format for the wizard
    const steps = [
        {
            title: g.step1Title,
            desc: g.step1Desc,
            image: telescopeImg, // Use specific images per step if available, defaulting to main product
            tip: null
        },
        {
            title: g.step2Title,
            desc: g.step2Desc,
            image: telescopeImg,
            tip: null
        },
        {
            title: g.step3Title,
            desc: g.step3Desc,
            image: telescopeImg,
            tip: lang === 'zh-HK' ? '觀察北方時，找北極星！' : 'Find Polaris when looking North!'
        },
        {
            title: g.step4Title || (lang === 'zh-HK' ? 'App 操作指南' : 'App Controls'),
            desc: g.note,
            image: telescopeImg,
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
                                <p key={i}>{line}</p>
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
