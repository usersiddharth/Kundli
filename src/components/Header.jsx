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
  Home,
  Orbit,
  ChevronDown,
  LayoutGrid,
} from 'lucide-react';

export default function Header({ lang, setLang, t, mainSection, setMainSection }) {
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
      label: lang === 'gu' ? 'જન્મ કુંડળી' : lang === 'hi' ? 'जन्म कुंडली' : 'Birth chart',
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

  // Secondary tools (Dropdown)
  const secondaryTools = [
    {
      id: 'vedicClock',
      label: lang === 'gu' ? 'વૈદિક ઘડિયાળ' : lang === 'hi' ? 'वैदिक घड़ी' : 'Vedic clock',
      desc:
        lang === 'gu'
          ? 'કાળ ચક્ર અને ઘટી-પળ'
          : lang === 'hi'
            ? 'काल चक्र व घटी-पल'
            : 'Kaal chakra & real-time ghatis',
      icon: Clock,
    },
    {
      id: 'calendar',
      label: lang === 'gu' ? 'ગુજરાતી કૅલેન્ડર' : lang === 'hi' ? 'कैलेंडर' : 'Gujarati calendar',
      desc:
        lang === 'gu'
          ? 'તહેવારો અને તિથિ પત્રિકા'
          : lang === 'hi'
            ? 'त्योहार एवं तिथि पत्रिका'
            : 'Vikram Samvat monthly view',
      icon: CalendarDays,
    },
    {
      id: 'numerology',
      label: lang === 'gu' ? 'અંકશાસ્ત્ર' : lang === 'hi' ? 'अंकशास्त्र' : 'Numerology & Lo Shu',
      desc:
        lang === 'gu'
          ? 'મૂળાંક, ભાગ્યાંક અને નામ બળ'
          : lang === 'hi'
            ? 'मूलांक व भाग्यांक'
            : 'Life path, destiny & name grid',
      icon: Hash,
    },
    {
      id: 'upcomingEvents',
      label: lang === 'gu' ? 'ગ્રહીય ઘટનાઓ' : lang === 'hi' ? 'ग्रह घटनाएं' : 'Planetary transits',
      desc:
        lang === 'gu'
          ? 'ગ્રહ ગોચર અને ગ્રહણ'
          : lang === 'hi'
            ? 'ग्रह गोचर एवं ग्रहण'
            : 'Upcoming gochar & eclipses',
      icon: Orbit,
    },
    {
      id: 'rashifal',
      label: lang === 'gu' ? 'રાશિફળ' : lang === 'hi' ? 'राशिफल' : 'Horoscope (Rashifal)',
      desc:
        lang === 'gu'
          ? 'દૈનિક, સાપ્તાહિક રાશિફળ'
          : lang === 'hi'
            ? 'दैनिक राशिफल'
            : 'Daily, weekly & annual forecast',
      icon: Sparkles,
    },
  ];

  const isSecondaryActive = secondaryTools.some((item) => item.id === mainSection);
  const activeSecondaryItem = secondaryTools.find((item) => item.id === mainSection);

  return (
    <header className="sticky top-2 sm:top-3 z-50 px-3 sm:px-6 pointer-events-none">
      <div className="pointer-events-auto mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl bg-white/95 shadow-[0_10px_35px_rgba(180,83,9,0.07)] border border-[#e8dfd2] backdrop-blur-xl px-3.5 py-2 sm:px-5 sm:py-2.5 transition-all">
        {/* Title & Brand */}
        <button
          type="button"
          onClick={() => {
            setMainSection('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-2.5 sm:space-x-3 text-left focus-visible:outline-hidden group cursor-pointer"
          aria-label="Return to landing page home"
        >
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#b45309] to-[#78350f] text-white shadow-md relative overflow-hidden group-hover:scale-105 transition-transform shrink-0">
            <Compass className="h-5 w-5 text-amber-100 animate-spin-slow" />
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-medium tracking-tight text-[var(--text-primary)] font-serif group-hover:text-[var(--text-gold)] transition-colors leading-tight">
                {t.appTitle}
              </h1>
              <Chip className="hidden md:inline-flex bg-amber-500/10 text-[var(--text-gold)] border border-[var(--border-gold)] text-[10px] px-1.5 py-0.5 font-mono">
                <Chip.Label>Vedic Astro</Chip.Label>
              </Chip>
            </div>
            <p className="text-[10.5px] sm:text-[11px] text-[var(--text-muted)] line-clamp-1">
              {t.appSubtitle}
            </p>
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
                        : 'Vedic tools'}
                </span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isToolsOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl glass-panel shadow-2xl border border-[var(--border-gold)] p-2 z-50 animate-scale-in">
                  <div className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider px-2.5 py-1.5 border-b border-[var(--border-subtle)] mb-1">
                    {lang === 'gu'
                      ? 'વૈદિક સાધનો અને સેવાઓ'
                      : lang === 'hi'
                        ? 'वैदिक साधन एवं सेवाएं'
                        : 'Vedic tools & calculations'}
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
                        className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-xl text-left transition cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/15 text-[var(--text-gold)] font-bold'
                            : 'text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                      >
                        <div
                          className={`p-1.5 rounded-lg mt-0.5 ${
                            isSelected
                              ? 'bg-amber-500/20 text-[var(--text-gold)]'
                              : 'bg-stone-500/10 text-[var(--text-secondary)]'
                          }`}
                        >
                          <ToolIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold leading-tight">{tool.label}</div>
                          <div className="text-[10.5px] text-[var(--text-muted)] leading-tight mt-0.5">
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

        {/* Action Controls: Language Switcher & Quick Print Button */}
        <div className="flex items-center space-x-2">
          {/* Quick Print Button */}
          <Tooltip>
            <Tooltip.Trigger>
              <Button
                type="button"
                onPress={() => window.print()}
                aria-label={t.tabPrint}
                className="flex items-center gap-1.5 rounded-xl glass-card px-2.5 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition print:hidden cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5 text-[var(--text-gold)]" />
                <span className="hidden xl:inline">{t.tabPrint}</span>
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content className="rounded-lg bg-neutral-900 text-white text-xs px-2 py-1 shadow-lg border border-neutral-800">
              Print or export PDF report
            </Tooltip.Content>
          </Tooltip>

          {/* Language Switcher */}
          <div
            role="group"
            aria-label="Language selection"
            className="flex items-center space-x-1 rounded-xl glass-pill p-1 shadow-inner"
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
              className={`rounded-lg px-2 py-1 text-xs font-semibold transition cursor-pointer ${
                lang === 'gu'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-transparent'
              }`}
            >
              ગુ
            </Button>
            <Button
              type="button"
              onPress={() => setLang('hi')}
              aria-label="Switch language to Hindi"
              aria-pressed={lang === 'hi'}
              className={`rounded-lg px-2 py-1 text-xs font-semibold transition cursor-pointer ${
                lang === 'hi'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-transparent'
              }`}
            >
              हि
            </Button>
            <Button
              type="button"
              onPress={() => setLang('en')}
              aria-label="Switch language to English"
              aria-pressed={lang === 'en'}
              className={`rounded-lg px-2 py-1 text-xs font-semibold transition cursor-pointer ${
                lang === 'en'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-transparent'
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
