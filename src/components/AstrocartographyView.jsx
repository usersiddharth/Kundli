import React, { useState, useMemo } from 'react';
import { calculateAstrocartographyLines, PLANET_COLOR_MAP } from '../engine/astrocartography.js';
import { Globe, MapPin, Sparkles, Compass, Filter, Eye, Layers } from 'lucide-react';

export default function AstrocartographyView({ kundliData, t, lang = 'gu' }) {
  const [selectedPlanetFilter, setSelectedPlanetFilter] = useState('ALL');

  const data = useMemo(() => {
    return calculateAstrocartographyLines(kundliData);
  }, [kundliData]);

  const { lines, cities } = data;

  const filteredLines = useMemo(() => {
    if (selectedPlanetFilter === 'ALL') return lines;
    return lines.filter((l) => l.planetKey === selectedPlanetFilter);
  }, [lines, selectedPlanetFilter]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* 1. Header Banner */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-button-dark text-[var(--text-gold)]">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              એસ્ટ્રોકાર્ટોગ્રાફી વિશ્વ નકશો (AstroCartography World Map)
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              વિશ્વના વિવિધ દેશોમાં તમારી કારકિર્દી, ધન, પ્રેમ અને શાંતિ આપતી ગ્રહ રેખાઓ
            </p>
          </div>
        </div>
      </div>

      {/* 2. Interactive Planet Line Filter Ribbon */}
      <div className="glass-card p-3 rounded-2xl border border-[var(--border-subtle)] space-y-2">
        <span className="text-[11px] font-serif font-bold text-[var(--text-gold)] uppercase tracking-wider block px-1">
          ગ્રહ રેખા ફિલ્ટર (Filter Planet Lines)
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedPlanetFilter('ALL')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
              selectedPlanetFilter === 'ALL'
                ? 'bg-[#b85d19] text-white shadow-xs'
                : 'glass-pill text-[var(--text-secondary)] hover:bg-white/10'
            }`}
          >
            સર્વ ગ્રહો (All Lines)
          </button>

          {Object.keys(PLANET_COLOR_MAP).map((pKey) => {
            const meta = PLANET_COLOR_MAP[pKey];
            const isSelected = selectedPlanetFilter === pKey;
            return (
              <button
                key={pKey}
                onClick={() => setSelectedPlanetFilter(pKey)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition border ${
                  isSelected
                    ? 'glass-button-dark text-white border-transparent'
                    : 'glass-pill text-[var(--text-primary)] border-[var(--border-subtle)] hover:bg-white/10'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                <span>{pKey}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SVG World Map Projection Canvas */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-4 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
          <h3 className="font-serif text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Compass className="h-4 w-4 text-[var(--text-gold)]" />
            વૈશ્વિક ગ્રહ મિડહેવન (MC) અને એસેન્ડન્ટ (ASC) રેખાઓ
          </h3>
          <span className="text-xs font-mono text-[var(--text-muted)]">રેખાંશ ક્ષેત્ર: -180° થી +180°</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#334155] shadow-2xl">
          <div className="min-w-[720px] h-[380px] relative bg-[#0b1329] overflow-hidden">
            <svg viewBox="0 0 800 400" className="w-full h-full">
              <defs>
                <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0b1329" />
                  <stop offset="100%" stopColor="#111c3a" />
                </linearGradient>
              </defs>

              {/* Ocean Base */}
              <rect width="800" height="400" fill="url(#oceanGrad)" />

              {/* Longitude & Latitude Grid */}
              <line
                x1="0"
                y1="200"
                x2="800"
                y2="200"
                stroke="#334155"
                strokeWidth="1.5"
                strokeDasharray="4"
              />
              <line
                x1="400"
                y1="0"
                x2="400"
                y2="400"
                stroke="#334155"
                strokeWidth="1.5"
                strokeDasharray="4"
              />

              {/* Equator & Meridian Labels */}
              <text x="405" y="15" fill="#64748b" fontSize="9" className="font-mono">
                0° Meridian
              </text>
              <text x="10" y="195" fill="#64748b" fontSize="9" className="font-mono">
                0° Equator
              </text>
              <text x="10" y="20" fill="#64748b" fontSize="9" className="font-mono">
                -180° W
              </text>
              <text x="750" y="20" fill="#64748b" fontSize="9" className="font-mono">
                +180° E
              </text>

              {/* Simplified World Continents Vector Outlines */}
              <g id="continents" fill="#1e293b" stroke="#334155" strokeWidth="1" opacity="0.85">
                {/* North America */}
                <path d="M 120 70 L 220 80 L 260 140 L 200 180 L 160 170 L 100 120 Z" />
                {/* South America */}
                <path d="M 220 210 L 270 230 L 260 320 L 220 350 L 200 270 Z" />
                {/* Europe */}
                <path d="M 380 60 L 460 65 L 450 120 L 390 120 Z" />
                {/* Africa */}
                <path d="M 380 140 L 470 150 L 480 260 L 420 300 L 380 230 Z" />
                {/* Asia */}
                <path d="M 470 60 L 680 70 L 720 180 L 580 180 L 480 130 Z" />
                {/* Australia */}
                <path d="M 640 260 L 730 260 L 720 330 L 650 330 Z" />
              </g>

              {/* Global City Dots & Pins */}
              {cities.map((city, idx) => {
                const cx = 400 + (city.lng / 180) * 400;
                const cy = 200 - (city.lat / 90) * 180;
                return (
                  <g key={idx}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r="4"
                      fill="#facc15"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <text
                      x={cx}
                      y={cy - 7}
                      fill="#e2e8f0"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="font-serif shadow-xs"
                    >
                      {city.name.split(',')[0]}
                    </text>
                  </g>
                );
              })}

              {/* Planetary AstroCartography MC Zenith Lines */}
              {filteredLines.map((l, i) => {
                const x = 400 + (l.mcLongitude / 180) * 400;

                return (
                  <g key={i}>
                    {/* Glowing Vertical Line */}
                    <line
                      x1={x}
                      y1="0"
                      x2={x}
                      y2="400"
                      stroke={l.color}
                      strokeWidth="2.5"
                      strokeDasharray="6"
                      opacity="0.9"
                    />

                    {/* Top Planet Badge */}
                    <rect
                      x={x - 22}
                      y="5"
                      width="44"
                      height="18"
                      rx="4"
                      fill="#0f172a"
                      stroke={l.color}
                      strokeWidth="1.5"
                    />
                    <text
                      x={x}
                      y="17"
                      fill={l.color}
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="font-mono"
                    >
                      {l.planetKey}
                    </text>

                    {/* Bottom Planet Label */}
                    <text
                      x={x}
                      y="390"
                      fill={l.color}
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="font-mono"
                    >
                      {l.planetKey} MC
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* 4. Global City Proximity & Astrological Alignment Cards */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-4">
        <h3 className="font-serif text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--text-gold)]" />
          શહેરોનું ગ્રહ લાઇન સાથે અનુકૂળતા વિશ્લેષણ (City Planetary Alignments)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cities.map((city, idx) => (
            <div key={idx} className="glass-card p-4 rounded-2xl border border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[var(--text-gold)]" />
                  {city.name}
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)] bg-white/5 px-2 py-0.5 rounded-full">
                  {city.region}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-[var(--text-muted)]">સૌથી નજીકની ગ્રહ લાઇન:</span>
                <span
                  className="text-xs font-bold font-serif px-2.5 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: city.alignedColor }}
                >
                  {city.alignedPlanet} MC ({city.orbDegree}° ઓર્બ)
                </span>
              </div>

              <p className="text-xs text-[var(--text-secondary)] pt-1">
                {city.alignedLabel[lang] || city.alignedLabel.gu}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
