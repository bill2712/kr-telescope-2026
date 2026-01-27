export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Star {
  id: number;
  proper: string; // Common name (English)
  proper_zh?: string; // Common name (Chinese)
  ra: number; // Right Ascension (hours)
  dec: number; // Declination (degrees)
  mag: number; // Magnitude (brightness)
  con: string; // Constellation code
}

export interface ConstellationLine {
  source: string; // Star name or ID
  target: string; // Star name or ID
}

export interface TranslationKeys {
    moonDesc: string;
    starDesc: string;
    blackHoleDesc: string;
    meteorDesc: string;
    cometDesc: string;
    galaxyDesc: string;
    nebulaDesc: string;
    eclipseDesc: string;
    constellationDesc: string;
    
    // Missing Keys Added
    scaleTitle?: string;
    scaleDesc?: string;
    enterWeight?: string;
    pluto?: string;

    // Star Colors
    starOrange?: string;
    starWhite?: string;
    tempCold?: string;
    tempHot?: string;
    interactive?: {
        tapCard: string;
        btnBack: string;
        eventHorizon: string;
        gravitySlider: string;
        tapSky: string;
        orbitPos: string;
        cometTip: string;
        tilt: string;
        rotation: string;
        nursery: string;
        totality: string;
        partial: string;
        daytime: string;
        eclipseSlider: string;
    };
    expl?: {
        blackHole: { what: string; why: string; anim: string };
        meteor: { what: string; why: string; anim: string };
        comet: { what: string; why: string; anim: string };
        galaxy: { what: string; why: string; anim: string };
        nebula: { what: string; why: string; anim: string };
        eclipse: { what: string; why: string; anim: string };
        solar?: { what: string; why: string; anim: string };
        moonPhase?: { what: string; why: string; anim: string };
        starColor?: { what: string; why: string; anim: string };
        spaceScale?: { what: string; why: string; anim: string };
    };
}

export interface ConstellationArt {
  con: string; // Constellation code (e.g. "Ori")
  path?: string; // Legacy SVG path string (screen space)
  geojson?: any; // GeoJSON Feature (Sphere coordinates)
  name_zh: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export type Language = 'zh-HK' | 'en';