import React from 'react';
import { calculateLuckyFactorsAndGemstones } from '../engine/gemstones.js';
import { Gem, Compass, Sparkles, Award, Shield } from 'lucide-react';

export default function GemstonesView({ kundliData, t, lang }) {
  if (!kundliData) return null;

  const data = calculateLuckyFactorsAndGemstones(kundliData);
  const { gemstones, luckyMeta, jaiminiKarakas } = data;

  return (
    <div className="rounded-xl border border-[#e6dfd3] bg-[#fcfbf7] p-6 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e6dfd3] pb-4">
        <div>
          <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
            <Gem className="h-5 w-5 text-[#b85d19]" /> Lucky Gemstones & Jaimini Karakas
          </h2>
          <p className="text-xs text-[#736a60]">Astrological gemstone recommendations and primary soul indicators</p>
        </div>
      </div>

      {/* Lucky Meta Factors (Number, Color, Direction, Deity) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[#e6dfd3] bg-[#fffdfa] p-4 text-xs space-y-1">
          <span className="text-[#736a60] font-medium">Lucky Numbers</span>
          <p className="font-mono text-base font-bold text-[#b85d19]">{luckyMeta.number.join(', ')}</p>
        </div>

        <div className="rounded-xl border border-[#e6dfd3] bg-[#fffdfa] p-4 text-xs space-y-1">
          <span className="text-[#736a60] font-medium">Lucky Color</span>
          <p className="font-semibold text-sm text-[#2c2825]">{luckyMeta.color}</p>
        </div>

        <div className="rounded-xl border border-[#e6dfd3] bg-[#fffdfa] p-4 text-xs space-y-1">
          <span className="text-[#736a60] font-medium">Lucky Direction</span>
          <p className="font-semibold text-sm text-[#2c2825]">{luckyMeta.direction}</p>
        </div>

        <div className="rounded-xl border border-[#e6dfd3] bg-[#fffdfa] p-4 text-xs space-y-1">
          <span className="text-[#736a60] font-medium">Benefic Deity</span>
          <p className="font-semibold text-sm text-[#2c2825]">{luckyMeta.deity}</p>
        </div>
      </div>

      {/* Gemstone Recommendations */}
      <div>
        <h3 className="font-serif text-base font-semibold text-[#2c2825] mb-3 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-[#b85d19]" /> Auspicious Ratna (Gemstones)
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {gemstones.map((gem, idx) => (
            <div key={idx} className="flex flex-col justify-between rounded-xl border border-[#e6dfd3] bg-[#fffdfa] p-5 shadow-2xs space-y-3">
              <div>
                <div className="flex justify-between items-center border-b border-[#e6dfd3] pb-2">
                  <span className="text-xs font-semibold text-[#544d44] uppercase tracking-wider">{gem.type}</span>
                  <span className="rounded-md bg-[#f5efe6] px-2 py-0.5 text-[11px] font-semibold text-[#b85d19]">{t[gem.planet] || gem.planet}</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#2c2825] mt-2">{gem.stone}</h4>
                <p className="text-xs text-[#544d44] leading-relaxed mt-2">
                  {gem.benefits[lang] || gem.benefits.en}
                </p>
              </div>

              <div className="rounded-lg bg-[#f5efe6]/60 p-2.5 text-[11px] text-[#736a60] space-y-1 border border-[#e6dfd3]/60">
                <div><strong>Metal:</strong> {gem.metal}</div>
                <div><strong>Finger:</strong> {gem.finger}</div>
                <div><strong>Day:</strong> {gem.day}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Jaimini 7 Karakas */}
      <div>
        <h3 className="font-serif text-base font-semibold text-[#2c2825] mb-3 flex items-center gap-1.5">
          <Award className="h-4 w-4 text-[#b85d19]" /> Jaimini 7 Karakas (Soul Significators)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-[#e6dfd3] bg-[#fffdfa]">
          <table className="w-full text-left text-xs text-[#2c2825]">
            <thead className="border-b border-[#e6dfd3] bg-[#f5efe6] font-semibold text-[#544d44]">
              <tr>
                <th className="p-3">Karaka Title</th>
                <th className="p-3">Designated Planet</th>
                <th className="p-3">Degree in Sign</th>
                <th className="p-3">Sign (Rashi)</th>
                <th className="p-3">Significance & Life Area</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6dfd3]">
              {jaiminiKarakas.map((jk, idx) => (
                <tr key={idx} className="hover:bg-[#f5efe6]/50 transition">
                  <td className="p-3 font-semibold text-[#2c2825]">
                    <span className="rounded bg-[#f5efe6] px-2 py-0.5 font-mono text-[11px] text-[#b85d19] font-bold mr-1.5">
                      {jk.title.split(' ')[0]}
                    </span>
                    {jk.title}
                  </td>
                  <td className="p-3 font-bold text-[#2c2825]">{t[jk.planet] || jk.planet}</td>
                  <td className="p-3 font-mono font-medium">{jk.degree}°</td>
                  <td className="p-3 font-medium text-[#b85d19]">{t[jk.rashi] || jk.rashi}</td>
                  <td className="p-3 text-[#544d44]">{jk.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
