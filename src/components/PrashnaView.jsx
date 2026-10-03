import React, { useState } from 'react';
import { PRASHNA_CATEGORIES, evaluatePrashnaQuery } from '../engine/prashna.js';
import { HelpCircle, Sparkles, CheckCircle2, Clock, Zap } from 'lucide-react';

export default function PrashnaView({ t, lang = 'gu' }) {
  const [selectedCategory, setSelectedCategory] = useState('career');
  const [prashnaResult, setPrashnaResult] = useState(() => evaluatePrashnaQuery('career'));

  const handleCastPrashna = () => {
    const res = evaluatePrashnaQuery(selectedCategory, new Date());
    setPrashnaResult(res);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#faeee2] border border-[#e8b992]/60 text-[#b85d19]">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              ॥ તાત્કાલિક પ્રશ્ન કુંડળી (Instant Prashna Horary) ॥
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              પ્રશ્ન પૂછતી સમયની તાત્કાલિક ગ્રહ સ્થિતિ આધારિત ચોક્કસ ઉત્તર અને સંભાવના
            </p>
          </div>
        </div>
      </div>

      {/* Category Selector & Cast Button */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-4">
        <label className="text-xs font-serif font-bold text-[#8b2500] uppercase tracking-wider block">
          તમારો પ્રશ્ન કઈ શ્રેણીનો છે? (Select Question Category)
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PRASHNA_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-3 rounded-xl border text-xs font-medium transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#faeee2] border-[#b85d19] text-[#8b2500] ring-1 ring-[#b85d19]/40 font-semibold'
                  : 'bg-white border-[#e5dac6] text-[var(--text-primary)] hover:bg-[#faf5eb]'
              }`}
            >
              {cat.name[lang] || cat.name.gu}
            </button>
          ))}
        </div>

        <button
          onClick={handleCastPrashna}
          className="w-full spatial-btn-primary py-3 rounded-xl font-serif text-sm font-medium flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
        >
          <Zap className="h-4 w-4" />
          તાત્કાલિક પ્રશ્ન કુંડળી ગણો (Cast Prashna Chart Now)
        </button>
      </div>

      {/* Verdict Result Card */}
      {prashnaResult && (
        <div className="glass-panel-accent rounded-2xl p-6 shadow-sm border border-[#b85d19]/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif font-bold text-[var(--text-gold)] uppercase tracking-wider">
              પ્રશ્ન ગણતરી ઉત્તર (Prashna Verdict)
            </span>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              {prashnaResult.queryTime.toLocaleTimeString()}
            </span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
            {prashnaResult.verdict}
          </h3>

          <div className="flex items-center space-x-2 pt-2">
            <span className="text-xs font-serif text-[var(--text-muted)]">
              સફળતા સંભાવના સ્કોર:
            </span>
            <span className="font-mono text-xl font-bold text-[var(--text-gold)]">
              {prashnaResult.score}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
