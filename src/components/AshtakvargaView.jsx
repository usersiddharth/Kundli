import React from 'react';
import { calculateAshtakavarga } from '../engine/ashtakvarga.js';
import { Grid, Sparkles, Award, ShieldAlert } from 'lucide-react';

export default function AshtakvargaView({ kundliData, t }) {
  if (!kundliData) return null;

  const avData = calculateAshtakavarga(kundliData);
  const majorPlanets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-white/5 p-6 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <h2 className="text-xl font-medium text-[var(--text-primary)] font-serif flex items-center gap-2">
            <Grid className="h-5 w-5 text-[var(--text-gold)]" /> Ashtakavarga Matrix (BAV & SAV)
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Benefic point contributions across 12 houses (Total SAV: {avData.totalSAV} Bindus)
          </p>
        </div>
      </div>

      {/* Sarvashtakavarga (SAV) Summary Grid */}
      <div>
        <h3 className="font-serif text-base font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-[var(--text-gold)]" /> Sarvashtakavarga (SAV) House Totals
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {avData.houseEvaluations.map((h, i) => (
            <div
              key={i}
              className={`flex flex-col justify-between rounded-xl border p-3.5 text-xs shadow-2xs transition ${
                h.bindus >= 30
                  ? 'border-[#c1dec4] bg-[#e0edd8]/50 text-[#285e20]'
                  : h.bindus >= 28
                    ? 'border-[#f0cca3] bg-[#fae8d4]/40 text-[var(--text-gold)]'
                    : 'border-[#e4b5b5] bg-[#f0d5d5]/40 text-[#802020]'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-xs text-[var(--text-primary)]">House {h.houseNum}</span>
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
        <h3 className="font-serif text-base font-semibold text-[var(--text-primary)] mb-3">
          Bhinnashtakavarga (BAV) Planet Breakdown
        </h3>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-white/5">
          <table className="w-full text-left text-xs text-[var(--text-primary)]">
            <thead className="border-b border-[var(--border-subtle)] bg-white/5 font-semibold text-[var(--text-secondary)]">
              <tr>
                <th className="p-2.5">Planet</th>
                {Array.from({ length: 12 }, (_, i) => (
                  <th key={i} className="p-2.5 text-center font-mono">
                    H{i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {majorPlanets.map((pName) => {
                const row = avData.bav[pName];
                return (
                  <tr key={pName} className="hover:bg-white/10 transition">
                    <td className="p-2.5 font-semibold text-[var(--text-primary)]">{t[pName] || pName}</td>
                    {row.map((val, idx) => (
                      <td key={idx} className="p-2.5 text-center font-mono font-medium">
                        <span
                          className={`inline-block w-6 py-0.5 rounded ${
                            val >= 5
                              ? 'bg-[#e0edd8] text-[#285e20] font-bold'
                              : val <= 2
                                ? 'bg-[#f0d5d5] text-[#802020]'
                                : 'text-[var(--text-primary)]'
                          }`}
                        >
                          {val}
                        </span>
                      </td>
                    ))}
                  </tr>
                );
              })}
              <tr className="bg-white/5 font-bold text-[var(--text-primary)]">
                <td className="p-2.5">Total (SAV)</td>
                {avData.savTotals.map((tot, idx) => (
                  <td key={idx} className="p-2.5 text-center font-mono text-xs text-[var(--text-gold)]">
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
