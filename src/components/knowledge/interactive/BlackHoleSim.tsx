
import React, { useRef, useEffect, useState } from 'react';

const BlackHoleSim: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mass, setMass] = useState(50);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; r: number; color: string }[] = [];
    const center = { x: canvas.width / 2, y: canvas.height / 2 };
    
    // Resize handler
    const resize = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        center.x = canvas.width / 2;
        center.y = canvas.height / 2;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initial particles
    for(let i=0; i<100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            r: Math.random() * 2 + 1,
            color: `hsl(${Math.random() * 60 + 200}, 100%, 70%)`
        });
    }

    let animationId: number;
    const animate = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trail effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Black Hole
        ctx.beginPath();
        ctx.arc(center.x, center.y, mass / 2, 0, Math.PI * 2);
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'purple';
        ctx.strokeStyle = 'rgba(100, 0, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Accretion Disk (Simple)
        ctx.beginPath();
        ctx.ellipse(center.x, center.y, mass * 2, mass * 0.6, 0.2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 100, 50, 0.3)';
        ctx.lineWidth = 10;
        ctx.stroke();

        particles.forEach(p => {
            const dx = center.x - p.x;
            const dy = center.y - p.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            // Gravity
            if (dist > mass/2) {
                const force = (mass * 5) / (dist * dist); // Simplified gravity
                const angle = Math.atan2(dy, dx);
                p.vx += Math.cos(angle) * force;
                p.vy += Math.sin(angle) * force;
            } else {
                // Respawn
                p.x = Math.random() * canvas.width;
                p.y = Math.random() * canvas.height;
                p.vx = (Math.random() - 0.5) * 2;
                p.vy = (Math.random() - 0.5) * 2;
            }

            p.x += p.vx;
            p.y += p.vy;

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });

        animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', resize);
    };
  }, [mass]);

  return (
    <div className="relative w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-black rounded-3xl overflow-hidden border border-white/20">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
      <div className="absolute bottom-6 z-10 w-64 bg-black/50 p-4 rounded-xl backdrop-blur border border-white/10">
          <label className="text-white text-xs font-bold uppercase mb-2 block">Event Horizon Size</label>
          <input 
            type="range" 
            min="20" 
            max="100" 
            value={mass} 
            onChange={(e) => setMass(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
          <p className="text-[10px] text-gray-400 mt-2 text-center">Drag slider to change gravity!</p>
      </div>
    </div>
  );
};

export default BlackHoleSim;
