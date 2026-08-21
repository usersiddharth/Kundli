import React, { useState } from 'react';
import {
  getGujaratiMonthCalendar,
  calculateDayPanchang,
  GUJARATI_FESTIVALS,
  SOLAR_FIXED_FESTIVALS,
} from '../engine/gujaratiCalendar.js';
import { calculateDetailedGujaratiPanchang } from '../engine/gujaratiPanchang.js';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Sparkles,
  Printer,
  ArrowRight,
  Clock,
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
  { full: 'રવિવાર (Sun)', short: 'રવિ' },
  { full: 'સોમવાર (Mon)', short: 'સોમ' },
  { full: 'મંગળવાર (Tue)', short: 'મંગળ' },
  { full: 'બુધવાર (Wed)', short: 'બુધ' },
  { full: 'ગુરુવાર (Thu)', short: 'ગુરુ' },
  { full: 'શુક્રવાર (Fri)', short: 'શુક્ર' },
  { full: 'શનિવાર (Sat)', short: 'શનિ' },
];

const CALENDAR_YEARS = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

export default function GujaratiCalendarView({ onOpenPanchangPortal, lang = 'gu' }) {
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1); // 1-indexed

  // Selected Day in Month for Detailed Panchang Sheet
  const [selectedDayInfo, setSelectedDayInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('month'); // 'month' | 'festivals'

  // Generate 42-cell calendar grid for active month
  const calendarGrid = getGujaratiMonthCalendar(currentYear, currentMonth);

  // Fallback to today if none clicked
  const activeSelected =
    selectedDayInfo ||
    calendarGrid.find(
      (c) =>
        c.day === now.getDate() &&
        c.month === now.getMonth() + 1 &&
        c.year === now.getFullYear()
    ) ||
    calendarGrid[15];

  // Calculate detailed panchang for the selected day
  const selYear = activeSelected ? activeSelected.year : now.getFullYear();
  const selMonth = activeSelected ? activeSelected.month : now.getMonth() + 1;
  const selDay = activeSelected ? activeSelected.day : now.getDate();
  const detailedPanchang = calculateDetailedGujaratiPanchang(selYear, selMonth, selDay);

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
    setSelectedDayInfo(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
    setSelectedDayInfo(null);
  };

  const handleToday = () => {
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth() + 1);
    const todayCell = calendarGrid.find(
      (c) =>
        c.day === now.getDate() &&
        c.month === now.getMonth() + 1 &&
        c.year === now.getFullYear()
    );
    if (todayCell) setSelectedDayInfo(todayCell);
  };

  const handlePrint = () => {
    window.print();
  };

  const getFestivalName = (fest) => {
    if (!fest) return '';
    if (typeof fest === 'string') return fest;
    return fest.name?.[lang] || fest.name?.gu || fest.name || '';
  };

  const handleJumpToPanchang = () => {
    if (onOpenPanchangPortal && activeSelected) {
      const dateStr = `${activeSelected.year}-${String(activeSelected.month).padStart(2, '0')}-${String(activeSelected.day).padStart(2, '0')}`;
      onOpenPanchangPortal(dateStr);
    }
  };

  return (
    <div className="rounded-2xl spatial-panel p-3 sm:p-5 md:p-6 shadow-sm space-y-4 sm:space-y-6 print:border-none print:p-0 print:bg-white border border-[var(--border-subtle)]">
      {/* ── Printable Header ── */}
      <div className="hidden print:block text-center border-b-2 border-[#8c7456] pb-3 mb-4">
        <span className="font-serif text-xs font-bold tracking-widest text-[var(--text-gold)]">
          || ૐ શ્રી ગણેશાય નમઃ ||
        </span>
        <h1 className="font-serif text-2xl font-bold text-[var(--text-primary)] mt-1">
          ગુજરાતી પંચાંગ કૅલેન્ડર — {MONTH_NAMES_GU[currentMonth - 1]} {currentYear}
        </h1>
        {activeSelected && (
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            પસંદ કરેલ તારીખ: {activeSelected.day}-{activeSelected.month}-{activeSelected.year} •
            વિક્રમ સંવત {detailedPanchang?.vikramSamvat}
          </p>
        )}
      </div>

      {/* ── Main Header & Controls ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-[var(--text-gold)] shrink-0" />
            <h2
              className="text-lg sm:text-xl font-medium text-[var(--text-primary)] tracking-tight"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              વિગતવાર ગુજરાતી કૅલેન્ડર (Detailed Gujarati Calendar)
            </h2>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
            કોઈપણ તારીખ પર ક્લિક કરીને તે દિવસનું સંપૂર્ણ વિગતવાર પંચાંગ, ચોઘડિયા અને મુહૂર્ત જુઓ
          </p>
        </div>

        {/* Tab & Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center rounded-xl p-1 gap-1 spatial-pill">
            <button
              type="button"
              onClick={() => setActiveTab('month')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                activeTab === 'month' ? 'spatial-btn-primary' : 'spatial-btn-ghost'
              }`}
            >
              માસિક કૅલેન્ડર (Monthly grid)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('festivals')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                activeTab === 'festivals' ? 'spatial-btn-primary' : 'spatial-btn-ghost'
              }`}
            >
              વાર્ષિક તહેવારો (All festivals)
            </button>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            title="Save calendar as PDF"
            className="flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-medium transition cursor-pointer spatial-btn-ghost"
            style={{ border: '1px solid var(--border-subtle)' }}
          >
            <Printer className="h-3.5 w-3.5 text-[var(--text-gold)]" />
            <span style={{ color: 'var(--text-secondary)' }}>Save as PDF</span>
          </button>
        </div>
      </div>

      {/* ── MONTHLY CALENDAR GRID VIEW ── */}
      {activeTab === 'month' && (
        <div className="space-y-6">
          {/* Month Navigation Banner */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl p-3 sm:p-4 border transition"
            style={{
              background: 'rgba(20, 20, 42, 0.75)',
              borderColor: 'var(--border-gold)',
              boxShadow: 'var(--shadow-gold)',
            }}
          >
            <div className="flex items-center justify-between w-full sm:w-auto gap-2">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Previous Month"
                className="rounded-xl p-2 text-[var(--text-primary)] transition cursor-pointer spatial-btn-ghost"
                style={{ border: '1px solid var(--border-subtle)' }}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <h3
                className="text-base sm:text-xl font-bold px-3 text-center tracking-tight text-[var(--text-gold)]"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {MONTH_NAMES_GU[currentMonth - 1]} {currentYear}
              </h3>

              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Next Month"
                className="rounded-xl p-2 text-[var(--text-primary)] transition cursor-pointer spatial-btn-ghost"
                style={{ border: '1px solid var(--border-subtle)' }}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto gap-2">
              <button
                type="button"
                onClick={handleToday}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer spatial-btn-primary"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>આજ (Today)</span>
              </button>

              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(Number(e.target.value))}
                className="rounded-xl px-3 py-1.5 text-xs font-mono font-medium focus:outline-none cursor-pointer spatial-input"
                style={{ border: '1px solid var(--border-default)' }}
              >
                {CALENDAR_YEARS.map((y) => (
                  <option key={y} value={y} style={{ background: '#10101e', color: '#fff' }}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 7-Column Wall Calendar Grid */}
          <div
            className="rounded-2xl border overflow-hidden spatial-panel shadow-xl"
            style={{ borderColor: 'rgba(245, 158, 11, 0.2)' }}
          >
            {/* Weekday Header */}
            <div
              className="grid grid-cols-7 border-b text-center text-[11px] sm:text-xs font-bold"
              style={{
                background: 'rgba(16, 16, 30, 0.85)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              {WEEKDAYS_GU.map((day, idx) => (
                <div
                  key={idx}
                  className={`py-2.5 sm:py-3 border-r last:border-r-0 ${
                    idx === 0 ? 'text-rose-400 font-bold' : ''
                  }`}
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <span className="hidden sm:inline">{day.full}</span>
                  <span className="sm:hidden">{day.short}</span>
                </div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-[1px]" style={{ background: 'var(--border-void)' }}>
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
                    className={`min-h-[82px] sm:min-h-[112px] p-1.5 sm:p-2 flex flex-col justify-start text-left cursor-pointer transition-all select-none relative focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--gold-500)] ${
                      cell.isCurrentMonth
                        ? isToday
                          ? isSelected
                            ? 'ring-2 ring-[var(--gold-400)] shadow-lg z-20'
                            : 'ring-1 sm:ring-2 ring-[var(--gold-500)]/70 shadow-sm z-10'
                          : isSelected
                            ? 'ring-2 ring-[var(--border-gold)] z-10'
                            : 'hover:bg-white/10'
                        : 'opacity-40 hover:opacity-75'
                    }`}
                    style={{
                      background: isToday
                        ? isSelected
                          ? 'rgba(245, 158, 11, 0.22)'
                          : 'rgba(245, 158, 11, 0.12)'
                        : isSelected
                          ? 'rgba(99, 102, 241, 0.18)'
                          : cell.isCurrentMonth
                            ? 'rgba(20, 20, 42, 0.75)'
                            : 'rgba(12, 12, 23, 0.5)',
                      boxShadow: isSelected ? '0 0 20px rgba(245, 158, 11, 0.15)' : 'none',
                    }}
                  >
                    {/* Top Row: Date Number & Moon Phase */}
                    <div className="flex justify-between items-center h-5 sm:h-6 mb-1 w-full">
                      <div className="flex items-center gap-1">
                        <span
                          className={`font-mono font-bold leading-none ${
                            isToday
                              ? 'flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-xs sm:text-sm font-black shadow-xs'
                              : isSunday
                                ? 'text-xs sm:text-base text-rose-400 font-bold'
                                : 'text-xs sm:text-base text-[var(--text-primary)]'
                          }`}
                          style={
                            isToday
                              ? {
                                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                  color: '#07070d',
                                  boxShadow: '0 0 10px rgba(245, 158, 11, 0.4)',
                                }
                              : {}
                          }
                        >
                          {cell.day}
                        </span>

                        {isToday && (
                          <span
                            className="px-1.5 py-0.2 rounded text-[8px] sm:text-[9px] font-bold hidden sm:inline-block"
                            style={{
                              background: 'rgba(245, 158, 11, 0.2)',
                              color: '#fbbf24',
                              border: '1px solid rgba(245, 158, 11, 0.3)',
                            }}
                          >
                            આજ
                          </span>
                        )}
                      </div>

                      {/* Moon Phase Badges */}
                      <div className="flex items-center gap-0.5">
                        {cell.isPurnima && (
                          <span
                            className="flex items-center justify-center rounded-full p-0.5 text-[10px] sm:text-xs leading-none"
                            title="પૂનમ (Full Moon)"
                            style={{
                              filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.7))',
                            }}
                          >
                            🌕
                          </span>
                        )}
                        {cell.isAmavasya && (
                          <span
                            className="flex items-center justify-center rounded-full p-0.5 text-[10px] sm:text-xs leading-none"
                            title="અમાસ (New Moon)"
                            style={{
                              filter: 'drop-shadow(0 0 6px rgba(168, 85, 247, 0.6))',
                            }}
                          >
                            🌑
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Middle: Gujarati Tithi */}
                    <div className="min-h-[24px] sm:min-h-[30px] flex flex-col justify-start w-full">
                      <span
                        className="text-[9px] sm:text-[11px] font-semibold leading-tight line-clamp-2 block tracking-tight"
                        style={{
                          color: isToday
                            ? '#fbbf24'
                            : cell.pakshaKey === 'sud'
                              ? '#fcd34d'
                              : '#93c5fd', // Crisp sky blue for Vad paksha
                          textShadow: cell.pakshaKey === 'sud' ? '0 0 8px rgba(245, 158, 11, 0.2)' : 'none',
                        }}
                      >
                        {cell.fullTithiTitle}
                      </span>
                      <span
                        className="text-[9px] sm:text-[10px] hidden sm:block truncate mt-0.5 font-mono"
                        style={{ color: 'rgba(255, 255, 255, 0.65)' }}
                      >
                        {cell.nakshatraName}
                      </span>
                    </div>

                    {/* Bottom: Festival Pills */}
                    <div className="mt-auto pt-1 space-y-1 min-h-[16px] sm:min-h-[22px] overflow-hidden w-full">
                      {cell.festivals.slice(0, 2).map((f, fIdx) => {
                        const isMajor = f.type === 'major';
                        return (
                          <span
                            key={fIdx}
                            className="text-[8.5px] sm:text-[9.5px] px-1.5 py-0.5 rounded-md block truncate font-medium border leading-tight"
                            style={{
                              background: isMajor
                                ? 'rgba(239, 68, 68, 0.2)'
                                : 'rgba(16, 185, 129, 0.18)',
                              borderColor: isMajor
                                ? 'rgba(239, 68, 68, 0.4)'
                                : 'rgba(16, 185, 129, 0.35)',
                              color: isMajor ? '#fecaca' : '#a7f3d0',
                              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                            }}
                          >
                            {getFestivalName(f)}
                          </span>
                        );
                      })}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── COMPREHENSIVE DETAILED PANCHANG FOR CLICKED DATE ── */}
          {activeSelected && detailedPanchang && (
            <div
              className="rounded-2xl p-5 sm:p-6 shadow-xl space-y-6 animate-fade-in-up border"
              style={{
                background: 'rgba(16, 16, 30, 0.85)',
                borderColor: 'var(--border-gold)',
                boxShadow: 'var(--shadow-gold-glow)',
              }}
            >
              {/* Selected Day Panchang Title & Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="spatial-badge-gold px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      પસંદ કરેલ તારીખનું પંચાંગ
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      વિક્રમ સંવત {detailedPanchang.vikramSamvat} • શક સંવત{' '}
                      {detailedPanchang.shakaSamvat}
                    </span>
                  </div>

                  <h3
                    className="text-xl sm:text-2xl font-bold text-[var(--text-gold)] mt-1.5"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    તારીખ {activeSelected.day}-{activeSelected.month}-{activeSelected.year} •{' '}
                    {detailedPanchang.vaar}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    {detailedPanchang.gujMonthName} • {detailedPanchang.pakshaName} •{' '}
                    {detailedPanchang.ritu}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleJumpToPanchang}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer spatial-btn-primary"
                >
                  <span>સંપૂર્ણ પંચાંગ પોર્ટલ ખોલો</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* 5 Core Limbs Cards for Selected Date */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {/* 1. Tithi */}
                <div className="rounded-xl p-3.5 text-xs space-y-1.5 spatial-card border border-[var(--border-subtle)]">
                  <span className="font-semibold text-[var(--text-muted)] uppercase text-[10px] block">
                    ૧. તિથિ
                  </span>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {detailedPanchang.tithi.name}
                  </h4>
                  <span className="text-[11px] text-[var(--text-secondary)] block">
                    {detailedPanchang.pakshaName}
                  </span>
                  <span className="spatial-badge-gold text-[9px] font-bold px-1.5 py-0.5 rounded inline-block">
                    {detailedPanchang.tithi.nature}
                  </span>
                </div>

                {/* 2. Vaar */}
                <div className="rounded-xl p-3.5 text-xs space-y-1.5 spatial-card border border-[var(--border-subtle)]">
                  <span className="font-semibold text-[var(--text-muted)] uppercase text-[10px] block">
                    ૨. વાર
                  </span>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {detailedPanchang.vaar}
                  </h4>
                  <span className="text-[11px] text-[var(--text-secondary)] block">
                    દિશા શૂળ: {detailedPanchang.dishaShool.badDir}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] block">
                    પરિહાર: {detailedPanchang.dishaShool.remedy}
                  </span>
                </div>

                {/* 3. Nakshatra */}
                <div className="rounded-xl p-3.5 text-xs space-y-1.5 spatial-card border border-[var(--border-subtle)]">
                  <span className="font-semibold text-[var(--text-muted)] uppercase text-[10px] block">
                    ૩. નક્ષત્ર
                  </span>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {detailedPanchang.nakshatra.name}
                  </h4>
                  <span className="text-[11px] text-[var(--text-secondary)] block">
                    સ્વામી: {detailedPanchang.nakshatra.lord}
                  </span>
                  <span className="spatial-badge-gold text-[9px] font-bold px-1.5 py-0.5 rounded inline-block">
                    પદ {detailedPanchang.nakshatra.pada}
                  </span>
                </div>

                {/* 4. Yoga */}
                <div className="rounded-xl p-3.5 text-xs space-y-1.5 spatial-card border border-[var(--border-subtle)]">
                  <span className="font-semibold text-[var(--text-muted)] uppercase text-[10px] block">
                    ૪. યોગ
                  </span>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {detailedPanchang.yoga.name}
                  </h4>
                  <span className="text-[11px] text-[var(--text-secondary)] block">
                    પ્રકૃતિ: {detailedPanchang.yoga.nature === 'Auspicious' ? 'શુભ' : 'અશુભ'}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded inline-block ${
                      detailedPanchang.yoga.nature === 'Auspicious'
                        ? 'spatial-badge-success'
                        : 'spatial-badge-danger'
                    }`}
                  >
                    {detailedPanchang.yoga.nature}
                  </span>
                </div>

                {/* 5. Karana */}
                <div className="rounded-xl p-3.5 text-xs space-y-1.5 spatial-card border border-[var(--border-subtle)]">
                  <span className="font-semibold text-[var(--text-muted)] uppercase text-[10px] block">
                    ૫. કરણ
                  </span>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {detailedPanchang.karana.name}
                  </h4>
                  <span className="text-[11px] text-[var(--text-secondary)] block">
                    દેવતા: {detailedPanchang.karana.deity}
                  </span>
                  <span className="spatial-badge-gold text-[9px] font-bold px-1.5 py-0.5 rounded inline-block">
                    {detailedPanchang.karana.type}
                  </span>
                </div>
              </div>

              {/* Sun/Moon Coordinates & Day Muhurtas Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2.5 p-3 rounded-xl spatial-card border border-[var(--border-subtle)]">
                  <Sun className="h-4 w-4 text-[var(--text-gold)] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block">સૂર્યોદય - સૂર્યાસ્ત</span>
                    <strong className="font-mono text-xs text-[var(--text-primary)]">
                      {detailedPanchang.sun.sunrise} - {detailedPanchang.sun.sunset}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl spatial-card border border-[var(--border-subtle)]">
                  <Moon className="h-4 w-4 text-sky-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block">ચંદ્ર રાશિ</span>
                    <strong className="text-xs text-[var(--text-primary)]">
                      {detailedPanchang.moon.rashi} ({detailedPanchang.moon.deg}°)
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl spatial-card border border-[var(--border-subtle)]">
                  <Clock className="h-4 w-4 text-rose-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block">રાહુ કાળ</span>
                    <strong className="font-mono text-xs text-rose-300">
                      {detailedPanchang.muhurats.rahuKaal}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl spatial-card border border-[var(--border-subtle)]">
                  <Sparkles className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block">અભિજિત મુહૂર્ત</span>
                    <strong className="font-mono text-xs text-emerald-300">
                      {detailedPanchang.muhurats.abhijit}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── ANNUAL FESTIVALS LIST TAB ── */}
      {activeTab === 'festivals' && (
        <div className="space-y-6">
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl p-4 border"
            style={{
              background: 'rgba(20, 20, 42, 0.75)',
              borderColor: 'var(--border-gold)',
            }}
          >
            <div>
              <h3
                className="text-lg sm:text-xl font-bold text-[var(--text-gold)]"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                વિક્રમ સંવત વર્ષ {currentYear} ના તમામ મુખ્ય હિન્દુ તહેવારો
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                એકાદશી, પૂનમ, અમાસ, વ્રત, નવરાત્રિ, દિવાળી અને ગુજરાતી સાંસ્કૃતિક પર્વો
              </p>
            </div>

            <select
              value={currentYear}
              onChange={(e) => setCurrentYear(Number(e.target.value))}
              className="rounded-xl px-3 py-1.5 text-xs font-mono font-medium focus:outline-none cursor-pointer spatial-input"
              style={{ border: '1px solid var(--border-default)' }}
            >
              {CALENDAR_YEARS.map((y) => (
                <option key={y} value={y} style={{ background: '#10101e', color: '#fff' }}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {GUJARATI_FESTIVALS.map((fest, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl space-y-2 border transition spatial-card hover:border-[var(--border-gold)]"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <div className="flex justify-between items-start">
                  <span
                    className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg border"
                    style={{
                      background: 'rgba(245, 158, 11, 0.15)',
                      borderColor: 'rgba(245, 158, 11, 0.3)',
                      color: '#fbbf24',
                    }}
                  >
                    {fest.paksha === 'sud' ? 'સુદ' : 'વદ'} {fest.tithi}
                  </span>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                    style={{
                      background: fest.type === 'major' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.18)',
                      borderColor: fest.type === 'major' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.35)',
                      color: fest.type === 'major' ? '#fecaca' : '#a7f3d0',
                    }}
                  >
                    {fest.type === 'major' ? 'મુખ્ય પર્વ' : 'વ્રત / ઉત્સવ'}
                  </span>
                </div>

                <h4
                  className="text-sm font-bold text-[var(--text-primary)] pt-1"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {getFestivalName(fest)}
                </h4>

                <div className="pt-2 border-t border-[var(--border-subtle)] text-[10.5px] text-[var(--text-muted)] font-mono flex items-center justify-between">
                  <span>માસિક તિથિ પત્રિકા</span>
                  <span>{fest.paksha === 'sud' ? 'શુક્લ પક્ષ' : 'કૃષ્ણ પક્ષ'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
