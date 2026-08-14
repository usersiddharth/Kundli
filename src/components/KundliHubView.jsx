import React, { useState, useMemo } from 'react';
import ChartSVG from './ChartSVG.jsx';
import ZodiacWheel from './ZodiacWheel.jsx';
import BasicDetails from './BasicDetails.jsx';
import ProfileForm from './ProfileForm.jsx';
import PlanetaryTable from './PlanetaryTable.jsx';
import ShadbalaView from './ShadbalaView.jsx';
import DivisionalChartsView from './DivisionalChartsView.jsx';
import KpView from './KpView.jsx';
import AiConsultationView from './AiConsultationView.jsx';
import ParivartanView from './ParivartanView.jsx';
import YogasView from './YogasView.jsx';
import AspectsView from './AspectsView.jsx';
import AshtakvargaView from './AshtakvargaView.jsx';
import GemstonesView from './GemstonesView.jsx';
import VarshphalView from './VarshphalView.jsx';
import DashaView from './DashaView.jsx';
import DoshaReport from './DoshaReport.jsx';
import TransitView from './TransitView.jsx';
import VedicClockView from './VedicClockView.jsx';
import PrintableReport from './PrintableReport.jsx';

import {
  Compass, Orbit, Table, ShieldCheck, Layers, Key, Sparkles, Repeat,
  Crown, Eye, Grid, Clock, Gem, Sun, ShieldAlert, Activity, Printer,
  Search, User
} from 'lucide-react';

export default function KundliHubView({
  kundliData,
  formData,
  setFormData,
  generateKundli,
  birthDateObj,
  t,
  lang
}) {
  const [activeHub, setActiveHub] = useState('core'); // 'core' | 'planets' | 'timing' | 'yogas' | 'remedies'
  const [activeSubTool, setActiveSubTool] = useState('details');
  const [searchQuery, setSearchQuery] = useState('');

  // 5 Thematic Clusters Definition
  const HUB_DEFINITIONS = useMemo(() => [
    {
      id: 'core',
      title: { gu: 'મૂળ કુંડળી', hi: 'मूल कुण्डली', en: 'Core Charts' },
      subtitle: { gu: 'જન્મ વિગત & ચાર્ટ', hi: 'जन्म विवरण एवं चक्र', en: 'Birth Details & Wheel' },
      icon: Compass,
      badge: 'D1 & D9',
      defaultTool: 'details',
      tools: [
        { id: 'details', label: { gu: 'જન્મ વિગત & લગ્ન ચાર્ટ', hi: 'जन्म विवरण एवं लग्न चक्र', en: 'Birth & Lagna Chart' }, icon: Compass },
        { id: 'wheel', label: { gu: '૩૬૦° રાશિ ચક્ર', hi: '३६०° राशि चक्र', en: '360° Zodiac Wheel' }, icon: Orbit },
        { id: 'profile', label: { gu: 'જાતક પ્રોફાઇલ ફેરફાર', hi: 'जातक प्रोफाइल संपादन', en: 'Edit Birth Profile' }, icon: User }
      ]
    },
    {
      id: 'planets',
      title: { gu: 'ગ્રહ બળ & સ્થિતિ', hi: 'ग्रह बल एवं स्थिति', en: 'Planetary Strengths' },
      subtitle: { gu: 'ષડ્બળ, અષ્ટકવર્ગ, દૃષ્ટિ', hi: 'षड्बल, अष्टकवर्ग, दृष्टि', en: 'Shadbala, Ashtakvarga & Aspects' },
      icon: Table,
      badge: '૬-બળ',
      defaultTool: 'planets',
      tools: [
        { id: 'planets', label: { gu: 'ગ્રહ સ્પષ્ટ કોષ્ટક', hi: 'ग्रह स्पष्ट तालिका', en: 'Planetary Table' }, icon: Table },
        { id: 'shadbala', label: { gu: 'ષડ્બળ ૬-સ્તરીય તાકાત', hi: 'षड्बल सामर्थ्य', en: 'Shadbala Strengths' }, icon: ShieldCheck },
        { id: 'ashtakvarga', label: { gu: 'સર્વાષ્ટકવર્ગ બિંદુ', hi: 'सर्वाष्टकवर्ग चक्र', en: 'Sarvashtakvarga' }, icon: Grid },
        { id: 'aspects', label: { gu: 'ગ્રહ દૃષ્ટિ સંબંધ', hi: 'ग्रह दृष्टि संबंध', en: 'Planetary Aspects' }, icon: Eye }
      ]
    },
    {
      id: 'timing',
      title: { gu: 'દશા & ગોચર ભવિષ્ય', hi: 'दशा एवं गोचर', en: 'Timing & Predictions' },
      subtitle: { gu: '૫-સ્તરીય દશા, ગોચર, વર્ષફળ', hi: '५-स्तरीय दशा, गोचर, वर्षफल', en: '5-Tier Dasha & Transits' },
      icon: Clock,
      badge: 'લાઈવ દશા',
      defaultTool: 'dasha',
      tools: [
        { id: 'dasha', label: { gu: '૫-સ્તરીય વિંશોત્તરી દશા (સૂક્ષ્મ-પ્રાણ)', hi: '५-स्तरीय विंशोत्तरी दशा', en: '5-Tier Dasha (Micro)' }, icon: Clock },
        { id: 'vedicClock', label: { gu: 'વૈદિક ઘડિયાળ & કાળ ચક્ર', hi: 'वैदिक घड़ी व काल चक्र', en: 'Vedic Clock & Kaal Chakra' }, icon: Clock },
        { id: 'transits', label: { gu: 'રીઅલ-ટાઇમ ગોચર પરિભ્રમણ', hi: 'वर्तमान गोचर स्थिति', en: 'Real-Time Transits' }, icon: Activity },
        { id: 'varshphal', label: { gu: 'તાજિક વર્ષફળ & મુન્થા', hi: 'ताजिक वर्षफल एवं मुंथा', en: 'Tajik Varshphal' }, icon: Sun }
      ]
    },
    {
      id: 'yogas',
      title: { gu: 'યોગ, દોષ & વર્ગ', hi: 'योग, दोष एवं वर्ग', en: 'Yogas & Systems' },
      subtitle: { gu: 'રાજયોગ, મંગળ-કાલસર્પ, ષોડશવર્ગ, KP', hi: 'राजयोग, मंगल दोष, षोडशवर्ग', en: 'Rajayogas, Doshas, D1-D60, KP' },
      icon: Crown,
      badge: 'રાજયોગ',
      defaultTool: 'yogas',
      tools: [
        { id: 'yogas', label: { gu: 'મુખ્ય સક્રિય રાજયોગ', hi: 'सक्रिय शुभ राजयोग', en: 'Major Rajayogas' }, icon: Crown },
        { id: 'doshas', label: { gu: 'દોષ વિશ્લેષણ (મંગળ, કાલસર્પ, સાડાસાતી)', hi: 'दोष विश्लेषण', en: 'Dosha Audits' }, icon: ShieldAlert },
        { id: 'parivartan', label: { gu: 'પરિવર્તન યોગ (ગૃહ વિનિમય)', hi: 'परिवर्तन योग', en: 'Parivartan Yogas' }, icon: Repeat },
        { id: 'vargas', label: { gu: 'ષોડશવર્ગ ચાર્ટ્સ (D1 થી D60)', hi: 'षोडशवर्ग (D1 - D60)', en: 'Divisional Charts' }, icon: Layers },
        { id: 'kp', label: { gu: 'કૃષ્ણમૂર્તિ પદ્ધતિ (KP સિસ્ટમ)', hi: 'केपी नक्षत्र ज्योतिष', en: 'KP Astrology' }, icon: Key }
      ]
    },
    {
      id: 'remedies',
      title: { gu: 'પરામર્શ, ઉપાય & પ્રિન્ટ', hi: 'परामर्श एवं उपाय', en: 'Consultation & Print' },
      subtitle: { gu: 'AI જ્યોતિષ, રત્ન ઉપાય, A4 રિપોર્ટ', hi: 'ज्योतिष परामर्श, रत्न, प्रिंट', en: 'AI Guidance, Gemstones & PDF' },
      icon: Sparkles,
      badge: 'PDF Dossier',
      defaultTool: 'consultation',
      tools: [
        { id: 'consultation', label: { gu: 'AI સંદર્ભિત જ્યોતિષ પરામર્શ', hi: 'ज्योतिष परामर्श व प्रश्नोत्तर', en: 'AI Vedic Consultation' }, icon: Sparkles },
        { id: 'gemstones', label: { gu: 'શુભ રત્ન & જૈમિની કારક', hi: 'भाग्य रत्न एवं कारक', en: 'Lucky Gemstones & Karakas' }, icon: Gem },
        { id: 'print', label: { gu: 'સંપૂર્ણ કુંડળી PDF પ્રિન્ટ (A4)', hi: 'सम्पूर्ण कुण्डली प्रिंट', en: 'Save Full Dossier PDF' }, icon: Printer }
      ]
    }
  ], []);

  // Quick Direct Search Lookup across all tools
  const allToolsFlat = useMemo(() => {
    return HUB_DEFINITIONS.flatMap(hub =>
      hub.tools.map(tool => ({
        hubId: hub.id,
        toolId: tool.id,
        label: tool.label[lang] || tool.label.gu,
        hubTitle: hub.title[lang] || hub.title.gu,
        icon: tool.icon
      }))
    );
  }, [HUB_DEFINITIONS, lang]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allToolsFlat.filter(item =>
      item.label.toLowerCase().includes(q) ||
      item.toolId.toLowerCase().includes(q) ||
      item.hubTitle.toLowerCase().includes(q)
    );
  }, [searchQuery, allToolsFlat]);

  const handleSelectTool = (hubId, toolId) => {
    setActiveHub(hubId);
    setActiveSubTool(toolId);
    setSearchQuery('');
  };

  const currentHubObj = HUB_DEFINITIONS.find(h => h.id === activeHub) || HUB_DEFINITIONS[0];

  return (
    <div className="space-y-6">
      {/* =========================================================================
          TOP THEMATIC HUB SELECTOR (5 HIGH-LEVEL CATEGORY CARDS)
          ========================================================================= */}
      <div className="space-y-3 print:hidden">
        {/* Search & Direct Jumper Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#2c2825] tracking-tight">
              વૈદિક જ્યોતિષ વિશ્લેષણ કેન્દ્ર (Kundli Analytics Hub)
            </h2>
            <p className="text-xs text-[#736a60]">
              શાસ્ત્રીય પરાશરી અને જૈમિની પદ્ધતિ આધારિત ૫ મુખ્ય વિશ્લેષણ સ્તંભો
            </p>
          </div>

          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ઝડપી શોધ (દશા, ષડ્બળ, રાજયોગ, KP...)"
              className="w-full rounded-xl glass-input pl-9 pr-4 py-2 text-xs text-[#2c2825] focus:outline-hidden focus:ring-2 focus:ring-[#b85d19]"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#736a60]" aria-hidden="true" />

            {/* Instant Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute right-0 top-full mt-1.5 w-full rounded-xl glass-panel shadow-lg border border-[#d4c8b8] p-1.5 z-30 max-h-64 overflow-y-auto space-y-1">
                {searchResults.map((res, rIdx) => {
                  const Icon = res.icon;
                  return (
                    <button
                      key={rIdx}
                      type="button"
                      onClick={() => handleSelectTool(res.hubId, res.toolId)}
                      className="flex w-full items-center justify-between rounded-lg p-2 text-xs text-left hover:bg-[#b85d19] hover:text-white transition group"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5 text-[#b85d19] group-hover:text-white" />
                        <span className="font-medium">{res.label}</span>
                      </div>
                      <span className="text-[10px] text-[#736a60] group-hover:text-white/80 font-mono">
                        {res.hubTitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* 5 Primary Thematic Category Cards (Swipeable ribbon on mobile, grid on desktop) */}
        <div role="tablist" aria-label="Kundli Primary Hubs" className="flex overflow-x-auto no-scrollbar gap-2.5 pb-1 sm:pb-0 sm:grid sm:grid-cols-3 lg:grid-cols-5">
          {HUB_DEFINITIONS.map((hub) => {
            const Icon = hub.icon;
            const isHubActive = activeHub === hub.id;

            return (
              <button
                key={hub.id}
                role="tab"
                aria-selected={isHubActive}
                onClick={() => {
                  setActiveHub(hub.id);
                  // Default to first sub-tool if current tool doesn't belong to this hub
                  if (!hub.tools.some(t => t.id === activeSubTool)) {
                    setActiveSubTool(hub.defaultTool);
                  }
                }}
                className={`flex shrink-0 w-36 sm:w-auto flex-col items-start justify-between rounded-xl p-3 sm:p-3.5 text-left transition-all duration-200 border relative focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                  isHubActive
                    ? 'glass-panel-accent border-[#b85d19] ring-2 ring-[#b85d19]/40 shadow-sm scale-[1.01]'
                    : 'glass-card hover:border-[#b85d19]/40 hover:bg-white/90'
                }`}
              >
                <div className="flex w-full items-center justify-between mb-2">
                  <div className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg ${
                    isHubActive ? 'glass-button-dark text-[#e6a86c]' : 'bg-[#f5efe6] text-[#b85d19]'
                  }`}>
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                  </div>
                  <span className={`rounded-full px-1.5 py-0.5 text-[8.5px] sm:text-[9px] font-bold ${
                    isHubActive ? 'glass-badge-gold text-[#8a6a12]' : 'bg-[#f5efe6] text-[#736a60]'
                  }`}>
                    {hub.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xs sm:text-sm font-bold text-[#2c2825] leading-tight">
                    {hub.title[lang] || hub.title.gu}
                  </h3>
                  <p className="text-[9.5px] sm:text-[10px] text-[#736a60] line-clamp-1 mt-0.5">
                    {hub.subtitle[lang] || hub.subtitle.gu}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sub-Tool Navigation Pills within Active Hub */}
        <div role="tablist" aria-label="Sub-Tool Navigation" className="flex overflow-x-auto no-scrollbar gap-2 rounded-xl glass-panel p-1.5 shadow-2xs border border-[#e6dfd3]">
          {currentHubObj.tools.map((tool) => {
            const ToolIcon = tool.icon;
            const isToolActive = activeSubTool === tool.id;

            return (
              <button
                key={tool.id}
                role="tab"
                aria-selected={isToolActive}
                onClick={() => setActiveSubTool(tool.id)}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19] ${
                  isToolActive
                    ? 'glass-button-dark text-[#f4ebd9] shadow-xs ring-1 ring-[#b85d19]/40'
                    : 'text-[#544d44] hover:bg-white/70'
                }`}
              >
                <ToolIcon className={`h-3.5 w-3.5 ${isToolActive ? 'text-[#e6a86c]' : 'text-[#b85d19]'}`} />
                <span>{tool.label[lang] || tool.label.gu}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          ACTIVE SUB-TOOL VIEW CONTAINER
          ========================================================================= */}
      <div className="animate-fade-in-up">
        {/* HUB 1: CORE CHARTS & IDENTITY */}
        {activeSubTool === 'details' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ChartSVG kundliData={kundliData} t={t} lang={lang} />
              <BasicDetails kundliData={kundliData} t={t} />
            </div>
            <ProfileForm formData={formData} setFormData={setFormData} onSubmit={generateKundli} t={t} />
          </div>
        )}

        {activeSubTool === 'wheel' && (
          <ZodiacWheel kundliData={kundliData} t={t} lang={lang} />
        )}

        {activeSubTool === 'profile' && (
          <ProfileForm formData={formData} setFormData={setFormData} onSubmit={generateKundli} t={t} />
        )}

        {/* HUB 2: PLANETARY STRENGTHS & METRICS */}
        {activeSubTool === 'planets' && (
          <PlanetaryTable kundliData={kundliData} t={t} />
        )}

        {activeSubTool === 'shadbala' && (
          <ShadbalaView kundliData={kundliData} t={t} />
        )}

        {activeSubTool === 'ashtakvarga' && (
          <AshtakvargaView kundliData={kundliData} t={t} />
        )}

        {activeSubTool === 'aspects' && (
          <AspectsView kundliData={kundliData} t={t} />
        )}

        {/* HUB 3: TIMING & PREDICTIONS */}
        {activeSubTool === 'dasha' && (
          <DashaView kundliData={kundliData} birthDate={birthDateObj} t={t} lang={lang} />
        )}

        {activeSubTool === 'transits' && (
          <TransitView kundliData={kundliData} t={t} lang={lang} />
        )}

        {activeSubTool === 'vedicClock' && (
          <VedicClockView t={t} lang={lang} />
        )}

        {activeSubTool === 'varshphal' && (
          <VarshphalView kundliData={kundliData} birthDate={birthDateObj} t={t} lang={lang} />
        )}

        {/* HUB 4: YOGAS, DOSHAS & SYSTEMS */}
        {activeSubTool === 'yogas' && (
          <YogasView kundliData={kundliData} t={t} lang={lang} />
        )}

        {activeSubTool === 'doshas' && (
          <DoshaReport kundliData={kundliData} t={t} lang={lang} />
        )}

        {activeSubTool === 'parivartan' && (
          <ParivartanView kundliData={kundliData} t={t} lang={lang} />
        )}

        {activeSubTool === 'vargas' && (
          <DivisionalChartsView kundliData={kundliData} t={t} lang={lang} />
        )}

        {activeSubTool === 'kp' && (
          <KpView kundliData={kundliData} t={t} />
        )}

        {/* HUB 5: REMEDIES, CONSULTATION & DOSSIER */}
        {activeSubTool === 'consultation' && (
          <AiConsultationView kundliData={kundliData} t={t} lang={lang} />
        )}

        {activeSubTool === 'gemstones' && (
          <GemstonesView kundliData={kundliData} t={t} lang={lang} />
        )}

        {activeSubTool === 'print' && (
          <PrintableReport kundliData={kundliData} formData={formData} birthDate={birthDateObj} t={t} lang={lang} />
        )}
      </div>
    </div>
  );
}
