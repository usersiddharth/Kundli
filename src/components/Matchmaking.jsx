import React, { useState, useRef, useEffect } from 'react';
import { calculatePlanetaryPositions } from '../engine/astronomy.js';
import { getFullKundli } from '../engine/kundli.js';
import { calculateGunMilan } from '../engine/matchmaking.js';
import { cityData } from '../engine/cityData.js';
import {
  Heart,
  Users,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  MapPin,
  Search,
  ChevronDown,
  Award,
  ShieldCheck,
  Printer,
  X,
} from 'lucide-react';

function CitySearchInput({ label, value, onSelectCity, onChangeCustom }) {
  const [query, setQuery] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const inputId = `match-city-${label.replace(/\s+/g, '-').toLowerCase()}`;

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = cityData.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  const handleText = (e) => {
    const val = e.target.value;
    setQuery(val);
    onChangeCustom(val);
    setIsOpen(true);

    const exact = cityData.find((c) => c.name.toLowerCase() === val.toLowerCase());
    if (exact) {
      onSelectCity(exact);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <label
        htmlFor={inputId}
        className="text-xs text-[#544d44] flex items-center gap-1 mb-1 font-medium"
      >
        <MapPin className="h-3.5 w-3.5 text-[#736a60]" aria-hidden="true" /> {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          value={query}
          onChange={handleText}
          onFocus={() => setIsOpen(true)}
          placeholder="Search city in Gujarat / India..."
          className="w-full rounded-lg glass-input pl-3 pr-8 py-2 text-xs text-[#2c2825] focus:outline-hidden focus:ring-2 focus:ring-[#b85d19]"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              onChangeCustom('');
              setIsOpen(false);
            }}
            title="Clear City"
            aria-label="Clear City"
            className="absolute right-2.5 top-2 h-5 w-5 flex items-center justify-center rounded-full text-[#736a60] hover:text-[#2c2825] hover:bg-[#e6dfd3] transition cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          <Search
            className="pointer-events-none absolute right-3 top-2.5 h-3.5 w-3.5 text-[#736a60]"
            aria-hidden="true"
          />
        )}
      </div>

      {isOpen && (
        <div
          role="listbox"
          aria-label={`City suggestions for ${label}`}
          className="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg glass-panel py-1 shadow-lg text-xs"
        >
          {filtered.map((c, i) => (
            <button
              key={i}
              type="button"
              role="option"
              aria-selected={query.toLowerCase() === c.name.toLowerCase()}
              onClick={() => {
                setQuery(c.name);
                onSelectCity(c);
                setIsOpen(false);
              }}
              className="flex w-full items-center justify-between px-3 py-1.5 text-left hover:bg-[#2c2825] hover:text-[#f4ebd9] focus:bg-[#2c2825] focus:text-[#f4ebd9] focus:outline-hidden transition cursor-pointer"
            >
              <span>{c.name}</span>
            </button>
          ))}

          {query && (
            <button
              type="button"
              onClick={() => {
                onChangeCustom(query);
                setIsOpen(false);
              }}
              className="flex w-full items-center justify-between px-3 py-1.5 text-left bg-[#e6dfd3]/40 hover:bg-[#2c2825] hover:text-[#f4ebd9] text-[#b85d19] font-medium border-t border-[#e6dfd3] transition cursor-pointer"
            >
              <span className="truncate">➕ Use custom: "{query}"</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function Matchmaking({ t }) {
  const [brideForm, setBrideForm] = useState({
    name: 'કન્યા (Bride)',
    dob: '1996-07-22',
    tob: '10:30',
    city: 'Surat, Gujarat',
    lat: 21.1702,
    lng: 72.8311,
    tz: 5.5,
  });

  const [groomForm, setGroomForm] = useState({
    name: 'વર (Groom)',
    dob: '1993-11-14',
    tob: '08:45',
    city: 'Ahmedabad, Gujarat',
    lat: 23.0225,
    lng: 72.5714,
    tz: 5.5,
  });

  const [milanResult, setMilanResult] = useState(null);

  const handleMatch = () => {
    const [bYear, bMonth, bDay] = brideForm.dob.split('-').map(Number);
    const [bHour, bMinute] = brideForm.tob.split(':').map(Number);

    const [gYear, gMonth, gDay] = groomForm.dob.split('-').map(Number);
    const [gHour, gMinute] = groomForm.tob.split(':').map(Number);

    const bAstro = calculatePlanetaryPositions(
      bYear,
      bMonth,
      bDay,
      bHour,
      bMinute,
      brideForm.lat,
      brideForm.lng,
      brideForm.tz || 5.5
    );
    const gAstro = calculatePlanetaryPositions(
      gYear,
      gMonth,
      gDay,
      gHour,
      gMinute,
      groomForm.lat,
      groomForm.lng,
      groomForm.tz || 5.5
    );

    const bKundli = getFullKundli(bAstro, bYear, bMonth, bDay, bHour, bMinute);
    const gKundli = getFullKundli(gAstro, gYear, gMonth, gDay, gHour, gMinute);

    const res = calculateGunMilan(bKundli, gKundli);
    setMilanResult(res);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rounded-xl glass-panel p-6 shadow-sm space-y-6 print:border-none print:p-0 print:bg-white">
      {/* Printable Header (Visible Only in Print) */}
      <div className="hidden print:block text-center border-b-2 border-[#8c7456] pb-3 mb-4">
        <span className="font-serif text-xs font-bold tracking-widest text-[#8c7456]">
          || ૐ શ્રી ગણેશાય નમઃ || શુભ વિવાહ ||
        </span>
        <h1 className="font-serif text-2xl font-bold text-[#2c2825] mt-1">
          અષ્ટકૂટ ગુણ મિલન રિપોર્ટ (Kundli Matchmaking Dossier)
        </h1>
        <p className="text-xs text-[#544d44]">
          કન્યા: {brideForm.name} ({brideForm.dob}) • વર: {groomForm.name} ({groomForm.dob})
        </p>
      </div>

      {/* Screen Header & Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e6dfd3]/80 pb-4 print:hidden">
        <div>
          <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
            <Heart className="h-5 w-5 text-[#b85d19]" /> {t.matchmakingTitle} (Ashtakoot 36-Gun
            Milan)
          </h2>
          <p className="text-xs text-[#736a60]">
            ૩૬ ગુણ મિલન, માંગલિક દોષ સંરેખણ અને સુમેળતા વિશ્લેષણ
          </p>
        </div>

        {milanResult && (
          <button
            onClick={handlePrint}
            title="Save Matchmaking as PDF"
            className="flex items-center gap-1.5 rounded-lg glass-card px-3.5 py-1.5 text-xs font-medium text-[#544d44] hover:bg-white transition shadow-xs"
          >
            <Printer className="h-3.5 w-3.5 text-[#b85d19]" />
            <span>Save as PDF</span>
          </button>
        )}
      </div>

      {/* Dual Profile Forms (Hidden in Print) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 print:hidden">
        {/* Bride */}
        <div className="rounded-xl glass-panel-accent p-5 shadow-2xs space-y-3">
          <h3 className="font-serif text-base font-semibold text-[#2c2825] flex items-center gap-2 border-b border-[#e6dfd3]/80 pb-2">
            <Users className="h-4 w-4 text-[#b85d19]" /> {t.brideDetails} (Bride)
          </h3>
          <div>
            <label className="text-xs font-medium text-[#544d44]">{t.name}</label>
            <input
              type="text"
              value={brideForm.name}
              onChange={(e) => setBrideForm({ ...brideForm, name: e.target.value })}
              className="w-full rounded-lg glass-input px-3 py-2 text-xs text-[#2c2825] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[#544d44]">{t.dob}</label>
              <input
                type="date"
                value={brideForm.dob}
                onChange={(e) => setBrideForm({ ...brideForm, dob: e.target.value })}
                className="w-full rounded-lg glass-input px-3 py-2 text-xs text-[#2c2825] font-mono focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#544d44]">{t.tob}</label>
              <input
                type="time"
                value={brideForm.tob}
                onChange={(e) => setBrideForm({ ...brideForm, tob: e.target.value })}
                className="w-full rounded-lg glass-input px-3 py-2 text-xs text-[#2c2825] font-mono focus:outline-none"
              />
            </div>
          </div>

          <CitySearchInput
            label={t.city}
            value={brideForm.city}
            onSelectCity={(c) =>
              setBrideForm((prev) => ({ ...prev, city: c.name, lat: c.lat, lng: c.lng }))
            }
            onChangeCustom={(val) => setBrideForm((prev) => ({ ...prev, city: val }))}
          />
        </div>

        {/* Groom */}
        <div className="rounded-xl glass-panel-accent p-5 shadow-2xs space-y-3">
          <h3 className="font-serif text-base font-semibold text-[#2c2825] flex items-center gap-2 border-b border-[#e6dfd3]/80 pb-2">
            <Users className="h-4 w-4 text-[#b85d19]" /> {t.groomDetails} (Groom)
          </h3>
          <div>
            <label className="text-xs font-medium text-[#544d44]">{t.name}</label>
            <input
              type="text"
              value={groomForm.name}
              onChange={(e) => setGroomForm({ ...groomForm, name: e.target.value })}
              className="w-full rounded-lg glass-input px-3 py-2 text-xs text-[#2c2825] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[#544d44]">{t.dob}</label>
              <input
                type="date"
                value={groomForm.dob}
                onChange={(e) => setGroomForm({ ...groomForm, dob: e.target.value })}
                className="w-full rounded-lg glass-input px-3 py-2 text-xs text-[#2c2825] font-mono focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#544d44]">{t.tob}</label>
              <input
                type="time"
                value={groomForm.tob}
                onChange={(e) => setGroomForm({ ...groomForm, tob: e.target.value })}
                className="w-full rounded-lg glass-input px-3 py-2 text-xs text-[#2c2825] font-mono focus:outline-none"
              />
            </div>
          </div>

          <CitySearchInput
            label={t.city}
            value={groomForm.city}
            onSelectCity={(c) =>
              setGroomForm((prev) => ({ ...prev, city: c.name, lat: c.lat, lng: c.lng }))
            }
            onChangeCustom={(val) => setGroomForm((prev) => ({ ...prev, city: val }))}
          />
        </div>
      </div>

      {/* Check Compatibility Button */}
      <button
        onClick={handleMatch}
        className="w-full rounded-xl glass-button-primary py-3 text-center text-sm font-bold shadow-md transition print:hidden"
      >
        {t.checkCompatibility}
      </button>

      {/* Results Display */}
      {milanResult && (
        <div className="rounded-xl glass-panel-accent p-6 shadow-sm space-y-6 print:border print:border-[#8c7456]">
          {/* Printable Native Summary (Visible in Print) */}
          <div className="hidden print:grid grid-cols-2 gap-4 border-b border-[#8c7456]/40 pb-4 text-xs">
            <div className="rounded border border-[#d4c8b8] p-3">
              <strong className="text-[#b85d19] block mb-1">કન્યા પક્ષ (Bride Details):</strong>
              <div>
                નામ: <strong>{brideForm.name}</strong>
              </div>
              <div>
                જન્મ: {brideForm.dob} {brideForm.tob} ({brideForm.city})
              </div>
            </div>
            <div className="rounded border border-[#d4c8b8] p-3">
              <strong className="text-[#2c2825] block mb-1">વર પક્ષ (Groom Details):</strong>
              <div>
                નામ: <strong>{groomForm.name}</strong>
              </div>
              <div>
                જન્મ: {groomForm.dob} {groomForm.tob} ({groomForm.city})
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between border-b border-[#e6dfd3]/80 pb-5 gap-4">
            <div>
              <span className="text-xs font-semibold text-[#736a60] uppercase">
                {t.totalScore} (Total Gunas)
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="font-serif text-5xl font-black text-[#b85d19]">
                  {milanResult.totalScore}
                </span>
                <span className="text-base font-bold text-[#736a60]">/ {t.maxScore}</span>
              </div>
            </div>

            <div
              className={`rounded-xl px-5 py-3 text-sm font-bold border ${
                milanResult.totalScore >= 28
                  ? 'glass-badge-success'
                  : milanResult.totalScore >= 18
                    ? 'glass-badge-warning'
                    : 'glass-badge-danger'
              }`}
            >
              {milanResult.totalScore >= 28
                ? `🌟 ${t.excellentMatch} (ઉત્તમ મિલન)`
                : milanResult.totalScore >= 18
                  ? `✅ ${t.goodMatch} (શુભ મિલન)`
                  : `⚠️ ${t.belowAverage} (મધ્યમ/ઓછા ગુણ)`}
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs font-medium text-[#736a60] mb-1.5">
              <span>ગુણ મિલન ટકાવારી (Compatibility Index)</span>
              <span className="font-mono font-bold">
                {Math.round((milanResult.totalScore / 36) * 100)}%
              </span>
            </div>
            <div className="w-full h-3 rounded-full glass-pill overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  milanResult.totalScore >= 28
                    ? 'bg-[#285e20]'
                    : milanResult.totalScore >= 18
                      ? 'bg-[#b85d19]'
                      : 'bg-[#802020]'
                }`}
                style={{ width: `${(milanResult.totalScore / 36) * 100}%` }}
              />
            </div>
          </div>

          {/* 8 Koota Score Breakdown Grid */}
          <div className="avoid-page-break">
            <h4 className="font-serif text-base font-bold text-[#2c2825] mb-3 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-[#b85d19]" /> ૮ કૂટ ગુણ વિશ્લેષણ (8 Koota Detailed
              Breakdown)
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: t.varnaScore,
                  score: milanResult.scores.varna,
                  max: 1,
                  desc: 'કાર્ય & આધ્યાત્મિક સુમેળ (Work)',
                },
                {
                  label: t.vashyaScore,
                  score: milanResult.scores.vashya,
                  max: 2,
                  desc: 'પરસ્પર આકર્ષણ અને પ્રભાવ (Dominance)',
                },
                {
                  label: t.taraScore,
                  score: milanResult.scores.tara,
                  max: 3,
                  desc: 'ભાગ્ય અને દીર્ઘાયુષ્ય સંવાદિતા (Destiny)',
                },
                {
                  label: t.yoniScore,
                  score: milanResult.scores.yoni,
                  max: 4,
                  desc: 'શારીરિક & પારિવારિક સુમેળ (Intimacy)',
                },
                {
                  label: t.maitriScore,
                  score: milanResult.scores.maitri,
                  max: 5,
                  desc: 'માનસિક મિત્રતા અને સદ્ભાવ (Friendship)',
                },
                {
                  label: t.ganaScore,
                  score: milanResult.scores.gana,
                  max: 6,
                  desc: 'સ્વભાવ અને વ્યવહાર સુમેળ (Temperament)',
                },
                {
                  label: t.bhakootScore,
                  score: milanResult.scores.bhakoot,
                  max: 7,
                  desc: 'પ્રેમ, આર્થિક સુખ & સંતાન (Love & Wealth)',
                },
                {
                  label: t.nadiScore,
                  score: milanResult.scores.nadi,
                  max: 8,
                  desc: 'આરોગ્ય, આનુવંશિકતા અને વંશવૃદ્ધિ (Health)',
                },
              ].map((g, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between rounded-xl glass-card p-3 text-xs space-y-1"
                >
                  <div className="flex justify-between items-center font-medium">
                    <span className="text-[#2c2825] font-bold">{g.label.split(' - ')[0]}</span>
                    <span className="font-mono font-bold text-sm text-[#b85d19]">
                      {g.score} / {g.max}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#736a60]">{g.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mangal Dosh Cross Compatibility */}
          <div className="avoid-page-break rounded-xl glass-pill p-4 space-y-1">
            <h4 className="font-semibold text-sm text-[#2c2825] flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#b85d19]" /> માંગલિક દોષ સંરેખણ (Mangal Dosha
              Analysis)
            </h4>
            <p className="text-xs text-[#544d44] leading-relaxed">
              કન્યા માંગલિક:{' '}
              <strong>{milanResult.doshas.brideHasMangal ? 'હા (Present)' : 'ના (Absent)'}</strong>{' '}
              | વર માંગલિક:{' '}
              <strong>{milanResult.doshas.groomHasMangal ? 'હા (Present)' : 'ના (Absent)'}</strong>
              <br />
              નિષ્કર્ષ:{' '}
              {milanResult.doshas.mangalMatch
                ? '✅ સંપૂર્ણ માંગલિક સંરેખણ (શુભ લગ્ન યોગ).'
                : '⚠️ માંગલિક અસંતુલન (શાસ્ત્રીય પરિહાર સલાહપાત્ર).'}
            </p>
          </div>

          {/* Astrologer Printable Signature Footer */}
          <div className="hidden print:block print-footer-signature rounded-xl border border-[#d4c8b8] bg-[#fcfbf7] p-4 text-xs mt-6">
            <div className="flex justify-between items-end">
              <div>
                <span className="font-serif font-bold text-[#8c7456] block">
                  || શુભ વિવાહ મસ્તુ • સદા સુખી ભવ ||
                </span>
                <p className="text-[10px] text-[#736a60] mt-0.5">
                  અષ્ટકૂટ ગુણ મિલન પદ્ધતિ આધારિત અધિકૃત જ્યોતિષીય પરામર્શ
                </p>
              </div>

              <div className="text-right">
                <div className="w-36 border-b border-dashed border-[#736a60] pb-1 mb-1"></div>
                <span className="text-[10px] font-bold text-[#2c2825] uppercase">
                  જ્યોતિષી હસ્તાક્ષર
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
