// Core Vedic Kundli Chart Engine with High-Precision Astrological Deductions

export const RASHIS = [
  { id: 'Aries', key: 'Aries', lord: 'Mars', element: 'Fire', symbol: '♈' },
  { id: 'Taurus', key: 'Taurus', lord: 'Venus', element: 'Earth', symbol: '♉' },
  { id: 'Gemini', key: 'Gemini', lord: 'Mercury', element: 'Air', symbol: '♊' },
  { id: 'Cancer', key: 'Cancer', lord: 'Moon', element: 'Water', symbol: '♋' },
  { id: 'Leo', key: 'Leo', lord: 'Sun', element: 'Fire', symbol: '♌' },
  { id: 'Virgo', key: 'Virgo', lord: 'Mercury', element: 'Earth', symbol: '♍' },
  { id: 'Libra', key: 'Libra', lord: 'Venus', element: 'Air', symbol: '♎' },
  { id: 'Scorpio', key: 'Scorpio', lord: 'Mars', element: 'Water', symbol: '♏' },
  { id: 'Sagittarius', key: 'Sagittarius', lord: 'Jupiter', element: 'Fire', symbol: '♐' },
  { id: 'Capricorn', key: 'Capricorn', lord: 'Saturn', element: 'Earth', symbol: '♑' },
  { id: 'Aquarius', key: 'Aquarius', lord: 'Saturn', element: 'Air', symbol: '♒' },
  { id: 'Pisces', key: 'Pisces', lord: 'Jupiter', element: 'Water', symbol: '♓' },
];

export const NAKSHATRAS = [
  { name: 'Ashwini', lord: 'Ketu', gana: 'Deva', yoni: 'Horse', nadi: 'Adi', varna: 'Kshatriya' },
  {
    name: 'Bharani',
    lord: 'Venus',
    gana: 'Manushya',
    yoni: 'Elephant',
    nadi: 'Madhya',
    varna: 'Kshatriya',
  },
  {
    name: 'Krittika',
    lord: 'Sun',
    gana: 'Rakshasa',
    yoni: 'Goat',
    nadi: 'Antya',
    varna: 'Brahmin',
  },
  {
    name: 'Rohini',
    lord: 'Moon',
    gana: 'Manushya',
    yoni: 'Serpent',
    nadi: 'Antya',
    varna: 'Shudra',
  },
  {
    name: 'Mrigashira',
    lord: 'Mars',
    gana: 'Deva',
    yoni: 'Serpent',
    nadi: 'Madhya',
    varna: 'Farmer',
  },
  { name: 'Ardra', lord: 'Rahu', gana: 'Manushya', yoni: 'Dog', nadi: 'Adi', varna: 'Farmer' },
  { name: 'Punarvasu', lord: 'Jupiter', gana: 'Deva', yoni: 'Cat', nadi: 'Adi', varna: 'Vaishya' },
  {
    name: 'Pushya',
    lord: 'Saturn',
    gana: 'Deva',
    yoni: 'Goat',
    nadi: 'Madhya',
    varna: 'Kshatriya',
  },
  {
    name: 'Ashlesha',
    lord: 'Mercury',
    gana: 'Rakshasa',
    yoni: 'Cat',
    nadi: 'Antya',
    varna: 'Merchant',
  },
  { name: 'Magha', lord: 'Ketu', gana: 'Rakshasa', yoni: 'Rat', nadi: 'Antya', varna: 'Shudra' },
  {
    name: 'Purva Phalguni',
    lord: 'Venus',
    gana: 'Manushya',
    yoni: 'Rat',
    nadi: 'Madhya',
    varna: 'Brahmin',
  },
  {
    name: 'Uttara Phalguni',
    lord: 'Sun',
    gana: 'Manushya',
    yoni: 'Bull',
    nadi: 'Adi',
    varna: 'Kshatriya',
  },
  { name: 'Hasta', lord: 'Moon', gana: 'Deva', yoni: 'Buffalo', nadi: 'Adi', varna: 'Vaishya' },
  {
    name: 'Chitra',
    lord: 'Mars',
    gana: 'Rakshasa',
    yoni: 'Tiger',
    nadi: 'Madhya',
    varna: 'Farmer',
  },
  { name: 'Swati', lord: 'Rahu', gana: 'Deva', yoni: 'Buffalo', nadi: 'Antya', varna: 'Merchant' },
  {
    name: 'Vishakha',
    lord: 'Jupiter',
    gana: 'Rakshasa',
    yoni: 'Tiger',
    nadi: 'Antya',
    varna: 'Brahmin',
  },
  { name: 'Anuradha', lord: 'Saturn', gana: 'Deva', yoni: 'Deer', nadi: 'Madhya', varna: 'Shudra' },
  {
    name: 'Jyeshtha',
    lord: 'Mercury',
    gana: 'Rakshasa',
    yoni: 'Deer',
    nadi: 'Adi',
    varna: 'Farmer',
  },
  { name: 'Mula', lord: 'Ketu', gana: 'Rakshasa', yoni: 'Dog', nadi: 'Adi', varna: 'Kshatriya' },
  {
    name: 'Purva Ashadha',
    lord: 'Venus',
    gana: 'Manushya',
    yoni: 'Monkey',
    nadi: 'Madhya',
    varna: 'Brahmin',
  },
  {
    name: 'Uttara Ashadha',
    lord: 'Sun',
    gana: 'Manushya',
    yoni: 'Mongoose',
    nadi: 'Antya',
    varna: 'Kshatriya',
  },
  { name: 'Shravana', lord: 'Moon', gana: 'Deva', yoni: 'Monkey', nadi: 'Antya', varna: 'Shudra' },
  {
    name: 'Dhanishta',
    lord: 'Mars',
    gana: 'Rakshasa',
    yoni: 'Lion',
    nadi: 'Madhya',
    varna: 'Farmer',
  },
  {
    name: 'Shatabhisha',
    lord: 'Rahu',
    gana: 'Rakshasa',
    yoni: 'Horse',
    nadi: 'Adi',
    varna: 'Merchant',
  },
  {
    name: 'Purva Bhadrapada',
    lord: 'Jupiter',
    gana: 'Manushya',
    yoni: 'Lion',
    nadi: 'Adi',
    varna: 'Brahmin',
  },
  {
    name: 'Uttara Bhadrapada',
    lord: 'Saturn',
    gana: 'Manushya',
    yoni: 'Cow',
    nadi: 'Madhya',
    varna: 'Kshatriya',
  },
  {
    name: 'Revati',
    lord: 'Mercury',
    gana: 'Deva',
    yoni: 'Elephant',
    nadi: 'Antya',
    varna: 'Shudra',
  },
];

export const TITHIS = [
  'Pratipada',
  'Dwitiya',
  'Tritiya',
  'Chaturthi',
  'Panchami',
  'Shashthi',
  'Saptami',
  'Ashtami',
  'Navami',
  'Dashami',
  'Ekadashi',
  'Dwadashi',
  'Trayodashi',
  'Chaturdashi',
  'Purnima / Amavasya',
];

export const VAARS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const HOUSE_SIGNIFICANCE = [
  {
    num: 1,
    name: 'Tanu Bhava',
    meaning: {
      en: 'Self, Physique, Vitality',
      hi: 'शरीर, स्वभाव, स्वास्थ्य',
      gu: 'શરીર, વ્યક્તિત્વ, સ્વાસ્થ્ય',
    },
  },
  {
    num: 2,
    name: 'Dhana Bhava',
    meaning: { en: 'Wealth, Family, Speech', hi: 'धन, कुटुंब, वाणी', gu: 'ધન, કુટુંબ, વાણી' },
  },
  {
    num: 3,
    name: 'Sahaja Bhava',
    meaning: {
      en: 'Courage, Siblings, Efforts',
      hi: 'पराक्रम, भाई-बहन, साहस',
      gu: 'પરાક્રમ, ભાઈ-બહેન, સાહસ',
    },
  },
  {
    num: 4,
    name: 'Sukha Bhava',
    meaning: {
      en: 'Mother, Home, Happiness',
      hi: 'माता, गृह, सुख, वाहन',
      gu: 'માતા, ઘર, સુખ, વાહન',
    },
  },
  {
    num: 5,
    name: 'Putra Bhava',
    meaning: {
      en: 'Intelligence, Offspring, Creativity',
      hi: 'संतान, बुद्धि, विद्या',
      gu: 'સંતાન, બુદ્ધિ, વિદ્યા',
    },
  },
  {
    num: 6,
    name: 'Ripu Bhava',
    meaning: {
      en: 'Health, Enemies, Debts',
      hi: 'रोग, ऋण, शत्रु, प्रतिस्पर्धा',
      gu: 'રોગ, ઋણ, શત્રુ, હરિફાઈ',
    },
  },
  {
    num: 7,
    name: 'Kalatra Bhava',
    meaning: {
      en: 'Spouse, Marriage, Partnership',
      hi: 'विवाह, जीवनसाथी, साझेदारी',
      gu: 'લગ્ન, જીવનસાથી, ભાગીદારી',
    },
  },
  {
    num: 8,
    name: 'Ayu Bhava',
    meaning: {
      en: 'Longevity, Occult, Sudden Events',
      hi: 'आयु, गूढ़ रहस्य, परिवर्तन',
      gu: 'આયુષ્ય, ગૂઢ રહસ્ય, પરિવર્તન',
    },
  },
  {
    num: 9,
    name: 'Bhagya Bhava',
    meaning: {
      en: 'Fortune, Dharma, Higher Wisdom',
      hi: 'भाग्य, धर्म, तीर्थयात्रा',
      gu: 'ભાગ્ય, ધર્મ, ગુરુ',
    },
  },
  {
    num: 10,
    name: 'Karma Bhava',
    meaning: {
      en: 'Career, Status, Authority',
      hi: 'व्यवसाय, पद-प्रतिष्ठा, कर्म',
      gu: 'કારકિર્દી, પદ-પ્રતિષ્ઠા, કર્મ',
    },
  },
  {
    num: 11,
    name: 'Labha Bhava',
    meaning: { en: 'Gains, Aspirations, Income', hi: 'आय, लाभ, मित्र', gu: 'આવક, લાભ, મિત્રો' },
  },
  {
    num: 12,
    name: 'Vyaya Bhava',
    meaning: {
      en: 'Expenditure, Foreign, Moksha',
      hi: 'व्यय, विदेश गमन, मोक्ष',
      gu: 'ખર્ચ, વિદેશ, મોક્ષ',
    },
  },
];

export function getNakshatraInfo(lon) {
  let normalized = ((lon % 360) + 360) % 360;
  let nakDeg = 360 / 27; // 13.3333 degrees
  let index = Math.floor(normalized / nakDeg);
  let rem = normalized % nakDeg;
  let padaDeg = nakDeg / 4; // 3.3333 degrees
  let pada = Math.floor(rem / padaDeg) + 1;
  return {
    ...NAKSHATRAS[index],
    index,
    pada,
    degreeInNakshatra: rem,
  };
}

export function getNavamshaSignIndex(lon) {
  let normalized = ((lon % 360) + 360) % 360;
  let totalNavamshas = Math.floor(normalized / (30 / 9)); // Each Navamsha is 3° 20'
  return totalNavamshas % 12;
}

// Classical Planetary Dignity & Relationship Matrix
const SIGN_LORDS = {
  Aries: 'Mars',
  Taurus: 'Venus',
  Gemini: 'Mercury',
  Cancer: 'Moon',
  Leo: 'Sun',
  Virgo: 'Mercury',
  Libra: 'Venus',
  Scorpio: 'Mars',
  Sagittarius: 'Jupiter',
  Capricorn: 'Saturn',
  Aquarius: 'Saturn',
  Pisces: 'Jupiter',
};

const NATURAL_RELATIONSHIPS = {
  Sun: {
    friends: ['Moon', 'Mars', 'Jupiter'],
    neutral: ['Mercury'],
    enemies: ['Venus', 'Saturn', 'Rahu', 'Ketu'],
  },
  Moon: {
    friends: ['Sun', 'Mercury'],
    neutral: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
    enemies: ['Rahu', 'Ketu'],
  },
  Mars: {
    friends: ['Sun', 'Moon', 'Jupiter'],
    neutral: ['Venus', 'Saturn'],
    enemies: ['Mercury', 'Rahu'],
  },
  Mercury: {
    friends: ['Sun', 'Venus'],
    neutral: ['Mars', 'Jupiter', 'Saturn'],
    enemies: ['Moon'],
  },
  Jupiter: {
    friends: ['Sun', 'Moon', 'Mars'],
    neutral: ['Saturn'],
    enemies: ['Mercury', 'Venus'],
  },
  Venus: {
    friends: ['Mercury', 'Saturn', 'Rahu', 'Ketu'],
    neutral: ['Mars', 'Jupiter'],
    enemies: ['Sun', 'Moon'],
  },
  Saturn: {
    friends: ['Mercury', 'Venus', 'Rahu'],
    neutral: ['Jupiter'],
    enemies: ['Sun', 'Moon', 'Mars'],
  },
  Rahu: {
    friends: ['Mercury', 'Venus', 'Saturn'],
    neutral: ['Jupiter'],
    enemies: ['Sun', 'Moon', 'Mars'],
  },
  Ketu: {
    friends: ['Mars', 'Venus', 'Saturn'],
    neutral: ['Mercury', 'Jupiter'],
    enemies: ['Sun', 'Moon'],
  },
};

// Classical Planetary Dignity Check
export function getPlanetaryDignity(pName, signId, sunLon, pLon) {
  if (pName === 'Lagna') return 'Neutral (Sama)';

  const exaltation = {
    Sun: 'Aries',
    Moon: 'Taurus',
    Mars: 'Capricorn',
    Mercury: 'Virgo',
    Jupiter: 'Cancer',
    Venus: 'Pisces',
    Saturn: 'Libra',
    Rahu: 'Taurus',
    Ketu: 'Scorpio',
  };

  const debilitation = {
    Sun: 'Libra',
    Moon: 'Scorpio',
    Mars: 'Cancer',
    Mercury: 'Pisces',
    Jupiter: 'Capricorn',
    Venus: 'Virgo',
    Saturn: 'Aries',
    Rahu: 'Scorpio',
    Ketu: 'Taurus',
  };

  const ownSigns = {
    Sun: ['Leo'],
    Moon: ['Cancer'],
    Mars: ['Aries', 'Scorpio'],
    Mercury: ['Gemini', 'Virgo'],
    Jupiter: ['Sagittarius', 'Pisces'],
    Venus: ['Taurus', 'Libra'],
    Saturn: ['Capricorn', 'Aquarius'],
    Rahu: ['Aquarius'],
    Ketu: ['Scorpio'],
  };

  // Combustion (Asta) check
  if (pName !== 'Sun' && pName !== 'Rahu' && pName !== 'Ketu') {
    let diffFromSun = Math.abs((pLon - sunLon + 360) % 360);
    if (diffFromSun > 180) diffFromSun = 360 - diffFromSun;
    const combustionLimits = {
      Moon: 12,
      Mars: 17,
      Mercury: 14,
      Jupiter: 11,
      Venus: 10,
      Saturn: 15,
    };
    if (diffFromSun <= (combustionLimits[pName] || 12)) {
      return 'Combust (Asta)';
    }
  }

  if (exaltation[pName] === signId) return 'Exalted (Ucha)';
  if (debilitation[pName] === signId) return 'Debilitated (Nicha)';
  if (ownSigns[pName] && ownSigns[pName].includes(signId)) return 'Own House (Swakshetra)';

  const signLord = SIGN_LORDS[signId];
  if (signLord && NATURAL_RELATIONSHIPS[pName]) {
    if (NATURAL_RELATIONSHIPS[pName].friends.includes(signLord)) {
      return 'Friendly (Mitra)';
    }
    if (NATURAL_RELATIONSHIPS[pName].enemies.includes(signLord)) {
      return 'Enemy (Shatru)';
    }
  }

  return 'Neutral (Sama)';
}

// Build full birth chart structure with D1, D9, Chandra, and Surya charts
export function getFullKundli(astroData, year, month, day, hour, minute) {
  const planetsData = astroData.planets;
  const lagnaLon = planetsData.Lagna.lon;
  const lagnaSignIndex = Math.floor((((lagnaLon % 360) + 360) % 360) / 30) % 12;

  const sunLon = planetsData.Sun.lon;
  const sunSignIdx = Math.floor((((sunLon % 360) + 360) % 360) / 30) % 12;

  const moonLon = planetsData.Moon.lon;
  const moonSignIdx = Math.floor((((moonLon % 360) + 360) % 360) / 30) % 12;
  const moonNak = getNakshatraInfo(moonLon);

  // Map house numbers for D1 (Lagna Chart)
  let d1Houses = Array.from({ length: 12 }, (_, i) => {
    let signIdx = (lagnaSignIndex + i) % 12;
    return {
      houseNum: i + 1,
      rashiIndex: signIdx,
      rashi: RASHIS[signIdx],
      significance: HOUSE_SIGNIFICANCE[i],
      planets: [],
    };
  });

  // Navamsha (D9) Lagna
  let d9LagnaSignIndex = getNavamshaSignIndex(lagnaLon) % 12;
  let d9Houses = Array.from({ length: 12 }, (_, i) => {
    let signIdx = (d9LagnaSignIndex + i) % 12;
    return {
      houseNum: i + 1,
      rashiIndex: signIdx,
      rashi: RASHIS[signIdx],
      significance: HOUSE_SIGNIFICANCE[i],
      planets: [],
    };
  });

  // Chandra Kundli (Moon Chart)
  let chandraHouses = Array.from({ length: 12 }, (_, i) => {
    let signIdx = (moonSignIdx + i) % 12;
    return {
      houseNum: i + 1,
      rashiIndex: signIdx,
      rashi: RASHIS[signIdx],
      significance: HOUSE_SIGNIFICANCE[i],
      planets: [],
    };
  });

  // Surya Kundli (Sun Chart)
  let suryaHouses = Array.from({ length: 12 }, (_, i) => {
    let signIdx = (sunSignIdx + i) % 12;
    return {
      houseNum: i + 1,
      rashiIndex: signIdx,
      rashi: RASHIS[signIdx],
      significance: HOUSE_SIGNIFICANCE[i],
      planets: [],
    };
  });

  // Process all planets
  let processedPlanets = {};
  Object.keys(planetsData).forEach((key) => {
    let p = planetsData[key];
    let signIdx = Math.floor((((p.lon % 360) + 360) % 360) / 30) % 12;
    let houseNum = ((((signIdx - lagnaSignIndex) % 12) + 12) % 12) + 1;
    let chandraHouseNum = ((((signIdx - moonSignIdx) % 12) + 12) % 12) + 1;
    let suryaHouseNum = ((((signIdx - sunSignIdx) % 12) + 12) % 12) + 1;

    let nakInfo = getNakshatraInfo(p.lon);
    let navSignIdx = getNavamshaSignIndex(p.lon) % 12;
    let navHouseNum = ((((navSignIdx - d9LagnaSignIndex) % 12) + 12) % 12) + 1;

    let dignity = getPlanetaryDignity(key, RASHIS[signIdx].id, sunLon, p.lon);

    let pObj = {
      name: key,
      lon: ((p.lon % 360) + 360) % 360,
      signIndex: signIdx,
      rashi: RASHIS[signIdx],
      houseNum,
      navHouseNum,
      navSignIndex: navSignIdx,
      navRashi: RASHIS[navSignIdx],
      chandraHouseNum,
      suryaHouseNum,
      nakshatra: nakInfo.name,
      nakshatraLord: nakInfo.lord,
      pada: nakInfo.pada,
      retro: p.retro,
      deg: p.lon % 30,
      dignity,
    };

    processedPlanets[key] = pObj;

    // Push into chart house structures
    d1Houses[houseNum - 1].planets.push(pObj);
    d9Houses[navHouseNum - 1].planets.push(pObj);
    chandraHouses[chandraHouseNum - 1].planets.push(pObj);
    suryaHouses[suryaHouseNum - 1].planets.push(pObj);
  });

  // Panchang calculations
  let dateObj = new Date(year, month - 1, day);
  let dayOfWeek = dateObj.getDay();
  let tithiDiff = (moonLon - sunLon + 360) % 360;
  let tithiIdx = Math.floor(tithiDiff / 12) % 15;

  return {
    jd: astroData.jd,
    ayanamsha: astroData.ayanamsha,
    astro: astroData,
    lagnaSignIndex,
    d1Houses,
    d9Houses,
    chandraHouses,
    suryaHouses,
    planets: processedPlanets,
    panchang: {
      tithi: TITHIS[tithiIdx],
      vaar: VAARS[dayOfWeek],
      nakshatra: moonNak.name,
      nakshatraLord: moonNak.lord,
      pada: moonNak.pada,
      gana: moonNak.gana,
      yoni: moonNak.yoni,
      nadi: moonNak.nadi,
      varna: moonNak.varna,
      sunSign: RASHIS[sunSignIdx].id,
      moonSign: RASHIS[moonSignIdx].id,
      ascendant: RASHIS[lagnaSignIndex].id,
    },
  };
}
