import React, { useState } from 'react';
import { Button, Card, Chip } from '@heroui/react';
import { calculateFullNumerology, calculateNameNumbers } from '../engine/numerology.js';
import {
  Hash,
  Sparkles,
  User,
  Calendar,
  ShieldCheck,
  AlertCircle,
  Award,
  Compass,
  Gem,
  Printer,
  CheckCircle2,
  RotateCcw,
  Edit3,
  Wand2,
  Lightbulb,
  X,
} from 'lucide-react';

export default function NumerologyView({ formData, birthDate, t, lang }) {
  // Manual Input State
  const [nameInput, setNameInput] = useState(formData.name || 'રાહુલ શર્મા');
  const [dobInput, setDobInput] = useState(formData.dob || '1995-08-15');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Alternate Name Spelling Testing State
  const [testSpelling, setTestSpelling] = useState('');

  const [y, m, d] = dobInput.split('-').map(Number);
  const activeDate = new Date(y || 1986, (m || 3) - 1, d || 1);

  const numData = calculateFullNumerology(nameInput, activeDate, selectedYear);
  const testNameData = testSpelling ? calculateNameNumbers(testSpelling) : null;

  const handlePrint = () => {
    window.print();
  };

  const handleLoadKundliProfile = () => {
    setNameInput(formData.name || 'રાહુલ શર્મા');
    setDobInput(formData.dob || '1995-08-15');
  };

  const handleClearFresh = () => {
    setNameInput('');
    setDobInput('2000-01-01');
  };

  return (
    <Card className="rounded-2xl glass-panel p-6 shadow-sm space-y-6 print:border-none print:p-0 print:bg-white border border-[var(--border-gold)]">
      {/* Dedicated Printable PDF Header (Visible Only in Print) */}
      <div className="hidden print:block text-center border-b-2 border-[#8c7456] pb-3 mb-4">
        <span className="font-serif text-xs font-bold tracking-widest text-[#8c7456]">
          || ૐ શ્રી ગણેશાય નમઃ ||
        </span>
        <h1 className="font-serif text-2xl font-bold text-[#2c2825] mt-1">
          વિગતવાર અંકશાસ્ત્ર રિપોર્ટ (Numerology Report)
        </h1>
        <p className="text-xs text-[#544d44]">
          નામ: {nameInput} • જન્મ તારીખ: {numData.birthDateFormatted} • પર્સનલ વર્ષ: {selectedYear}
        </p>
      </div>

      {/* Manual Input Studio Card (Hidden in Print) */}
      <Card className="rounded-2xl glass-panel-accent p-5 shadow-xs space-y-4 print:hidden border border-[var(--border-gold)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
          <div>
            <h2 className="text-lg font-medium text-[var(--text-primary)] font-serif flex items-center gap-2">
              <Edit3 className="h-4 w-4 text-[var(--text-gold)]" /> મેન્યુઅલ અંકશાસ્ત્ર ડેટા એન્ટ્રી
              (Manual Numerology Entry)
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              અહીં તમે કોઈપણ વ્યક્તિનું નામ અને જન્મ તારીખ હાથથી દાખલ કરીને તાત્કાલિક અંકશાસ્ત્ર
              ગણતરી કરી શકો છો
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              onPress={handleLoadKundliProfile}
              title="કુંડળી પ્રોફાઇલમાંથી લોડ કરો"
              className="flex items-center gap-1.5 rounded-xl glass-card px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition shadow-2xs cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>કુંડળી પ્રોફાઇલ લોડ કરો</span>
            </Button>

            <Button
              type="button"
              onPress={handleClearFresh}
              title="ફોર્મ સાફ કરો (Clear Form)"
              className="flex items-center gap-1.5 rounded-xl glass-card px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-rose-500 transition shadow-2xs cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>ફોર્મ સાફ કરો</span>
            </Button>

            <Button
              type="button"
              onPress={handlePrint}
              title="Save Numerology as PDF"
              className="flex items-center gap-1.5 rounded-xl glass-card px-3.5 py-1.5 text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition shadow-xs cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5 text-[var(--text-gold)]" />
              <span>Save as PDF</span>
            </Button>
          </div>
        </div>

        {/* 3 Manual Input Fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Full Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-[var(--text-gold)]" /> પૂરું નામ (Full Name in
              English):
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full rounded-xl glass-input px-3 py-2 text-xs font-medium text-[var(--text-primary)] focus:outline-none"
            />
          </div>

          {/* Date of Birth Picker */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[var(--text-gold)]" /> જન્મ તારીખ (Date of
              Birth):
            </label>
            <input
              type="date"
              value={dobInput}
              onChange={(e) => setDobInput(e.target.value)}
              className="w-full rounded-xl glass-input px-3 py-2 text-xs font-mono text-[var(--text-primary)] focus:outline-none"
            />
          </div>

          {/* Target Prediction Year */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[var(--text-gold)]" /> આગાહી વર્ષ (Target
              Forecast Year):
            </label>
            <input
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value) || 2026)}
              min={1900}
              max={2100}
              className="w-full rounded-xl glass-input px-3 py-2 text-xs font-mono text-[var(--text-primary)] focus:outline-none"
            />
          </div>
        </div>

        {/* Live Alternate Name Spelling Sandbox */}
        <Card className="rounded-xl border border-[var(--border-subtle)] glass-card p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              <Wand2 className="h-3.5 w-3.5 text-[var(--text-gold)]" /> સ્પેલિંગ સુધારણા ટેસ્ટર
              (Live Name Correction Lab):
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">
              કોઈપણ વૈકલ્પિક સ્પેલિંગ લખીને જાતે ટેસ્ટ કરો
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <input
                type="text"
                value={testSpelling}
                onChange={(e) => setTestSpelling(e.target.value)}
                placeholder="અહીં વૈકલ્પિક સ્પેલિંગ લખો (e.g. Rahul S Sharma)..."
                className="w-full rounded-xl glass-input pl-3 pr-8 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none"
              />
              {testSpelling && (
                <button
                  type="button"
                  onClick={() => setTestSpelling('')}
                  title="Clear Spelling"
                  aria-label="Clear Spelling"
                  className="absolute right-2 top-1.5 h-5 w-5 flex items-center justify-center rounded-full text-[var(--text-muted)] hover:text-rose-500 transition"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            {testNameData && (
              <div className="flex items-center gap-3 text-xs glass-card px-3 py-1.5 rounded-xl border border-[var(--border-subtle)]">
                <span>
                  કાલ્ડિયન:{' '}
                  <strong className="font-mono text-[var(--text-gold)]">
                    {testNameData.chaldeanNumber}
                  </strong>{' '}
                  ({testNameData.chaldeanCompound})
                </span>
                <span>
                  પાયથાગોરિયન:{' '}
                  <strong className="font-mono text-[var(--text-primary)]">
                    {testNameData.pythagoreanNumber}
                  </strong>{' '}
                  ({testNameData.pythagoreanCompound})
                </span>
                <Button
                  type="button"
                  onPress={() => {
                    setNameInput(testSpelling);
                    setTestSpelling('');
                  }}
                  className="rounded-lg glass-button-primary px-2.5 py-1 text-[10px] font-bold text-[#0c0e17] transition cursor-pointer"
                >
                  આ નામ સેટ કરો
                </Button>
              </div>
            )}
          </div>
        </Card>
      </Card>

      {/* Automated Smart Name Spelling Suggestions */}
      {numData.suggestions && numData.suggestions.length > 0 && (
        <Card className="rounded-2xl glass-panel-accent p-5 shadow-xs space-y-4 border border-[var(--border-gold)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-[var(--text-gold)]" />
              <div>
                <h3 className="font-serif text-base font-bold text-[var(--text-primary)]">
                  સ્માર્ટ નામ સ્પેલિંગ સુધારણા ભલામણો (Smart Name Spelling Recommendations)
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  મૂળાંક {numData.mulank} અને ભાગ્યાંક {numData.bhagyank} માટે અંકશાસ્ત્ર મુજબ સૌથી
                  વધુ લકી અને આર્થિક સમૃદ્ધિ આપતા સ્પેલિંગ વિકલ્પો
                </p>
              </div>
            </div>
            <Chip className="glass-badge-success px-3 py-1 text-xs font-bold">
              <Chip.Label>Chaldean Esoteric Formulas</Chip.Label>
            </Chip>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {numData.suggestions.map((sug, idx) => {
              const isCurrent = sug.spelling.toUpperCase() === nameInput.toUpperCase();

              return (
                <Card
                  key={idx}
                  className={`rounded-2xl p-4 text-xs space-y-2.5 transition-all duration-300 relative overflow-hidden animate-fade-in-up border ${
                    isCurrent
                      ? 'glass-panel-accent ring-2 ring-[var(--border-gold)] shadow-md'
                      : 'glass-card border-[var(--border-subtle)]'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] font-semibold">
                        વિકલ્પ #{idx + 1}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-[var(--text-primary)] mt-0.5">
                        {sug.spelling}
                      </h4>
                    </div>
                    <Chip
                      className={`px-2 py-0.5 text-[10px] font-bold shadow-2xs ${
                        sug.matchPercentage >= 90 ? 'glass-badge-success' : 'glass-badge-gold'
                      }`}
                    >
                      <Chip.Label>{sug.matchPercentage}% લકી સ્કોર</Chip.Label>
                    </Chip>
                  </div>

                  <div className="flex items-center gap-3 text-xs glass-pill p-2 rounded-xl">
                    <div>
                      કાલ્ડિયન:{' '}
                      <strong className="font-mono text-sm text-[var(--text-gold)]">
                        {sug.chaldeanNumber}
                      </strong>{' '}
                      ({sug.chaldeanCompound})
                    </div>
                    <div>
                      વાઇબ્રેશન:{' '}
                      <strong className="text-[var(--text-primary)]">
                        {sug.compoundInfo.name}
                      </strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-[var(--text-secondary)] leading-tight">
                    {sug.compoundInfo.desc[lang] || sug.compoundInfo.desc.gu}
                  </p>

                  <div className="pt-1 flex justify-between items-center">
                    {isCurrent ? (
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> હાલનું સક્રિય નામ
                      </span>
                    ) : (
                      <Button
                        type="button"
                        onPress={() => setNameInput(sug.spelling)}
                        className="w-full rounded-xl glass-button-primary py-1.5 text-center text-xs font-semibold text-[#0c0e17] transition shadow-xs cursor-pointer"
                      >
                        આ સ્પેલિંગ લાગુ કરો (Apply)
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </Card>
      )}

      {/* 4 Core Numbers Dashboard */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. Mulank (Driver Number) */}
        <Card className="rounded-2xl glass-panel-accent p-5 shadow-xs relative overflow-hidden border border-[var(--border-gold)]">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                ૧. મૂળાંક (Driver No.)
              </span>
              <h3 className="font-mono text-3xl font-black text-[var(--text-gold)] mt-1">
                {numData.mulank}
              </h3>
            </div>
            <Chip className="glass-pill px-2.5 py-1 text-[11px] font-bold text-[var(--text-gold)]">
              <Chip.Label>
                {numData.mulankProfile.planet[lang] || numData.mulankProfile.planet.gu}
              </Chip.Label>
            </Chip>
          </div>
          <p className="mt-3 text-xs text-[var(--text-secondary)] leading-relaxed">
            {numData.mulankProfile.traits[lang] || numData.mulankProfile.traits.gu}
          </p>
          <div className="mt-3 border-t border-[var(--border-subtle)] pt-2 text-[10px] text-[var(--text-muted)]">
            મૂળ સ્વભાવ:{' '}
            <strong>
              {numData.mulankProfile.archetype[lang] || numData.mulankProfile.archetype.gu}
            </strong>
          </div>
        </Card>

        {/* 2. Bhagyank (Conductor Number) */}
        <Card className="rounded-2xl glass-panel p-5 shadow-xs relative overflow-hidden border border-[var(--border-subtle)]">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                ૨. ભાગ્યાંક (Destiny No.)
              </span>
              <h3 className="font-mono text-3xl font-black text-[var(--text-primary)] mt-1">
                {numData.bhagyank}
              </h3>
            </div>
            <Chip className="glass-pill px-2.5 py-1 text-[11px] font-bold text-[var(--text-primary)]">
              <Chip.Label>
                {numData.bhagyankProfile.planet[lang] || numData.bhagyankProfile.planet.gu}
              </Chip.Label>
            </Chip>
          </div>
          <p className="mt-3 text-xs text-[var(--text-secondary)] leading-relaxed">
            {numData.bhagyankProfile.traits[lang] || numData.bhagyankProfile.traits.gu}
          </p>
          <div className="mt-3 border-t border-[var(--border-subtle)] pt-2 text-[10px] text-[var(--text-muted)]">
            જીવન પથ:{' '}
            <strong>
              {numData.bhagyankProfile.archetype[lang] || numData.bhagyankProfile.archetype.gu}
            </strong>
          </div>
        </Card>

        {/* 3. Namank (Chaldean Name Number) */}
        <Card className="rounded-2xl glass-badge-success p-5 shadow-xs relative overflow-hidden border">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                ૩. નામાંક (Chaldean)
              </span>
              <h3 className="font-mono text-3xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
                {numData.nameData.chaldeanNumber}{' '}
                <span className="text-xs font-normal text-[var(--text-muted)]">
                  ({numData.nameData.chaldeanCompound})
                </span>
              </h3>
            </div>
            <Chip
              className={`px-2.5 py-1 text-[10px] font-bold border ${
                numData.isNameHarmonious ? 'glass-badge-success' : 'glass-badge-danger'
              }`}
            >
              <Chip.Label>
                {numData.isNameHarmonious ? '✅ સુસંગત (Auspicious)' : '⚠️ સુધારણા યોગ્ય'}
              </Chip.Label>
            </Chip>
          </div>
          <div className="mt-3 text-xs text-[var(--text-secondary)] space-y-1">
            <div>
              પાયથાગોરિયન: <strong>{numData.nameData.pythagoreanNumber}</strong> (
              {numData.nameData.pythagoreanCompound})
            </div>
            <div>
              હૃદયાંક (Soul Urge): <strong>{numData.nameData.soulUrgeNumber}</strong>
            </div>
            <div>
              વ્યક્તિત્વાંક: <strong>{numData.nameData.personalityNumber}</strong>
            </div>
          </div>
        </Card>

        {/* 4. Personal Year */}
        <Card className="rounded-2xl glass-panel p-5 shadow-xs relative overflow-hidden border border-[var(--border-subtle)]">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                ૪. પર્સનલ વર્ષ {selectedYear}
              </span>
              <h3 className="font-mono text-3xl font-black text-[var(--text-gold)] mt-1">
                {numData.personalYear}
              </h3>
            </div>
            <Chip className="glass-badge-gold px-2.5 py-1 text-[11px] font-bold">
              <Chip.Label>વાર્ષિક અંક</Chip.Label>
            </Chip>
          </div>
          <p className="mt-3 text-xs text-[var(--text-secondary)] leading-relaxed">
            વર્ષ {selectedYear} તમારા માટે <strong>અંક {numData.personalYear}</strong> ના પ્રભાવ
            હેઠળ છે.{' '}
            {numData.personalYear === 1
              ? 'નવા કાર્યોની શરૂઆત માટે ઉત્તમ વર્ષ.'
              : numData.personalYear === 5
                ? 'મોટા પરિવર્તન અને પ્રવાસનું વર્ષ.'
                : numData.personalYear === 8
                  ? 'આર્થિક સમૃદ્ધિ અને સત્તા પ્રાપ્તિનું વર્ષ.'
                  : 'પ્રગતિ અને પરિશ્રમનું વર્ષ.'}
          </p>
        </Card>
      </div>

      {/* Lo-Shu Grid & Planes Analysis */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* 3x3 Visual Magic Square */}
        <Card className="lg:col-span-5 rounded-2xl border border-[var(--border-gold)] glass-panel p-5 space-y-4 shadow-sm">
          <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-2">
            <h3 className="font-serif text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              <Award className="h-4 w-4 text-[var(--text-gold)]" /> લો-શૂ ગ્રીડ (Lo-Shu 3x3 Magic
              Grid)
            </h3>
            <span className="text-[10px] text-[var(--text-muted)]">જન્મ તારીખ આધારિત</span>
          </div>

          {/* 3x3 Grid */}
          <div className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto p-2 glass-pill rounded-2xl">
            {[
              { num: 4, label: 'રાહુ (4)' },
              { num: 9, label: 'મંગળ (9)' },
              { num: 2, label: 'ચંદ્ર (2)' },
              { num: 3, label: 'ગુરુ (3)' },
              { num: 5, label: 'બુધ (5)' },
              { num: 7, label: 'કેતુ (7)' },
              { num: 8, label: 'શનિ (8)' },
              { num: 1, label: 'સૂર્ય (1)' },
              { num: 6, label: 'શુક્ર (6)' },
            ].map((cell) => {
              const count = numData.loShu.digitCounts[cell.num] || 0;
              const hasDigit = count > 0;

              return (
                <div
                  key={cell.num}
                  className={`flex flex-col items-center justify-center h-20 rounded-xl text-center transition ${
                    hasDigit
                      ? 'glass-panel-accent shadow-xs border border-[var(--border-gold)]'
                      : 'glass-card border-dashed opacity-50'
                  }`}
                >
                  <span
                    className={`font-mono text-2xl font-bold ${hasDigit ? 'text-[var(--text-gold)]' : 'text-[var(--text-muted)]'}`}
                  >
                    {hasDigit ? String(cell.num).repeat(count) : '-'}
                  </span>
                  <span className="text-[9px] text-[var(--text-muted)] mt-0.5">{cell.label}</span>
                </div>
              );
            })}
          </div>

          <div className="text-xs text-[var(--text-secondary)] text-center">
            {numData.loShu.missingDigits.length > 0 ? (
              <span className="text-rose-600 dark:text-rose-400 font-semibold">
                ⚠️ ખૂટતા અંકો (Missing Numbers):{' '}
                <strong>{numData.loShu.missingDigits.join(', ')}</strong>
              </span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                ✅ તમામ અંકો પરિપૂર્ણ છે!
              </span>
            )}
          </div>
        </Card>

        {/* 8 Planes & Yoga Breakdown */}
        <Card className="lg:col-span-7 rounded-2xl glass-panel p-5 space-y-4 shadow-sm border border-[var(--border-subtle)]">
          <h3 className="font-serif text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5 border-b border-[var(--border-subtle)] pb-2">
            <Sparkles className="h-4 w-4 text-[var(--text-gold)]" /> ૮ મુખ્ય પ્લેન અને રાજયોગ (8
            Planes Analysis)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {numData.loShu.planes.map((p) => (
              <div
                key={p.id}
                className={`p-3 rounded-xl border flex items-center justify-between transition ${
                  p.active
                    ? 'glass-badge-success'
                    : 'glass-card text-[var(--text-muted)] border-[var(--border-subtle)]'
                }`}
              >
                <div>
                  <span className="font-semibold block">{p.name[lang] || p.name.gu}</span>
                  <span className="text-[10px] font-mono">અંકો: ({p.digits.join(', ')})</span>
                </div>
                <Chip
                  className={`text-[10px] font-bold px-2 py-0.5 ${
                    p.active ? 'glass-badge-success' : 'glass-pill text-[var(--text-muted)]'
                  }`}
                >
                  <Chip.Label>{p.active ? 'સક્રિય (Active)' : 'અપૂર્ણ'}</Chip.Label>
                </Chip>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Lucky Elements & Compatibility Matrix */}
      <Card className="rounded-2xl glass-panel p-5 space-y-4 shadow-sm border border-[var(--border-gold)]">
        <h3 className="font-serif text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5 border-b border-[var(--border-subtle)] pb-2">
          <Gem className="h-4 w-4 text-[var(--text-gold)]" /> શુભ તત્વો અને મિત્ર અંકો (Lucky
          Elements & Compatibility Matrix)
        </h3>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 text-xs">
          <Card className="rounded-xl glass-card p-3 border border-[var(--border-subtle)]">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">
              શુભ અંકો (Lucky Nos)
            </span>
            <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">
              {numData.mulankProfile.friendly.join(', ')}
            </span>
          </Card>

          <Card className="rounded-xl glass-card p-3 border border-[var(--border-subtle)]">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">
              શત્રુ અંકો (Enemy Nos)
            </span>
            <span className="font-mono font-bold text-sm text-rose-600 dark:text-rose-400">
              {numData.mulankProfile.enemy.length > 0
                ? numData.mulankProfile.enemy.join(', ')
                : 'કોઈ શત્રુ નથી'}
            </span>
          </Card>

          <Card className="rounded-xl glass-card p-3 border border-[var(--border-subtle)]">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">
              શુભ વાર (Lucky Days)
            </span>
            <span className="font-semibold text-[var(--text-primary)]">
              {numData.mulankProfile.luckyDays[lang] || numData.mulankProfile.luckyDays.gu}
            </span>
          </Card>

          <Card className="rounded-xl glass-card p-3 border border-[var(--border-subtle)]">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">
              શુભ રંગ (Lucky Colors)
            </span>
            <span className="font-semibold text-[var(--text-primary)]">
              {numData.mulankProfile.luckyColors[lang] || numData.mulankProfile.luckyColors.gu}
            </span>
          </Card>

          <Card className="rounded-xl glass-card p-3 border border-[var(--border-subtle)]">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">
              શુભ રત્ન (Gemstone)
            </span>
            <span className="font-semibold text-[var(--text-gold)]">
              {numData.mulankProfile.luckyGem[lang] || numData.mulankProfile.luckyGem.gu}
            </span>
          </Card>

          <Card className="rounded-xl glass-card p-3 border border-[var(--border-subtle)]">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">
              શુભ દિશા (Direction)
            </span>
            <span className="font-semibold text-[var(--text-primary)]">
              {numData.mulankProfile.luckyDir[lang] || numData.mulankProfile.luckyDir.gu}
            </span>
          </Card>
        </div>

        <div className="rounded-xl glass-pill p-3.5 text-xs">
          <span className="font-bold text-[var(--text-primary)] block mb-1">
            અનુકૂળ કારકિર્દી અને વ્યવસાય ક્ષેત્રો:
          </span>
          <span className="text-[var(--text-secondary)]">
            {numData.mulankProfile.careers[lang] || numData.mulankProfile.careers.gu}
          </span>
        </div>
      </Card>

      {/* Printable Footer (Visible Only in Print) */}
      <div className="hidden print:block print-footer-signature rounded-xl border border-[#d4c8b8] bg-[#fcfbf7] p-3 text-xs text-center">
        <span className="font-serif font-bold text-[#8c7456]">
          || વૈદિક અને કાલ્ડિયન અંકશાસ્ત્ર વિશ્લેષણ રિપોર્ટ ||
        </span>
        <p className="text-[10px] text-[#736a60] mt-0.5">
          નામ વાઇબ્રેશન, લો-શૂ મેજિક સ્ક્વેર અને ભાગ્ય અંક પદ્ધતિ આધારિત પ્રમાણિત અંકશાસ્ત્ર
        </p>
      </div>
    </Card>
  );
}
