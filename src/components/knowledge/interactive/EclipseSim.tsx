
import React, { useState } from 'react';

const EclipseSim: React.FC = () => {
  const [position, setPosition] = useState(0); // -100 to 100

  // Calculation
  // Sun at center (0)
  // Moon moves from -100 to 100
  const overlap = Math.max(0, 100 - Math.abs(position)); // rough overlap metric
  const isTotality = Math.abs(position) < 5;

  return (
    <div className="relative w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-black rounded-3xl overflow-hidden border border-white/20">
      
      {/* Sky Color Changes during Totality */}
      <div 
        className="absolute inset-0 transition-colors duration-1000 ease-out"
        style={{ backgroundColor: isTotality ? '#050510' : '#4fa4ff' }}
      ></div>

      {/* Sun */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-yellow-400 shadow-[0_0_50px_orange]"></div>
      
      {/* Corona (Only visible at totality) */}
       <div 
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full transition-opacity duration-500"
         style={{ 
             opacity: isTotality ? 1 : 0,
             boxShadow: '0 0 30px 10px rgba(255, 255, 255, 0.8), 0 0 60px 20px rgba(255, 200, 100, 0.5)' 
         }}
       ></div>

      {/* Moon */}
      <div 
         className="absolute top-1/2 left-1/2 -translate-y-1/2 w-33 h-33 rounded-full bg-black shadow-inner transition-transform duration-100 ease-out"
         style={{ 
             width: '130px', height: '130px', // Slightly larger to cover sun perfectly
             transform: `translate(calc(-50% + ${position * 2}px), -50%)`
         }}
      ></div>

      {/* Info Overlay */}
      <div className="absolute top-10 text-white font-bold text-2xl drop-shadow-md transition-opacity duration-300 pointer-events-none">
          {isTotality ? "TOTALITY! 🌑" : (Math.abs(position) < 60 ? "Partial Eclipse 🌗" : "Daytime ☀️")}
      </div>

      <div className="absolute bottom-6 w-64 bg-white/20 p-4 rounded-xl backdrop-blur border border-white/10 z-10">
          <input 
            type="range" 
            min="-120" 
            max="120" 
            value={position} 
            onChange={(e) => setPosition(Number(e.target.value))}
            className="w-full accent-yellow-400"
          />
          <p className="text-[10px] text-white mt-2 text-center">Slide the Moon to cover the Sun!</p>
      </div>

    </div>
  );
};

export default EclipseSim;
