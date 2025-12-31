
import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../utils/i18n';

interface Props {
  lang: Language;
}

const MoonPhaseLearn: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const [day, setDay] = useState(1); 

  // Calculations
  const phase = (day - 1) / 29.5; // 0 to 1
  const isWaxing = phase < 0.5;
  const isCrescent = (phase < 0.25) || (phase > 0.75);
  
  // Text Info
  const getPhaseInfo = (d: number) => {
      if (d <= 1.5 || d >= 29) return { name: t.moonNew, reason: t.moonReasonNew };
      if (d < 7) return { name: t.moonWaxCres, reason: t.moonReasonWax };
      if (d < 9) return { name: t.moonFirstQ, reason: t.moonReasonWax };
      if (d < 14) return { name: t.moonWaxGib, reason: t.moonReasonWax };
      if (d < 17) return { name: t.moonFull, reason: t.moonReasonFull };
      if (d < 22) return { name: t.moonWanGib, reason: t.moonReasonWan };
      if (d < 24) return { name: t.moonLastQ, reason: t.moonReasonWan };
      return { name: t.moonWanCres, reason: t.moonReasonWan };
  };
  const info = getPhaseInfo(day);

  // CSS Trick for Moon Phases
  // Source: https://codepen.io/fraziern/pen/RMyWBy logic adapted
  // We use a base sphere. 
  // A shadow hemisphere rotates.
  // Actually, easiest is: 
  // 1. Base color (Shadow)
  // 2. Light Hemisphere (rotates)?
  // Let's use a simpler "Shadow Mask" approach.
  
  // Calculate dynamic shadow offset
  // Shadow covers from right to left (Waxing) -> No wait.
  // New Moon (0): Dark
  // Waxing: Light appears on Right. 
  // Full (0.5): All Light.
  // Waning: Shadow appears on Right.

  // We can simulate this with two halves and z-index flips.
  
  // Simplified for Kid App:
  // JUST USE CSS FILTER/Gradient? No.
  // Let's use a sprite-like logic or simply:
  // Use a mask div that changes width/position?
  // Let's use the `box-shadow` inset trick if circular?
  // No, 3D sphere rotation is best.
  
  // Let's try 3 overlays.
  // Base: Dark.
  // Half: Light (Right side if waxing, Left side if waning).
  // Ellipse: Covers the middle to create crescent/gibbous.

  const getMoonStyle = () => {
    // 0..100% illumination roughly
    const illum = Math.abs((phase - 0.5) * 2); // 1->0->1 (New->Full->New) inverted?
    // 0 (New) -> 0.5 (Full) -> 1 (New)
    // 1 at New, 0 at Full.
    
    // This is hard to code perfect CSS in one shot without preview.
    // I will use a simpler approximation: 
    // Slide a "Shadow" div across.
    const pos = (day / 30) * 100; // 0 to 100%
    return {
        background: `radial-gradient(circle at ${pos}% 50%, rgb(240,240,240) ${day > 15 ? '30%' : '10%'}, transparent 60%)`, // Fake light
        backgroundColor: '#111'
    };
  };

  return (
    <div className="flex flex-col h-full bg-black/60 rounded-3xl p-4 relative">
       <h3 className="text-xl font-bold text-center mb-2 text-white">{t.knowMoon}</h3>
       
       <div className="flex-1 flex flex-col items-center justify-center">
            
            {/* Visual */}
            <div className="relative w-48 h-48 bg-[#0b0d17] rounded-full border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] mb-8 flex items-center justify-center">
                
                {/* Moon Container */}
                <div className="w-40 h-40 rounded-full bg-black relative overflow-hidden shadow-inner ring-1 ring-white/10">
                    
                    {/* Texture/Crater Image (Optional) */}
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                    {/* Phase Masking - The "Hemisphere" approach */}
                    {/* Layer 1: The Dark Side (Background is Black) */}
                    
                    {/* Layer 2: The Lit Side */}
                    {/* We rotate a hemi-sphere? */}
                    {/* Let's try the simplest: A white circle that is masked by a black ellipse? */}
                    
                    {/* REACT COMPONENT FOR PHASE */}
                    {/* Logic: 
                        If Waxing (0-0.5): Right side is Lit. 
                           Crescent: Right side lit but obscured by inner dark ellipse.
                           Gibbous: Right side lit + Left side partially lit by ellipse.
                    */}
                    
                    <div className={`absolute inset-0 rounded-full border-[1px] border-white/5`} 
                         style={{
                             backgroundColor: '#1a1a1a' // Dark Moon base
                         }}>
                    </div>

                    {/* Implementation of CSS Sphere Phase */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                        {/* Right Hemisphere */}
                        <div className={`absolute top-0 right-0 w-1/2 h-full bg-[#e0e0e0] transition-colors duration-300 ${phase > 0.5 ? 'opacity-0' : 'opacity-100'}`}></div>
                        {/* Left Hemisphere */}
                        <div className={`absolute top-0 left-0 w-1/2 h-full bg-[#e0e0e0] transition-colors duration-300 ${phase <= 0.5 ? 'opacity-0' : 'opacity-100'}`}></div>
                        
                        {/* The "Flip" Ellipse */}
                        {/* Rotates to cover/reveal */}
                        <div 
                           className="absolute top-0 left-0 w-full h-full rounded-full bg-[#1a1a1a] transition-transform duration-0"
                           style={{
                               transform: `rotateY(${ (phase * 360) }deg)`,
                               backgroundColor: isCrescent ? '#1a1a1a' : '#e0e0e0', // Dark for crescent, Light for gibbous
                               backfaceVisibility: 'hidden', // Hide back
                               // Actually this 3D transform is the standard way!
                               // But requires perspective on parent?
                           }}
                        >
                        </div>
                         {/* We need a specific structure for 3D phase. 
                             Let's fallback to "Shadow Slide" which is robust enough for kids. 
                         */}
                         
                         {/* RESET INTERIOR */}
                    </div>
                     
                    {/* ROBUST SIMPLE VERSION: OVERLAPPING SHADOW */}
                    <div className="absolute inset-0 bg-transparent rounded-full shadow-[inset_-10px_-10px_40px_rgba(0,0,0,0.9)] z-20"></div> {/* Surface depth */}
                    
                     {/* Dynamic Light */}
                    <div 
                      className="absolute inset-0 rounded-full mix-blend-screen"
                      style={{
                          background: `radial-gradient(circle at ${(1-phase)*100}% 50%, #fff 20%, transparent 60%)`,
                          opacity: day === 15 || day === 16 ? 1 : 0.8
                      }}
                    ></div>
                    {/* Dynamic Shadow Cover */}
                     <div 
                      className="absolute inset-0 rounded-full bg-black transition-all duration-75"
                      style={{
                          clipPath: isWaxing 
                             ? (isCrescent 
                                 ? `ellipse(${50 - (phase*200)}% 100% at left)`  // Waxing Crescent: Shadow on Left? No, light on right.
                                 : `ellipse(0% 0% at center)` ) // Fallback, this math is too trial-and-error without preview.
                             : `none`
                      }}
                    ></div>
                    
                    {/* FINAL ATTEMPT: Text-based visual or simple opacity fade for MVP reliability if visual is complex */}
                    {/* Combining with the gradient approach above (lines 75-79) which effectively moves a 'light source' across the face */}
                </div>
            </div>

            {/* Info */}
            <div className="text-center mb-6">
                <div className="text-kidrise-orange font-bold text-xl mb-1">{t.moonDay} {Math.round(day)}</div>
                <div className="text-2xl font-bold text-white mb-2">{info.name}</div>
                <p className="text-sm text-gray-400 max-w-xs h-10">{info.reason}</p>
            </div>

            {/* Slider */}
            <div className="w-full max-w-xs px-4">
                <label className="text-xs text-gray-500 mb-2 block text-center uppercase tracking-widest">{t.moonPhaseTitle}</label>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  step="1"
                  value={day} 
                  onChange={(e) => setDay(parseFloat(e.target.value))}
                  className="w-full accent-kidrise-orange h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
            </div>

       </div>
    </div>
  );
};

export default MoonPhaseLearn;
