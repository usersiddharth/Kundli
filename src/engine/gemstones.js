// Gemstone Recommender & Jaimini 7 Karakas Engine

import { RASHIS } from './kundli.js';

export const GEMSTONE_DETAILS = {
  Sun: {
    stone: "Ruby (Manikya / માણેક)",
    metal: "Gold or Copper",
    finger: "Ring finger",
    day: "Sunday morning",
    mantra: "Om Hram Hreem Hroum Sah Suryaya Namah",
    benefits: {
      en: "Boosts confidence, authority, health, leadership, and father's blessings.",
      hi: "आत्मविश्वास, नेतृत्व, मान-सम्मान एवं पिता के सुख में वृद्धि करता है।",
      gu: "આત્મવિશ્વાસ, નેતૃત્વ, માન-સન્માન અને પિતાના સુખમાં વધારો કરે છે."
    }
  },
  Moon: {
    stone: "Natural Pearl (Moti / મોતી)",
    metal: "Silver",
    finger: "Little finger",
    day: "Monday morning",
    mantra: "Om Shram Shreem Shroum Sah Chandraya Namah",
    benefits: {
      en: "Calms mind, enhances emotional peace, memory, and maternal harmony.",
      hi: "मन को शांत, भावनात्मक संतुलन, स्मरण शक्ति और मानसिक शांति प्रदान करता है।",
      gu: "મનને શાંત, માનસિક સંતુલન, યાદશક્તિ અને માતાનું સુખ વધારે છે."
    }
  },
  Mars: {
    stone: "Red Coral (Moonga / પરવાળું)",
    metal: "Copper or Gold",
    finger: "Ring finger",
    day: "Tuesday morning",
    mantra: "Om Kram Kreem Kroum Sah Bhaumaya Namah",
    benefits: {
      en: "Increases courage, vitality, real estate gains, and removes lethargy.",
      hi: "साहस, ऊर्जा, भूमि-भवन लाभ एवं रक्त संबंधी दोषों का निवारण करता है।",
      gu: "સાહસ, ઉર્જા, જમીન-મકાન લાભ અને આળસ દૂર કરે છે."
    }
  },
  Mercury: {
    stone: "Emerald (Panna / પાનું)",
    metal: "Gold or Bronze",
    finger: "Little finger",
    day: "Wednesday morning",
    mantra: "Om Bram Breem Broum Sah Budhaya Namah",
    benefits: {
      en: "Sharpens intellect, communication, business success, and education.",
      hi: "बुद्धि, व्यापार, वाणी, एकाग्रता एवं विद्या में अपार सफलता देता है।",
      gu: "બુદ્ધિ, વેપાર, વાણી, એકાગ્રતા અને વિદ્યામાં સફળતા આપે છે."
    }
  },
  Jupiter: {
    stone: "Yellow Sapphire (Pukhraj / પોખરાજ)",
    metal: "Gold",
    finger: "Index finger",
    day: "Thursday morning",
    mantra: "Om Gram Greem Groum Sah Gurave Namah",
    benefits: {
      en: "Expands wisdom, spiritual growth, financial abundance, and marital bliss.",
      hi: "ज्ञान, समृद्धि, वैवाहिक सुख, संतान एवं आध्यात्मिक उन्नति प्रदान करता है।",
      gu: "જ્ઞાન, સમૃદ્ધિ, વૈવાહિક સુખ, સંતાન અને આધ્યાત્મિક ઉન્નતિ આપે છે."
    }
  },
  Venus: {
    stone: "Diamond or White Sapphire (Heera / હીરો)",
    metal: "Platinum or Silver",
    finger: "Middle or Little finger",
    day: "Friday morning",
    mantra: "Om Shram Shreem Shroum Sah Shukraya Namah",
    benefits: {
      en: "Enhances artistic charm, luxury, vehicles, relationship harmony, and beauty.",
      hi: "कलात्मक आकर्षण, भौतिक सुख-सुविधा, सौंदर्य एवं दांपत्य सुख बढ़ाता है।",
      gu: "કલાત્મક આકર્ષણ, ભૌતિક સુખ-સગવડ, સૌંદર્ય અને દાંપત્ય સુખ વધારે છે."
    }
  },
  Saturn: {
    stone: "Blue Sapphire (Neelam / નીલમ)",
    metal: "Silver or Iron",
    finger: "Middle finger",
    day: "Saturday evening",
    mantra: "Om Pram Preem Proum Sah Shanaischaraya Namah",
    benefits: {
      en: "Bestows focus, discipline, judicial success, mass appeal, and protects from accidents.",
      hi: "अनुशासन, एकाग्रता, जनसमर्थन, न्यायप्रियता एवं सुरक्षा प्रदान करता है।",
      gu: "શિસ્ત, એકાગ્રતા, જનસમર્થન, ન્યાયપ્રિયતા અને રક્ષણ આપે છે."
    }
  }
};

export function calculateLuckyFactorsAndGemstones(kundliData) {
  const planets = kundliData.planets;
  const lagnaSignIdx = kundliData.lagnaSignIndex;
  
  // Lords
  const lagnaLord = RASHIS[lagnaSignIdx].lord;
  const fifthSignIdx = (lagnaSignIdx + 4) % 12;
  const fifthLord = RASHIS[fifthSignIdx].lord;
  const ninthSignIdx = (lagnaSignIdx + 8) % 12;
  const ninthLord = RASHIS[ninthSignIdx].lord;

  // Lucky Gemstones
  const lifeStone = {
    type: "Life Stone (Lagna Ratna)",
    planet: lagnaLord,
    ...GEMSTONE_DETAILS[lagnaLord]
  };

  const fortuneStone = {
    type: "Fortune Stone (Bhagya Ratna)",
    planet: ninthLord,
    ...GEMSTONE_DETAILS[ninthLord]
  };

  const intellectStone = {
    type: "Intellect Stone (Vidya Ratna)",
    planet: fifthLord,
    ...GEMSTONE_DETAILS[fifthLord]
  };

  // Lucky Numbers, Colors, and Directions based on Lagna Lord
  const luckyProfiles = {
    Sun:     { number: [1, 10, 19, 28], color: "Orange / Golden Red", direction: "East", deity: "Lord Surya / Shiva" },
    Moon:    { number: [2, 11, 20, 29], color: "Pearl White / Silver", direction: "North-West", deity: "Lord Shiva / Parvati" },
    Mars:    { number: [9, 18, 27],     color: "Crimson Red / Coral",  direction: "South", deity: "Lord Hanuman / Kartikeya" },
    Mercury: { number: [5, 14, 23],     color: "Emerald Green",        direction: "North", deity: "Lord Ganesha / Vishnu" },
    Jupiter: { number: [3, 12, 21, 30], color: "Yellow / Saffron",     direction: "North-East (Ishan)", deity: "Lord Vishnu / Dakshinamurthy" },
    Venus:   { number: [6, 15, 24],     color: "White / Pink / Pastels", direction: "South-East", deity: "Goddess Lakshmi" },
    Saturn:  { number: [8, 17, 26],     color: "Deep Blue / Black",    direction: "West", deity: "Lord Shani / Hanuman" }
  };

  const luckyMeta = luckyProfiles[lagnaLord] || luckyProfiles.Jupiter;

  // Jaimini 7 Karakas Calculation (sorted by highest degree in sign)
  const majorPlanets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const sortedByDeg = majorPlanets
    .map(name => ({ name, deg: planets[name] ? (planets[name].lon % 30) : 0, rashi: planets[name]?.rashi?.id }))
    .sort((a, b) => b.deg - a.deg);

  const karakaTitles = [
    { title: "Atmakaraka (AK)", role: "King of Soul / Self & Destiny", desc: "Most influential planet directing soul evolution and prime life lessons." },
    { title: "Amatyakaraka (AmK)", role: "Career & Mind Minister", desc: "Guides profession, status, analytical capability, and livelihood." },
    { title: "Bhratrukaraka (BK)", role: "Guru & Siblings", desc: "Represents guides, fatherly figures, mentors, and brothers/sisters." },
    { title: "Matrukaraka (MK)", role: "Mother & Happiness", desc: "Signifies domestic comfort, emotional roots, home, and education." },
    { title: "Putrakaraka (PK)", role: "Children & Wisdom", desc: "Influences intellect, creative talents, offspring, and future karma." },
    { title: "Gnatikaraka (GK)", role: "Challenges & Relatives", desc: "Points to spiritual trials, rivals, cousin relations, and tenacity." },
    { title: "Darakaraka (DK)", role: "Spouse & Partnerships", desc: "Primary significator for marriage, spouse traits, and business partners." }
  ];

  const jaiminiKarakas = sortedByDeg.map((p, idx) => ({
    ...karakaTitles[idx],
    planet: p.name,
    degree: p.deg.toFixed(2),
    rashi: p.rashi
  }));

  return {
    gemstones: [lifeStone, fortuneStone, intellectStone],
    luckyMeta,
    jaiminiKarakas
  };
}
