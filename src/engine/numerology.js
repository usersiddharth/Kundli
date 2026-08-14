// High-Precision Vedic, Chaldean & Pythagorean Numerology Engine with Smart Name Spelling Optimizer

// Chaldean Letter Values
const CHALDEAN_MAP = {
  A: 1,
  I: 1,
  J: 1,
  Q: 1,
  Y: 1,
  B: 2,
  K: 2,
  R: 2,
  C: 3,
  G: 3,
  L: 3,
  S: 3,
  D: 4,
  M: 4,
  T: 4,
  E: 5,
  H: 5,
  N: 5,
  X: 5,
  U: 6,
  V: 6,
  W: 6,
  O: 7,
  Z: 7,
  F: 8,
  P: 8,
};

// Pythagorean Letter Values
const PYTHAGOREAN_MAP = {
  A: 1,
  J: 1,
  S: 1,
  B: 2,
  K: 2,
  T: 2,
  C: 3,
  L: 3,
  U: 3,
  D: 4,
  M: 4,
  V: 4,
  E: 5,
  N: 5,
  W: 5,
  F: 6,
  O: 6,
  X: 6,
  G: 7,
  P: 7,
  Y: 7,
  H: 8,
  Q: 8,
  Z: 8,
  I: 9,
  R: 9,
};

const VOWELS = ['A', 'E', 'I', 'O', 'U'];

export function reduceToSingleDigit(num, allowMaster = false) {
  let n = num;
  while (n > 9) {
    if (allowMaster && (n === 11 || n === 22 || n === 33)) {
      return n;
    }
    n = String(n)
      .split('')
      .reduce((sum, d) => sum + Number(d), 0);
  }
  return n;
}

// Chaldean Compound Number Esoteric Vibrations & Meanings
export const CHALDEAN_COMPOUNDS = {
  10: {
    name: 'Wheel of Fortune',
    rating: 'Auspicious',
    desc: { gu: 'સન્માન, સફળતા અને આત્મવિશ્વાસ', en: 'Honor, success, and high self-confidence.' },
  },
  14: {
    name: 'Movement & Change',
    rating: 'Auspicious',
    desc: {
      gu: 'વેપાર અને મુસાફરીમાં મોટો લાભ',
      en: 'Favorable for business, travel, and speculative ventures.',
    },
  },
  15: {
    name: 'Magician of Venus',
    rating: 'Highly Auspicious',
    desc: {
      gu: 'અદભુત આકર્ષણ, વાક્ચાતુર્ય અને સમૃદ્ધિ',
      en: 'Great personal magnetism, prosperity, and artistic eloquence.',
    },
  },
  19: {
    name: 'Prince of Heaven',
    rating: 'Most Auspicious',
    desc: {
      gu: 'વિજય, યશ, કીર્તિ અને સુખ-સમૃદ્ધિ',
      en: 'Royal star of triumph, victory, happiness, and high esteem.',
    },
  },
  20: {
    name: 'The Awakening',
    rating: 'Neutral',
    desc: {
      gu: 'આધ્યાત્મિક ઉદય અને નવી યોજનાઓ',
      en: 'Spiritual awakening, delays followed by sudden realization.',
    },
  },
  21: {
    name: 'Crown of the Magi',
    rating: 'Most Auspicious',
    desc: {
      gu: 'સર્વોચ્ચ વિજય, પ્રગતિ અને ઉચ્ચ સન્માન',
      en: 'Supreme success, victory, advancement, and honors.',
    },
  },
  23: {
    name: 'Royal Star of the Lion',
    rating: 'Most Auspicious',
    desc: {
      gu: 'સત્તા, ઉચ્ચ હોદ્દો અને સર્વાંગીણ લાભ',
      en: 'Favors from superiors, protection, success, and fame.',
    },
  },
  24: {
    name: 'Love & Money',
    rating: 'Highly Auspicious',
    desc: {
      gu: 'વિજાતીય સહયોગ, સંપત્તિ અને પ્રેમ',
      en: 'Assistance from opposite sex, prosperity, and peace.',
    },
  },
  27: {
    name: 'The Sceptre',
    rating: 'Highly Auspicious',
    desc: {
      gu: 'સાહસ, નેતૃત્વ અને બુદ્ધિબળથી વિજય',
      en: 'Courage, authority, mental strength, and success.',
    },
  },
  30: {
    name: 'The Thinker',
    rating: 'Auspicious',
    desc: {
      gu: 'બૌદ્ધિક સર્જનાત્મકતા અને માનસિક શ્રેષ્ઠતા',
      en: 'Deep mental superiority, writing, and intellectual triumph.',
    },
  },
  32: {
    name: 'Wisdom of Nations',
    rating: 'Highly Auspicious',
    desc: {
      gu: 'જનપ્રિયતા, વેપારમાં મોટો નફો અને પ્રભાવ',
      en: 'Public popularity, massive business expansion, and fame.',
    },
  },
  33: {
    name: 'Master Healer',
    rating: 'Most Auspicious',
    desc: {
      gu: 'માસ્ટર નંબર - અખૂટ પ્રેમ, વૈભવ અને લોકપ્રિયતા',
      en: 'Master number of supreme charisma, harmony, and prosperity.',
    },
  },
  36: {
    name: 'Sovereignty & Victory',
    rating: 'Highly Auspicious',
    desc: {
      gu: 'સાહસ, અધિકાર અને મહેનતનું શ્રેષ્ઠ ફળ',
      en: 'High authority, accomplishment through persistent effort.',
    },
  },
  37: {
    name: 'Golden Triangle',
    rating: 'Most Auspicious',
    desc: {
      gu: 'ઉત્તમ ભાગ્યોદય, મૈત્રી અને આર્થિક વૃદ્ધિ',
      en: 'Immense good fortune, profitable friendships, and love.',
    },
  },
  41: {
    name: 'Crown of Riches',
    rating: 'Highly Auspicious',
    desc: {
      gu: 'વેપારમાં ઝડપી સફળતા અને ધનલાભ',
      en: 'Quick success in enterprise, financial progress, and leadership.',
    },
  },
  42: {
    name: 'Grace & Harmony',
    rating: 'Highly Auspicious',
    desc: {
      gu: 'દામ્પત્ય સુખ, શાંતિ અને પ્રતિષ્ઠા',
      en: 'Domestic happiness, social prestige, and peace.',
    },
  },
  45: {
    name: 'Business Magnet',
    rating: 'Highly Auspicious',
    desc: {
      gu: 'વિશાળ સામાજિક નેટવર્ક અને આર્થિક સમૃદ્ધિ',
      en: 'Great public acclaim, commercial triumphs, and wealth.',
    },
  },
  46: {
    name: 'Crown of Splendor',
    rating: 'Highly Auspicious',
    desc: { gu: 'સન્માન, લોકચાહના અને કીર્તિ', en: 'Popularity, royal honors, and wealth.' },
  },
  50: {
    name: 'Communication & Power',
    rating: 'Highly Auspicious',
    desc: {
      gu: 'વેપાર અને આંતરરાષ્ટ્રીય સંબંધોમાં સફળતા',
      en: 'Intelligence, communication mastery, and high achievements.',
    },
  },
  51: {
    name: 'High Fortune',
    rating: 'Highly Auspicious',
    desc: {
      gu: 'લશ્કરી અથવા ઉદ્યોગમાં સર્વોચ્ચ વિજય',
      en: 'Warrior spirit, high authority, and victory.',
    },
  },
};

// Numerology Planet & Characteristics Profiles (1-9)
export const NUMBER_PROFILES = {
  1: {
    planet: { gu: 'સૂર્ય (Surya)', hi: 'सूर्य (Sun)', en: 'Sun' },
    archetype: {
      gu: 'નેતૃત્વ, પ્રેરણા અને સાહસ',
      hi: 'नेतृत्व, महत्वाकांक्षा व साहस',
      en: 'Leadership, Ambition & Courage',
    },
    traits: {
      gu: 'તમે જન્મજાત નેતા છો. આત્મવિશ્વાસ, સ્વાભિમાન, મૌલિક વિચારશૈલી અને દ્રઢ સંકલ્પશક્તિ તમારી મુખ્ય ઓળખ છે.',
      hi: 'आप जन्मजात नेता हैं। आत्मविश्वास, स्वाभिमान, मौलिक विचार और दृढ़ संकल्प आपकी मुख्य पहचान हैं।',
      en: 'Natural leader, highly ambitious, independent, determined, and innovative.',
    },
    friendly: [1, 2, 3, 5, 9],
    enemy: [6, 8],
    neutral: [4, 7],
    luckyColors: {
      gu: 'કેસરી, પીળો, સોનેરી',
      hi: 'केसरिया, पीला, सुनहरा',
      en: 'Orange, Yellow, Gold',
    },
    luckyDays: { gu: 'રવિવાર અને સોમવાર', hi: 'रविवार और सोमवार', en: 'Sunday and Monday' },
    luckyGem: { gu: 'માણેક (Ruby)', hi: 'माणिक्य (Ruby)', en: 'Ruby (Manik)' },
    luckyMetal: { gu: 'સોનું / તાંબુ', hi: 'सोना / तांबा', en: 'Gold / Copper' },
    luckyDir: { gu: 'પૂર્વ દિશા (East)', hi: 'पूर्व दिशा (East)', en: 'East' },
    careers: {
      gu: 'સરકારી ઉચ્ચ પદ, વહીવટકર્તા, ઉદ્યોગપતિ, રાજનીતિ, ડિરેક્ટર',
      hi: 'सरकारी अधिकारी, प्रशासन, उद्यमी, राजनीति, निदेशक',
      en: 'Government Official, Management, Entrepreneur, Politics, CEO',
    },
  },
  2: {
    planet: { gu: 'ચંદ્ર (Chandra)', hi: 'चन्द्रमा (Moon)', en: 'Moon' },
    archetype: {
      gu: 'શાંતિ, કલ્પનાશીલતા અને સહાનુભૂતિ',
      hi: 'शांति, संवेदनशीलता व रचनात्मकता',
      en: 'Harmony, Empathy & Creativity',
    },
    traits: {
      gu: 'ભાવનાત્મક, સંવેદનશીલ અને શાંતિપ્રિય સ્વભાવ. ઉત્તમ કલ્પનાશક્તિ અને સહકાર્યની ભાવના ધરાવો છો.',
      hi: 'भावुक, संवेदनशील और शांतिप्रिय स्वभाव। उत्कृष्ट कल्पनाशीलता और सामंजस्य की शक्ति।',
      en: 'Diplomatic, highly imaginative, sensitive, cooperative, and peace-loving.',
    },
    friendly: [1, 2, 3, 5],
    enemy: [4, 8, 9],
    neutral: [6, 7],
    luckyColors: {
      gu: 'સફેદ, દૂધિયો, આછો લીલો',
      hi: 'सफेद, क्रीम, हल्का हरा',
      en: 'White, Cream, Light Green',
    },
    luckyDays: { gu: 'સોમવાર અને રવિવાર', hi: 'सोमवार और रविवार', en: 'Monday and Sunday' },
    luckyGem: { gu: 'મોતી (Pearl) / ચંદ્રકાંત', hi: 'मोती (Pearl)', en: 'Pearl (Moti)' },
    luckyMetal: { gu: 'ચાંદી (Silver)', hi: 'चांदी (Silver)', en: 'Silver' },
    luckyDir: {
      gu: 'ઉત્તર-પશ્ચિમ (North-West)',
      hi: 'उत्तर-पश्चिम (North-West)',
      en: 'North-West',
    },
    careers: {
      gu: 'કળા, સાહિત્ય, મનોવિજ્ઞાન, સંગીત, જળ સંબંધી વેપાર, નર્સિંગ',
      hi: 'कला, साहित्य, परामर्श, संगीत, जल उद्योग, नर्सिंग',
      en: 'Arts, Literature, Psychology, Music, Water Industry, Healthcare',
    },
  },
  3: {
    planet: { gu: 'ગુરુ (Guru / Jupiter)', hi: 'बृहस्पति (Jupiter)', en: 'Jupiter' },
    archetype: {
      gu: 'જ્ઞાન, બુદ્ધિપ્રતિભા અને વિસ્તરણ',
      hi: 'ज्ञान, प्रज्ञा व अध्यात्म',
      en: 'Wisdom, Intellect & Expansion',
    },
    traits: {
      gu: 'વિદ્વાન, આશાવાદી અને જ્ઞાનપિપાસુ. સલાહ આપવા અને શીખવવામાં કુશળતા ધરાવો છો.',
      hi: 'विद्वान, आशावादी और ज्ञानवान। सलाह देने एवं मार्गदर्शन करने में निपुण।',
      en: 'Wise, optimistic, expressive, philosophical, and a great mentor.',
    },
    friendly: [1, 2, 3, 9],
    enemy: [6],
    neutral: [4, 5, 7, 8],
    luckyColors: {
      gu: 'પીળો, સોનેરી, કેસરી',
      hi: 'पीला, सुनहरा, केसरिया',
      en: 'Yellow, Gold, Saffron',
    },
    luckyDays: { gu: 'ગુરુવાર અને મંગળવાર', hi: 'गुरुवार और मंगलवार', en: 'Thursday and Tuesday' },
    luckyGem: {
      gu: 'પોખરાજ (Yellow Sapphire)',
      hi: 'पुखराज (Yellow Sapphire)',
      en: 'Yellow Sapphire (Pukhraj)',
    },
    luckyMetal: { gu: 'સોનું / પિત્તળ', hi: 'सोना / पीतल', en: 'Gold / Brass' },
    luckyDir: { gu: 'ઈશાન (North-East)', hi: 'ईशान (North-East)', en: 'North-East' },
    careers: {
      gu: 'શિક્ષણ, કાયદો (વકીલ/જજ), બેંકિંગ, જ્યોતિષ, ધાર્મિક સંસ્થા, લેખન',
      hi: 'शिक्षा, कानून, बैंकिंग, ज्योतिष, दर्शन, लेखन',
      en: 'Education, Law, Banking, Advisory, Philosophy, Publishing',
    },
  },
  4: {
    planet: { gu: 'રાહુ (Rahu)', hi: 'राहु (Uranus / Rahu)', en: 'Rahu' },
    archetype: {
      gu: 'મહેનત, સંગઠન અને ક્રાંતિકારી વિચાર',
      hi: 'कठिन परिश्रम, संरचना व क्रांति',
      en: 'Hard Work, Innovation & Practicality',
    },
    traits: {
      gu: 'વ્યવહારુ, સંશોધનાત્મક અને નિયમોને નવી દિશા આપનાર. આકસ્મિક પરિવર્તનોમાં પણ અડગ રહો છો.',
      hi: 'व्यावहारिक, विश्लेषणात्मक एवं लीक से हटकर सोचने वाले कर्मठ व्यक्तित्व।',
      en: 'Practical, disciplined, unconventional thinker, and resilient.',
    },
    friendly: [5, 6, 7, 8],
    enemy: [1, 2, 9],
    neutral: [3, 4],
    luckyColors: { gu: 'વાદળી, ગ્રે, ખાખી', hi: 'नीला, ग्रे, भूरा', en: 'Blue, Grey, Khaki' },
    luckyDays: { gu: 'શનિવાર અને રવિવાર', hi: 'शनिवार और रविवार', en: 'Saturday and Sunday' },
    luckyGem: { gu: 'ગોમેદ (Hessonite)', hi: 'गोमेद (Hessonite)', en: 'Hessonite (Gomed)' },
    luckyMetal: { gu: 'અષ્ટધાતુ / સીસું', hi: 'अष्टधातु / पंचधातु', en: 'Alloy / Mixed Metals' },
    luckyDir: { gu: 'નૈઋત્ય (South-West)', hi: 'नैऋत्य (South-West)', en: 'South-West' },
    careers: {
      gu: 'આઈટી, સોફ્ટવેર, એન્જિનિયરિંગ, ઈલેક્ટ્રોનિક્સ, સંશોધન, રિયલ એસ્ટેટ',
      hi: 'आईटी, सॉफ्टवेयर, इंजीनियरिंग, इलेक्ट्रॉनिक्स, शोध, रियल एस्टेट',
      en: 'IT, Engineering, Research, Electronics, Real Estate',
    },
  },
  5: {
    planet: { gu: 'બુધ (Budh / Mercury)', hi: 'बुध (Mercury)', en: 'Mercury' },
    archetype: {
      gu: 'વેપાર, સંચાર કૌશલ્ય અને અનુકૂલનશીલતા',
      hi: 'व्यापार, संचार कौशल व चपलता',
      en: 'Commerce, Communication & Versatility',
    },
    traits: {
      gu: 'ઝડપી બુદ્ધિ, અદભુત વાક્ચાતુર્ય અને ઉત્કૃષ્ટ બિઝનેસ માઇન્ડસેટ. પરિવર્તનને સરળતાથી અપનાવો છો.',
      hi: 'तीव्र बुद्धि, उत्कृष्ट संवाद क्षमता एवं चतुर व्यापारिक सूझबूझ।',
      en: 'Sharp intellect, versatile, excellent communicator, and business-minded.',
    },
    friendly: [1, 2, 3, 5, 6],
    enemy: [], // Universal Friend
    neutral: [4, 7, 8, 9],
    luckyColors: {
      gu: 'લીલો, ફિરોઝા, આછો ખાખી',
      hi: 'हरा, फिरोजी, हल्का भूरा',
      en: 'Green, Turquoise, Light Grey',
    },
    luckyDays: { gu: 'બુધવાર અને શુક્રવાર', hi: 'बुधवार और शुक्रवार', en: 'Wednesday and Friday' },
    luckyGem: { gu: 'પન્નો (Emerald)', hi: 'पन्ना (Emerald)', en: 'Emerald (Panna)' },
    luckyMetal: { gu: 'કાંસું / ચાંદી', hi: 'कांस्य / चांदी', en: 'Bronze / Silver' },
    luckyDir: { gu: 'ઉત્તર દિશા (North)', hi: 'उत्तर दिशा (North)', en: 'North' },
    careers: {
      gu: 'શેરબજાર, વેપાર, પત્રકારત્વ, મીડિયા, માર્કેટિંગ, એકાઉન્ટિંગ, ટ્રાવેલ',
      hi: 'शेयर बाजार, वाणिज्य, पत्रकारिता, विपणन, संचार, यात्रा',
      en: 'Stock Market, Commerce, Journalism, Media, Marketing, Travel',
    },
  },
  6: {
    planet: { gu: 'શુક્ર (Shukra / Venus)', hi: 'शुक्र (Venus)', en: 'Venus' },
    archetype: {
      gu: 'સૌંદર્ય, વૈભવ, રોમાન્સ અને કળા',
      hi: 'सौंदर्य, विलास, कला व आकर्षण',
      en: 'Luxury, Harmony, Art & Romance',
    },
    traits: {
      gu: 'આકર્ષક વ્યક્તિત્વ, વૈભવી જીવનશૈલી અને કલાત્મક રુચિ. સ્નેહાળ અને સૌંદર્યપ્રેમી હોવ છો.',
      hi: 'आकर्षक व्यक्तित्व, सुरुचिपूर्ण जीवनशैली एवं कलात्मक दृष्टिकोण।',
      en: 'Charismatic, romantic, artistic, fond of luxury, and compassionate.',
    },
    friendly: [4, 5, 6, 7, 8],
    enemy: [1, 2, 3],
    neutral: [9],
    luckyColors: {
      gu: 'સફેદ, ગુલાબી, ચમકીલો આકાશી',
      hi: 'सफेद, गुलाबी, चमकीला नीला',
      en: 'White, Pink, Light Blue',
    },
    luckyDays: { gu: 'શુક્રવાર અને મંગળવાર', hi: 'शुक्रवार और मंगलवार', en: 'Friday and Tuesday' },
    luckyGem: {
      gu: 'હીરો (Diamond) / ઓપલ',
      hi: 'हीरा (Diamond) / ओपल',
      en: 'Diamond (Heera) / Opal',
    },
    luckyMetal: { gu: 'પ્લેટિનમ / ચાંદી', hi: 'प्लैटिनम / चांदी', en: 'Platinum / Silver' },
    luckyDir: {
      gu: 'દક્ષિણ-પૂર્વ (South-East)',
      hi: 'दक्षिण-पूर्व (South-East)',
      en: 'South-East',
    },
    careers: {
      gu: 'ફિલ્મ, ફેશન ડિઝાઇનિંગ, હોટેલ મેનેજમેન્ટ, ઇન્ટીરીયર, જ્વેલરી, કોસ્મેટિક્સ',
      hi: 'सिनेमा, फैशन डिजाइनिंग, आतिथ्य, आभूषण, सौंदर्य प्रसाधन',
      en: 'Entertainment, Fashion, Hospitality, Luxury Goods, Design',
    },
  },
  7: {
    planet: { gu: 'કેતુ (Ketu)', hi: 'केतु (Neptune / Ketu)', en: 'Ketu' },
    archetype: {
      gu: 'આધ્યાત્મ, રહસ્યવાદ અને ગહન ચિંતન',
      hi: 'अध्यात्म, गूढ़ ज्ञान व शोध',
      en: 'Spirituality, Mysticism & Intuition',
    },
    traits: {
      gu: 'ગંભીર, દાર્શનિક અને અંતર્મુખી. ગહન સંશોધન અને રહસ્યોને જાણવાની અદભુત ક્ષમતા ધરાવો છો.',
      hi: 'गंभीर, दार्शनिक और अंतर्मुखी। गूढ़ रहस्यों एवं आध्यात्मिक विषयों में गहरी रुचि।',
      en: 'Deep thinker, spiritual, analytical, intuitive, and philosophical.',
    },
    friendly: [1, 4, 5, 6],
    enemy: [9],
    neutral: [2, 3, 7, 8],
    luckyColors: {
      gu: 'આછો પીળો, સફેદ, આછો લીલો',
      hi: 'हल्का पीला, सफेद, हल्का हरा',
      en: 'Light Yellow, White, Pale Green',
    },
    luckyDays: { gu: 'સોમવાર અને ગુરુવાર', hi: 'सोमवार और गुरुवार', en: 'Monday and Thursday' },
    luckyGem: {
      gu: "લહસુણિયા (Cat's Eye)",
      hi: "लहसुनिया (Cat's Eye)",
      en: "Cat's Eye (Lehsuniya)",
    },
    luckyMetal: { gu: 'ચાંદી / પંચધાતુ', hi: 'चांदी / पंचधातु', en: 'Silver / Mixed Alloy' },
    luckyDir: { gu: 'ઉત્તર-પૂર્વ (North-East)', hi: 'उत्तर-पूर्व (North-East)', en: 'North-East' },
    careers: {
      gu: 'સંશોધક, ફિલોસોફર, વૈજ્ઞાનિક, સ્પિરિચ્યુઅલ ગુરુ, પ્રોગ્રામર, લેખક',
      hi: 'शोधकर्ता, दार्शनिक, वैज्ञानिक, आध्यात्मिक मार्गदर्शक, कोडिंग',
      en: 'Researcher, Scientist, Spiritual Teacher, Analytics, Writer',
    },
  },
  8: {
    planet: { gu: 'શનિ (Shani / Saturn)', hi: 'शनि (Saturn)', en: 'Saturn' },
    archetype: {
      gu: 'ન્યાય, અનુશાસન, પરિશ્રમ અને કર્મફળ',
      hi: 'न्याय, अनुशासन, धैर्य व कर्म',
      en: 'Discipline, Justice, Persistence & Authority',
    },
    traits: {
      gu: 'ધીરજવાન, સંઘર્ષશીલ અને અત્યંત પરિશ્રમી. ન્યાયપ્રિયતા અને વ્યવહારિક સત્તા તમારી ઓળખ છે.',
      hi: 'धैर्यवान, कर्मठ और अनुशासित। न्यायप्रिय एवं दीर्घकालिक लक्ष्यों के प्रति समर्पित।',
      en: 'Disciplined, determined, pragmatic, patient, and builds long-term empires.',
    },
    friendly: [4, 5, 6],
    enemy: [1, 2, 9],
    neutral: [3, 7, 8],
    luckyColors: {
      gu: 'ઘેરો વાદળી, કાળો, જાંબલી',
      hi: 'गहरा नीला, काला, बैंगनी',
      en: 'Dark Blue, Black, Navy',
    },
    luckyDays: { gu: 'શનિવાર અને શુક્રવાર', hi: 'शनिवार और शुक्रवार', en: 'Saturday and Friday' },
    luckyGem: {
      gu: 'નીલમ (Blue Sapphire) / નીલી',
      hi: 'नीलम (Blue Sapphire)',
      en: 'Blue Sapphire (Neelam)',
    },
    luckyMetal: { gu: 'લોખંડ (Iron)', hi: 'लोहा (Iron)', en: 'Iron' },
    luckyDir: { gu: 'પશ્ચિમ દિશા (West)', hi: 'पश्चिम दिशा (West)', en: 'West' },
    careers: {
      gu: 'ન્યાયતંત્ર (જજ/વકીલ), ઉદ્યોગ, ખાણકામ, ભારે મશીનરી, બાંધકામ, રાજકારણ',
      hi: 'न्यायपालिका, उद्योग, खनन, भारी मशीनरी, निर्माण कार्य',
      en: 'Judiciary, Heavy Industries, Mining, Infrastructure, Politics',
    },
  },
  9: {
    planet: { gu: 'મંગળ (Mangal / Mars)', hi: 'मंगल (Mars)', en: 'Mars' },
    archetype: {
      gu: 'ઊર્જા, શૌર્ય, સાહસ અને માનવતા',
      hi: 'ऊर्जा, पराक्रम, साहस व परोपकार',
      en: 'Energy, Valor, Courage & Humanitarianism',
    },
    traits: {
      gu: 'ઊર્જાવાન, નીડર અને પડકારો સામે લડનાર. ઉત્સાહી અને પરોપકારી સ્વભાવ ધરાવો છો.',
      hi: 'ऊर्जावान, निडर और चुनौतियों से न घबराने वाले। परोपकारी एवं साहसी स्वभाव।',
      en: 'Dynamic, courageous, passionate, warrior spirit, and generous.',
    },
    friendly: [1, 2, 3, 5],
    enemy: [4, 8],
    neutral: [6, 7, 9],
    luckyColors: { gu: 'લાલ, ગુલાબી, કેસરી', hi: 'लाल, गुलाबी, नारंगी', en: 'Red, Crimson, Coral' },
    luckyDays: { gu: 'મંગળવાર અને ગુરુવાર', hi: 'मंगलवार और गुरुवार', en: 'Tuesday and Thursday' },
    luckyGem: { gu: 'પરવાળું (Red Coral)', hi: 'मूंगा (Red Coral)', en: 'Red Coral (Moonga)' },
    luckyMetal: { gu: 'તાંબુ / સોનું', hi: 'तांबा / सोना', en: 'Copper / Gold' },
    luckyDir: { gu: 'દક્ષિણ દિશા (South)', hi: 'दक्षिण दिशा (South)', en: 'South' },
    careers: {
      gu: 'સૈન્ય, પોલીસ, સર્જન/ડોક્ટર, રમતગમત, એન્જિનિયરિંગ, સાહસિક વ્યવસાય',
      hi: 'सेना, पुलिस, सर्जन, खेल, रक्षा, साहसिक व्यवसाय',
      en: 'Defense, Police, Surgeon, Sports, Engineering, Real Estate',
    },
  },
};

// Calculate Name Numbers
export function calculateNameNumbers(nameString) {
  const cleanName = nameString.toUpperCase().replace(/[^A-Z]/g, '');
  let chaldeanTotal = 0;
  let pythagoreanTotal = 0;
  let vowelsPythagorean = 0;
  let consonantsPythagorean = 0;

  for (const ch of cleanName) {
    const chal = CHALDEAN_MAP[ch] || 0;
    const pyth = PYTHAGOREAN_MAP[ch] || 0;
    chaldeanTotal += chal;
    pythagoreanTotal += pyth;

    if (VOWELS.includes(ch)) {
      vowelsPythagorean += pyth;
    } else {
      consonantsPythagorean += pyth;
    }
  }

  const chaldeanNumber = reduceToSingleDigit(chaldeanTotal);
  const pythagoreanNumber = reduceToSingleDigit(pythagoreanTotal);
  const soulUrgeNumber = reduceToSingleDigit(vowelsPythagorean);
  const personalityNumber = reduceToSingleDigit(consonantsPythagorean);

  const compoundInfo = CHALDEAN_COMPOUNDS[chaldeanTotal] || {
    name: 'General Vibration',
    rating: 'Neutral',
    desc: { gu: 'સામાન્ય પ્રભાવ', en: 'Standard vibration.' },
  };

  return {
    cleanName,
    chaldeanCompound: chaldeanTotal,
    chaldeanNumber,
    pythagoreanCompound: pythagoreanTotal,
    pythagoreanNumber,
    soulUrgeNumber,
    personalityNumber,
    compoundInfo,
  };
}

// Smart Name Spelling Optimization Generator
export function generateSmartSpellingSuggestions(baseName, mulank, bhagyank) {
  if (!baseName || baseName.trim().length < 2) return [];

  const parts = baseName.trim().split(/\s+/);
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ') || '';

  const candidates = new Set();
  candidates.add(baseName.trim());

  // 1. Initial Insertions
  ['A', 'S', 'R', 'K', 'N', 'M', 'V', 'T', 'H'].forEach((init) => {
    candidates.add(`${firstName} ${init} ${lastName}`.trim());
    candidates.add(`${firstName} ${init}. ${lastName}`.trim());
  });

  // 2. First Name Vowel Tuning (Double first vowel)
  const vowelsInFirst = firstName.match(/[AEIOUaeiou]/);
  if (vowelsInFirst) {
    const idx = firstName.indexOf(vowelsInFirst[0]);
    const doubledVowel = firstName.slice(0, idx) + vowelsInFirst[0] + firstName.slice(idx);
    candidates.add(`${doubledVowel} ${lastName}`.trim());
  }

  // 3. Last letter doubling of first name
  if (firstName.length > 2) {
    const doubledLast = firstName + firstName.slice(-1);
    candidates.add(`${doubledLast} ${lastName}`.trim());
  }

  // 4. Common Suffix / Prefix tweaks
  candidates.add(`${firstName}a ${lastName}`.trim());
  candidates.add(`${firstName}h ${lastName}`.trim());
  if (lastName) {
    candidates.add(`${firstName} ${lastName}a`.trim());
    candidates.add(`${firstName} ${lastName}h`.trim());
  }

  // Evaluate All Candidates
  const mulankFriends = NUMBER_PROFILES[mulank]?.friendly || [1, 2, 3, 5, 6];
  const bhagyankFriends = NUMBER_PROFILES[bhagyank]?.friendly || [1, 2, 3, 5, 6];

  const results = [];

  candidates.forEach((cand) => {
    const data = calculateNameNumbers(cand);
    const compound = data.chaldeanCompound;
    const single = data.chaldeanNumber;

    let score = 50; // base score

    // Friendly with Mulank (+25)
    if (mulankFriends.includes(single)) score += 25;
    // Friendly with Bhagyank (+25)
    if (bhagyankFriends.includes(single)) score += 25;

    // High lucky Chaldean compounds
    if (CHALDEAN_COMPOUNDS[compound]) {
      if (CHALDEAN_COMPOUNDS[compound].rating === 'Most Auspicious') score += 20;
      else if (CHALDEAN_COMPOUNDS[compound].rating === 'Highly Auspicious') score += 15;
      else if (CHALDEAN_COMPOUNDS[compound].rating === 'Auspicious') score += 10;
    }

    // Penalize known challenging numbers (12, 16, 18, 26, 28, 29, 38, 44)
    if ([12, 16, 18, 26, 28, 29, 38, 43, 44].includes(compound)) {
      score -= 35;
    }

    results.push({
      spelling: cand,
      chaldeanNumber: single,
      chaldeanCompound: compound,
      pythagoreanNumber: data.pythagoreanNumber,
      compoundInfo: data.compoundInfo,
      matchPercentage: Math.min(100, Math.max(45, score)),
      isTopLucky: score >= 90,
    });
  });

  // Sort by highest match score and return top 6
  return results.sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 6);
}

// Calculate Lo-Shu Grid (3x3 Magic Square)
export function calculateLoShuGrid(day, month, year, mulank, bhagyank) {
  const allDigits = `${day}${month}${year}${mulank}${bhagyank}`.split('').map(Number);

  const digitCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };

  for (const d of allDigits) {
    if (d >= 1 && d <= 9) {
      digitCounts[d] = (digitCounts[d] || 0) + 1;
    }
  }

  const planes = [
    {
      id: 'mental',
      name: {
        gu: 'માનસિક પ્લેન (Mental Plane)',
        hi: 'मानसिक तल (Mental Plane)',
        en: 'Mental Plane',
      },
      digits: [4, 9, 2],
      active: digitCounts[4] > 0 && digitCounts[9] > 0 && digitCounts[2] > 0,
    },
    {
      id: 'emotional',
      name: {
        gu: 'ભાવનાત્મક પ્લેન (Emotional Plane)',
        hi: 'भावनात्मक तल (Emotional Plane)',
        en: 'Emotional Plane',
      },
      digits: [3, 5, 7],
      active: digitCounts[3] > 0 && digitCounts[5] > 0 && digitCounts[7] > 0,
    },
    {
      id: 'practical',
      name: {
        gu: 'વ્યવહારુ પ્લેન (Practical Plane)',
        hi: 'व्यावहारिक तल (Practical Plane)',
        en: 'Practical Plane',
      },
      digits: [8, 1, 6],
      active: digitCounts[8] > 0 && digitCounts[1] > 0 && digitCounts[6] > 0,
    },
    {
      id: 'thought',
      name: {
        gu: 'વિચાર પ્લેન (Thought Plane)',
        hi: 'विचार तल (Thought Plane)',
        en: 'Thought Plane',
      },
      digits: [4, 3, 8],
      active: digitCounts[4] > 0 && digitCounts[3] > 0 && digitCounts[8] > 0,
    },
    {
      id: 'will',
      name: { gu: 'સંકલ્પ પ્લેન (Will Plane)', hi: 'संकल्प तल (Will Plane)', en: 'Will Plane' },
      digits: [9, 5, 1],
      active: digitCounts[9] > 0 && digitCounts[5] > 0 && digitCounts[1] > 0,
    },
    {
      id: 'action',
      name: { gu: 'કર્મ પ્લેન (Action Plane)', hi: 'कर्म तल (Action Plane)', en: 'Action Plane' },
      digits: [2, 7, 6],
      active: digitCounts[2] > 0 && digitCounts[7] > 0 && digitCounts[6] > 0,
    },
    {
      id: 'golden_yoga',
      name: {
        gu: 'સ્વર્ણ યોગ (Golden Yoga - 4,5,6)',
        hi: 'स्वर्ण योग (Golden Yoga - 4,5,6)',
        en: 'Golden Raj Yoga (4-5-6)',
      },
      digits: [4, 5, 6],
      active: digitCounts[4] > 0 && digitCounts[5] > 0 && digitCounts[6] > 0,
    },
    {
      id: 'silver_yoga',
      name: {
        gu: 'રજત યોગ (Silver Yoga - 2,5,8)',
        hi: 'रजत योग (Silver Yoga - 2,5,8)',
        en: 'Silver Yoga (2-5-8 Property)',
      },
      digits: [2, 5, 8],
      active: digitCounts[2] > 0 && digitCounts[5] > 0 && digitCounts[8] > 0,
    },
  ];

  const missingDigits = Object.keys(digitCounts)
    .filter((k) => digitCounts[k] === 0)
    .map(Number);

  return {
    digitCounts,
    planes,
    missingDigits,
  };
}

// Calculate Full Numerology Report with Spelling Suggestions
export function calculateFullNumerology(
  fullName,
  birthDate,
  currentYear = new Date().getFullYear()
) {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();

  // 1. Mulank (Psychic / Driver Number)
  const mulank = reduceToSingleDigit(day);

  // 2. Bhagyank (Destiny / Conductor Number)
  const fullSum = day + month + year;
  const bhagyank = reduceToSingleDigit(fullSum);

  // 3. Name Numbers (Chaldean & Pythagorean)
  const nameData = calculateNameNumbers(fullName);

  // 4. Personal Year Number
  const personalYearSum = day + month + currentYear;
  const personalYear = reduceToSingleDigit(personalYearSum);

  // 5. Lo-Shu Grid
  const loShu = calculateLoShuGrid(day, month, year, mulank, bhagyank);

  // 6. Profiles & Compatibility
  const mulankProfile = NUMBER_PROFILES[mulank];
  const bhagyankProfile = NUMBER_PROFILES[bhagyank];
  const nameProfile = NUMBER_PROFILES[nameData.chaldeanNumber];

  // Name Harmony Score
  const isNameHarmonious =
    mulankProfile.friendly.includes(nameData.chaldeanNumber) ||
    bhagyankProfile.friendly.includes(nameData.chaldeanNumber);

  // 7. Generate Smart Name Spelling Suggestions
  const suggestions = generateSmartSpellingSuggestions(fullName, mulank, bhagyank);

  return {
    birthDateFormatted: `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`,
    mulank,
    bhagyank,
    nameData,
    personalYear,
    currentYear,
    loShu,
    mulankProfile,
    bhagyankProfile,
    nameProfile,
    isNameHarmonious,
    suggestions,
  };
}
