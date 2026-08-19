import React, { useState } from 'react';
import { Button, Card, Chip } from '@heroui/react';
import { getGujaratiMonthCalendar, GUJARATI_FESTIVALS } from '../engine/gujaratiCalendar.js';
import { calculateDetailedGujaratiPanchang } from '../engine/gujaratiPanchang.js';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Sparkles,
  Award,
  Printer,
  Compass,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

const MONTH_NAMES_GU = [
  'જાન્યુઆરી (January)',
  'ફેબ્રુઆરી (February)',
  'માર્ચ (March)',
  'એપ્રિલ (April)',
  'મે (May)',
  'જૂન (June)',
  'જુલાઈ (July)',
  'ઓગસ્ટ (August)',
  'સપ્ટેમ્બર (September)',
  'ઓક્ટોબર (October)',
  'નવેમ્બર (November)',
  'ડિસેમ્બર (December)',
];

const WEEKDAYS_GU = [
  { short: 'રવિ', full: 'રવિવાર (Sun)' },
  { short: 'સોમ', full: 'સોમવાર (Mon)' },
  { short: 'મંગળ', full: 'મંગળવાર (Tue)' },
  { short: 'બુધ', full: 'બુધવાર (Wed)' },
  { short: 'ગુરુ', full: 'ગુરુવાર (Thu)' },
  { short: 'શુક્ર', full: 'શુક્રવાર (Fri)' },
  { short: 'શનિ', full: 'શનિવાર (Sat)' },
];

const CALENDAR_YEARS = Array.from({ length: 201 }, (_, i) => 1900 + i);

export default function GujaratiCalendarView({ t, lang, onOpenPanchangPortal }) {
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1); // 1 to 12
  const [selectedDayInfo, setSelectedDayInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('month'); // 'month' | 'festivals'

  const calendarGrid = getGujaratiMonthCalendar(currentYear, currentMonth);

  // Auto-select today if not selected yet
  const todayCell = calendarGrid.find(
    (c) =>
      c.isCurrentMonth &&
      c.day === now.getDate() &&
      c.month === now.getMonth() + 1 &&
      c.year === now.getFullYear()
  );

  const activeSelected =
    selectedDayInfo ||
    (currentMonth === now.getMonth() + 1 && currentYear === now.getFullYear() ? todayCell : null);

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDayInfo(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDayInfo(null);
  };

  const handleToday = () => {
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth() + 1);
    setSelectedDayInfo(todayCell || null);
  };

  const handlePrint = () => {
    window.print();
  };

  // Find active day's detailed panchang if selected
  const detailedPanchang = activeSelected
    ? calculateDetailedGujaratiPanchang(
        activeSelected.year,
        activeSelected.month,
        activeSelected.day
      )
    : null;

  const getFestivalName = (f) => {
    if (!f) return '';
    if (typeof f === 'string') return f;
    if (f.name) {
      if (typeof f.name === 'string') return f.name;
      return f.name[lang] || f.name.gu || f.name.en || '';
    }
    return f[lang] || f.gu || f.en || '';
  };

  const handleJumpToPanchangPortal = () => {
    if (onOpenPanchangPortal && activeSelected) {
      const dateStr = `${activeSelected.year}-${String(activeSelected.month).padStart(2, '0')}-${String(activeSelected.day).padStart(2, '0')}`;
      onOpenPanchangPortal(dateStr);
    }
  };

  return (
    <Card className="rounded-2xl glass-panel p-3 sm:p-5 md:p-6 shadow-sm space-y-4 sm:space-y-6 print:border-none print:p-0 print:bg-white border border-[var(--border-subtle)]">
      {/* Printable Header (Visible Only in Print) */}
      <div className="hidden print:block text-center border-b-2 border-[#8c7456] pb-3 mb-4">
        <span className="font-serif text-xs font-bold tracking-widest text-[#8c7456]">
          || ૐ શ્રી ગણેશાય નમઃ ||
        </span>
        <h1 className="font-serif text-2xl font-bold text-[#2c2825] mt-1">
          ગુજરાતી પંચાંગ કૅલેન્ડર — {MONTH_NAMES_GU[currentMonth - 1]} {currentYear}
        </h1>
        {activeSelected && (
          <p className="text-xs text-[#544d44] mt-1">
            પસંદ કરેલ તારીખ: {activeSelected.day}-{activeSelected.month}-{activeSelected.year} •
            વિક્રમ સંવત {detailedPanchang?.vikramSamvat}
          </p>
        )}
      </div>

      {/* Main Header & Controls (Hidden in Print) */}
      <Card.Header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4 p-0 print:hidden">
        <div>
          <Card.Title className="text-lg sm:text-xl font-medium text-[var(--text-primary)] font-serif flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-[var(--text-gold)]" /> વિગતવાર ગુજરાતી કૅલેન્ડર
            (Detailed Gujarati calendar)
          </Card.Title>
          <Card.Description className="text-xs text-[var(--text-muted)]">
            કોઈપણ તારીખ પર ક્લિક કરીને તે દિવસનું સંપૂર્ણ વિગતવાર પંચાંગ, ચોઘડિયા અને મુહૂર્ત જુઓ
          </Card.Description>
        </div>

        {/* Tab & Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex rounded-xl glass-pill p-1 gap-1">
            <Button
              type="button"
              onPress={() => setActiveTab('month')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                activeTab === 'month'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:bg-black/5 dark:hover:bg-white/5 bg-transparent'
              }`}
            >
              માસિક કૅલેન્ડર (Monthly grid)
            </Button>
            <Button
              type="button"
              onPress={() => setActiveTab('festivals')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                activeTab === 'festivals'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:bg-black/5 dark:hover:bg-white/5 bg-transparent'
              }`}
            >
              વાર્ષિક તહેવારો (All festivals)
            </Button>
          </div>

          <Button
            type="button"
            onPress={handlePrint}
            title="Save calendar as PDF"
            className="flex items-center gap-1.5 rounded-xl glass-card px-3.5 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition shadow-xs cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-[var(--text-gold)]" />
            <span>Save as PDF</span>
          </Button>
        </div>
      </Card.Header>

      {/* MONTHLY CALENDAR GRID VIEW */}
      {activeTab === 'month' && (
        <div className="space-y-6">
          {/* Month Navigation Banner */}
          <Card className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl glass-panel-accent p-3 sm:p-4 shadow-xs border border-[var(--border-gold)]">
            <div className="flex items-center justify-between w-full sm:w-auto gap-1 sm:gap-2">
              <Button
                type="button"
                onPress={handlePrevMonth}
                aria-label="Previous Month"
                className="rounded-xl glass-card p-1.5 sm:p-2 text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition shadow-2xs cursor-pointer min-w-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <h3 className="font-serif text-base sm:text-xl font-bold text-[var(--text-gold)] px-2 text-center">
                {MONTH_NAMES_GU[currentMonth - 1]} {currentYear}
              </h3>

              <Button
                type="button"
                onPress={handleNextMonth}
                aria-label="Next Month"
                className="rounded-xl glass-card p-1.5 sm:p-2 text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition shadow-2xs cursor-pointer min-w-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto gap-2">
              <Button
                type="button"
                onPress={handleToday}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl glass-button-primary px-3 py-1.5 text-xs font-bold shadow-2xs transition cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#0c0e17]" />
                <span>આજ (Today)</span>
              </Button>

              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(Number(e.target.value))}
                className="rounded-xl glass-input px-2.5 py-1.5 text-xs font-mono font-medium text-[var(--text-primary)] focus:outline-none cursor-pointer"
              >
                {CALENDAR_YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </Card>

          {/* 7-Column Wall Calendar Grid */}
          <div className="rounded-2xl border border-[var(--border-gold)] glass-panel shadow-sm overflow-hidden">
            {/* Weekday Header */}
            <div className="grid grid-cols-7 border-b border-[var(--border-subtle)] glass-pill text-center text-[11px] sm:text-xs font-bold text-[var(--text-secondary)]">
              {WEEKDAYS_GU.map((day, idx) => (
                <div
                  key={idx}
                  className={`py-2 sm:py-2.5 border-r border-[var(--border-subtle)] last:border-r-0 ${
                    idx === 0 ? 'text-rose-600 dark:text-rose-400 font-bold' : ''
                  }`}
                >
                  <span className="hidden sm:inline">{day.full}</span>
                  <span className="sm:hidden">{day.short}</span>
                </div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 bg-[var(--border-subtle)] gap-[1px]">
              {calendarGrid.map((cell, idx) => {
                const isSelected =
                  activeSelected &&
                  activeSelected.day === cell.day &&
                  activeSelected.month === cell.month &&
                  activeSelected.year === cell.year;
                const isToday =
                  now.getDate() === cell.day &&
                  now.getMonth() + 1 === cell.month &&
                  now.getFullYear() === cell.year;
                const isSunday = idx % 7 === 0;
                const festLabel = cell.festivals.map(getFestivalName).filter(Boolean).join(', ');

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDayInfo(cell)}
                    aria-label={`Date ${cell.day} ${MONTH_NAMES_GU[cell.month - 1]} ${cell.year}, ${cell.fullTithiTitle}${festLabel ? ', ' + festLabel : ''}`}
                    aria-pressed={isSelected}
                    className={`min-h-[76px] sm:min-h-[106px] p-1 sm:p-2 flex flex-col justify-start text-left cursor-pointer transition select-none relative focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] focus-visible:z-30 ${
                      cell.isCurrentMonth
                        ? isToday
                          ? isSelected
                            ? 'bg-amber-100/90 dark:bg-amber-950/70 ring-2 ring-[var(--text-gold)] shadow-sm z-20'
                            : 'bg-amber-50/70 dark:bg-amber-950/40 ring-1.5 sm:ring-2 ring-[var(--text-gold)]/80 shadow-2xs z-10'
                          : isSelected
                            ? 'bg-stone-200/90 dark:bg-stone-800/80 ring-2 ring-[var(--border-gold)] z-10'
                            : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)]'
                        : 'bg-[var(--bg-pill)]/40 opacity-45'
                    }`}
                  >
                    {/* Top Row: Date Number & Moon Phase */}
                    <div className="flex justify-between items-center h-5 sm:h-6 mb-0.5 w-full">
                      <div className="flex items-center gap-1">
                        <span
                          className={`font-mono font-bold leading-none ${
                            isToday
                              ? 'flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[var(--text-amber)] text-white text-xs sm:text-sm shadow-xs animate-pulse-glow'
                              : isSunday
                                ? 'text-xs sm:text-base text-rose-600 dark:text-rose-400'
                                : 'text-xs sm:text-base text-[var(--text-primary)]'
                          }`}
                        >
                          {cell.day}
                        </span>

                        {isToday && (
                          <Chip className="glass-badge-gold px-1 py-0 text-[8px] sm:text-[9px] font-bold hidden sm:inline-block">
                            <Chip.Label>આજ</Chip.Label>
                          </Chip>
                        )}
                      </div>

                      <div className="flex items-center gap-0.5">
                        {cell.isPurnima && (
                          <span
                            className="text-[10px] sm:text-xs leading-none"
                            title="પૂનમ (Full Moon)"
                          >
                            🌕
                          </span>
                        )}
                        {cell.isAmavasya && (
                          <span
                            className="text-[10px] sm:text-xs leading-none"
                            title="અમાસ (New Moon)"
                          >
                            🌑
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Middle: Gujarati Tithi */}
                    <div className="min-h-[22px] sm:min-h-[28px] flex flex-col justify-start w-full">
                      <span
                        className={`text-[8.5px] sm:text-[10.5px] font-semibold leading-tight line-clamp-2 block ${
                          isToday
                            ? 'text-[var(--text-gold)] font-bold'
                            : cell.pakshaKey === 'sud'
                              ? 'text-[var(--text-gold)]'
                              : 'text-[var(--text-secondary)]'
                        }`}
                      >
                        {cell.fullTithiTitle}
                      </span>
                      <span className="text-[8.5px] text-[var(--text-muted)] hidden sm:block truncate mt-0.5">
                        {cell.nakshatraName}
                      </span>
                    </div>

                    {/* Bottom: Festival Pills */}
                    <div className="mt-auto pt-0.5 space-y-0.5 min-h-[14px] sm:min-h-[20px] overflow-hidden w-full">
                      {cell.festivals.slice(0, 2).map((f, fIdx) => (
                        <span
                          key={fIdx}
                          className={`text-[8px] px-1 py-0.2 rounded block truncate font-medium ${
                            f.type === 'major'
                              ? 'glass-badge-danger font-bold'
                              : 'glass-badge-success'
                          }`}
                        >
                          {getFestivalName(f)}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COMPREHENSIVE DETAILED PANCHANG FOR CLICKED DATE */}
          {activeSelected && detailedPanchang && (
            <Card className="rounded-2xl glass-panel-accent p-6 shadow-sm space-y-6 animate-fade-in-up border border-[var(--border-gold)]">
              {/* Selected Day Panchang Title & Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Chip className="glass-button-primary px-2.5 py-0.5 text-[10px] font-bold text-[#0c0e17]">
                      <Chip.Label>પસંદ કરેલ તારીખનું પંચાંગ</Chip.Label>
                    </Chip>
                    <span className="text-xs text-[var(--text-muted)]">
                      વિક્રમ સંવત {detailedPanchang.vikramSamvat} • શક સંવત{' '}
                      {detailedPanchang.shakaSamvat}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[var(--text-gold)] mt-1">
                    તારીખ {activeSelected.day}-{activeSelected.month}-{activeSelected.year} •{' '}
                    {detailedPanchang.vaar}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {detailedPanchang.gujMonthName} • {detailedPanchang.pakshaName} •{' '}
                    {detailedPanchang.ritu} • {detailedPanchang.ayanaName}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <Button
                    type="button"
                    onPress={handleJumpToPanchangPortal}
                    className="flex items-center gap-1.5 rounded-xl glass-button-primary px-3.5 py-2 text-xs font-semibold text-[#0c0e17] transition shadow-xs cursor-pointer"
                  >
                    <span>પંચાંગ પોર્ટલમાં જુઓ</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>

                  <Button
                    type="button"
                    onPress={handlePrint}
                    className="flex items-center gap-1.5 rounded-xl glass-card px-3.5 py-2 text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition shadow-xs cursor-pointer"
                  >
                    <Printer className="h-3.5 w-3.5 text-[var(--text-gold)]" />
                    <span>Print Panchang</span>
                  </Button>
                </div>
              </div>

              {/* Sun & Moon Highlights */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
                <Card className="rounded-xl glass-card p-3 flex flex-row items-center gap-2.5 border border-[var(--border-subtle)]">
                  <Sun className="h-4 w-4 text-[var(--text-gold)]" />
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block">
                      સૂર્યોદય / સૂર્યાસ્ત
                    </span>
                    <strong className="font-mono text-[var(--text-primary)]">
                      {detailedPanchang.sun.sunrise} - {detailedPanchang.sun.sunset}
                    </strong>
                  </div>
                </Card>

                <Card className="rounded-xl glass-card p-3 flex flex-row items-center gap-2.5 border border-[var(--border-subtle)]">
                  <Compass className="h-4 w-4 text-[var(--text-muted)]" />
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block">સૂર્ય રાશિ</span>
                    <strong className="text-[var(--text-primary)]">
                      {t[detailedPanchang.sun.rashi] || detailedPanchang.sun.rashi} (
                      {detailedPanchang.sun.deg}°)
                    </strong>
                  </div>
                </Card>

                <Card className="rounded-xl glass-card p-3 flex flex-row items-center gap-2.5 border border-[var(--border-subtle)]">
                  <Moon className="h-4 w-4 text-[var(--text-secondary)]" />
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block">ચંદ્ર રાશિ</span>
                    <strong className="text-[var(--text-primary)]">
                      {t[detailedPanchang.moon.rashi] || detailedPanchang.moon.rashi} (
                      {detailedPanchang.moon.deg}°)
                    </strong>
                  </div>
                </Card>

                <Card className="rounded-xl glass-card p-3 flex flex-row items-center gap-2.5 border border-[var(--border-subtle)]">
                  <Sparkles className="h-4 w-4 text-[var(--text-gold)]" />
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block">અયનાંશ</span>
                    <strong className="text-[var(--text-primary)]">લાહિડી (ચિત્રા પક્ષ)</strong>
                  </div>
                </Card>
              </div>

              {/* 5 Core Limbs Breakdown */}
              <div className="space-y-3">
                <h4 className="font-serif text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-[var(--text-gold)]" /> પંચાંગના ૫ મુખ્ય અંગો (5
                  Core Limbs of the Day)
                </h4>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {/* 1. Tithi */}
                  <Card className="rounded-xl glass-card p-4 text-xs space-y-2 shadow-2xs border border-[var(--border-subtle)]">
                    <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-1.5">
                      <span className="font-semibold text-[var(--text-muted)] uppercase text-[10px]">
                        ૧. તિથિ
                      </span>
                      <Chip className="glass-badge-gold text-[10px] font-bold px-1.5 py-0.5">
                        <Chip.Label>{detailedPanchang.tithi.nature}</Chip.Label>
                      </Chip>
                    </div>
                    <h5 className="font-serif text-base font-bold text-[var(--text-primary)]">
                      {detailedPanchang.tithi.name}
                    </h5>
                    <span className="text-[var(--text-secondary)] block text-[11px]">
                      {detailedPanchang.pakshaName}
                    </span>
                    <div className="text-[10px] text-[var(--text-muted)]">
                      દેવતા: <strong>{detailedPanchang.tithi.deity}</strong>
                    </div>
                  </Card>

                  {/* 2. Vaar */}
                  <Card className="rounded-xl glass-card p-4 text-xs space-y-2 shadow-2xs border border-[var(--border-subtle)]">
                    <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-1.5">
                      <span className="font-semibold text-[var(--text-muted)] uppercase text-[10px]">
                        ૨. વાર
                      </span>
                      <Chip className="glass-pill text-[10px] font-bold px-1.5 py-0.5 text-[var(--text-primary)]">
                        <Chip.Label>દિવસ</Chip.Label>
                      </Chip>
                    </div>
                    <h5 className="font-serif text-base font-bold text-[var(--text-primary)]">
                      {detailedPanchang.vaar}
                    </h5>
                    <span className="text-[var(--text-secondary)] block text-[11px]">
                      દિશા શૂળ: {detailedPanchang.dishaShool.badDir}
                    </span>
                    <div className="text-[10px] text-[var(--text-muted)]">
                      સ્વામી: <strong>{detailedPanchang.vaar.split(' ')[0]}</strong>
                    </div>
                  </Card>

                  {/* 3. Nakshatra */}
                  <Card className="rounded-xl glass-card p-4 text-xs space-y-2 shadow-2xs border border-[var(--border-subtle)]">
                    <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-1.5">
                      <span className="font-semibold text-[var(--text-muted)] uppercase text-[10px]">
                        ૩. નક્ષત્ર
                      </span>
                      <Chip className="glass-badge-gold text-[10px] font-bold px-1.5 py-0.5">
                        <Chip.Label>પદ {detailedPanchang.nakshatra.pada}</Chip.Label>
                      </Chip>
                    </div>
                    <h5 className="font-serif text-base font-bold text-[var(--text-primary)]">
                      {detailedPanchang.nakshatra.name}
                    </h5>
                    <span className="text-[var(--text-secondary)] block text-[11px]">
                      સ્વામી:{' '}
                      {t[detailedPanchang.nakshatra.lord] || detailedPanchang.nakshatra.lord}
                    </span>
                    <div className="text-[10px] text-[var(--text-muted)]">
                      ગણ: <strong>{detailedPanchang.nakshatra.gana}</strong>
                    </div>
                  </Card>

                  {/* 4. Yoga */}
                  <Card className="rounded-xl glass-card p-4 text-xs space-y-2 shadow-2xs border border-[var(--border-subtle)]">
                    <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-1.5">
                      <span className="font-semibold text-[var(--text-muted)] uppercase text-[10px]">
                        ૪. નિત્ય યોગ
                      </span>
                      <Chip
                        className={`text-[10px] font-bold px-1.5 py-0.5 ${
                          detailedPanchang.yoga.nature === 'Auspicious'
                            ? 'glass-badge-success'
                            : 'glass-badge-danger'
                        }`}
                      >
                        <Chip.Label>
                          {detailedPanchang.yoga.nature === 'Auspicious' ? 'શુભ' : 'અશુભ'}
                        </Chip.Label>
                      </Chip>
                    </div>
                    <h5 className="font-serif text-base font-bold text-[var(--text-primary)]">
                      {detailedPanchang.yoga.name}
                    </h5>
                    <span className="text-[var(--text-secondary)] block text-[11px]">
                      દેવતા: {detailedPanchang.yoga.deity}
                    </span>
                    <div className="text-[10px] text-[var(--text-muted)]">૨૭ નિત્ય યોગ</div>
                  </Card>

                  {/* 5. Karana */}
                  <Card className="rounded-xl glass-card p-4 text-xs space-y-2 shadow-2xs border border-[var(--border-subtle)]">
                    <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-1.5">
                      <span className="font-semibold text-[var(--text-muted)] uppercase text-[10px]">
                        ૫. કરણ
                      </span>
                      <Chip className="glass-pill text-[10px] font-bold px-1.5 py-0.5 text-[var(--text-secondary)]">
                        <Chip.Label>{detailedPanchang.karana.type.split(' ')[0]}</Chip.Label>
                      </Chip>
                    </div>
                    <h5 className="font-serif text-base font-bold text-[var(--text-primary)]">
                      {detailedPanchang.karana.name}
                    </h5>
                    <span className="text-[var(--text-secondary)] block text-[11px]">
                      સ્વામી: {detailedPanchang.karana.lord}
                    </span>
                    <div className="text-[10px] text-[var(--text-muted)]">
                      {detailedPanchang.isBhadraActive ? '⚠️ ભદ્રા કાળ' : '✅ નિર્દોષ'}
                    </div>
                  </Card>
                </div>
              </div>

              {/* Shubh & Ashubh Muhurat Timings */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Auspicious Muhurats */}
                <Card className="rounded-2xl glass-badge-success p-5 space-y-3 border">
                  <h4 className="font-serif text-base font-bold text-[#1e8449] dark:text-[#7bed9f] flex items-center gap-2 border-b border-emerald-300/40 pb-2">
                    <ShieldCheck className="h-5 w-5 text-[#1e8449] dark:text-[#7bed9f]" /> આજના શુભ
                    મુહૂર્ત કાળ (Auspicious Timings)
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <Card className="rounded-xl glass-card p-3 border border-[var(--border-subtle)]">
                      <span className="font-semibold text-[#1e8449] dark:text-[#7bed9f] block">
                        અભિજિત મુહૂર્ત (સર્વશ્રેષ્ઠ)
                      </span>
                      <span className="font-mono text-[var(--text-primary)] font-bold text-xs">
                        {detailedPanchang.muhurats.abhijit}
                      </span>
                    </Card>
                    <Card className="rounded-xl glass-card p-3 border border-[var(--border-subtle)]">
                      <span className="font-semibold text-[#1e8449] dark:text-[#7bed9f] block">
                        બ્રહ્મ મુહૂર્ત (સાધના કાળ)
                      </span>
                      <span className="font-mono text-[var(--text-primary)] font-bold text-xs">
                        {detailedPanchang.muhurats.brahma}
                      </span>
                    </Card>
                    <Card className="rounded-xl glass-card p-3 border border-[var(--border-subtle)]">
                      <span className="font-semibold text-[#1e8449] dark:text-[#7bed9f] block">
                        વિજય મુહૂર્ત (વિજય કાળ)
                      </span>
                      <span className="font-mono text-[var(--text-primary)] font-bold text-xs">
                        {detailedPanchang.muhurats.vijay}
                      </span>
                    </Card>
                    <Card className="rounded-xl glass-card p-3 border border-[var(--border-subtle)]">
                      <span className="font-semibold text-[#1e8449] dark:text-[#7bed9f] block">
                        ગોધૂલિ મુહૂર્ત (સંધ્યા કાળ)
                      </span>
                      <span className="font-mono text-[var(--text-primary)] font-bold text-xs">
                        {detailedPanchang.muhurats.godhuli}
                      </span>
                    </Card>
                  </div>
                </Card>

                {/* Inauspicious Periods */}
                <Card className="rounded-2xl glass-badge-danger p-5 space-y-3 border">
                  <h4 className="font-serif text-base font-bold text-[#b03a2e] dark:text-[#ff7675] flex items-center gap-2 border-b border-rose-300/40 pb-2">
                    <AlertTriangle className="h-5 w-5 text-[#b03a2e] dark:text-[#ff7675]" /> વર્જ્ય
                    / અશુભ કાળ (Inauspicious Periods)
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <Card className="rounded-xl glass-card p-3 border border-[var(--border-subtle)]">
                      <span className="font-semibold text-[#b03a2e] dark:text-[#ff7675] block">
                        રાહુ કાળ (ત્યાજ્ય સમય)
                      </span>
                      <span className="font-mono text-[var(--text-primary)] font-bold text-xs">
                        {detailedPanchang.muhurats.rahuKaal}
                      </span>
                    </Card>
                    <Card className="rounded-xl glass-card p-3 border border-[var(--border-subtle)]">
                      <span className="font-semibold text-[#b03a2e] dark:text-[#ff7675] block">
                        યમગંડ કાળ
                      </span>
                      <span className="font-mono text-[var(--text-primary)] font-bold text-xs">
                        {detailedPanchang.muhurats.yamaghanta}
                      </span>
                    </Card>
                    <Card className="rounded-xl glass-card p-3 border border-[var(--border-subtle)]">
                      <span className="font-semibold text-[#b03a2e] dark:text-[#ff7675] block">
                        ગુલિક કાળ
                      </span>
                      <span className="font-mono text-[var(--text-primary)] font-bold text-xs">
                        {detailedPanchang.muhurats.gulikaKaal}
                      </span>
                    </Card>
                    <Card className="rounded-xl glass-card p-3 border border-[var(--border-subtle)]">
                      <span className="font-semibold text-[#b03a2e] dark:text-[#ff7675] block">
                        ભદ્રા / વિષ્ટિ સ્થિતિ
                      </span>
                      <span className="font-semibold text-[var(--text-primary)] text-xs">
                        {detailedPanchang.isBhadraActive
                          ? '⚠️ ભદ્રા સક્રિય (અશુભ)'
                          : '✅ ભદ્રા મુક્ત'}
                      </span>
                    </Card>
                  </div>
                </Card>
              </div>

              {/* Day Festivals */}
              {activeSelected.festivals && activeSelected.festivals.length > 0 && (
                <Card className="rounded-xl glass-badge-success p-4 text-xs space-y-2 border">
                  <span className="font-bold text-[#1e8449] dark:text-[#7bed9f] block">
                    આજના તહેવારો, ઉત્સવો અને વ્રત:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeSelected.festivals.map((f, i) => (
                      <Chip
                        key={i}
                        className="glass-button-primary px-3 py-1 text-xs font-bold text-[#0c0e17]"
                      >
                        <Chip.Label>{getFestivalName(f)}</Chip.Label>
                      </Chip>
                    ))}
                  </div>
                </Card>
              )}
            </Card>
          )}
        </div>
      )}

      {/* ANNUAL FESTIVALS DIRECTORY VIEW */}
      {activeTab === 'festivals' && (
        <div className="space-y-4">
          <Card className="rounded-2xl glass-panel-accent p-5 shadow-xs border border-[var(--border-gold)]">
            <h3 className="font-serif text-lg font-bold text-[var(--text-gold)] flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[var(--text-gold)]" /> વર્ષના તમામ પ્રમુખ ગુજરાતી
              તહેવારો અને વ્રતોની સૂચિ
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              વિક્રમ સંવત અને ગુજરાતી માસ (કાર્તક થી આસો) મુજબ તમામ પર્વો
            </p>
          </Card>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {GUJARATI_FESTIVALS.map((fest, idx) => (
              <Card
                key={idx}
                className="rounded-2xl glass-card p-4 text-xs space-y-2 shadow-2xs transition border border-[var(--border-subtle)]"
              >
                <div className="flex justify-between items-start">
                  <Chip
                    className={`px-2 py-0.5 text-[10px] font-bold ${
                      fest.type === 'major' ? 'glass-badge-danger' : 'glass-badge-success'
                    }`}
                  >
                    <Chip.Label>
                      {fest.type === 'major' ? 'મુખ્ય તહેવાર' : 'વ્રત / ઉપવાસ'}
                    </Chip.Label>
                  </Chip>
                  <span className="font-mono text-[11px] font-semibold text-[var(--text-muted)]">
                    {fest.paksha === 'sud' ? 'સુદ' : 'વદ'} {fest.tithi}
                  </span>
                </div>

                <h4 className="font-serif text-sm font-bold text-[var(--text-primary)]">
                  {getFestivalName(fest)}
                </h4>

                <div className="border-t border-[var(--border-subtle)] pt-2 text-[11px] text-[var(--text-secondary)]">
                  ગુજરાતી માસ:{' '}
                  <strong>
                    {
                      [
                        'કારતક',
                        'માગશર',
                        'પોષ',
                        'મહા',
                        'ફાગણ',
                        'ચૈત્ર',
                        'વૈશાખ',
                        'જેઠ',
                        'અષાઢ',
                        'શ્રાવણ',
                        'ભાદરવો',
                        'આસો',
                      ][fest.monthIdx]
                    }
                  </strong>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
