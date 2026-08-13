// Comprehensive Vedic Shodashvarga (Divisional Charts) Engine

import { RASHIS, HOUSE_SIGNIFICANCE } from './kundli.js';

export const VARGA_DEFINITIONS = [
  { id: 'D1', name: 'Rashi (D1)', purpose: { en: 'Overall Life, Physique & General Destiny', hi: 'समग्र जीवन, शरीर एवं सामान्य भाग्य', gu: 'સમગ્ર જીવન, શરીર અને સામાન્ય ભાગ્ય' } },
  { id: 'D2', name: 'Hora (D2)', purpose: { en: 'Wealth, Assets & Prosperity', hi: 'धन, संपत्ति एवं आर्थिक समृद्धि', gu: 'ધન, સંપત્તિ અને આર્થિક સમૃદ્ધિ' } },
  { id: 'D3', name: 'Drekkana (D3)', purpose: { en: 'Siblings, Courage, Vitality & Energy', hi: 'भाई-बहन, पराक्रम, साहस एवं ऊर्जा', gu: 'ભાઈ-બહેન, પરાક્રમ, સાહસ અને શક્તિ' } },
  { id: 'D4', name: 'Chaturthamsha (D4)', purpose: { en: 'Fixed Assets, Land, House & Destiny', hi: 'अचल संपत्ति, भूमि, गृह एवं भाग्य', gu: 'સ્થાવર મિલકત, જમીન-મકાન અને સુખ' } },
  { id: 'D7', name: 'Saptamsha (D7)', purpose: { en: 'Children, Progeny & Creative Lineage', hi: 'संतान, वंश वृद्धि एवं रचनात्मक क्षमता', gu: 'સંતાન, વંશ વૃદ્ધિ અને રચનાત્મકતા' } },
  { id: 'D9', name: 'Navamsha (D9)', purpose: { en: 'Spouse, Marriage, Dharma & Inner Soul', hi: 'विवाह, जीवनसाथी, धर्म एवं अंतरात्मा', gu: 'લગ્ન, જીવનસાથી, ધર્મ અને આત્મા' } },
  { id: 'D10', name: 'Dashamsha (D10)', purpose: { en: 'Career, Profession, Fame & Authority', hi: 'व्यवसाय, पद-प्रतिष्ठा, ख्याति एवं अधिकार', gu: 'કારકિર્દી, પદ-પ્રતિષ્ઠા, કીર્તિ અને વેપાર' } },
  { id: 'D12', name: 'Dwadashamsha (D12)', purpose: { en: 'Parents, Lineage & Ancestral Karma', hi: 'माता-पिता, वंश परम्परा एवं पैतृक कर्म', gu: 'માતા-પિતા, વંશ અને પિતૃ કર્મ' } },
  { id: 'D16', name: 'Shodashamsha (D16)', purpose: { en: 'Vehicles, Conveyances & Luxuries', hi: 'वाहन, सुख-साधन एवं भौतिक आनंद', gu: 'વાહન, સુખ-સગવડ અને ભૌતિક આનંદ' } },
  { id: 'D20', name: 'Vimshamsha (D20)', purpose: { en: 'Spiritual Progress & Worship', hi: 'आध्यात्मिक साधना, भक्ति एवं उपासना', gu: 'આધ્યાત્મિક સાધના, ભક્તિ અને ઉપાસના' } },
  { id: 'D24', name: 'Chaturvimshamsha (D24)', purpose: { en: 'Higher Learning, Wisdom & Skills', hi: 'उच्च विद्या, ज्ञान, बुद्धि एवं कौशल', gu: 'ઉચ્ચ વિદ્યા, જ્ઞાન, બુદ્ધિ અને કૌશલ્ય' } },
  { id: 'D30', name: 'Trimshamsha (D30)', purpose: { en: 'Misfortunes, Evils & Karmic Obstacles', hi: 'अरिष्ट, व्याधि, संकट एवं कर्म बाधा', gu: 'સંકટ, વ્યાધિ, અડચણો અને કર્મના ફળ' } },
  { id: 'D60', name: 'Shashtiamsha (D60)', purpose: { en: 'Past Life Karma & Ultimate Destiny', hi: 'पूर्व जन्म के कर्म एवं सूक्ष्म प्रारब्ध', gu: 'પૂર્વ જન્મના કર્મ અને સૂક્ષ્મ પ્રારબ્ધ' } }
];

// Helper: Calculate Varga Sign Index for a given longitude and division factor
export function getVargaSignIndex(lon, vargaId) {
  const normLon = (lon % 360 + 360) % 360;
  const signIdx = Math.floor(normLon / 30) % 12;
  const degInSign = normLon % 30;
  const isOddSign = signIdx % 2 === 0; // Aries(0), Gemini(2), Leo(4)...

  switch (vargaId) {
    case 'D1':
      return signIdx;

    case 'D2': { // Hora (15° division: Sun / Moon)
      if (isOddSign) {
        return degInSign < 15 ? 4 : 3; // Leo (4) / Cancer (3)
      } else {
        return degInSign < 15 ? 3 : 4; // Cancer (3) / Leo (4)
      }
    }

    case 'D3': { // Drekkana (10° division: 1st, 5th, 9th)
      const part = Math.floor(degInSign / 10);
      return (signIdx + part * 4) % 12;
    }

    case 'D4': { // Chaturthamsha (7.5° division: 1st, 4th, 7th, 10th)
      const part = Math.floor(degInSign / 7.5);
      return (signIdx + part * 3) % 12;
    }

    case 'D7': { // Saptamsha (30/7° division)
      const part = Math.floor(degInSign / (30 / 7));
      const startSign = isOddSign ? signIdx : (signIdx + 6) % 12;
      return (startSign + part) % 12;
    }

    case 'D9': { // Navamsha (3° 20' division)
      const totalNav = Math.floor(normLon / (30 / 9));
      return totalNav % 12;
    }

    case 'D10': { // Dashamsha (3° division)
      const part = Math.floor(degInSign / 3);
      const startSign = isOddSign ? signIdx : (signIdx + 8) % 12;
      return (startSign + part) % 12;
    }

    case 'D12': { // Dwadashamsha (2.5° division)
      const part = Math.floor(degInSign / 2.5);
      return (signIdx + part) % 12;
    }

    case 'D16': { // Shodashamsha (1.875° division)
      const part = Math.floor(degInSign / 1.875);
      const signType = signIdx % 3; // 0: Movable (Aries), 1: Fixed (Leo), 2: Dual (Sagittarius)
      const startSign = signType === 0 ? 0 : signType === 1 ? 4 : 8;
      return (startSign + part) % 12;
    }

    case 'D20': { // Vimshamsha (1.5° division)
      const part = Math.floor(degInSign / 1.5);
      const signType = signIdx % 3;
      const startSign = signType === 0 ? 0 : signType === 1 ? 8 : 4;
      return (startSign + part) % 12;
    }

    case 'D24': { // Chaturvimshamsha (1.25° division)
      const part = Math.floor(degInSign / 1.25);
      const startSign = isOddSign ? 4 : 3; // Leo (4) / Cancer (3)
      return (startSign + part) % 12;
    }

    case 'D30': { // Trimshamsha
      if (isOddSign) {
        if (degInSign < 5) return 0; // Aries (Mars)
        if (degInSign < 10) return 10; // Aquarius (Saturn)
        if (degInSign < 18) return 8; // Sagittarius (Jupiter)
        if (degInSign < 25) return 2; // Gemini (Mercury)
        return 1; // Taurus (Venus)
      } else {
        if (degInSign < 5) return 1; // Taurus (Venus)
        if (degInSign < 12) return 2; // Gemini (Mercury)
        if (degInSign < 20) return 8; // Sagittarius (Jupiter)
        if (degInSign < 25) return 10; // Aquarius (Saturn)
        return 0; // Aries (Mars)
      }
    }

    case 'D60': { // Shashtiamsha (0.5° division)
      const part = Math.floor(degInSign / 0.5);
      const startSign = isOddSign ? signIdx : (signIdx + 6) % 12;
      return (startSign + part) % 12;
    }

    default:
      return signIdx;
  }
}

// Generate complete 12-house chart structure for any requested Varga
export function generateVargaChart(kundliData, vargaId) {
  const lagnaLon = kundliData.planets.Lagna.lon;
  const vargaLagnaSignIndex = getVargaSignIndex(lagnaLon, vargaId);

  const houses = Array.from({ length: 12 }, (_, i) => {
    const signIdx = (vargaLagnaSignIndex + i) % 12;
    return {
      houseNum: i + 1,
      rashiIndex: signIdx,
      rashi: RASHIS[signIdx],
      significance: HOUSE_SIGNIFICANCE[i],
      planets: []
    };
  });

  // Map each planet into the Varga chart
  Object.keys(kundliData.planets).forEach(pKey => {
    const p = kundliData.planets[pKey];
    const pVargaSignIdx = getVargaSignIndex(p.lon, vargaId);
    const houseNum = (((pVargaSignIdx - vargaLagnaSignIndex) % 12 + 12) % 12) + 1;

    houses[houseNum - 1].planets.push({
      ...p,
      vargaSignIndex: pVargaSignIdx,
      vargaRashi: RASHIS[pVargaSignIdx],
      vargaHouseNum: houseNum
    });
  });

  return {
    vargaId,
    vargaLagnaSignIndex,
    houses
  };
}
