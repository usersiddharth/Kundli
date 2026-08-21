import React, { useMemo } from 'react';
import { getGemstoneRituals } from '../engine/gemstoneMuhurta.js';
import { Gem, Sparkles, CheckCircle2 } from 'lucide-react';

export default function GemstoneMuhurtaView({ kundliData, t, lang = 'gu' }) {
  const data = useMemo(() => {
    return getGemstoneRituals('YellowSapphire');
  }, []);

  const { details, ritualSteps } = data;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-button-dark text-[var(--text-gold)]">
            <Gem className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              રત્ન ધારણ મુહૂર્ત & પ્રાણ પ્રતિષ્ઠા વિધિ (Gemstone Rituals)
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              શુભ રત્ન ધારણ કરવાનો દિવસ, મંત્રોચ્ચાર, આંગળી અને શુદ્ધિ ક્રિયા
            </p>
          </div>
        </div>
      </div>

      {/* Gemstone Specifications Card */}
      <div className="glass-panel-accent rounded-2xl p-5 shadow-sm border border-[#b85d19]/40 space-y-3">
        <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">
          {details.name[lang] || details.name.gu}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[var(--text-muted)] block">ધાતુ (Metal):</span>
            <strong className="font-serif text-[var(--text-gold)]">{details.metal}</strong>
          </div>
          <div>
            <span className="text-[var(--text-muted)] block">આંગળી (Finger):</span>
            <strong className="font-serif text-[var(--text-gold)]">{details.finger}</strong>
          </div>
          <div>
            <span className="text-[var(--text-muted)] block">શુભ દિવસ (Day):</span>
            <strong className="font-serif text-[var(--text-gold)]">{details.day}</strong>
          </div>
          <div>
            <span className="text-[var(--text-muted)] block">મંત્ર:</span>
            <strong className="font-serif text-[var(--text-gold)] text-[11px]">{details.mantra}</strong>
          </div>
        </div>
      </div>

      {/* Step-by-Step Consecration Steps */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-4">
        <h3 className="font-serif text-base font-bold text-[var(--text-primary)]">
          પ્રાણ પ્રતિષ્ઠા પગલાં (Step-by-Step Consecration)
        </h3>

        <div className="space-y-3">
          {ritualSteps.map((step) => (
            <div
              key={step.step}
              className="glass-card p-3.5 rounded-xl flex items-start space-x-3 border border-[var(--border-subtle)]"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#b85d19] text-white font-mono text-xs font-bold shrink-0">
                {step.step}
              </span>
              <p className="text-xs text-[var(--text-primary)] font-medium pt-0.5">
                {step.text[lang] || step.text.gu}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
