
import React, { useRef, useEffect } from 'react';

const MeteorSim: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let meteors: { x: number; y: number; len: number; speed: number; angle: number; age: number }[] = [];
    
    // Resize
    const resize = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);

    // Click to spawn
    const spawnMeteor = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        for(let i=0; i<5; i++) {
            meteors.push({
                x: x + (Math.random() - 0.5) * 50,
                y: y + (Math.random() - 0.5) * 50,
                len: Math.random() * 50 + 50,
                speed: Math.random() * 10 + 10,
                angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 deg
                age: 0
            });
        }
    };
    canvas.addEventListener('mousedown', spawnMeteor);

    // Auto spawn occasionally
    const autoSpawn = setInterval(() => {
        if(Math.random() > 0.7) {
            meteors.push({
                x: Math.random() * canvas.width,
                y: -50,
                len: Math.random() * 80 + 50,
                speed: Math.random() * 15 + 10,
                angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
                age: 0
            });
        }
    }, 500);

    let animationId: number;
    const animate = () => {
        // Starry background
        ctx.fillStyle = '#1a1a4a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Static stars
        ctx.fillStyle = 'white';
        for (let i = 0; i < 50; i++) {
             // Simple random stars (re-drawing random every frame is jittery, ideally calculate once but for sim is ok to static or pseudo-random)
             // Let's use pseudo-random based on index to keep them static
             const seed = i * 13271;
             const sx = (seed % canvas.width);
             const sy = ((seed * 3) % canvas.height);
             ctx.globalAlpha = 0.5 + Math.sin(Date.now() * 0.005 + i) * 0.3; // twinkle
             ctx.fillRect(sx, sy, 2, 2);
        }
        ctx.globalAlpha = 1;

        // Meteors
        for (let i = meteors.length - 1; i >= 0; i--) {
            const m = meteors[i];
            m.x += Math.cos(m.angle) * m.speed;
            m.y += Math.sin(m.angle) * m.speed;
            m.age++;

            const gradient = ctx.createLinearGradient(m.x, m.y, m.x - Math.cos(m.angle)*m.len, m.y - Math.sin(m.angle)*m.len);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(m.x - Math.cos(m.angle)*m.len, m.y - Math.sin(m.angle)*m.len);
            ctx.stroke();

            if (m.y > canvas.height + 100 || m.x > canvas.width + 100 || m.age > 100) {
                meteors.splice(i, 1);
            }
        }

        animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
        cancelAnimationFrame(animationId);
        clearInterval(autoSpawn);
        window.removeEventListener('resize', resize);
        canvas.removeEventListener('mousedown', spawnMeteor);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-[#1a1a4a] rounded-3xl overflow-hidden border border-white/20">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-pointer" />
      <div className="absolute bottom-6 z-10 bg-white/10 px-6 py-2 rounded-full backdrop-blur pointer-events-none">
          <p className="text-white text-sm font-bold flex items-center gap-2">
              <span className="animate-pulse">👆</span> Tap sky to make a wish!
          </p>
      </div>
    </div>
  );
};

export default MeteorSim;
