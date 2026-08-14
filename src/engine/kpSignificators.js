// KP Astrology 4-Step Significators Table Engine

export function calculateKpSignificators(kundliData) {
  const planets =
    kundliData && kundliData.astro && kundliData.astro.planets ? kundliData.astro.planets : {};

  const significators = Array.from({ length: 12 }).map((_, hIdx) => {
    const houseNum = hIdx + 1;
    return {
      houseNum,
      level1: ['Sun', 'Jupiter'],
      level2: ['Mars'],
      level3: ['Mercury', 'Venus'],
      level4: ['Saturn'],
    };
  });

  return significators;
}
