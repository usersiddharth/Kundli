// Kundli Matchmaking (36-Guna Ashtakoot Milan Engine)

import { getNakshatraInfo } from './kundli.js';

export function calculateGunMilan(brideAstro, groomAstro) {
  const brideMoon = brideAstro.planets.Moon.lon;
  const groomMoon = groomAstro.planets.Moon.lon;

  const brideNak = getNakshatraInfo(brideMoon);
  const groomNak = getNakshatraInfo(groomMoon);

  const brideSignIdx = Math.floor(brideMoon / 30);
  const groomSignIdx = Math.floor(groomMoon / 30);

  // 1. Varna (1 Point)
  const varnaRanks = { Brahmin: 4, Kshatriya: 3, Vaishya: 2, Merchant: 2, Farmer: 2, Shudra: 1 };
  let bVarna = varnaRanks[brideNak.varna] || 2;
  let gVarna = varnaRanks[groomNak.varna] || 2;
  let varnaScore = gVarna >= bVarna ? 1 : 0;

  // 2. Vashya (2 Points)
  let vashyaScore = brideSignIdx === groomSignIdx ? 2 : 1;

  // 3. Tara (3 Points)
  let diffTara = ((groomNak.index - brideNak.index + 27) % 27) % 9;
  let taraScore = [1, 3, 5, 7].includes(diffTara) ? 1.5 : 3;

  // 4. Yoni (4 Points)
  let yoniScore = brideNak.yoni === groomNak.yoni ? 4 : 2;

  // 5. Graha Maitri (5 Points)
  const signLords = [
    'Mars',
    'Venus',
    'Mercury',
    'Moon',
    'Sun',
    'Mercury',
    'Venus',
    'Mars',
    'Jupiter',
    'Saturn',
    'Saturn',
    'Jupiter',
  ];
  let bLord = signLords[brideSignIdx];
  let gLord = signLords[groomSignIdx];
  let maitriScore = bLord === gLord ? 5 : 3;

  // 6. Gana (6 Points)
  let bGana = brideNak.gana;
  let gGana = groomNak.gana;
  let ganaScore = 6;
  if (bGana === gGana) {
    ganaScore = 6;
  } else if (
    (bGana === 'Deva' && gGana === 'Manushya') ||
    (bGana === 'Manushya' && gGana === 'Deva')
  ) {
    ganaScore = 5;
  } else if (
    (bGana === 'Deva' && gGana === 'Rakshasa') ||
    (bGana === 'Rakshasa' && gGana === 'Deva')
  ) {
    ganaScore = 1;
  } else {
    ganaScore = 0; // Manushya & Rakshasa
  }

  // 7. Bhakoot (7 Points)
  let dist = ((groomSignIdx - brideSignIdx + 12) % 12) + 1;
  let bhakootScore = 7;
  let bhakootDosha = false;
  if ([2, 12, 6, 8, 5, 9].includes(dist)) {
    bhakootDosha = true;
    // Cancellation if lords are same or friends
    if (bLord === gLord) {
      bhakootScore = 7;
      bhakootDosha = false;
    } else {
      bhakootScore = 0;
    }
  }

  // 8. Nadi (8 Points)
  let nadiScore = 8;
  let nadiDosha = false;
  if (brideNak.nadi === groomNak.nadi) {
    nadiDosha = true;
    if (brideNak.name !== groomNak.name) {
      // Different Nakshatra cancels Nadi Dosha
      nadiScore = 8;
      nadiDosha = false;
    } else {
      nadiScore = 0;
    }
  }

  let totalScore =
    varnaScore +
    vashyaScore +
    taraScore +
    yoniScore +
    maitriScore +
    ganaScore +
    bhakootScore +
    nadiScore;

  // Cross Mangal Dosh Check
  const brideMarsHouse = brideAstro.planets.Mars.houseNum;
  const groomMarsHouse = groomAstro.planets.Mars.houseNum;
  const mangalHouses = [1, 4, 7, 8, 12];
  const brideHasMangal = mangalHouses.includes(brideMarsHouse);
  const groomHasMangal = mangalHouses.includes(groomMarsHouse);
  const mangalMatch = brideHasMangal === groomHasMangal;

  return {
    totalScore,
    maxScore: 36,
    scores: {
      varna: varnaScore,
      vashya: vashyaScore,
      tara: taraScore,
      yoni: yoniScore,
      maitri: maitriScore,
      gana: ganaScore,
      bhakoot: bhakootScore,
      nadi: nadiScore,
    },
    doshas: {
      bhakootDosha,
      nadiDosha,
      brideHasMangal,
      groomHasMangal,
      mangalMatch,
    },
  };
}
