import React from 'react';
import { Compass, Moon, Sun, Clock, Sparkles, MapPin, Zap } from 'lucide-react';
import { calculateCurrentMicroDasha } from '../engine/dasha.js';

export default function QuickToolbar({ kundliData, formData, birthDateObj, t }) {
  if (!kundliData) return null;

  const panchang = kundliData.panchang;
  const currentMicro = birthDateObj ? calculateCurrentMicroDasha(kundliData, birthDateObj, new Date()) : null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl glass-panel px-5 py-3 shadow-xs text-xs text-[#2c2825] border border-[#d4c8b8] print:hidden">
      {/* Native Identity */}
      <div className="flex items-center gap-2 font-medium">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#b85d19] text-white font-serif font-bold text-xs shadow-2xs">
          {formData.name ? formData.name.charAt(0) : 'J'}
        </span>
        <div>
          <span className="font-serif font-bold text-sm text-[#2c2825] block leading-tight">
            {formData.name}
          </span>
          <span className="text-[10px] text-[#736a60] flex items-center gap-1 font-sans">
            <MapPin className="h-2.5 w-2.5 text-[#b85d19]" />
            {formData.city ? formData.city.split(',')[0] : ''} • {formData.dob}
          </span>
        </div>
      </div>

      {/* Cosmic Status Badges Ribbon */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Lagna */}
        <div className="flex items-center gap-1.5 rounded-xl glass-card px-3 py-1.5 font-medium border border-[#e6dfd3]">
          <Compass className="h-3.5 w-3.5 text-[#b85d19]" />
          <span className="text-[#736a60]">લગ્ન:</span>
          <strong className="text-[#b85d19] font-serif">{t[panchang.ascendant] || panchang.ascendant}</strong>
        </div>

        {/* Moon Sign & Nakshatra */}
        <div className="flex items-center gap-1.5 rounded-xl glass-card px-3 py-1.5 font-medium border border-[#e6dfd3]">
          <Moon className="h-3.5 w-3.5 text-[#544d44]" />
          <span className="text-[#736a60]">ચંદ્ર:</span>
          <strong className="text-[#2c2825] font-serif">{t[panchang.moonSign] || panchang.moonSign}</strong>
          <span className="text-[10.5px] text-[#8c7456] font-mono">({panchang.nakshatra} P{panchang.pada})</span>
        </div>

        {/* Sun Sign */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-xl glass-card px-3 py-1.5 font-medium border border-[#e6dfd3]">
          <Sun className="h-3.5 w-3.5 text-[#964708]" />
          <span className="text-[#736a60]">સૂર્ય:</span>
          <strong className="text-[#2c2825] font-serif">{t[panchang.sunSign] || panchang.sunSign}</strong>
        </div>

        {/* Live Active Dasha Rulers */}
        {currentMicro && (
          <div className="flex items-center gap-1.5 rounded-xl glass-badge-warning px-3 py-1.5 font-medium border border-[#b85d19]/30">
            <Zap className="h-3.5 w-3.5 text-[#b85d19] animate-pulse" />
            <span className="text-[#736a60]">દશા:</span>
            <strong className="text-[#b85d19] font-serif">
              {t[currentMicro.mahadasha.lord] || currentMicro.mahadasha.lord}
            </strong>
            <span className="text-[#736a60]">/</span>
            <span className="text-[#802020] font-bold">
              {t[currentMicro.pranaDasha.lord] || currentMicro.pranaDasha.lord} (PrD)
            </span>
          </div>
        )}

        {/* Tithi & Vaar */}
        <div className="hidden md:flex items-center gap-1 rounded-xl glass-card px-3 py-1.5 font-medium text-[#736a60] border border-[#e6dfd3]">
          <span>{panchang.tithi}, {panchang.vaar}</span>
        </div>
      </div>
    </div>
  );
}
