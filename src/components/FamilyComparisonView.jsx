import React, { useState, useMemo } from 'react';
import { compareFamilyProfiles } from '../engine/familyComparison.js';
import { Users, Heart, ShieldCheck, Sparkles, Plus, CheckCircle2 } from 'lucide-react';

export default function FamilyComparisonView({ kundliData, formData, t, lang = 'gu' }) {
  const sampleFamily = useMemo(
    () => [
      {
        name: formData && formData.name ? formData.name : 'મુખ્ય સભ્ય (Self)',
        dob: formData && formData.dob ? formData.dob : '1995-08-15',
        astro: kundliData ? kundliData.astro : null,
      },
      { name: 'સભ્ય ૨ (Family Member 2)', dob: '1998-05-20', astro: null },
      { name: 'સભ્ય ૩ (Family Member 3)', dob: '2020-11-10', astro: null },
    ],
    [formData, kundliData]
  );

  const comparison = useMemo(() => {
    return compareFamilyProfiles(sampleFamily);
  }, [sampleFamily]);

  if (!comparison) return null;

  const { profileSummaries, harmonyScore, harmonyVerdict } = comparison;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-button-dark text-[var(--text-gold)]">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              કુટુંબ કુંડળી સરખામણી & સામંજસ્ય (Family Group Comparison)
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              પરિવારના સભ્યોની કુંડળી સરખામણી, તત્વ સમતુલા અને સામૂહિક અષ્ટકવર્ગ સુખ
            </p>
          </div>
        </div>
      </div>

      {/* Family Harmony Score Banner */}
      <div className="glass-panel-accent rounded-2xl p-5 shadow-sm border border-[#b85d19]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-serif font-bold text-[var(--text-gold)] uppercase tracking-wider block">
            કૌટુંબિક સામંજસ્ય સ્કોર (Family Harmony Score)
          </span>
          <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] mt-0.5">{harmonyVerdict}</h3>
        </div>

        <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-xl">
          <span className="font-mono text-3xl font-bold text-[var(--text-gold)]">{harmonyScore}</span>
          <span className="text-xs text-[var(--text-muted)] font-semibold">/ 100</span>
        </div>
      </div>

      {/* Member Horoscopes Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {profileSummaries.map((m, idx) => (
          <div
            key={idx}
            className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
              <h4 className="font-serif text-base font-bold text-[var(--text-primary)]">{m.name}</h4>
              <span className="text-xs font-mono text-[var(--text-muted)]">{m.dob}</span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)]">લગ્ન રાશિ:</span>
                <strong className="font-serif text-[var(--text-gold)]">લગ્ન #{m.lagnaSignIdx + 1}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)]">ચંદ્ર રાશિ:</span>
                <strong className="font-serif text-[var(--text-primary)]">રાશિ #{m.moonSignIdx + 1}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)]">મુખ્ય તત્વ:</span>
                <span className="glass-badge-gold px-2 py-0.5 rounded-full font-bold text-[10px]">
                  {m.element.name[lang] || m.element.name.gu}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
