import React from 'react';
import { degToDms } from '../engine/astronomy.js';
import { Table, Sparkles, Shield } from 'lucide-react';

export default function PlanetaryTable({ kundliData, t }) {
  if (!kundliData) return null;

  const planets = kundliData.planets;
  const planetKeys = ["Lagna", "Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];

  const getDignityBadge = (dignity, isRetro) => {
    if (dignity.includes("Exalted")) {
      return <span className="inline-block rounded-md bg-[#e0edd8] px-2 py-0.5 text-xs font-semibold text-[#285e20] border border-[#c1dec4]">✨ Exalted</span>;
    }
    if (dignity.includes("Debilitated")) {
      return <span className="inline-block rounded-md bg-[#f0d5d5] px-2 py-0.5 text-xs font-semibold text-[#802020] border border-[#e4b5b5]">⚠️ Debilitated</span>;
    }
    if (dignity.includes("Own House")) {
      return <span className="inline-block rounded-md bg-[#e3edf7] px-2 py-0.5 text-xs font-semibold text-[#1c4d7d] border border-[#c2d7ec]">🏠 Own Sign</span>;
    }
    if (dignity.includes("Combust")) {
      return <span className="inline-block rounded-md bg-[#fae8d4] px-2 py-0.5 text-xs font-semibold text-[#964708] border border-[#f0cca3]">🔥 Combust</span>;
    }
    return <span className="inline-block rounded-md bg-[#f5efe6] px-2 py-0.5 text-xs font-medium text-[#544d44]">{isRetro ? "Vakri" : "Direct"}</span>;
  };

  return (
    <div className="rounded-xl border border-[#e6dfd3] bg-[#fcfbf7] p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between border-b border-[#e6dfd3] pb-3 gap-2">
        <div>
          <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
            <Table className="h-5 w-5 text-[#b85d19]" /> {t.tabPlanets}
          </h2>
          <p className="text-xs text-[#736a60]">Exact sidereal degrees, nakshatra padas, house placements & planetary dignities</p>
        </div>
        <span className="rounded-full bg-[#f5efe6] px-3 py-1 text-xs font-medium text-[#544d44]">
          Lahiri Ayanamsha (Chitra Paksha)
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#2c2825]">
          <thead className="border-b border-[#e6dfd3] bg-[#f5efe6] text-xs font-semibold text-[#544d44]">
            <tr>
              <th className="p-3">{t.planet}</th>
              <th className="p-3">{t.rashi}</th>
              <th className="p-3">{t.degree}</th>
              <th className="p-3">{t.house}</th>
              <th className="p-3">{t.nakshatra}</th>
              <th className="p-3">{t.pada}</th>
              <th className="p-3">{t.status}</th>
              <th className="p-3">{t.dignity}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e6dfd3]">
            {planetKeys.map((key) => {
              const p = planets[key];
              if (!p) return null;
              const dms = degToDms(p.lon);

              return (
                <tr key={key} className="hover:bg-[#f5efe6]/60 transition">
                  <td className="p-3 font-semibold text-[#2c2825]">{t[key] || key}</td>
                  <td className="p-3 font-medium text-[#b85d19]">{t[p.rashi.id] || p.rashi.id}</td>
                  <td className="p-3 font-mono text-xs text-[#2c2825] font-medium">{dms.formatted}</td>
                  <td className="p-3 font-mono font-semibold">{p.houseNum}</td>
                  <td className="p-3 font-medium">{p.nakshatra}</td>
                  <td className="p-3 font-mono font-semibold">{p.pada}</td>
                  <td className="p-3">
                    <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                      p.retro ? 'bg-[#f0d5d5] text-[#802020]' : 'bg-[#e0edd8] text-[#285e20]'
                    }`}>
                      {p.retro ? t.retrograde : t.direct}
                    </span>
                  </td>
                  <td className="p-3">
                    {getDignityBadge(p.dignity, p.retro)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
