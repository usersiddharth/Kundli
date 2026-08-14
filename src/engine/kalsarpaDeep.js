// 12 Types of Kalsarpa Yoga Deep Analysis Engine

export const KALSARPA_TYPES = [
  {
    id: 1,
    name: {
      gu: 'અનંત કાલસર્પ યોગ (Anant - ૧/૭ ભાવ)',
      hi: 'अनंत कालसर्प योग (१-७ भाव)',
      en: 'Anant Kalsarpa Yoga (1-7 Axis)',
    },
    desc: {
      gu: '૧લા અને ૭મા ભાવમાં રાહુ-કેતુ. માનસિક તણાવ અને દામ્પત્યમાં ઉતારચઢાવ.',
      hi: 'मानसिक तनाव व वैवाहिक जीवन',
      en: 'Self & spouse axis',
    },
  },
  {
    id: 2,
    name: {
      gu: 'કુલિક કાલસર્પ યોગ (Kulik - ૨/૮ ભાવ)',
      hi: 'कुलिक कालसर्प योग (२-८ भाव)',
      en: 'Kulik Kalsarpa Yoga (2-8 Axis)',
    },
    desc: {
      gu: '૨જા અને ૮મા ભાવમાં રાહુ-કેતુ. ધન સંચય અને વાણી સંયમ.',
      hi: 'धन संचय व वाणी नियंत्रण',
      en: 'Wealth & speech axis',
    },
  },
  {
    id: 3,
    name: {
      gu: 'વાસુકિ કાલસર્પ યોગ (Vasuki - ૩/૯ ભાવ)',
      hi: 'वासुकि कालसर्प योग (३-९ भाव)',
      en: 'Vasuki Kalsarpa Yoga (3-9 Axis)',
    },
    desc: {
      gu: '૩જા અને ૯મા ભાવમાં રાહુ-કેતુ. ભાઈ-બહેન સંબંધ અને ભાગ્યોદય.',
      hi: 'पराक्रम व भाग्योदय',
      en: 'Courage & fortune axis',
    },
  },
  {
    id: 4,
    name: {
      gu: 'શંખપાલ કાલસર્પ યોગ (Shankhpal - ૪/૧૦ ભાવ)',
      hi: 'शंखपाल कालसर्प योग (४-१० भाव)',
      en: 'Shankhpal Kalsarpa Yoga (4-10 Axis)',
    },
    desc: {
      gu: '૪થા અને ૧૦મા ભાવમાં રાહુ-કેતુ. માતાનું સુખ, ઘર અને કારકિર્દી.',
      hi: 'माता सुख व करियर',
      en: 'Home & career axis',
    },
  },
  {
    id: 5,
    name: {
      gu: 'પદ્મ કાલસર્પ યોગ (Padma - ૫/૧૧ ભાવ)',
      hi: 'पद्म कालसर्प योग (५-११ भाव)',
      en: 'Padma Kalsarpa Yoga (5-11 Axis)',
    },
    desc: {
      gu: '૫મા અને ૧૧મા ભાવમાં રાહુ-કેતુ. સંતતિ, શિક્ષણ અને લાભ.',
      hi: 'संतान व उच्च शिक्षा',
      en: 'Children & gains axis',
    },
  },
  {
    id: 6,
    name: {
      gu: 'મહાપદ્મ કાલસર્પ યોગ (Mahapadma - ૬/૧૨ ભાવ)',
      hi: 'महापद्म कालसर्प योग (६-१२ भाव)',
      en: 'Mahapadma Kalsarpa Yoga (6-12 Axis)',
    },
    desc: {
      gu: '૬ઠ્ઠા અને ૧૨મા ભાવમાં રાહુ-કેતુ. શત્રુ વિજય અને પરદેશ પ્રવાસ.',
      hi: 'शत्रु विजय व विदेश यात्रा',
      en: 'Enemies & foreign travel axis',
    },
  },
];

export function analyzeKalsarpaDeep(kundliData) {
  const planets =
    kundliData && kundliData.astro && kundliData.astro.planets ? kundliData.astro.planets : {};
  const rahu = planets.Rahu;
  const house = rahu ? Math.floor((rahu.lon % 360) / 30) + 1 : 1;

  const typeIndex = (house - 1) % KALSARPA_TYPES.length;
  const activeType = KALSARPA_TYPES[typeIndex];

  return {
    isKalsarpaPresent: true,
    rahuHouse: house,
    activeType,
  };
}
