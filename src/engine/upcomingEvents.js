// Upcoming Planetary Events & Astrological Transits Engine (2024 - 2030)
// High-precision Vedic ephemeris of Ingresses, Retrogrades, Eclipses, Combustions, and Conjunctions.

import { RASHIS } from './kundli.js';

export const EVENT_CATEGORIES = [
  { id: 'all', label: { gu: 'બધી ઘટનાઓ (All)', hi: 'सभी घटनाएं', en: 'All Events' } },
  {
    id: 'ingress',
    label: { gu: 'રાશિ પરિવર્તન (Gochar)', hi: 'राशि परिवर्तन (गोचर)', en: 'Rashi Ingress' },
  },
  {
    id: 'retrograde',
    label: { gu: 'વક્રી / માર્ગી (Motion)', hi: 'वक्री / मार्गी', en: 'Retrograde / Direct' },
  },
  {
    id: 'eclipse',
    label: { gu: 'સૂર્ય-ચંદ્ર ગ્રહણ (Eclipses)', hi: 'सूर्य-चंद्र ग्रहण', en: 'Eclipses' },
  },
  {
    id: 'combustion',
    label: { gu: 'અસ્ત / ઉદય (Combustion)', hi: 'अस्त / उदय', en: 'Combustion & Rise' },
  },
  {
    id: 'conjunction',
    label: { gu: 'મહા યુતિ (Conjunctions)', hi: 'महा युति', en: 'Major Conjunctions' },
  },
];

export const PLANETARY_EVENTS_DATABASE = [
  // -------------------------------------------------------------
  // 2024 MAJOR EVENTS
  // -------------------------------------------------------------
  {
    id: 'evt-2024-05-01-jup',
    date: '2024-05-01',
    time: '12:59',
    category: 'ingress',
    planet: 'Jupiter',
    planetSymbol: '♃',
    fromSign: 'Aries',
    toSign: 'Taurus',
    title: {
      gu: 'ગુરુ વૃષભ રાશિ પ્રવેશ (Guru Taurus Ingress)',
      hi: 'गुरु वृषभ राशि प्रवेश',
      en: 'Jupiter Enters Taurus',
    },
    description: {
      gu: 'દેવગુરુ બૃહસ્પતિ શુક્રની સ્થિર પૃથ્વી રાશિ વૃષભમાં પ્રવેશ કરશે. નાણાકીય બજારો, કૃષિ અને સ્થાવર મિલકતમાં સ્થિરતા અને સમૃદ્ધિ આપશે.',
      hi: 'देवगुरु बृहस्पति का वृषभ राशि में प्रवेश। आर्थिक स्थिरता, कृषि एवं व्यापार में उन्नति का समय।',
      en: 'Jupiter moves into fixed earth sign Taurus, bringing expansion in finances, stability in resources and sustained long-term growth.',
    },
    importance: 'major',
  },
  {
    id: 'evt-2024-09-18-lun-ecl',
    date: '2024-09-18',
    time: '08:14',
    category: 'eclipse',
    planet: 'Moon',
    planetSymbol: '☽',
    fromSign: 'Pisces',
    toSign: 'Pisces',
    title: {
      gu: 'ખંડગ્રાસ ચંદ્ર ગ્રહણ (Partial Lunar Eclipse)',
      hi: 'खंडग्रास चंद्र ग्रहण',
      en: 'Partial Lunar Eclipse in Pisces',
    },
    description: {
      gu: 'મીન રાશિ અને ઉત્તરા ભાદ્રપદ નક્ષત્રમાં ચંદ્ર ગ્રહણ. માનસિક ચંચળતા, ઊંડા આધ્યાત્મિક સંશોધન અને લાગણીશીલ નિર્ણયોમાં સંયમ રાખવો.',
      hi: 'मीन राशि में चंद्र ग्रहण। साधना एवं ध्यान हेतु अत्यंत शुभ समय।',
      en: 'Partial Lunar Eclipse in Pisces. Heightened emotional sensitivity and deep spiritual awakenings.',
    },
    importance: 'high',
  },
  {
    id: 'evt-2024-10-02-sol-ecl',
    date: '2024-10-02',
    time: '21:19',
    category: 'eclipse',
    planet: 'Sun',
    planetSymbol: '☉',
    fromSign: 'Virgo',
    toSign: 'Virgo',
    title: {
      gu: 'કંકણાકાર સૂર્ય ગ્રહણ (Annular Solar Eclipse)',
      hi: 'कंकणाकार सूर्य ग्रहण',
      en: 'Annular Solar Eclipse in Virgo',
    },
    description: {
      gu: 'કન્યા રાશિ અને હસ્ત નક્ષત્રમાં સર્વપિતૃ અમાસના દિવસે સૂર્ય ગ્રહણ. પિતૃ તર્પણ અને દાન પુણ્ય માટે વિશેષ ફળદાયી.',
      hi: 'कन्या राशि एवं हस्त नक्षत्र में सूर्य ग्रहण। पितृ शांति एवं जप-तप हेतु श्रेष्ठ।',
      en: 'Ring of Fire Solar Eclipse in Virgo during Sarva Pitru Amavasya. Powerful time for ancestor prayers and inner cleansing.',
    },
    importance: 'high',
  },
  {
    id: 'evt-2024-10-09-jup-retro',
    date: '2024-10-09',
    time: '12:35',
    category: 'retrograde',
    planet: 'Jupiter',
    planetSymbol: '♃',
    fromSign: 'Taurus',
    toSign: 'Taurus',
    title: {
      gu: 'ગુરુ વક્રી ગતિ શરૂ (Jupiter Retrograde in Taurus)',
      hi: 'गुरु वृषभ राशि में वक्री',
      en: 'Jupiter Turns Retrograde in Taurus',
    },
    description: {
      gu: 'ગુરુ વૃષભ રાશિમાં વક્રી થશે (ફેબ્રુઆરી ૨૦૨૫ સુધી). આ સમયગાળામાં રોકાણોનું પુનઃમૂલ્યાંકન કરવું અને ઉતાવળા નાણાકીય નિર્ણયોથી બચવું.',
      hi: 'गुरु वृषभ राशि में वक्री। निवेश एवं शिक्षा के मामलों में आत्ममंथन का समय।',
      en: 'Jupiter stations retrograde in Taurus, prompting deep reflection on ethics, long-term investments, and personal values.',
    },
    importance: 'medium',
  },
  {
    id: 'evt-2024-11-15-sat-dir',
    date: '2024-11-15',
    time: '06:50',
    category: 'retrograde',
    planet: 'Saturn',
    planetSymbol: '♄',
    fromSign: 'Aquarius',
    toSign: 'Aquarius',
    title: {
      gu: 'શનિદેવ માર્ગી (Saturn Direct in Aquarius)',
      hi: 'शनिदेव कुंभ राशि में मार्गी',
      en: 'Saturn Turns Direct in Aquarius',
    },
    description: {
      gu: 'શનિ પોતાની મૂળત્રિકોણ રાશિ કુંભમાં માર્ગી થશે. અટકેલા સરકારી કાર્યો, વ્યાવસાયિક પ્રોજેક્ટ્સ અને કારકિર્દીમાં ગતિ આવશે.',
      hi: 'शनिदेव कुंभ में मार्गी। रुके हुए कार्यों में पुनः गति और न्याय की प्राप्ति।',
      en: 'Saturn resumes direct motion in Aquarius, removing delays in career milestones and rewarding disciplined persistent effort.',
    },
    importance: 'major',
  },

  // -------------------------------------------------------------
  // 2025 MAJOR EVENTS
  // -------------------------------------------------------------
  {
    id: 'evt-2025-02-04-jup-dir',
    date: '2025-02-04',
    time: '15:10',
    category: 'retrograde',
    planet: 'Jupiter',
    planetSymbol: '♃',
    fromSign: 'Taurus',
    toSign: 'Taurus',
    title: {
      gu: 'ગુરુ માર્ગી (Jupiter Turns Direct in Taurus)',
      hi: 'गुरु वृषभ में मार्गी',
      en: 'Jupiter Turns Direct in Taurus',
    },
    description: {
      gu: 'દેવગુરુ બૃહસ્પતિ વૃષભમાં સીધી ચાલ શરૂ કરશે. આર્થિક અડચણો દૂર થશે, શિક્ષણ અને સંતાન બાબતોમાં શુભ સમાચાર મળશે.',
      hi: 'गुरु की सीधी चाल शुरू। धन लाभ एवं पारिवारिक प्रसन्नता का योग।',
      en: 'Jupiter resumes forward motion, releasing financial logjams and opening new avenues in education, wisdom, and enterprise.',
    },
    importance: 'medium',
  },
  {
    id: 'evt-2025-03-14-lun-ecl',
    date: '2025-03-14',
    time: '11:29',
    category: 'eclipse',
    planet: 'Moon',
    planetSymbol: '☽',
    fromSign: 'Leo',
    toSign: 'Leo',
    title: {
      gu: 'પૂર્ણ ચંદ્ર ગ્રહણ - હોલિકા દહન (Total Lunar Eclipse)',
      hi: 'पूर्ण चंद्र ग्रहण (फाल्गुन पूर्णिमा)',
      en: 'Total Lunar Eclipse on Holi / Phalguna Purnima',
    },
    description: {
      gu: 'સિંહ રાશિ અને પૂર્વા ફાલ્ગુની નક્ષત્રમાં પૂર્ણ ચંદ્ર ગ્રહણ. હોલિકા દહન સાથે આકાશી સંયોગ. મનોબળ મજબૂત રાખવું.',
      hi: 'सिंह राशि में पूर्ण चंद्र ग्रहण। होलिका दहन पर महासंयोग।',
      en: 'Blood Moon Lunar Eclipse in Leo on Phalguna Purnima. Significant climax in creative expression and leadership themes.',
    },
    importance: 'high',
  },
  {
    id: 'evt-2025-03-29-sat-ing',
    date: '2025-03-29',
    time: '23:01',
    category: 'ingress',
    planet: 'Saturn',
    planetSymbol: '♄',
    fromSign: 'Aquarius',
    toSign: 'Pisces',
    title: {
      gu: 'શનિ મીન રાશિ પ્રવેશ (Saturn Ingress Pisces - Shani Gochar)',
      hi: 'शनिदेव का मीन राशि में ऐतिहासिक महाप्रवेश',
      en: 'Saturn Enters Pisces (Major 2.5-Year Era Shift)',
    },
    description: {
      gu: 'શનિદેવ કુંભમાંથી નીકળીને ગુરુની જળ રાશિ મીનમાં પ્રવેશ કરશે (૨.૫ વર્ષ માટે). કુંભ રાશિની સાડાસાતીનો છેલ્લો તબક્કો અને મેષ રાશિની સાડાસાતી શરૂ થશે.',
      hi: 'शनि का मीन में गोचर। मीन राशि पर साढ़ेसाती का दूसरा चरण, मेष पर प्रथम चरण और कुंभ पर अंतिम चरण शुरू।',
      en: 'Historic transit of Saturn into mystical water sign Pisces for the next 2.5 years. Catalyzes global spiritual awakening, emotional discipline, and restructuring of international relations.',
    },
    importance: 'major',
  },
  {
    id: 'evt-2025-03-29-sol-ecl',
    date: '2025-03-29',
    time: '16:18',
    category: 'eclipse',
    planet: 'Sun',
    planetSymbol: '☉',
    fromSign: 'Pisces',
    toSign: 'Pisces',
    title: {
      gu: 'ખંડગ્રાસ સૂર્ય ગ્રહણ (Partial Solar Eclipse in Pisces)',
      hi: 'खंडग्रास सूर्य ग्रहण',
      en: 'Partial Solar Eclipse in Pisces',
    },
    description: {
      gu: 'મીન રાશિ અને ઉત્તરા ભાદ્રપદ નક્ષત્રમાં સૂર્ય ગ્રહણ. ચૈત્રી નવરાત્રિ પૂર્વેનો મહત્વપૂર્ણ ખગોળીય સંયોગ.',
      hi: 'मीन राशि में सूर्य ग्रहण। आंतरिक शुद्धि एवं आत्मसाक्षात्कार का समय।',
      en: 'Solar eclipse taking place in Pisces alongside Saturn ingress, creating a monumental turning point.',
    },
    importance: 'high',
  },
  {
    id: 'evt-2025-05-14-jup-ing',
    date: '2025-05-14',
    time: '23:20',
    category: 'ingress',
    planet: 'Jupiter',
    planetSymbol: '♃',
    fromSign: 'Taurus',
    toSign: 'Gemini',
    title: {
      gu: 'ગુરુ મિથુન રાશિ પ્રવેશ (Jupiter Ingress Gemini)',
      hi: 'गुरु मिथुन राशि प्रवेश',
      en: 'Jupiter Enters Gemini (Guru Mithuna Gochar)',
    },
    description: {
      gu: 'દેવગુરુ બૃહસ્પતિ બુધની વાયુ રાશિ મિથુનમાં પ્રવેશ કરશે. આર્ટિફિશિયલ ઇન્ટેલિજન્સ, ડેટા ટેકનોલોજી, સંચાર અને લેખન ક્ષેત્રે જબરદસ્ત ક્રાંતિ લાવશે.',
      hi: 'गुरु का मिथुन राशि में गोचर। संचार, आईटी, मीडिया व शिक्षा में अभूतपूर्व प्रगति।',
      en: 'Jupiter enters intellectual air sign Gemini for 1 year, supercharging technology, AI breakthroughs, journalism, writing, and cross-border trade.',
    },
    importance: 'major',
  },
  {
    id: 'evt-2025-05-18-rahu-ketu',
    date: '2025-05-18',
    time: '16:30',
    category: 'ingress',
    planet: 'Rahu',
    planetSymbol: '☊',
    fromSign: 'Pisces',
    toSign: 'Aquarius',
    title: {
      gu: 'રાહુ કુંભ & કેતુ સિંહ રાશિ પ્રવેશ (Rahu Aquarius / Ketu Leo)',
      hi: 'राहु कुंभ एवं केतु सिंह राशि महागोचर (१८ माह)',
      en: 'Rahu Enters Aquarius & Ketu Enters Leo (18-Month Cycle)',
    },
    description: {
      gu: 'રાહુ મીનમાંથી કુંભમાં અને કેતુ કન્યામાંથી સિંહમાં વક્રી ગોચર કરશે (૧૮ મહિના માટે). વૈશ્વિક સ્તરે માનવતાવાદી ચળવળ અને ટેકનોલોજીકલ ઉત્ક્રાંતિ.',
      hi: 'राहु का कुंभ व केतु का सिंह में १८ महीने का महागोचर। राजनीति व समाज में बड़ा बदलाव।',
      en: 'Nodal Axis shifts to Aquarius-Leo for 1.5 years. Shakes up collective technology networks, governance, and authentic personal sovereignty.',
    },
    importance: 'major',
  },
  {
    id: 'evt-2025-07-13-sat-retro',
    date: '2025-07-13',
    time: '04:18',
    category: 'retrograde',
    planet: 'Saturn',
    planetSymbol: '♄',
    fromSign: 'Pisces',
    toSign: 'Pisces',
    title: {
      gu: 'શનિદેવ મીન રાશિમાં વક્રી (Saturn Retrograde in Pisces)',
      hi: 'शनिदेव मीन राशि में वक्री',
      en: 'Saturn Retrograde in Pisces',
    },
    description: {
      gu: 'શનિ મીન રાશિમાં વક્રી થશે (નવેમ્બર ૨૦૨૫ સુધી). જૂના કર્મોનું સરવૈયું, અધૂરા વચનો અને આંતરિક શિસ્તની કસોટી.',
      hi: 'शनि मीन में वक्री। कर्मफल एवं आध्यात्मिक समीक्षा का काल।',
      en: 'Saturn stations retrograde in Pisces, requiring patience, resolving karmic debts and streamlining spiritual ambitions.',
    },
    importance: 'medium',
  },
  {
    id: 'evt-2025-09-07-lun-ecl',
    date: '2025-09-07',
    time: '23:41',
    category: 'eclipse',
    planet: 'Moon',
    planetSymbol: '☽',
    fromSign: 'Aquarius',
    toSign: 'Aquarius',
    title: {
      gu: 'સંપૂર્ણ ચંદ્ર ગ્રહણ (Total Lunar Eclipse in Aquarius - Blood Moon)',
      hi: 'पूर्ण चंद्र ग्रहण (कुंभ राशि)',
      en: 'Total Lunar Eclipse in Aquarius (Visible in India)',
    },
    description: {
      gu: 'કુંભ રાશિ અને પૂર્વા ભાદ્રપદ નક્ષત્રમાં ભારતમાં દ્રશ્યમાન પૂર્ણ ચંદ્ર ગ્રહણ. રાહુ-ચંદ્ર યુતિ. સૂતક કાળ બપોરે ૨:૪૧ થી શરૂ થશે.',
      hi: 'कुंभ राशि में भारत में दृश्यमान पूर्ण चंद्र ग्रहण। सूतक काल दोपहर से प्रभावी।',
      en: 'Prominent Total Lunar Eclipse in Aquarius fully visible across India and Asia. Profound psychological and collective clearing.',
    },
    importance: 'high',
  },
  {
    id: 'evt-2025-09-21-sol-ecl',
    date: '2025-09-21',
    time: '22:42',
    category: 'eclipse',
    planet: 'Sun',
    planetSymbol: '☉',
    fromSign: 'Virgo',
    toSign: 'Virgo',
    title: {
      gu: 'ખંડગ્રાસ સૂર્ય ગ્રહણ (Partial Solar Eclipse in Virgo)',
      hi: 'खंडग्रास सूर्य ग्रहण (कन्या राशि)',
      en: 'Partial Solar Eclipse in Virgo',
    },
    description: {
      gu: 'કન્યા રાશિ અને ઉત્તરા ફાલ્ગુની નક્ષત્રમાં સૂર્ય ગ્રહણ. પિતૃ પક્ષ અમાસ સંયોગ.',
      hi: 'कन्या राशि में सूर्य ग्रहण। स्वास्थ्य व नौकरी के फैसलों में सतर्क रहें।',
      en: 'Partial solar eclipse occurring in Virgo, triggering changes in daily routines, healthcare structures, and employment dynamics.',
    },
    importance: 'high',
  },
  {
    id: 'evt-2025-11-28-sat-dir',
    date: '2025-11-28',
    time: '08:35',
    category: 'retrograde',
    planet: 'Saturn',
    planetSymbol: '♄',
    fromSign: 'Pisces',
    toSign: 'Pisces',
    title: {
      gu: 'શનિદેવ માર્ગી (Saturn Direct in Pisces)',
      hi: 'शनिदेव मीन राशि में मार्गी',
      en: 'Saturn Direct in Pisces',
    },
    description: {
      gu: 'શનિદેવ મીન રાશિમાં માર્ગી થશે. ન્યાય, શિસ્ત અને કર્મક્ષેત્રમાં ગતિશીલતા પાછી ફરશે.',
      hi: 'शनिदेव की सीधी चाल शुरू। रुके हुए कार्यों में सफलता।',
      en: 'Saturn resumes direct motion, clearing path forward for long-term visions and structural improvements.',
    },
    importance: 'major',
  },

  // -------------------------------------------------------------
  // 2026 MAJOR EVENTS
  // -------------------------------------------------------------
  {
    id: 'evt-2026-02-17-sol-ecl',
    date: '2026-02-17',
    time: '17:42',
    category: 'eclipse',
    planet: 'Sun',
    planetSymbol: '☉',
    fromSign: 'Aquarius',
    toSign: 'Aquarius',
    title: {
      gu: 'કંકણાકાર સૂર્ય ગ્રહણ (Annular Solar Eclipse in Aquarius)',
      hi: 'कंकणाकार सूर्य ग्रहण (कुंभ राशि)',
      en: 'Annular Solar Eclipse in Aquarius',
    },
    description: {
      gu: 'કુંભ રાશિ અને ધનિષ્ઠા નક્ષત્રમાં સૂર્ય ગ્રહણ. રાહુ-સૂર્ય યુતિ. રાજકીય અને ટેકનોલોજીકલ ક્ષેત્રે મોટા ફેરફારો.',
      hi: 'कुंभ राशि में सूर्य ग्रहण। वैज्ञानिक और सामाजिक बदलाव।',
      en: 'Ring of fire eclipse in Aquarius conjunct Rahu, initiating transformative breakthroughs in science and mass consciousness.',
    },
    importance: 'high',
  },
  {
    id: 'evt-2026-03-03-lun-ecl',
    date: '2026-03-03',
    time: '17:03',
    category: 'eclipse',
    planet: 'Moon',
    planetSymbol: '☽',
    fromSign: 'Leo',
    toSign: 'Leo',
    title: {
      gu: 'સંપૂર્ણ ચંદ્ર ગ્રહણ - ફાગણી પૂનમ (Total Lunar Eclipse)',
      hi: 'पूर्ण चंद्र ग्रहण (होली महापर्व)',
      en: 'Total Lunar Eclipse in Leo on Holi',
    },
    description: {
      gu: 'સિંહ રાશિ અને મઘા નક્ષત્રમાં પૂર્ણ ચંદ્ર ગ્રહણ. કેતુ-ચંદ્ર યુતિ. આધ્યાત્મિક સાધના અને મંત્ર જાપ માટે અમોઘ સમય.',
      hi: 'सिंह राशि में पूर्ण चंद्र ग्रहण। मंत्र सिद्धि हेतु अति उत्तम।',
      en: 'Total lunar eclipse in Leo conjunct Ketu. Powerful energy for leadership purging and karmic soul liberation.',
    },
    importance: 'high',
  },
  {
    id: 'evt-2026-06-02-jup-ing-can',
    date: '2026-06-02',
    time: '04:15',
    category: 'ingress',
    planet: 'Jupiter',
    planetSymbol: '♃',
    fromSign: 'Gemini',
    toSign: 'Cancer',
    title: {
      gu: 'ગુરુ કર્ક રાશિ પ્રવેશ - પરમોચ્ચ ગુરુ ગોચર (Jupiter Enters Exaltation Sign Cancer)',
      hi: 'गुरु का अपनी उच्च राशि कर्क में महाप्रवेश',
      en: 'Jupiter Enters Exalted Sign Cancer (Peak Auspicious Transit)',
    },
    description: {
      gu: 'દેવગુરુ બૃહસ્પતિ પોતાની પરમોચ્ચ રાશિ કર્કમાં પ્રવેશ કરશે (૧૨ વર્ષ પછી). ધર્મ, સંસ્કૃતિ, પારિવારિક સુખ અને આધ્યાત્મિકતાનો સુવર્ણ યુગ શરૂ થશે.',
      hi: 'गुरु का अपनी उच्च राशि कर्क में १२ साल बाद प्रवेश। अपार धन, वैभव, ज्ञान और धर्म की वृद्धि।',
      en: 'Jupiter enters its exaltation sign Cancer after 12 years. Unlocks Hansa Maha Purusha Yoga, conferring peak prosperity, moral harmony, and spiritual blossoming worldwide.',
    },
    importance: 'major',
  },
  {
    id: 'evt-2026-08-12-sol-ecl',
    date: '2026-08-12',
    time: '23:16',
    category: 'eclipse',
    planet: 'Sun',
    planetSymbol: '☉',
    fromSign: 'Cancer',
    toSign: 'Cancer',
    title: {
      gu: 'સંપૂર્ણ સૂર્ય ગ્રહણ (Total Solar Eclipse in Cancer)',
      hi: 'पूर्ण सूर्य ग्रहण (कर्क राशि)',
      en: 'Total Solar Eclipse in Cancer (Global Event)',
    },
    description: {
      gu: 'કર્ક રાશિ અને આશ્લેષા નક્ષત્રમાં સંપૂર્ણ સૂર્ય ગ્રહણ. ઉચ્ચ ગુરુની સાક્ષીમાં પરિવર્તનકારી ઊર્જા.',
      hi: 'कर्क राशि में पूर्ण सूर्य ग्रहण। जल तत्व और मौसम में बदलाव।',
      en: 'Total Solar Eclipse in Cancer under the watchful eye of exalted Jupiter. Unprecedented reset in emotional, territorial, and home affairs.',
    },
    importance: 'high',
  },
  {
    id: 'evt-2026-08-28-lun-ecl',
    date: '2026-08-28',
    time: '09:44',
    category: 'eclipse',
    planet: 'Moon',
    planetSymbol: '☽',
    fromSign: 'Aquarius',
    toSign: 'Aquarius',
    title: {
      gu: 'ખંડગ્રાસ ચંદ્ર ગ્રહણ - રક્ષાબંધન (Partial Lunar Eclipse)',
      hi: 'खंडग्रास चंद्र ग्रहण (रक्षाबंधन)',
      en: 'Partial Lunar Eclipse in Aquarius on Raksha Bandhan',
    },
    description: {
      gu: 'કુંભ રાશિ અને શતભિષા નક્ષત્રમાં રક્ષાબંધન શ્રાવણી પૂનમના દિવસે ચંદ્ર ગ્રહણ.',
      hi: 'कुंभ राशि में चंद्र ग्रहण। भाई-बहन के प्रेम और पारिवारिक शांति हेतु जप करें।',
      en: 'Partial Lunar Eclipse in Aquarius on Shravana Purnima / Raksha Bandhan.',
    },
    importance: 'high',
  },
  {
    id: 'evt-2026-10-31-jup-ing-leo',
    date: '2026-10-31',
    time: '18:50',
    category: 'ingress',
    planet: 'Jupiter',
    planetSymbol: '♃',
    fromSign: 'Cancer',
    toSign: 'Leo',
    title: {
      gu: 'ગુરુ સિંહ રાશિ અતિચાર પ્રવેશ (Jupiter Ingress Leo)',
      hi: 'गुरु सिंह राशि प्रवेश',
      en: 'Jupiter Ingress Leo (Guru Simha Gochar)',
    },
    description: {
      gu: 'ગુરુ મિત્ર સૂર્યની રાશિ સિંહમાં પ્રવેશ કરશે. શાસન, નેતૃત્વ, વહીવટ અને આત્મવિશ્વાસમાં તેજસ્વી વૃદ્ધિ થશે.',
      hi: 'गुरु का मित्र राशि सिंह में गोचर। मान-सम्मान व पद-प्रतिष्ठा में वृद्धि।',
      en: 'Jupiter moves into regal fire sign Leo, boosting charisma, governance reforms, creativity, and executive leadership.',
    },
    importance: 'major',
  },

  // -------------------------------------------------------------
  // 2027 - 2028 MAJOR TRANSITS
  // -------------------------------------------------------------
  {
    id: 'evt-2027-06-03-sat-ing-ari',
    date: '2027-06-03',
    time: '11:15',
    category: 'ingress',
    planet: 'Saturn',
    planetSymbol: '♄',
    fromSign: 'Pisces',
    toSign: 'Aries',
    title: {
      gu: 'શનિ મેષ રાશિ પ્રવેશ (Saturn Ingress Aries)',
      hi: 'शनिदेव का मेष राशि में प्रवेश',
      en: 'Saturn Enters Aries (Shani Mesha Gochar)',
    },
    description: {
      gu: 'શનિદેવ મેષ રાશિમાં પ્રવેશ કરશે (નીચ સ્થાન). ધીરજ અને સખત પરિશ્રમ દ્વારા સાહસ અને નવી શરૂઆતનો સમય.',
      hi: 'शनि का मेष राशि में गोचर। अनुशासन और संयम से कार्य सिद्ध होंगे।',
      en: 'Saturn enters Aries for a 2.5-year stay, demanding rigorous discipline, grounded courage, and perseverance.',
    },
    importance: 'major',
  },
  {
    id: 'evt-2027-11-25-jup-ing-vir',
    date: '2027-11-25',
    time: '14:40',
    category: 'ingress',
    planet: 'Jupiter',
    planetSymbol: '♃',
    fromSign: 'Leo',
    toSign: 'Virgo',
    title: {
      gu: 'ગુરુ કન્યા રાશિ પ્રવેશ (Jupiter Ingress Virgo)',
      hi: 'गुरु कन्या राशि प्रवेश',
      en: 'Jupiter Enters Virgo',
    },
    description: {
      gu: 'બૃહસ્પતિ બુધની કન્યા રાશિમાં પ્રવેશ કરશે. વિશ્લેષણાત્મક બુદ્ધિ, આરોગ્ય વ્યવસ્થા અને વ્યવહારિક શિક્ષણમાં ઉન્નતિ.',
      hi: 'गुरु का कन्या में प्रवेश। सेवा, स्वास्थ्य और शिक्षा में सुधार।',
      en: 'Jupiter enters analytical earth sign Virgo, fostering health sciences, meticulous planning, and practical solutions.',
    },
    importance: 'major',
  },
];

// Helper: Calculate the effect of a planetary event for a specific natal chart
export function calculatePersonalEventImpact(event, kundliData) {
  if (!kundliData || !kundliData.panchang) {
    return {
      houseFromMoon: null,
      houseFromLagna: null,
      rating: 'neutral',
      ratingText: { gu: 'સામાન્ય (Neutral)', hi: 'सामान्य', en: 'Neutral' },
      guidance: {
        gu: 'તમારી કુંડળી મુજબ આ ગોચર સામાન્ય ફળદાયી રહેશે.',
        hi: 'आपकी कुंडली अनुसार यह गोचर सामान्य फलकारी रहेगा।',
        en: 'This transit will have a balanced influence on your natal chart.',
      },
      remedy: {
        gu: 'ૐ નમો ભગવતે વાસુદેવાય જાપ કરો.',
        hi: 'ॐ नमो भगवते वासुदेवाय का जप करें।',
        en: 'Chant Om Namo Bhagavate Vasudevaya for harmony.',
      },
    };
  }

  const moonSignIndex = kundliData.panchang.moonSign
    ? RASHIS.findIndex((r) => r.id.toLowerCase() === kundliData.panchang.moonSign.toLowerCase())
    : 0;

  const lagnaSignIndex = kundliData.lagnaSignIndex != null ? kundliData.lagnaSignIndex : 0;

  const targetSignIndex = RASHIS.findIndex(
    (r) => r.id.toLowerCase() === (event.toSign || event.fromSign).toLowerCase()
  );

  const safeTargetSignIndex = targetSignIndex >= 0 ? targetSignIndex : 0;

  const houseFromMoon = ((((safeTargetSignIndex - moonSignIndex) % 12) + 12) % 12) + 1;
  const houseFromLagna = ((((safeTargetSignIndex - lagnaSignIndex) % 12) + 12) % 12) + 1;

  let rating = 'neutral';
  let ratingText = { gu: 'સાધારણ ફળદાયી', hi: 'मध्यम फल', en: 'Moderate' };
  let guidance = {};
  let remedy = {};

  const pName = event.planet || 'Jupiter';

  // Classical Gochar Auspicious Houses
  // Sun: 3, 6, 10, 11
  // Moon: 1, 3, 6, 7, 10, 11
  // Mars: 3, 6, 11
  // Mercury: 2, 4, 6, 8, 10, 11
  // Jupiter: 2, 5, 7, 9, 11
  // Venus: 1, 2, 3, 4, 5, 8, 9, 11, 12
  // Saturn: 3, 6, 11
  // Rahu/Ketu: 3, 6, 10, 11

  const isTrikona = houseFromMoon === 1 || houseFromMoon === 5 || houseFromMoon === 9;
  const isKendra =
    houseFromMoon === 1 || houseFromMoon === 4 || houseFromMoon === 7 || houseFromMoon === 10;
  const isUpachaya =
    houseFromMoon === 3 || houseFromMoon === 6 || houseFromMoon === 10 || houseFromMoon === 11;
  const isDusthana = houseFromMoon === 6 || houseFromMoon === 8 || houseFromMoon === 12;

  if (pName === 'Jupiter' && (isTrikona || [2, 5, 7, 9, 11].includes(houseFromMoon))) {
    rating = 'highly_auspicious';
    ratingText = {
      gu: 'અતિ શુભ & ભાગ્યોદય (Highly Auspicious)',
      hi: 'अति शुभ एवं भाग्योदय',
      en: 'Highly Auspicious & Blessed',
    };
    guidance = {
      gu: `તમારી ચંદ્ર રાશિથી ${houseFromMoon}મા સ્થાનમાં ગુરુનું ગોચર સૌભાગ્ય, જ્ઞાન, સંતાન સુખ અને નાણાકીય વૃદ્ધિ આપશે.`,
      hi: `आपकी चंद्र राशि से ${houseFromMoon}वें भाव में गुरु का गोचर सौभाग्य, ज्ञान और धन वृद्धि कराएगा।`,
      en: `Jupiter transiting your natal ${houseFromMoon}th house brings auspicious expansion, mentorship, wisdom, and financial blessings.`,
    };
    remedy = {
      gu: 'ગુરુવારે ગાયને ચણાની દાળ અને ગોળ ખવડાવો. ૐ બૃહસ્પતયે નમઃ જાપ કરો.',
      hi: 'गुरुवार को चने की दाल व गुड़ गाय को खिलाएं। ॐ बृं बृहस्पतये नमः जपें।',
      en: 'Offer yellow sweets or donate on Thursdays; chant Om Brihaspataye Namah.',
    };
  } else if (pName === 'Saturn' && [3, 6, 11].includes(houseFromMoon)) {
    rating = 'auspicious';
    ratingText = {
      gu: 'શુભ & શત્રુજય (Auspicious Victory)',
      hi: 'शुभ एवं शत्रुविजय',
      en: 'Favorable & Productive',
    };
    guidance = {
      gu: `શનિદેવ તમારી ચંદ્ર રાશિથી ઉપચય ભાવ ${houseFromMoon}માં ગોચર કરી રહ્યા છે. શત્રુઓ પર વિજય, રોગમુક્તિ અને સ્થિર પ્રગતિ થશે.`,
      hi: `शनि का ${houseFromMoon}वें उपचय भाव में गोचर शत्रुओं पर विजय और कार्यों में स्थायित्व देगा।`,
      en: `Saturn transiting your ${houseFromMoon}th house bestows resilience, professional discipline, and victory over adversaries.`,
    };
    remedy = {
      gu: 'શનિવારે પીપળે સરસવના તેલનો દીવો પ્રગટાવો અને હનુમાન ચાલીસા પાઠ કરો.',
      hi: 'शनिवार को पीपल पर सरसों के तेल का दीपक जलाएं एवं हनुमान चालीसा पढ़ें।',
      en: 'Light a mustard oil lamp on Saturdays and recite Hanuman Chalisa.',
    };
  } else if (event.category === 'eclipse') {
    rating = 'caution';
    ratingText = {
      gu: 'સાવધાની & ધ્યાન (Caution & Meditation)',
      hi: 'सावधानी एवं साधना',
      en: 'Spiritual Cleansing / Caution',
    };
    guidance = {
      gu: `આ ગ્રહણ તમારી કુંડળીના ${houseFromMoon}મા સ્થાનમાં થઈ રહ્યું છે. આ દિવસે મહત્વપૂર્ણ કરારો કે વિવાદો ટાળવા અને મંત્ર સાધના કરવી.`,
      hi: `यह ग्रहण आपके ${houseFromMoon}वें भाव में है। बड़े वित्तीय निर्णय टालें एवं ध्यान-जप करें।`,
      en: `This eclipse activates your ${houseFromMoon}th house. Practice inner meditation, avoid hasty emotional reactions, and chant your Ishta Mantra.`,
    };
    remedy = {
      gu: 'ગ્રહણ સમયે ગાયત્રી મંત્ર અથવા મહામૃત્યુંજય મંત્રનો અખંડ જાપ કરો. ગ્રહણ બાદ અન્ન દાન કરો.',
      hi: 'ग्रहण काल में महामृत्युंजय या गायत्री मंत्र जपें। तत्पश्चात अन्न दान करें।',
      en: 'Chant Maha Mrityunjaya Mantra during eclipse hours and donate food/grains afterward.',
    };
  } else if (isDusthana && !isUpachaya) {
    rating = 'caution';
    ratingText = {
      gu: 'સાવધાની જરૂરી (Requires Caution)',
      hi: 'सतर्कता आवश्यक',
      en: 'Requires Patience & Care',
    };
    guidance = {
      gu: `તમારી રાશિથી ${houseFromMoon}મું સ્થાન પ્રતિકૂળ હોવાથી આરોગ્ય અને બિનજરૂરી ખર્ચમાં સાવચેત રહેવું.`,
      hi: `आपकी राशि से ${houseFromMoon}वां भाव प्रतिकूल होने से स्वास्थ्य व व्यय पर ध्यान दें।`,
      en: `Transiting your ${houseFromMoon}th house advises vigilance over health, expenditure, and maintaining peaceful communication.`,
    };
    remedy = {
      gu: 'નિત્ય શિવલિંગ પર જળાભિષેક કરો અને પક્ષીઓને ચણ નાખો.',
      hi: 'प्रतिदिन शिवलिंग पर जलाभिषेक करें व पक्षियों को दाना डालें।',
      en: 'Offer water to Shivling and feed grains to birds daily.',
    };
  } else {
    rating = 'favorable';
    ratingText = { gu: 'અનુકૂળ ફળદાયી (Favorable)', hi: 'अनुकूल फल', en: 'Favorable Influence' };
    guidance = {
      gu: `આ ગ્રહીય ઘટના તમારી કુંડળીના ${houseFromMoon}મા સ્થાનમાં શુભ પરિણામોનું સર્જન કરશે.`,
      hi: `यह खगोलीय घटना आपके ${houseFromMoon}वें भाव में अनुकूल परिणाम देगी।`,
      en: `This planetary event harmonizes with your ${houseFromMoon}th house, promoting constructive momentum.`,
    };
    remedy = {
      gu: 'નિત્ય સૂર્ય નારાયણને તાંબાના લોટાથી અર્ઘ્ય અર્પણ કરો.',
      hi: 'प्रतिदिन सूर्यदेव को तांबे के लोटे से जल अर्पित करें।',
      en: 'Offer water to the rising Sun daily in a copper vessel.',
    };
  }

  return {
    houseFromMoon,
    houseFromLagna,
    rating,
    ratingText,
    guidance,
    remedy,
  };
}

// Main Filter Function for Upcoming Events
export function getFilteredPlanetaryEvents({
  year = null,
  category = 'all',
  timeframe = 'all', // 'next30' | 'next90' | 'thisYear' | 'all'
  searchQuery = '',
  kundliData = null,
  currentDate = new Date(),
}) {
  let list = [...PLANETARY_EVENTS_DATABASE];

  // 1. Year Filter
  if (year && year !== 'all') {
    list = list.filter((e) => e.date.startsWith(String(year)));
  }

  // 2. Category Filter
  if (category && category !== 'all') {
    list = list.filter((e) => e.category === category);
  }

  // 3. Timeframe Filter
  const nowMs = currentDate.getTime();
  if (timeframe === 'next30') {
    const limitMs = nowMs + 30 * 24 * 60 * 60 * 1000;
    list = list.filter((e) => {
      const eMs = new Date(e.date + 'T' + e.time).getTime();
      return eMs >= nowMs && eMs <= limitMs;
    });
  } else if (timeframe === 'next90') {
    const limitMs = nowMs + 90 * 24 * 60 * 60 * 1000;
    list = list.filter((e) => {
      const eMs = new Date(e.date + 'T' + e.time).getTime();
      return eMs >= nowMs && eMs <= limitMs;
    });
  } else if (timeframe === 'thisYear') {
    const curYear = currentDate.getFullYear();
    list = list.filter((e) => e.date.startsWith(String(curYear)));
  }

  // 4. Search Filter
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(
      (e) =>
        e.title.gu.toLowerCase().includes(q) ||
        e.title.hi.toLowerCase().includes(q) ||
        e.title.en.toLowerCase().includes(q) ||
        e.description.gu.toLowerCase().includes(q) ||
        e.description.en.toLowerCase().includes(q) ||
        e.planet.toLowerCase().includes(q) ||
        e.fromSign.toLowerCase().includes(q) ||
        e.toSign.toLowerCase().includes(q)
    );
  }

  // Sort chronologically
  list.sort((a, b) => {
    const timeA = new Date(a.date + 'T' + a.time).getTime();
    const timeB = new Date(b.date + 'T' + b.time).getTime();
    return timeA - timeB;
  });

  // Attach personal impact analysis if kundliData is present
  return list.map((evt) => {
    const personalImpact = calculatePersonalEventImpact(evt, kundliData);
    const eventTime = new Date(evt.date + 'T' + evt.time);
    const diffDays = Math.ceil((eventTime.getTime() - nowMs) / (1000 * 60 * 60 * 24));

    let timeStatus = 'upcoming';
    let daysLabel = '';

    if (diffDays === 0) {
      timeStatus = 'today';
      daysLabel = 'આજે (Today)';
    } else if (diffDays > 0) {
      timeStatus = 'upcoming';
      daysLabel = `${diffDays} દિવસ બાકી (${diffDays} days left)`;
    } else {
      timeStatus = 'past';
      daysLabel = `${Math.abs(diffDays)} દિવસ પહેલાં (${Math.abs(diffDays)} days ago)`;
    }

    return {
      ...evt,
      personalImpact,
      diffDays,
      timeStatus,
      daysLabel,
    };
  });
}
