import React from 'react';
import { translations } from '../utils/i18n';
import { Language } from '../types';

interface TutorialProps {
  lang: Language;
  onClose: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ lang, onClose }) => {
  const t = translations[lang].tutorial;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#1c1e33] border-2 border-kidrise-orange/50 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(255,140,0,0.2)] relative overflow-hidden">
        
        {/* Background decorative blob */}
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-kidrise-orange/20 rounded-full blur-3xl"></div>
        
        <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{t.title}</h2>
            <div className="h-1 w-20 bg-kidrise-orange mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600/30 rounded-full flex items-center justify-center flex-shrink-0 border border-blue-400/30">
                    <i className="fas fa-hand-pointer text-blue-300 text-xl"></i>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">{t.step1Title}</h3>
                    <p className="text-gray-300 text-sm">{t.step1Desc}</p>
                </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-600/30 rounded-full flex items-center justify-center flex-shrink-0 border border-purple-400/30">
                    <i className="fas fa-magic text-purple-300 text-xl"></i>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">{t.step2Title}</h3>
                    <p className="text-gray-300 text-sm">{t.step2Desc}</p>
                </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-kidrise-orange/30 rounded-full flex items-center justify-center flex-shrink-0 border border-kidrise-orange/30">
                    <i className="fas fa-robot text-kidrise-orange text-xl"></i>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">{t.step3Title}</h3>
                    <p className="text-gray-300 text-sm">{t.step3Desc}</p>
                </div>
            </div>
        </div>

        <button 
            onClick={onClose}
            className="w-full mt-8 py-3 bg-gradient-to-r from-kidrise-orange to-orange-600 rounded-xl text-white font-bold text-lg shadow-lg hover:scale-[1.02] transition-transform active:scale-95"
        >
            {t.startBtn}
        </button>

      </div>
    </div>
  );
};

export default Tutorial;