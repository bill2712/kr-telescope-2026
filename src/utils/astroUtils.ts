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
    return raHours * 15;
}

// Approximate Sun Position (Low Precision)
// Returns RA in hours, Dec in degrees
export function getSunPosition(date: Date): { ra: number, dec: number } {
    const d = (date.getTime() / 86400000.0) - (date.getTimezoneOffset() / 1440.0) - 2451545.0; // Days since J2000
    const w = 282.9404 + 4.70935E-5 * d; // Longitude of perihelion
    const a = 1.000000; // Mean distance, a.u.
    const e = 0.016709 - 1.151E-9 * d; // Eccentricity
    const M = (356.0470 + 0.9856002585 * d) % 360; // Mean anomaly
    
    // Obliquity of the ecliptic
    const obliq = 23.4393 - 3.563E-7 * d;

    // Eccentric anomaly
    const L = w + M; // Mean longitude
    const E = M + (180/Math.PI) * e * Math.sin(M * (Math.PI/180)) * (1 + e * Math.cos(M * (Math.PI/180)));

    // Rectangular coordinates in the plane of the ecliptic
    const x = Math.cos(E * (Math.PI/180)) - e;
    const y = Math.sin(E * (Math.PI/180)) * Math.sqrt(1 - e*e);

    const r = Math.sqrt(x*x + y*y);
    const v = Math.atan2(y, x) * (180/Math.PI);
    
    const lon = v + w;

    // Ecliptic rectangular coordinates (z=0) -> Equatorial rectangular coordinates
    // xecl = r * cos(lon)
    // yecl = r * sin(lon)
    // zecl = 0
    
    // Equatorial coordinates
    // xeq = xecl
    // yeq = yecl * cos(obliq) - zecl * sin(obliq) = r * sin(lon) * cos(obliq)
    // zeq = yecl * sin(obliq) + zecl * cos(obliq) = r * sin(lon) * sin(obliq)

    const xeq = r * Math.cos(lon * (Math.PI/180));
    const yeq = r * Math.sin(lon * (Math.PI/180)) * Math.cos(obliq * (Math.PI/180));
    const zeq = r * Math.sin(lon * (Math.PI/180)) * Math.sin(obliq * (Math.PI/180));

    const ra = Math.atan2(yeq, xeq) * (180/Math.PI) / 15; // To Hours
    const dec = Math.atan2(zeq, Math.sqrt(xeq*xeq + yeq*yeq)) * (180/Math.PI);
    
    return { ra: (ra < 0 ? ra + 24 : ra), dec };
}

// Approximate Moon Position
export function getMoonPosition(date: Date): { ra: number, dec: number } {
    const d = (date.getTime() / 86400000.0) - (date.getTimezoneOffset() / 1440.0) - 2451545.0; // Days since J2000
    
    const L = (218.316 + 13.176396 * d) % 360; // Mean longitude
    const M = (134.963 + 13.064993 * d) % 360; // Mean anomaly
    const F = (93.272 + 13.229350 * d) % 360;  // Mean distance

    const l = L + 6.289 * Math.sin(M * (Math.PI/180)); // Longitude
    const b = 5.128 * Math.sin(F * (Math.PI/180));     // Latitude
    const obliq = 23.4393 - 3.563E-7 * d;

    // Convert to RA/Dec
    // cos(dec) * cos(ra) = cos(b) * cos(l)
    // cos(dec) * sin(ra) = cos(b) * sin(l) * cos(obliq) - sin(b) * sin(obliq)
    // sin(dec)           = cos(b) * sin(l) * sin(obliq) + sin(b) * cos(obliq)
    
    const cb = Math.cos(b * (Math.PI/180));
    const sb = Math.sin(b * (Math.PI/180));
    const cl = Math.cos(l * (Math.PI/180));
    const sl = Math.sin(l * (Math.PI/180));
    const co = Math.cos(obliq * (Math.PI/180));
    const so = Math.sin(obliq * (Math.PI/180));

    const x = cb * cl;
    const y = cb * sl * co - sb * so;
    const z = cb * sl * so + sb * co;

    const ra = Math.atan2(y, x) * (180/Math.PI) / 15;
    const dec = Math.asin(z) * (180/Math.PI);

    return { ra: (ra < 0 ? ra + 24 : ra), dec };
}
