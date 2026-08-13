import React, { useState } from 'react';
import { VARGA_DEFINITIONS, generateVargaChart } from '../engine/vargas.js';
import { Layers, Sparkles, Compass, Download } from 'lucide-react';

export default function DivisionalChartsView({ kundliData, t, lang }) {
  const [selectedVarga, setSelectedVarga] = useState('D10'); // Default Dashamsha (Career)
  const [chartStyle, setChartStyle] = useState('north'); // 'north' | 'south'

  if (!kundliData) return null;

  const vargaChartData = generateVargaChart(kundliData, selectedVarga);
  const currentVargaDef = VARGA_DEFINITIONS.find(v => v.id === selectedVarga) || VARGA_DEFINITIONS[0];

  const pAbbr = {
    Sun: { en: "Sun", hi: "सूर्य", gu: "સૂર્ય" },
    Moon: { en: "Mo", hi: "चंद्र", gu: "ચંદ્ર" },
    Mars: { en: "Ma", hi: "मंगल", gu: "મંગળ" },
    Mercury: { en: "Me", hi: "बुध", gu: "બુધ" },
    Jupiter: { en: "Ju", hi: "गुरु", gu: "ગુરુ" },
    Venus: { en: "Ve", hi: "शुक्र", gu: "શુક્ર" },
    Saturn: { en: "Sa", hi: "शनि", gu: "શનિ" },
    Rahu: { en: "Ra", hi: "राहु", gu: "રાહુ" },
    Ketu: { en: "Ke", hi: "કેતુ", gu: "કેતુ" },
    Lagna: { en: "Asc", hi: "लग्न", gu: "લગ્ન" }
  };

  const formatPlanets = (planets) => {
    return planets.map(p => {
      let name = pAbbr[p.name] ? pAbbr[p.name][lang] : p.name;
      return `${name}${p.retro ? '*' : ''}`;
    }).join(', ');
  };

  // North Indian Chart Coordinates
  const northCoords = [
    { numX: 200, numY: 130, textX: 200, textY: 90 },
    { numX: 130, numY: 60,  textX: 90,  textY: 50 },
    { numX: 60,  numY: 130, textX: 50,  textY: 90 },
    { numX: 130, numY: 200, textX: 90,  textY: 200 },
    { numX: 60,  numY: 270, textX: 50,  textY: 310 },
    { numX: 130, numY: 340, textX: 90,  textY: 350 },
    { numX: 200, numY: 270, textX: 200, textY: 310 },
    { numX: 270, numY: 340, textX: 310, textY: 350 },
    { numX: 340, numY: 270, textX: 350, textY: 310 },
    { numX: 270, numY: 200, textX: 310, textY: 200 },
    { numX: 340, numY: 130, textX: 350, textY: 90 },
    { numX: 270, numY: 60,  textX: 310, textY: 50 }
  ];

  return (
    <div className="rounded-xl border border-[#e6dfd3] bg-[#fcfbf7] p-6 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e6dfd3] pb-4">
        <div>
          <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
            <Layers className="h-5 w-5 text-[#b85d19]" /> Shodashvarga (ષોડશવર્ગ - Divisional Charts)
          </h2>
          <p className="text-xs text-[#736a60]">
            Explore 13 classical Vedic varga charts for specialized life domains (Career, Assets, Lineage, Spirit)
          </p>
        </div>

        {/* Chart Style Toggle */}
        <div className="flex rounded-lg border border-[#e6dfd3] bg-[#f5efe6] p-1">
          <button
            onClick={() => setChartStyle('north')}
            className={`rounded px-2.5 py-1 text-xs font-medium transition ${
              chartStyle === 'north' ? 'bg-[#2c2825] text-[#f4ebd9] shadow-xs' : 'text-[#544d44] hover:bg-[#eae3d5]'
            }`}
          >
            {t.northIndian}
          </button>
          <button
            onClick={() => setChartStyle('south')}
            className={`rounded px-2.5 py-1 text-xs font-medium transition ${
              chartStyle === 'south' ? 'bg-[#2c2825] text-[#f4ebd9] shadow-xs' : 'text-[#544d44] hover:bg-[#eae3d5]'
            }`}
          >
            {t.southIndian}
          </button>
        </div>
      </div>

      {/* Varga Selector Chips */}
      <div className="flex flex-wrap gap-1.5">
        {VARGA_DEFINITIONS.map(v => (
          <button
            key={v.id}
            onClick={() => setSelectedVarga(v.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              selectedVarga === v.id
                ? 'bg-[#2c2825] text-[#f4ebd9] shadow-xs'
                : 'border border-[#e6dfd3] bg-[#fffdfa] text-[#544d44] hover:bg-[#f5efe6]'
            }`}
          >
            {v.name}
          </button>
        ))}
      </div>

      {/* Domain Purpose Banner */}
      <div className="rounded-lg border border-[#e6dfd3] bg-[#f5efe6]/60 p-3.5 text-xs text-[#2c2825]">
        <span className="font-serif font-bold text-sm text-[#2c2825] block mb-1">
          {currentVargaDef.name} — Domain of Analysis:
        </span>
        <p className="text-[#544d44] leading-relaxed">
          {currentVargaDef.purpose[lang] || currentVargaDef.purpose.en}
        </p>
      </div>

      {/* SVG Chart Rendering */}
      <div className="flex flex-col items-center justify-center p-2">
        {chartStyle === 'north' ? (
          <svg
            viewBox="0 0 400 400"
            className="h-84 w-84 max-w-full rounded-xl border-2 border-[#8c7456] bg-[#fffdfa] shadow-sm"
          >
            <rect x="0" y="0" width="400" height="400" fill="#fffdfa" stroke="#8c7456" strokeWidth="3" />
            <line x1="0" y1="0" x2="400" y2="400" stroke="#8c7456" strokeWidth="1.5" />
            <line x1="400" y1="0" x2="0" y2="400" stroke="#8c7456" strokeWidth="1.5" />
            <polygon points="200,0 0,200 200,400 400,200" fill="none" stroke="#8c7456" strokeWidth="2" />

            {vargaChartData.houses.map((h, i) => {
              const coords = northCoords[i];
              const pNames = formatPlanets(h.planets);

              return (
                <g key={i}>
                  <text
                    x={coords.numX}
                    y={coords.numY}
                    fontSize="13"
                    fontWeight="bold"
                    fill="#b85d19"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-mono select-none"
                  >
                    {h.rashiIndex + 1}
                  </text>
                  <text
                    x={coords.textX}
                    y={coords.textY}
                    fontSize="11"
                    fontWeight="600"
                    fill="#2c2825"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="select-none"
                  >
                    {pNames}
                  </text>
                </g>
              );
            })}
          </svg>
        ) : (
          <div className="grid h-84 w-84 max-w-full grid-cols-4 grid-rows-4 border-2 border-[#8c7456] bg-[#fffdfa] text-xs shadow-sm rounded-xl overflow-hidden">
            {[
              { sign: 11, label: "Pisces" }, { sign: 0, label: "Aries" }, { sign: 1, label: "Taurus" }, { sign: 2, label: "Gemini" },
              { sign: 10, label: "Aquarius" }, { center: true }, { center: true }, { sign: 3, label: "Cancer" },
              { sign: 9, label: "Capricorn" }, { center: true }, { center: true }, { sign: 4, label: "Leo" },
              { sign: 8, label: "Sagittarius" }, { sign: 7, label: "Scorpio" }, { sign: 6, label: "Libra" }, { sign: 5, label: "Virgo" }
            ].map((box, idx) => {
              if (box.center) {
                if (idx === 5) {
                  return (
                    <div key={idx} className="col-span-2 row-span-2 flex flex-col items-center justify-center border border-[#e6dfd3] bg-[#fcfbf7] p-2 text-center">
                      <span className="font-serif text-sm font-semibold text-[#8c7456]">{currentVargaDef.name}</span>
                      <span className="text-[10px] text-[#736a60]">{t.southIndian}</span>
                    </div>
                  );
                }
                return null;
              }

              const houseData = vargaChartData.houses.find(h => h.rashiIndex === box.sign);
              const pNames = houseData ? formatPlanets(houseData.planets) : "";

              return (
                <div key={idx} className="flex flex-col justify-between border border-[#8c7456] p-1.5 bg-[#fffdfa]">
                  <span className="font-mono text-[11px] font-bold text-[#b85d19]">{box.sign + 1}</span>
                  <span className="text-[10px] font-semibold text-[#2c2825] leading-tight text-center">{pNames}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
