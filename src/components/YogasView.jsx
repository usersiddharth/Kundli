import React from 'react';
import { Card, Chip } from '@heroui/react';
import { detectClassicalYogas } from '../engine/yogas.js';
import { Crown, Sparkles } from 'lucide-react';

export default function YogasView({ kundliData, t, lang }) {
  if (!kundliData) return null;

  const yogas = detectClassicalYogas(kundliData);

  return (
    <Card className="rounded-2xl border border-[var(--border-gold)] glass-panel p-6 shadow-sm">
      <Card.Header className="mb-6 border-b border-[var(--border-subtle)] pb-4 p-0">
        <div>
          <Card.Title className="text-xl font-medium text-[var(--text-primary)] font-serif flex items-center gap-2">
            <Crown className="h-5 w-5 text-[#b85d19]" /> ॥ {t.yogasTitle} ॥
          </Card.Title>
          <Card.Description className="text-xs text-[var(--text-muted)]">
            {t.yogasDesc}
          </Card.Description>
        </div>
      </Card.Header>

      {yogas.length === 0 ? (
        <Card className="rounded-xl border border-[var(--border-subtle)] glass-card p-6 text-center text-sm text-[var(--text-muted)]">
          {t.noYogas}
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {yogas.map((y, idx) => (
            <Card
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] glass-card p-5 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                  <h3 className="font-serif text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-[#b85d19]" /> {y.name}
                  </h3>
                  <Chip className="bg-[#faeee2] text-[#8b2500] border border-[#e8b992]/60 text-xs font-semibold">
                    <Chip.Label>{y.strength}</Chip.Label>
                  </Chip>
                </div>
                <p className="mt-3 text-sm text-[var(--text-primary)] leading-relaxed">
                  {y.desc[lang] || y.desc.en}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}
