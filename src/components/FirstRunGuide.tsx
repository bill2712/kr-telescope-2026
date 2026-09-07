import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Language } from '../types';

interface FirstRunGuideProps {
  lang: Language;
  onComplete: () => void;
}

const copy = {
  'zh-HK': {
    skip: '跳過', next: '下一步', back: '上一步', finish: '揀選第一個任務', step: '快速導覽',
    steps: [
      { icon: '🌙', title: '先睇今晚適合觀察甚麼', desc: '「今晚睇咩」會結合香港天文台資料、月相及季節，提供簡單目標建議。' },
      { icon: '🧭', title: '星圖會帶你找方向', desc: '先按實時星圖，再按指南針；如果裝置要求權限，畫面會解釋下一步。' },
      { icon: '🔴', title: '戶外記得保護夜視', desc: '先調低螢幕亮度，觀星時盡量使用紅光。任何時候按左上角標誌都可回到首頁。' },
    ],
  },
  en: {
    skip: 'Skip', next: 'Next', back: 'Back', finish: 'Choose my first mission', step: 'Quick tour',
    steps: [
      { icon: '🌙', title: 'See what to observe tonight', desc: 'Tonight’s Picks combines Hong Kong Observatory data, the Moon phase and the season to suggest simple targets.' },
      { icon: '🧭', title: 'Let the star map guide you', desc: 'Open the live map, then select Compass. If your device needs permission, the screen explains what to do.' },
      { icon: '🔴', title: 'Protect your night vision', desc: 'Lower your screen brightness and use red light outdoors. Select the logo at any time to return home.' },
    ],
  },
};

const FirstRunGuide: React.FC<FirstRunGuideProps> = ({ lang, onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const t = copy[lang];
  const current = t.steps[stepIndex];
  const isLast = stepIndex === t.steps.length - 1;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onComplete();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onComplete]);

  return createPortal(
    <div className="fixed inset-0 z-[300] grid place-items-center bg-slate-950/90 p-4 backdrop-blur-md">
      <section role="dialog" aria-modal="true" aria-labelledby="telescope-first-run-title" className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
        <div className="h-1.5 bg-white/5" aria-hidden="true">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-[width] duration-300" style={{ width: `${((stepIndex + 1) / t.steps.length) * 100}%` }} />
        </div>
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <span className="text-sm font-bold text-cyan-300">{t.step} {stepIndex + 1}/{t.steps.length}</span>
            <button type="button" onClick={onComplete} className="min-h-11 rounded-xl px-3 text-sm font-semibold text-slate-300 hover:bg-white/10">{t.skip}</button>
          </div>
          <div className="mb-5 text-6xl" aria-hidden="true">{current.icon}</div>
          <h2 id="telescope-first-run-title" className="text-2xl font-black text-white sm:text-3xl">{current.title}</h2>
          <p className="mt-3 text-base leading-7 text-slate-300 sm:text-lg">{current.desc}</p>
          <div className="mt-8 flex gap-3">
            {stepIndex > 0 && <button type="button" onClick={() => setStepIndex((value) => value - 1)} className="min-h-12 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 font-bold text-white hover:bg-white/10">{t.back}</button>}
            <button type="button" autoFocus onClick={() => isLast ? onComplete() : setStepIndex((value) => value + 1)} className="min-h-12 flex-1 rounded-xl bg-cyan-500 px-4 font-black text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              {isLast ? t.finish : t.next}
            </button>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
};

export default FirstRunGuide;
