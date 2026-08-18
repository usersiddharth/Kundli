import React from 'react';
import { calculateShadbala, SHADBALA_REQUIRED_RUPAS } from '../engine/shadbala.js';
import { ShieldCheck, BarChart3, Award, Sparkles, TrendingUp } from 'lucide-react';

export default function ShadbalaView({ kundliData, t }) {
  if (!kundliData) return null;

  const { rankedList } = calculateShadbala(kundliData);

  return (
    <div className="rounded-2xl border border-[var(--border-gold)] glass-panel p-6 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <h2 className="text-xl font-medium text-[var(--text-primary)] font-serif flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[var(--text-gold)]" /> Shadbala (ષડ્બળ - 6-Fold
            Planetary Strength)
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Sthana, Dig, Kaala, Chesta, Naisargika, and Drik balas measured in Rupas and Virupas (60
            Virupas = 1 Rupa)
          </p>
        </div>
      </div>

      {/* Planetary Power Rankings Cards */}
      <div>
        <h3 className="font-serif text-base font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
          <Award className="h-4 w-4 text-[var(--text-gold)]" /> Planetary Strength Rankings
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {rankedList.map((p) => (
            <div
              key={p.name}
              className="flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] glass-card p-4 text-xs space-y-2.5 transition hover:border-[var(--border-gold)]"
            >
              <div className="flex justify-between items-center">
                <span className="font-serif font-bold text-sm text-[var(--text-primary)] flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full glass-button-dark text-[10px] font-bold">
                    #{p.rank}
                  </span>
                  {t[p.name] || p.name}
                </span>
                <span
                  className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                    p.isAdequate ? 'glass-badge-success' : 'glass-badge-warning'
                  }`}
                >
                  {p.strengthRatio >= 1.2 ? 'Strong' : 'Moderate'}
                </span>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[var(--text-muted)] mb-1">
                  <span>
                    Actual:{' '}
                    <strong className="font-mono text-[var(--text-primary)]">
                      {p.totalRupas} Rupas
                    </strong>
                  </span>
                  <span className="font-mono">Req: {p.requiredRupas}</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-[var(--bg-pill)] overflow-hidden border border-[var(--border-subtle)]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      p.strengthRatio >= 1.2
                        ? 'bg-emerald-600 dark:bg-emerald-400'
                        : p.strengthRatio >= 1.0
                          ? 'bg-amber-600 dark:bg-amber-400'
                          : 'bg-orange-600 dark:bg-orange-400'
                    }`}
                    style={{
                      width: `${Math.min(100, (p.totalRupas / (p.requiredRupas * 1.5)) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="text-[10px] font-mono text-[var(--text-muted)] pt-1.5 border-t border-[var(--border-subtle)] flex justify-between">
                <span>Ratio: {p.strengthRatio}x</span>
                <span>{p.totalVirupas} Virupas</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Shadbala Breakdown Matrix */}
      <div>
        <h3 className="font-serif text-base font-semibold text-[var(--text-primary)] mb-3">
          6-Fold Bala Breakdown Matrix (Virupas)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] glass-card">
          <table className="w-full text-left text-xs text-[var(--text-primary)]">
            <thead className="border-b border-[var(--border-subtle)] bg-[var(--bg-pill)] font-semibold text-[var(--text-secondary)]">
              <tr>
                <th className="p-3">Planet</th>
                <th className="p-3 font-mono">Sthana (Positional)</th>
                <th className="p-3 font-mono">Dig (Directional)</th>
                <th className="p-3 font-mono">Kaala (Temporal)</th>
                <th className="p-3 font-mono">Chesta (Motional)</th>
                <th className="p-3 font-mono">Naisargika (Natural)</th>
                <th className="p-3 font-mono">Drik (Aspectual)</th>
                <th className="p-3 font-mono">Total (Virupas)</th>
                <th className="p-3 font-mono">Total (Rupas)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {rankedList.map((p) => (
                <tr key={p.name} className="hover:bg-[var(--bg-card-hover)] transition">
                  <td className="p-3 font-serif font-bold text-[var(--text-primary)]">
                    {t[p.name] || p.name}
                  </td>
                  <td className="p-3 font-mono text-[var(--text-secondary)]">{p.sthanaBala}</td>
                  <td className="p-3 font-mono text-[var(--text-secondary)]">{p.digBala}</td>
                  <td className="p-3 font-mono text-[var(--text-secondary)]">{p.kaalaBala}</td>
                  <td className="p-3 font-mono text-[var(--text-secondary)]">{p.chestaBala}</td>
                  <td className="p-3 font-mono text-[var(--text-secondary)]">{p.naisargikaBala}</td>
                  <td className="p-3 font-mono text-[var(--text-secondary)]">{p.drikBala}</td>
                  <td className="p-3 font-mono font-bold text-[var(--text-gold)]">
                    {p.totalVirupas}
                  </td>
                  <td className="p-3 font-mono font-bold text-[var(--text-primary)]">
                    {p.totalRupas}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
