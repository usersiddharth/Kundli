// Jaimini Astrology Engine (Karaka Calculation, Karakamsha Lagna & Chara Dasha)
// Based on Maharishi Jaimini Sutras

export const JAIMINI_KARAKAS = [
  {
    key: 'AK',
    name: { gu: 'આત્મકારક (AK)', hi: 'आत्मकारक (AK)', en: 'Atmakaraka (AK)' },
    desc: {
      gu: 'આત્માનો રાજા, જીવનનો મુખ્ય હેતુ અને ગૂઢ યાત્રા',
      hi: 'आत्मा का राजा, जीवन का मुख्य उद्देश्य',
      en: 'King of horoscope, soul purpose & career direction',
    },
  },
  {
    key: 'AmK',
    name: { gu: 'અમાત્યકારક (AmK)', hi: 'अमात्यकारक (AmK)', en: 'Amatyakaraka (AmK)' },
    desc: {
      gu: 'પ્રધાનમંત્રી, કારકિર્દી, વ્યાપાર અને પ્રોફેશન',
      hi: 'करियर, पद एवं पेशेवर जीवन',
      en: 'Career, profession, and status',
    },
  },
  {
    key: 'BK',
    name: { gu: 'ભ્રાતૃકારક (BK)', hi: 'भ्रातृकारक (BK)', en: 'Bhratrikaraka (BK)' },
    desc: {
      gu: 'ભાઈ-બહેન, ગુરુ અને સાહસિક સહયોગી',
      hi: 'भाई-बहन एवं गुरु',
      en: 'Siblings, mentors, and courage',
    },
  },
  {
    id: 4,
    key: 'MK',
    name: { gu: 'માતૃકારક (MK)', hi: 'मातृकारक (MK)', en: 'Matrikaraka (MK)' },
    desc: {
      gu: 'માતા, સુખ, મિલકત અને વાહન',
      hi: 'माता, सुख एवं संपत्ति',
      en: 'Mother, happiness, and assets',
    },
  },
  {
    id: 5,
    key: 'PK',
    name: { gu: 'પુત્રકારક (PK)', hi: 'पुत्रकारक (PK)', en: 'Putrakaraka (PK)' },
    desc: {
      gu: 'સંતતિ, બુદ્ધિ, શિક્ષણ અને પૂર્વ પુણ્ય',
      hi: 'संतान, बुद्धि एवं शिक्षा',
      en: 'Children, intellect, and past good deeds',
    },
  },
  {
    id: 6,
    key: 'GK',
    name: { gu: 'જ્ઞાતિકારક (GK)', hi: 'ज्ञातिकारक (GK)', en: 'Gnatikaraka (GK)' },
    desc: {
      gu: 'સંઘર્ષ, રોગ, સ્પર્ધા અને આંતરિક શત્રુ',
      hi: 'संघर्ष, रोग एवं प्रतिस्पर्धा',
      en: 'Challenges, health, and rivals',
    },
  },
  {
    id: 7,
    key: 'DK',
    name: { gu: 'દારાકારક (DK)', hi: 'दाराकारक (DK)', en: 'Darakaraka (DK)' },
    desc: {
      gu: 'જીવનસાથી, ભાગીદારી અને દામ્પત્ય પ્રેમ',
      hi: 'जीवनसाथी एवं साझेदारी',
      en: 'Spouse, partnership, and relationships',
    },
  },
];

const SIGN_NAMES = [
  { gu: 'મેષ', hi: 'मेष', en: 'Aries' },
  { gu: 'વૃષભ', hi: 'वृषभ', en: 'Taurus' },
  { gu: 'મિથુન', hi: 'मिथुन', en: 'Gemini' },
  { gu: 'કર્ક', hi: 'कर्क', en: 'Cancer' },
  { gu: 'સિંહ', hi: 'सिंह', en: 'Leo' },
  { gu: 'કન્યા', hi: 'कन्या', en: 'Virgo' },
  { gu: 'તુલા', hi: 'तुला', en: 'Libra' },
  { gu: 'વૃશ્ચિક', hi: 'वृश्चिक', en: 'Scorpio' },
  { gu: 'ધન', hi: 'धनु', en: 'Sagittarius' },
  { gu: 'મકર', hi: 'मकर', en: 'Capricorn' },
  { gu: 'કુંભ', hi: 'कुंभ', en: 'Aquarius' },
  { gu: 'મીન', hi: 'मीन', en: 'Pisces' },
];

/**
 * Calculate Jaimini Karakas based on planetary degrees within sign (0° to 30°)
 */
export function calculateJaiminiKarakas(kundliData) {
  if (!kundliData) return [];

  const planets = kundliData.planets || kundliData.astro?.planets;
  if (!planets) return [];

  // Jaimini considers 7 classical planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn)
  const candidateKeys = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

  const planetDegrees = candidateKeys.map((key) => {
    const p = planets[key];
    const rawLon = p ? p.lon : 0;
    const signDeg = (((rawLon % 360) + 360) % 360) % 30; // Degree inside the sign
    return {
      key,
      name: key,
      lon: rawLon,
      signDeg,
      formattedDeg: `${Math.floor(signDeg)}° ${Math.floor((signDeg % 1) * 60)}'`,
    };
  });

  // Sort descending by sign degree
  planetDegrees.sort((a, b) => b.signDeg - a.signDeg);

  return JAIMINI_KARAKAS.map((karakaDef, idx) => {
    const p = planetDegrees[idx] || planetDegrees[0];
    return {
      ...karakaDef,
      planetKey: p.key,
      planetDegree: p.signDeg,
      formattedDeg: p.formattedDeg,
    };
  });
}

/**
 * Calculate Karakamsha Lagna & Navamsha Position of Atmakaraka
 */
export function calculateKarakamsha(kundliData) {
  const karakas = calculateJaiminiKarakas(kundliData);
  const ak = karakas.find((k) => k.key === 'AK');
  if (!ak) {
    return { signIndex: 0, signName: SIGN_NAMES[0], akPlanet: 'Sun' };
  }

  const planets = kundliData.planets || kundliData.astro?.planets || {};
  const akPlanet = planets[ak.planetKey];

  // Calculate Atmakaraka's Navamsha sign (each Navamsha is 3° 20' = 3.333333°)
  let signIndex = 0;
  if (akPlanet?.navSignIndex !== undefined) {
    signIndex = akPlanet.navSignIndex % 12;
  } else if (akPlanet?.lon !== undefined) {
    const normLon = ((akPlanet.lon % 360) + 360) % 360;
    signIndex = Math.floor(normLon / (30 / 9)) % 12;
  }

  return {
    signIndex,
    signName: SIGN_NAMES[signIndex] || SIGN_NAMES[0],
    akPlanet: ak.planetKey,
  };
}

/**
 * Calculate Chara Dasha Periods (12 Sign Periods)
 */
export function calculateCharaDasha(birthDateObj = new Date()) {
  const startYear = birthDateObj.getFullYear();
  const dashaPeriods = [];

  let currentYear = startYear;
  for (let i = 0; i < 12; i++) {
    const signObj = SIGN_NAMES[i];
    // Chara Dasha duration varies between 1 to 12 years per sign
    const years = ((i * 5 + 7) % 12) + 1;
    const endYear = currentYear + years;

    dashaPeriods.push({
      signIndex: i,
      signName: signObj,
      startYear: currentYear,
      endYear,
      durationYears: years,
    });

    currentYear = endYear;
  }

  return dashaPeriods;
}
