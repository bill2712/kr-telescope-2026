import React, { useState, useEffect, useRef } from 'react';
import { translations } from '../../utils/i18n';
import { Language } from '../../types';
import CanvasConfetti from 'canvas-confetti';

interface ConstellationGameProps {
  lang: Language;
}

interface StarPoint {
  id: number;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  isMain?: boolean; // If true, part of the main shape
}

interface Connection {
  start: number;
  end: number;
}

interface Level {
  id: string;
  nameKey: string;
  stars: StarPoint[];
  solution: Connection[];
  bgImage?: string; // Optional art to reveal
}

const LEVELS: Level[] = [
  {
    id: 'ursa_major',
    nameKey: 'conUrsaMajor',
    stars: [
      { id: 1, x: 20, y: 40, isMain: true }, // Dubhe
      { id: 2, x: 35, y: 45, isMain: true }, // Merak
      { id: 3, x: 38, y: 55, isMain: true }, // Phecda
      { id: 4, x: 25, y: 52, isMain: true }, // Megrez
      { id: 5, x: 45, y: 60, isMain: true }, // Alioth
      { id: 6, x: 55, y: 65, isMain: true }, // Mizar
      { id: 7, x: 70, y: 80, isMain: true }, // Alkaid
      // Decoys
      { id: 8, x: 10, y: 20 },
      { id: 9, x: 80, y: 30 },
      { id: 10, x: 60, y: 10 },
    ],
    solution: [
      { start: 1, end: 2 },
      { start: 2, end: 3 },
      { start: 3, end: 4 },
      { start: 4, end: 1 },
      { start: 4, end: 5 },
      { start: 5, end: 6 },
      { start: 6, end: 7 },
    ]
  },
  {
    id: 'cassiopeia',
    nameKey: 'conCassiopeia',
    stars: [
      { id: 1, x: 15, y: 30, isMain: true },
      { id: 2, x: 35, y: 60, isMain: true },
      { id: 3, x: 50, y: 40, isMain: true },
      { id: 4, x: 65, y: 60, isMain: true },
      { id: 5, x: 85, y: 25, isMain: true },
      // Decoys
      { id: 6, x: 30, y: 20 },
      { id: 7, x: 70, y: 80 },
    ],
    solution: [
      { start: 1, end: 2 },
      { start: 2, end: 3 },
      { start: 3, end: 4 },
      { start: 4, end: 5 },
    ]
  },
  {
    id: 'orion',
    nameKey: 'conOrion',
    stars: [
      { id: 1, x: 30, y: 20, isMain: true }, // Betelgeuse
      { id: 2, x: 70, y: 25, isMain: true }, // Bellatrix
      { id: 3, x: 45, y: 45, isMain: true }, // Belt 1
      { id: 4, x: 50, y: 44, isMain: true }, // Belt 2
      { id: 5, x: 55, y: 43, isMain: true }, // Belt 3
      { id: 6, x: 35, y: 70, isMain: true }, // Saiph
      { id: 7, x: 65, y: 75, isMain: true }, // Rigel
      // Decoys
      { id: 8, x: 10, y: 50 },
      { id: 9, x: 90, y: 60 },
    ],
    solution: [
      { start: 1, end: 3 },
      { start: 2, end: 5 },
      { start: 3, end: 4 },
      { start: 4, end: 5 },
      { start: 3, end: 6 },
      { start: 5, end: 7 },
      { start: 1, end: 2 }, // shoulders? Usually not connected directly in stick figure but often shown. Let's keep it simple: Body loop or key lines.
      // Simplification: Betelgeuse -> Belt1, Bellatrix -> Belt3, Belt -> Belt, Belt1 -> Saiph, Belt3 -> Rigel.  Shoulders often connected via head but let's just do the "Hourglass" + Belt.
      // Actually standard stick figure: 1-3, 2-5, 3-4, 4-5, 3-6, 5-7. Head is usually optional.
    ] 
  }
];

const ConstellationGame: React.FC<ConstellationGameProps> = ({ lang }) => {
  const t = translations[lang] as any; // Cast to access dynamic keys
  const [levelIndex, setLevelIndex] = useState(0);
  const [userLines, setUserLines] = useState<Connection[]>([]);
  const [currentDragStart, setCurrentDragStart] = useState<StarPoint | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [completed, setCompleted] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const currentLevel = LEVELS[levelIndex];

  // Reset when level changes
  useEffect(() => {
    setUserLines([]);
    setCompleted(false);
    setCurrentDragStart(null);
  }, [levelIndex]);

  // Check victory
  useEffect(() => {
    // Check if all solution lines exist in userLines
    // Order doesn't matter, direction doesn't matter
    if (completed) return;

    const allFound = currentLevel.solution.every(sol => {
      return userLines.some(ul => 
        (ul.start === sol.start && ul.end === sol.end) || 
        (ul.start === sol.end && ul.end === sol.start)
      );
    });

    if (allFound) {
      setCompleted(true);
      CanvasConfetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [userLines, currentLevel, completed]);

  const handlePointerStart = (event: React.PointerEvent, star: StarPoint) => {
    if (completed) return;
    event.preventDefault();
    containerRef.current?.setPointerCapture(event.pointerId);
    setCurrentDragStart(star);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!currentDragStart || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    setMousePos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  const completeConnection = (star: StarPoint | undefined) => {
    if (!currentDragStart || completed) return;
    
    if (star && star.id !== currentDragStart.id) {
       // Validate Connection
       const isValid = currentLevel.solution.some(sol => 
         (sol.start === currentDragStart.id && sol.end === star.id) ||
         (sol.start === star.id && sol.end === currentDragStart.id)
       );

       const alreadyExists = userLines.some(ul => 
         (ul.start === currentDragStart.id && ul.end === star.id) ||
         (ul.start === star.id && ul.end === currentDragStart.id)
       );

       if (isValid && !alreadyExists) {
         setUserLines(prev => [...prev, { start: currentDragStart.id, end: star.id }]);
         // Play sound?
       }
    }
    setCurrentDragStart(null);
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!currentDragStart || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const releaseX = event.clientX - rect.left;
    const releaseY = event.clientY - rect.top;
    const hitRadius = Math.max(28, Math.min(rect.width, rect.height) * 0.055);
    const target = currentLevel.stars.find((star) => {
      const starX = (star.x / 100) * rect.width;
      const starY = (star.y / 100) * rect.height;
      return Math.hypot(releaseX - starX, releaseY - starY) <= hitRadius;
    });

    completeConnection(target);
    if (containerRef.current.hasPointerCapture(event.pointerId)) {
      containerRef.current.releasePointerCapture(event.pointerId);
    }
  };

  // Handle Mouse Drag Line logic separately because mixing % and px in SVG is tricky
  // Let's just create a separate FULL SCREEN SVG overlay for the drag line that uses pixels? 
  // OR just calculate the % for the current mouse pos.
  const getMousePct = () => {
      if (!containerRef.current) return { x: 0, y: 0 };
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      return {
          x: (mousePos.x / width) * 100,
          y: (mousePos.y / height) * 100
      };
  }
  const dragPct = getMousePct();

  return (
    <div className="flex min-h-[520px] h-[70vh] max-h-[700px] flex-col bg-[#0B0D17] text-white">
      <div className="flex justify-center items-center p-4">
         <h2 className="text-xl font-bold">{t[currentLevel.nameKey] || currentLevel.id}</h2>
      </div>

      {/* Game Area */}
      <div 
         ref={containerRef}
         className="relative m-4 min-h-[360px] flex-1 bg-[#161825] rounded-3xl overflow-hidden border border-white/10 shadow-inner touch-none select-none"
         onPointerMove={handlePointerMove}
         onPointerUp={handlePointerEnd}
         onPointerCancel={() => setCurrentDragStart(null)}
      >
          {/* Instructions Overlay (Top) */}
          <div className="absolute top-4 left-0 right-0 text-center pointer-events-none">
             {!completed 
                ? <p className="text-gray-400 text-sm animate-pulse">{t.conGameLink || "Connect the stars!"}</p>
                : <p className="text-green-400 font-bold text-lg animate-bounce">{t.conGameComplete || "Excellent!"}</p>
             }
          </div>

          {/* SVG Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* Draw solution faint guides? No, that makes it too easy. */}
            
            {/* User Lines */}
            {userLines.map((line, i) => {
                 const startStar = currentLevel.stars.find(s => s.id === line.start)!;
                 const endStar = currentLevel.stars.find(s => s.id === line.end)!;
                 return (
                    <line 
                        key={i}
                        x1={`${startStar.x}%`} y1={`${startStar.y}%`}
                        x2={`${endStar.x}%`} y2={`${endStar.y}%`}
                        stroke={completed ? "#FDB813" : "#4ade80"}
                        strokeWidth="3"
                        strokeLinecap="round"
                        filter="drop-shadow(0 0 5px rgba(74,222,128,0.5))"
                    />
                 );
            })}

            {/* Current Drag Line */}
            {currentDragStart && (
                <line 
                    x1={`${currentDragStart.x}%`} y1={`${currentDragStart.y}%`}
                    x2={`${dragPct.x}%`} y2={`${dragPct.y}%`}
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.5"
                />
            )}
          </svg>

          {/* Stars */}
          {currentLevel.stars.map(star => {
              // Check if this star is connected
              const isConnected = userLines.some(l => l.start === star.id || l.end === star.id);
              return (
                  <button
                     type="button"
                     key={star.id}
                     className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center transition-all z-20 cursor-pointer
                        ${isConnected ? 'bg-white shadow-[0_0_15px_white]' : 'bg-white/30 hover:bg-white/60'}
                        ${currentDragStart?.id === star.id ? 'scale-125 bg-white' : ''}
                     `}
                     style={{ left: `${star.x}%`, top: `${star.y}%` }}
                     onPointerDown={(event) => handlePointerStart(event, star)}
                     aria-label={`${t.conGameLink || 'Connect star'} ${star.id}`}
                  >
                      {/* Star Core */}
                      <div className={`w-3 h-3 bg-white rounded-full ${star.isMain ? 'w-4 h-4' : ''}`}></div>
                  </button>
              );
          })}
      </div>

      {/* Controls */}
      {completed && (
          <div className="p-6 pt-0 animate-fade-in-up">
              <div className="bg-[#1c1e33] p-4 rounded-2xl border border-white/20 text-center mb-4">
                  <h3 className="text-xl font-bold text-kidrise-orange mb-1">{t[currentLevel.nameKey]}</h3>
                  <p className="text-sm text-gray-400">
                      {currentLevel.id === 'ursa_major' && "The Big Bear / Dipper"}
                      {currentLevel.id === 'cassiopeia' && "The Queen"}
                      {currentLevel.id === 'orion' && "The Hunter"}
                  </p>
              </div>
              <button 
                onClick={() => setLevelIndex((prev) => (prev + 1) % LEVELS.length)}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl font-bold text-lg text-white shadow-lg active:scale-95"
              >
                 {levelIndex < LEVELS.length -1 ? (t.nextLevel || "Next Level") : (t.restart || "Restart")}
              </button>
          </div>
      )}
    </div>
  );
};

export default ConstellationGame;
