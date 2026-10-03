import React, { useState } from 'react';
import { calculateVarshphal } from '../engine/varshphal.js';
import { Sun, Calendar, Sparkles, Award, ShieldCheck, Compass } from 'lucide-react';

export default function VarshphalView({ kundliData, birthDate, t, lang }) {
  const currentYr = new Date().getFullYear();
  const [targetYear, setTargetYear] = useState(currentYr);

  if (!kundliData || !birthDate) return null;

  const birthYear = birthDate.getFullYear();
  const vData = calculateVarshphal(kundliData, birthYear, targetYear);

  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-white p-6 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <h2 className="text-xl font-medium text-[var(--text-primary)] font-serif flex items-center gap-2">
            <Sun className="h-5 w-5 text-[var(--text-gold)]" /> ॥ Tajik Varshphal (વાર્ષિક વર્ષફળ -
            Solar Return Annual Horoscope) ॥
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Annual progressed horoscope based on solar return, Muntha rashi, and Year Lord
            (Varshapati)
          </p>
        </div>

        {/* Year Selector */}
        <div className="flex items-center space-x-2">
          <label className="text-xs font-semibold text-[var(--text-secondary)]">Select Year:</label>
          <select
            value={targetYear}
            onChange={(e) => setTargetYear(parseInt(e.target.value))}
            className="rounded-lg border border-[var(--border-default)] bg-[#fbf9f5] px-3 py-1.5 text-xs font-mono font-bold text-[var(--text-primary)] focus:border-[#b85d19] focus:outline-none"
          >
            {Array.from({ length: 10 }, (_, i) => currentYr - 2 + i).map((yr) => (
              <option key={yr} value={yr}>
                {yr} - {yr + 1} (Age {yr - birthYear + 1})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Year Indicators Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[#fbf9f5] p-4 text-xs space-y-1">
          <span className="text-[var(--text-muted)] font-medium">Muntha Rashi (મુન્થા)</span>
          <p className="font-serif text-base font-bold text-[var(--text-gold)]">
            {t[vData.munthaRashi] || vData.munthaRashi}
          </p>
          <span className="text-[10px] text-[var(--text-muted)]">
            House {vData.munthaHouseInNatal} in Natal
          </span>
        </div>

        <div className="rounded-xl border border-[var(--border-subtle)] bg-[#fbf9f5] p-4 text-xs space-y-1">
          <span className="text-[var(--text-muted)] font-medium">Year Lord (વર્ષપતિ)</span>
          <p className="font-serif text-base font-bold text-[var(--text-primary)]">
            {t[vData.varshapati] || vData.varshapati}
          </p>
          <span className="text-[10px] text-[var(--text-muted)]">Panchadhikari Sovereign</span>
        </div>

        <div className="rounded-xl border border-[var(--border-subtle)] bg-[#fbf9f5] p-4 text-xs space-y-1">
          <span className="text-[var(--text-muted)] font-medium">Varsha Lagna (વર્ષ લગ્ન)</span>
          <p className="font-serif text-base font-bold text-[var(--text-primary)]">
            {t[vData.varshaLagna] || vData.varshaLagna}
          </p>
          <span className="text-[10px] text-[var(--text-muted)]">Progressed Ascendant</span>
        </div>

        <div className="rounded-xl border border-[var(--border-subtle)] bg-[#fbf9f5] p-4 text-xs space-y-1">
          <span className="text-[var(--text-muted)] font-medium">Year Completed / Age</span>
          <p className="font-mono text-base font-bold text-[var(--text-primary)]">
            {vData.completedYears} Yrs (Running {vData.currentAge})
          </p>
        </div>
      </div>

      {/* Muntha Placement Evaluation Card */}
      <div
        className={`rounded-xl border p-4 text-xs space-y-2 ${
          vData.munthaEvaluation.nature.includes('Auspicious')
            ? 'border-[#c1dec4] bg-[#e0edd8]/40'
            : 'border-[#f0cca3] bg-[#fae8d4]/40'
        }`}
      >
        <div className="flex justify-between items-center">
          <span className="font-serif font-bold text-sm text-[var(--text-primary)] flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[var(--text-gold)]" /> Muntha Analysis for Year{' '}
            {targetYear}
          </span>
          <span className="font-semibold text-xs text-[var(--text-primary)]">
            {vData.munthaEvaluation.nature}
          </span>
        </div>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          {vData.munthaEvaluation.desc[lang] || vData.munthaEvaluation.desc.en}
        </p>
      </div>

      {/* Annual Domain Forecasts */}
      <div>
        <h3 className="font-serif text-base font-semibold text-[var(--text-primary)] mb-3">
          Annual Life Domain Predictions
        </h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {vData.annualPredictions.map((pred, i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[#fbf9f5] p-4 text-xs shadow-2xs space-y-2"
            >
              <span className="font-serif font-bold text-sm text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
                {pred.category[lang] || pred.category.en}
              </span>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {pred.text[lang] || pred.text.en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tajik Sahams Table */}
      <div>
        <h3 className="font-serif text-base font-semibold text-[var(--text-primary)] mb-3">
          Tajik Special Sahams (Auspicious Energy Points)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-white">
          <table className="w-full text-left text-xs text-[var(--text-primary)]">
            <thead className="border-b border-[var(--border-subtle)] bg-[#f7f2e8] font-semibold text-[var(--text-secondary)]">
              <tr>
                <th className="p-3">Saham Name</th>
                <th className="p-3">Sign Placement</th>
                <th className="p-3">Significance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {vData.sahams.map((s, idx) => (
                <tr key={idx} className="hover:bg-[#faf5eb] transition">
                  <td className="p-3 font-semibold text-[var(--text-primary)]">{s.name}</td>
                  <td className="p-3 font-medium text-[var(--text-gold)]">{t[s.sign] || s.sign}</td>
                  <td className="p-3 text-[var(--text-secondary)]">{s.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
