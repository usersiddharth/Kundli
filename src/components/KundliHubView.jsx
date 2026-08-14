import React, { useState, useMemo, lazy, Suspense } from 'react';
import ChartSVG from './ChartSVG.jsx';
import ZodiacWheel from './ZodiacWheel.jsx';
import BasicDetails from './BasicDetails.jsx';
import ProfileForm from './ProfileForm.jsx';
import PlanetaryTable from './PlanetaryTable.jsx';
import CosmicLoader from './CosmicLoader.jsx';

// Code-split dynamic sub-tool views
const ShadbalaView = lazy(() => import('./ShadbalaView.jsx'));
const DivisionalChartsView = lazy(() => import('./DivisionalChartsView.jsx'));
const KpView = lazy(() => import('./KpView.jsx'));
const AiConsultationView = lazy(() => import('./AiConsultationView.jsx'));
const ParivartanView = lazy(() => import('./ParivartanView.jsx'));
const YogasView = lazy(() => import('./YogasView.jsx'));
const AspectsView = lazy(() => import('./AspectsView.jsx'));
const AshtakvargaView = lazy(() => import('./AshtakvargaView.jsx'));
const GemstonesView = lazy(() => import('./GemstonesView.jsx'));
const VarshphalView = lazy(() => import('./VarshphalView.jsx'));
const DashaView = lazy(() => import('./DashaView.jsx'));
const DoshaReport = lazy(() => import('./DoshaReport.jsx'));
const TransitView = lazy(() => import('./TransitView.jsx'));
const VedicClockView = lazy(() => import('./VedicClockView.jsx'));
const JaiminiView = lazy(() => import('./JaiminiView.jsx'));
const EventMuhurtaView = lazy(() => import('./EventMuhurtaView.jsx'));
const LifeGraphView = lazy(() => import('./LifeGraphView.jsx'));
const FamilyComparisonView = lazy(() => import('./FamilyComparisonView.jsx'));
const MedicalAstroView = lazy(() => import('./MedicalAstroView.jsx'));
const PrashnaView = lazy(() => import('./PrashnaView.jsx'));
const CareerD10View = lazy(() => import('./CareerD10View.jsx'));
const LalKitabView = lazy(() => import('./LalKitabView.jsx'));
const JapaMalaView = lazy(() => import('./JapaMalaView.jsx'));
const AstrocartographyView = lazy(() => import('./AstrocartographyView.jsx'));
const KalsarpaDeepView = lazy(() => import('./KalsarpaDeepView.jsx'));
const GemstoneMuhurtaView = lazy(() => import('./GemstoneMuhurtaView.jsx'));
const KpSignificatorsView = lazy(() => import('./KpSignificatorsView.jsx'));
const DailyTransitFeedView = lazy(() => import('./DailyTransitFeedView.jsx'));
const SocialStoryCardView = lazy(() => import('./SocialStoryCardView.jsx'));
const PrintableReport = lazy(() => import('./PrintableReport.jsx'));
const UpcomingEventsView = lazy(() => import('./UpcomingEventsView.jsx'));
const RashifalView = lazy(() => import('./RashifalView.jsx'));

import {
  Compass,
  Orbit,
  Table,
  ShieldCheck,
  Layers,
  Key,
  Sparkles,
  Repeat,
  Crown,
  Eye,
  Grid,
  Clock,
  Gem,
  Sun,
  ShieldAlert,
  Activity,
  Printer,
  Search,
  User,
  TrendingUp,
  Calendar,
  Users,
  HeartPulse,
  HelpCircle,
  Briefcase,
  BookOpen,
  Globe,
  Share2,
} from 'lucide-react';

export default function KundliHubView({
  kundliData,
  formData,
  setFormData,
  generateKundli,
  birthDateObj,
  t,
  lang,
}) {
  const [activeHub, setActiveHub] = useState('core'); // 'core' | 'planets' | 'timing' | 'yogas' | 'remedies'
  const [activeSubTool, setActiveSubTool] = useState('details');
  const [searchQuery, setSearchQuery] = useState('');

  // 5 Thematic Clusters Definition
  const HUB_DEFINITIONS = useMemo(
    () => [
      {
        id: 'core',
        title: { gu: 'મૂળ કુંડળી', hi: 'मूल कुण्डली', en: 'Core Charts' },
        subtitle: {
          gu: 'જન્મ વિગત & ચાર્ટ',
          hi: 'जन्म विवरण एवं चक्र',
          en: 'Birth Details & Wheel',
        },
        icon: Compass,
        badge: 'D1 & D9',
        defaultTool: 'details',
        tools: [
          {
            id: 'details',
            label: {
              gu: 'જન્મ વિગત & લગ્ન ચાર્ટ',
              hi: 'जन्म विवरण एवं लग्न चक्र',
              en: 'Birth & Lagna Chart',
            },
            icon: Compass,
          },
          {
            id: 'wheel',
            label: { gu: '૩૬૦° રાશિ ચક્ર', hi: '३६०° राशि चक्र', en: '360° Zodiac Wheel' },
            icon: Orbit,
          },
          {
            id: 'astrocartography',
            label: {
              gu: 'એસ્ટ્રોકાર્ટોગ્રાફી વિશ્વ નકશો',
              hi: 'એસ્ટ્રોકાર્ટોગ્રાફી વિશ્વ मानचित्र',
              en: 'AstroCartography World Map',
            },
            icon: Globe,
          },
          {
            id: 'socialStory',
            label: {
              gu: 'સોશિયલ મીડિયા સ્ટોરી ગ્રાફિક',
              hi: 'सोशल मीडिया स्टोरी कार्ड',
              en: 'Social Story Card Generator',
            },
            icon: Share2,
          },
          {
            id: 'familyComparison',
            label: {
              gu: 'કુટુંબ કુંડળી સરખામણી',
              hi: 'पारिवारिक कुंडली तुलना',
              en: 'Family Comparison',
            },
            icon: Users,
          },
          {
            id: 'profile',
            label: {
              gu: 'જાતક પ્રોફાઇલ ફેરફાર',
              hi: 'जातक प्रोफाइल संपादन',
              en: 'Edit Birth Profile',
            },
            icon: User,
          },
        ],
      },
      {
        id: 'planets',
        title: {
          gu: 'ગ્રહ બળ & શારીરિક સ્થિતિ',
          hi: 'ग्रह बल एवं चिकित्सा',
          en: 'Planetary Strengths & Health',
        },
        subtitle: {
          gu: 'ષડ્બળ, આયુર્વેદિક મેડિકલ, અષ્ટકવર્ગ',
          hi: 'षड्बल, मेडिकल एस्ट्रोलॉजी, अष्टकवर्ग',
          en: 'Shadbala, Medical Astro & Aspects',
        },
        icon: Table,
        badge: '૬-બળ',
        defaultTool: 'planets',
        tools: [
          {
            id: 'planets',
            label: {
              gu: 'ગ્રહ સ્પષ્ટ કોષ્ટક',
              hi: 'ग्रह स्पष्ट तालिका',
              en: 'Planetary Table',
            },
            icon: Table,
          },
          {
            id: 'medical',
            label: {
              gu: 'આયુર્વેદિક મેડિકલ એસ્ટ્રોલોજી',
              hi: 'आयुर्वेदिक मेडिकल एस्ट्रोलॉजी',
              en: 'Ayurvedic Medical Astro',
            },
            icon: HeartPulse,
          },
          {
            id: 'shadbala',
            label: {
              gu: 'ષડ્બળ ૬-સ્તરીય તાકાત',
              hi: 'षड्बल सामर्थ्य',
              en: 'Shadbala Strengths',
            },
            icon: ShieldCheck,
          },
          {
            id: 'ashtakvarga',
            label: {
              gu: 'સર્વાષ્ટકવર્ગ બિંદુ',
              hi: 'सर्वाष्टकवर्ग चक्र',
              en: 'Sarvashtakvarga',
            },
            icon: Grid,
          },
          {
            id: 'aspects',
            label: {
              gu: 'ગ્રહ દૃષ્ટિ સંબંધ',
              hi: 'ग्रह दृष्टि संबंध',
              en: 'Planetary Aspects',
            },
            icon: Eye,
          },
        ],
      },
      {
        id: 'timing',
        title: {
          gu: 'દશા, પ્રશ્ન & ગોચર ભવિષ્ય',
          hi: 'दशा, प्रश्न एवं गोचर',
          en: 'Timing & Predictions',
        },
        subtitle: {
          gu: 'દશા, દૈનિક ગોચર, પ્રશ્ન કુંડળી, મુહૂર્ત',
          hi: 'दशा, दैनिक गोचर, प्रश्न कुंडली, मुहूर्त',
          en: 'Dasha, Daily Feed, Prashna & Transits',
        },
        icon: Clock,
        badge: 'લાઈવ દશા',
        defaultTool: 'dasha',
        tools: [
          {
            id: 'dasha',
            label: {
              gu: '૫-સ્તરીય વિંશોત્તરી દશા (સૂક્ષ્મ-પ્રાણ)',
              hi: '५-स्तरीय विंशोत्तरी दशा',
              en: '5-Tier Dasha (Micro)',
            },
            icon: Clock,
          },
          {
            id: 'dailyFeed',
            label: {
              gu: 'દૈનિક પર્સનલાઇઝ્ડ ગોચર ફિડ',
              hi: 'दैनिक व्यक्तिगत गोचर फीड',
              en: 'Daily Personal Transit Feed',
            },
            icon: Activity,
          },
          {
            id: 'prashna',
            label: {
              gu: 'તાત્કાલિક પ્રશ્ન કુંડળી',
              hi: 'तत्काल प्रश्न कुंडली',
              en: 'Instant Prashna Horary',
            },
            icon: HelpCircle,
          },
          {
            id: 'lifeGraph',
            label: {
              gu: '૧૨૦ વર્ષનું જીવન આલેખ',
              hi: '१२०-वर्षीय जीवन आलेख',
              en: '120-Year Life Graph',
            },
            icon: TrendingUp,
          },
          {
            id: 'eventMuhurta',
            label: {
              gu: 'વ્યક્તિગત શ્રેષ્ઠ મુહૂર્ત શોધો',
              hi: 'व्यक्तिगत शुभ मुहूर्त खोज',
              en: 'Event Muhurta Finder',
            },
            icon: Calendar,
          },
          {
            id: 'vedicClock',
            label: {
              gu: 'વૈદિક ઘડિયાળ & કાળ ચક્ર',
              hi: 'वैदिक घड़ी व काल चक्र',
              en: 'Vedic Clock & Kaal Chakra',
            },
            icon: Clock,
          },
          {
            id: 'transits',
            label: {
              gu: 'રીઅલ-ટાઇમ ગોચર પરિભ્રમણ',
              hi: 'वर्तमान गोचर स्थिति',
              en: 'Real-Time Transits',
            },
            icon: Activity,
          },
          {
            id: 'upcomingEvents',
            label: {
              gu: 'આગામી ગ્રહીય ઘટનાઓ & ગોચર',
              hi: 'आगामी ग्रहीय घटनाएं एवं गोचर',
              en: 'Upcoming Planetary Events',
            },
            icon: Orbit,
          },
          {
            id: 'rashifal',
            label: {
              gu: 'રાશિ ભવિષ્ય (દૈનિક/સાપ્તાહિક/વાર્ષિક)',
              hi: 'राशिफल (दैनिक/साप्ताहिक/वार्षिक)',
              en: 'Rashifal (Daily/Weekly/Yearly)',
            },
            icon: Sparkles,
          },
          {
            id: 'varshphal',
            label: {
              gu: 'તાજિક વર્ષફળ & મુન્થા',
              hi: 'ताजिक वर्षफल एवं मुंथा',
              en: 'Tajik Varshphal',
            },
            icon: Sun,
          },
        ],
      },
      {
        id: 'yogas',
        title: {
          gu: 'યોગ, D10, KP & કાલસર્પ',
          hi: 'योग, D10, KP व कालसर्प',
          en: 'Yogas, D10, KP & Kalsarpa',
        },
        subtitle: {
          gu: 'રાજયોગ, ૧૨ કાલસર્પ, KP ૪-સ્તરીય, D10',
          hi: 'રાજયોગ, १२ कालसर्प, KP ४-स्तरीय',
          en: 'Rajayogas, 12 Kalsarpa, KP 4-Step',
        },
        icon: Crown,
        badge: 'રાજયોગ',
        defaultTool: 'yogas',
        tools: [
          {
            id: 'yogas',
            label: {
              gu: 'મુખ્ય સક્રિય રાજયોગ',
              hi: 'સક્રિય શુભ રાજયોગ',
              en: 'Major Rajayogas',
            },
            icon: Crown,
          },
          {
            id: 'kalsarpaDeep',
            label: {
              gu: '૧૨ કાલસર્પ યોગ વિશેષ વિશ્લેષણ',
              hi: '१२ कालसर्प योग विश्लेषण',
              en: '12 Kalsarpa Deep Analysis',
            },
            icon: ShieldAlert,
          },
          {
            id: 'kpSignificators',
            label: {
              gu: 'KP ૪-સ્તરીય કારકતા કોષ્ટક',
              hi: 'KP ४-स्तरीय कारकता तालिका',
              en: 'KP 4-Step Significators',
            },
            icon: Key,
          },
          {
            id: 'careerD10',
            label: {
              gu: 'D10 દશમાંશ કારકિર્દી ચાર્ટ',
              hi: 'D10 दशमांश करियर चार्ट',
              en: 'D10 Career Blueprint',
            },
            icon: Briefcase,
          },
          {
            id: 'jaimini',
            label: {
              gu: 'જૈમિની જ્યોતિષ & ચર દશા',
              hi: 'जैमिनी ज्योतिष व चर दशा',
              en: 'Jaimini & Chara Dasha',
            },
            icon: Crown,
          },
          {
            id: 'doshas',
            label: {
              gu: 'દોષ વિશ્લેષણ (મંગળ, કાલસર્પ, સાડાસાતી)',
              hi: 'दोष विश्लेषण',
              en: 'Dosha Audits',
            },
            icon: ShieldAlert,
          },
          {
            id: 'parivartan',
            label: {
              gu: 'પરિવર્તન યોગ (ગૃહ વિનિમય)',
              hi: 'परिवर्तन योग',
              en: 'Parivartan Yogas',
            },
            icon: Repeat,
          },
          {
            id: 'vargas',
            label: {
              gu: 'ષોડશવર્ગ ચાર્ટ્સ (D1 થી D60)',
              hi: 'षोडशवर्ग (D1 - D60)',
              en: 'Divisional Charts',
            },
            icon: Layers,
          },
          {
            id: 'kp',
            label: {
              gu: 'કૃષ્ણમૂર્તિ પદ્ધતિ (KP સિસ્ટમ)',
              hi: 'केपी नक्षत्र ज्योतिष',
              en: 'KP Astrology',
            },
            icon: Key,
          },
        ],
      },
      {
        id: 'remedies',
        title: {
          gu: 'ઉપાય, રત્ન વિધિ & લાલ કિતાબ',
          hi: 'उपाय, रत्न विधि व लाल किताब',
          en: 'Remedies, Gem Rituals & Lal Kitab',
        },
        subtitle: {
          gu: 'રત્ન મુહૂર્ત, લાલ કિતાબ, ૧૦૮ જાપ માળા',
          hi: 'रत्न मुहूर्त, लाल किताब, १०८ जाप',
          en: 'Gemstone Rituals & Lal Kitab',
        },
        icon: Sparkles,
        badge: 'PDF Dossier',
        defaultTool: 'consultation',
        tools: [
          {
            id: 'gemstoneMuhurta',
            label: {
              gu: 'રત્ન ધારણ મુહૂર્ત & પ્રાણ પ્રતિષ્ઠા',
              hi: 'रत्न धारण मुहूर्त व विधि',
              en: 'Gemstone Rituals & Muhurta',
            },
            icon: Gem,
          },
          {
            id: 'lalkitab',
            label: {
              gu: 'લાલ કિતાબ ઉપાય & ઋણ',
              hi: 'लाल किताब उपाय व ऋण',
              en: 'Lal Kitab Remedies',
            },
            icon: BookOpen,
          },
          {
            id: 'japaMala',
            label: {
              gu: '૧૦૮ મંત્ર જાપ માળા કૌન્ટર',
              hi: '१०८ मंत्र जाप माला काउंटर',
              en: '108 Japa Mala Counter',
            },
            icon: Sparkles,
          },
          {
            id: 'consultation',
            label: {
              gu: 'AI સંદર્ભિત જ્યોતિષ પરામર્શ',
              hi: 'ज्योतिष परामर्श व प्रश्नोत्तर',
              en: 'AI Vedic Consultation',
            },
            icon: Sparkles,
          },
          {
            id: 'gemstones',
            label: {
              gu: 'શુભ રત્ન & જૈમિની કારક',
              hi: 'भाग्य रत्न एवं कारक',
              en: 'Lucky Gemstones & Karakas',
            },
            icon: Gem,
          },
          {
            id: 'print',
            label: {
              gu: 'સંપૂર્ણ કુંડળી PDF પ્રિન્ટ (A4)',
              hi: 'सम्पूर्ण कुण्डली प्रिंट',
              en: 'Save Full Dossier PDF',
            },
            icon: Printer,
          },
        ],
      },
    ],
    []
  );

  // Quick Direct Search Lookup across all tools
  const allToolsFlat = useMemo(() => {
    return HUB_DEFINITIONS.flatMap((hub) =>
      hub.tools.map((tool) => ({
        hubId: hub.id,
        toolId: tool.id,
        label: tool.label[lang] || tool.label.gu,
        hubTitle: hub.title[lang] || hub.title.gu,
        icon: tool.icon,
      }))
    );
  }, [HUB_DEFINITIONS, lang]);

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allToolsFlat.filter(
      (t) => t.label.toLowerCase().includes(q) || t.hubTitle.toLowerCase().includes(q)
    );
  }, [allToolsFlat, searchQuery]);

  const activeHubObj = HUB_DEFINITIONS.find((h) => h.id === activeHub) || HUB_DEFINITIONS[0];

  return (
    <div className="space-y-6">
      {/* -----------------------------------------------------------------
          1. TOP NAVIGATION: 5 THEMATIC HUB CARDS (Tabs)
          ----------------------------------------------------------------- */}
      <div className="space-y-3">
        {/* Search Bar across all tools */}
        <div className="relative w-full max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools or features (e.g. Dasha, Rajayoga, Gemstone, Clock)..."
            className="w-full glass-input rounded-2xl pl-10 pr-4 py-2.5 text-xs font-medium focus:outline-hidden"
          />
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[var(--text-muted)]" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-gold)]"
            >
              ✕
            </button>
          )}

          {/* Quick Search Dropdown */}
          {filteredTools.length > 0 && (
            <div className="absolute left-0 right-0 top-12 z-50 glass-panel rounded-2xl border border-[var(--border-subtle)] shadow-2xl overflow-hidden max-h-60 overflow-y-auto divide-y divide-[var(--border-subtle)]">
              {filteredTools.map((tool, idx) => {
                const ToolIcon = tool.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveHub(tool.hubId);
                      setActiveSubTool(tool.toolId);
                      setSearchQuery('');
                    }}
                    className="w-full p-3 text-left hover:bg-[var(--bg-card-hover)] transition flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2.5">
                      <ToolIcon className="h-4 w-4 text-[var(--text-gold)]" />
                      <span className="text-xs font-bold text-[var(--text-primary)]">
                        {tool.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-serif text-[var(--text-muted)] bg-[var(--bg-pill)] px-2 py-0.5 rounded-md border border-[var(--border-subtle)]">
                      {tool.hubTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 5 Hub Cards Grid */}
        <div
          role="tablist"
          aria-label="Astrological Hub Clusters"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
        >
          {HUB_DEFINITIONS.map((hub) => {
            const HubIcon = hub.icon;
            const isSelected = activeHub === hub.id;

            return (
              <button
                key={hub.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setActiveHub(hub.id);
                  setActiveSubTool(hub.defaultTool);
                }}
                className={`p-3.5 rounded-2xl flex flex-col justify-between text-left transition duration-200 border ${
                  isSelected
                    ? 'glass-panel-accent border-[var(--chart-line-selected)] ring-2 ring-[var(--border-gold)] shadow-md'
                    : 'glass-card hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-xl ${
                      isSelected ? 'glass-button-primary' : 'glass-pill text-[var(--text-gold)]'
                    }`}
                  >
                    <HubIcon className="h-4 w-4" />
                  </div>
                  <span className="glass-badge-gold text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {hub.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xs font-bold text-[var(--text-primary)] line-clamp-1">
                    {hub.title[lang] || hub.title.gu}
                  </h3>
                  <p className="text-[10px] text-[var(--text-muted)] line-clamp-1 mt-0.5">
                    {hub.subtitle[lang] || hub.subtitle.gu}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* -----------------------------------------------------------------
          2. SUB-TOOL SECONDARY NAVIGATION RIBBON
          ----------------------------------------------------------------- */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1 border-b border-[var(--border-subtle)]">
        {activeHubObj.tools.map((tool) => {
          const ToolIcon = tool.icon;
          const isSelected = activeSubTool === tool.id;

          return (
            <button
              key={tool.id}
              onClick={() => setActiveSubTool(tool.id)}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                isSelected
                  ? 'glass-button-primary shadow-xs'
                  : 'glass-card text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <ToolIcon className="h-3.5 w-3.5" />
              <span>{tool.label[lang] || tool.label.gu}</span>
            </button>
          );
        })}
      </div>

      {/* -----------------------------------------------------------------
          3. ACTIVE SUB-TOOL RENDER SECTION WITH LAZY SUSPENSE
          ----------------------------------------------------------------- */}
      <Suspense fallback={<CosmicLoader />}>
        <div className="space-y-6">
          {/* HUB 1: CORE CHARTS - DUAL GRAPHICAL HERO SHOWCASE */}
          {activeSubTool === 'details' && (
            <div className="space-y-6">
              {/* 1. Dual Centerpiece: North/South Indian Kundli Chart + 360° Zodiac Wheel */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartSVG kundliData={kundliData} t={t} lang={lang} />
                <ZodiacWheel kundliData={kundliData} t={t} lang={lang} />
              </div>

              {/* 2. Below Hero: 12-Card Avakahada Grid */}
              <BasicDetails kundliData={kundliData} formData={formData} t={t} lang={lang} />

              {/* 3. Planetary Positions Table */}
              <PlanetaryTable kundliData={kundliData} t={t} lang={lang} />
            </div>
          )}

          {activeSubTool === 'wheel' && <ZodiacWheel kundliData={kundliData} t={t} lang={lang} />}

          {activeSubTool === 'astrocartography' && (
            <AstrocartographyView kundliData={kundliData} t={t} lang={lang} />
          )}

          {activeSubTool === 'socialStory' && (
            <SocialStoryCardView kundliData={kundliData} formData={formData} t={t} lang={lang} />
          )}

          {activeSubTool === 'familyComparison' && (
            <FamilyComparisonView kundliData={kundliData} formData={formData} t={t} lang={lang} />
          )}

          {activeSubTool === 'profile' && (
            <ProfileForm
              formData={formData}
              setFormData={setFormData}
              onGenerate={generateKundli}
              t={t}
              lang={lang}
            />
          )}

          {/* HUB 2: PLANETARY STRENGTHS */}
          {activeSubTool === 'planets' && (
            <PlanetaryTable kundliData={kundliData} t={t} lang={lang} />
          )}

          {activeSubTool === 'medical' && (
            <MedicalAstroView kundliData={kundliData} t={t} lang={lang} />
          )}

          {activeSubTool === 'shadbala' && (
            <ShadbalaView kundliData={kundliData} t={t} lang={lang} />
          )}

          {activeSubTool === 'ashtakvarga' && (
            <AshtakvargaView kundliData={kundliData} t={t} lang={lang} />
          )}

          {activeSubTool === 'aspects' && <AspectsView kundliData={kundliData} t={t} />}

          {/* HUB 3: TIMING & PREDICTIONS */}
          {activeSubTool === 'dasha' && (
            <DashaView kundliData={kundliData} birthDate={birthDateObj} t={t} lang={lang} />
          )}

          {activeSubTool === 'dailyFeed' && (
            <DailyTransitFeedView kundliData={kundliData} t={t} lang={lang} />
          )}

          {activeSubTool === 'prashna' && <PrashnaView t={t} lang={lang} />}

          {activeSubTool === 'lifeGraph' && (
            <LifeGraphView kundliData={kundliData} birthDate={birthDateObj} t={t} lang={lang} />
          )}

          {activeSubTool === 'eventMuhurta' && <EventMuhurtaView t={t} lang={lang} />}

          {activeSubTool === 'vedicClock' && <VedicClockView t={t} lang={lang} />}

          {activeSubTool === 'transits' && (
            <TransitView kundliData={kundliData} t={t} lang={lang} />
          )}

          {activeSubTool === 'upcomingEvents' && (
            <UpcomingEventsView kundliData={kundliData} t={t} lang={lang} />
          )}

          {activeSubTool === 'rashifal' && (
            <RashifalView kundliData={kundliData} t={t} lang={lang} />
          )}

          {activeSubTool === 'varshphal' && (
            <VarshphalView kundliData={kundliData} birthDate={birthDateObj} t={t} lang={lang} />
          )}

          {/* HUB 4: YOGAS, D10, KP & KALSARPA */}
          {activeSubTool === 'yogas' && <YogasView kundliData={kundliData} t={t} lang={lang} />}

          {activeSubTool === 'kalsarpaDeep' && (
            <KalsarpaDeepView kundliData={kundliData} t={t} lang={lang} />
          )}

          {activeSubTool === 'kpSignificators' && (
            <KpSignificatorsView kundliData={kundliData} t={t} lang={lang} />
          )}

          {activeSubTool === 'careerD10' && (
            <CareerD10View kundliData={kundliData} t={t} lang={lang} />
          )}

          {activeSubTool === 'jaimini' && (
            <JaiminiView kundliData={kundliData} birthDateObj={birthDateObj} t={t} lang={lang} />
          )}

          {activeSubTool === 'doshas' && <DoshaReport kundliData={kundliData} t={t} lang={lang} />}

          {activeSubTool === 'parivartan' && (
            <ParivartanView kundliData={kundliData} t={t} lang={lang} />
          )}

          {activeSubTool === 'vargas' && (
            <DivisionalChartsView kundliData={kundliData} t={t} lang={lang} />
          )}

          {activeSubTool === 'kp' && <KpView kundliData={kundliData} t={t} />}

          {/* HUB 5: REMEDIES, GEM RITUALS & LAL KITAB */}
          {activeSubTool === 'gemstoneMuhurta' && (
            <GemstoneMuhurtaView kundliData={kundliData} t={t} lang={lang} />
          )}

          {activeSubTool === 'lalkitab' && (
            <LalKitabView kundliData={kundliData} t={t} lang={lang} />
          )}

          {activeSubTool === 'japaMala' && <JapaMalaView t={t} lang={lang} />}

          {activeSubTool === 'consultation' && (
            <AiConsultationView kundliData={kundliData} t={t} lang={lang} />
          )}

          {activeSubTool === 'gemstones' && (
            <GemstonesView kundliData={kundliData} t={t} lang={lang} />
          )}

          {activeSubTool === 'print' && (
            <PrintableReport kundliData={kundliData} formData={formData} t={t} lang={lang} />
          )}
        </div>
      </Suspense>
    </div>
  );
}
