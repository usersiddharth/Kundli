import React from 'react';
import { Compass, Moon, Sun, MapPin, Zap, User } from 'lucide-react';
import { calculateCurrentMicroDasha } from '../engine/dasha.js';

export default function QuickToolbar({ kundliData, formData, birthDateObj, t }) {
  if (!kundliData) return null;

  const panchang = kundliData.panchang;
  const currentMicro = birthDateObj
    ? calculateCurrentMicroDasha(kundliData, birthDateObj, new Date())
    : null;

  const displayName = formData?.name?.trim() || 'જાતક (Native)';
  const avatarLetter = formData?.name?.trim() ? formData.name.trim().charAt(0).toUpperCase() : null;

  const cityPart = formData?.city?.trim() ? formData.city.split(',')[0].trim() : '';
  const dobPart = formData?.dob?.trim() || '';

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

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 rounded-2xl glass-panel px-3.5 py-2.5 sm:px-5 sm:py-3 text-xs text-[var(--text-primary)] print:hidden">
      {/* Native Identity */}
      <div className="flex items-center gap-2.5 font-medium shrink-0">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl glass-button-primary font-serif font-bold text-xs shadow-xs text-[#0c0e17]">
          {avatarLetter ? avatarLetter : <User className="h-4 w-4 text-stone-900" />}
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

      {/* Cosmic Status Badges Ribbon (Scrollable on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 w-full sm:w-auto shrink">
        {/* Lagna */}
        <div className="flex items-center gap-1.5 rounded-xl glass-card px-2.5 py-1.5 font-medium shrink-0">
          <Compass className="h-3.5 w-3.5 text-[var(--text-gold)]" />
          <span className="text-[var(--text-muted)]">લગ્ન:</span>
          <strong className="text-[var(--text-gold)] font-serif">
            {t[panchang.ascendant] || panchang.ascendant}
          </strong>
        </div>

        {/* Moon Sign & Nakshatra */}
        <div className="flex items-center gap-1.5 rounded-xl glass-card px-2.5 py-1.5 font-medium shrink-0">
          <Moon className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
          <span className="text-[var(--text-muted)]">ચંદ્ર:</span>
          <strong className="text-[var(--text-primary)] font-serif">
            {t[panchang.moonSign] || panchang.moonSign}
          </strong>
          <span className="text-[10.5px] text-[var(--text-gold)] font-mono">
            ({panchang.nakshatra} P{panchang.pada})
          </span>
        </div>

        {/* Sun Sign */}
        <div className="flex items-center gap-1.5 rounded-xl glass-card px-2.5 py-1.5 font-medium shrink-0">
          <Sun className="h-3.5 w-3.5 text-[var(--text-gold)]" />
          <span className="text-[var(--text-muted)]">સૂર્ય:</span>
          <strong className="text-[var(--text-primary)] font-serif">
            {t[panchang.sunSign] || panchang.sunSign}
          </strong>
        </div>

        {/* Live Active Dasha Rulers */}
        {currentMicro && (
          <div className="flex items-center gap-1.5 rounded-xl glass-badge-gold px-2.5 py-1.5 font-medium shrink-0">
            <Zap className="h-3.5 w-3.5 text-[var(--text-gold)] animate-pulse" />
            <span className="text-[var(--text-muted)]">દશા:</span>
            <strong className="text-[var(--text-gold)] font-serif">
              {t[currentMicro.mahadasha.lord] || currentMicro.mahadasha.lord}
            </strong>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[#ff7675] font-bold">
              {t[currentMicro.pranaDasha.lord] || currentMicro.pranaDasha.lord}
            </span>
          </div>
        )}

        {/* Tithi & Vaar */}
        <div className="flex items-center gap-1 rounded-xl glass-card px-2.5 py-1.5 font-medium text-[var(--text-muted)] shrink-0">
          <span>
            {panchang.tithi}, {panchang.vaar}
          </span>
        </div>
      </div>
    </div>
  );
}
