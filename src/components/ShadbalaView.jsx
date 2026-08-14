import React from 'react';
import { calculateShadbala, SHADBALA_REQUIRED_RUPAS } from '../engine/shadbala.js';
import { ShieldCheck, BarChart3, Award, Sparkles, TrendingUp } from 'lucide-react';

export default function ShadbalaView({ kundliData, t }) {
  if (!kundliData) return null;

  const { planetBalas, rankedList } = calculateShadbala(kundliData);

  return (
    <div className="rounded-xl border border-[#e6dfd3] bg-[#fcfbf7] p-6 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e6dfd3] pb-4">
        <div>
          <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#b85d19]" /> Shadbala (ષડ્બળ - 6-Fold Planetary
            Strength)
          </h2>
          <p className="text-xs text-[#736a60]">
            Sthana, Dig, Kaala, Chesta, Naisargika, and Drik balas measured in Rupas and Virupas (60
            Virupas = 1 Rupa)
          </p>
        </div>
      </div>

      {/* Planetary Power Rankings Cards */}
      <div>
        <h3 className="font-serif text-base font-semibold text-[#2c2825] mb-3 flex items-center gap-1.5">
          <Award className="h-4 w-4 text-[#b85d19]" /> Planetary Strength Rankings
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {rankedList.map((p, idx) => (
            <div
              key={p.name}
              className="flex flex-col justify-between rounded-xl border border-[#e6dfd3] bg-[#fffdfa] p-4 text-xs shadow-2xs space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-serif font-bold text-sm text-[#2c2825] flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2c2825] text-[10px] font-bold text-[#f4ebd9]">
                    #{p.rank}
                  </span>
                  {t[p.name] || p.name}
                </span>
                <span
                  className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                    p.isAdequate ? 'bg-[#e0edd8] text-[#285e20]' : 'bg-[#fae8d4] text-[#964708]'
                  }`}
                >
                  {p.strengthRatio >= 1.2 ? 'Strong' : 'Moderate'}
                </span>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#736a60] mb-1">
                  <span>
                    Actual: <strong>{p.totalRupas} Rupas</strong>
                  </span>
                  <span>Required: {p.requiredRupas}</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-[#f5efe6] overflow-hidden border border-[#e6dfd3]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      p.strengthRatio >= 1.2
                        ? 'bg-[#285e20]'
                        : p.strengthRatio >= 1.0
                          ? 'bg-[#b85d19]'
                          : 'bg-[#964708]'
                    }`}
                    style={{
                      width: `${Math.min(100, (p.totalRupas / (p.requiredRupas * 1.5)) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="text-[10px] font-mono text-[#736a60] pt-1 border-t border-[#e6dfd3]/60 flex justify-between">
                <span>Ratio: {p.strengthRatio}x</span>
                <span>{p.totalVirupas} Virupas</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Shadbala Breakdown Matrix */}
      <div>
        <h3 className="font-serif text-base font-semibold text-[#2c2825] mb-3">
          6-Fold Bala Breakdown Matrix (Virupas)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-[#e6dfd3] bg-[#fffdfa]">
          <table className="w-full text-left text-xs text-[#2c2825]">
            <thead className="border-b border-[#e6dfd3] bg-[#f5efe6] font-semibold text-[#544d44]">
              <tr>
                <th className="p-3">Planet</th>
                <th className="p-3">Sthana (Positional)</th>
                <th className="p-3">Dig (Directional)</th>
                <th className="p-3">Kaala (Temporal)</th>
                <th className="p-3">Chesta (Motional)</th>
                <th className="p-3">Naisargika (Natural)</th>
                <th className="p-3">Drik (Aspectual)</th>
                <th className="p-3">Total Rupas</th>
                <th className="p-3">Required</th>
                <th className="p-3">Rank</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6dfd3]">
              {rankedList.map((p) => (
                <tr key={p.name} className="hover:bg-[#f5efe6]/50 transition">
                  <td className="p-3 font-semibold text-[#2c2825]">{t[p.name] || p.name}</td>
                  <td className="p-3 font-mono">{p.sthanaBala}</td>
                  <td className="p-3 font-mono">{p.digBala}</td>
                  <td className="p-3 font-mono">{p.kaalaBala}</td>
                  <td className="p-3 font-mono">{p.chestaBala}</td>
                  <td className="p-3 font-mono">{p.naisargikaBala}</td>
                  <td className="p-3 font-mono">{p.drikBala}</td>
                  <td className="p-3 font-mono font-bold text-[#b85d19]">{p.totalRupas}</td>
                  <td className="p-3 font-mono text-[#736a60]">{p.requiredRupas}</td>
                  <td className="p-3 font-bold text-[#2c2825]">#{p.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
