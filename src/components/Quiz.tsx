
import React, { useState } from 'react';
import { Language } from '../types';

interface QuizProps {
    lang: Language;
}

const Quiz: React.FC<QuizProps> = ({ lang }) => {
    const [score, setScore] = useState(0);
    const [qIndex, setQIndex] = useState(0);

    // Simple localized questions
    const questions = lang === 'zh-HK' ? [
        { q: "哪顆星星是夜空中最亮的？", a: ["天狼星", "織女星", "北極星"], correct: 0 },
        { q: "距離太陽最近的行星是？", a: ["金星", "火星", "水星"], correct: 2 },
    ] : [
        { q: "Which is the brightest star in the night sky?", a: ["Sirius", "Vega", "Polaris"], correct: 0 },
        { q: "What is the closest planet to the Sun?", a: ["Venus", "Mars", "Mercury"], correct: 2 },
    ];

    const handleAnswer = (idx: number) => {
        if (idx === questions[qIndex].correct) setScore(s => s + 1);
        if (qIndex < questions.length - 1) setQIndex(q => q + 1);
        else alert(lang === 'zh-HK' ? `測驗完成！分數: ${score + (idx === questions[qIndex].correct ? 1 : 0)}` : `Quiz Done! Score: ${score + (idx === questions[qIndex].correct ? 1 : 0)}`);
    };

  return (
    <div className="h-full pt-24 px-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-8">{lang === 'zh-HK' ? "每日小測驗" : "Daily Quiz"}</h2>
      
      <div className="w-full max-w-md bg-gradient-to-br from-[#2a2d45] to-[#1c1e2e] p-8 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
            <div className="h-full bg-kidrise-orange" style={{ width: `${(qIndex + 1) / questions.length * 100}%` }}></div>
        </div>
        
        <h3 className="text-xl font-bold mb-6">{questions[qIndex].q}</h3>
        
        <div className="flex flex-col gap-3">
            {questions[qIndex].a.map((ans, i) => (
                <button 
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-left font-semibold transition-colors border border-white/5"
                >
                    {ans}
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
