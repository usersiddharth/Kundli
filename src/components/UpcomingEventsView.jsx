import React, { useState, useMemo } from 'react';
import { EVENT_CATEGORIES, getFilteredPlanetaryEvents } from '../engine/upcomingEvents.js';
import {
  Orbit,
  Sparkles,
  Calendar,
  Clock,
  Search,
  Filter,
  RotateCcw,
  X,
  Printer,
  ShieldCheck,
  AlertTriangle,
  Flame,
  ArrowRight,
  Info,
  CheckCircle2,
  Compass,
  Zap,
  Globe,
} from 'lucide-react';

export default function UpcomingEventsView({ kundliData, t, lang = 'gu' }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const events = useMemo(() => {
    return getFilteredPlanetaryEvents({
      year: selectedYear,
      category: selectedCategory,
      timeframe: selectedTimeframe,
      searchQuery,
      kundliData,
      currentDate: new Date(),
    });
  }, [selectedYear, selectedCategory, selectedTimeframe, searchQuery, kundliData]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedTimeframe('all');
    setSelectedYear('all');
    setSearchQuery('');
  };

  const handlePrint = () => {
    window.print();
  };

  // Stats calculation
  const totalCount = events.length;
  const ingressCount = events.filter((e) => e.category === 'ingress').length;
  const eclipseCount = events.filter((e) => e.category === 'eclipse').length;
  const retrogradeCount = events.filter((e) => e.category === 'retrograde').length;

  const getImpactBadgeClass = (rating) => {
    switch (rating) {
      case 'highly_auspicious':
        return 'glass-badge-success font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-500/30';
      case 'auspicious':
      case 'favorable':
        return 'glass-badge-warning text-[#b85d19] dark:text-[#e6a86c] border border-amber-500/30';
      case 'caution':
        return 'glass-badge-danger text-rose-800 dark:text-rose-300 border border-rose-500/30';
      default:
        return 'glass-pill text-[#544d44] dark:text-[#c4b9aa]';
    }
  };

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'ingress':
        return 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/20';
      case 'eclipse':
        return 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/20';
      case 'retrograde':
        return 'bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-500/20';
      case 'combustion':
        return 'bg-orange-500/15 text-orange-800 dark:text-orange-300 border border-orange-500/20';
      case 'conjunction':
        return 'bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-500/20';
      default:
        return 'bg-stone-500/15 text-stone-800 dark:text-stone-300 border border-stone-500/20';
    }
  };

  return (
    <div className="rounded-xl glass-panel p-3 sm:p-6 shadow-sm space-y-5 sm:space-y-6 print:border-none print:p-0 print:bg-white">
      {/* Printable Header (Visible Only in Print) */}
      <div className="hidden print:block text-center border-b-2 border-[#8c7456] pb-3 mb-4">
        <span className="font-serif text-xs font-bold tracking-widest text-[#8c7456]">
          || ૐ શ્રી ગણેશાય નમઃ ||
        </span>
        <h1 className="font-serif text-2xl font-bold text-[#2c2825] mt-1">
          આગામી ગ્રહીય ઘટનાઓ & ગોચર પંચાંગ (Upcoming Planetary Events Dossier)
        </h1>
        <p className="text-xs text-[#544d44] mt-0.5">
          ખગોળીય રાશિ પરિવર્તન, વક્રી-માર્ગી ગ્રહો, સૂર્ય-ચંદ્ર ગ્રહણ અને વ્યક્તિગત પ્રભાવ
        </p>
      </div>

      {/* Screen Header & Main Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e6dfd3]/80 pb-4 print:hidden">
        <div>
          <h2 className="text-lg sm:text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
            <Orbit className="h-5 w-5 text-[#b85d19]" />
            <span>આગામી ગ્રહીય ઘટનાઓ & ગોચર (Upcoming Planetary Events)</span>
          </h2>
          <p className="text-xs text-[#736a60]">
            રાશિ પરિવર્તન, વક્રી-માર્ગી ગ્રહો, સૂર્ય-ચંદ્ર ગ્રહણ અને તમારી કુંડળી પર વ્યક્તિગત
            પ્રભાવ
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearFilters}
            title="ફિલ્ટર્સ સાફ કરો (Clear Filters)"
            className="flex items-center gap-1.5 rounded-lg glass-card px-3 py-1.5 text-xs font-medium text-[#736a60] hover:text-[#802020] hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition shadow-2xs cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>ફિલ્ટર સાફ કરો (Clear)</span>
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

      {/* Filter & Controls Panel (Hidden in Print) */}
      <div className="rounded-xl glass-panel-accent p-4 shadow-2xs space-y-3.5 print:hidden">
        {/* Category Tabs (Scrollable on mobile) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {EVENT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'glass-button-dark text-[#f4ebd9] shadow-xs'
                  : 'glass-card text-[#544d44] hover:bg-white/80'
              }`}
            >
              {cat.label[lang] || cat.label.gu}
            </button>
          ))}
        </div>

        {/* Timeframe, Year & Search Input Bar */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-12 items-center">
          {/* Timeframe Chips */}
          <div className="sm:col-span-4 flex items-center gap-1.5">
            {[
              { id: 'all', label: 'બધા (All)' },
              { id: 'next30', label: '૩૦ દિવસ (30D)' },
              { id: 'next90', label: '૯૦ દિવસ (90D)' },
              { id: 'thisYear', label: 'આ વર્ષ (This Year)' },
            ].map((tf) => (
              <button
                key={tf.id}
                onClick={() => setSelectedTimeframe(tf.id)}
                className={`flex-1 rounded-md py-1 text-[11px] font-medium text-center transition cursor-pointer ${
                  selectedTimeframe === tf.id
                    ? 'glass-badge-warning font-bold shadow-2xs'
                    : 'glass-pill text-[#544d44] hover:bg-white/60'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>

          {/* Year Picker */}
          <div className="sm:col-span-3 flex items-center gap-1.5">
            <span className="text-xs font-medium text-[#736a60] shrink-0">વર્ષ (Year):</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="flex-1 rounded-lg glass-input px-2.5 py-1.5 text-xs font-mono text-[#2c2825] focus:outline-none"
            >
              <option value="all">તમામ વર્ષ (All Years)</option>
              {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Search Box with Clear Button */}
          <div className="sm:col-span-5 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ગ્રહ, રાશિ, ગ્રહણ કે ઘટના શોધો..."
              className="w-full rounded-lg glass-input pl-8 pr-8 py-1.5 text-xs text-[#2c2825] focus:outline-none"
            />
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-[#736a60] pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                title="Clear Search"
                aria-label="Clear Search"
                className="absolute right-2.5 top-1.5 h-5 w-5 flex items-center justify-center rounded-full text-[#736a60] hover:text-[#2c2825] transition cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Statistics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs print:grid-cols-4">
        <div className="rounded-xl glass-card p-3 flex items-center gap-3 shadow-2xs">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300">
            <Orbit className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#736a60] block">કુલ ઘટનાઓ (Total)</span>
            <strong className="font-mono text-sm text-[#2c2825]">{totalCount}</strong>
          </div>
        </div>

        <div className="rounded-xl glass-card p-3 flex items-center gap-3 shadow-2xs">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#736a60] block">રાશિ ગોચર (Ingress)</span>
            <strong className="font-mono text-sm text-[#2c2825]">{ingressCount}</strong>
          </div>
        </div>

        <div className="rounded-xl glass-card p-3 flex items-center gap-3 shadow-2xs">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/15 text-rose-700 dark:text-rose-300">
            <Flame className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#736a60] block">સૂર્ય/ચંદ્ર ગ્રહણ (Eclipses)</span>
            <strong className="font-mono text-sm text-[#2c2825]">{eclipseCount}</strong>
          </div>
        </div>

        <div className="rounded-xl glass-card p-3 flex items-center gap-3 shadow-2xs">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15 text-blue-700 dark:text-blue-300">
            <RotateCcw className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#736a60] block">વક્રી / માર્ગી (Motion)</span>
            <strong className="font-mono text-sm text-[#2c2825]">{retrogradeCount}</strong>
          </div>
        </div>
      </div>

      {/* Events List Cards */}
      {events.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#8c7456]/40 p-8 text-center space-y-3">
          <Orbit className="h-8 w-8 text-[#8c7456] mx-auto opacity-50" />
          <h3 className="font-serif text-base font-bold text-[#2c2825]">
            કોઈ ગ્રહીય ઘટના મળી નથી (No Events Found)
          </h3>
          <p className="text-xs text-[#736a60] max-w-md mx-auto">
            પસંદ કરેલ ફિલ્ટર્સ કે શોધ શબ્દ માટે કોઈ પરિણામ મળ્યું નથી. તમામ ઘટનાઓ જોવા માટે ફિલ્ટર્સ
            સાફ કરો.
          </p>
          <button
            onClick={handleClearFilters}
            className="rounded-lg glass-button-dark px-4 py-2 text-xs font-bold text-[#f4ebd9] transition cursor-pointer"
          >
            ફિલ્ટર્સ સાફ કરો (Reset Filters)
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((evt, idx) => {
            const isToday = evt.timeStatus === 'today';
            const isUpcoming = evt.timeStatus === 'upcoming';

            return (
              <div
                key={evt.id || idx}
                className={`rounded-xl border transition p-4 sm:p-5 shadow-xs space-y-3 ${
                  isToday
                    ? 'border-[#b85d19] bg-[#fff8ee] dark:bg-[#281b10] ring-1.5 ring-[#b85d19]'
                    : isUpcoming && evt.diffDays <= 30
                      ? 'border-[#8c7456]/50 glass-panel-accent'
                      : 'border-[#e6dfd3]/80 glass-panel'
                }`}
              >
                {/* Event Header: Date, Countdown Badge & Category */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e6dfd3]/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl glass-button-dark font-serif text-lg font-bold text-[#e6a86c]">
                      {evt.planetSymbol || '♃'}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-[#2c2825]">
                          {evt.date}
                        </span>
                        <span className="font-mono text-xs text-[#736a60]">({evt.time} IST)</span>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold inline-block mt-0.5 ${getCategoryBadgeClass(evt.category)}`}
                      >
                        {evt.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Countdown Badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-lg font-mono font-bold shadow-2xs ${
                        isToday
                          ? 'glass-badge-danger animate-pulse-glow'
                          : isUpcoming
                            ? evt.diffDays <= 30
                              ? 'glass-badge-warning'
                              : 'glass-pill text-[#544d44]'
                            : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      {evt.daysLabel}
                    </span>
                  </div>
                </div>

                {/* Event Title & Sign Shift Transition */}
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#b85d19]">
                    {evt.title[lang] || evt.title.gu || evt.title.en}
                  </h3>

                  {evt.fromSign && evt.toSign && (
                    <div className="flex items-center gap-2 text-xs text-[#544d44] font-medium mt-1">
                      <span className="rounded glass-pill px-2 py-0.5 font-mono">
                        {evt.fromSign}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#b85d19]" />
                      <span className="rounded glass-badge-warning px-2 py-0.5 font-mono font-bold">
                        {evt.toSign}
                      </span>
                    </div>
                  )}

                  <p className="text-xs text-[#2c2825] leading-relaxed mt-2">
                    {evt.description[lang] || evt.description.gu || evt.description.en}
                  </p>
                </div>

                {/* Personal Kundli Impact Dossier (Rendered when kundliData is available) */}
                {kundliData && evt.personalImpact && (
                  <div className="rounded-xl border border-[#b85d19]/25 bg-[#faf5ec]/70 dark:bg-[#201c18] p-3.5 sm:p-4 space-y-2 mt-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e6dfd3]/80 pb-2">
                      <div className="flex items-center gap-2">
                        <Compass className="h-4 w-4 text-[#b85d19]" />
                        <span className="font-serif text-xs font-bold text-[#2c2825]">
                          તમારી કુંડળી પર વ્યક્તિગત પ્રભાવ (Personal Kundli Impact):
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {evt.personalImpact.houseFromMoon && (
                          <span className="text-[10px] font-mono font-semibold text-[#736a60]">
                            ચંદ્રથી {evt.personalImpact.houseFromMoon}મું સ્થાન • લગ્નથી{' '}
                            {evt.personalImpact.houseFromLagna}મું
                          </span>
                        )}
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-bold ${getImpactBadgeClass(evt.personalImpact.rating)}`}
                        >
                          {evt.personalImpact.ratingText[lang] || evt.personalImpact.ratingText.gu}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#2c2825] leading-relaxed">
                      {evt.personalImpact.guidance[lang] ||
                        evt.personalImpact.guidance.gu ||
                        evt.personalImpact.guidance.en}
                    </p>

                    {evt.personalImpact.remedy && (
                      <div className="flex items-start gap-1.5 text-[11px] text-[#7a4e1d] dark:text-[#e0a86c] pt-1">
                        <Sparkles className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                        <span>
                          <strong>શાસ્ત્રીય ઉપાય:</strong>{' '}
                          {evt.personalImpact.remedy[lang] ||
                            evt.personalImpact.remedy.gu ||
                            evt.personalImpact.remedy.en}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
