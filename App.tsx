import React, { useState, useEffect } from 'react';
import StarMap from './components/StarMap';
import AIChat from './components/AIChat';
import Tutorial from './components/Tutorial';
import { Coordinates, Language } from './types';
import { translations } from './utils/i18n';

// Default to Hong Kong Coordinates
const DEFAULT_LOCATION: Coordinates = {
  latitude: 22.3193,
  longitude: 114.1694
};

function App() {
  const [lang, setLang] = useState<Language>('zh-HK');
  const [location, setLocation] = useState<Coordinates>(DEFAULT_LOCATION);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'stereo' | 'ortho'>('stereo');
  const [usingLiveLocation, setUsingLiveLocation] = useState(false);
  const [isLiveTime, setIsLiveTime] = useState(true);
  const [showTutorial, setShowTutorial] = useState(true);
  
  // New States
  const [showArt, setShowArt] = useState(false);
  const [enableGyro, setEnableGyro] = useState(false);

  const t = translations[lang];

  // Time ticker
  useEffect(() => {
    let interval: number;
    if (isLiveTime) {
      interval = window.setInterval(() => {
        setCurrentDate(new Date());
      }, 10000); 
    }
    return () => clearInterval(interval);
  }, [isLiveTime]);

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    
    setUsingLiveLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        alert(t.locUpdated);
      },
      (error) => {
        console.error("Error getting location:", error);
        setUsingLiveLocation(false);
        alert("Could not get your location. Defaulting to Hong Kong.");
      }
    );
  };

  const toggleGyro = async () => {
    if (enableGyro) {
        setEnableGyro(false);
        return;
    }

    // Request permission for iOS 13+
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
        // Non-iOS or older devices usually don't need explicit permission for motion
        // but might need https
        setEnableGyro(true);
    }
  };

  const shiftTime = (hours: number) => {
    setIsLiveTime(false);
    const newDate = new Date(currentDate);
    newDate.setHours(newDate.getHours() + hours);
    setCurrentDate(newDate);
  };

  return (
    <div className="flex flex-col h-screen bg-space-black text-white overflow-hidden font-sans selection:bg-kidrise-orange selection:text-white">
      
      {showTutorial && <Tutorial lang={lang} onClose={() => setShowTutorial(false)} />}

      {/* Header / Nav */}
      <header className="flex-none px-4 py-3 z-30 flex justify-between items-center bg-[#161825]/80 backdrop-blur-md border-b border-white/10 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-kidrise-orange to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 transform rotate-3">
            <i className="fas fa-telescope text-white text-xl"></i>
          </div>
          <div>
            <h1 className="font-bold text-lg md:text-xl tracking-wide leading-tight">
              {t.appTitle}
            </h1>
            <p className="text-[10px] md:text-xs text-gray-400 hidden md:block">{t.subtitle}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
            <button 
              onClick={() => setLang(l => l === 'en' ? 'zh-HK' : 'en')}
              className="bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors"
            >
              {lang === 'en' ? '中文' : 'ENG'}
            </button>

            <button 
              onClick={() => setShowTutorial(true)}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-kidrise-orange transition-colors"
            >
               <i className="fas fa-question"></i>
            </button>

            <a href="https://www.stemtoy.com.hk" target="_blank" rel="noreferrer" className="hidden md:flex bg-kidrise-orange hover:bg-orange-600 text-xs md:text-sm px-4 py-2 rounded-full transition-all shadow-lg font-bold items-center gap-2">
              {t.visitShop} <i className="fas fa-external-link-alt"></i>
            </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col md:flex-row gap-4 p-4 md:p-6 overflow-hidden">
        
        {/* Controls (Sidebar on Desktop) */}
        <div className="flex-none md:w-72 flex flex-col gap-4 z-20 order-2 md:order-1 overflow-y-auto scrollbar-hide pb-20 md:pb-0">
           
           {/* Special Features (New Buttons) */}
           <div className="bg-[#1c1e33] p-5 rounded-2xl border border-white/5 shadow-xl">
              <h2 className="text-xs font-bold text-kidrise-orange mb-3 uppercase tracking-widest flex items-center gap-2">
                 <i className="fas fa-magic"></i> {t.tutorial.step2Title}
              </h2>
              <div className="flex flex-col gap-2">
                  <button 
                    onClick={handleGeolocation}
                    className="w-full py-3 px-4 rounded-xl text-sm font-bold transition-all bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg flex items-center justify-center gap-2"
                  >
                     <i className="fas fa-map-marker-alt"></i> {t.btnUpdateLoc}
                  </button>

                  <button 
                    onClick={toggleGyro}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${enableGyro ? 'bg-gradient-to-r from-red-600 to-red-500 animate-pulse' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                     <i className="fas fa-mobile-alt"></i> {enableGyro ? t.btnGyroOff : t.btnGyro}
                  </button>

                  <button 
                    onClick={() => setShowArt(!showArt)}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${showArt ? 'bg-gradient-to-r from-purple-600 to-purple-500 border border-purple-400' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                     <i className="fas fa-paint-brush"></i> {t.btnArt}
                  </button>
              </div>
              <div className="mt-3 text-[10px] text-gray-500 font-mono text-center">
                 {t.viewingFrom} <span className="text-kidrise-orange">{usingLiveLocation ? t.gpsLocation : t.hongKong}</span>
              </div>
           </div>

           {/* Time Control */}
           <div className="bg-[#1c1e33] p-5 rounded-2xl border border-white/5 shadow-xl">
             <h2 className="text-xs font-bold text-kidrise-orange mb-3 uppercase tracking-widest flex items-center gap-2">
                <i className="fas fa-clock"></i> {t.timeTravel}
             </h2>
             <div className="flex items-center justify-between bg-black/40 rounded-xl p-3 mb-4 border border-white/5">
               <div className="text-center w-full">
                 <div className="text-2xl font-mono font-bold text-star-yellow drop-shadow-[0_0_5px_rgba(255,232,127,0.5)]">
                    {currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                 </div>
               </div>
             </div>
             
             <div className="grid grid-cols-3 gap-2">
               <button onClick={() => shiftTime(-1)} className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-xl text-xs transition-transform active:scale-95"><i className="fas fa-backward"></i> -1h</button>
               <button onClick={() => setIsLiveTime(true)} className={`p-2 rounded-xl text-xs font-bold border transition-all active:scale-95 ${isLiveTime ? 'bg-red-500 border-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'}`}>{t.now}</button>
               <button onClick={() => shiftTime(1)} className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-xl text-xs transition-transform active:scale-95">+1h <i className="fas fa-forward"></i></button>
             </div>
           </div>

            {/* View Mode */}
           <div className="bg-[#1c1e33] p-5 rounded-2xl border border-white/5 shadow-xl">
              <h2 className="text-xs font-bold text-kidrise-orange mb-3 uppercase tracking-widest flex items-center gap-2">
                 <i className="fas fa-eye"></i> {t.viewMode}
              </h2>
              <div className="flex gap-2 bg-black/30 p-1.5 rounded-xl border border-white/5">
                <button 
                  onClick={() => setViewMode('stereo')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'stereo' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  {t.wideSky}
                </button>
                <button 
                  onClick={() => setViewMode('ortho')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'ortho' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  {t.globe3d}
                </button>
              </div>
           </div>
        </div>

        {/* Map Visualization */}
        <div className="flex-1 relative h-full min-h-[400px] order-1 md:order-2">
           <StarMap 
             location={location} 
             date={currentDate} 
             viewMode={viewMode}
             lang={lang}
             showArt={showArt}
             enableGyro={enableGyro}
           />
        </div>

      </main>

      <AIChat lang={lang} />
      
    </div>
  );
}

export default App;