// High-Precision Gujarati Calendar Engine (ગુજરાતી માસિક કેલેન્ડર અને તહેવાર સૂચિ)

import { calculatePlanetaryPositions } from './astronomy.js';
import { DETAILED_TITHIS, GUJARATI_MONTHS, DISHA_SHOOL } from './gujaratiPanchang.js';
import { RASHIS, NAKSHATRAS } from './kundli.js';

// Major Annual Hindu / Gujarati Festivals Database with Tithi Mapping
export const GUJARATI_FESTIVALS = [
  // Kartak (કારતક)
  {
    monthIdx: 0,
    paksha: 'sud',
    tithi: 1,
    name: {
      gu: 'બેસતું વર્ષ (નૂતન વર્ષાભિનંદન)',
      hi: 'नूतन वर्ष (गुजराती नववर्ष)',
      en: 'Gujarati New Year (Bestu Varas)',
    },
    type: 'major',
  },
  {
    monthIdx: 0,
    paksha: 'sud',
    tithi: 2,
    name: { gu: 'ભાઈબીજ (Bhai Dooj)', hi: 'भाई दूज', en: 'Bhai Dooj' },
    type: 'major',
  },
  {
    monthIdx: 0,
    paksha: 'sud',
    tithi: 5,
    name: { gu: 'લાભ પાંચમ (Labh Pancham)', hi: 'लाभ पंचमी', en: 'Labh Pancham' },
    type: 'major',
  },
  {
    monthIdx: 0,
    paksha: 'sud',
    tithi: 11,
    name: {
      gu: 'દેવઉઠી એકાદશી / તુલસી વિવાહ',
      hi: 'देवउठनी एकादशी / तुलसी विवाह',
      en: 'Devutthana Ekadashi / Tulsi Vivah',
    },
    type: 'vrat',
  },
  {
    monthIdx: 0,
    paksha: 'sud',
    tithi: 15,
    name: {
      gu: 'દેવ દિવાળી / કાર્તિકી પૂનમ',
      hi: 'देव दीपावली / कार्तिक पूर्णिमा',
      en: 'Dev Diwali / Kartiki Purnima',
    },
    type: 'major',
  },

  // Magshar (માગશર)
  {
    monthIdx: 1,
    paksha: 'sud',
    tithi: 11,
    name: {
      gu: 'મોક્ષદા એકાદશી (ગીતા જયંતી)',
      hi: 'मोक्षदा एकादशी (गीता जयंती)',
      en: 'Mokshada Ekadashi / Gita Jayanti',
    },
    type: 'vrat',
  },

  // Posh (પોષ)
  {
    monthIdx: 2,
    paksha: 'sud',
    tithi: 11,
    name: { gu: 'પુત્રદા એકાદશી', hi: 'पुत्रदा एकादशी', en: 'Pausha Putrada Ekadashi' },
    type: 'vrat',
  },

  // Maha (મહા)
  {
    monthIdx: 3,
    paksha: 'sud',
    tithi: 5,
    name: { gu: 'વસંત પંચમી (સરસ્વતી પૂજા)', hi: 'वसंत पंचमी', en: 'Vasant Panchami' },
    type: 'major',
  },
  {
    monthIdx: 3,
    paksha: 'vad',
    tithi: 14,
    name: { gu: 'મહાશિવરાત્રી (Maha Shivaratri)', hi: 'महाशिवरात्रि', en: 'Maha Shivaratri' },
    type: 'major',
  },

  // Fagan (ફાગણ)
  {
    monthIdx: 4,
    paksha: 'sud',
    tithi: 11,
    name: { gu: 'આમલકી એકાદશી (રંગભરી)', hi: 'आमलकी एकादशी', en: 'Amalaki Ekadashi' },
    type: 'vrat',
  },
  {
    monthIdx: 4,
    paksha: 'sud',
    tithi: 15,
    name: { gu: 'હોળી (હુતાશની) / હોલિકા દહન', hi: 'होलिका दहन', en: 'Holika Dahan / Holi' },
    type: 'major',
  },
  {
    monthIdx: 4,
    paksha: 'vad',
    tithi: 1,
    name: { gu: 'ધૂળેટી (રંગોત્સવ)', hi: 'धुलेंडी / होली', en: 'Dhuleti (Festival of Colors)' },
    type: 'major',
  },

  // Chaitra (ચૈત્ર)
  {
    monthIdx: 5,
    paksha: 'sud',
    tithi: 1,
    name: {
      gu: 'ચૈત્રી નવરાત્રી પ્રારંભ / ગુડી પડવો',
      hi: 'चैत्र नवरात्रि / गुड़ी पड़वा',
      en: 'Chaitra Navratri Begins / Gudi Padwa',
    },
    type: 'major',
  },
  {
    monthIdx: 5,
    paksha: 'sud',
    tithi: 9,
    name: { gu: 'રામ નવમી (શ્રી રામ પ્રાગટ્ય)', hi: 'राम नवमी', en: 'Rama Navami' },
    type: 'major',
  },
  {
    monthIdx: 5,
    paksha: 'sud',
    tithi: 15,
    name: { gu: 'હનુમાન જયંતી / ચૈત્રી પૂનમ', hi: 'हनुमान जयंती', en: 'Hanuman Jayanti' },
    type: 'major',
  },

  // Vaishakh (વૈશાખ)
  {
    monthIdx: 6,
    paksha: 'sud',
    tithi: 3,
    name: {
      gu: 'અક્ષય તૃતીયા (અખાત્રીજ)',
      hi: 'अक्षय तृतीया (आखातीज)',
      en: 'Akshaya Tritiya (Akha Teej)',
    },
    type: 'major',
  },
  {
    monthIdx: 6,
    paksha: 'sud',
    tithi: 15,
    name: { gu: 'બુદ્ધ પૂર્ણિમા (નૃસિંહ જયંતી)', hi: 'बुद्ध पूर्णिमा', en: 'Buddha Purnima' },
    type: 'major',
  },

  // Jeth (જેઠ)
  {
    monthIdx: 7,
    paksha: 'sud',
    tithi: 11,
    name: {
      gu: 'નિર્જળા એકાદશી (ભીમ અગિયારસ)',
      hi: 'निर्जला एकादशी (भीम एकादशी)',
      en: 'Nirjala Ekadashi (Bhim Agiyaras)',
    },
    type: 'vrat',
  },
  {
    monthIdx: 7,
    paksha: 'sud',
    tithi: 15,
    name: { gu: 'વટ સાવિત્રી વ્રત / જેઠી પૂનમ', hi: 'वट सावित्री व्रत', en: 'Vat Savitri Vrat' },
    type: 'vrat',
  },

  // Ashadh (અષાઢ)
  {
    monthIdx: 8,
    paksha: 'sud',
    tithi: 2,
    name: {
      gu: 'અષાઢી બીજ / રથયાત્રા (જગન્નાથ)',
      hi: 'रथ यात्रा / आषाढ़ी दूज',
      en: 'Rath Yatra (Jagannath Puri)',
    },
    type: 'major',
  },
  {
    monthIdx: 8,
    paksha: 'sud',
    tithi: 11,
    name: {
      gu: 'દેવશયની એકાદશી (ચાતુર્માસ પ્રારંભ)',
      hi: 'देवशयनी एकादशी',
      en: 'Devshayani Ekadashi (Chaturmas)',
    },
    type: 'vrat',
  },
  {
    monthIdx: 8,
    paksha: 'sud',
    tithi: 15,
    name: { gu: 'ગુરુ પૂર્ણિમા (વ્યાસ પૂજા)', hi: 'गुरु पूर्णिमा', en: 'Guru Purnima' },
    type: 'major',
  },

  // Shravan (શ્રાવણ)
  {
    monthIdx: 9,
    paksha: 'sud',
    tithi: 15,
    name: { gu: 'રક્ષાબંધન (બળેવ) / નાળિયેરી પૂનમ', hi: 'रक्षाबंधन', en: 'Raksha Bandhan' },
    type: 'major',
  },
  {
    monthIdx: 9,
    paksha: 'vad',
    tithi: 7,
    name: { gu: 'શીતળા સાતમ (રાંધણ છઠ્ઠ પછી)', hi: 'शीतला सप्तमी', en: 'Sheetala Satam' },
    type: 'major',
  },
  {
    monthIdx: 9,
    paksha: 'vad',
    tithi: 8,
    name: {
      gu: 'શ્રી કૃષ્ણ જન્માષ્ટમી (ગોકુળાષ્ટમી)',
      hi: 'श्रीकृष्ण जन्माष्टमी',
      en: 'Krishna Janmashtami',
    },
    type: 'major',
  },

  // Bhadarvo (ભાદરવો)
  {
    monthIdx: 10,
    paksha: 'sud',
    tithi: 4,
    name: { gu: 'ગણેશ ચતુર્થી (ગણેશોત્સવ સ્થાપના)', hi: 'गणेश चतुर्थी', en: 'Ganesh Chaturthi' },
    type: 'major',
  },
  {
    monthIdx: 10,
    paksha: 'sud',
    tithi: 5,
    name: { gu: 'ઋષિ પાંચમ (સામા પાંચમ)', hi: 'ऋषि पंचमी', en: 'Rishi Panchami' },
    type: 'vrat',
  },
  {
    monthIdx: 10,
    paksha: 'sud',
    tithi: 14,
    name: {
      gu: 'અનંત ચતુર્દશી (ગણેશ વિસર્જન)',
      hi: 'अनंत चतुर्दशी',
      en: 'Anant Chaturdashi (Ganesh Visarjan)',
    },
    type: 'major',
  },
  {
    monthIdx: 10,
    paksha: 'vad',
    tithi: 15,
    name: {
      gu: 'સર્વપિતૃ અમાવાસ્યા (શ્રાદ્ધ પક્ષ પૂર્ણાહુતિ)',
      hi: 'सर्वपितृ अमावस्या',
      en: 'Sarva Pitru Amavasya',
    },
    type: 'vrat',
  },

  // Aaso (આસો)
  {
    monthIdx: 11,
    paksha: 'sud',
    tithi: 1,
    name: {
      gu: 'નવરાત્રી પ્રારંભ (ઘટસ્થાપન)',
      hi: 'शारदीय नवरात्रि प्रारंभ',
      en: 'Sharad Navratri Begins',
    },
    type: 'major',
  },
  {
    monthIdx: 11,
    paksha: 'sud',
    tithi: 8,
    name: { gu: 'દુર્ગાષ્ટમી (હવન-પૂજન)', hi: 'दुर्गा अष्टमी', en: 'Durga Ashtami' },
    type: 'major',
  },
  {
    monthIdx: 11,
    paksha: 'sud',
    tithi: 10,
    name: {
      gu: 'વિજયાદશમી (દશેરા / રાવણ દહન)',
      hi: 'विजयादशमी / दशहरा',
      en: 'Dussehra / Vijayadashami',
    },
    type: 'major',
  },
  {
    monthIdx: 11,
    paksha: 'sud',
    tithi: 15,
    name: { gu: 'શરદ પૂર્ણિમા (માણેકઠારી પૂનમ)', hi: 'शरद पूर्णिमा', en: 'Sharad Purnima' },
    type: 'major',
  },
  {
    monthIdx: 11,
    paksha: 'vad',
    tithi: 4,
    name: { gu: 'કરવા ચોથ (વ્રત)', hi: 'करवा चौथ', en: 'Karwa Chauth' },
    type: 'vrat',
  },
  {
    monthIdx: 11,
    paksha: 'vad',
    tithi: 12,
    name: { gu: 'વાઘ બારસ (ગોવત્સ દ્વાદશી)', hi: 'गोवत्स द्वादशी / वाघ बारस', en: 'Vagh Baras' },
    type: 'major',
  },
  {
    monthIdx: 11,
    paksha: 'vad',
    tithi: 13,
    name: {
      gu: 'ધનતેરસ (ધનત્રયોદશી / લક્ષ્મી પૂજન)',
      hi: 'धनतेरस / धनत्रयोदशी',
      en: 'Dhanteras (Lakshmi Puja)',
    },
    type: 'major',
  },
  {
    monthIdx: 11,
    paksha: 'vad',
    tithi: 14,
    name: {
      gu: 'કાળી ચૌદશ (રૂપ ચૌદશ / હનુમાન પૂજન)',
      hi: 'काली चौदस / नरक चतुर्दशी',
      en: 'Kali Chaudas',
    },
    type: 'major',
  },
  {
    monthIdx: 11,
    paksha: 'vad',
    tithi: 15,
    name: {
      gu: 'દિવાળી (દીપાવલી / ચોપડા પૂજન)',
      hi: 'दीपावली / महालक्ष्मी पूजन',
      en: 'Diwali (Deepawali / Chopda Pujan)',
    },
    type: 'major',
  },
];

// Fixed Gregorian Festivals (like Uttarayan / 14-15 Jan)
export const SOLAR_FIXED_FESTIVALS = {
  '01-14': {
    name: {
      gu: 'મકરસંક્રાંતિ / ઉત્તરાયણ (પતંગોત્સવ)',
      hi: 'मकर संक्रांति / पोंगल',
      en: 'Makar Sankranti / Uttarayan',
    },
    type: 'major',
  },
  '01-15': {
    name: { gu: 'વાસી ઉત્તરાયણ', hi: 'वासी उत्तरायण', en: 'Vasi Uttarayan' },
    type: 'major',
  },
  '01-26': {
    name: { gu: 'પ્રજાસત્તાક દિન (Republic Day)', hi: 'गणतंत्र दिवस', en: 'Republic Day' },
    type: 'national',
  },
  '08-15': {
    name: {
      gu: 'સ્વાતંત્ર્ય દિન (Independence Day)',
      hi: 'स्वतंत्रता दिवस',
      en: 'Independence Day',
    },
    type: 'national',
  },
  '10-02': {
    name: { gu: 'ગાંધી જયંતી', hi: 'गांधी जयंती', en: 'Gandhi Jayanti' },
    type: 'national',
  },
};

// Calculate Day Details for Gujarati Calendar
export function calculateDayPanchang(year, month, day) {
  const astro = calculatePlanetaryPositions(year, month, day, 12, 0, 21.1147, 73.3986, 5.5);
  const sunLon = astro.planets.Sun.lon;
  const moonLon = astro.planets.Moon.lon;

  // Tithi Calculation
  const tithiDiff = (moonLon - sunLon + 360) % 360;
  const tithiIndexTotal = Math.floor(tithiDiff / 12); // 0 to 29
  const isShuklaPaksha = tithiIndexTotal < 15;
  const pakshaShort = isShuklaPaksha ? 'સુદ' : 'વદ';
  const pakshaKey = isShuklaPaksha ? 'sud' : 'vad';
  const tithiNum = (tithiIndexTotal % 15) + 1;
  const tithiName = DETAILED_TITHIS[tithiNum - 1]?.name.split(' ')[0] || `તિથિ ${tithiNum}`;

  // Gujarati Month calculation (Amanta)
  const sunSignIdx = Math.floor((((sunLon % 360) + 360) % 360) / 30) % 12;
  const gujMonthIdx = (sunSignIdx + 7) % 12; // Scorpio = Kartak...
  const gujMonthName = GUJARATI_MONTHS[gujMonthIdx];

  // Vikram Samvat
  const vikramSamvat = month >= 11 ? year + 57 : year + 56;

  // Nakshatra
  const nakDeg = 360 / 27;
  const nakIndex = Math.floor((((moonLon % 360) + 360) % 360) / nakDeg);
  const nakInfo = NAKSHATRAS[nakIndex];

  // Check Festivals
  const dayKey = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  let festivals = [];

  // 1. Solar Fixed Check
  if (SOLAR_FIXED_FESTIVALS[dayKey]) {
    festivals.push(SOLAR_FIXED_FESTIVALS[dayKey]);
  }

  // 2. Tithi Based Festival Check
  const matchedFest = GUJARATI_FESTIVALS.find(
    (f) => f.monthIdx === gujMonthIdx && f.paksha === pakshaKey && f.tithi === tithiNum
  );
  if (matchedFest) {
    festivals.push(matchedFest);
  }

  // 3. Regular Recurring Observances (Ekadashi, Pradosh, Sankashti, Purnima, Amavasya)
  if (tithiNum === 11) {
    festivals.push({
      name: { gu: 'અગિયારસ (એકાદશી વ્રત)', hi: 'एकादशी व्रत', en: 'Ekadashi Vrat' },
      type: 'vrat',
    });
  } else if (tithiNum === 13) {
    festivals.push({
      name: { gu: 'પ્રદોષ વ્રત', hi: 'प्रदोष व्रत', en: 'Pradosh Vrat' },
      type: 'vrat',
    });
  } else if (tithiNum === 15 && isShuklaPaksha) {
    festivals.push({
      name: { gu: 'પૂનમ (પૂર્ણિમા વ્રત)', hi: 'पूर्णिमा व्रत', en: 'Purnima (Full Moon)' },
      type: 'vrat',
    });
  } else if (tithiNum === 15 && !isShuklaPaksha) {
    festivals.push({
      name: { gu: 'અમાસ (દર્શ અમાવાસ્યા)', hi: 'अमावस्या', en: 'Amavasya (New Moon)' },
      type: 'vrat',
    });
  } else if (tithiNum === 4 && !isShuklaPaksha) {
    festivals.push({
      name: { gu: 'સંકષ્ટી ગણેશ ચતુર્થી (ચોથ)', hi: 'संकष्टी चतुर्थी', en: 'Sankashti Chaturthi' },
      type: 'vrat',
    });
  }

  const isPurnima = tithiNum === 15 && isShuklaPaksha;
  const isAmavasya = tithiNum === 15 && !isShuklaPaksha;

  return {
    year,
    month,
    day,
    vikramSamvat,
    gujMonthName,
    pakshaShort,
    pakshaKey,
    tithiNum,
    tithiName,
    fullTithiTitle: `${pakshaShort} ${tithiName}`,
    nakshatraName: nakInfo.name,
    nakshatraLord: nakInfo.lord,
    festivals,
    isPurnima,
    isAmavasya,
    hasMajorFestival: festivals.some((f) => f.type === 'major'),
  };
}

// Generate Full Month Calendar Grid (Sunday to Saturday)
export function getGujaratiMonthCalendar(year, month) {
  // First day of the month & total days in month
  const firstDay = new Date(year, month - 1, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month, 0).getDate();

  const calendarDays = [];

  // 1. Previous Month Padding
  const prevMonthLastDate = new Date(year, month - 1, 0).getDate();
  for (let i = firstDay - 1; i >= 0; i--) {
    const pDay = prevMonthLastDate - i;
    const pMonth = month === 1 ? 12 : month - 1;
    const pYear = month === 1 ? year - 1 : year;
    const info = calculateDayPanchang(pYear, pMonth, pDay);
    calendarDays.push({ ...info, isCurrentMonth: false });
  }

  // 2. Current Month Days
  for (let d = 1; d <= daysInMonth; d++) {
    const info = calculateDayPanchang(year, month, d);
    calendarDays.push({ ...info, isCurrentMonth: true });
  }

  // 3. Next Month Padding to complete 7x5 or 7x6 grid
  const remaining =
    35 - calendarDays.length > 0 ? 35 - calendarDays.length : 42 - calendarDays.length;
  for (let n = 1; n <= remaining; n++) {
    const nMonth = month === 12 ? 1 : month + 1;
    const nYear = month === 12 ? year + 1 : year;
    const info = calculateDayPanchang(nYear, nMonth, n);
    calendarDays.push({ ...info, isCurrentMonth: false });
  }

  return calendarDays;
}
