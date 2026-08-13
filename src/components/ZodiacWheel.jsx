import React, { useState } from 'react';
import { RASHIS, NAKSHATRAS } from '../engine/kundli.js';
import { Compass, Sparkles, Orbit, Info } from 'lucide-react';

export default function ZodiacWheel({ kundliData, t, lang }) {
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

  // Element colors
  const elementColors = {
    Fire: { bg: "#fdf1ec", stroke: "#e86c47", text: "#963518" },   // Aries, Leo, Sagi
    Earth: { bg: "#f7f4ed", stroke: "#b89f74", text: "#574426" },  // Taurus, Virgo, Cap
    Air: { bg: "#eef5f8", stroke: "#74a8c9", text: "#225675" },    // Gemini, Libra, Aqua
    Water: { bg: "#edf6f3", stroke: "#66b19a", text: "#1b5a47" }   // Cancer, Scorpio, Pisces
  };

  // Convert degrees to polar coordinate (0° = Top / North)
  const degToCoord = (deg, radius) => {
    const angleRad = ((deg - 90) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(angleRad),
      y: cy + radius * Math.sin(angleRad)
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
  const planetsInSelectedSign = majorPlanets.filter(p => p.signIndex === selectedSign);

  return (
    <div className="rounded-xl border border-[#e6dfd3] bg-[#fcfbf7] p-6 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e6dfd3] pb-4">
        <div>
          <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
            <Orbit className="h-5 w-5 text-[#b85d19]" /> 360° Vedic Celestial Zodiac Wheel
          </h2>
          <p className="text-xs text-[#736a60]">
            Interactive circular sky sphere mapping exact planetary longitudes, elements, and nakshatras
          </p>
        </div>
        <span className="rounded-full bg-[#f5efe6] px-3 py-1 text-xs font-medium text-[#544d44]">
          Sidereal Natural Sky Projection
        </span>
      </div>

      {/* SVG Zodiac Wheel */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        <div className="relative">
          <svg viewBox="0 0 500 500" className="h-96 w-96 max-w-full drop-shadow-sm select-none">
            {/* Background Outer Ring */}
            <circle cx={cx} cy={cy} r={outerR} fill="#fffdfa" stroke="#8c7456" strokeWidth="2" />
            <circle cx={cx} cy={cy} r={innerR} fill="#fcfbf7" stroke="#e6dfd3" strokeWidth="1.5" />
            <circle cx={cx} cy={cy} r={centerR} fill="#2c2825" stroke="#8c7456" strokeWidth="2" />

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
                  onClick={() => { setSelectedSign(i); setSelectedPlanet(null); }}
                  className="cursor-pointer transition-all hover:opacity-85"
                >
                  <path
                    d={describeArc(startDeg, endDeg, innerR, outerR)}
                    fill={isSelected ? "#ecd8b8" : col.bg}
                    stroke={isSelected ? "#b85d19" : col.stroke}
                    strokeWidth={isSelected ? "2.5" : "1"}
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
                    fill="#2c2825"
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
                    r={isPlanSelected ? "13" : "10"}
                    fill={isPlanSelected ? "#b85d19" : "#2c2825"}
                    stroke="#fffdfa"
                    strokeWidth="1.5"
                    className="shadow-md"
                  />
                  <text
                    x={planetPos.x}
                    y={planetPos.y}
                    fontSize="9"
                    fontWeight="bold"
                    fill="#f4ebd9"
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
              fill="#f4ebd9"
              textAnchor="middle"
              className="font-serif"
            >
              VEDIC
            </text>
            <text
              x={cx}
              y={cy + 10}
              fontSize="9"
              fill="#c2b7a3"
              textAnchor="middle"
              className="font-mono"
            >
              SKY WHEEL
            </text>
          </svg>
        </div>

        {/* Selected Sign / Planet Info Card */}
        <div className="w-full max-w-sm rounded-xl border border-[#e6dfd3] bg-[#fffdfa] p-5 shadow-2xs space-y-4">
          <div className="border-b border-[#e6dfd3] pb-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#736a60]">Selected Cosmic Sector</span>
            <h3 className="font-serif text-xl font-bold text-[#2c2825] flex items-center gap-2 mt-0.5">
              <span>{selectedSignInfo.symbol}</span>
              <span>{selectedSign + 1}. {t[selectedSignInfo.id] || selectedSignInfo.id}</span>
            </h3>
            <div className="flex gap-2 mt-2">
              <span className="rounded-md bg-[#f5efe6] px-2 py-0.5 text-xs font-semibold text-[#544d44]">
                Lord: {t[selectedSignInfo.lord] || selectedSignInfo.lord}
              </span>
              <span className="rounded-md bg-[#f5efe6] px-2 py-0.5 text-xs font-semibold text-[#b85d19]">
                Element: {selectedSignInfo.element}
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-[#544d44] block mb-2">
              Planets In This Sign ({planetsInSelectedSign.length}):
            </span>
            {planetsInSelectedSign.length === 0 ? (
              <p className="text-xs text-[#736a60] italic">No physical planet placed in this sign.</p>
            ) : (
              <div className="space-y-2">
                {planetsInSelectedSign.map(p => (
                  <div key={p.name} className="flex justify-between items-center rounded-lg border border-[#e6dfd3] bg-[#fcfbf7] p-2.5 text-xs">
                    <div>
                      <span className="font-semibold text-[#2c2825]">{t[p.name] || p.name}</span>
                      <span className="text-[#736a60] text-[10px] block">
                        {p.nakshatra} (Pada {p.pada})
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-[#b85d19]">{(p.lon % 30).toFixed(2)}°</span>
                      <span className="text-[10px] text-[#736a60] block">{p.dignity.split(' ')[0]}</span>
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
