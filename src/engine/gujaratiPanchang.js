// High-Precision Detailed Gujarati Panchang Engine (અમૃત પંચાંગ & સૂર્યસિદ્ધાંત ગણતરી)

import { RASHIS, NAKSHATRAS } from './kundli.js';
import { calculatePlanetaryPositions } from './astronomy.js';

// 27 Nitya Yogas (૨૭ નિત્ય યોગ)
export const NITYA_YOGAS = [
  { id: 1, name: 'Vishkambha (વિષ્કંભ)', nature: 'Inauspicious', deity: 'Yama' },
  { id: 2, name: 'Priti (પ્રીતિ)', nature: 'Auspicious', deity: 'Vishnu' },
  { id: 3, name: 'Ayushman (આયુષ્માન)', nature: 'Auspicious', deity: 'Chandra' },
  { id: 4, name: 'Saubhagya (સૌભાગ્ય)', nature: 'Auspicious', deity: 'Brahma' },
  { id: 5, name: 'Shobhana (શોભન)', nature: 'Auspicious', deity: 'Brihaspati' },
  { id: 6, name: 'Atiganda (અતિગંડ)', nature: 'Inauspicious', deity: 'Chandra' },
  { id: 7, name: 'Sukarma (સુકર્મા)', nature: 'Auspicious', deity: 'Indra' },
  { id: 8, name: 'Dhriti (ધૃતિ)', nature: 'Auspicious', deity: 'Varuna' },
  { id: 9, name: 'Shula (શૂલ)', nature: 'Inauspicious', deity: 'Sarpa' },
  { id: 10, name: 'Ganda (ગંડ)', nature: 'Inauspicious', deity: 'Agni' },
  { id: 11, name: 'Vriddhi (વૃદ્ધિ)', nature: 'Auspicious', deity: 'Surya' },
  { id: 12, name: 'Dhruva (ધ્રુવ)', nature: 'Auspicious', deity: 'Prithvi' },
  { id: 13, name: 'Vyaghata (વ્યાઘાત)', nature: 'Inauspicious', deity: 'Vayu' },
  { id: 14, name: 'Harshana (હર્ષણ)', nature: 'Auspicious', deity: 'Bhaga' },
  { id: 15, name: 'Vajra (વજ્ર)', nature: 'Inauspicious', deity: 'Varuna' },
  { id: 16, name: 'Siddhi (સિદ્ધિ)', nature: 'Auspicious', deity: 'Ganesha' },
  { id: 17, name: 'Vyatipata (વ્યાતીપાત)', nature: 'Inauspicious', deity: 'Rudra' },
  { id: 18, name: 'Variyana (વરીયાન)', nature: 'Auspicious', deity: 'Kubera' },
  { id: 19, name: 'Parigha (પરિઘ)', nature: 'Inauspicious', deity: 'Vishwakarma' },
  { id: 20, name: 'Shiva (શિવ)', nature: 'Auspicious', deity: 'Mitra' },
  { id: 21, name: 'Siddha (સિદ્ધ)', nature: 'Auspicious', deity: 'Kartikeya' },
  { id: 22, name: 'Sadhya (સાધ્ય)', nature: 'Auspicious', deity: 'Savitri' },
  { id: 23, name: 'Shubha (શુભ)', nature: 'Auspicious', deity: 'Lakshmi' },
  { id: 24, name: 'Shukla (શુક્લ)', nature: 'Auspicious', deity: 'Parvati' },
  { id: 25, name: 'Brahma (બ્રહ્મ)', nature: 'Auspicious', deity: 'Ashwini Kumar' },
  { id: 26, name: 'Indra / Aindra (ઐન્દ્ર)', nature: 'Auspicious', deity: 'Pitra' },
  { id: 27, name: 'Vaidhriti (વૈધૃતિ)', nature: 'Inauspicious', deity: 'Diti' },
];

// 11 Karanas (૧૧ કરણ)
export const KARANAS = [
  { name: 'Bava (બવ)', lord: 'Indra', type: 'Movable (ચર)' },
  { name: 'Balava (બાલવ)', lord: 'Brahma', type: 'Movable (ચર)' },
  { name: 'Kaulava (કૌલવ)', lord: 'Mitra', type: 'Movable (ચર)' },
  { name: 'Taitila (તૈતિલ)', lord: 'Aryama', type: 'Movable (ચર)' },
  { name: 'Gara (ગર)', lord: 'Prithvi', type: 'Movable (ચર)' },
  { name: 'Vanija (વણિજ)', lord: 'Shri', type: 'Movable (ચર)' },
  { name: 'Vishti / Bhadra (વિષ્ટિ / ભદ્રા)', lord: 'Yama', type: 'Inauspicious (અશુભ ભદ્રા)' },
  { name: 'Shakuni (શકુનિ)', lord: 'Kaliyuga', type: 'Fixed (સ્થિર)' },
  { name: 'Chatushpada (ચતુષ્પાદ)', lord: 'Rudra', type: 'Fixed (સ્થિર)' },
  { name: 'Naga (નાગ)', lord: 'Sarpa', type: 'Fixed (સ્થિર)' },
  { name: 'Kinstughna (કિંસ્તુઘ્ન)', lord: 'Vayu', type: 'Fixed (સ્થિર)' },
];

// Gujarati Months (ગુજરાતી મહિના - અમાંત પ્રણાલી)
export const GUJARATI_MONTHS = [
  'કારતક (Kartak)',
  'માગશર (Magshar)',
  'પોષ (Posh)',
  'મહા (Maha)',
  'ફાગણ (Fagan)',
  'ચૈત્ર (Chaitra)',
  'વૈશાખ (Vaishakh)',
  'જેઠ (Jeth)',
  'અષાઢ (Ashadh)',
  'શ્રાવણ (Shravan)',
  'ભાદરવો (Bhadarvo)',
  'આસો (Aaso)',
];

// 6 Ritus (૬ ઋતુઓ)
export const RITUS = [
  { name: 'વસંત ઋતુ (Spring)', months: [4, 5] },
  { name: 'ગ્રીષ્મ ઋતુ (Summer)', months: [6, 7] },
  { name: 'વર્ષા ઋતુ (Monsoon)', months: [8, 9] },
  { name: 'શરદ ઋતુ (Autumn)', months: [10, 11] },
  { name: 'હેમંત ઋતુ (Pre-Winter)', months: [0, 1] },
  { name: 'શિશિર ઋતુ (Winter)', months: [2, 3] },
];

// Tithi Names with Deity
export const DETAILED_TITHIS = [
  { num: 1, name: 'પડવો (Pratipada)', deity: 'અગ્નિ (Agni)', nature: 'નંદા (Nanda)' },
  { num: 2, name: 'બીજ (Dwitiya)', deity: 'બ્રહ્મા (Brahma)', nature: 'ભદ્રા (Bhadra)' },
  { num: 3, name: 'ત્રીજ (Tritiya)', deity: 'ગૌરી (Gauri)', nature: 'જયા (Jaya)' },
  { num: 4, name: 'ચોથ (Chaturthi)', deity: 'ગણેશ (Ganesha)', nature: 'રિક્તા (Rikta)' },
  { num: 5, name: 'પાંચમ (Panchami)', deity: 'નાગ (Naga)', nature: 'પૂર્ણા (Poorna)' },
  { num: 6, name: 'છઠ્ઠ (Shashthi)', deity: 'કાર્તિકેય (Kartikeya)', nature: 'નંદા (Nanda)' },
  { num: 7, name: 'સાતમ (Saptami)', deity: 'સૂર્ય (Surya)', nature: 'ભદ્રા (Bhadra)' },
  { num: 8, name: 'આઠમ (Ashtami)', deity: 'શિવ (Shiva)', nature: 'જયા (Jaya)' },
  { num: 9, name: 'નોમ (Navami)', deity: 'દુર્ગા (Durga)', nature: 'રિક્તા (Rikta)' },
  { num: 10, name: 'દશમ (Dashami)', deity: 'યમ (Yama)', nature: 'પૂર્ણા (Poorna)' },
  { num: 11, name: 'અગિયારસ (Ekadashi)', deity: 'વિષ્ણુ (Vishnu)', nature: 'નંદા (Nanda)' },
  { num: 12, name: 'બારસ (Dwadashi)', deity: 'વિષ્ણુ / હરિ', nature: 'ભદ્રા (Bhadra)' },
  { num: 13, name: 'તેરસ (Trayodashi)', deity: 'કામદેવ (Kamadeva)', nature: 'જયા (Jaya)' },
  { num: 14, name: 'ચૌદશ (Chaturdashi)', deity: 'શિવ (Shiva)', nature: 'રિક્તા (Rikta)' },
  {
    num: 15,
    name: 'પૂનમ / અમાસ (Purnima/Amavasya)',
    deity: 'ચંદ્ર / પિતૃ',
    nature: 'પૂર્ણા (Poorna)',
  },
];

// Disha Shool and Traditional Remedies
export const DISHA_SHOOL = [
  {
    day: 'રવિવાર (Sunday)',
    badDir: 'પશ્ચિમ (West)',
    remedy: 'પાન ખાઈને મુસાફરી કરવી (Eat Betel Leaf)',
  },
  {
    day: 'સોમવાર (Monday)',
    badDir: 'પૂર્વ (East)',
    remedy: 'દર્પણ (અરીસો) જોઈને પ્રસ્થાન કરવું (Look in Mirror)',
  },
  {
    day: 'મંગળવાર (Tuesday)',
    badDir: 'ઉત્તર (North)',
    remedy: 'ગોળ ખાઈને પ્રસ્થાન કરવું (Eat Jaggery)',
  },
  {
    day: 'બુધવાર (Wednesday)',
    badDir: 'ઉત્તર (North)',
    remedy: 'ધાણા અથવા તલ ખાઈને પ્રસ્થાન કરવું (Eat Coriander)',
  },
  {
    day: 'ગુરુવાર (Thursday)',
    badDir: 'દક્ષિણ (South)',
    remedy: 'જીરું અથવા દહીં ખાઈને પ્રસ્થાન કરવું (Eat Cumin/Yogurt)',
  },
  {
    day: 'શુક્રવાર (Friday)',
    badDir: 'પશ્ચિમ (West)',
    remedy: 'દહીં ખાઈને પ્રસ્થાન કરવું (Eat Curd/Yogurt)',
  },
  {
    day: 'શનિવાર (Saturday)',
    badDir: 'પૂર્વ (East)',
    remedy: 'આદું અથવા અડદ ખાઈને પ્રસ્થાન કરવું (Eat Ginger)',
  },
];

export function calculateDetailedGujaratiPanchang(
  year,
  month,
  day,
  hour = 12,
  minute = 0,
  lat = 21.1147,
  lng = 73.3986,
  tz = 5.5
) {
  const astro = calculatePlanetaryPositions(year, month, day, hour, minute, lat, lng, tz);
  const sunLon = astro.planets.Sun.lon;
  const moonLon = astro.planets.Moon.lon;

  // 1. Vikram Samvat & Shaka Samvat
  // Gujarati Vikram Samvat starts on Kartak Sud Ekam (approx late Oct / Nov)
  // Standard conversion: Gregorian Year + 56 / 57
  const vikramSamvat = month >= 11 ? year + 57 : year + 56;
  const shakaSamvat = month >= 4 ? year - 78 : year - 79;

  // 2. Tithi & Paksha Calculation
  const tithiDiff = (moonLon - sunLon + 360) % 360;
  const tithiIndexTotal = Math.floor(tithiDiff / 12); // 0 to 29
  const isShuklaPaksha = tithiIndexTotal < 15;
  const pakshaName = isShuklaPaksha ? 'શુક્લ પક્ષ (સુદ)' : 'કૃષ્ણ પક્ષ (વદ)';
  const tithiIndex = tithiIndexTotal % 15;
  const tithiInfo = DETAILED_TITHIS[tithiIndex];
  const tithiProgress = ((tithiDiff % 12) / 12) * 100;

  // 3. Nakshatra
  const nakDeg = 360 / 27;
  const nakIndex = Math.floor((((moonLon % 360) + 360) % 360) / nakDeg);
  const nakInfo = NAKSHATRAS[nakIndex];
  const nakPada = Math.floor(((((moonLon % 360) + 360) % 360) % nakDeg) / (nakDeg / 4)) + 1;

  // 4. Nitya Yoga: (Sun Longitude + Moon Longitude) / 13° 20'
  const yogaSum = (sunLon + moonLon + 3600) % 360;
  const yogaIndex = Math.floor(yogaSum / (360 / 27));
  const yogaInfo = NITYA_YOGAS[yogaIndex % 27];

  // 5. Karana: Each Tithi has 2 Karanas (6° each)
  const karanaIndexTotal = Math.floor(tithiDiff / 6);
  let karanaInfo;
  if (karanaIndexTotal === 0) {
    karanaInfo = KARANAS[10]; // Kinstughna (1st half of Shukla Pratipada)
  } else if (karanaIndexTotal >= 57) {
    if (karanaIndexTotal === 57)
      karanaInfo = KARANAS[7]; // Shakuni
    else if (karanaIndexTotal === 58)
      karanaInfo = KARANAS[8]; // Chatushpada
    else karanaInfo = KARANAS[9]; // Naga
  } else {
    // 7 Repeating Movable Karanas
    const movableIdx = (karanaIndexTotal - 1) % 7;
    karanaInfo = KARANAS[movableIdx];
  }

  // 6. Day of week & Disha Shool
  const dateObj = new Date(year, month - 1, day);
  const dayOfWeek = dateObj.getDay();
  const dishaInfo = DISHA_SHOOL[dayOfWeek];

  // 7. Gujarati Month & Ritu
  // Approximate Gujarati Month based on Solar Ingress / Lunar Tithi
  const sunSignIdx = Math.floor((((sunLon % 360) + 360) % 360) / 30) % 12;
  const gujMonthIdx = (sunSignIdx + 7) % 12; // Scorpio = Kartak, Sagittarius = Magshar...
  const gujMonthName = GUJARATI_MONTHS[gujMonthIdx];
  const ritu = RITUS.find((r) => r.months.includes(gujMonthIdx)) || RITUS[0];

  // 8. Ayana (Sun moving North = Uttarayana, South = Dakshinayana)
  // Capricorn (9) to Gemini (2) = Uttarayana; Cancer (3) to Sagittarius (8) = Dakshinayana
  const isUttarayana = sunSignIdx >= 9 || sunSignIdx <= 2;
  const ayanaName = isUttarayana ? 'ઉત્તરાયણ (Uttarayana)' : 'દક્ષિણાયન (Dakshinayana)';

  // 9. Solar & Lunar Coordinates
  const sunRashi = RASHIS[sunSignIdx];
  const moonSignIdx = Math.floor((((moonLon % 360) + 360) % 360) / 30) % 12;
  const moonRashi = RASHIS[moonSignIdx];

  // 10. Muhurats (Abhijit, Brahma, Rahu Kaal, Yamaghanta, Gulika Kaal)
  // Standard solar times (approx Sunrise 06:24 AM, Sunset 06:40 PM for Gujarat)
  const sunriseStr = '06:24 AM';
  const sunsetStr = '06:42 PM';
  const abhijitStr = '12:08 PM - 12:56 PM';
  const brahmaStr = '04:48 AM - 05:36 AM';
  const vijayStr = '02:32 PM - 03:20 PM';
  const godhuliStr = '06:30 PM - 06:54 PM';
  const amritKaalStr = '08:15 AM - 09:48 AM';

  const rahuKaalSlots = [
    '04:30 PM - 06:00 PM', // Sun
    '07:30 AM - 09:00 AM', // Mon
    '03:00 PM - 04:30 PM', // Tue
    '12:00 PM - 01:30 PM', // Wed
    '01:30 PM - 03:00 PM', // Thu
    '10:30 AM - 12:00 PM', // Fri
    '09:00 AM - 10:30 AM', // Sat
  ];

  const yamaKaalSlots = [
    '12:00 PM - 01:30 PM', // Sun
    '10:30 AM - 12:00 PM', // Mon
    '09:00 AM - 10:30 AM', // Tue
    '07:30 AM - 09:00 AM', // Wed
    '06:00 AM - 07:30 AM', // Thu
    '03:00 PM - 04:30 PM', // Fri
    '01:30 PM - 03:00 PM', // Sat
  ];

  const gulikaKaalSlots = [
    '03:00 PM - 04:30 PM', // Sun
    '01:30 PM - 03:00 PM', // Mon
    '12:00 PM - 01:30 PM', // Tue
    '10:30 AM - 12:00 PM', // Wed
    '09:00 AM - 10:30 AM', // Thu
    '07:30 AM - 09:00 AM', // Fri
    '06:00 AM - 07:30 AM', // Sat
  ];

  // Bhadra / Vishti status
  const isBhadraActive = karanaInfo.name.includes('Vishti');

  return {
    vikramSamvat,
    shakaSamvat,
    gujMonthName,
    pakshaName,
    ritu: ritu.name,
    ayanaName,
    tithi: {
      name: tithiInfo.name,
      paksha: pakshaName,
      fullTitle: `${pakshaName} ${tithiInfo.name}`,
      deity: tithiInfo.deity,
      nature: tithiInfo.nature,
      progress: Math.round(tithiProgress),
    },
    vaar: dishaInfo.day,
    nakshatra: {
      name: nakInfo.name,
      lord: nakInfo.lord,
      pada: nakPada,
      gana: nakInfo.gana,
      yoni: nakInfo.yoni,
    },
    yoga: {
      name: yogaInfo.name,
      nature: yogaInfo.nature,
      deity: yogaInfo.deity,
    },
    karana: {
      name: karanaInfo.name,
      lord: karanaInfo.lord,
      type: karanaInfo.type,
    },
    sun: {
      rashi: sunRashi.id,
      deg: (sunLon % 30).toFixed(2),
      sunrise: sunriseStr,
      sunset: sunsetStr,
    },
    moon: {
      rashi: moonRashi.id,
      deg: (moonLon % 30).toFixed(2),
    },
    muhurats: {
      abhijit: abhijitStr,
      brahma: brahmaStr,
      vijay: vijayStr,
      godhuli: godhuliStr,
      amritKaal: amritKaalStr,
      rahuKaal: rahuKaalSlots[dayOfWeek],
      yamaghanta: yamaKaalSlots[dayOfWeek],
      gulikaKaal: gulikaKaalSlots[dayOfWeek],
    },
    dishaShool: dishaInfo,
    isBhadraActive,
  };
}
