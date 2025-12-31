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