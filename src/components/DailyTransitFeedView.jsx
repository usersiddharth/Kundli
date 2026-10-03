import React, { useMemo } from 'react';
import { generateDailyTransitFeed } from '../engine/dailyTransitFeed.js';
import { Calendar, Activity, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DailyTransitFeedView({ kundliData, t, lang = 'gu' }) {
  const feed = useMemo(() => {
    return generateDailyTransitFeed(kundliData, new Date());
  }, [kundliData]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#faeee2] border border-[#e8b992]/60 text-[#b85d19]">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              ॥ દૈનિક પર્સનલાઇઝ્ડ ગોચર માર્ગદર્શન પત્રિકા (Daily Personal Transit Feed) ॥
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              આજના આકાશના ગોચર ગ્રહો અને તમારી જન્મકુંડળીના સંબંધ આધારિત દૈનિક માર્ગદર્શન
            </p>
          </div>
        </div>
      </div>

      {/* Feed Cards */}
      <div className="space-y-4">
        {feed.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-[var(--text-primary)]">
                {item.title[lang] || item.title.gu}
              </h3>
              <span className="bg-[#faeee2] text-[#9c4b0f] border border-[#e8b992]/60 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                અનુકૂળતા: {item.score}%
              </span>
            </div>

            <p className="text-xs text-[var(--text-secondary)]">
              {item.advice[lang] || item.advice.gu}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
