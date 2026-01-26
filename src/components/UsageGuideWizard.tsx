import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import telescopeImg from '../assets/knowledge/amazing-telescope-transparent.png'; 

interface UsageGuideWizardProps {
    lang: Language;
    onClose: () => void;
}

const UsageGuideWizard: React.FC<UsageGuideWizardProps> = ({ lang, onClose }) => {
    const t = translations[lang];
    const w = t.wizard;
    const [step, setStep] = useState(0);

    const steps = w.steps.map(s => ({...s, image: telescopeImg}));
    const totalSteps = steps.length;

    const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    return (
        <div className="w-full flex justify-center py-24 px-4 pb-32">
            
            {/* Main Container */}
            <div 
                className="w-full max-w-6xl aspect-auto md:aspect-[2/1] bg-[#15192B] rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden relative flex flex-col md:flex-row min-h-[600px]"
            >
                {/* Back Button (Standard style) */}
                 <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-black/40 hover:bg-white/20 flex items-center justify-center text-white/50 hover:text-white transition-all backdrop-blur-md"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>

                {/* Left: Visual Section */}
                <div className="w-full md:w-1/2 relative bg-gradient-to-br from-blue-900/20 to-indigo-900/20 overflow-hidden flex items-center justify-center min-h-[300px] md:min-h-0">
                    {/* Decorative Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[100px] rounded-full"></div>
                    
                    <img 
                      src={steps[step].image} 
                      alt="Telescope Step"
                      className="relative z-10 w-[60%] md:w-[80%] max-h-[80%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float"
                    />

                    {/* Step Indicators (Desktop Overlay) */}
                    <div className="absolute top-8 left-8 flex gap-2">
                        {steps.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                    idx === step ? 'w-8 bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'w-2 bg-white/20'
                                }`} 
                            />
                        ))}
                    </div>
                </div>

                {/* Right: Content Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative bg-[#15192B]">
                    
                    {/* Header Tag */}
                    <div className="mb-4 md:mb-6">
                        <span className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-bold border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                            {lang === 'zh-HK' ? `步驟 ${step + 1}` : `Step ${step + 1}`}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">
                        {steps[step].title}
                    </h2>

                    {/* Description */}
                    <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-6 md:mb-8">
                        {steps[step].desc}
                    </p>

                    {/* Tip Box */}
                    {steps[step].note && (
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 md:p-6 flex gap-4 items-start mb-6 md:mb-8">
                            <i className="fas fa-lightbulb text-yellow-500 text-xl mt-1"></i>
                            <div>
                                <p className="text-yellow-100/90 text-sm font-bold leading-relaxed">
                                    {steps[step].note}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="mt-auto flex gap-4 pt-4">
                        <button 
                            onClick={prevStep}
                            disabled={step === 0}
                            className={`px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold transition-all border border-white/10 ${
                                step === 0 
                                ? 'opacity-0 pointer-events-none' 
                                : 'text-slate-400 hover:bg-white/5'
                            }`}
                        >
                            {lang === 'zh-HK' ? '上一步' : 'Prev'}
                        </button>

                        <button 
                            onClick={step === totalSteps - 1 ? onClose : nextStep}
                            className="flex-1 px-6 py-3 md:px-8 md:py-4 rounded-2xl bg-cyan-500 text-black font-black text-lg hover:bg-cyan-400 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center justify-center gap-3"
                        >
                            {step === totalSteps - 1 
                                ? (lang === 'zh-HK' ? '完成教學' : 'Finish') 
                                : (lang === 'zh-HK' ? '下一步' : 'Next')
                            }
                            <i className={`fas ${step === totalSteps - 1 ? 'fa-check' : 'fa-arrow-right'}`}></i>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UsageGuideWizard;
