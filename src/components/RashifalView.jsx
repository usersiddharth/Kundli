import React, { useState, useMemo } from 'react';
import { Button, Card, Chip } from '@heroui/react';
import {
  ZODIAC_SIGNS_DATA,
  calculateDailyRashifal,
  calculateWeeklyRashifal,
  calculateMonthlyRashifal,
  calculateYearlyRashifal,
} from '../engine/rashifal.js';
import {
  Sparkles,
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
  TrendingUp,
  Award,
  Zap,
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
  };

  const handlePrint = () => {
    window.print();
  };

  const isMySign = kundliData && selectedSignIndex === nativeMoonSignIndex;

  return (
    <Card className="rounded-2xl glass-panel p-3 sm:p-6 shadow-sm space-y-5 sm:space-y-6 print:border-none print:p-0 print:bg-white border border-[var(--border-gold)]">
      {/* Printable Header (Visible Only in Print) */}
      <div className="hidden print:block text-center border-b-2 border-[#8c7456] pb-3 mb-4">
        <span className="font-serif text-xs font-bold tracking-widest text-[var(--text-gold)]">
          || ૐ શ્રી ગણેશાય નમઃ ||
        </span>
        <h1 className="font-serif text-2xl font-bold text-[var(--text-primary)] mt-1">
          {selectedSign.names[lang] || selectedSign.names.gu} - સંપૂર્ણ રાશિ ભવિષ્ય (Vedic Horoscope
          Dossier)
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5">
          દૈનિક, સાપ્તાહિક, માસિક અને વાર્ષિક જ્યોતિષ ફળાદેશ
        </p>
      </div>

      {/* Screen Header & Main Actions */}
      <Card.Header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4 p-0 print:hidden">
        <div>
          <Card.Title className="text-lg sm:text-xl font-medium text-[var(--text-primary)] font-serif flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[var(--text-gold)]" />
            <span>રાશિ ભવિષ્ય (Vedic Rashifal)</span>
          </Card.Title>
          <Card.Description className="text-xs text-[var(--text-muted)]">
            ૧૨ રાશિઓનું દૈનિક, સાપ્તાહિક, માસિક અને વાર્ષિક શાસ્ત્રીય ભવિષ્યફળ
          </Card.Description>
        </div>

        <div className="flex items-center gap-2">
          {kundliData && (
            <Button
              type="button"
              onPress={handleResetToMySign}
              title="મારી જન્મ રાશિ પર જાઓ (Jump to My Sign)"
              className="flex items-center gap-1.5 rounded-xl glass-badge-gold px-3 py-1.5 text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              <Moon className="h-3.5 w-3.5" />
              <span>મારી રાશિ (My Sign)</span>
            </Button>
          )}

          <Button
            type="button"
            onPress={handleResetToMySign}
            title="રીસેટ કરો (Reset)"
            className="flex items-center gap-1.5 rounded-xl glass-card px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-rose-500 transition shadow-2xs cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>સાફ કરો</span>
          </Button>

          <Button
            type="button"
            onPress={handlePrint}
            title="Save as PDF / Print"
            className="flex items-center gap-1.5 rounded-xl glass-card px-3.5 py-1.5 text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition shadow-xs cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-[var(--text-gold)]" />
            <span className="hidden sm:inline">Save as PDF</span>
          </Button>
        </div>
      </Card.Header>

      {/* 12 Zodiac Signs Selector Strip */}
      <div className="space-y-2 print:hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-serif font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5 text-[var(--text-gold)]" />
            રાશિ પસંદ કરો (Select Zodiac Sign):
          </span>

          <span className="text-[11px] font-mono text-[var(--text-muted)]">
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
                type="button"
                onClick={() => setSelectedSignIndex(sign.index)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border transition cursor-pointer relative ${
                  isSelected
                    ? 'border-[var(--border-gold)] glass-button-primary text-[#0c0e17] shadow-sm scale-[1.03]'
                    : isNative
                      ? 'border-amber-400/60 glass-panel-accent text-[var(--text-primary)] hover:border-[var(--border-gold)]'
                      : 'border-[var(--border-subtle)] glass-card text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                {isNative && (
                  <span className="absolute -top-1.5 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--text-amber)] text-[9px] text-white shadow-2xs font-bold">
                    ☽
                  </span>
                )}

                <span className="text-base font-serif leading-none">{sign.symbol}</span>
                <span className="text-xs font-serif font-bold mt-1 leading-tight">
                  {sign.names[lang] || sign.names.gu}
                </span>
                <span
                  className={`text-[9px] font-mono leading-none mt-0.5 ${isSelected ? 'text-[#0c0e17]/70 font-bold' : 'text-[var(--text-muted)]'}`}
                >
                  {sign.id}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Period Selection Bar */}
      <Card className="flex flex-wrap items-center justify-between gap-3 rounded-2xl glass-panel-accent p-2.5 sm:p-3 print:hidden border border-[var(--border-gold)]">
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
              <Button
                key={item.id}
                type="button"
                onPress={() => setPeriod(item.id)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                  isSelected
                    ? 'glass-button-primary shadow-xs'
                    : 'glass-card text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] bg-transparent'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label[lang] || item.label.gu}</span>
              </Button>
            );
          })}
        </div>

        {/* Year Selector for Yearly Period */}
        {period === 'yearly' && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[var(--text-muted)]">વર્ષ (Year):</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="rounded-xl glass-input px-2.5 py-1 text-xs font-mono font-bold text-[var(--text-primary)] focus:outline-none"
            >
              {Array.from({ length: 51 }, (_, i) => 2000 + i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        )}
      </Card>

      {/* VIEW 1: DAILY RASHIFAL */}
      {period === 'daily' && (
        <div className="space-y-5 animate-fade-in-up">
          {/* Daily Hero Banner */}
          <Card className="rounded-2xl border border-[var(--border-gold)] glass-panel p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl glass-button-primary font-serif text-2xl font-bold text-[#0c0e17] shadow-md">
                {selectedSign.symbol}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    {selectedSign.names[lang] || selectedSign.names.gu} ({selectedSign.id})
                  </h3>
                  {isMySign && (
                    <Chip className="glass-badge-gold px-2.5 py-0.5 text-[10px] font-bold">
                      <Chip.Label>તમારી જન્મ રાશિ (Your Moon Sign)</Chip.Label>
                    </Chip>
                  )}
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  તારીખ: {dailyData.targetDate} • રાશિ સ્વામી:{' '}
                  {selectedSign.lord[lang] || selectedSign.lord.gu}
                </p>
              </div>
            </div>

            {/* Daily Energy Meter */}
            <div className="flex items-center gap-3 rounded-xl glass-card px-4 py-2.5 shadow-2xs border border-[var(--border-subtle)]">
              <Zap className="h-5 w-5 text-amber-500 animate-pulse-glow" />
              <div>
                <span className="text-[10px] text-[var(--text-muted)] font-semibold block">
                  દૈનિક કોસ્મિક ઊર્જા (Score)
                </span>
                <strong className="font-mono text-lg text-[var(--text-gold)]">
                  {dailyData.overallScore}%
                </strong>
              </div>
            </div>
          </Card>

          {/* 4 Core Dimensions: Career, Finance, Love, Health */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Career */}
            <Card className="rounded-2xl glass-panel p-4 shadow-2xs space-y-2 border border-[var(--border-subtle)]">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-[var(--text-gold)]" />
                  <span className="font-serif text-sm font-bold text-[var(--text-primary)]">
                    કારકિર્દી & વ્યવસાય (Career & Business)
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[var(--text-gold)]">
                  {dailyData.predictions.career.score}%
                </span>
              </div>
              <p className="text-xs text-[var(--text-primary)] leading-relaxed">
                {dailyData.predictions.career[lang] || dailyData.predictions.career.gu}
              </p>
            </Card>

            {/* Finance */}
            <Card className="rounded-2xl glass-panel p-4 shadow-2xs space-y-2 border border-[var(--border-subtle)]">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-serif text-sm font-bold text-[var(--text-primary)]">
                    નાણાકીય સ્થિતિ & રોકાણ (Finance)
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  {dailyData.predictions.finance.score}%
                </span>
              </div>
              <p className="text-xs text-[var(--text-primary)] leading-relaxed">
                {dailyData.predictions.finance[lang] || dailyData.predictions.finance.gu}
              </p>
            </Card>

            {/* Love & Family */}
            <Card className="rounded-2xl glass-panel p-4 shadow-2xs space-y-2 border border-[var(--border-subtle)]">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                  <span className="font-serif text-sm font-bold text-[var(--text-primary)]">
                    પ્રેમ & પારિવારિક સુખ (Love & Family)
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-rose-700 dark:text-rose-400">
                  {dailyData.predictions.love.score}%
                </span>
              </div>
              <p className="text-xs text-[var(--text-primary)] leading-relaxed">
                {dailyData.predictions.love[lang] || dailyData.predictions.love.gu}
              </p>
            </Card>

            {/* Health */}
            <Card className="rounded-2xl glass-panel p-4 shadow-2xs space-y-2 border border-[var(--border-subtle)]">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-serif text-sm font-bold text-[var(--text-primary)]">
                    આરોગ્ય & સ્ફૂર્તિ (Health & Wellness)
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-blue-700 dark:text-blue-400">
                  {dailyData.predictions.health.score}%
                </span>
              </div>
              <p className="text-xs text-[var(--text-primary)] leading-relaxed">
                {dailyData.predictions.health[lang] || dailyData.predictions.health.gu}
              </p>
            </Card>
          </div>

          {/* Lucky Factors Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <Card className="rounded-xl glass-card p-3 shadow-2xs border border-[var(--border-subtle)]">
              <span className="text-[10px] text-[var(--text-muted)] block">
                શુભ અંક (Lucky Number)
              </span>
              <strong className="font-mono text-base text-[var(--text-gold)]">
                {dailyData.luckyFactor.number}
              </strong>
            </Card>

            <Card className="rounded-xl glass-card p-3 shadow-2xs border border-[var(--border-subtle)]">
              <span className="text-[10px] text-[var(--text-muted)] block">
                શુભ રંગ (Lucky Color)
              </span>
              <strong className="text-xs font-bold text-[var(--text-primary)]">
                {dailyData.luckyFactor.color[lang] || dailyData.luckyFactor.color.gu}
              </strong>
            </Card>

            <Card className="rounded-xl glass-card p-3 shadow-2xs border border-[var(--border-subtle)]">
              <span className="text-[10px] text-[var(--text-muted)] block">
                શુભ સમય (Auspicious Time)
              </span>
              <strong className="font-mono text-[11px] text-[var(--text-primary)]">
                {dailyData.luckyFactor.time}
              </strong>
            </Card>

            <Card className="rounded-xl glass-card p-3 shadow-2xs border border-[var(--border-subtle)]">
              <span className="text-[10px] text-[var(--text-muted)] block">
                શુભ દિશા (Lucky Direction)
              </span>
              <strong className="text-xs font-bold text-[var(--text-primary)]">
                {dailyData.luckyFactor.direction}
              </strong>
            </Card>
          </div>

          {/* Daily Remedy Box */}
          <Card className="rounded-2xl border border-[var(--border-gold)] bg-[var(--bg-pill)] p-4 flex flex-row items-start gap-3 shadow-xs">
            <Sparkles className="h-5 w-5 text-[var(--text-gold)] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-serif text-xs font-bold text-[var(--text-gold)]">
                આજનો વિશેષ જ્યોતિષીય ઉપાય & મંત્ર (Daily Vedic Remedy):
              </h4>
              <p className="text-xs text-[var(--text-primary)] leading-relaxed">
                {dailyData.dailyRemedy[lang] || dailyData.dailyRemedy.gu}
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* VIEW 2: WEEKLY RASHIFAL */}
      {period === 'weekly' && (
        <div className="space-y-5 animate-fade-in-up">
          <Card className="rounded-2xl glass-panel p-4 sm:p-6 shadow-sm border border-[var(--border-subtle)] space-y-4">
            <div className="border-b border-[var(--border-subtle)] pb-3 flex items-center justify-between">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                {weeklyData.title[lang] || weeklyData.title.gu}
              </h3>
              <Chip className="glass-badge-gold px-2.5 py-1 text-xs font-mono font-bold">
                <Chip.Label>૭ દિવસનું પૂર્વાનુમાન</Chip.Label>
              </Chip>
            </div>

            <p className="text-xs text-[var(--text-primary)] leading-relaxed">
              {weeklyData.overview[lang] || weeklyData.overview.gu}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <Card className="rounded-xl glass-card p-3 text-center border border-[var(--border-subtle)]">
                <span className="text-[10px] text-[var(--text-muted)] block">કારકિર્દી સ્કોર</span>
                <strong className="font-mono text-sm text-[var(--text-gold)]">
                  {weeklyData.weeklyScores.career}%
                </strong>
              </Card>
              <Card className="rounded-xl glass-card p-3 text-center border border-[var(--border-subtle)]">
                <span className="text-[10px] text-[var(--text-muted)] block">નાણાકીય લાભ</span>
                <strong className="font-mono text-sm text-emerald-700 dark:text-emerald-400">
                  {weeklyData.weeklyScores.finance}%
                </strong>
              </Card>
              <Card className="rounded-xl glass-card p-3 text-center border border-[var(--border-subtle)]">
                <span className="text-[10px] text-[var(--text-muted)] block">પ્રેમ સંબંધ</span>
                <strong className="font-mono text-sm text-rose-700 dark:text-rose-400">
                  {weeklyData.weeklyScores.romance}%
                </strong>
              </Card>
              <Card className="rounded-xl glass-card p-3 text-center border border-[var(--border-subtle)]">
                <span className="text-[10px] text-[var(--text-muted)] block">આરોગ્ય</span>
                <strong className="font-mono text-sm text-blue-700 dark:text-blue-400">
                  {weeklyData.weeklyScores.wellness}%
                </strong>
              </Card>
            </div>

            <div className="rounded-xl glass-panel-accent p-3.5 flex items-center justify-between text-xs border border-[var(--border-subtle)]">
              <span className="text-[var(--text-muted)]">શુભ વાર (Auspicious Days):</span>
              <strong className="font-bold text-[var(--text-primary)]">
                {weeklyData.auspiciousDays[lang] || weeklyData.auspiciousDays.gu}
              </strong>
            </div>

            <div className="rounded-xl border border-[var(--border-gold)] bg-[var(--bg-pill)] p-3.5 text-xs text-[var(--text-gold)]">
              <strong>સાપ્તાહિક ઉપાય:</strong> {weeklyData.remedy[lang] || weeklyData.remedy.gu}
            </div>
          </Card>
        </div>
      )}

      {/* VIEW 3: MONTHLY RASHIFAL */}
      {period === 'monthly' && (
        <div className="space-y-5 animate-fade-in-up">
          <Card className="rounded-2xl glass-panel p-4 sm:p-6 shadow-sm border border-[var(--border-subtle)] space-y-4">
            <div className="border-b border-[var(--border-subtle)] pb-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                {monthlyData.title[lang] || monthlyData.title.gu}
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {monthlyData.transitHighlights[lang] || monthlyData.transitHighlights.gu}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card className="rounded-xl glass-card p-3.5 space-y-1 border border-[var(--border-subtle)]">
                <span className="font-serif text-xs font-bold text-[var(--text-gold)] block">
                  વ્યાવસાયિક સ્થિતિ (Career)
                </span>
                <p className="text-xs text-[var(--text-primary)]">
                  {monthlyData.monthlySectors.career[lang] || monthlyData.monthlySectors.career.gu}
                </p>
              </Card>

              <Card className="rounded-xl glass-card p-3.5 space-y-1 border border-[var(--border-subtle)]">
                <span className="font-serif text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                  નાણાકીય પ્રવાહ (Wealth)
                </span>
                <p className="text-xs text-[var(--text-primary)]">
                  {monthlyData.monthlySectors.finance[lang] ||
                    monthlyData.monthlySectors.finance.gu}
                </p>
              </Card>

              <Card className="rounded-xl glass-card p-3.5 space-y-1 border border-[var(--border-subtle)]">
                <span className="font-serif text-xs font-bold text-rose-700 dark:text-rose-400 block">
                  પારિવારિક જીવન (Domestic Bliss)
                </span>
                <p className="text-xs text-[var(--text-primary)]">
                  {monthlyData.monthlySectors.family[lang] || monthlyData.monthlySectors.family.gu}
                </p>
              </Card>

              <Card className="rounded-xl glass-card p-3.5 space-y-1 border border-[var(--border-subtle)]">
                <span className="font-serif text-xs font-bold text-blue-700 dark:text-blue-400 block">
                  આરોગ્ય & આહાર (Wellness)
                </span>
                <p className="text-xs text-[var(--text-primary)]">
                  {monthlyData.monthlySectors.health[lang] || monthlyData.monthlySectors.health.gu}
                </p>
              </Card>
            </div>
          </Card>
        </div>
      )}

      {/* VIEW 4: YEARLY RASHIFAL */}
      {period === 'yearly' && (
        <div className="space-y-5 animate-fade-in-up">
          <Card className="rounded-2xl glass-panel p-4 sm:p-6 shadow-sm border border-[var(--border-subtle)] space-y-4">
            <div className="border-b border-[var(--border-subtle)] pb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                  {yearlyData.title[lang] || yearlyData.title.gu}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  ગુરુ-શનિ ગોચર, સાડાસાતી વિશ્લેષણ અને ૪ ત્રિમાસિક યોજના
                </p>
              </div>

              <Chip className="glass-badge-gold px-3 py-1 font-mono text-xs font-bold">
                <Chip.Label>{selectedYear} મહા રાશિફળ</Chip.Label>
              </Chip>
            </div>

            {/* Sade Sati Status Panel */}
            <Card
              className={`rounded-2xl border p-4 space-y-1.5 ${
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
            </Card>

            {/* Guru Gochar Annual Blessing */}
            <Card className="rounded-2xl glass-panel-accent p-4 space-y-1 border border-[var(--border-gold)]">
              <span className="font-serif text-xs font-bold text-[var(--text-gold)] block">
                દેવગુરુ બૃહસ્પતિ વાર્ષિક આશીર્વાદ (Jupiter Blessing):
              </span>
              <p className="text-xs text-[var(--text-primary)] leading-relaxed">
                {yearlyData.guruGochar[lang] || yearlyData.guruGochar.gu}
              </p>
            </Card>

            {/* 4 Quarters Breakdown */}
            <div className="space-y-2 pt-2">
              <h4 className="font-serif text-xs font-bold text-[var(--text-primary)]">
                ૪ ત્રિમાસિક તબક્કાવાર ભવિષ્યવાણી (Quarterly Forecast):
              </h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {yearlyData.annualThemes.map((q, idx) => (
                  <Card
                    key={idx}
                    className="rounded-2xl glass-card p-3.5 space-y-1 border border-[var(--border-subtle)]"
                  >
                    <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                      <span className="font-mono text-[11px] font-bold text-[var(--text-gold)]">
                        {q.quarter}
                      </span>
                      <span className="text-[11px] font-serif font-semibold text-[var(--text-primary)]">
                        {q.title[lang] || q.title.gu}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-primary)] pt-1">
                      {q.desc[lang] || q.desc.gu}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Annual Vedic Remedies */}
            <Card className="rounded-2xl border border-[var(--border-gold)] bg-[var(--bg-pill)] p-4 space-y-2">
              <h4 className="font-serif text-xs font-bold text-[var(--text-gold)] flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                વાર્ષિક સિદ્ધ ઉપાય & દાન સંકલ્પ (Annual Remedies):
              </h4>
              <ul className="space-y-1 text-xs text-[var(--text-primary)]">
                {yearlyData.annualRemedies.map((rem, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-[var(--text-gold)]">•</span>
                    <span>{rem[lang] || rem.gu}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Card>
        </div>
      )}
    </Card>
  );
}
