import React from 'react';
import { Home, Sparkles, Calendar, Clock, CalendarDays, Hash, Heart } from 'lucide-react';

export default function MobileBottomNav({ mainSection, setMainSection }) {
  const tabs = [
    {
      id: 'landing',
      label: 'મુખ્ય',
      sublabel: 'Home',
      icon: Home,
    },
    {
      id: 'kundli',
      label: 'કુંડળી',
      sublabel: 'Kundli',
      icon: Sparkles,
    },
    {
      id: 'panchang',
      label: 'પંચાંગ',
      sublabel: 'Panchang',
      icon: Calendar,
    },
    {
      id: 'vedicClock',
      label: 'ઘડિયાળ',
      sublabel: 'Clock',
      icon: Clock,
    },
    {
      id: 'calendar',
      label: 'કૅલેન્ડર',
      sublabel: 'Calendar',
      icon: CalendarDays,
    },
    {
      id: 'numerology',
      label: 'અંકશાસ્ત્ર',
      sublabel: 'Numerology',
      icon: Hash,
    },
    {
      id: 'matchmaking',
      label: 'મિલન',
      sublabel: 'Matching',
      icon: Heart,
    },
  ];

  return (
    <nav
      aria-label="Mobile Portal Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden glass-header border-t border-[var(--border-subtle)] px-1 py-1.5 backdrop-blur-xl shadow-2xl print:hidden"
    >
      <div
        role="tablist"
        aria-label="Mobile Portal Tabs"
        className="grid grid-cols-7 gap-0.5 max-w-lg mx-auto"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = mainSection === tab.id;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setMainSection(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all duration-150 min-h-[48px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                isActive
                  ? 'glass-button-primary shadow-xs scale-[1.03]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] active:scale-95'
              }`}
            >
              <Icon className={`h-4 w-4 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[9px] font-semibold tracking-tight mt-0.5 leading-none">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
