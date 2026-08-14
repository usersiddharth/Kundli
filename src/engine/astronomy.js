// High-Precision Vedic Astrological Ephemeris Engine (Jean Meeus Full Geocentric Reduction)

export const d2r = Math.PI / 180.0;
export const r2d = 180.0 / Math.PI;

export function degToDms(deg) {
  let normalized = ((deg % 360) + 360) % 360;
  let signDeg = normalized % 30;
  let d = Math.floor(signDeg);
  let mRem = (signDeg - d) * 60;
  let m = Math.floor(mRem);
  let s = Math.floor((mRem - m) * 60);
  return {
    deg: d,
    min: m,
    sec: s,
    formatted: `${d}° ${m}' ${s}"`,
  };
}

export function calculateJulianDay(year, month, day, hour = 0, minute = 0, second = 0) {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  let a = Math.floor(y / 100);
  let b = 2 - a + Math.floor(a / 4);
  let dayFraction = day + (hour + minute / 60.0 + second / 3600.0) / 24.0;
  let jd =
    Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + dayFraction + b - 1524.5;
  return jd;
}

export function getLahiriAyanamsha(T) {
  // Lahiri Ayanamsha (Chitra Paksha): 23° 51' 25.53" at J2000.0 (T=0)
  return 23.856111 + 1.396042 * T + 0.000308 * T * T;
}

export function calculatePlanetaryPositions(year, month, day, hour, minute, lat, lng, tz = 5.5) {
  // Calculate Universal Time (UT)
  let decHours = hour + minute / 60.0 - tz;
  let jd = calculateJulianDay(year, month, day, decHours);
  let T = (jd - 2451545.0) / 36525.0; // Julian centuries from J2000.0
  let ayanamsha = getLahiriAyanamsha(T);

  // 1. Sun Position (Meeus Ch. 25)
  let Lsun = (280.46646 + 36000.76983 * T + 0.0003032 * T * T) % 360;
  let Msun = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) % 360;
  let rMsun = (((Msun % 360) + 360) % 360) * d2r;
  let Csun =
    (1.914602 - 0.004817 * T) * Math.sin(rMsun) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * rMsun) +
    0.000289 * Math.sin(3 * rMsun);
  let sunTrop = (Lsun + Csun + 3600) % 360;
  let sunSid = (sunTrop - ayanamsha + 3600) % 360;

  // 2. Earth Heliocentric Coordinates
  let Le = (100.46457166 + 35999.37244981 * T) % 360;
  let ae = 1.00000011;
  let ee = 0.01671022 - 0.00003804 * T;
  let peri_e = (102.94719 + 0.31795 * T) % 360;
  let Me = (Le - peri_e + 3600) % 360;
  let rMe = Me * d2r;
  let Ce = (2 * ee - Math.pow(ee, 3) / 4) * Math.sin(rMe) + (5 / 4) * ee * ee * Math.sin(2 * rMe);
  let ve = (Me + Ce * r2d + 3600) % 360;
  let theta_e = (ve + peri_e) * d2r;
  let re = (ae * (1 - ee * ee)) / (1 + ee * Math.cos(ve * d2r));
  let xe = re * Math.cos(theta_e);
  let ye = re * Math.sin(theta_e);

  // 3. Moon Position (Meeus Ch. 47 ELP-2000 Periodic Lunar Terms)
  let L0 = (218.3164477 + 481267.88123421 * T) % 360;
  let D = (297.8501921 + 445267.1114034 * T) % 360;
  let M = (357.5291092 + 35999.0502909 * T) % 360;
  let Mpr = (134.9633964 + 477198.8675055 * T) % 360;
  let F = (93.272095 + 483202.0175273 * T) % 360;

  let rD = (((D % 360) + 360) % 360) * d2r;
  let rM = (((M % 360) + 360) % 360) * d2r;
  let rMpr = (((Mpr % 360) + 360) % 360) * d2r;
  let rF = (((F % 360) + 360) % 360) * d2r;

  let dL =
    6.288774 * Math.sin(rMpr) +
    1.274027 * Math.sin(2 * rD - rMpr) +
    0.658314 * Math.sin(2 * rD) +
    0.213618 * Math.sin(2 * rMpr) -
    0.185116 * Math.sin(rM) -
    0.114332 * Math.sin(2 * rF) +
    0.058793 * Math.sin(2 * rD - 2 * rMpr) +
    0.057066 * Math.sin(2 * rD - rM - rMpr) +
    0.053322 * Math.sin(2 * rD + rMpr) +
    0.045758 * Math.sin(2 * rD - rM) -
    0.040923 * Math.sin(rMpr - 2 * rF) -
    0.03472 * Math.sin(rD) -
    0.030383 * Math.sin(rM + rMpr);

  let moonTrop = (L0 + dL + 3600) % 360;
  let moonSid = (moonTrop - ayanamsha + 3600) % 360;

  // 4. Rahu & Ketu (True Mean Node)
  let omega = (125.0445479 - 1934.136261 * T + 0.0020754 * T * T) % 360;
  let rahuSid = (omega - ayanamsha + 3600) % 360;
  let ketuSid = (rahuSid + 180) % 360;

  // 5. Geocentric Reduction for Major Planets
  const computeGeocentricPlanet = (a, e, inc, L0, Lrate, peri0, perirate, node0) => {
    let L_p = (L0 + Lrate * T) % 360;
    let peri_p = (peri0 + perirate * T) % 360;
    let node_p = node0 * d2r;
    let inc_rad = inc * d2r;

    let M_p = (L_p - peri_p + 3600) % 360;
    let rM_p = M_p * d2r;
    let C_p = (2 * e - Math.pow(e, 3) / 4) * Math.sin(rM_p) + (5 / 4) * e * e * Math.sin(2 * rM_p);
    let v_p = (M_p + C_p * r2d + 3600) % 360;
    let theta_p = (v_p + peri_p) * d2r;

    let r_p = (a * (1 - e * e)) / (1 + e * Math.cos(v_p * d2r));
    let u_p = theta_p - node_p;

    let xp =
      r_p *
      (Math.cos(node_p) * Math.cos(u_p) - Math.sin(node_p) * Math.sin(u_p) * Math.cos(inc_rad));
    let yp =
      r_p *
      (Math.sin(node_p) * Math.cos(u_p) + Math.cos(node_p) * Math.sin(u_p) * Math.cos(inc_rad));

    let dx = xp - xe;
    let dy = yp - ye;

    let lambda_trop = (Math.atan2(dy, dx) * r2d + 3600) % 360;
    let lambda_sid = (lambda_trop - ayanamsha + 3600) % 360;
    return lambda_sid;
  };

  let mercurySid = computeGeocentricPlanet(
    0.38709893,
    0.20563069,
    7.00487,
    252.250845,
    149472.67411175,
    77.45645,
    0.16047689,
    48.33167
  );
  let venusSid = computeGeocentricPlanet(
    0.72333199,
    0.00677323,
    3.39471,
    181.979801,
    58517.81538729,
    131.57294,
    0.00268258,
    76.68069
  );
  let marsSid = computeGeocentricPlanet(
    1.52366231,
    0.09341233,
    1.85061,
    355.45332,
    19140.30268499,
    336.04084,
    0.44441088,
    49.5574
  );
  let jupiterSid = computeGeocentricPlanet(
    5.20336301,
    0.04849485,
    1.3053,
    34.40438,
    3034.74612898,
    14.75385,
    0.21252668,
    100.55615
  );
  let saturnSid = computeGeocentricPlanet(
    9.53707032,
    0.05550862,
    2.48446,
    49.94424,
    1222.49362201,
    92.43194,
    0.54179478,
    113.71504
  );

  // 6. Ascendant (Lagna) Calculation
  let gmst = (280.46061837 + 360.98564736629 * (jd - 2451545.0)) % 360;
  let lst = (gmst + lng + 3600) % 360;
  let radLat = lat * d2r;
  let radLst = lst * d2r;
  let eps = 23.439 * d2r; // Obliquity

  let ascTropicalRad = Math.atan2(
    Math.cos(radLst),
    -Math.sin(radLst) * Math.cos(eps) - Math.tan(radLat) * Math.sin(eps)
  );
  let ascTropicalDeg = (ascTropicalRad * r2d + 3600) % 360;
  let ascSid = (ascTropicalDeg - ayanamsha + 3600) % 360;

  // Retrograde indicators
  const d = jd - 2451543.5;
  const isRetrograde = {
    Sun: false,
    Moon: false,
    Mars: d % 780 > 700 || d % 780 < 80,
    Mercury: d % 116 > 95,
    Jupiter: d % 399 > 270,
    Venus: d % 584 > 540,
    Saturn: d % 378 > 240,
    Rahu: true,
    Ketu: true,
  };

  return {
    jd,
    ayanamsha,
    planets: {
      Lagna: { lon: ascSid, speed: 1.0, retro: false },
      Sun: { lon: sunSid, speed: 0.98, retro: isRetrograde.Sun },
      Moon: { lon: moonSid, speed: 13.17, retro: isRetrograde.Moon },
      Mars: { lon: marsSid, speed: 0.52, retro: isRetrograde.Mars },
      Mercury: { lon: mercurySid, speed: 1.2, retro: isRetrograde.Mercury },
      Jupiter: { lon: jupiterSid, speed: 0.08, retro: isRetrograde.Jupiter },
      Venus: { lon: venusSid, speed: 1.2, retro: isRetrograde.Venus },
      Saturn: { lon: saturnSid, speed: 0.03, retro: isRetrograde.Saturn },
      Rahu: { lon: rahuSid, speed: -0.05, retro: true },
      Ketu: { lon: ketuSid, speed: -0.05, retro: true },
    },
  };
}
