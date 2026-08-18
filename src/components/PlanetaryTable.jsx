import React from 'react';
import { Card, Chip } from '@heroui/react';
import { degToDms } from '../engine/astronomy.js';
import { Table } from 'lucide-react';

export default function PlanetaryTable({ kundliData, t, lang = 'gu' }) {
  if (!kundliData) return null;

  const planets = kundliData.planets;
  const planetKeys = [
    'Lagna',
    'Sun',
    'Moon',
    'Mars',
    'Mercury',
    'Jupiter',
    'Venus',
    'Saturn',
    'Rahu',
    'Ketu',
  ];

  // Planetary Astrological Glyphs
  const planetGlyphs = {
    Lagna: 'ASC',
    Sun: '☉',
    Moon: '☽',
    Mars: '♂',
    Mercury: '☿',
    Jupiter: '♃',
    Venus: '♀',
    Saturn: '♄',
    Rahu: '☊',
    Ketu: '☋',
  };

  const getDignityBadge = (dignity, currentLang) => {
    if (!dignity) return null;

    if (dignity.includes('Exalted')) {
      const label =
        currentLang === 'gu'
          ? '✨ ઉચ્ચ (Exalted)'
          : currentLang === 'hi'
            ? '✨ उच्च (Exalted)'
            : '✨ Exalted';
      return (
        <Chip className="glass-badge-success text-xs font-semibold">
          <Chip.Label>{label}</Chip.Label>
        </Chip>
      );
    }
    if (dignity.includes('Debilitated')) {
      const label =
        currentLang === 'gu'
          ? '⚠️ નીચ (Debilitated)'
          : currentLang === 'hi'
            ? '⚠️ नीच (Debilitated)'
            : '⚠️ Debilitated';
      return (
        <Chip className="glass-badge-danger text-xs font-semibold">
          <Chip.Label>{label}</Chip.Label>
        </Chip>
      );
    }
    if (
      dignity.includes('Own House') ||
      dignity.includes('Own Sign') ||
      dignity.includes('Swakshetra')
    ) {
      const label =
        currentLang === 'gu'
          ? '🏠 સ્વગૃહી (Own Sign)'
          : currentLang === 'hi'
            ? '🏠 स्वगृही (Own Sign)'
            : '🏠 Own Sign';
      return (
        <Chip className="glass-badge-gold text-xs font-semibold">
          <Chip.Label>{label}</Chip.Label>
        </Chip>
      );
    }
    if (dignity.includes('Combust') || dignity.includes('Asta')) {
      const label =
        currentLang === 'gu'
          ? '🔥 અસ્ત (Combust)'
          : currentLang === 'hi'
            ? '🔥 अस्त (Combust)'
            : '🔥 Combust';
      return (
        <Chip className="glass-badge-warning text-xs font-semibold">
          <Chip.Label>{label}</Chip.Label>
        </Chip>
      );
    }
    if (dignity.includes('Friendly') || dignity.includes('Mitra')) {
      const label =
        currentLang === 'gu'
          ? '🤝 મિત્ર ક્ષેત્ર (Friendly)'
          : currentLang === 'hi'
            ? '🤝 मित्र क्षेत्र (Friendly)'
            : '🤝 Friendly';
      return (
        <Chip className="glass-badge-info text-xs font-semibold">
          <Chip.Label>{label}</Chip.Label>
        </Chip>
      );
    }
    if (dignity.includes('Enemy') || dignity.includes('Shatru')) {
      const label =
        currentLang === 'gu'
          ? '⚡ શત્રુ ક્ષેત્ર (Enemy)'
          : currentLang === 'hi'
            ? '⚡ शत्रु क्षेत्र (Enemy)'
            : '⚡ Enemy';
      return (
        <Chip className="bg-orange-500/10 text-orange-600 border border-orange-400/40 text-xs font-semibold">
          <Chip.Label>{label}</Chip.Label>
        </Chip>
      );
    }

    // Default Neutral / Sama Sign
    const label =
      currentLang === 'gu'
        ? '⚖️ સમ / સામાન્ય (Neutral)'
        : currentLang === 'hi'
          ? '⚖️ सम / सामान्य (Neutral)'
          : '⚖️ Neutral';
    return (
      <Chip className="bg-stone-500/10 text-[var(--text-muted)] border border-[var(--border-subtle)] text-xs font-medium">
        <Chip.Label>{label}</Chip.Label>
      </Chip>
    );
  };

  return (
    <Card className="glass-panel space-y-5 rounded-2xl p-4 sm:p-6 border border-[var(--border-gold)]">
      <Card.Header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4 p-0">
        <div>
          <Card.Title className="flex items-center gap-2 font-serif text-xl font-medium tracking-tight text-[var(--text-primary)]">
            <Table className="h-5 w-5 text-[var(--text-gold)]" />{' '}
            {t.tabPlanets || 'Planetary Positions & Coordinates'}
          </Card.Title>
          <Card.Description className="text-xs text-[var(--text-muted)]">
            Exact sidereal degrees, nakshatra padas, house placements & planetary dignities
          </Card.Description>
        </div>
        <Chip className="glass-badge-gold px-3 py-1 text-xs font-semibold">
          <Chip.Label>Lahiri Ayanamsha (Chitra Paksha)</Chip.Label>
        </Chip>
      </Card.Header>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-[var(--text-primary)] sm:text-sm">
          <thead className="border-b border-[var(--border-subtle)] bg-[var(--bg-pill)] text-xs font-semibold text-[var(--text-secondary)]">
            <tr>
              <th className="p-3">{t.planet || 'Planet'}</th>
              <th className="p-3">{t.rashi || 'Rashi (Sign)'}</th>
              <th className="p-3">{t.degree || 'Degree'}</th>
              <th className="p-3">{t.house || 'House'}</th>
              <th className="p-3">{t.nakshatra || 'Nakshatra'}</th>
              <th className="p-3">{t.pada || 'Pada'}</th>
              <th className="p-3">{t.status || 'Motion'}</th>
              <th className="p-3">{t.dignity || 'Dignity'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {planetKeys.map((key) => {
              const p = planets[key];
              if (!p) return null;
              const dms = degToDms(p.lon);
              const glyph = planetGlyphs[key] || '';

              return (
                <tr key={key} className="transition hover:bg-[var(--bg-card-hover)]">
                  <td className="flex items-center gap-2 p-3 font-semibold text-[var(--text-primary)]">
                    <span className="font-mono text-sm font-bold text-[var(--text-gold)]">
                      {glyph}
                    </span>
                    <span>{t[key] || key}</span>
                  </td>
                  <td className="p-3 font-medium text-[var(--text-gold)]">
                    {t[p.rashi.id] || p.rashi.id}
                  </td>
                  <td className="p-3 font-mono text-xs font-medium tabular-nums text-[var(--text-secondary)]">
                    {dms.formatted}
                  </td>
                  <td className="p-3 text-center font-mono font-semibold sm:text-left">
                    {p.houseNum}
                  </td>
                  <td className="p-3 font-medium">{p.nakshatra}</td>
                  <td className="p-3 font-mono font-semibold">{p.pada}</td>
                  <td className="p-3">
                    <Chip
                      className={`text-xs font-semibold ${
                        p.retro ? 'glass-badge-danger' : 'glass-badge-success'
                      }`}
                    >
                      <Chip.Label>
                        {p.retro ? t.retrograde || 'વક્રી (Vakri)' : t.direct || 'માર્ગી (Direct)'}
                      </Chip.Label>
                    </Chip>
                  </td>
                  <td className="p-3">{getDignityBadge(p.dignity, lang)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
