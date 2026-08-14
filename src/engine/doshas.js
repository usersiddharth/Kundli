// Dosha Detection Engine (Mangal Dosha, Kalsarpa Dosha & Sade Sati)

export function evaluateDoshas(kundliData) {
  const planets = kundliData.planets;
  const marsHouse = planets.Mars.houseNum;
  const marsSign = planets.Mars.rashi.id;

  // 1. Mangal Dosha Evaluation
  const mangalHouses = [1, 4, 7, 8, 12];
  const isMangalPresent = mangalHouses.includes(marsHouse);
  let isMangalCancelled = false;
  let mangalReason = '';

  if (isMangalPresent) {
    // Cancellation rules
    if (['Aries', 'Scorpio', 'Capricorn'].includes(marsSign)) {
      isMangalCancelled = true;
      mangalReason = 'Mars is in own sign or exalted sign.';
    } else if (planets.Jupiter && Math.abs(planets.Jupiter.houseNum - marsHouse) === 6) {
      isMangalCancelled = true;
      mangalReason = 'Jupiter casts 7th house aspect on Mars.';
    } else if (marsHouse === 1 && marsSign === 'Aries') {
      isMangalCancelled = true;
      mangalReason = 'Mars in 1st house in Aries sign nullifies Kuja Dosha.';
    }
  }

  // 2. Kalsarpa Dosha Evaluation
  const rahuLon = planets.Rahu.lon;
  const ketuLon = planets.Ketu.lon;
  let minLon = Math.min(rahuLon, ketuLon);
  let maxLon = Math.max(rahuLon, ketuLon);

  let side1 = 0;
  let side2 = 0;

  const majorPlanets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  majorPlanets.forEach((pName) => {
    let lon = planets[pName].lon;
    if (lon >= minLon && lon <= maxLon) {
      side1++;
    } else {
      side2++;
    }
  });

  const isKalsarpa = side1 === 7 || side2 === 7;
  const kalsarpaTypes = [
    'Anant Kalsarpa (1st - 7th House)',
    'Kulik Kalsarpa (2nd - 8th House)',
    'Vasuki Kalsarpa (3rd - 9th House)',
    'Shankhpal Kalsarpa (4th - 10th House)',
    'Padma Kalsarpa (5th - 11th House)',
    'Mahapadma Kalsarpa (6th - 12th House)',
    'Takshak Kalsarpa (7th - 1st House)',
    'Karkotak Kalsarpa (8th - 2nd House)',
    'Shankhachood Kalsarpa (9th - 3rd House)',
    'Ghatak Kalsarpa (10th - 4th House)',
    'Vishdhar Kalsarpa (11th - 5th House)',
    'Sheshnag Kalsarpa (12th - 6th House)',
  ];
  let rahuHouse = planets.Rahu.houseNum;
  let kalsarpaType = isKalsarpa ? kalsarpaTypes[rahuHouse - 1] : 'None';

  // 3. Sade Sati Status (Current Saturn position relative to Natal Moon)
  // Current Saturn is approx in Aquarius/Pisces
  let saturnCurrentSignIndex = 10; // Aquarius approx
  let moonSignIndex = planets.Moon.signIndex;
  let diffSign = (saturnCurrentSignIndex - moonSignIndex + 12) % 12;

  let sadeSatiPhase = 'Inactive';
  if (diffSign === 11) {
    sadeSatiPhase = '1st Phase (Rising Phase)';
  } else if (diffSign === 0) {
    sadeSatiPhase = '2nd Phase (Peak / Janma Shani)';
  } else if (diffSign === 1) {
    sadeSatiPhase = '3rd Phase (Setting Phase)';
  }

  return {
    mangalDosha: {
      isPresent: isMangalPresent,
      isCancelled: isMangalCancelled,
      reason: mangalReason,
      marsHouse,
      remedies: {
        en: [
          'Recite Hanuman Chalisa daily.',
          "Chant Mangal Beej Mantra: 'Om Kram Kreem Kroum Sah Bhaumaya Namah'.",
          'Offer red flowers, jaggery, and lentils on Tuesdays.',
        ],
        hi: [
          'प्रतिदिन श्री हनुमान चालीसा का पाठ करें।',
          "मंगल बीज मंत्र का जाप करें: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः'।",
          'मंगलवार को हनुमान जी को चोला चढ़ाएं और लाल वस्तुओं का दान करें।',
        ],
        gu: [
          'દરરોજ શ્રી હનુમાન ચાલીસાનો પાઠ કરો.',
          "મંગળ બીજ મંત્રનો જાપ કરો: 'ૐ ક્રાં ક્રીં ક્રૌં સઃ ભૌમાય નમઃ'.",
          'મંગળવારે હનુમાનજીને સિંદૂર અને લાલ વસ્તુઓનું દાન કરો.',
        ],
      },
    },
    kalsarpaDosha: {
      isPresent: isKalsarpa,
      type: kalsarpaType,
      remedies: {
        en: [
          'Perform Shiva Abhishekam with milk and water on Mondays.',
          'Chant Maha Mrityunjaya Mantra daily 108 times.',
          'Worship Rahu-Ketu Yantra and offer silver snakes in water.',
        ],
        hi: [
          'प्रत्येक सोमवार को शिवजी का दुग्धाभिषेक करें।',
          'प्रतिदिन 108 बार महामृत्युंजय मंत्र का पाठ करें।',
          'नाग पंचमी पर चांदी के नाग-नागिन जल में प्रवाहित करें।',
        ],
        gu: [
          'દર સોમવારે ભગવાન શિવનો જલાભિષેક અને દૂધાભિષેક કરો.',
          'દરરોજ ૧૦૮ વાર મહામૃત્યુંજય મંત્રનો જાપ કરો.',
          'નાગ પંચમી પર ચાંદીના નાગ-નાગિન જળમાં પ્રવાહિત કરો.',
        ],
      },
    },
    sadeSati: {
      phase: sadeSatiPhase,
      remedies: {
        en: [
          'Light a mustard oil lamp under a Peepal tree on Saturdays.',
          'Recite Shani Chalisa and Hanuman Chalisa.',
          'Donate black sesame seeds, iron items, and shoes to the needy.',
        ],
        hi: [
          'प्रत्येक शनिवार पीपल के पेड़ के नीचे सरसों के तेल का दीपक जलाएं।',
          'शनि चालीसा का नियमित रूप से पाठ करें।',
          'काले तिल, उड़द की दाल और लोहे का दान करें।',
        ],
        gu: [
          'દર શનિવારે પીપળાના વૃક્ષ નીચે સરસવના તેલનો દીવો પ્રગટાવો.',
          'શનિ ચાલીસાનો નિયમિત પાઠ કરો.',
          'કાળા તલ, અડદ અને લોખંડની વસ્તુઓનું દાન કરો.',
        ],
      },
    },
  };
}
