// Gemstone Wearing Muhurta & Consecration Ritual Engine

export const GEMSTONE_DETAILS = {
  Ruby: {
    name: { gu: 'માણિક્ય (Ruby - સૂર્ય)', hi: 'माणिक्य (सूर्य)', en: 'Ruby (Sun)' },
    metal: 'Gold / Copper',
    finger: 'Ring Finger',
    day: 'Sunday Morning',
    mantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः',
  },
  Pearl: {
    name: { gu: 'મોતી (Pearl - ચંદ્ર)', hi: 'मोती (चन्द्र)', en: 'Pearl (Moon)' },
    metal: 'Silver',
    finger: 'Little Finger',
    day: 'Monday Evening',
    mantra: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः',
  },
  Emerald: {
    name: { gu: 'પન્ના (Emerald - બુધ)', hi: 'पन्ना (बुध)', en: 'Emerald (Mercury)' },
    metal: 'Gold / Silver',
    finger: 'Little Finger',
    day: 'Wednesday Morning',
    mantra: 'ॐ ब्रां ब्रीम ब्रौं सः बुधाय नमः',
  },
  YellowSapphire: {
    name: {
      gu: 'પુખરાજ (Yellow Sapphire - ગુરુ)',
      hi: 'पुखराज (गुरू)',
      en: 'Yellow Sapphire (Jupiter)',
    },
    metal: 'Gold',
    finger: 'Index Finger',
    day: 'Thursday Morning',
    mantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः',
  },
};

export function getGemstoneRituals(gemKey = 'YellowSapphire') {
  const details = GEMSTONE_DETAILS[gemKey] || GEMSTONE_DETAILS.YellowSapphire;
  return {
    gemKey,
    details,
    ritualSteps: [
      {
        step: 1,
        text: {
          gu: 'શુદ્ધિ: કાચા દૂધ, ગંગાજળ અને તુલસીપત્રમાં ૨ કલાક રત્ન રાખવું.',
          hi: 'कच्चे दूध व गंगाजल से शुद्धिकरण करें।',
          en: 'Purify in raw milk & sacred water.',
        },
      },
      {
        step: 2,
        text: {
          gu: 'જાપ: ૧૦૮ વાર નિયુક્ત બીજ મંત્રનો જાપ કરવો.',
          hi: '१०८ बार बीज मंत्र का जाप करें।',
          en: 'Chant beeja mantra 108 times.',
        },
      },
      {
        step: 3,
        text: {
          gu: 'ધારણ: સૂર્યોદય સમયે મંત્રોચ્ચાર સાથે જમણા હાથની આંગળીમાં ધારણ કરવું.',
          hi: 'सूर्योदय समय अंगुली में धारण करें।',
          en: 'Wear on designated finger at sunrise.',
        },
      },
    ],
  };
}
