import React from 'react';
import { degToDms } from '../engine/astronomy.js';
import {
  Sparkles,
  Moon,
  Compass,
  Sun,
  Shield,
  Feather,
  Flame,
  Award,
  Clock,
  CircleDot,
  Calendar,
  CloudSun,
  Layers,
  Crown,
  Wind,
} from 'lucide-react';

// Multilingual lookup for Rashis with lords & elements
const RASHI_DATA = {
  Aries: {
    gu: 'મેષ (Aries)',
    hi: 'मेष (Aries)',
    en: 'Aries',
    lordGu: 'મંગળ',
    lordHi: 'मंगल',
    lordEn: 'Mars',
    elementGu: 'અગ્નિ તત્વ',
    elementHi: 'अग्नि तत्व',
    elementEn: 'Fire element',
  },
  Taurus: {
    gu: 'વૃષભ (Taurus)',
    hi: 'वृषभ (Taurus)',
    en: 'Taurus',
    lordGu: 'શુક્ર',
    lordHi: 'शुक्र',
    lordEn: 'Venus',
    elementGu: 'પૃથ્વી તત્વ',
    elementHi: 'पृथ्वी तत्व',
    elementEn: 'Earth element',
  },
  Gemini: {
    gu: 'મિથુન (Gemini)',
    hi: 'मिथुन (Gemini)',
    en: 'Gemini',
    lordGu: 'બુધ',
    lordHi: 'बुध',
    lordEn: 'Mercury',
    elementGu: 'વાયુ તત્વ',
    elementHi: 'वायु तत्व',
    elementEn: 'Air element',
  },
  Cancer: {
    gu: 'કર્ક (Cancer)',
    hi: 'कर्क (Cancer)',
    en: 'Cancer',
    lordGu: 'ચંદ્ર',
    lordHi: 'चन्द्र',
    lordEn: 'Moon',
    elementGu: 'જળ તત્વ',
    elementHi: 'जल तत्व',
    elementEn: 'Water element',
  },
  Leo: {
    gu: 'સિંહ (Leo)',
    hi: 'सिंह (Leo)',
    en: 'Leo',
    lordGu: 'સૂર્ય',
    lordHi: 'सूर्य',
    lordEn: 'Sun',
    elementGu: 'અગ્નિ તત્વ',
    elementHi: 'अग्नि तत्व',
    elementEn: 'Fire element',
  },
  Virgo: {
    gu: 'કન્યા (Virgo)',
    hi: 'कन्या (Virgo)',
    en: 'Virgo',
    lordGu: 'બુધ',
    lordHi: 'बुध',
    lordEn: 'Mercury',
    elementGu: 'પૃથ્વી તત્વ',
    elementHi: 'पृथ्वी तत्व',
    elementEn: 'Earth element',
  },
  Libra: {
    gu: 'તુલા (Libra)',
    hi: 'तुला (Libra)',
    en: 'Libra',
    lordGu: 'શુક્ર',
    lordHi: 'शुक्र',
    lordEn: 'Venus',
    elementGu: 'વાયુ તત્વ',
    elementHi: 'वायु तत्व',
    elementEn: 'Air element',
  },
  Scorpio: {
    gu: 'વૃશ્ચિક (Scorpio)',
    hi: 'वृश्चिक (Scorpio)',
    en: 'Scorpio',
    lordGu: 'મંગળ',
    lordHi: 'मंगल',
    lordEn: 'Mars',
    elementGu: 'જળ તત્વ',
    elementHi: 'जल तत्व',
    elementEn: 'Water element',
  },
  Sagittarius: {
    gu: 'ધન (Sagittarius)',
    hi: 'धनु (Sagittarius)',
    en: 'Sagittarius',
    lordGu: 'ગુરુ',
    lordHi: 'बृहस्पति',
    lordEn: 'Jupiter',
    elementGu: 'અગ્નિ તત્વ',
    elementHi: 'अग्नि तत्व',
    elementEn: 'Fire element',
  },
  Capricorn: {
    gu: 'મકર (Capricorn)',
    hi: 'मकर (Capricorn)',
    en: 'Capricorn',
    lordGu: 'શનિ',
    lordHi: 'शनि',
    lordEn: 'Saturn',
    elementGu: 'પૃથ્વી તત્વ',
    elementHi: 'पृथ्वी तत्व',
    elementEn: 'Earth element',
  },
  Aquarius: {
    gu: 'કુંભ (Aquarius)',
    hi: 'कुम्भ (Aquarius)',
    en: 'Aquarius',
    lordGu: 'શનિ',
    lordHi: 'शनि',
    lordEn: 'Saturn',
    elementGu: 'વાયુ તત્વ',
    elementHi: 'वायु तत्व',
    elementEn: 'Air element',
  },
  Pisces: {
    gu: 'મીન (Pisces)',
    hi: 'मीन (Pisces)',
    en: 'Pisces',
    lordGu: 'ગુરુ',
    lordHi: 'बृहस्पति',
    lordEn: 'Jupiter',
    elementGu: 'જળ તત્વ',
    elementHi: 'जल तत्व',
    elementEn: 'Water element',
  },
};

// 12 Gujarati Months (Amanta system standard in Gujarat)
const GUJARATI_MONTHS_LIST = [
  { gu: 'કારતક (Kartak)', hi: 'कार्तिक (Kartak)', en: 'Kartak (Kartika)' },
  { gu: 'માગશર (Magshar)', hi: 'मार्गशीर्ष (Magshar)', en: 'Magshar (Margashirsha)' },
  { gu: 'પોષ (Posh)', hi: 'पौष (Posh)', en: 'Posh (Pausha)' },
  { gu: 'મહા (Maha)', hi: 'माघ (Maha)', en: 'Maha (Magha)' },
  { gu: 'ફાગણ (Fagan)', hi: 'फाल्गुन (Fagan)', en: 'Fagan (Phalguna)' },
  { gu: 'ચૈત્ર (Chaitra)', hi: 'चैत्र (Chaitra)', en: 'Chaitra' },
  { gu: 'વૈશાખ (Vaishakh)', hi: 'वैशाख (Vaishakh)', en: 'Vaishakh' },
  { gu: 'જેઠ (Jeth)', hi: 'ज्येष्ठ (Jeth)', en: 'Jeth (Jyeshtha)' },
  { gu: 'અષાઢ (Ashadh)', hi: 'आषाढ़ (Ashadh)', en: 'Ashadh (Ashadha)' },
  { gu: 'શ્રાવણ (Shravan)', hi: 'श्रावण (Shravan)', en: 'Shravan' },
  { gu: 'ભાદરવો (Bhadarvo)', hi: 'भाद्रपद (Bhadarvo)', en: 'Bhadarvo (Bhadrapada)' },
  { gu: 'આસો (Aaso)', hi: 'अश्विन (Aaso)', en: 'Aaso (Ashwin)' },
];

const RITUS_MAP = [
  { nameGu: 'વસંત ઋતુ (Spring)', nameHi: 'वसंत ऋतु (Spring)', nameEn: 'Spring (Vasanta)', months: [4, 5] },
  { nameGu: 'ગ્રીષ્મ ઋતુ (Summer)', nameHi: 'ग्रीष्म ऋतु (Summer)', nameEn: 'Summer (Grishma)', months: [6, 7] },
  { nameGu: 'વર્ષા ઋતુ (Monsoon)', nameHi: 'वर्षा ऋतु (Monsoon)', nameEn: 'Monsoon (Varsha)', months: [8, 9] },
  { nameGu: 'શરદ ઋતુ (Autumn)', nameHi: 'शरद ऋतु (Autumn)', nameEn: 'Autumn (Sharad)', months: [10, 11] },
  { nameGu: 'હેમંત ઋતુ (Pre-Winter)', nameHi: 'हेमंत ऋतु (Pre-Winter)', nameEn: 'Pre-Winter (Hemanta)', months: [0, 1] },
  { nameGu: 'શિશિર ઋતુ (Winter)', nameHi: 'शिशिर ऋतु (Winter)', nameEn: 'Winter (Shishira)', months: [2, 3] },
];

// Multilingual lookup for Avakahada attributes
const GANA_MAP = {
  Deva: { gu: 'દેવ ગણ (Deva)', hi: 'देव गण (Deva)', en: 'Deva' },
  Manushya: { gu: 'મનુષ્ય ગણ (Manushya)', hi: 'मनुष्य गण (Manushya)', en: 'Manushya' },
  Rakshasa: { gu: 'રાક્ષસ ગણ (Rakshasa)', hi: 'राक्षस गण (Rakshasa)', en: 'Rakshasa' },
};

const NADI_MAP = {
  Adi: { gu: 'આદિ નાડી (Vata)', hi: 'आदि नाड़ी (वात)', en: 'Adi (Vata)' },
  Madhya: { gu: 'મધ્ય નાડી (Pitta)', hi: 'मध्य नाड़ी (पित्त)', en: 'Madhya (Pitta)' },
  Antya: { gu: 'અંત્ય નાડી (Kapha)', hi: 'अन्त्य नाड़ी (कफ)', en: 'Antya (Kapha)' },
};

const YONI_MAP = {
  Horse: { gu: 'અશ્વ (Horse)', hi: 'अश्व (Horse)', en: 'Horse' },
  Elephant: { gu: 'ગજ (Elephant)', hi: 'गज (Elephant)', en: 'Elephant' },
  Sheep: { gu: 'મેષ (Sheep)', hi: 'मेष (Sheep)', en: 'Sheep' },
  Serpent: { gu: 'સર્પ (Serpent)', hi: 'सर्प (Serpent)', en: 'Serpent' },
  Snake: { gu: 'સર્પ (Serpent)', hi: 'सर्પ (Serpent)', en: 'Serpent' },
  Dog: { gu: 'શ્વાન (Dog)', hi: 'श्वान (Dog)', en: 'Dog' },
  Cat: { gu: 'માર્જાર (Cat)', hi: 'मार्जार (Cat)', en: 'Cat' },
  Rat: { gu: 'મૂષક (Rat)', hi: 'मूषक (Rat)', en: 'Rat' },
  Cow: { gu: 'ગૌ (Cow)', hi: 'गौ (Cow)', en: 'Cow' },
  Buffalo: { gu: 'મહિષ (Buffalo)', hi: 'महिष (Buffalo)', en: 'Buffalo' },
  Tiger: { gu: 'વ્યાઘ્ર (Tiger)', hi: 'व्याघ्र (Tiger)', en: 'Tiger' },
  Deer: { gu: 'હરિણ (Deer)', hi: 'हरिण (Deer)', en: 'Deer' },
  Monkey: { gu: 'વાનર (Monkey)', hi: 'वानर (Monkey)', en: 'Monkey' },
  Mongoose: { gu: 'નકુલ (Mongoose)', hi: 'नकुल (Mongoose)', en: 'Mongoose' },
  Lion: { gu: 'સિંહ (Lion)', hi: 'सिंह (Lion)', en: 'Lion' },
};

const VARNA_MAP = {
  Brahmin: { gu: 'બ્રાહ્મણ (Brahmin)', hi: 'ब्राह्मण', en: 'Brahmin' },
  Kshatriya: { gu: 'ક્ષત્રિય (Kshatriya)', hi: 'क्षत्रिय', en: 'Kshatriya' },
  Merchant: { gu: 'વૈશ્ય (Vaishya)', hi: 'वैश्य (Merchant)', en: 'Vaishya / Merchant' },
  Vaishya: { gu: 'વૈશ્ય (Vaishya)', hi: 'वैश्य', en: 'Vaishya' },
  Farmer: { gu: 'શૂદ્ર (Shudra)', hi: 'शूद्र', en: 'Shudra' },
  Shudra: { gu: 'શૂદ્ર (Shudra)', hi: 'शूद्र', en: 'Shudra' },
};

// Classical Vashya mapping by Moon Sign
const VASHYA_MAP = [
  { gu: 'ચતુષ્પાદ (Chatushpada)', hi: 'चतुष्पाद', en: 'Chatushpada (Quadruped)' }, // Aries
  { gu: 'ચતુષ્પાદ (Chatushpada)', hi: 'चतुष्पाद', en: 'Chatushpada (Quadruped)' }, // Taurus
  { gu: 'દ્વિપદ / માનવ (Dwipada)', hi: 'द्विपद / मानव', en: 'Dwipada (Human)' }, // Gemini
  { gu: 'જળચર (Jalachara)', hi: 'जलचर', en: 'Jalachara (Water)' }, // Cancer
  { gu: 'વનચર / સિંહ (Vanachara)', hi: 'वनचर / सिंह', en: 'Vanachara (Lion)' }, // Leo
  { gu: 'દ્વિપદ / માનવ (Dwipada)', hi: 'द्विपद / मानव', en: 'Dwipada (Human)' }, // Virgo
  { gu: 'દ્વિપદ / માનવ (Dwipada)', hi: 'द्विपद / मानव', en: 'Dwipada (Human)' }, // Libra
  { gu: 'કીટક (Keeta)', hi: 'कीटक', en: 'Keeta (Insect)' }, // Scorpio
  { gu: 'માનવ / ચતુષ્પાદ', hi: 'मानव / चतुष्पाद', en: 'Dwipada / Chatushpada' }, // Sagittarius
  { gu: 'ચતુષ્પાદ / જળચર', hi: 'चतुष्पाद / जलचर', en: 'Chatushpada / Jalachara' }, // Capricorn
  { gu: 'દ્વિપદ / માનવ (Dwipada)', hi: 'द्विपद / मानव', en: 'Dwipada (Human)' }, // Aquarius
  { gu: 'જળચર (Jalachara)', hi: 'जलचर', en: 'Jalachara (Water)' }, // Pisces
];

const VAAR_MAP = {
  Sunday: { gu: 'રવિવાર (Sunday)', hi: 'रविवार (Sunday)', en: 'Sunday' },
  Monday: { gu: 'સોમવાર (Monday)', hi: 'सोमवार (Monday)', en: 'Monday' },
  Tuesday: { gu: 'મંગળવાર (Tuesday)', hi: 'मंगलवार (Tuesday)', en: 'Tuesday' },
  Wednesday: { gu: 'બુધવાર (Wednesday)', hi: 'बुधवार (Wednesday)', en: 'Wednesday' },
  Thursday: { gu: 'ગુરુવાર (Thursday)', hi: 'गुरुवार (Thursday)', en: 'Thursday' },
  Friday: { gu: 'શુક્રવાર (Friday)', hi: 'शुक्रवार (Friday)', en: 'Friday' },
  Saturday: { gu: 'શનિવાર (Saturday)', hi: 'शनिवार (Saturday)', en: 'Saturday' },
};

const TITHI_MAP = {
  Pratipada: { gu: 'પડવો (Pratipada)', hi: 'प्रतिपदा', en: 'Pratipada' },
  Dwitiya: { gu: 'બીજ (Dwitiya)', hi: 'द्वितीया', en: 'Dwitiya' },
  Tritiya: { gu: 'ત્રીજ (Tritiya)', hi: 'तृतीया', en: 'Tritiya' },
  Chaturthi: { gu: 'ચોથ (Chaturthi)', hi: 'चतुर्थी', en: 'Chaturthi' },
  Panchami: { gu: 'પાંચમ (Panchami)', hi: 'पंचमी', en: 'Panchami' },
  Shashthi: { gu: 'છઠ્ઠ (Shashthi)', hi: 'षष्ठी', en: 'Shashthi' },
  Saptami: { gu: 'સાતમ (Saptami)', hi: 'सप्तमी', en: 'Saptami' },
  Ashtami: { gu: 'આઠમ (Ashtami)', hi: 'अष्टमी', en: 'Ashtami' },
  Navami: { gu: 'નોમ (Navami)', hi: 'नवमी', en: 'Navami' },
  Dashami: { gu: 'દશમ (Dashami)', hi: 'दशमी', en: 'Dashami' },
  Ekadashi: { gu: 'અગિયારસ (Ekadashi)', hi: 'एकादशी', en: 'Ekadashi' },
  Dvadashi: { gu: 'બારસ (Dwadashi)', hi: 'द्वादशी', en: 'Dwadashi' },
  Trayodashi: { gu: 'તેરસ (Trayodashi)', hi: 'त्रयोदशी', en: 'Trayodashi' },
  Chaturdashi: { gu: 'ચૌદશ (Chaturdashi)', hi: 'चतुर्दशी', en: 'Chaturdashi' },
  Purnima: { gu: 'પૂનમ (Purnima)', hi: 'पूर्णिमा', en: 'Purnima' },
  Amavasya: { gu: 'અમાસ (Amavasya)', hi: 'अमावस्या', en: 'Amavasya' },
};

const PADA_NAMES = {
  1: { gu: 'પ્રથમ ચરણ (Pada 1)', hi: 'प्रथम चरण (Pada 1)', en: 'Quarter 1' },
  2: { gu: 'દ્વિતીય ચરણ (Pada 2)', hi: 'द्वितीय चरण (Pada 2)', en: 'Quarter 2' },
  3: { gu: 'તૃતીય ચરણ (Pada 3)', hi: 'तृतीय चरण (Pada 3)', en: 'Quarter 3' },
  4: { gu: 'ચતુર્થ ચરણ (Pada 4)', hi: 'चतुर्थ चरण (Pada 4)', en: 'Quarter 4' },
};

// Convert standard digits to Gujarati numerals
const toGujaratiDigits = (num) => {
  const guDigits = ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'];
  return String(num).replace(/[0-9]/g, (d) => guDigits[Number(d)]);
};

export default function BasicDetails({ kundliData, formData, t = {}, lang = 'gu' }) {
  if (!kundliData) return null;

  const { panchang, ayanamsha, planets } = kundliData;
  const ayanamshaDms = degToDms(ayanamsha).formatted;

  // 1. Astrological Gujarati Month & Paksha Calculation (Amanta System)
  const sunLon = planets?.Sun?.lon ?? 0;
  const moonLon = planets?.Moon?.lon ?? 0;
  const tithiDiff = (moonLon - sunLon + 360) % 360;
  const tithiIndexTotal = Math.floor(tithiDiff / 12);
  const isShuklaPaksha = tithiIndexTotal < 15;
  const daysSinceNewMoon = tithiDiff / 12.190749;
  const sunLonAtNewMoon = (sunLon - daysSinceNewMoon * 0.9856 + 3600) % 360;
  const sunSignAtNewMoon = Math.floor(sunLonAtNewMoon / 30) % 12;
  const gujMonthIdx = (sunSignAtNewMoon + 6) % 12;

  const monthObj = GUJARATI_MONTHS_LIST[gujMonthIdx] || GUJARATI_MONTHS_LIST[0];
  const gujMonthDisplay = monthObj[lang] || monthObj.gu;

  // Paksha string (Separate)
  const pakshaDisplay = isShuklaPaksha
    ? (lang === 'en' ? 'Shukla Paksha (Sud)' : lang === 'hi' ? 'शुक्ल पक्ष (सुद)' : 'શુક્લ પક્ષ (સુદ)')
    : (lang === 'en' ? 'Krishna Paksha (Vad)' : lang === 'hi' ? 'कृष्ण पक्ष (वद)' : 'કૃષ્ણ પક્ષ (વદ)');
  const pakshaTag = isShuklaPaksha ? (lang === 'en' ? 'Sud' : 'સુદ') : (lang === 'en' ? 'Vad' : 'વદ');

  // Vikram Samvat calculation (Separate)
  let birthYear = 1986;
  let birthMonth = 3;
  if (formData?.dob && formData.dob.includes('-')) {
    const parts = formData.dob.split('-').map(Number);
    if (parts[0] > 1000) {
      birthYear = parts[0];
      birthMonth = parts[1];
    }
  }
  const isPastKartakSud =
    birthMonth >= 10 && (gujMonthIdx <= 2 || (gujMonthIdx === 11 && !isShuklaPaksha));
  const vikramSamvatNum = isPastKartakSud ? birthYear + 57 : birthYear + 56;
  const vikramSamvatDisplay =
    lang === 'gu'
      ? `વિ.સં. ${toGujaratiDigits(vikramSamvatNum)} (${vikramSamvatNum})`
      : lang === 'hi'
        ? `वि.सं. ${vikramSamvatNum}`
        : `VS ${vikramSamvatNum}`;

  // Ritu & Ayana (Separate)
  const rituObj = RITUS_MAP.find((r) => r.months.includes(gujMonthIdx)) || RITUS_MAP[0];
  const rituDisplay = rituObj[`name${lang === 'hi' ? 'Hi' : lang === 'en' ? 'En' : 'Gu'}`] || rituObj.nameGu;
  const sunSignIdx = Math.floor((((sunLon % 360) + 360) % 360) / 30) % 12;
  const isUttarayana = sunSignIdx >= 9 || sunSignIdx <= 2;
  const ayanaDisplay = isUttarayana
    ? (lang === 'en' ? 'Uttarayana (Northern course)' : lang === 'hi' ? 'उत्तरायण' : 'ઉત્તરાયણ (ઉત્તર તરફ સૂર્ય ગતિ)')
    : (lang === 'en' ? 'Dakshinayana (Southern course)' : lang === 'hi' ? 'दक्षिणायन' : 'દક્ષિણાયન (દક્ષિણ તરફ સૂર્ય ગતિ)');

  // Sign helper values
  const lagnaInfo = RASHI_DATA[panchang.ascendant] || {};
  const moonSignInfo = RASHI_DATA[panchang.moonSign] || {};
  const sunSignInfo = RASHI_DATA[panchang.sunSign] || {};

  const lagnaDisplay = lagnaInfo[lang] || lagnaInfo.gu || panchang.ascendant;
  const moonSignDisplay = moonSignInfo[lang] || moonSignInfo.gu || panchang.moonSign;
  const sunSignDisplay = sunSignInfo[lang] || sunSignInfo.gu || panchang.sunSign;

  const lagnaLord = lagnaInfo[`lord${lang === 'hi' ? 'Hi' : lang === 'en' ? 'En' : 'Gu'}`] || lagnaInfo.lordGu;
  const lagnaElement = lagnaInfo[`element${lang === 'hi' ? 'Hi' : lang === 'en' ? 'En' : 'Gu'}`] || lagnaInfo.elementGu;

  const sunLord = sunSignInfo[`lord${lang === 'hi' ? 'Hi' : lang === 'en' ? 'En' : 'Gu'}`] || sunSignInfo.lordGu;
  const sunElement = sunSignInfo[`element${lang === 'hi' ? 'Hi' : lang === 'en' ? 'En' : 'Gu'}`] || sunSignInfo.elementGu;

  // Vashya & Paya (Separate)
  const moonSignIdx = Math.floor((((moonLon % 360) + 360) % 360) / 30) % 12;
  const lagnaSignIdx = Math.floor((((planets?.Lagna?.lon ?? 0) % 360) + 360) % 360) / 30;
  const houseFromLagna = ((moonSignIdx - Math.floor(lagnaSignIdx) + 12) % 12) + 1;

  const vashyaObj = VASHYA_MAP[moonSignIdx] || VASHYA_MAP[0];
  const vashyaDisplay = vashyaObj[lang] || vashyaObj.gu;

  let payaDisplay = lang === 'en' ? 'Copper (Tambu)' : 'તાંબા પાયો (Copper)';
  if ([1, 6, 11].includes(houseFromLagna)) {
    payaDisplay = lang === 'en' ? 'Gold (Suvarna)' : lang === 'hi' ? 'स्वर्ण पाया' : 'સુવર્ણ પાયો (Gold)';
  } else if ([2, 5, 9].includes(houseFromLagna)) {
    payaDisplay = lang === 'en' ? 'Silver (Rupa)' : lang === 'hi' ? 'रजत पाया' : 'રૂપા પાયો (Silver)';
  } else if ([3, 7, 10].includes(houseFromLagna)) {
    payaDisplay = lang === 'en' ? 'Copper (Tambu)' : lang === 'hi' ? 'ताम्र पाया' : 'તાંબા પાયો (Copper)';
  } else if ([4, 8, 12].includes(houseFromLagna)) {
    payaDisplay = lang === 'en' ? 'Iron (Loha)' : lang === 'hi' ? 'लौह पाया' : 'લોખંડ પાયો (Iron)';
  }

  // Localized values
  const tithiText = TITHI_MAP[panchang.tithi]?.[lang] || TITHI_MAP[panchang.tithi]?.gu || panchang.tithi;
  const vaarText = VAAR_MAP[panchang.vaar]?.[lang] || VAAR_MAP[panchang.vaar]?.gu || panchang.vaar;
  const padaText = PADA_NAMES[panchang.pada]?.[lang] || PADA_NAMES[panchang.pada]?.gu || `Quarter ${panchang.pada}`;
  const ganaText = GANA_MAP[panchang.gana]?.[lang] || GANA_MAP[panchang.gana]?.gu || panchang.gana;
  const yoniText = YONI_MAP[panchang.yoni]?.[lang] || YONI_MAP[panchang.yoni]?.gu || panchang.yoni;
  const nadiText = NADI_MAP[panchang.nadi]?.[lang] || NADI_MAP[panchang.nadi]?.gu || panchang.nadi;
  const varnaText = VARNA_MAP[panchang.varna]?.[lang] || VARNA_MAP[panchang.varna]?.gu || panchang.varna;

  // Header quick summary text
  const birthTithiName = TITHI_MAP[panchang.tithi]?.gu?.split(' ')[0] || panchang.tithi;
  const monthSummaryBadge = `${monthObj.gu.split(' ')[0]} ${pakshaTag} ${birthTithiName} • વિ.સં. ${toGujaratiDigits(vikramSamvatNum)}`;

  return (
    <div className="rounded-2xl glass-panel p-5 sm:p-7 space-y-6 border border-[var(--border-subtle)] shadow-xs print:border-none print:p-0 print:shadow-none">
      {/* ── Header with Gujarati Month & Samvat Badge ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-medium tracking-tight text-[var(--text-primary)] font-serif flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[var(--text-gold)] shrink-0" aria-hidden="true" />
            <span>{t.avakhadaChakra || 'અવકહડા ચક્ર અને પંચાંગ વિગત'}</span>
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5 font-sans">
            {lang === 'hi'
              ? 'जन्म लग्न, पंचांग तत्व, गुजराती मास एवं अवकहड़ा प्रकृति'
              : lang === 'en'
                ? 'Birth Ascendant, Panchang Essentials, Lunar Month & Avakahada Traits'
                : 'જન્મ લગ્ન, પંચાંગ તત્ત્વો, ગુજરાતી માસ અને અવકહડા પ્રકૃતિ આધારસ્તંભ'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Gujarati Month & Samvat Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[var(--gold-600)] bg-[var(--gold-100)] border border-[var(--gold-300)]/70">
            <Calendar className="h-3.5 w-3.5 text-[var(--gold-500)]" />
            <span>{monthSummaryBadge}</span>
          </div>

          {/* Lahiri Ayanamsha Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[var(--text-secondary)] bg-[var(--depth-2)] border border-[var(--border-subtle)]">
            <CircleDot className="h-3 w-3 text-[var(--text-gold)]" />
            <span>Chitra paksha (Lahiri)</span>
          </div>
        </div>
      </div>

      {/* ── Tier 1: Core Celestial Triad (મુખ્ય ત્રિ-બિંદુ) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* 1. Lagna Card */}
        <div className="rounded-xl glass-card p-4 space-y-2 border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1.5">
              <Compass className="h-4 w-4 text-[var(--text-gold)]" />
              <span>{t.ascendant || 'જન્મ લગ્ન (Lagna)'}</span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] bg-[var(--depth-2)] px-2 py-0.5 rounded-md">
              D1 Asc
            </span>
          </div>
          <div className="font-serif text-lg font-medium text-[var(--text-primary)] tracking-tight">
            {lagnaDisplay}
          </div>
          <div className="text-[11px] text-[var(--text-muted)] flex items-center gap-2 pt-0.5 border-t border-[var(--border-subtle)]/60 font-sans">
            <span>
              {lang === 'en' ? 'Lord: ' : 'લગ્નેશ: '}
              <strong className="text-[var(--text-secondary)] font-medium">{lagnaLord}</strong>
            </span>
            <span>•</span>
            <span>{lagnaElement}</span>
          </div>
        </div>

        {/* 2. Chandra Rashi & Nakshatra */}
        <div className="rounded-xl glass-card p-4 space-y-2 border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1.5">
              <Moon className="h-4 w-4 text-[var(--text-gold)]" />
              <span>{t.moonSign || 'ચંદ્ર રાશિ (Moon sign)'}</span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] bg-[var(--depth-2)] px-2 py-0.5 rounded-md">
              Janma Rashi
            </span>
          </div>
          <div className="font-serif text-lg font-medium text-[var(--text-primary)] tracking-tight">
            {moonSignDisplay}
          </div>
          <div className="text-[11px] text-[var(--text-muted)] flex items-center gap-2 pt-0.5 border-t border-[var(--border-subtle)]/60 font-sans truncate">
            <span>
              {lang === 'en' ? 'Nakshatra: ' : 'નક્ષત્ર: '}
              <strong className="text-[var(--text-secondary)] font-medium">{panchang.nakshatra}</strong>
            </span>
            <span>•</span>
            <span className="truncate">{padaText}</span>
          </div>
        </div>

        {/* 3. Surya Rashi */}
        <div className="rounded-xl glass-card p-4 space-y-2 border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1.5">
              <Sun className="h-4 w-4 text-[var(--text-gold)]" />
              <span>{t.sunSign || 'સૂર્ય રાશિ (Sun sign)'}</span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] bg-[var(--depth-2)] px-2 py-0.5 rounded-md">
              Surya Rashi
            </span>
          </div>
          <div className="font-serif text-lg font-medium text-[var(--text-primary)] tracking-tight">
            {sunSignDisplay}
          </div>
          <div className="text-[11px] text-[var(--text-muted)] flex items-center gap-2 pt-0.5 border-t border-[var(--border-subtle)]/60 font-sans">
            <span>
              {lang === 'en' ? 'Lord: ' : 'રાશિપતિ: '}
              <strong className="text-[var(--text-secondary)] font-medium">{sunLord}</strong>
            </span>
            <span>•</span>
            <span>{sunElement}</span>
          </div>
        </div>
      </div>

      {/* ── Tier 2 & 3: Two Thematic Panels Side-by-Side (All Details Shown Separately) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Panel A: Panchang Essentials (9 Separate Items) */}
        <div className="rounded-xl glass-card p-5 space-y-3.5 border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)]/80 pb-2.5">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[var(--text-gold)]" />
              <h3 className="font-serif text-sm font-medium text-[var(--text-primary)] tracking-tight">
                {lang === 'hi'
                  ? 'पंचांग तत्व (Panchang essentials)'
                  : lang === 'en'
                    ? 'Panchang Essentials (Vedic time)'
                    : 'પંચાંગ તત્ત્વો (Panchang essentials)'}
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">પંચાંગ વિગત</span>
          </div>

          <div className="divide-y divide-[var(--border-subtle)]/60 text-xs">
            {/* 1. Gujarati Month (Separated) */}
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-[var(--text-gold)]" />
                <span>{lang === 'en' ? 'Gujarati month' : lang === 'hi' ? 'गुजराती मास' : 'ગુજરાતી માસ'}</span>
              </span>
              <span className="font-medium text-[var(--text-primary)] font-serif text-sm">
                {gujMonthDisplay}
              </span>
            </div>

            {/* 2. Paksha (Separated) */}
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <Moon className="h-3.5 w-3.5 text-[var(--text-gold)]" />
                <span>{lang === 'en' ? 'Paksha' : lang === 'hi' ? 'पक्ष' : 'પક્ષ'}</span>
              </span>
              <span className="font-medium text-[var(--text-primary)] font-serif text-sm">
                {pakshaDisplay}
              </span>
            </div>

            {/* 3. Vikram Samvat (Separated) */}
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <Award className="h-3.5 w-3.5 text-[var(--text-gold)]" />
                <span>{lang === 'en' ? 'Vikram Samvat' : lang === 'hi' ? 'विक्रम संवत' : 'વિક્રમ સંવત'}</span>
              </span>
              <span className="font-mono text-xs font-semibold text-[var(--text-primary)] bg-[var(--depth-2)] px-2 py-0.5 rounded-md border border-[var(--border-subtle)]">
                {vikramSamvatDisplay}
              </span>
            </div>

            {/* 4. Tithi (Separated) */}
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <Moon className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>{t.tithi || 'તિથિ (Tithi)'}</span>
              </span>
              <span className="font-medium text-[var(--text-primary)] font-serif text-sm">
                {tithiText}
              </span>
            </div>

            {/* 5. Vaar (Separated) */}
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <Sun className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>{t.vaar || 'વાર (Vedic day)'}</span>
              </span>
              <span className="font-medium text-[var(--text-primary)] font-serif text-sm">
                {vaarText}
              </span>
            </div>

            {/* 6. Nakshatra (Separated) */}
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>{t.nakshatra || 'નક્ષત્ર (Nakshatra)'}</span>
              </span>
              <span className="font-medium text-[var(--text-primary)] font-serif text-sm">
                {panchang.nakshatra}
              </span>
            </div>

            {/* 7. Nakshatra Lord (Separated) */}
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <Compass className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>{t.nakshatraLord || 'નક્ષત્ર સ્વામી (Lord)'}</span>
              </span>
              <span className="font-medium text-[var(--text-primary)] font-serif text-sm">
                {t[panchang.nakshatraLord] || panchang.nakshatraLord}
              </span>
            </div>

            {/* 8. Pada (Separated) */}
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <Feather className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>{t.pada || 'ચરણ (Pada)'}</span>
              </span>
              <span className="font-medium text-[var(--text-primary)] font-sans">
                {padaText}
              </span>
            </div>

            {/* 9. Lahiri Ayanamsha (Separated) */}
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <Compass className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>{t.ayanamsha || 'લાહિડી અયનાંશ'}</span>
              </span>
              <span className="font-mono text-xs font-semibold text-[var(--text-primary)] tracking-wide bg-[var(--depth-2)] px-2 py-0.5 rounded-md border border-[var(--border-subtle)]">
                {ayanamshaDms}
              </span>
            </div>
          </div>
        </div>

        {/* Panel B: Avakahada Chakra Attributes & Cosmic Nature (9 Separate Items) */}
        <div className="rounded-xl glass-card p-5 space-y-3.5 border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)]/80 pb-2.5">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[var(--text-gold)]" />
              <h3 className="font-serif text-sm font-medium text-[var(--text-primary)] tracking-tight">
                {lang === 'hi'
                  ? 'अवकहड़ा चक्र एवं प्रकृति'
                  : lang === 'en'
                    ? 'Avakahada Traits & Temperament'
                    : 'અવકહડા ચક્ર અને પ્રકૃતિ'}
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">અષ્ટકૂટ ગુણ</span>
          </div>

          <div className="divide-y divide-[var(--border-subtle)]/60 text-xs">
            {/* 1. Gana (Separated) */}
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>{t.gana || 'ગણ (Gana)'}</span>
              </span>
              <span className="font-medium text-[var(--text-primary)] font-serif text-sm">
                {ganaText}
              </span>
            </div>

            {/* 2. Yoni (Separated) */}
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <Feather className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>{t.yoni || 'યોનિ (Yoni symbol)'}</span>
              </span>
              <span className="font-medium text-[var(--text-primary)] font-serif text-sm">
                {yoniText}
              </span>
            </div>

            {/* 3. Nadi (Separated) */}
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <Flame className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>{t.nadi || 'નાડી (Nadi element)'}</span>
              </span>
              <span className="font-medium text-[var(--text-primary)] font-serif text-sm">
                {nadiText}
              </span>
            </div>

            {/* 4. Varna (Separated) */}
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <Award className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>{t.varna || 'વર્ણ (Varna category)'}</span>
              </span>
              <span className="font-medium text-[var(--text-primary)] font-serif text-sm">
                {varnaText}
              </span>
            </div>

            {/* 5. Vashya (Separated) */}
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>{lang === 'en' ? 'Vashya' : lang === 'hi' ? 'वश्य' : 'વશ્ય (Vashya)'}</span>
              </span>
              <span className="font-medium text-[var(--text-primary)] font-serif text-sm">
                {vashyaDisplay}
              </span>
            </div>

            {/* 6. Paya (Separated) */}
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <Crown className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>{lang === 'en' ? 'Paya (Metal Footing)' : lang === 'hi' ? 'पाया' : 'પાયો (Metal footing)'}</span>
              </span>
              <span className="font-medium text-[var(--text-primary)] font-serif text-sm">
                {payaDisplay}
              </span>
            </div>

            {/* 7. Sign Element / Tatwa (Separated) */}
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <Wind className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>{lang === 'en' ? 'Rashi element' : lang === 'hi' ? 'राशि तत्व' : 'રાશિ તત્વ (Element)'}</span>
              </span>
              <span className="font-medium text-[var(--text-primary)] font-serif text-sm">
                {moonSignInfo.elementGu || 'વાયુ તત્વ'}
              </span>
            </div>

            {/* 8. Season / Ritu (Separated) */}
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <CloudSun className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>{lang === 'en' ? 'Season (Ritu)' : lang === 'hi' ? 'ऋतु' : 'ઋતુ (Season)'}</span>
              </span>
              <span className="font-medium text-[var(--text-primary)] font-serif text-sm">
                {rituDisplay}
              </span>
            </div>

            {/* 9. Ayana (Separated) */}
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <Sun className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>{lang === 'en' ? 'Ayana (Solar course)' : lang === 'hi' ? 'अयन' : 'અયન (Ayana)'}</span>
              </span>
              <span className="font-medium text-[var(--text-primary)] font-serif text-sm">
                {ayanaDisplay}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
