
import { Language } from '../types';
import { getMoonPhase } from './astroUtils';

// Interfaces based on HKO Open Data API Documentation
// https://www.hko.gov.hk/en/weatherAPI/doc/files/HKO_Open_Data_API_Documentation.pdf

export interface WeatherIcon {
    icon: number; // 50-93
    description?: string;
}

export interface DistrictWeather {
    station: string;
    value: number;
    unit: string;
}

export interface RHRReadData {
    temperature: {
        data: { place: string; value: number; unit: string }[];
        recordTime: string;
    };
    humidity: {
        data: { place: string; value: number; unit: string }[];
        recordTime: string;
    };
    rainfall: {
        data: { unit: string; place: string; max: number; main: string }[];
        startTime: string;
        endTime: string;
    };
    icon: number[]; // e.g. [50]
    updateTime: string;
}

export interface ForecastDay {
    forecastDate: string; // YYYYMMDD
    week: string;
    forecastMaxtemp: { value: number; unit: 'C' };
    forecastMintemp: { value: number; unit: 'C' };
    forecastWeather: string;
    forecastIcon: number;
    psr: string; // Probability of Significant Rain: "Low" | "Medium High" etc.
}

export interface FNDData {
    generalSituation: string;
    weatherForecast: ForecastDay[];
    updateTime: string;
}

const API_BASE = "https://data.weather.gov.hk/weatherAPI/opendata/weather.php";

export const getDistrictList = () => [
    "Hong Kong Observatory", "King's Park", "Wong Chuk Hang", "Ta Kwu Ling", 
    "Lau Fau Shan", "Tai Po", "Sha Tin", "Tuen Mun", "Tseung Kwan O", 
    "Sai Kung", "Cheung Chau", "Chek Lap Kok", "Tsing Yi", "Shek Kong"
];

export const fetchCurrentWeather = async (lang: Language): Promise<RHRReadData | null> => {
    try {
        const langParam = lang === 'zh-HK' ? 'tc' : 'en';
        const res = await fetch(`${API_BASE}?dataType=rhrread&lang=${langParam}`);
        if (!res.ok) throw new Error("Network response was not ok");
        return await res.json();
    } catch (e) {
        console.error("Fetch weather failed", e);
        return null;
    }
};

export const fetchForecast = async (lang: Language): Promise<FNDData | null> => {
    try {
        const langParam = lang === 'zh-HK' ? 'tc' : 'en';
        const res = await fetch(`${API_BASE}?dataType=fnd&lang=${langParam}`);
        if (!res.ok) throw new Error("Network response was not ok");
        return await res.json();
    } catch (e) {
        console.error("Fetch forecast failed", e);
        return null;
    }
};
export interface StargazingStatus {
    status: 'Good' | 'Fair' | 'Poor';
    reason: string;
    score: number; // 0-100
    factors: {
        weather: { status: string; label: string };
        cloud: { status: string; label: string };
        moon: { status: string; label: string; phase: string };
    };
}

// ... imports and interfaces ...

import { translations } from './i18n';

export const deriveStargazingStatus = (
    current: RHRReadData | null, 
    forecast: FNDData | null,
    lang: Language
): StargazingStatus => {
    const t = translations[lang];

    // Default fallback
    if (!current) return { 
        status: 'Fair', 
        reason: t.reasonFair || 'No data', 
        score: 50,
        factors: {
            weather: { status: 'Unknown', label: '-' },
            cloud: { status: 'Unknown', label: '-' },
            moon: { status: 'Unknown', label: '-', phase: '-' }
        }
    };

    let score = 70; // Start base
    let distinctReason = "";

    // 1. Weather Icon Analysis
    const icon = current.icon?.[0] || 0;
    
    let weatherStatus = 'Neutral';
    let weatherLabel = t.statusStable;
    
    if ([50, 51, 52, 77].includes(icon)) {
        score += 20;
        weatherStatus = 'Good';
        weatherLabel = t.statusClear;
    } else if ([60, 61].includes(icon)) {
        score -= 20;
        weatherStatus = 'Fair';
        weatherLabel = t.statusCloudy;
        distinctReason = t.reasonCloud;
    } else if (icon >= 62 || icon >= 80) {
        score -= 50;
        weatherStatus = 'Poor';
        weatherLabel = t.statusRain;
        distinctReason = t.reasonRain;
    }

    // 2. Moon Phase Analysis
    const moon = getMoonPhase(new Date());
    let moonStatus = 'Good';
    
    // Localize Moon Phase Name
    const phaseKeyMap: Record<string, string> = {
        "New Moon": t.moonNew,
        "Waxing Crescent": t.moonWaxCres,
        "First Quarter": t.moonFirstQ,
        "Waxing Gibbous": t.moonWaxGib,
        "Full Moon": t.moonFull,
        "Waning Gibbous": t.moonWanGib,
        "Last Quarter": t.moonLastQ,
        "Waning Crescent": t.moonWanCres
    };
    const moonPhaseName = phaseKeyMap[moon.phase] || moon.phase;
    let moonLabel = `${moonPhaseName} (${moon.illumination}%)`;

    if (moon.illumination > 80) {
        score -= 20;
        moonStatus = 'Poor';
        distinctReason = distinctReason || t.reasonMoon;
    } else if (moon.illumination > 50) {
        score -= 10;
        moonStatus = 'Fair';
    } else {
        score += 10;
        moonStatus = 'Best';
    }

    // 3. Cloud Analysis
    let cloudStatus = weatherStatus; 
    let cloudLabel = weatherStatus === 'Good' ? t.conditionGood : (weatherStatus === 'Fair' ? t.conditionFair : t.conditionPoor);


    // Normalize Score
    score = Math.max(0, Math.min(100, score));
    const finalStatus = score >= 80 ? 'Good' : (score >= 40 ? 'Fair' : 'Poor');
    const finalReason = distinctReason || (finalStatus === 'Good' ? t.reasonGood : t.reasonFair);

    return { 
        status: finalStatus, 
        reason: finalReason, 
        score,
        factors: {
            weather: { status: weatherStatus, label: weatherLabel },
            cloud: { status: cloudStatus, label: cloudLabel },
            moon: { status: moonStatus, label: moonLabel, phase: moonPhaseName }
        }
    };
};
