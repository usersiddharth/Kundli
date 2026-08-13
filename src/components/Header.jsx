import React from 'react';
import { Compass, Globe, Printer, Calendar, Sparkles, Heart, Hash, CalendarDays } from 'lucide-react';

export default function Header({ lang, setLang, t, mainSection, setMainSection }) {
  return (
    <header className="glass-header px-4 py-3 sm:px-6 sm:py-3.5 sticky top-0 z-40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        {/* Title & Brand */}
        <div className="flex items-center space-x-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl glass-button-dark text-[#f4ebd9] shadow-sm relative overflow-hidden group">
            <Compass className="h-6 w-6 text-[#e6a86c] animate-spin-slow" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#2c2825] font-serif">
              {t.appTitle}
            </h1>
            <p className="text-xs sm:text-sm text-[#736a60]">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Center Main 5-Portal Switcher */}
        <nav aria-label="Portal Navigation">
          <div role="tablist" aria-label="Portal Switcher" className="flex flex-wrap rounded-xl glass-pill p-1 shadow-inner print:hidden gap-1">
            <button
              role="tab"
              aria-selected={mainSection === 'kundli'}
              onClick={() => setMainSection('kundli')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                mainSection === 'kundli'
                  ? 'glass-button-dark text-[#f4ebd9] shadow-xs'
                  : 'text-[#544d44] hover:bg-white/60'
              }`}
            >
              <Sparkles className="h-4 w-4 text-[#e6a86c]" />
              <span>જન્મ કુંડળી (Kundli)</span>
            </button>

            <button
              role="tab"
              aria-selected={mainSection === 'panchang'}
              onClick={() => setMainSection('panchang')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                mainSection === 'panchang'
                  ? 'glass-button-dark text-[#f4ebd9] shadow-xs'
                  : 'text-[#544d44] hover:bg-white/60'
              }`}
            >
              <Calendar className="h-4 w-4 text-[#e6a86c]" />
              <span>ગુજરાતી પંચાંગ (Panchang)</span>
            </button>

            <button
              role="tab"
              aria-selected={mainSection === 'calendar'}
              onClick={() => setMainSection('calendar')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                mainSection === 'calendar'
                  ? 'glass-button-dark text-[#f4ebd9] shadow-xs'
                  : 'text-[#544d44] hover:bg-white/60'
              }`}
            >
              <CalendarDays className="h-4 w-4 text-[#e6a86c]" />
              <span>ગુજરાતી કૅલેન્ડર (Calendar)</span>
            </button>

            <button
              role="tab"
              aria-selected={mainSection === 'numerology'}
              onClick={() => setMainSection('numerology')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                mainSection === 'numerology'
                  ? 'glass-button-dark text-[#f4ebd9] shadow-xs'
                  : 'text-[#544d44] hover:bg-white/60'
              }`}
            >
              <Hash className="h-4 w-4 text-[#e6a86c]" />
              <span>અંકશાસ્ત્ર (Numerology)</span>
            </button>

            <button
              role="tab"
              aria-selected={mainSection === 'matchmaking'}
              onClick={() => setMainSection('matchmaking')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                mainSection === 'matchmaking'
                  ? 'glass-button-dark text-[#f4ebd9] shadow-xs'
                  : 'text-[#544d44] hover:bg-white/60'
              }`}
            >
              <Heart className="h-4 w-4 text-[#e6a86c]" />
              <span>ગુણ મિલન (Matching)</span>
            </button>
          </div>
        </nav>

        {/* Action Controls: Language Switcher & Print Button */}
        <div className="flex items-center space-x-2.5">
          {/* Quick Print Button */}
          <button
            onClick={() => window.print()}
            title={t.tabPrint}
            aria-label={t.tabPrint}
            className="flex items-center gap-1.5 rounded-lg glass-card px-3 py-2 text-xs font-medium text-[#544d44] hover:bg-white/90 hover:text-[#2c2825] transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] print:hidden"
          >
            <Printer className="h-4 w-4 text-[#b85d19]" />
            <span className="hidden sm:inline">{t.tabPrint}</span>
          </button>

          {/* Language Switcher */}
          <div role="group" aria-label="Language Selection" className="flex items-center space-x-1 rounded-lg glass-pill p-1 shadow-inner">
            <Globe className="ml-1.5 mr-1 h-3.5 w-3.5 text-[#736a60]" aria-hidden="true" />
            <button
              onClick={() => setLang('gu')}
              aria-label="Switch language to Gujarati"
              aria-pressed={lang === 'gu'}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                lang === 'gu'
                  ? 'glass-button-dark text-[#f4ebd9] shadow-xs'
                  : 'text-[#544d44] hover:bg-white/60'
              }`}
            >
              ગુજરાતી
            </button>
            <button
              onClick={() => setLang('hi')}
              aria-label="Switch language to Hindi"
              aria-pressed={lang === 'hi'}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                lang === 'hi'
                  ? 'glass-button-dark text-[#f4ebd9] shadow-xs'
                  : 'text-[#544d44] hover:bg-white/60'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLang('en')}
              aria-label="Switch language to English"
              aria-pressed={lang === 'en'}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                lang === 'en'
                  ? 'glass-button-dark text-[#f4ebd9] shadow-xs'
                  : 'text-[#544d44] hover:bg-white/60'
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
