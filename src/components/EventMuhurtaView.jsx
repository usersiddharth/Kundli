import React, { useState, useMemo } from 'react';
import { EVENT_TYPES, generateEventMuhurtaCalendar } from '../engine/eventMuhurta.js';
import {
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Filter,
  Car,
  Heart,
  Home,
  Briefcase,
  Key,
  Activity,
} from 'lucide-react';

export default function EventMuhurtaView({ t, lang = 'gu' }) {
  const [selectedEventId, setSelectedEventId] = useState('vehicle');

  const iconMap = { Car, Heart, Home, Briefcase, Key, Activity };

  const calendarData = useMemo(() => {
    return generateEventMuhurtaCalendar(new Date(), selectedEventId);
  }, [selectedEventId]);

  const activeEventObj = EVENT_TYPES.find((e) => e.id === selectedEventId) || EVENT_TYPES[0];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#faeee2] border border-[#e8b992]/60 text-[#b85d19]">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              ॥ વ્યક્તિગત શ્રેષ્ઠ મુહૂર્ત પત્રિકા (Event Muhurta Finder) ॥
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              વાહન, લગ્ન, મિલકત, વ્યાપાર, ગૃહ પ્રવેશ અને ઓપરેશન માટે શ્રેષ્ઠ શુભ દિવસો
            </p>
          </div>
        </div>
      </div>

      {/* Event Selection Ribbon */}
      <div
        role="tablist"
        aria-label="Event Selection"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
      >
        {EVENT_TYPES.map((ev) => {
          const isSelected = selectedEventId === ev.id;
          return (
            <button
              key={ev.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedEventId(ev.id)}
              className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition border cursor-pointer ${
                isSelected
                  ? 'bg-[#faeee2] border-[#b85d19] ring-1 ring-[#b85d19]/40 shadow-xs'
                  : 'bg-white border-[#e5dac6] hover:bg-[#faf5eb]'
              }`}
            >
              <h4
                className={`font-serif text-xs font-medium mt-1 ${isSelected ? 'text-[#8b2500] font-semibold' : 'text-[var(--text-primary)]'}`}
              >
                {ev.name[lang] || ev.name.gu}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Active Event Summary */}
      <div className="glass-card p-4 rounded-2xl border border-[var(--border-subtle)]">
        <h3 className="font-serif text-sm font-bold text-[var(--text-gold)] flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-600" />
          {activeEventObj.name[lang] || activeEventObj.name.gu} - મુહૂર્ત માર્ગદર્શિકા
        </h3>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          {activeEventObj.desc[lang] || activeEventObj.desc.gu}
        </p>
      </div>

      {/* 30-Day Suitability Calendar Grid */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-4">
        <h3 className="font-serif text-base font-bold text-[var(--text-primary)]">
          આગામી ૩૦ દિવસનું શુભતા રેટિંગ (Next 30 Days Rating)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {calendarData.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-center transition space-y-1 ${
                item.status === 'highly_auspicious'
                  ? 'glass-badge-success border-emerald-300'
                  : item.status === 'caution'
                    ? 'glass-badge-danger border-rose-300'
                    : 'glass-card border-[var(--border-subtle)]'
              }`}
            >
              <span className="font-mono text-xs font-bold block">{item.dateString}</span>
              <span className="text-[10px] text-[var(--text-muted)] block">
                {item.status === 'highly_auspicious'
                  ? 'અતિ શુભ'
                  : item.status === 'caution'
                    ? 'સાવધાની'
                    : 'અનુકૂળ'}
              </span>
              <span className="font-mono text-xs font-bold text-[var(--text-gold)] block">
                {item.score} / 100
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
