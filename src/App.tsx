import React, { useState, useEffect, useRef } from 'react';
import StarMap, { StarMapHandle, MapStyle } from './components/StarMap';

import Tutorial from './components/Tutorial';
import StarInfoCard from './components/StarInfoCard';
import Planner from './components/Planner';
import Knowledge from './components/Knowledge';
import StarGuide from './components/StarGuide';
import Quiz from './components/Quiz';
import Layout from './components/layout/Layout';
import MapTools from './components/MapTools';
import StarMapControls from './components/StarMapControls';
import TelescopeManual from './components/guide/TelescopeManual';
import { Coordinates, Language, Star } from './types';
import { translations } from './utils/i18n';

import SpacePostcard from './components/SpacePostcard';

import ScavengerHuntMode from './components/ScavengerHuntMode';

// Default to Hong Kong Coordinates
const DEFAULT_LOCATION: Coordinates = {
  latitude: 22.3193,
  longitude: 114.1694
};

// Scavenger Hunt Levels
const SCAVENGER_LEVELS = [
  { id: 'mars', target: 'mars', name: { 'zh-HK': '火星', 'en': 'Mars' } },
  { id: 'jupiter', target: 'jupiter', name: { 'zh-HK': '木星', 'en': 'Jupiter' } },
  { id: 'moon', target: 'moon', name: { 'zh-HK': '月亮', 'en': 'Moon' } },
  // { id: 'sirius', target: 'Sirius', name: { 'zh-HK': '天狼星', 'en': 'Sirius' } },
];

function App() {
  const [lang, setLang] = useState<Language>('zh-HK');
  const [location, setLocation] = useState<Coordinates>(DEFAULT_LOCATION);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'stereo' | 'ortho'>('stereo');
  const [usingLiveLocation, setUsingLiveLocation] = useState(false);
  const [isLiveTime, setIsLiveTime] = useState(true);
  const [showTutorial, setShowTutorial] = useState(true);
  const [showPostcard, setShowPostcard] = useState(false);
  const [mapStyle, setMapStyle] = useState<MapStyle>('western');
  
  // Animation State
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1); // 1 = Normal Fast, 100 = Super Fast
  const starMapRef = useRef<StarMapHandle>(null);
  
  // Scavenger Hunt State
  const [scavengerActive, setScavengerActive] = useState(false);
  const [scavengerLevel, setScavengerLevel] = useState(0);
  const [scavengerLocked, setScavengerLocked] = useState(false);

  // Navigation State
  const [currentPage, setCurrentPage] = useState<'starmap' | 'planner' | 'learn' | 'quiz' | 'guide'>('starmap');

  // New States
  const [showArt, setShowArt] = useState(false);
  const [enableGyro, setEnableGyro] = useState(false);
  const [selectedStar, setSelectedStar] = useState<Star | null>(null);
  const [locationName, setLocationName] = useState<string>("");

  const t = translations[lang];

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
              // Speed 1: 1 min/frame (~600x real time) 
              // Speed 100: 10 min/frame (~6000x real time)
              const minutesToAdd = (delta / 16) * (animationSpeed === 1 ? 1 : 10);
              
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

  // ... (handleGeolocation, toggleGyro, shiftTime) ...
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setUsingLiveLocation(true);
    setLocationName("Locating..."); 
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=${lang === 'zh-HK' ? 'zh-HK' : 'en'}`);
          const data = await response.json();
          if (data && data.address) {
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

  const startScavengerHunt = () => {
      setScavengerActive(true);
      setScavengerLevel(1);
      setScavengerLocked(false);
      setCurrentPage('starmap');
      setShowTutorial(false);
  };

  const handleNextLevel = () => {
      if (scavengerLevel < SCAVENGER_LEVELS.length) {
          setScavengerLevel(prev => prev + 1);
          setScavengerLocked(false);
      } else {
          // Completed all levels
          setScavengerActive(false);
          // Show victory modal? Or ScavengerHuntMode handles it
      }
  };

  return (
    <Layout
      lang={lang}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      locationName={locationName}
      currentDate={currentDate}
      isLiveTime={isLiveTime}
      onSetLiveTime={() => {
        setIsLiveTime(true);
        setCurrentDate(new Date());
        setIsAnimating(false);
      }}
      onShiftTime={shiftTime}
      onToggleLang={() => setLang(l => l === 'en' ? 'zh-HK' : 'en')}
    >
      {showTutorial && currentPage === 'starmap' && <Tutorial lang={lang} onClose={() => setShowTutorial(false)} />}
      
      {showPostcard && <SpacePostcard lang={lang} onClose={() => setShowPostcard(false)} />}

      {/* Scavenger Hunt HUD */}
      {scavengerActive && scavengerLevel <= SCAVENGER_LEVELS.length && (
          <ScavengerHuntMode 
              lang={lang}
              targetName={SCAVENGER_LEVELS[scavengerLevel - 1].name[lang]}
              isLocked={scavengerLocked}
              onClose={() => setScavengerActive(false)}
              onNextLevel={handleNextLevel}
              level={scavengerLevel}
              totalLevels={SCAVENGER_LEVELS.length}
          />
      )}

      
      <div className={`absolute inset-0 w-full h-full ${currentPage === 'starmap' ? 'visible' : 'invisible'}`}>
          <StarMap
            ref={starMapRef}
            location={location}
            date={currentDate}
            // viewMode={viewMode}
            lang={lang}
            // showArt={showArt}
            mapStyle={mapStyle}
            enableGyro={enableGyro}
            // onStarClick={(star) => setSelectedStar(star)}
            // targetBody={scavengerActive ? SCAVENGER_LEVELS[scavengerLevel - 1].target : null}
            // onTargetLock={setScavengerLocked}
          />

          {/* Map Tools (Only on Starmap) */}
          {currentPage === 'starmap' && !scavengerActive && (
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
                    onZoomIn={() => starMapRef.current?.zoomIn()}
                    onZoomOut={() => starMapRef.current?.zoomOut()}
                    onResetZoom={() => starMapRef.current?.resetZoom()}
                    onToggleLang={() => setLang(l => l === 'en' ? 'zh-HK' : 'en')}
                    locationName={locationName || (lang === 'zh-HK' ? '香港 (預設)' : 'Hong Kong (Def)')}
                    
                    mapStyle={mapStyle}
                    onMapStyleChange={setMapStyle}

                    // Unified Map Tools
                    viewMode={viewMode}
                    onSetViewMode={setViewMode}
                    enableGyro={enableGyro}
                    onToggleGyro={toggleGyro}
                    showArt={showArt}
                    onToggleArt={() => setShowArt(!showArt)}
                    onCameraClick={() => setShowPostcard(true)}
                    onLocationUpdate={handleGeolocation}
                    // Scavenger Hunt Start
                    onStartScavengerHunt={startScavengerHunt}
                />
            </>
          )}

          {/* MapTools Removed - all functionality moved to StarMapControls for new UI Layout */ }
          {/* {currentPage === 'starmap' && ( <MapTools ... /> )} */}


           {/* Selected Star Info Popup */}
           {selectedStar && (
                <StarInfoCard
                star={selectedStar}
                lang={lang}
                onClose={() => setSelectedStar(null)}
                />
            )}
      </div>

      {currentPage === 'planner' && <Planner lang={lang} />}
      {currentPage === 'learn' && <Knowledge lang={lang} />}
      {currentPage === 'quiz' && <Quiz lang={lang} />}
      {currentPage === 'guide' && <TelescopeManual lang={lang} onClose={() => setCurrentPage('starmap')} />}

    </Layout>
  );
}

export default App;