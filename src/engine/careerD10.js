// D10 Dashamsha Career Blueprint Calculation Engine

export const CAREER_DOMAINS = [
  {
    id: 'exec',
    name: { gu: 'શાસન, પ્રશાસન & સત્તા', hi: 'प्रशासन व नेतृत्व', en: 'Government & Leadership' },
    icon: 'Crown',
    desc: {
      gu: 'સરકારી પદ, રાજકારણ, વ્યવસ્થાપન અને વરિષ્ઠ લીડરશિપ',
      hi: 'सरकारी सेवा व नेतृत्व',
      en: 'Executive & Admin roles',
    },
  },
  {
    id: 'tech',
    name: { gu: 'ટેકનોલોજી, આઈટી & એન્જિનિયરિંગ', hi: 'तकनीक व आईटी', en: 'Technology & IT' },
    icon: 'Cpu',
    desc: {
      gu: 'સોફ્ટવેર, એન્જિનિયરિંગ, ડેટા સાયન્સ અને ઈનોવેશન',
      hi: 'सॉफ्टवेयर व डेटा साइंस',
      en: 'Software & Engineering',
    },
  },
  {
    id: 'biz',
    name: { gu: 'વ્યાપાર, વેપાર & ઈ-કોમર્સ', hi: 'व्यापार व वाणिज्य', en: 'Commerce & Trading' },
    icon: 'Briefcase',
    desc: {
      gu: 'પોતાનો સ્વતંત્ર વ્યાપાર, આયાત-નિકાસ અને રીટેલ',
      hi: 'स्वतंत्र व्यापार',
      en: 'Business & Commerce',
    },
  },
  {
    id: 'finance',
    name: {
      gu: 'નાણાકીય, બેન્કિંગ & ચાર્ટર્ડ એકાઉન્ટન્ટ',
      hi: 'बैंकिंग व वित्त',
      en: 'Finance & Banking',
    },
    icon: 'DollarSign',
    desc: {
      gu: 'બેન્કિંગ, સટ્ટાબજાર, સીએ અને ફાઇનાન્સિયિલ એડવાઈઝરી',
      hi: 'बैंकिंग व वित्तीय सलाह',
      en: 'Banking & Advisory',
    },
  },
  {
    id: 'creative',
    name: { gu: 'કળા, મીડિયા, ડિઝાઇન & મનોરંજન', hi: 'कला व मीडिया', en: 'Creative Arts & Media' },
    icon: 'Palette',
    desc: {
      gu: 'ડિઝાઇનિંગ, લેખન, સિનેમા, મીડિયા અને ક્રિએટિવ આર્ટ્સ',
      hi: 'डिजाइनिंग व मीडिया',
      en: 'Arts, Media & Design',
    },
  },
  {
    id: 'medical',
    name: {
      gu: 'તબીબી, ફાર્મા & સેવા ક્ષેત્ર',
      hi: 'चिकित्सा व सेवा',
      en: 'Healthcare & Medicine',
    },
    icon: 'Activity',
    desc: {
      gu: 'ડૉક્ટર, ફાર્માસ્યુટિકલ, હોસ્પિટલ અને લોકસેવા',
      hi: 'चिकित्सा व समाज सेवा',
      en: 'Healthcare & Pharma',
    },
  },
];

/**
 * Evaluate D10 Dashamsha Career Strengths
 */
export function analyzeD10Career(kundliData) {
  const planets =
    kundliData && kundliData.astro && kundliData.astro.planets ? kundliData.astro.planets : {};

  const sunLon = planets.Sun ? planets.Sun.lon : 0;
  const marsLon = planets.Mars ? planets.Mars.lon : 0;

  // D10 Lagna & 10th Lord calculation simulation
  const d10Sign = Math.floor((sunLon * 10) / 30) % 12;

  const recommendedDomains = [
    CAREER_DOMAINS[d10Sign % CAREER_DOMAINS.length],
    CAREER_DOMAINS[(d10Sign + 2) % CAREER_DOMAINS.length],
    CAREER_DOMAINS[(d10Sign + 4) % CAREER_DOMAINS.length],
  ];

  return {
    d10SignIndex: d10Sign,
    recommendedDomains,
  };
}
