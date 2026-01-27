import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';

interface ButtonLegendProps {
    lang: Language;
    onClose: () => void;
}

const ButtonLegend: React.FC<ButtonLegendProps> = ({ lang, onClose }) => {
    const t = translations[lang];
    const l = t.buttonLegend;

    const items = [
        { icon: 'fas fa-info-circle', label: l.legend, color: 'text-white' },
        { icon: 'fas fa-clock', label: l.time, color: 'text-kidrise-orange' },
        { icon: 'fas fa-play', label: l.animation, color: 'text-secondary' },
        { icon: 'text', text: '1x', label: l.speed, color: 'text-gray-400' },
        { icon: 'fas fa-layer-group', label: l.style, color: 'text-indigo-400' },
        { icon: 'fas fa-plus', label: l.zoomIn, color: 'text-white' },
        { icon: 'text', text: '100%', label: l.reset, color: 'text-gray-400' },
        { icon: 'fas fa-minus', label: l.zoomOut, color: 'text-white' },
        { icon: 'svg', label: l.zoomSky, color: 'text-cyan-400' }, // Custom SVG for zoom sky
        { icon: 'fas fa-question', label: l.guide, color: 'text-white' },
        { icon: 'fas fa-compass', label: l.compass, color: 'text-cyan-400' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div 
                className="bg-dark border border-white/20 rounded-2xl w-[90%] max-w-lg overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <i className="fas fa-info-circle text-blue-400"></i>
                        {l.title}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="grid gap-3">
                        {items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className={`w-10 h-10 rounded-lg bg-black/40 flex items-center justify-center shrink-0 ${item.color}`}>
                                    {item.icon === 'text' ? (
                                        <span className="font-bold font-mono text-xs">{item.text}</span>
                                    ) : item.icon === 'svg' ? (
                                        <svg viewBox="0 0 1182 1182" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
                                            <path d="M593.352,191.596C1037.26,200.331 1152.14,411.603 1131.2,572.477C1096.86,836.357 826.467,989.517 593.352,989.517C249.565,989.517 68.179,726.567 49.478,572.477C33.265,438.885 120.438,309.582 285.011,243.282C418.548,189.486 593.352,191.596 593.352,191.596ZM587.751,350.79L529.704,529.44L341.86,529.44L493.829,639.851L435.782,818.501L587.751,708.09L739.719,818.501L681.673,639.851L833.641,529.44L645.798,529.44L587.751,350.79Z"/>
                                        </svg>
                                    ) : (
                                        <i className={`${item.icon} text-lg`}></i>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-200 leading-snug">
                                        {item.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Footer */}
                <div className="p-4 border-t border-white/10 bg-white/5 text-center">
                    <button 
                        onClick={onClose}
                        className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors"
                    >
                        {l.close}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ButtonLegend;
