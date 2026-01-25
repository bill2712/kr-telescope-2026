import React from 'react';
import { Language } from '../../types';
import { translations } from '../../utils/i18n';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isEn = lang === 'en';
  const link = isEn ? "https://stemtoy.com.hk/en" : "https://stemtoy.com.hk/";
  
  // Hardcoded for now until added to i18n or passed properly
  const copyright = "© 2026 Kidrise STEM香港教育玩具";
  const support = "由 Kidrise童樂高飛 提供技術支援";

  return (
    <footer className="mt-auto border-t border-white/10 bg-slate-900/50 backdrop-blur-sm py-8 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-slate-500 text-sm">
          <span>{copyright}</span>
          <span className="hidden md:inline">|</span>
          <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
            {support}
          </a>
        </div>
        <div className="flex justify-center gap-4 mt-4">
           <a href={link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-secondary transition-colors text-xs uppercase tracking-wider">
             {isEn ? "Official Store" : "官方商店"}
           </a>
        </div>
      </div>
    </footer>
  );
};
