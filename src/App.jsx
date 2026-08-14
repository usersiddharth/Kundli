import React, { useState, useEffect, lazy, Suspense } from 'react';
import { en } from './i18n/en.js';
import { hi } from './i18n/hi.js';
import { gu } from './i18n/gu.js';

import { calculatePlanetaryPositions } from './engine/astronomy.js';
import { getFullKundli } from './engine/kundli.js';

import Header from './components/Header.jsx';
import QuickToolbar from './components/QuickToolbar.jsx';
import KundliHubView from './components/KundliHubView.jsx';
import MobileBottomNav from './components/MobileBottomNav.jsx';
import CosmicLoader from './components/CosmicLoader.jsx';

// Code-Split Dynamic Portal Views
const LandingPage = lazy(() => import('./components/LandingPage.jsx'));
const GujaratiPanchangView = lazy(() => import('./components/GujaratiPanchangView.jsx'));
const GujaratiCalendarView = lazy(() => import('./components/GujaratiCalendarView.jsx'));
const NumerologyView = lazy(() => import('./components/NumerologyView.jsx'));
const ChoghadiyaView = lazy(() => import('./components/ChoghadiyaView.jsx'));
const VedicClockView = lazy(() => import('./components/VedicClockView.jsx'));
const Matchmaking = lazy(() => import('./components/Matchmaking.jsx'));
const UpcomingEventsView = lazy(() => import('./components/UpcomingEventsView.jsx'));
const RashifalView = lazy(() => import('./components/RashifalView.jsx'));

export default function App() {
  const [lang, setLang] = useState('gu'); // Default Gujarati
  const [mainSection, setMainSection] = useState('landing'); // 'landing' | 'kundli' | 'panchang' | 'vedicClock' | 'calendar' | 'numerology' | 'matchmaking' | 'upcomingEvents' | 'rashifal'
  const [isDark, setIsDark] = useState(true); // Default to Majestic Dark Royal Cosmic Sky
  const [externalPanchangDate, setExternalPanchangDate] = useState(null);

  const locales = { en, hi, gu };
  const t = locales[lang] || gu;

  // Native Birth Details Form State (Starts Empty)
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    dob: '',
    tob: '',
    city: '',
    lat: null,
    lng: null,
    tz: 5.5,
  });

  const [kundliData, setKundliData] = useState(null);
  const [birthDateObj, setBirthDateObj] = useState(new Date('1995-08-15T08:30:00'));

  const generateKundli = (customData = null) => {
    const data = customData || formData;
    const dobStr = data.dob || '1995-08-15';
    const tobStr = data.tob || '08:30';
    const lat = data.lat || 23.0225;
    const lng = data.lng || 72.5714;
    const tz = data.tz || 5.5;

    const [year, month, day] = dobStr.split('-').map(Number);
    const [hour, minute] = tobStr.split(':').map(Number);
    const bDate = new Date(year, month - 1, day, hour, minute);
    setBirthDateObj(bDate);

    const astro = calculatePlanetaryPositions(year, month, day, hour, minute, lat, lng, tz);
    const fullKundli = getFullKundli(astro, year, month, day, hour, minute);
    setKundliData(fullKundli);
  };

  useEffect(() => {
    generateKundli();
  }, []);

  // Update body dark class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'dark bg-[#0c0e17] text-[#f5efe6]' : 'bg-[#faf8f4] text-[#2c2825]'
      } font-sans antialiased selection:bg-[#f1c40f]/30 selection:text-[#f39c12]`}
    >
      {/* 1. Global Navigation Header with 6 Dedicated Portals & Theme Switcher */}
      <Header
        lang={lang}
        setLang={setLang}
        t={t}
        mainSection={mainSection}
        setMainSection={setMainSection}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* 2. Main Responsive Content Canvas */}
      <main className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8 pb-24 sm:pb-8 space-y-5 sm:space-y-6">
        {/* Sticky Cosmic Quick Summary Ribbon (Active in Kundli Portal) */}
        {mainSection === 'kundli' && (
          <QuickToolbar
            kundliData={kundliData}
            formData={formData}
            birthDateObj={birthDateObj}
            t={t}
          />
        )}

        {/* -----------------------------------------------------------------
            HOME: LANDING PAGE & SHOWCASE
            ----------------------------------------------------------------- */}
        {mainSection === 'landing' && (
          <Suspense
            fallback={
              <CosmicLoader message={t?.landingHome || 'મુખ્ય પૃષ્ઠ લોડ થઈ રહ્યું છે...'} />
            }
          >
            <LandingPage
              formData={formData}
              setFormData={setFormData}
              generateKundli={generateKundli}
              setMainSection={setMainSection}
              t={t}
              lang={lang}
            />
          </Suspense>
        )}

        {/* -----------------------------------------------------------------
            PORTAL 1: KUNDLI ANALYTICS & 5 THEMATIC CATEGORY HUBS
            ----------------------------------------------------------------- */}
        {mainSection === 'kundli' && (
          <KundliHubView
            kundliData={kundliData}
            formData={formData}
            setFormData={setFormData}
            generateKundli={generateKundli}
            birthDateObj={birthDateObj}
            t={t}
            lang={lang}
          />
        )}

        {/* -----------------------------------------------------------------
            PORTAL 2: GUJARATI PANCHANG & REAL-TIME CHOGHADIYA
            ----------------------------------------------------------------- */}
        {mainSection === 'panchang' && (
          <Suspense
            fallback={<CosmicLoader message={t?.panchangTitle || 'પંચાંગ લોડ થઈ રહ્યું છે...'} />}
          >
            <div className="space-y-6 animate-fade-in-up">
              <GujaratiPanchangView
                kundliData={kundliData}
                birthDate={birthDateObj}
                t={t}
                lang={lang}
                initialCustomDate={externalPanchangDate}
              />
              <ChoghadiyaView t={t} lang={lang} />
            </div>
          </Suspense>
        )}

        {/* -----------------------------------------------------------------
            PORTAL 3: VEDIC CLOCK & KAAL CHAKRA
            ----------------------------------------------------------------- */}
        {mainSection === 'vedicClock' && (
          <Suspense
            fallback={<CosmicLoader message={t?.vedicClock || 'વૈદિક ઘડિયાળ લોડ થઈ રહી છે...'} />}
          >
            <div className="space-y-6 animate-fade-in-up">
              <VedicClockView t={t} lang={lang} />
            </div>
          </Suspense>
        )}

        {/* -----------------------------------------------------------------
            PORTAL 4: GUJARATI WALL CALENDAR (VIKRAM SAMVAT 2082 - 2083)
            ----------------------------------------------------------------- */}
        {mainSection === 'calendar' && (
          <Suspense
            fallback={
              <CosmicLoader message={t?.calendarTitle || 'ગુજરાતી કેલેન્ડર લોડ થઈ રહ્યું છે...'} />
            }
          >
            <div className="space-y-6 animate-fade-in-up">
              <GujaratiCalendarView
                t={t}
                lang={lang}
                onOpenPanchangPortal={(dateStr) => {
                  setExternalPanchangDate(dateStr);
                  setMainSection('panchang');
                }}
              />
            </div>
          </Suspense>
        )}

        {/* -----------------------------------------------------------------
            PORTAL 5: NUMEROLOGY & LO SHU GRID
            ----------------------------------------------------------------- */}
        {mainSection === 'numerology' && (
          <Suspense
            fallback={
              <CosmicLoader message={t?.numerologyTitle || 'અંકશાસ્ત્ર લોડ થઈ રહ્યું છે...'} />
            }
          >
            <div className="space-y-6 animate-fade-in-up">
              <NumerologyView formData={formData} birthDate={birthDateObj} t={t} lang={lang} />
            </div>
          </Suspense>
        )}

        {/* -----------------------------------------------------------------
            PORTAL 6: 36-GUNA ASHTAKOOT MATCHMAKING
            ----------------------------------------------------------------- */}
        {mainSection === 'matchmaking' && (
          <Suspense
            fallback={
              <CosmicLoader message={t?.matchmakingTitle || 'ગુણ મિલન લોડ થઈ રહ્યું છે...'} />
            }
          >
            <div className="space-y-6 animate-fade-in-up">
              <Matchmaking t={t} />
            </div>
          </Suspense>
        )}

        {/* -----------------------------------------------------------------
            PORTAL 7: UPCOMING PLANETARY EVENTS & GOCHAR
            ----------------------------------------------------------------- */}
        {mainSection === 'upcomingEvents' && (
          <Suspense
            fallback={
              <CosmicLoader message={t?.upcomingEventsTitle || 'ગ્રહીય ઘટનાઓ લોડ થઈ રહી છે...'} />
            }
          >
            <div className="space-y-6 animate-fade-in-up">
              <UpcomingEventsView kundliData={kundliData} t={t} lang={lang} />
            </div>
          </Suspense>
        )}

        {/* -----------------------------------------------------------------
            PORTAL 8: RASHIFAL (DAILY, WEEKLY, MONTHLY, YEARLY)
            ----------------------------------------------------------------- */}
        {mainSection === 'rashifal' && (
          <Suspense
            fallback={
              <CosmicLoader message={t?.rashifalTitle || 'રાશિ ભવિષ્ય લોડ થઈ રહ્યું છે...'} />
            }
          >
            <div className="space-y-6 animate-fade-in-up">
              <RashifalView kundliData={kundliData} t={t} lang={lang} />
            </div>
          </Suspense>
        )}
      </main>

      {/* 3. Sticky Mobile Bottom Navigation Bar (Screens < 640px) */}
      <MobileBottomNav mainSection={mainSection} setMainSection={setMainSection} t={t} />
    </div>
  );
}
