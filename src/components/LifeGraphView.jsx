import React, { useMemo } from 'react';
import { generate120YearLifeGraph } from '../engine/lifeGraph.js';
import { TrendingUp, Award, Zap, Shield, Sparkles, Heart } from 'lucide-react';

export default function LifeGraphView({ kundliData, birthDate = new Date(), t, lang = 'gu' }) {
  const birthYear = birthDate ? birthDate.getFullYear() : 1986;

  const graphData = useMemo(() => {
    return generate120YearLifeGraph(kundliData, birthYear);
  }, [kundliData, birthYear]);

  const { points, milestones } = graphData;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[#e6dfd3] space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-button-dark text-[#e6a86c]">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2c2825] tracking-tight">
              ૧૨૦ વર્ષનું જીવન આલેખ & મહત્વના તબક્કા (120-Year Life Graph)
            </h2>
            <p className="text-xs sm:text-sm text-[#736a60]">
              વિંશોત્તરી દશા અને અષ્ટકવર્ગ સંયોજન આધારિત સફળતા અને ભાગ્યોદય આલેખ
            </p>
          </div>
        </div>
      </div>

      {/* SVG Interactive Life Curve */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[#e6dfd3] space-y-4">
        <h3 className="font-serif text-base font-bold text-[#2c2825] flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#b85d19]" />
          ઉંમર (૦ થી ૧૨૦ વર્ષ) વિરુદ્ધ સફળતા રેટિંગ આલેખ
        </h3>

        <div className="overflow-x-auto">
          <div className="min-w-[600px] h-64 relative">
            <svg viewBox="0 0 800 200" className="w-full h-full">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="780" y2="20" stroke="#e6dfd3" strokeDasharray="4" />
              <line x1="40" y1="100" x2="780" y2="100" stroke="#e6dfd3" strokeDasharray="4" />
              <line x1="40" y1="180" x2="780" y2="180" stroke="#e6dfd3" />

              {/* Connecting Life Line */}
              <polyline
                fill="none"
                stroke="#b85d19"
                strokeWidth="3"
                points={points
                  .map((pt, i) => {
                    const x = 50 + (i / points.length) * 720;
                    const y = 180 - (pt.avgScore / 100) * 150;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />

              {/* Data Points */}
              {points.map((pt, i) => {
                const x = 50 + (i / points.length) * 720;
                const y = 180 - (pt.avgScore / 100) * 150;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#c59b27"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Major Milestones Cards */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[#e6dfd3] space-y-4">
        <h3 className="font-serif text-base font-bold text-[#2c2825] flex items-center gap-2">
          <Award className="h-4 w-4 text-[#b85d19]" />
          જીવનના ૪ પ્રમુખ ભાગ્યોદય તબક્કા (Major Lifetime Milestones)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m, idx) => (
            <div key={idx} className="glass-card p-4 rounded-xl space-y-2 border border-[#e6dfd3]">
              <span className="font-mono text-xs font-bold text-[#b85d19]">
                ઉંમર {m.age} વર્ષ ({m.year})
              </span>
              <h4 className="font-serif text-sm font-bold text-[#2c2825]">
                {m.title[lang] || m.title.gu}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
