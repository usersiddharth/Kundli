// Real-Time Gochar (Current Transit) Analysis Engine

import { calculatePlanetaryPositions } from './astronomy.js';
import { RASHIS } from './kundli.js';

export function calculateCurrentTransits(natalMoonSignIndex) {
  const now = new Date();
  const currentAstro = calculatePlanetaryPositions(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    23.0225, // Default lat/lng for current ephemeris
    72.5714,
    5.5
  );

  const currentPlanets = currentAstro.planets;
  const transitReport = [];

  Object.keys(currentPlanets).forEach(pName => {
    if (pName === 'Lagna') return;
    let p = currentPlanets[pName];
    let currentSignIndex = Math.floor(p.lon / 30);
    // House position from Natal Moon
    let houseFromMoon = (((currentSignIndex - natalMoonSignIndex) % 12 + 12) % 12) + 1;

    let impact = "Neutral";
    let isFavorable = [3, 6, 10, 11].includes(houseFromMoon);
    if (pName === 'Jupiter' && [2, 5, 7, 9, 11].includes(houseFromMoon)) isFavorable = true;
    if (pName === 'Moon' && [1, 3, 6, 7, 10, 11].includes(houseFromMoon)) isFavorable = true;

    transitReport.push({
      planet: pName,
      currentSign: RASHIS[currentSignIndex].id,
      houseFromMoon,
      degree: (p.lon % 30).toFixed(2),
      isFavorable,
      desc: {
        en: `${pName} is transiting House ${houseFromMoon} from your Natal Moon. Result: ${isFavorable ? 'Auspicious & Positive' : 'Requires Caution & Patience'}.`,
        hi: `${pName} आपकी जन्म चंद्र राशि से भाव ${houseFromMoon} में गोचर कर रहा है। परिणाम: ${isFavorable ? 'शुभ एवं सकारात्मक' : 'सावधानी एवं धैर्य आवश्यक'}।`,
        gu: `${pName} તમારી જન્મ ચંદ્ર રાશિથી સ્થાન ${houseFromMoon} માં ગોચર કરી રહ્યો છે. પરિણામ: ${isFavorable ? 'શુભ અને સકારાત્મક' : 'સાવધાની અને ધીરજ જરૂરી'}.`
      }
    });
  });

  return transitReport;
}
