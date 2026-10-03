import React, { useState } from 'react';
import { RASHIS } from '../engine/kundli.js';
import { Orbit } from 'lucide-react';

export default function ZodiacWheel({ kundliData, t }) {
  const [selectedSign, setSelectedSign] = useState(0); // 0 = Aries
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  if (!kundliData) return null;

  const planets = kundliData.planets;
  const majorPlanets = Object.values(planets);

  // Zodiac 12 signs geometry
  const cx = 250;
  const cy = 250;
  const outerR = 230;
  const middleR = 175;
  const innerR = 120;
  const centerR = 60;

  // Authentic parchment mineral element colors
  const elementColors = {
    Fire: { bg: 'rgba(185, 28, 28, 0.08)', stroke: '#b91c1c', text: '#b91c1c' },
    Earth: { bg: 'rgba(180, 83, 9, 0.08)', stroke: '#b45309', text: '#b45309' },
    Air: { bg: 'rgba(3, 105, 161, 0.08)', stroke: '#0369a1', text: '#0369a1' },
    Water: { bg: 'rgba(22, 101, 52, 0.08)', stroke: '#15803d', text: '#15803d' },
  };

  // Convert degrees to polar coordinate (0° = Top / North)
  const degToCoord = (deg, radius) => {
    const angleRad = ((deg - 90) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(angleRad),
      y: cy + radius * Math.sin(angleRad),
    };
  };

  // Draw arc SVG path for a 30° zodiac sector
  const describeArc = (startAngle, endAngle, radiusIn, radiusOut) => {
    const p1 = degToCoord(startAngle, radiusOut);
    const p2 = degToCoord(endAngle, radiusOut);
    const p3 = degToCoord(endAngle, radiusIn);
    const p4 = degToCoord(startAngle, radiusIn);

    return `M ${p1.x} ${p1.y} A ${radiusOut} ${radiusOut} 0 0 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${radiusIn} ${radiusIn} 0 0 0 ${p4.x} ${p4.y} Z`;
  };

  const selectedSignInfo = RASHIS[selectedSign];
  const planetsInSelectedSign = majorPlanets.filter((p) => p.signIndex === selectedSign);

  return (
    <div className="rounded-2xl glass-panel p-4 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-[var(--text-primary)] font-serif flex items-center gap-2">
            <Orbit className="h-5 w-5 text-[#b85d19]" /> ॥ 360° Vedic Celestial Zodiac Wheel ॥
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Interactive circular sky sphere mapping planetary longitudes, elements, and nakshatras
          </p>
        </div>
        <span className="bg-[#faeee2] text-[#9c4b0f] border border-[#e8b992]/60 px-3 py-1 rounded-full text-xs font-semibold">
          Sidereal Natural Sky Projection
        </span>
      </div>

      {/* SVG Zodiac Wheel */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        <div className="relative">
          <svg viewBox="0 0 500 500" className="h-96 w-96 max-w-full drop-shadow-xl select-none">
            {/* Background Outer Ring */}
            <circle
              cx={cx}
              cy={cy}
              r={outerR}
              fill="var(--bg-chart)"
              stroke="var(--chart-line)"
              strokeWidth="2"
            />
            <circle
              cx={cx}
              cy={cy}
              r={innerR}
              fill="var(--bg-chart-poly)"
              stroke="var(--border-subtle)"
              strokeWidth="1.5"
            />
            <circle
              cx={cx}
              cy={cy}
              r={centerR}
              fill="var(--bg-pill)"
              stroke="var(--chart-line)"
              strokeWidth="2"
            />

            {/* 12 Zodiac Segments */}
            {RASHIS.map((r, i) => {
              const startDeg = i * 30;
              const endDeg = (i + 1) * 30;
              const midDeg = startDeg + 15;
              const col = elementColors[r.element];
              const isSelected = selectedSign === i;
              const midPos = degToCoord(midDeg, (outerR + middleR) / 2);
              const glyphPos = degToCoord(midDeg, (middleR + innerR) / 2);

              return (
                <g
                  key={r.id}
                  onClick={() => {
                    setSelectedSign(i);
                    setSelectedPlanet(null);
                  }}
                  className="cursor-pointer transition-all hover:opacity-90"
                >
                  <path
                    d={describeArc(startDeg, endDeg, innerR, outerR)}
                    fill={isSelected ? 'var(--bg-chart-poly-selected)' : col.bg}
                    stroke={isSelected ? 'var(--chart-line-selected)' : col.stroke}
                    strokeWidth={isSelected ? '2.5' : '1'}
                  />
                  {/* Sign Symbol */}
                  <text
                    x={glyphPos.x}
                    y={glyphPos.y}
                    fontSize="18"
                    fill={col.text}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontWeight="bold"
                  >
                    {r.symbol}
                  </text>
                  {/* Sign Name */}
                  <text
                    x={midPos.x}
                    y={midPos.y}
                    fontSize="11"
                    fontWeight="bold"
                    fill="var(--text-primary)"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-serif"
                  >
                    {i + 1} {r.id.slice(0, 3)}
                  </text>
                </g>
              );
            })}

            {/* Orbiting Planetary Markers */}
            {majorPlanets.map((p) => {
              const planetPos = degToCoord(p.lon, (innerR + centerR) / 2 + 10);
              const isPlanSelected = selectedPlanet?.name === p.name;

              return (
                <g
                  key={p.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlanet(p);
                    setSelectedSign(p.signIndex);
                  }}
                  className="cursor-pointer transition-transform hover:scale-125"
                >
                  <circle
                    cx={planetPos.x}
                    cy={planetPos.y}
                    r={isPlanSelected ? '13' : '10'}
                    fill={isPlanSelected ? 'var(--text-gold)' : 'var(--bg-pill)'}
                    stroke={isPlanSelected ? '#ffffff' : 'var(--chart-line)'}
                    strokeWidth="1.5"
                    className="shadow-md"
                  />
                  <text
                    x={planetPos.x}
                    y={planetPos.y}
                    fontSize="9"
                    fontWeight="bold"
                    fill={isPlanSelected ? '#0c0e17' : 'var(--text-primary)'}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {p.name.slice(0, 2)}
                  </text>
                </g>
              );
            })}

            {/* Center Emblem */}
            <text
              x={cx}
              y={cy - 6}
              fontSize="12"
              fontWeight="bold"
              fill="var(--text-primary)"
              textAnchor="middle"
              className="font-serif"
            >
              VEDIC
            </text>
            <text
              x={cx}
              y={cy + 10}
              fontSize="9"
              fill="var(--text-gold)"
              textAnchor="middle"
              className="font-mono"
            >
              SKY WHEEL
            </text>
          </svg>
        </div>

        {/* Selected Sign / Planet Info Card */}
        <div className="w-full max-w-sm rounded-xl glass-card p-5 space-y-4">
          <div className="border-b border-[var(--border-subtle)] pb-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Selected Cosmic Sector
            </span>
            <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] flex items-center gap-2 mt-0.5">
              <span className="text-[var(--text-gold)]">{selectedSignInfo.symbol}</span>
              <span>
                {selectedSign + 1}. {t[selectedSignInfo.id] || selectedSignInfo.id}
              </span>
            </h3>
            <div className="flex gap-2 mt-2">
              <span className="rounded-md glass-pill px-2 py-0.5 text-xs font-semibold text-[var(--text-secondary)]">
                Lord: {t[selectedSignInfo.lord] || selectedSignInfo.lord}
              </span>
              <span className="glass-badge-gold px-2 py-0.5 text-xs font-semibold">
                Element: {selectedSignInfo.element}
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-[var(--text-secondary)] block mb-2">
              Planets in this sign ({planetsInSelectedSign.length}):
            </span>
            {planetsInSelectedSign.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] italic">
                No physical planet placed in this sign.
              </p>
            ) : (
              <div className="space-y-2">
                {planetsInSelectedSign.map((p) => (
                  <div
                    key={p.name}
                    className="flex justify-between items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2.5 text-xs"
                  >
                    <div>
                      <span className="font-semibold text-[var(--text-primary)]">
                        {t[p.name] || p.name}
                      </span>
                      <span className="text-[var(--text-muted)] text-[10px] block">
                        {p.nakshatra} (Pada {p.pada})
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-[var(--text-gold)]">
                        {(p.lon % 30).toFixed(2)}°
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] block">
                        {p.dignity.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
