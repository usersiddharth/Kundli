import React from 'react';
import { Card, Chip } from '@heroui/react';
import { calculateLuckyFactorsAndGemstones } from '../engine/gemstones.js';
import { Gem, Sparkles, Award } from 'lucide-react';

export default function GemstonesView({ kundliData, t, lang }) {
  if (!kundliData) return null;

  const data = calculateLuckyFactorsAndGemstones(kundliData);
  const { gemstones, luckyMeta, jaiminiKarakas } = data;

  return (
    <Card className="rounded-2xl border border-[var(--border-gold)] glass-panel p-6 shadow-sm space-y-6">
      <Card.Header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4 p-0">
        <div>
          <Card.Title className="text-xl font-medium text-[var(--text-primary)] font-serif flex items-center gap-2">
            <Gem className="h-5 w-5 text-[#b85d19]" /> ॥ Lucky Gemstones & Jaimini Karakas ॥
          </Card.Title>
          <Card.Description className="text-xs text-[var(--text-muted)]">
            Astrological gemstone recommendations and primary soul indicators
          </Card.Description>
        </div>
      </Card.Header>

      {/* Lucky Meta Factors (Number, Color, Direction, Deity) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="rounded-xl border border-[var(--border-subtle)] glass-card p-4 text-xs space-y-1">
          <span className="text-[var(--text-muted)] font-medium">Lucky Numbers</span>
          <p className="font-mono text-base font-bold text-[#8b2500]">
            {luckyMeta.number.join(', ')}
          </p>
        </Card>

        <Card className="rounded-xl border border-[var(--border-subtle)] glass-card p-4 text-xs space-y-1">
          <span className="text-[var(--text-muted)] font-medium">Lucky Color</span>
          <p className="font-semibold text-sm text-[var(--text-primary)]">{luckyMeta.color}</p>
        </Card>

        <Card className="rounded-xl border border-[var(--border-subtle)] glass-card p-4 text-xs space-y-1">
          <span className="text-[var(--text-muted)] font-medium">Lucky Direction</span>
          <p className="font-semibold text-sm text-[var(--text-primary)]">{luckyMeta.direction}</p>
        </Card>

        <Card className="rounded-xl border border-[var(--border-subtle)] glass-card p-4 text-xs space-y-1">
          <span className="text-[var(--text-muted)] font-medium">Benefic Deity</span>
          <p className="font-semibold text-sm text-[var(--text-primary)]">{luckyMeta.deity}</p>
        </Card>
      </div>

      {/* Gemstone Recommendations */}
      <div>
        <h3 className="font-serif text-base font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-[var(--text-gold)]" /> Auspicious Ratna (Gemstones)
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {gemstones.map((gem, idx) => (
            <Card
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] glass-card p-5 shadow-2xs space-y-3"
            >
              <div>
                <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-2">
                  <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    {gem.type}
                  </span>
                  <Chip className="glass-badge-gold text-[11px] font-semibold">
                    <Chip.Label>{t[gem.planet] || gem.planet}</Chip.Label>
                  </Chip>
                </div>
                <h4 className="font-serif text-lg font-bold text-[var(--text-primary)] mt-2">
                  {gem.stone}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-2">
                  {gem.benefits[lang] || gem.benefits.en}
                </p>
              </div>

              <div className="rounded-xl glass-pill p-2.5 text-[11px] text-[var(--text-muted)] space-y-1 border border-[var(--border-subtle)]">
                <div>
                  <strong>Metal:</strong> {gem.metal}
                </div>
                <div>
                  <strong>Finger:</strong> {gem.finger}
                </div>
                <div>
                  <strong>Day:</strong> {gem.day}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Jaimini 7 Karakas */}
      <div>
        <h3 className="font-serif text-base font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
          <Award className="h-4 w-4 text-[var(--text-gold)]" /> Jaimini 7 Karakas (Soul
          Significators)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] glass-card">
          <table className="w-full text-left text-xs text-[var(--text-primary)]">
            <thead className="border-b border-[var(--border-subtle)] bg-[var(--bg-pill)] font-semibold text-[var(--text-secondary)]">
              <tr>
                <th className="p-3">Karaka Title</th>
                <th className="p-3">Designated Planet</th>
                <th className="p-3">Degree in Sign</th>
                <th className="p-3">Sign (Rashi)</th>
                <th className="p-3">Significance & Life Area</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {jaiminiKarakas.map((jk, idx) => (
                <tr key={idx} className="hover:bg-[var(--bg-card-hover)] transition">
                  <td className="p-3 font-semibold text-[var(--text-primary)]">
                    <span className="rounded glass-pill px-2 py-0.5 font-mono text-[11px] text-[var(--text-gold)] font-bold mr-1.5">
                      {jk.title.split(' ')[0]}
                    </span>
                    {jk.title}
                  </td>
                  <td className="p-3 font-bold text-[var(--text-primary)]">
                    {t[jk.planet] || jk.planet}
                  </td>
                  <td className="p-3 font-mono font-medium">{jk.degree}°</td>
                  <td className="p-3 font-medium text-[var(--text-gold)]">
                    {t[jk.rashi] || jk.rashi}
                  </td>
                  <td className="p-3 text-[var(--text-secondary)]">{jk.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
