import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import type { StarMapHandle, MapStyle } from './components/StarMap';
import Layout from './components/layout/Layout';
import Hero from './components/Hero';
import { AchievementId, ExperienceMode, Language, Page } from './types';
import { translations } from './utils/i18n';
import { LoginGate } from './components/LoginGate';
import FirstRunGuide from './components/FirstRunGuide';
import InstallAppPrompt from './components/InstallAppPrompt';

const StarMap = lazy(() => import('./components/StarMap'));
const StarMapControls = lazy(() => import('./components/StarMapControls'));
const Tutorial = lazy(() => import('./components/Tutorial'));
const Planner = lazy(() => import('./components/Planner'));
const Knowledge = lazy(() => import('./components/Knowledge'));
const Quiz = lazy(() => import('./components/Quiz'));
const UsageGuide = lazy(() => import('./components/UsageGuide'));
const ButtonLegend = lazy(() => import('./components/ButtonLegend'));
const UsageGuideWizard = lazy(() => import('./components/UsageGuideWizard'));
const TelescopeManual = lazy(() => import('./components/guide/TelescopeManual'));
const SpacePostcard = lazy(() => import('./components/SpacePostcard'));

const LoadingView = () => (
  <div role="status" className="flex min-h-[320px] items-center justify-center text-secondary">
    <span className="h-10 w-10 animate-spin rounded-full border-4 border-current border-t-transparent" />
    <span className="sr-only">Loading</span>
  </div>
);



function App() {
  const [lang, setLang] = useState<Language>('zh-HK');
  const [mode, setMode] = useState<ExperienceMode>(() => {
    try {
      return localStorage.getItem('kr_telescope_mode') === 'advanced' ? 'advanced' : 'beginner';
    } catch {
      return 'beginner';
    }
  });
  const [lastPage, setLastPage] = useState<Page | null>(() => {
    try {
      const stored = localStorage.getItem('kr_telescope_last_page') as Page | null;
      return stored && stored !== 'hero' ? stored : null;
    } catch {
      return null;
    }
  });
  const [showFirstRunGuide, setShowFirstRunGuide] = useState(() => {
    try {
      return localStorage.getItem('kr_telescope_onboarding_complete') !== 'true';
    } catch {
      return true;
    }
  });
  const [nightVision, setNightVision] = useState(() => {
    try {
      return localStorage.getItem('kr_telescope_night_vision') === 'true';
    } catch {
      return false;
    }
  });
  const [achievements, setAchievements] = useState<AchievementId[]>(() => {
    const valid: AchievementId[] = ['onboarding', 'planner', 'starmap', 'nightVision', 'guide', 'learn', 'quiz', 'encyclopedia', 'journal', 'postcard'];
    try {
      const raw = localStorage.getItem('kr_telescope_achievements');
      if (raw) {
        const stored = JSON.parse(raw);
        if (Array.isArray(stored)) return stored.filter((item): item is AchievementId => valid.includes(item));
      }
    } catch {
      // Infer progress for returning users below.
    }
    const inferred: AchievementId[] = [];
    try {
      if (localStorage.getItem('kr_telescope_onboarding_complete') === 'true') inferred.push('onboarding');
      const previous = localStorage.getItem('kr_telescope_last_page');
      if (previous && valid.includes(previous as AchievementId)) inferred.push(previous as AchievementId);
      if (localStorage.getItem('kr_telescope_night_vision') === 'true') inferred.push('nightVision');
    } catch {
      // Start with an empty in-memory progress list.
    }
    return inferred;
  });
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('kr_telescope_auth') === 'true';
    } catch {
      return false;
    }
  });

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.appTitle;
  }, [lang, t.appTitle]);

  useEffect(() => {
    if (nightVision) document.documentElement.dataset.nightVision = 'true';
    else delete document.documentElement.dataset.nightVision;
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', nightVision ? '#120000' : '#0f172a');
    try {
      localStorage.setItem('kr_telescope_night_vision', String(nightVision));
    } catch {
      // Keep the preference for this visit.
    }
    return () => {
      delete document.documentElement.dataset.nightVision;
      document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', '#0f172a');
    };
  }, [nightVision]);

  const unlockAchievement = (achievement: AchievementId) => {
    setAchievements((current) => {
      if (current.includes(achievement)) return current;
      const next = [...current, achievement];
      try {
        localStorage.setItem('kr_telescope_achievements', JSON.stringify(next));
      } catch {
        // The achievement still lasts for this visit.
      }
      return next;
    });
  };



  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLiveTime, setIsLiveTime] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showPostcard, setShowPostcard] = useState(false);
  const [mapStyle, setMapStyle] = useState<MapStyle>('western');
  const [showUsageGuide, setShowUsageGuide] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  
  // Animation State
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1); // 1 = Normal Fast, 100 = Super Fast
  const starMapRef = useRef<StarMapHandle>(null);
  

  // Navigation State - Default to 'hero'
  const [currentPage, setCurrentPage] = useState<Page>('hero');
  const [hasOpenedStarMap, setHasOpenedStarMap] = useState(false);

  const navigate = (page: Page) => {
    if (page === 'starmap') setHasOpenedStarMap(true);
    if (page === 'starmap') unlockAchievement('starmap');
    if (page === 'planner') unlockAchievement('planner');
    if (page === 'guide') unlockAchievement('guide');
    if (page === 'learn') unlockAchievement('learn');
    if (page === 'encyclopedia') unlockAchievement('encyclopedia');
    setCurrentPage(page);
    if (page !== 'hero') {
      setLastPage(page);
      try {
        localStorage.setItem('kr_telescope_last_page', page);
      } catch {
        // Keep the in-memory value for this visit.
      }
    }
  };

  const changeMode = (nextMode: ExperienceMode) => {
    setMode(nextMode);
    try {
      localStorage.setItem('kr_telescope_mode', nextMode);
    } catch {
      // Keep the in-memory value for this visit.
    }
  };

  const completeFirstRunGuide = () => {
    setShowFirstRunGuide(false);
    unlockAchievement('onboarding');
    try {
      localStorage.setItem('kr_telescope_onboarding_complete', 'true');
    } catch {
      // The guide still closes without persistent storage.
    }
  };

  // New States
  const [enableGyro, setEnableGyro] = useState(false);

  // Time ticker (Live Time)
  useEffect(() => {
    let interval: number;
    if (isLiveTime && !isAnimating) {
      interval = window.setInterval(() => {
        setCurrentDate(new Date());
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [isLiveTime, isAnimating]);

  // Animation Loop
  useEffect(() => {
      let animationFrame: number;
      let lastTime = performance.now();

      const animate = (time: number) => {
          if (!isAnimating) return;
          
          const delta = time - lastTime;
          if (delta > 30) { 
              // Speed: Base is ~1 min/frame (at 60fps). animationSpeed is multiplier (1x, 5x, 10x, 100x)
              const minutesToAdd = (delta / 16) * animationSpeed;
              
              setCurrentDate(prev => new Date(prev.getTime() + minutesToAdd * 60000));
              lastTime = time;
          }
          animationFrame = requestAnimationFrame(animate);
      };

      if (isAnimating) {
          setIsLiveTime(false);
          animationFrame = requestAnimationFrame(animate);
      }

      return () => cancelAnimationFrame(animationFrame);
  }, [isAnimating, animationSpeed]);

  const toggleGyro = async () => {
    if (enableGyro) {
      setEnableGyro(false);
      return;
    }

    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          setEnableGyro(true);
        } else {
          alert(t.gyroNotSupported);
        }
      } catch (e) {
        console.error(e);
        alert(t.gyroNotSupported);
      }
    } else {
      setEnableGyro(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <LoginGate
          lang={lang}
          onToggleLang={() => setLang(prev => prev === 'zh-HK' ? 'en' : 'zh-HK')}
          onLogin={() => setIsAuthenticated(true)}
          t={t}
        />
        <InstallAppPrompt lang={lang} visible={false} />
      </>
    );
  }

  return (
    <>
    <Layout
      lang={lang}
      currentPage={currentPage}
      onNavigate={navigate}
      onToggleLang={() => setLang(l => l === 'en' ? 'zh-HK' : 'en')}
      mode={mode}
      onToggleMode={() => changeMode(mode === 'beginner' ? 'advanced' : 'beginner')}
      nightVision={nightVision}
      onToggleNightVision={() => setNightVision((value) => {
        if (!value) unlockAchievement('nightVision');
        return !value;
      })}
    >
      <Suspense fallback={<LoadingView />}>
      {showTutorial && currentPage === 'starmap' && <Tutorial lang={lang} onClose={() => setShowTutorial(false)} />}
      
      {showUsageGuide && <UsageGuide lang={lang} onClose={() => setShowUsageGuide(false)} />}
      {showLegend && <ButtonLegend lang={lang} onClose={() => setShowLegend(false)} />}

      {/* Hero Landing Page */}
      {currentPage === 'hero' && (
        <div className="absolute inset-0 z-[110] bg-dark animate-fade-in">
          <Hero 
            lang={lang} 
            mode={mode}
            lastPage={lastPage}
            achievements={achievements}
            onNavigate={navigate}
            onModeChange={changeMode}
            onReplayGuide={() => setShowFirstRunGuide(true)}
          />
        </div>
      )}

      {showPostcard && <SpacePostcard lang={lang} onClose={() => setShowPostcard(false)} onSaved={() => unlockAchievement('postcard')} />}



      
      {hasOpenedStarMap && <div className={`absolute inset-0 w-full h-full ${currentPage === 'starmap' ? 'visible' : 'invisible'}`}>
          <StarMap
            ref={starMapRef}
            date={currentDate}
            onDateChange={(d) => {
                setCurrentDate(d);
                setIsLiveTime(false); // Stop live time when manually interacting
                setIsAnimating(false);
            }}
            lang={lang}
            mapStyle={mapStyle}
            enableGyro={enableGyro}
          />

          {/* Map Tools (Only on Starmap) */}
          {currentPage === 'starmap' && (
            <>
                <StarMapControls 
                    lang={lang}
                    currentDate={currentDate}
                    onDateChange={(d) => {
                        setCurrentDate(d);
                        setIsLiveTime(false);
                        setIsAnimating(false);
                    }}
                    isAnimating={isAnimating}
                    onToggleAnimation={() => setIsAnimating(!isAnimating)}
                    animationSpeed={animationSpeed}
                    onSetSpeed={setAnimationSpeed}
                    onUseRealTime={() => {
                        setIsLiveTime(true);
                        setCurrentDate(new Date());
                        setIsAnimating(false);
                    }}
                    onZoomIn={() => starMapRef.current?.zoomIn()}
                    onZoomOut={() => starMapRef.current?.zoomOut()}
                    onResetZoom={() => starMapRef.current?.resetZoom()}
                    onZoomToSky={() => starMapRef.current?.zoomToSky()}
                    
                    mapStyle={mapStyle}
                    onMapStyleChange={setMapStyle}

                    onToggleGuide={() => setShowUsageGuide(true)}
                    onToggleLegend={() => setShowLegend(true)}
                    onToggleTutorial={() => setShowTutorial(true)}
                    onCameraClick={() => setShowPostcard(true)}
                    enableGyro={enableGyro}
                    onToggleGyro={toggleGyro}
                />
            </>
          )}

          {/* MapTools Removed - all functionality moved to StarMapControls for new UI Layout */ }
          {/* {currentPage === 'starmap' && ( <MapTools ... /> )} */}
      </div>}

      {currentPage === 'planner' && <Planner lang={lang} onOpenStarMap={() => navigate('starmap')} onJournalExported={() => unlockAchievement('journal')} />}
      {currentPage === 'learn' && <Knowledge lang={lang} />}
      {currentPage === 'quiz' && <Quiz lang={lang} onComplete={() => unlockAchievement('quiz')} />}
      {currentPage === 'guide' && <UsageGuideWizard lang={lang} onClose={() => navigate('hero')} />}
      {currentPage === 'encyclopedia' && <TelescopeManual lang={lang} onClose={() => navigate('hero')} />}

      </Suspense>

      {showFirstRunGuide && <FirstRunGuide lang={lang} onComplete={completeFirstRunGuide} />}

    </Layout>
    <InstallAppPrompt lang={lang} />
    </>
  );
}

export default App;
