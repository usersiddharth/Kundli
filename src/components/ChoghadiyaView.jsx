import React, { useState } from 'react';
import { Button, Card, Chip } from '@heroui/react';
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
    <Card className="rounded-2xl glass-panel p-6 shadow-sm space-y-6 print:border-none print:p-0 print:bg-white border border-[var(--border-subtle)]">
      {/* Header */}
      <Card.Header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4 p-0">
        <div>
          <Card.Title className="text-lg sm:text-xl font-medium text-[var(--text-primary)] font-serif flex items-center gap-2">
            <Clock className="h-5 w-5 text-[var(--text-gold)]" aria-hidden="true" />
            <span>દૈનિક ચોઘડિયા અને શુભ મુહૂર્ત (Daily Choghadiya)</span>
          </Card.Title>
          <Card.Description className="text-xs text-[var(--text-muted)] mt-0.5">
            વાસ્તવિક વૈદિક દિવસ અને રાત્રિના ચોઘડિયા સમયગાળો
          </Card.Description>
        </div>

        {/* Day / Night Switcher */}
        <div
          role="tablist"
          aria-label="Choghadiya time mode"
          className="flex rounded-xl glass-pill p-1 gap-1"
        >
          <Button
            type="button"
            role="tab"
            aria-selected={activeMode === 'day'}
            onPress={() => setActiveMode('day')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
              activeMode === 'day'
                ? 'glass-button-primary shadow-xs'
                : 'text-[var(--text-secondary)] hover:bg-black/5 dark:hover:bg-white/5 bg-transparent'
            }`}
          >
            <Sun className="h-3.5 w-3.5" aria-hidden="true" />
            <span>દિવસના ચોઘડિયા (Day)</span>
          </Button>

          <Button
            type="button"
            role="tab"
            aria-selected={activeMode === 'night'}
            onPress={() => setActiveMode('night')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
              activeMode === 'night'
                ? 'glass-button-primary shadow-xs'
                : 'text-[var(--text-secondary)] hover:bg-black/5 dark:hover:bg-white/5 bg-transparent'
            }`}
          >
            <Moon className="h-3.5 w-3.5" aria-hidden="true" />
            <span>રાત્રિના ચોઘડિયા (Night)</span>
          </Button>
        </div>
      </Card.Header>

      {/* Rahu Kaal Alert Banner */}
      {chData.rahuKaal && (
        <Card className="flex flex-row items-center justify-between rounded-xl glass-badge-danger px-4 py-3 text-xs font-medium shadow-2xs border border-rose-300/40">
          <div className="flex items-center gap-2.5 text-[#b03a2e] dark:text-[#ff7675]">
            <ShieldAlert
              className="h-4 w-4 shrink-0 text-[#b03a2e] dark:text-[#ff7675]"
              aria-hidden="true"
            />
            <span>
              આજનો રાહુ કાળ (Rahu Kaal):{' '}
              <strong className="font-mono text-[#b03a2e] dark:text-[#ff7675] ml-1">
                {chData.rahuKaal}
              </strong>
              <span className="ml-2 font-bold text-[var(--text-gold)]">
                {' '}
                [સ્લોટ #{chData.rahuKaalSlotNumber}]
              </span>
              <span className="ml-2 text-[var(--text-secondary)] hidden md:inline">
                — વૈદિક નિયમ: રાહુ કાળ દરમિયાન ગમે તેટલું શુભ ચોઘડિયું હોય તો પણ નવું શુભ કાર્ય શરૂ
                કરવું વર્જિત છે.
              </span>
            </span>
          </div>
        </Card>
      )}

      {/* Choghadiya Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {slots.map((slot, idx) => {
          const isCurrent = slot.isCurrent;
          const isRahuKaal = slot.isRahuKaal;
          const badge = getStatusBadge(slot.name);

          return (
            <Card
              key={idx}
              className={`rounded-2xl p-4 text-xs space-y-3 border transition relative ${
                isRahuKaal
                  ? 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 ring-2 ring-rose-500/40 shadow-xs'
                  : isCurrent
                    ? 'glass-panel-accent ring-2 ring-[var(--border-gold)] shadow-md animate-fade-in-up'
                    : 'glass-card border-[var(--border-subtle)]'
              }`}
            >
              {/* Header Row: Slot Number + Badges */}
              <div className="flex items-start justify-between gap-2 border-b border-[var(--border-subtle)] pb-2">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                      સ્લોટ #{slot.slotNumber || idx + 1}
                    </span>
                    {isCurrent && (
                      <Chip className="glass-badge-gold px-2 py-0.5 text-[9px] font-bold animate-pulse">
                        <Chip.Label>● વર્તમાન</Chip.Label>
                      </Chip>
                    )}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[var(--text-primary)] mt-0.5">
                    {slot.nameGu || slot.name}
                  </h3>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <Chip className={`text-[10px] font-bold border shrink-0 ${badge.className}`}>
                    <Chip.Label>{badge.label}</Chip.Label>
                  </Chip>
                  {isRahuKaal && (
                    <Chip className="bg-rose-600 text-white px-2 py-0.5 text-[9px] font-bold shadow-2xs">
                      <Chip.Label>🔥 રાહુ કાળ</Chip.Label>
                    </Chip>
                  )}
                </div>
              </div>

              {/* Time Interval Block */}
              <div
                className={`font-mono text-xs font-semibold px-3 py-2 rounded-xl border text-center ${
                  isRahuKaal
                    ? 'bg-rose-100 dark:bg-rose-900/60 text-[#b03a2e] dark:text-[#ff7675] border-rose-300'
                    : 'bg-[var(--bg-pill)] text-[var(--text-primary)] border-[var(--border-subtle)]'
                }`}
              >
                {slot.start} – {slot.end}
              </div>

              {/* Description */}
              <div className="text-[11px] text-[var(--text-secondary)] leading-relaxed space-y-1">
                <p>{slot.desc?.[lang] || slot.desc?.gu || slot.nature}</p>
                {isRahuKaal && (
                  <div className="mt-2 pt-2 border-t border-rose-200 dark:border-rose-800 text-[#b03a2e] dark:text-[#ff7675] font-semibold text-[10.5px] flex items-start gap-1">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      રાહુ કાળ પ્રભાવ: અમૃત ચોઘડિયું હોવા છતાં આ સમયગાળામાં શુભ કાર્ય વર્જિત છે.
                    </span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
}
