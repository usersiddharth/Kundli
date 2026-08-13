// Vedic Choghadiya & Muhurat Calculation Engine

export const CHOGHADIYA_TYPES = {
  Amrit: { nature: "Best (Amrit)", status: "auspicious", color: "#285e20", desc: { en: "Highly auspicious for all work and new beginnings.", hi: "सर्वश्रेष्ठ मुहूर्त, सभी शुभ कार्यों हेतु अति उत्तम।", gu: "સર્વશ્રેષ્ઠ મુહૂર્ત, તમામ શુભ કાર્યો માટે અતિ ઉત્તમ." } },
  Shubh: { nature: "Good (Shubh)", status: "auspicious", color: "#285e20", desc: { en: "Auspicious for ceremonies, buying assets, and rituals.", hi: "शुभ कार्यों, खरीदारी एवं धार्मिक अनुष्ठानों हेतु शुभ।", gu: "શુભ કાર્યો, ખરીદી અને ધાર્મિક પ્રસંગો માટે ઉત્તમ." } },
  Labh: { nature: "Gain (Labh)", status: "auspicious", color: "#285e20", desc: { en: "Favorable for business, trade, and financial gains.", hi: "व्यापार, धन लाभ एवं नए उपक्रमों हेतु अत्यंत लाभकारी।", gu: "વેપાર, ધન લાભ અને નવા કામ માટે લાભદાયક." } },
  Chal: { nature: "Neutral (Chal)", status: "neutral", color: "#b85d19", desc: { en: "Good for journeys, traveling, and moving.", hi: "यात्रा, गतिशीलता एवं सामान्य कार्यों हेतु उपयुक्त।", gu: "મુસાફરી, યાત્રા અને સામાન્ય કાર્યો માટે અનુકૂળ." } },
  Udveg: { nature: "Anxiety (Udveg)", status: "inauspicious", color: "#802020", desc: { en: "Inauspicious, brings worries. Avoid critical decisions.", hi: "उद्वेग कारक, मानसिक चिंता। महत्वपूर्ण कार्यों से बचें।", gu: "ઉદ્વેગ કારક, ચિંતા. મહત્વના નિર્ણયો ટાળો." } },
  Kaal: { nature: "Loss (Kaal)", status: "inauspicious", color: "#802020", desc: { en: "Harmful. Strictly avoid new deals or starting travels.", hi: "हानिकारक। नए सौदे व यात्रा आरंभ करने से बचें।", gu: "હાનિકારક. નવા કામ કે મુસાફરી શરૂ કરવી નહિ." } },
  Rog: { nature: "Illness (Rog)", status: "inauspicious", color: "#802020", desc: { en: "Disruptive, illness risk. Avoid auspicious ventures.", hi: "रोग एवं बाधा कारक। शुभ कार्यों का निषेध है।", gu: "રોગ અને અડચણ કારક. શુભ કાર્યો વર્જિત છે." } }
};

// Day sequences starting from Sunday (0) to Saturday (6)
const DAY_SEQUENCES = [
  ["Udveg", "Chal", "Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg"],     // Sun
  ["Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Chal", "Labh", "Amrit"],     // Mon
  ["Rog", "Udveg", "Chal", "Labh", "Amrit", "Kaal", "Shubh", "Rog"],       // Tue
  ["Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Chal", "Labh"],     // Wed
  ["Shubh", "Rog", "Udveg", "Chal", "Labh", "Amrit", "Kaal", "Shubh"],     // Thu
  ["Chal", "Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Chal"],     // Fri
  ["Kaal", "Shubh", "Rog", "Udveg", "Chal", "Labh", "Amrit", "Kaal"]      // Sat
];

// Night sequences starting from Sunday (0) to Saturday (6)
const NIGHT_SEQUENCES = [
  ["Shubh", "Amrit", "Chal", "Rog", "Kaal", "Labh", "Udveg", "Shubh"],     // Sun
  ["Chal", "Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Chal"],     // Mon
  ["Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Chal", "Rog", "Kaal"],     // Tue
  ["Shubh", "Amrit", "Chal", "Rog", "Kaal", "Labh", "Udveg", "Shubh"],     // Wed
  ["Amrit", "Chal", "Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit"],     // Thu
  ["Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Chal", "Rog"],       // Fri
  ["Labh", "Udveg", "Shubh", "Amrit", "Chal", "Rog", "Kaal", "Labh"]      // Sat
];

// Rahu Kaal Timings by weekday (approximate standard slot)
const RAHU_KAAL = [
  "04:30 PM - 06:00 PM", // Sun
  "07:30 AM - 09:00 AM", // Mon
  "03:00 PM - 04:30 PM", // Tue
  "12:00 PM - 01:30 PM", // Wed
  "01:30 PM - 03:00 PM", // Thu
  "10:30 AM - 12:00 PM", // Fri
  "09:00 AM - 10:30 AM"  // Sat
];

// Rahu Kaal 0-indexed day slot mapping (Sun: 8th, Mon: 2nd, Tue: 7th, Wed: 5th, Thu: 6th, Fri: 4th, Sat: 3rd)
const RAHU_KAAL_SLOT_INDEX = [7, 1, 6, 4, 5, 3, 2];

export function calculateChoghadiya(dateObj = new Date()) {
  const dayOfWeek = dateObj.getDay(); // 0: Sun, 1: Mon, ...
  const daySeq = DAY_SEQUENCES[dayOfWeek];
  const nightSeq = NIGHT_SEQUENCES[dayOfWeek];
  const rahuSlotIdx = RAHU_KAAL_SLOT_INDEX[dayOfWeek];

  // Standard 1.5-hour time blocks starting from 6:00 AM
  const daySlots = [
    { start: "06:00 AM", end: "07:30 AM", startHour: 6, endHour: 7.5 },
    { start: "07:30 AM", end: "09:00 AM", startHour: 7.5, endHour: 9 },
    { start: "09:00 AM", end: "10:30 AM", startHour: 9, endHour: 10.5 },
    { start: "10:30 AM", end: "12:00 PM", startHour: 10.5, endHour: 12 },
    { start: "12:00 PM", end: "01:30 PM", startHour: 12, endHour: 13.5 },
    { start: "01:30 PM", end: "03:00 PM", startHour: 13.5, endHour: 15 },
    { start: "03:00 PM", end: "04:30 PM", startHour: 15, endHour: 16.5 },
    { start: "04:30 PM", end: "06:00 PM", startHour: 16.5, endHour: 18 }
  ];

  const nightSlots = [
    { start: "06:00 PM", end: "07:30 PM", startHour: 18, endHour: 19.5 },
    { start: "07:30 PM", end: "09:00 PM", startHour: 19.5, endHour: 21 },
    { start: "09:00 PM", end: "10:30 PM", startHour: 21, endHour: 22.5 },
    { start: "10:30 PM", end: "12:00 AM", startHour: 22.5, endHour: 24 },
    { start: "12:00 AM", end: "01:30 AM", startHour: 0, endHour: 1.5 },
    { start: "01:30 AM", end: "03:00 AM", startHour: 1.5, endHour: 3 },
    { start: "03:00 AM", end: "04:30 AM", startHour: 3, endHour: 4.5 },
    { start: "04:30 AM", end: "06:00 AM", startHour: 4.5, endHour: 6 }
  ];

  const currentHour = dateObj.getHours() + dateObj.getMinutes() / 60;

  const dayChoghadiyas = daySlots.map((slot, i) => {
    const typeKey = daySeq[i];
    const typeInfo = CHOGHADIYA_TYPES[typeKey];
    const isCurrent = currentHour >= slot.startHour && currentHour < slot.endHour;
    const isRahuKaal = i === rahuSlotIdx;
    return {
      slotNumber: i + 1,
      name: typeKey,
      ...slot,
      ...typeInfo,
      isCurrent,
      isRahuKaal
    };
  });

  const nightChoghadiyas = nightSlots.map((slot, i) => {
    const typeKey = nightSeq[i];
    const typeInfo = CHOGHADIYA_TYPES[typeKey];
    let isCurrent = false;
    if (slot.startHour < slot.endHour) {
      isCurrent = currentHour >= slot.startHour && currentHour < slot.endHour;
    } else {
      isCurrent = currentHour >= slot.startHour || currentHour < slot.endHour;
    }
    return {
      slotNumber: i + 1,
      name: typeKey,
      ...slot,
      ...typeInfo,
      isCurrent,
      isRahuKaal: false
    };
  });

  return {
    dayOfWeek,
    rahuKaal: RAHU_KAAL[dayOfWeek],
    rahuKaalSlotNumber: rahuSlotIdx + 1,
    dayChoghadiyas,
    nightChoghadiyas
  };
}
