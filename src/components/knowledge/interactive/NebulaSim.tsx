import React, { useRef, useEffect } from 'react';
import { translations } from '../../../utils/i18n';
import { Language } from '../../../types';

const NebulaSim: React.FC<{lang: Language}> = ({lang}) => {
    const t = translations[lang];
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Simple particle system with "smear" effect
        let time = 0;
        
        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };
        resize();
        window.addEventListener('resize', resize);
    
        let animationId: number;
        const animate = () => {
            time += 0.01;
            
            // Clear with transparency for trails
            ctx.fillStyle = 'rgba(20, 10, 30, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw "Clouds" using overlapping circles
            // Use time to move centers
            const centers = [
                { x: canvas.width * 0.3 + Math.sin(time) * 50, y: canvas.height * 0.4 + Math.cos(time * 0.7) * 30, color: 'rgba(255, 0, 100, 0.05)', r: 100 },
                { x: canvas.width * 0.7 + Math.cos(time * 0.5) * 50, y: canvas.height * 0.6 + Math.sin(time * 0.8) * 30, color: 'rgba(0, 100, 255, 0.05)', r: 120 },
                { x: canvas.width * 0.5 + Math.sin(time * 0.3) * 80, y: canvas.height * 0.5 + Math.cos(time * 0.2) * 80, color: 'rgba(100, 0, 200, 0.05)', r: 150 },
            ];
            
            ctx.globalCompositeOperation = 'screen';
            
            for(let j=0; j<10; j++) { // Multi-pass for density
                centers.forEach(c => {
                    const noiseX = (Math.random() - 0.5) * 60;
                    const noiseY = (Math.random() - 0.5) * 60;
                    ctx.beginPath();
                    ctx.arc(c.x + noiseX, c.y + noiseY, c.r * (0.8 + Math.random()*0.4), 0, Math.PI * 2);
                    ctx.fillStyle = c.color;
                    ctx.fill();
                });
            }
            
            // Stars
             ctx.globalCompositeOperation = 'source-over';
             if(Math.random() > 0.8) {
                 ctx.fillStyle = 'white';
                 ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 1, 1);
             }

            animationId = requestAnimationFrame(animate);
        };
        animate();
    
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
      }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-[#140a1e] rounded-3xl overflow-hidden border border-white/20">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute bottom-6 z-10 bg-white/10 px-6 py-2 rounded-full backdrop-blur pointer-events-none">
          <p className="text-white text-sm font-bold">{t.interactive.nursery}</p>
      </div>
    </div>
  );
};

export default NebulaSim;
