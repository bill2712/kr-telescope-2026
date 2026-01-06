import React, { useState, useEffect } from 'react';
import StarMap from './components/StarMap';

import Tutorial from './components/Tutorial';
import MissionControl from './components/MissionControl';
import StarInfoCard from './components/StarInfoCard';
import FloatingMenu from './components/FloatingMenu';
import Planner from './components/Planner';
import Knowledge from './components/Knowledge';
import StarGuide from './components/StarGuide';
import Quiz from './components/Quiz';
import { Coordinates, Language, Star } from './types';
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

  // Navigation State
  const [currentPage, setCurrentPage] = useState<'starmap' | 'planner' | 'compass' | 'knowledge' | 'guide' | 'quiz'>('starmap');

  // New States
  const [showArt, setShowArt] = useState(false);
  const [enableGyro, setEnableGyro] = useState(false);
  const [selectedStar, setSelectedStar] = useState<Star | null>(null);
  const [locationName, setLocationName] = useState<string>("");

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
    setLocationName("Locating..."); // Temporary state
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        // Reverse Geocoding
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=${lang === 'zh-HK' ? 'zh-HK' : 'en'}`);
          const data = await response.json();
          if (data && data.address) {
             // Prefer City -> Town -> Village -> County -> Display Name
             const name = data.address.city || data.address.town || data.address.village || data.address.county || data.display_name.split(',')[0];
             setLocationName(name);
          } else {
             setLocationName(lang === 'zh-HK' ? '未知位置' : 'Unknown Location');
          }
        } catch (error) {
           console.error("Geocoding error:", error);
           setLocationName(lang === 'zh-HK' ? '未知位置' : 'Unknown Location');
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        setUsingLiveLocation(false);
        setLocationName("");
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
    <div className="flex flex-col h-screen w-screen bg-space-black text-white overflow-hidden relative font-sans selection:bg-kidrise-orange selection:text-white">

      {showTutorial && currentPage === 'starmap' && <Tutorial lang={lang} onClose={() => setShowTutorial(false)} />}

      {/* Pages */}
      {currentPage === 'starmap' && (
        <>
            <div className="absolute inset-0 z-0">
                <StarMap
                location={location}
                date={currentDate}
                viewMode={viewMode}
                lang={lang}
                showArt={showArt}
                enableGyro={enableGyro}
                onStarClick={(star) => setSelectedStar(star)}
                />
            </div>
             {/* Selected Star Info Popup */}
            {selectedStar && (
                <StarInfoCard
                star={selectedStar}
                lang={lang}
                onClose={() => setSelectedStar(null)}
                />
            )}
            
            {/* Mission Control - Only show if NOT in Compass mode? Actually keep it. but move it up a bit if menu overlaps */}
            <div className="absolute bottom-24 left-0 right-0 z-20 pointer-events-none">
                 <div className="pointer-events-auto">
                     <MissionControl
                        lang={lang}
                        currentDate={currentDate}
                        location={location}
                        viewMode={viewMode}
                        isLiveTime={isLiveTime}
                        enableGyro={enableGyro}
                        locationName={locationName}
                        onSetViewMode={setViewMode}
                        onShiftTime={shiftTime}
                        onSetLiveTime={() => {
                        setIsLiveTime(true);
                        setCurrentDate(new Date());
                        }}
                        onToggleGyro={toggleGyro}
                        onLocationUpdate={handleGeolocation}
                    />
                 </div>
            </div>
        </>
      )}

      {currentPage === 'planner' && <Planner lang={lang} />}
      {currentPage === 'compass' && (
           /* Compass Page effectively just Star Map with Gyro ON and minimal UI */
           <div className="absolute inset-0 z-0">
               <div className="absolute top-20 left-0 right-0 z-20 text-center pointer-events-none">
                   <div className="inline-block bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                       <span className="text-kidrise-orange font-bold tracking-widest uppercase text-xs animate-pulse">● Live Compass Mode</span>
                   </div>
                   <p className="text-xs text-gray-300 mt-2">Point your device at the sky</p>
               </div>
                <StarMap
                    location={location}
                    date={currentDate}
                    viewMode={viewMode} // Force stereo?
                    lang={lang}
                    showArt={showArt}
                    enableGyro={true} // Force True
                    onStarClick={(star) => setSelectedStar(star)}
                />
           </div>
      )}
      {currentPage === 'knowledge' && <Knowledge lang={lang} />}
      {currentPage === 'guide' && <StarGuide lang={lang} />}
      {currentPage === 'quiz' && <Quiz lang={lang} />}


      {/* Floating Header (Always Visible) */}
      <header className="absolute top-0 left-0 right-0 z-30 p-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-start">

          {/* Logo Area */}
          <div className="pointer-events-auto bg-[#161825]/90 backdrop-blur-md rounded-2xl p-2 pr-4 flex items-center gap-3 border border-white/10 shadow-lg" onClick={() => setCurrentPage('starmap')}>
            <div className="w-10 h-10 bg-gradient-to-br from-kidrise-orange to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <i className="fas fa-meteor text-white text-xl"></i>
            </div>
            <div>
              <h1 className="font-bold text-base leading-none tracking-wide text-white">Kidrise</h1>
              <span className="text-[10px] text-blue-200 uppercase tracking-[0.2em] font-semibold">Sky Explorer</span>
            </div>
          </div>

          {/* Top Right Controls */}
          <div className="flex flex-col gap-2 pointer-events-auto">
            <div className="flex gap-2">
              <button
                onClick={() => setShowArt(!showArt)}
                className={`h-9 px-3 rounded-xl text-xs font-bold transition-all border shadow-lg flex items-center gap-2 ${showArt ? 'bg-purple-600 border-purple-400 text-white' : 'bg-black/40 border-white/10 text-gray-300 hover:bg-black/60'}`}
              >
                <i className="fas fa-star"></i> {t.btnArt}
              </button>

              <button
                onClick={() => setLang(l => l === 'en' ? 'zh-HK' : 'en')}
                className="h-9 w-9 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 flex items-center justify-center text-xs font-bold transition-colors shadow-lg"
              >
                {lang === 'en' ? '中' : 'EN'}
              </button>
            </div>

            <a href="https://www.stemtoy.com.hk" target="_blank" rel="noreferrer" className="hidden md:flex bg-kidrise-orange/90 hover:bg-orange-500 text-xs px-3 py-1.5 rounded-full transition-all shadow-lg font-bold items-center justify-center gap-2 text-white no-underline">
              Shop <i className="fas fa-shopping-bag"></i>
            </a>
          </div>

        </div>
      </header>
      
      {/* Main Navigation */}
      <FloatingMenu 
        currentPage={currentPage}
        lang={lang}
        onNavigate={(page) => {
            setCurrentPage(page);
            if(page === 'compass') {
                setEnableGyro(true);
            } else if (page === 'starmap') {
                setEnableGyro(false);
            }
        }}
      />

    </div>
  );
}

export default App;