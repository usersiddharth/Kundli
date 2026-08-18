import React, { useState } from 'react';
import { Button } from '@heroui/react';
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
    { id: 'landing', label: 'મુખ્ય', icon: Home },
    { id: 'kundli', label: 'કુંડળી', icon: Sparkles },
    { id: 'panchang', label: 'પંચાંગ', icon: Calendar },
    { id: 'matchmaking', label: 'મિલન', icon: Heart },
  ];

  const moreTools = [
    { id: 'vedicClock', label: 'વૈદિક ઘડિયાળ', desc: 'કાળ ચક્ર અને ઘટી-પળ', icon: Clock },
    { id: 'calendar', label: 'કૅલેન્ડર', desc: 'ગુજરાતી માસિક પત્રિકા', icon: CalendarDays },
    { id: 'numerology', label: 'અંકશાસ્ત્ર', desc: 'મૂળાંક અને ભાગ્યાંક', icon: Hash },
    { id: 'upcomingEvents', label: 'ગ્રહીય ઘટનાઓ', desc: 'ગોચર અને ગ્રહણ', icon: Orbit },
    { id: 'rashifal', label: 'રાશિફળ', desc: 'દૈનિક/સાપ્તાહિક રાશિફળ', icon: Sparkles },
  ];

  const isMoreActive = moreTools.some((t) => t.id === mainSection);

  const handleSelectTab = (id) => {
    setMainSection(id);
    setIsDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Slide-Up Drawer for More Tools */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Bottom Sheet */}
          <div className="fixed bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-3xl glass-panel p-5 border-t border-[var(--border-gold)] shadow-2xl animate-fade-in-up z-50">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 text-[var(--text-gold)]" />
                <h3 className="font-serif font-bold text-base text-[var(--text-primary)]">
                  વૈદિક સાધનો અને સેવાઓ
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                aria-label="Close tools menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {moreTools.map((tool) => {
                const Icon = tool.icon;
                const isSelected = mainSection === tool.id;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => handleSelectTab(tool.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl text-left transition cursor-pointer ${
                      isSelected
                        ? 'glass-button-primary shadow-xs'
                        : 'glass-card hover:border-[var(--border-gold)]'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected
                          ? 'bg-amber-500/30 text-stone-900'
                          : 'glass-pill text-[var(--text-gold)]'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--text-primary)] leading-tight">
                        {tool.label}
                      </div>
                      <div className="text-xs text-[var(--text-muted)] mt-0.5 leading-tight">
                        {tool.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main 5-Tab Ergonomic Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Portal Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 sm:hidden glass-header border-t border-[var(--border-subtle)] px-2 py-1.5 backdrop-blur-xl shadow-2xl print:hidden"
      >
        <div
          role="tablist"
          aria-label="Mobile Portal Tabs"
          className="flex items-center justify-around max-w-md mx-auto"
        >
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = mainSection === tab.id;

            return (
              <Button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onPress={() => handleSelectTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-h-[44px] cursor-pointer ${
                  isActive
                    ? 'glass-button-primary shadow-xs scale-105'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-transparent border-none shadow-none'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-[10px] font-semibold tracking-tight mt-0.5 leading-none">
                  {tab.label}
                </span>
              </Button>
            );
          })}

          {/* More Tools Trigger Tab */}
          <Button
            type="button"
            role="tab"
            aria-selected={isMoreActive}
            onPress={() => setIsDrawerOpen(true)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-h-[44px] cursor-pointer ${
              isMoreActive
                ? 'glass-button-primary shadow-xs scale-105'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-transparent border-none shadow-none'
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="text-[10px] font-semibold tracking-tight mt-0.5 leading-none">
              સાધનો
            </span>
          </Button>
        </div>
      </nav>
    </>
  );
}
