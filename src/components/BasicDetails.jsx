import React from 'react';
import { Card, Chip } from '@heroui/react';
import { degToDms } from '../engine/astronomy.js';
import { Sparkles, Moon, Compass, Sun, Shield, Feather, Flame, Award } from 'lucide-react';

export default function BasicDetails({ kundliData, t }) {
  if (!kundliData) return null;

  const { panchang, ayanamsha } = kundliData;
  const ayanamshaDms = degToDms(ayanamsha).formatted;

  const detailsList = [
    { label: t.ayanamsha || 'Ayanamsha', value: ayanamshaDms, isMono: true, icon: Compass },
    { label: t.tithi || 'Tithi', value: panchang.tithi, icon: Moon },
    { label: t.vaar || 'Vaar (Day)', value: panchang.vaar, icon: Sun },
    {
      label: t.nakshatra || 'Nakshatra',
      value: `${panchang.nakshatra} (Lord: ${panchang.nakshatraLord})`,
      icon: Sparkles,
    },
    { label: t.pada || 'Pada', value: `Quarter ${panchang.pada}`, isMono: true, icon: Feather },
    {
      label: t.ascendant || 'Lagna (Ascendant)',
      value: t[panchang.ascendant] || panchang.ascendant,
      icon: Compass,
    },
    { label: t.sunSign || 'Sun Sign', value: t[panchang.sunSign] || panchang.sunSign, icon: Sun },
    {
      label: t.moonSign || 'Moon Sign',
      value: t[panchang.moonSign] || panchang.moonSign,
      icon: Moon,
    },
    { label: t.gana || 'Gana', value: panchang.gana, icon: Shield },
    { label: t.yoni || 'Yoni Symbol', value: panchang.yoni, icon: Feather },
    { label: t.nadi || 'Nadi Element', value: panchang.nadi, icon: Flame },
    { label: t.varna || 'Varna Category', value: panchang.varna, icon: Award },
  ];

  return (
    <Card className="rounded-2xl glass-panel p-4 sm:p-6 space-y-5 border border-[var(--border-subtle)]">
      <Card.Header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4 p-0">
        <Card.Title className="text-lg sm:text-xl font-medium tracking-tight text-[var(--text-primary)] font-serif flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[var(--text-gold)]" />{' '}
          {t.avakhadaChakra || 'Avakahada chakra & panchang details'}
        </Card.Title>
        <Chip className="glass-badge-gold px-3 py-1 text-xs font-semibold">
          <Chip.Label>Chitra paksha (Lahiri)</Chip.Label>
        </Chip>
      </Card.Header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {detailsList.map((item, idx) => {
          const IconComponent = item.icon || Sparkles;
          return (
            <Card
              key={idx}
              className="flex flex-row items-center justify-between rounded-xl glass-card p-3.5 transition hover:border-[var(--border-gold)] border border-[var(--border-subtle)]"
            >
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl glass-pill text-[var(--text-gold)]">
                  <IconComponent className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium text-[var(--text-muted)]">{item.label}</span>
              </div>
              <span
                className={`text-xs font-bold text-[var(--text-primary)] ${item.isMono ? 'font-mono' : ''}`}
              >
                {item.value}
              </span>
            </Card>
          );
        })}
      </div>
    </Card>
  );
}
