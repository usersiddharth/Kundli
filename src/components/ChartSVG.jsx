import React, { useState, useRef } from 'react';
import { Download, Info, HelpCircle, Sun } from 'lucide-react';

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
    Sun: { en: 'Sun', hi: 'सूर्य', gu: 'સૂર્ય' },
    Moon: { en: 'Mo', hi: 'चंद्र', gu: 'ચંદ્ર' },
    Mars: { en: 'Ma', hi: 'मंगल', gu: 'મંગળ' },
    Mercury: { en: 'Me', hi: 'बुध', gu: 'બુધ' },
    Jupiter: { en: 'Ju', hi: 'गुरु', gu: 'ગુરુ' },
    Venus: { en: 'Ve', hi: 'शुक्र', gu: 'શુક્ર' },
    Saturn: { en: 'Sa', hi: 'शनि', gu: 'શનિ' },
    Rahu: { en: 'Ra', hi: 'राहु', gu: 'રાહુ' },
    Ketu: { en: 'Ke', hi: 'કેતુ', gu: 'કેતુ' },
    Lagna: { en: 'Asc', hi: 'लग्न', gu: 'લગ્ન' },
  };

  const formatPlanetNames = (planetsList) => {
    return planetsList
      .map((p) => {
        let name = pAbbr[p.name] ? pAbbr[p.name][lang] : p.name;
        let retro = p.retro ? '*' : '';
        return `${name}${retro}`;
      })
      .join(', ');
  };

  // Spacious Geometry for North Indian Diamond Chart
  const northHouseGeometries = [
    { points: '200,0 100,100 200,200 300,100', numX: 200, numY: 155, textX: 200, textY: 95 }, // H1 (Top Center Diamond)
    { points: '0,0 200,0 100,100', numX: 130, numY: 30, textX: 75, textY: 55 }, // H2 (Top Left Triangle)
    { points: '0,0 0,200 100,100', numX: 30, numY: 130, textX: 55, textY: 75 }, // H3 (Left Top Triangle)
    { points: '0,200 100,100 200,200 100,300', numX: 155, numY: 200, textX: 85, textY: 200 }, // H4 (Left Center Diamond)
    { points: '0,200 0,400 100,300', numX: 30, numY: 270, textX: 55, textY: 325 }, // H5 (Left Bottom Triangle)
    { points: '0,400 200,400 100,300', numX: 130, numY: 370, textX: 75, textY: 345 }, // H6 (Bottom Left Triangle)
    { points: '200,400 100,300 200,200 300,300', numX: 200, numY: 245, textX: 200, textY: 310 }, // H7 (Bottom Center Diamond)
    { points: '200,400 400,400 300,300', numX: 270, numY: 370, textX: 325, textY: 345 }, // H8 (Bottom Right Triangle)
    { points: '400,400 400,200 300,300', numX: 370, numY: 270, textX: 345, textY: 325 }, // H9 (Right Bottom Triangle)
    { points: '400,200 300,300 200,200 300,100', numX: 245, numY: 200, textX: 315, textY: 200 }, // H10 (Right Center Diamond)
    { points: '400,200 400,0 300,100', numX: 370, numY: 130, textX: 345, textY: 75 }, // H11 (Right Top Triangle)
    { points: '200,0 400,0 300,100', numX: 270, numY: 30, textX: 325, textY: 55 }, // H12 (Top Right Triangle)
  ];

  const handleDownloadSVG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `${chartTitle.replace(/\s+/g, '_')}_Kundli.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const currentHouseInfo = houses.find((h) => h.houseNum === activeHouse);

  return (
    <div className="rounded-2xl glass-panel p-4 sm:p-6 space-y-5">
      {/* 1. Primary Header: Title & Action Controls */}
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3.5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-[var(--text-gold)] shrink-0" />
            <h2 className="text-lg sm:text-xl font-medium tracking-tight text-[var(--text-primary)] font-serif truncate">
              ॥ {chartTitle} ॥
            </h2>
          </div>
          <p className="text-[11px] sm:text-xs text-[var(--text-muted)] font-sans mt-0.5 truncate">
            ભાવ પર ક્લિક કરીને ગ્રહ વિગત જુઓ
          </p>
        </div>

        {/* Action Controls: Compact Style Pill, Guide & SVG */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* North / South Style Pill */}
          <div className="flex rounded-xl glass-pill p-0.5 shadow-inner">
            <button
              onClick={() => setChartStyle('north')}
              title="ઉત્તર ભારતીય (ડાયમંડ સ્ટાઇલ)"
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition cursor-pointer ${
                chartStyle === 'north'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              ઉત્તર
            </button>
            <button
              onClick={() => setChartStyle('south')}
              title="દક્ષિણ ભારતીય (ચોરસ ગ્રીડ)"
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition cursor-pointer ${
                chartStyle === 'south'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              દક્ષિણ
            </button>
          </div>

          {/* Guide Button */}
          <button
            onClick={() => setShowLegend(!showLegend)}
            title="કુંડળી માર્ગદર્શિકા (Guide)"
            aria-label="Guide"
            className={`flex items-center justify-center rounded-xl p-1.5 text-xs font-semibold transition cursor-pointer ${
              showLegend
                ? 'glass-button-primary shadow-xs'
                : 'glass-card text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <HelpCircle className="h-4 w-4 text-[var(--text-gold)]" />
          </button>

          {/* SVG Download Button */}
          {chartStyle === 'north' && (
            <button
              onClick={handleDownloadSVG}
              title={t.downloadChart}
              aria-label={t.downloadChart}
              className="flex items-center justify-center rounded-xl glass-card p-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
            >
              <Download className="h-4 w-4 text-[var(--text-gold)]" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Dedicated 4-Chart Segmented Navigation Ribbon */}
      <div className="grid grid-cols-4 gap-1 rounded-xl glass-pill p-1 shadow-inner">
        {[
          { id: 'd1', label: 'લગ્ન (D1)', title: t.lagnaD1 },
          { id: 'd9', label: 'નવાંશ (D9)', title: t.navamshaD9 },
          { id: 'chandra', label: 'ચંદ્ર કુંડળી', title: t.chandraChart },
          { id: 'surya', label: 'સૂર્ય કુંડળી', title: t.suryaChart },
        ].map((item) => {
          const isActive = chartType === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setChartType(item.id);
                setActiveHouse(1);
              }}
              title={item.title}
              className={`flex items-center justify-center rounded-lg py-1.5 px-1 text-xs font-semibold transition cursor-pointer text-center truncate ${
                isActive
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Guide Legend Banner */}
      {showLegend && (
        <div className="rounded-xl glass-panel-accent p-4 text-xs text-[var(--text-secondary)] space-y-1.5 border border-[var(--border-gold)]">
          <div className="font-semibold text-[var(--text-gold)] flex items-center gap-1.5">
            <Info className="h-4 w-4" /> North Indian chart geometry:
          </div>
          <p>
            • In the North Indian chart layout, <strong>house positions remain fixed</strong>. The{' '}
            <strong>top center diamond is always House 1 (Lagna)</strong>.
          </p>
          <p>
            • Numbers inside each house (1 to 12) represent the <strong>Rashi (zodiac sign)</strong>
            , where 1=Aries, 2=Taurus, 3=Gemini, ..., 12=Pisces.
          </p>
        </div>
      )}

      {/* SVG Graphical Chart Display */}
      <div className="flex flex-col items-center justify-center p-2">
        {chartStyle === 'north' ? (
          <svg
            ref={svgRef}
            viewBox="0 0 400 400"
            className="h-88 w-88 max-w-full rounded-2xl border border-[var(--border-gold)] bg-[var(--bg-chart)] shadow-sm select-none"
          >
            {/* Background Sacred Geometric Accents */}
            <circle
              cx="200"
              cy="200"
              r="45"
              fill="none"
              stroke="var(--border-gold)"
              strokeWidth="0.8"
              opacity="0.4"
            />
            <circle
              cx="200"
              cy="200"
              r="90"
              fill="none"
              stroke="var(--border-gold)"
              strokeWidth="0.8"
              opacity="0.3"
            />

            {/* Interactive House Polygons */}
            {houses.map((h, i) => {
              const geom = northHouseGeometries[i];
              const pNames = formatPlanetNames(h.planets);
              const isSelected = activeHouse === h.houseNum;

              return (
                <g key={i} className="cursor-pointer" onClick={() => setActiveHouse(h.houseNum)}>
                  {/* Full Clickable Area Polygon */}
                  <polygon
                    points={geom.points}
                    fill={isSelected ? 'var(--bg-chart-poly-selected)' : 'var(--bg-chart-poly)'}
                    stroke={isSelected ? 'var(--chart-line-selected)' : 'var(--chart-line)'}
                    strokeWidth={isSelected ? '2.5' : '1.2'}
                    className="transition-colors hover:fill-[var(--bg-chart-poly-selected)]"
                  />

                  {/* Rashi Sign Number */}
                  <text
                    x={geom.numX}
                    y={geom.numY}
                    fontSize="13"
                    fontWeight="bold"
                    fill="var(--text-chart-num)"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-mono select-none pointer-events-none"
                  >
                    {h.rashiIndex + 1}
                  </text>

                  {/* Residing Planets */}
                  <text
                    x={geom.textX}
                    y={geom.textY}
                    fontSize="11.5"
                    fontWeight={isSelected ? '700' : '600'}
                    fill="var(--text-chart)"
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
            <polygon
              points="200,0 0,200 200,400 400,200"
              fill="none"
              stroke="var(--chart-line)"
              strokeWidth="2"
              pointerEvents="none"
            />
            <rect
              x="0"
              y="0"
              width="400"
              height="400"
              fill="none"
              stroke="var(--chart-line)"
              strokeWidth="3"
              pointerEvents="none"
            />
          </svg>
        ) : (
          /* South Indian Chart Grid */
          <div className="grid h-88 w-88 max-w-full grid-cols-4 grid-rows-4 border-2 border-[var(--border-gold)] bg-[var(--bg-chart)] text-xs shadow-xl rounded-2xl overflow-hidden select-none">
            {[
              { sign: 11, label: 'Pisces' },
              { sign: 0, label: 'Aries' },
              { sign: 1, label: 'Taurus' },
              { sign: 2, label: 'Gemini' },
              { sign: 10, label: 'Aquarius' },
              { center: true },
              { center: true },
              { sign: 3, label: 'Cancer' },
              { sign: 9, label: 'Capricorn' },
              { center: true },
              { center: true },
              { sign: 4, label: 'Leo' },
              { sign: 8, label: 'Sagittarius' },
              { sign: 7, label: 'Scorpio' },
              { sign: 6, label: 'Libra' },
              { sign: 5, label: 'Virgo' },
            ].map((box, idx) => {
              if (box.center) {
                if (idx === 5) {
                  return (
                    <div
                      key={idx}
                      className="col-span-2 row-span-2 flex flex-col items-center justify-center border border-[var(--border-subtle)] bg-[var(--bg-chart-poly)] p-2 text-center"
                    >
                      <span className="font-serif text-sm font-semibold text-[var(--text-gold)]">
                        {chartTitle}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)]">{t.southIndian}</span>
                    </div>
                  );
                }
                return null;
              }

              const houseData = houses.find((h) => h.rashiIndex === box.sign);
              const pNames = houseData ? formatPlanetNames(houseData.planets) : '';
              const isSelected = houseData && activeHouse === houseData.houseNum;

              return (
                <div
                  key={idx}
                  onClick={() => houseData && setActiveHouse(houseData.houseNum)}
                  className={`flex flex-col justify-between border border-[var(--border-subtle)] p-2 cursor-pointer transition ${
                    isSelected
                      ? 'bg-[var(--bg-chart-poly-selected)] border-[var(--chart-line-selected)]'
                      : 'bg-[var(--bg-chart-poly)] hover:bg-[var(--bg-chart-poly-selected)]'
                  }`}
                >
                  <span className="font-mono text-xs font-bold text-[var(--text-chart-num)]">
                    {box.sign + 1}
                  </span>
                  <span className="text-[11px] font-semibold text-[var(--text-chart)] leading-tight text-center">
                    {pNames}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* House Significance & Details Card */}
      {currentHouseInfo && (
        <div className="rounded-xl glass-card p-4 text-xs text-[var(--text-primary)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2">
            <span className="font-serif font-bold text-sm text-[var(--text-primary)] flex items-center gap-1.5">
              <Info className="h-4 w-4 text-[var(--text-gold)]" />
              House {currentHouseInfo.houseNum} (
              {t[currentHouseInfo.rashi.id] || currentHouseInfo.rashi.id} • Sign{' '}
              {currentHouseInfo.rashiIndex + 1}) — {currentHouseInfo.significance?.name}
            </span>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              Sign Lord:{' '}
              <strong className="text-[var(--text-gold)]">
                {t[currentHouseInfo.rashi.lord] || currentHouseInfo.rashi.lord}
              </strong>
            </span>
          </div>
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[var(--text-secondary)]">
              <strong>House significance:</strong>{' '}
              {currentHouseInfo.significance?.meaning[lang] ||
                currentHouseInfo.significance?.meaning.en}
            </span>
            <span className="text-[var(--text-primary)] font-semibold">
              Planets:{' '}
              {currentHouseInfo.planets.length > 0
                ? currentHouseInfo.planets
                    .map((p) => `${t[p.name] || p.name} (${p.deg.toFixed(1)}°)`)
                    .join(', ')
                : 'None (Empty House)'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
