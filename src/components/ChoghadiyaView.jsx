import React, { useState } from 'react';
import { calculateChoghadiya } from '../engine/choghadiya.js';
import { Clock, Sun, Moon, ShieldAlert, AlertTriangle, Sparkles } from 'lucide-react';

export default function ChoghadiyaView({ lang = 'gu' }) {
  const [activeMode, setActiveMode] = useState('day'); // 'day' | 'night'
  const chData = calculateChoghadiya(new Date());

  const slots = activeMode === 'day' ? chData.dayChoghadiyas : chData.nightChoghadiyas;

  const getStatusBadge = (typeKey) => {
    if (['Amrit', 'Shubh', 'Labh'].includes(typeKey)) {
      return {
        label: lang === 'gu' ? 'શુભ' : lang === 'hi' ? 'शुभ' : 'Auspicious',
        className: 'bg-[#eef8ee] text-[#166534] border-[#bbf7d0]',
        icon: '✓',
      };
    }
    if (typeKey === 'Chal') {
      return {
        label: lang === 'gu' ? 'સામાન્ય' : lang === 'hi' ? 'सामान्य' : 'Neutral',
        className: 'bg-[#fef9c3] text-[#854d0e] border-[#fde047]',
        icon: '⚡',
      };
    }
    return {
      label: lang === 'gu' ? 'અશુભ' : lang === 'hi' ? 'अशुभ' : 'Inauspicious',
      className: 'bg-[#fee2e2] text-[#991b1b] border-[#fecaca]',
      icon: '⚠',
    };
  };

  const topInvocation =
    lang === 'gu'
      ? '॥ ૐ શ્રી ગણેશાય નમઃ ॥ • દૈનિક ચોઘડિયા મુહૂર્ત પત્રિકા'
      : lang === 'hi'
        ? '॥ ॐ श्री गणेशाय नमः ॥ • दैनिक चौघड़िया मुहूर्त पत्रिका'
        : '॥ Om Sri Ganeshaya Namah ॥ • Daily Vedic Choghadiya Timings';

  return (
    <div className="rounded-2xl glass-panel p-4 sm:p-6 space-y-5 print:border-none print:p-0 print:bg-white border border-[var(--border-subtle)] shadow-xs">
      {/* ── Traditional Auspicious Invocation Header ── */}
      <div className="text-center font-serif text-xs font-semibold text-[#8b2500] tracking-widest pb-1 border-b border-[var(--border-subtle)] select-none">
        {topInvocation}
      </div>

      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#8b2500] shrink-0" aria-hidden="true" />
            <h2 className="text-lg sm:text-xl font-medium tracking-tight text-[var(--text-primary)] font-serif">
              {lang === 'gu'
                ? 'દૈનિક ચોઘડિયા અને શુભ મુહૂર્ત'
                : lang === 'hi'
                  ? 'दैनिक चौघड़िया एवं शुभ मुहूर्त'
                  : 'Daily Choghadiya & Auspicious Timings'}
            </h2>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            {lang === 'gu'
              ? 'શાસ્ત્રીય સૂર્યોદય-સૂર્યાસ્ત અનુસાર વાસ્તવિક દિવસ અને રાત્રિના ચોઘડિયા સમયગાળો'
              : lang === 'hi'
                ? 'सूर्योदय व सूर्यास्त आधारित यथार्थ दिन एवं रात्रि चौघड़िया'
                : 'Astronomically calculated day and night Vedic time periods based on local sunrise & sunset'}
          </p>
        </div>

        {/* Day / Night Switcher */}
        <div
          role="tablist"
          aria-label="Choghadiya time mode"
          className="flex items-center rounded-xl p-1 gap-1 spatial-pill"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeMode === 'day'}
            onClick={() => setActiveMode('day')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
              activeMode === 'day' ? 'spatial-btn-primary' : 'spatial-btn-ghost'
            }`}
          >
            <Sun className="h-3.5 w-3.5" aria-hidden="true" />
            <span>
              {lang === 'gu'
                ? 'દિવસના ચોઘડિયા'
                : lang === 'hi'
                  ? 'दिन के चौघड़िया'
                  : 'Day Choghadiya'}
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeMode === 'night'}
            onClick={() => setActiveMode('night')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
              activeMode === 'night' ? 'spatial-btn-primary' : 'spatial-btn-ghost'
            }`}
          >
            <Moon className="h-3.5 w-3.5" aria-hidden="true" />
            <span>
              {lang === 'gu'
                ? 'રાત્રિના ચોઘડિયા'
                : lang === 'hi'
                  ? 'रात्रि के चौघड़िया'
                  : 'Night Choghadiya'}
            </span>
          </button>
        </div>
      </div>

      {/* ── Rahu Kaal Alert Banner ── */}
      {chData.rahuKaal && (
        <div className="flex flex-wrap items-center justify-between rounded-xl p-3.5 text-xs font-medium border bg-[#fef2f2] border-[#fecaca] text-[#991b1b] shadow-2xs">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="h-4 w-4 shrink-0 text-[#dc2626]" aria-hidden="true" />
            <span>
              <strong>
                {lang === 'gu'
                  ? 'આજનો રાહુ કાળ:'
                  : lang === 'hi'
                    ? 'आज का राहु काल:'
                    : 'Today’s Rahu Kaal:'}
              </strong>{' '}
              <strong className="font-mono text-[#991b1b] ml-1 font-bold">{chData.rahuKaal}</strong>
              <span className="ml-2 font-bold text-[#8b2500]">
                [
                {lang === 'gu'
                  ? `સ્લોટ #${chData.rahuKaalSlotNumber}`
                  : lang === 'hi'
                    ? `स्लॉट #${chData.rahuKaalSlotNumber}`
                    : `Slot #${chData.rahuKaalSlotNumber}`}
                ]
              </span>
              <span className="ml-2 text-[#7f1d1d] hidden md:inline">
                {lang === 'gu'
                  ? '— વૈદિક શાસ્ત્ર નિયમ: રાહુ કાળ દરમિયાન અમૃત કે શુભ ચોઘડિયું હોય તો પણ નવું શુભ કાર્ય શરૂ કરવું વર્જિત છે.'
                  : lang === 'hi'
                    ? '— वैदिक नियम: राहु काल में अमृत या शुभ चौघड़िया होने पर भी नवीन शुभ कार्य वर्जित है।'
                    : '— Classical Vedic rule: Initiation of auspicious ventures is strictly avoided during Rahu Kaal.'}
              </span>
            </span>
          </div>
        </div>
      )}

      {/* ── Choghadiya Cards Grid ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {slots.map((slot, idx) => {
          const isCurrent = slot.isCurrent;
          const isRahuKaal = slot.isRahuKaal;
          const badge = getStatusBadge(slot.name);

          return (
            <div
              key={idx}
              className={`rounded-2xl p-4 text-xs space-y-3.5 border transition-all relative ${
                isRahuKaal
                  ? 'bg-[#fef5f4] border-[#f87171] ring-1 ring-[#f87171]/40 shadow-xs'
                  : isCurrent
                    ? 'bg-[#fffdf9] border-2 border-[#b85d19] ring-2 ring-[#b85d19]/25 shadow-md'
                    : 'bg-[#ffffff] border-[var(--border-subtle)] hover:border-[var(--border-default)] shadow-2xs'
              }`}
            >
              {/* Header Row: Slot Number + Badges */}
              <div className="flex items-start justify-between gap-2 border-b border-[var(--border-subtle)] pb-2.5">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider font-mono text-[var(--text-muted)]">
                      {lang === 'gu'
                        ? `સ્લોટ #${slot.slotNumber || idx + 1}`
                        : lang === 'hi'
                          ? `स्लॉट #${slot.slotNumber || idx + 1}`
                          : `Slot #${slot.slotNumber || idx + 1}`}
                    </span>
                    {isCurrent && (
                      <span className="spatial-badge-gold px-2 py-0.5 rounded text-[9px] font-bold inline-flex items-center gap-1">
                        <Sparkles style={{ width: 9, height: 9 }} />{' '}
                        {lang === 'gu' ? 'વર્તમાન' : lang === 'hi' ? 'वर्तमान' : 'Current'}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-medium font-serif mt-1 tracking-tight text-[var(--text-primary)]">
                    {slot.nameGu || slot.name}
                  </h3>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badge.className}`}
                  >
                    {badge.icon} {badge.label}
                  </span>
                  {isRahuKaal && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold border bg-[#fee2e2] border-[#fca5a5] text-[#991b1b]">
                      🔥 {lang === 'gu' ? 'રાહુ કાળ' : lang === 'hi' ? 'राहु काल' : 'Rahu Kaal'}
                    </span>
                  )}
                </div>
              </div>

              {/* Time Interval Block */}
              <div
                className={`font-mono text-xs font-semibold px-3 py-2 rounded-xl border text-center transition ${
                  isRahuKaal
                    ? 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]'
                    : isCurrent
                      ? 'bg-[#faeee0] text-[#731e00] border-[#e8b98e]'
                      : 'bg-[#faf6ee] text-[#1f1a16] border-[#e5dac6]'
                }`}
              >
                {slot.start} – {slot.end}
              </div>

              {/* Description */}
              <div className="text-[11px] leading-relaxed space-y-1.5 text-[var(--text-secondary)]">
                <p>{slot.desc?.[lang] || slot.desc?.gu || slot.nature}</p>
                {isRahuKaal && (
                  <div className="mt-2 pt-2 border-t border-[#fecaca] text-[#991b1b] font-medium text-[10.5px] flex items-start gap-1.5">
                    <AlertTriangle
                      className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#dc2626]"
                      aria-hidden="true"
                    />
                    <span>
                      {lang === 'gu'
                        ? 'રાહુ કાળ પ્રભાવ: શુભ ચોઘડિયું હોવા છતાં આ સમયગાળામાં શુભ કાર્ય વર્જિત છે.'
                        : lang === 'hi'
                          ? 'राहु काल प्रभाव: शुभ चौघड़िया होने पर भी इस कालखंड में शुभ कार्य वर्जित है।'
                          : 'Rahu Kaal influence: Auspicious deeds are prohibited during this interval.'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
