
import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import { 
    fetchCurrentWeather, 
    fetchForecast, 
    deriveStargazingStatus, 
    getDistrictList,
    RHRReadData,
    FNDData,
    StargazingStatus
} from '../utils/hkoApi';

interface PlannerProps {
    lang: Language;
}

const Planner: React.FC<PlannerProps> = ({ lang }) => {
  const t = translations[lang];
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState<RHRReadData | null>(null);
  const [forecast, setForecast] = useState<FNDData | null>(null);
  const [status, setStatus] = useState<StargazingStatus | null>(null);
  
  // Dynamic District List
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Hong Kong Observatory"); // Default fallback

  useEffect(() => {
    const loadData = async () => {
        setLoading(true);
        const [curr, fnd] = await Promise.all([
            fetchCurrentWeather(lang),
            fetchForecast(lang)
        ]);
        
        setCurrent(curr);
        setForecast(fnd);
        setStatus(deriveStargazingStatus(curr, fnd, lang));
        
        // Extract Districts
        if (curr && curr.temperature && curr.temperature.data.length > 0) {
            const places = curr.temperature.data.map(d => d.place);
            setAvailableDistricts(places);
            // Default to first one or try to match common ones
            if (!places.includes(selectedDistrict)) {
                setSelectedDistrict(places[0]); 
            }
        }
        
        setLoading(false);
    };
    loadData();
  }, [lang]); 

  if (loading) {
      return (
          <div className="flex h-full items-center justify-center text-white">
              <i className="fas fa-spinner fa-spin text-4xl text-kidrise-orange"></i>
          </div>
      );
  }

  // Helper to find district data
  const getDistrictData = (district: string) => {
      if(!current) return { temp: '--', humid: '--' };
      const temp = current.temperature.data.find(d => d.place === district)?.value;
      
      // Humidity usually has fewer stations. Fallback to closest logic or just general HK
      // Try exact match first
      let humid = current.humidity.data.find(d => d.place === district)?.value;
      if (!humid && current.humidity.data.length > 0) {
          humid = current.humidity.data[0].value; // General fallback
      }
      return { temp: temp ?? '--', humid: humid ?? '--' };
  };

  const localWeather = getDistrictData(selectedDistrict);

  return (
    <div className="flex flex-col h-full bg-space-black text-white pt-20 px-4 pb-32 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{t.plannerTitle}</h2>

      {/* 1. Stargazing Index Cards */}
      <div className="w-full max-w-lg mx-auto mb-8">
          <div className={`rounded-3xl p-6 border border-white/10 shadow-lg relative overflow-hidden transition-all duration-500
                ${status?.status === 'Good' ? 'bg-gradient-to-br from-green-900/80 to-green-600/40' : 
                  status?.status === 'Poor' ? 'bg-gradient-to-br from-red-900/80 to-red-600/40' : 
                  'bg-gradient-to-br from-yellow-900/80 to-yellow-600/40'}`}>
                
                {/* Main Status */}
                <div className="flex justify-between items-start z-10 relative mb-6">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2 block border-l-2 border-white/50 pl-2">{t.stargazingIndex}</span>
                        <h3 className="text-4xl font-extrabold mb-2 tracking-tight">
                             {status?.status === 'Good' ? t.conditionGood : 
                              status?.status === 'Poor' ? t.conditionPoor : 
                              t.conditionFair}
                        </h3>
                        <p className="text-sm font-medium opacity-90">{status?.reason}</p>
                    </div>
                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/5">
                        {status?.status === 'Good' ? '🌟' : status?.status === 'Poor' ? '🌧️' : '☁️'}
                    </div>
                </div>

                {/* Factors Grid */}
                {status?.factors && (
                    <div className="grid grid-cols-3 gap-2 bg-black/20 rounded-2xl p-3 backdrop-blur-sm z-10 relative border border-white/5">
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] uppercase opacity-60 mb-1">{t.cloud}</span>
                            <i className="fas fa-cloud text-lg mb-1 opacity-80"></i>
                            <span className="text-xs font-bold">{status.factors.cloud.label}</span>
                        </div>
                         <div className="flex flex-col items-center border-l border-white/10">
                            <span className="text-[10px] uppercase opacity-60 mb-1">{t.moon}</span>
                            <i className="fas fa-moon text-lg mb-1 opacity-80"></i>
                            <span className="text-xs font-bold">{status.factors.moon.phase}</span>
                        </div>
                         <div className="flex flex-col items-center border-l border-white/10">
                            <span className="text-[10px] uppercase opacity-60 mb-1">Weather</span>
                            <i className="fas fa-temperature-high text-lg mb-1 opacity-80"></i>
                            <span className="text-xs font-bold">{status.factors.weather.label}</span>
                        </div>
                    </div>
                )}
                
                {/* Background Decor */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
          </div>
      </div>

      {/* 2. Real-time Weather Selection */}
      <div className="w-full max-w-lg mx-auto mb-8 bg-[#161825]/80 border border-white/10 rounded-3xl p-6 backdrop-blur shadow-xl">
          <h3 className="text-sm font-bold uppercase tracking-widest text-kidrise-orange mb-4 flex items-center gap-2">
              <i className="fas fa-map-marker-alt"></i> {t.weatherCurrent}
          </h3>
          
          <select 
            value={selectedDistrict} 
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full bg-black/40 border border-white/10 hover:border-white/30 rounded-xl px-4 py-3 text-sm mb-6 focus:outline-none focus:border-kidrise-orange transition-colors"
          >
              {availableDistricts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl p-3 border border-blue-500/20 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-white mb-1">{localWeather.temp}°</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">{t.temp}</div>
              </div>
              <div className="col-span-1 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl p-3 border border-cyan-500/20 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-cyan-300 mb-1">{localWeather.humid}%</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">{t.humidity}</div>
              </div>
               <div className="col-span-1 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl p-3 border border-purple-500/20 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-purple-300 mb-1">
                      {current?.rainfall.data[0]?.max || 0}<span className="text-[10px] ml-1">mm</span>
                  </div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">{t.rain}</div>
              </div>
          </div>
      </div>

      {/* 3. 9-Day Forecast (Professional Table Layout) */}
      <div className="w-full max-w-3xl mx-auto">
          <h3 className="text-sm font-bold uppercase tracking-widest text-kidrise-orange mb-4 px-2">{t.weather9Day}</h3>
          <div className="bg-transparent overflow-x-auto scrollbar-hide pb-4">
              <div className="flex gap-3 px-2">
                 {forecast?.weatherForecast.map((day, i) => (
                    <div key={i} className="flex-shrink-0 w-32 bg-[#161825]/90 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-between gap-3 shadow-lg hover:bg-white/5 transition-colors">
                        <div className="text-center">
                            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{day.week}</span>
                             <span className="block text-lg font-bold text-white">
                                {day.forecastDate.substring(4, 6)}/{day.forecastDate.substring(6, 8)}
                             </span>
                        </div>
                        
                        <img 
                            src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${day.forecastIcon}.png`} 
                            alt="weather icon" 
                            className="w-12 h-12 opacity-90 invert brightness-100"
                        />
                        
                        <div className="flex items-center gap-1 font-bold">
                            <span className="text-blue-300">{day.forecastMintemp.value}°</span>
                            <span className="text-gray-500">-</span>
                            <span className="text-red-300">{day.forecastMaxtemp.value}°</span>
                        </div>
                        
                         <div className="w-full">
                            <div className="flex justify-between items-center text-[9px] text-gray-400 mb-1 uppercase tracking-wider">
                                <span>Rain</span>
                                <span>{day.psr}</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div 
                                className={`h-full rounded-full ${['High', 'Medium High'].includes(day.psr) ? 'bg-red-500' : (['Medium', 'Medium Low'].includes(day.psr) ? 'bg-yellow-500' : 'bg-green-500')}`}
                                style={{ width: ['High', 'Medium High'].includes(day.psr) ? '80%' : (['Medium', 'Medium Low'].includes(day.psr) ? '50%' : '20%') }}
                                ></div>
                            </div>
                        </div>

                    </div>
                 ))}
              </div>
          </div>
      </div>

    </div>
  );
};

export default Planner;

