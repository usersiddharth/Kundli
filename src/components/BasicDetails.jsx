import React from 'react';
import { degToDms } from '../engine/astronomy.js';
import { Sparkles } from 'lucide-react';

export default function BasicDetails({ kundliData, t }) {
  if (!kundliData) return null;

  const { panchang, ayanamsha } = kundliData;
  const ayanamshaDms = degToDms(ayanamsha).formatted;

  const detailsList = [
    { label: t.ayanamsha, value: ayanamshaDms, isMono: true },
    { label: t.tithi, value: panchang.tithi },
    { label: t.vaar, value: panchang.vaar },
    { label: t.nakshatra, value: `${panchang.nakshatra} (Lord: ${panchang.nakshatraLord})` },
    { label: t.pada, value: panchang.pada, isMono: true },
    { label: t.ascendant, value: panchang.ascendant },
    { label: t.sunSign, value: panchang.sunSign },
    { label: t.moonSign, value: panchang.moonSign },
    { label: t.gana, value: panchang.gana },
    { label: t.yoni, value: panchang.yoni },
    { label: t.nadi, value: panchang.nadi },
    { label: t.varna, value: panchang.varna }
  ];

  return (
    <div className="rounded-xl glass-panel p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between border-b border-[#e6dfd3]/80 pb-3">
        <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#b85d19]" /> {t.avakhadaChakra}
        </h2>
        <span className="rounded-full glass-pill px-3 py-1 text-xs font-medium text-[#544d44]">
          Chitra Paksha
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {detailsList.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between rounded-lg glass-card p-3 shadow-2xs">
            <span className="text-xs font-medium text-[#736a60]">{item.label}</span>
            <span className={`text-sm font-semibold text-[#2c2825] ${item.isMono ? 'font-mono' : ''}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
