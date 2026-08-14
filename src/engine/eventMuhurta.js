// Personalized Event Muhurta Evaluation Engine
// Evaluates suitability for specific life events (Vehicle, Marriage, Property, Business Launch, Griha Pravesh, Health)

export const EVENT_TYPES = [
  {
    id: 'vehicle',
    name: { gu: 'વાહન ખરીદી', hi: 'वाहन क्रय', en: 'Vehicle Purchase' },
    icon: 'Car',
    goodDays: [1, 3, 4, 5],
    desc: {
      gu: 'શુભ નક્ષત્ર, તિથિ અને વાહનની સ્થિરતા માટે અનુકૂળ સમય',
      hi: 'वाहन क्रय हेतु शुभ मुहूर्त',
      en: 'Favorable dates for buying cars & bikes',
    },
  },
  {
    id: 'marriage',
    name: { gu: 'લગ્ન પ્રસંગ', hi: 'विवाह संस्कार', en: 'Marriage Ceremony' },
    icon: 'Heart',
    goodDays: [0, 1, 3, 4, 5],
    desc: {
      gu: 'અષ્ટકૂટ મિલન, તારાબળ અને વિવાહ શુદ્ધિ મુહૂર્ત',
      hi: 'विवाह हेतु पाणिग्रहण शुभ मुहूर्त',
      en: 'Auspicious wedding & betrothal dates',
    },
  },
  {
    id: 'property',
    name: { gu: 'મિલકત / જમીન ખરીદી', hi: 'संपत्ति क्रय', en: 'Property Purchase' },
    icon: 'Home',
    goodDays: [2, 4, 5, 6],
    desc: {
      gu: 'સ્થાવર મિલકત, જમીન અને ભવન ખરીદી મુહૂર્ત',
      hi: 'भूमि व मकान रजिस्ट्री हेतु शुभ मुहूर्त',
      en: 'Real estate & land registration',
    },
  },
  {
    id: 'business',
    name: { gu: 'નવા વ્યાપાર આરંભ', hi: 'व्यापार शुभारंभ', en: 'Business Launch' },
    icon: 'Briefcase',
    goodDays: [1, 3, 4, 5],
    desc: {
      gu: 'નવી ઓફિસ, દુકાન કે વ્યાપારિક શ્રીગણેશ',
      hi: 'व्यापार व दुकान उद्घाटन हेतु शुभ मुहूर्त',
      en: 'Store opening & corporate launch',
    },
  },
  {
    id: 'housewarming',
    name: { gu: 'ગૃહ પ્રવેશ', hi: 'गृह प्रवेश', en: 'Griha Pravesh' },
    icon: 'Key',
    goodDays: [1, 3, 4, 5],
    desc: {
      gu: 'નવા મકાનમાં વાસ્તુ અને શાંતિપૂર્વક ગૃહ પ્રવેશ',
      hi: 'वास्तु पूजन व नए घर में प्रवेश',
      en: 'Vastu puja & housewarming ritual',
    },
  },
  {
    id: 'medical',
    name: { gu: 'તબીબી / ઓપરેશન', hi: 'चिकित्सा व शल्यक्रिया', en: 'Medical Treatment' },
    icon: 'Activity',
    goodDays: [0, 2, 4],
    desc: {
      gu: 'શલ્યક્રિયા અને ઔષધ સેવન પ્રારંભ માટે ધન્વંતરિ મુહૂર્ત',
      hi: 'स्वास्थ्य लाभ व ऑपरेशन हेतु',
      en: 'Surgery & therapy initiation',
    },
  },
];

/**
 * Evaluate suitability score (0 to 100) for a given date & event type
 */
export function evaluateEventMuhurta(dateObj, eventTypeId, birthMoonSignIndex = 0) {
  const dayOfWeek = dateObj.getDay();
  const eventDef = EVENT_TYPES.find((e) => e.id === eventTypeId) || EVENT_TYPES[0];

  let score = 70; // Baseline neutral score

  // 1. Weekday Suitability Check (+15 / -10)
  if (eventDef.goodDays.includes(dayOfWeek)) {
    score += 15;
  } else if (dayOfWeek === 2 || dayOfWeek === 6) {
    // Tuesday / Saturday caution for certain events
    if (eventTypeId !== 'property' && eventTypeId !== 'medical') {
      score -= 15;
    }
  }

  // 2. Day of Month Modifier
  const dayNum = dateObj.getDate();
  if ([4, 9, 14, 19, 24, 29].includes(dayNum)) {
    score -= 10; // Rikta tithi avoidance
  } else if ([2, 3, 5, 7, 10, 11, 13].includes(dayNum)) {
    score += 10; // Auspicious tithi bonus
  }

  score = Math.min(100, Math.max(10, score));

  let status = 'favorable';
  if (score >= 80) status = 'highly_auspicious';
  else if (score < 50) status = 'caution';

  return {
    dateObj,
    dateString: dateObj.toISOString().split('T')[0],
    score,
    status,
    dayOfWeek,
  };
}

/**
 * Generate 30-Day Event Muhurta Calendar Ratings
 */
export function generateEventMuhurtaCalendar(startDateObj = new Date(), eventTypeId = 'vehicle') {
  const results = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date(startDateObj);
    d.setDate(d.getDate() + i);
    const evalData = evaluateEventMuhurta(d, eventTypeId);
    results.push(evalData);
  }
  return results;
}
