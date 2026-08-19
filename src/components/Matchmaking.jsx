import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Chip } from '@heroui/react';
import { calculatePlanetaryPositions } from '../engine/astronomy.js';
import { getFullKundli } from '../engine/kundli.js';
import { calculateGunMilan } from '../engine/matchmaking.js';
import { cityData } from '../engine/cityData.js';
import {
  Heart,
  Users,
  MapPin,
  Search,
  Award,
  ShieldCheck,
  Printer,
  X,
  RotateCcw,
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
        className="text-xs text-[var(--text-secondary)] flex items-center gap-1 mb-1 font-medium"
      >
        <MapPin className="h-3.5 w-3.5 text-[var(--text-muted)]" aria-hidden="true" /> {label}
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
          className="w-full rounded-xl glass-input pl-3 pr-8 py-2 text-xs text-[var(--text-primary)] focus:outline-hidden"
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
            className="absolute right-2.5 top-2 h-5 w-5 flex items-center justify-center rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-pill)] transition cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          <Search
            className="pointer-events-none absolute right-3 top-2.5 h-3.5 w-3.5 text-[var(--text-muted)]"
            aria-hidden="true"
          />
        )}
      </div>

      {isOpen && (
        <div
          role="listbox"
          aria-label={`City suggestions for ${label}`}
          className="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-xl glass-panel py-1 shadow-lg text-xs border border-[var(--border-subtle)]"
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
              className="flex w-full items-center justify-between px-3 py-1.5 text-left hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] transition cursor-pointer"
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
              className="flex w-full items-center justify-between px-3 py-1.5 text-left bg-[var(--bg-pill)] hover:bg-[var(--bg-card-hover)] text-[var(--text-gold)] font-medium border-t border-[var(--border-subtle)] transition cursor-pointer"
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

  const handleClearBride = () => {
    setBrideForm({
      name: '',
      dob: '',
      tob: '',
      city: '',
      lat: 21.1702,
      lng: 72.8311,
      tz: 5.5,
    });
  };

  const handleClearGroom = () => {
    setGroomForm({
      name: '',
      dob: '',
      tob: '',
      city: '',
      lat: 23.0225,
      lng: 72.5714,
      tz: 5.5,
    });
  };

  const handleClearBoth = () => {
    handleClearBride();
    handleClearGroom();
    setMilanResult(null);
  };

  const handleMatch = () => {
    if (!brideForm.dob || !brideForm.tob || !groomForm.dob || !groomForm.tob) return;
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
    <Card className="rounded-2xl glass-panel p-6 shadow-sm space-y-6 print:border-none print:p-0 print:bg-white border border-[var(--border-subtle)]">
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
      <Card.Header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4 p-0 print:hidden">
        <div>
          <Card.Title className="text-lg sm:text-xl font-medium text-[var(--text-primary)] font-serif flex items-center gap-2">
            <Heart className="h-5 w-5 text-[var(--text-gold)]" /> {t.matchmakingTitle} (Ashtakoot
            36-gun milan)
          </Card.Title>
          <Card.Description className="text-xs text-[var(--text-muted)]">
            ૩૬ ગુણ મિલન, માંગલિક દોષ સંરેખણ અને સુમેળતા વિશ્લેષણ
          </Card.Description>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            onPress={handleClearBoth}
            title={t.clearForm || 'Clear forms'}
            className="flex items-center gap-1.5 rounded-xl glass-card px-3.5 py-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-rose-500 transition shadow-xs cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{t.clearForm || 'Clear both'}</span>
          </Button>

          {milanResult && (
            <Button
              type="button"
              onPress={handlePrint}
              title="Save matchmaking as PDF"
              className="flex items-center gap-1.5 rounded-xl glass-card px-3.5 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition shadow-xs cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5 text-[var(--text-gold)]" />
              <span>Save as PDF</span>
            </Button>
          )}
        </div>
      </Card.Header>

      {/* Dual Profile Forms (Hidden in Print) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 print:hidden">
        {/* Bride */}
        <Card className="rounded-2xl glass-panel-accent p-5 shadow-2xs space-y-3 border border-[var(--border-gold)]">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
            <h3 className="font-serif text-base font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <Users className="h-4 w-4 text-[var(--text-gold)]" /> {t.brideDetails} (Bride)
            </h3>
            <button
              type="button"
              onClick={handleClearBride}
              title={t.clearBrideForm || 'Clear Bride Details'}
              className="text-[11px] font-medium text-[var(--text-muted)] hover:text-rose-500 flex items-center gap-1 transition cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>{t.clearForm || 'Clear'}</span>
            </button>
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--text-secondary)]">{t.name}</label>
            <input
              type="text"
              value={brideForm.name}
              onChange={(e) => setBrideForm({ ...brideForm, name: e.target.value })}
              className="w-full rounded-xl glass-input px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)]">{t.dob}</label>
              <input
                type="date"
                value={brideForm.dob}
                onChange={(e) => setBrideForm({ ...brideForm, dob: e.target.value })}
                className="w-full rounded-xl glass-input px-3 py-2 text-xs text-[var(--text-primary)] font-mono focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)]">{t.tob}</label>
              <input
                type="time"
                value={brideForm.tob}
                onChange={(e) => setBrideForm({ ...brideForm, tob: e.target.value })}
                className="w-full rounded-xl glass-input px-3 py-2 text-xs text-[var(--text-primary)] font-mono focus:outline-none"
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
        </Card>

        {/* Groom */}
        <Card className="rounded-2xl glass-panel-accent p-5 shadow-2xs space-y-3 border border-[var(--border-gold)]">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
            <h3 className="font-serif text-base font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <Users className="h-4 w-4 text-[var(--text-gold)]" /> {t.groomDetails} (Groom)
            </h3>
            <button
              type="button"
              onClick={handleClearGroom}
              title={t.clearGroomForm || 'Clear Groom Details'}
              className="text-[11px] font-medium text-[var(--text-muted)] hover:text-rose-500 flex items-center gap-1 transition cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>{t.clearForm || 'Clear'}</span>
            </button>
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--text-secondary)]">{t.name}</label>
            <input
              type="text"
              value={groomForm.name}
              onChange={(e) => setGroomForm({ ...groomForm, name: e.target.value })}
              className="w-full rounded-xl glass-input px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)]">{t.dob}</label>
              <input
                type="date"
                value={groomForm.dob}
                onChange={(e) => setGroomForm({ ...groomForm, dob: e.target.value })}
                className="w-full rounded-xl glass-input px-3 py-2 text-xs text-[var(--text-primary)] font-mono focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)]">{t.tob}</label>
              <input
                type="time"
                value={groomForm.tob}
                onChange={(e) => setGroomForm({ ...groomForm, tob: e.target.value })}
                className="w-full rounded-xl glass-input px-3 py-2 text-xs text-[var(--text-primary)] font-mono focus:outline-none"
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
        </Card>
      </div>

      {/* Action Buttons Bar */}
      <div className="flex flex-wrap items-center gap-3 print:hidden">
        <Button
          type="button"
          onPress={handleMatch}
          className="flex-1 rounded-xl glass-button-primary py-3 text-center text-sm font-bold shadow-md transition cursor-pointer text-[#0c0e17]"
        >
          {t.checkCompatibility}
        </Button>

        <Button
          type="button"
          onPress={handleClearBoth}
          title={t.clearForm || 'Clear Both Forms'}
          className="rounded-xl glass-card px-5 py-3 text-sm font-medium text-[var(--text-muted)] hover:text-rose-500 transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          <span>{t.clearForm || 'Clear All'}</span>
        </Button>
      </div>

      {/* Results Display */}
      {milanResult && (
        <Card className="rounded-2xl glass-panel-accent p-6 shadow-sm space-y-6 border border-[var(--border-gold)]">
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

          <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-subtle)] pb-5 gap-4">
            <div>
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase">
                {t.totalScore} (Total Gunas)
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="font-serif text-5xl font-black text-[var(--text-gold)]">
                  {milanResult.totalScore}
                </span>
                <span className="text-base font-bold text-[var(--text-muted)]">/ {t.maxScore}</span>
              </div>
            </div>

            <Chip
              className={`rounded-xl px-5 py-3 text-sm font-bold border ${
                milanResult.totalScore >= 28
                  ? 'glass-badge-success'
                  : milanResult.totalScore >= 18
                    ? 'glass-badge-gold'
                    : 'glass-badge-danger'
              }`}
            >
              <Chip.Label>
                {milanResult.totalScore >= 28
                  ? `🌟 ${t.excellentMatch} (ઉત્તમ મિલન)`
                  : milanResult.totalScore >= 18
                    ? `✅ ${t.goodMatch} (શુભ મિલન)`
                    : `⚠️ ${t.belowAverage} (મધ્યમ/ઓછા ગુણ)`}
              </Chip.Label>
            </Chip>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs font-medium text-[var(--text-muted)] mb-1.5">
              <span>ગુણ મિલન ટકાવારી (Compatibility Index)</span>
              <span className="font-mono font-bold text-[var(--text-primary)]">
                {Math.round((milanResult.totalScore / 36) * 100)}%
              </span>
            </div>
            <div className="w-full h-3 rounded-full glass-pill overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  milanResult.totalScore >= 28
                    ? 'bg-emerald-500'
                    : milanResult.totalScore >= 18
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                }`}
                style={{ width: `${(milanResult.totalScore / 36) * 100}%` }}
              />
            </div>
          </div>

          {/* 8 Koota Score Breakdown Grid */}
          <div className="avoid-page-break">
            <h4 className="font-serif text-base font-bold text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-[var(--text-gold)]" /> ૮ કૂટ ગુણ વિશ્લેષણ (8 Koota
              Detailed Breakdown)
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
                <Card
                  key={i}
                  className="flex flex-col justify-between rounded-xl glass-card p-3 text-xs space-y-1 border border-[var(--border-subtle)]"
                >
                  <div className="flex justify-between items-center font-medium">
                    <span className="text-[var(--text-primary)] font-bold">
                      {g.label.split(' - ')[0]}
                    </span>
                    <span className="font-mono font-bold text-sm text-[var(--text-gold)]">
                      {g.score} / {g.max}
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)]">{g.desc}</span>
                </Card>
              ))}
            </div>
          </div>

          {/* Mangal Dosh Cross Compatibility */}
          <Card className="avoid-page-break rounded-xl glass-pill p-4 space-y-1 border border-[var(--border-subtle)]">
            <h4 className="font-semibold text-sm text-[var(--text-primary)] flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[var(--text-gold)]" /> માંગલિક દોષ સંરેખણ (Mangal
              Dosha Analysis)
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
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
          </Card>

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
        </Card>
      )}
    </Card>
  );
}
