import React from 'react';
import { Chip, Card } from '@heroui/react';
import { Compass, Moon, Sun, MapPin, Zap, User } from 'lucide-react';
import { calculateCurrentMicroDasha } from '../engine/dasha.js';

export default function QuickToolbar({ kundliData, formData, birthDateObj, t, lang = 'gu' }) {
  if (!kundliData) return null;

  const panchang = kundliData.panchang;
  const currentMicro = birthDateObj
    ? calculateCurrentMicroDasha(kundliData, birthDateObj, new Date())
    : null;

  const displayName =
    formData?.name?.trim() ||
    (lang === 'gu' ? 'જાતક (Native)' : lang === 'hi' ? 'जातक (Native)' : 'Native');
  const avatarLetter = formData?.name?.trim() ? formData.name.trim().charAt(0).toUpperCase() : null;

  const cityPart = formData?.city?.trim() ? formData.city.split(',')[0].trim() : '';
  let dobPart = formData?.dob?.trim() || '';

  // Format date to DD-MM-YYYY (Indian Standard)
  if (dobPart && dobPart.includes('-')) {
    const p = dobPart.split('-');
    if (p.length === 3 && p[0].length === 4) {
      dobPart = `${p[2]}-${p[1]}-${p[0]}`;
    }
  }

  let subtitleText = '';
  if (cityPart && dobPart) {
    subtitleText = `${cityPart} • ${dobPart}`;
  } else if (cityPart) {
    subtitleText = cityPart;
  } else if (dobPart) {
    subtitleText = dobPart;
  } else {
    subtitleText = `${panchang.tithi}, ${panchang.vaar}`;
  }

  const lagnaLabel = lang === 'gu' ? 'લગ્ન:' : lang === 'hi' ? 'लग्न:' : 'Lagna:';
  const moonLabel = lang === 'gu' ? 'ચંદ્ર:' : lang === 'hi' ? 'चन्द्र:' : 'Moon:';
  const sunLabel = lang === 'gu' ? 'સૂર્ય:' : lang === 'hi' ? 'सूर्य:' : 'Sun:';
  const dashaLabel = lang === 'gu' ? 'દશા:' : lang === 'hi' ? 'दशा:' : 'Dasha:';

  return (
    <Card className="rounded-2xl glass-panel px-3.5 py-2.5 sm:px-5 sm:py-3 text-xs text-[var(--text-primary)] print:hidden border border-[var(--border-subtle)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        {/* Native Identity */}
        <div className="flex items-center gap-2.5 font-medium shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl glass-button-primary font-serif font-bold text-xs shadow-xs text-white">
            {avatarLetter ? avatarLetter : <User className="h-4 w-4 text-white" />}
          </span>
          <div>
            <span className="font-serif font-bold text-sm text-[var(--text-primary)] block leading-tight">
              {displayName}
            </span>
            <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1 font-sans">
              <MapPin className="h-2.5 w-2.5 text-[var(--text-gold)]" />
              {subtitleText}
            </span>
          </div>
        </div>

        {/* Cosmic Status Badges Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 w-full sm:w-auto shrink">
          {/* Lagna */}
          <Chip className="bg-amber-500/10 text-[var(--text-primary)] border border-[var(--border-gold)] px-2.5 py-1 text-xs">
            <Chip.Label className="flex items-center gap-1.5 font-medium">
              <Compass className="h-3.5 w-3.5 text-[var(--text-gold)]" />
              <span className="text-[var(--text-muted)]">{lagnaLabel}</span>
              <strong className="text-[var(--text-gold)] font-serif">
                {t[panchang.ascendant] || panchang.ascendant}
              </strong>
            </Chip.Label>
          </Chip>

          {/* Moon Sign & Nakshatra */}
          <Chip className="bg-stone-500/10 text-[var(--text-primary)] border border-[var(--border-subtle)] px-2.5 py-1 text-xs">
            <Chip.Label className="flex items-center gap-1.5 font-medium">
              <Moon className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
              <span className="text-[var(--text-muted)]">{moonLabel}</span>
              <strong className="text-[var(--text-primary)] font-serif">
                {t[panchang.moonSign] || panchang.moonSign}
              </strong>
              <span className="text-[10.5px] text-[var(--text-gold)] font-mono">
                ({panchang.nakshatra} P{panchang.pada})
              </span>
            </Chip.Label>
          </Chip>

          {/* Sun Sign */}
          <Chip className="bg-amber-500/10 text-[var(--text-primary)] border border-[var(--border-subtle)] px-2.5 py-1 text-xs">
            <Chip.Label className="flex items-center gap-1.5 font-medium">
              <Sun className="h-3.5 w-3.5 text-[var(--text-gold)]" />
              <span className="text-[var(--text-muted)]">{sunLabel}</span>
              <strong className="text-[var(--text-primary)] font-serif">
                {t[panchang.sunSign] || panchang.sunSign}
              </strong>
            </Chip.Label>
          </Chip>

          {/* Live Active Dasha Rulers */}
          {currentMicro && (
            <Chip className="glass-badge-gold px-2.5 py-1 text-xs">
              <Chip.Label className="flex items-center gap-1.5 font-medium">
                <Zap className="h-3.5 w-3.5 text-[var(--text-gold)] animate-pulse" />
                <span className="text-[var(--text-muted)]">{dashaLabel}</span>
                <strong className="text-[var(--text-gold)] font-serif">
                  {t[currentMicro.mahadasha.lord] || currentMicro.mahadasha.lord}
                </strong>
                <span className="text-[var(--text-muted)]">/</span>
                <span className="text-[var(--text-amber)] font-bold font-serif">
                  {t[currentMicro.antardasha.lord] || currentMicro.antardasha.lord}
                </span>
              </Chip.Label>
            </Chip>
          )}

          {/* Tithi & Vaar */}
          <Chip className="bg-stone-500/10 text-[var(--text-muted)] border border-[var(--border-subtle)] px-2.5 py-1 text-xs font-medium">
            <Chip.Label>
              {panchang.tithi}, {panchang.vaar}
            </Chip.Label>
          </Chip>
        </div>
      </div>
    </Card>
  );
}
