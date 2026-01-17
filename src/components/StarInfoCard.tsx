import React from 'react';
import { Star } from '../types';

interface StarInfoCardProps {
    star: Star;
    onClose: () => void;
    lang: 'zh-HK' | 'en';
}

const StarInfoCard: React.FC<StarInfoCardProps> = ({ star, onClose, lang }) => {
    const name = lang === 'zh-HK' && star.proper_zh ? star.proper_zh : star.proper;

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-[#1c1e33]/90 backdrop-blur-xl border border-white/20 rounded-2xl 
                    p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-50 min-w-[300px] animate-fade-in-up">
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors"
            >
                <i className="fas fa-times text-lg"></i>
            </button>

            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-kidrise-orange to-yellow-500 
                        shadow-[0_0_15px_rgba(255,140,0,0.4)] flex items-center justify-center text-white text-2xl">
                    ★
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-wide">{name}</h2>
                    <p className="text-xs text-blue-200 uppercase tracking-wider font-mono">
                        MAG: {star.mag} | CON: {star.con}
                    </p>
                </div>
            </div>

            <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg">
                    <i className="fas fa-eye text-kidrise-orange"></i>
                    <span>Brightness: <span className="text-white font-bold">{star.mag}</span></span>
                </div>
            </div>

            <div className="mt-5 pt-3 text-center border-t border-white/10">
                <p className="text-[10px] text-gray-500 italic">
                    "Every star has a story."
                </p>
            </div>
        </div>
    );
};

export default StarInfoCard;
