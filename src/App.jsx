import React, { useState, useEffect } from 'react';
import { en } from './i18n/en.js';
import { hi } from './i18n/hi.js';
import { gu } from './i18n/gu.js';

import { calculatePlanetaryPositions } from './engine/astronomy.js';
import { getFullKundli } from './engine/kundli.js';

import Header from './components/Header.jsx';
import QuickToolbar from './components/QuickToolbar.jsx';
import KundliHubView from './components/KundliHubView.jsx';
import GujaratiPanchangView from './components/GujaratiPanchangView.jsx';
import GujaratiCalendarView from './components/GujaratiCalendarView.jsx';
import NumerologyView from './components/NumerologyView.jsx';
import ChoghadiyaView from './components/ChoghadiyaView.jsx';
import Matchmaking from './components/Matchmaking.jsx';
import MobileBottomNav from './components/MobileBottomNav.jsx';

export default function App() {
  const [lang, setLang] = useState('gu'); // Default Gujarati
  const [mainSection, setMainSection] = useState('kundli'); // 'kundli' | 'panchang' | 'calendar' | 'numerology' | 'matchmaking'
  const [externalPanchangDate, setExternalPanchangDate] = useState(null);

  const locales = { en, hi, gu };
  const t = locales[lang] || gu;

  // Native Birth Details Form State
  const [formData, setFormData] = useState({
    name: "Tapan Tailor",
    gender: "male",
    dob: "1986-03-01",
    tob: "11:55",
    city: "Vyara, Tapi, Gujarat",
    lat: 21.1147,
    lng: 73.3986,
    tz: 5.5
  });

  const [kundliData, setKundliData] = useState(null);
  const [birthDateObj, setBirthDateObj] = useState(new Date("1986-03-01T11:55:00"));

  const generateKundli = () => {
    const [year, month, day] = formData.dob.split('-').map(Number);
    const [hour, minute] = formData.tob.split(':').map(Number);
    const bDate = new Date(year, month - 1, day, hour, minute);
    setBirthDateObj(bDate);

    const astro = calculatePlanetaryPositions(year, month, day, hour, minute, formData.lat, formData.lng, formData.tz);
    const fullKundli = getFullKundli(astro, year, month, day, hour, minute);
    setKundliData(fullKundli);
  };

  useEffect(() => {
    generateKundli();
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#2c2825] font-sans antialiased selection:bg-[#b85d19]/20 selection:text-[#91450c]">
      {/* 1. Global Navigation Header with 5 Dedicated Portals */}
      <Header
        lang={lang}
        setLang={setLang}
        t={t}
        mainSection={mainSection}
        setMainSection={setMainSection}
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
        )}

        {/* -----------------------------------------------------------------
            PORTAL 3: GUJARATI WALL CALENDAR (VIKRAM SAMVAT 2082 - 2083)
            ----------------------------------------------------------------- */}
        {mainSection === 'calendar' && (
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
        )}

        {/* -----------------------------------------------------------------
            PORTAL 4: NUMEROLOGY & LO SHU GRID
            ----------------------------------------------------------------- */}
        {mainSection === 'numerology' && (
          <div className="space-y-6 animate-fade-in-up">
            <NumerologyView
              formData={formData}
              birthDate={birthDateObj}
              t={t}
              lang={lang}
            />
          </div>
        )}

        {/* -----------------------------------------------------------------
            PORTAL 5: 36-GUNA ASHTAKOOT MATCHMAKING
            ----------------------------------------------------------------- */}
        {mainSection === 'matchmaking' && (
          <div className="space-y-6 animate-fade-in-up">
            <Matchmaking t={t} />
          </div>
        )}
      </main>

      {/* 3. Sticky Mobile Bottom Navigation Bar (Screens < 640px) */}
      <MobileBottomNav
        mainSection={mainSection}
        setMainSection={setMainSection}
        t={t}
      />
    </div>
  );
}
