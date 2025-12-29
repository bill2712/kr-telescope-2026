// Calculate Greenwhich Sidereal Time (GST) and Local Sidereal Time (LST)
// These allow us to know which stars are overhead at a specific longitude/time.

export function getLocalSiderealTime(date: Date, longitude: number): number {
  // Convert date to Julian Date
  const JD = date.getTime() / 86400000 + 2440587.5;
  const D = JD - 2451545.0; // Days since J2000.0

  // Greenwich Mean Sidereal Time (GMST) in degrees
  let GMST = 280.46061837 + 360.98564736629 * D;

  // Normalize to 0-360
  GMST = GMST % 360;
  if (GMST < 0) GMST += 360;

  // Local Sidereal Time (LST) = GMST + Longitude
  let LST = GMST + longitude;

  // Normalize
  LST = LST % 360;
  if (LST < 0) LST += 360;

  return LST; // In degrees
}

export function degreesToRadians(deg: number): number {
  return deg * (Math.PI / 180);
}

// Convert Right Ascension (Hours) to Degrees for D3 (0-360)
// D3 Geo uses Lambda (Longitude) and Phi (Latitude).
// RA corresponds to Longitude (-180 to 180 or 0-360), Dec to Latitude.
// Note: RA increases Eastwards. D3 Longitude usually increases Eastwards too.
// 1 Hour RA = 15 Degrees.
export function raToDegrees(raHours: number): number {
    // RA is typically 0 to 24h. 
    // We want to map this to degrees. 
    // D3 convention usually places 0 at the center.
    // We map 0-24h to 0-360 deg.
    // However, celestial longitude (RA) goes counter-clockwise looking from North.
    return raHours * 15;
}
