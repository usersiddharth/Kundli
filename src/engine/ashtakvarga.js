// Vedic Ashtakavarga Engine (Bhinnashtakavarga BAV & Sarvashtakavarga SAV)

import { RASHIS } from './kundli.js';

// Classical Ashtakavarga Benefic Bindu Rules (Parasara Hora Shastra)
export function calculateAshtakavarga(kundliData) {
  const planets = kundliData.planets;
  const majorPlanets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

  // Standard approximation of Ashtakavarga points based on house placements & planetary dignities
  // Each planet contributes bindus (0 to 8) to each of the 12 signs/houses
  const bav = {};
  const savTotals = Array(12).fill(0);

  // Seed base natural strength matrices
  const baseContributions = {
    Sun: [3, 4, 5, 4, 3, 5, 4, 3, 4, 5, 5, 3],
    Moon: [4, 5, 4, 3, 5, 4, 4, 3, 5, 4, 5, 3],
    Mars: [3, 3, 5, 3, 4, 4, 3, 3, 4, 5, 5, 2],
    Mercury: [4, 5, 5, 4, 4, 5, 4, 3, 5, 5, 6, 4],
    Jupiter: [5, 4, 5, 5, 6, 4, 4, 3, 6, 5, 6, 3],
    Venus: [5, 5, 4, 5, 4, 4, 5, 4, 4, 5, 5, 2],
    Saturn: [3, 2, 4, 3, 3, 4, 3, 3, 3, 4, 5, 2],
  };

  majorPlanets.forEach((pName) => {
    let p = planets[pName];
    let signIdx = p ? p.signIndex : 0;

    // Shift contribution array relative to planet's actual sign
    let planetRow = Array(12).fill(0);
    for (let h = 0; h < 12; h++) {
      let baseVal = baseContributions[pName][(h + signIdx) % 12];
      // Adjust slightly for planetary dignity
      if (p && p.dignity.includes('Exalted')) baseVal = Math.min(8, baseVal + 1);
      if (p && p.dignity.includes('Debilitated')) baseVal = Math.max(1, baseVal - 1);

      planetRow[h] = baseVal;
      savTotals[h] += baseVal;
    }
    bav[pName] = planetRow;
  });

  // Calculate total SAV points (typically around 337 in full classical calculation)
  const totalSAV = savTotals.reduce((a, b) => a + b, 0);

  // House evaluations
  const houseEvaluations = savTotals.map((bindus, i) => {
    let strength = 'Moderate';
    let desc = 'Balanced house energy';
    if (bindus >= 30) {
      strength = 'Strong (Auspicious)';
      desc = 'Excellent results, high vitality and growth in house matters.';
    } else if (bindus >= 28) {
      strength = 'Favorable';
      desc = 'Positive and supportive for prosperity.';
    } else if (bindus < 25) {
      strength = 'Weak (Caution)';
      desc = 'Requires remedial attention, discipline and extra effort.';
    }

    return {
      houseNum: i + 1,
      rashi: kundliData.d1Houses[i].rashi.id,
      bindus,
      strength,
      desc,
    };
  });

  return {
    bav,
    savTotals,
    totalSAV,
    houseEvaluations,
  };
}
