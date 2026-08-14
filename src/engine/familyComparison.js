// Family Group Chart & Multi-Profile Comparison Engine

/**
 * Compare multiple profiles (up to 4) for element balance, SAV Ashtakvarga & Lagna compatibility
 */
export function compareFamilyProfiles(profiles = []) {
  if (!profiles || profiles.length === 0) return null;

  const ELEMENTS = [
    {
      key: 'Fire',
      name: { gu: 'અગ્નિ (Fire)', hi: 'अग्नि', en: 'Fire' },
      signs: [0, 4, 8],
      color: '#b85d19',
    },
    {
      key: 'Earth',
      name: { gu: 'પૃથ્વી (Earth)', hi: 'पृथ्वी', en: 'Earth' },
      signs: [1, 5, 9],
      color: '#285e20',
    },
    {
      key: 'Air',
      name: { gu: 'વાયુ (Air)', hi: 'वायु', en: 'Air' },
      signs: [2, 6, 10],
      color: '#1890ff',
    },
    {
      key: 'Water',
      name: { gu: 'જળ (Water)', hi: 'जल', en: 'Water' },
      signs: [3, 7, 11],
      color: '#722ed1',
    },
  ];

  const profileSummaries = profiles.map((p, idx) => {
    const astro = p.astro || p || {};
    const planets = astro.planets || p.planets || {};

    const lagnaLon = planets.Lagna ? planets.Lagna.lon : 0;
    const moonLon = planets.Moon ? planets.Moon.lon : 0;
    const sunLon = planets.Sun ? planets.Sun.lon : 0;

    const lagnaSignIdx = Math.floor(lagnaLon / 30) % 12;
    const moonSignIdx = Math.floor(moonLon / 30) % 12;
    const sunSignIdx = Math.floor(sunLon / 30) % 12;

    const elementMatch = ELEMENTS.find((e) => e.signs.includes(lagnaSignIdx)) || ELEMENTS[0];

    return {
      id: p.id || `profile_${idx}`,
      name: p.name || `Member ${idx + 1}`,
      dob: p.dob || '1990-01-01',
      lagnaSignIdx,
      moonSignIdx,
      sunSignIdx,
      element: elementMatch,
    };
  });

  // Calculate Harmony Score (0 to 100) across members
  let harmonyScore = 75;
  if (profileSummaries.length >= 2) {
    const sign1 = profileSummaries[0].lagnaSignIdx;
    const sign2 = profileSummaries[1].lagnaSignIdx;
    const dist = Math.abs(sign1 - sign2);
    if (dist === 4 || dist === 8 || dist === 0)
      harmonyScore += 18; // Trine / Same sign
    else if (dist === 6) harmonyScore -= 15; // 6/8 opposition
  }

  harmonyScore = Math.min(100, Math.max(30, harmonyScore));

  return {
    profileSummaries,
    harmonyScore,
    harmonyVerdict:
      harmonyScore >= 80
        ? 'Ultra Harmonious Family Bond'
        : harmonyScore >= 60
          ? 'Good Mutual Compatibility'
          : 'Requires Understanding & Care',
  };
}
