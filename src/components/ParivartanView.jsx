import React from 'react';
import { detectParivartanYogas } from '../engine/parivartan.js';
import { Repeat, ShieldAlert, Sparkles, Award } from 'lucide-react';

export default function ParivartanView({ kundliData, t, lang }) {
  if (!kundliData) return null;

  const parivartans = detectParivartanYogas(kundliData);

  return (
    <div className="rounded-xl border border-[#e6dfd3] bg-[#fcfbf7] p-6 shadow-sm">
      <div className="mb-6 border-b border-[#e6dfd3] pb-4">
        <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
          <Repeat className="h-5 w-5 text-[#b85d19]" /> {t.parivartanTitle}
        </h2>
        <p className="text-xs text-[#736a60]">{t.parivartanDesc}</p>
      </div>

      {parivartans.length === 0 ? (
        <div className="rounded-lg border border-[#e6dfd3] bg-[#fffdfa] p-6 text-center text-sm text-[#736a60]">
          {t.noParivartan}
        </div>
      ) : (
        <div className="space-y-4">
          {parivartans.map((p, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#e6dfd3] bg-[#fffdfa] p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e6dfd3] pb-3">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-[#b85d19]" />
                  <span className="font-serif text-lg font-semibold text-[#2c2825]">
                    {p.yogaType}
                  </span>
                </div>
                <span className="rounded-full bg-[#f5efe6] px-3 py-1 text-xs font-semibold text-[#544d44]">
                  {p.impactCategory}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-[#f5efe6]/60 p-3">
                  <span className="text-xs font-medium text-[#736a60]">
                    {t.participatingPlanets}:
                  </span>
                  <p className="font-semibold text-[#2c2825]">
                    {t[p.planet1] || p.planet1} ⇄ {t[p.planet2] || p.planet2}
                  </p>
                </div>
                <div className="rounded-lg bg-[#f5efe6]/60 p-3">
                  <span className="text-xs font-medium text-[#736a60]">{t.exchangedHouses}:</span>
                  <p className="font-semibold text-[#2c2825]">
                    House {p.house1} ({t[p.sign1] || p.sign1}) ⇄ House {p.house2} (
                    {t[p.sign2] || p.sign2})
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-[#e6dfd3] bg-[#fcfbf7] p-4 text-sm text-[#2c2825] leading-relaxed">
                <span className="font-semibold text-[#b85d19] block mb-1">{t.impactAnalysis}:</span>
                {p.details[lang] || p.details.en}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
