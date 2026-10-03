import React, { useMemo } from 'react';
import { analyzeLalKitab } from '../engine/lalkitab.js';
import { BookOpen, ShieldAlert, Sparkles, Table } from 'lucide-react';

export default function LalKitabView({ kundliData, t, lang = 'gu' }) {
  const analysis = useMemo(() => {
    return analyzeLalKitab(kundliData);
  }, [kundliData]);

  const { debts, remediesList } = analysis;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#faeee2] border border-[#e8b992]/60 text-[#b85d19]">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              ॥ લાલ કિતાબ ઉપાય & ઋણ વિશ્લેષણ (Lal Kitab Remedies & Debts) ॥
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              લાલ કિતાબ પદ્ધતિ અનુસાર ગ્રહ ભાવ ઉપાયો અને કર્મ ઋણ નિવારણ
            </p>
          </div>
        </div>
      </div>

      {/* Karmic Debts Card */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-4">
        <h3 className="font-serif text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-[#b85d19]" />
          મુખ્ય લાલ કિતાબ ઋણ & નિવારણ (Karmic Debts Audit)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {debts.map((d) => (
            <div
              key={d.id}
              className="bg-[#fbf9f5] p-4 rounded-xl space-y-2 border border-[#e8b992]/60 shadow-xs"
            >
              <h4 className="font-serif text-sm font-bold text-[#8b2500]">
                {d.name[lang] || d.name.gu}
              </h4>
              <p className="text-xs text-[var(--text-secondary)]">
                {d.remedy[lang] || d.remedy.gu}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Lal Kitab Planet House Remedies Table */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-4">
        <h3 className="font-serif text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Table className="h-4 w-4 text-[#b85d19]" />
          નવગ્રહ લાલ કિતાબ દૈનિક ઉપાયો (Planetary Remedies)
        </h3>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f7f2e8] text-[var(--text-secondary)] font-serif font-semibold border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3">ગ્રહ (Planet)</th>
                <th className="p-3">ભાવ (House)</th>
                <th className="p-3">લાલ કિતાબ સરળ ઉપાય</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] bg-white">
              {remediesList.map((r, idx) => (
                <tr key={idx} className="hover:bg-[#faf5eb]">
                  <td className="p-3 font-serif font-bold text-[#8b2500]">{r.planetKey}</td>
                  <td className="p-3 font-mono">#{r.house} મો ભાવ</td>
                  <td className="p-3 text-[var(--text-primary)]">
                    {r.remedy[lang] || r.remedy.gu}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
