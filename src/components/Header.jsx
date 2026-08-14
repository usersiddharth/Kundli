import React from 'react';
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
  return (
    <header className="glass-header px-4 py-3 sm:px-6 sm:py-3.5 sticky top-0 z-40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        {/* Title & Brand (Clickable to Home) */}
        <button
          onClick={() => {
            setMainSection('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-3.5 text-left focus-visible:outline-hidden group cursor-pointer"
          aria-label="Return to Landing Page Home"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl glass-button-dark shadow-md relative overflow-hidden group-hover:scale-105 transition-transform">
            <Compass className="h-6 w-6 text-[var(--text-gold)] animate-spin-slow" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-medium tracking-tight text-[var(--text-primary)] font-serif group-hover:text-[var(--text-gold)] transition-colors">
              {t.appTitle}
            </h1>
            <p className="text-xs text-[var(--text-muted)] line-clamp-1">{t.appSubtitle}</p>
          </div>
        </button>

        {/* Center Main Navigation Switcher (Desktop Only) */}
        <nav aria-label="Portal Navigation" className="hidden xl:block">
          <div
            role="tablist"
            aria-label="Portal Switcher"
            className="flex flex-wrap rounded-xl glass-pill p-1 shadow-inner print:hidden gap-1"
          >
            <button
              role="tab"
              aria-selected={mainSection === 'landing'}
              onClick={() => {
                setMainSection('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                mainSection === 'landing'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Home className="h-3.5 w-3.5" />
              <span>મુખ્ય પૃષ્ઠ (Home)</span>
            </button>

            <button
              role="tab"
              aria-selected={mainSection === 'kundli'}
              onClick={() => {
                setMainSection('kundli');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                mainSection === 'kundli'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>જન્મ કુંડળી (Kundli)</span>
            </button>

            <button
              role="tab"
              aria-selected={mainSection === 'panchang'}
              onClick={() => {
                setMainSection('panchang');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                mainSection === 'panchang'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>ગુજરાતી પંચાંગ (Panchang)</span>
            </button>

            <button
              role="tab"
              aria-selected={mainSection === 'vedicClock'}
              onClick={() => {
                setMainSection('vedicClock');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                mainSection === 'vedicClock'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>વૈદિક ઘડિયાળ (Clock)</span>
            </button>

            <button
              role="tab"
              aria-selected={mainSection === 'calendar'}
              onClick={() => {
                setMainSection('calendar');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                mainSection === 'calendar'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <CalendarDays className="h-3.5 w-3.5" />
              <span>કૅલેન્ડર (Calendar)</span>
            </button>

            <button
              role="tab"
              aria-selected={mainSection === 'numerology'}
              onClick={() => {
                setMainSection('numerology');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                mainSection === 'numerology'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Hash className="h-3.5 w-3.5" />
              <span>અંકશાસ્ત્ર (Numerology)</span>
            </button>

            <button
              role="tab"
              aria-selected={mainSection === 'matchmaking'}
              onClick={() => {
                setMainSection('matchmaking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                mainSection === 'matchmaking'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Heart className="h-3.5 w-3.5" />
              <span>ગુણ મિલન (Matching)</span>
            </button>

            <button
              role="tab"
              aria-selected={mainSection === 'upcomingEvents'}
              onClick={() => {
                setMainSection('upcomingEvents');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                mainSection === 'upcomingEvents'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Orbit className="h-3.5 w-3.5 text-[var(--text-gold)]" />
              <span>ગ્રહીય ઘટનાઓ (Events)</span>
            </button>

            <button
              role="tab"
              aria-selected={mainSection === 'rashifal'}
              onClick={() => {
                setMainSection('rashifal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                mainSection === 'rashifal'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-[var(--text-gold)]" />
              <span>રાશિ ભવિષ્ય (Horoscope)</span>
            </button>
          </div>
        </nav>

        {/* Action Controls: Theme Switcher, Language Switcher & Print Button */}
        <div className="flex items-center space-x-2">
          {/* Royal Mode Toggle Button */}
          <button
            onClick={() => setIsDark(!isDark)}
            title={isDark ? 'Switch to Imperial Parchment Mode' : 'Switch to Royal Dark Sky Mode'}
            aria-label="Toggle Theme Mode"
            className="flex items-center gap-1.5 rounded-lg glass-card px-2.5 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition print:hidden"
          >
            {isDark ? (
              <>
                <Sun className="h-4 w-4 text-[var(--text-gold)]" />
                <span className="hidden md:inline">Parchment</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-[var(--text-amber)]" />
                <span className="hidden md:inline">Dark Sky</span>
              </>
            )}
          </button>

          {/* Quick Print Button */}
          <button
            onClick={() => window.print()}
            title={t.tabPrint}
            aria-label={t.tabPrint}
            className="flex items-center gap-1.5 rounded-lg glass-card px-2.5 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition print:hidden"
          >
            <Printer className="h-4 w-4 text-[var(--text-gold)]" />
            <span className="hidden lg:inline">{t.tabPrint}</span>
          </button>

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
            <button
              onClick={() => setLang('gu')}
              aria-label="Switch language to Gujarati"
              aria-pressed={lang === 'gu'}
              className={`rounded-md px-2 py-1 text-xs font-semibold transition ${
                lang === 'gu'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              ગુજરાતી
            </button>
            <button
              onClick={() => setLang('hi')}
              aria-label="Switch language to Hindi"
              aria-pressed={lang === 'hi'}
              className={`rounded-md px-2 py-1 text-xs font-semibold transition ${
                lang === 'hi'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLang('en')}
              aria-label="Switch language to English"
              aria-pressed={lang === 'en'}
              className={`rounded-md px-2 py-1 text-xs font-semibold transition ${
                lang === 'en'
                  ? 'glass-button-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
