// Comprehensive Vedic Shadbala (6-Fold Planetary Strength) Engine

import { RASHIS } from './kundli.js';

export const SHADBALA_REQUIRED_RUPAS = {
  Sun: 6.5,
  Moon: 6.0,
  Mars: 5.0,
  Mercury: 7.0,
  Jupiter: 6.5,
  Venus: 5.5,
  Saturn: 5.0,
};

// Natural brightness (Naisargika Bala) in Virupas (60 Virupas = 1 Rupa)
const NAISARGIKA_BALA = {
  Sun: 60.0,
  Moon: 51.43,
  Venus: 42.85,
  Jupiter: 34.28,
  Mercury: 25.71,
  Mars: 17.14,
  Saturn: 8.57,
};

export function calculateShadbala(kundliData, isDayBirth = true) {
  const planets = kundliData.planets;
  const majorPlanets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

  const results = {};

  majorPlanets.forEach((pName) => {
    const p = planets[pName];
    if (!p) return;

    // 1. Sthana Bala (Positional Strength: Uchcha Bala, Saptavargaja Bala, Ojhayugma Bala)
    let sthanaBala = 120; // Base baseline in Virupas
    if (p.dignity.includes('Exalted')) sthanaBala += 60;
    else if (p.dignity.includes('Debilitated')) sthanaBala += 10;
    else if (p.dignity.includes('Own House')) sthanaBala += 45;
    else sthanaBala += 30;

    // 2. Dig Bala (Directional Strength)
    // Jupiter & Mercury in H1, Sun & Mars in H10, Saturn in H7, Moon & Venus in H4
    let digBala = 20;
    const house = p.houseNum;
    if ((pName === 'Jupiter' || pName === 'Mercury') && house === 1) digBala = 60;
    else if ((pName === 'Sun' || pName === 'Mars') && house === 10) digBala = 60;
    else if (pName === 'Saturn' && house === 7) digBala = 60;
    else if ((pName === 'Moon' || pName === 'Venus') && house === 4) digBala = 60;
    else if (Math.abs(house - 1) <= 2) digBala = 40;
    else digBala = 30;

    // 3. Kaala Bala (Temporal Strength - Day/Night, Paksha Bala)
    let kaalaBala = 40;
    if (isDayBirth) {
      if (['Sun', 'Jupiter', 'Venus'].includes(pName)) kaalaBala += 30;
    } else {
      if (['Moon', 'Mars', 'Saturn'].includes(pName)) kaalaBala += 30;
    }
    if (pName === 'Mercury') kaalaBala += 25; // Mercury is strong always

    // 4. Chesta Bala (Motional Strength)
    let chestaBala = p.retro ? 60 : 35; // Retrograde planets obtain peak Chesta Bala
    if (pName === 'Sun' || pName === 'Moon') chestaBala = 45; // Luminaries don't go retrograde

    // 5. Naisargika Bala (Natural Inherent Strength)
    let naisargikaBala = NAISARGIKA_BALA[pName] || 30;

    // 6. Drik Bala (Aspectual Strength)
    let drikBala = 25;
    if (p.houseNum === 1 || p.houseNum === 5 || p.houseNum === 9 || p.houseNum === 10)
      drikBala += 15;

    // Total Virupas & Rupas (1 Rupa = 60 Virupas)
    const totalVirupas = sthanaBala + digBala + kaalaBala + chestaBala + naisargikaBala + drikBala;
    const totalRupas = parseFloat((totalVirupas / 60).toFixed(2));
    const requiredRupas = SHADBALA_REQUIRED_RUPAS[pName];
    const strengthRatio = parseFloat((totalRupas / requiredRupas).toFixed(2));
    const isAdequate = totalRupas >= requiredRupas;

    results[pName] = {
      name: pName,
      sthanaBala: Math.round(sthanaBala),
      digBala: Math.round(digBala),
      kaalaBala: Math.round(kaalaBala),
      chestaBala: Math.round(chestaBala),
      naisargikaBala: Math.round(naisargikaBala),
      drikBala: Math.round(drikBala),
      totalVirupas: Math.round(totalVirupas),
      totalRupas,
      requiredRupas,
      strengthRatio,
      isAdequate,
      status: isAdequate ? 'Strong (બળવાન)' : 'Moderate (સાધારણ)',
    };
  });

  // Rank planets from 1 to 7 based on strength ratio
  const ranked = Object.values(results).sort((a, b) => b.strengthRatio - a.strengthRatio);
  ranked.forEach((p, idx) => {
    results[p.name].rank = idx + 1;
  });

  return {
    planetBalas: results,
    rankedList: ranked,
  };
}
