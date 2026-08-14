import React, { useState, useEffect, useMemo } from 'react';
import {
  calculateVedicClock,
  formatTimeString,
  MUHURTA_DEFINITIONS,
  PRAHAR_DEFINITIONS,
  HORA_PLANETS,
  NAKSHATRA_LIST,
  YOGA_LIST,
  TITHI_LIST
} from '../engine/vedicClock.js';
import { cityData } from '../engine/cityData.js';
import {
  Clock, Sun, Moon, Sparkles, MapPin, Play, Pause, RefreshCw,
  ShieldAlert, Compass, Navigation, Bookmark, Edit3, Eye, Search,
  CheckCircle2, BookOpen, Layers
} from 'lucide-react';

export default function VedicClockView({ t, lang = 'gu' }) {
  // Real-time ticking date object
  const [liveDate, setLiveDate] = useState(new Date());
  const [isLive, setIsLive] = useState(true);
  const [theme, setTheme] = useState('dark'); // 'dark' (Reference cosmic style) | 'light' (Parchment scale)

  // Selected City / Location for Solar calculations
  const [selectedCity, setSelectedCity] = useState("Vyara, Tapi, Gujarat");
  const [locationSearch, setLocationSearch] = useState("Vyara, Gujarat, IN");
  const [location, setLocation] = useState({
    lat: 21.1147,
    lng: 73.3986,
    tz: 5.5
  });

  // Ring Highlight / Filter States (1: Tithi, 2: Nakshatra, 3: Yoga, 4: Muhurta, 5: Prahar, 6: Ghatika)
  const [activeRings, setActiveRings] = useState({
    tithi: true,
    nakshatra: true,
    yoga: true,
    muhurta: true,
    prahar: true,
    ghatika: true
  });

  // Active Sub-Tab: 'overview' | 'muhurtas' | 'prahars' | 'horas' | 'guide'
  const [activeTab, setActiveTab] = useState('overview');

  // Live timer interval
  useEffect(() => {
    let intervalId = null;
    if (isLive) {
      intervalId = setInterval(() => {
        setLiveDate(new Date());
      }, 500);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isLive]);

  // Handle City Change
  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName);
    const cityObj = cityData.find(c => c.name === cityName);
    if (cityObj) {
      setLocation({
        lat: cityObj.lat,
        lng: cityObj.lng,
        tz: cityObj.tz
      });
      setLocationSearch(`${cityName.split(',')[0]}, IN`);
    }
  };

  // Toggle individual ring visibility
  const toggleRing = (ringKey) => {
    setActiveRings(prev => ({
      ...prev,
      [ringKey]: !prev[ringKey]
    }));
  };

  // Perform Vedic Clock Calculation
  const clockData = useMemo(() => {
    return calculateVedicClock(liveDate, location.lat, location.lng, location.tz);
  }, [liveDate, location]);

  const {
    sunriseObj,
    sunsetObj,
    ishtakaal,
    activeTithi,
    activeNakshatra,
    activeYoga,
    activeMuhurta,
    allMuhurtas,
    activePrahar,
    allPrahars,
    activeHoraPlanet,
    allHoras,
    brahmaMuhurta,
    abhijitMuhurta,
    rahuKaal
  } = clockData;

  // Angles for Ghati Pointer
  // 60 Ghati = 360° -> 1 Ghati = 6°
  const ghatiAngle = (ishtakaal.totalGhatiDec % 60) * 6;

  const isDark = theme === 'dark';

  return (
    <div className={`space-y-6 transition-colors duration-300 rounded-3xl p-3 sm:p-6 ${
      isDark
        ? 'bg-[#120e0b] text-[#f4ebd9] selection:bg-[#e6a86c]/30'
        : 'bg-[#faf8f4] text-[#2c2825]'
    }`}>
      {/* -----------------------------------------------------------------
          1. TOP LOCATION & ACTION CONTROLS BAR (Matches Reference UI)
          ----------------------------------------------------------------- */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Location Title & Search Input */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
            <span className="font-serif text-xs font-bold uppercase tracking-widest text-[#c59b27]">
              LOCATION
            </span>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                placeholder="Search city location..."
                className={`w-full rounded-xl pl-9 pr-8 py-2 text-xs font-medium border transition focus:outline-hidden ${
                  isDark
                    ? 'bg-[#1e1814] text-[#f4ebd9] border-[#382d24] focus:border-[#c59b27]'
                    : 'glass-input text-[#2c2825] border-[#d4c8b8] focus:border-[#b85d19]'
                }`}
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#a39a8e]" />
              {locationSearch && (
                <button
                  onClick={() => setLocationSearch('')}
                  className="absolute right-3 top-2.5 text-xs text-[#a39a8e] hover:text-[#c59b27]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* City Preset Dropdown */}
            <select
              aria-label="Preset City Selection"
              value={selectedCity}
              onChange={(e) => handleCitySelect(e.target.value)}
              className={`rounded-xl px-3 py-2 text-xs font-medium border cursor-pointer ${
                isDark
                  ? 'bg-[#1e1814] text-[#f4ebd9] border-[#382d24]'
                  : 'glass-input text-[#2c2825] border-[#d4c8b8]'
              }`}
            >
              {cityData.map((city, idx) => (
                <option key={idx} value={city.name} className={isDark ? 'bg-[#1e1814]' : ''}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Right Control Buttons: GPS, Saved, Manual, Theme Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((pos) => {
                    setLocation({
                      lat: pos.coords.latitude,
                      lng: pos.coords.longitude,
                      tz: 5.5
                    });
                    setLocationSearch("Current GPS Location");
                  });
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                isDark
                  ? 'bg-[#1e1814] text-[#e6a86c] border-[#382d24] hover:border-[#c59b27]'
                  : 'glass-card text-[#b85d19] border-[#d4c8b8]'
              }`}
            >
              <Navigation className="h-3.5 w-3.5 text-amber-500" />
              <span>GPS</span>
            </button>

            <button
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                isDark
                  ? 'bg-[#1e1814] text-[#f4ebd9] border-[#382d24]'
                  : 'glass-card text-[#544d44] border-[#d4c8b8]'
              }`}
            >
              <Bookmark className="h-3.5 w-3.5 text-[#c59b27]" />
              <span>Saved</span>
            </button>

            <button
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                isDark
                  ? 'bg-[#1e1814] text-[#f4ebd9] border-[#382d24]'
                  : 'glass-card text-[#544d44] border-[#d4c8b8]'
              }`}
            >
              <Edit3 className="h-3.5 w-3.5 text-[#c59b27]" />
              <span>Manual</span>
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                isDark
                  ? 'bg-[#c59b27]/20 text-[#c59b27] border-[#c59b27]/50'
                  : 'glass-button-dark text-[#f4ebd9]'
              }`}
            >
              {isDark ? <Sun className="h-3.5 w-3.5 text-[#c59b27]" /> : <Moon className="h-3.5 w-3.5 text-[#e6a86c]" />}
              <span>{isDark ? 'Cosmic Dark' : 'Parchment'}</span>
            </button>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            RING LEGEND / TOGGLE FILTER BAR (Matches Reference Filter Ribbon)
            ----------------------------------------------------------------- */}
        <div className={`flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-2.5 rounded-2xl border ${
          isDark ? 'bg-[#18130f] border-[#2d241d]' : 'glass-pill border-[#e6dfd3]'
        }`}>
          {/* Ring 1: Tithi */}
          <button
            onClick={() => toggleRing('tithi')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${
              activeRings.tithi
                ? 'bg-[#c59b27]/20 text-[#c59b27] border border-[#c59b27]/60'
                : 'opacity-40 text-[#a39a8e]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#c59b27]" />
            <span>1 Tithi</span>
          </button>

          {/* Ring 2: Nakshatra */}
          <button
            onClick={() => toggleRing('nakshatra')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${
              activeRings.nakshatra
                ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/60'
                : 'opacity-40 text-[#a39a8e]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
            <span>2 Nakshatra</span>
          </button>

          {/* Ring 3: Yoga */}
          <button
            onClick={() => toggleRing('yoga')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${
              activeRings.yoga
                ? 'bg-[#fb923c]/20 text-[#fb923c] border border-[#fb923c]/60'
                : 'opacity-40 text-[#a39a8e]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#fb923c]" />
            <span>3 Yoga</span>
          </button>

          {/* Ring 4: Muhurta */}
          <button
            onClick={() => toggleRing('muhurta')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${
              activeRings.muhurta
                ? 'bg-[#4ade80]/20 text-[#4ade80] border border-[#4ade80]/60'
                : 'opacity-40 text-[#a39a8e]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
            <span>4 Muhurta</span>
          </button>

          {/* Ring 5: Prahar */}
          <button
            onClick={() => toggleRing('prahar')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${
              activeRings.prahar
                ? 'bg-[#818cf8]/20 text-[#818cf8] border border-[#818cf8]/60'
                : 'opacity-40 text-[#a39a8e]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#818cf8]" />
            <span>5 Prahar</span>
          </button>

          {/* Ring 6: Ghatika */}
          <button
            onClick={() => toggleRing('ghatika')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${
              activeRings.ghatika
                ? 'bg-[#facc15]/20 text-[#facc15] border border-[#facc15]/60'
                : 'opacity-40 text-[#a39a8e]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#facc15]" />
            <span>6 Ghatika</span>
          </button>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          2. CONCENTRIC MULTI-RING CLOCK DIAL (Precision SVG Rendering)
          ----------------------------------------------------------------- */}
      <div className={`relative flex flex-col items-center justify-center p-4 sm:p-8 rounded-3xl border shadow-xl overflow-hidden min-h-[560px] ${
        isDark
          ? 'bg-[#15100c] border-[#2d241d] shadow-[#000000]/60'
          : 'glass-panel border-[#e6dfd3]'
      }`}>
        {/* Top Sunrise & Bottom Sunset Pins */}
        <div className="absolute top-3 z-20 flex items-center gap-1 bg-[#c59b27]/20 border border-[#c59b27]/60 text-[#c59b27] px-3 py-1 rounded-full text-[11px] font-mono font-bold">
          <Sun className="h-3.5 w-3.5 text-amber-500" />
          <span>SUNRISE {formatTimeString(sunriseObj)}</span>
        </div>

        <div className="absolute bottom-3 z-20 flex items-center gap-1 bg-[#c59b27]/20 border border-[#c59b27]/60 text-[#c59b27] px-3 py-1 rounded-full text-[11px] font-mono font-bold">
          <Moon className="h-3.5 w-3.5 text-amber-500" />
          <span>SUNSET {formatTimeString(sunsetObj)}</span>
        </div>

        {/* Concentric SVG Canvas */}
        <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] my-4">
          <svg viewBox="0 0 600 600" className="w-full h-full drop-shadow-2xl">
            <defs>
              {/* Glow Filters */}
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="blueGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base Background Circle */}
            <circle cx="300" cy="300" r="290" fill={isDark ? "#120e0b" : "#faf8f4"} stroke={isDark ? "#382d24" : "#d4c8b8"} strokeWidth="3" />
            <circle cx="300" cy="300" r="282" fill="none" stroke="#c59b27" strokeWidth="1.5" opacity="0.6" />

            {/* =============================================================
                RING 1: TITHI (30 Sectors, Radius 278 to 260)
                ============================================================= */}
            {activeRings.tithi && (
              <g id="tithi-ring">
                {TITHI_LIST.map((t, i) => {
                  const startDeg = i * 12 - 90;
                  const endDeg = (i + 1) * 12 - 90;
                  const isActive = activeTithi.id === t.id;

                  return (
                    <g key={i}>
                      <path
                        d={describeArc(300, 300, 270, startDeg, endDeg)}
                        fill="none"
                        stroke={isActive ? "#c59b27" : isDark ? "#282019" : "#e6dfd3"}
                        strokeWidth="14"
                        opacity={isActive ? 1 : 0.6}
                      />
                      {/* Tithi Number Label */}
                      <text
                        x={polarToCartesian(300, 300, 270, (startDeg + endDeg) / 2).x}
                        y={polarToCartesian(300, 300, 270, (startDeg + endDeg) / 2).y + 3}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="bold"
                        fill={isActive ? "#ffffff" : isDark ? "#8c7456" : "#544d44"}
                        className="font-mono"
                      >
                        {t.id <= 15 ? t.id : t.id - 15}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* =============================================================
                RING 2: NAKSHATRA (27 Sectors, Radius 258 to 240)
                ============================================================= */}
            {activeRings.nakshatra && (
              <g id="nakshatra-ring">
                {NAKSHATRA_LIST.map((n, i) => {
                  const step = 360 / 27;
                  const startDeg = i * step - 90;
                  const endDeg = (i + 1) * step - 90;
                  const isActive = activeNakshatra.id === n.id;

                  return (
                    <g key={i}>
                      <path
                        d={describeArc(300, 300, 248, startDeg, endDeg)}
                        fill="none"
                        stroke={isActive ? "#38bdf8" : isDark ? "#1d2938" : "#dbeafe"}
                        strokeWidth="14"
                        opacity={isActive ? 1 : 0.55}
                      />
                      <text
                        x={polarToCartesian(300, 300, 248, (startDeg + endDeg) / 2).x}
                        y={polarToCartesian(300, 300, 248, (startDeg + endDeg) / 2).y + 3}
                        textAnchor="middle"
                        fontSize="8"
                        fontWeight="bold"
                        fill={isActive ? "#ffffff" : "#38bdf8"}
                        className="font-mono"
                      >
                        {n.id}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* =============================================================
                RING 3: YOGA (27 Sectors, Radius 236 to 220)
                ============================================================= */}
            {activeRings.yoga && (
              <g id="yoga-ring">
                {YOGA_LIST.map((y, i) => {
                  const step = 360 / 27;
                  const startDeg = i * step - 90;
                  const endDeg = (i + 1) * step - 90;
                  const isActive = activeYoga.id === y.id;

                  return (
                    <g key={i}>
                      <path
                        d={describeArc(300, 300, 226, startDeg, endDeg)}
                        fill="none"
                        stroke={isActive ? "#fb923c" : isDark ? "#2a1c12" : "#ffedd5"}
                        strokeWidth="12"
                        opacity={isActive ? 1 : 0.5}
                      />
                      <text
                        x={polarToCartesian(300, 300, 226, (startDeg + endDeg) / 2).x}
                        y={polarToCartesian(300, 300, 226, (startDeg + endDeg) / 2).y + 3}
                        textAnchor="middle"
                        fontSize="7.5"
                        fontWeight="bold"
                        fill={isActive ? "#ffffff" : "#fb923c"}
                        className="font-mono"
                      >
                        {y.id}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* =============================================================
                RING 4: MUHURTA (30 Sectors, Radius 214 to 184)
                ============================================================= */}
            {activeRings.muhurta && (
              <g id="muhurta-ring">
                {MUHURTA_DEFINITIONS.map((m, i) => {
                  const startDeg = i * 12 - 90;
                  const endDeg = (i + 1) * 12 - 90;
                  const isActive = activeMuhurta.id === m.id;
                  const isAuspicious = m.status === 'auspicious';
                  const isInauspicious = m.status === 'inauspicious';

                  const sectorColor = isActive
                    ? "#facc15"
                    : isAuspicious
                      ? "#166534"
                      : isInauspicious
                        ? "#991b1b"
                        : "#78350f";

                  return (
                    <g key={i}>
                      {/* Sector Arc */}
                      <path
                        d={describeArc(300, 300, 198, startDeg, endDeg)}
                        fill="none"
                        stroke={sectorColor}
                        strokeWidth="24"
                        opacity={isActive ? 1 : 0.75}
                        filter={isActive ? "url(#goldGlow)" : undefined}
                      />

                      {/* Active Sector Box Outline */}
                      {isActive && (
                        <path
                          d={describeArc(300, 300, 198, startDeg, endDeg)}
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="28"
                          opacity="0.3"
                        />
                      )}

                      {/* Code Label */}
                      <text
                        x={polarToCartesian(300, 300, 198, (startDeg + endDeg) / 2).x}
                        y={polarToCartesian(300, 300, 198, (startDeg + endDeg) / 2).y + 3}
                        textAnchor="middle"
                        fontSize="7"
                        fontWeight="bold"
                        fill="#ffffff"
                        className="font-mono"
                      >
                        {m.code}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* =============================================================
                RING 5: PRAHAR (8 Sectors, Radius 182 to 154)
                Matches Glowing Blue Active Prahar Arc in Reference Image
                ============================================================= */}
            {activeRings.prahar && (
              <g id="prahar-ring">
                {allPrahars.map((p, i) => {
                  const startDeg = i * 45 - 90;
                  const endDeg = (i + 1) * 45 - 90;
                  const isActive = activePrahar.id === p.id;

                  return (
                    <g key={i}>
                      <path
                        d={describeArc(300, 300, 168, startDeg, endDeg)}
                        fill="none"
                        stroke={isActive ? "#38bdf8" : isDark ? "#1e1b2e" : "#e0e7ff"}
                        strokeWidth="22"
                        opacity={isActive ? 0.95 : 0.4}
                        filter={isActive ? "url(#blueGlow)" : undefined}
                      />
                      {/* Active Prahar Highlight Outer Border Box */}
                      {isActive && (
                        <path
                          d={describeArc(300, 300, 168, startDeg, endDeg)}
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="26"
                          opacity="0.35"
                        />
                      )}
                      <text
                        x={polarToCartesian(300, 300, 168, (startDeg + endDeg) / 2).x}
                        y={polarToCartesian(300, 300, 168, (startDeg + endDeg) / 2).y + 3.5}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="bold"
                        fill={isActive ? "#ffffff" : isDark ? "#818cf8" : "#4338ca"}
                        className="font-mono"
                      >
                        {p.code}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* =============================================================
                RING 6: GHATIKA TICKS & NUMBERS (Radius 152 to 124)
                ============================================================= */}
            {activeRings.ghatika && (
              <g id="ghatika-ring">
                {Array.from({ length: 60 }).map((_, i) => {
                  const angle = i * 6 * (Math.PI / 180);
                  const isMajor = i % 5 === 0;
                  const rInner = isMajor ? 134 : 142;
                  const rOuter = 150;

                  const x1 = 300 + rInner * Math.cos(angle - Math.PI / 2);
                  const y1 = 300 + rInner * Math.sin(angle - Math.PI / 2);
                  const x2 = 300 + rOuter * Math.cos(angle - Math.PI / 2);
                  const y2 = 300 + rOuter * Math.sin(angle - Math.PI / 2);

                  const textR = 122;
                  const textX = 300 + textR * Math.cos(angle - Math.PI / 2);
                  const textY = 300 + textR * Math.sin(angle - Math.PI / 2) + 3.5;

                  return (
                    <g key={i}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={isMajor ? "#c59b27" : isDark ? "#382d24" : "#c8beaf"}
                        strokeWidth={isMajor ? 2.5 : 1}
                      />
                      {isMajor && (
                        <text
                          x={textX}
                          y={textY}
                          textAnchor="middle"
                          fontSize="9"
                          fontWeight="bold"
                          fill={isDark ? "#d4c8b8" : "#544d44"}
                          className="font-mono"
                        >
                          {i}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            )}

            {/* =============================================================
                CENTER HUB & DIGITAL VEDIC TIME READOUT (Matches Reference UI)
                ============================================================= */}
            <circle cx="300" cy="300" r="110" fill={isDark ? "#0e0b08" : "#fffdfa"} stroke="#c59b27" strokeWidth="2.5" />
            <circle cx="300" cy="300" r="104" fill="none" stroke={isDark ? "#282019" : "#e6dfd3"} strokeWidth="1" />

            {/* Hand 1: Main Glowing Arrow Pointer pointing to Ghati position */}
            <line
              x1="300"
              y1="300"
              x2={300 + 155 * Math.sin(ghatiAngle * (Math.PI / 180))}
              y2={300 - 155 * Math.cos(ghatiAngle * (Math.PI / 180))}
              stroke="#fb923c"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#goldGlow)"
            />

            {/* Arrowhead Cap at Tip */}
            <circle
              cx={300 + 155 * Math.sin(ghatiAngle * (Math.PI / 180))}
              cy={300 - 155 * Math.cos(ghatiAngle * (Math.PI / 180))}
              r="5"
              fill="#facc15"
            />

            {/* Hand 2: Opposite Counter Line */}
            <line
              x1="300"
              y1="300"
              x2={300 - 90 * Math.sin(ghatiAngle * (Math.PI / 180))}
              y2={300 + 90 * Math.cos(ghatiAngle * (Math.PI / 180))}
              stroke="#ea580c"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <circle cx="300" cy="300" r="8" fill="#322d29" stroke="#facc15" strokeWidth="2" />
          </svg>

          {/* Center Overlay Text Readout (Matches Exact Reference Box) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10">
            <span className="text-[10px] font-serif font-bold uppercase tracking-[0.25em] text-[#c59b27]">
              VEDIC TIME
            </span>

            <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-[#facc15] drop-shadow-md my-0.5">
              {ishtakaal.formatted}
            </span>

            <span className="text-[9px] font-mono uppercase tracking-widest text-[#a39a8e]">
              GHATI : PALA
            </span>

            <span className="text-[11px] font-mono font-bold text-[#e6a86c] mt-1">
              {ishtakaal.totalPalaCount.toLocaleString()} Pala
            </span>

            <span className="text-xs font-serif font-bold text-[#4ade80] mt-0.5">
              {activeMuhurta.name[lang] || activeMuhurta.name.gu} ({activeMuhurta.name.hi})
            </span>
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          3. REAL-TIME VEDIC PANCHANG SUMMARY CARDS
          ----------------------------------------------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* 1. Tithi Card */}
        <div className={`p-3 rounded-2xl border transition ${
          isDark ? 'bg-[#18130f] border-[#2d241d]' : 'glass-card border-[#e6dfd3]'
        }`}>
          <span className="text-[10px] font-serif text-[#c59b27] uppercase tracking-wider block">૧. વર્તમાન તિથિ</span>
          <h4 className="font-serif text-xs font-bold text-[#f4ebd9] mt-0.5 line-clamp-1">
            {activeTithi.name[lang] || activeTithi.name.gu}
          </h4>
          <span className="text-[10px] font-mono text-[#a39a8e] mt-1 block">
            {activeTithi.paksha} Paksha
          </span>
        </div>

        {/* 2. Nakshatra Card */}
        <div className={`p-3 rounded-2xl border transition ${
          isDark ? 'bg-[#18130f] border-[#2d241d]' : 'glass-card border-[#e6dfd3]'
        }`}>
          <span className="text-[10px] font-serif text-[#38bdf8] uppercase tracking-wider block">૨. સક્રિય નક્ષત્ર</span>
          <h4 className="font-serif text-xs font-bold text-[#f4ebd9] mt-0.5 line-clamp-1">
            {activeNakshatra.name[lang] || activeNakshatra.name.gu}
          </h4>
          <span className="text-[10px] font-mono text-[#a39a8e] mt-1 block">
            #{activeNakshatra.id} / 27
          </span>
        </div>

        {/* 3. Yoga Card */}
        <div className={`p-3 rounded-2xl border transition ${
          isDark ? 'bg-[#18130f] border-[#2d241d]' : 'glass-card border-[#e6dfd3]'
        }`}>
          <span className="text-[10px] font-serif text-[#fb923c] uppercase tracking-wider block">૩. દૈનિક યોગ</span>
          <h4 className="font-serif text-xs font-bold text-[#f4ebd9] mt-0.5 line-clamp-1">
            {activeYoga.name[lang] || activeYoga.name.gu}
          </h4>
          <span className="text-[10px] font-mono text-[#a39a8e] mt-1 block">
            #{activeYoga.id} / 27
          </span>
        </div>

        {/* 4. Active Muhurta Card */}
        <div className={`p-3 rounded-2xl border transition ${
          isDark ? 'bg-[#18130f] border-[#2d241d]' : 'glass-card border-[#e6dfd3]'
        }`}>
          <span className="text-[10px] font-serif text-[#4ade80] uppercase tracking-wider block">૪. સક્રિય મુહૂર્ત</span>
          <h4 className="font-serif text-xs font-bold text-[#f4ebd9] mt-0.5 line-clamp-1">
            {activeMuhurta.name[lang] || activeMuhurta.name.gu}
          </h4>
          <span className="text-[10px] font-mono text-[#a39a8e] mt-1 block">
            #{activeMuhurta.id} ({activeMuhurta.deity[lang] || activeMuhurta.deity.gu})
          </span>
        </div>

        {/* 5. Active Prahar Card */}
        <div className={`p-3 rounded-2xl border transition ${
          isDark ? 'bg-[#18130f] border-[#2d241d]' : 'glass-card border-[#e6dfd3]'
        }`}>
          <span className="text-[10px] font-serif text-[#818cf8] uppercase tracking-wider block">૫. વર્તમાન પહર</span>
          <h4 className="font-serif text-xs font-bold text-[#f4ebd9] mt-0.5 line-clamp-1">
            {activePrahar.name[lang] || activePrahar.name.gu}
          </h4>
          <span className="text-[10px] font-mono text-[#a39a8e] mt-1 block">
            #{activePrahar.id} ({activePrahar.period})
          </span>
        </div>

        {/* 6. Active Hora Card */}
        <div className={`p-3 rounded-2xl border transition ${
          isDark ? 'bg-[#18130f] border-[#2d241d]' : 'glass-card border-[#e6dfd3]'
        }`}>
          <span className="text-[10px] font-serif text-[#facc15] uppercase tracking-wider block">૬. ગ્રહ હોરા</span>
          <h4 className="font-serif text-xs font-bold text-[#f4ebd9] mt-0.5 line-clamp-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: activeHoraPlanet.color }} />
            {activeHoraPlanet.name[lang] || activeHoraPlanet.name.gu}
          </h4>
          <span className="text-[10px] font-mono text-[#a39a8e] mt-1 block line-clamp-1">
            {activeHoraPlanet.nature[lang] || activeHoraPlanet.nature.gu}
          </span>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          4. TABBED MATRIX EXPLORER (30 Muhurtas, 8 Prahars, 24 Horas)
          ----------------------------------------------------------------- */}
      <div className={`p-4 sm:p-6 rounded-3xl border ${
        isDark ? 'bg-[#15100c] border-[#2d241d]' : 'glass-panel border-[#e6dfd3]'
      }`}>
        <div role="tablist" aria-label="Vedic Clock Explorer Tabs" className="flex overflow-x-auto no-scrollbar gap-2 border-b border-[#2d241d] pb-3 mb-4">
          <button
            role="tab"
            aria-selected={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'overview'
                ? 'bg-[#c59b27] text-black font-bold'
                : 'text-[#a39a8e] hover:bg-[#1e1814]'
            }`}
          >
            ૩૦ મુહૂર્ત કોષ્ટક (30 Muhurtas)
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'prahars'}
            onClick={() => setActiveTab('prahars')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'prahars'
                ? 'bg-[#c59b27] text-black font-bold'
                : 'text-[#a39a8e] hover:bg-[#1e1814]'
            }`}
          >
            આઠ પહર સમયરેખા (8 Prahars)
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'horas'}
            onClick={() => setActiveTab('horas')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'horas'
                ? 'bg-[#c59b27] text-black font-bold'
                : 'text-[#a39a8e] hover:bg-[#1e1814]'
            }`}
          >
            ૨૪ ગ્રહ હોરા (24 Horas)
          </button>
        </div>

        {/* TAB 1: 30 MUHURTAS MATRIX */}
        {activeTab === 'overview' && (
          <div className="overflow-x-auto rounded-xl border border-[#2d241d]">
            <table className="w-full text-left text-xs">
              <thead className={isDark ? "bg-[#1f1914] text-[#c59b27] font-serif font-bold" : "bg-[#f3ece0] text-[#2c2825]"}>
                <tr>
                  <th className="p-3">કોડ</th>
                  <th className="p-3">ક્રમ #</th>
                  <th className="p-3">મુહૂર્તનું નામ</th>
                  <th className="p-3">અધિષ્ઠાતા દેવ</th>
                  <th className="p-3">પ્રકૃતિ</th>
                  <th className="p-3">પ્રારંભ સમય</th>
                  <th className="p-3">સમાપ્તિ સમય</th>
                  <th className="p-3">સ્થિતિ</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-[#2d241d] bg-[#120e0b]' : 'divide-[#e6dfd3] bg-white'}`}>
                {allMuhurtas.map((m) => (
                  <tr
                    key={m.id}
                    className={`transition ${
                      m.isActive
                        ? 'bg-[#c59b27]/20 font-bold text-[#facc15]'
                        : 'hover:bg-[#1c1611]'
                    }`}
                  >
                    <td className="p-3 font-mono text-[#c59b27] font-bold">{m.code}</td>
                    <td className="p-3 font-mono">#{m.id}</td>
                    <td className="p-3 font-serif font-bold">{m.name[lang] || m.name.gu}</td>
                    <td className="p-3 opacity-80">{m.deity[lang] || m.deity.gu}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        m.status === 'auspicious'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50'
                          : m.status === 'inauspicious'
                            ? 'bg-rose-950 text-rose-300 border border-rose-700/50'
                            : 'bg-amber-950 text-amber-300 border border-amber-700/50'
                      }`}>
                        {m.nature[lang] || m.nature.gu}
                      </span>
                    </td>
                    <td className="p-3 font-mono">{formatTimeString(m.startTime)}</td>
                    <td className="p-3 font-mono">{formatTimeString(m.endTime)}</td>
                    <td className="p-3">
                      {m.isActive ? (
                        <span className="bg-[#c59b27] text-black px-2 py-0.5 rounded-full font-bold text-[10px] animate-pulse">
                          સક્રિય (Active)
                        </span>
                      ) : m.isPassed ? (
                        <span className="opacity-40 text-[11px]">પૂર્ણ</span>
                      ) : (
                        <span className="opacity-70 text-[11px]">આવનારી</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: 8 PRAHARS */}
        {activeTab === 'prahars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allPrahars.map((p) => (
              <div
                key={p.id}
                className={`p-4 rounded-2xl border transition ${
                  p.isActive
                    ? 'bg-[#38bdf8]/15 border-[#38bdf8] ring-2 ring-[#38bdf8]/40'
                    : isDark ? 'bg-[#18130f] border-[#2d241d]' : 'glass-card border-[#e6dfd3]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-[#38bdf8]">{p.code} - #{p.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1e293b] text-[#38bdf8] font-bold">
                    {p.period === 'day' ? 'દિવસ' : 'રાત્રિ'}
                  </span>
                </div>
                <h5 className="font-serif text-sm font-bold text-[#f4ebd9]">
                  {p.name[lang] || p.name.gu}
                </h5>
                <p className="text-xs opacity-75 mt-1 line-clamp-3">
                  {p.desc[lang] || p.desc.gu}
                </p>
                <div className="mt-2 pt-2 border-t border-[#2d241d] font-mono text-[11px] text-[#c59b27]">
                  ઘડી વ્યાપ્તિ: {p.ghati}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: 24 HORAS */}
        {activeTab === 'horas' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {allHoras.map((h, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl text-center border transition ${
                  h.isActive
                    ? 'bg-[#facc15]/15 border-[#facc15] ring-2 ring-[#facc15]/40'
                    : isDark ? 'bg-[#18130f] border-[#2d241d]' : 'glass-card border-[#e6dfd3]'
                }`}
              >
                <span className="text-[10px] font-mono opacity-70 block">{h.startStr} - {h.endStr}</span>
                <div className="w-3 h-3 rounded-full mx-auto my-1" style={{ backgroundColor: h.planet.color }} />
                <h5 className="font-serif text-xs font-bold">{h.planet.name[lang] || h.planet.name.gu}</h5>
                {h.isActive && (
                  <span className="bg-[#facc15] text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full block mt-1">
                    સક્રિય
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}
