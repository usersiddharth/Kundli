import React, { useMemo } from 'react';
import {
  calculateJaiminiKarakas,
  calculateKarakamsha,
  calculateCharaDasha,
} from '../engine/jaimini.js';
import { Crown, Compass, Table, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export default function JaiminiView({ kundliData, birthDateObj = new Date(), t, lang = 'gu' }) {
  const karakas = useMemo(() => {
    return calculateJaiminiKarakas(kundliData);
  }, [kundliData]);

  const karakamsha = useMemo(() => {
    return calculateKarakamsha(kundliData);
  }, [kundliData]);

  const charaDasha = useMemo(() => {
    return calculateCharaDasha(birthDateObj);
  }, [birthDateObj]);

  const atmakaraka = karakas.find((k) => k.key === 'AK') || karakas[0];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* 1. Header Card */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-button-dark text-[var(--text-gold)]">
            <Crown className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              જૈમિની જ્યોતિષ & ચર દશા (Jaimini Astrology Suite)
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              મહર્ષિ જૈમિની ચર કારક, કારકાંશ લગ્ન અને રાશિ આધારિત ચર દશા વિશ્લેષણ
            </p>
          </div>
        </div>
      </div>

      {/* 2. Atmakaraka Hero Card & Karakamsha Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Atmakaraka (AK) Hero Card */}
        <div className="glass-panel-accent rounded-2xl p-5 shadow-sm border border-[#b85d19]/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif font-bold text-[var(--text-gold)] uppercase tracking-wider flex items-center gap-1.5">
              <Crown className="h-4 w-4 text-amber-600" />
              તમારી કુંડળીના આત્મકારક (Atmakaraka)
            </span>
            <span className="glass-badge-gold px-2 py-0.5 rounded-full text-[10px] font-bold">
              આત્માનો રાજા
            </span>
          </div>

          <div className="py-2">
            <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              {atmakaraka ? atmakaraka.planetKey : 'Surya'} (
              {atmakaraka ? atmakaraka.formattedDeg : '0°'})
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {atmakaraka ? atmakaraka.desc[lang] || atmakaraka.desc.gu : ''}
            </p>
          </div>
        </div>

        {/* Karakamsha Lagna Card */}
        <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="h-4 w-4 text-[var(--text-gold)]" />
              કારકાંશ લગ્ન (Karakamsha Sign)
            </span>
            <span className="glass-badge-success px-2 py-0.5 rounded-full text-[10px] font-bold">
              D9 નવાંશ સ્થિતિ
            </span>
          </div>

          <div className="py-2">
            <h3 className="font-serif text-2xl font-bold text-[var(--text-gold)]">
              {karakamsha.signName[lang] || karakamsha.signName.gu} રાશિ
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              D9 નવાંશમાં આત્મકારક ગ્રહ જે રાશિમાં બિરાજમાન થાય છે તેને કારકાંશ લગ્ન કહેવાય છે.
            </p>
          </div>
        </div>
      </div>

      {/* 3. 7 Jaimini Karakas Table */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-4">
        <h3 className="font-serif text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Table className="h-4 w-4 text-[var(--text-gold)]" />૭ જૈમિની ચર કારક કોષ્ટક (7 Jaimini Karakas)
        </h3>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-[var(--text-primary)] font-serif font-bold">
              <tr>
                <th className="p-3">કારક કેટેગરી</th>
                <th className="p-3">નિયુક્ત ગ્રહ</th>
                <th className="p-3">રાશિ અંશ</th>
                <th className="p-3">કારક મહત્વ & અસર</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] bg-white/5">
              {karakas.map((k, idx) => (
                <tr
                  key={idx}
                  className={
                    k.key === 'AK' ? 'bg-amber-500/10 font-bold text-[var(--text-gold)]' : 'hover:bg-white/10'
                  }
                >
                  <td className="p-3 font-serif font-bold">{k.name[lang] || k.name.gu}</td>
                  <td className="p-3 font-mono text-[var(--text-primary)]">{k.planetKey}</td>
                  <td className="p-3 font-mono">{k.formattedDeg}</td>
                  <td className="p-3 text-[var(--text-secondary)]">{k.desc[lang] || k.desc.gu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Chara Dasha Timeline Table */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-4">
        <h3 className="font-serif text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Layers className="h-4 w-4 text-[var(--text-gold)]" />
          ૧૨ રાશિ ચર દશા સમયરેખા (Jaimini Chara Dasha Timeline)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {charaDasha.map((d, idx) => (
            <div key={idx} className="glass-card p-3 rounded-xl space-y-1 border border-[var(--border-subtle)]">
              <span className="text-[10px] font-mono text-[var(--text-muted)] block">
                {d.startYear} - {d.endYear} ({d.durationYears} વર્ષ)
              </span>
              <h4 className="font-serif text-sm font-bold text-[var(--text-primary)]">
                {d.signName[lang] || d.signName.gu} દશા
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
