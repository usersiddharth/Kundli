import React, { useMemo } from 'react';
import { calculateKpSignificators } from '../engine/kpSignificators.js';
import { Key, Table, Sparkles } from 'lucide-react';

export default function KpSignificatorsView({ kundliData, t, lang = 'gu' }) {
  const significators = useMemo(() => {
    return calculateKpSignificators(kundliData);
  }, [kundliData]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[#e6dfd3] space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-button-dark text-[#e6a86c]">
            <Key className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2c2825] tracking-tight">
              KP ૪-સ્તરીય કારકતા કોષ્ટક (KP 4-Step Significators Table)
            </h2>
            <p className="text-xs sm:text-sm text-[#736a60]">
              કૃષ્ણમૂર્તિ પદ્ધતિ અનુસાર ૧૨ ભાવો અને ૯ ગ્રહોની સ્તર ૧ થી ૪ કારકતા તાકાત
            </p>
          </div>
        </div>
      </div>

      {/* KP 4-Step Matrix Table */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[#e6dfd3] space-y-4">
        <h3 className="font-serif text-base font-bold text-[#2c2825] flex items-center gap-2">
          <Table className="h-4 w-4 text-[#b85d19]" />
          ૧૨ ભાવ કારક ગ્રહ કોષ્ટક (House-by-House KP Table)
        </h3>

        <div className="overflow-x-auto rounded-xl border border-[#e6dfd3]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f3ece0] text-[#2c2825] font-serif font-bold">
              <tr>
                <th className="p-3">ભાવ #</th>
                <th className="p-3">સ્તર ૧ (L1 - Nakshatra Occupant)</th>
                <th className="p-3">સ્તર ૨ (L2 - Direct Occupant)</th>
                <th className="p-3">સ્તર ૩ (L3 - Nakshatra Owner)</th>
                <th className="p-3">સ્તર ૪ (L4 - House Owner)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6dfd3] bg-white/70">
              {significators.map((s) => (
                <tr key={s.houseNum} className="hover:bg-white/90 font-mono">
                  <td className="p-3 font-serif font-bold text-[#b85d19]">#{s.houseNum} મો ભાવ</td>
                  <td className="p-3 text-[#2c2825]">{s.level1.join(', ')}</td>
                  <td className="p-3 text-[#2c2825]">{s.level2.join(', ')}</td>
                  <td className="p-3 text-[#2c2825]">{s.level3.join(', ')}</td>
                  <td className="p-3 text-[#2c2825]">{s.level4.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
