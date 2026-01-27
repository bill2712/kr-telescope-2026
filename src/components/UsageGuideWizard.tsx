import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';

// Import images for 7 steps
import step1Img from '../assets/knowledge/amazing-telescope-step01.png';
import step2Img from '../assets/knowledge/amazing-telescope-step02.png';
import step3Img from '../assets/knowledge/amazing-telescope-step03.png';
import step4Img from '../assets/knowledge/amazing-telescope-step04.png';
import step5Img from '../assets/knowledge/amazing-telescope-step05.png';
import step6Img from '../assets/knowledge/amazing-telescope-step06.png';
import step7Img from '../assets/knowledge/amazing-telescope-step07.jpg';

interface UsageGuideWizardProps {
    lang: Language;
    onClose: () => void;
}

const UsageGuideWizard: React.FC<UsageGuideWizardProps> = ({ lang, onClose }) => {
    const t = translations[lang];
    const w = t.wizard;
    const [step, setStep] = useState(0);

    const stepImages = [step1Img, step2Img, step3Img, step4Img, step5Img, step6Img, step7Img];
    
    // Merge translations with local images
    const steps = w.steps.map((s, index) => ({
        ...s, 
        image: stepImages[index] || stepImages[0]
    }));
    
    const totalSteps = steps.length;
    const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            {/* Main Interactive Card Container - Responsive Style */}
            <div 
                className="bg-dark border border-white/20 rounded-2xl w-[90%] max-w-lg md:max-w-5xl overflow-hidden shadow-2xl relative flex flex-col max-h-[80vh] md:h-[600px]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center shrink-0">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <i className="fas fa-telescope text-cyan-400"></i>
                        {lang === 'zh-HK' ? '望遠鏡使用教學' : 'Telescope Manual'}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Content Area (Wizard) - Split Layout on Desktop */}
                <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar flex-1 min-h-0 flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                   
                   {/* Mobile: Step Progress (Top) */}
                   <div className="w-full flex md:hidden justify-center gap-1.5 mb-2 shrink-0">
                        {steps.map((_, idx) => (
                            <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === step ? 'bg-cyan-400 w-6' : 'bg-white/20 w-1.5'}`} />
                        ))}
                    </div>

                   {/* Image Section (Top on mobile, Left on desktop) */}
                   <div className="w-full md:w-1/2 h-[250px] md:h-full relative rounded-xl overflow-hidden border border-white/10 bg-black/30 md:bg-transparent md:border-none flex items-center justify-center p-4 group shrink-0">
                        {/* Desktop: Background Glow */}
                        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-500/10 blur-[50px] rounded-full"></div>
                        
                        <img 
                            key={`img-${step}`}
                            src={steps[step].image} 
                            alt="Step Illustration" 
                            className="w-full h-full object-contain drop-shadow-xl z-10 transition-transform duration-500 group-hover:scale-105"
                        />
                   </div>

                   {/* Text Section (Bottom on mobile, Right on desktop) */}
                   <div className="w-full md:w-1/2 flex flex-col justify-center animate-fade-in key={step}">
                        
                        {/* Desktop: Step Progress */}
                        <div className="hidden md:flex gap-1.5 mb-6">
                            {steps.map((_, idx) => (
                                <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === step ? 'bg-cyan-400 w-8' : 'bg-white/20 w-2'}`} />
                            ))}
                        </div>

                         <h3 className="text-xl md:text-3xl font-bold text-white mb-4 flex flex-wrap items-center gap-3">
                            <span className="bg-white/10 text-xs md:text-sm px-2 py-1 rounded text-cyan-400 border border-cyan-400/30 whitespace-nowrap">
                               {lang === 'zh-HK' ? `步驟 ${step + 1}` : `Step ${step + 1}`}
                            </span>
                            {steps[step].title.split(' (')[0]}
                         </h3>
                         
                         <p className="text-slate-300 leading-relaxed text-sm md:text-lg mb-6">
                            {steps[step].desc}
                         </p>

                        {/* Tip Box */}
                        {steps[step].note && (
                            <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-xl flex gap-4 items-start">
                                <span className="text-xl">💡</span>
                                <p className="text-cyan-200/90 text-sm font-medium leading-relaxed mt-0.5">
                                    {steps[step].note}
                                </p>
                            </div>
                        )}
                   </div>
                </div>

                {/* Footer Action Bar */}
                <div className="p-4 border-t border-white/10 bg-white/5 text-center shrink-0">
                     <div className="flex items-center gap-3 md:w-1/2 md:ml-auto">
                        {/* Prev Button */}
                        <button 
                            onClick={prevStep}
                            disabled={step === 0}
                            className={`flex-1 py-3 rounded-xl font-bold transition-all text-sm border border-white/10 ${
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
                                className="flex-[2] py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-colors text-sm shadow-lg shadow-cyan-500/20"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {lang === 'zh-HK' ? '完成教學' : 'Finish'} 
                                    <i className="fas fa-check text-xs"></i>
                                </span>
                            </button>
                        ) : (
                            <button 
                                onClick={nextStep}
                                className="flex-[2] py-3 rounded-xl bg-white hover:bg-gray-100 text-black font-bold transition-colors text-sm shadow-lg"
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

export default UsageGuideWizard;
