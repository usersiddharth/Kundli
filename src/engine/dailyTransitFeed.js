// Daily Personal Transit Feed Engine

export function generateDailyTransitFeed(kundliData, todayDate = new Date()) {
  return [
    {
      category: 'career',
      title: {
        gu: '૧૦મા ભાવમાં ચંદ્ર ગોચર: વ્યાપારી લાભ',
        hi: 'दशम भाव चंद्र गोचर: व्यापारिक लाभ',
        en: 'Moon in 10th House: High Work Output',
      },
      score: 85,
      advice: {
        gu: 'આજે સભા અને નવી ડીલ સાઇન કરવા માટે ઉત્તમ દિવસ.',
        hi: 'मीटिंग्स हेतु उत्तम दिन।',
        en: 'Ideal day for important meetings & deals.',
      },
    },
    {
      category: 'finance',
      title: {
        gu: 'ગુરુ દૃષ્ટિ: નાણાકીય સ્થિરતા',
        hi: 'गुरु दृष्टि: वित्तीय लाभ',
        en: 'Jupiter Aspect: Financial Stability',
      },
      score: 80,
      advice: {
        gu: 'રોકાણ અને જૂના નાણા પરત મળવાની શક્યતા.',
        hi: 'निवेश हेतु शुभ।',
        en: 'Good window for investments.',
      },
    },
    {
      category: 'health',
      title: {
        gu: 'સૂર્ય બળ: ઊર્જાવાન દિવસ',
        hi: 'सूर्य बल: ऊर्जावान दिन',
        en: 'Sun Strength: High Vitality',
      },
      score: 90,
      advice: {
        gu: 'શારીરિક સ્ફૂર્તિ અને સ્વાસ્થ્ય ઉત્તમ રહેશે.',
        hi: 'उत्तम स्वास्थ्य।',
        en: 'High energy & vitality.',
      },
    },
  ];
}
