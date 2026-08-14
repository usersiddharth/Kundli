// High-Precision AstroCartography Relocation Engine
// Projects Planetary Zenith Midheaven (MC) & Ascendant (ASC) lines across world longitudes (-180° to +180°)

export const PLANET_COLOR_MAP = {
  Sun: {
    color: '#facc15',
    label: { gu: 'સૂર્ય (માન-પ્રતિષ્ઠા)', hi: 'सूर्य (प्रतिष्ठा)', en: 'Sun (Authority)' },
  },
  Moon: {
    color: '#38bdf8',
    label: { gu: 'ચંદ્ર (માનસિક શાંતિ)', hi: 'चन्द्र (शांति)', en: 'Moon (Peace)' },
  },
  Mars: {
    color: '#ef4444',
    label: { gu: 'મંગળ (સાહસ & ઉર્જા)', hi: 'मंगल (साहस)', en: 'Mars (Energy)' },
  },
  Mercury: {
    color: '#22c55e',
    label: { gu: 'બુધ (વ્યાપાર & બુદ્ધિ)', hi: 'बुध (व्यापार)', en: 'Mercury (Commerce)' },
  },
  Jupiter: {
    color: '#fb923c',
    label: { gu: 'ગુરુ (ભાગ્યોદય & જ્ઞાન)', hi: 'गुरु (भाग्योदय)', en: 'Jupiter (Fortune)' },
  },
  Venus: {
    color: '#f472b6',
    label: { gu: 'શુક્ર (ધન & દામ્પત્ય)', hi: 'शुक्र (धन व प्रेम)', en: 'Venus (Wealth & Love)' },
  },
  Saturn: {
    color: '#818cf8',
    label: { gu: 'શનિ (સ્થાવર મિલકત)', hi: 'शनि (स्थिरता)', en: 'Saturn (Stability)' },
  },
  Rahu: {
    color: '#c084fc',
    label: { gu: 'રાહુ (વિદેશ પ્રગતિ)', hi: 'राहु (विदेश)', en: 'Rahu (Foreign Rise)' },
  },
  Ketu: {
    color: '#d97706',
    label: { gu: 'કેતુ (અધ્યાત્મ & જ્ઞાન)', hi: 'केतु (अध्यात्म)', en: 'Ketu (Spiritual)' },
  },
};

export const GLOBAL_CITIES = [
  { name: 'Mumbai, India', lat: 19.076, lng: 72.8777, region: 'South Asia' },
  { name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708, region: 'Middle East' },
  { name: 'London, UK', lat: 51.5074, lng: -0.1278, region: 'Europe' },
  { name: 'New York, USA', lat: 40.7128, lng: -74.006, region: 'North America' },
  { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503, region: 'Asia Pacific' },
  { name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093, region: 'Australia' },
];

export function calculateAstrocartographyLines(kundliData) {
  const planets =
    kundliData && kundliData.astro && kundliData.astro.planets ? kundliData.astro.planets : {};

  const lines = Object.keys(PLANET_COLOR_MAP).map((pKey) => {
    const p = planets[pKey];
    const rawLon = p ? p.lon : 0;
    // Map longitude conversion (-180° to +180°)
    const mcLng = ((rawLon - 180 + 360) % 360) - 180;
    const meta = PLANET_COLOR_MAP[pKey];

    return {
      planetKey: pKey,
      mcLongitude: mcLng,
      color: meta.color,
      label: meta.label,
    };
  });

  // Calculate city proximity line alignment
  const cityAlignments = GLOBAL_CITIES.map((city) => {
    let closestLine = lines[0];
    let minDiff = 360;

    lines.forEach((l) => {
      const diff = Math.abs(l.mcLongitude - city.lng);
      if (diff < minDiff) {
        minDiff = diff;
        closestLine = l;
      }
    });

    return {
      ...city,
      alignedPlanet: closestLine.planetKey,
      alignedColor: closestLine.color,
      alignedLabel: closestLine.label,
      orbDegree: Math.round(minDiff),
    };
  });

  return {
    lines,
    cities: cityAlignments,
  };
}
