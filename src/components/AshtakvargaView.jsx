import React from 'react';
import { calculateAshtakavarga } from '../engine/ashtakvarga.js';
import { Grid, Sparkles, Award, ShieldAlert } from 'lucide-react';

export default function AshtakvargaView({ kundliData, t }) {
  if (!kundliData) return null;

  const avData = calculateAshtakavarga(kundliData);
  const majorPlanets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

  return (
    <div className="rounded-xl border border-[#e6dfd3] bg-[#fcfbf7] p-6 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e6dfd3] pb-4">
        <div>
          <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
            <Grid className="h-5 w-5 text-[#b85d19]" /> Ashtakavarga Matrix (BAV & SAV)
          </h2>
          <p className="text-xs text-[#736a60]">
            Benefic point contributions across 12 houses (Total SAV: {avData.totalSAV} Bindus)
          </p>
        </div>
      </div>

      {/* Sarvashtakavarga (SAV) Summary Grid */}
      <div>
        <h3 className="font-serif text-base font-semibold text-[#2c2825] mb-3 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-[#b85d19]" /> Sarvashtakavarga (SAV) House Totals
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {avData.houseEvaluations.map((h, i) => (
            <div
              key={i}
              className={`flex flex-col justify-between rounded-xl border p-3.5 text-xs shadow-2xs transition ${
                h.bindus >= 30
                  ? 'border-[#c1dec4] bg-[#e0edd8]/50 text-[#285e20]'
                  : h.bindus >= 28
                    ? 'border-[#f0cca3] bg-[#fae8d4]/40 text-[#964708]'
                    : 'border-[#e4b5b5] bg-[#f0d5d5]/40 text-[#802020]'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-xs text-[#2c2825]">House {h.houseNum}</span>
                <span className="font-mono text-base font-bold">{h.bindus}</span>
              </div>
              <span className="text-[11px] font-medium mt-1">{t[h.rashi] || h.rashi}</span>
              <span className="text-[10px] opacity-80 mt-1">{h.strength}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bhinnashtakavarga (BAV) Table */}
      <div>
        <h3 className="font-serif text-base font-semibold text-[#2c2825] mb-3">
          Bhinnashtakavarga (BAV) Planet Breakdown
        </h3>
        <div className="overflow-x-auto rounded-xl border border-[#e6dfd3] bg-[#fffdfa]">
          <table className="w-full text-left text-xs text-[#2c2825]">
            <thead className="border-b border-[#e6dfd3] bg-[#f5efe6] font-semibold text-[#544d44]">
              <tr>
                <th className="p-2.5">Planet</th>
                {Array.from({ length: 12 }, (_, i) => (
                  <th key={i} className="p-2.5 text-center font-mono">
                    H{i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6dfd3]">
              {majorPlanets.map((pName) => {
                const row = avData.bav[pName];
                return (
                  <tr key={pName} className="hover:bg-[#f5efe6]/50 transition">
                    <td className="p-2.5 font-semibold text-[#2c2825]">{t[pName] || pName}</td>
                    {row.map((val, idx) => (
                      <td key={idx} className="p-2.5 text-center font-mono font-medium">
                        <span
                          className={`inline-block w-6 py-0.5 rounded ${
                            val >= 5
                              ? 'bg-[#e0edd8] text-[#285e20] font-bold'
                              : val <= 2
                                ? 'bg-[#f0d5d5] text-[#802020]'
                                : 'text-[#2c2825]'
                          }`}
                        >
                          {val}
                        </span>
                      </td>
                    ))}
                  </tr>
                );
              })}
              <tr className="bg-[#f5efe6] font-bold text-[#2c2825]">
                <td className="p-2.5">Total (SAV)</td>
                {avData.savTotals.map((tot, idx) => (
                  <td key={idx} className="p-2.5 text-center font-mono text-xs text-[#b85d19]">
                    {tot}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
