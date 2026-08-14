// Lal Kitab Remedies & Karmic Debts Audit Engine

export const LAL_KITAB_DEBTS = [
  {
    id: 'pitri',
    name: { gu: 'પિતૃ ઋણ (Pitri Rina)', hi: 'पितृ ऋण', en: 'Pitri Rina (Ancestral Debt)' },
    remedy: {
      gu: 'ગુરુ કે સૂર્ય પીડિત હોવાથી પિતૃ દોષ. દર અમાસે સૂર્ય ભગવાનને જળ અર્પિત કરવું અને ચણાની દાળ દાન કરવી.',
      hi: 'सूर्य देव को जल चढ़ाएं व चने की दाल दान करें।',
      en: 'Offer water to Sun and donate yellow lentils.',
    },
  },
  {
    id: 'matri',
    name: { gu: 'માતૃ ઋણ (Matri Rina)', hi: 'मातृ ऋण', en: "Matri Rina (Mother's Debt)" },
    remedy: {
      gu: 'ચંદ્ર પીડિત હોવાથી. ચાંદીનો ચોરસ ટુકડો પાસે રાખવો અને વડીલ સ્ત્રીઓના આશીર્વાદ લેવા.',
      hi: 'चांदी का टुकड़ा रखें व माता के चरण स्पर्श करें।',
      en: 'Keep a silver coin and respect elders.',
    },
  },
  {
    id: 'self',
    name: { gu: 'સ્વ-ઋણ (Self Debt)', hi: 'स्व-ऋण', en: 'Self Debt' },
    remedy: {
      gu: 'સૂર્ય ૫મા કે ૧૨મા ભાવે હોવાથી. દરરોજ ગાયત્રી મંત્ર જાપ અને હરિઓમ જપ કરવો.',
      hi: 'नियमित गायत्री मंत्र जाप करें।',
      en: 'Chant Gayatri Mantra daily.',
    },
  },
];

export const LAL_KITAB_REMEDIES_MAP = {
  Sun: {
    gu: 'તાંબાનો સિક્કો વહેતા જળમાં પ્રવાહિત કરવો.',
    hi: 'तांबे का सिक्का जल में प्रवाहित करें।',
    en: 'Immerse copper coin in running water.',
  },
  Moon: {
    gu: 'ચાંદીની ગ્લાસમાં પાણી પીવું.',
    hi: 'चांदी के गिलास में पानी पीएं।',
    en: 'Drink water from silver glass.',
  },
  Mars: {
    gu: 'ગોળ અને મીઠી રોટલી ગાયને ખવડાવવી.',
    hi: 'गुड़ व मीठी रोटी गाय को खिलाएं।',
    en: 'Feed jaggery and sweet bread to cows.',
  },
  Mercury: {
    gu: 'મુખમાં ચાંદીનો પાતળો તાર રાખવો અથવા લીલી દાળ દાન કરવી.',
    hi: 'हरी मूंग दाल का दान करें।',
    en: 'Donate green moong dal.',
  },
  Jupiter: {
    gu: 'કપાળે હળદર કે કેસરનું તિલક કરવું.',
    hi: 'माथे पर केसर/हल्दी का तिलक लगाएं।',
    en: 'Apply saffron/turmeric tilak on forehead.',
  },
  Venus: {
    gu: 'ગાયોને પૌષ્ટિક ચારો અને દહી ખવડાવવું.',
    hi: 'गायों को हरा चारा खिलाएं।',
    en: 'Feed green fodder to cows.',
  },
  Saturn: {
    gu: 'સરસવનું તેલ અને કાળા અડદ દાન કરવા.',
    hi: 'सरसों का तेल व उड़द दान करें।',
    en: 'Donate mustard oil and black grams.',
  },
  Rahu: {
    gu: 'મૂળો રાત્રે તકિયા નીચે રાખી સવારે દાન કરવો.',
    hi: 'मूली दान करें।',
    en: 'Donate radishes on Saturday.',
  },
  Ketu: {
    gu: 'બે રંગી ડોગ (કુતરા) ને રોટલી ખવડાવવી.',
    hi: 'कुत्तों को रोटी खिलाएं।',
    en: 'Feed bread to stray dogs.',
  },
};

/**
 * Generate Lal Kitab Planet House Remedies & Debt Audit
 */
export function analyzeLalKitab(kundliData) {
  const planets = kundliData?.planets || kundliData?.astro?.planets || {};

  const remediesList = Object.keys(planets).map((pKey) => {
    const p = planets[pKey];
    const house = p?.houseNum || (p ? Math.floor((((p.lon % 360) + 360) % 360) / 30) + 1 : 1);
    return {
      planetKey: pKey,
      house,
      remedy: LAL_KITAB_REMEDIES_MAP[pKey] || LAL_KITAB_REMEDIES_MAP.Sun,
    };
  });

  return {
    debts: LAL_KITAB_DEBTS,
    remediesList,
  };
}
