import React, { useState } from 'react';
import { Language } from '../types';
import telescopeHero from '../assets/knowledge/amazing-telescope-transparent.png';

interface LoginGateProps {
  lang: Language;
  onToggleLang: () => void;
  onLogin: () => void;
  // Translation is now loosely typed or we access via i18n directly, 
  // but preserving prop structure from Microscope for consistency
  t: any; 
}

export const LoginGate: React.FC<LoginGateProps> = ({ t, lang, onToggleLang, onLogin }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [isShake, setIsShake] = useState(false);

  // Hardcoded valid codes for Telescope
  const VALID_CODES = ['STEM2026', 'KIDRISE', 'TELESCOPE', 'SKY', 'STAR', 'SPACE', 'SCIENCE'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    
    if (VALID_CODES.includes(cleanCode)) {
      // Save auth state
      localStorage.setItem('kr_telescope_auth', 'true');
      onLogin();
    } else {
      setError(true);
      setIsShake(true);
      setTimeout(() => setIsShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F172A] relative overflow-hidden px-4">
      
      {/* Background Decorative Elements (adapted) */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Ambient Glow behind the telescope */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Language Toggle */}
      <button
        onClick={onToggleLang}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/20 text-white/70 hover:text-white transition-all border border-white/10 z-50 px-3"
        title="Switch Language"
      >
        <div className="flex items-center space-x-2 text-xs font-bold">
            <i className="fas fa-globe"></i>
            <span>{lang === 'zh-HK' ? 'EN' : '中'}</span>
        </div>
      </button>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center space-y-8">
        
        {/* Main Hero Image */}
        <div className="relative group perspective-1000">
          <div className="relative z-10 w-56 md:w-72 transition-transform duration-500 ease-out hover:scale-105">
              <img 
                src={telescopeHero}
                alt="KidRise Telescope" 
                className="w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(6,182,212,0.6)]"
              />
              
              {/* Sparkles overlay */}
              <div className="absolute top-10 -right-4 animate-bounce">
                <i className="fas fa-star text-yellow-400 text-2xl drop-shadow-lg"></i>
              </div>
              <div className="absolute top-1/3 -left-6 animate-pulse" style={{ animationDelay: '1.5s' }}>
                 <i className="fas fa-star text-cyan-300 text-xs drop-shadow-lg"></i>
              </div>
          </div>
          
          {/* Reflection/Ground effect */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/20 blur-xl rounded-[100%]"></div>
        </div>

        {/* Login Form Container */}
        <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-6">
            
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300">
                {t.login?.title || 'Enter Access Code'}
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed">
                {t.login?.desc || 'Enter code to start'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className={`relative transition-transform ${isShake ? 'animate-shake' : ''}`}>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError(false);
                  }}
                  placeholder={t.login?.placeholder || 'ENTER CODE'}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-center tracking-widest text-lg uppercase font-mono"
                  autoFocus
                />
              </div>

              {error && (
                <div className="flex items-center justify-center space-x-2 text-red-300 text-sm bg-red-500/10 py-2 rounded-lg animate-fade-in border border-red-500/20">
                  <i className="fas fa-exclamation-circle text-sm"></i>
                  <span>{t.login?.error || 'Invalid code'}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 group"
              >
                <span>{t.login?.submit || 'START'}</span>
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>
            </form>

            <div className="text-white/20 text-xs">
              Powered by Kidrise Science
            </div>
          </div>
        </div>

      </div>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};
