import { Star, ConstellationLine, ConstellationArt } from '../types';

// A small subset of bright stars for demonstration
// RA is in hours (0-24), Dec is in degrees (-90 to +90)
export const BRIGHT_STARS: Star[] = [
  { id: 1, proper: "Sirius", proper_zh: "天狼星", ra: 6.75, dec: -16.72, mag: -1.46, con: "CMa" },
  { id: 2, proper: "Canopus", proper_zh: "老人星", ra: 6.40, dec: -52.70, mag: -0.74, con: "Car" },
  { id: 3, proper: "Rigil Kentaurus", proper_zh: "南門二", ra: 14.66, dec: -60.83, mag: -0.27, con: "Cen" },
  { id: 4, proper: "Arcturus", proper_zh: "大角星", ra: 14.26, dec: 19.18, mag: -0.05, con: "Boo" },
  { id: 5, proper: "Vega", proper_zh: "織女一", ra: 18.62, dec: 38.78, mag: 0.03, con: "Lyr" },
  { id: 6, proper: "Capella", proper_zh: "五車二", ra: 5.28, dec: 46.00, mag: 0.08, con: "Aur" },
  { id: 7, proper: "Rigel", proper_zh: "參宿七", ra: 5.24, dec: -8.20, mag: 0.13, con: "Ori" },
  { id: 8, proper: "Procyon", proper_zh: "南河三", ra: 7.65, dec: 5.22, mag: 0.34, con: "CMi" },
  { id: 9, proper: "Betelgeuse", proper_zh: "參宿四", ra: 5.92, dec: 7.41, mag: 0.42, con: "Ori" },
  { id: 10, proper: "Achernar", proper_zh: "水委一", ra: 1.63, dec: -57.24, mag: 0.46, con: "Eri" },
  { id: 11, proper: "Hadar", proper_zh: "馬腹一", ra: 14.06, dec: -60.37, mag: 0.61, con: "Cen" },
  { id: 12, proper: "Altair", proper_zh: "牛郎星", ra: 19.85, dec: 8.87, mag: 0.76, con: "Aql" },
  { id: 13, proper: "Acrux", proper_zh: "十字架二", ra: 12.44, dec: -63.10, mag: 0.76, con: "Cru" },
  { id: 14, proper: "Aldebaran", proper_zh: "畢宿五", ra: 4.60, dec: 16.51, mag: 0.86, con: "Tau" },
  { id: 15, proper: "Antares", proper_zh: "心宿二", ra: 16.49, dec: -26.43, mag: 0.96, con: "Sco" },
  { id: 16, proper: "Spica", proper_zh: "角宿一", ra: 13.42, dec: -11.16, mag: 0.97, con: "Vir" },
  { id: 17, proper: "Pollux", proper_zh: "北河三", ra: 7.76, dec: 28.03, mag: 1.14, con: "Gem" },
  { id: 18, proper: "Fomalhaut", proper_zh: "北落師門", ra: 22.96, dec: -29.62, mag: 1.16, con: "PsA" },
  { id: 19, proper: "Deneb", proper_zh: "天津四", ra: 20.69, dec: 45.28, mag: 1.25, con: "Cyg" },
  { id: 20, proper: "Mimosa", proper_zh: "十字架三", ra: 12.80, dec: -59.69, mag: 1.25, con: "Cru" },
  { id: 21, proper: "Regulus", proper_zh: "軒轅十四", ra: 10.14, dec: 11.97, mag: 1.35, con: "Leo" },
  { id: 22, proper: "Adhara", proper_zh: "弧矢七", ra: 6.98, dec: -28.97, mag: 1.50, con: "CMa" },
  { id: 23, proper: "Castor", proper_zh: "北河二", ra: 7.58, dec: 31.89, mag: 1.58, con: "Gem" },
  { id: 24, proper: "Gacrux", proper_zh: "十字架一", ra: 12.52, dec: -57.11, mag: 1.63, con: "Cru" },
  { id: 25, proper: "Shaula", proper_zh: "尾宿八", ra: 17.56, dec: -37.10, mag: 1.62, con: "Sco" },
  { id: 26, proper: "Bellatrix", proper_zh: "參宿五", ra: 5.42, dec: 6.35, mag: 1.64, con: "Ori" },
  { id: 27, proper: "Elnath", proper_zh: "五車五", ra: 5.43, dec: 28.61, mag: 1.65, con: "Tau" },
  { id: 28, proper: "Miaplacidus", proper_zh: "南船五", ra: 9.22, dec: -69.72, mag: 1.67, con: "Car" },
  { id: 29, proper: "Alnilam", proper_zh: "參宿二", ra: 5.60, dec: -1.20, mag: 1.69, con: "Ori" },
  { id: 30, proper: "Alnair", proper_zh: "鶴鴕", ra: 22.14, dec: -46.96, mag: 1.74, con: "Gru" },
  { id: 31, proper: "Alnitak", proper_zh: "參宿一", ra: 5.68, dec: -1.94, mag: 1.77, con: "Ori" },
  { id: 32, proper: "Alioth", proper_zh: "玉衡", ra: 12.90, dec: 55.96, mag: 1.77, con: "UMa" },
  { id: 33, proper: "Dubhe", proper_zh: "天樞", ra: 11.06, dec: 61.75, mag: 1.79, con: "UMa" },
  { id: 34, proper: "Mirfak", proper_zh: "天船三", ra: 3.41, dec: 49.86, mag: 1.80, con: "Per" },
  { id: 35, proper: "Polaris", proper_zh: "北極星", ra: 2.53, dec: 89.26, mag: 1.98, con: "UMi" }, // North Star
];

// Simple connections for drawing lines
export const CONSTELLATION_LINES: ConstellationLine[] = [
  // Orion
  { source: "Betelgeuse", target: "Bellatrix" },
  { source: "Betelgeuse", target: "Alnitak" },
  { source: "Rigel", target: "Alnilam" },
  { source: "Bellatrix", target: "Rigel" }, 
  { source: "Alnitak", target: "Alnilam" },
  { source: "Alnilam", target: "5.53,-2.3" }, 
  
  // Big Dipper (UMa)
  { source: "Dubhe", target: "Alioth" }, 

  // Southern Cross (Crux)
  { source: "Acrux", target: "Gacrux" },
  { source: "Mimosa", target: "Acrux" }, 

  // Gemini
  { source: "Pollux", target: "Castor" },
];

// Simplified Art Paths (Just illustrative outlines)
// Coordinates roughly mapped to stereo projection of the constellation
export const CONSTELLATION_ART: ConstellationArt[] = [
    {
        con: "Ori",
        name_zh: "獵戶座",
        // GeoJSON Feature for Orion (Simplified outline)
        geojson: {
             type: "Feature",
             geometry: {
                 type: "Polygon",
                 coordinates: [[
                    [78, 10], [80, 5], [88, -8], [85, -10], [75, 0], [78, 10] // Rough box around Orion
                 ]]
             }
        }
    },
    {
        con: "UMa",
        name_zh: "大熊座",
        geojson: {
             type: "Feature",
             geometry: {
                 type: "Polygon", 
                 coordinates: [[
                     [160, 60], [170, 65], [195, 55], [180, 50], [160, 60] // Rough Bear
                 ]]
             }
        }
    },
    {
        con: "Cas",
        name_zh: "仙后座",
        // W shape
        geojson: {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [[15, 60], [20, 55], [25, 60], [30, 55], [35, 60]] 
            }
        }
    },
    {
        con: "Cyg",
        name_zh: "天鵝座",
        // Cross / Swan
        geojson: {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [300, 40], [310, 50], [300, 60], [290, 50], [300, 40]
                ]]
            }
        }
    },
    {
        con: 'Sco',
        name_zh: '天蠍座',
        geojson: null // Fallback to emoji if needed
    }
];