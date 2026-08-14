import React, { useState, useMemo } from 'react';
import {
  ZODIAC_SIGNS_DATA,
  calculateDailyRashifal,
  calculateWeeklyRashifal,
  calculateMonthlyRashifal,
  calculateYearlyRashifal,
} from '../engine/rashifal.js';
import {
  Sparkles,
  Sun,
  Moon,
  Calendar,
  Clock,
  Compass,
  Briefcase,
  Coins,
  Heart,
  Activity,
  ShieldCheck,
  Printer,
  RotateCcw,
  Search,
  X,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  Gem,
  Flame,
  Globe,
} from 'lucide-react';

export default function RashifalView({ kundliData, t, lang = 'gu' }) {
  // Determine native's Moon sign index if Kundli data is available
  const nativeMoonSignIndex = useMemo(() => {
    if (kundliData?.panchang?.moonSign) {
      const idx = ZODIAC_SIGNS_DATA.findIndex(
        (z) => z.id.toLowerCase() === kundliData.panchang.moonSign.toLowerCase()
      );
      return idx >= 0 ? idx : 0;
    }
    return 0; // Default to Aries
  }, [kundliData]);

  const [selectedSignIndex, setSelectedSignIndex] = useState(nativeMoonSignIndex);
  const [period, setPeriod] = useState('daily'); // 'daily' | 'weekly' | 'monthly' | 'yearly'
  const [selectedYear, setSelectedYear] = useState(2026);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedSign = ZODIAC_SIGNS_DATA[selectedSignIndex];

  // Calculated Forecasts
  const dailyData = useMemo(
    () => calculateDailyRashifal(selectedSignIndex, new Date()),
    [selectedSignIndex]
  );
  const weeklyData = useMemo(
    () => calculateWeeklyRashifal(selectedSignIndex, new Date()),
    [selectedSignIndex]
  );
  const monthlyData = useMemo(
    () => calculateMonthlyRashifal(selectedSignIndex),
    [selectedSignIndex]
  );
  const yearlyData = useMemo(
    () => calculateYearlyRashifal(selectedSignIndex, selectedYear),
    [selectedSignIndex, selectedYear]
  );

  const handleResetToMySign = () => {
    setSelectedSignIndex(nativeMoonSignIndex);
    setPeriod('daily');
    setSearchQuery('');
  };

  const handlePrint = () => {
    window.print();
  };

  const isMySign = kundliData && selectedSignIndex === nativeMoonSignIndex;

  return (
    <div className="rounded-xl glass-panel p-3 sm:p-6 shadow-sm space-y-5 sm:space-y-6 print:border-none print:p-0 print:bg-white">
      {/* Printable Header (Visible Only in Print) */}
      <div className="hidden print:block text-center border-b-2 border-[#8c7456] pb-3 mb-4">
        <span className="font-serif text-xs font-bold tracking-widest text-[#8c7456]">
          || ૐ શ્રી ગણેશાય નમઃ ||
        </span>
        <h1 className="font-serif text-2xl font-bold text-[#2c2825] mt-1">
          {selectedSign.names[lang] || selectedSign.names.gu} - સંપૂર્ણ રાશિ ભવિષ્ય (Vedic Horoscope
          Dossier)
        </h1>
        <p className="text-xs text-[#544d44] mt-0.5">
          દૈનિક, સાપ્તાહિક, માસિક અને વાર્ષિક જ્યોતિષ ફળાદેશ
        </p>
      </div>

      {/* Screen Header & Main Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e6dfd3]/80 pb-4 print:hidden">
        <div>
          <h2 className="text-lg sm:text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#b85d19]" />
            <span>રાશિ ભવિષ્ય (Vedic Rashifal)</span>
          </h2>
          <p className="text-xs text-[#736a60]">
            ૧૨ રાશિઓનું દૈનિક, સાપ્તાહિક, માસિક અને વાર્ષિક શાસ્ત્રીય ભવિષ્યફળ
          </p>
        </div>

        <div className="flex items-center gap-2">
          {kundliData && (
            <button
              onClick={handleResetToMySign}
              title="મારી જન્મ રાશિ પર જાઓ (Jump to My Sign)"
              className="flex items-center gap-1.5 rounded-lg glass-badge-warning px-3 py-1.5 text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              <Moon className="h-3.5 w-3.5" />
              <span>મારી રાશિ (My Sign)</span>
            </button>
          )}

          <button
            onClick={handleResetToMySign}
            title="રીસેટ કરો (Reset)"
            className="flex items-center gap-1.5 rounded-lg glass-card px-3 py-1.5 text-xs font-medium text-[#736a60] hover:text-[#802020] hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition shadow-2xs cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>સાફ કરો (Clear)</span>
          </button>

          <button
            onClick={handlePrint}
            title="Save as PDF / Print"
            className="flex items-center gap-1.5 rounded-lg glass-card px-3.5 py-1.5 text-xs font-medium text-[#544d44] hover:bg-white/90 hover:text-[#2c2825] transition shadow-xs cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-[#b85d19]" />
            <span className="hidden sm:inline">Save as PDF</span>
          </button>
        </div>
      </div>

      {/* 12 Zodiac Signs Selector Strip (Scrollable & Responsive) */}
      <div className="space-y-2 print:hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-serif font-bold text-[#2c2825] flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5 text-[#b85d19]" />
            રાશિ પસંદ કરો (Select Zodiac Sign):
          </span>

          <span className="text-[11px] font-mono text-[#736a60]">
            સ્વામી: {selectedSign.lord[lang] || selectedSign.lord.gu} • તત્વ:{' '}
            {selectedSign.element[lang] || selectedSign.element.gu}
          </span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
          {ZODIAC_SIGNS_DATA.map((sign) => {
            const isSelected = selectedSignIndex === sign.index;
            const isNative = kundliData && sign.index === nativeMoonSignIndex;

            return (
              <button
                key={sign.id}
                onClick={() => setSelectedSignIndex(sign.index)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border transition cursor-pointer relative ${
                  isSelected
                    ? 'border-[#b85d19] bg-[#b85d19] text-[#fffdfa] shadow-sm scale-[1.03]'
                    : isNative
                      ? 'border-amber-400/60 glass-panel-accent text-[#2c2825] hover:border-[#b85d19]'
                      : 'border-[#e6dfd3]/80 glass-card text-[#544d44] hover:bg-white/90'
                }`}
              >
                {isNative && (
                  <span className="absolute -top-1.5 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#b85d19] text-[9px] text-white shadow-2xs font-bold">
                    ☽
                  </span>
                )}

                <span className="text-base font-serif leading-none">{sign.symbol}</span>
                <span className="text-xs font-serif font-bold mt-1 leading-tight">
                  {sign.names[lang] || sign.names.gu}
                </span>
                <span
                  className={`text-[9px] font-mono leading-none mt-0.5 ${isSelected ? 'text-amber-100' : 'text-[#736a60]'}`}
                >
                  {sign.id}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Period Selection Bar (Daily, Weekly, Monthly, Yearly) */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl glass-panel-accent p-2.5 sm:p-3 print:hidden">
        <div className="flex items-center gap-1.5">
          {[
            { id: 'daily', label: { gu: 'દૈનિક (Daily)', hi: 'दैनिक', en: 'Daily' }, icon: Clock },
            {
              id: 'weekly',
              label: { gu: 'સાપ્તાહિક (Weekly)', hi: 'साप्ताहिक', en: 'Weekly' },
              icon: Calendar,
            },
            {
              id: 'monthly',
              label: { gu: 'માસિક (Monthly)', hi: 'मासिक', en: 'Monthly' },
              icon: TrendingUp,
            },
            {
              id: 'yearly',
              label: { gu: 'વાર્ષિક (Yearly)', hi: 'वार्षिक', en: 'Yearly' },
              icon: Award,
            },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = period === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPeriod(item.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                  isSelected
                    ? 'glass-button-dark text-[#f4ebd9] shadow-xs'
                    : 'glass-card text-[#544d44] hover:bg-white/80'
                }`}
              >
                <Icon className="h-3.5 w-3.5 text-[#e6a86c]" />
                <span>{item.label[lang] || item.label.gu}</span>
              </button>
            );
          })}
        </div>

        {/* Year Selector for Yearly Period */}
        {period === 'yearly' && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#736a60]">વર્ષ (Year):</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="rounded-lg glass-input px-2.5 py-1 text-xs font-mono font-bold text-[#2c2825] focus:outline-none"
            >
              {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* =========================================================================
          VIEW 1: DAILY RASHIFAL
          ========================================================================= */}
      {period === 'daily' && (
        <div className="space-y-5 animate-fade-in-up">
          {/* Daily Hero Banner */}
          <div className="rounded-2xl border border-[#b85d19]/30 bg-gradient-to-br from-[#faf4e8] to-[#fffdfa] dark:from-[#201914] dark:to-[#171310] p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl glass-button-dark font-serif text-2xl font-bold text-[#e6a86c] shadow-md">
                {selectedSign.symbol}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2c2825]">
                    {selectedSign.names[lang] || selectedSign.names.gu} ({selectedSign.id})
                  </h3>
                  {isMySign && (
                    <span className="rounded-full glass-badge-warning px-2.5 py-0.5 text-[10px] font-bold">
                      તમારી જન્મ રાશિ (Your Moon Sign)
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#736a60] mt-0.5">
                  તારીખ: {dailyData.targetDate} • રાશિ સ્વામી:{' '}
                  {selectedSign.lord[lang] || selectedSign.lord.gu}
                </p>
              </div>
            </div>

            {/* Daily Energy Meter */}
            <div className="flex items-center gap-3 rounded-xl glass-card px-4 py-2.5 shadow-2xs">
              <Zap className="h-5 w-5 text-amber-500 animate-pulse-glow" />
              <div>
                <span className="text-[10px] text-[#736a60] font-semibold block">
                  દૈનિક કોસ્મિક ઊર્જા (Score)
                </span>
                <strong className="font-mono text-lg text-[#b85d19]">
                  {dailyData.overallScore}%
                </strong>
              </div>
            </div>
          </div>

          {/* 4 Core Dimensions: Career, Finance, Love, Health */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Career */}
            <div className="rounded-xl glass-panel p-4 shadow-2xs space-y-2 border border-[#e6dfd3]/80">
              <div className="flex items-center justify-between border-b border-[#e6dfd3]/60 pb-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-[#b85d19]" />
                  <span className="font-serif text-sm font-bold text-[#2c2825]">
                    કારકિર્દી & વ્યવસાય (Career & Business)
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[#b85d19]">
                  {dailyData.predictions.career.score}%
                </span>
              </div>
              <p className="text-xs text-[#2c2825] leading-relaxed">
                {dailyData.predictions.career[lang] || dailyData.predictions.career.gu}
              </p>
            </div>

            {/* Finance */}
            <div className="rounded-xl glass-panel p-4 shadow-2xs space-y-2 border border-[#e6dfd3]/80">
              <div className="flex items-center justify-between border-b border-[#e6dfd3]/60 pb-2">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-serif text-sm font-bold text-[#2c2825]">
                    નાણાકીય સ્થિતિ & રોકાણ (Finance)
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  {dailyData.predictions.finance.score}%
                </span>
              </div>
              <p className="text-xs text-[#2c2825] leading-relaxed">
                {dailyData.predictions.finance[lang] || dailyData.predictions.finance.gu}
              </p>
            </div>

            {/* Love & Family */}
            <div className="rounded-xl glass-panel p-4 shadow-2xs space-y-2 border border-[#e6dfd3]/80">
              <div className="flex items-center justify-between border-b border-[#e6dfd3]/60 pb-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                  <span className="font-serif text-sm font-bold text-[#2c2825]">
                    પ્રેમ & પારિવારિક સુખ (Love & Family)
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-rose-700 dark:text-rose-400">
                  {dailyData.predictions.love.score}%
                </span>
              </div>
              <p className="text-xs text-[#2c2825] leading-relaxed">
                {dailyData.predictions.love[lang] || dailyData.predictions.love.gu}
              </p>
            </div>

            {/* Health */}
            <div className="rounded-xl glass-panel p-4 shadow-2xs space-y-2 border border-[#e6dfd3]/80">
              <div className="flex items-center justify-between border-b border-[#e6dfd3]/60 pb-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-serif text-sm font-bold text-[#2c2825]">
                    આરોગ્ય & સ્ફૂર્તિ (Health & Wellness)
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-blue-700 dark:text-blue-400">
                  {dailyData.predictions.health.score}%
                </span>
              </div>
              <p className="text-xs text-[#2c2825] leading-relaxed">
                {dailyData.predictions.health[lang] || dailyData.predictions.health.gu}
              </p>
            </div>
          </div>

          {/* Lucky Factors Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="rounded-xl glass-card p-3 shadow-2xs">
              <span className="text-[10px] text-[#736a60] block">શુભ અંક (Lucky Number)</span>
              <strong className="font-mono text-base text-[#b85d19]">
                {dailyData.luckyFactor.number}
              </strong>
            </div>

            <div className="rounded-xl glass-card p-3 shadow-2xs">
              <span className="text-[10px] text-[#736a60] block">શુભ રંગ (Lucky Color)</span>
              <strong className="text-xs font-bold text-[#2c2825]">
                {dailyData.luckyFactor.color[lang] || dailyData.luckyFactor.color.gu}
              </strong>
            </div>

            <div className="rounded-xl glass-card p-3 shadow-2xs">
              <span className="text-[10px] text-[#736a60] block">શુભ સમય (Auspicious Time)</span>
              <strong className="font-mono text-[11px] text-[#2c2825]">
                {dailyData.luckyFactor.time}
              </strong>
            </div>

            <div className="rounded-xl glass-card p-3 shadow-2xs">
              <span className="text-[10px] text-[#736a60] block">શુભ દિશા (Lucky Direction)</span>
              <strong className="text-xs font-bold text-[#2c2825]">
                {dailyData.luckyFactor.direction}
              </strong>
            </div>
          </div>

          {/* Daily Remedy Box */}
          <div className="rounded-xl border border-amber-500/30 bg-[#fffaf0] dark:bg-[#251d16] p-4 flex items-start gap-3 shadow-xs">
            <Sparkles className="h-5 w-5 text-[#b85d19] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-serif text-xs font-bold text-[#b85d19]">
                આજનો વિશેષ જ્યોતિષીય ઉપાય & મંત્ર (Daily Vedic Remedy):
              </h4>
              <p className="text-xs text-[#2c2825] leading-relaxed">
                {dailyData.dailyRemedy[lang] || dailyData.dailyRemedy.gu}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: WEEKLY RASHIFAL
          ========================================================================= */}
      {period === 'weekly' && (
        <div className="space-y-5 animate-fade-in-up">
          <div className="rounded-xl glass-panel p-4 sm:p-6 shadow-sm border border-[#e6dfd3]/80 space-y-4">
            <div className="border-b border-[#e6dfd3]/60 pb-3 flex items-center justify-between">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2c2825]">
                {weeklyData.title[lang] || weeklyData.title.gu}
              </h3>
              <span className="rounded-lg glass-badge-warning px-2.5 py-1 text-xs font-mono font-bold">
                ૭ દિવસનું પૂર્વાનુમાન
              </span>
            </div>

            <p className="text-xs text-[#2c2825] leading-relaxed">
              {weeklyData.overview[lang] || weeklyData.overview.gu}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="rounded-lg glass-card p-3 text-center">
                <span className="text-[10px] text-[#736a60] block">કારકિર્દી સ્કોર</span>
                <strong className="font-mono text-sm text-[#b85d19]">
                  {weeklyData.weeklyScores.career}%
                </strong>
              </div>
              <div className="rounded-lg glass-card p-3 text-center">
                <span className="text-[10px] text-[#736a60] block">નાણાકીય લાભ</span>
                <strong className="font-mono text-sm text-emerald-700 dark:text-emerald-400">
                  {weeklyData.weeklyScores.finance}%
                </strong>
              </div>
              <div className="rounded-lg glass-card p-3 text-center">
                <span className="text-[10px] text-[#736a60] block">પ્રેમ સંબંધ</span>
                <strong className="font-mono text-sm text-rose-700 dark:text-rose-400">
                  {weeklyData.weeklyScores.romance}%
                </strong>
              </div>
              <div className="rounded-lg glass-card p-3 text-center">
                <span className="text-[10px] text-[#736a60] block">આરોગ્ય</span>
                <strong className="font-mono text-sm text-blue-700 dark:text-blue-400">
                  {weeklyData.weeklyScores.wellness}%
                </strong>
              </div>
            </div>

            <div className="rounded-xl glass-panel-accent p-3.5 flex items-center justify-between text-xs">
              <span className="text-[#736a60]">શુભ વાર (Auspicious Days):</span>
              <strong className="font-bold text-[#2c2825]">
                {weeklyData.auspiciousDays[lang] || weeklyData.auspiciousDays.gu}
              </strong>
            </div>

            <div className="rounded-xl border border-amber-500/20 bg-[#faf5ec] dark:bg-[#201c18] p-3.5 text-xs text-[#7a4e1d] dark:text-[#e0a86c]">
              <strong>સાપ્તાહિક ઉપાય:</strong> {weeklyData.remedy[lang] || weeklyData.remedy.gu}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: MONTHLY RASHIFAL
          ========================================================================= */}
      {period === 'monthly' && (
        <div className="space-y-5 animate-fade-in-up">
          <div className="rounded-xl glass-panel p-4 sm:p-6 shadow-sm border border-[#e6dfd3]/80 space-y-4">
            <div className="border-b border-[#e6dfd3]/60 pb-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2c2825]">
                {monthlyData.title[lang] || monthlyData.title.gu}
              </h3>
              <p className="text-xs text-[#736a60] mt-1">
                {monthlyData.transitHighlights[lang] || monthlyData.transitHighlights.gu}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl glass-card p-3.5 space-y-1">
                <span className="font-serif text-xs font-bold text-[#b85d19] block">
                  વ્યાવસાયિક સ્થિતિ (Career)
                </span>
                <p className="text-xs text-[#2c2825]">
                  {monthlyData.monthlySectors.career[lang] || monthlyData.monthlySectors.career.gu}
                </p>
              </div>

              <div className="rounded-xl glass-card p-3.5 space-y-1">
                <span className="font-serif text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                  નાણાકીય પ્રવાહ (Wealth)
                </span>
                <p className="text-xs text-[#2c2825]">
                  {monthlyData.monthlySectors.finance[lang] ||
                    monthlyData.monthlySectors.finance.gu}
                </p>
              </div>

              <div className="rounded-xl glass-card p-3.5 space-y-1">
                <span className="font-serif text-xs font-bold text-rose-700 dark:text-rose-400 block">
                  પારિવારિક જીવન (Domestic Bliss)
                </span>
                <p className="text-xs text-[#2c2825]">
                  {monthlyData.monthlySectors.family[lang] || monthlyData.monthlySectors.family.gu}
                </p>
              </div>

              <div className="rounded-xl glass-card p-3.5 space-y-1">
                <span className="font-serif text-xs font-bold text-blue-700 dark:text-blue-400 block">
                  આરોગ્ય & આહાર (Wellness)
                </span>
                <p className="text-xs text-[#2c2825]">
                  {monthlyData.monthlySectors.health[lang] || monthlyData.monthlySectors.health.gu}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 4: YEARLY RASHIFAL (2024 - 2030)
          ========================================================================= */}
      {period === 'yearly' && (
        <div className="space-y-5 animate-fade-in-up">
          {/* Yearly Hero Dossier */}
          <div className="rounded-xl glass-panel p-4 sm:p-6 shadow-sm border border-[#e6dfd3]/80 space-y-4">
            <div className="border-b border-[#e6dfd3]/60 pb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2c2825]">
                  {yearlyData.title[lang] || yearlyData.title.gu}
                </h3>
                <p className="text-xs text-[#736a60] mt-0.5">
                  ગુરુ-શનિ ગોચર, સાડાસાતી વિશ્લેષણ અને ૪ ત્રિમાસિક યોજના
                </p>
              </div>

              <span className="rounded-lg glass-badge-warning px-3 py-1 font-mono text-xs font-bold">
                {selectedYear} મહા રાશિફળ
              </span>
            </div>

            {/* Sade Sati Status Panel */}
            <div
              className={`rounded-xl border p-4 space-y-1.5 ${
                yearlyData.sadeSati.isActive
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200'
                  : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span className="font-serif text-xs font-bold">
                  શનિ સાડાસાતી સ્થિતિ (
                  {yearlyData.sadeSati.isActive ? yearlyData.sadeSati.phase : 'સાડાસાતી મુક્ત'}):
                </span>
              </div>
              <p className="text-xs leading-relaxed">
                {yearlyData.sadeSati[lang] || yearlyData.sadeSati.gu}
              </p>
            </div>

            {/* Guru Gochar Annual Blessing */}
            <div className="rounded-xl glass-panel-accent p-4 space-y-1">
              <span className="font-serif text-xs font-bold text-[#b85d19] block">
                દેવગુરુ બૃહસ્પતિ વાર્ષિક આશીર્વાદ (Jupiter Blessing):
              </span>
              <p className="text-xs text-[#2c2825] leading-relaxed">
                {yearlyData.guruGochar[lang] || yearlyData.guruGochar.gu}
              </p>
            </div>

            {/* 4 Quarters Breakdown (Q1 to Q4) */}
            <div className="space-y-2 pt-2">
              <h4 className="font-serif text-xs font-bold text-[#2c2825]">
                ૪ ત્રિમાસિક તબક્કાવાર ભવિષ્યવાણી (Quarterly Forecast):
              </h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {yearlyData.annualThemes.map((q, idx) => (
                  <div key={idx} className="rounded-xl glass-card p-3.5 space-y-1">
                    <div className="flex items-center justify-between border-b border-[#e6dfd3]/60 pb-1.5">
                      <span className="font-mono text-[11px] font-bold text-[#b85d19]">
                        {q.quarter}
                      </span>
                      <span className="text-[11px] font-serif font-semibold text-[#2c2825]">
                        {q.title[lang] || q.title.gu}
                      </span>
                    </div>
                    <p className="text-xs text-[#2c2825] pt-1">{q.desc[lang] || q.desc.gu}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Annual Vedic Remedies */}
            <div className="rounded-xl border border-amber-500/30 bg-[#fffaf0] dark:bg-[#251d16] p-4 space-y-2">
              <h4 className="font-serif text-xs font-bold text-[#b85d19] flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                વાર્ષિક સિદ્ધ ઉપાય & દાન સંકલ્પ (Annual Remedies):
              </h4>
              <ul className="space-y-1 text-xs text-[#2c2825]">
                {yearlyData.annualRemedies.map((rem, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-[#b85d19]">•</span>
                    <span>{rem[lang] || rem.gu}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
