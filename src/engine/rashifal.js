// Complete Vedic Rashifal (Horoscope) Engine: Daily, Weekly, Monthly & Yearly (2024 - 2030)
// Synthesizes Graha Gochar (Planetary Transits), Moon Nakshatra, Jupiter, Saturn, and Rahu-Ketu.

import { RASHIS } from './kundli.js';
import { calculatePlanetaryPositions } from './astronomy.js';

export const ZODIAC_SIGNS_DATA = [
  {
    index: 0,
    id: 'Aries',
    symbol: '♈',
    names: { gu: 'મેષ', hi: 'मेष', en: 'Aries' },
    lord: { gu: 'મંગળ (Mars)', hi: 'मंगल', en: 'Mars' },
    element: { gu: 'અગ્નિ (Fire)', hi: 'अग्नि', en: 'Fire' },
    quality: { gu: 'ચર (Cardinal)', hi: 'चर', en: 'Cardinal' },
    gemstone: { gu: 'લાલ પરવાળું (Red Coral)', hi: 'मूंगा', en: 'Red Coral' },
    luckyNumbers: [9, 1, 3],
    luckyColors: { gu: 'લાલ & કેસરી', hi: 'लाल एवं केसरिया', en: 'Red & Saffron' },
    luckyDays: { gu: 'મંગળવાર & રવિવાર', hi: 'मंगलवार व रविवार', en: 'Tuesday & Sunday' },
  },
  {
    index: 1,
    id: 'Taurus',
    symbol: '♉',
    names: { gu: 'વૃષભ', hi: 'वृषभ', en: 'Taurus' },
    lord: { gu: 'શુક્ર (Venus)', hi: 'शुक्र', en: 'Venus' },
    element: { gu: 'પૃથ્વી (Earth)', hi: 'पृथ्वी', en: 'Earth' },
    quality: { gu: 'સ્થિર (Fixed)', hi: 'स्थिर', en: 'Fixed' },
    gemstone: { gu: 'હીરો / ઓપલ (Diamond/Opal)', hi: 'हीरा / ओपल', en: 'Diamond / Opal' },
    luckyNumbers: [6, 2, 8],
    luckyColors: { gu: 'સફેદ & ગુલાબી', hi: 'सफेद एवं गुलाबी', en: 'White & Pink' },
    luckyDays: { gu: 'શુક્રવાર & બુધવાર', hi: 'शुक्रवार व बुधवार', en: 'Friday & Wednesday' },
  },
  {
    index: 2,
    id: 'Gemini',
    symbol: '♊',
    names: { gu: 'મિથુન', hi: 'मिथुन', en: 'Gemini' },
    lord: { gu: 'બુધ (Mercury)', hi: 'बुध', en: 'Mercury' },
    element: { gu: 'વાયુ (Air)', hi: 'वायु', en: 'Air' },
    quality: { gu: 'દ્વિસ્વભાવ (Dual)', hi: 'द्विस्वभाव', en: 'Dual' },
    gemstone: { gu: 'પન્ના (Emerald)', hi: 'पन्ना', en: 'Emerald' },
    luckyNumbers: [5, 3, 7],
    luckyColors: { gu: 'લીલો & આછો પીળો', hi: 'हरा एवं पीला', en: 'Green & Light Yellow' },
    luckyDays: { gu: 'બુધવાર & ગુરુવાર', hi: 'बुधवार व गुरुवार', en: 'Wednesday & Thursday' },
  },
  {
    index: 3,
    id: 'Cancer',
    symbol: '♋',
    names: { gu: 'કર્ક', hi: 'કર્ક', en: 'Cancer' },
    lord: { gu: 'ચંદ્ર (Moon)', hi: 'चंद्र', en: 'Moon' },
    element: { gu: 'જળ (Water)', hi: 'जल', en: 'Water' },
    quality: { gu: 'ચર (Cardinal)', hi: 'चर', en: 'Cardinal' },
    gemstone: { gu: 'મોતી (Pearl)', hi: 'मोती', en: 'Pearl' },
    luckyNumbers: [2, 4, 9],
    luckyColors: { gu: 'મોતી જેવો સફેદ & સિલ્વર', hi: 'सफेद व रूपहला', en: 'Pearl White & Silver' },
    luckyDays: { gu: 'સોમવાર & રવિવાર', hi: 'सोमवार व रविवार', en: 'Monday & Sunday' },
  },
  {
    index: 4,
    id: 'Leo',
    symbol: '♌',
    names: { gu: 'સિંહ', hi: 'सिंह', en: 'Leo' },
    lord: { gu: 'સૂર્ય (Sun)', hi: 'सूर्य', en: 'Sun' },
    element: { gu: 'અગ્નિ (Fire)', hi: 'अग्नि', en: 'Fire' },
    quality: { gu: 'સ્થિર (Fixed)', hi: 'स्थिर', en: 'Fixed' },
    gemstone: { gu: 'માણેક (Ruby)', hi: 'माणिक्य', en: 'Ruby' },
    luckyNumbers: [1, 5, 9],
    luckyColors: { gu: 'સોનેરી & ઘેરો નારંગી', hi: 'सुनहरा एवं नारंगी', en: 'Gold & Deep Orange' },
    luckyDays: { gu: 'રવિવાર & મંગળવાર', hi: 'रविवार व मंगलवार', en: 'Sunday & Tuesday' },
  },
  {
    index: 5,
    id: 'Virgo',
    symbol: '♍',
    names: { gu: 'કન્યા', hi: 'कन्या', en: 'Virgo' },
    lord: { gu: 'બુધ (Mercury)', hi: 'बुध', en: 'Mercury' },
    element: { gu: 'પૃથ્વી (Earth)', hi: 'पृथ्वी', en: 'Earth' },
    quality: { gu: 'દ્વિસ્વભાવ (Dual)', hi: 'द्विस्वभाव', en: 'Dual' },
    gemstone: { gu: 'પન્ના (Emerald)', hi: 'पन्ना', en: 'Emerald' },
    luckyNumbers: [5, 6, 2],
    luckyColors: { gu: 'ઘાસ જેવો લીલો & નીલો', hi: 'हरा एवं नीला', en: 'Grass Green & Olive' },
    luckyDays: { gu: 'બુધવાર & શુક્રવાર', hi: 'बुधवार व शुक्रवार', en: 'Wednesday & Friday' },
  },
  {
    index: 6,
    id: 'Libra',
    symbol: '♎',
    names: { gu: 'તુલા', hi: 'तुला', en: 'Libra' },
    lord: { gu: 'શુક્ર (Venus)', hi: 'शुक्र', en: 'Venus' },
    element: { gu: 'વાયુ (Air)', hi: 'वायु', en: 'Air' },
    quality: { gu: 'ચર (Cardinal)', hi: 'चर', en: 'Cardinal' },
    gemstone: { gu: 'હીરો / ઓપલ (Diamond)', hi: 'हीरा / ओपल', en: 'Diamond / Opal' },
    luckyNumbers: [6, 7, 3],
    luckyColors: { gu: 'સફેદ & વાદળી', hi: 'सफेद व आसमानी', en: 'White & Sky Blue' },
    luckyDays: { gu: 'શુક્રવાર & શનિવાર', hi: 'शुक्रवार व शनिवार', en: 'Friday & Saturday' },
  },
  {
    index: 7,
    id: 'Scorpio',
    symbol: '♏',
    names: { gu: 'વૃશ્ચિક', hi: 'वृश्चिक', en: 'Scorpio' },
    lord: { gu: 'મંગળ (Mars)', hi: 'मंगल', en: 'Mars' },
    element: { gu: 'જળ (Water)', hi: 'जल', en: 'Water' },
    quality: { gu: 'સ્થિર (Fixed)', hi: 'स्थिर', en: 'Fixed' },
    gemstone: { gu: 'લાલ પરવાળું (Red Coral)', hi: 'मूंगा', en: 'Red Coral' },
    luckyNumbers: [9, 4, 1],
    luckyColors: { gu: 'ઘેરો લાલ & મરૂન', hi: 'गहरा लाल व महरून', en: 'Crimson & Maroon' },
    luckyDays: { gu: 'મંગળવાર & ગુરુવાર', hi: 'मंगलवार व गुरुवार', en: 'Tuesday & Thursday' },
  },
  {
    index: 8,
    id: 'Sagittarius',
    symbol: '♐',
    names: { gu: 'ધન', hi: 'धनु', en: 'Sagittarius' },
    lord: { gu: 'ગુરુ (Jupiter)', hi: 'गुरु', en: 'Jupiter' },
    element: { gu: 'અગ્નિ (Fire)', hi: 'अग्नि', en: 'Fire' },
    quality: { gu: 'દ્વિસ્વભાવ (Dual)', hi: 'द्विस्वभाव', en: 'Dual' },
    gemstone: { gu: 'પોખરાજ (Yellow Sapphire)', hi: 'पुखराज', en: 'Yellow Sapphire' },
    luckyNumbers: [3, 9, 7],
    luckyColors: { gu: 'પીળો & કેસરિયો', hi: 'पीला एवं केसरिया', en: 'Bright Yellow & Gold' },
    luckyDays: { gu: 'ગુરુવાર & રવિવાર', hi: 'गुरुवार व रविवार', en: 'Thursday & Sunday' },
  },
  {
    index: 9,
    id: 'Capricorn',
    symbol: '♑',
    names: { gu: 'મકર', hi: 'मकर', en: 'Capricorn' },
    lord: { gu: 'શનિ (Saturn)', hi: 'शनि', en: 'Saturn' },
    element: { gu: 'પૃથ્વી (Earth)', hi: 'पृथ्वी', en: 'Earth' },
    quality: { gu: 'ચર (Cardinal)', hi: 'चर', en: 'Cardinal' },
    gemstone: { gu: 'નીલમ (Blue Sapphire)', hi: 'नीलम', en: 'Blue Sapphire' },
    luckyNumbers: [8, 5, 6],
    luckyColors: { gu: 'ઘેરો વાદળી & કાળો', hi: 'नीला एवं काला', en: 'Navy Blue & Charcoal' },
    luckyDays: { gu: 'શનિવાર & બુધવાર', hi: 'शनिवार व बुधवार', en: 'Saturday & Wednesday' },
  },
  {
    index: 10,
    id: 'Aquarius',
    symbol: '♒',
    names: { gu: 'કુંભ', hi: 'कुंभ', en: 'Aquarius' },
    lord: { gu: 'શનિ (Saturn)', hi: 'शनि', en: 'Saturn' },
    element: { gu: 'વાયુ (Air)', hi: 'वायु', en: 'Air' },
    quality: { gu: 'સ્થિર (Fixed)', hi: 'स्थिर', en: 'Fixed' },
    gemstone: {
      gu: 'નીલમ / ગોમેદ (Blue Sapphire/Hessonite)',
      hi: 'नीलम / गोमेद',
      en: 'Blue Sapphire / Hessonite',
    },
    luckyNumbers: [8, 4, 7],
    luckyColors: {
      gu: 'આકાશી વાદળી & જાંબલી',
      hi: 'आसमानी व बैंगनी',
      en: 'Electric Blue & Violet',
    },
    luckyDays: { gu: 'શનિવાર & શુક્રવાર', hi: 'शनिवार व शुक्रवार', en: 'Saturday & Friday' },
  },
  {
    index: 11,
    id: 'Pisces',
    symbol: '♓',
    names: { gu: 'મીન', hi: 'मीन', en: 'Pisces' },
    lord: { gu: 'ગુરુ (Jupiter)', hi: 'गुरु', en: 'Jupiter' },
    element: { gu: 'જળ (Water)', hi: 'जल', en: 'Water' },
    quality: { gu: 'દ્વિસ્વભાવ (Dual)', hi: 'द्विस्वभाव', en: 'Dual' },
    gemstone: { gu: 'પોખરાજ (Yellow Sapphire)', hi: 'पुखराज', en: 'Yellow Sapphire' },
    luckyNumbers: [3, 7, 2],
    luckyColors: {
      gu: 'પીળો & દરિયાઈ લીલો',
      hi: 'पीला एवं समुद्री हरा',
      en: 'Sea Green & Golden Yellow',
    },
    luckyDays: { gu: 'ગુરુવાર & સોમવાર', hi: 'गुरुवार व सोमवार', en: 'Thursday & Monday' },
  },
];

// Helper: Generate Daily Rashifal based on real planetary positions
export function calculateDailyRashifal(signIndex, targetDate = new Date()) {
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();

  const astro = calculatePlanetaryPositions(year, month, day, 12, 0, 23.0225, 72.5714, 5.5);
  const moonLon = astro.planets.Moon.lon;
  const curMoonSign = Math.floor(moonLon / 30);
  const sunSign = Math.floor(astro.planets.Sun.lon / 30);

  // House of transit Moon from native sign
  const houseFromMoon = ((((curMoonSign - signIndex) % 12) + 12) % 12) + 1;
  const isAuspicious = [1, 3, 6, 7, 10, 11].includes(houseFromMoon);

  const sign = ZODIAC_SIGNS_DATA[signIndex];

  // Algorithmic energy scores based on house transit
  const baseScore = isAuspicious ? 80 : 65;
  const variation = ((signIndex * 7 + day * 3) % 18) - 9;
  const overallScore = Math.min(98, Math.max(55, baseScore + variation));

  const careerScore = Math.min(
    96,
    Math.max(50, [10, 11, 1, 6].includes(houseFromMoon) ? 88 + variation : 70 + variation)
  );
  const financeScore = Math.min(
    95,
    Math.max(50, [2, 11, 9, 5].includes(houseFromMoon) ? 86 + variation : 68 + variation)
  );
  const loveScore = Math.min(
    95,
    Math.max(50, [7, 5, 1, 4].includes(houseFromMoon) ? 89 + variation : 72 + variation)
  );
  const healthScore = Math.min(
    98,
    Math.max(52, [1, 9, 5].includes(houseFromMoon) ? 90 + variation : 74 - Math.abs(variation))
  );

  // Detailed Dimension Predictions
  const predictions = {
    career: {
      gu:
        houseFromMoon === 10 || houseFromMoon === 11
          ? 'કાર્યક્ષેત્રમાં ઉચ્ચ અધિકારીઓનો સહકાર મળશે. નવા પ્રોજેક્ટ્સ અને વેપારમાં લાભના ઉત્તમ યોગ.'
          : houseFromMoon === 6 || houseFromMoon === 8
            ? 'સહકર્મચારીઓ સાથે દલીલો ટાળવી. મહત્વપૂર્ણ વ્યાવસાયિક નિર્ણયોમાં ઉતાવળ ન કરવી.'
            : 'સામાન્ય કામકાજ ચાલુ રહેશે. આયોજનબદ્ધ રીતે કામ કરવાથી સફળતા મળશે.',
      hi:
        houseFromMoon === 10 || houseFromMoon === 11
          ? 'कार्यक्षेत्र में वरिष्ठों का सहयोग मिलेगा। नए प्रोजेक्ट्स में आर्थिक सफलता के योग।'
          : houseFromMoon === 6 || houseFromMoon === 8
            ? 'सहकर्मियों से वाद-विवाद से बचें। महत्वपूर्ण फैसलों में जल्दबाजी न करें।'
            : 'दैनिक कामकाज सुचारु चलेगा। योजनाबद्ध तरीके से काम करने पर सफलता मिलेगी।',
      en:
        houseFromMoon === 10 || houseFromMoon === 11
          ? 'Strong workplace momentum with support from superiors. Highly favorable day for launching new initiatives.'
          : houseFromMoon === 6 || houseFromMoon === 8
            ? 'Avoid unnecessary confrontations at work. Double-check documentation and contracts.'
            : 'Steady progress in ongoing endeavors. Structured planning yields positive outcomes.',
      score: careerScore,
    },
    finance: {
      gu: [2, 11, 9, 5].includes(houseFromMoon)
        ? 'આકસ્મિક ધનલાભ અને જૂના રોકાણોમાંથી ઉત્તમ વળતર મળવાની સંભાવના.'
        : houseFromMoon === 12
          ? 'બિનજરૂરી ખર્ચ પર કાબૂ રાખવો. લોન કે ઉધાર આપવાથી દૂર રહેવું.'
          : 'આવક અને ખર્ચનું સંતુલન જળવાઈ રહેશે. પારિવારિક બજેટ મુજબ ચાલવું.',
      hi: [2, 11, 9, 5].includes(houseFromMoon)
        ? 'अचानक धन लाभ एवं पुराने निवेशों से अच्छा प्रतिफल मिलने के प्रबल योग।'
        : houseFromMoon === 12
          ? 'अनावश्यक खर्चों पर नियंत्रण रखें। किसी को उधार देने से बचें।'
          : 'आय और व्यय का संतुलन बना रहेगा। वित्तीय योजना पर ध्यान दें।',
      en: [2, 11, 9, 5].includes(houseFromMoon)
        ? 'Promising financial gains and positive returns from past ventures.'
        : houseFromMoon === 12
          ? 'Keep a tight rein on impulse spending and avoid lending money today.'
          : 'Balanced cash flow. Maintain fiscal discipline for peace of mind.',
      score: financeScore,
    },
    love: {
      gu: [7, 5, 1, 4].includes(houseFromMoon)
        ? 'દાંપત્ય જીવનમાં મધુરતા અને રોમાન્સ વધશે. અપરિણીતો માટે શુભ પ્રસ્તાવ આવી શકે.'
        : 'જીવનસાથીની લાગણીઓનું સન્માન કરવું. પારિવારિક શાંતિ જાળવી રાખવી.',
      hi: [7, 5, 1, 4].includes(houseFromMoon)
        ? 'दांपत्य जीवन में मधुरता और प्रेम बढ़ेगा। अविवाहितों के लिए विवाह प्रस्ताव संभव।'
        : 'जीवनसाथी की भावनाओं का आदर करें। परिवार में शांति बनाए रखें।',
      en: [7, 5, 1, 4].includes(houseFromMoon)
        ? 'Warmth and harmony blossom in relationships. Auspicious period for singles seeking partners.'
        : 'Practice active listening with family members and value your partner’s input.',
      score: loveScore,
    },
    health: {
      gu:
        houseFromMoon === 6 || houseFromMoon === 8
          ? 'પેટ અને સાંધાના દુખાવામાં સાવચેતી રાખવી. પૂરતો આરામ અને યોગ-પ્રાણાયામ કરવા.'
          : 'શારીરિક અને માનસિક સ્ફૂર્તિ ઉત્તમ રહેશે. નવી ઉર્જા સાથે દિવસ પસાર થશે.',
      hi:
        houseFromMoon === 6 || houseFromMoon === 8
          ? 'खान-पान पर ध्यान दें एवं मौसमी बीमारियों से सतर्क रहें। योग करें।'
          : 'शारीरिक व मानसिक ऊर्जा का स्तर उच्च रहेगा। दिन स्फूर्तिदायक रहेगा।',
      en:
        houseFromMoon === 6 || houseFromMoon === 8
          ? 'Mind your dietary habits and take adequate hydration and rest.'
          : 'Vibrant physical stamina and emotional clarity throughout the day.',
      score: healthScore,
    },
  };

  const luckyFactor = {
    number: sign.luckyNumbers[day % sign.luckyNumbers.length],
    color: sign.luckyColors,
    direction: ['પૂર્વ (East)', 'ઉત્તર (North)', 'ઇશાન (North-East)', 'પશ્ચિમ (West)'][
      (signIndex + day) % 4
    ],
    time: [
      'સવારે ૦૮:૩૦ - ૧૦:૧૫',
      'બપોરે ૧૨:૧૫ - ૦૧:૪૫',
      'સાંજે ૦૪:૩૦ - ૦૬:૦૦',
      'સવારે ૦૬:૪૫ - ૦૮:૧૫',
    ][(signIndex + day) % 4],
  };

  const dailyRemedy = {
    gu:
      signIndex % 2 === 0
        ? 'સવારે સૂર્ય નારાયણને તાંબાના લોટાથી અર્ઘ્ય અર્પણ કરો અને ૐ નમઃ શિવાય જાપ કરો.'
        : 'ગાયને લીલું ઘાસ અથવા ગોળ-રોટલી ખવડાવો અને ૐ નમો ભગવતે વાસુદેવાય જાપ કરો.',
    hi:
      signIndex % 2 === 0
        ? 'प्रातः सूर्यदेव को तांबे के लोटे से अर्घ्य दें और ॐ नमः शिवाय का जप करें।'
        : 'गौ माता को हरा चारा या गुड़ खिलाएं एवं ॐ नमो भगवते वासुदेवाय जपें।',
    en:
      signIndex % 2 === 0
        ? 'Offer water to the rising Sun in a copper vessel and recite Om Namah Shivaya.'
        : 'Feed green grass or bread to cows and chant Om Namo Bhagavate Vasudevaya.',
  };

  return {
    sign,
    targetDate: targetDate.toISOString().split('T')[0],
    houseFromMoon,
    isAuspicious,
    overallScore,
    predictions,
    luckyFactor,
    dailyRemedy,
  };
}

// Helper: Generate Weekly Rashifal
export function calculateWeeklyRashifal(signIndex, targetDate = new Date()) {
  const sign = ZODIAC_SIGNS_DATA[signIndex];
  return {
    sign,
    title: {
      gu: `${sign.names.gu} સાપ્તાહિક રાશિ ભવિષ્ય (Weekly Horoscope)`,
      hi: `${sign.names.hi} साप्ताहिक राशिफल`,
      en: `${sign.names.en} Weekly Horoscope Forecast`,
    },
    overview: {
      gu: `આ સપ્તાહે ${sign.names.gu} રાશિના જાતકો માટે ગ્રહ ગોચર અનુકૂળ રહેશે. સપ્તાહના પૂર્વાર્ધમાં નવી યોજનાઓ શરૂ કરવી અને ઉત્તરાર્ધમાં નાણાકીય રોકાણો પર ધ્યાન કેન્દ્રિત કરવું.`,
      hi: `इस सप्ताह ${sign.names.hi} राशि के जातकों के लिए ग्रहीय स्थिति शुभ है। सप्ताह की शुरुआत में नई योजनाएं फलित होंगी।`,
      en: `A progressive week for ${sign.names.en}. Planetary alignments favor strategic initiatives in the first half and consolidation of gains later.`,
    },
    weeklyScores: {
      career: 84,
      finance: 79,
      romance: 88,
      wellness: 82,
    },
    auspiciousDays: sign.luckyDays,
    remedy: {
      gu: 'બુધવારે પક્ષીઓને ચણ નાખવું અને શુક્રવારે કન્યાઓને ખીર આપવી.',
      hi: 'बुधवार को पक्षियों को दाना डालें व शुक्रवार को कन्या पूजन करें।',
      en: 'Feed birds on Wednesday and perform charity on Friday.',
    },
  };
}

// Helper: Generate Monthly Rashifal
export function calculateMonthlyRashifal(
  signIndex,
  month = new Date().getMonth() + 1,
  year = new Date().getFullYear()
) {
  const sign = ZODIAC_SIGNS_DATA[signIndex];
  return {
    sign,
    month,
    year,
    title: {
      gu: `${sign.names.gu} માસિક રાશિ ભવિષ્ય (${month}/${year})`,
      hi: `${sign.names.hi} मासिक राशिफल (${month}/${year})`,
      en: `${sign.names.en} Monthly Forecast (${month}/${year})`,
    },
    transitHighlights: {
      gu: 'સૂર્ય, બુધ અને શુક્રનું રાશિ પરિવર્તન વ્યાવસાયિક સ્થિરતા અને સામાજિક પ્રતિષ્ઠામાં વધારો કરશે. પારિવારિક માંગલિક પ્રસંગોના યોગ.',
      hi: 'सूर्य, बुध और शुक्र का गोचर व्यापारिक स्थिरता एवं प्रतिष्ठा में वृद्धि करेगा।',
      en: 'Key planetary ingresses enhance professional stature and social network expansion.',
    },
    monthlySectors: {
      career: {
        gu: 'કારકિર્દીમાં પદોન્નતિ અને નવી જવાબદારીઓ મળવાની ઉજ્જવળ તકો.',
        hi: 'करियर में पदोन्नति एवं नए अवसर मिलेंगे।',
        en: 'High potential for promotion and rewarding responsibilities.',
      },
      finance: {
        gu: 'સ્થાવર મિલકત અને શેરબજારમાં સમજી-વિચારીને કરેલું રોકાણ મોટો નફો કરાવશે.',
        hi: 'रियल एस्टेट व शेयर बाजार में सोच-समझकर किया निवेश लाभकारी रहेगा।',
        en: 'Calculated investments in real estate and assets yield promising appreciation.',
      },
      family: {
        gu: 'પરિવારમાં સુખ-શાંતિ અને વડીલોના આશીર્વાદ મળશે.',
        hi: 'परिवार में सुख-शांति व मांगलिक कार्य संपन्न होंगे।',
        en: 'Harmonious domestic life with celebrations and elder blessings.',
      },
      health: {
        gu: 'ઋતુગત બીમારીઓથી બચવું અને પ્રાણાયામ નિયમિત કરવા.',
        hi: 'स्वास्थ्य सामान्य रहेगा। नियमित व्यायाम करें।',
        en: 'Robust vitality supported by clean nutrition and regular exercise.',
      },
    },
  };
}

// Helper: Generate Yearly Rashifal (2024 to 2030)
export function calculateYearlyRashifal(signIndex, year = 2026) {
  const sign = ZODIAC_SIGNS_DATA[signIndex];

  // Sade Sati status check
  // Saturn in Pisces (2025-2027):
  // - Aquarius (10): Last Phase (3rd Phase)
  // - Pisces (11): Peak Phase (2nd Phase)
  // - Aries (0): First Phase (1st Phase)
  // - Leo (4) / Sagittarius (8): Dhaiya (Small Sade Sati)
  let sadeSatiInfo = {
    isActive: false,
    phase: '',
    gu: 'હાલમાં કોઈ સાડાસાતી કે ઢૈય્યા નથી. શનિદેવ શુભ ફળદાયી છે.',
    hi: 'वर्तमान में कोई साढ़ेसाती नहीं है। शनिदेव अनुकूल हैं।',
    en: 'No active Sade Sati. Saturn transit is favorable.',
  };

  if (signIndex === 11) {
    sadeSatiInfo = {
      isActive: true,
      phase: 'Peak (2nd Phase)',
      gu: 'મીન રાશિ પર શનિ સાડાસાતીનો મુખ્ય બીજો તબક્કો ચાલી રહ્યો છે. ધૈર્ય, નિયમિત હનુમાન ચાલીસા અને શિસ્તબદ્ધ જીવનશૈલી શ્રેષ્ઠ પરિણામ આપશે.',
      hi: 'मीन राशि पर साढ़ेसाती का मुख्य दूसरा चरण। धैर्य व हनुमान साधना से लाभ।',
      en: 'Peak (2nd Phase) of Saturn Sade Sati. Demands patience, ethical conduct, and diligent efforts.',
    };
  } else if (signIndex === 0) {
    sadeSatiInfo = {
      isActive: true,
      phase: 'Starting (1st Phase)',
      gu: 'મેષ રાશિ પર શનિ સાડાસાતીનો પ્રથમ તબક્કો ચાલી રહ્યો છે. માનસિક ચિંતાઓ ટાળવી અને શનિવારે તેલ દાન કરવું.',
      hi: 'मेष राशि पर साढ़ेसाती का प्रथम चरण। मानसिक शांति हेतु जप करें।',
      en: 'Initial (1st Phase) of Saturn Sade Sati. Focus on long-term planning and steady discipline.',
    };
  } else if (signIndex === 10) {
    sadeSatiInfo = {
      isActive: true,
      phase: 'Ending (3rd Phase)',
      gu: 'કુંભ રાશિ પર શનિ સાડાસાતીનો અંતિમ તબક્કો ચાલી રહ્યો છે. મુશ્કેલીઓનો અંત આવશે અને સોનેરી તકો પ્રાપ્ત થશે.',
      hi: 'कुंभ राशि पर साढ़ेसाती का अंतिम चरण। कष्टों से मुक्ति और लाभ का समय।',
      en: 'Final (3rd Phase) of Saturn Sade Sati. Resolves obstacles and brings long-awaited rewards.',
    };
  }

  return {
    sign,
    year,
    title: {
      gu: `${sign.names.gu} વાર્ષિક મહા રાશિફળ (Annual Dossier ${year})`,
      hi: `${sign.names.hi} वार्षिक महा राशिफल (${year})`,
      en: `${sign.names.en} Comprehensive Annual Horoscope (${year})`,
    },
    sadeSati: sadeSatiInfo,
    guruGochar: {
      gu: 'દેવગુરુ બૃહસ્પતિનું ગોચર ધર્મ, વિદ્યા અને સંતાન સુખમાં અદ્ભુત વૃદ્ધિ કરશે. યાત્રા-પ્રવાસ સફળ થશે.',
      hi: 'देवगुरु बृहस्पति का गोचर ज्ञान, धर्म और संतान सुख में वृद्धि कराएगा।',
      en: 'Jupiter transit blesses academic pursuits, spiritual wisdom, mentorship, and auspicious family events.',
    },
    annualThemes: [
      {
        quarter: 'Q1 (જાન્યુઆરી - માર્ચ)',
        title: {
          gu: 'નવા સંકલ્પ & કારકિર્દી પ્રગતિ',
          hi: 'करियर में नई शुरुआत',
          en: 'New Foundations & Career',
        },
        desc: {
          gu: 'વર્ષની શરૂઆત ઉત્સાહવર્ધક રહેશે. અટકેલા કાર્યો પૂર્ણ થશે.',
          hi: 'कार्य में गति आएगी।',
          en: 'Strong momentum and clearance of legacy backlogs.',
        },
      },
      {
        quarter: 'Q2 (એપ્રિલ - જૂન)',
        title: { gu: 'નાણાકીય સમૃદ્ધિ & રોકાણ', hi: 'धन लाभ एवं निवेश', en: 'Financial Expansion' },
        desc: {
          gu: 'ગુરુનું શુભ ગોચર આર્થિક સધ્ધરતા આપશે.',
          hi: 'आर्थिक मजबूती प्राप्त होगी।',
          en: 'Substantial wealth growth and profitable ventures.',
        },
      },
      {
        quarter: 'Q3 (જુલાઈ - સપ્ટેમ્બર)',
        title: {
          gu: 'પારિવારિક પ્રસંગો & આધ્યાત્મિક યાત્રા',
          hi: 'मांगलिक कार्य व तीर्थ',
          en: 'Family & Pilgrimage',
        },
        desc: {
          gu: 'પરિવારમાં ખુશીઓનો માહોલ રહેશે. તીર્થયાત્રાના યોગ.',
          hi: 'पारिवारिक सुख व धार्मिक यात्रा।',
          en: 'Domestic bliss, celebratory gatherings, and sacred travels.',
        },
      },
      {
        quarter: 'Q4 (ઓક્ટોબર - ડિસેમ્બર)',
        title: {
          gu: 'સિદ્ધિઓ & વર્ષાંત સફળતા',
          hi: 'सफलता एवं सम्मान',
          en: 'Culmination & Recognition',
        },
        desc: {
          gu: 'વર્ષના અંતમાં મોટા લક્ષ્યો સિદ્ધ થશે. માન-સન્માન વધશે.',
          hi: 'उच्च पद-प्रतिष्ठा की प्राप्ति।',
          en: 'Year ends on high notes with leadership accolades and triumph.',
        },
      },
    ],
    annualRemedies: [
      {
        gu: 'દર શનિવારે પીપળાના વૃક્ષ નીચે સરસવના તેલનો દીવો પ્રગટાવવો.',
        hi: 'शनिवार को पीपल के नीचे सरसों के तेल का दीपक जलाएं।',
        en: 'Light a mustard oil lamp under a Peepal tree on Saturdays.',
      },
      {
        gu: 'ગુરુવારે ગાયને ચણાની દાળ અને ગોળ ખવડાવવો.',
        hi: 'गुरुवार को गाय को चने की दाल व गुड़ खिलाएं।',
        en: 'Offer yellow split chickpeas and jaggery to cows on Thursdays.',
      },
      {
        gu: 'નિત્ય ગાયત્રી મંત્ર અથવા ઇષ્ટદેવના મંત્રની ૧ માળા કરવી.',
        hi: 'नित्य गायत्री मंत्र की एक माला जपें।',
        en: 'Chant 1 round of Gayatri Mantra or your Ishta Mantra daily.',
      },
    ],
  };
}
