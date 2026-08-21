import React, { useMemo } from 'react';
import { analyzeKalsarpaDeep } from '../engine/kalsarpaDeep.js';
import { ShieldAlert, Sparkles, AlertTriangle } from 'lucide-react';

export default function KalsarpaDeepView({ kundliData, t, lang = 'gu' }) {
  const analysis = useMemo(() => {
    return analyzeKalsarpaDeep(kundliData);
  }, [kundliData]);

  const { activeType, rahuHouse } = analysis;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-button-dark text-[var(--text-gold)]">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              ૧૨ કાલસર્પ યોગ વિશેષ વિશ્લેષણ (12 Kalsarpa Types)
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              રાહુ-કેતુ અક્ષ સ્થિતિ, ૧૨ કાલસર્પ વર્ગીકરણ અને સિદ્ધ નિવારણ
            </p>
          </div>
        </div>
      </div>

      {/* Active Kalsarpa Type Hero Card */}
      <div className="glass-panel-accent rounded-2xl p-5 shadow-sm border border-[#b85d19]/40 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-serif font-bold text-[var(--text-gold)] uppercase tracking-wider">
            તમારી કુંડળીનો કાલસર્પ યોગ પ્રકાર
          </span>
          <span className="glass-badge-gold px-2.5 py-0.5 rounded-full text-[10px] font-bold">
            રાહુ ભાવ #{rahuHouse}
          </span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
          {activeType.name[lang] || activeType.name.gu}
        </h3>

        <p className="text-xs text-[var(--text-secondary)]">{activeType.desc[lang] || activeType.desc.gu}</p>
      </div>
    </div>
  );
}
