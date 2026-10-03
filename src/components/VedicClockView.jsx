import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button, Card, Chip } from '@heroui/react';
import {
  calculateVedicClock,
  formatTimeString,
  MUHURTA_DEFINITIONS,
  NAKSHATRA_LIST,
  YOGA_LIST,
  TITHI_LIST,
} from '../engine/vedicClock.js';
import { cityData } from '../engine/cityData.js';
import {
  Clock,
  Sun,
  Moon,
  Sparkles,
  MapPin,
  Play,
  Pause,
  RotateCcw,
  Navigation,
  BookOpen,
  Compass,
  Zap,
  X,
} from 'lucide-react';

export default function VedicClockView({ t, lang = 'gu' }) {
  // Real-time ticking date object
  const [liveDate, setLiveDate] = useState(new Date());
  const [isLive, setIsLive] = useState(true);

  // Selected City / Location for Solar calculations
  const [selectedCity, setSelectedCity] = useState('Ahmedabad, Gujarat');
  const [locationSearch, setLocationSearch] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const cityDropdownRef = useRef(null);

  const [location, setLocation] = useState({
    lat: 23.0225,
    lng: 72.5714,
    tz: 5.5,
  });

  // Ring Highlight / Filter States
  const [activeRings, setActiveRings] = useState({
    tithi: true,
    nakshatra: true,
    yoga: true,
    muhurta: true,
    prahar: true,
    ghatika: true,
  });

  // Active Sub-Tab: 'muhurtas' | 'prahars' | 'horas' | 'guide'
  const [activeTab, setActiveTab] = useState('muhurtas');

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

  // Click outside to close city dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setShowCityDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered Cities for Autocomplete
  const activeQuery = locationSearch !== '' ? locationSearch : selectedCity;
  const filteredCities = activeQuery
    ? cityData.filter((c) => c.name.toLowerCase().includes(activeQuery.toLowerCase())).slice(0, 8)
    : [];

  // Handle City Change
  const handleCitySelect = (cityObj) => {
    setSelectedCity(cityObj.name);
    setLocationSearch(cityObj.name);
    setLocation({
      lat: cityObj.lat,
      lng: cityObj.lng,
      tz: cityObj.tz,
    });
    setShowCityDropdown(false);
  };

  // Toggle individual ring visibility
  const toggleRing = (ringKey) => {
    setActiveRings((prev) => ({
      ...prev,
      [ringKey]: !prev[ringKey],
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
    rahuKaal,
  } = clockData;

  // Angles for Ghati Pointer
  // 60 Ghati = 360° -> 1 Ghati = 6°
  const ghatiAngle = (ishtakaal.totalGhatiDec % 60) * 6;

  return (
    <div className="space-y-6 animate-fade-in-up pb-8">
      {/* -----------------------------------------------------------------
          1. HEADER & INTERACTIVE LOCATION / TIME CONTROLS
          ----------------------------------------------------------------- */}
      <Card className="rounded-2xl glass-panel p-4 sm:p-6 space-y-4 border border-[var(--border-gold)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          {/* Title & Invocation */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#faeee2] border border-[#e8b992]/70 text-[#b85d19] shadow-xs">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-medium tracking-tight text-[var(--text-primary)] font-serif">
                  ॥ વૈદિક ઘડિયાળ & કાળ ચક્ર (Vedic Clock) ॥
                </h1>
                <p className="text-xs text-[var(--text-muted)] font-sans">
                  પ્રથમ સૂર્યોદય આધારિત ૬૦ ઘટી, પળ, વિપળ, ૩૦ મુહૂર્ત અને ૨૪ ગ્રહ હોરા
                </p>
              </div>
            </div>
          </div>

          {/* Time Controls: Live Status, Pause/Resume, Reset to Now */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Live Indicator Badge */}
            <Chip
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-semibold border ${
                isLive
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-500'
                  : 'border-amber-500/40 bg-amber-500/10 text-amber-500'
              }`}
            >
              <Chip.Label className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}
                />
                <span>{isLive ? 'જીવંત સમય (Live)' : 'સ્થિર સમય (Paused)'}</span>
              </Chip.Label>
            </Chip>

            {/* Pause / Resume Button */}
            <Button
              type="button"
              onPress={() => setIsLive(!isLive)}
              aria-label={isLive ? 'Pause Clock' : 'Resume Clock'}
              className="flex items-center gap-1.5 rounded-xl glass-card px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition cursor-pointer"
            >
              {isLive ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{isLive ? 'Pause' : 'Play'}</span>
            </Button>

            {/* Reset to Current Live Moment */}
            <Button
              type="button"
              onPress={() => {
                setLiveDate(new Date());
                setIsLive(true);
              }}
              aria-label="Reset to Now"
              className="flex items-center gap-1.5 rounded-xl glass-card px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[var(--text-gold)]" />
              <span>હમણાં (Now)</span>
            </Button>
          </div>
        </div>

        {/* Location Selector Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          {/* Searchable City Input */}
          <div className="relative flex-1 max-w-md" ref={cityDropdownRef}>
            <div className="relative">
              <input
                type="text"
                value={locationSearch !== '' ? locationSearch : selectedCity}
                onChange={(e) => {
                  setLocationSearch(e.target.value);
                  setShowCityDropdown(true);
                }}
                onFocus={() => setShowCityDropdown(true)}
                placeholder="શહેર શોધો (દા.ત. Ahmedabad, Surat, Mumbai)..."
                className="w-full rounded-xl glass-input pl-8 pr-8 py-2 text-xs font-medium focus:outline-hidden"
              />
              <MapPin className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[var(--text-muted)] pointer-events-none" />

              {locationSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setLocationSearch('');
                    setShowCityDropdown(false);
                  }}
                  className="absolute right-2.5 top-2 h-5 w-5 flex items-center justify-center rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-pill)] transition cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown Suggestions */}
            {showCityDropdown && activeQuery.length > 0 && (
              <div className="absolute left-0 right-0 top-12 z-50 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl overflow-hidden max-h-56 overflow-y-auto divide-y divide-[var(--border-subtle)]">
                {filteredCities.map((city, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleCitySelect(city)}
                    className="w-full p-2.5 text-left text-xs hover:bg-[var(--bg-card-hover)] flex items-center justify-between text-[var(--text-primary)] cursor-pointer"
                  >
                    <span className="font-medium">{city.name}</span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      {city.lat.toFixed(2)}°N, {city.lng.toFixed(2)}°E
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick GPS & Selected Coordinates Badge */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              onPress={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((pos) => {
                    setLocation({
                      lat: pos.coords.latitude,
                      lng: pos.coords.longitude,
                      tz: 5.5,
                    });
                    setSelectedCity('Current GPS Location');
                    setLocationSearch('Current GPS Location');
                  });
                }
              }}
              className="flex items-center gap-1.5 rounded-xl glass-card px-3 py-2 text-xs font-semibold text-[var(--text-gold)] hover:bg-[var(--bg-card-hover)] transition cursor-pointer shrink-0"
            >
              <Navigation className="h-3.5 w-3.5" />
              <span>GPS સ્થાન</span>
            </Button>

            <div className="rounded-xl glass-pill px-3 py-1.5 text-[11px] font-mono text-[var(--text-muted)] hidden sm:block shrink-0">
              {location.lat.toFixed(2)}°N, {location.lng.toFixed(2)}°E (GMT+{location.tz})
            </div>
          </div>
        </div>

        {/* Ring Filter Toggles Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-xl glass-pill shadow-inner">
          <Button
            type="button"
            onPress={() => toggleRing('tithi')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeRings.tithi
                ? 'glass-button-primary shadow-xs'
                : 'text-[var(--text-muted)] opacity-50 bg-transparent'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>૧. તિથિ (Tithi)</span>
          </Button>

          <Button
            type="button"
            onPress={() => toggleRing('nakshatra')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeRings.nakshatra
                ? 'glass-button-primary shadow-xs'
                : 'text-[var(--text-muted)] opacity-50 bg-transparent'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>૨. નક્ષત્ર (Nakshatra)</span>
          </Button>

          <Button
            type="button"
            onPress={() => toggleRing('yoga')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeRings.yoga
                ? 'glass-button-primary shadow-xs'
                : 'text-[var(--text-muted)] opacity-50 bg-transparent'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span>૩. યોગ (Yoga)</span>
          </Button>

          <Button
            type="button"
            onPress={() => toggleRing('muhurta')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeRings.muhurta
                ? 'glass-button-primary shadow-xs'
                : 'text-[var(--text-muted)] opacity-50 bg-transparent'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>૪. મુહૂર્ત (Muhurta)</span>
          </Button>

          <Button
            type="button"
            onPress={() => toggleRing('prahar')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeRings.prahar
                ? 'glass-button-primary shadow-xs'
                : 'text-[var(--text-muted)] opacity-50 bg-transparent'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span>૫. પહર (Prahar)</span>
          </Button>

          <Button
            type="button"
            onPress={() => toggleRing('ghatika')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeRings.ghatika
                ? 'glass-button-primary shadow-xs'
                : 'text-[var(--text-muted)] opacity-50 bg-transparent'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <span>૬. ઘટી ડાયલ (Ghatika)</span>
          </Button>
        </div>
      </Card>

      {/* -----------------------------------------------------------------
          2. HERO DUAL SHOWCASE: CONCENTRIC DIAL + LIVE VEDIC TIMING METRICS
          ----------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Canvas: Precision Concentric SVG Clock Dial (7 Cols) */}
        <Card className="lg:col-span-7 rounded-3xl glass-panel p-4 sm:p-6 border border-[var(--border-gold)] shadow-xl relative flex flex-col items-center justify-center overflow-hidden">
          {/* Top Sunrise & Bottom Sunset Badges */}
          <div className="flex items-center justify-between w-full text-xs font-semibold mb-2 px-2">
            <div className="flex items-center gap-1.5 rounded-full glass-card px-3 py-1 text-amber-500 font-mono">
              <Sun className="h-3.5 w-3.5" />
              <span>સૂર્યોદય {formatTimeString(sunriseObj)}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full glass-card px-3 py-1 text-sky-400 font-mono">
              <Moon className="h-3.5 w-3.5" />
              <span>સૂર્યાસ્ત {formatTimeString(sunsetObj)}</span>
            </div>
          </div>

          {/* Concentric SVG Clock Face */}
          <div className="relative w-full max-w-[580px] lg:max-w-[620px] aspect-square my-2">
            <svg viewBox="0 0 600 600" className="w-full h-full drop-shadow-2xl select-none">
              <defs>
                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="blueGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Base Ring Background */}
              <circle
                cx="300"
                cy="300"
                r="292"
                fill="var(--bg-chart)"
                stroke="var(--border-gold)"
                strokeWidth="2.5"
                opacity="0.85"
              />
              <circle
                cx="300"
                cy="300"
                r="284"
                fill="none"
                stroke="var(--border-gold)"
                strokeWidth="1.2"
                opacity="0.5"
              />

              {/* RING 1: TITHI (30 Sectors, Radius 270) */}
              {activeRings.tithi && (
                <g id="tithi-ring">
                  {TITHI_LIST.map((tItem, i) => {
                    const startDeg = i * 12 - 90;
                    const endDeg = (i + 1) * 12 - 90;
                    const isActive = activeTithi.id === tItem.id;

                    return (
                      <g key={i}>
                        <path
                          d={describeArc(300, 300, 270, startDeg, endDeg)}
                          fill="none"
                          stroke={isActive ? '#f1c40f' : 'var(--border-subtle)'}
                          strokeWidth="16"
                          opacity={isActive ? 1 : 0.65}
                        />
                        <text
                          x={polarToCartesian(300, 300, 270, (startDeg + endDeg) / 2).x}
                          y={polarToCartesian(300, 300, 270, (startDeg + endDeg) / 2).y + 4}
                          textAnchor="middle"
                          fontSize="10.5"
                          fontWeight="bold"
                          fill={isActive ? '#ffffff' : 'var(--text-muted)'}
                          className="font-mono"
                        >
                          {tItem.id <= 15 ? tItem.id : tItem.id - 15}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* RING 2: NAKSHATRA (27 Sectors, Radius 246) */}
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
                          d={describeArc(300, 300, 246, startDeg, endDeg)}
                          fill="none"
                          stroke={isActive ? '#38bdf8' : 'var(--border-subtle)'}
                          strokeWidth="16"
                          opacity={isActive ? 1 : 0.55}
                        />
                        <text
                          x={polarToCartesian(300, 300, 246, (startDeg + endDeg) / 2).x}
                          y={polarToCartesian(300, 300, 246, (startDeg + endDeg) / 2).y + 3.5}
                          textAnchor="middle"
                          fontSize="10"
                          fontWeight="bold"
                          fill={isActive ? '#ffffff' : '#38bdf8'}
                          className="font-mono"
                        >
                          {n.id}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* RING 3: YOGA (27 Sectors, Radius 222) */}
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
                          d={describeArc(300, 300, 222, startDeg, endDeg)}
                          fill="none"
                          stroke={isActive ? '#fb923c' : 'var(--border-subtle)'}
                          strokeWidth="15"
                          opacity={isActive ? 1 : 0.5}
                        />
                        <text
                          x={polarToCartesian(300, 300, 222, (startDeg + endDeg) / 2).x}
                          y={polarToCartesian(300, 300, 222, (startDeg + endDeg) / 2).y + 3.5}
                          textAnchor="middle"
                          fontSize="9.5"
                          fontWeight="bold"
                          fill={isActive ? '#ffffff' : '#fb923c'}
                          className="font-mono"
                        >
                          {y.id}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* RING 4: MUHURTA (30 Sectors, Radius 192) */}
              {activeRings.muhurta && (
                <g id="muhurta-ring">
                  {MUHURTA_DEFINITIONS.map((m, i) => {
                    const startDeg = i * 12 - 90;
                    const endDeg = (i + 1) * 12 - 90;
                    const isActive = activeMuhurta.id === m.id;
                    const isAuspicious = m.status === 'auspicious';
                    const isInauspicious = m.status === 'inauspicious';

                    const sectorColor = isActive
                      ? '#f1c40f'
                      : isAuspicious
                        ? '#15803d'
                        : isInauspicious
                          ? '#b91c1c'
                          : '#9a3412';

                    return (
                      <g key={i}>
                        <path
                          d={describeArc(300, 300, 192, startDeg, endDeg)}
                          fill="none"
                          stroke={sectorColor}
                          strokeWidth="28"
                          opacity={isActive ? 1 : 0.75}
                          filter={isActive ? 'url(#goldGlow)' : undefined}
                        />
                        <text
                          x={polarToCartesian(300, 300, 192, (startDeg + endDeg) / 2).x}
                          y={polarToCartesian(300, 300, 192, (startDeg + endDeg) / 2).y + 3.5}
                          textAnchor="middle"
                          fontSize="8.5"
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

              {/* RING 5: PRAHAR (8 Sectors, Radius 158) */}
              {activeRings.prahar && (
                <g id="prahar-ring">
                  {allPrahars.map((p, i) => {
                    const startDeg = i * 45 - 90;
                    const endDeg = (i + 1) * 45 - 90;
                    const isActive = activePrahar.id === p.id;

                    return (
                      <g key={i}>
                        <path
                          d={describeArc(300, 300, 158, startDeg, endDeg)}
                          fill="none"
                          stroke={isActive ? '#818cf8' : 'var(--border-subtle)'}
                          strokeWidth="24"
                          opacity={isActive ? 0.95 : 0.45}
                          filter={isActive ? 'url(#blueGlow)' : undefined}
                        />
                        <text
                          x={polarToCartesian(300, 300, 158, (startDeg + endDeg) / 2).x}
                          y={polarToCartesian(300, 300, 158, (startDeg + endDeg) / 2).y + 4}
                          textAnchor="middle"
                          fontSize="10.5"
                          fontWeight="bold"
                          fill={isActive ? '#ffffff' : '#818cf8'}
                          className="font-mono"
                        >
                          {p.code}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* RING 6: GHATIKA TICKS (60 Ghatis) */}
              {activeRings.ghatika && (
                <g id="ghatika-ring">
                  {Array.from({ length: 60 }).map((_, i) => {
                    const angle = i * 6 * (Math.PI / 180);
                    const isMajor = i % 5 === 0;
                    const rInner = isMajor ? 130 : 138;
                    const rOuter = 145;

                    const x1 = 300 + rInner * Math.cos(angle - Math.PI / 2);
                    const y1 = 300 + rInner * Math.sin(angle - Math.PI / 2);
                    const x2 = 300 + rOuter * Math.cos(angle - Math.PI / 2);
                    const y2 = 300 + rOuter * Math.sin(angle - Math.PI / 2);

                    const textR = 122;
                    const textX = 300 + textR * Math.cos(angle - Math.PI / 2);
                    const textY = 300 + textR * Math.sin(angle - Math.PI / 2) + 4;

                    return (
                      <g key={i}>
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={isMajor ? 'var(--text-gold)' : 'var(--border-subtle)'}
                          strokeWidth={isMajor ? 3 : 1.2}
                        />
                        {isMajor && (
                          <text
                            x={textX}
                            y={textY}
                            textAnchor="middle"
                            fontSize="10.5"
                            fontWeight="bold"
                            fill="var(--text-primary)"
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

              {/* CENTER DIGITAL HUB BASE */}
              <circle
                cx="300"
                cy="300"
                r="110"
                fill="var(--bg-card)"
                stroke="var(--border-gold)"
                strokeWidth="2.5"
              />
              <circle
                cx="300"
                cy="300"
                r="104"
                fill="none"
                stroke="var(--border-subtle)"
                strokeWidth="1.2"
              />

              {/* Glowing Ghati Pointer Hand */}
              <line
                x1={300 + 110 * Math.sin((ghatiAngle * Math.PI) / 180)}
                y1={300 - 110 * Math.cos((ghatiAngle * Math.PI) / 180)}
                x2={300 + 145 * Math.sin((ghatiAngle * Math.PI) / 180)}
                y2={300 - 145 * Math.cos((ghatiAngle * Math.PI) / 180)}
                stroke="#f39c12"
                strokeWidth="4.5"
                strokeLinecap="round"
                filter="url(#goldGlow)"
              />
              {/* Pointer Tip Indicator Pip */}
              <circle
                cx={300 + 145 * Math.sin((ghatiAngle * Math.PI) / 180)}
                cy={300 - 145 * Math.cos((ghatiAngle * Math.PI) / 180)}
                r="6"
                fill="#f1c40f"
                stroke="#d97706"
                strokeWidth="1.5"
                filter="url(#goldGlow)"
              />
            </svg>

            {/* Center Digital Display Overlay */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[34%] h-[34%] rounded-full flex flex-col items-center justify-center text-center pointer-events-none z-10 select-none px-1">
              <span className="text-[9px] sm:text-[10.5px] font-serif font-bold uppercase tracking-[0.18em] text-[var(--text-gold)] block leading-tight">
                ઇષ્ટકાળ (VEDIC TIME)
              </span>

              <span className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-gold)] drop-shadow-md leading-none my-1 sm:my-1.5">
                {ishtakaal.formatted}
              </span>

              <span className="text-[8.5px] sm:text-[9.5px] font-mono uppercase tracking-wider text-[var(--text-muted)] block leading-tight">
                ઘટી : પળ (GHATI : PALA)
              </span>

              <span className="text-[11px] sm:text-xs font-mono font-bold text-[var(--text-primary)] block leading-tight mt-1">
                {liveDate.toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                })}
              </span>

              <span className="text-[11px] sm:text-xs font-serif font-bold text-emerald-500 block leading-tight mt-0.5 truncate max-w-full">
                {activeMuhurta.name[lang] || activeMuhurta.name.gu}
              </span>
            </div>
          </div>
        </Card>

        {/* Right Dashboard: Key Vedic Markers & Muhurta Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* 1. Ishtakaal Detailed Card */}
          <Card className="rounded-2xl glass-panel p-4 sm:p-5 border border-[var(--border-subtle)] space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-[var(--text-gold)]" />
                <h2 className="font-serif text-sm font-bold text-[var(--text-primary)]">
                  ઇષ્ટકાળ સમય પરિમાણ (Solar Elapsed Time)
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">
                {ishtakaal.totalPalaCount.toLocaleString()} કુલ પળ
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <Card className="p-2.5 rounded-xl glass-card border border-[var(--border-subtle)]">
                <span className="text-[10px] text-[var(--text-muted)] block">ઘટી (Ghati)</span>
                <strong className="font-mono text-base text-[var(--text-gold)]">
                  {ishtakaal.ghati}
                </strong>
                <span className="text-[9px] text-[var(--text-muted)] block">૧ ઘટી = ૨૪ મિનિટ</span>
              </Card>
              <Card className="p-2.5 rounded-xl glass-card border border-[var(--border-subtle)]">
                <span className="text-[10px] text-[var(--text-muted)] block">પળ / વિઘટી</span>
                <strong className="font-mono text-base text-[var(--text-primary)]">
                  {ishtakaal.pala}
                </strong>
                <span className="text-[9px] text-[var(--text-muted)] block">૧ પળ = ૨૪ સેકન્ડ</span>
              </Card>
              <Card className="p-2.5 rounded-xl glass-card border border-[var(--border-subtle)]">
                <span className="text-[10px] text-[var(--text-muted)] block">વિપળ (Vipala)</span>
                <strong className="font-mono text-base text-[var(--text-primary)]">
                  {ishtakaal.vipala}
                </strong>
                <span className="text-[9px] text-[var(--text-muted)] block">
                  ૧ વિપળ = ૦.૪ સેકન્ડ
                </span>
              </Card>
            </div>
          </Card>

          {/* 2. Active Muhurta & Auspicious Times */}
          <Card className="rounded-2xl glass-panel p-4 sm:p-5 border border-[var(--border-subtle)] space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[var(--text-gold)]" />
                <h2 className="font-serif text-sm font-bold text-[var(--text-primary)]">
                  સક્રિય & મુખ્ય મુહૂર્તો (Muhurtas)
                </h2>
              </div>
              <Chip
                className={`px-2 py-0.5 text-[10px] font-bold ${
                  activeMuhurta.status === 'auspicious'
                    ? 'glass-badge-success'
                    : activeMuhurta.status === 'inauspicious'
                      ? 'glass-badge-danger'
                      : 'glass-badge-gold'
                }`}
              >
                <Chip.Label>{activeMuhurta.nature[lang] || activeMuhurta.nature.gu}</Chip.Label>
              </Chip>
            </div>

            {/* Current Muhurta */}
            <Card className="p-3 rounded-xl glass-card space-y-1 border border-[var(--border-subtle)]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-[var(--text-primary)]">
                  વર્તમાન #{activeMuhurta.id}: {activeMuhurta.name[lang] || activeMuhurta.name.gu}
                </span>
                <span className="font-mono text-[11px] text-[var(--text-gold)] font-bold">
                  {formatTimeString(activeMuhurta.startTime)} -{' '}
                  {formatTimeString(activeMuhurta.endTime)}
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)]">
                અધિષ્ઠાતા દેવ: {activeMuhurta.deity[lang] || activeMuhurta.deity.gu} • ગુણવત્તા:{' '}
                {activeMuhurta.nature[lang] || activeMuhurta.nature.gu}
              </p>
            </Card>

            {/* Brahma Muhurta & Abhijit Muhurta & Rahu Kaal Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <Card className="p-2.5 rounded-xl glass-card border border-[var(--border-subtle)]">
                <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                  🌟 બ્રહ્મ મુહૂર્ત (Brahma)
                </span>
                <span className="font-mono text-[11px] text-[var(--text-primary)] font-bold block mt-0.5">
                  {formatTimeString(brahmaMuhurta.startTime || brahmaMuhurta.start)} -{' '}
                  {formatTimeString(brahmaMuhurta.endTime || brahmaMuhurta.end)}
                </span>
              </Card>

              <Card className="p-2.5 rounded-xl glass-card border border-[var(--border-subtle)]">
                <span className="text-[10px] text-amber-500 font-bold flex items-center gap-1">
                  ✨ અભિજિત મુહૂર્ત (Abhijit)
                </span>
                <span className="font-mono text-[11px] text-[var(--text-primary)] font-bold block mt-0.5">
                  {formatTimeString(abhijitMuhurta.startTime || abhijitMuhurta.start)} -{' '}
                  {formatTimeString(abhijitMuhurta.endTime || abhijitMuhurta.end)}
                </span>
              </Card>

              <Card className="p-2.5 rounded-xl glass-card sm:col-span-2 border border-[var(--border-subtle)]">
                <span className="text-[10px] text-rose-500 font-bold flex items-center gap-1">
                  ⚠️ રાહુ કાળ (Rahu Kaal - અશુભ)
                </span>
                <span className="font-mono text-[11px] text-[var(--text-primary)] font-bold block mt-0.5">
                  {formatTimeString(rahuKaal.startTime || rahuKaal.start)} -{' '}
                  {formatTimeString(rahuKaal.endTime || rahuKaal.end)}
                </span>
              </Card>
            </div>
          </Card>

          {/* 3. Active Prahar & Hora */}
          <Card className="rounded-2xl glass-panel p-4 sm:p-5 border border-[var(--border-subtle)] space-y-3">
            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Active Prahar */}
              <Card className="p-3 rounded-xl glass-card space-y-1 border border-[var(--border-subtle)]">
                <span className="text-[10px] text-indigo-400 font-bold">
                  ૫. વર્તમાન પહર (#{activePrahar.id})
                </span>
                <h3 className="font-serif text-sm font-bold text-[var(--text-primary)]">
                  {activePrahar.name[lang] || activePrahar.name.gu}
                </h3>
                <span className="text-[10px] text-[var(--text-muted)] block">
                  વ્યાપ્તિ: {activePrahar.ghati}
                </span>
              </Card>

              {/* Active Hora */}
              <Card className="p-3 rounded-xl glass-card space-y-1 border border-[var(--border-subtle)]">
                <span className="text-[10px] text-yellow-500 font-bold">૬. ગ્રહ હોરા સ્વામી</span>
                <h3 className="font-serif text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: activeHoraPlanet.color }}
                  />
                  {activeHoraPlanet.name[lang] || activeHoraPlanet.name.gu}
                </h3>
                <span className="text-[10px] text-[var(--text-muted)] block">
                  {activeHoraPlanet.nature[lang] || activeHoraPlanet.nature.gu}
                </span>
              </Card>
            </div>
          </Card>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          3. 6 VEDIC SUMMARY CHIPS RIBBON
          ----------------------------------------------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="p-3 rounded-2xl glass-panel border border-[var(--border-subtle)] space-y-0.5">
          <span className="text-[10px] font-serif text-[var(--text-gold)] uppercase tracking-wider block">
            ૧. તિથિ
          </span>
          <h4 className="font-serif text-xs font-bold text-[var(--text-primary)] truncate">
            {activeTithi.name[lang] || activeTithi.name.gu}
          </h4>
          <span className="text-[10px] font-mono text-[var(--text-muted)] block">
            {activeTithi.paksha} પક્ષ
          </span>
        </Card>

        <Card className="p-3 rounded-2xl glass-panel border border-[var(--border-subtle)] space-y-0.5">
          <span className="text-[10px] font-serif text-sky-400 uppercase tracking-wider block">
            ૨. નક્ષત્ર
          </span>
          <h4 className="font-serif text-xs font-bold text-[var(--text-primary)] truncate">
            {activeNakshatra.name[lang] || activeNakshatra.name.gu}
          </h4>
          <span className="text-[10px] font-mono text-[var(--text-muted)] block">
            #{activeNakshatra.id} / ૨૭ નક્ષત્ર
          </span>
        </Card>

        <Card className="p-3 rounded-2xl glass-panel border border-[var(--border-subtle)] space-y-0.5">
          <span className="text-[10px] font-serif text-orange-400 uppercase tracking-wider block">
            ૩. યોગ
          </span>
          <h4 className="font-serif text-xs font-bold text-[var(--text-primary)] truncate">
            {activeYoga.name[lang] || activeYoga.name.gu}
          </h4>
          <span className="text-[10px] font-mono text-[var(--text-muted)] block">
            #{activeYoga.id} / ૨૭ યોગ
          </span>
        </Card>

        <Card className="p-3 rounded-2xl glass-panel border border-[var(--border-subtle)] space-y-0.5">
          <span className="text-[10px] font-serif text-emerald-400 uppercase tracking-wider block">
            ૪. સક્રિય મુહૂર્ત
          </span>
          <h4 className="font-serif text-xs font-bold text-[var(--text-primary)] truncate">
            {activeMuhurta.name[lang] || activeMuhurta.name.gu}
          </h4>
          <span className="text-[10px] font-mono text-[var(--text-muted)] block">
            #{activeMuhurta.id} ({activeMuhurta.code})
          </span>
        </Card>

        <Card className="p-3 rounded-2xl glass-panel border border-[var(--border-subtle)] space-y-0.5">
          <span className="text-[10px] font-serif text-indigo-400 uppercase tracking-wider block">
            ૫. વર્તમાન પહર
          </span>
          <h4 className="font-serif text-xs font-bold text-[var(--text-primary)] truncate">
            {activePrahar.name[lang] || activePrahar.name.gu}
          </h4>
          <span className="text-[10px] font-mono text-[var(--text-muted)] block">
            {activePrahar.period === 'day' ? 'દિવસનો પહર' : 'રાત્રિનો પહર'}
          </span>
        </Card>

        <Card className="p-3 rounded-2xl glass-panel border border-[var(--border-subtle)] space-y-0.5">
          <span className="text-[10px] font-serif text-yellow-500 uppercase tracking-wider block">
            ૬. ગ્રહ હોરા
          </span>
          <h4 className="font-serif text-xs font-bold text-[var(--text-primary)] truncate flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full inline-block shrink-0"
              style={{ backgroundColor: activeHoraPlanet.color }}
            />
            <span>{activeHoraPlanet.name[lang] || activeHoraPlanet.name.gu}</span>
          </h4>
          <span className="text-[10px] font-mono text-[var(--text-muted)] block truncate">
            {activeHoraPlanet.nature[lang] || activeHoraPlanet.nature.gu}
          </span>
        </Card>
      </div>

      {/* -----------------------------------------------------------------
          4. TABBED MATRIX EXPLORER: 30 MUHURTAS, 8 PRAHARS, 24 HORAS, GUIDE
          ----------------------------------------------------------------- */}
      <Card className="rounded-2xl glass-panel p-4 sm:p-6 border border-[var(--border-subtle)] space-y-5">
        {/* Navigation Tabs */}
        <div
          role="tablist"
          aria-label="Vedic Clock Tabs"
          className="flex flex-wrap items-center gap-1.5 rounded-xl glass-pill p-1.5 shadow-inner"
        >
          <Button
            type="button"
            role="tab"
            aria-selected={activeTab === 'muhurtas'}
            onPress={() => setActiveTab('muhurtas')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'muhurtas'
                ? 'glass-button-primary shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-transparent'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>૩૦ દૈનિક મુહૂર્ત સમયપત્રક (30 Muhurtas)</span>
          </Button>

          <Button
            type="button"
            role="tab"
            aria-selected={activeTab === 'prahars'}
            onPress={() => setActiveTab('prahars')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'prahars'
                ? 'glass-button-primary shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-transparent'
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            <span>૮ પ્રહર ચક્ર (8 Prahars)</span>
          </Button>

          <Button
            type="button"
            role="tab"
            aria-selected={activeTab === 'horas'}
            onPress={() => setActiveTab('horas')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'horas'
                ? 'glass-button-primary shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-transparent'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>૨૪ ગ્રહ હોરા (24 Horas)</span>
          </Button>

          <Button
            type="button"
            role="tab"
            aria-selected={activeTab === 'guide'}
            onPress={() => setActiveTab('guide')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'guide'
                ? 'glass-button-primary shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-transparent'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>શાસ્ત્રીય સમય પરિમાણ (Surya Siddhanta Guide)</span>
          </Button>
        </div>

        {/* TAB 1: 30 MUHURTAS TABLE */}
        {activeTab === 'muhurtas' && (
          <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--bg-pill)] text-[var(--text-primary)] font-serif font-bold border-b border-[var(--border-subtle)]">
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
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-card)]">
                {allMuhurtas.map((m) => (
                  <tr
                    key={m.id}
                    className={`transition ${
                      m.isActive
                        ? 'bg-amber-500/15 font-bold text-[var(--text-gold)]'
                        : 'hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)]'
                    }`}
                  >
                    <td className="p-3 font-mono text-[var(--text-gold)] font-bold">{m.code}</td>
                    <td className="p-3 font-mono">#{m.id}</td>
                    <td className="p-3 font-serif font-bold">{m.name[lang] || m.name.gu}</td>
                    <td className="p-3 text-[var(--text-muted)]">{m.deity[lang] || m.deity.gu}</td>
                    <td className="p-3">
                      <Chip
                        className={`text-[10px] font-bold ${
                          m.status === 'auspicious'
                            ? 'glass-badge-success'
                            : m.status === 'inauspicious'
                              ? 'glass-badge-danger'
                              : 'glass-badge-gold'
                        }`}
                      >
                        <Chip.Label>{m.nature[lang] || m.nature.gu}</Chip.Label>
                      </Chip>
                    </td>
                    <td className="p-3 font-mono">{formatTimeString(m.startTime)}</td>
                    <td className="p-3 font-mono">{formatTimeString(m.endTime)}</td>
                    <td className="p-3">
                      {m.isActive ? (
                        <Chip className="glass-button-primary font-bold text-[10px] shadow-xs text-[#0c0e17]">
                          <Chip.Label className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            <span>સક્રિય</span>
                          </Chip.Label>
                        </Chip>
                      ) : m.isPassed ? (
                        <span className="text-[var(--text-muted)] opacity-60">પૂર્ણ</span>
                      ) : (
                        <span className="text-[var(--text-secondary)]">આવનારી</span>
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
              <Card
                key={p.id}
                className={`p-4 rounded-2xl border transition space-y-2 ${
                  p.isActive
                    ? 'border-indigo-500/60 bg-indigo-500/10 ring-2 ring-indigo-500/30'
                    : 'glass-card border-[var(--border-subtle)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-indigo-400">
                    {p.code} - #{p.id}
                  </span>
                  <Chip className="text-[10px] glass-pill text-[var(--text-secondary)] font-bold">
                    <Chip.Label>{p.period === 'day' ? 'દિવસ' : 'રાત્રિ'}</Chip.Label>
                  </Chip>
                </div>
                <h3 className="font-serif text-sm font-bold text-[var(--text-primary)]">
                  {p.name[lang] || p.name.gu}
                </h3>
                <p className="text-xs text-[var(--text-muted)] line-clamp-3">
                  {p.desc[lang] || p.desc.gu}
                </p>
                <div className="pt-2 border-t border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-gold)]">
                  ઘડી વ્યાપ્તિ: {p.ghati}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* TAB 3: 24 HORAS */}
        {activeTab === 'horas' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {allHoras.map((h, i) => (
              <Card
                key={i}
                className={`p-3 rounded-2xl text-center border transition space-y-1 ${
                  h.isActive
                    ? 'border-amber-500/60 bg-amber-500/15 ring-2 ring-amber-500/40'
                    : 'glass-card border-[var(--border-subtle)]'
                }`}
              >
                <span className="text-[10px] font-mono text-[var(--text-muted)] block">
                  {h.startStr} - {h.endStr}
                </span>
                <div
                  className="w-3.5 h-3.5 rounded-full mx-auto my-1.5 shadow-xs"
                  style={{ backgroundColor: h.planet.color }}
                />
                <h4 className="font-serif text-xs font-bold text-[var(--text-primary)]">
                  {h.planet.name[lang] || h.planet.name.gu}
                </h4>
                {h.isActive && (
                  <Chip className="glass-button-primary text-[9px] font-bold px-2 py-0.5 text-[#0c0e17]">
                    <Chip.Label>સક્રિય હોરા</Chip.Label>
                  </Chip>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* TAB 4: VEDIC TIME SYSTEM GUIDE */}
        {activeTab === 'guide' && (
          <div className="space-y-4 text-xs text-[var(--text-secondary)]">
            <Card className="p-4 rounded-xl glass-card space-y-2 border border-[var(--border-subtle)]">
              <h3 className="font-serif text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-[var(--text-gold)]" />
                સૂર્ય સિદ્ધાંત મુજબ વૈદિક સમય પરિમાણ (Vedic Time System Architecture)
              </h3>
              <p className="leading-relaxed">
                વૈદિક કાળ ગણના સૂર્યોદયના ક્ષણથી શરૂ થાય છે. આધુનિક ૨૪-કલાકની ઘડિયાળથી વિપરીત, વૈદિક
                કાળ ચક્ર સૂર્યના સ્થાનિક ભ્રમણ અને પૃથ્વીના અક્ષીય પરિભ્રમણ સાથે સંપૂર્ણ સુમેળ ધરાવે
                છે.
              </p>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Card className="p-3.5 rounded-xl glass-card space-y-1 border border-[var(--border-subtle)]">
                <span className="font-serif font-bold text-[var(--text-gold)] block">
                  ૧. ત્રુટિ & નિમેષ
                </span>
                <p className="text-[11px] text-[var(--text-muted)]">
                  ૧ ત્રુટિ = ૨૯.૬૨૫ માઇક્રોસેકન્ડ • ૧ નિમેષ = ૧૬/૭૫ સેકન્ડ (આંખના પલકારા જેટલો સમય).
                </p>
              </Card>

              <Card className="p-3.5 rounded-xl glass-card space-y-1 border border-[var(--border-subtle)]">
                <span className="font-serif font-bold text-[var(--text-gold)] block">
                  ૨. પળ (વિઘટી)
                </span>
                <p className="text-[11px] text-[var(--text-muted)]">
                  ૧ પળ = ૨૪ સેકન્ડ (૬ પ્રાણ શ્વાસોચ્છ્વાસ). ૬૦ પળ ભેગા મળીને ૧ ઘટી બને છે.
                </p>
              </Card>

              <Card className="p-3.5 rounded-xl glass-card space-y-1 border border-[var(--border-subtle)]">
                <span className="font-serif font-bold text-[var(--text-gold)] block">
                  ૩. ઘટી (ઘડી)
                </span>
                <p className="text-[11px] text-[var(--text-muted)]">
                  ૧ ઘટી = ૨૪ મિનિટ = ૬૦ પળ = ૩૬૦૦ વિપળ. એક દિવસ-રાતમાં ૬૦ ઘટી હોય છે.
                </p>
              </Card>

              <Card className="p-3.5 rounded-xl glass-card space-y-1 border border-[var(--border-subtle)]">
                <span className="font-serif font-bold text-[var(--text-gold)] block">
                  ૪. મુહૂર્ત (૪૮ મિનિટ)
                </span>
                <p className="text-[11px] text-[var(--text-muted)]">
                  ૧ મુહૂર્ત = ૨ ઘટી = ૪૮ મિનિટ. ૨૪ કલાકમાં કુલ ૩૦ વૈદિક મુહૂર્ત આવે છે (૧૫ દિવસ + ૧૫
                  રાત્રિ).
                </p>
              </Card>

              <Card className="p-3.5 rounded-xl glass-card space-y-1 border border-[var(--border-subtle)]">
                <span className="font-serif font-bold text-[var(--text-gold)] block">
                  ૫. પ્રહર (પહર)
                </span>
                <p className="text-[11px] text-[var(--text-muted)]">
                  ૧ પ્રહર = ૭.૫ ઘટી = ૩ કલાક. દિવસના ૪ પ્રહર અને રાત્રિના ૪ પ્રહર (કુલ ૮ પ્રહર).
                </p>
              </Card>

              <Card className="p-3.5 rounded-xl glass-card space-y-1 border border-[var(--border-subtle)]">
                <span className="font-serif font-bold text-[var(--text-gold)] block">
                  ૬. અહોરાત્ર (દિવસ-રાત્રિ)
                </span>
                <p className="text-[11px] text-[var(--text-muted)]">
                  ૧ અહોરાત્ર = ૬૦ ઘટી = ૩૦ મુહૂર્ત = ૮ પ્રહર = ૨૪ કલાક.
                </p>
              </Card>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}
