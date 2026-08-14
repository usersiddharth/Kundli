import React from 'react';
import { calculateCurrentTransits } from '../engine/transits.js';
import { Compass, Sparkles } from 'lucide-react';

export default function TransitView({ kundliData, t, lang }) {
  if (!kundliData) return null;

  const natalMoonSignIndex = Math.floor(kundliData.planets.Moon.lon / 30);
  const transits = calculateCurrentTransits(natalMoonSignIndex);

  return (
    <div className="rounded-xl border border-[#e6dfd3] bg-[#fcfbf7] p-6 shadow-sm">
      <div className="mb-6 border-b border-[#e6dfd3] pb-4">
        <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
          <Compass className="h-5 w-5 text-[#b85d19]" /> {t.transitsTitle}
        </h2>
        <p className="text-xs text-[#736a60]">{t.transitDesc}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {transits.map((tr, idx) => (
          <div key={idx} className="rounded-xl border border-[#e6dfd3] bg-[#fffdfa] p-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#e6dfd3] pb-2">
              <span className="font-serif text-base font-semibold text-[#2c2825]">
                {t[tr.planet] || tr.planet}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  tr.isFavorable ? 'bg-[#e0edd8] text-[#285e20]' : 'bg-[#f5efe6] text-[#544d44]'
                }`}
              >
                House {tr.houseFromMoon} Transit
              </span>
            </div>

            <p className="mt-3 text-xs text-[#2c2825] leading-relaxed">
              {tr.desc[lang] || tr.desc.en}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
