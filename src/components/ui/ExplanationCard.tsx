import React, { useState } from 'react';

interface ExplanationCardProps {
    what: string;
    why: string;
    anim: string;
    isExpanded?: boolean;
}

const ExplanationCard: React.FC<ExplanationCardProps> = ({ what, why, anim, isExpanded = false }) => {
    const [expanded, setExpanded] = useState(isExpanded);

    return (
        <div className="bg-[#1c1e33] border border-white/20 rounded-2xl overflow-hidden mt-4 transition-all duration-300">
            <button 
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-kidrise-orange flex items-center justify-center text-black font-bold text-lg">
                        <i className="fas fa-lightbulb"></i>
                    </div>
                    <span className="text-white font-bold text-sm">天文小知識 (Did you know?)</span>
                </div>
                <i className={`fas fa-chevron-down text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}></i>
            </button>
            
            <div className={`
                ${expanded ? 'max-h-[500px] opacity-100 p-4 pt-0' : 'max-h-0 opacity-0 overflow-hidden'}
                transition-all duration-300 ease-in-out
            `}>
                <div className="space-y-4">
                    <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20">
                        <h4 className="text-blue-300 text-xs font-bold uppercase mb-1">這是什麼？ (What is it?)</h4>
                        <p className="text-gray-200 text-sm leading-relaxed">{what}</p>
                    </div>
                    
                    <div className="bg-purple-500/10 p-3 rounded-xl border border-purple-500/20">
                        <h4 className="text-purple-300 text-xs font-bold uppercase mb-1">為什麼會這樣？ (Why?)</h4>
                        <p className="text-gray-200 text-sm leading-relaxed">{why}</p>
                    </div>

                    <div className="bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                         <h4 className="text-green-300 text-xs font-bold uppercase mb-1">動畫說明 (About this animation)</h4>
                         <p className="text-gray-200 text-sm leading-relaxed">{anim}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExplanationCard;
