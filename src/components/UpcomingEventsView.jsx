import React, { useState, useMemo } from 'react';
import { Button, Card, Chip } from '@heroui/react';
import { EVENT_CATEGORIES, getFilteredPlanetaryEvents } from '../engine/upcomingEvents.js';
import {
  Orbit,
  Sparkles,
  Calendar,
  Clock,
  Search,
  RotateCcw,
  X,
  Printer,
  Flame,
  ArrowRight,
  Compass,
  CalendarRange,
} from 'lucide-react';

export default function UpcomingEventsView({ kundliData, t, lang = 'gu' }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const events = useMemo(() => {
    return getFilteredPlanetaryEvents({
      year: selectedYear,
      category: selectedCategory,
      timeframe: selectedTimeframe,
      customStartDate,
      customEndDate,
      searchQuery,
      kundliData,
      currentDate: new Date(),
    });
  }, [
    selectedYear,
    selectedCategory,
    selectedTimeframe,
    customStartDate,
    customEndDate,
    searchQuery,
    kundliData,
  ]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedTimeframe('all');
    setSelectedYear('all');
    setCustomStartDate('');
    setCustomEndDate('');
    setSearchQuery('');
  };

  const handleClearDateRange = () => {
    setCustomStartDate('');
    setCustomEndDate('');
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
        return 'glass-pill text-[var(--text-secondary)]';
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
    <Card className="rounded-2xl glass-panel p-3 sm:p-6 shadow-sm space-y-5 sm:space-y-6 print:border-none print:p-0 print:bg-white border border-[var(--border-gold)]">
      {/* Printable Header (Visible Only in Print) */}
      <div className="hidden print:block text-center border-b-2 border-[#8c7456] pb-3 mb-4">
        <span className="font-serif text-xs font-bold tracking-widest text-[#8c7456]">
          || ૐ શ્રી ગણેશાય નમઃ ||
        </span>
        <h1 className="font-serif text-2xl font-bold text-[#2c2825] mt-1">
          આગામી ગ્રહીય ઘટનાઓ & ગોચર પંચાંગ (Upcoming Planetary Events Dossier)
        </h1>
        <p className="text-xs text-[#544d44] mt-0.5">
          ખગોળીય રાશિ પરિવર્તન, આરંભ-સમાપ્તિ તારીખ, વક્રી-માર્ગી ગ્રહો, સૂર્ય-ચંદ્ર ગ્રહણ અને
          વ્યક્તિગત પ્રભાવ
        </p>
      </div>

      {/* Screen Header & Main Actions */}
      <Card.Header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4 p-0 print:hidden">
        <div>
          <Card.Title className="text-lg sm:text-xl font-medium text-[var(--text-primary)] font-serif flex items-center gap-2">
            <Orbit className="h-5 w-5 text-[var(--text-gold)]" />
            <span>આગામી ગ્રહીય ઘટનાઓ & ગોચર (Upcoming Planetary Events)</span>
          </Card.Title>
          <Card.Description className="text-xs text-[var(--text-muted)]">
            આરંભ & સમાપ્તિ તારીખ, રાશિ પરિવર્તન, વક્રી-માર્ગી ગ્રહો, સૂર્ય-ચંદ્ર ગ્રહણ અને વ્યક્તિગત
            પ્રભાવ
          </Card.Description>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            onPress={handleClearFilters}
            title="ફિલ્ટર્સ સાફ કરો (Clear Filters)"
            className="flex items-center gap-1.5 rounded-xl glass-card px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-rose-500 transition shadow-2xs cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>ફિલ્ટર સાફ કરો</span>
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

      {/* Filter & Controls Panel (Hidden in Print) */}
      <Card className="rounded-2xl glass-panel-accent p-4 shadow-2xs space-y-3.5 print:hidden border border-[var(--border-gold)]">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {EVENT_CATEGORIES.map((cat) => (
            <Button
              key={cat.id}
              type="button"
              onPress={() => setSelectedCategory(cat.id)}
              className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'glass-button-primary shadow-xs'
                  : 'glass-card text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] bg-transparent'
              }`}
            >
              {cat.label[lang] || cat.label.gu}
            </Button>
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
              <Button
                key={tf.id}
                type="button"
                onPress={() => {
                  setSelectedTimeframe(tf.id);
                  setCustomStartDate('');
                  setCustomEndDate('');
                }}
                className={`flex-1 rounded-lg py-1 text-[11px] font-medium text-center transition cursor-pointer ${
                  selectedTimeframe === tf.id && !customStartDate && !customEndDate
                    ? 'glass-button-primary font-bold shadow-2xs'
                    : 'glass-pill text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] bg-transparent'
                }`}
              >
                {tf.label}
              </Button>
            ))}
          </div>

          {/* Year Picker */}
          <div className="sm:col-span-3 flex items-center gap-1.5">
            <span className="text-xs font-medium text-[var(--text-muted)] shrink-0">
              વર્ષ (Year):
            </span>
            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setCustomStartDate('');
                setCustomEndDate('');
              }}
              className="flex-1 rounded-xl glass-input px-2.5 py-1.5 text-xs font-mono text-[var(--text-primary)] focus:outline-none"
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
              className="w-full rounded-xl glass-input pl-8 pr-8 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none"
            />
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-[var(--text-muted)] pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                title="Clear Search"
                aria-label="Clear Search"
                className="absolute right-2.5 top-1.5 h-5 w-5 flex items-center justify-center rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] transition cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Start Date & End Date Custom Range Picker Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-serif font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              <CalendarRange className="h-4 w-4 text-[var(--text-gold)]" />
              તારીખ ગાળો (Date Range):
            </span>

            {/* Start Date */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[var(--text-muted)]">શરૂઆત (From):</span>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="rounded-xl glass-input px-2 py-1 text-xs font-mono text-[var(--text-primary)] focus:outline-none"
              />
            </div>

            {/* End Date */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[var(--text-muted)]">સમાપ્તિ (To):</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="rounded-xl glass-input px-2 py-1 text-xs font-mono text-[var(--text-primary)] focus:outline-none"
              />
            </div>

            {(customStartDate || customEndDate) && (
              <button
                onClick={handleClearDateRange}
                title="Clear Date Range"
                className="flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-800 ml-1 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
                <span>તારીખ સાફ કરો</span>
              </button>
            )}
          </div>

          <span className="text-[11px] font-mono text-[var(--text-muted)]">
            {customStartDate && customEndDate
              ? `${customStartDate} થી ${customEndDate}`
              : 'તમામ સક્રિય ઘટનાઓ'}
          </span>
        </div>
      </Card>

      {/* Quick Statistics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs print:grid-cols-4">
        <Card className="rounded-xl glass-card p-3 flex flex-row items-center gap-3 shadow-2xs border border-[var(--border-subtle)]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300">
            <Orbit className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] text-[var(--text-muted)] block">કુલ ઘટનાઓ (Total)</span>
            <strong className="font-mono text-sm text-[var(--text-primary)]">{totalCount}</strong>
          </div>
        </Card>

        <Card className="rounded-xl glass-card p-3 flex flex-row items-center gap-3 shadow-2xs border border-[var(--border-subtle)]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] text-[var(--text-muted)] block">રાશિ ગોચર (Ingress)</span>
            <strong className="font-mono text-sm text-[var(--text-primary)]">{ingressCount}</strong>
          </div>
        </Card>

        <Card className="rounded-xl glass-card p-3 flex flex-row items-center gap-3 shadow-2xs border border-[var(--border-subtle)]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/15 text-rose-700 dark:text-rose-300">
            <Flame className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] text-[var(--text-muted)] block">
              સૂર્ય/ચંદ્ર ગ્રહણ (Eclipses)
            </span>
            <strong className="font-mono text-sm text-[var(--text-primary)]">{eclipseCount}</strong>
          </div>
        </Card>

        <Card className="rounded-xl glass-card p-3 flex flex-row items-center gap-3 shadow-2xs border border-[var(--border-subtle)]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15 text-blue-700 dark:text-blue-300">
            <RotateCcw className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] text-[var(--text-muted)] block">
              વક્રી / માર્ગી (Motion)
            </span>
            <strong className="font-mono text-sm text-[var(--text-primary)]">
              {retrogradeCount}
            </strong>
          </div>
        </Card>
      </div>

      {/* Events List Cards */}
      {events.length === 0 ? (
        <Card className="rounded-2xl border border-dashed border-[var(--border-gold)] p-8 text-center space-y-3 glass-panel">
          <Orbit className="h-8 w-8 text-[var(--text-gold)] mx-auto opacity-50" />
          <h3 className="font-serif text-base font-bold text-[var(--text-primary)]">
            કોઈ ગ્રહીય ઘટના મળી નથી (No Events Found)
          </h3>
          <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
            પસંદ કરેલ ફિલ્ટર્સ કે તારીખ ગાળા માટે કોઈ પરિણામ મળ્યું નથી. તમામ ઘટનાઓ જોવા માટે
            ફિલ્ટર્સ સાફ કરો.
          </p>
          <Button
            type="button"
            onPress={handleClearFilters}
            className="rounded-xl glass-button-primary px-4 py-2 text-xs font-bold text-[#0c0e17] transition cursor-pointer"
          >
            ફિલ્ટર્સ સાફ કરો (Reset Filters)
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {events.map((evt, idx) => {
            const isToday = evt.timeStatus === 'today' || evt.isOngoing;
            const isUpcoming = evt.timeStatus === 'upcoming';

            return (
              <Card
                key={evt.id || idx}
                className={`rounded-2xl border transition p-4 sm:p-5 shadow-xs space-y-3.5 ${
                  isToday
                    ? 'border-[var(--border-gold)] glass-panel-accent ring-1.5 ring-[var(--text-gold)]'
                    : isUpcoming && evt.diffStartDays <= 30
                      ? 'border-[var(--border-gold)] glass-panel-accent'
                      : 'border-[var(--border-subtle)] glass-panel'
                }`}
              >
                {/* Event Header: Date, Countdown Badge & Category */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl glass-button-primary font-serif text-xl font-bold text-[#0c0e17]">
                      {evt.planetSymbol || '♃'}
                    </div>

                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[var(--text-gold)] leading-tight">
                        {evt.title[lang] || evt.title.gu || evt.title.en}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Chip
                          className={`text-[10px] px-2 py-0.5 font-semibold inline-block ${getCategoryBadgeClass(evt.category)}`}
                        >
                          <Chip.Label>{evt.category.toUpperCase()}</Chip.Label>
                        </Chip>
                        {evt.durationLabel && (
                          <span className="text-[10px] font-mono text-[var(--text-muted)]">
                            સમયગાળો: {evt.durationLabel[lang] || evt.durationLabel.gu}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Countdown Badge */}
                  <div className="flex items-center gap-2">
                    <Chip
                      className={`text-xs px-2.5 py-1 font-mono font-bold shadow-2xs ${
                        isToday
                          ? 'glass-badge-danger animate-pulse-glow'
                          : isUpcoming
                            ? evt.diffStartDays <= 30
                              ? 'glass-badge-gold'
                              : 'glass-pill text-[var(--text-primary)]'
                            : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      <Chip.Label>{evt.daysLabel}</Chip.Label>
                    </Chip>
                  </div>
                </div>

                {/* Explicit Start Date & End Date Timeline Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 rounded-xl glass-panel-accent p-3 border border-[var(--border-subtle)]">
                  {/* Start Date */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 shrink-0">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-medium text-[var(--text-muted)] block">
                        આરંભ તારીખ (Start Date & Time):
                      </span>
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--text-primary)]">
                        <span>{evt.startDateFormatted}</span>
                        <span className="text-[11px] text-[var(--text-muted)]">
                          ({evt.startTimeFormatted} IST)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="flex items-center gap-2.5 border-t sm:border-t-0 sm:border-l border-[var(--border-subtle)] pt-2 sm:pt-0 sm:pl-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/15 text-rose-700 dark:text-rose-300 shrink-0">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-medium text-[var(--text-muted)] block">
                        સમાપ્તિ તારીખ (End Date & Time):
                      </span>
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--text-primary)]">
                        <span>{evt.endDateFormatted}</span>
                        <span className="text-[11px] text-[var(--text-muted)]">
                          ({evt.endTimeFormatted} IST)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sign Shift Transition & Description */}
                <div>
                  {evt.fromSign && evt.toSign && (
                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-medium mb-2">
                      <Chip className="glass-pill px-2 py-0.5 font-mono">
                        <Chip.Label>{evt.fromSign}</Chip.Label>
                      </Chip>
                      <ArrowRight className="h-3.5 w-3.5 text-[var(--text-gold)]" />
                      <Chip className="glass-badge-gold px-2 py-0.5 font-mono font-bold">
                        <Chip.Label>{evt.toSign}</Chip.Label>
                      </Chip>
                    </div>
                  )}

                  <p className="text-xs text-[var(--text-primary)] leading-relaxed">
                    {evt.description[lang] || evt.description.gu || evt.description.en}
                  </p>
                </div>

                {/* Personal Kundli Impact Dossier */}
                {kundliData && evt.personalImpact && (
                  <Card className="rounded-xl border border-[var(--border-gold)] bg-[var(--bg-pill)] p-3.5 sm:p-4 space-y-2 mt-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2">
                      <div className="flex items-center gap-2">
                        <Compass className="h-4 w-4 text-[var(--text-gold)]" />
                        <span className="font-serif text-xs font-bold text-[var(--text-primary)]">
                          તમારી કુંડળી પર વ્યક્તિગત પ્રભાવ (Personal Kundli Impact):
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {evt.personalImpact.houseFromMoon && (
                          <span className="text-[10px] font-mono font-semibold text-[var(--text-muted)]">
                            ચંદ્રથી {evt.personalImpact.houseFromMoon}મું સ્થાન • લગ્નથી{' '}
                            {evt.personalImpact.houseFromLagna}મું
                          </span>
                        )}
                        <Chip
                          className={`text-[10px] px-2 py-0.5 font-bold ${getImpactBadgeClass(evt.personalImpact.rating)}`}
                        >
                          <Chip.Label>
                            {evt.personalImpact.ratingText[lang] ||
                              evt.personalImpact.ratingText.gu}
                          </Chip.Label>
                        </Chip>
                      </div>
                    </div>

                    <p className="text-xs text-[var(--text-primary)] leading-relaxed">
                      {evt.personalImpact.guidance[lang] ||
                        evt.personalImpact.guidance.gu ||
                        evt.personalImpact.guidance.en}
                    </p>

                    {evt.personalImpact.remedy && (
                      <div className="flex items-start gap-1.5 text-[11px] text-[var(--text-gold)] pt-1">
                        <Sparkles className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                        <span>
                          <strong>શાસ્ત્રીય ઉપાય:</strong>{' '}
                          {evt.personalImpact.remedy[lang] ||
                            evt.personalImpact.remedy.gu ||
                            evt.personalImpact.remedy.en}
                        </span>
                      </div>
                    )}
                  </Card>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </Card>
  );
}
