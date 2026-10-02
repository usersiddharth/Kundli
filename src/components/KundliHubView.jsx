import React, { useState, useMemo, lazy, Suspense } from 'react';
import { Button, Card, Chip } from '@heroui/react';
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
  SlidersHorizontal,
  ArrowLeft,
  X,
} from 'lucide-react';

export default function KundliHubView({
  kundliData,
  formData,
  setFormData,
  generateKundli,
  birthDateObj,
  t,
  lang,
  onOpenVault,
}) {
  // Core Essential Tab: 'chart' | 'planets' | 'dasha' | 'doshas'
  const [coreTab, setCoreTab] = useState('chart');

  // Advanced Tool Mode (null = viewing essential tabs, string = viewing specific advanced tool)
  const [advancedTool, setAdvancedTool] = useState(null);

  // Advanced Tools Catalog Modal / Drawer State
  const [isToolsModalOpen, setIsToolsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 4 Core Essential Tabs
  const CORE_TABS = [
    {
      id: 'chart',
      label:
        lang === 'gu' ? 'ચાર્ટ & જન્મ વિગત' : lang === 'hi' ? 'चक्र एवं विवरण' : 'Chart & details',
      icon: Compass,
    },
    {
      id: 'planets',
      label:
        lang === 'gu'
          ? 'ગ્રહ સ્પષ્ટ સ્થિતિ'
          : lang === 'hi'
            ? 'ग्रह स्पष्ट'
            : 'Planetary positions',
      icon: Table,
    },
    {
      id: 'dasha',
      label:
        lang === 'gu' ? 'વિંશોત્તરી દશા' : lang === 'hi' ? 'विंशोत्तरी दशा' : 'Vimshottari dasha',
      icon: Clock,
    },
    {
      id: 'doshas',
      label: lang === 'gu' ? 'દોષ & ઉપાય' : lang === 'hi' ? 'दोष एवं उपाय' : 'Doshas & remedies',
      icon: ShieldCheck,
    },
  ];

  // Advanced Vedic Tools Categorized
  const ADVANCED_CATEGORIES = useMemo(
    () => [
      {
        id: 'divisional',
        title:
          lang === 'gu' ? 'વર્ગ ચાર્ટ્સ' : lang === 'hi' ? 'वर्ग कुण्डली' : 'Divisional Charts',
        tools: [
          {
            id: 'vargas',
            label:
              lang === 'gu'
                ? 'D1 થી D60 ષોડશવર્ગ ચાર્ટ્સ'
                : lang === 'hi'
                  ? 'षोडशवर्ग (D1 - D60)'
                  : 'Divisional Charts (D1-D60)',
            desc:
              lang === 'gu'
                ? 'નવાંશ, દશમાંશ, ષોડશાંશ સહિત ૧૬ ચાર્ટ્સ'
                : lang === 'hi'
                  ? 'समस्त वर्ग चक्र'
                  : 'Complete 16 varga charts',
            icon: Layers,
          },
          {
            id: 'careerD10',
            label:
              lang === 'gu'
                ? 'D10 દશમાંશ કારકિર્દી ચાર્ટ'
                : lang === 'hi'
                  ? 'D10 दशमांश करियर'
                  : 'D10 Career Blueprint',
            desc:
              lang === 'gu'
                ? 'વ્યવસાય, નોકરી અને પ્રતિષ્ઠા વિશ્લેષણ'
                : lang === 'hi'
                  ? 'आजीविका एवं यश'
                  : 'Profession & Status Analysis',
            icon: Briefcase,
          },
          {
            id: 'wheel',
            label:
              lang === 'gu'
                ? '૩૬૦° રાશિ ચક્ર વ્હીલ'
                : lang === 'hi'
                  ? '३६०° राशि चक्र'
                  : '360° Zodiac Wheel',
            desc:
              lang === 'gu'
                ? 'ગોળાકાર રાશિ અને નક્ષત્ર વ્હીલ'
                : lang === 'hi'
                  ? 'वृत्ताकार चक्र'
                  : 'Circular Western & Vedic wheel',
            icon: Orbit,
          },
        ],
      },
      {
        id: 'systems',
        title:
          lang === 'gu'
            ? 'વિશેષ જ્યોતિષ પદ્ધતિ'
            : lang === 'hi'
              ? 'विशेष ज्योतिष पद्धति'
              : 'Special Astrological Systems',
        tools: [
          {
            id: 'kp',
            label:
              lang === 'gu'
                ? 'કૃષ્ણમૂર્તિ પદ્ધતિ (KP સિસ્ટમ)'
                : lang === 'hi'
                  ? 'केपी नक्षत्र ज्योतिष'
                  : 'KP Astrology System',
            desc:
              lang === 'gu'
                ? 'નક્ષત્ર લોર્ડ, સબ-લોર્ડ અને કસ્પ્સ'
                : lang === 'hi'
                  ? 'कस्प व सब-लॉर्ड'
                  : 'Star lords, Sub-lords & Cusps',
            icon: Key,
          },
          {
            id: 'kpSignificators',
            label:
              lang === 'gu'
                ? 'KP ૪-સ્તરીય કારકતા કોષ્ટક'
                : lang === 'hi'
                  ? 'KP ४-स्तरीय तालिका'
                  : 'KP 4-Step Significators',
            desc:
              lang === 'gu'
                ? 'ભાવ અને ગ્રહ કારકત્વ વિશ્લેષણ'
                : lang === 'hi'
                  ? 'कारक विश्लेषण'
                  : 'House & Planet Significators',
            icon: Key,
          },
          {
            id: 'jaimini',
            label:
              lang === 'gu'
                ? 'જૈમિની જ્યોતિષ & ચર દશા'
                : lang === 'hi'
                  ? 'जैमिनी ज्योतिष'
                  : 'Jaimini & Chara Dasha',
            desc:
              lang === 'gu'
                ? 'આત્મકારક, અમાત્યકારક અને પદ લગ્ન'
                : lang === 'hi'
                  ? 'कारकांश एवं चर दशा'
                  : 'Karakas & Sign-based Dasha',
            icon: Crown,
          },
          {
            id: 'varshphal',
            label:
              lang === 'gu'
                ? 'તાજિક વર્ષફળ & મુન્થા'
                : lang === 'hi'
                  ? 'ताजिक वर्षफल'
                  : 'Tajik Varshphal (Annual)',
            desc:
              lang === 'gu'
                ? 'વાર્ષિક કુંડળી, મુન્થા અને ત્રિભાગી દશા'
                : lang === 'hi'
                  ? 'वार्षिक कुंडली'
                  : 'Annual Solar Return Chart',
            icon: Sun,
          },
          {
            id: 'lalkitab',
            label:
              lang === 'gu'
                ? 'લાલ કિતાબ ઉપાય & ઋણ'
                : lang === 'hi'
                  ? 'लाल किताब उपाय'
                  : 'Lal Kitab Remedies',
            desc:
              lang === 'gu'
                ? 'પિતૃ ઋણ, અંધા તેવા અને સચોટ ટોટકા'
                : lang === 'hi'
                  ? 'ऋण एवं सरल उपाय'
                  : 'Karmic Debts & Easy Remedies',
            icon: BookOpen,
          },
        ],
      },
      {
        id: 'analytics',
        title:
          lang === 'gu'
            ? 'ગ્રહ બળ & ઊંડાણપૂર્વક વિશ્લેષણ'
            : lang === 'hi'
              ? 'ग्रह बल एवं विश्लेषण'
              : 'Planetary Strengths & Analytics',
        tools: [
          {
            id: 'shadbala',
            label:
              lang === 'gu'
                ? 'ષડ્બળ ૬-સ્તરીય તાકાત'
                : lang === 'hi'
                  ? 'षड्बल सामर्थ्य'
                  : 'Shadbala 6-Fold Strength',
            desc:
              lang === 'gu'
                ? 'સ્થાન, દિગ્, કાલ, ચેષ્ટા, નૈસર્ગિક અને દૃગ્ બળ'
                : lang === 'hi'
                  ? 'षड्बल गणना'
                  : 'Complete 6-fold planetary strength',
            icon: ShieldCheck,
          },
          {
            id: 'ashtakvarga',
            label:
              lang === 'gu'
                ? 'સર્વાષ્ટકવર્ગ બિંદુ'
                : lang === 'hi'
                  ? 'सर्वाष्टकवर्ग चक्र'
                  : 'Sarvashtakvarga Points',
            desc:
              lang === 'gu'
                ? '૩૩૭ બિંદુ ચક્ર અને કક્ષા ગોચર'
                : lang === 'hi'
                  ? 'बिंदु तालिका'
                  : 'Bhinna & Sarvashtakvarga Tables',
            icon: Grid,
          },
          {
            id: 'aspects',
            label:
              lang === 'gu'
                ? 'ગ્રહ દૃષ્ટિ સંબંધ'
                : lang === 'hi'
                  ? 'ग्रह दृष्टि'
                  : 'Planetary Aspects & Drishti',
            desc:
              lang === 'gu'
                ? 'વિશેષ દૃષ્ટિ (મંગળ, ગુરુ, શનિ) અને સંયોગ'
                : lang === 'hi'
                  ? 'दृष्टि संबंध'
                  : 'Mutual aspects and conjunctions',
            icon: Eye,
          },
          {
            id: 'parivartan',
            label:
              lang === 'gu'
                ? 'પરિવર્તન યોગ (ગૃહ વિનિમય)'
                : lang === 'hi'
                  ? 'परिवर्तन योग'
                  : 'Parivartan Yogas',
            desc:
              lang === 'gu'
                ? 'મહા, દૈન્ય અને ખલ યોગ વિશ્લેષણ'
                : lang === 'hi'
                  ? 'गृह विनिमय'
                  : 'Mutual house exchange yogas',
            icon: Repeat,
          },
          {
            id: 'lifeGraph',
            label:
              lang === 'gu'
                ? '૧૨૦ વર્ષનું જીવન આલેખ'
                : lang === 'hi'
                  ? '१२०-वर्षीय जीवन आलेख'
                  : '120-Year Life Graph',
            desc:
              lang === 'gu'
                ? 'સમય અનુસાર જીવનની શુભ-અશુભ ગતિ'
                : lang === 'hi'
                  ? 'जीवन का उतार-चढ़ाव'
                  : 'Ups & downs score across lifetime',
            icon: TrendingUp,
          },
          {
            id: 'kalsarpaDeep',
            label:
              lang === 'gu'
                ? '૧૨ કાલસર્પ યોગ વિશેષ વિશ્લેષણ'
                : lang === 'hi'
                  ? 'कालसर्प विश्लेषण'
                  : '12 Kalsarpa Deep Analysis',
            desc:
              lang === 'gu'
                ? 'અનંતથી શેષનાગ સુધીના ૧૨ પ્રકાર અને શાંતિ'
                : lang === 'hi'
                  ? '१२ प्रकार व उपाय'
                  : '12 types of Kalsarpa & remedies',
            icon: ShieldAlert,
          },
          {
            id: 'medical',
            label:
              lang === 'gu'
                ? 'આયુર્વેદિક મેડિકલ એસ્ટ્રોલોજી'
                : lang === 'hi'
                  ? 'आयुर्वेदिक चिकित्सा'
                  : 'Ayurvedic Medical Astro',
            desc:
              lang === 'gu'
                ? 'વાત-પિત્ત-કફ પ્રકૃતિ અને શારીરિક અંગ બળ'
                : lang === 'hi'
                  ? 'त्रिदोष एवं स्वास्थ्य'
                  : 'Dosha constitution & health',
            icon: HeartPulse,
          },
        ],
      },
      {
        id: 'utilities',
        title:
          lang === 'gu'
            ? 'સાધનો, મુહૂર્ત & સેવાઓ'
            : lang === 'hi'
              ? 'मुहूर्त एवं अन्य सेवाएं'
              : 'Utilities, Muhurta & Consultation',
        tools: [
          {
            id: 'prashna',
            label:
              lang === 'gu'
                ? 'તાત્કાલિક પ્રશ્ન કુંડળી'
                : lang === 'hi'
                  ? 'तत्काल प्रश्न कुंडली'
                  : 'Instant Prashna Horary',
            desc:
              lang === 'gu'
                ? 'વર્તમાન ક્ષણના પ્રશ્નનો સચોટ ઉત્તર'
                : lang === 'hi'
                  ? 'प्रश्न ज्योतिष'
                  : 'Current moment horary chart',
            icon: HelpCircle,
          },
          {
            id: 'eventMuhurta',
            label:
              lang === 'gu'
                ? 'વ્યક્તિગત શ્રેષ્ઠ મુહૂર્ત શોધો'
                : lang === 'hi'
                  ? 'शुभ मुहूर्त खोज'
                  : 'Event Muhurta Finder',
            desc:
              lang === 'gu'
                ? 'લગ્ન, ગૃહ પ્રવેશ, વાહન, વેપાર મુહૂર્ત'
                : lang === 'hi'
                  ? 'कार्य सिद्धि मुहूर्त'
                  : 'Find auspicious timings for events',
            icon: Calendar,
          },
          {
            id: 'gemstoneMuhurta',
            label:
              lang === 'gu'
                ? 'રત્ન ધારણ મુહૂર્ત & પ્રાણ પ્રતિષ્ઠા'
                : lang === 'hi'
                  ? 'रत्न धारण विधि'
                  : 'Gemstone Rituals & Muhurta',
            desc:
              lang === 'gu'
                ? 'શુભ વાર, નક્ષત્ર અને મંત્ર જાપ વિધિ'
                : lang === 'hi'
                  ? 'रत्न प्रतिष्ठा'
                  : 'Rituals and timings to wear gems',
            icon: Gem,
          },
          {
            id: 'japaMala',
            label:
              lang === 'gu'
                ? '૧૦૮ મંત્ર જાપ માળા કૌન્ટર'
                : lang === 'hi'
                  ? '१०८ मंत्र जाप माला'
                  : '108 Japa Mala Counter',
            desc:
              lang === 'gu'
                ? 'નવગ્રહ બીજ મંત્ર અને જાપ સાધના'
                : lang === 'hi'
                  ? 'मंत्र जप'
                  : 'Interactive digital 108 japa counter',
            icon: Sparkles,
          },
          {
            id: 'astrocartography',
            label:
              lang === 'gu'
                ? 'એસ્ટ્રોકાર્ટોગ્રાફી વિશ્વ નકશો'
                : lang === 'hi'
                  ? 'एस्ट्रोकार्टोग्राफी'
                  : 'AstroCartography World Map',
            desc:
              lang === 'gu'
                ? 'વિશ્વભરમાં આપના અનુકૂળ શહેરો અને રેખાઓ'
                : lang === 'hi'
                  ? 'विश्व मानचित्र'
                  : 'Planetary power lines across the globe',
            icon: Globe,
          },
          {
            id: 'familyComparison',
            label:
              lang === 'gu'
                ? 'કુટુંબ કુંડળી સરખામણી'
                : lang === 'hi'
                  ? 'पारिवारिक तुलना'
                  : 'Family Chart Comparison',
            desc:
              lang === 'gu'
                ? 'પરિવારના સભ્યોની કુંડળી સરખામણી'
                : lang === 'hi'
                  ? 'कुंडली मिलान'
                  : 'Side-by-side family horoscopes',
            icon: Users,
          },
          {
            id: 'socialStory',
            label:
              lang === 'gu'
                ? 'સોશિયલ મીડિયા સ્ટોરી ગ્રાફિક'
                : lang === 'hi'
                  ? 'सोशल स्टोरी कार्ड'
                  : 'Social Story Card Generator',
            desc:
              lang === 'gu'
                ? 'ઇન્સ્ટાગ્રામ અને વ્હોટ્સએપ સ્ટોરી શેર'
                : lang === 'hi'
                  ? 'कार्ड शेयर'
                  : 'Export beautiful shareable image',
            icon: Share2,
          },
          {
            id: 'consultation',
            label:
              lang === 'gu'
                ? 'AI સંદર્ભિત જ્યોતિષ પરામર્શ'
                : lang === 'hi'
                  ? 'AI ज्योतिष परामर्श'
                  : 'AI Vedic Consultation',
            desc:
              lang === 'gu'
                ? 'કુંડળી આધારિત પ્રશ્નોત્તરી અને માર્ગદર્શન'
                : lang === 'hi'
                  ? 'परामर्श'
                  : 'Interactive AI birth chart insights',
            icon: Sparkles,
          },
          {
            id: 'profile',
            label:
              lang === 'gu'
                ? 'જાતક જન્મ વિગત ફેરફાર'
                : lang === 'hi'
                  ? 'जन्म विवरण संपादन'
                  : 'Edit Birth Details',
            desc:
              lang === 'gu'
                ? 'તારીખ, સમય અને શહેર બદલો'
                : lang === 'hi'
                  ? 'विवरण बदलें'
                  : 'Change date, time, or location',
            icon: User,
          },
          {
            id: 'print',
            label:
              lang === 'gu'
                ? 'સંપૂર્ણ કુંડળી PDF પ્રિન્ટ (A4)'
                : lang === 'hi'
                  ? 'सम्पूर्ण कुण्डली प्रिंट'
                  : 'Save Full Dossier PDF',
            desc:
              lang === 'gu'
                ? 'છપાઈ યોગ્ય વિગતવાર દસ્તાવેજ'
                : lang === 'hi'
                  ? 'पीडीएफ प्रिंट'
                  : 'High quality printable PDF format',
            icon: Printer,
          },
        ],
      },
    ],
    [lang]
  );

  // Flat tools list for search
  const allToolsFlat = useMemo(() => {
    return ADVANCED_CATEGORIES.flatMap((category) =>
      category.tools.map((tool) => ({
        ...tool,
        categoryTitle: category.title,
      }))
    );
  }, [ADVANCED_CATEGORIES]);

  // Search filtering
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allToolsFlat.filter(
      (t) =>
        t.label.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.categoryTitle.toLowerCase().includes(q)
    );
  }, [allToolsFlat, searchQuery]);

  const activeToolObj = allToolsFlat.find((t) => t.id === advancedTool);

  const handleSelectAdvancedTool = (toolId) => {
    setAdvancedTool(toolId);
    setIsToolsModalOpen(false);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCore = () => {
    setAdvancedTool(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-5">
      {/* -----------------------------------------------------------------
          TOP CONTROL BAR: 4 Core Tabs + "Advanced Vedic Tools" Button
          ----------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
        {/* Core Navigation Tabs or Back Breadcrumb */}
        {advancedTool ? (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              onPress={handleBackToCore}
              className="flex items-center gap-1.5 glass-button-primary px-3 py-1.5 text-xs font-bold rounded-xl cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>
                {lang === 'gu' ? 'મુખ્ય કુંડળી' : lang === 'hi' ? 'मुख्य कुण्डली' : 'Core Kundli'}
              </span>
            </Button>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)]">
              <span className="text-[var(--text-muted)]">/</span>
              <span className="font-serif text-[var(--text-gold)]">{activeToolObj?.label}</span>
            </div>
          </div>
        ) : (
          <div
            role="tablist"
            aria-label="Essential Kundli Sections"
            className="flex items-center rounded-xl glass-pill p-1 shadow-inner gap-1 overflow-x-auto no-scrollbar"
          >
            {CORE_TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = coreTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setCoreTab(tab.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all focus-visible:outline-hidden cursor-pointer ${
                    isSelected
                      ? 'glass-button-primary shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[#f3ece0]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Advanced Tools Trigger Button & Search */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            onPress={() => setIsToolsModalOpen(true)}
            className="w-full md:w-auto flex items-center justify-center gap-2 glass-card hover:border-[var(--border-gold)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] rounded-xl transition cursor-pointer"
          >
            <SlidersHorizontal className="h-4 w-4 text-[var(--text-gold)]" />
            <span>
              {lang === 'gu'
                ? 'વૈદિક વિશેષ ટૂલ્સ (30+ સાધનો)'
                : lang === 'hi'
                  ? 'वैदिक विशेष टूल्स'
                  : 'Advanced Vedic Tools'}
            </span>
            <Chip className="bg-[#faeee2] text-[#9c4b0f] text-[10px] px-2 py-0.5 font-mono border border-[#e8b992]/60">
              <Chip.Label>KP • D60 • ષડ્બળ</Chip.Label>
            </Chip>
          </Button>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          ADVANCED TOOLS MODAL / DRAWER (Progressive Disclosure)
          ----------------------------------------------------------------- */}
      {isToolsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsToolsModalOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-4xl max-h-[88vh] rounded-3xl bg-white border border-[#dcd2c2] shadow-2xl overflow-hidden flex flex-col z-50 animate-scale-in">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[var(--border-subtle)] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#faeee2] border border-[#e8b992]/60 text-[#b85d19]">
                  <SlidersHorizontal className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[var(--text-primary)]">
                    {lang === 'gu'
                      ? 'વૈદિક જ્યોતિષ વિશેષ સાધનો'
                      : lang === 'hi'
                        ? 'वैदिक ज्योतिष विशेष साधन'
                        : 'Advanced Vedic Astrology Tools'}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    {lang === 'gu'
                      ? 'ષોડશવર્ગ, KP સિસ્ટમ, ષડ્બળ, મુહૂર્ત અને વિશેષ વિશ્લેષણ'
                      : lang === 'hi'
                        ? 'षोडशवर्ग, केपी, षड्बल एवं मुहूर्त'
                        : 'Explore 30+ specialized Vedic systems & calculations'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsToolsModalOpen(false)}
                className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] glass-card cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Search */}
            <div className="p-4 sm:px-5 border-b border-[var(--border-subtle)] bg-[#fbf9f5]">
              <div className="relative">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    lang === 'gu'
                      ? 'સાધન શોધો (દા.ત. ષડ્બળ, KP, D10, અષ્ટકવર્ગ, મુહૂર્ત, રત્ન)...'
                      : lang === 'hi'
                        ? 'साधन खोजें (उदा. षड्बल, केपी, D10, अष्टकवर्ग)...'
                        : 'Search any tool (e.g. Shadbala, KP, D10, Ashtakvarga, Muhurta)...'
                  }
                  className="w-full glass-input rounded-xl pl-10 pr-8 py-2.5 text-xs font-medium focus:outline-hidden"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Modal Body: Categorized Grid or Search Results */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[60vh] space-y-6">
              {searchQuery.trim() ? (
                <div>
                  <div className="text-xs font-semibold text-[var(--text-muted)] mb-3">
                    {filteredTools.length}{' '}
                    {lang === 'gu'
                      ? 'પરિણામો મળ્યા'
                      : lang === 'hi'
                        ? 'परिणाम मिले'
                        : 'results found'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {filteredTools.map((tool) => {
                      const ToolIcon = tool.icon;
                      return (
                        <button
                          key={tool.id}
                          type="button"
                          onClick={() => handleSelectAdvancedTool(tool.id)}
                          className="flex items-start gap-3 p-3 rounded-2xl glass-card hover:border-[var(--border-gold)] text-left transition cursor-pointer"
                        >
                          <div className="p-2.5 rounded-xl bg-[#faeee2] text-[#b85d19] border border-[#e8b992]/60 shrink-0 mt-0.5">
                            <ToolIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[var(--text-primary)]">
                              {tool.label}
                            </div>
                            <div className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-snug">
                              {tool.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                ADVANCED_CATEGORIES.map((category) => (
                  <div key={category.id} className="space-y-3">
                    <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[var(--gold-600)] flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold-500)]" />
                      {category.title}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {category.tools.map((tool) => {
                        const ToolIcon = tool.icon;
                        const isCurrent = advancedTool === tool.id;

                        return (
                          <button
                            key={tool.id}
                            type="button"
                            onClick={() => handleSelectAdvancedTool(tool.id)}
                            className={`flex items-start gap-3 p-3 rounded-2xl text-left transition cursor-pointer ${
                              isCurrent
                                ? 'glass-button-primary shadow-xs'
                                : 'glass-card hover:border-[var(--border-gold)]'
                            }`}
                          >
                            <div
                              className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                                isCurrent
                                  ? 'bg-white text-[#b85d19]'
                                  : 'bg-[#faeee2] text-[#b85d19] border border-[#e8b992]/60'
                              }`}
                            >
                              <ToolIcon className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[var(--text-primary)] leading-tight">
                                {tool.label}
                              </div>
                              <div className="text-[10.5px] text-[var(--text-muted)] mt-1 leading-snug">
                                {tool.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* -----------------------------------------------------------------
          CONTENT DISPLAY AREA
          ----------------------------------------------------------------- */}
      <Suspense fallback={<CosmicLoader />}>
        {/* If an Advanced Tool is selected, render it */}
        {advancedTool ? (
          <div className="space-y-6">
            {advancedTool === 'vargas' && (
              <DivisionalChartsView kundliData={kundliData} t={t} lang={lang} />
            )}
            {advancedTool === 'careerD10' && (
              <CareerD10View kundliData={kundliData} t={t} lang={lang} />
            )}
            {advancedTool === 'wheel' && <ZodiacWheel kundliData={kundliData} t={t} lang={lang} />}
            {advancedTool === 'kp' && <KpView kundliData={kundliData} t={t} />}
            {advancedTool === 'kpSignificators' && (
              <KpSignificatorsView kundliData={kundliData} t={t} lang={lang} />
            )}
            {advancedTool === 'jaimini' && (
              <JaiminiView kundliData={kundliData} birthDateObj={birthDateObj} t={t} lang={lang} />
            )}
            {advancedTool === 'varshphal' && (
              <VarshphalView kundliData={kundliData} birthDate={birthDateObj} t={t} lang={lang} />
            )}
            {advancedTool === 'lalkitab' && (
              <LalKitabView kundliData={kundliData} t={t} lang={lang} />
            )}
            {advancedTool === 'shadbala' && (
              <ShadbalaView kundliData={kundliData} t={t} lang={lang} />
            )}
            {advancedTool === 'ashtakvarga' && (
              <AshtakvargaView kundliData={kundliData} t={t} lang={lang} />
            )}
            {advancedTool === 'aspects' && <AspectsView kundliData={kundliData} t={t} />}
            {advancedTool === 'parivartan' && (
              <ParivartanView kundliData={kundliData} t={t} lang={lang} />
            )}
            {advancedTool === 'lifeGraph' && (
              <LifeGraphView kundliData={kundliData} birthDate={birthDateObj} t={t} lang={lang} />
            )}
            {advancedTool === 'kalsarpaDeep' && (
              <KalsarpaDeepView kundliData={kundliData} t={t} lang={lang} />
            )}
            {advancedTool === 'medical' && (
              <MedicalAstroView kundliData={kundliData} t={t} lang={lang} />
            )}
            {advancedTool === 'prashna' && <PrashnaView t={t} lang={lang} />}
            {advancedTool === 'eventMuhurta' && <EventMuhurtaView t={t} lang={lang} />}
            {advancedTool === 'gemstoneMuhurta' && (
              <GemstoneMuhurtaView kundliData={kundliData} t={t} lang={lang} />
            )}
            {advancedTool === 'japaMala' && <JapaMalaView t={t} lang={lang} />}
            {advancedTool === 'astrocartography' && (
              <AstrocartographyView kundliData={kundliData} t={t} lang={lang} />
            )}
            {advancedTool === 'familyComparison' && (
              <FamilyComparisonView kundliData={kundliData} formData={formData} t={t} lang={lang} />
            )}
            {advancedTool === 'socialStory' && (
              <SocialStoryCardView kundliData={kundliData} formData={formData} t={t} lang={lang} />
            )}
            {advancedTool === 'consultation' && (
              <AiConsultationView
                kundliData={kundliData}
                birthDateObj={birthDateObj}
                t={t}
                lang={lang}
              />
            )}
            {advancedTool === 'profile' && (
              <ProfileForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={generateKundli}
                t={t}
                lang={lang}
                onOpenVault={onOpenVault}
              />
            )}
            {advancedTool === 'print' && (
              <PrintableReport kundliData={kundliData} formData={formData} t={t} lang={lang} />
            )}
          </div>
        ) : (
          /* Default Essential Tabs */
          <div className="space-y-6">
            {/* Tab 1: Chart & Birth Details */}
            {coreTab === 'chart' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ChartSVG kundliData={kundliData} t={t} lang={lang} />
                  <ZodiacWheel kundliData={kundliData} t={t} lang={lang} />
                </div>
                <BasicDetails kundliData={kundliData} formData={formData} t={t} lang={lang} />
              </div>
            )}

            {/* Tab 2: Planetary Table */}
            {coreTab === 'planets' && (
              <div className="space-y-6">
                <PlanetaryTable kundliData={kundliData} t={t} lang={lang} />
              </div>
            )}

            {/* Tab 3: Dasha Timeline */}
            {coreTab === 'dasha' && (
              <div className="space-y-6">
                <DashaView kundliData={kundliData} birthDate={birthDateObj} t={t} lang={lang} />
              </div>
            )}

            {/* Tab 4: Doshas & Remedies */}
            {coreTab === 'doshas' && (
              <div className="space-y-6">
                <DoshaReport kundliData={kundliData} t={t} lang={lang} />
                <GemstonesView kundliData={kundliData} t={t} lang={lang} />
                <YogasView kundliData={kundliData} t={t} lang={lang} />
              </div>
            )}
          </div>
        )}
      </Suspense>
    </div>
  );
}
