// Krishnamurti Paddhati (KP Astrology) Engine - Sub-Lords & Significators

import { RASHIS, NAKSHATRAS } from './kundli.js';

// Vimshottari Dasha Lord sequence & years for Sub-Lord calculation
const DASHA_LORDS = [
  { lord: 'Ketu', years: 7 },
  { lord: 'Venus', years: 20 },
  { lord: 'Sun', years: 6 },
  { lord: 'Moon', years: 10 },
  { lord: 'Mars', years: 7 },
  { lord: 'Rahu', years: 18 },
  { lord: 'Jupiter', years: 16 },
  { lord: 'Saturn', years: 19 },
  { lord: 'Mercury', years: 17 },
];

const TOTAL_YEARS = 120;
const NAKSHATRA_SPAN = 360 / 27; // 13° 20' = 13.333333°

// Calculate KP Sign Lord, Star Lord, and Sub Lord for any longitude
export function getKpLords(longitude) {
  const normLon = ((longitude % 360) + 360) % 360;

  // 1. Sign Lord
  const signIdx = Math.floor(normLon / 30) % 12;
  const signLord = RASHIS[signIdx].lord;

  // 2. Star Lord (Nakshatra Lord)
  const nakIdx = Math.floor(normLon / NAKSHATRA_SPAN);
  const nak = NAKSHATRAS[nakIdx];
  const starLord = nak.lord;

  // 3. Sub Lord
  // Find position inside the current nakshatra
  const degInNak = normLon % NAKSHATRA_SPAN;

  // Starting lord index in the Vimshottari cycle
  let startLordIdx = DASHA_LORDS.findIndex((d) => d.lord === starLord);
  if (startLordIdx === -1) startLordIdx = 0;

  let cumulativeDeg = 0;
  let subLord = starLord;

  for (let i = 0; i < 9; i++) {
    const currentLord = DASHA_LORDS[(startLordIdx + i) % 9];
    const subSpan = (currentLord.years / TOTAL_YEARS) * NAKSHATRA_SPAN;

    if (degInNak >= cumulativeDeg && degInNak < cumulativeDeg + subSpan + 0.000001) {
      subLord = currentLord.lord;
      break;
    }
    cumulativeDeg += subSpan;
  }

  return {
    sign: RASHIS[signIdx].id,
    signLord,
    nakshatra: nak.name,
    starLord,
    subLord,
  };
}

// Compute KP Cusps and 4-Level Planetary Significators (Levels A, B, C, D)
export function calculateKpSystem(kundliData) {
  const planets = kundliData.planets;
  const lagnaLon = planets.Lagna.lon;

  // 12 House Cusps (Placidus / Equal Cusp approximation starting from Lagna)
  const cusps = Array.from({ length: 12 }, (_, i) => {
    const cuspLon = (lagnaLon + i * 30) % 360;
    const kpInfo = getKpLords(cuspLon);
    return {
      houseNum: i + 1,
      degree: cuspLon,
      ...kpInfo,
    };
  });

  // Planetary KP Status
  const planetKp = {};
  const majorPlanetKeys = [
    'Sun',
    'Moon',
    'Mars',
    'Mercury',
    'Jupiter',
    'Venus',
    'Saturn',
    'Rahu',
    'Ketu',
  ];

  majorPlanetKeys.forEach((pKey) => {
    const p = planets[pKey];
    if (!p) return;
    const kpInfo = getKpLords(p.lon);

    // Star Lord's house and Planet's house
    const starLordPlanet = planets[kpInfo.starLord];
    const starLordHouse = starLordPlanet ? starLordPlanet.houseNum : 1;

    planetKp[pKey] = {
      name: pKey,
      lon: p.lon,
      houseNum: p.houseNum,
      sign: kpInfo.sign,
      signLord: kpInfo.signLord,
      nakshatra: kpInfo.nakshatra,
      starLord: kpInfo.starLord,
      subLord: kpInfo.subLord,
      // 4 Levels of Signification
      significations: {
        levelA: `House ${starLordHouse} (Star Lord's House)`,
        levelB: `House ${p.houseNum} (Occupied House)`,
        levelC: `Lord of ${p.rashi.id}`,
        levelD: `Star Lord of ${kpInfo.starLord}`,
      },
    };
  });

  return {
    cusps,
    planetKp,
  };
}
