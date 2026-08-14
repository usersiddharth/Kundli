// Vedic Sookshma-Prana Dasha Micro-Predictive Engine
// Synthesizes high-precision personalized forecasts for Sookshma & Prana Dasha periods

const PLANETARY_MICRO_INFLUENCES = {
  Sun: {
    theme: {
      gu: 'આત્મવિશ્વાસ, નેતૃત્વ અને સરકારી/વહીવટી કાર્ય',
      hi: 'आत्मविश्वास, नेतृत्व एवं प्रशासनिक कार्य',
      en: 'Leadership, authority, vitality and self-confidence',
    },
    positive: {
      gu: 'ઉચ્ચ અધિકારીઓ કે પિતાતુલ્ય વ્યક્તિઓ તરફથી સહયોગ અને આશીર્વાદ પ્રાપ્ત થશે. મહત્વપૂર્ણ નિર્ણયો લેવા માટે મનોબળ મજબૂત રહેશે.',
      hi: 'उच्चाधिकारियों एवं वरिष्ठजनों से सहयोग तथा आशीर्वाद मिलेगा। महत्वपूर्ण निर्णय लेने हेतु मनोबल अत्यंत दृढ़ रहेगा।',
      en: 'Support and blessings from authorities or fatherly figures. High vitality and willpower to execute ambitious decisions.',
    },
    counsel: {
      gu: 'અહંકારથી બચવું અને નમ્રતાપૂર્વક સંવાદ સાધવો.',
      hi: 'अहंकार से बचें और विनम्रतापूर्वक संवाद बनाए रखें।',
      en: 'Avoid ego conflicts and maintain graceful humility in discussions.',
    },
  },
  Moon: {
    theme: {
      gu: 'માનસિક શાંતિ, કલ્પનાશીલતા અને પારિવારિક સુખ',
      hi: 'मानसिक शांति, रचनात्मकता एवं पारिवारिक सुख',
      en: 'Emotional peace, creativity, family harmony and short travels',
    },
    positive: {
      gu: 'પરિવાર સાથે સારો તાલમેલ રહેશે. મિત્રો સાથે ટૂંકી યાત્રા લાભદાયક બની શકે છે. તમારા ઉચ્ચ આદર્શો અને સંવેદનશીલતાથી પરિવારમાં સ્નેહ વધશે.',
      hi: 'परिवार के सदस्यों से पहले की अपेक्षा अधिक सहयोग मिलेगा। दोस्तों के साथ यात्रा काफी लाभदायक रहेगी तथा घर पर कोई मांगलिक प्रसंग संभव है।',
      en: 'Warm cooperation from family members and pleasant travel with friends. Enhanced intuition and philosophical calmness.',
    },
    counsel: {
      gu: 'ભાવનાઓમાં વહીને ઉતાવળો નિર્ણય ન લેવો.',
      hi: 'अति-भावुक होकर कोई जल्दबाजी में निर्णय न लें।',
      en: 'Avoid overthinking or taking impulsive decisions under emotional waves.',
    },
  },
  Mars: {
    theme: {
      gu: 'સાહસ, ઉર્જા, જમીન-મિલકત અને ત્વરિત કાર્ય',
      hi: 'साहस, ऊर्जा, भूमि-भवन एवं त्वरित कार्य',
      en: 'Dynamic drive, physical vitality, enterprise and courage',
    },
    positive: {
      gu: 'અટકેલા કાર્યો ઝડપથી પૂર્ણ થશે. રિયલ એસ્ટેટ, સ્પોર્ટ્સ કે ટેકનિકલ ક્ષેત્રે ઉત્સાહવર્ધક પરિણામો મળશે.',
      hi: 'रुके हुए कार्यों में तीव्र गति आएगी। संपत्ति, निर्माण अथवा तकनीकी क्षेत्र में नए प्रयास सफल होंगे।',
      en: 'Swift breakthroughs in pending tasks. High physical drive and confidence to overcome challenges.',
    },
    counsel: {
      gu: 'ગુસ્સો અને વાહન ચલાવતી વખતે ઉતાવળ ટાળવી.',
      hi: 'क्रोध पर नियंत्रण रखें और वाहन चलाते समय सतर्कता बरतें।',
      en: 'Channel energy constructively; avoid rash arguments or haste.',
    },
  },
  Mercury: {
    theme: {
      gu: 'બુદ્ધિપ્રતિભા, વેપાર-વાણિજ્ય અને વાર્તાલાપ',
      hi: 'बुद्धि, व्यापार-वाणिज्य एवं संवाद',
      en: 'Analytical sharpness, commerce, calculations and networking',
    },
    positive: {
      gu: 'વેપારમાં નવા સંપર્કો અને આર્થિક લાભના ઉત્તમ યોગ. વાણી અને બુદ્ધિના પ્રભાવથી મુશ્કેલ કાર્યો સરળ બનશે.',
      hi: 'व्यापार में नए लाभदायक अनुबंध और आर्थिक प्रगति होगी। वाक्चातुर्य एवं बुद्धिमत्ता से सभी प्रभावित होंगे।',
      en: 'Lucrative business communications and financial gains. Great mental clarity for negotiations and learning.',
    },
    counsel: {
      gu: 'લેખિત દસ્તાવેજો ચકાસીને જ સહી કરવી.',
      hi: 'दस्तावेजों को ध्यानपूर्वक पढ़कर ही कोई नया करार करें।',
      en: 'Double check numbers and written agreements before committing.',
    },
  },
  Jupiter: {
    theme: {
      gu: 'જ્ઞાન, ધર્મ, ગુરુકૃપા અને સુખ-સમૃદ્ધિ',
      hi: 'ज्ञान, धर्म, गुरु कृपा एवं समृद्धि',
      en: 'Wisdom, spiritual grace, auspicious growth and good fortune',
    },
    positive: {
      gu: 'ઘરમાં કોઈ માંગલિક પ્રસંગ કે પૂજન સંભવિત છે. વડીલોના આશીર્વાદ અને માર્ગદર્શનથી ભાગ્યોદય થશે. આધ્યાત્મિક ચિંતન ગહન બનશે.',
      hi: 'परिवार के किसी सदस्य की समस्या का समाधान होगा। घर पर मांगलिक प्रसंग संभव है तथा बड़े-बुजुर्गों का भरपूर आशीर्वाद प्राप्त होगा।',
      en: 'Deep spiritual serenity, family celebrations and divine blessings. Financial and intellectual growth.',
    },
    counsel: {
      gu: 'સામાજિક જવાબદારીઓમાં ઉદારતા અને સંતુલન જાળવવું.',
      hi: 'अपने नैतिक मूल्यों पर अडिग रहें और परोपकार में संलग्न रहें।',
      en: 'Stay rooted in core ethical values and share wisdom with humility.',
    },
  },
  Venus: {
    theme: {
      gu: 'વૈભવ, કલા, દામ્પત્ય સુખ અને ખરીદી',
      hi: 'सौंदर्य, कला, दांपत्य सुख एवं भौतिक आनंद',
      en: 'Elegance, romantic harmony, luxury, arts and gifts',
    },
    positive: {
      gu: 'જીવનસાથી સાથે સંબંધોમાં મધુરતા આવશે. નવી વસ્તુઓ, વસ્ત્રો કે વાહનની ખરીદી માટે શુભ સમય છે. સુંદર ભેટ-સોગાદ મળવાના યોગ છે.',
      hi: 'दांपत्य जीवन में मधुरता आएगी। नवीन वस्तुओं के क्रय एवं कलात्मक गतिविधियों हेतु समय अत्यंत अनुकूल है। उपहार प्राप्ति के योग हैं।',
      en: 'Marital harmony, pleasant aesthetics, fine purchases and receiving gifts or tokens of affection.',
    },
    counsel: {
      gu: 'બિનજરૂરી મોજશોખ પાછળ વધુ પડતો ખર્ચ ટાળવો.',
      hi: 'अनावश्यक विलासिता पर बजट से अधिक खर्च न करें।',
      en: 'Keep a balanced eye on luxury spending.',
    },
  },
  Saturn: {
    theme: {
      gu: 'શિસ્ત, ધીરજ, મહેનત અને દીર્ઘકાલીન આયોજન',
      hi: 'अनुशासन, धैर्य, कर्मनिष्ठा एवं दीर्घकालिक योजना',
      en: 'Discipline, perseverance, methodical progress and maturity',
    },
    positive: {
      gu: 'તમારી પરિશ્રમ અને નિષ્ઠાનું ઉત્તમ પરિણામ મળશે. વ્યવહારુ અને ગંભીર વલણ રાખવાથી ભવિષ્ય માટે મજબૂત પાયો રચાશે.',
      hi: 'कठिन परिश्रम का सकारात्मक फल मिलेगा। आप काफी दार्शनिक तथा गंभीर रहेंगे। व्यावहारिक दृष्टिकोण से स्थायी लाभ होगा।',
      en: 'Sincere efforts yield grounded results. Philosophical depth and practical maturity guide long-term success.',
    },
    counsel: {
      gu: 'સુસ્તી કે આળસથી દૂર રહીને સમયસર કામ પૂરું કરવું.',
      hi: 'आलस्य का त्याग करें और कार्य को कल पर न टालें।',
      en: 'Overcome procrastination and maintain regular routines.',
    },
  },
  Rahu: {
    theme: {
      gu: 'અણધારી તકો, ટેકનોલોજી અને નૂતન વિચારો',
      hi: 'आकस्मिक अवसर, प्रौद्योगिकी एवं नवाचार',
      en: 'Sudden breakthroughs, innovative thinking and digital moves',
    },
    positive: {
      gu: 'અચાનક નવી તક કે આકસ્મિક આર્થિક લાભ થઈ શકે છે. ટેકનોલોજી, ઓનલાઈન કામકાજ કે દૂરના સંપર્કો લાભદાયક નીવડશે.',
      hi: 'अचानक अप्रत्याशित लाभ एवं नए अवसर मिल सकते हैं। आधुनिक तकनीक और विदेशी संपर्कों से लाभ होगा।',
      en: 'Sudden flashes of insight and unexpected opportunities through modern tech or distant connections.',
    },
    counsel: {
      gu: 'ભ્રમ કે અતિ-લોભમાં આવીને જોખમી રોકાણ ટાળવું.',
      hi: 'किसी प्रकार के भ्रम अथवा जोखिम भरे प्रलोभनों से बचें।',
      en: 'Verify facts thoroughly; avoid speculative temptations.',
    },
  },
  Ketu: {
    theme: {
      gu: 'આત્મચિંતન, ગૂઢ જ્ઞાન અને આધ્યાત્મિક સંશોધન',
      hi: 'आत्मचिंतन, गूढ़ ज्ञान एवं आध्यात्मिक जागृति',
      en: 'Spiritual introspection, deep research and intuition',
    },
    positive: {
      gu: 'ધ્યાન, પૂજા અને મનની ઊંડી શાંતિ માટે શ્રેષ્ઠ સમય. ગૂઢ બાબતો અને સંશોધનાત્મક કાર્યોમાં અદ્ભુત આંતરસૂઝ પ્રાપ્ત થશે.',
      hi: 'अध्यात्म, साधना एवं गूढ़ रहस्यों को समझने हेतु उत्तम समय। अंतरात्मा की आवाज सही मार्गदर्शन करेगी।',
      en: 'High spiritual receptivity and intuitive clarity. Ideal for research, meditation and scholarly pursuits.',
    },
    counsel: {
      gu: 'માનસિક બેચેનીથી બચવા યોગ અને ઓમકારનો જાપ કરવો.',
      hi: 'मानसिक व्याकुलता से बचने हेतु प्राणायाम व ध्यान करें।',
      en: 'Calm mental fluctuations through meditation and conscious breathing.',
    },
  },
};

// Synthesize a comprehensive personalized micro-reading
export function generateSookshmaPranaReading(currentMicro, lang = 'gu') {
  if (!currentMicro) return null;

  const sdLord = currentMicro.sookshmaDasha.lord;
  const prLord = currentMicro.pranaDasha.lord;
  const mLord = currentMicro.mahadasha.lord;

  const sdData = PLANETARY_MICRO_INFLUENCES[sdLord] || PLANETARY_MICRO_INFLUENCES.Jupiter;
  const prData = PLANETARY_MICRO_INFLUENCES[prLord] || PLANETARY_MICRO_INFLUENCES.Moon;

  // Synthesize rich narrative
  let headline = '';
  let fullNarrative = '';

  if (lang === 'hi') {
    headline = `${sdLord} की सूक्ष्म दशा एवं ${prLord} की प्राण दशा`;
    fullNarrative = `इस समय आप ${sdLord} की सूक्ष्म दशा और ${prLord} की प्राण दशा के प्रभाव में हैं। ${sdData.positive.hi} ${prData.positive.hi} ${sdData.counsel.hi}`;
  } else if (lang === 'en') {
    headline = `${sdLord} Sookshma & ${prLord} Prana Period`;
    fullNarrative = `You are currently experiencing the combined planetary vibration of ${sdLord} Sookshma Dasha and ${prLord} Prana Dasha. ${sdData.positive.en} ${prData.positive.en} Astrological advice: ${sdData.counsel.en}`;
  } else {
    // Default Gujarati
    headline = `${sdLord} ની સૂક્ષ્મ દશા અને ${prLord} ની પ્રાણ દશા`;
    fullNarrative = `આ સમયગાળા દરમિયાન તમે ${sdLord} ની સૂક્ષ્મ દશા તથા ${prLord} ની પ્રાણ દશાના પ્રભાવ હેઠળ છો. ${sdData.positive.gu} ${prData.positive.gu} ${sdData.counsel.gu}`;
  }

  return {
    title: {
      gu: 'સૂક્ષ્મ-પ્રાણ (વૈદિક)',
      hi: 'सूक्ष्म-प्राण (वैदिक)',
      en: 'Sookshma-Prana (Vedic)',
    },
    validUntil: {
      formatted: currentMicro.pranaDasha.endDateFormatted,
      sookshmaEnd: currentMicro.sookshmaDasha.endDateFormatted,
    },
    sookshmaLord: sdLord,
    pranaLord: prLord,
    mahadashaLord: mLord,
    headline,
    narrative: fullNarrative,
    primaryTheme: sdData.theme[lang] || sdData.theme.gu,
    hourlyFocus: prData.theme[lang] || prData.theme.gu,
  };
}
