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
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[#e6dfd3] space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-button-dark text-[#e6a86c]">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2c2825] tracking-tight">
              વ્યક્તિગત શ્રેષ્ઠ મુહૂર્ત શોધો (Event Muhurta Finder)
            </h2>
            <p className="text-xs sm:text-sm text-[#736a60]">
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
              className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition border ${
                isSelected
                  ? 'glass-panel-accent border-[#b85d19] ring-2 ring-[#b85d19]/40 shadow-sm'
                  : 'glass-card hover:bg-white/90'
              }`}
            >
              <h4 className="font-serif text-xs font-bold text-[#2c2825] mt-1">
                {ev.name[lang] || ev.name.gu}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Active Event Summary */}
      <div className="glass-card p-4 rounded-2xl border border-[#e6dfd3]">
        <h3 className="font-serif text-sm font-bold text-[#b85d19] flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-600" />
          {activeEventObj.name[lang] || activeEventObj.name.gu} - મુહૂર્ત માર્ગદર્શિકા
        </h3>
        <p className="text-xs text-[#736a60] mt-1">
          {activeEventObj.desc[lang] || activeEventObj.desc.gu}
        </p>
      </div>

      {/* 30-Day Suitability Calendar Grid */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[#e6dfd3] space-y-4">
        <h3 className="font-serif text-base font-bold text-[#2c2825]">
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
                    : 'glass-card border-[#e6dfd3]'
              }`}
            >
              <span className="font-mono text-xs font-bold block">{item.dateString}</span>
              <span className="text-[10px] text-[#736a60] block">
                {item.status === 'highly_auspicious'
                  ? 'અતિ શુભ'
                  : item.status === 'caution'
                    ? 'સાવધાની'
                    : 'અનુકૂળ'}
              </span>
              <span className="font-mono text-xs font-bold text-[#b85d19] block">
                {item.score} / 100
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
