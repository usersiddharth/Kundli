// High-Precision Vedic Clock Engine (Vedic Time Keeping / Kaal Chakra System)
// 1 Solar Day (Sunrise to Sunrise) = 60 Ghati (or Nadi) = 3600 Pala (Vighati) = 216,000 Vipala
// 1 Ghati = 24 Gregorian Minutes
// 1 Pala = 24 Gregorian Seconds
// 1 Vipala = 0.4 Gregorian Seconds
// 1 Prana (Asu) = 4 Gregorian Seconds (6 Prana = 1 Pala)
// 1 Nimesha = ~0.2133 Gregorian Seconds (187.5 Nimesha = 1 Pala)

import { calculatePlanetaryPositions, calculateJulianDay, d2r, r2d } from './astronomy.js';

// 27 Nakshatras Definition
export const NAKSHATRA_LIST = [
  { id: 1, code: 'ASHW', name: { gu: 'અશ્વિની', hi: 'अश्विनी', en: 'Ashwini' } },
  { id: 2, code: 'BHAR', name: { gu: 'ભરણી', hi: 'भरणी', en: 'Bharani' } },
  { id: 3, code: 'KRIT', name: { gu: 'કૃત્તિકા', hi: 'कृत्तिका', en: 'Krittika' } },
  { id: 4, code: 'ROHI', name: { gu: 'રોહિણી', hi: 'रोहिणी', en: 'Rohini' } },
  { id: 5, code: 'MRIG', name: { gu: 'મૃગશીર્ષ', hi: 'मृगशिरा', en: 'Mrigashira' } },
  { id: 6, code: 'ARDR', name: { gu: 'આર્દ્રા', hi: 'आर्द्रा', en: 'Ardra' } },
  { id: 7, code: 'PUNA', name: { gu: 'પુનર્વસુ', hi: 'पुनर्वसु', en: 'Punarvasu' } },
  { id: 8, code: 'PUSH', name: { gu: 'પુષ્ય', hi: 'पुष्य', en: 'Pushya' } },
  { id: 9, code: 'ASHL', name: { gu: 'આશ્લેષા', hi: 'आश्लेषा', en: 'Ashlesha' } },
  { id: 10, code: 'MAGH', name: { gu: 'મઘા', hi: 'मघा', en: 'Magha' } },
  {
    id: 11,
    code: 'PPHA',
    name: { gu: 'પૂર્વ ફાલ્ગુની', hi: 'पूर्वाफाल्गुनी', en: 'Purva Phalguni' },
  },
  {
    id: 12,
    code: 'UPHA',
    name: { gu: 'ઉત્તરા ફાલ્ગુની', hi: 'उत्तराफाल्गुनी', en: 'Uttara Phalguni' },
  },
  { id: 13, code: 'HAST', name: { gu: 'હસ્ત', hi: 'हस्त', en: 'Hasta' } },
  { id: 14, code: 'CHIT', name: { gu: 'ચિત્રા', hi: 'चित्रा', en: 'Chitra' } },
  { id: 15, code: 'SWAT', name: { gu: 'સ્વાતિ', hi: 'स्वाति', en: 'Swati' } },
  { id: 16, code: 'VISH', name: { gu: 'વિશાખા', hi: 'विशाखा', en: 'Vishakha' } },
  { id: 17, code: 'ANUR', name: { gu: 'અનુરાધા', hi: 'अनुराधा', en: 'Anuradha' } },
  { id: 18, code: 'JYES', name: { gu: 'જ્યેષ્ઠા', hi: 'ज्येष्ठा', en: 'Jyeshtha' } },
  { id: 19, code: 'MULA', name: { gu: 'મૂળ', hi: 'मूल', en: 'Mula' } },
  { id: 20, code: 'PASH', name: { gu: 'પૂર્વાષાઢા', hi: 'पूर्वाषाढ़ा', en: 'Purva Ashadha' } },
  { id: 21, code: 'UASH', name: { gu: 'ઉત્તરાષાઢા', hi: 'उत्तराषाढ़ा', en: 'Uttara Ashadha' } },
  { id: 22, code: 'SHRA', name: { gu: 'શ્રવણ', hi: 'श्रवण', en: 'Shravana' } },
  { id: 23, code: 'DHAN', name: { gu: 'ધનિષ્ઠા', hi: 'धनिष्ठा', en: 'Dhanishta' } },
  { id: 24, code: 'SHAT', name: { gu: 'શતભિષા', hi: 'शतभिषा', en: 'Shatabhisha' } },
  {
    id: 25,
    code: 'PBHA',
    name: { gu: 'પૂર્વ ભાદ્રપદ', hi: 'पूर्वाभाद्रपद', en: 'Purva Bhadrapada' },
  },
  {
    id: 26,
    code: 'UBHA',
    name: { gu: 'ઉત્તરા ભાદ્રપદ', hi: 'उत्तराभाद्रपद', en: 'Uttara Bhadrapada' },
  },
  { id: 27, code: 'REVA', name: { gu: 'રેવતી', hi: 'रेवती', en: 'Revati' } },
];

// 27 Yogas Definition
export const YOGA_LIST = [
  { id: 1, code: 'VISH', name: { gu: 'વિષ્કંભ', hi: 'विष्कुम्भ', en: 'Vishkambha' } },
  { id: 2, code: 'PRIT', name: { gu: 'પ્રીતિ', hi: 'प्रीति', en: 'Priti' } },
  { id: 3, code: 'AYUS', name: { gu: 'આયુષ્માન', hi: 'आयुष्मान', en: 'Ayushman' } },
  { id: 4, code: 'SAUB', name: { gu: 'સૌભાગ્ય', hi: 'सौभाग्य', en: 'Saubhagya' } },
  { id: 5, code: 'SHOB', name: { gu: 'શોભન', hi: 'शोभन', en: 'Shobhana' } },
  { id: 6, code: 'ATIG', name: { gu: 'અતિગંડ', hi: 'अतिगण्ड', en: 'Atiganda' } },
  { id: 7, code: 'SUKA', name: { gu: 'સુકર્મા', hi: 'सुकर्मा', en: 'Sukarma' } },
  { id: 8, code: 'DHRI', name: { gu: 'ધૃતિ', hi: 'धृति', en: 'Dhriti' } },
  { id: 9, code: 'SHUL', name: { gu: 'શૂળ', hi: 'शूल', en: 'Shula' } },
  { id: 10, code: 'GAND', name: { gu: 'ગંડ', hi: 'गण्ड', en: 'Ganda' } },
  { id: 11, code: 'VRID', name: { gu: 'વૃદ્ધિ', hi: 'वृद्धि', en: 'Vriddhi' } },
  { id: 12, code: 'DHRU', name: { gu: 'ધ્રુવ', hi: 'ध्रुव', en: 'Dhruva' } },
  { id: 13, code: 'VYAG', name: { gu: 'વ્યાઘાત', hi: 'व्याघात', en: 'Vyaghata' } },
  { id: 14, code: 'HARS', name: { gu: 'હર્ષણ', hi: 'हर्षण', en: 'Harshana' } },
  { id: 15, code: 'VAJR', name: { gu: 'વજ્ર', hi: 'वज्र', en: 'Vajra' } },
  { id: 16, code: 'SIDD', name: { gu: 'સિદ્ધિ', hi: 'सिद्धि', en: 'Siddhi' } },
  { id: 17, code: 'VYAT', name: { gu: 'વ્યતીપાત', hi: 'व्यतीपात', en: 'Vyatipata' } },
  { id: 18, code: 'VARI', name: { gu: 'વરીયાન', hi: 'वरीयान', en: 'Variyan' } },
  { id: 19, code: 'PARI', name: { gu: 'પરિઘ', hi: 'परिघ', en: 'Parigha' } },
  { id: 20, code: 'SHIV', name: { gu: 'શિવ', hi: 'शिव', en: 'Shiva' } },
  { id: 21, code: 'SIDD', name: { gu: 'સિદ્ધ', hi: 'सिद्ध', en: 'Siddha' } },
  { id: 22, code: 'SADH', name: { gu: 'સાધ્ય', hi: 'साध्य', en: 'Sadhya' } },
  { id: 23, code: 'SHUB', name: { gu: 'શુભ', hi: 'शुभ', en: 'Shubha' } },
  { id: 24, code: 'SHUK', name: { gu: 'શુક્લ', hi: 'शुक्ल', en: 'Shukla' } },
  { id: 25, code: 'BRAH', name: { gu: 'બ્રહ્મ', hi: 'ब्रह्म', en: 'Brahma' } },
  { id: 26, code: 'INDR', name: { gu: 'ઇન્દ્ર', hi: 'इन्द्र', en: 'Indra' } },
  { id: 27, code: 'VAID', name: { gu: 'વૈધૃતિ', hi: 'वैधृति', en: 'Vaidhriti' } },
];

// 30 Tithis Definition
export const TITHI_LIST = [
  // Shukla Paksha 1 - 15
  {
    id: 1,
    paksha: 'Shukla',
    code: 'S1',
    name: { gu: 'શુક્લ પડવો', hi: 'शुक्ल प्रतिपदा', en: 'Shukla Pratipada' },
  },
  {
    id: 2,
    paksha: 'Shukla',
    code: 'S2',
    name: { gu: 'શુક્લ બીજ', hi: 'शुक्ल द्वितीया', en: 'Shukla Dwitiya' },
  },
  {
    id: 3,
    paksha: 'Shukla',
    code: 'S3',
    name: { gu: 'શુક્લ ત્રીજ', hi: 'शुक्ल तृतीया', en: 'Shukla Tritiya' },
  },
  {
    id: 4,
    paksha: 'Shukla',
    code: 'S4',
    name: { gu: 'શુક્લ ચોથ', hi: 'शुक्ल चतुर्थी', en: 'Shukla Chaturthi' },
  },
  {
    id: 5,
    paksha: 'Shukla',
    code: 'S5',
    name: { gu: 'શુક્લ પાંચમ', hi: 'शुक्ल पंचमी', en: 'Shukla Panchami' },
  },
  {
    id: 6,
    paksha: 'Shukla',
    code: 'S6',
    name: { gu: 'શુક્લ છઠ્ઠ', hi: 'शुक्ल षष्ठी', en: 'Shukla Shasthi' },
  },
  {
    id: 7,
    paksha: 'Shukla',
    code: 'S7',
    name: { gu: 'શુક્લ સાતમ', hi: 'शुक्ल सप्तमी', en: 'Shukla Saptami' },
  },
  {
    id: 8,
    paksha: 'Shukla',
    code: 'S8',
    name: { gu: 'શુક્લ આઠમ', hi: 'शुक्ल अष्टमी', en: 'Shukla Ashtami' },
  },
  {
    id: 9,
    paksha: 'Shukla',
    code: 'S9',
    name: { gu: 'શુક્લ નોમ', hi: 'शुक्ल नवमी', en: 'Shukla Navami' },
  },
  {
    id: 10,
    paksha: 'Shukla',
    code: 'S10',
    name: { gu: 'શુક્લ દશમ', hi: 'शुक्ल दशमी', en: 'Shukla Dashami' },
  },
  {
    id: 11,
    paksha: 'Shukla',
    code: 'S11',
    name: { gu: 'શુક્લ અગિયારસ', hi: 'शुक्ल एकादशी', en: 'Shukla Ekadashi' },
  },
  {
    id: 12,
    paksha: 'Shukla',
    code: 'S12',
    name: { gu: 'શુક્લ બારસ', hi: 'शुक्ल द्वादशी', en: 'Shukla Dwadashi' },
  },
  {
    id: 13,
    paksha: 'Shukla',
    code: 'S13',
    name: { gu: 'શુક્લ તેરસ', hi: 'शुक्ल त्रयोदशी', en: 'Shukla Trayodashi' },
  },
  {
    id: 14,
    paksha: 'Shukla',
    code: 'S14',
    name: { gu: 'શુક્લ ચૌદસ', hi: 'शुक्ल चतुर्दशी', en: 'Shukla Chaturdashi' },
  },
  {
    id: 15,
    paksha: 'Shukla',
    code: 'S15',
    name: { gu: 'પૂનમ (પૂર્ણા)', hi: 'पूर्णिमा', en: 'Purnima (Full Moon)' },
  },

  // Krishna Paksha 16 - 30
  {
    id: 16,
    paksha: 'Krishna',
    code: 'K1',
    name: { gu: 'કૃષ્ણ પડવો', hi: 'कृष्ण प्रतिपदा', en: 'Krishna Pratipada' },
  },
  {
    id: 17,
    paksha: 'Krishna',
    code: 'K2',
    name: { gu: 'કૃષ્ણ બીજ', hi: 'कृष्ण द्वितीया', en: 'Krishna Dwitiya' },
  },
  {
    id: 18,
    paksha: 'Krishna',
    code: 'K3',
    name: { gu: 'કૃષ્ણ ત્રીજ', hi: 'कृष्ण तृतीया', en: 'Krishna Tritiya' },
  },
  {
    id: 19,
    paksha: 'Krishna',
    code: 'K4',
    name: { gu: 'કૃષ્ણ ચોથ', hi: 'कृष्ण चतुर्थी', en: 'Krishna Chaturthi' },
  },
  {
    id: 20,
    paksha: 'Krishna',
    code: 'K5',
    name: { gu: 'કૃષ્ણ પાંચમ', hi: 'कृष्ण पंचमी', en: 'Krishna Panchami' },
  },
  {
    id: 21,
    paksha: 'Krishna',
    code: 'K6',
    name: { gu: 'કૃષ્ણ છઠ્ઠ', hi: 'कृष्ण षष्ठी', en: 'Krishna Shasthi' },
  },
  {
    id: 22,
    paksha: 'Krishna',
    code: 'K7',
    name: { gu: 'કૃષ્ણ સાતમ', hi: 'कृष्ण सप्तमी', en: 'Krishna Saptami' },
  },
  {
    id: 23,
    paksha: 'Krishna',
    code: 'K8',
    name: { gu: 'કૃષ્ણ આઠમ', hi: 'कृष्ण अष्टमी', en: 'Krishna Ashtami' },
  },
  {
    id: 24,
    paksha: 'Krishna',
    code: 'K9',
    name: { gu: 'કૃષ્ણ નોમ', hi: 'कृष्ण नवमी', en: 'Krishna Navami' },
  },
  {
    id: 25,
    paksha: 'Krishna',
    code: 'K10',
    name: { gu: 'કૃષ્ણ દશમ', hi: 'कृष्ण दशमी', en: 'Krishna Dashami' },
  },
  {
    id: 26,
    paksha: 'Krishna',
    code: 'K11',
    name: { gu: 'કૃષ્ણ અગિયારસ', hi: 'कृष्ण एकादशी', en: 'Krishna Ekadashi' },
  },
  {
    id: 27,
    paksha: 'Krishna',
    code: 'K12',
    name: { gu: 'કૃષ્ણ બારસ', hi: 'कृष्ण द्वादशी', en: 'Krishna Dwadashi' },
  },
  {
    id: 28,
    paksha: 'Krishna',
    code: 'K13',
    name: { gu: 'કૃષ્ણ તેરસ', hi: 'कृष्ण त्रयोदशी', en: 'Krishna Trayodashi' },
  },
  {
    id: 29,
    paksha: 'Krishna',
    code: 'K14',
    name: { gu: 'કૃષ્ણ ચૌદસ', hi: 'कृष्ण चतुर्दशी', en: 'Krishna Chaturdashi' },
  },
  {
    id: 30,
    paksha: 'Krishna',
    code: 'K30',
    name: { gu: 'અમાસ (દર્શ)', hi: 'अमावस्या', en: 'Amavasya (New Moon)' },
  },
];

// 30 Classical Muhurtas of Day & Night (15 Daytime + 15 Nighttime)
export const MUHURTA_DEFINITIONS = [
  // Daytime Muhurtas (1 to 15 starting from Sunrise)
  {
    id: 1,
    code: 'RUDR',
    name: { gu: 'રુદ્ર', hi: 'रुद्र', en: 'Rudra' },
    deity: { gu: 'રુદ્ર (શિવ)', hi: 'रुद्र (शिव)', en: 'Rudra (Lord Shiva)' },
    status: 'inauspicious',
    nature: { gu: 'અશુભ (દુઃખદ)', hi: 'अशुभ (कष्टकारी)', en: 'Inauspicious' },
  },
  {
    id: 2,
    code: 'AHI',
    name: { gu: 'આહી', hi: 'आही', en: 'Ahi' },
    deity: { gu: 'અહિ (સર્પ)', hi: 'અહિ (નાગ)', en: 'Ahi (Serpent)' },
    status: 'inauspicious',
    nature: { gu: 'અશુભ (ઝેરી/અશાંત)', hi: 'अशुभ (विषैला)', en: 'Inauspicious' },
  },
  {
    id: 3,
    code: 'MITR',
    name: { gu: 'મિત્ર', hi: 'मित्र', en: 'Mitra' },
    deity: { gu: 'મિત્ર (સૂર્ય)', hi: 'मित्र (सूर्य)', en: 'Mitra (Sun God)' },
    status: 'auspicious',
    nature: { gu: 'શુભ (મિત્રતા & ભાઈચારો)', hi: 'शुभ (मैत्री)', en: 'Auspicious' },
  },
  {
    id: 4,
    code: 'PITR',
    name: { gu: 'પિતૃ', hi: 'पितृ', en: 'Pitra' },
    deity: { gu: 'પિતૃઓ', hi: 'पितृगण', en: 'Pitra (Ancestors)' },
    status: 'neutral',
    nature: { gu: 'સામાન્ય (પિતૃ પૂજન)', hi: 'सामान्य (पितृ कार्य)', en: 'Neutral (Ancestral)' },
  },
  {
    id: 5,
    code: 'VASU',
    name: { gu: 'વસુ', hi: 'वसु', en: 'Vasu' },
    deity: { gu: 'અષ્ટ વસુ', hi: 'अष्ट वसु', en: 'Ashta Vasus' },
    status: 'auspicious',
    nature: { gu: 'શુભ (સમૃદ્ધિ & ધન)', hi: 'शुभ (समृद्धि)', en: 'Auspicious' },
  },
  {
    id: 6,
    code: 'VARA',
    name: { gu: 'વારાહ', hi: 'वाराह', en: 'Varaha' },
    deity: { gu: 'વરાહ (વિષ્ણુ)', hi: 'वराह (विष्णु)', en: 'Lord Varaha' },
    status: 'auspicious',
    nature: { gu: 'શુભ (પ્રગતિ & વિજય)', hi: 'शुभ (प्रगति)', en: 'Auspicious' },
  },
  {
    id: 7,
    code: 'VISH',
    name: { gu: 'વિશ્વદેવ', hi: 'विश्वदेव', en: 'Visvadeva' },
    deity: { gu: 'વિશ્વદેવ', hi: 'विश्वदेव', en: 'Visvadevas' },
    status: 'auspicious',
    nature: { gu: 'શુભ (સર્વ કાર્ય)', hi: 'शुभ (सर्व कार्य)', en: 'Auspicious' },
  },
  {
    id: 8,
    code: 'ABHI',
    name: { gu: 'અભિજિત', hi: 'अभिजित', en: 'Abhijit' },
    deity: { gu: 'મહા વિષ્ણુ', hi: 'महाविष्णु', en: 'Lord Vishnu' },
    status: 'auspicious',
    nature: {
      gu: 'અતિ શુભ (સર્વશ્રેષ્ઠ વિજય મુહૂર્ત)',
      hi: 'अति शुभ (सर्वश्रेष्ठ)',
      en: 'Highly Auspicious',
    },
  },
  {
    id: 9,
    code: 'VIDH',
    name: { gu: 'વિધિ', hi: 'विधि', en: 'Vidhi' },
    deity: { gu: 'બ્રહ્મા', hi: 'ब्रह्मा', en: 'Lord Brahma' },
    status: 'auspicious',
    nature: { gu: 'શુભ (રચનાત્મક કાર્યો)', hi: 'शुभ (रचनात्मक)', en: 'Auspicious' },
  },
  {
    id: 10,
    code: 'SATA',
    name: { gu: 'સતમુખી', hi: 'सतमुखी', en: 'Satamukhi' },
    deity: { gu: 'સૂત/વાયરા', hi: 'वायुदेव', en: 'Vayu Deva' },
    status: 'neutral',
    nature: { gu: 'સામાન્ય (ચલિત)', hi: 'सामान्य', en: 'Neutral' },
  },
  {
    id: 11,
    code: 'PURU',
    name: { gu: 'પુરુહૂત', hi: 'पुरुहूत', en: 'Puruhuta' },
    deity: { gu: 'ઇન્દ્ર', hi: 'इन्द्र देव', en: 'Lord Indra' },
    status: 'auspicious',
    nature: { gu: 'શુભ (સત્તા & રાજકારજ)', hi: 'शुभ (प्रशासन)', en: 'Auspicious' },
  },
  {
    id: 12,
    code: 'VAHI',
    name: { gu: 'વાહિની', hi: 'वाहिनी', en: 'Vahini' },
    deity: { gu: 'અગ્નિદેવ', hi: 'अग्निदेव', en: 'Agni Deva' },
    status: 'inauspicious',
    nature: { gu: 'ઉગ્ર (અગ્નિ/સાવધાની)', hi: 'उग्र (सावधानी)', en: 'Aggressive' },
  },
  {
    id: 13,
    code: 'NAKT',
    name: { gu: 'નક્તંચર', hi: 'नक्तंचर', en: 'Naktanchara' },
    deity: { gu: 'નિરૃતિ/રાક્ષસ', hi: 'निरृति', en: 'Nirrati' },
    status: 'inauspicious',
    nature: { gu: 'અશુભ (બાધા કારક)', hi: 'अशुभ', en: 'Inauspicious' },
  },
  {
    id: 14,
    code: 'VARU',
    name: { gu: 'વરુણ', hi: 'वरुण', en: 'Varuna' },
    deity: { gu: 'વરુણદેવ', hi: 'वरुणदेव', en: 'Varuna Deva' },
    status: 'auspicious',
    nature: { gu: 'શુભ (જળ & શાંતિ)', hi: 'शुभ (शांति)', en: 'Auspicious' },
  },
  {
    id: 15,
    code: 'ARYA',
    name: { gu: 'અર્યમા', hi: 'अर्यमा', en: 'Aryaman' },
    deity: { gu: 'અર્યમા આદિત્ય', hi: 'अर्यमा आदित्य', en: 'Aryaman' },
    status: 'auspicious',
    nature: { gu: 'શુભ (સંધ્યા મુહૂર્ત)', hi: 'शुभ (संध्या)', en: 'Auspicious' },
  },

  // Nighttime Muhurtas (16 to 30 starting from Sunset)
  {
    id: 16,
    code: 'BHAG',
    name: { gu: 'ભગ', hi: 'भग', en: 'Bhaga' },
    deity: { gu: 'ભગ આદિત્ય', hi: 'भग आदित्य', en: 'Bhaga' },
    status: 'auspicious',
    nature: { gu: 'શુભ (પ્રદોષ કાળ)', hi: 'शुभ (प्रदोष)', en: 'Auspicious' },
  },
  {
    id: 17,
    code: 'GIRI',
    name: { gu: 'ગિરીશ', hi: 'गिरीश', en: 'Girisha' },
    deity: { gu: 'ગિરીશ (શંકર)', hi: 'गिरीश (शिव)', en: 'Girisha' },
    status: 'neutral',
    nature: { gu: 'સામાન્ય (ધ્યાન)', hi: 'सामान्य (ध्यान)', en: 'Neutral (Meditation)' },
  },
  {
    id: 18,
    code: 'AJAP',
    name: { gu: 'અજપાદ', hi: 'अजपाद', en: 'Ajapada' },
    deity: { gu: 'અજૈકપાદ', hi: 'अजैकपाद', en: 'Ajaikapada' },
    status: 'inauspicious',
    nature: { gu: 'અશુભ', hi: 'अशुभ', en: 'Inauspicious' },
  },
  {
    id: 19,
    code: 'AHIR',
    name: { gu: 'અહિર્બુધ્ન્ન્ય', hi: 'अहिर्बुध्न्य', en: 'Ahirbudhnya' },
    deity: { gu: 'અહિર્બુધ્ન્ન્ય', hi: 'अहिर्बुध्न्य', en: 'Ahirbudhnya' },
    status: 'auspicious',
    nature: { gu: 'શુભ (જ્ઞાન કારક)', hi: 'शुभ', en: 'Auspicious' },
  },
  {
    id: 20,
    code: 'PUSH',
    name: { gu: 'પૂષા', hi: 'पूषा', en: 'Pusha' },
    deity: { gu: 'પૂષા આદિત્ય', hi: 'पूषा देव', en: 'Pusha' },
    status: 'auspicious',
    nature: { gu: 'શુભ (પોષણ)', hi: 'शुभ', en: 'Auspicious' },
  },
  {
    id: 21,
    code: 'ASHW',
    name: { gu: 'અશ્વિની', hi: 'अश्विनी', en: 'Ashwini' },
    deity: { gu: 'અશ્વિની કુમાર', hi: 'अश्विनी कुमार', en: 'Ashwini Kumaras' },
    status: 'auspicious',
    nature: { gu: 'શુભ (આરોગ્ય & ઔષધ)', hi: 'शुभ (स्वास्थ्य)', en: 'Auspicious' },
  },
  {
    id: 22,
    code: 'YAMA',
    name: { gu: 'યમ', hi: 'यम', en: 'Yama' },
    deity: { gu: 'યમરાજ', hi: 'यमराज', en: 'Yamaraja' },
    status: 'inauspicious',
    nature: { gu: 'અશુભ (સંયમ)', hi: 'अशुभ', en: 'Inauspicious' },
  },
  {
    id: 23,
    code: 'AGNI',
    name: { gu: 'અગ્નિ', hi: 'अग्नि', en: 'Agni' },
    deity: { gu: 'અગ્નિ', hi: 'अग्नि देव', en: 'Agni' },
    status: 'inauspicious',
    nature: { gu: 'તીવ્ર (નિશીથ કાળ)', hi: 'तीव्र', en: 'Aggressive' },
  },
  {
    id: 24,
    code: 'VIDH',
    name: { gu: 'વિધાતા', hi: 'विधाता', en: 'Vidhata' },
    deity: { gu: 'વિધાતા', hi: 'विधाता', en: 'Vidhata' },
    status: 'auspicious',
    nature: { gu: 'શુભ', hi: 'शुभ', en: 'Auspicious' },
  },
  {
    id: 25,
    code: 'KAND',
    name: { gu: 'કંડ', hi: 'कंड', en: 'Kanda' },
    deity: { gu: 'ચંદ્રદેવ', hi: 'चन्द्रदेव', en: 'Chandra Deva' },
    status: 'auspicious',
    nature: { gu: 'શુભ (શાંતિ)', hi: 'शुभ', en: 'Auspicious' },
  },
  {
    id: 26,
    code: 'ADIT',
    name: { gu: 'અદિતિ', hi: 'अदिति', en: 'Aditi' },
    deity: { gu: 'અદિતિ માતા', hi: 'अदिति माता', en: 'Mother Aditi' },
    status: 'auspicious',
    nature: { gu: 'શુભ (રક્ષા)', hi: 'शुभ', en: 'Auspicious' },
  },
  {
    id: 27,
    code: 'JIV',
    name: { gu: 'જીવ', hi: 'जीव', en: 'Jiva' },
    deity: { gu: 'બૃહસ્પતિ (ગુરુ)', hi: 'बृहस्पति', en: 'Brihaspati' },
    status: 'auspicious',
    nature: { gu: 'શુભ (ઉષા કાળ)', hi: 'शुभ', en: 'Auspicious' },
  },
  {
    id: 28,
    code: 'VISH',
    name: { gu: 'વિષ્ણુ', hi: 'विष्णु', en: 'Vishnu' },
    deity: { gu: 'મહા વિષ્ણુ', hi: 'महाविष्णु', en: 'Lord Vishnu' },
    status: 'auspicious',
    nature: { gu: 'અતિ શુભ', hi: 'अति शुभ', en: 'Highly Auspicious' },
  },
  {
    id: 29,
    code: 'BRAH',
    name: { gu: 'બ્રહ્મ (બ્રહ્મ મુહૂર્ત)', hi: 'ब्रह्म (ब्रह्म मुहूर्त)', en: 'Brahma Muhurta' },
    deity: { gu: 'પરબ્રહ્મ', hi: 'परब्रह्म', en: 'Parabrahma' },
    status: 'auspicious',
    nature: { gu: 'સર્વોત્તમ (ધ્યાન & જ્ઞાન)', hi: 'सर्वोत्तम (ध्यान)', en: 'Supreme (Divine)' },
  },
  {
    id: 30,
    code: 'SAMU',
    name: { gu: 'સમુદ્ર', hi: 'समुद्र', en: 'Samudra' },
    deity: { gu: 'સમુદ્ર દેવ', hi: 'समुद्र देव', en: 'Samudra Deva' },
    status: 'auspicious',
    nature: { gu: 'શુભ (પ્રભાત આગમન)', hi: 'शुभ (प्रभात)', en: 'Auspicious' },
  },
];

// 8 Prahars (4 Daytime + 4 Nighttime)
export const PRAHAR_DEFINITIONS = [
  {
    id: 1,
    code: 'PRAT',
    name: { gu: 'પ્રથમ પહર (પ્રાતઃ)', hi: 'प्रथम प्रहर (प्रातः)', en: '1st Prahar (Morning)' },
    period: 'day',
    ghati: '0 - 7.5',
    desc: {
      gu: 'સૂર્યોદય પછીનો સમય. દૈનિક પૂજા, સૂર્ય વંદન અને કાર્યારંભ માટે શ્રેષ્ઠ.',
      hi: 'सूर्योदय पश्चात समय। पूजा एवं कार्य प्रभार हेतु उत्तम।',
      en: 'Post-sunrise. Ideal for morning prayers and planning.',
    },
  },
  {
    id: 2,
    code: 'MADH',
    name: {
      gu: 'દ્વિતીય પહર (મધ્યાહ્ન)',
      hi: 'द्वितीय प्रहर (मध्याह्न)',
      en: '2nd Prahar (Midday)',
    },
    period: 'day',
    ghati: '7.5 - 15',
    desc: {
      gu: 'બપોરનો સમય. વ્યાપાર, ભોજન અને મહત્વના આર્થિક નિર્ણયો.',
      hi: 'दोपहर का समय। व्यापार एवं भोजन हेतु उपयुक्त।',
      en: 'Midday. Favorable for business and main meals.',
    },
  },
  {
    id: 3,
    code: 'APAR',
    name: { gu: 'તૃતીય પહર (અપરાહ્ન)', hi: 'तृतीय प्रहर (अपराह्न)', en: '3rd Prahar (Afternoon)' },
    period: 'day',
    ghati: '15 - 22.5',
    desc: {
      gu: 'બપોર પછીનો સમય. અભ્યાસ, કાર્યાલયી કામ અને મીટિંગ્સ.',
      hi: 'अपराह्न समय। अध्ययन एवं बैठकों हेतु उपयुक्त।',
      en: 'Afternoon. Ideal for focus, studies, and meetings.',
    },
  },
  {
    id: 4,
    code: 'SAYA',
    name: { gu: 'ચતુર્થ પહર (સાયં)', hi: 'चतुर्थ प्रहर (सायं)', en: '4th Prahar (Evening)' },
    period: 'day',
    ghati: '22.5 - 30',
    desc: {
      gu: 'સૂર્યાસ્ત પહેલાનો સમય. સાયં આરતી, રમતગમત અને વિશ્રામ.',
      hi: 'सूर्यास्त पूर्व समय। आरती व विश्राम हेतु।',
      en: 'Pre-sunset. Evening prayers and wind-down.',
    },
  },
  {
    id: 5,
    code: 'PRAD',
    name: { gu: 'પંચમ પહર (પ્રદોષ કાળ)', hi: 'पंचम प्रहर (प्रदोष)', en: '5th Prahar (Night)' },
    period: 'night',
    ghati: '30 - 37.5',
    desc: {
      gu: 'સૂર્યાસ્ત પછીનો પ્રથમ સમય. પ્રદોષ પૂજા અને પરિવાર સાથે સમય.',
      hi: 'सूर्यास्त पश्चात। प्रदोष पूजा व पारिवारिक समय।',
      en: 'Post-sunset. Pradosh worship and family time.',
    },
  },
  {
    id: 6,
    code: 'NISH',
    name: { gu: 'ષષ્ઠ પહર (નિશીથ કાળ)', hi: 'षष्ठ प्रहर (निजीथ)', en: '6th Prahar (Midnight)' },
    period: 'night',
    ghati: '37.5 - 45',
    desc: {
      gu: 'મધ્યરાત્રિનો સમય. ગૂઢ સાધના, તંત્ર અને ગાઢ નિદ્રા.',
      hi: 'मध्यरात्रि समय। साधना एवं निद्रा।',
      en: 'Midnight. Deep sleep and internal reflection.',
    },
  },
  {
    id: 7,
    code: 'TRIY',
    name: {
      gu: 'સપ્તમ પહર (ત્રિયામા)',
      hi: 'सप्तम प्रहर (त्रियामा)',
      en: '7th Prahar (Late Night)',
    },
    period: 'night',
    ghati: '45 - 52.5',
    desc: {
      gu: 'રાત્રિનો ઉત્તરાર્ધ. શાંત નિદ્રા અને આંતરિક ઉર્જા સંચય.',
      hi: 'रात्रि उत्तरार्ध। शांत निद्रा।',
      en: 'Late night. Restful restoration.',
    },
  },
  {
    id: 8,
    code: 'USHA',
    name: { gu: 'અષ્ટમ પહર (ઉષા)', hi: 'अष्टम प्रहर (उषा)', en: '8th Prahar (Pre-Dawn)' },
    period: 'night',
    ghati: '52.5 - 60',
    desc: {
      gu: 'સૂર્યોદય પહેલાનો પવિત્ર સમય. યોગ, ધ્યાન અને બ્રહ્મ મુહૂર્ત.',
      hi: 'सूर्योदय पूर्व। योग, ध्यान एवं अध्ययन।',
      en: 'Pre-dawn. Ideal for yoga, meditation, and study.',
    },
  },
];

// Planetary Hora Sequence (7 Classical Planets in Chaldean Speed order)
export const HORA_PLANETS = [
  {
    key: 'Sun',
    name: { gu: 'સૂર્ય (Surya)', hi: 'सूर्य', en: 'Sun' },
    nature: {
      gu: 'પ્રશાસન, પદ, આત્મબળ',
      hi: 'प्रशासन व आत्मविश्वास',
      en: 'Authority & Leadership',
    },
    color: '#b85d19',
  },
  {
    key: 'Venus',
    name: { gu: 'શુક્ર (Shukra)', hi: 'शुक्र', en: 'Venus' },
    nature: {
      gu: 'કળા, વાહન, ભૌતિક સુખ',
      hi: 'कला व भौतिक सुख',
      en: 'Arts, Luxury & Relationships',
    },
    color: '#d48806',
  },
  {
    key: 'Mercury',
    name: { gu: 'બુધ (Budh)', hi: 'बुध', en: 'Mercury' },
    nature: {
      gu: 'વ્યાપાર, ગણિત, સંચાર',
      hi: 'व्यापार व संचार',
      en: 'Commerce, Logic & Communication',
    },
    color: '#285e20',
  },
  {
    key: 'Moon',
    name: { gu: 'ચંદ્ર (Chandra)', hi: 'चन्द्र', en: 'Moon' },
    nature: {
      gu: 'માનસિક શાંતિ, પ્રવાસ, જળ',
      hi: 'मानसिक शांति व यात्रा',
      en: 'Mind, Peace & Travel',
    },
    color: '#1890ff',
  },
  {
    key: 'Saturn',
    name: { gu: 'શનિ (Shani)', hi: 'शनि', en: 'Saturn' },
    nature: {
      gu: 'કૃષિ, સ્થાવર મિલકત, સેવા',
      hi: 'कृषि व स्थायी कार्य',
      en: 'Real Estate, Mining & Service',
    },
    color: '#434343',
  },
  {
    key: 'Jupiter',
    name: { gu: 'ગુરુ (Guru)', hi: 'गुरु', en: 'Jupiter' },
    nature: {
      gu: 'જ્ઞાન, ધર્મ, નાણાકીય રોકાણ',
      hi: 'ज्ञान व निवेश',
      en: 'Wisdom, Finance & Spirituality',
    },
    color: '#fa8c16',
  },
  {
    key: 'Mars',
    name: { gu: 'મંગળ (Mangal)', hi: 'मंगल', en: 'Mars' },
    nature: { gu: 'સાહસ, જમીન, રમતગમત', hi: 'साहस व भूमि', en: 'Courage, Property & Sports' },
    color: '#cf1322',
  },
];

// Weekday Day-Start Hora Indices (Sun=0, Mon=3, Tue=6, Wed=2, Thu=5, Fri=1, Sat=4)
const WEEKDAY_HORA_START = [0, 3, 6, 2, 5, 1, 4];

/**
 * Ultra-High Precision Solar Sunrise & Sunset Algorithm (NOAA / Jean Meeus Standard)
 * Accounts for Atmospheric Refraction (0.833° zenith) & Solar Disk Radius
 */
export function getSolarTimes(dateObj, lat = 21.1147, lng = 73.3986, tz = 5.5) {
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  // 1. Julian Day at 00:00 UT
  const jd0 = calculateJulianDay(year, month, day, 0, 0, 0);
  const T = (jd0 - 2451545.0) / 36525.0;

  // 2. Solar Mean Longitude & Anomaly (Meeus Ch. 25)
  const L0 = (280.46646 + 36000.76983 * T + 0.0003032 * T * T) % 360;
  const M = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) % 360;
  const rM = (((M % 360) + 360) % 360) * d2r;

  // Sun Equation of Center C
  const C =
    (1.914602 - 0.004817 * T) * Math.sin(rM) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * rM) +
    0.000289 * Math.sin(3 * rM);
  const sunTrueLon = (L0 + C + 3600) % 360;

  // Apparent Longitude
  const omega = (125.04 - 1934.136 * T + 3600) % 360;
  const sunAppLon = (sunTrueLon - 0.00569 - 0.00478 * Math.sin(omega * d2r) + 3600) % 360;

  // Obliquity of Ecliptic
  const eps0 = 23.439291 - 0.0130042 * T;
  const eps = eps0 + 0.00256 * Math.cos(omega * d2r);

  // Solar Declination
  const sinDec = Math.sin(eps * d2r) * Math.sin(sunAppLon * d2r);
  const dec = Math.asin(sinDec); // in radians

  // Equation of Time E (in minutes)
  const y = Math.pow(Math.tan((eps * d2r) / 2), 2);
  const rL0 = (((L0 % 360) + 360) % 360) * d2r;
  const e = 0.016708634 - 0.000042037 * T;
  const Etime =
    4 *
    r2d *
    (y * Math.sin(2 * rL0) -
      2 * e * Math.sin(rM) +
      4 * e * y * Math.sin(rM) * Math.cos(2 * rL0) -
      0.5 * y * y * Math.sin(4 * rL0) -
      1.25 * e * e * Math.sin(2 * rM));

  // Solar Hour Angle H0 for Sunrise/Sunset Zenith (90° 50' = 90.833°)
  const zenithRad = 90.833 * d2r;
  const latRad = lat * d2r;

  const cosH0 =
    (Math.cos(zenithRad) - Math.sin(latRad) * Math.sin(dec)) / (Math.cos(latRad) * Math.cos(dec));

  let H0deg = 90;
  if (cosH0 >= -1 && cosH0 <= 1) {
    H0deg = Math.acos(cosH0) * r2d;
  }

  // Solar Noon in Local Time Minutes
  const solarNoonMin = 720 - 4 * lng - Etime + tz * 60;

  // Sunrise and Sunset Local Minutes from Midnight
  let sunriseMin = solarNoonMin - H0deg * 4;
  let sunsetMin = solarNoonMin + H0deg * 4;

  if (sunriseMin < 0) sunriseMin += 1440;
  if (sunsetMin < 0) sunsetMin += 1440;

  const riseH = Math.floor(sunriseMin / 60);
  const riseM = Math.floor(sunriseMin % 60);
  const riseS = Math.floor(((sunriseMin % 60) % 1) * 60);

  const setH = Math.floor(sunsetMin / 60);
  const setM = Math.floor(sunsetMin % 60);
  const setS = Math.floor(((sunsetMin % 60) % 1) * 60);

  const sunriseObj = new Date(year, month - 1, day, riseH, riseM, riseS);
  const sunsetObj = new Date(year, month - 1, day, setH, setM, setS);

  return {
    sunriseObj,
    sunsetObj,
    sunriseDecimal: sunriseMin / 60,
    sunsetDecimal: sunsetMin / 60,
  };
}

/**
 * Main Vedic Clock Calculator Function
 */
export function calculateVedicClock(
  currentTime = new Date(),
  lat = 21.1147,
  lng = 73.3986,
  tz = 5.5
) {
  const { sunriseObj, sunsetObj } = getSolarTimes(currentTime, lat, lng, tz);

  let effectiveSunrise = new Date(sunriseObj);
  // If current time is before today's sunrise, the Vedic day started at yesterday's sunrise!
  if (currentTime < sunriseObj) {
    const yesterday = new Date(currentTime);
    yesterday.setDate(yesterday.getDate() - 1);
    const prevSolar = getSolarTimes(yesterday, lat, lng, tz);
    effectiveSunrise = prevSolar.sunriseObj;
  }

  // Calculate Ishtakaal (Time elapsed since Sunrise in milliseconds)
  let elapsedMs = currentTime.getTime() - effectiveSunrise.getTime();
  if (elapsedMs < 0) elapsedMs = 0;

  const totalElapsedSec = elapsedMs / 1000;

  // 1 Ghati = 24 minutes = 1440 seconds
  const totalGhatiDec = totalElapsedSec / 1440;
  const currentGhati = Math.floor(totalGhatiDec % 60);

  // Remainder in Pala (1 Pala = 24 seconds)
  const remainingSecFromGhati = (totalGhatiDec % 1) * 1440;
  const currentPala = Math.floor(remainingSecFromGhati / 24);

  // Remainder in Vipala (1 Vipala = 0.4 seconds)
  const remainingSecFromPala = remainingSecFromGhati % 24;
  const currentVipala = Math.floor(remainingSecFromPala / 0.4);

  const totalPalaCount = Math.floor((totalGhatiDec % 60) * 60 + currentPala);

  // Prana & Nimesha
  const currentPrana = Math.floor(remainingSecFromPala / 4);
  const currentNimesha = Math.floor(remainingSecFromPala / 0.2133);

  // Real Astronomical Planetary Positions for Tithi, Nakshatra, Yoga calculation
  const astro = calculatePlanetaryPositions(
    currentTime.getFullYear(),
    currentTime.getMonth() + 1,
    currentTime.getDate(),
    currentTime.getHours(),
    currentTime.getMinutes(),
    lat,
    lng,
    tz
  );

  const sunLon = astro.planets.Sun.lon;
  const moonLon = astro.planets.Moon.lon;

  // 1. Nakshatra calculation (13° 20' = 13.333333° per Nakshatra)
  const nakshatraIndex = Math.floor(moonLon / 13.333333) % 27;
  const activeNakshatra = NAKSHATRA_LIST[nakshatraIndex] || NAKSHATRA_LIST[0];

  // 2. Tithi calculation ((Moon - Sun) / 12°)
  const diffDeg = (moonLon - sunLon + 360) % 360;
  const tithiIndex = Math.floor(diffDeg / 12) % 30;
  const activeTithi = TITHI_LIST[tithiIndex] || TITHI_LIST[0];

  // 3. Yoga calculation ((Moon + Sun) / 13° 20')
  const sumDeg = (moonLon + sunLon) % 360;
  const yogaIndex = Math.floor(sumDeg / 13.333333) % 27;
  const activeYoga = YOGA_LIST[yogaIndex] || YOGA_LIST[0];

  // -----------------------------------------------------------------------
  // 30 MUHURTAS CALCULATION (Daytime & Nighttime Dynamic Scaling)
  // -----------------------------------------------------------------------
  const dayDurationMs = sunsetObj.getTime() - sunriseObj.getTime();
  const dayMuhurtaMs = dayDurationMs / 15;

  const tomorrow = new Date(currentTime);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextSolar = getSolarTimes(tomorrow, lat, lng, tz);
  const nightDurationMs = nextSolar.sunriseObj.getTime() - sunsetObj.getTime();
  const nightMuhurtaMs = nightDurationMs / 15;

  let activeMuhurtaIndex = 0;
  const allMuhurtas = MUHURTA_DEFINITIONS.map((def, idx) => {
    let mStart = new Date();
    let mEnd = new Date();

    if (idx < 15) {
      mStart = new Date(sunriseObj.getTime() + idx * dayMuhurtaMs);
      mEnd = new Date(sunriseObj.getTime() + (idx + 1) * dayMuhurtaMs);
    } else {
      const nIdx = idx - 15;
      mStart = new Date(sunsetObj.getTime() + nIdx * nightMuhurtaMs);
      mEnd = new Date(sunsetObj.getTime() + (nIdx + 1) * nightMuhurtaMs);
    }

    const isActive = currentTime >= mStart && currentTime < mEnd;
    if (isActive) activeMuhurtaIndex = idx;

    const isPassed = currentTime >= mEnd;
    const isUpcoming = currentTime < mStart;

    let progressPct = 0;
    if (isActive) {
      const totalM = mEnd.getTime() - mStart.getTime();
      const passedM = currentTime.getTime() - mStart.getTime();
      progressPct = Math.min(100, Math.max(0, (passedM / totalM) * 100));
    }

    return {
      ...def,
      startTime: mStart,
      endTime: mEnd,
      isActive,
      isPassed,
      isUpcoming,
      progressPct,
    };
  });

  const activeMuhurta = allMuhurtas[activeMuhurtaIndex] || allMuhurtas[0];

  // -----------------------------------------------------------------------
  // 8 PRAHARS CALCULATION
  // -----------------------------------------------------------------------
  const ghatiVal = totalGhatiDec % 60;
  let activePraharIndex = Math.floor(ghatiVal / 7.5);
  if (activePraharIndex >= 8) activePraharIndex = 7;

  const allPrahars = PRAHAR_DEFINITIONS.map((def, idx) => {
    const isActive = idx === activePraharIndex;
    return {
      ...def,
      isActive,
    };
  });

  const activePrahar = allPrahars[activePraharIndex] || allPrahars[0];

  // -----------------------------------------------------------------------
  // 24 HORAS CALCULATION (Planetary Hours)
  // -----------------------------------------------------------------------
  const dayOfWeek = currentTime.getDay();
  const startHoraIdx = WEEKDAY_HORA_START[dayOfWeek];

  const currentHourDecimal = currentTime.getHours() + currentTime.getMinutes() / 60;
  const horaHourIndex = Math.floor(currentHourDecimal);
  const activeHoraPlanetIdx = (startHoraIdx + horaHourIndex) % 7;
  const activeHoraPlanet = HORA_PLANETS[activeHoraPlanetIdx];

  const allHoras = Array.from({ length: 24 }).map((_, h) => {
    const pIdx = (startHoraIdx + h) % 7;
    const planet = HORA_PLANETS[pIdx];
    const hStartStr = `${h.toString().padStart(2, '0')}:00`;
    const hEndStr = `${((h + 1) % 24).toString().padStart(2, '0')}:00`;
    const isActive = h === horaHourIndex;

    return {
      hour: h,
      startStr: hStartStr,
      endStr: hEndStr,
      planet,
      isActive,
    };
  });

  // Brahma Muhurta, Abhijit Muhurta & Rahu Kaal
  const brahmaMuhurtaObj = allMuhurtas.find((m) => m.id === 29) || allMuhurtas[28];
  const abhijitMuhurtaObj = allMuhurtas.find((m) => m.id === 8) || allMuhurtas[7];

  const RAHU_DAY_SLOTS = [7, 1, 6, 4, 5, 3, 2];
  const rahuSlotIdx = RAHU_DAY_SLOTS[dayOfWeek];
  const rahuKaalStart = new Date(sunriseObj.getTime() + rahuSlotIdx * (dayDurationMs / 8));
  const rahuKaalEnd = new Date(sunriseObj.getTime() + (rahuSlotIdx + 1) * (dayDurationMs / 8));
  const isRahuKaalActive = currentTime >= rahuKaalStart && currentTime < rahuKaalEnd;

  return {
    currentTime,
    sunriseObj,
    sunsetObj,
    ishtakaal: {
      totalGhatiDec,
      ghati: currentGhati,
      pala: currentPala,
      vipala: currentVipala,
      totalPalaCount,
      prana: currentPrana,
      nimesha: currentNimesha,
      formatted: `${currentGhati.toString().padStart(2, '0')}:${currentPala.toString().padStart(2, '0')}`,
    },
    activeTithi,
    allTithis: TITHI_LIST,
    activeNakshatra,
    allNakshatras: NAKSHATRA_LIST,
    activeYoga,
    allYogas: YOGA_LIST,
    activeMuhurta,
    allMuhurtas,
    activePrahar,
    allPrahars,
    activeHoraPlanet,
    allHoras,
    brahmaMuhurta: {
      ...brahmaMuhurtaObj,
      start: brahmaMuhurtaObj.startTime,
      end: brahmaMuhurtaObj.endTime,
      startTime: brahmaMuhurtaObj.startTime,
      endTime: brahmaMuhurtaObj.endTime,
    },
    abhijitMuhurta: {
      ...abhijitMuhurtaObj,
      start: abhijitMuhurtaObj.startTime,
      end: abhijitMuhurtaObj.endTime,
      startTime: abhijitMuhurtaObj.startTime,
      endTime: abhijitMuhurtaObj.endTime,
    },
    rahuKaal: {
      start: rahuKaalStart,
      end: rahuKaalEnd,
      startTime: rahuKaalStart,
      endTime: rahuKaalEnd,
      isActive: isRahuKaalActive,
    },
  };
}

export function formatTimeString(dateObj) {
  if (!dateObj || !(dateObj instanceof Date)) return '--:--';
  return dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
