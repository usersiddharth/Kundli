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
        className: 'spatial-badge-success',
        icon: '✓',
      };
    }
    if (typeKey === 'Chal') {
      return {
        label: lang === 'gu' ? 'સામાન્ય' : lang === 'hi' ? 'सामान्य' : 'Neutral',
        className: 'spatial-badge-gold',
        icon: '⚡',
      };
    }
    return {
      label: lang === 'gu' ? 'અશુભ' : lang === 'hi' ? 'अशुभ' : 'Inauspicious',
      className: 'spatial-badge-danger',
      icon: '⚠',
    };
  };

  return (
    <div className="rounded-2xl spatial-panel p-4 sm:p-6 space-y-6 print:border-none print:p-0 print:bg-white border border-[var(--border-subtle)]">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[var(--text-gold)] shrink-0" aria-hidden="true" />
            <h2
              className="text-lg sm:text-xl font-medium tracking-tight text-[var(--text-primary)]"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              દૈનિક ચોઘડિયા અને શુભ મુહૂર્ત (Daily Choghadiya)
            </h2>
          </div>
          <p
            className="text-xs text-[var(--text-muted)] mt-0.5"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            વાસ્તવિક વૈદિક દિવસ અને રાત્રિના ચોઘડિયા સમયગાળો
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
            <span>દિવસના ચોઘડિયા (Day)</span>
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
            <span>રાત્રિના ચોઘડિયા (Night)</span>
          </button>
        </div>
      </div>

      {/* ── Rahu Kaal Alert Banner ── */}
      {chData.rahuKaal && (
        <div
          className="flex flex-wrap items-center justify-between rounded-xl p-3.5 text-xs font-medium border transition"
          style={{
            background: 'rgba(239, 68, 68, 0.08)',
            borderColor: 'rgba(239, 68, 68, 0.25)',
            boxShadow: '0 0 16px rgba(239, 68, 68, 0.08)',
          }}
        >
          <div className="flex items-center gap-2.5 text-rose-300">
            <ShieldAlert className="h-4 w-4 shrink-0 text-rose-400" aria-hidden="true" />
            <span>
              આજનો રાહુ કાળ (Rahu Kaal):{' '}
              <strong className="font-mono text-rose-200 ml-1 font-bold">{chData.rahuKaal}</strong>
              <span className="ml-2 font-bold text-[var(--text-gold)]">
                [સ્લોટ #{chData.rahuKaalSlotNumber}]
              </span>
              <span className="ml-2 text-[var(--text-secondary)] hidden md:inline">
                — વૈદિક નિયમ: રાહુ કાળ દરમિયાન ગમે તેટલું શુભ ચોઘડિયું હોય તો પણ નવું શુભ કાર્ય શરૂ
                કરવું વર્જિત છે.
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
                  ? 'border-rose-500/40 ring-1 ring-rose-500/30'
                  : isCurrent
                    ? 'spatial-card-gold ring-1 ring-[var(--border-gold-glow)]'
                    : 'spatial-card'
              }`}
              style={{
                background: isRahuKaal
                  ? 'rgba(40, 15, 25, 0.75)'
                  : isCurrent
                    ? 'rgba(28, 24, 48, 0.85)'
                    : 'rgba(20, 20, 42, 0.7)',
                boxShadow: isRahuKaal
                  ? '0 4px 20px rgba(239, 68, 68, 0.15), var(--shadow-sm)'
                  : isCurrent
                    ? 'var(--shadow-gold-glow)'
                    : 'var(--shadow-sm)',
              }}
            >
              {/* Header Row: Slot Number + Badges */}
              <div className="flex items-start justify-between gap-2 border-b border-[var(--border-subtle)] pb-2.5">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider font-mono"
                      style={{ color: isRahuKaal ? '#fca5a5' : 'var(--text-muted)' }}
                    >
                      સ્લોટ #{slot.slotNumber || idx + 1}
                    </span>
                    {isCurrent && (
                      <span className="spatial-badge-gold px-2 py-0.5 rounded text-[9px] font-bold animate-pulse inline-flex items-center gap-1">
                        <Sparkles style={{ width: 9, height: 9 }} /> વર્તમાન
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-lg font-bold mt-1 tracking-tight"
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      color: isRahuKaal ? '#ffffff' : 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                    }}
                  >
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
                    <span
                      className="px-2 py-0.5 rounded text-[9px] font-bold border"
                      style={{
                        background: 'rgba(239, 68, 68, 0.25)',
                        borderColor: 'rgba(239, 68, 68, 0.5)',
                        color: '#fecaca',
                      }}
                    >
                      🔥 રાહુ કાળ
                    </span>
                  )}
                </div>
              </div>

              {/* Time Interval Block */}
              <div
                className="font-mono text-xs font-semibold px-3 py-2 rounded-xl border text-center transition"
                style={{
                  background: isRahuKaal ? 'rgba(239, 68, 68, 0.15)' : 'rgba(7, 7, 13, 0.65)',
                  color: isRahuKaal ? '#fca5a5' : 'var(--text-primary)',
                  borderColor: isRahuKaal ? 'rgba(239, 68, 68, 0.35)' : 'var(--border-default)',
                }}
              >
                {slot.start} – {slot.end}
              </div>

              {/* Description */}
              <div
                className="text-[11px] leading-relaxed space-y-1.5"
                style={{ color: isRahuKaal ? '#fca5a5' : 'var(--text-secondary)' }}
              >
                <p>{slot.desc?.[lang] || slot.desc?.gu || slot.nature}</p>
                {isRahuKaal && (
                  <div
                    className="mt-2 pt-2 border-t text-rose-300 font-semibold text-[10.5px] flex items-start gap-1.5"
                    style={{ borderColor: 'rgba(239, 68, 68, 0.25)' }}
                  >
                    <AlertTriangle
                      className="h-3.5 w-3.5 shrink-0 mt-0.5 text-rose-400"
                      aria-hidden="true"
                    />
                    <span>
                      રાહુ કાળ પ્રભાવ: અમૃત ચોઘડિયું હોવા છતાં આ સમયગાળામાં શુભ કાર્ય વર્જિત છે.
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
