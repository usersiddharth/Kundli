// Ayurvedic Medical Astrology & Tridosha Engine
// Maps 12 Houses & Planets to Body Organs, Tridosha Balance (Vata / Pitta / Kapha), and Health Cautions

export const TRIDOSHA_DEFS = {
  Vata: {
    name: { gu: 'વાત (Vata - વાયુ & આકાશ)', hi: 'वात (Vata)', en: 'Vata (Air & Space)' },
    desc: {
      gu: 'ચળવળ, ચેતાતંત્ર અને સાંધા',
      hi: 'तंत्रिका तंत्र व जोड़ों का संचालन',
      en: 'Nervous system, circulation & joints',
    },
    color: '#1890ff',
  },
  Pitta: {
    name: { gu: 'પિત્ત (Pitta - અગ્નિ & જળ)', hi: 'पित्त (Pitta)', en: 'Pitta (Fire & Water)' },
    desc: { gu: 'પાચન, ચયાપચય અને લીવર', hi: 'पाचन व चयापचय', en: 'Metabolism, digestion & liver' },
    color: '#b85d19',
  },
  Kapha: {
    name: { gu: 'કફ (Kapha - પૃથ્વી & જળ)', hi: 'कफ (Kapha)', en: 'Kapha (Earth & Water)' },
    desc: {
      gu: 'રોગપ્રતિકારક શક્તિ, માળખું અને ચરબી',
      hi: 'प्रतिरक्षा व संरचना',
      en: 'Immunity, structure & lubrication',
    },
    color: '#285e20',
  },
};

export const HOUSE_BODY_MAP = [
  {
    house: 1,
    organ: {
      gu: 'મસ્તક, મગજ, ચહેરો',
      hi: 'मस्तिष्क व चेहरा',
      en: 'Head, brain & facial structure',
    },
  },
  {
    house: 2,
    organ: {
      gu: 'આંખો, દાંત, ગળું, જીભ',
      hi: 'नेत्र, दंत व कण्ठ',
      en: 'Eyes, teeth, throat & voice',
    },
  },
  {
    house: 3,
    organ: {
      gu: 'કાન, ખભા, હાથ, શ્વાસનળી',
      hi: 'कर्ण, कंधे व श्वसन',
      en: 'Ears, shoulders, hands & lungs',
    },
  },
  { house: 4, organ: { gu: 'છાતી, હૃદય, ફેફસાં', hi: 'छाती व हृदय', en: 'Chest, heart & lungs' } },
  {
    house: 5,
    organ: {
      gu: 'પેટ, અન્નનળી, પિત્તાશય',
      hi: 'उदर व अमाशय',
      en: 'Stomach, digestive tract & upper abdomen',
    },
  },
  {
    house: 6,
    organ: {
      gu: 'આંતરડાં, કિડની, રોગપ્રતિકારકતા',
      hi: 'आंतें व गुर्दे',
      en: 'Intestines, kidneys & immune system',
    },
  },
  {
    house: 7,
    organ: { gu: 'કમર, પેડૂ, મૂત્રાશય', hi: 'कमर व मूत्राशय', en: 'Lower abdomen & lumbar region' },
  },
  {
    house: 8,
    organ: {
      gu: 'ગુપ્ત ભાગો, આયુષ્ય, વાસના',
      hi: 'जननेंद्रिय व आयु',
      en: 'Excretory & reproductive organs',
    },
  },
  {
    house: 9,
    organ: {
      gu: 'સાંથળ, નિતંબ, ધમનીઓ',
      hi: 'जांघ व नितंब',
      en: 'Thighs, hips & arterial circulation',
    },
  },
  {
    house: 10,
    organ: {
      gu: 'ઢીંચણ, ગોઠણ, હાડકાં',
      hi: 'जानु व अस्थियां',
      en: 'Knees, joints & skeletal system',
    },
  },
  {
    house: 11,
    organ: {
      gu: 'પિંડીઓ, ઘૂંટી, ચેતાપ્રણાલી',
      hi: 'पिंडलियां व टखने',
      en: 'Calves, ankles & nervous system',
    },
  },
  {
    house: 12,
    organ: {
      gu: 'પગના તળિયા, આંખો, નિદ્રા',
      hi: 'चरण व नेत्र',
      en: 'Feet, toes, sleep & left eye',
    },
  },
];

/**
 * Calculate Tridosha Percentage Balance based on Kundli planetary strengths
 */
export function calculateTridosha(kundliData) {
  let vataPoints = 35;
  let pittaPoints = 35;
  let kaphaPoints = 30;

  const planets = kundliData?.planets || kundliData?.astro?.planets;
  if (planets) {
    // Sun & Mars increase Pitta
    if (planets.Sun) pittaPoints += planets.Sun.lon % 30 > 15 ? 10 : 5;
    if (planets.Mars) pittaPoints += 12;

    // Saturn & Rahu increase Vata
    if (planets.Saturn) vataPoints += 14;
    if (planets.Rahu) vataPoints += 10;

    // Moon, Venus & Jupiter increase Kapha
    if (planets.Moon) kaphaPoints += 12;
    if (planets.Venus) kaphaPoints += 10;
    if (planets.Jupiter) kaphaPoints += 10;
  }

  const total = vataPoints + pittaPoints + kaphaPoints;
  const vataPct = Math.round((vataPoints / total) * 100);
  const pittaPct = Math.round((pittaPoints / total) * 100);
  const kaphaPct = 100 - (vataPct + pittaPct);

  let dominantDosha = 'Pitta';
  if (vataPct >= pittaPct && vataPct >= kaphaPct) dominantDosha = 'Vata';
  else if (kaphaPct >= vataPct && kaphaPct >= pittaPct) dominantDosha = 'Kapha';

  return {
    vataPct,
    pittaPct,
    kaphaPct,
    dominantDosha,
    dominantDef: TRIDOSHA_DEFS[dominantDosha],
  };
}
