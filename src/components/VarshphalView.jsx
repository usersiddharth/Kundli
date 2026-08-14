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
    <div className="rounded-xl border border-[#e6dfd3] bg-[#fcfbf7] p-6 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e6dfd3] pb-4">
        <div>
          <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
            <Sun className="h-5 w-5 text-[#b85d19]" /> Tajik Varshphal (વાર્ષિક વર્ષફળ - Solar
            Return Annual Horoscope)
          </h2>
          <p className="text-xs text-[#736a60]">
            Annual progressed horoscope based on solar return, Muntha rashi, and Year Lord
            (Varshapati)
          </p>
        </div>

        {/* Year Selector */}
        <div className="flex items-center space-x-2">
          <label className="text-xs font-semibold text-[#544d44]">Select Year:</label>
          <select
            value={targetYear}
            onChange={(e) => setTargetYear(parseInt(e.target.value))}
            className="rounded-lg border border-[#e6dfd3] bg-[#fffdfa] px-3 py-1.5 text-xs font-mono font-bold text-[#2c2825] focus:border-[#b85d19] focus:outline-none"
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
        <div className="rounded-xl border border-[#e6dfd3] bg-[#fffdfa] p-4 text-xs space-y-1">
          <span className="text-[#736a60] font-medium">Muntha Rashi (મુન્થા)</span>
          <p className="font-serif text-base font-bold text-[#b85d19]">
            {t[vData.munthaRashi] || vData.munthaRashi}
          </p>
          <span className="text-[10px] text-[#736a60]">
            House {vData.munthaHouseInNatal} in Natal
          </span>
        </div>

        <div className="rounded-xl border border-[#e6dfd3] bg-[#fffdfa] p-4 text-xs space-y-1">
          <span className="text-[#736a60] font-medium">Year Lord (વર્ષપતિ)</span>
          <p className="font-serif text-base font-bold text-[#2c2825]">
            {t[vData.varshapati] || vData.varshapati}
          </p>
          <span className="text-[10px] text-[#736a60]">Panchadhikari Sovereign</span>
        </div>

        <div className="rounded-xl border border-[#e6dfd3] bg-[#fffdfa] p-4 text-xs space-y-1">
          <span className="text-[#736a60] font-medium">Varsha Lagna (વર્ષ લગ્ન)</span>
          <p className="font-serif text-base font-bold text-[#2c2825]">
            {t[vData.varshaLagna] || vData.varshaLagna}
          </p>
          <span className="text-[10px] text-[#736a60]">Progressed Ascendant</span>
        </div>

        <div className="rounded-xl border border-[#e6dfd3] bg-[#fffdfa] p-4 text-xs space-y-1">
          <span className="text-[#736a60] font-medium">Year Completed / Age</span>
          <p className="font-mono text-base font-bold text-[#2c2825]">
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
          <span className="font-serif font-bold text-sm text-[#2c2825] flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#b85d19]" /> Muntha Analysis for Year {targetYear}
          </span>
          <span className="font-semibold text-xs text-[#2c2825]">
            {vData.munthaEvaluation.nature}
          </span>
        </div>
        <p className="text-xs text-[#544d44] leading-relaxed">
          {vData.munthaEvaluation.desc[lang] || vData.munthaEvaluation.desc.en}
        </p>
      </div>

      {/* Annual Domain Forecasts */}
      <div>
        <h3 className="font-serif text-base font-semibold text-[#2c2825] mb-3">
          Annual Life Domain Predictions
        </h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {vData.annualPredictions.map((pred, i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-xl border border-[#e6dfd3] bg-[#fffdfa] p-4 text-xs shadow-2xs space-y-2"
            >
              <span className="font-serif font-bold text-sm text-[#2c2825] border-b border-[#e6dfd3] pb-2">
                {pred.category[lang] || pred.category.en}
              </span>
              <p className="text-xs text-[#544d44] leading-relaxed">
                {pred.text[lang] || pred.text.en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tajik Sahams Table */}
      <div>
        <h3 className="font-serif text-base font-semibold text-[#2c2825] mb-3">
          Tajik Special Sahams (Auspicious Energy Points)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-[#e6dfd3] bg-[#fffdfa]">
          <table className="w-full text-left text-xs text-[#2c2825]">
            <thead className="border-b border-[#e6dfd3] bg-[#f5efe6] font-semibold text-[#544d44]">
              <tr>
                <th className="p-3">Saham Name</th>
                <th className="p-3">Sign Placement</th>
                <th className="p-3">Significance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6dfd3]">
              {vData.sahams.map((s, idx) => (
                <tr key={idx} className="hover:bg-[#f5efe6]/50 transition">
                  <td className="p-3 font-semibold text-[#2c2825]">{s.name}</td>
                  <td className="p-3 font-medium text-[#b85d19]">{t[s.sign] || s.sign}</td>
                  <td className="p-3 text-[#544d44]">{s.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
