import React, { useState } from 'react';
import { calculateFullNumerology, calculateNameNumbers } from '../engine/numerology.js';
import {
  Hash, Sparkles, User, Calendar, ShieldCheck, AlertCircle, Award, Compass, Gem, Printer, CheckCircle2, RotateCcw, Edit3, ArrowRight, Wand2, Lightbulb, Star
} from 'lucide-react';

export default function NumerologyView({ formData, birthDate, t, lang }) {
  // Manual Input State
  const [nameInput, setNameInput] = useState(formData.name || "Tapan Tailor");
  const [dobInput, setDobInput] = useState(formData.dob || "1986-03-01");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Alternate Name Spelling Testing State
  const [testSpelling, setTestSpelling] = useState("");

  const [y, m, d] = dobInput.split('-').map(Number);
  const activeDate = new Date(y || 1986, (m || 3) - 1, d || 1);

  const numData = calculateFullNumerology(nameInput, activeDate, selectedYear);
  const testNameData = testSpelling ? calculateNameNumbers(testSpelling) : null;

  const handlePrint = () => {
    window.print();
  };

  const handleLoadKundliProfile = () => {
    setNameInput(formData.name || "Tapan Tailor");
    setDobInput(formData.dob || "1986-03-01");
  };

  const handleClearFresh = () => {
    setNameInput("");
    setDobInput("2000-01-01");
  };

  return (
    <div className="rounded-xl glass-panel p-6 shadow-sm space-y-6 print:border-none print:p-0 print:bg-white">
      {/* Dedicated Printable PDF Header (Visible Only in Print) */}
      <div className="hidden print:block text-center border-b-2 border-[#8c7456] pb-3 mb-4">
        <span className="font-serif text-xs font-bold tracking-widest text-[#8c7456]">|| ૐ શ્રી ગણેશાય નમઃ ||</span>
        <h1 className="font-serif text-2xl font-bold text-[#2c2825] mt-1">વિગતવાર અંકશાસ્ત્ર રિપોર્ટ (Numerology Report)</h1>
        <p className="text-xs text-[#544d44]">નામ: {nameInput} • જન્મ તારીખ: {numData.birthDateFormatted} • પર્સનલ વર્ષ: {selectedYear}</p>
      </div>

      {/* Manual Input Studio Card (Hidden in Print) */}
      <div className="rounded-xl glass-panel-accent p-5 shadow-xs space-y-4 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e6dfd3]/80 pb-3">
          <div>
            <h2 className="text-lg font-medium text-[#2c2825] font-serif flex items-center gap-2">
              <Edit3 className="h-4 w-4 text-[#b85d19]" /> મેન્યુઅલ અંકશાસ્ત્ર ડેટા એન્ટ્રી (Manual Numerology Entry)
            </h2>
            <p className="text-xs text-[#736a60]">
              અહીં તમે કોઈપણ વ્યક્તિનું નામ અને જન્મ તારીખ હાથથી દાખલ કરીને તાત્કાલિક અંકશાસ્ત્ર ગણતરી કરી શકો છો
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleLoadKundliProfile}
              title="કુંડળી પ્રોફાઇલમાંથી લોડ કરો"
              className="flex items-center gap-1.5 rounded-lg glass-card px-3 py-1.5 text-xs font-medium text-[#544d44] hover:bg-[#2c2825] hover:text-[#f4ebd9] transition shadow-2xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>કુંડળી પ્રોફાઇલ લોડ કરો</span>
            </button>

            <button
              onClick={handleClearFresh}
              title="નવી એન્ટ્રી માટે ક્લિયર કરો"
              className="flex items-center gap-1.5 rounded-lg glass-card px-3 py-1.5 text-xs font-medium text-[#544d44] hover:bg-[#802020] hover:text-white transition shadow-2xs"
            >
              <span>નવી એન્ટ્રી (Clear)</span>
            </button>

            <button
              onClick={handlePrint}
              title="Save Numerology as PDF"
              className="flex items-center gap-1.5 rounded-lg glass-card px-3.5 py-1.5 text-xs font-medium text-[#544d44] hover:bg-white/90 hover:text-[#2c2825] transition shadow-xs"
            >
              <Printer className="h-3.5 w-3.5 text-[#b85d19]" />
              <span>Save as PDF</span>
            </button>
          </div>
        </div>

        {/* 3 Manual Input Fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Full Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#544d44] flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-[#b85d19]" /> પૂરું નામ (Full Name in English):
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="e.g. Tapan Tailor"
              className="w-full rounded-lg glass-input px-3 py-2 text-xs font-medium text-[#2c2825] focus:outline-none"
            />
          </div>

          {/* Date of Birth Picker */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#544d44] flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[#b85d19]" /> જન્મ તારીખ (Date of Birth):
            </label>
            <input
              type="date"
              value={dobInput}
              onChange={(e) => setDobInput(e.target.value)}
              className="w-full rounded-lg glass-input px-3 py-2 text-xs font-mono text-[#2c2825] focus:outline-none"
            />
          </div>

          {/* Target Prediction Year */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#544d44] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#b85d19]" /> વાર્ષિક આગાહી વર્ષ (Forecast Year):
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full rounded-lg glass-input px-3 py-2 text-xs font-mono text-[#2c2825] focus:outline-none"
              />
              <button
                onClick={() => setSelectedYear(new Date().getFullYear())}
                className="rounded-lg glass-card px-3 py-1.5 text-[11px] font-semibold text-[#544d44] hover:bg-white"
              >
                આ વર્ષ
              </button>
            </div>
          </div>
        </div>

        {/* Live Custom Spelling Tester */}
        <div className="rounded-lg glass-pill p-3.5 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-[#2c2825] flex items-center gap-1.5">
              <Wand2 className="h-3.5 w-3.5 text-[#b85d19]" /> સ્પેલિંગ સુધારણા ટેસ્ટર (Live Name Correction Lab):
            </span>
            <span className="text-[10px] text-[#736a60]">કોઈપણ વૈકલ્પિક સ્પેલિંગ લખીને જાતે ટેસ્ટ કરો</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={testSpelling}
              onChange={(e) => setTestSpelling(e.target.value)}
              placeholder="અહીં વૈકલ્પિક સ્પેલિંગ લખો (e.g. Tapan S Tailor)..."
              className="flex-1 min-w-[240px] rounded-lg glass-input px-3 py-1.5 text-xs text-[#2c2825] focus:outline-none"
            />
            {testNameData && (
              <div className="flex items-center gap-3 text-xs glass-card px-3 py-1.5 rounded-lg">
                <span>કાલ્ડિયન: <strong className="font-mono text-[#b85d19]">{testNameData.chaldeanNumber}</strong> ({testNameData.chaldeanCompound})</span>
                <span>પાયથાગોરિયન: <strong className="font-mono text-[#2c2825]">{testNameData.pythagoreanNumber}</strong> ({testNameData.pythagoreanCompound})</span>
                <button
                  onClick={() => { setNameInput(testSpelling); setTestSpelling(""); }}
                  className="rounded glass-button-dark px-2.5 py-1 text-[10px] font-bold text-[#f4ebd9] transition"
                >
                  આ નામ સેટ કરો
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Automated Smart Name Spelling Suggestions & Correction Box */}
      {numData.suggestions && numData.suggestions.length > 0 && (
        <div className="rounded-xl glass-panel-accent p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e6dfd3]/80 pb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-[#b85d19]" />
              <div>
                <h3 className="font-serif text-base font-bold text-[#2c2825]">
                  સ્માર્ટ નામ સ્પેલિંગ સુધારણા ભલામણો (Smart Name Spelling Recommendations)
                </h3>
                <p className="text-xs text-[#736a60]">
                  મૂળાંક {numData.mulank} અને ભાગ્યાંક {numData.bhagyank} માટે અંકશાસ્ત્ર મુજબ સૌથી વધુ લકી અને આર્થિક સમૃદ્ધિ આપતા સ્પેલિંગ વિકલ્પો
                </p>
              </div>
            </div>
            <span className="rounded-lg glass-badge-success px-3 py-1 text-xs font-bold">
              Chaldean Esoteric Formulas
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {numData.suggestions.map((sug, idx) => {
              const isCurrent = sug.spelling.toUpperCase() === nameInput.toUpperCase();

              return (
                <div
                  key={idx}
                  className={`rounded-xl p-4 text-xs space-y-2.5 transition-all duration-300 relative overflow-hidden animate-fade-in-up ${
                    isCurrent
                      ? 'glass-panel-accent ring-2 ring-[#b85d19] shadow-md'
                      : 'glass-card'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-[#736a60] font-semibold">વિકલ્પ #{idx + 1}</span>
                      <h4 className="font-serif text-sm font-bold text-[#2c2825] mt-0.5">{sug.spelling}</h4>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold animate-gentle-float shadow-2xs ${
                      sug.matchPercentage >= 90 ? 'glass-badge-success' : 'glass-badge-warning'
                    }`}>
                      {sug.matchPercentage}% લકી સ્કોર
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs glass-pill p-2 rounded-lg">
                    <div>
                      કાલ્ડિયન: <strong className="font-mono text-sm text-[#b85d19]">{sug.chaldeanNumber}</strong> ({sug.chaldeanCompound})
                    </div>
                    <div>
                      વાઇબ્રેશન: <strong className="text-[#2c2825]">{sug.compoundInfo.name}</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#544d44] leading-tight">
                    {sug.compoundInfo.desc[lang] || sug.compoundInfo.desc.gu}
                  </p>

                  <div className="pt-1 flex justify-between items-center">
                    {isCurrent ? (
                      <span className="text-[11px] font-bold text-[#285e20] flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> હાલનું સક્રિય નામ
                      </span>
                    ) : (
                      <button
                        onClick={() => setNameInput(sug.spelling)}
                        className="w-full rounded-lg glass-button-dark py-1.5 text-center text-xs font-semibold text-[#f4ebd9] transition shadow-xs"
                      >
                        આ સ્પેલિંગ લાગુ કરો (Apply)
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4 Core Numbers Dashboard */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. Mulank (Driver Number) */}
        <div className="rounded-xl glass-panel-accent p-5 shadow-xs relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#736a60]">૧. મૂળાંક (Driver No.)</span>
              <h3 className="font-mono text-3xl font-black text-[#b85d19] mt-1">{numData.mulank}</h3>
            </div>
            <span className="rounded-lg glass-pill px-2.5 py-1 text-[11px] font-bold text-[#b85d19]">
              {numData.mulankProfile.planet[lang] || numData.mulankProfile.planet.gu}
            </span>
          </div>
          <p className="mt-3 text-xs text-[#544d44] leading-relaxed">
            {numData.mulankProfile.traits[lang] || numData.mulankProfile.traits.gu}
          </p>
          <div className="mt-3 border-t border-[#e6dfd3]/80 pt-2 text-[10px] text-[#736a60]">
            મૂળ સ્વભાવ: <strong>{numData.mulankProfile.archetype[lang] || numData.mulankProfile.archetype.gu}</strong>
          </div>
        </div>

        {/* 2. Bhagyank (Conductor Number) */}
        <div className="rounded-xl glass-panel p-5 shadow-xs relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#736a60]">૨. ભાગ્યાંક (Destiny No.)</span>
              <h3 className="font-mono text-3xl font-black text-[#2c2825] mt-1">{numData.bhagyank}</h3>
            </div>
            <span className="rounded-lg glass-pill px-2.5 py-1 text-[11px] font-bold text-[#2c2825]">
              {numData.bhagyankProfile.planet[lang] || numData.bhagyankProfile.planet.gu}
            </span>
          </div>
          <p className="mt-3 text-xs text-[#544d44] leading-relaxed">
            {numData.bhagyankProfile.traits[lang] || numData.bhagyankProfile.traits.gu}
          </p>
          <div className="mt-3 border-t border-[#e6dfd3]/80 pt-2 text-[10px] text-[#736a60]">
            જીવન પથ: <strong>{numData.bhagyankProfile.archetype[lang] || numData.bhagyankProfile.archetype.gu}</strong>
          </div>
        </div>

        {/* 3. Namank (Chaldean Name Number) */}
        <div className="rounded-xl glass-badge-success p-5 shadow-xs relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#285e20]">૩. નામાંક (Chaldean)</span>
              <h3 className="font-mono text-3xl font-black text-[#285e20] mt-1">
                {numData.nameData.chaldeanNumber} <span className="text-xs font-normal text-[#736a60]">({numData.nameData.chaldeanCompound})</span>
              </h3>
            </div>
            <span className={`rounded-lg px-2.5 py-1 text-[10px] font-bold border ${
              numData.isNameHarmonious ? 'glass-badge-success' : 'glass-badge-danger'
            }`}>
              {numData.isNameHarmonious ? '✅ સુસંગત (Auspicious)' : '⚠️ સુધારણા યોગ્ય'}
            </span>
          </div>
          <div className="mt-3 text-xs text-[#544d44] space-y-1">
            <div>પાયથાગોરિયન: <strong>{numData.nameData.pythagoreanNumber}</strong> ({numData.nameData.pythagoreanCompound})</div>
            <div>હૃદયાંક (Soul Urge): <strong>{numData.nameData.soulUrgeNumber}</strong></div>
            <div>વ્યક્તિત્વાંક: <strong>{numData.nameData.personalityNumber}</strong></div>
          </div>
        </div>

        {/* 4. Personal Year */}
        <div className="rounded-xl glass-panel p-5 shadow-xs relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#736a60]">૪. પર્સનલ વર્ષ {selectedYear}</span>
              <h3 className="font-mono text-3xl font-black text-[#b85d19] mt-1">{numData.personalYear}</h3>
            </div>
            <span className="rounded-lg glass-badge-warning px-2.5 py-1 text-[11px] font-bold">
              વાર્ષિક અંક
            </span>
          </div>
          <p className="mt-3 text-xs text-[#544d44] leading-relaxed">
            વર્ષ {selectedYear} તમારા માટે <strong>અંક {numData.personalYear}</strong> ના પ્રભાવ હેઠળ છે. {numData.personalYear === 1 ? 'નવા કાર્યોની શરૂઆત માટે ઉત્તમ વર્ષ.' : numData.personalYear === 5 ? 'મોટા પરિવર્તન અને પ્રવાસનું વર્ષ.' : numData.personalYear === 8 ? 'આર્થિક સમૃદ્ધિ અને સત્તા પ્રાપ્તિનું વર્ષ.' : 'પ્રગતિ અને પરિશ્રમનું વર્ષ.'}
          </p>
        </div>
      </div>

      {/* Lo-Shu Grid & Planes Analysis */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* 3x3 Visual Magic Square */}
        <div className="lg:col-span-5 rounded-xl border border-[#8c7456]/60 glass-panel p-5 space-y-4 shadow-sm">
          <div className="flex justify-between items-center border-b border-[#e6dfd3]/80 pb-2">
            <h3 className="font-serif text-base font-bold text-[#2c2825] flex items-center gap-1.5">
              <Award className="h-4 w-4 text-[#b85d19]" /> લો-શૂ ગ્રીડ (Lo-Shu 3x3 Magic Grid)
            </h3>
            <span className="text-[10px] text-[#736a60]">જન્મ તારીખ આધારિત</span>
          </div>

          {/* 3x3 Grid */}
          <div className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto p-2 glass-pill rounded-xl">
            {[
              { num: 4, label: "રાહુ (4)" }, { num: 9, label: "મંગળ (9)" }, { num: 2, label: "ચંદ્ર (2)" },
              { num: 3, label: "ગુરુ (3)" }, { num: 5, label: "બુધ (5)" }, { num: 7, label: "કેતુ (7)" },
              { num: 8, label: "શનિ (8)" }, { num: 1, label: "સૂર્ય (1)" }, { num: 6, label: "શુક્ર (6)" }
            ].map((cell) => {
              const count = numData.loShu.digitCounts[cell.num] || 0;
              const hasDigit = count > 0;

              return (
                <div
                  key={cell.num}
                  className={`flex flex-col items-center justify-center h-20 rounded-lg text-center transition ${
                    hasDigit
                      ? 'glass-panel-accent shadow-xs'
                      : 'glass-card border-dashed opacity-50'
                  }`}
                >
                  <span className={`font-mono text-2xl font-bold ${hasDigit ? 'text-[#b85d19]' : 'text-[#a89f91]'}`}>
                    {hasDigit ? String(cell.num).repeat(count) : '-'}
                  </span>
                  <span className="text-[9px] text-[#736a60] mt-0.5">{cell.label}</span>
                </div>
              );
            })}
          </div>

          <div className="text-xs text-[#544d44] text-center">
            {numData.loShu.missingDigits.length > 0 ? (
              <span className="text-[#802020] font-semibold">
                ⚠️ ખૂટતા અંકો (Missing Numbers): <strong>{numData.loShu.missingDigits.join(', ')}</strong>
              </span>
            ) : (
              <span className="text-[#285e20] font-semibold">✅ તમામ અંકો પરિપૂર્ણ છે!</span>
            )}
          </div>
        </div>

        {/* 8 Planes & Yoga Breakdown */}
        <div className="lg:col-span-7 rounded-xl glass-panel p-5 space-y-4 shadow-sm">
          <h3 className="font-serif text-base font-bold text-[#2c2825] flex items-center gap-1.5 border-b border-[#e6dfd3]/80 pb-2">
            <Sparkles className="h-4 w-4 text-[#b85d19]" /> ૮ મુખ્ય પ્લેન અને રાજયોગ (8 Planes Analysis)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {numData.loShu.planes.map((p) => (
              <div
                key={p.id}
                className={`p-3 rounded-lg border flex items-center justify-between transition ${
                  p.active
                    ? 'glass-badge-success'
                    : 'glass-card text-[#736a60]'
                }`}
              >
                <div>
                  <span className="font-semibold block">{p.name[lang] || p.name.gu}</span>
                  <span className="text-[10px] font-mono">અંકો: ({p.digits.join(', ')})</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  p.active ? 'bg-[#285e20] text-white' : 'glass-pill text-[#736a60]'
                }`}>
                  {p.active ? 'સક્રિય (Active)' : 'અપૂર્ણ'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lucky Elements & Compatibility Matrix */}
      <div className="rounded-xl glass-panel p-5 space-y-4 shadow-sm">
        <h3 className="font-serif text-base font-bold text-[#2c2825] flex items-center gap-1.5 border-b border-[#e6dfd3]/80 pb-2">
          <Gem className="h-4 w-4 text-[#b85d19]" /> શુભ તત્વો અને મિત્ર અંકો (Lucky Elements & Compatibility Matrix)
        </h3>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 text-xs">
          <div className="rounded-lg glass-card p-3">
            <span className="text-[10px] font-bold text-[#736a60] uppercase block">શુભ અંકો (Lucky Nos)</span>
            <span className="font-mono font-bold text-sm text-[#285e20]">{numData.mulankProfile.friendly.join(', ')}</span>
          </div>

          <div className="rounded-lg glass-card p-3">
            <span className="text-[10px] font-bold text-[#736a60] uppercase block">શત્રુ અંકો (Enemy Nos)</span>
            <span className="font-mono font-bold text-sm text-[#802020]">
              {numData.mulankProfile.enemy.length > 0 ? numData.mulankProfile.enemy.join(', ') : "કોઈ શત્રુ નથી"}
            </span>
          </div>

          <div className="rounded-lg glass-card p-3">
            <span className="text-[10px] font-bold text-[#736a60] uppercase block">શુભ વાર (Lucky Days)</span>
            <span className="font-semibold text-[#2c2825]">{numData.mulankProfile.luckyDays[lang] || numData.mulankProfile.luckyDays.gu}</span>
          </div>

          <div className="rounded-lg glass-card p-3">
            <span className="text-[10px] font-bold text-[#736a60] uppercase block">શુભ રંગ (Lucky Colors)</span>
            <span className="font-semibold text-[#2c2825]">{numData.mulankProfile.luckyColors[lang] || numData.mulankProfile.luckyColors.gu}</span>
          </div>

          <div className="rounded-lg glass-card p-3">
            <span className="text-[10px] font-bold text-[#736a60] uppercase block">શુભ રત્ન (Gemstone)</span>
            <span className="font-semibold text-[#b85d19]">{numData.mulankProfile.luckyGem[lang] || numData.mulankProfile.luckyGem.gu}</span>
          </div>

          <div className="rounded-lg glass-card p-3">
            <span className="text-[10px] font-bold text-[#736a60] uppercase block">શુભ દિશા (Direction)</span>
            <span className="font-semibold text-[#2c2825]">{numData.mulankProfile.luckyDir[lang] || numData.mulankProfile.luckyDir.gu}</span>
          </div>
        </div>

        <div className="rounded-lg glass-pill p-3.5 text-xs">
          <span className="font-bold text-[#2c2825] block mb-1">અનુકૂળ કારકિર્દી અને વ્યવસાય ક્ષેત્રો:</span>
          <span className="text-[#544d44]">{numData.mulankProfile.careers[lang] || numData.mulankProfile.careers.gu}</span>
        </div>
      </div>

      {/* Printable Footer (Visible Only in Print) */}
      <div className="hidden print:block print-footer-signature rounded-xl border border-[#d4c8b8] bg-[#fcfbf7] p-3 text-xs text-center">
        <span className="font-serif font-bold text-[#8c7456]">|| વૈદિક અને કાલ્ડિયન અંકશાસ્ત્ર વિશ્લેષણ રિપોર્ટ ||</span>
        <p className="text-[10px] text-[#736a60] mt-0.5">
          નામ વાઇબ્રેશન, લો-શૂ મેજિક સ્ક્વેર અને ભાગ્ય અંક પદ્ધતિ આધારિત પ્રમાણિત અંકશાસ્ત્ર
        </p>
      </div>
    </div>
  );
}
