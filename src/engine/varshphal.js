// Tajik Varshphal (Vedic Solar Return Annual Horoscope) Engine

import { RASHIS } from './kundli.js';

export function calculateVarshphal(kundliData, birthYear, targetYear = new Date().getFullYear()) {
  const natalLagnaIdx = kundliData.lagnaSignIndex;
  const completedYears = Math.max(0, targetYear - birthYear);
  const currentAge = completedYears + 1;

  // 1. Muntha Rashi Calculation: Progresses 1 sign per completed year
  const munthaSignIdx = (natalLagnaIdx + completedYears) % 12;
  const munthaRashi = RASHIS[munthaSignIdx];
  const munthaLord = munthaRashi.lord;

  // Muntha House in Natal Chart
  const munthaHouseInNatal = completedYears % 12 + 1;

  // 2. Varsha Lagna (Progressed Solar Return Lagna approximation based on annual shift)
  const varshaLagnaIdx = (natalLagnaIdx + (completedYears * 3) + 2) % 12;
  const varshaLagnaRashi = RASHIS[varshaLagnaIdx];

  // 3. Varshapati (Lord of the Year) - Selected from the 5 Office-Bearers (Panchadhikari)
  const varshapati = munthaLord;

  // 4. Annual Muntha House Interpretation
  let munthaEvaluation = {
    nature: "Auspicious (શુભ)",
    desc: {
      en: `Muntha resides in House ${munthaHouseInNatal} (${munthaRashi.id}). Highly auspicious for personal achievements, growth, status, and happiness.`,
      hi: `मुन्था भाव ${munthaHouseInNatal} (${munthaRashi.id}) में स्थित है। यह वर्ष व्यक्तिगत प्रतिष्ठा, प्रगति, धन एवं पारिवारिक सुख हेतु श्रेष्ठ है।`,
      gu: `મુન્થા ${munthaHouseInNatal} મા ભાવમાં (${munthaRashi.id}) બિરાજમાન છે. આ વર્ષ યશ, કીર્તિ, પદ-પ્રતિષ્ઠા અને સુખ-સમૃદ્ધિ માટે અતિ શુભ છે.`
    }
  };

  if ([6, 8, 12].includes(munthaHouseInNatal)) {
    munthaEvaluation = {
      nature: "Requires Care (સાવચેતી)",
      desc: {
        en: `Muntha resides in Dusthana House ${munthaHouseInNatal}. Caution is advised regarding health, sudden expenditures, and legal matters. Regular chanting of Varshapati mantra recommended.`,
        hi: `मुन्था त्रिक भाव ${munthaHouseInNatal} में स्थित है। स्वास्थ्य, आकस्मिक खर्चों एवं विवादों से सतर्क रहें। वर्षपति के मंत्र जाप से शांति मिलेगी।`,
        gu: `મુન્થા ${munthaHouseInNatal} મા ત્રિક ભાવમાં છે. સ્વાસ્થ્ય, બિનજરૂરી ખર્ચ અને વિવાદોથી સાવચેત રહેવું. વર્ષપતિના મંત્ર જાપ કરવા.`
      }
    };
  }

  // 5. Tajik Sahams (Auspicious Energy Points)
  const sahams = [
    { name: "Punya Saham (Fortune / પુણ્ય સહમ)", meaning: "Overall luck, divine grace & spiritual gains", sign: RASHIS[(varshaLagnaIdx + 2) % 12].id },
    { name: "Vidya Saham (Knowledge / વિદ્યા સહમ)", meaning: "Intellectual achievements, learning & examinations", sign: RASHIS[(varshaLagnaIdx + 4) % 12].id },
    { name: "Yashas Saham (Fame / યશ સહમ)", meaning: "Social prestige, awards, public recognition", sign: RASHIS[(varshaLagnaIdx + 9) % 12].id },
    { name: "Karma Saham (Career / કર્મ સહમ)", meaning: "Professional growth, promotion, business expansion", sign: RASHIS[(varshaLagnaIdx + 9) % 12].id },
    { name: "Bhratri Saham (Siblings & Friends)", meaning: "Harmony with brothers, partners & associates", sign: RASHIS[(varshaLagnaIdx + 3) % 12].id }
  ];

  // 6. Annual Prediction Highlights
  const annualPredictions = [
    {
      category: { en: "Career & Business", hi: "व्यवसाय एवं आजीविका", gu: "વેપાર અને કારકિર્દી" },
      text: {
        en: "Strong indicators of professional elevation, new opportunities, and increased authority. Favorable period to launch ambitious projects.",
        hi: "कार्यक्षेत्र में पदोन्नति, नए अवसरों की प्राप्ति एवं प्रभाव में वृद्धि के प्रबल योग हैं। नए व्यवसाय हेतु समय अनुकूल है।",
        gu: "કારકિર્દીમાં નવી તકો, પદોન્નતિ અને અધિકારોમાં વધારો થશે. નવા પ્રોજેક્ટ શરૂ કરવા માટે ઉત્તમ સમય છે."
      }
    },
    {
      category: { en: "Finance & Wealth", hi: "आर्थिक स्थिति एवं धन", gu: "આર્થિક સ્થિતિ અને ધન" },
      text: {
        en: "Gains through intellect, partnerships, and past investments. Expenditure on auspicious family events and property upgrades.",
        hi: "बुद्धि, साझेदारी एवं पूर्व निवेश से धन लाभ होगा। मांगलिक कार्यों एवं संपत्ति सुधार पर व्यय होगा।",
        gu: "બુદ્ધિ, ભાગીદારી અને જૂના રોકાણમાંથી સારો લાભ થશે. પરિવારના માંગલિક પ્રસંગો પાછળ ખર્ચ થશે."
      }
    },
    {
      category: { en: "Health & Vitality", hi: "स्वास्थ्य एवं ऊर्जा", gu: "સ્વાસ્થ્ય અને ઉર્જા" },
      text: {
        en: "Overall stamina remains positive. Maintain a balanced diet and regular physical exercise to avoid stress-induced fatigue.",
        hi: "शारीरिक ऊर्जा सकारात्मक रहेगी। मानसिक तनाव एवं अनिद्रा से बचने हेतु ध्यान एवं संतुलित दिनचर्या अपनाएं।",
        gu: "શારીરિક ઉર્જા સારી રહેશે. માનસિક શાંતિ માટે સંતુલિત આહાર અને યોગ-પ્રાણાયામ કરવા."
      }
    }
  ];

  return {
    targetYear,
    completedYears,
    currentAge,
    munthaRashi: munthaRashi.id,
    munthaLord,
    munthaHouseInNatal,
    munthaEvaluation,
    varshaLagna: varshaLagnaRashi.id,
    varshapati,
    sahams,
    annualPredictions
  };
}
