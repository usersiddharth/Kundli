import React from 'react';
import { detectParivartanYogas } from '../engine/parivartan.js';
import { Repeat, ShieldAlert, Sparkles, Award } from 'lucide-react';

export default function ParivartanView({ kundliData, t, lang }) {
  if (!kundliData) return null;

  const parivartans = detectParivartanYogas(kundliData);

  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-white/5 p-6 shadow-sm">
      <div className="mb-6 border-b border-[var(--border-subtle)] pb-4">
        <h2 className="text-xl font-medium text-[var(--text-primary)] font-serif flex items-center gap-2">
          <Repeat className="h-5 w-5 text-[var(--text-gold)]" /> {t.parivartanTitle}
        </h2>
        <p className="text-xs text-[var(--text-muted)]">{t.parivartanDesc}</p>
      </div>

      {parivartans.length === 0 ? (
        <div className="rounded-lg border border-[var(--border-subtle)] bg-white/5 p-6 text-center text-sm text-[var(--text-muted)]">
          {t.noParivartan}
        </div>
      ) : (
        <div className="space-y-4">
          {parivartans.map((p, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[var(--border-subtle)] bg-white/5 p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-[var(--text-gold)]" />
                  <span className="font-serif text-lg font-semibold text-[var(--text-primary)]">
                    {p.yogaType}
                  </span>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                  {p.impactCategory}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-white/5 p-3">
                  <span className="text-xs font-medium text-[var(--text-muted)]">
                    {t.participatingPlanets}:
                  </span>
                  <p className="font-semibold text-[var(--text-primary)]">
                    {t[p.planet1] || p.planet1} ⇄ {t[p.planet2] || p.planet2}
                  </p>
                </div>
                <div className="rounded-lg bg-white/5 p-3">
                  <span className="text-xs font-medium text-[var(--text-muted)]">
                    {t.exchangedHouses}:
                  </span>
                  <p className="font-semibold text-[var(--text-primary)]">
                    House {p.house1} ({t[p.sign1] || p.sign1}) ⇄ House {p.house2} (
                    {t[p.sign2] || p.sign2})
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-[var(--border-subtle)] bg-white/5 p-4 text-sm text-[var(--text-primary)] leading-relaxed">
                <span className="font-semibold text-[var(--text-gold)] block mb-1">
                  {t.impactAnalysis}:
                </span>
                {p.details[lang] || p.details.en}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
