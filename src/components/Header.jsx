import React, { useState, useRef, useEffect } from 'react';
import { Button, Tooltip, Chip } from '@heroui/react';
import {
  Compass,
  Globe,
  Printer,
  Calendar,
  Sparkles,
  Heart,
  Hash,
  CalendarDays,
  Clock,
  Moon,
  Sun,
  Home,
  Orbit,
  ChevronDown,
  LayoutGrid,
} from 'lucide-react';

export default function Header({
  lang,
  setLang,
  t,
  mainSection,
  setMainSection,
  isDark,
  setIsDark,
}) {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const toolsMenuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target)) {
        setIsToolsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary navigation (4 core portals)
  const primaryNavItems = [
    {
      id: 'landing',
      label: lang === 'gu' ? 'મુખ્ય પૃષ્ઠ' : lang === 'hi' ? 'मुख्य पृष्ठ' : 'Home',
      icon: Home,
    },
    {
      id: 'kundli',
      label: lang === 'gu' ? 'જન્મ કુંડળી' : lang === 'hi' ? 'जन्म कुंडली' : 'Kundli',
      icon: Sparkles,
    },
    {
      id: 'panchang',
      label: lang === 'gu' ? 'પંચાંગ' : lang === 'hi' ? 'पंचांग' : 'Panchang',
      icon: Calendar,
    },
    {
      id: 'matchmaking',
      label: lang === 'gu' ? 'ગુણ મિલન' : lang === 'hi' ? 'गुण मिलान' : 'Matching',
      icon: Heart,
    },
  ];

  // Secondary tools (Dropdown)
  const secondaryTools = [
    {
      id: 'vedicClock',
      label: lang === 'gu' ? 'વૈદિક ઘડિયાળ' : lang === 'hi' ? 'वैदिक घड़ी' : 'Vedic Clock',
      desc: lang === 'gu' ? 'કાળ ચક્ર અને ઘટી-પળ' : lang === 'hi' ? 'काल चक्र व घटी-पल' : 'Kaal Chakra & Ghatis',
      icon: Clock,
    },
    {
      id: 'calendar',
      label: lang === 'gu' ? 'ગુજરાતી કૅલેન્ડર' : lang === 'hi' ? 'कैलेंडर' : 'Calendar',
      desc: lang === 'gu' ? 'તહેવારો અને તિથિ પત્રિકા' : lang === 'hi' ? 'त्योहार एवं तिथि पत्रिका' : 'Festivals & Monthly View',
      icon: CalendarDays,
    },
    {
      id: 'numerology',
      label: lang === 'gu' ? 'અંકશાસ્ત્ર' : lang === 'hi' ? 'अंकशास्त्र' : 'Numerology',
      desc: lang === 'gu' ? 'મૂળાંક, ભાગ્યાંક અને નામ બળ' : lang === 'hi' ? 'मूलांक व भाग्यांक' : 'Life Path & Destiny Number',
      icon: Hash,
    },
    {
      id: 'upcomingEvents',
      label: lang === 'gu' ? 'ગ્રહીય ઘટનાઓ' : lang === 'hi' ? 'ग्रह घटनाएं' : 'Planetary Events',
      desc: lang === 'gu' ? 'ગ્રહ ગોચર અને ગ્રહણ' : lang === 'hi' ? 'ग्रह गोचर एवं ग्रहण' : 'Transits & Eclipses',
      icon: Orbit,
    },
    {
      id: 'rashifal',
      label: lang === 'gu' ? 'રાશિફળ' : lang === 'hi' ? 'राशिफल' : 'Horoscope',
      desc: lang === 'gu' ? 'દૈનિક, સાપ્તાહિક રાશિફળ' : lang === 'hi' ? 'दैनिक राशिफल' : 'Daily & Weekly Forecast',
      icon: Sparkles,
    },
  ];

  const isSecondaryActive = secondaryTools.some((item) => item.id === mainSection);
  const activeSecondaryItem = secondaryTools.find((item) => item.id === mainSection);

  return (
    <header className="glass-header px-4 py-2.5 sm:px-6 sm:py-3 sticky top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        {/* Title & Brand */}
        <button
          type="button"
          onClick={() => {
            setMainSection('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-3 text-left focus-visible:outline-hidden group cursor-pointer"
          aria-label="Return to Landing Page Home"
        >
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl glass-button-dark shadow-md relative overflow-hidden group-hover:scale-105 transition-transform">
            <Compass className="h-5 w-5 text-[var(--text-gold)] animate-spin-slow" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-medium tracking-tight text-[var(--text-primary)] font-serif group-hover:text-[var(--text-gold)] transition-colors leading-tight">
                {t.appTitle}
              </h1>
              <Chip className="hidden md:inline-flex bg-amber-500/10 text-[var(--text-gold)] border border-[var(--border-gold)] text-[10px] px-1.5 py-0.5 font-mono">
                <Chip.Label>Vedic</Chip.Label>
              </Chip>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">{t.appSubtitle}</p>
          </div>
        </button>

        {/* Center Main Navigation Switcher (Desktop md+) */}
        <nav aria-label="Portal Navigation" className="hidden md:block">
          <div
            role="tablist"
            aria-label="Portal Switcher"
            className="flex items-center rounded-xl glass-pill p-1 shadow-inner print:hidden gap-1"
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
                  onClick={() => {
                    setMainSection(item.id);
                    setIsToolsOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-hidden cursor-pointer ${
                    isActive
                      ? 'glass-button-primary shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* More Tools Dropdown Menu */}
            <div className="relative" ref={toolsMenuRef}>
              <button
                type="button"
                aria-expanded={isToolsOpen}
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-hidden cursor-pointer ${
                  isSecondaryActive
                    ? 'glass-button-primary shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>
                  {isSecondaryActive
                    ? activeSecondaryItem?.label
                    : lang === 'gu'
                      ? 'સાધનો'
                      : lang === 'hi'
                        ? 'साधन'
                        : 'More Tools'}
                </span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isToolsOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl glass-panel shadow-2xl border border-[var(--border-gold)] p-1.5 z-50 animate-scale-in">
                  <div className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider px-2.5 py-1.5">
                    {lang === 'gu' ? 'વૈદિક સાધનો' : lang === 'hi' ? 'वैदिक साधन' : 'Vedic Tools & Views'}
                  </div>
                  {secondaryTools.map((tool) => {
                    const ToolIcon = tool.icon;
                    const isSelected = mainSection === tool.id;
                    return (
                      <button
                        key={tool.id}
                        type="button"
                        onClick={() => {
                          setMainSection(tool.id);
                          setIsToolsOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left transition cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/15 text-[var(--text-gold)] font-bold'
                            : 'text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                      >
                        <div
                          className={`p-1.5 rounded-md mt-0.5 ${
                            isSelected
                              ? 'bg-amber-500/20 text-[var(--text-gold)]'
                              : 'bg-stone-500/10 text-[var(--text-secondary)]'
                          }`}
                        >
                          <ToolIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold leading-tight">{tool.label}</div>
                          <div className="text-[10px] text-[var(--text-muted)] leading-tight mt-0.5">
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

        {/* Action Controls: Theme Switcher, Language Switcher & Print Button */}
        <div className="flex items-center space-x-2">
          {/* Royal Mode Toggle Button */}
          <Tooltip>
            <Tooltip.Trigger>
              <Button
                type="button"
                onPress={() => setIsDark(!isDark)}
                aria-label="Toggle Theme Mode"
                className="flex items-center gap-1.5 rounded-lg glass-card px-2.5 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition print:hidden cursor-pointer"
              >
                {isDark ? (
                  <>
                    <Sun className="h-3.5 w-3.5 text-[var(--text-gold)]" />
                    <span className="hidden lg:inline font-medium">Parchment</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5 text-[var(--text-amber)]" />
                    <span className="hidden lg:inline font-medium">Dark Sky</span>
                  </>
                )}
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content className="rounded-lg bg-neutral-900 text-white text-xs px-2 py-1 shadow-lg border border-neutral-800">
              {isDark ? 'Switch to Imperial Parchment' : 'Switch to Cosmic Dark Sky'}
            </Tooltip.Content>
          </Tooltip>

          {/* Quick Print Button */}
          <Tooltip>
            <Tooltip.Trigger>
              <Button
                type="button"
                onPress={() => window.print()}
                aria-label={t.tabPrint}
                className="flex items-center gap-1.5 rounded-lg glass-card px-2.5 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition print:hidden cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5 text-[var(--text-gold)]" />
                <span className="hidden xl:inline">{t.tabPrint}</span>
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content className="rounded-lg bg-neutral-900 text-white text-xs px-2 py-1 shadow-lg border border-neutral-800">
              Print or Export PDF Report
            </Tooltip.Content>
          </Tooltip>

          {/* Language Switcher */}
          <div
            role="group"
            aria-label="Language Selection"
            className="flex items-center space-x-1 rounded-lg glass-pill p-1 shadow-inner"
          >
            <Globe
              className="ml-1 mr-0.5 h-3.5 w-3.5 text-[var(--text-muted)]"
              aria-hidden="true"
            />
            <Button
              type="button"
              onPress={() => setLang('gu')}
              aria-label="Switch language to Gujarati"
              aria-pressed={lang === 'gu'}
              className={`rounded-md px-2 py-1 text-xs font-semibold transition cursor-pointer ${
                lang === 'gu'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              ગુ
            </Button>
            <Button
              type="button"
              onPress={() => setLang('hi')}
              aria-label="Switch language to Hindi"
              aria-pressed={lang === 'hi'}
              className={`rounded-md px-2 py-1 text-xs font-semibold transition cursor-pointer ${
                lang === 'hi'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              हि
            </Button>
            <Button
              type="button"
              onPress={() => setLang('en')}
              aria-label="Switch language to English"
              aria-pressed={lang === 'en'}
              className={`rounded-md px-2 py-1 text-xs font-semibold transition cursor-pointer ${
                lang === 'en'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              EN
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
