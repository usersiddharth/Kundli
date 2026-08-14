import React, { useState } from 'react';
import {
  getGujaratiMonthCalendar,
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
  Award,
  Star,
  Printer,
  Info,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
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
    <div className="rounded-xl glass-panel p-6 shadow-sm space-y-6 print:border-none print:p-0 print:bg-white">
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
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e6dfd3]/80 pb-4 print:hidden">
        <div>
          <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-[#b85d19]" /> વિગતવાર ગુજરાતી કૅલેન્ડર (Detailed
            Gujarati Calendar)
          </h2>
          <p className="text-xs text-[#736a60]">
            કોઈપણ તારીખ પર ક્લિક કરીને તે દિવસનું સંપૂર્ણ વિગતવાર પંચાંગ, ચોઘડિયા અને મુહૂર્ત જુઓ
          </p>
        </div>

        {/* Tab & Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex rounded-lg glass-pill p-1">
            <button
              onClick={() => setActiveTab('month')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                activeTab === 'month'
                  ? 'glass-button-dark text-[#f4ebd9] shadow-xs'
                  : 'text-[#544d44] hover:bg-white/70'
              }`}
            >
              માસિક કૅલેન્ડર (Monthly Grid)
            </button>
            <button
              onClick={() => setActiveTab('festivals')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                activeTab === 'festivals'
                  ? 'glass-button-dark text-[#f4ebd9] shadow-xs'
                  : 'text-[#544d44] hover:bg-white/70'
              }`}
            >
              વાર્ષિક તહેવારો (All Festivals)
            </button>
          </div>

          <button
            onClick={handlePrint}
            title="Save Calendar as PDF"
            className="flex items-center gap-1.5 rounded-lg glass-card px-3.5 py-1.5 text-xs font-medium text-[#544d44] hover:bg-white/90 hover:text-[#2c2825] transition shadow-xs"
          >
            <Printer className="h-3.5 w-3.5 text-[#b85d19]" />
            <span>Save as PDF</span>
          </button>
        </div>
      </div>

      {/* MONTHLY CALENDAR GRID VIEW */}
      {activeTab === 'month' && (
        <div className="space-y-6">
          {/* Month Navigation Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl glass-panel-accent p-4 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="rounded-lg glass-card p-2 text-[#2c2825] hover:bg-[#2c2825] hover:text-[#f4ebd9] transition shadow-2xs"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#b85d19] px-2">
                {MONTH_NAMES_GU[currentMonth - 1]} {currentYear}
              </h3>

              <button
                onClick={handleNextMonth}
                className="rounded-lg glass-card p-2 text-[#2c2825] hover:bg-[#2c2825] hover:text-[#f4ebd9] transition shadow-2xs"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToday}
                className="flex items-center gap-1.5 rounded-lg glass-badge-warning px-3.5 py-1.5 text-xs font-bold hover:bg-[#fae8d4] shadow-2xs transition"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#b85d19]" />
                <span>આજની તારીખ (Today)</span>
              </button>

              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(Number(e.target.value))}
                className="rounded-lg glass-input px-2.5 py-1.5 text-xs font-mono text-[#2c2825] focus:outline-none"
              >
                {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 7-Column Wall Calendar Grid */}
          <div className="rounded-xl border border-[#8c7456]/50 glass-panel shadow-sm overflow-hidden">
            {/* Weekday Header */}
            <div className="grid grid-cols-7 border-b border-[#8c7456]/40 glass-pill text-center text-xs font-bold text-[#544d44]">
              {WEEKDAYS_GU.map((day, idx) => (
                <div
                  key={idx}
                  className={`py-2.5 border-r border-[#e6dfd3]/60 last:border-r-0 ${idx === 0 ? 'text-[#802020]' : ''}`}
                >
                  <span className="hidden sm:inline">{day.full}</span>
                  <span className="sm:hidden">{day.short}</span>
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 bg-[#dcd4c6]/60 gap-[1px]">
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
                    className={`min-h-[96px] sm:min-h-[110px] p-2 flex flex-col justify-between text-left cursor-pointer transition select-none relative focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] focus-visible:z-30 ${
                      cell.isCurrentMonth
                        ? isToday
                          ? isSelected
                            ? 'bg-[#fae8d4] ring-2 ring-[#b85d19] shadow-sm z-20'
                            : 'bg-[#fff8ee] ring-2 ring-[#b85d19]/80 shadow-2xs z-10'
                          : isSelected
                            ? 'bg-[#fae8d4] ring-2 ring-[#8c7456] z-10'
                            : 'bg-white/80 hover:bg-white'
                        : 'bg-[#f7f5f0]/40 opacity-50'
                    }`}
                  >
                    {/* Top Row: Date, Today Badge & Moon Phase */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-1">
                        <span
                          className={`font-mono text-base sm:text-lg font-bold leading-none ${
                            isToday
                              ? 'flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-[#b85d19] text-white shadow-xs animate-pulse-glow'
                              : isSunday
                                ? 'text-[#802020]'
                                : 'text-[#2c2825]'
                          }`}
                        >
                          {cell.day}
                        </span>

                        {isToday && (
                          <span className="rounded glass-badge-warning px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold animate-gentle-float shadow-2xs">
                            આજ
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {cell.isPurnima && (
                          <span className="text-xs" title="પૂનમ (Full Moon)">
                            🌕
                          </span>
                        )}
                        {cell.isAmavasya && (
                          <span className="text-xs" title="અમાસ (New Moon)">
                            🌑
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Middle: Gujarati Tithi */}
                    <div className="mt-1">
                      <span
                        className={`text-[10px] sm:text-[11px] font-semibold block leading-tight ${
                          isToday
                            ? 'text-[#b85d19] font-bold'
                            : cell.pakshaKey === 'sud'
                              ? 'text-[#b85d19]'
                              : 'text-[#544d44]'
                        }`}
                      >
                        {cell.fullTithiTitle}
                      </span>
                      <span className="text-[9px] text-[#736a60] hidden sm:block truncate">
                        {cell.nakshatraName}
                      </span>
                    </div>

                    {/* Bottom: Festival Pills */}
                    <div className="mt-1 space-y-0.5">
                      {cell.festivals.slice(0, 2).map((f, fIdx) => (
                        <span
                          key={fIdx}
                          className={`text-[9px] px-1 py-0.5 rounded block truncate font-medium ${
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
            <div className="rounded-xl glass-panel-accent p-6 shadow-sm space-y-6 animate-fade-in-up border border-[#b85d19]/40">
              {/* Selected Day Panchang Title & Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e6dfd3]/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md glass-button-dark px-2.5 py-0.5 text-[10px] font-bold text-[#e6a86c]">
                      પસંદ કરેલ તારીખનું પંચાંગ
                    </span>
                    <span className="text-xs text-[#736a60]">
                      વિક્રમ સંવત {detailedPanchang.vikramSamvat} • શક સંવત{' '}
                      {detailedPanchang.shakaSamvat}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#b85d19] mt-1">
                    તારીખ {activeSelected.day}-{activeSelected.month}-{activeSelected.year} •{' '}
                    {detailedPanchang.vaar}
                  </h3>
                  <p className="text-xs text-[#544d44]">
                    {detailedPanchang.gujMonthName} • {detailedPanchang.pakshaName} •{' '}
                    {detailedPanchang.ritu} • {detailedPanchang.ayanaName}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={handleJumpToPanchangPortal}
                    className="flex items-center gap-1.5 rounded-lg glass-button-dark px-3.5 py-2 text-xs font-semibold text-[#f4ebd9] transition shadow-xs"
                  >
                    <span>પંચાંગ પોર્ટલમાં જુઓ</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#e6a86c]" />
                  </button>

                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 rounded-lg glass-card px-3.5 py-2 text-xs font-medium text-[#544d44] hover:bg-white transition shadow-xs"
                  >
                    <Printer className="h-3.5 w-3.5 text-[#b85d19]" />
                    <span>Print Panchang</span>
                  </button>
                </div>
              </div>

              {/* Sun & Moon Highlights */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
                <div className="rounded-lg glass-card p-3 flex items-center gap-2.5">
                  <Sun className="h-4 w-4 text-[#b85d19]" />
                  <div>
                    <span className="text-[10px] text-[#736a60] block">સૂર્યોદય / સૂર્યાસ્ત</span>
                    <strong className="font-mono text-[#2c2825]">
                      {detailedPanchang.sun.sunrise} - {detailedPanchang.sun.sunset}
                    </strong>
                  </div>
                </div>

                <div className="rounded-lg glass-card p-3 flex items-center gap-2.5">
                  <Compass className="h-4 w-4 text-[#736a60]" />
                  <div>
                    <span className="text-[10px] text-[#736a60] block">સૂર્ય રાશિ</span>
                    <strong className="text-[#2c2825]">
                      {t[detailedPanchang.sun.rashi] || detailedPanchang.sun.rashi} (
                      {detailedPanchang.sun.deg}°)
                    </strong>
                  </div>
                </div>

                <div className="rounded-lg glass-card p-3 flex items-center gap-2.5">
                  <Moon className="h-4 w-4 text-[#736a60]" />
                  <div>
                    <span className="text-[10px] text-[#736a60] block">ચંદ્ર રાશિ</span>
                    <strong className="text-[#2c2825]">
                      {t[detailedPanchang.moon.rashi] || detailedPanchang.moon.rashi} (
                      {detailedPanchang.moon.deg}°)
                    </strong>
                  </div>
                </div>

                <div className="rounded-lg glass-card p-3 flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-[#b85d19]" />
                  <div>
                    <span className="text-[10px] text-[#736a60] block">અયનાંશ</span>
                    <strong className="text-[#2c2825]">લાહિડી (ચિત્રા પક્ષ)</strong>
                  </div>
                </div>
              </div>

              {/* 5 Core Limbs Breakdown (૫ મહા અંગો) */}
              <div className="space-y-3">
                <h4 className="font-serif text-base font-bold text-[#2c2825] flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-[#b85d19]" /> પંચાંગના ૫ મુખ્ય અંગો (5 Core Limbs
                  of the Day)
                </h4>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {/* 1. Tithi */}
                  <div className="rounded-xl glass-card p-4 text-xs space-y-2 shadow-2xs">
                    <div className="flex justify-between items-center border-b border-[#e6dfd3]/80 pb-1.5">
                      <span className="font-semibold text-[#736a60] uppercase text-[10px]">
                        ૧. તિથિ
                      </span>
                      <span className="rounded glass-pill px-1.5 py-0.5 text-[10px] font-bold text-[#b85d19]">
                        {detailedPanchang.tithi.nature}
                      </span>
                    </div>
                    <h5 className="font-serif text-base font-bold text-[#2c2825]">
                      {detailedPanchang.tithi.name}
                    </h5>
                    <span className="text-[#544d44] block text-[11px]">
                      {detailedPanchang.pakshaName}
                    </span>
                    <div className="text-[10px] text-[#736a60]">
                      દેવતા: <strong>{detailedPanchang.tithi.deity}</strong>
                    </div>
                  </div>

                  {/* 2. Vaar */}
                  <div className="rounded-xl glass-card p-4 text-xs space-y-2 shadow-2xs">
                    <div className="flex justify-between items-center border-b border-[#e6dfd3]/80 pb-1.5">
                      <span className="font-semibold text-[#736a60] uppercase text-[10px]">
                        ૨. વાર
                      </span>
                      <span className="rounded glass-pill px-1.5 py-0.5 text-[10px] font-bold text-[#2c2825]">
                        દિવસ
                      </span>
                    </div>
                    <h5 className="font-serif text-base font-bold text-[#2c2825]">
                      {detailedPanchang.vaar}
                    </h5>
                    <span className="text-[#544d44] block text-[11px]">
                      દિશા શૂળ: {detailedPanchang.dishaShool.badDir}
                    </span>
                    <div className="text-[10px] text-[#736a60]">
                      સ્વામી: <strong>{detailedPanchang.vaar.split(' ')[0]}</strong>
                    </div>
                  </div>

                  {/* 3. Nakshatra */}
                  <div className="rounded-xl glass-card p-4 text-xs space-y-2 shadow-2xs">
                    <div className="flex justify-between items-center border-b border-[#e6dfd3]/80 pb-1.5">
                      <span className="font-semibold text-[#736a60] uppercase text-[10px]">
                        ૩. નક્ષત્ર
                      </span>
                      <span className="rounded glass-pill px-1.5 py-0.5 text-[10px] font-bold text-[#b85d19]">
                        પદ {detailedPanchang.nakshatra.pada}
                      </span>
                    </div>
                    <h5 className="font-serif text-base font-bold text-[#2c2825]">
                      {detailedPanchang.nakshatra.name}
                    </h5>
                    <span className="text-[#544d44] block text-[11px]">
                      સ્વામી:{' '}
                      {t[detailedPanchang.nakshatra.lord] || detailedPanchang.nakshatra.lord}
                    </span>
                    <div className="text-[10px] text-[#736a60]">
                      ગણ: <strong>{detailedPanchang.nakshatra.gana}</strong>
                    </div>
                  </div>

                  {/* 4. Yoga */}
                  <div className="rounded-xl glass-card p-4 text-xs space-y-2 shadow-2xs">
                    <div className="flex justify-between items-center border-b border-[#e6dfd3]/80 pb-1.5">
                      <span className="font-semibold text-[#736a60] uppercase text-[10px]">
                        ૪. નિત્ય યોગ
                      </span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                          detailedPanchang.yoga.nature === 'Auspicious'
                            ? 'glass-badge-success'
                            : 'glass-badge-danger'
                        }`}
                      >
                        {detailedPanchang.yoga.nature === 'Auspicious' ? 'શુભ' : 'અશુભ'}
                      </span>
                    </div>
                    <h5 className="font-serif text-base font-bold text-[#2c2825]">
                      {detailedPanchang.yoga.name}
                    </h5>
                    <span className="text-[#544d44] block text-[11px]">
                      દેવતા: {detailedPanchang.yoga.deity}
                    </span>
                    <div className="text-[10px] text-[#736a60]">૨૭ નિત્ય યોગ</div>
                  </div>

                  {/* 5. Karana */}
                  <div className="rounded-xl glass-card p-4 text-xs space-y-2 shadow-2xs">
                    <div className="flex justify-between items-center border-b border-[#e6dfd3]/80 pb-1.5">
                      <span className="font-semibold text-[#736a60] uppercase text-[10px]">
                        ૫. કરણ
                      </span>
                      <span className="rounded glass-pill px-1.5 py-0.5 text-[10px] font-bold text-[#544d44]">
                        {detailedPanchang.karana.type.split(' ')[0]}
                      </span>
                    </div>
                    <h5 className="font-serif text-base font-bold text-[#2c2825]">
                      {detailedPanchang.karana.name}
                    </h5>
                    <span className="text-[#544d44] block text-[11px]">
                      સ્વામી: {detailedPanchang.karana.lord}
                    </span>
                    <div className="text-[10px] text-[#736a60]">
                      {detailedPanchang.isBhadraActive ? '⚠️ ભદ્રા કાળ' : '✅ નિર્દોષ'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Shubh & Ashubh Muhurat Timings */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Auspicious Muhurats */}
                <div className="rounded-xl glass-badge-success p-5 space-y-3">
                  <h4 className="font-serif text-base font-bold text-[#285e20] flex items-center gap-2 border-b border-[#c1dec4]/80 pb-2">
                    <ShieldCheck className="h-5 w-5 text-[#285e20]" /> આજના શુભ મુહૂર્ત કાળ
                    (Auspicious Timings)
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-lg glass-card p-3">
                      <span className="font-semibold text-[#285e20] block">
                        અભિજિત મુહૂર્ત (સર્વશ્રેષ્ઠ)
                      </span>
                      <span className="font-mono text-[#2c2825] font-bold text-xs">
                        {detailedPanchang.muhurats.abhijit}
                      </span>
                    </div>
                    <div className="rounded-lg glass-card p-3">
                      <span className="font-semibold text-[#285e20] block">
                        બ્રહ્મ મુહૂર્ત (સાધના કાળ)
                      </span>
                      <span className="font-mono text-[#2c2825] font-bold text-xs">
                        {detailedPanchang.muhurats.brahma}
                      </span>
                    </div>
                    <div className="rounded-lg glass-card p-3">
                      <span className="font-semibold text-[#285e20] block">
                        વિજય મુહૂર્ત (વિજય કાળ)
                      </span>
                      <span className="font-mono text-[#2c2825] font-bold text-xs">
                        {detailedPanchang.muhurats.vijay}
                      </span>
                    </div>
                    <div className="rounded-lg glass-card p-3">
                      <span className="font-semibold text-[#285e20] block">
                        ગોધૂલિ મુહૂર્ત (સંધ્યા કાળ)
                      </span>
                      <span className="font-mono text-[#2c2825] font-bold text-xs">
                        {detailedPanchang.muhurats.godhuli}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Inauspicious Periods */}
                <div className="rounded-xl glass-badge-danger p-5 space-y-3">
                  <h4 className="font-serif text-base font-bold text-[#802020] flex items-center gap-2 border-b border-[#e4b5b5]/80 pb-2">
                    <AlertTriangle className="h-5 w-5 text-[#802020]" /> વર્જ્ય / અશુભ કાળ
                    (Inauspicious Periods)
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-lg glass-card p-3">
                      <span className="font-semibold text-[#802020] block">
                        રાહુ કાળ (ત્યાજ્ય સમય)
                      </span>
                      <span className="font-mono text-[#2c2825] font-bold text-xs">
                        {detailedPanchang.muhurats.rahuKaal}
                      </span>
                    </div>
                    <div className="rounded-lg glass-card p-3">
                      <span className="font-semibold text-[#802020] block">યમગંડ કાળ</span>
                      <span className="font-mono text-[#2c2825] font-bold text-xs">
                        {detailedPanchang.muhurats.yamaghanta}
                      </span>
                    </div>
                    <div className="rounded-lg glass-card p-3">
                      <span className="font-semibold text-[#802020] block">ગુલિક કાળ</span>
                      <span className="font-mono text-[#2c2825] font-bold text-xs">
                        {detailedPanchang.muhurats.gulikaKaal}
                      </span>
                    </div>
                    <div className="rounded-lg glass-card p-3">
                      <span className="font-semibold text-[#802020] block">
                        ભદ્રા / વિષ્ટિ સ્થિતિ
                      </span>
                      <span className="font-semibold text-[#2c2825] text-xs">
                        {detailedPanchang.isBhadraActive
                          ? '⚠️ ભદ્રા સક્રિય (અશુભ)'
                          : '✅ ભદ્રા મુક્ત'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disha Shool & Travel Remedies */}
              <div className="rounded-xl glass-panel p-5 space-y-3 shadow-2xs">
                <h4 className="font-serif text-base font-semibold text-[#2c2825] flex items-center gap-2">
                  <Compass className="h-5 w-5 text-[#b85d19]" /> દિશા શૂળ અને યાત્રા પરિહાર (Disha
                  Shool & Remedy)
                </h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
                  <div className="rounded-lg glass-card p-3.5">
                    <span className="font-semibold text-[#736a60] block mb-1">
                      આજનો વાર & વર્જિત દિશા:
                    </span>
                    <p className="text-sm font-bold text-[#802020]">
                      {detailedPanchang.dishaShool.day} — {detailedPanchang.dishaShool.badDir}{' '}
                      દિશામાં દિશા શૂળ છે.
                    </p>
                    <span className="text-[11px] text-[#544d44] block mt-1">
                      આ દિશામાં બિનજરૂરી પ્રવાસ ટાળવો.
                    </span>
                  </div>

                  <div className="rounded-lg glass-badge-success p-3.5">
                    <span className="font-semibold text-[#285e20] block mb-1">
                      શાસ્ત્રીય પરિહાર (ઉપાય):
                    </span>
                    <p className="text-sm font-bold text-[#285e20]">
                      {detailedPanchang.dishaShool.remedy}
                    </p>
                    <span className="text-[11px] text-[#544d44] block mt-1">
                      આ ઉપાય કરીને પ્રસ્થાન કરવાથી યાત્રા નિર્વિઘ્ન રહે છે.
                    </span>
                  </div>
                </div>
              </div>

              {/* Day Festivals */}
              {activeSelected.festivals && activeSelected.festivals.length > 0 && (
                <div className="rounded-lg glass-badge-success p-4 text-xs space-y-2">
                  <span className="font-bold text-[#285e20] block">
                    આજના તહેવારો, ઉત્સવો અને વ્રત:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeSelected.festivals.map((f, i) => (
                      <span
                        key={i}
                        className="rounded-lg glass-button-dark px-3 py-1 text-xs font-bold text-[#f4ebd9] shadow-2xs"
                      >
                        {getFestivalName(f)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ANNUAL FESTIVALS DIRECTORY VIEW */}
      {activeTab === 'festivals' && (
        <div className="space-y-4">
          <div className="rounded-xl glass-panel-accent p-5 shadow-xs">
            <h3 className="font-serif text-lg font-bold text-[#b85d19] flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#b85d19]" /> વર્ષના તમામ પ્રમુખ ગુજરાતી તહેવારો અને
              વ્રતોની સૂચિ
            </h3>
            <p className="text-xs text-[#736a60] mt-0.5">
              વિક્રમ સંવત અને ગુજરાતી માસ (કાર્તક થી આસો) મુજબ તમામ પર્વો
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {GUJARATI_FESTIVALS.map((fest, idx) => (
              <div
                key={idx}
                className="rounded-xl glass-card p-4 text-xs space-y-2 shadow-2xs transition"
              >
                <div className="flex justify-between items-start">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      fest.type === 'major' ? 'glass-badge-danger' : 'glass-badge-success'
                    }`}
                  >
                    {fest.type === 'major' ? 'મુખ્ય તહેવાર' : 'વ્રત / ઉપવાસ'}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-[#736a60]">
                    {fest.paksha === 'sud' ? 'સુદ' : 'વદ'} {fest.tithi}
                  </span>
                </div>

                <h4 className="font-serif text-sm font-bold text-[#2c2825]">
                  {getFestivalName(fest)}
                </h4>

                <div className="border-t border-[#e6dfd3]/80 pt-2 text-[11px] text-[#544d44]">
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
