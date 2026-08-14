import React from 'react';
import { detectClassicalYogas } from '../engine/yogas.js';
import { Crown, Sparkles } from 'lucide-react';

export default function YogasView({ kundliData, t, lang }) {
  if (!kundliData) return null;

  const yogas = detectClassicalYogas(kundliData);

  return (
    <div className="rounded-xl border border-[#e6dfd3] bg-[#fcfbf7] p-6 shadow-sm">
      <div className="mb-6 border-b border-[#e6dfd3] pb-4">
        <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
          <Crown className="h-5 w-5 text-[#b85d19]" /> {t.yogasTitle}
        </h2>
        <p className="text-xs text-[#736a60]">{t.yogasDesc}</p>
      </div>

      {yogas.length === 0 ? (
        <div className="rounded-lg border border-[#e6dfd3] bg-[#fffdfa] p-6 text-center text-sm text-[#736a60]">
          {t.noYogas}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {yogas.map((y, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-xl border border-[#e6dfd3] bg-[#fffdfa] p-5 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#e6dfd3] pb-2">
                  <h3 className="font-serif text-base font-semibold text-[#2c2825] flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-[#b85d19]" /> {y.name}
                  </h3>
                  <span className="rounded-md bg-[#f5efe6] px-2.5 py-0.5 text-xs font-semibold text-[#544d44]">
                    {y.strength}
                  </span>
                </div>
                <p className="mt-3 text-sm text-[#2c2825] leading-relaxed">
                  {y.desc[lang] || y.desc.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
