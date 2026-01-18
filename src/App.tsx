import React, { useState, useEffect } from 'react';
import StarMap from './components/StarMap';

import Tutorial from './components/Tutorial';
import StarInfoCard from './components/StarInfoCard';
import Planner from './components/Planner';
import Knowledge from './components/Knowledge';
import StarGuide from './components/StarGuide';
import Quiz from './components/Quiz';
import Layout from './components/layout/Layout';
import MapTools from './components/MapTools';
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
            location={location}
            date={currentDate}
            viewMode={viewMode}
            lang={lang}
            showArt={showArt}
            enableGyro={enableGyro}
            onStarClick={(star) => setSelectedStar(star)}
            targetBody={scavengerActive ? SCAVENGER_LEVELS[scavengerLevel - 1].target : null}
            onTargetLock={setScavengerLocked}
          />

          {/* Map Tools (Only on Starmap) */}
          {currentPage === 'starmap' && !scavengerActive && (
            <div className="absolute top-24 left-4 z-40">
                <button 
                    onClick={startScavengerHunt}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-2 px-4 rounded-full shadow-lg border-2 border-white/20 hover:scale-105 transition-transform animate-pulse"
                >
                    <i className="fas fa-gamepad mr-2"></i>
                    {t.scavenger?.startBtn || 'Start Game'}
                </button>
            </div>
          )}

          {currentPage === 'starmap' && (
            <MapTools 
               viewMode={viewMode}
               onSetViewMode={setViewMode}
               enableGyro={enableGyro}
               onToggleGyro={toggleGyro}
               onLocationUpdate={handleGeolocation}
               showArt={showArt}
               onToggleArt={() => setShowArt(!showArt)}
               onCameraClick={() => setShowPostcard(true)}
               t={t}
            />
          )}

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