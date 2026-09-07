
import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import { 
    fetchCurrentWeather, 
    fetchForecast, 
    deriveStargazingStatus, 
    RHRReadData,
    FNDData,
    StargazingStatus
} from '../utils/hkoApi';

// Import Icons
import iconSunny from '../assets/weather/weather_sunny.png';
import iconCloudy from '../assets/weather/weather_cloudy.png';
import iconPartlyCloudy from '../assets/weather/weather_partly_cloudy.png';
import iconRain from '../assets/weather/weather_rain.png';

interface PlannerProps {
    lang: Language;
    onOpenStarMap: () => void;
}

const Planner: React.FC<PlannerProps> = ({ lang, onOpenStarMap }) => {
  const t = translations[lang];
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState<RHRReadData | null>(null);
  const [forecast, setForecast] = useState<FNDData | null>(null);
  const [status, setStatus] = useState<StargazingStatus | null>(null);
  
  // Dynamic District List
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Hong Kong Observatory"); // Default fallback
  const [stargazingScore, setStargazingScore] = useState(0);

  // Helper to get Custom Icon
  const getWeatherIcon = (psr: string) => {
      // PSR values: High, Medium High, Medium, Medium Low, Low
      if (psr === 'High' || psr === 'Medium High') return iconRain;
      if (psr === 'Medium') return iconCloudy;
      if (psr === 'Medium Low') return iconPartlyCloudy;
      return iconSunny;
  };

  useEffect(() => {
    let cancelled = false;
    const loadData = async () => {
        setLoading(true);
        const [curr, fnd] = await Promise.all([
            fetchCurrentWeather(lang),
            fetchForecast(lang)
        ]);
        
        if (cancelled) return;
        setCurrent(curr);
        setForecast(fnd);
        
        const derived = deriveStargazingStatus(curr, lang);
        setStatus(derived);
        setStargazingScore(derived.score);
        
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
    void loadData();
    return () => {
        cancelled = true;
    };
  }, [lang]); 

  if (loading) {
      return (
          <div className="flex h-full items-center justify-center text-white">
              <i className="fas fa-spinner fa-spin text-4xl text-secondary"></i>
          </div>
      );
  }

  // Helper to find district data
  const getDistrictData = (district: string) => {
      if(!current) return { temp: '--', humid: '--' };
      const temp = current.temperature.data.find(d => d.place === district)?.value;
      
      let humid = current.humidity.data.find(d => d.place === district)?.value;
      if (humid === undefined && current.humidity.data.length > 0) {
          humid = current.humidity.data[0].value; // General fallback
      }
      return { temp: temp ?? '--', humid: humid ?? '--' };
  };

  const localWeather = getDistrictData(selectedDistrict);
  const scoreColor = stargazingScore >= 80 ? 'text-green-400' : stargazingScore >= 50 ? 'text-yellow-400' : 'text-red-400';
  const scoreBg = stargazingScore >= 80 ? 'from-green-500/20 to-green-900/10' : stargazingScore >= 50 ? 'from-yellow-500/20 to-yellow-900/10' : 'from-red-500/20 to-red-900/10';
  const hongKongMonth = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' })).getMonth();
  const seasonIndex = hongKongMonth === 11 || hongKongMonth <= 1 ? 0 : hongKongMonth <= 4 ? 1 : hongKongMonth <= 7 ? 2 : 3;
  const seasonalTargets = lang === 'zh-HK'
    ? [
        [{ name: '獵戶座', desc: '冬季最容易辨認的星座之一。' }, { name: '昴宿星團', desc: '先用肉眼找細小星群，再用低倍鏡。' }],
        [{ name: '獅子座', desc: '利用問號形狀的鐮刀星群開始尋找。' }, { name: '北斗七星', desc: '由斗柄開始辨認北方天空。' }],
        [{ name: '夏季大三角', desc: '由三顆明亮星星開始定位。' }, { name: '天蠍座', desc: '向南方低空尋找紅色心宿二。' }],
        [{ name: '飛馬座四邊形', desc: '秋季天空的大型方框標記。' }, { name: '仙后座', desc: '向北找明顯的 W 形星座。' }],
      ][seasonIndex]
    : [
        [{ name: 'Orion', desc: 'One of the easiest winter constellations to recognise.' }, { name: 'Pleiades', desc: 'Find the tiny star cluster by eye, then use low power.' }],
        [{ name: 'Leo', desc: 'Start with its backwards-question-mark sickle shape.' }, { name: 'Big Dipper', desc: 'Use the bowl and handle to explore the northern sky.' }],
        [{ name: 'Summer Triangle', desc: 'Start with three bright stars high in the summer sky.' }, { name: 'Scorpius', desc: 'Look low in the south for reddish Antares.' }],
        [{ name: 'Great Square of Pegasus', desc: 'A large square landmark in the autumn sky.' }, { name: 'Cassiopeia', desc: 'Look north for its recognisable W shape.' }],
      ][seasonIndex];
  const recommendationCopy = lang === 'zh-HK'
    ? {
        title: '今晚睇咩',
        subtitle: '按香港目前天氣、月相及季節提供；實際方向及可見時間請在星圖確認。',
        moon: '月球',
        moonDesc: `${status?.factors.moon.phase ?? '月相'}；適合先用低倍鏡觀察明暗交界。`,
        easy: '容易尋找',
        seasonal: '本季目標',
        poor: '現時天氣較差，可先用星圖預習，等待雲隙再觀察。',
        fair: '先找明亮目標；深空天體可能受雲層或月光影響。',
        good: '條件理想，可先由肉眼定位，再使用望遠鏡。',
        map: '在實時星圖尋找',
        updated: '天文台資料更新：',
      }
    : {
        title: 'Tonight’s Picks',
        subtitle: 'Based on current Hong Kong weather, Moon phase and season. Confirm direction and visibility time in the map.',
        moon: 'Moon',
        moonDesc: `${status?.factors.moon.phase ?? 'Moon phase'}; start at low power and examine the light-dark boundary.`,
        easy: 'Easy to find',
        seasonal: 'Seasonal target',
        poor: 'Conditions are poor. Preview the targets in the map and wait for a clear gap.',
        fair: 'Start with bright targets; cloud or moonlight may affect faint objects.',
        good: 'Conditions look promising. Locate each target by eye before using the telescope.',
        map: 'Find in Live Star Map',
        updated: 'HKO data updated:',
      };
  const conditionAdvice = stargazingScore >= 80 ? recommendationCopy.good : stargazingScore >= 40 ? recommendationCopy.fair : recommendationCopy.poor;
  const updateTime = current?.updateTime ? new Date(current.updateTime) : null;
  const formattedUpdateTime = updateTime && !Number.isNaN(updateTime.getTime())
    ? updateTime.toLocaleString(lang === 'zh-HK' ? 'zh-HK' : 'en-HK', { timeZone: 'Asia/Hong_Kong', dateStyle: 'medium', timeStyle: 'short' })
    : null;

  return (
    <div className="flex flex-col w-full bg-space-black text-white pt-14 md:pt-28 px-4 pb-12 max-w-5xl mx-auto">
      {/* 1. Stargazing Index Dashboard */}
      <div className={`w-full bg-gradient-to-br ${scoreBg} backdrop-blur-md rounded-[3rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden mb-8`}>
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                <i className="fas fa-star text-9xl"></i>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/60 mb-2">{t.stargazingIndex}</h2>
                  <div className="flex items-baseline justify-center md:justify-start gap-2">
                       <span className={`text-8xl font-black ${scoreColor} drop-shadow-lg`}>{stargazingScore}</span>
                       <span className="text-2xl font-bold text-white/40">/100</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mt-2">
                      {status?.status === 'Good' ? t.conditionGood : 
                       status?.status === 'Poor' ? t.conditionPoor : 
                       t.conditionFair}
                  </h3>
                  <p className="text-lg text-blue-200 mt-2 max-w-md">{status?.reason}</p>
              </div>

              {/* Factors Cards */}
              <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                    <div className="bg-black/30 p-4 rounded-2xl border border-white/5 flex flex-col items-center min-w-[100px]">
                        <i className="fas fa-cloud text-2xl text-cyan-300 mb-2"></i>
                        <span className="text-xs text-white/60 uppercase">{t.cloud}</span>
                        <span className="font-bold text-lg">{status?.factors.cloud.label}</span>
                    </div>
                    <div className="bg-black/30 p-4 rounded-2xl border border-white/5 flex flex-col items-center min-w-[100px]">
                        <i className="fas fa-moon text-2xl text-yellow-300 mb-2"></i>
                        <span className="text-xs text-white/60 uppercase">{t.moon}</span>
                        <span className="font-bold text-lg leading-tight text-center">{status?.factors.moon.phase}</span>
                    </div>
              </div>
          </div>
      </div>

      <section className="mb-8 rounded-3xl border border-cyan-400/20 bg-cyan-500/5 p-5 shadow-xl sm:p-7" aria-labelledby="tonight-picks-title">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">{recommendationCopy.easy}</p>
            <h2 id="tonight-picks-title" className="mt-1 text-3xl font-black text-white">{recommendationCopy.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{recommendationCopy.subtitle}</p>
            <p className={`mt-3 text-sm font-bold ${scoreColor}`}>{conditionAdvice}</p>
            {formattedUpdateTime && <p className="mt-2 text-xs text-slate-500">{recommendationCopy.updated} {formattedUpdateTime}</p>}
          </div>
          <button type="button" onClick={onOpenStarMap} className="min-h-12 shrink-0 rounded-xl bg-cyan-500 px-5 font-black text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <i className="fas fa-location-arrow mr-2" />{recommendationCopy.map}
          </button>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <span className="text-xs font-bold text-yellow-300">{recommendationCopy.easy}</span>
            <h3 className="mt-2 text-xl font-black text-white"><i className="fas fa-moon mr-2 text-yellow-200" />{recommendationCopy.moon}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{recommendationCopy.moonDesc}</p>
          </article>
          {seasonalTargets.map((target) => (
            <article key={target.name} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <span className="text-xs font-bold text-cyan-300">{recommendationCopy.seasonal}</span>
              <h3 className="mt-2 text-xl font-black text-white"><i className="fas fa-star mr-2 text-cyan-200" />{target.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{target.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 2. Real-time Weather Panel */}
          <div className="col-span-1 lg:col-span-1 bg-[#161825]/60 backdrop-blur rounded-3xl p-6 border border-white/10 shadow-xl h-full">
              <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-6 flex items-center gap-2">
                  <i className="fas fa-location-arrow"></i> {t.weatherCurrent}
              </h3>
              
              <div className="relative mb-6">
                <select 
                    value={selectedDistrict} 
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full appearance-none bg-white/5 border border-white/10 hover:border-white/30 rounded-2xl px-5 py-4 text-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all cursor-pointer"
                >
                    {availableDistricts.map(d => <option key={d} value={d} className="bg-[#1c1e33]">{d}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                    <i className="fas fa-chevron-down"></i>
                </div>
              </div>

              <div className="flex items-center justify-between bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl p-6 mb-4 border border-white/5">
                  <div>
                      <div className="text-5xl font-black text-white tracking-tighter">{localWeather.temp}°</div>
                      <div className="text-sm font-bold text-blue-300 mt-1">{t.temp}</div>
                  </div>
                  <div className="h-12 w-[1px] bg-white/10"></div>
                  <div className="text-right">
                      <div className="text-3xl font-bold text-cyan-300">{localWeather.humid}%</div>
                      <div className="text-sm font-bold text-cyan-500/70">{t.humidity}</div>
                  </div>
              </div>
          </div>

          {/* 3. 9-Day Forecast */}
          <div className="col-span-1 lg:col-span-2 bg-[#161825]/60 backdrop-blur rounded-3xl p-6 border border-white/10 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-6 px-2">{t.weather9Day}</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                 {forecast?.weatherForecast.slice(0, 5).map((day, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-between gap-3 hover:bg-white/10 transition-transform hover:scale-105 group min-h-[160px]">
                        <div className="text-center">
                            <span className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">{day.week}</span>
                             <span className="block text-sm font-bold text-white bg-white/10 px-2 py-0.5 rounded-md">
                                {day.forecastDate.substring(4, 6)}/{day.forecastDate.substring(6, 8)}
                             </span>
                        </div>
                        
                        <img 
                            src={getWeatherIcon(day.psr)}
                            alt="weather" 
                            className="w-14 h-14 object-contain drop-shadow-lg group-hover:scale-110 transition-transform mix-blend-screen"
                        />
                        
                        <div className="flex items-center gap-1 font-bold text-sm">
                            <span className="text-blue-300">{day.forecastMintemp.value}°</span>
                            <span className="text-white/20">/</span>
                            <span className="text-white">{day.forecastMaxtemp.value}°</span>
                        </div>
                        
                        {/* Custom Stargazing Indicator based on Rain prob */}
                         <div className="w-full flex justify-center">
                            <i className={`fas fa-star text-[10px] ${['Low', 'Medium Low'].includes(day.psr) ? 'text-yellow-400' : 'text-slate-600'}`}></i>
                            <i className={`fas fa-star text-[10px] ${['Low'].includes(day.psr) ? 'text-yellow-400' : 'text-slate-600'}`}></i>
                            <i className={`fas fa-star text-[10px] ${['Low'].includes(day.psr) ? 'text-yellow-400' : 'text-slate-600'}`}></i>
                        </div>

                    </div>
                 ))}
                 
                 {/* Show remaining as simpler list on mobile or smaller view if needed, but grid usually fits 5 well. */}
              </div>
               
               {/* Tip Section */}
               <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-4">
                   <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">i</div>
                   <div>
                       <h4 className="font-bold text-blue-300 text-sm mb-1">{t.astroTip || 'ASTRO TIP'}</h4>
                       <p className="text-sm text-blue-100/80 leading-relaxed">
                           {stargazingScore > 70 
                            ? (t.tipGood || "Conditions are great!")
                            : (t.tipBad || "Visibility might be low.")}
                       </p>
                   </div>
               </div>
          </div>

      </div>

    </div>
  );
};

export default Planner;
