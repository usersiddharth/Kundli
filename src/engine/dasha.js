// Comprehensive Vedic Vimshottari 5-Tier Dasha Engine
// Levels: Mahadasha (L1) -> Antardasha (L2) -> Pratyantardasha (L3) -> Sookshma Dasha (L4) -> Prana Dasha (L5)

export const DASHA_LORDS = [
  { lord: 'Ketu', years: 7, planetGu: 'કેતુ', planetHi: 'केतु' },
  { lord: 'Venus', years: 20, planetGu: 'શુક્ર', planetHi: 'शुक्र' },
  { lord: 'Sun', years: 6, planetGu: 'સૂર્ય', planetHi: 'सूर्य' },
  { lord: 'Moon', years: 10, planetGu: 'ચંદ્ર', planetHi: 'चन्द्र' },
  { lord: 'Mars', years: 7, planetGu: 'મંગળ', planetHi: 'मंगल' },
  { lord: 'Rahu', years: 18, planetGu: 'રાહુ', planetHi: 'राहु' },
  { lord: 'Jupiter', years: 16, planetGu: 'ગુરુ', planetHi: 'बृहस्पति' },
  { lord: 'Saturn', years: 19, planetGu: 'શનિ', planetHi: 'शनि' },
  { lord: 'Mercury', years: 17, planetGu: 'બુધ', planetHi: 'बुध' },
];

const TOTAL_CYCLE_YEARS = 120;

// Format date to dd.MM.yyyy
export function formatDate(dateObj) {
  const d = new Date(dateObj);
  const pad = (n) => String(n).padStart(2, '0');
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

// Format timestamp to localized readable string (dd.MM.yyyy hh:mm AM/PM)
export function formatDateTime(dateObj) {
  const d = new Date(dateObj);
  const pad = (n) => String(n).padStart(2, '0');
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  let hours = d.getHours();
  const mins = pad(d.getMinutes());
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${day}.${month}.${year} ${pad(hours)}:${mins} ${ampm}`;
}

export function calculateVimshottariDasha(kundliData, birthDate) {
  const moonLon = kundliData.planets.Moon.lon;
  const nakDeg = 360 / 27; // 13.3333°
  const nakIndex = Math.floor(moonLon / nakDeg);
  const remDeg = moonLon % nakDeg;
  const fractionPassed = remDeg / nakDeg;

  // First Mahadasha lord is the Nakshatra Lord
  const firstLordIndex = nakIndex % 9;
  const firstLordObj = DASHA_LORDS[firstLordIndex];

  // Balance of first Mahadasha at birth
  const remainingYearsInFirst = firstLordObj.years * (1 - fractionPassed);

  let runnerDate = new Date(birthDate.getTime());
  let dashaTimeline = [];

  // 1. Generate 9 Mahadashas (120 years cycle)
  for (let i = 0; i < 9; i++) {
    let mLordIdx = (firstLordIndex + i) % 9;
    let mLordData = DASHA_LORDS[mLordIdx];
    let durationYears = i === 0 ? remainingYearsInFirst : mLordData.years;

    let mStartDate = new Date(runnerDate);
    let mEndMs = runnerDate.getTime() + durationYears * 365.25 * 24 * 3600 * 1000;
    let mEndDate = new Date(mEndMs);

    // 2. Calculate 9 Antardashas (Bhuktis)
    let antardashas = [];
    let aRunner = new Date(mStartDate);

    for (let j = 0; j < 9; j++) {
      let aLordIdx = (mLordIdx + j) % 9;
      let aLordData = DASHA_LORDS[aLordIdx];

      let aRatio = (mLordData.years * aLordData.years) / TOTAL_CYCLE_YEARS;
      if (i === 0) {
        aRatio *= durationYears / mLordData.years;
      }

      let aStartDate = new Date(aRunner);
      let aEndMs = aRunner.getTime() + aRatio * 365.25 * 24 * 3600 * 1000;
      let aEndDate = new Date(aEndMs);

      // 3. Calculate 9 Pratyantardashas
      let pratyantardashas = [];
      let pdRunner = new Date(aStartDate);

      for (let k = 0; k < 9; k++) {
        let pdLordIdx = (aLordIdx + k) % 9;
        let pdLordData = DASHA_LORDS[pdLordIdx];

        let pdFraction = pdLordData.years / TOTAL_CYCLE_YEARS;
        let pdDurationMs = (aEndMs - aStartDate.getTime()) * pdFraction;

        let pdStartDate = new Date(pdRunner);
        let pdEndMs = pdRunner.getTime() + pdDurationMs;
        let pdEndDate = new Date(pdEndMs);

        pratyantardashas.push({
          lord: pdLordData.lord,
          years: (aRatio * pdFraction).toFixed(3),
          startDate: formatDate(pdStartDate),
          endDate: formatDate(pdEndDate),
          isoStartDate: pdStartDate.toISOString().split('T')[0],
          isoEndDate: pdEndDate.toISOString().split('T')[0],
          startMs: pdStartDate.getTime(),
          endMs: pdEndMs,
        });

        pdRunner = pdEndDate;
      }

      antardashas.push({
        lord: aLordData.lord,
        years: aRatio.toFixed(2),
        startDate: formatDate(aStartDate),
        endDate: formatDate(aEndDate),
        isoStartDate: aStartDate.toISOString().split('T')[0],
        isoEndDate: aEndDate.toISOString().split('T')[0],
        startMs: aStartDate.getTime(),
        endMs: aEndMs,
        pratyantardashas,
      });

      aRunner = aEndDate;
    }

    dashaTimeline.push({
      lord: mLordData.lord,
      years: durationYears.toFixed(2),
      startDate: formatDate(mStartDate),
      endDate: formatDate(mEndDate),
      isoStartDate: mStartDate.toISOString().split('T')[0],
      isoEndDate: mEndDate.toISOString().split('T')[0],
      startMs: mStartDate.getTime(),
      endMs: mEndMs,
      antardashas,
    });

    runnerDate = mEndDate;
  }

  return dashaTimeline;
}

// Calculate Sookshma Dashas (Level 4: ~6.5 hours to 33 days)
export function calculateSookshmaDasha(pdStartMs, pdEndMs, pdLordName) {
  let startLordIdx = DASHA_LORDS.findIndex((d) => d.lord === pdLordName);
  if (startLordIdx === -1) startLordIdx = 0;

  const totalPdMs = pdEndMs - pdStartMs;
  let runner = pdStartMs;
  const sookshmaList = [];

  for (let i = 0; i < 9; i++) {
    let sdLordIdx = (startLordIdx + i) % 9;
    let sdLordData = DASHA_LORDS[sdLordIdx];
    let sdSpanMs = totalPdMs * (sdLordData.years / TOTAL_CYCLE_YEARS);

    let start = new Date(runner);
    let end = new Date(runner + sdSpanMs);

    sookshmaList.push({
      lord: sdLordData.lord,
      durationDays: (sdSpanMs / (24 * 3600 * 1000)).toFixed(2),
      durationHours: (sdSpanMs / (3600 * 1000)).toFixed(1),
      startDateFormatted: formatDateTime(start),
      endDateFormatted: formatDateTime(end),
      startMs: runner,
      endMs: runner + sdSpanMs,
    });

    runner += sdSpanMs;
  }

  return sookshmaList;
}

// Calculate Prana Dashas (Level 5: ~20 minutes to ~6.5 hours)
export function calculatePranaDasha(sdStartMs, sdEndMs, sdLordName) {
  let startLordIdx = DASHA_LORDS.findIndex((d) => d.lord === sdLordName);
  if (startLordIdx === -1) startLordIdx = 0;

  const totalSdMs = sdEndMs - sdStartMs;
  let runner = sdStartMs;
  const pranaList = [];

  for (let i = 0; i < 9; i++) {
    let prLordIdx = (startLordIdx + i) % 9;
    let prLordData = DASHA_LORDS[prLordIdx];
    let prSpanMs = totalSdMs * (prLordData.years / TOTAL_CYCLE_YEARS);

    let start = new Date(runner);
    let end = new Date(runner + prSpanMs);

    pranaList.push({
      lord: prLordData.lord,
      durationHours: (prSpanMs / (3600 * 1000)).toFixed(2),
      durationMinutes: Math.round(prSpanMs / (60 * 1000)),
      startDateFormatted: formatDateTime(start),
      endDateFormatted: formatDateTime(end),
      startMs: runner,
      endMs: runner + prSpanMs,
    });

    runner += prSpanMs;
  }

  return pranaList;
}

// Real-Time Active Micro Dasha Locator (5-Tier Resolution for current moment)
export function calculateCurrentMicroDasha(kundliData, birthDate, targetDate = new Date()) {
  const targetMs = targetDate.getTime();
  const fullTimeline = calculateVimshottariDasha(kundliData, birthDate);

  // 1. Find Active Mahadasha
  const activeM =
    fullTimeline.find((m) => targetMs >= m.startMs && targetMs <= m.endMs) || fullTimeline[0];
  if (!activeM) return null;

  // 2. Find Active Antardasha
  const activeA =
    activeM.antardashas.find((a) => targetMs >= a.startMs && targetMs <= a.endMs) ||
    activeM.antardashas[0];

  // 3. Find Active Pratyantardasha
  const activePD =
    activeA.pratyantardashas.find((pd) => targetMs >= pd.startMs && targetMs <= pd.endMs) ||
    activeA.pratyantardashas[0];

  // 4. Find Active Sookshma Dasha (Level 4)
  const sookshmaList = calculateSookshmaDasha(activePD.startMs, activePD.endMs, activePD.lord);
  const activeSD =
    sookshmaList.find((sd) => targetMs >= sd.startMs && targetMs <= sd.endMs) || sookshmaList[0];

  // 5. Find Active Prana Dasha (Level 5)
  const pranaList = calculatePranaDasha(activeSD.startMs, activeSD.endMs, activeSD.lord);
  const activePrD =
    pranaList.find((pr) => targetMs >= pr.startMs && targetMs <= pr.endMs) || pranaList[0];

  // Progress Calculations
  const calcProgress = (startMs, endMs) => {
    const total = endMs - startMs;
    const elapsed = targetMs - startMs;
    return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
  };

  return {
    targetDateTimeFormatted: formatDateTime(targetDate),
    mahadasha: {
      lord: activeM.lord,
      startDate: activeM.startDate,
      endDate: activeM.endDate,
      years: activeM.years,
      progress: calcProgress(activeM.startMs, activeM.endMs),
    },
    antardasha: {
      lord: activeA.lord,
      startDate: activeA.startDate,
      endDate: activeA.endDate,
      years: activeA.years,
      progress: calcProgress(activeA.startMs, activeA.endMs),
    },
    pratyantardasha: {
      lord: activePD.lord,
      startDate: activePD.startDate,
      endDate: activePD.endDate,
      progress: calcProgress(activePD.startMs, activePD.endMs),
    },
    sookshmaDasha: {
      lord: activeSD.lord,
      startDateFormatted: activeSD.startDateFormatted,
      endDateFormatted: activeSD.endDateFormatted,
      durationDays: activeSD.durationDays,
      durationHours: activeSD.durationHours,
      progress: calcProgress(activeSD.startMs, activeSD.endMs),
      allSlots: sookshmaList,
    },
    pranaDasha: {
      lord: activePrD.lord,
      startDateFormatted: activePrD.startDateFormatted,
      endDateFormatted: activePrD.endDateFormatted,
      durationMinutes: activePrD.durationMinutes,
      progress: calcProgress(activePrD.startMs, activePrD.endMs),
      allSlots: pranaList,
    },
  };
}
