import React, { useState } from 'react';
import { translations } from '../utils/i18n';
import { Language } from '../types';

interface TutorialProps {
  lang: Language;
  onClose: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ lang, onClose }) => {
  const t = translations[lang].tutorial;
  const [step, setStep] = useState(0);

  // Steps Configuration
  const steps = [
    {
      title: t.welcomeTitle,
      desc: t.welcomeDesc,
      icon: "fas fa-user-astronaut",
      color: "bg-blue-600",
      image: null
    },
    {
      title: t.step1Title, // Time Travel
      desc: t.step1Desc,
      icon: "fas fa-clock", 
      color: "bg-purple-500",
      highlightClass: "fixed top-4 right-16 z-[70] w-64 h-20 border-4 border-kidrise-orange rounded-3xl animate-pulse shadow-[0_0_30px_rgba(255,140,0,0.5)]" 
    },
    {
      title: t.step2Title, // Mission Dock
      desc: t.step2Desc,
      icon: "fas fa-th-large",
      color: "bg-green-500",
      highlightClass: "fixed bottom-6 left-4 right-4 z-[70] h-24 border-4 border-green-400 rounded-3xl animate-pulse shadow-[0_0_30px_rgba(74,222,128,0.5)]"
    },
    {
      title: t.step3Title, // Super Tools
      desc: t.step3Desc,
      icon: "fas fa-layer-group",
      color: "bg-indigo-500",
      highlightClass: "fixed bottom-24 right-4 z-[70] w-20 h-64 border-4 border-indigo-400 rounded-3xl animate-pulse shadow-[0_0_30px_rgba(129,140,248,0.5)]"
    },
    {
      title: t.step4Title, // Launch
      desc: t.step4Desc,
      icon: "fas fa-rocket",
      color: "bg-red-500",
      image: null
    }
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <>
      {/* Background Dimmer */}
      <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm animate-fade-in flex items-center justify-center">
        
        {/* Highlight Overlay (if any) */}
        {currentStep.highlightClass && (
           <div className={`${currentStep.highlightClass} pointer-events-none`}></div>
        )}

        {/* Tutorial Card */}
        <div className="bg-[#1c1e33] border-2 border-white/20 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-hidden mx-4 animate-pop">
           
           {/* Decorative Element */}
           <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-kidrise-orange/10 rounded-full blur-3xl"></div>

           {/* Icon / Image */}
           <div className="flex justify-center mb-6">
                <div className={`w-20 h-20 rounded-full ${currentStep.color} flex items-center justify-center text-3xl text-white shadow-lg shadow-white/10`}>
                    <i className={currentStep.icon}></i>
                </div>
           </div>

           {/* Text Content */}
           <div className="text-center mb-8">
               <h2 className="text-2xl font-bold text-white mb-3">{currentStep.title}</h2>
               <p className="text-gray-300 text-base leading-relaxed">{currentStep.desc}</p>
           </div>

           {/* Controls */}
           <div className="flex gap-3">
               {step > 0 && (
                   <button 
                    onClick={handlePrev}
                    className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-colors"
                   >
                       {t.prevBtn || "Back"}
                   </button>
               )}
               
               <button 
                onClick={handleNext}
                className={`flex-1 py-3 rounded-xl text-white font-bold shadow-lg transition-transform active:scale-95 ${step === steps.length - 1 ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-kidrise-orange to-orange-600'}`}
               >
                   {step === steps.length - 1 ? (t.startBtn || "Let's Go!") : (t.nextBtn || "Next")}
               </button>
           </div>

           {/* Step Indicators */}
           <div className="flex justify-center gap-2 mt-6">
               {steps.map((_, i) => (
                   <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === step ? 'bg-white w-6' : 'bg-white/20'}`}></div>
               ))}
           </div>

        </div>
      </div>
    </>
  );
};

export default Tutorial;