import React from 'react';
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
        <span className="glass-badge-success inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-semibold shadow-xs">
          {label}
        </span>
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
        <span className="glass-badge-danger inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-semibold shadow-xs">
          {label}
        </span>
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
        <span className="glass-badge-gold inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-semibold shadow-xs">
          {label}
        </span>
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
        <span className="glass-badge-warning inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-semibold shadow-xs">
          {label}
        </span>
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
        <span className="glass-badge-info inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-semibold shadow-xs">
          {label}
        </span>
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
        <span className="inline-flex items-center gap-1 rounded-md border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-800 shadow-xs dark:border-orange-700/50 dark:bg-orange-950/70 dark:text-orange-300">
          {label}
        </span>
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
      <span className="inline-flex items-center gap-1 rounded-md border border-[#ded5c5] bg-[#f0ebe1] px-2.5 py-0.5 text-xs font-medium text-[#6b6255] dark:border-[#334155] dark:bg-[#1a2035] dark:text-[#cbd5e1]">
        {label}
      </span>
    );
  };

  return (
    <div className="glass-panel space-y-5 rounded-2xl p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <h2 className="flex items-center gap-2 font-serif text-xl font-medium tracking-tight text-[var(--text-primary)]">
            <Table className="h-5 w-5 text-[var(--text-gold)]" />{' '}
            {t.tabPlanets || 'Planetary Positions & Coordinates'}
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Exact sidereal degrees, nakshatra padas, house placements & planetary dignities
          </p>
        </div>
        <span className="glass-badge-gold rounded-full px-3 py-1 text-xs font-semibold">
          Lahiri Ayanamsha (Chitra Paksha)
        </span>
      </div>

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
                    <span
                      className={`inline-block rounded-md px-2.5 py-0.5 text-xs font-semibold shadow-xs ${
                        p.retro ? 'glass-badge-danger' : 'glass-badge-success'
                      }`}
                    >
                      {p.retro ? t.retrograde || 'વક્રી (Vakri)' : t.direct || 'માર્ગી (Direct)'}
                    </span>
                  </td>
                  <td className="p-3">{getDignityBadge(p.dignity, lang)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
