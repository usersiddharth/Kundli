// Classical Vedic Yogas Detector Engine

export function detectClassicalYogas(kundliData) {
  const planets = kundliData.planets;
  const yogas = [];
  const kendras = [1, 4, 7, 10];
  const trikonas = [1, 5, 9];

  // Helper for planet in sign check
  const signId = (pName) => planets[pName] ? planets[pName].rashi.id : "";
  const houseNum = (pName) => planets[pName] ? planets[pName].houseNum : 0;

  // 1. Panch Mahapurusha Yogas
  // Ruchaka (Mars)
  if (kendras.includes(houseNum("Mars")) && ["Aries", "Scorpio", "Capricorn"].includes(signId("Mars"))) {
    yogas.push({
      name: "Ruchaka Yoga (Panch Mahapurusha)",
      category: "Mahapurusha",
      strength: "Very High",
      desc: {
        en: "Mars is exalted or in own sign in a Kendra. Bestows courage, leadership, physical strength, authority, and military/executive success.",
        hi: "मंगल केंद्र स्थान में अपनी उच्च या स्वराशि में स्थित है। यह अपार पराक्रम, नेतृत्व क्षमता, भूमि संपत्ति और प्रशासनिक पद प्रदान करता है।",
        gu: "મંગળ કેન્દ્ર સ્થાનમાં પોતાની ઉચ્ચ કે સ્વરાશિમાં છે. આ અપાર પરાક્રમ, નેતૃત્વ ક્ષમતા, જમીન-મિલકત અને પ્રશાસનિક પદ આપે છે."
      }
    });
  }

  // Bhadra (Mercury)
  if (kendras.includes(houseNum("Mercury")) && ["Gemini", "Virgo"].includes(signId("Mercury"))) {
    yogas.push({
      name: "Bhadra Yoga (Panch Mahapurusha)",
      category: "Mahapurusha",
      strength: "Very High",
      desc: {
        en: "Mercury is strong in a Kendra. Bestows sharp intelligence, business acumen, eloquence, scholarly acclaim, and longevity.",
        hi: "बुध केंद्र स्थान में अपनी स्वराशि में स्थित है। यह कुशाग्र बुद्धि, व्यवसाय में सफलता, वाक्पटुता और विद्वता प्रदान करता है।",
        gu: "બુધ કેન્દ્ર સ્થાનમાં પોતાની સ્વરાશિમાં છે. આ તીવ્ર બુદ્ધિ, વેપારમાં સફળતા, ઉત્તમ વક્તૃત્વ અને વિદ્વત્તા આપે છે."
      }
    });
  }

  // Hamsa (Jupiter)
  if (kendras.includes(houseNum("Jupiter")) && ["Cancer", "Sagittarius", "Pisces"].includes(signId("Jupiter"))) {
    yogas.push({
      name: "Hamsa Yoga (Panch Mahapurusha)",
      category: "Mahapurusha",
      strength: "Very High",
      desc: {
        en: "Jupiter is exalted or in own sign in a Kendra. Bestows high wisdom, spiritual purity, social respect, righteousness, and fortune.",
        hi: "गुरु केंद्र स्थान में अपनी उच्च या स्वराशि में स्थित है। यह उच्च ज्ञान, धार्मिकता, समाज में पूज्यनीय स्थान और अपार समृद्धि प्रदान करता है।",
        gu: "ગુરુ કેન્દ્ર સ્થાનમાં પોતાની ઉચ્ચ કે સ્વરાશિમાં છે. આ ઉચ્ચ જ્ઞાન, ધાર્મિકતા, સમાજમાં પૂજનીય સ્થાન અને અપાર સમૃદ્ધિ આપે છે."
      }
    });
  }

  // Malavya (Venus)
  if (kendras.includes(houseNum("Venus")) && ["Taurus", "Libra", "Pisces"].includes(signId("Venus"))) {
    yogas.push({
      name: "Malavya Yoga (Panch Mahapurusha)",
      category: "Mahapurusha",
      strength: "Very High",
      desc: {
        en: "Venus is strong in a Kendra. Bestows artistic beauty, luxury, marital bliss, vehicles, refined taste, and immense charm.",
        hi: "शुक्र केंद्र स्थान में अपनी स्वराशि या उच्च राशि में है। यह कलात्मक प्रतिभा, भौतिक सुख, उत्तम वाहन और वैवाहिक आनंद प्रदान करता है।",
        gu: "શુક્ર કેન્દ્ર સ્થાનમાં પોતાની સ્વરાશિ અથવા ઉચ્ચ રાશિમાં છે. આ કલાત્મક પ્રતિભા, ભૌતિક સુખ, ઉત્તમ વાહન અને વૈવાહિક આનંદ આપે છે."
      }
    });
  }

  // Sasa (Saturn)
  if (kendras.includes(houseNum("Saturn")) && ["Libra", "Capricorn", "Aquarius"].includes(signId("Saturn"))) {
    yogas.push({
      name: "Sasa Yoga (Panch Mahapurusha)",
      category: "Mahapurusha",
      strength: "Very High",
      desc: {
        en: "Saturn is strong in a Kendra. Bestows judicial authority, political dominance, discipline, mass support, and enduring wealth.",
        hi: "शनि केंद्र स्थान में उच्च या स्वराशि में स्थित है। यह राजनीतिक प्रभुत्व, जनसमर्थन, न्यायप्रियता और दीर्घकालिक अधिकार प्रदान करता है।",
        gu: "શનિ કેન્દ્ર સ્થાનમાં ઉચ્ચ કે સ્વરાશિમાં છે. આ રાજકીય પ્રભુત્વ, જનસંખ્યા સમર્થન, ન્યાયપ્રિયતા અને દીર્ઘકાલીન સત્તા આપે છે."
      }
    });
  }

  // 2. Gaja Kesari Yoga (Jupiter in Kendra from Moon)
  let moonH = houseNum("Moon");
  let jupH = houseNum("Jupiter");
  let diffFromMoon = ((jupH - moonH + 12) % 12) + 1;
  if ([1, 4, 7, 10].includes(diffFromMoon)) {
    yogas.push({
      name: "Gaja Kesari Yoga",
      category: "Auspicious Raj Yoga",
      strength: "High",
      desc: {
        en: "Jupiter is in a Kendra from Moon. Bestows fame, royal stature, victory over opponents, keen intellect, and lifelong security.",
        hi: "चंद्रमा से गुरु केंद्र में स्थित है। यह समाज में यश, मान-प्रतिष्ठा, शत्रुओं पर विजय और चिरस्थायी समृद्धि प्रदान करता है।",
        gu: "ચંદ્રથી ગુરુ કેન્દ્રમાં છે. આ સમાજમાં યશ, માન-પ્રતિષ્ઠા, શત્રુઓ પર વિજય અને ચિરસ્થાયી સમૃદ્ધિ આપે છે."
      }
    });
  }

  // 3. Budhaditya Yoga (Sun & Mercury in same house)
  if (houseNum("Sun") === houseNum("Mercury")) {
    yogas.push({
      name: "Budhaditya Yoga",
      category: "Intellect & Wisdom",
      strength: "Medium-High",
      desc: {
        en: "Sun and Mercury reside together in the same house. Sharpens analytical mind, professional fame, administrative skill, and academic excellence.",
        hi: "सूर्य और बुध एक ही भाव में स्थित हैं। यह तीव्र विश्लेषणात्मक बुद्धि, प्रशासनिक दक्षता और विद्या में उत्कृष्ट सफलता प्रदान करता है।",
        gu: "સૂર્ય અને બુધ એક જ ઘરમાં છે. આ તીવ્ર વિશ્લેષણાત્મક બુદ્ધિ, પ્રશાસનિક દક્ષતા અને વિદ્યામાં ઉત્કૃષ્ટ સફળતા આપે છે."
      }
    });
  }

  // 4. Chandra Mangala Yoga (Moon & Mars together)
  if (houseNum("Moon") === houseNum("Mars")) {
    yogas.push({
      name: "Chandra Mangala Yoga",
      category: "Dhan Yoga (Wealth)",
      strength: "High",
      desc: {
        en: "Moon and Mars conjunction. Generates financial prosperity through enterprise, real estate gain, dynamic action, and liquid wealth.",
        hi: "चंद्र और मंगल की युति है। यह व्यापार, भूमि-भवन के क्रय-विक्रय और साहसिक प्रयासों से प्रचुर धन लाभ कराता है।",
        gu: "ચંદ્ર અને મંગળની યુતિ છે. આ વેપાર, જમીન-મકાન ખરીદ-વેચાણ અને સાહસિક પ્રયાસોથી પ્રચૂર ધન લાભ કરાવે છે."
      }
    });
  }

  return yogas;
}
