import React, { useState } from 'react';
import { calculateVimshottariDasha, calculateCurrentMicroDasha } from '../engine/dasha.js';
import { generateSookshmaPranaReading } from '../engine/dashaPredictions.js';
import {
  Clock,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Search,
  Info,
  Activity,
  Zap,
  HelpCircle,
  Share2,
  X,
} from 'lucide-react';

export default function DashaView({ kundliData, birthDate, t, lang = 'gu' }) {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [filterQuery, setFilterQuery] = useState('');
  const [activeTab, setActiveTab] = useState('current'); // 'current' | 'all' | 'guide'
  const [showInfoModal, setShowInfoModal] = useState(false);

  if (!kundliData || !birthDate) return null;

  const dashaList = calculateVimshottariDasha(kundliData, birthDate);
  const currentMicro = calculateCurrentMicroDasha(kundliData, birthDate, new Date());
  const microReading = generateSookshmaPranaReading(currentMicro, lang);

  const now = new Date();
  const nowStr = now.toISOString().split('T')[0];

  const filteredDashaList = dashaList.filter(
    (d) =>
      d.lord.toLowerCase().includes(filterQuery.toLowerCase()) ||
      (t[d.lord] && t[d.lord].toLowerCase().includes(filterQuery.toLowerCase())) ||
      d.startDate.includes(filterQuery) ||
      d.endDate.includes(filterQuery)
  );

  const handleShare = () => {
    if (navigator.share && microReading) {
      navigator
        .share({
          title: microReading.title[lang] || microReading.title.gu,
          text: microReading.narrative,
        })
        .catch(() => {});
    }
  };

  return (
    <div className="rounded-2xl glass-panel p-6 shadow-sm space-y-6 print:border-none print:p-0 print:bg-white border border-[var(--border-subtle)]">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-medium text-[var(--text-primary)] font-serif flex items-center gap-2">
            <Clock className="h-5 w-5 text-[var(--text-gold)]" aria-hidden="true" />
            <span>વિંશોત્તરી ૫-સ્તરીય દશા પ્રણાલી (Vimshottari 5-tier dasha)</span>
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            મહાદશા, અંતર્દશા, પ્રત્યંતર્દશા, સૂક્ષ્મ દશા અને પ્રાણ દશા
          </p>
        </div>

        {/* Tab Switcher */}
        <div role="tablist" aria-label="Dasha views" className="flex rounded-xl glass-pill p-1">
          <button
            role="tab"
            aria-selected={activeTab === 'current'}
            onClick={() => setActiveTab('current')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition focus-visible:outline-hidden cursor-pointer ${
              activeTab === 'current'
                ? 'glass-button-primary shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Activity className="h-3.5 w-3.5" aria-hidden="true" />
            <span>લાઈવ સૂક્ષ્મ અને પ્રાણ દશા (Live micro)</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition focus-visible:outline-hidden cursor-pointer ${
              activeTab === 'all'
                ? 'glass-button-primary shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            <span>સંપૂર્ણ ૧૨૦ વર્ષ ટાઈમલાઈન (All dashas)</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'guide'}
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition focus-visible:outline-hidden cursor-pointer ${
              activeTab === 'guide'
                ? 'glass-button-primary shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Info className="h-3.5 w-3.5" aria-hidden="true" />
            <span>શાસ્ત્રીય માર્ગદર્શન (Vedic guide)</span>
          </button>
        </div>
      </div>

      {/* 1. LIVE 5-TIER CURRENT DASHA COCKPIT */}
      {activeTab === 'current' && currentMicro && (
        <div className="space-y-6 animate-fade-in-up">
          {/* =====================================================================
              SOOKSHMA-PRANA (VEDIC) PERSONALIZED FORECAST CARD (MATCHING USER REF)
              ===================================================================== */}
          {microReading && (
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-white/5 p-6 shadow-md relative overflow-hidden transition-all hover:shadow-lg space-y-4">
              {/* Card Header with Question Mark / Share Icons */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[var(--text-gold)] tracking-tight flex items-center gap-2">
                    {microReading.title[lang] || microReading.title.gu}
                  </h3>
                  <p className="font-sans text-sm font-semibold text-[#c59b27] mt-1 flex items-center gap-1.5">
                    <span>
                      {lang === 'hi' ? 'तक लागू:' : lang === 'en' ? 'Valid until:' : 'સુધી માન્ય:'}
                    </span>
                    <strong className="font-mono text-[#91450c]">
                      {microReading.validUntil.formatted}
                    </strong>
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                  <button
                    type="button"
                    onClick={() => setShowInfoModal(!showInfoModal)}
                    title="Vedic Sookshma-Prana Info"
                    aria-label="Info about Sookshma-Prana Dasha"
                    className="flex h-9 w-9 items-center justify-center rounded-full glass-pill hover:bg-[#b85d19] hover:text-white transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19]"
                  >
                    <HelpCircle className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    title="Share forecast"
                    aria-label="Share forecast"
                    className="flex h-9 w-9 items-center justify-center rounded-full glass-pill hover:bg-[#b85d19] hover:text-white transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19]"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Forecast Paragraph */}
              <p className="text-sm text-[var(--text-primary)] leading-relaxed text-justify sm:text-left font-sans">
                {microReading.narrative}
              </p>

              {/* Active Planet Badges Bar */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--border-subtle)]">
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  {lang === 'hi'
                    ? 'सक्रिय ग्रह प्रभाव:'
                    : lang === 'en'
                      ? 'Active Influence:'
                      : 'સક્રિય ગ્રહ પ્રભાવ:'}
                </span>
                <span className="rounded-lg glass-badge-gold px-2.5 py-1 text-xs font-bold text-[#8a6a12]">
                  સૂક્ષ્મ દશા: {t[microReading.sookshmaLord] || microReading.sookshmaLord} (
                  {microReading.primaryTheme})
                </span>
                <span className="rounded-lg glass-badge-warning px-2.5 py-1 text-xs font-bold text-[#a34e0e]">
                  પ્રાણ દશા: {t[microReading.pranaLord] || microReading.pranaLord} (
                  {microReading.hourlyFocus})
                </span>
              </div>
            </div>
          )}

          {/* Main 5-Tier Chain Banner */}
          <div className="rounded-xl glass-panel-accent p-5 shadow-xs space-y-4 border border-[#b85d19]/30">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)]/80 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[var(--text-gold)] animate-pulse" aria-hidden="true" />
                <h3 className="font-serif text-base font-bold text-[var(--text-primary)]">
                  આ ક્ષણે સક્રિય ૫-સ્તરીય દશા શૃંખલા (Active 5-Tier Dasha Hierarchy)
                </h3>
              </div>
              <span className="font-mono text-xs font-semibold text-[var(--text-gold)] bg-white/5 px-2.5 py-1 rounded-md border border-[var(--border-subtle)]">
                {currentMicro.targetDateTimeFormatted}
              </span>
            </div>

            {/* Visual Step-by-Step Chain */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {/* 1. Mahadasha */}
              <div className="rounded-xl glass-card p-3.5 space-y-1.5 border-l-4 border-l-[#b85d19]">
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  ૧. મહાદશા (Mahadasha)
                </span>
                <h4 className="font-serif text-base font-bold text-[var(--text-gold)]">
                  {t[currentMicro.mahadasha.lord] || currentMicro.mahadasha.lord}
                </h4>
                <div className="text-[10px] font-mono text-[var(--text-secondary)]">
                  {currentMicro.mahadasha.startDate} ➔ {currentMicro.mahadasha.endDate}
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-[#b85d19] h-full rounded-full"
                    style={{ width: `${currentMicro.mahadasha.progress}%` }}
                  />
                </div>
                <span className="text-[9px] text-[var(--text-muted)] block text-right font-mono">
                  {currentMicro.mahadasha.progress}% પૂર્ણ
                </span>
              </div>

              {/* 2. Antardasha */}
              <div className="rounded-xl glass-card p-3.5 space-y-1.5 border-l-4 border-l-[#c59b27]">
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  ૨. અંતર્દશા (Antardasha)
                </span>
                <h4 className="font-serif text-base font-bold text-[var(--text-gold)]">
                  {t[currentMicro.antardasha.lord] || currentMicro.antardasha.lord}
                </h4>
                <div className="text-[10px] font-mono text-[var(--text-secondary)]">
                  {currentMicro.antardasha.startDate} ➔ {currentMicro.antardasha.endDate}
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-[#c59b27] h-full rounded-full"
                    style={{ width: `${currentMicro.antardasha.progress}%` }}
                  />
                </div>
                <span className="text-[9px] text-[var(--text-muted)] block text-right font-mono">
                  {currentMicro.antardasha.progress}% પૂર્ણ
                </span>
              </div>

              {/* 3. Pratyantardasha */}
              <div className="rounded-xl glass-card p-3.5 space-y-1.5 border-l-4 border-l-[#285e20]">
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  ૩. પ્રત્યંતર્દશા (Pratyantar)
                </span>
                <h4 className="font-serif text-base font-bold text-[#1f5218]">
                  {t[currentMicro.pratyantardasha.lord] || currentMicro.pratyantardasha.lord}
                </h4>
                <div className="text-[10px] font-mono text-[var(--text-secondary)]">
                  {currentMicro.pratyantardasha.startDate} ➔ {currentMicro.pratyantardasha.endDate}
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-[#285e20] h-full rounded-full"
                    style={{ width: `${currentMicro.pratyantardasha.progress}%` }}
                  />
                </div>
                <span className="text-[9px] text-[var(--text-muted)] block text-right font-mono">
                  {currentMicro.pratyantardasha.progress}% પૂર્ણ
                </span>
              </div>

              {/* 4. Sookshma Dasha */}
              <div className="rounded-xl glass-card p-3.5 space-y-1.5 border-l-4 border-l-[#91450c] bg-[#fffaf2]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[var(--text-gold)] uppercase tracking-wider block">
                    ૪. સૂક્ષ્મ દશા (Sookshma)
                  </span>
                  <span className="rounded glass-badge-warning px-1 text-[8px] font-bold font-mono">
                    {currentMicro.sookshmaDasha.durationDays} દિવસ
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-[var(--text-gold)]">
                  {t[currentMicro.sookshmaDasha.lord] || currentMicro.sookshmaDasha.lord}
                </h4>
                <div className="text-[9.5px] font-mono text-[var(--text-secondary)]">
                  {currentMicro.sookshmaDasha.startDateFormatted.split(' ')[0]} ➔{' '}
                  {currentMicro.sookshmaDasha.endDateFormatted.split(' ')[0]}
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-[#b85d19] h-full rounded-full"
                    style={{ width: `${currentMicro.sookshmaDasha.progress}%` }}
                  />
                </div>
                <span className="text-[9px] text-[var(--text-muted)] block text-right font-mono">
                  {currentMicro.sookshmaDasha.progress}% પૂર્ણ
                </span>
              </div>

              {/* 5. Prana Dasha (Tiniest Dasa) */}
              <div className="rounded-xl glass-card p-3.5 space-y-1.5 border-l-4 border-l-[#802020] bg-[#fcf5f5] ring-1 ring-[#802020]/20">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#802020] uppercase tracking-wider block">
                    ૫. પ્રાણ દશા (Prana Dasha)
                  </span>
                  <span className="rounded bg-[#802020] text-white px-1.5 text-[8px] font-bold font-mono">
                    {currentMicro.pranaDasha.durationMinutes} મિનિટ
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-[#802020] flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-[var(--text-gold)] animate-pulse" aria-hidden="true" />
                  {t[currentMicro.pranaDasha.lord] || currentMicro.pranaDasha.lord}
                </h4>
                <div className="text-[9px] font-mono text-[var(--text-secondary)] truncate">
                  {currentMicro.pranaDasha.startDateFormatted.split(' ')[1]} ➔{' '}
                  {currentMicro.pranaDasha.endDateFormatted.split(' ')[1]}
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-[#802020] h-full rounded-full"
                    style={{ width: `${currentMicro.pranaDasha.progress}%` }}
                  />
                </div>
                <span className="text-[9px] text-[#802020] block text-right font-mono font-bold">
                  {currentMicro.pranaDasha.progress}% પૂર્ણ
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Sookshma & Prana Slots Tables */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Sookshma Timeline Slots */}
            <div className="rounded-xl glass-panel p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)]/80 pb-2">
                <h4 className="font-serif text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[var(--text-gold)]" aria-hidden="true" />
                  સૂક્ષ્મ દશા સમયગાળો (Sookshma Dasha: ~૬.૫ કલાક થી ૩૩ દિવસ)
                </h4>
                <span className="text-[10px] text-[var(--text-muted)]">પ્રત્યંતર્દશા અંતર્ગત</span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {currentMicro.sookshmaDasha.allSlots.map((sd, sIdx) => {
                  const isCurrent = sd.lord === currentMicro.sookshmaDasha.lord;
                  return (
                    <div
                      key={sIdx}
                      className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition ${
                        isCurrent
                          ? 'glass-panel-accent border-[#b85d19] font-bold text-[var(--text-gold)] shadow-2xs'
                          : 'glass-card text-[var(--text-primary)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[var(--text-muted)]">#{sIdx + 1}</span>
                        <span className="font-medium">{t[sd.lord] || sd.lord}</span>
                        {isCurrent && (
                          <span className="rounded-full glass-badge-warning px-1.5 py-0.2 text-[8px] font-bold">
                            ● સક્રિય
                          </span>
                        )}
                      </div>

                      <div className="text-right font-mono text-[10.5px]">
                        <span className="text-[var(--text-secondary)]">
                          {sd.startDateFormatted} ➔ {sd.endDateFormatted}
                        </span>
                        <span className="ml-2 text-[var(--text-muted)]">({sd.durationDays} દિવસ)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prana Timeline Slots */}
            <div className="rounded-xl glass-panel p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)]/80 pb-2">
                <h4 className="font-serif text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-[#802020]" aria-hidden="true" />
                  પ્રાણ દશા સમયગાળો (Prana Dasha: ૨૦ મિનિટ થી ~૬.૫ કલાક)
                </h4>
                <span className="text-[10px] text-[#802020] font-semibold">સૌથી સૂક્ષ્મ ગણતરી</span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {currentMicro.pranaDasha.allSlots.map((pr, pIdx) => {
                  const isCurrent = pr.lord === currentMicro.pranaDasha.lord;
                  return (
                    <div
                      key={pIdx}
                      className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition ${
                        isCurrent
                          ? 'bg-[#fcf1f1] border-[#802020] font-bold text-[#802020] shadow-2xs'
                          : 'glass-card text-[var(--text-primary)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[var(--text-muted)]">#{pIdx + 1}</span>
                        <span className="font-medium">{t[pr.lord] || pr.lord}</span>
                        {isCurrent && (
                          <span className="rounded-full bg-[#802020] text-white px-1.5 py-0.2 text-[8px] font-bold animate-pulse">
                            ● સક્રિય
                          </span>
                        )}
                      </div>

                      <div className="text-right font-mono text-[10.5px]">
                        <span className="text-[var(--text-secondary)]">
                          {pr.startDateFormatted} ➔ {pr.endDateFormatted}
                        </span>
                        <span className="ml-2 font-bold text-[var(--text-gold)]">
                          ({pr.durationMinutes} મિનિટ)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. FULL 120-YEAR VIMSHOTTARI TIMELINE */}
      {activeTab === 'all' && (
        <div className="space-y-4 animate-fade-in-up">
          {/* Search Filter Bar */}
          <div className="flex items-center justify-between gap-4 pb-2">
            <p className="text-xs text-[var(--text-muted)]">
              જન્મ નક્ષત્ર આધારિત ૧૨૦ વર્ષીય મહાદશા અને અંતર્દશા શૃંખલા
            </p>

            <div className="relative">
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search planet or year..."
                className="rounded-lg glass-input pl-8 pr-8 py-1.5 text-xs text-[var(--text-primary)] focus:outline-hidden focus:ring-2 focus:ring-[#b85d19]"
              />
              <Search
                className="absolute left-2.5 top-2 h-3.5 w-3.5 text-[var(--text-muted)]"
                aria-hidden="true"
              />
              {filterQuery && (
                <button
                  type="button"
                  onClick={() => setFilterQuery('')}
                  title="Clear Search"
                  aria-label="Clear Search"
                  className="absolute right-2 top-1.5 h-5 w-5 flex items-center justify-center rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {filteredDashaList.map((d, idx) => {
              const isActive = nowStr >= d.startDate && nowStr <= d.endDate;
              const isExpanded = expandedIndex === idx;

              return (
                <div
                  key={idx}
                  className={`rounded-xl border transition ${
                    isActive ? 'border-[#b85d19] glass-panel-accent shadow-xs' : 'glass-panel'
                  }`}
                >
                  {/* Header Bar */}
                  <button
                    type="button"
                    onClick={() => setExpandedIndex(isExpanded ? -1 : idx)}
                    className="flex w-full items-center justify-between p-4 text-left font-serif focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-[var(--text-muted)]" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-[var(--text-muted)]" />
                      )}
                      <span className="text-base font-semibold text-[var(--text-primary)]">
                        {t[d.lord] || d.lord} {t.mahadasha}
                      </span>
                      {isActive && (
                        <span className="rounded-full glass-badge-warning px-2.5 py-0.5 text-xs font-semibold text-[#a34e0e]">
                          ACTIVE
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 font-mono text-xs text-[var(--text-muted)]">
                      <span>
                        {d.startDate} ➔ {d.endDate}
                      </span>
                      <span className="font-semibold text-[var(--text-primary)]">{d.years} Yrs</span>
                    </div>
                  </button>

                  {/* Antardasha Tree */}
                  {isExpanded && (
                    <div className="border-t border-[var(--border-subtle)] bg-white/5 p-4 rounded-b-xl space-y-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                        {d.lord} {t.antardasha} Timeline & Pratyantar Breakdown
                      </h4>
                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                        {d.antardashas.map((sub, sIdx) => {
                          const isSubActive = nowStr >= sub.startDate && nowStr <= sub.endDate;
                          return (
                            <div
                              key={sIdx}
                              className={`rounded-lg border p-3 text-xs transition ${
                                isSubActive
                                  ? 'border-[#b85d19] bg-white/5 font-semibold text-[var(--text-gold)] shadow-xs ring-1 ring-[#b85d19]/40'
                                  : 'glass-card text-[var(--text-primary)] hover:border-[#b85d19]/60'
                              }`}
                            >
                              <div className="flex justify-between font-medium">
                                <span>{t[sub.lord] || sub.lord}</span>
                                <span className="font-mono text-[11px] font-semibold">
                                  {sub.years} y
                                </span>
                              </div>
                              <div className="mt-1 font-mono text-[10px] text-[var(--text-muted)]">
                                {sub.startDate} ➔ {sub.endDate}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. VEDIC GUIDANCE & PHILOSOPHICAL CARD */}
      {activeTab === 'guide' && (
        <div className="rounded-xl glass-panel p-6 space-y-5 animate-fade-in-up">
          <div className="border-b border-[var(--border-subtle)]/80 pb-3">
            <h3 className="font-serif text-lg font-bold text-[var(--text-gold)] flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[var(--text-gold)]" aria-hidden="true" />
              વૈદિક વિંશોત્તરી દશા પ્રણાલી: સૂક્ષ્મ અને પ્રાણ દશાનું રહસ્ય
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Micro-astrological timing for hourly and daily predictive precision
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 text-xs text-[var(--text-primary)] leading-relaxed">
            <div className="rounded-xl glass-card p-4 space-y-2 border-l-4 border-l-[#b85d19]">
              <h4 className="font-bold text-sm text-[var(--text-gold)]">સૂક્ષ્મ દશા (Sookshma Dasa)</h4>
              <p className="text-[var(--text-secondary)]">
                સૂક્ષ્મ દશાનો સમયગાળો <strong>૬.૫ કલાકથી લઈને ૩૩ દિવસ</strong> સુધીનો હોય છે.
                પ્રત્યંતર્દશાના સમયગાળાને સંબંધિત ગ્રહના દશા વર્ષ વડે ગુણીને ૧૨૦ વડે ભાગવાથી સૂક્ષ્મ
                દશા પ્રાપ્ત થાય છે.
              </p>
              <p className="text-[var(--text-muted)] text-[11px]">
                આ દશા આગામી થોડા દિવસો કે અઠવાડિયા દરમિયાન બનનારી મહત્વપૂર્ણ ઘટનાઓ, યાત્રાઓ, માનસિક
                સ્થિતિ અને તકોની ચોક્કસ આગાહી માટે અત્યંત ઉપયોગી છે.
              </p>
            </div>

            <div className="rounded-xl glass-card p-4 space-y-2 border-l-4 border-l-[#802020]">
              <h4 className="font-bold text-sm text-[#802020]">
                પ્રાણ દશા (Prana Dasa - The Tiniest Period)
              </h4>
              <p className="text-[var(--text-secondary)]">
                પ્રાણ દશા એ વિંશોત્તરી પદ્ધતિનો <strong>સૌથી સૂક્ષ્મ સમયગાળો</strong> છે, જેનો વ્યાપ{' '}
                <strong>૨૦ મિનિટથી લઈને ૬.૫ કલાક</strong> સુધીનો હોય છે. સૂક્ષ્મ દશાના સમયગાળાને
                ગ્રહ વર્ષ વડે ગુણી ૧૨૦ વડે ભાગવાથી પ્રાણ દશા મળે છે.
              </p>
              <p className="text-[var(--text-muted)] text-[11px]">
                પ્રાણ દશા વ્યક્તિના કલાકે-કલાકના મૂડ, તાત્કાલિક નિર્ણયો, ટેલિફોન કોલ્સ, આકસ્મિક
                મુલાકાતો અને ક્ષણિક ઘટનાઓની સૂક્ષ્મ આગાહી માટે સક્ષમ બનાવે છે.
              </p>
            </div>
          </div>

          {/* Mathematical Proportions Summary Table */}
          <div className="rounded-xl overflow-hidden border border-[var(--border-subtle)] glass-panel text-xs">
            <div className="grid grid-cols-4 bg-white/5 p-2.5 font-bold text-[var(--text-primary)] text-center">
              <span>દશા સ્તર (Tier)</span>
              <span>નામ (Name)</span>
              <span>સમયગાળો (Span)</span>
              <span>મુખ્ય ઉપયોગ (Predictive Scope)</span>
            </div>
            <div className="divide-y divide-[var(--border-subtle)] font-mono text-[11px] text-center">
              <div className="grid grid-cols-4 p-2 font-sans">
                <span className="font-bold font-mono">Level 1</span>
                <span>મહાદશા (Mahadasha)</span>
                <span className="font-mono">૬ થી ૨૦ વર્ષ</span>
                <span className="font-sans">જીવનનો મુખ્ય યુગ અને સામાન્ય દિશા</span>
              </div>
              <div className="grid grid-cols-4 p-2 font-sans bg-white/5">
                <span className="font-bold font-mono">Level 2</span>
                <span>અંતર્દશા (Antardasha)</span>
                <span className="font-mono">૨ માસ થી ૩.૩ વર્ષ</span>
                <span className="font-sans">વાર્ષિક પ્રગતિ, નોકરી, લગ્ન, સંબંધો</span>
              </div>
              <div className="grid grid-cols-4 p-2 font-sans">
                <span className="font-bold font-mono">Level 3</span>
                <span>પ્રત્યંતર્દશા (Pratyantar)</span>
                <span className="font-mono">૧.૫ દિવસ થી ૬ માસ</span>
                <span className="font-sans">મહિનાના ઉતાર-ચઢાવ અને યોજનાઓ</span>
              </div>
              <div className="grid grid-cols-4 p-2 font-sans bg-white/5">
                <span className="font-bold font-mono text-[var(--text-gold)]">Level 4</span>
                <span className="text-[var(--text-gold)] font-bold">સૂક્ષ્મ દશા (Sookshma)</span>
                <span className="font-mono font-bold text-[var(--text-gold)]">૬.૫ કલાક થી ૩૩ દિવસ</span>
                <span className="font-sans">થોડા દિવસોની મહત્વની ઘટનાઓ</span>
              </div>
              <div className="grid grid-cols-4 p-2 font-sans bg-[#fcf3f3]">
                <span className="font-bold font-mono text-[#802020]">Level 5</span>
                <span className="text-[#802020] font-bold">પ્રાણ દશા (Prana)</span>
                <span className="font-mono font-bold text-[#802020]">૨૦ મિનિટ થી ૬.૫ કલાક</span>
                <span className="font-sans font-bold text-[#802020]">
                  કલાકે-કલાકના પરિણામ અને ત્વરિત ઘટનાઓ
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
