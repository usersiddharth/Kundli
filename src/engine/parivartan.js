// Graha Parivartan Yoga (Mutual House Exchange) Detection & Impact Engine

import { RASHIS } from './kundli.js';

export function detectParivartanYogas(kundliData) {
  const planets = kundliData.planets;
  const majorPlanets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const parivartanResults = [];

  const dusthanaHouses = [6, 8, 12];
  const kendraTrikonaHouses = [1, 2, 4, 5, 7, 9, 10, 11];

  for (let i = 0; i < majorPlanets.length; i++) {
    for (let j = i + 1; j < majorPlanets.length; j++) {
      let p1Name = majorPlanets[i];
      let p2Name = majorPlanets[j];

      let p1 = planets[p1Name];
      let p2 = planets[p2Name];

      if (!p1 || !p2) continue;

      let p1SignIndex = p1.signIndex;
      let p2SignIndex = p2.signIndex;

      let p1SignLord = RASHIS[p1SignIndex].lord;
      let p2SignLord = RASHIS[p2SignIndex].lord;

      // Check mutual exchange condition: p1 sits in p2's sign lord & p2 sits in p1's sign lord
      if (p1SignLord === p2Name && p2SignLord === p1Name) {
        let h1 = p1.houseNum;
        let h2 = p2.houseNum;

        let yogaType = '';
        let impactCategory = '';

        if (dusthanaHouses.includes(h1) || dusthanaHouses.includes(h2)) {
          yogaType = 'Dainya Yoga';
          impactCategory = 'Challenging / Transformation';
        } else if (h1 === 3 || h2 === 3) {
          yogaType = 'Kahala Yoga';
          impactCategory = 'Effort & Courage';
        } else {
          yogaType = 'Maha Yoga';
          impactCategory = 'Highly Auspicious & Royal';
        }

        parivartanResults.push({
          planet1: p1Name,
          planet2: p2Name,
          house1: h1,
          house2: h2,
          sign1: p1.rashi.id,
          sign2: p2.rashi.id,
          yogaType,
          impactCategory,
          details: {
            en: `${p1Name} (House ${h1}) and ${p2Name} (House ${h2}) exchange their houses. This creates a ${yogaType}.`,
            hi: `${p1Name} (भाव ${h1}) तथा ${p2Name} (भाव ${h2}) ने अपनी राशियों का विनिमय किया है। यह एक ${yogaType} बनाता है।`,
            gu: `${p1Name} (સ્થાન ${h1}) અને ${p2Name} (સ્થાન ${h2}) એ એકબીજાની રાશિનું પરિવર્તન કર્યું છે. આ એક ${yogaType} સર્જે છે.`,
          },
        });
      }
    }
  }

  return parivartanResults;
}
