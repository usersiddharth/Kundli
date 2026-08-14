import React, { useState } from 'react';
import { calculateChoghadiya } from '../engine/choghadiya.js';
import { Clock, Sun, Moon, ShieldAlert, AlertTriangle } from 'lucide-react';

export default function ChoghadiyaView({ lang = 'gu' }) {
  const [activeMode, setActiveMode] = useState('day'); // 'day' | 'night'
  const chData = calculateChoghadiya(new Date());

  const slots = activeMode === 'day' ? chData.dayChoghadiyas : chData.nightChoghadiyas;

  const getStatusBadge = (typeKey) => {
    if (['Amrit', 'Shubh', 'Labh'].includes(typeKey)) {
      return {
        label: lang === 'gu' ? '✅ શુભ' : lang === 'hi' ? '✅ शुभ' : '✅ Auspicious',
        className: 'glass-badge-success',
      };
    }
    if (typeKey === 'Chal') {
      return {
        label: lang === 'gu' ? '⚡ સામાન્ય' : lang === 'hi' ? '⚡ सामान्य' : '⚡ Neutral',
        className: 'glass-badge-gold',
      };
    }
    return {
      label: lang === 'gu' ? '⚠️ અશુભ' : lang === 'hi' ? '⚠️ अशुभ' : '⚠️ Inauspicious',
      className: 'glass-badge-danger',
    };
  };

  return (
    <div className="rounded-xl glass-panel p-6 shadow-sm space-y-6 print:border-none print:p-0 print:bg-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e6dfd3]/80 pb-4">
        <div>
          <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#b85d19]" aria-hidden="true" />
            <span>દૈનિક ચોઘડિયા અને શુભ મુહૂર્ત (Daily Choghadiya)</span>
          </h2>
          <p className="text-xs text-[#736a60] mt-0.5">
            વાસ્તવિક વૈદિક દિવસ અને રાત્રિના ચોઘડિયા સમયગાળો
          </p>
        </div>

        {/* Day / Night Switcher */}
        <div
          role="tablist"
          aria-label="Choghadiya Time Mode"
          className="flex rounded-lg glass-pill p-1"
        >
          <button
            role="tab"
            aria-selected={activeMode === 'day'}
            onClick={() => setActiveMode('day')}
            className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
              activeMode === 'day'
                ? 'glass-button-dark text-[#f4ebd9] shadow-xs'
                : 'text-[#544d44] hover:bg-white/60'
            }`}
          >
            <Sun className="h-3.5 w-3.5 text-[#e6a86c]" aria-hidden="true" />
            <span>દિવસના ચોઘડિયા (Day)</span>
          </button>

          <button
            role="tab"
            aria-selected={activeMode === 'night'}
            onClick={() => setActiveMode('night')}
            className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
              activeMode === 'night'
                ? 'glass-button-dark text-[#f4ebd9] shadow-xs'
                : 'text-[#544d44] hover:bg-white/60'
            }`}
          >
            <Moon className="h-3.5 w-3.5 text-[#e6a86c]" aria-hidden="true" />
            <span>રાત્રિના ચોઘડિયા (Night)</span>
          </button>
        </div>
      </div>

      {/* Rahu Kaal Alert Banner */}
      {chData.rahuKaal && (
        <div className="flex items-center justify-between rounded-lg glass-badge-danger px-4 py-3 text-xs font-medium shadow-2xs border border-[#802020]/20">
          <div className="flex items-center gap-2.5 text-[#802020]">
            <ShieldAlert className="h-4 w-4 shrink-0 text-[#802020]" aria-hidden="true" />
            <span>
              આજનો રાહુ કાળ (Rahu Kaal):{' '}
              <strong className="font-mono text-[#802020] ml-1">{chData.rahuKaal}</strong>
              <span className="ml-2 font-bold text-[#b85d19]">
                {' '}
                [સ્લોટ #{chData.rahuKaalSlotNumber}]
              </span>
              <span className="ml-2 text-[#544d44] hidden md:inline">
                — વૈદિક નિયમ: રાહુ કાળ દરમિયાન ગમે તેટલું શુભ ચોઘડિયું હોય તો પણ નવું શુભ કાર્ય શરૂ
                કરવું વર્જિત છે.
              </span>
            </span>
          </div>
        </div>
      )}

      {/* Choghadiya Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {slots.map((slot, idx) => {
          const isCurrent = slot.isCurrent;
          const isRahuKaal = slot.isRahuKaal;
          const badge = getStatusBadge(slot.name);

          return (
            <div
              key={idx}
              className={`rounded-xl p-4 text-xs space-y-3 border transition relative ${
                isRahuKaal
                  ? 'bg-[#fcf3f3]/95 border-[#e8b6b6] ring-2 ring-[#802020]/40 shadow-xs'
                  : isCurrent
                    ? 'glass-panel-accent ring-2 ring-[#b85d19] shadow-md animate-fade-in-up'
                    : 'glass-card'
              }`}
            >
              {/* Header Row: Slot Number + Badges */}
              <div className="flex items-start justify-between gap-2 border-b border-[#e6dfd3]/60 pb-2">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-[#736a60] uppercase tracking-wider">
                      સ્લોટ #{slot.slotNumber || idx + 1}
                    </span>
                    {isCurrent && (
                      <span className="rounded-full glass-badge-warning px-2 py-0.5 text-[9px] font-bold text-[#a34e0e] animate-pulse">
                        ● વર્તમાન
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#2c2825] mt-0.5">
                    {slot.nameGu || slot.name}
                  </h3>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`rounded-lg px-2 py-0.5 text-[10px] font-bold border shrink-0 ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                  {isRahuKaal && (
                    <span className="rounded-md bg-[#802020] text-white px-2 py-0.5 text-[9px] font-bold shadow-2xs">
                      🔥 રાહુ કાળ
                    </span>
                  )}
                </div>
              </div>

              {/* Time Interval Block */}
              <div
                className={`font-mono text-xs font-semibold px-3 py-2 rounded-lg border text-center ${
                  isRahuKaal
                    ? 'bg-[#f7dcdb] text-[#802020] border-[#e4aaaa]'
                    : 'bg-[#f5efe6]/70 text-[#2c2825] border-[#e6dfd3]/80'
                }`}
              >
                {slot.start} – {slot.end}
              </div>

              {/* Description */}
              <div className="text-[11px] text-[#544d44] leading-relaxed space-y-1">
                <p>{slot.desc?.[lang] || slot.desc?.gu || slot.nature}</p>
                {isRahuKaal && (
                  <div className="mt-2 pt-2 border-t border-[#e8b6b6] text-[#802020] font-semibold text-[10.5px] flex items-start gap-1">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden="true" />
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
