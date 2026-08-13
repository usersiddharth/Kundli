import React, { useState, useRef } from 'react';
import { Download, Info, HelpCircle } from 'lucide-react';

export default function ChartSVG({ kundliData, t, lang }) {
  const [chartStyle, setChartStyle] = useState('north'); // 'north' | 'south'
  const [chartType, setChartType] = useState('d1'); // 'd1' | 'd9' | 'chandra' | 'surya'
  const [activeHouse, setActiveHouse] = useState(1);
  const [showLegend, setShowLegend] = useState(false);
  const svgRef = useRef(null);

  if (!kundliData) return null;

  let houses = kundliData.d1Houses;
  let chartTitle = t.lagnaD1;

  if (chartType === 'd9') {
    houses = kundliData.d9Houses;
    chartTitle = t.navamshaD9;
  } else if (chartType === 'chandra') {
    houses = kundliData.chandraHouses;
    chartTitle = t.chandraChart;
  } else if (chartType === 'surya') {
    houses = kundliData.suryaHouses;
    chartTitle = t.suryaChart;
  }

  // Planet short abbreviations in EN, HI, GU
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

  const formatPlanetNames = (planetsList) => {
    return planetsList.map(p => {
      let name = pAbbr[p.name] ? pAbbr[p.name][lang] : p.name;
      let retro = p.retro ? "*" : "";
      return `${name}${retro}`;
    }).join(", ");
  };

  // Spacious, Clean, Non-overlapping Geometry & Text Coordinates (North Indian Diamond Chart)
  const northHouseGeometries = [
    { points: "200,0 100,100 200,200 300,100", numX: 200, numY: 155, textX: 200, textY: 95 },   // H1 (Top Center Diamond)
    { points: "0,0 200,0 100,100", numX: 130, numY: 30, textX: 75, textY: 55 },                  // H2 (Top Left Triangle)
    { points: "0,0 0,200 100,100", numX: 30, numY: 130, textX: 55, textY: 75 },                  // H3 (Left Top Triangle)
    { points: "0,200 100,100 200,200 100,300", numX: 155, numY: 200, textX: 85, textY: 200 },   // H4 (Left Center Diamond)
    { points: "0,200 0,400 100,300", numX: 30, numY: 270, textX: 55, textY: 325 },              // H5 (Left Bottom Triangle)
    { points: "0,400 200,400 100,300", numX: 130, numY: 370, textX: 75, textY: 345 },            // H6 (Bottom Left Triangle)
    { points: "200,400 100,300 200,200 300,300", numX: 200, numY: 245, textX: 200, textY: 310 },// H7 (Bottom Center Diamond)
    { points: "200,400 400,400 300,300", numX: 270, numY: 370, textX: 325, textY: 345 },        // H8 (Bottom Right Triangle)
    { points: "400,400 400,200 300,300", numX: 370, numY: 270, textX: 345, textY: 325 },        // H9 (Right Bottom Triangle)
    { points: "400,200 300,300 200,200 300,100", numX: 245, numY: 200, textX: 315, textY: 200 },// H10 (Right Center Diamond)
    { points: "400,200 400,0 300,100", numX: 370, numY: 130, textX: 345, textY: 75 },           // H11 (Right Top Triangle)
    { points: "200,0 400,0 300,100", numX: 270, numY: 30, textX: 325, textY: 55 }               // H12 (Top Right Triangle)
  ];

  const handleDownloadSVG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = `${chartTitle.replace(/\s+/g, '_')}_Kundli.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const currentHouseInfo = houses.find(h => h.houseNum === activeHouse);

  return (
    <div className="rounded-xl glass-panel p-6 shadow-sm space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e6dfd3]/80 pb-4">
        <div>
          <h2 className="text-xl font-medium text-[#2c2825] font-serif">{chartTitle}</h2>
          <p className="text-xs text-[#736a60] flex items-center gap-1.5 mt-0.5">
            <span>{t.chartType} • Click any house to inspect</span>
            <button
              onClick={() => setShowLegend(!showLegend)}
              className="text-[#b85d19] hover:underline flex items-center gap-0.5 font-medium ml-1"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Guide</span>
            </button>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Chart Type Selector */}
          <div className="flex flex-wrap rounded-lg glass-pill p-1 gap-1">
            <button
              onClick={() => { setChartType('d1'); setActiveHouse(1); }}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                chartType === 'd1' ? 'glass-button-dark text-[#f4ebd9] shadow-xs' : 'text-[#544d44] hover:bg-white/70'
              }`}
            >
              {t.lagnaD1}
            </button>
            <button
              onClick={() => { setChartType('d9'); setActiveHouse(1); }}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                chartType === 'd9' ? 'glass-button-dark text-[#f4ebd9] shadow-xs' : 'text-[#544d44] hover:bg-white/70'
              }`}
            >
              {t.navamshaD9}
            </button>
            <button
              onClick={() => { setChartType('chandra'); setActiveHouse(1); }}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                chartType === 'chandra' ? 'glass-button-dark text-[#f4ebd9] shadow-xs' : 'text-[#544d44] hover:bg-white/70'
              }`}
            >
              {t.chandraChart}
            </button>
            <button
              onClick={() => { setChartType('surya'); setActiveHouse(1); }}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                chartType === 'surya' ? 'glass-button-dark text-[#f4ebd9] shadow-xs' : 'text-[#544d44] hover:bg-white/70'
              }`}
            >
              {t.suryaChart}
            </button>
          </div>

          {/* Chart Style Switcher */}
          <div className="flex rounded-lg glass-pill p-1">
            <button
              onClick={() => setChartStyle('north')}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                chartStyle === 'north' ? 'glass-button-dark text-[#f4ebd9] shadow-xs' : 'text-[#544d44] hover:bg-white/70'
              }`}
            >
              {t.northIndian}
            </button>
            <button
              onClick={() => setChartStyle('south')}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                chartStyle === 'south' ? 'glass-button-dark text-[#f4ebd9] shadow-xs' : 'text-[#544d44] hover:bg-white/70'
              }`}
            >
              {t.southIndian}
            </button>
          </div>

          {/* Download Button */}
          {chartStyle === 'north' && (
            <button
              onClick={handleDownloadSVG}
              title={t.downloadChart}
              className="flex items-center gap-1.5 rounded-lg glass-card px-2.5 py-1.5 text-xs font-medium text-[#544d44] hover:bg-white/90 hover:text-[#2c2825] transition shadow-xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>SVG</span>
            </button>
          )}
        </div>
      </div>

      {/* Guide Legend Banner */}
      {showLegend && (
        <div className="rounded-lg glass-panel-accent p-3.5 text-xs text-[#544d44] space-y-1">
          <div className="font-semibold text-[#2c2825] flex items-center gap-1">
            <Info className="h-4 w-4 text-[#b85d19]" /> Understanding North Indian Vedic Chart:
          </div>
          <p>
            • In the North Indian chart, <strong>House positions are FIXED</strong>. The <strong>Top Center Diamond is ALWAYS House 1 (Lagna)</strong>, House 2 is Top-Left Triangle, and House 12 is <strong>Top-Right Triangle</strong>.
          </p>
          <p>
            • The numbers in each house (1 to 12) represent the <strong>Rashi (Zodiac Sign)</strong>, where 1=Aries, 2=Taurus, 3=Gemini, 4=Cancer, ..., 12=Pisces.
          </p>
          <p>
            • For Taurus Lagna, <strong>Taurus (Sign 2)</strong> is in <strong>House 1</strong>, and <strong>Aries (Sign 1)</strong> is in <strong>House 12 (Top Right Triangle)</strong>.
          </p>
        </div>
      )}

      {/* SVG Container */}
      <div className="flex flex-col items-center justify-center p-2">
        {chartStyle === 'north' ? (
          <svg
            ref={svgRef}
            viewBox="0 0 400 400"
            className="h-88 w-88 max-w-full rounded-xl border-2 border-[#8c7456] bg-white/90 shadow-md select-none"
          >
            {/* Interactive House Polygons with Click and Hover */}
            {houses.map((h, i) => {
              const geom = northHouseGeometries[i];
              const pNames = formatPlanetNames(h.planets);
              const isSelected = activeHouse === h.houseNum;

              return (
                <g
                  key={i}
                  className="cursor-pointer"
                  onClick={() => setActiveHouse(h.houseNum)}
                >
                  {/* Full Clickable Area Polygon */}
                  <polygon
                    points={geom.points}
                    fill={isSelected ? "#fae8d4" : "rgba(255, 253, 250, 0.85)"}
                    stroke="#8c7456"
                    strokeWidth={isSelected ? "2.2" : "1.2"}
                    className="transition-colors hover:fill-[#f8efe2]"
                  />

                  {/* Clean Rashi Sign Number at Corner/Apex */}
                  <text
                    x={geom.numX}
                    y={geom.numY}
                    fontSize="13"
                    fontWeight="bold"
                    fill={isSelected ? "#802020" : "#b85d19"}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-mono select-none pointer-events-none"
                  >
                    {h.rashiIndex + 1}
                  </text>

                  {/* Residing Planets in Spacious Center */}
                  <text
                    x={geom.textX}
                    y={geom.textY}
                    fontSize="11.5"
                    fontWeight={isSelected ? "700" : "600"}
                    fill="#2c2825"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="select-none pointer-events-none"
                  >
                    {pNames}
                  </text>
                </g>
              );
            })}

            {/* Inner Diamond Border Accent */}
            <polygon points="200,0 0,200 200,400 400,200" fill="none" stroke="#8c7456" strokeWidth="2" pointerEvents="none" />
            <rect x="0" y="0" width="400" height="400" fill="none" stroke="#8c7456" strokeWidth="3" pointerEvents="none" />
          </svg>
        ) : (
          /* South Indian Chart Grid */
          <div className="grid h-88 w-88 max-w-full grid-cols-4 grid-rows-4 border-2 border-[#8c7456] bg-white/90 text-xs shadow-md rounded-xl overflow-hidden select-none">
            {[
              { sign: 11, label: "Pisces" }, { sign: 0, label: "Aries" }, { sign: 1, label: "Taurus" }, { sign: 2, label: "Gemini" },
              { sign: 10, label: "Aquarius" }, { center: true }, { center: true }, { sign: 3, label: "Cancer" },
              { sign: 9, label: "Capricorn" }, { center: true }, { center: true }, { sign: 4, label: "Leo" },
              { sign: 8, label: "Sagittarius" }, { sign: 7, label: "Scorpio" }, { sign: 6, label: "Libra" }, { sign: 5, label: "Virgo" }
            ].map((box, idx) => {
              if (box.center) {
                if (idx === 5) {
                  return (
                    <div key={idx} className="col-span-2 row-span-2 flex flex-col items-center justify-center border border-[#e6dfd3] bg-[#fcfbf7]/90 p-2 text-center">
                      <span className="font-serif text-sm font-semibold text-[#8c7456]">{chartTitle}</span>
                      <span className="text-[10px] text-[#736a60]">{t.southIndian}</span>
                    </div>
                  );
                }
                return null;
              }

              const houseData = houses.find(h => h.rashiIndex === box.sign);
              const pNames = houseData ? formatPlanetNames(houseData.planets) : "";
              const isSelected = houseData && activeHouse === houseData.houseNum;

              return (
                <div
                  key={idx}
                  onClick={() => houseData && setActiveHouse(houseData.houseNum)}
                  className={`flex flex-col justify-between border border-[#8c7456] p-2 cursor-pointer transition ${
                    isSelected ? 'bg-[#fae8d4]' : 'bg-[#fffdfa] hover:bg-[#f8efe2]'
                  }`}
                >
                  <span className="font-mono text-xs font-bold text-[#b85d19]">{box.sign + 1}</span>
                  <span className="text-[11px] font-semibold text-[#2c2825] leading-tight text-center">{pNames}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* House Significance & Details Card */}
      {currentHouseInfo && (
        <div className="rounded-xl glass-card p-4 text-xs text-[#2c2825] shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e6dfd3]/80 pb-2">
            <span className="font-serif font-bold text-sm text-[#2c2825] flex items-center gap-1.5">
              <Info className="h-4 w-4 text-[#b85d19]" />
              House {currentHouseInfo.houseNum} ({t[currentHouseInfo.rashi.id] || currentHouseInfo.rashi.id} • Sign {currentHouseInfo.rashiIndex + 1}) — {currentHouseInfo.significance?.name}
            </span>
            <span className="font-mono text-xs text-[#736a60]">
              Sign Lord: <strong>{t[currentHouseInfo.rashi.lord] || currentHouseInfo.rashi.lord}</strong>
            </span>
          </div>
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[#544d44]">
              <strong>{t.houseSignificance}:</strong> {currentHouseInfo.significance?.meaning[lang] || currentHouseInfo.significance?.meaning.en}
            </span>
            <span className="text-[#2c2825] font-semibold">
              Planets: {currentHouseInfo.planets.length > 0 ? currentHouseInfo.planets.map(p => `${t[p.name] || p.name} (${p.deg.toFixed(1)}°)`).join(", ") : "None (Clean House)"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
