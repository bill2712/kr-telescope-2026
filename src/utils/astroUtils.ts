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

export const getMoonPhase = (date: Date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 3) {
        year--;
        month += 12;
    }

    const c = 365.25 * year;
    const e = 30.6 * month;
    const jd = c + e + day - 694039.09; // jd is total days elapsed
    const b = jd / 29.5305882; // divide by the moon cycle
    const ip = b - Math.floor(b); // Get the fractional part
    const age = Math.round(ip * 29.53); // Scale it to 0-29

    let phaseName = "";
    if (age < 1) phaseName = "New Moon";
    else if (age < 7) phaseName = "Waxing Crescent";
    else if (age === 7) phaseName = "First Quarter";
    else if (age < 15) phaseName = "Waxing Gibbous";
    else if (age === 15) phaseName = "Full Moon";
    else if (age < 22) phaseName = "Waning Gibbous";
    else if (age === 22) phaseName = "Last Quarter";
    else phaseName = "Waning Crescent";

    return {
        phase: phaseName,
        age: age,
        illumination: Math.round((1 - Math.cos(((age / 29.53) * 2) * Math.PI)) / 2 * 100)
    };
};

// Approximate Planet Positions (Low Precision)
function getPlanetPosition(date: Date, N: number, i: number, w: number, a: number, e: number, M_0: number, M_d: number) {
    const d = (date.getTime() / 86400000.0) - (date.getTimezoneOffset() / 1440.0) - 2451545.0; 
    
    const M = (M_0 + M_d * d) % 360; // Mean anomaly
    
    // Obliquity of the ecliptic
    const obliq = 23.4393 - 3.563E-7 * d;

    // Eccentric anomaly (Iterative)
    let E = M + (180/Math.PI) * e * Math.sin(M * (Math.PI/180));
    for(let j=0; j<5; j++) {
         const dE = (E - M - (180/Math.PI) * e * Math.sin(E * (Math.PI/180))) / (1 - e * Math.cos(E * (Math.PI/180)));
         E -= dE;
    }

    // Rectangular coordinates in the orbital plane
    const x = a * (Math.cos(E * (Math.PI/180)) - e);
    const y = a * Math.sqrt(1 - e*e) * Math.sin(E * (Math.PI/180));

    const r = Math.sqrt(x*x + y*y);
    const v = Math.atan2(y, x) * (180/Math.PI);

    // Heliocentric coordinates
    // We need Longitude of ascending node (N), Argument of perihelion (w), Inclination (i)
    // l = v + w
    // Heliocentric coords (ecliptic)
    // Xh = r * (cos(N) cos(v+w) - sin(N) sin(v+w) cos(i))
    // Yh = r * (sin(N) cos(v+w) + cos(N) sin(v+w) cos(i))
    // Zh = r * (sin(v+w) sin(i))
    
    const vw = (v + w) * (Math.PI/180);
    const n_rad = N * (Math.PI/180);
    const i_rad = i * (Math.PI/180);

    const Xh = r * (Math.cos(n_rad) * Math.cos(vw) - Math.sin(n_rad) * Math.sin(vw) * Math.cos(i_rad));
    const Yh = r * (Math.sin(n_rad) * Math.cos(vw) + Math.cos(n_rad) * Math.sin(vw) * Math.cos(i_rad));
    const Zh = r * (Math.sin(vw) * Math.sin(i_rad));

    // We need Geocentric coordinates.
    // Earth Coordinates
    const sunPos = getSunPosition(date); // This returns equatorial RA/Dec. We need Earth's heliocentric coords.
    // Simplifying: Use approximation:
    // Earth Heliocentric:
    const d_e = d;
    // Earth orbital elements
    const M_e = (357.529 + 0.98560028 * d_e) % 360;
    const L_e = (280.4665 + 0.98564736 * d_e) % 360; // Mean longitude
    // ... this is getting complicated to mix with existing getSunPosition.
    // Better: Retrieve Sun's geocentric rectangular coords (which are -Earth's heliocentric).
    // From existing getSunPosition logic, we had r, lon.
    // Sun's geocentric ecliptic:
    // Xs = r * cos(lon)
    // Ys = r * sin(lon)
    // Zs = 0
    
    // We can just call getSunPosition logic again or duplicate it slightly to get x,y,z
    // Let's duplicate minimal logic for Earth/Sun
    const w_sun = 282.9404 + 4.70935E-5 * d;
    const e_sun = 0.016709 - 1.151E-9 * d;
    const M_sun = (356.0470 + 0.9856002585 * d) % 360;
    const E_sun = M_sun + (180/Math.PI) * e_sun * Math.sin(M_sun * (Math.PI/180)) * (1 + e_sun * Math.cos(M_sun * (Math.PI/180)));
    const x_s = Math.cos(E_sun * (Math.PI/180)) - e_sun;
    const y_s = Math.sin(E_sun * (Math.PI/180)) * Math.sqrt(1 - e_sun*e_sun);
    const r_sun = Math.sqrt(x_s*x_s + y_s*y_s);
    const v_sun = Math.atan2(y_s, x_s) * (180/Math.PI);
    const lon_sun = (v_sun + w_sun) * (Math.PI/180);
    
    const Xs = r_sun * Math.cos(lon_sun);
    const Ys = r_sun * Math.sin(lon_sun);
    const Zs = 0;

    // Type casting helper
    const rad = (deg: number) => deg * Math.PI / 180;
    const deg = (rad: number) => rad * 180 / Math.PI;

    // Geocentric coordinates of Planet = Planet_Heliocentric + Sun_Geocentric (where Sun_Geo is position of Sun relative to Earth)
    // Actually:
    // Planet_Geo_Vector = Planet_Helio_Vector - Earth_Helio_Vector
    // Since Sun_Geo_Vector = -Earth_Helio_Vector (approx)
    // Planet_Geo_Vector = Planet_Helio_Vector + Sun_Geo_Vector
    
    const Xg = Xh + Xs;
    const Yg = Yh + Ys;
    const Zg = Zh + Zs;

    // Convert to Equatorial (Rotate by obliquity)
    const x_eq = Xg;
    const y_eq = Yg * Math.cos(rad(obliq)) - Zg * Math.sin(rad(obliq));
    const z_eq = Yg * Math.sin(rad(obliq)) + Zg * Math.cos(rad(obliq));

    const ra = deg(Math.atan2(y_eq, x_eq)) / 15;
    const dec = deg(Math.atan2(z_eq, Math.sqrt(x_eq*x_eq + y_eq*y_eq)));

    return { ra: (ra < 0 ? ra + 24 : ra), dec };
}

export function getMarsPosition(date: Date) {
    // Elements J2000
    // N = 49.5581, i = 1.8497, w = 286.502, a = 1.523679, e = 0.093405, M = 18.602 + 0.52402078 d
    return getPlanetPosition(date, 49.5581, 1.8497, 286.502, 1.523679, 0.093405, 18.602, 0.52402078);
}

export function getJupiterPosition(date: Date) {
     // Elements J2000
     // N = 100.46, i = 1.303, w = 273.867, a = 5.204267, e = 0.048498, M = 20.02 + 0.0830853 d
    return getPlanetPosition(date, 100.46, 1.303, 273.867, 5.204267, 0.048498, 20.02, 0.0830853);
}
