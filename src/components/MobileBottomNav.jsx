import React, { useState } from 'react';
import {
  Home,
  Sparkles,
  Calendar,
  Heart,
  LayoutGrid,
  Clock,
  CalendarDays,
  Hash,
  Orbit,
  X,
} from 'lucide-react';

export default function MobileBottomNav({ mainSection, setMainSection }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const primaryTabs = [
    { id: 'landing',     label: 'મુખ્ય',   icon: Home },
    { id: 'kundli',      label: 'કુંડળી',  icon: Sparkles },
    { id: 'panchang',    label: 'પંચાંગ',  icon: Calendar },
    { id: 'matchmaking', label: 'મિલન',    icon: Heart },
  ];

  const moreTools = [
    { id: 'vedicClock',     label: 'વૈદિક ઘડિયાળ', desc: 'કાળ ચક્ર અને ઘટી-પળ',     icon: Clock },
    { id: 'calendar',       label: 'કૅલેન્ડર',      desc: 'ગુજ. માસિક પત્રિકા',      icon: CalendarDays },
    { id: 'numerology',     label: 'અંકશાસ્ત્ર',    desc: 'મૂળાંક અને ભાગ્યાંક',     icon: Hash },
    { id: 'upcomingEvents', label: 'ગ્રહ ઘટનાઓ',   desc: 'ગ્રહ ગોચર અને ગ્રહણ',     icon: Orbit },
    { id: 'rashifal',       label: 'રાશિફળ',        desc: 'દૈનિક/સાપ્તાહિક ભવિષ્ય', icon: Sparkles },
  ];

  const isMoreActive = moreTools.some((t) => t.id === mainSection);

  const handleSelectTab = (id) => {
    setMainSection(id);
    setIsDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Drawer Backdrop + Sheet ── */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 sm:hidden" role="dialog" aria-modal="true" aria-label="More tools">
          {/* Backdrop */}
          <div
            className="fixed inset-0 transition-opacity"
            style={{ background: 'rgba(7,7,13,0.75)', backdropFilter: 'blur(8px)' }}
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Bottom sheet */}
          <div
            className="fixed bottom-0 left-0 right-0 overflow-y-auto rounded-t-3xl p-5 z-50 animate-fade-in-up spatial-raised"
            style={{
              maxHeight: '80vh',
              borderTop: '1px solid var(--border-gold)',
              boxShadow: '0 -8px 40px rgba(7,7,13,0.8), 0 0 0 0.5px var(--border-gold)',
            }}
          >
            {/* Sheet handle */}
            <div
              className="mx-auto mb-4 rounded-full"
              style={{ width: 40, height: 3, background: 'var(--border-default)' }}
            />

            {/* Header */}
            <div
              className="flex items-center justify-between pb-3 mb-3"
              style={{ borderBottom: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-center gap-2">
                <LayoutGrid style={{ width: 18, height: 18, color: 'var(--gold-500)' }} />
                <h3
                  className="font-medium text-base"
                  style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                >
                  વૈદિક સાધનો
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center justify-center rounded-xl p-1.5 transition-colors cursor-pointer spatial-btn-ghost"
                aria-label="Close"
              >
                <X style={{ width: 18, height: 18, color: 'var(--text-tertiary)' }} />
              </button>
            </div>

            {/* Tool grid */}
            <div className="grid grid-cols-1 gap-2">
              {moreTools.map((tool) => {
                const Icon = tool.icon;
                const isSelected = mainSection === tool.id;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => handleSelectTab(tool.id)}
                    className="flex items-center gap-3 p-3 rounded-2xl text-left transition-all cursor-pointer"
                    style={{
                      background: isSelected ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isSelected ? 'var(--border-gold)' : 'var(--border-subtle)'}`,
                      boxShadow: isSelected ? 'var(--shadow-gold)' : 'none',
                    }}
                  >
                    <div
                      className="flex items-center justify-center rounded-xl shrink-0"
                      style={{
                        width: 40,
                        height: 40,
                        background: isSelected ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
                        color: isSelected ? 'var(--gold-400)' : 'var(--text-tertiary)',
                        border: `1px solid ${isSelected ? 'rgba(245,158,11,0.25)' : 'var(--border-void)'}`,
                      }}
                    >
                      <Icon style={{ width: 18, height: 18 }} />
                    </div>
                    <div>
                      <div
                        className="text-sm font-medium leading-tight"
                        style={{ color: isSelected ? 'var(--gold-300)' : 'var(--text-primary)' }}
                      >
                        {tool.label}
                      </div>
                      <div className="text-xs mt-0.5 leading-tight" style={{ color: 'var(--text-muted)' }}>
                        {tool.desc}
                      </div>
                    </div>
                    {isSelected && (
                      <div
                        className="ml-auto rounded-full shrink-0"
                        style={{ width: 6, height: 6, background: 'var(--gold-500)', boxShadow: '0 0 8px var(--gold-500)' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom Navigation Bar ── */}
      <nav
        aria-label="Mobile portal navigation"
        className="fixed bottom-0 left-0 right-0 z-40 sm:hidden print:hidden"
        style={{
          background: 'rgba(7,7,13,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border-default)',
          boxShadow: '0 -4px 24px rgba(7,7,13,0.7)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <div
          role="tablist"
          aria-label="Mobile portal tabs"
          className="flex items-center justify-around max-w-md mx-auto px-2 py-2"
        >
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = mainSection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelectTab(tab.id)}
                className="flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-h-[44px] cursor-pointer"
                style={{
                  background: isActive ? 'rgba(245,158,11,0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(245,158,11,0.2)' : '1px solid transparent',
                  color: isActive ? 'var(--gold-400)' : 'var(--text-muted)',
                }}
              >
                <Icon style={{ width: 18, height: 18 }} />
                <span
                  className="text-[10px] font-medium tracking-tight leading-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {tab.label}
                </span>
                {/* Active dot */}
                {isActive && (
                  <div
                    className="rounded-full"
                    style={{
                      width: 3,
                      height: 3,
                      background: 'var(--gold-500)',
                      boxShadow: '0 0 6px var(--gold-500)',
                      marginTop: 1,
                    }}
                  />
                )}
              </button>
            );
          })}

          {/* More tools tab */}
          <button
            type="button"
            role="tab"
            aria-selected={isMoreActive}
            onClick={() => setIsDrawerOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-h-[44px] cursor-pointer"
            style={{
              background: isMoreActive ? 'rgba(245,158,11,0.12)' : 'transparent',
              border: isMoreActive ? '1px solid rgba(245,158,11,0.2)' : '1px solid transparent',
              color: isMoreActive ? 'var(--gold-400)' : 'var(--text-muted)',
            }}
          >
            <LayoutGrid style={{ width: 18, height: 18 }} />
            <span className="text-[10px] font-medium tracking-tight leading-none">
              સાધનો
            </span>
            {isMoreActive && (
              <div
                className="rounded-full"
                style={{
                  width: 3,
                  height: 3,
                  background: 'var(--gold-500)',
                  boxShadow: '0 0 6px var(--gold-500)',
                  marginTop: 1,
                }}
              />
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
