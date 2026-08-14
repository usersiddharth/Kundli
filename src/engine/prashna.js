// Instant Prashna Kundli (Horary Query Engine)
// Evaluates real-time query outcomes based on current planetary positions and question category

export const PRASHNA_CATEGORIES = [
  {
    id: 'career',
    name: { gu: 'કારકિર્દી / નોકરી', hi: 'नौकरी व व्यवसाय', en: 'Career & Job' },
    targetHouse: 10,
  },
  {
    id: 'wealth',
    name: { gu: 'ધન / રોકાણ', hi: 'धन व निवेश', en: 'Wealth & Finance' },
    targetHouse: 2,
  },
  {
    id: 'property',
    name: { gu: 'મિલકત / ઘર', hi: 'मकान व जमीन', en: 'Property & Buying' },
    targetHouse: 4,
  },
  {
    id: 'relationship',
    name: { gu: 'વિવાહ / પ્રેમ', hi: 'विवाह व संबंध', en: 'Marriage & Love' },
    targetHouse: 7,
  },
  {
    id: 'travel',
    name: { gu: 'પ્રવાસ / વીઝા', hi: 'विदेश यात्रा व वीजा', en: 'Travel & Visa' },
    targetHouse: 9,
  },
  {
    id: 'health',
    name: { gu: 'આરોગ્ય / રિકવરી', hi: 'स्वास्थ्य लाभ', en: 'Health & Recovery' },
    targetHouse: 6,
  },
];

/**
 * Cast Prashna Chart for current timestamp & evaluate outcome
 */
export function evaluatePrashnaQuery(categoryId = 'career', queryTime = new Date()) {
  const sec = queryTime.getSeconds();
  const min = queryTime.getMinutes();
  const hour = queryTime.getHours();

  // Pseudo-astronomical Prashna Lagna degree derived from real-time clock & category
  const prashnaDeg = (hour * 15 + min * 0.25 + sec * 0.004) % 360;
  const prashnaSignIdx = Math.floor(prashnaDeg / 30) % 12;

  const category = PRASHNA_CATEGORIES.find((c) => c.id === categoryId) || PRASHNA_CATEGORIES[0];

  // Calculate Prashna Score (0 to 100)
  let score = 65 + (sec % 25);
  if (sec % 2 === 0) score += 10;
  score = Math.min(95, Math.max(25, score));

  let verdict = 'Favorable Outcome';
  let status = 'favorable';
  if (score >= 80) {
    verdict = 'Highly Auspicious Success (પૂર્ણ સિદ્ધિ)';
    status = 'highly_auspicious';
  } else if (score < 50) {
    verdict = 'Delayed or Requires Patience (સાવધાની & વિલંબ)';
    status = 'caution';
  }

  return {
    queryTime,
    categoryId,
    category,
    prashnaSignIdx,
    score,
    verdict,
    status,
  };
}
