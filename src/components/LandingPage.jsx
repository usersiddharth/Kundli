import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Chip } from '@heroui/react';
import { cityData } from '../engine/cityData.js';
import {
  Compass,
  Sparkles,
  Calendar,
  Clock,
  CalendarDays,
  Hash,
  Heart,
  ShieldCheck,
  Layers,
  Globe,
  Printer,
  ChevronRight,
  ArrowRight,
  BookOpen,
  MapPin,
  User,
  CheckCircle2,
  HeartPulse,
  Crown,
  X,
  RotateCcw,
  Orbit,
} from 'lucide-react';

export default function LandingPage({
  formData,
  setFormData,
  generateKundli,
  setMainSection,
  _t,
  lang = 'gu',
}) {
  const [activeFeatureTab, setActiveFeatureTab] = useState('dasha');
  const [citySearch, setCitySearch] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showCustomCoords, setShowCustomCoords] = useState(false);
  const cityDropdownRef = useRef(null);

  // Click outside to close city dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setShowCityDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered Cities for Autocomplete
  const activeQuery = citySearch !== '' ? citySearch : formData.city || '';
  const filteredCities = activeQuery
    ? cityData.filter((c) => c.name.toLowerCase().includes(activeQuery.toLowerCase())).slice(0, 8)
    : [];

  const handleCitySelect = (city) => {
    setFormData((prev) => ({
      ...prev,
      city: city.name,
      lat: city.lat,
      lng: city.lng,
      tz: city.tz,
    }));
    setCitySearch(city.name);
    setShowCityDropdown(false);
  };

  const handleCityInputChange = (e) => {
    const val = e.target.value;
    setCitySearch(val);
    setFormData((prev) => ({
      ...prev,
      city: val,
      ...(val === '' ? { lat: null, lng: null } : {}),
    }));
    setShowCityDropdown(val.length > 0);

    const exact = cityData.find((c) => c.name.toLowerCase() === val.toLowerCase());
    if (exact) {
      setFormData((prev) => ({
        ...prev,
        city: exact.name,
        lat: exact.lat,
        lng: exact.lng,
        tz: exact.tz,
      }));
    }
  };

  const handleClearCity = () => {
    setCitySearch('');
    setFormData((prev) => ({
      ...prev,
      city: '',
      lat: null,
      lng: null,
    }));
    setShowCityDropdown(false);
  };

  const handleClearBirthForm = () => {
    setFormData({
      name: '',
      gender: 'male',
      dob: '',
      tob: '',
      city: '',
      lat: 23.0225,
      lng: 72.5714,
      tz: 5.5,
    });
    setCitySearch('');
    setShowCityDropdown(false);
  };

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!formData.dob || !formData.tob) {
      const fallback = {
        name: formData.name || 'જાતક (Native)',
        gender: formData.gender || 'male',
        dob: formData.dob || '1995-08-15',
        tob: formData.tob || '08:30',
        city: formData.city || 'Ahmedabad, Gujarat',
        lat: formData.lat || 23.0225,
        lng: formData.lng || 72.5714,
        tz: 5.5,
      };
      setFormData(fallback);
      generateKundli(fallback);
    } else {
      generateKundli(formData);
    }
    setMainSection('kundli');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 6 Dedicated Portals Showcase Data
  const portalsList = [
    {
      id: 'kundli',
      title: {
        gu: 'જન્મ કુંડળી & ૧૬ વર્ગ ચાર્ટ',
        hi: 'जन्म कुंडली एवं १६ वर्ग चक्र',
        en: 'Kundli & 16 Divisional Charts',
      },
      subtitle: {
        gu: 'D1 લગ્ન, D9 નવાંશ, D10 કારકિર્દી અને ૩૬૦° રાશિ ચક્ર',
        hi: 'D1 लग्न, D9 नवांश, D10 करियर एवं ३६०° राशि चक्र',
        en: 'D1 Lagna, D9 Navamsha, D10 Career & 360° Zodiac',
      },
      icon: Compass,
      badge: { gu: 'D1 - D60 ચાર્ટ્સ', hi: 'D1 - D60 चक्र', en: 'D1 - D60 Charts' },
      features: [
        {
          gu: 'ઉત્તર અને દક્ષિણ ભારતીય કુંડળી શૈલી',
          hi: 'उत्तर व दक्षिण भारतीय शैली',
          en: 'North & South Indian chart styles',
        },
        {
          gu: '૧૨-કાર્ડ અવકહડા ચક્ર & ગ્રહ સ્પષ્ટ',
          hi: '१२-कार्ड अवकहड़ा चक्र',
          en: '12-Card Avakahada & coordinates',
        },
        {
          gu: '૫-સ્તરીય વિંશોત્તરી દશા (પ્રાણ સુધી)',
          hi: '५-स्तरीय विंशोत्तरी दशा',
          en: '5-Tier Micro Vimshottari Dasha',
        },
        {
          gu: '૧૨૦-વર્ષનું ગતિશીલ જીવન આલેખ',
          hi: '१२०-वर्षीय जीवन आलेख',
          en: '120-Year Life Energy Graph',
        },
      ],
      cta: { gu: 'કુંડળી હબ ખોલો', hi: 'कुंडली हब खोलें', en: 'Open Kundli Hub' },
    },
    {
      id: 'panchang',
      title: {
        gu: 'ગુજરાતી પંચાંગ & ચોઘડિયા',
        hi: 'गुजराती पंचांग एवं चौघड़िया',
        en: 'Gujarati Panchang & Choghadiya',
      },
      subtitle: {
        gu: 'તિથિ, વાર, નક્ષત્ર, યોગ, કરણ, રાહુકાળ અને લાઈવ ચોઘડિયા',
        hi: 'तिथि, वार, नक्षत्र, योग, करण, राहुकाल व चौघड़िया',
        en: 'Tithi, Nakshatra, Yoga, Karana & Live Choghadiya',
      },
      icon: Calendar,
      badge: { gu: 'લાઈવ મુહૂર્ત', hi: 'लाइव मुहूर्त', en: 'Live Muhurta' },
      features: [
        {
          gu: 'ચોક્કસ સ્થાનિક સૂર્યોદય/સૂર્યાસ્ત ગણતરી',
          hi: 'सटीक सूर्योदय/सूर्यास्त गणना',
          en: 'Precise local Sunrise/Sunset',
        },
        {
          gu: 'અમૃત, શુભ, લાભ, ચલ, ઉદ્વેગ, રોગ, કાળ ટ્રેકર',
          hi: 'दिन-रात चौघड़िया स्थिति',
          en: 'Real-time Day/Night Choghadiya',
        },
        {
          gu: 'રાહુકાળ, યમઘંટ, ગુલિક અને દિશાશૂળ',
          hi: 'राहुकाल, यमघंट व दिशाशूल',
          en: 'Rahu Kaal & Inauspicious times',
        },
        {
          gu: 'કોઈપણ ભૂતકાળ કે ભવિષ્યની તારીખનું પંચાંગ',
          hi: 'अतीत व भविष्य का पंचांग',
          en: 'Instant Date Lookup',
        },
      ],
      cta: { gu: 'પંચાંગ જુઓ', hi: 'पंचांग देखें', en: 'View Live Panchang' },
    },
    {
      id: 'vedicClock',
      title: {
        gu: 'વૈદિક ઘડિયાળ & કાળ ચક્ર',
        hi: 'वैदिक घड़ी एवं काल चक्र',
        en: 'Vedic Clock & Kaal Chakra',
      },
      subtitle: {
        gu: '૬૦ ઘટી, પળ, વિપળ, ૩૦ મુહૂર્ત અને રીઅલ-ટાઇમ ગ્રહ ભ્રમણ',
        hi: '६० घटी, पल, विपल, ३० मुहूर्त व ग्रह भ्रमण',
        en: '60 Ghatis, Vighatis, 30 Muhurtas & Kaal Chakra',
      },
      icon: Clock,
      badge: { gu: 'સૂર્ય આધારિત સમય', hi: 'सूर्य आधारित', en: 'Solar Sidereal' },
      features: [
        {
          gu: 'પ્રથમ સૂર્યોદયથી ૬૦ ઘટીનું જીવંત પરિભ્રમણ',
          hi: 'सूर्योदय से ६० घटी चक्र',
          en: 'Continuous 60 Ghati dial',
        },
        {
          gu: '૩૦ વૈદિક મુહૂર્ત (બ્રહ્મ મુહૂર્ત, અભિજિત વગેરે)',
          hi: '३० वैदिक मुहूर्त विवरण',
          en: '30 Vedic Muhurtas Tracker',
        },
        {
          gu: 'આકાશમાં સૂર્ય અને ચંદ્રની તાત્કાલિક સ્થિતિ',
          hi: 'सूर्य-चंद्र की खगोलीय स्थिति',
          en: 'Dynamic Sun/Moon coordinates',
        },
        {
          gu: 'દ્રષ્ટાંતરૂપ સેકન્ડ-દર-સેકન્ડ ચોકસાઈ',
          hi: 'रीयल-टाइम विजुअल डायल',
          en: 'Real-time visual clock face',
        },
      ],
      cta: { gu: 'ઘડિયાળ ખોલો', hi: 'घड़ी खोलें', en: 'Open Vedic Clock' },
    },
    {
      id: 'calendar',
      title: {
        gu: 'વિક્રમ સંવત ભીંત કેલેન્ડર',
        hi: 'विक्रम संवत दीवार कैलेंडर',
        en: 'Vikram Samvat Wall Calendar',
      },
      subtitle: {
        gu: 'સંવત ૨૦૮૨–૨૦૮૩ હિન્દુ તહેવારો, એકાદશી, પૂનમ અને અમાસ',
        hi: 'संवत २०८२-२०८३ एकादशी, पूनम, अमावस व पर्व',
        en: 'VS 2082–2083 Hindu Calendar, Festivals & Ekadashis',
      },
      icon: CalendarDays,
      badge: { gu: '૨૦૮૨ - ૨૦૮૩', hi: '२०८२ - २०८३', en: 'VS 2082–2083' },
      features: [
        {
          gu: 'શુક્લ પક્ષ (સુદ) અને કૃષ્ણ પક્ષ (વદ) સંપૂર્ણ વિગત',
          hi: 'शुक्ल व कृष्ण पक्ष विवरण',
          en: 'Complete Sud & Vad Pakshas',
        },
        {
          gu: 'ગુજરાતી વ્રત, તહેવારો અને જાહેર રજાઓની યાદી',
          hi: 'व्रत, पर्व एवं अवकाश',
          en: 'Full Gujarat Festivals list',
        },
        {
          gu: 'કોઈપણ તારીખ પર ક્લિક કરીને પંચાંગ ખોલો',
          hi: 'एक क्लिक में पंचांग देखें',
          en: '1-Click Panchang day opener',
        },
        {
          gu: 'પરંપરાગત લાલ-સોનેરી ભીંત કેલેન્ડર શૈલી',
          hi: 'पारंपरिक गुजराती कैलेंडर',
          en: 'Traditional Wall Calendar UX',
        },
      ],
      cta: { gu: 'કેલેન્ડર જુઓ', hi: 'कैलेंडर देखें', en: 'View Wall Calendar' },
    },
    {
      id: 'numerology',
      title: {
        gu: 'અંકશાસ્ત્ર & લો શુ ગ્રીડ',
        hi: 'अंकशास्त्र एवं लो शू ग्रिड',
        en: 'Numerology & Lo Shu Grid',
      },
      subtitle: {
        gu: 'મૂળાંક, ભાગ્યાંક, કુઆ નંબર અને ૩x૩ લો શુ કોસ્મિક પ્લેન',
        hi: 'मूलांक, भाग्यांक, कुआ नंबर व ३x३ लो शू ग्रिड',
        en: 'Driver, Conductor, Kua Number & 3x3 Lo Shu Matrix',
      },
      icon: Hash,
      badge: { gu: '૩x૩ ગ્રીડ વિશ્લેષણ', hi: '३x३ ग्रिड', en: '3x3 Matrix' },
      features: [
        {
          gu: 'માનસિક, ભાવનાત્મક અને વ્યાવહારિક પ્લેન મૂલ્યાંકન',
          hi: 'मानसिक, भावनात्मक व भौतिक प्लेन',
          en: 'Thought, Will & Action planes',
        },
        {
          gu: 'સુવર્ણ યોગ (૪-૫-૬) અને રજત યોગ તપાસ',
          hi: 'गोल्डन व सिल्वर राजयोग',
          en: 'Golden & Silver cosmic planes',
        },
        {
          gu: 'શુભ વાર, શુભ રંગ, મિત્ર અંકો અને ઉપાય',
          hi: 'शुभ अंक, रंग व रत्न सुझाव',
          en: 'Lucky dates, colors & gems',
        },
        {
          gu: 'નામ અંકશાસ્ત્ર (Chaldean & Pythagorean)',
          hi: 'नाम अंक मिलान',
          en: 'Name vibration analysis',
        },
      ],
      cta: { gu: 'અંકશાસ્ત્ર ગણો', hi: 'अंकशास्त्र देखें', en: 'Calculate Numerology' },
    },
    {
      id: 'matchmaking',
      title: {
        gu: '૩૬-ગુણ અષ્ટકૂટ મિલન & ઉપાય',
        hi: '३६-गुण अष्टकूट मिलान एवं उपाय',
        en: '36-Guna Matchmaking & Remedies',
      },
      subtitle: {
        gu: 'વર્ણ, વશ્ય, તારા, યોનિ, મૈત્રી, ગણ, ભકૂટ, નાડી & રત્ન વિધિ',
        hi: 'गुण मिलान, मांगलिक दोष जांच व लाल किताब उपाय',
        en: 'Ashtakoot Milan, Mangal Dosha & Gemstone Rituals',
      },
      icon: Heart,
      badge: { gu: '૩૬ ગુણ સ્કોર', hi: '३६ गुण मिलान', en: '36 Guna Score' },
      features: [
        {
          gu: 'વર-કન્યા કુંડળી વિગતવાર ગુણ મિલન વિશ્લેષણ',
          hi: 'वर-वधू सम्पूर्ण कुंडली मिलान',
          en: 'Detailed Bride & Groom Milan',
        },
        {
          gu: 'મંગળ દોષ પરિહાર અને નાડી દોષ મૂલ્યાંકન',
          hi: 'मांगलिक दोष परिहार जांच',
          en: 'Mangal Dosha cancellation audits',
        },
        {
          gu: 'રત્ન ધારણ મુહૂર્ત, પ્રાણ પ્રતિષ્ઠા અને લાલ કિતાબ',
          hi: 'रत्न मुहूर्त व लाल किताब ऋण',
          en: 'Gemstone Muhurta & Lal Kitab',
        },
        {
          gu: '૧૦૮ મંત્ર જાપ માળા કૌન્ટર વિથ ઓડિયો',
          hi: '१०८ मंत्र जाप काउंटर',
          en: '108 Japa Mala Counter',
        },
      ],
      cta: { gu: 'ગુણ મિલન કરો', hi: 'मिलान करें', en: 'Check Compatibility' },
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 animate-fade-in-up pb-16">
      {/* =========================================================================
          1. HERO SECTION: LUXURY EDITORIAL SPLIT & MACHINED INTAKE CONSOLE
          ========================================================================= */}
      <section className="relative pt-2 sm:pt-6">
        {/* Subtle Ambient Radial Glowing Backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-7xl bg-radial from-amber-500/8 via-amber-500/2 to-transparent blur-3xl -z-10"
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Headlines, Value Prop & Live Pillars */}
          <div className="space-y-6 lg:col-span-7">
            {/* Micro Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f5ede1] px-3.5 py-1.5 border border-[#e6dcce] text-[11px] font-semibold text-[#b45309] shadow-xs">
              <span className="h-2 w-2 rounded-full bg-[#b45309] animate-pulse" />
              <span className="font-mono">
                {lang === 'gu'
                  ? 'ચિત્રા પક્ષીય લાહિડી અયનાંશ • ૧૦૦% ઑફલાઇન'
                  : lang === 'hi'
                    ? 'चित्रा पक्षीय लाहिड़ी अयनांश • शत-प्रतिशत ऑफलाइन'
                    : 'Chitra Paksha Lahiri • 100% Offline Astrometry'}
              </span>
            </div>

            {/* Major Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-[#1c1917] leading-[1.08]">
              {lang === 'gu' ? (
                <>
                  શાસ્ત્રીય વૈદિક જ્યોતિષ <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b45309] via-[#d97706] to-[#c2410c]">
                    & સંપૂર્ણ પંચાંગ કાલગણના
                  </span>
                </>
              ) : lang === 'hi' ? (
                <>
                  शास्त्रीय वैदिक ज्योतिष <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b45309] via-[#d97706] to-[#c2410c]">
                    एवं सम्पूर्ण पंचांग प्रणाली
                  </span>
                </>
              ) : (
                <>
                  Classical Vedic Astrology <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b45309] via-[#d97706] to-[#c2410c]">
                    & High-Precision Panchang
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-[#57534e] leading-relaxed max-w-xl font-sans">
              {lang === 'gu'
                ? 'સ્વિસ-ગ્રેડ ચોક્કસાઈ, D1 થી D60 ષોડશવર્ગ ચાર્ટ, ૫-સ્તરીય વિંશોત્તરી દશા અને લાઈવ ચોઘડિયા — પ્રત્યેક ગણતરી શુદ્ધ પારાશરી નિયમો અનુસાર.'
                : lang === 'hi'
                  ? 'स्विस-ग्रेड सटीकता, D1 से D60 षोडशवर्ग चक्र, ५-स्तरीय विंशोत्तरी दशा व वास्तविक समय चौघड़िया।'
                  : 'High-precision ephemeris calculations, D1-D60 divisional charts, 5-tier Vimshottari dasha, and real-time panchang.'}
            </p>

            {/* Action Buttons: Button-in-Button Trailing Icon & Secondary Pill */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  setMainSection('kundli');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex items-center gap-3.5 rounded-full bg-gradient-to-r from-[#b45309] to-[#92400e] text-white px-6 py-3.5 text-xs sm:text-sm font-semibold shadow-[0_10px_25px_-5px_rgba(180,83,9,0.35)] hover:shadow-[0_15px_30px_-5px_rgba(180,83,9,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Compass className="h-4 w-4 shrink-0 text-amber-200" />
                <span>
                  {lang === 'gu'
                    ? 'કુંડળી સોફ્ટવેર શરૂ કરો'
                    : lang === 'hi'
                      ? 'कुंडली सॉफ्टवेयर शुरू करें'
                      : 'Launch Kundli app'}
                </span>
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform shrink-0">
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMainSection('panchang');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 rounded-full bg-white px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#1c1917] border border-[#e8dfd2] shadow-xs hover:border-[#b45309] hover:bg-[#faf8f5] transition-all cursor-pointer"
              >
                <Calendar className="h-4 w-4 text-[#b45309] shrink-0" />
                <span>
                  {lang === 'gu'
                    ? 'આજનું પંચાંગ'
                    : lang === 'hi'
                      ? 'आज का पंचांग'
                      : 'Live panchang'}
                </span>
              </button>
            </div>

            {/* Technical Trust Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#e8dfd2] text-xs text-[#8c7d6e]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'gu'
                    ? '૧૦૦% ખાનગી & ઑફલાઇન'
                    : lang === 'hi'
                      ? 'शत-प्रतिशत सुरक्षित व ऑफलाइन'
                      : '100% private & offline'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600 shrink-0" />
                <span>
                  {lang === 'gu'
                    ? '૩ ભાષા સપોર્ટ'
                    : lang === 'hi'
                      ? '३ भाषाएं समर्थित'
                      : '3 languages supported'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#b45309] shrink-0" />
                <span>
                  {lang === 'gu'
                    ? 'પારાશરી શાસ્ત્ર D1-D60'
                    : lang === 'hi'
                      ? 'पाराशरी सिद्धांत आधारित'
                      : 'Parashari principles'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Machined Double-Bezel Quick-Birth Calculator Console */}
          <div className="lg:col-span-5">
            <div className="rounded-[2.5rem] bg-[#f7f3eb] p-2.5 sm:p-3 border border-[#e5ded3] shadow-[0_20px_50px_-10px_rgba(180,83,9,0.12)]">
              <div className="rounded-[2rem] bg-white p-6 sm:p-7 border border-[#ede7dc] space-y-4">
                {/* Console Header */}
                <div className="flex items-center justify-between border-b border-[#e8dfd2] pb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#b45309] to-[#78350f] text-white shadow-xs">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="font-serif text-base font-medium tracking-tight text-[#1c1917]">
                        {lang === 'gu'
                          ? 'ત્વરિત જન્મ વિગત દાખલ કરો'
                          : lang === 'hi'
                            ? 'त्वरित जन्म विवरण'
                            : 'Quick birth details'}
                      </h2>
                      <p className="text-[11px] text-[#8c7d6e]">
                        {lang === 'gu'
                          ? 'વિગત ભરી ૧-ક્લિકમાં સંપૂર્ણ કુંડળી જુઓ'
                          : lang === 'hi'
                            ? 'विवरण भरें व १-क्लिक में कुंडली देखें'
                            : 'Generate birth chart in 1-click'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Inputs */}
                <form onSubmit={handleQuickSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label htmlFor="landing-name" className="block font-medium text-[#57534e] mb-1">
                      જાતકનું પૂરું નામ (Full name)
                    </label>
                    <input
                      id="landing-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="દા.ત. રાહુલ શર્મા અથવા તમારું નામ"
                      className="w-full rounded-xl bg-[#faf8f5] border border-[#e8dfd2] px-3.5 py-2.5 text-xs font-medium text-[#1c1917] focus:bg-white focus:border-[#b45309] focus:outline-hidden transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="landing-dob"
                        className="block font-medium text-[#57534e] mb-1"
                      >
                        જન્મ તારીખ (DOB)
                      </label>
                      <input
                        id="landing-dob"
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full rounded-xl bg-[#faf8f5] border border-[#e8dfd2] px-3 py-2.5 text-xs font-mono font-medium text-[#1c1917] focus:bg-white focus:border-[#b45309] focus:outline-hidden transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="landing-tob"
                        className="block font-medium text-[#57534e] mb-1"
                      >
                        જન્મ સમય (TOB)
                      </label>
                      <input
                        id="landing-tob"
                        type="time"
                        value={formData.tob}
                        onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                        className="w-full rounded-xl bg-[#faf8f5] border border-[#e8dfd2] px-3 py-2.5 text-xs font-mono font-medium text-[#1c1917] focus:bg-white focus:border-[#b45309] focus:outline-hidden transition-all"
                      />
                    </div>
                  </div>

                  {/* City Autocomplete */}
                  <div className="relative" ref={cityDropdownRef}>
                    <label
                      htmlFor="landing-city-search"
                      className="block font-medium text-[#57534e] mb-1"
                    >
                      જન્મ સ્થળ (City / town)
                    </label>
                    <div className="relative">
                      <input
                        id="landing-city-search"
                        type="text"
                        value={activeQuery}
                        onChange={handleCityInputChange}
                        onFocus={() => setShowCityDropdown(true)}
                        placeholder="શહેર શોધો (દા.ત. Surat, Ahmedabad, Mumbai)..."
                        className="w-full rounded-xl bg-[#faf8f5] border border-[#e8dfd2] pl-3.5 pr-8 py-2.5 text-xs font-medium text-[#1c1917] focus:bg-white focus:border-[#b45309] focus:outline-hidden transition-all"
                      />
                      {activeQuery ? (
                        <button
                          type="button"
                          onClick={handleClearCity}
                          className="absolute right-2.5 top-2.5 text-[#8c7d6e] hover:text-[#1c1917] cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      ) : (
                        <MapPin className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 text-[#8c7d6e]" />
                      )}
                    </div>

                    {showCityDropdown && filteredCities.length > 0 && (
                      <div
                        role="listbox"
                        className="absolute z-50 mt-1.5 max-h-48 w-full overflow-y-auto rounded-2xl bg-white py-1 shadow-xl text-xs border border-[#e8dfd2]"
                      >
                        {filteredCities.map((city, idx) => (
                          <button
                            key={idx}
                            type="button"
                            role="option"
                            aria-selected={formData.city === city.name}
                            onClick={() => handleCitySelect(city)}
                            className="flex w-full items-center justify-between px-3.5 py-2 text-left hover:bg-[#faf8f5] text-[#1c1917] transition cursor-pointer"
                          >
                            <span className="font-medium">{city.name}</span>
                            <span className="font-mono text-[10px] text-[#8c7d6e]">
                              {city.lat.toFixed(2)}°N, {city.lng.toFixed(2)}°E
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#b45309] to-[#92400e] text-white py-3 text-xs font-semibold shadow-[0_8px_20px_-4px_rgba(180,83,9,0.35)] hover:shadow-[0_12px_25px_-4px_rgba(180,83,9,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>સંપૂર્ણ કુંડળી ગણતરી કરો (Calculate)</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleClearBirthForm}
                      title="Clear form"
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-[#faf8f5] border border-[#e8dfd2] px-3.5 py-3 text-xs font-medium text-[#57534e] hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. THE MASTER PORTALS SHOWCASE: ASYMMETRICAL BENTO GRID
          ========================================================================= */}
      <section className="space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f5ede1] px-3.5 py-1 border border-[#e6dcce] text-xs font-semibold text-[#b45309]">
            <Layers className="h-3.5 w-3.5" />
            <span>૬ સમર્પિત પોર્ટલ (6 Master Portals)</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1c1917]">
            વૈદિક ગણતરી અને પંચાંગનું સંપૂર્ણ વિશ્વ
          </h2>
          <p className="text-base text-[#57534e]">
            દરેક ક્ષેત્ર માટે અલાયદા હાઇ-પ્રીસીઝન મોડ્યુલ — જન્મ ચાર્ટથી લઈને દૈનિક ચોઘડિયા અને લગ્ન
            ગુણ મિલન સુધી.
          </p>
        </div>

        {/* Asymmetrical Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portalsList.map((portal, index) => {
            const Icon = portal.icon;
            const isFeatured = index === 0; // First card is primary featured

            return (
              <div
                key={portal.id}
                className={`rounded-[2rem] bg-[#f7f3eb] p-2 sm:p-2.5 border border-[#e5ded3] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                  isFeatured ? 'lg:col-span-2' : 'col-span-1'
                }`}
              >
                <div className="rounded-[1.75rem] bg-white p-6 sm:p-7 border border-[#ede7dc] flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-[#b45309] to-[#78350f] text-white shadow-sm group-hover:scale-105 transition-transform">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-[#f5ede1] border border-[#e6dcce] text-[#b45309] text-[10.5px] font-bold px-3 py-1 font-mono">
                        {portal.badge[lang] || portal.badge.gu}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-xl font-medium tracking-tight text-[#1c1917] group-hover:text-[#b45309] transition-colors">
                        {portal.title[lang] || portal.title.gu}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#8c7d6e] mt-1">
                        {portal.subtitle[lang] || portal.subtitle.gu}
                      </p>
                    </div>

                    <ul className="space-y-2.5 pt-3 border-t border-[#e8dfd2] text-xs text-[#57534e]">
                      {portal.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span>{feat[lang] || feat.gu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setMainSection(portal.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full flex items-center justify-between rounded-xl bg-[#faf8f5] hover:bg-[#b45309] hover:text-white border border-[#e8dfd2] px-4 py-3 text-xs font-semibold text-[#1c1917] transition-all cursor-pointer group/btn"
                    >
                      <span>{portal.cta[lang] || portal.cta.gu}</span>
                      <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. DEEP-DIVE ADVANCED ASTROLOGICAL CAPABILITIES
          ========================================================================= */}
      <div className="rounded-[2.5rem] bg-[#f7f3eb] p-3 sm:p-4 border border-[#e5ded3] shadow-md">
        <div className="rounded-[2rem] bg-white p-6 sm:p-10 border border-[#ede7dc] space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e8dfd2] pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f5ede1] px-3 py-1 border border-[#e6dcce] text-xs font-semibold text-[#b45309] mb-2">
                <Crown className="h-3.5 w-3.5" />
                <span>વિશેષ શાસ્ત્રીય સુવિધાઓ (Advanced Capabilities)</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1c1917]">
                ઉચ્ચ સ્તરનું જ્યોતિષ વિશ્લેષણ & દસ્તાવેજીકરણ
              </h2>
            </div>

            {/* Interactive Feature Selectors */}
            <div className="flex flex-wrap gap-1.5 rounded-2xl bg-[#faf8f5] p-1.5 border border-[#e8dfd2]">
              {[
                { id: 'dasha', label: '૫-સ્તરીય દશા', icon: Clock },
                { id: 'astrocarto', label: 'એસ્ટ્રોકાર્ટોગ્રાફી', icon: Globe },
                { id: 'medical', label: 'મેડિકલ એસ્ટ્રોલોજી', icon: HeartPulse },
                { id: 'pdf', label: 'A4 PDF ડોસિયર', icon: Printer },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeFeatureTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFeatureTab(tab.id)}
                    className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#b45309] to-[#92400e] text-white shadow-sm'
                        : 'text-[#57534e] hover:text-[#1c1917] hover:bg-white bg-transparent'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feature Detail Showcase Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            {activeFeatureTab === 'dasha' && (
              <>
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f5ede1] px-3 py-1 border border-[#e6dcce] text-xs font-semibold text-[#b45309]">
                    <Clock className="h-3.5 w-3.5" />
                    <span>વિંશોત્તરી ૧૨૦ વર્ષ ચક્ર</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1c1917]">
                    મહાદશાથી લઈને પ્રાણદશા સુધીનું ૫-સ્તરીય માઇક્રો-ટાઇમિંગ
                  </h3>
                  <p className="text-sm sm:text-base text-[#57534e] leading-relaxed">
                    શાસ્ત્રોક્ત વિંશોત્તરી દશા પદ્ધતિ દ્વારા જીવનની પ્રત્યેક ક્ષણનું ફળાદેશ મેળવો.
                    મહાદશા, અંતર્દશા, પ્રત્યંતર્દશા, સૂક્ષ્મ દશા અને પ્રાણ દશાની ચોક્કસ શરૂઆત અને
                    અંત તારીખ સાથેનું સંપૂર્ણ આયોજન.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-4 rounded-2xl bg-white border border-[#e8dfd2] shadow-xs">
                      <strong className="text-[#1c1917] block font-serif text-sm">
                        લાઈવ સક્રિય દશા
                      </strong>
                      <span className="text-[#8c7d6e] mt-0.5 block">
                        આજના દિવસની ચાલુ દશા પરિસ્થિતિ
                      </span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-[#e8dfd2] shadow-xs">
                      <strong className="text-[#1c1917] block font-serif text-sm">
                        વાર્ષિક ભવિષ્યવાણી
                      </strong>
                      <span className="text-[#8c7d6e] mt-0.5 block">
                        કારકિર્દી, સ્વાસ્થ્ય અને ધનલાભ તબક્કા
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 rounded-[2rem] bg-[#f7f3eb] p-2.5 border border-[#e5ded3] shadow-sm">
                  <div className="rounded-[1.75rem] bg-white p-7 border border-[#ede7dc] text-center space-y-3">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#b45309] to-[#78350f] text-white flex items-center justify-center mx-auto shadow-md">
                      <Clock className="h-8 w-8 text-amber-100" />
                    </div>
                    <p className="font-serif text-base font-medium text-[#1c1917]">
                      સૂક્ષ્મ દશા પરિભ્રમણ ચાર્ટ
                    </p>
                    <p className="text-xs text-[#8c7d6e] leading-relaxed">
                      ચંદ્ર નક્ષત્રના ભોગ્યાંશ આધારે ૧૨૦ વર્ષના નક્ષત્ર સ્વામીઓની ચોક્કસ ગણતરી.
                    </p>
                  </div>
                </div>
              </>
            )}

            {activeFeatureTab === 'astrocarto' && (
              <>
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f5ede1] px-3 py-1 border border-[#e6dcce] text-xs font-semibold text-[#b45309]">
                    <Globe className="h-3.5 w-3.5" />
                    <span>વિશ્વ નકશો & ભૌગોલિક રેખાઓ</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1c1917]">
                    એસ્ટ્રોકાર્ટોગ્રાફી (AstroCartography Global Angularity)
                  </h3>
                  <p className="text-sm sm:text-base text-[#57534e] leading-relaxed">
                    વિશ્વના કયા શહેરમાં અથવા દેશમાં તમારા ગ્રહો શક્તિશાળી કેન્દ્ર સ્થાનો (Ascendant,
                    Midheaven, Descendant, IC) પર બિરાજમાન થાય છે તેનું ભૌગોલિક વિશ્વ નકશા પર જીવંત
                    પ્રદર્શન.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-4 rounded-2xl bg-white border border-[#e8dfd2] shadow-xs">
                      <strong className="text-[#1c1917] block font-serif text-sm">
                        વિદેશ યાત્રા & સ્થળાંતર
                      </strong>
                      <span className="text-[#8c7d6e] mt-0.5 block">
                        કારકિર્દી અને સમૃદ્ધિ માટે શ્રેષ્ઠ શહેરો
                      </span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-[#e8dfd2] shadow-xs">
                      <strong className="text-[#1c1917] block font-serif text-sm">
                        ગ્રહ રેખાઓ
                      </strong>
                      <span className="text-[#8c7d6e] mt-0.5 block">
                        સૂર્ય, ગુરુ, શુક્ર વગેરેની આંતરરાષ્ટ્રીય અસર
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 rounded-[2rem] bg-[#f7f3eb] p-2.5 border border-[#e5ded3] shadow-sm">
                  <div className="rounded-[1.75rem] bg-white p-7 border border-[#ede7dc] text-center space-y-3">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-900 text-white flex items-center justify-center mx-auto shadow-md">
                      <Globe className="h-8 w-8 text-blue-100" />
                    </div>
                    <p className="font-serif text-base font-medium text-[#1c1917]">
                      વૈશ્વિક ગ્રહ પ્રભાવ નકશો
                    </p>
                    <p className="text-xs text-[#8c7d6e] leading-relaxed">
                      વિશ્વના ૨૦+ મુખ્ય શહેરોમાં તમારી કુંડળીના ગ્રહ પ્રભાવનું તુલનાત્મક વિશ્લેષણ.
                    </p>
                  </div>
                </div>
              </>
            )}

            {activeFeatureTab === 'medical' && (
              <>
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f5ede1] px-3 py-1 border border-[#e6dcce] text-xs font-semibold text-[#b45309]">
                    <HeartPulse className="h-3.5 w-3.5" />
                    <span>આયુર્વેદિક ત્રિદોષ & સ્વાસ્થ્ય</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1c1917]">
                    આયુર્વેદિક મેડિકલ એસ્ટ્રોલોજી & શારીરિક સંરચના
                  </h3>
                  <p className="text-sm sm:text-base text-[#57534e] leading-relaxed">
                    વાત, પિત્ત અને કફ દોષનું જ્યોતિષીય વિશ્લેષણ, ૧૨ ભાવોની અંગ સંવેદનશીલતા અને
                    સંભવિત રોગોના નિવારણ માટે આયુર્વેદિક ઉપચાર તથા પથ્ય-અપથ્ય માર્ગદર્શન.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-4 rounded-2xl bg-white border border-[#e8dfd2] shadow-xs">
                      <strong className="text-[#1c1917] block font-serif text-sm">
                        ત્રિદોષ ટકાવારી
                      </strong>
                      <span className="text-[#8c7d6e] mt-0.5 block">
                        વાત, પિત્ત, કફ પ્રકૃતિનું વિશ્લેષણ
                      </span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-[#e8dfd2] shadow-xs">
                      <strong className="text-[#1c1917] block font-serif text-sm">
                        ઋતુચર્યા & ઉપાય
                      </strong>
                      <span className="text-[#8c7d6e] mt-0.5 block">
                        નક્ષત્ર આધારિત આહાર અને પ્રાકૃતિક ચિકિત્સા
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 rounded-[2rem] bg-[#f7f3eb] p-2.5 border border-[#e5ded3] shadow-sm">
                  <div className="rounded-[1.75rem] bg-white p-7 border border-[#ede7dc] text-center space-y-3">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-rose-600 to-rose-900 text-white flex items-center justify-center mx-auto shadow-md">
                      <HeartPulse className="h-8 w-8 text-rose-100" />
                    </div>
                    <p className="font-serif text-base font-medium text-[#1c1917]">
                      શારીરિક પ્રકૃતિ અને અંગ રક્ષા
                    </p>
                    <p className="text-xs text-[#8c7d6e] leading-relaxed">
                      ૬ઠ્ઠા અને ૮મા ભાવના ગ્રહો તથા રાશિ તત્વ મુજબ સ્વાસ્થ્ય સંભાળ.
                    </p>
                  </div>
                </div>
              </>
            )}

            {activeFeatureTab === 'pdf' && (
              <>
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f5ede1] px-3 py-1 border border-[#e6dcce] text-xs font-semibold text-[#b45309]">
                    <Printer className="h-3.5 w-3.5" />
                    <span>સંપૂર્ણ મુદ્રણ & A4 આર્કાઇવ</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1c1917]">
                    પ્રકાશન-સ્તરનું વૈદિક જન્મ કુંડળી PDF ડોસિયર
                  </h3>
                  <p className="text-sm sm:text-base text-[#57534e] leading-relaxed">
                    A4 મલ્ટિ-પેજ પ્રિન્ટ-રેડી લેઆઉટમાં ઉત્તર & દક્ષિણ ભારતીય કુંડળી, નવમાંશ, ગ્રહ
                    સ્પષ્ટ કોષ્ટક, ષડ્બળ બળ, વિંશોત્તરી દશા અને રત્ન ઉપાયો સાથે સંપૂર્ણ પારિવારિક
                    આર્કાઇવ સેવ કરો.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-4 rounded-2xl bg-white border border-[#e8dfd2] shadow-xs">
                      <strong className="text-[#1c1917] block font-serif text-sm">
                        શાસ્ત્રીય લેટરહેડ
                      </strong>
                      <span className="text-[#8c7d6e] mt-0.5 block">
                        ૐ શ્રી ગણેશાય નમઃ પારંપરિક મુદ્રણ
                      </span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-[#e8dfd2] shadow-xs">
                      <strong className="text-[#1c1917] block font-serif text-sm">
                        ૧-ક્લિક PDF સેવ
                      </strong>
                      <span className="text-[#8c7d6e] mt-0.5 block">
                        તમામ બ્રાઉઝર્સ અને પ્રિન્ટરમાં પરફેક્ટ પેજિનેશન
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 rounded-[2rem] bg-[#f7f3eb] p-2.5 border border-[#e5ded3] shadow-sm">
                  <div className="rounded-[1.75rem] bg-white p-7 border border-[#ede7dc] text-center space-y-3">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#b45309] to-[#78350f] text-white flex items-center justify-center mx-auto shadow-md">
                      <Printer className="h-8 w-8 text-amber-100" />
                    </div>
                    <p className="font-serif text-base font-medium text-[#1c1917]">
                      સંપૂર્ણ પારિવારિક જ્યોતિષ પુસ્તિકા
                    </p>
                    <p className="text-xs text-[#8c7d6e] leading-relaxed">
                      વ્યાવસાયિક જ્યોતિષીઓ અને પારિવારિક સંદર્ભ માટે ઉચ્ચ-ગુણવત્તાનું દસ્તાવેજીકરણ.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. FOOTER CALL TO ACTION & TRADITIONAL VEDIC BLESSING
          ========================================================================= */}
      <div className="rounded-[2.5rem] bg-[#f7f3eb] p-3 sm:p-4 border border-[#e5ded3] shadow-lg">
        <div className="rounded-[2rem] bg-white p-8 sm:p-12 border border-[#ede7dc] text-center space-y-6">
          <div className="space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[#b45309] to-[#78350f] text-white shadow-md mx-auto">
              <Compass className="h-7 w-7 text-amber-100 animate-spin-slow" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1c1917]">
              તમારું આકાશી ચક્ર અને જન્મ કુંડળી હમણાં જ જુઓ
            </h2>
            <p className="text-base text-[#57534e]">
              કોઈપણ રજીસ્ટ્રેશન કે ઇન્ટરનેટ નિર્ભરતા વગર સંપૂર્ણપણે ઑફલાઇન સચોટ ગણતરી.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => {
                setMainSection('kundli');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-3.5 rounded-full bg-gradient-to-r from-[#b45309] to-[#92400e] text-white px-8 py-4 text-sm font-semibold shadow-[0_10px_25px_-5px_rgba(180,83,9,0.35)] hover:shadow-[0_15px_30px_-5px_rgba(180,83,9,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>કુંડળી સોફ્ટવેર શરૂ કરો (Open Workspace)</span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </button>
          </div>

          {/* Traditional Vedic Sanskrit Inscription */}
          <div className="pt-8 border-t border-[#e8dfd2] space-y-1.5">
            <p className="font-serif text-xs font-bold tracking-widest text-[#b45309]">
              || ૐ સર્વે ભવન્તુ સુખિનઃ સર્વે સન્તુ નિરામયાઃ । સર્વે ભદ્રાણિ પશ્યન્તુ મા
              કશ્ચિદ્દુઃખભાગ્ભવેત્ ||
            </p>
            <p className="text-[11px] text-[#8c7d6e]">
              ચિત્રા પક્ષીય લાહિડી અયનાંશ આધારિત ઉચ્ચ-ચોક્કસાઈ વૈદિક જ્યોતિષ ગણતરી સોફ્ટવેર
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
