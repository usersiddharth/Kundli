import React from 'react';
import { calculateKpSystem } from '../engine/kpAstrology.js';
import { Shield, Sparkles, Key, Compass } from 'lucide-react';
import { degToDms } from '../engine/astronomy.js';

export default function KpView({ kundliData, t }) {
  if (!kundliData) return null;

  const kpData = calculateKpSystem(kundliData);
  const { cusps, planetKp } = kpData;

  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-white p-6 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <h2 className="text-xl font-medium text-[var(--text-primary)] font-serif flex items-center gap-2">
            <Key className="h-5 w-5 text-[#b85d19]" /> ॥ Krishnamurti Paddhati (KP System / કેપી
            જ્યોતિષ) ॥
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Exact Cuspal Sub-Lords, Placidus House Divisions, and 4-Level Planetary Significators
          </p>
        </div>
      </div>

      {/* 12 House Cusps Table */}
      <div>
        <h3 className="font-serif text-base font-semibold text-[var(--text-primary)] mb-3">
          12 House Cuspal Sub-Lords (ભાવ પ્રારંભ અને સબ લોર્ડ)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-white">
          <table className="w-full text-left text-xs text-[var(--text-primary)]">
            <thead className="border-b border-[var(--border-subtle)] bg-[#f7f2e8] font-semibold text-[var(--text-secondary)] font-serif">
              <tr>
                <th className="p-3">Cusp (House)</th>
                <th className="p-3">Degree (DMS)</th>
                <th className="p-3">Sign (Rashi)</th>
                <th className="p-3">Sign Lord (રાશિ સ્વામી)</th>
                <th className="p-3">Star Lord (નક્ષત્ર સ્વામી)</th>
                <th className="p-3">Sub Lord (સબ લોર્ડ)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {cusps.map((c) => {
                const dms = degToDms(c.degree);
                return (
                  <tr key={c.houseNum} className="hover:bg-[#faf5eb] transition">
                    <td className="p-3 font-bold text-[var(--text-primary)]">Cusp {c.houseNum}</td>
                    <td className="p-3 font-mono font-medium">{dms.formatted}</td>
                    <td className="p-3 font-medium text-[#8b2500]">{t[c.sign] || c.sign}</td>
                    <td className="p-3 font-semibold">{t[c.signLord] || c.signLord}</td>
                    <td className="p-3">{t[c.starLord] || c.starLord}</td>
                    <td className="p-3">
                      <span className="rounded bg-[#faeee2] px-2 py-0.5 font-semibold text-[#8b2500] border border-[#e8b992]/60">
                        {t[c.subLord] || c.subLord}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Planetary Significators Table */}
      <div>
        <h3 className="font-serif text-base font-semibold text-[var(--text-primary)] mb-3">
          Planetary KP Coordinates & Significations
        </h3>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-white">
          <table className="w-full text-left text-xs text-[var(--text-primary)]">
            <thead className="border-b border-[var(--border-subtle)] bg-[#f7f2e8] font-semibold text-[var(--text-secondary)] font-serif">
              <tr>
                <th className="p-3">Planet</th>
                <th className="p-3">House</th>
                <th className="p-3">Star Lord</th>
                <th className="p-3">Sub Lord</th>
                <th className="p-3">Level A (Star Lord's House)</th>
                <th className="p-3">Level B (Occupied House)</th>
                <th className="p-3">Level C (Ruler House)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {Object.values(planetKp).map((pk) => (
                <tr key={pk.name} className="hover:bg-[#faf5eb] transition">
                  <td className="p-3 font-semibold text-[var(--text-primary)]">
                    {t[pk.name] || pk.name}
                  </td>
                  <td className="p-3 font-mono font-bold">H{pk.houseNum}</td>
                  <td className="p-3">{t[pk.starLord] || pk.starLord}</td>
                  <td className="p-3 font-bold text-[#8b2500]">{t[pk.subLord] || pk.subLord}</td>
                  <td className="p-3 text-[var(--text-secondary)]">{pk.significations.levelA}</td>
                  <td className="p-3 text-[var(--text-secondary)]">{pk.significations.levelB}</td>
                  <td className="p-3 text-[var(--text-secondary)]">{pk.significations.levelC}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
