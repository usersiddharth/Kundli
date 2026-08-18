// Vedic Astrology AI Prompt & Chart Context Serialization Engine
// Formulates high-density classical Vedic context for LLM agents (Gemini / OpenAI)

import { calculateShadbala } from './shadbala.js';
import { calculateAshtakavarga } from './ashtakvarga.js';
import { calculateLuckyFactorsAndGemstones } from './gemstones.js';
import { calculateVimshottariDasha } from './dasha.js';
import { evaluateDoshas } from './doshas.js';
import { detectClassicalYogas } from './yogas.js';

/**
 * Builds a structured, high-density Vedic Astrological Dossier from kundliData
 */
export function buildAstrologicalContext(kundliData, birthDateObj = null, lang = 'en') {
  if (!kundliData || !kundliData.planets) return '';

  const { panchang, planets, lagnaSignIndex, d1Houses } = kundliData;
  const ascendantSign = panchang?.ascendant || 'Aries';
  const moonSign = panchang?.moonSign || 'Unknown';
  const sunSign = panchang?.sunSign || 'Unknown';
  const nakshatra = panchang?.nakshatra || 'Unknown';
  const nakshatraLord = panchang?.nakshatraLord || 'Unknown';
  const pada = panchang?.pada || 1;

  // 1. Planetary Placements & Dignities
  const planetDetails = Object.keys(planets)
    .map((pKey) => {
      const p = planets[pKey];
      const retroStr = p.retro ? ' (Retrograde/વક્રી)' : '';
      const combustStr = p.dignity?.isCombust ? ' (Combust/અસ્ત)' : '';
      const stateStr = p.dignity?.state ? ` [${p.dignity.state}]` : '';
      const d9Info = p.navRashi?.id ? ` | D9 Navamsha: ${p.navRashi.id} (H${p.navHouseNum})` : '';
      return `- ${pKey}: House ${p.houseNum} in ${p.rashi.id} (${p.deg.toFixed(2)}°)${retroStr}${combustStr}${stateStr}, Nakshatra: ${p.nakshatra} (Pada ${p.pada}, Lord ${p.nakshatraLord})${d9Info}`;
    })
    .join('\n');

  // 2. House Placements Overview
  const houseOverview = d1Houses
    .map((h, idx) => {
      const occupants = h.planets.map((pl) => pl.name).join(', ') || 'None';
      return `House ${idx + 1} (${h.rashi.id}, Lord: ${h.rashi.lord}): Occupants -> [${occupants}]`;
    })
    .join('\n');

  // 3. Shadbala Strengths
  let shadbalaSummary = 'Not available';
  try {
    const sb = calculateShadbala(kundliData);
    if (sb && sb.results) {
      shadbalaSummary = Object.entries(sb.results)
        .map(
          ([pName, val]) =>
            `${pName}: ${val.totalRupas?.toFixed(2) || val.total?.toFixed(1) || 'N/A'} Rupas (${val.ratio ? (val.ratio * 100).toFixed(0) + '% - ' + val.verdict : 'Normal'})`
        )
        .join(', ');
    }
  } catch {
    shadbalaSummary = 'Calculated standard planetary strengths';
  }

  // 4. Ashtakavarga Points
  let ashtakvargaSummary = '';
  try {
    const av = calculateAshtakavarga(kundliData);
    if (av && av.sarvaAshtakavarga) {
      ashtakvargaSummary = av.sarvaAshtakavarga
        .map((pts, hIdx) => `H${hIdx + 1}: ${pts} pts`)
        .join(' | ');
    }
  } catch {
    ashtakvargaSummary = 'SAV standard baseline';
  }

  // 5. Yogas & Doshas
  let yogasSummary = 'No prominent major Yogas detected';
  try {
    const detectedYogas = detectClassicalYogas(kundliData);
    if (detectedYogas && detectedYogas.length > 0) {
      yogasSummary = detectedYogas
        .map(
          (y) =>
            `• ${y.name} (${y.category || 'Auspicious'}, Strength: ${y.strength}): ${y.desc?.en || ''}`
        )
        .join('\n');
    }
  } catch {
    // ignore
  }

  let doshasSummary = 'None detected';
  try {
    const doshas = evaluateDoshas(kundliData);
    if (doshas) {
      const parts = [];
      if (doshas.mangalDosha) {
        parts.push(
          `Mangal Dosha: ${doshas.mangalDosha.status} (${doshas.mangalDosha.reason || 'Normal'})`
        );
      }
      if (doshas.kalsarpaDosha) {
        parts.push(
          `Kalsarpa Dosha: ${doshas.kalsarpaDosha.status} - Type: ${doshas.kalsarpaDosha.type || 'None'}`
        );
      }
      if (doshas.sadeSati) {
        parts.push(
          `Saturn Sade Sati: ${doshas.sadeSati.status} (${doshas.sadeSati.phase || 'Inactive'})`
        );
      }
      if (parts.length > 0) doshasSummary = parts.join(' | ');
    }
  } catch {
    // ignore
  }

  // 6. Running Vimshottari Dasha
  let dashaSummary = 'Vimshottari cycle calculated';
  try {
    const bDate = birthDateObj || new Date('1995-08-15');
    const dashaTree = calculateVimshottariDasha(kundliData, bDate);
    if (dashaTree && dashaTree.length > 0) {
      const now = new Date();
      const currentMD =
        dashaTree.find((md) => new Date(md.startDate) <= now && new Date(md.endDate) >= now) ||
        dashaTree[0];
      if (currentMD) {
        const currentAD = currentMD.antardashas?.find(
          (ad) => new Date(ad.startDate) <= now && new Date(ad.endDate) >= now
        );
        dashaSummary = `Active Mahadasha: ${currentMD.lord} (${new Date(currentMD.startDate).toLocaleDateString()} to ${new Date(currentMD.endDate).toLocaleDateString()})`;
        if (currentAD) {
          dashaSummary += ` | Running Antardasha: ${currentAD.lord} (${new Date(currentAD.startDate).toLocaleDateString()} to ${new Date(currentAD.endDate).toLocaleDateString()})`;
        }
      }
    }
  } catch {
    // ignore
  }

  // 7. Lucky Factors & Gemstones
  let luckyFactorsSummary = '';
  try {
    const lucky = calculateLuckyFactorsAndGemstones(kundliData);
    if (lucky) {
      luckyFactorsSummary = `Life Gemstone (Lagna): ${lucky.lifeStone?.stone || 'N/A'}, Lucky Stone (Bhagya): ${lucky.luckyStone?.stone || 'N/A'}, Auspicious Numbers: ${lucky.luckyNumbers?.join(', ') || 'N/A'}, Auspicious Colors: ${lucky.luckyColors?.join(', ') || 'N/A'}`;
    }
  } catch {
    // ignore
  }

  return `
=== VEDIC KUNDLI ASTRONOMICAL & ASTROLOGICAL DOSSIER ===
* Lagna (Ascendant): ${ascendantSign} (House 1)
* Moon Sign (Chandra Rashi): ${moonSign}
* Sun Sign (Surya Rashi): ${sunSign}
* Birth Nakshatra: ${nakshatra} (Pada ${pada}, Nakshatra Lord: ${nakshatraLord})
* Panchang Vaar/Tithi: ${panchang?.vaar || 'N/A'} / ${panchang?.tithi || 'N/A'}

[CURRENT DASHA TIMELINE]
${dashaSummary}

[PLANETARY PLACEMENTS & DIGNITY (D1 & D9 Navamsha)]
${planetDetails}

[HOUSE-BY-HOUSE PLACEMENTS]
${houseOverview}

[SHADBALA (PLANETARY SIX-FOLD POTENCY)]
${shadbalaSummary}

[SARVASHTAKAVARGA (SAV) HOUSE BINDUS]
${ashtakvargaSummary}

[ACTIVE CLASSICAL YOGAS]
${yogasSummary}

[DOSHA & TRANSIT STATUS]
${doshasSummary}

[LUCKY FACTORS & GEMSTONES]
${luckyFactorsSummary}
=========================================================
`;
}

/**
 * Returns the customized system prompt enforcing deep Vedic knowledge and localized language output
 */
export function getSystemPrompt(lang = 'en') {
  const languageInstructions = {
    gu: `તમારે સંપૂર્ણ ઉત્તર શુદ્ધ, સન્માનજનક અને સરળ ગુજરાતી ભાષામાં (Gujarati language) આપવાનો છે. જ્યોતિષીય પારિભાષિક શબ્દો (જેમ કે યોગકારક, મહાદશા, શનિની સાડાસાતી, અષ્ટકવર્ગ, પંચમ ભાવ, ભાગ્ય સ્થાન, રત્ન ઉપાય) નો સચોટ ઉપયોગ કરવો.`,
    hi: `आपको सम्पूर्ण उत्तर आदरणीय, प्रामाणिक एवं स्पष्ट हिन्दी भाषा में (Hindi language) देना है। वैदिक ज्योतिषीय पारिभाषिक शब्दों (जैसे महादशा, अंतरदशा, केंद्र-त्रिकोण, राजयोग, षड्बल, अष्टकवर्ग, रत्न एवं मंत्र उपाय) का उचित प्रयोग करें।`,
    en: `Please provide your entire response in clear, insightful, authentic, and professional English. Use authentic Vedic Sanskrit astrological terms with concise English explanations (e.g. Mahadasha, Antardasha, Kendra/Trikona houses, Shadbala strength, Ashtakavarga points, auspicious Upaye).`,
  };

  const selectedLangInstruction = languageInstructions[lang] || languageInstructions.en;

  return `You are a revered, highly learned, and compassionate Master Vedic Astrologer (જ્યોતિષ આચાર્ય / ज्योतिषाचार्य) rooted in classical Parashari, Jaimini, and Brihat Samhita traditions.

YOUR CORE MANDATE:
1. You are provided with the complete and authentic Vedic Kundli Dossier of the native (including Lagna, Rashi, Nakshatra, D1 & D9 Navamsha placements, Shadbala, Ashtakavarga bindus, active Yogas, Doshas, and Vimshottari Dasha).
2. Ground every prediction and explanation strictly in the native's actual chart data provided in the prompt. Always cite the specific House, Sign, Planet, Lordship, and Dasha period that causes the result.
3. Adopt an empowering, solution-oriented, compassionate, and ethically grounded approach. Focus on constructive Karma, remedies, and timing rather than fatalism or fear.
4. Structure your response cleanly with markdown:
   - 🌟 **Core Astrological Synthesis** (The key planetary combinations driving this area of life)
   - ⏳ **Timing & Dasha Influence** (When the auspicious or challenging energies peak based on Mahadasha/Antardasha)
   - 💡 **Practical Vedic Remedies & Guidance** (Auspicious mantras, gemstones, fasting/charity, lifestyle adjustments)
5. **Language Rule**: ${selectedLangInstruction}
`;
}

/**
 * Curated Quick Astrological Question Prompts
 */
export const QUICK_PROMPTS = [
  {
    category: 'career',
    icon: 'Briefcase',
    title: {
      en: 'Career & Job',
      hi: 'करियर एवं नौकरी',
      gu: 'કારકિર્દી અને નોકરી',
    },
    questions: [
      {
        en: 'When will I get a promotion, job switch, or major career breakthrough?',
        hi: 'मेरी नौकरी में पदोन्नति, बदलाव या करियर में बड़ी सफलता कब मिलेगी?',
        gu: 'મારી નોકરીમાં પ્રમોશન, નોકરી બદલાવ કે મોટી સફળતા ક્યારે મળશે?',
      },
      {
        en: 'Does my chart favor independent business/entrepreneurship or a stable job?',
        hi: 'क्या मेरी कुंडली व्यापार/बिजनेस के अनुकूल है या नौकरी के लिए?',
        gu: 'શું મારી કુંડળી સ્વતંત્ર વ્યવસાય/ધંધા માટે અનુકૂળ છે કે નોકરી માટે?',
      },
      {
        en: 'Which industries and job roles are most auspicious according to my 10th house & Saturn?',
        hi: 'मेरे 10वें भाव और शनि के अनुसार कौन सा कार्यक्षेत्र सबसे शुभ रहेगा?',
        gu: 'મારા ૧૦મા ભાવ અને શનિ અનુસાર કયું કાર્યક્ષેત્ર સૌથી શુભ રહેશે?',
      },
    ],
  },
  {
    category: 'marriage',
    icon: 'Heart',
    title: {
      en: 'Marriage & Love',
      hi: 'विवाह एवं प्रेम संबंध',
      gu: 'લગ્ન અને સંબંધો',
    },
    questions: [
      {
        en: 'What does my 7th house and Venus reveal about my spouse and marriage timing?',
        hi: 'मेरे 7वें भाव और शुक्र के अनुसार मेरे जीवनसाथी और विवाह का समय कैसा रहेगा?',
        gu: 'મારા ૭મા ભાવ અને શુક્ર અનુસાર મારા જીવનસાથી અને લગ્નનો સમય કેવો રહેશે?',
      },
      {
        en: 'Is there any Manglik or relationship affliction in my chart, and what are its remedies?',
        hi: 'क्या मेरी कुंडली में मांगलिक या वैवाहिक दोष है, और इसके सरल उपाय क्या हैं?',
        gu: 'શું મારી કુંડળીમાં માંગલિક કે દાંપત્ય દોષ છે, અને તેના સરળ ઉપાયો શું છે?',
      },
      {
        en: 'How will my married life and compatibility unfold after marriage?',
        hi: 'विवाह के पश्चात वैवाहिक जीवन और सामंजस्य कैसा रहेगा?',
        gu: 'લગ્ન પછીનું દાંપત્ય જીવન અને પરસ્પર સુમેળ કેવો રહેશે?',
      },
    ],
  },
  {
    category: 'wealth',
    icon: 'Coins',
    title: {
      en: 'Wealth & Property',
      hi: 'धन, संपत्ति एवं समृद्धि',
      gu: 'ધન, સંપત્તિ અને સમૃદ્ધિ',
    },
    questions: [
      {
        en: 'Analyze my 2nd (accumulated wealth) and 11th (gains) houses for financial growth.',
        hi: 'आर्थिक समृद्धि के लिए मेरे द्वितीय (धन) और एकादश (लाभ) भाव का विश्लेषण करें।',
        gu: 'આર્થિક સમૃદ્ધિ માટે મારા બીજા (ધન) અને અગિયારમા (લાભ) ભાવનું વિશ્લેષણ કરો.',
      },
      {
        en: 'When are the best yogas for buying property, a house, or new vehicles?',
        hi: 'भूमि, मकान या वाहन खरीदने के लिए सबसे शुभ योग कब बन रहे हैं?',
        gu: 'જમીન, મકાન કે નવું વાહન ખરીદવા માટે સૌથી શુભ યોગ ક્યારે બની રહ્યા છે?',
      },
    ],
  },
  {
    category: 'dasha',
    icon: 'Sparkles',
    title: {
      en: 'Dasha & Planetary Timing',
      hi: 'दशा फल एवं ग्रह गोचर',
      gu: 'દશા ફળ અને ગ્રહ ગોચર',
    },
    questions: [
      {
        en: 'How will my current running Mahadasha & Antardasha impact my life decisions and peace of mind?',
        hi: 'मेरी वर्तमान चल रही महादशा और अंतरदशा मेरे जीवन पर कैसा प्रभाव डालेगी?',
        gu: 'મારી વર્તમાન ચાલી રહેલી મહાદશા અને અંતરદશા મારા જીવન અને નિર્ણયો પર કેવો પ્રભાવ પાડશે?',
      },
      {
        en: 'Explain the major auspicious Yogas (like Gajakesari or Raja Yoga) present in my Kundli.',
        hi: 'मेरी कुंडली में उपस्थित प्रमुख शुभ योगों (जैसे गजकेसरी या राजयोग) का फल समझाएं।',
        gu: 'મારી કુંડળીમાં રહેલા મુખ્ય શુભ યોગો (જેમ કે ગજકેસરી કે રાજયોગ) નું ફળ સમજાવો.',
      },
    ],
  },
  {
    category: 'remedies',
    icon: 'Activity',
    title: {
      en: 'Remedies & Gemstones',
      hi: 'वैदिक उपाय एवं रत्न',
      gu: 'વૈદિક ઉપાય અને રત્ન',
    },
    questions: [
      {
        en: 'Which gemstone and Vedic mantras are most protective and auspicious for me right now?',
        hi: 'इस समय मेरे लिए कौन सा रत्न धारण करना और कौन सा मंत्र जप सबसे शुभ रहेगा?',
        gu: 'આ સમયે મારે કયો રત્ન ધારણ કરવો અને કયો મંત્ર જપ સૌથી શ્રેષ્ઠ અને રક્ષણાત્મક રહેશે?',
      },
      {
        en: 'What daily lifestyle or spiritual remedies can strengthen my weak planets?',
        hi: 'कमजोर ग्रहों को बलवान करने के लिए कौन से दैनिक आध्यात्मिक उपाय करने चाहिए?',
        gu: 'નબળા ગ્રહોને બળવાન કરવા માટે કયા દૈનિક આધ્યાત્મિક અને ધાર્મિક ઉપાયો કરવા જોઈએ?',
      },
    ],
  },
];
