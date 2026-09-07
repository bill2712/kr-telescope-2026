import React, { useMemo, useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../utils/i18n';
import ExplanationCard from '../ui/ExplanationCard';

interface Props {
  lang: Language;
  expl?: { what: string; why: string; anim: string };
}

const buildLitPath = (phase: number) => {
  const center = 80;
  const radius = 70;
  const steps = 64;
  const angle = phase * Math.PI * 2;
  const rightEdge: string[] = [];
  const leftEdge: string[] = [];

  for (let index = 0; index <= steps; index += 1) {
    const y = -radius + (index / steps) * radius * 2;
    const limb = Math.sqrt(Math.max(0, radius * radius - y * y));
    const left = phase <= 0.5 ? Math.cos(angle) * limb : -limb;
    const right = phase <= 0.5 ? limb : -Math.cos(angle) * limb;
    rightEdge.push(`${center + right},${center + y}`);
    leftEdge.unshift(`${center + left},${center + y}`);
  }

  return `M ${rightEdge.concat(leftEdge).join(' L ')} Z`;
};

const MoonPhaseLearn: React.FC<Props> = ({ lang, expl }) => {
  const t = translations[lang];
  const [day, setDay] = useState(1);
  const phase = (day - 1) / 29.5;
  const isWaxing = phase < 0.5;
  const illumination = Math.round((1 - Math.cos(phase * Math.PI * 2)) * 50);
  const litPath = useMemo(() => buildLitPath(phase), [phase]);

  const getPhaseInfo = (value: number) => {
    if (value <= 1.5 || value >= 29) return { name: t.moonNew, reason: t.moonReasonNew };
    if (value < 7) return { name: t.moonWaxCres, reason: t.moonReasonWax };
    if (value < 9) return { name: t.moonFirstQ, reason: t.moonReasonWax };
    if (value < 14) return { name: t.moonWaxGib, reason: t.moonReasonWax };
    if (value < 17) return { name: t.moonFull, reason: t.moonReasonFull };
    if (value < 22) return { name: t.moonWanGib, reason: t.moonReasonWan };
    if (value < 24) return { name: t.moonLastQ, reason: t.moonReasonWan };
    return { name: t.moonWanCres, reason: t.moonReasonWan };
  };

  const info = getPhaseInfo(day);
  const direction = isWaxing
    ? (lang === 'zh-HK' ? '漸盈' : 'waxing')
    : (lang === 'zh-HK' ? '漸虧' : 'waning');

  return (
    <div className="relative flex h-full flex-col overflow-y-auto rounded-3xl bg-black/60 p-4 custom-scrollbar">
      <h3 className="mb-2 text-center text-xl font-bold text-white">{t.knowMoon}</h3>

      {expl && (
        <div className="mb-4">
          <ExplanationCard what={expl.what} why={expl.why} anim={expl.anim} />
        </div>
      )}

      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="relative mb-8 flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-[#0b0d17] shadow-[0_0_50px_rgba(255,255,255,0.05)]">
          <svg
            viewBox="0 0 160 160"
            className="h-40 w-40 rounded-full shadow-inner ring-1 ring-white/10"
            role="img"
            aria-label={`${info.name}, ${illumination}% ${direction}`}
          >
            <defs>
              <radialGradient id="moon-surface" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="65%" stopColor="#d4d4d8" />
                <stop offset="100%" stopColor="#9ca3af" />
              </radialGradient>
              <clipPath id="moon-lit-area">
                <path d={litPath} />
              </clipPath>
            </defs>
            <circle cx="80" cy="80" r="70" fill="#111827" />
            <g clipPath="url(#moon-lit-area)">
              <circle cx="80" cy="80" r="70" fill="url(#moon-surface)" />
              <circle cx="52" cy="48" r="9" fill="#9ca3af" opacity="0.35" />
              <circle cx="103" cy="65" r="13" fill="#a1a1aa" opacity="0.28" />
              <circle cx="70" cy="108" r="7" fill="#71717a" opacity="0.25" />
            </g>
            <circle cx="80" cy="80" r="69" fill="none" stroke="white" strokeOpacity="0.12" />
          </svg>
        </div>

        <div className="mb-6 text-center">
          <div className="mb-1 text-xl font-bold text-kidrise-orange">{t.moonDay} {Math.round(day)}</div>
          <div className="mb-2 text-2xl font-bold text-white">{info.name}</div>
          <p className="mx-auto min-h-10 max-w-xs text-sm text-gray-400">{info.reason}</p>
          <p className="mt-2 text-xs text-slate-500">{illumination}% · {direction}</p>
        </div>

        <div className="w-full max-w-xs px-4">
          <label htmlFor="moon-phase-day" className="mb-2 block text-center text-xs uppercase tracking-widest text-gray-500">
            {t.moonPhaseTitle}
          </label>
          <input
            id="moon-phase-day"
            type="range"
            min="1"
            max="30"
            step="1"
            value={day}
            onChange={(event) => setDay(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none bg-gray-700 accent-kidrise-orange"
          />
        </div>
      </div>
    </div>
  );
};

export default MoonPhaseLearn;
