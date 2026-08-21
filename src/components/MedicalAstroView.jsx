import React, { useMemo } from 'react';
import { calculateTridosha, HOUSE_BODY_MAP } from '../engine/medicalAstro.js';
import { Activity, ShieldAlert, HeartPulse, Sparkles, Flame, Wind, Droplets } from 'lucide-react';

export default function MedicalAstroView({ kundliData, t, lang = 'gu' }) {
  const tridosha = useMemo(() => {
    return calculateTridosha(kundliData);
  }, [kundliData]);

  const { vataPct, pittaPct, kaphaPct, dominantDosha, dominantDef } = tridosha;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-button-dark text-[var(--text-gold)]">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              આયુર્વેદિક મેડિકલ એસ્ટ્રોલોજી & ત્રિદોષ (Ayurvedic Body Map)
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              વાત, પિત્ત, કફ શારીરિક પ્રકૃતિ અને ૧૨ ભાવ આધારિત અંગ સુરક્ષા વિશ્લેષણ
            </p>
          </div>
        </div>
      </div>

      {/* Tridosha Balance Percentage Card */}
      <div className="glass-panel-accent rounded-2xl p-5 shadow-sm border border-[#b85d19]/40 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-serif font-bold text-[var(--text-gold)] uppercase tracking-wider">
            તમારી મુખ્ય શારીરિક પ્રકૃતિ: {dominantDef.name[lang] || dominantDef.name.gu}
          </span>
          <span className="glass-badge-gold px-2.5 py-0.5 rounded-full text-[10px] font-bold">
            આયુર્વેદિક ડોમિનાન્સ
          </span>
        </div>

        {/* 3 Progress Bars for Vata, Pitta, Kapha */}
        <div className="space-y-3">
          {/* Vata */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="flex items-center gap-1 text-[#1890ff]">
                <Wind className="h-3.5 w-3.5" /> વાત (Vata)
              </span>
              <span>{vataPct}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-[#1890ff] transition-all duration-500"
                style={{ width: `${vataPct}%` }}
              />
            </div>
          </div>

          {/* Pitta */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="flex items-center gap-1 text-[var(--text-gold)]">
                <Flame className="h-3.5 w-3.5" /> પિત્ત (Pitta)
              </span>
              <span>{pittaPct}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-[#b85d19] transition-all duration-500"
                style={{ width: `${pittaPct}%` }}
              />
            </div>
          </div>

          {/* Kapha */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="flex items-center gap-1 text-[#285e20]">
                <Droplets className="h-3.5 w-3.5" /> કફ (Kapha)
              </span>
              <span>{kaphaPct}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-[#285e20] transition-all duration-500"
                style={{ width: `${kaphaPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 12 House Body Organ Map */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-4">
        <h3 className="font-serif text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Activity className="h-4 w-4 text-[var(--text-gold)]" />
          ૧૨ ભાવ અને સંબંધિત શારીરિક અંગો (12 House Anatomical Map)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {HOUSE_BODY_MAP.map((item) => (
            <div
              key={item.house}
              className="glass-card p-3 rounded-xl space-y-1 border border-[var(--border-subtle)]"
            >
              <span className="font-serif text-xs font-bold text-[var(--text-gold)] block">
                {item.house} મો ભાવ (House #{item.house})
              </span>
              <p className="text-xs text-[var(--text-primary)] font-medium">
                {item.organ[lang] || item.organ.gu}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
