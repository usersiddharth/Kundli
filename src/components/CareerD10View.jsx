import React, { useMemo } from 'react';
import { analyzeD10Career } from '../engine/careerD10.js';
import { Briefcase, Crown, Cpu, DollarSign, Palette, Activity, Sparkles } from 'lucide-react';

export default function CareerD10View({ kundliData, t, lang = 'gu' }) {
  const analysis = useMemo(() => {
    return analyzeD10Career(kundliData);
  }, [kundliData]);

  const { recommendedDomains } = analysis;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-button-dark text-[var(--text-gold)]">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              D10 દશમાંશ કારકિર્દી બ્લુપ્રિન્ટ (D10 Dashamsha Career Blueprint)
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              દશમાંશ વર્ગ ચાર્ટ આધારિત વ્યવસાયિક ક્ષેત્ર, પ્રોફેશન અને કારકિર્દી ક્ષમતા
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Career Domains */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-4">
        <h3 className="font-serif text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--text-gold)]" />
          તમારા માટે સર્વોત્તમ ૩ કારકિર્દી ક્ષેત્રો (Top 3 Career Domains)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedDomains.map((domain, idx) => (
            <div
              key={idx}
              className="glass-panel-accent rounded-xl p-4 border border-[#b85d19]/40 space-y-2"
            >
              <span className="glass-badge-gold text-[10px] font-bold px-2 py-0.5 rounded-full">
                રેન્ક #{idx + 1}
              </span>
              <h4 className="font-serif text-base font-bold text-[var(--text-primary)]">
                {domain.name[lang] || domain.name.gu}
              </h4>
              <p className="text-xs text-[var(--text-muted)]">
                {domain.desc[lang] || domain.desc.gu}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
