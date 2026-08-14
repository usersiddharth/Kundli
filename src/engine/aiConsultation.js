// Context-Aware Vedic Astrological Consultation & Q&A Synthesis Engine

import { calculateShadbala } from './shadbala.js';
import { calculateAshtakavarga } from './ashtakvarga.js';
import { calculateLuckyFactorsAndGemstones } from './gemstones.js';

export const CONSULTATION_TOPICS = [
  {
    id: 'career',
    title: {
      en: 'Career, Job & Business Success',
      hi: 'आजीविका, नौकरी एवं व्यवसाय',
      gu: 'કારકિર્દી, નોકરી અને વેપાર',
    },
    icon: 'Briefcase',
  },
  {
    id: 'marriage',
    title: {
      en: 'Marriage, Spouse & Relationships',
      hi: 'विवाह, जीवनसाथी एवं संबंध',
      gu: 'લગ્ન, જીવનસાથી અને સંબંધો',
    },
    icon: 'Heart',
  },
  {
    id: 'wealth',
    title: {
      en: 'Wealth, Property & Financial Growth',
      hi: 'धन, संपत्ति एवं आर्थिक समृद्धि',
      gu: 'ધન, મિલકત અને આર્થિક સમૃદ્ધિ',
    },
    icon: 'Coins',
  },
  {
    id: 'health',
    title: {
      en: 'Health, Vitality & Wellness',
      hi: 'स्वास्थ्य, आयु एवं जीवन शक्ति',
      gu: 'સ્વાસ્થ્ય, આયુષ્ય અને ઉર્જા',
    },
    icon: 'Activity',
  },
  {
    id: 'education',
    title: {
      en: 'Higher Education & Skills',
      hi: 'उच्च शिक्षा, बुद्धि एवं ज्ञान',
      gu: 'ઉચ્ચ શિક્ષણ, બુદ્ધિ અને જ્ઞાન',
    },
    icon: 'GraduationCap',
  },
  {
    id: 'spirituality',
    title: {
      en: 'Spiritual Path, Karma & Moksha',
      hi: 'अध्यात्म, प्रारब्ध एवं मोक्ष',
      gu: 'અધ્યાત્મ, પ્રારબ્ધ અને મોક્ષ',
    },
    icon: 'Sparkles',
  },
];

export function generateAstrologicalInsight(topicId, kundliData, lang = 'gu') {
  if (!kundliData) return null;

  const planets = kundliData.planets;
  const lagnaHouse = kundliData.d1Houses[0];
  const tenthHouse = kundliData.d1Houses[9];
  const seventhHouse = kundliData.d1Houses[6];
  const secondHouse = kundliData.d1Houses[1];
  const eleventhHouse = kundliData.d1Houses[10];
  const fifthHouse = kundliData.d1Houses[4];
  const ninthHouse = kundliData.d1Houses[8];
  const twelfthHouse = kundliData.d1Houses[11];

  const shadbala = calculateShadbala(kundliData);
  const lucky = calculateLuckyFactorsAndGemstones(kundliData);
  const ak = lucky.jaiminiKarakas[0]; // Atmakaraka

  switch (topicId) {
    case 'career': {
      const tenthLord = tenthHouse.rashi.lord;
      const tenthPlanets =
        tenthHouse.planets.map((p) => p.name).join(', ') || 'Unoccupied (Benefic Aspect)';
      const isStrongTenth = shadbala.planetBalas[tenthLord]?.isAdequate;

      return {
        topic: 'Career & Business',
        keyInfluencers: `10th House (${tenthHouse.rashi.id}), 10th Lord (${tenthLord}), Atmakaraka (${ak.planet})`,
        summary: {
          en: `Your 10th House of profession is governed by ${tenthLord}. With ${tenthHouse.rashi.id} on the midheaven, leadership in management, consulting, technical fields, or independent entrepreneurship is highly favored. ${isStrongTenth ? 'The 10th lord possesses strong Shadbala, indicating steady authority and career stability.' : 'Continuous perseverance and building specialized skills will yield excellent elevation.'}`,
          hi: `आपका दशम भाव (कर्म भाव) ${tenthHouse.rashi.id} राशि में है, जिसके स्वामी ${tenthLord} हैं। यह स्थिति स्वतंत्र व्यवसाय, तकनीकी क्षेत्र, प्रशासन या परामर्श में उत्कृष्ट सफलता का संकेत देती है। ${tenthLord} का बल कार्यक्षेत्र में मान-सम्मान एवं नेतृत्व क्षमता प्रदान करेगा।`,
          gu: `તમારો દશમ ભાવ (કર્મ ભાવ) ${tenthHouse.rashi.id} રાશિમાં છે, જેના સ્વામી ${tenthLord} છે. વ્યવસાય, ટેકનિકલ ક્ષેત્ર, વહીવટી કાર્ય અથવા સ્વતંત્ર વેપારમાં અદ્ભુત પ્રગતિના યોગ છે. ${tenthLord} ની કૃપાથી કાર્યક્ષેત્રમાં માન-સન્માન અને પ્રતિષ્ઠા મળશે.`,
        },
        actionPlan: {
          en: `Strengthen ${tenthLord} through regular discipline. Ideal days for business decisions: ${lucky.luckyMeta.direction} direction, on ${tenthLord}'s day.`,
          hi: `${tenthLord} को अनुकूल करने हेतु प्रतिदिन एकाग्रता बनाए रखें। महत्वपूर्ण निर्णयों हेतु ${lucky.luckyMeta.direction} दिशा उत्तम है।`,
          gu: `${tenthLord} ને બળવાન બનાવવા માટે નિયમિતતા રાખવી. મહત્વના કામકાજ માટે ${lucky.luckyMeta.direction} દિશા અનુકૂળ રહેશે.`,
        },
      };
    }

    case 'marriage': {
      const seventhLord = seventhHouse.rashi.lord;
      const seventhPlanets = seventhHouse.planets.map((p) => p.name).join(', ') || 'Clean House';

      return {
        topic: 'Marriage & Spouse',
        keyInfluencers: `7th House (${seventhHouse.rashi.id}), 7th Lord (${seventhLord}), Venus & Jupiter`,
        summary: {
          en: `Your 7th House of partnership is situated in ${seventhHouse.rashi.id} ruled by ${seventhLord}. The spouse will be intellectually refined, loyal, and socially supportive. Relationship harmony flourishes through mutual respect and clear communication.`,
          hi: `सप्तम भाव (विवाह भाव) ${seventhHouse.rashi.id} में है, जिसके स्वामी ${seventhLord} हैं। जीवनसाथी बुद्धिमान, सुसंस्कृत एवं सामाजिक रूप से सहयोगी होंगे। दांपत्य जीवन में परस्पर संवाद एवं विश्वास से सुख-समृद्धि बढ़ेगी।`,
          gu: `સપ્તમ ભાવ (લગ્ન ભાવ) ${seventhHouse.rashi.id} રાશિમાં છે, જેના સ્વામી ${seventhLord} છે. જીવનસાથી બુદ્ધિશાળી, સંસ્કારી અને પ્રેમાળ હશે. પરસ્પર વિશ્વાસ અને સ્નેહથી દાંપત્ય જીવન સુખી રહેશે.`,
        },
        actionPlan: {
          en: `Honor ${seventhLord} with auspicious prayers on Fridays/Thursdays to maintain sweet harmony.`,
          hi: `वैवाहिक सुख में वृद्धि हेतु गुरु अथवा शुक्र के बीज मंत्रों का श्रवण शुभ रहेगा।`,
          gu: `દાંપત્ય સુખ માટે નિયમિત ઇષ્ટદેવની આરાધના કરવી અને સ્નેહભાવ જાળવવો.`,
        },
      };
    }

    case 'wealth': {
      const secondLord = secondHouse.rashi.lord;
      const eleventhLord = eleventhHouse.rashi.lord;

      return {
        topic: 'Wealth & Finance',
        keyInfluencers: `2nd Lord (${secondLord}), 11th Lord (${eleventhLord}), Jupiter (Karka)`,
        summary: {
          en: `The 2nd House of accumulated wealth (${secondHouse.rashi.id}) and 11th House of recurring gains (${eleventhHouse.rashi.id}) create a resilient financial foundation. Wealth accumulates steadily through strategic investments and diversified income streams.`,
          hi: `द्वितीय भाव (धन संचय) एवं एकादश भाव (आय-लाभ) के स्वामी क्रमशः ${secondLord} एवं ${eleventhLord} हैं। यह योग स्थिर आर्थिक समृद्धि, संपत्ति निर्माण एवं व्यापारिक लाभ का मार्ग प्रशस्त करता है।`,
          gu: `ધન સ્થાનના સ્વામી ${secondLord} અને લાભ સ્થાનના સ્વામી ${eleventhLord} ની સ્થિતિ આર્થિક સમૃદ્ધિ દર્શાવે છે. ધીમે-ધીમે સ્થિર સંપત્તિ અને આવકના નવા સ્ત્રોત ઊભા થશે.`,
        },
        actionPlan: {
          en: `Wear ${lucky.gemstones[1].stone} to boost luck in financial growth.`,
          hi: `आर्थिक समृद्धि हेतु ${lucky.gemstones[1].stone} धारण करना अति शुभ रहेगा।`,
          gu: `આર્થિક ઉન્નતિ માટે ${lucky.gemstones[1].stone} ધારણ કરવું લાભદાયક રહેશે.`,
        },
      };
    }

    case 'health': {
      const lagnaLord = lagnaHouse.rashi.lord;

      return {
        topic: 'Health & Vitality',
        keyInfluencers: `Ascendant (${lagnaHouse.rashi.id}), Lagna Lord (${lagnaLord}), Sun & Moon`,
        summary: {
          en: `Your physical stamina is primarily anchored by Ascendant Lord ${lagnaLord}. Maintaining balanced hydration, disciplined sleep schedules, and moderate physical yoga maintains optimal vitality and guards against stress.`,
          hi: `शारीरिक स्वास्थ्य एवं रोग प्रतिरोधक क्षमता लग्नेश ${lagnaLord} पर आधारित है। नियमित व्यायाम, संतुलित दिनचर्या एवं ध्यान से दीर्घायु एवं उत्तम स्वास्थ्य प्राप्त होगा।`,
          gu: `તમારું શારીરિક સ્વાસ્થ્ય અને રોગપ્રતિકારક શક્તિ લગ્નેશ ${lagnaLord} પર નિર્ભર છે. નિયમિત વ્યાયામ, પૌષ્ટિક આહાર અને યોગાસન કરવાથી સ્વાસ્થ્ય સારું રહેશે.`,
        },
        actionPlan: {
          en: `Practice morning Surya Namaskar and meditate in the ${lucky.luckyMeta.direction} direction.`,
          hi: `प्रातःकाल सूर्य को अर्घ्य दें और ${lucky.luckyMeta.direction} दिशा की ओर मुख करके प्राणायाम करें।`,
          gu: `સવારે સૂર્ય નમસ્કાર કરવા અને ${lucky.luckyMeta.direction} દિશા તરફ મુખ રાખી પ્રાણાયામ કરવા.`,
        },
      };
    }

    case 'education': {
      const fifthLord = fifthHouse.rashi.lord;

      return {
        topic: 'Education & Intellect',
        keyInfluencers: `5th House (${fifthHouse.rashi.id}), 5th Lord (${fifthLord}), Mercury & Jupiter`,
        summary: {
          en: `Your 5th House of intellect is presided by ${fifthLord}. This bestows sharp analytical memory, creative ingenuity, and high aptitude for advanced specialized certifications and scholarly wisdom.`,
          hi: `पंचम भाव (बुद्धि एवं विद्या) के स्वामी ${fifthLord} हैं। यह ग्रह स्थिति तीक्ष्ण स्मरण शक्ति, तार्किक क्षमता एवं उच्च शिक्षा में उत्कृष्ट सफलता प्रदान करती है।`,
          gu: `પંચમ ભાવ (બુદ્ધિ અને વિદ્યા) ના સ્વામી ${fifthLord} છે. આ યોગ તીક્ષ્ણ બુદ્ધિ, યાદશક્તિ અને ઉચ્ચ અભ્યાસમાં વિશેષ સફળતા અપાવે છે.`,
        },
        actionPlan: {
          en: `Chant Saraswati / Ganesha mantras on Wednesdays to expand intellect.`,
          hi: `ज्ञान एवं एकाग्रता में वृद्धि हेतु बुधवार को श्री गणेश अथर्वशीर्ष का पाठ करें।`,
          gu: `બુદ્ધિ અને એકાગ્રતા વધારવા માટે બુધવારે ગણેશજીની આરાધના કરવી.`,
        },
      };
    }

    case 'spirituality': {
      const ninthLord = ninthHouse.rashi.lord;
      const twelfthLord = twelfthHouse.rashi.lord;

      return {
        topic: 'Spiritual Path & Moksha',
        keyInfluencers: `Atmakaraka (${ak.planet}), 9th Lord (${ninthLord}), 12th Lord (${twelfthLord}), Ketu`,
        summary: {
          en: `Your Atmakaraka is ${ak.planet}, indicating that your soul's greatest evolution comes through integrity, philosophical contemplation, and selfless service. The 9th and 12th house energies indicate profound intuitive awakening.`,
          hi: `आपके आत्मकारक ग्रह ${ak.planet} हैं। आपकी आत्मा का मुख्य उद्देश्य सत्य, परोपकार एवं आध्यात्मिक साधना है। नवम एवं द्वादश भाव आत्म-साक्षात्कार एवं तीर्थाटन हेतु अत्यंत अनुकूल हैं।`,
          gu: `તમારા આત્મકારક ગ્રહ ${ak.planet} છે. આત્માની ઉન્નતિ માટે સત્ય, પરોપકાર અને ઈશ્વર ભક્તિ શ્રેષ્ઠ માર્ગ છે. 9 અને 12 માં ભાવના પ્રભાવથી ગૂઢ આધ્યાત્મિક જ્ઞાન પ્રાપ્ત થશે.`,
        },
        actionPlan: {
          en: `Dedicate 15 minutes daily to silent meditation on ${lucky.luckyMeta.deity}.`,
          hi: `प्रतिदिन 15 मिनट ${lucky.luckyMeta.deity} का शांत ध्यान करें।`,
          gu: `દરરોજ 15 મિનિટ ${lucky.luckyMeta.deity} નું ધ્યાન કરવું.`,
        },
      };
    }

    default:
      return null;
  }
}
