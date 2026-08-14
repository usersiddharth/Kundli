import React from 'react';
import { calculatePlanetaryAspects } from '../engine/aspects.js';
import { Eye } from 'lucide-react';

export default function AspectsView({ kundliData, t }) {
  if (!kundliData) return null;

  const aspects = calculatePlanetaryAspects(kundliData);

  return (
    <div className="rounded-xl border border-[#e6dfd3] bg-[#fcfbf7] p-6 shadow-sm">
      <div className="mb-6 border-b border-[#e6dfd3] pb-4">
        <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
          <Eye className="h-5 w-5 text-[#b85d19]" /> {t.aspectsTitle}
        </h2>
        <p className="text-xs text-[#736a60]">{t.aspectsDesc}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#2c2825]">
          <thead className="border-b border-[#e6dfd3] bg-[#f5efe6] text-xs font-semibold text-[#544d44]">
            <tr>
              <th className="p-3">{t.aspectingPlanet}</th>
              <th className="p-3">Source House</th>
              <th className="p-3">{t.aspectDegree}</th>
              <th className="p-3">{t.targetHouse}</th>
              <th className="p-3">Target Planets</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e6dfd3]">
            {aspects.map((a, idx) => (
              <tr key={idx} className="hover:bg-[#f5efe6]/50 transition">
                <td className="p-3 font-medium text-[#2c2825]">
                  {t[a.aspectingPlanet] || a.aspectingPlanet}
                </td>
                <td className="p-3 font-mono font-semibold">House {a.sourceHouse}</td>
                <td className="p-3 font-mono text-xs font-medium text-[#b85d19]">
                  {a.aspectDistance}th Aspect
                </td>
                <td className="p-3 font-mono font-semibold">
                  House {a.targetHouse} ({t[a.targetHouseRashi] || a.targetHouseRashi})
                </td>
                <td className="p-3 font-medium">
                  {a.targetPlanets.length > 0 ? (
                    <span className="rounded bg-[#e0edd8] px-2 py-0.5 text-xs text-[#285e20] font-semibold">
                      {a.targetPlanets.map((p) => t[p] || p).join(', ')}
                    </span>
                  ) : (
                    <span className="text-xs text-[#736a60]">Aspecting Empty House</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
