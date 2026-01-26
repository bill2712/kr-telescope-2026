
import React, { useState } from 'react';

const GalaxySim: React.FC = () => {
  const [tiltX, setTiltX] = useState(60);
  const [spinSpeed, setSpinSpeed] = useState(20);

  return (
    <div className="relative w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-[#100520] rounded-3xl overflow-hidden border border-white/20 perspective-1000">
      
      {/* 3D Scene */}
      <div 
        className="w-64 h-64 relative preserve-3d transition-transform duration-500 ease-out"
        style={{ transform: `rotateX(${tiltX}deg)` }}
      >
          {/* Galaxy Spiral (CSS based) */}
          <div 
             className="absolute inset-0 rounded-full animate-spin-slow"
             style={{ 
                 background: 'radial-gradient(ellipse at center, rgba(255,200,150,1) 0%, rgba(100,0,150,0.5) 40%, rgba(0,0,0,0) 70%)',
                 boxShadow: '0 0 50px rgba(100, 0, 200, 0.5)',
                 animationDuration: `${spinSpeed}s`
             }}
          ></div>
          
           {/* Detailed Arms (Pseudo) */}
          <div 
              className="absolute inset-0 rounded-full animate-spin-slow mix-blend-screen"
              style={{ 
                  border: '2px dashed rgba(200, 200, 255, 0.3)',
                  animationDuration: `${spinSpeed * 0.8}s`
              }}
          ></div>
           <div 
              className="absolute inset-4 rounded-full animate-spin-slow mix-blend-screen"
              style={{ 
                  border: '4px dotted rgba(255, 100, 200, 0.2)', 
                  transform: 'rotate(45deg)',
                  animationDuration: `${spinSpeed * 1.2}s`
              }}
          ></div>

          {/* Central Bulge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full blur-xl opacity-80"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#fff5d0] rounded-full shadow-[0_0_20px_#fff]"></div>
      </div>

      <div className="absolute bottom-6 flex gap-4 w-full px-8">
          <div className="flex-1 bg-white/10 p-3 rounded-xl backdrop-blur">
              <label className="text-white text-[10px] font-bold uppercase mb-1 block">Tilt Angle</label>
              <input 
                type="range" 
                min="0" 
                max="90" 
                value={tiltX} 
                onChange={(e) => setTiltX(Number(e.target.value))}
                className="w-full accent-pink-500"
              />
          </div>
           <div className="flex-1 bg-white/10 p-3 rounded-xl backdrop-blur">
              <label className="text-white text-[10px] font-bold uppercase mb-1 block">Rotation Speed</label>
              <input 
                type="range" 
                min="1" 
                max="60" 
                value={60 - spinSpeed} 
                onChange={(e) => setSpinSpeed(60 - Number(e.target.value))}
                className="w-full accent-purple-500"
              />
          </div>
      </div>
    </div>
  );
};

export default GalaxySim;
