import React from 'react';
import { ExperienceMode, Language, Page } from '../types';
import { translations } from '../utils/i18n';
import telescopeImg from '../assets/knowledge/amazing-telescope-transparent.png';
import { Footer } from './layout/Footer';

interface HeroProps {
  lang: Language;
  mode: ExperienceMode;
  lastPage: Page | null;
  onNavigate: (page: Page) => void;
  onModeChange: (mode: ExperienceMode) => void;
  onReplayGuide: () => void;
}

const Hero: React.FC<HeroProps> = ({ lang, mode, lastPage, onNavigate, onModeChange, onReplayGuide }) => {
  const t = translations[lang];
  const pageLabels: Record<Page, string> = {
    hero: t.homeTitle,
    starmap: t.menuMap,
    planner: t.menuPlanner,
    learn: t.menuLearn,
    quiz: t.menuQuiz,
    guide: t.menuGuide,
    encyclopedia: t.menuEncyclopedia,
  };
  const lastLabel = lastPage ? pageLabels[lastPage] : null;
  const resumeDescription = lastLabel
    ? t.homeExperience.tasks.resume.desc.replace('{page}', lastLabel)
    : t.homeExperience.tasks.resume.empty;
  const tasks = [
    {
      id: 'map', icon: 'fa-map', title: t.homeExperience.tasks.map.title, desc: t.homeExperience.tasks.map.desc,
      action: t.homeExperience.tasks.map.action, onClick: () => onNavigate('starmap'), disabled: false,
      accent: 'from-cyan-500/20 to-blue-600/10 border-cyan-400/30', wide: true,
    },
    {
      id: 'tonight', icon: 'fa-moon', title: t.homeExperience.tasks.tonight.title, desc: t.homeExperience.tasks.tonight.desc,
      action: t.homeExperience.tasks.tonight.action, onClick: () => onNavigate('planner'), disabled: false,
      accent: 'from-indigo-500/20 to-purple-600/10 border-indigo-400/30', wide: false,
    },
    {
      id: 'resume', icon: 'fa-clock-rotate-left', title: t.homeExperience.tasks.resume.title, desc: resumeDescription,
      action: t.homeExperience.tasks.resume.action, onClick: () => lastPage && onNavigate(lastPage), disabled: !lastPage,
      accent: 'from-rose-500/15 to-amber-500/10 border-rose-400/25', wide: false,
    },
  ];

  return (
    <div className="relative flex h-full w-full flex-col overflow-x-hidden overflow-y-auto bg-dark text-center custom-scrollbar">
      <main className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-8 px-4 py-10 md:py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="text-center lg:text-left">
          <div className="relative mx-auto w-44 sm:w-56 lg:mx-0 lg:w-64">
            <img src={telescopeImg} alt="KidRise Telescope" className="h-auto w-full object-contain drop-shadow-[0_0_35px_rgba(6,182,212,0.45)]" />
            <span className="absolute right-0 top-5 text-3xl text-yellow-300" aria-hidden="true">✦</span>
          </div>
          <p className="mt-2 text-sm font-black uppercase tracking-[0.2em] text-cyan-300">{t.subtitle}</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">{t.homeTitle}</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-300 lg:mx-0 sm:text-lg">{t.homeExperience.prompt}</p>

          <div className="mt-6 inline-flex rounded-2xl border border-white/10 bg-slate-900/70 p-1">
            {(['beginner', 'advanced'] as ExperienceMode[]).map((item) => (
              <button key={item} type="button" aria-pressed={mode === item} onClick={() => onModeChange(item)} className={`min-h-11 rounded-xl px-4 text-sm font-bold transition-colors ${mode === item ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:bg-white/10'}`}>
                {item === 'beginner' ? t.homeExperience.beginner : t.homeExperience.advanced}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-slate-400">{mode === 'beginner' ? t.homeExperience.beginnerDesc : t.homeExperience.advancedDesc}</p>
        </div>

        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            {tasks.map((task) => (
              <button key={task.id} type="button" disabled={task.disabled} onClick={task.onClick} className={`group min-h-44 rounded-2xl border bg-gradient-to-br p-5 text-left shadow-lg transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 ${task.accent} ${task.wide ? 'sm:col-span-2' : ''}`}>
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-xl text-cyan-200"><i className={`fas ${task.icon}`} /></span>
                  {!task.disabled && <i className="fas fa-circle-play text-xl text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white" />}
                </div>
                <h2 className="mt-4 text-xl font-black text-white">{task.title}</h2>
                <p className="mt-1 min-h-10 text-sm leading-5 text-slate-300">{task.desc}</p>
                <span className="mt-3 inline-block text-sm font-bold text-cyan-300">{task.action} →</span>
              </button>
            ))}
          </div>
          <button type="button" onClick={onReplayGuide} className="mx-auto mt-5 flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <i className="fas fa-graduation-cap" /> {t.homeExperience.replayGuide}
          </button>
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default Hero;
