import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';

interface UsageGuideProps {
    lang: Language;
    onClose: () => void;
}

const UsageGuide: React.FC<UsageGuideProps> = ({ lang, onClose }) => {
    const t = translations[lang];
    const g = t.howToUse;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div 
                className="bg-[#0F1420] border border-white/20 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-[#0F1420]/95 backdrop-blur-md p-6 border-b border-white/10 flex justify-between items-center z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                            <i className="fas fa-book-open"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-wide">
                            {g.title}
                        </h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-8">
                    
                    {/* Step 1 */}
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold">1</div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">{g.step1Title}</h3>
                            <p className="text-gray-300 leading-relaxed">
                                {g.step1Desc}
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">2</div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">{g.step2Title}</h3>
                            <p className="text-gray-300 leading-relaxed">
                                {g.step2Desc}
                            </p>
                            
                            {/* Graphic Placeholder - Oval Window */}
                            <div className="mt-4 bg-black/40 rounded-xl p-4 border border-white/10 flex justify-center">
                                <div className="relative w-48 h-32 border-2 border-dashed border-blue-500/30 rounded-[50%] flex items-center justify-center bg-blue-500/5">
                                    <span className="text-xs text-blue-300 font-mono text-center px-4">
                                        {lang === 'zh-HK' ? '橢圓窗口' : 'Oval Window'}
                                        <br/>
                                        <span className="opacity-50 text-[10px]">
                                            {lang === 'zh-HK' ? '(可見星空)' : '(Visible Sky)'}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold">3</div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">{g.step3Title}</h3>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                {g.step3Desc}
                            </p>
                            
                            {/* Orientation Guide */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-black/30 p-4 rounded-xl text-center border border-white/5">
                                    <div className="text-xl font-bold text-red-400 mb-1">W ↓</div>
                                    <div className="text-xs text-gray-400">
                                        {lang === 'zh-HK' ? '面向西方' : 'Facing West'}
                                    </div>
                                </div>
                                <div className="bg-black/30 p-4 rounded-xl text-center border border-white/5">
                                    <div className="text-xl font-bold text-blue-400 mb-1">N ↓</div>
                                    <div className="text-xs text-gray-400">
                                        {lang === 'zh-HK' ? '面向北方' : 'Facing North'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* App Note */}
                    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 rounded-xl border border-blue-500/30">
                        <div className="flex items-start gap-3">
                            <i className="fas fa-lightbulb text-yellow-400 mt-1"></i>
                            <p className="text-sm text-blue-100">
                                {g.note}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-black/20">
                    <button 
                        onClick={onClose}
                        className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        {lang === 'zh-HK' ? '知道了' : 'Got it'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UsageGuide;
