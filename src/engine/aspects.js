// Planetary Aspect (Graha Drishti) Calculation Engine

export function calculatePlanetaryAspects(kundliData) {
  const planets = kundliData.planets;
  const aspectRules = {
    Sun: [7],
    Moon: [7],
    Mars: [4, 7, 8],
    Mercury: [7],
    Jupiter: [5, 7, 9],
    Venus: [7],
    Saturn: [3, 7, 10],
    Rahu: [5, 7, 9],
    Ketu: [5, 7, 9]
  };

  const aspectList = [];

  Object.keys(aspectRules).forEach(pName => {
    let p = planets[pName];
    if (!p) return;

    let sourceHouse = p.houseNum;
    let distances = aspectRules[pName];

    distances.forEach(dist => {
      let targetHouse = (((sourceHouse + dist - 2) % 12 + 12) % 12) + 1;
      let planetsInTarget = [];
      Object.keys(planets).forEach(otherP => {
        if (otherP !== pName && planets[otherP].houseNum === targetHouse) {
          planetsInTarget.push(otherP);
        }
      });

      aspectList.push({
        aspectingPlanet: pName,
        sourceHouse,
        aspectDistance: dist,
        targetHouse,
        targetHouseRashi: kundliData.d1Houses[targetHouse - 1].rashi.id,
        targetPlanets: planetsInTarget
      });
    });
  });

  return aspectList;
}
