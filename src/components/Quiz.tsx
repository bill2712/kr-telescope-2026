import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import CanvasConfetti from 'canvas-confetti';

interface QuizProps {
    lang: Language;
}

const Quiz: React.FC<QuizProps> = ({ lang }) => {
    const t = translations[lang];
    const [score, setScore] = useState(0);
    const [qIndex, setQIndex] = useState(0);
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [selectedAns, setSelectedAns] = useState<number | null>(null);
    const [userName, setUserName] = useState("");

    // Helper for base path
    const getAssetPath = (path: string) => `${import.meta.env.BASE_URL}${path}`;

    // Questions mapped from i18n
    const questions = [
        { q: t.q1, a: t.q1a, correct: 0, explain: t.q1_explain, img: getAssetPath('assets/knowledge/quiz_sirius.png') },
        { q: t.q2, a: t.q2a, correct: 2, explain: t.q2_explain, img: getAssetPath('assets/knowledge/quiz_mercury.png') },
        { q: t.q3, a: t.q3a, correct: 1, explain: t.q3_explain, img: getAssetPath('assets/knowledge/moon.png') },
        { q: t.q4, a: t.q4a, correct: 1, explain: t.q4_explain, img: getAssetPath('assets/knowledge/jupiter.png') },
        { q: t.q5, a: t.q5a, correct: 1, explain: t.q5_explain, img: getAssetPath('assets/knowledge/andromeda_galaxy.png') },
        { q: t.q6, a: t.q6a, correct: 2, explain: t.q6_explain, img: getAssetPath('assets/knowledge/rigel.png') },
        { q: t.q7, a: t.q7a, correct: 0, explain: t.q7_explain, img: getAssetPath('assets/knowledge/earth.png') },
        { q: t.q8, a: t.q8a, correct: 0, explain: t.q8_explain, img: getAssetPath('assets/knowledge/mars.png') },
        { q: t.q9, a: t.q9a, correct: 1, explain: t.q9_explain, img: getAssetPath('assets/knowledge/sun.png') },
        { q: t.q10, a: t.q10a, correct: 0, explain: t.q10_explain, img: getAssetPath('assets/knowledge/saturn.png') },
        { q: t.q11, a: t.q11a, correct: 1, explain: t.q11_explain, img: getAssetPath('assets/knowledge/meteor.png') },
        { q: t.q12, a: t.q12a, correct: 1, explain: t.q12_explain, img: getAssetPath('assets/knowledge/blackhole.png') },
        { q: t.q13, a: t.q13a, correct: 0, explain: t.q13_explain, img: getAssetPath('assets/knowledge/pleiades.png') },
        { q: t.q14, a: t.q14a, correct: 1, explain: t.q14_explain, img: getAssetPath('assets/knowledge/polaris.png') },
        { q: t.q15, a: t.q15a, correct: 0, explain: t.q15_explain, img: getAssetPath('assets/knowledge/moon.png') },
    ];

    useEffect(() => {
        if (finished && (score / questions.length >= 0.6)) {
            CanvasConfetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, [finished, score]);

    const handleAnswer = (idx: number) => {
        if (feedback !== null || showExplanation) return;
        setSelectedAns(idx);
        
        const isCorrect = idx === questions[qIndex].correct;
        
        if (isCorrect) {
            setScore(s => s + 1);
            setFeedback('correct');
            setTimeout(() => {
                setShowExplanation(true);
            }, 1000);
        } else {
            setFeedback('wrong');
            setTimeout(() => {
                setFeedback(null);
                setSelectedAns(null);
            }, 1000);
        }
    };

    const nextQuestion = () => {
        setShowExplanation(false);
        setFeedback(null);
        setSelectedAns(null);
        
        if (qIndex < questions.length - 1) {
            setQIndex(q => q + 1);
        } else {
            setFinished(true);
        }
    };

    const restart = () => {
        setScore(0);
        setQIndex(0);
        setFinished(false);
        setStarted(true);
        setFeedback(null);
        setShowExplanation(false);
        setUserName("");
    };

    const handleDownload = () => {
        window.print();
    };

    const getRank = () => {
        const percentage = score / questions.length;
        if (percentage >= 0.9) return { title: t.rank5, color: 'text-purple-400' };
        if (percentage >= 0.7) return { title: t.rank4, color: 'text-blue-400' };
        if (percentage >= 0.5) return { title: t.rank3, color: 'text-green-400' };
        if (percentage >= 0.3) return { title: t.rank2, color: 'text-yellow-400' };
        return { title: t.rank1, color: 'text-gray-400' };
    };

    // --- 1. Intro View ---
    if (!started) {
        return (
            <div className="h-full pt-20 px-4 flex flex-col items-center justify-center animate-fade-in-up-simple">
                <div className="max-w-md w-full bg-[#1c1e33] p-8 rounded-3xl border border-white/10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-blue-500/5 pointer-events-none animate-pulse"></div>
                    <div className="text-6xl mb-6">🚀</div>
                    <h2 className="text-3xl font-bold mb-4 text-white">{t.quizTitle}</h2>
                    <p className="text-gray-300 mb-8 text-lg">{t.quizIntro}</p>
                    <button 
                        onClick={() => setStarted(true)}
                        className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl font-bold text-xl text-white shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all active:scale-95"
                    >
                        {t.quizStart}
                    </button>
                </div>
            </div>
        );
    }

    // --- 2. Result View ---
    if (finished) {
        const rank = getRank();
        const percentage = score / questions.length;
        const isPass = percentage >= 0.6; // 60% pass rate

        return (
            <div className="min-h-full pt-20 px-4 flex flex-col items-center justify-center animate-pop pb-20">
                 <style>
                    {`
                    @media print {
                        @page { margin: 0; size: landscape; }
                        body * { visibility: hidden; }
                        .certificate-container, .certificate-container * { visibility: visible; }
                        .certificate-container {
                            position: fixed;
                            left: 0;
                            top: 0;
                            width: 100vw;
                            height: 100vh;
                            z-index: 9999;
                            display: flex !important;
                            align-items: center;
                            justify-content: center;
                            background: white;
                        }
                    }
                    `}
                </style>

                {/* Main Result Card */}
                <div className="print:hidden max-w-lg w-full bg-[#1c1e33] p-8 rounded-3xl border border-white/20 text-center shadow-2xl mb-20 scrollbar-hide">
                    <h2 className="text-3xl font-bold mb-2 text-white">{t.quizComplete}</h2>
                    <div className="text-8xl my-6 animate-bounce">🏆</div>
                    <p className="text-gray-400 mb-2">{t.quizScore}</p>
                    <p className="text-5xl font-black text-white mb-4">{score} / {questions.length}</p>
                    
                    <p className="text-lg text-slate-300 mb-6">
                        {score === questions.length ? t.perfect : (isPass ? t.good : t.tryAgain)}
                    </p>

                    <div className="bg-white/5 p-6 rounded-2xl mb-8 border border-white/5">
                        <p className="text-sm text-gray-400 mb-2 uppercase tracking-wide">{t.quizRank}</p>
                        <p className={`text-2xl font-bold ${rank.color}`}>{rank.title}</p>
                    </div>

                    {isPass && (
                        <div className="space-y-4 pt-4 border-t border-white/10 mb-8">
                            <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider">{t.enterName}</label>
                            <input 
                                type="text" 
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder={t.certNamePlaceholder || "Your Name..."}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center text-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <button 
                                onClick={handleDownload} 
                                disabled={!userName.trim()} 
                                className={`w-full py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${!userName.trim() ? 'bg-white/5 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:scale-105 shadow-lg'}`}
                            >
                                <i className="fas fa-file-download"></i> {t.download}
                            </button>
                        </div>
                    )}

                    <button 
                        onClick={restart}
                        className="w-full py-4 bg-white/10 text-white rounded-xl font-bold text-xl hover:bg-white/20 transition-all"
                    >
                        {t.quizRetry}
                    </button>
                </div>

                {/* --- Hidden Certificate (Only visible in Print) --- */}
                <div className="certificate-container hidden print:flex fixed inset-0 z-[9999] bg-white text-black flex-col items-center justify-center w-[297mm] h-[210mm] overflow-hidden">
                     {/* Certificate Border */}
                     <div className="w-[280mm] h-[190mm] border-[8px] border-double border-slate-800 relative p-12 flex flex-col items-center bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
                         
                         {/* Corner Ornaments */}
                         <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-amber-600"></div>
                         <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-amber-600"></div>
                         <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-amber-600"></div>
                         <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-amber-600"></div>

                         <div className="text-center space-y-6 z-10 w-full max-w-4xl mt-8">
                              <div className="flex items-center justify-center gap-4 mb-4 opacity-80">
                                  <div className="text-3xl text-amber-500">★</div>
                                  <span className="text-xl tracking-[0.3em] font-serif font-bold text-slate-600 uppercase">{t.certTitle}</span>
                                  <div className="text-3xl text-amber-500">★</div>
                              </div>
                              
                              <h1 className="text-6xl font-serif font-bold text-slate-900 mb-2 tracking-wide">{t.certificate}</h1>
                              
                              <p className="text-xl text-slate-600 italic mt-8">{t.certCertifies}</p>
                              
                              <div className="text-6xl font-script text-amber-700 border-b-2 border-slate-300 pb-2 px-12 min-w-[400px] inline-block font-bold">
                                  {userName || "Future Astronomer"}
                              </div>
                              
                              <p className="text-2xl text-slate-600 mt-8 max-w-3xl mx-auto leading-relaxed">
                                  {t.certCompleted} <strong>{t.quizTitle}</strong> {t.certScore} <strong>{Math.round((score/questions.length)*100)}%</strong>, {t.certDemonstrating}
                              </p>
                          </div>

                         <div className="absolute bottom-24 w-full flex justify-between px-32 items-end">
                             <div className="text-center">
                                 <div className="w-64 border-b border-slate-400 mb-2"></div>
                                 <p className="text-sm font-bold uppercase text-slate-500 tracking-wider">{t.date}</p>
                                 <p className="font-mono text-lg">{new Date().toLocaleDateString()}</p>
                             </div>
                             
                             <div className="flex flex-col items-center">
                                  {/* Seal */}
                                  <div className="relative w-40 h-40 rotate-12 drop-shadow-xl text-amber-700">
                                      <svg viewBox="0 0 200 200" className="w-full h-full fill-current">
                                          <path d="M100 0 L108 8 L120 2 L125 12 L138 10 L140 22 L152 24 L150 36 L162 42 L158 52 L168 60 L160 70 L170 80 L160 90 L168 100 L160 110 L170 120 L160 130 L168 140 L158 148 L162 158 L150 164 L152 176 L140 178 L138 190 L125 188 L120 198 L108 192 L100 200 L92 192 L80 198 L75 188 L62 190 L60 178 L48 176 L50 164 L38 158 L42 148 L32 140 L40 130 L30 120 L40 110 L32 100 L40 90 L30 80 L40 70 L32 60 L42 52 L38 42 L50 36 L48 24 L60 22 L62 10 L75 12 L80 2 L92 8 Z" fill="#b45309" stroke="#78350f" strokeWidth="2" />
                                          <circle cx="100" cy="100" r="75" fill="#d97706" stroke="#92400e" strokeWidth="2" />
                                          <text x="100" y="105" fontSize="24" fontFamily="serif" fontWeight="bold" fill="#fff" textAnchor="middle">KIDRISE</text>
                                          <text x="100" y="130" fontSize="16" fontFamily="serif" fill="#fff" textAnchor="middle">{t.certOfficial || 'OFFICIAL'}</text>
                                      </svg>
                                  </div>
                             </div>

                             <div className="text-center">
                                 <div className="w-64 border-b border-slate-400 mb-2 text-2xl font-serif text-slate-800 italic">
                                      Kidrise Team
                                 </div>
                                 <p className="text-sm font-bold uppercase text-slate-500 tracking-wider">{t.certifiedBy}</p>
                             </div>
                         </div>
                     </div>
                </div>

            </div>
        );
    }

    return (
        <div className="min-h-full pt-20 px-4 flex flex-col items-center max-w-lg mx-auto pb-10">
            {/* Progress Bar */}
            <div className="w-full mb-4 relative pt-2">
                <div className="flex justify-between text-sm font-bold text-gray-400 mb-2">
                    <span>{t.quizQuestionCount?.replace('{0}', (qIndex + 1).toString()).replace('{1}', questions.length.toString())}</span>
                    <span>{t.quizCurrentScore?.replace('{0}', score.toString())}</span>
                </div>
                <div className="h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                    <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500 ease-out"
                        style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Explanation Modal Overlay */}
            {showExplanation && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up-simple">
                     <div className="bg-[#1c1e33] w-full max-w-md rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col">
                        <div className="h-48 bg-gray-900 relative">
                            <img 
                                src={questions[qIndex].img} 
                                alt="Explanation" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1e33] to-transparent"></div>
                        </div>
                        <div className="p-6 text-center">
                            <h3 className="text-2xl font-bold text-green-400 mb-2">{t.quizCorrect}</h3>
                            <p className="text-white text-lg mb-6 leading-relaxed">{questions[qIndex].explain}</p>
                            <button 
                                onClick={nextQuestion}
                                className="w-full py-3 bg-white text-[#1c1e33] font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                            >
                                {t.quizNext} ➜
                            </button>
                        </div>
                     </div>
                </div>
            )}

            {/* Question Card */}
            <div className={`w-full bg-[#1c1e33] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden transition-all duration-300 ${feedback === 'wrong' ? 'animate-shake border-red-500/50' : ''}`}>
                
                {/* Wrong Feedback Overlay */}
                {feedback === 'wrong' && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 backdrop-blur-md bg-red-500/20 transition-opacity duration-300">
                        <div className="text-center animate-pop">
                            <div className="text-6xl mb-4">🤔</div>
                            <h3 className="text-2xl font-bold text-white drop-shadow-md">{t.quizWrong}</h3>
                        </div>
                    </div>
                )}

                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white leading-relaxed">
                    {questions[qIndex].q}
                </h3>
                
                <div className="flex flex-col gap-4">
                    {questions[qIndex].a.map((ans, i) => {
                        let btnClass = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"; // default
                        
                        if (feedback && i === selectedAns && selectedAns !== questions[qIndex].correct) {
                            btnClass = "bg-red-500/20 border-red-500 text-red-100"; // Show wrong selection
                        } else if (feedback) {
                             btnClass = "opacity-50 cursor-not-allowed border-transparent"; // Dim others
                        }

                        return (
                            <button 
                                key={i}
                                disabled={feedback !== null || showExplanation}
                                onClick={() => handleAnswer(i)}
                                className={`p-5 rounded-2xl text-left font-bold text-lg transition-all transform active:scale-98 border-2 ${btnClass} flex items-center justify-between group`}
                            >
                                <span>{ans}</span>
                                {feedback === null && <span className="opacity-0 group-hover:opacity-50 text-xl transition-opacity">➜</span>}
                                {feedback && i === selectedAns && selectedAns !== questions[qIndex].correct && <span className="text-xl">❌</span>}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
