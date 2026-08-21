import React, { useState, useRef, useEffect } from 'react';
import { Tooltip } from '@heroui/react';
import {
  Compass,
  Home,
  Sparkles,
  Calendar,
  Heart,
  Clock,
  CalendarDays,
  Hash,
  Orbit,
  ChevronDown,
  LayoutGrid,
  Globe,
  Printer,
  X,
} from 'lucide-react';

export default function Header({ lang, setLang, t, mainSection, setMainSection }) {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const toolsMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target)) {
        setIsToolsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavItems = [
    {
      id: 'landing',
      label: lang === 'gu' ? 'મુખ્ય' : lang === 'hi' ? 'मुख्य' : 'Home',
      icon: Home,
    },
    {
      id: 'kundli',
      label: lang === 'gu' ? 'કુંડળી' : lang === 'hi' ? 'कुंडली' : 'Kundli',
      icon: Sparkles,
    },
    {
      id: 'panchang',
      label: lang === 'gu' ? 'પંચાંગ' : lang === 'hi' ? 'पंचांग' : 'Panchang',
      icon: Calendar,
    },
    {
      id: 'matchmaking',
      label: lang === 'gu' ? 'ગુણ મિલન' : lang === 'hi' ? 'गुण मिलान' : 'Matchmaking',
      icon: Heart,
    },
  ];

  const secondaryTools = [
    {
      id: 'vedicClock',
      label: lang === 'gu' ? 'વૈદિક ઘડિયાળ' : lang === 'hi' ? 'वैदिक घड़ी' : 'Vedic clock',
      desc: lang === 'gu' ? 'કાળ ચક્ર અને ઘટી-પળ' : lang === 'hi' ? 'काल चक्र व घटी-पल' : 'Kaal chakra & real-time ghatis',
      icon: Clock,
    },
    {
      id: 'calendar',
      label: lang === 'gu' ? 'ગુજ. કૅલેન્ડર' : lang === 'hi' ? 'कैलेंडर' : 'Gujarati calendar',
      desc: lang === 'gu' ? 'તહેવારો અને તિથિ પત્રિકા' : lang === 'hi' ? 'त्योहार एवं तिथि पत्रिका' : 'Vikram Samvat monthly view',
      icon: CalendarDays,
    },
    {
      id: 'numerology',
      label: lang === 'gu' ? 'અંકશાસ્ત્ર' : lang === 'hi' ? 'अंकशास्त्र' : 'Numerology',
      desc: lang === 'gu' ? 'મૂળાંક, ભાગ્યાંક અને નામ બળ' : lang === 'hi' ? 'मूलांक व भाग्यांक' : 'Life path, destiny & name grid',
      icon: Hash,
    },
    {
      id: 'upcomingEvents',
      label: lang === 'gu' ? 'ગ્રહ ઘટનાઓ' : lang === 'hi' ? 'ग्रह घटनाएं' : 'Transits',
      desc: lang === 'gu' ? 'ગ્રહ ગોચર અને ગ્રહણ' : lang === 'hi' ? 'ग्रह गोचर एवं ग्रहण' : 'Upcoming gochar & eclipses',
      icon: Orbit,
    },
    {
      id: 'rashifal',
      label: lang === 'gu' ? 'રાશિફળ' : lang === 'hi' ? 'राशिफल' : 'Rashifal',
      desc: lang === 'gu' ? 'દૈનિક, સાપ્તાહિક રાશિફળ' : lang === 'hi' ? 'दैनिक राशिफल' : 'Daily, weekly & annual forecast',
      icon: Sparkles,
    },
  ];

  const isSecondaryActive = secondaryTools.some((item) => item.id === mainSection);
  const activeSecondaryItem = secondaryTools.find((item) => item.id === mainSection);

  return (
    <header className="sticky top-3 z-50 px-3 sm:px-6 pointer-events-none print:hidden">
      <div
        className="pointer-events-auto mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 sm:px-5 transition-all spatial-header"
        style={{ boxShadow: '0 8px 32px oklch(0 0 0 / 0.6), inset 0 1px 0 oklch(1 0 0 / 0.06)' }}
      >

        {/* ── Brand Mark ── */}
        <button
          type="button"
          onClick={() => { setMainSection('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 text-left focus-visible:outline-hidden group cursor-pointer shrink-0"
          aria-label="Return to home"
        >
          {/* Logo ring */}
          <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center shrink-0">
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-xl animate-cosmic-pulse"
              style={{
                background: 'transparent',
                border: '1px solid rgba(245,158,11,0.3)',
                boxShadow: '0 0 16px rgba(245,158,11,0.15)',
              }}
            />
            {/* Inner fill */}
            <div
              className="absolute inset-0.5 rounded-[10px]"
              style={{ background: 'linear-gradient(135deg, #1a1a34 0%, #10101e 100%)' }}
            />
            <Compass
              className="relative h-4.5 w-4.5 animate-spin-slow"
              style={{ color: '#fbbf24', width: 18, height: 18 }}
            />
          </div>

          {/* Title text */}
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <h1
                className="text-sm font-medium tracking-tight leading-tight transition-colors"
                style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)', letterSpacing: '-0.025em' }}
              >
                {t.appTitle}
              </h1>
              <span
                className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-mono spatial-badge-gold"
              >
                Vedic
              </span>
            </div>
            <p className="text-[10.5px] leading-tight mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {t.appSubtitle}
            </p>
          </div>
        </button>

        {/* ── Center Navigation (Desktop md+) ── */}
        <nav aria-label="Portal navigation" className="hidden md:block">
          <div
            role="tablist"
            aria-label="Portal switcher"
            className="flex items-center rounded-xl p-1 gap-0.5 spatial-pill"
          >
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = mainSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => { setMainSection(item.id); setIsToolsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-hidden cursor-pointer ${
                    isActive ? 'spatial-btn-primary' : 'spatial-btn-ghost'
                  }`}
                  style={isActive ? { borderRadius: 8 } : {}}
                >
                  <Icon style={{ width: 13, height: 13 }} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* More tools dropdown */}
            <div className="relative" ref={toolsMenuRef}>
              <button
                type="button"
                aria-expanded={isToolsOpen}
                aria-haspopup="true"
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-hidden cursor-pointer ${
                  isSecondaryActive ? 'spatial-btn-primary' : 'spatial-btn-ghost'
                }`}
              >
                <LayoutGrid style={{ width: 13, height: 13 }} />
                <span>
                  {isSecondaryActive
                    ? activeSecondaryItem?.label
                    : lang === 'gu' ? 'સાધનો' : lang === 'hi' ? 'साधन' : 'Tools'}
                </span>
                <ChevronDown
                  style={{ width: 11, height: 11 }}
                  className={`transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown panel */}
              {isToolsOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 rounded-2xl p-2 z-50 animate-scale-in spatial-raised"
                  style={{ border: '1px solid var(--border-gold)', boxShadow: 'var(--shadow-gold)' }}
                >
                  <div
                    className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1.5 mb-1 pb-2"
                    style={{
                      color: 'var(--text-muted)',
                      borderBottom: '1px solid var(--border-subtle)',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {lang === 'gu' ? 'વૈદિક સાધનો' : lang === 'hi' ? 'वैदिक साधन' : 'Vedic tools'}
                  </div>
                  {secondaryTools.map((tool) => {
                    const ToolIcon = tool.icon;
                    const isSelected = mainSection === tool.id;
                    return (
                      <button
                        key={tool.id}
                        type="button"
                        onClick={() => { setMainSection(tool.id); setIsToolsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className={`w-full flex items-start gap-3 px-2.5 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                          isSelected ? 'spatial-card-gold' : 'spatial-btn-ghost hover:spatial-btn-ghost'
                        }`}
                        style={isSelected ? { border: '1px solid var(--border-gold)' } : {}}
                      >
                        <div
                          className="flex items-center justify-center rounded-lg mt-0.5 shrink-0"
                          style={{
                            width: 30,
                            height: 30,
                            background: isSelected
                              ? 'rgba(245,158,11,0.15)'
                              : 'rgba(255,255,255,0.04)',
                            color: isSelected ? 'var(--gold-400)' : 'var(--text-tertiary)',
                            border: `1px solid ${isSelected ? 'rgba(245,158,11,0.25)' : 'var(--border-void)'}`,
                          }}
                        >
                          <ToolIcon style={{ width: 15, height: 15 }} />
                        </div>
                        <div>
                          <div
                            className="text-xs font-medium leading-tight"
                            style={{ color: isSelected ? 'var(--gold-300)' : 'var(--text-primary)' }}
                          >
                            {tool.label}
                          </div>
                          <div className="text-[10.5px] leading-tight mt-0.5" style={{ color: 'var(--text-muted)' }}>
                            {tool.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* ── Right: Language switcher + Print ── */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Print */}
          <Tooltip>
            <Tooltip.Trigger>
              <button
                type="button"
                onClick={() => window.print()}
                aria-label={t.tabPrint || 'Print'}
                className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium transition-all print:hidden cursor-pointer spatial-btn-ghost"
                style={{ border: '1px solid var(--border-subtle)' }}
              >
                <Printer style={{ width: 14, height: 14, color: 'var(--gold-500)' }} />
                <span className="hidden xl:inline" style={{ color: 'var(--text-secondary)' }}>
                  {t.tabPrint || 'Print'}
                </span>
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content className="rounded-lg text-xs px-2 py-1 shadow-lg" style={{ background: 'var(--depth-4)', color: 'var(--text-primary)', border: '1px solid var(--border-default)' }}>
              Print or export PDF report
            </Tooltip.Content>
          </Tooltip>

          {/* Language switcher */}
          <div
            role="group"
            aria-label="Language selection"
            className="flex items-center rounded-xl p-1 gap-0.5 spatial-pill"
          >
            <Globe style={{ width: 12, height: 12, color: 'var(--text-muted)', marginLeft: 4, marginRight: 2 }} aria-hidden="true" />
            {[
              { code: 'gu', label: 'ગુ' },
              { code: 'hi', label: 'हि' },
              { code: 'en', label: 'EN' },
            ].map(({ code, label }) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-label={`Switch to ${code}`}
                aria-pressed={lang === code}
                className={`rounded-lg px-2 py-1 text-xs font-medium transition-all cursor-pointer ${
                  lang === code ? 'spatial-btn-primary' : 'spatial-btn-ghost'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
