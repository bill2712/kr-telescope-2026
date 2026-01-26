import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import telescopeImg from '../assets/knowledge/amazing-telescope-transparent.png';
import { Footer } from './layout/Footer';

interface HeroProps {
  lang: Language;
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ lang, onStart }) => {
  const t = translations[lang];

  return (
    <div className="relative w-full h-full overflow-y-auto custom-scrollbar flex flex-col text-center bg-dark">
      <div className="min-h-full flex flex-col items-center justify-between w-full relative">
       <div className="flex-1 flex flex-col items-center justify-center w-full px-4 py-8 md:p-4 pb-32 z-10">
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-primary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      {/* Ambient Glow behind the telescope */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

      <div className="z-10 w-full max-w-7xl mx-auto flex flex-col items-center space-y-6 md:space-y-10">
        
        {/* Main Hero Image */}
        <div className="relative group perspective-1000">
          <div className="relative z-10 w-[380px] md:w-[500px] lg:w-[600px] animate-float transition-transform duration-500 ease-out group-hover:scale-105 group-hover:drop-shadow-[0_0_50px_rgba(6,182,212,0.8)]">
             <img 
               src={telescopeImg} 
               alt="KidRise Telescope" 
               className="w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(6,182,212,0.6)] animate-pulse-slow"
             />
             
             {/* Sparkles overlay */}
             <div className="absolute top-10 -right-4 animate-pulse text-yellow-400 drop-shadow-lg text-2xl md:text-3xl">
                ✦
             </div>
             <div className="absolute top-1/3 -left-6 animate-pulse text-cyan-300 drop-shadow-lg text-xl md:text-2xl" style={{ animationDelay: '1.5s' }}>
                ✦
             </div>
          </div>
          
          {/* Reflection/Ground effect */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-12 bg-black/20 blur-xl rounded-[100%]"></div>
        </div>

        <div className="space-y-4 max-w-2xl px-4">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300 drop-shadow-sm leading-tight pb-2">
            Kidrise 望遠鏡探秘
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 font-light tracking-wide max-w-xl mx-auto leading-relaxed">
            開啟你的科學探索之旅！
          </p>
        </div>

        <div className="pt-2">
          <button 
            onClick={onStart} 
            className="mx-auto group shadow-xl shadow-secondary/20 hover:shadow-secondary/40 w-full xs:w-auto px-8 py-4 text-xl rounded-2xl border border-secondary/50 bg-secondary/20 backdrop-blur-md text-white font-bold transition-all hover:bg-secondary/40 flex items-center justify-center gap-2"
          >
            {lang === 'zh-HK' ? '開始探險' : 'Start Exploring'}
            <span className="group-hover:translate-x-1 transition-transform inline-block">➜</span>
          </button>
        </div>
      </div>
      </div>
      <div className="mt-auto w-full z-10 relative">
         <Footer lang={lang} />
      </div>
     </div>
    </div>
  );
};

export default Hero;
