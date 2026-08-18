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
    {
      id: 'upcomingEvents',
      title: {
        gu: 'આગામી ગ્રહીય ઘટનાઓ & ગોચર',
        hi: 'आगामी ग्रहीय घटनाएं एवं गोचर',
        en: 'Upcoming Planetary Events & Transits',
      },
      subtitle: {
        gu: 'રાશિ પરિવર્તન, વક્રી-માર્ગી ગ્રહો, સૂર્ય-ચંદ્ર ગ્રહણ અને વ્યક્તિગત પ્રભાવ',
        hi: 'राशि परिवर्तन, वक्री/मार्गी ग्रह, ग्रहण व व्यक्तिगत प्रभाव',
        en: 'Rashi Ingresses, Retrograde Stations, Eclipses & Natal Impact',
      },
      icon: Orbit,
      badge: { gu: '૨૦૨૪ - ૨૦૩૦ પંચાંગ', hi: '२०२४ - २०३० पंचांग', en: '2024 - 2030 Ephemeris' },
      features: [
        {
          gu: 'ગુરુ, શનિ, રાહુ-કેતુના મહા રાશિ પરિવર્તન',
          hi: 'गुरु, शनि, राहु-केतु महागोचर',
          en: 'Jupiter, Saturn & Rahu-Ketu Ingresses',
        },
        {
          gu: 'સૂર્ય અને ચંદ્ર ગ્રહણ લાઈવ સમય & સૂતક કાળ',
          hi: 'सूर्य-चंद्र ग्रहण समय व सूतक काल',
          en: 'Solar & Lunar Eclipse Timings & Sutak',
        },
        {
          gu: 'બુધ, ગુરુ અને શનિ વક્રી/માર્ગી કેલેન્ડર',
          hi: 'बुध, गुरु व शनि वक्री-मार्गी कैलेंडर',
          en: 'Mercury, Jupiter & Saturn Retrogrades',
        },
        {
          gu: 'તમારી જન્મ રાશિ પર કસ્ટમ પ્રભાવ અને ઉપાય',
          hi: 'आपकी जन्म कुंडली पर प्रभाव व उपाय',
          en: 'Personalized Natal Chart Impact & Remedies',
        },
      ],
      cta: { gu: 'ગ્રહીય ઘટનાઓ જુઓ', hi: 'घटनाएं देखें', en: 'View Planetary Events' },
    },
    {
      id: 'rashifal',
      title: {
        gu: 'રાશિ ભવિષ્ય (Rashifal)',
        hi: 'राशिफल (दैनिक, साप्ताहिक, वार्षिक)',
        en: 'Vedic Rashifal & Horoscopes',
      },
      subtitle: {
        gu: 'દૈનિક, સાપ્તાહિક, માસિક અને વાર્ષિક જ્યોતિષ ફળાદેશ, સાડાસાતી & શુભ અંક',
        hi: 'दैनिक, साप्ताहिक, मासिक व वार्षिक राशिफल, साढ़ेसाती व उपाय',
        en: 'Daily, Weekly, Monthly & Yearly Astrological Forecasts & Remedies',
      },
      icon: Sparkles,
      badge: { gu: '૧૨ રાશિઓનું ભવિષ્ય', hi: '१२ राशियां', en: '12 Zodiac Signs' },
      features: [
        {
          gu: 'દૈનિક કારકિર્દી, નાણાં, પ્રેમ & આરોગ્ય સ્કોર',
          hi: 'दैनिक करियर, वित्त, प्रेम व स्वास्थ्य स्कोर',
          en: 'Daily Career, Finance, Love & Health Scores',
        },
        {
          gu: 'શુભ અંક, શુભ રંગ, શુભ દિશા & દૈનિક ઉપાય',
          hi: 'शुभ अंक, रंग, दिशा व दैनिक वैदिक उपाय',
          en: 'Lucky Numbers, Colors, Directions & Remedies',
        },
        {
          gu: '૭-દિવસીય સાપ્તાહિક & માસિક પરિપ્રેક્ષ્ય',
          hi: 'साप्ताहिक व मासिक विस्तृत विश्लेषण',
          en: '7-Day Weekly & Monthly Sector Analysis',
        },
        {
          gu: 'શનિ સાડાસાતી સ્થિતિ & ૪ ત્રિમાસિક વાર્ષિક યોજના',
          hi: 'शनि साढ़ेसाती जांच व ४ त्रैमासिक भविष्य',
          en: 'Saturn Sade Sati Status & 4 Quarters Breakdown',
        },
      ],
      cta: { gu: 'રાશિફળ વાંચો', hi: 'राशिफल देखें', en: 'Read Rashifal' },
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-20 animate-fade-in-up pb-12">
      {/* =========================================================================
          1. HERO SECTION: VALUE PROPOSITION & EMBEDDED INSTANT CALCULATOR
          ========================================================================= */}
      <Card className="relative overflow-hidden rounded-3xl border border-[var(--border-gold)] glass-panel p-6 sm:p-10 lg:p-14 shadow-2xl backdrop-blur-2xl">
        {/* Subtle Decorative Astrological Rings Backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[var(--border-gold)]/20 animate-spin-slow opacity-60"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-[var(--chart-line)]/30 animate-spin-slow opacity-50"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 bg-amber-500/5 blur-3xl"
        />

        <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Headlines & Value Prop */}
          <div className="space-y-5 lg:col-span-7">
            <Chip className="bg-amber-500/10 border border-[var(--border-gold)] text-[var(--text-gold)] px-3 py-1 font-semibold text-xs inline-flex">
              <Chip.Label className="flex items-center gap-1.5 font-mono">
                <Sparkles className="h-3.5 w-3.5" />
                <span>
                  {lang === 'gu'
                    ? 'ચિત્રા પક્ષીય લાહિડી અયનાંશ'
                    : lang === 'hi'
                      ? 'चित्रा पक्षीय लाहिड़ी अयनांश'
                      : 'Chitra Paksha Lahiri Ayanamsha'}
                </span>
              </Chip.Label>
            </Chip>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.12]">
              {lang === 'gu' ? (
                <>
                  શાસ્ત્રીય વૈદિક જ્યોતિષ & <br />
                  <span className="text-[var(--text-gold)]">સંપૂર્ણ પંચાંગ સ્યુટ</span>
                </>
              ) : lang === 'hi' ? (
                <>
                  शास्त्रीय वैदिक ज्योतिष एवं <br />
                  <span className="text-[var(--text-gold)]">सम्पूर्ण पंचांग प्रणाली</span>
                </>
              ) : (
                <>
                  Classical Vedic Astrology & <br />
                  <span className="text-[var(--text-gold)]">Panchang Calculation Suite</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl font-sans">
              {lang === 'gu'
                ? 'સ્વિસ-ગ્રેડ ચોક્કસાઈ, D1-D60 વર્ગ ચાર્ટ, ૫-સ્તરીય વિંશોત્તરી દશા અને લાઈવ ચોઘડિયા — ૧૦૦% ઑફલાઇન સક્ષમ.'
                : lang === 'hi'
                  ? 'स्विस-ग्रेड सटीकता, D1-D60 वर्ग चक्र, ५-स्तरीय विंशोत्तरी दशा व लाइव चौघड़िया — शत-प्रतिशत ऑफलाइन।'
                  : 'High-precision ephemeris, D1-D60 divisional charts, 5-tier Vimshottari dasha, and real-time panchang.'}
            </p>

            {/* Quick Action CTAs (No wrap, high contrast) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                type="button"
                onPress={() => {
                  setMainSection('kundli');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 rounded-xl glass-button-primary px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-md transition transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                <Compass className="h-4 w-4 shrink-0" />
                <span>
                  {lang === 'gu'
                    ? 'કુંડળી સોફ્ટવેર શરૂ કરો'
                    : lang === 'hi'
                      ? 'कुंडली सॉफ्टवेयर शुरू करें'
                      : 'Launch Kundli App'}
                </span>
                <ArrowRight className="h-4 w-4 ml-0.5 shrink-0" />
              </Button>

              <Button
                type="button"
                onPress={() => {
                  setMainSection('panchang');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 rounded-xl glass-card px-4 py-2.5 text-xs sm:text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--bg-card-hover)] cursor-pointer whitespace-nowrap"
              >
                <Calendar className="h-4 w-4 text-[var(--text-gold)] shrink-0" />
                <span>
                  {lang === 'gu'
                    ? 'આજનું પંચાંગ'
                    : lang === 'hi'
                      ? 'आज का पंचांग'
                      : 'Live Panchang'}
                </span>
              </Button>
            </div>

            {/* Technical Trust Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  {lang === 'gu'
                    ? '૧૦૦% ખાનગી & ઑફલાઇન'
                    : lang === 'hi'
                      ? 'शत-प्रतिशत सुरक्षित व ऑफलाइन'
                      : '100% Private & Offline'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>
                  {lang === 'gu'
                    ? 'ગુજરાતી, हिन्दी, English'
                    : lang === 'hi'
                      ? 'हिन्दी, ગુજરાતી, English'
                      : '3 Languages Supported'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>
                  {lang === 'gu'
                    ? 'પારાશરી શાસ્ત્ર આધારિત'
                    : lang === 'hi'
                      ? 'पाराशरी सिद्धांत आधारित'
                      : 'Parashari Principles'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Quick-Birth Chart Calculator Card */}
          <div className="lg:col-span-5">
            <Card className="rounded-2xl border border-[var(--border-gold)] bg-[var(--bg-card)] p-6 sm:p-7 shadow-xl backdrop-blur-xl space-y-4">
              <Card.Header className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 p-0">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg glass-button-primary">
                    <User className="h-4 w-4 text-stone-900" />
                  </div>
                  <div>
                    <Card.Title className="font-serif text-base font-bold text-[var(--text-primary)]">
                      ત્વરિત કુંડળી ગણતરી (Quick Birth Input)
                    </Card.Title>
                    <Card.Description className="text-[11px] text-[var(--text-muted)]">
                      જન્મ વિગત દાખલ કરી ૧-ક્લિકમાં કુંડળી જુઓ
                    </Card.Description>
                  </div>
                </div>
              </Card.Header>

              <form onSubmit={handleQuickSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label
                    htmlFor="landing-name"
                    className="block font-semibold text-[var(--text-secondary)] mb-1"
                  >
                    જાતકનું પૂરું નામ (Full Name)
                  </label>
                  <input
                    id="landing-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="દા.ત. રાહુલ શર્મા અથવા તમારું નામ"
                    className="w-full rounded-xl glass-input px-3 py-2 text-xs font-medium focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="landing-dob"
                      className="block font-semibold text-[var(--text-secondary)] mb-1"
                    >
                      જન્મ તારીખ (DOB)
                    </label>
                    <input
                      id="landing-dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full rounded-xl glass-input px-3 py-2 text-xs font-mono font-medium focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="landing-tob"
                      className="block font-semibold text-[var(--text-secondary)] mb-1"
                    >
                      જન્મ સમય (TOB)
                    </label>
                    <input
                      id="landing-tob"
                      type="time"
                      value={formData.tob}
                      onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                      className="w-full rounded-xl glass-input px-3 py-2 text-xs font-mono font-medium focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* City with Autocomplete & Clear Button */}
                <div className="relative" ref={cityDropdownRef}>
                  <label
                    htmlFor="landing-city"
                    className="block font-semibold text-[var(--text-secondary)] mb-1"
                  >
                    જન્મ સ્થળ (City / Town)
                  </label>
                  <div className="relative">
                    <input
                      id="landing-city"
                      type="text"
                      value={citySearch !== '' ? citySearch : formData.city || ''}
                      onChange={handleCityInputChange}
                      onFocus={() => {
                        if (formData.city || citySearch) setShowCityDropdown(true);
                      }}
                      placeholder="શહેર શોધો (દા.ત. Surat, Ahmedabad, Mumbai)..."
                      className="w-full rounded-xl glass-input pl-8 pr-8 py-2 text-xs font-medium focus:outline-hidden"
                    />
                    <MapPin className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[var(--text-muted)] pointer-events-none" />

                    {/* Clear Button */}
                    {(citySearch || formData.city) && (
                      <button
                        type="button"
                        onClick={handleClearCity}
                        title="Clear Place"
                        aria-label="Clear Place"
                        className="absolute right-2.5 top-2 h-5 w-5 flex items-center justify-center rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-pill)] transition cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {showCityDropdown && activeQuery.length > 0 && (
                    <div className="absolute left-0 right-0 top-16 z-50 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl overflow-hidden max-h-56 overflow-y-auto divide-y divide-[var(--border-subtle)]">
                      {filteredCities.map((city, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleCitySelect(city)}
                          className="w-full p-2.5 text-left text-xs hover:bg-[var(--bg-card-hover)] flex items-center justify-between text-[var(--text-primary)] cursor-pointer"
                        >
                          <span className="font-medium">{city.name}</span>
                          <span className="text-[10px] font-mono text-[var(--text-muted)]">
                            {city.lat.toFixed(2)}°N, {city.lng.toFixed(2)}°E
                          </span>
                        </button>
                      ))}

                      {/* Custom Place Confirmation Option */}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            city: activeQuery,
                            lat: prev.lat ?? 23.0225,
                            lng: prev.lng ?? 72.5714,
                            tz: prev.tz ?? 5.5,
                          }));
                          setCitySearch(activeQuery);
                          setShowCityDropdown(false);
                        }}
                        className="w-full p-2.5 text-left text-xs bg-[var(--bg-pill)] hover:bg-[var(--bg-card-hover)] flex items-center justify-between text-[var(--text-gold)] font-medium cursor-pointer"
                      >
                        <span className="truncate">➕ કસ્ટમ સ્થળ વાપરો: "{activeQuery}"</span>
                        <span className="text-[10px] text-[var(--text-muted)] shrink-0 ml-2">
                          Use Custom Place
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Custom GPS Coordinates & Timezone Toggle */}
                <div className="space-y-2 pt-0.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <button
                      type="button"
                      onClick={() => setShowCustomCoords(!showCustomCoords)}
                      className="text-[var(--text-muted)] hover:text-[var(--text-gold)] flex items-center gap-1 transition cursor-pointer font-medium"
                    >
                      <Compass className="h-3 w-3 text-[var(--text-gold)]" />
                      <span>
                        {showCustomCoords
                          ? 'કસ્ટમ અક્ષાંશ/રેખાંશ છુપાવો (Hide GPS)'
                          : 'કસ્ટમ અક્ષાંશ/રેખાંશ દાખલ કરો (Custom GPS)'}
                      </span>
                    </button>
                    {formData.lat != null && formData.lng != null && (
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">
                        {Number(formData.lat).toFixed(2)}°N, {Number(formData.lng).toFixed(2)}°E
                        (GMT+{formData.tz || 5.5})
                      </span>
                    )}
                  </div>

                  {showCustomCoords && (
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] animate-fade-in-up">
                      <div>
                        <label className="block text-[10px] font-semibold text-[var(--text-secondary)] mb-0.5">
                          અક્ષાંશ (Lat °N)
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          value={formData.lat ?? 23.0225}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lat: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-full rounded-lg glass-input px-2 py-1 text-xs font-mono focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-[var(--text-secondary)] mb-0.5">
                          રેખાંશ (Lng °E)
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          value={formData.lng ?? 72.5714}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lng: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-full rounded-lg glass-input px-2 py-1 text-xs font-mono focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-[var(--text-secondary)] mb-0.5">
                          ટાઈમઝોન (TZ)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          value={formData.tz ?? 5.5}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              tz: parseFloat(e.target.value) || 5.5,
                            })
                          }
                          className="w-full rounded-lg glass-input px-2 py-1 text-xs font-mono focus:outline-hidden"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl glass-button-primary py-2.5 text-xs font-bold shadow-md transition transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>સંપૂર્ણ કુંડળી ગણતરી કરો (Calculate)</span>
                  </Button>

                  <Button
                    type="button"
                    onPress={handleClearBirthForm}
                    className="flex items-center justify-center gap-1.5 rounded-xl glass-card px-3.5 py-2.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[#802020] hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition shadow-xs cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>સાફ કરો</span>
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </Card>

      {/* =========================================================================
          2. THE 6 DEDICATED ASTROLOGICAL PORTALS SHOWCASE
          ========================================================================= */}
      <section className="space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <Chip className="bg-amber-500/10 border border-[var(--border-gold)] text-[var(--text-gold)] px-3 py-1 font-semibold text-xs">
            <Chip.Label className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              <span>૬ સમર્પિત પોર્ટલ (6 Master Portals)</span>
            </Chip.Label>
          </Chip>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[var(--text-primary)]">
            વૈદિક ગણતરી અને પંચાંગનું સંપૂર્ણ વિશ્વ
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            દરેક ક્ષેત્ર માટે અલાયદા હાઇ-પ્રીસીઝન મોડ્યુલ — જન્મ ચાર્ટથી લઈને દૈનિક ચોઘડિયા અને લગ્ન
            ગુણ મિલન સુધી.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portalsList.map((portal) => {
            const Icon = portal.icon;
            return (
              <Card
                key={portal.id}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 shadow-sm hover:border-[var(--border-gold)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl glass-button-dark group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6 text-[var(--text-gold)]" />
                    </div>
                    <Chip className="glass-badge-gold text-[10px] font-bold px-2 py-0.5">
                      <Chip.Label>{portal.badge[lang] || portal.badge.gu}</Chip.Label>
                    </Chip>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--text-gold)] transition-colors">
                      {portal.title[lang] || portal.title.gu}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      {portal.subtitle[lang] || portal.subtitle.gu}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                    {portal.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{feat[lang] || feat.gu}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <Button
                    type="button"
                    onPress={() => {
                      setMainSection(portal.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl glass-card py-2.5 text-xs font-bold text-[var(--text-primary)] group-hover:glass-button-primary transition-all cursor-pointer"
                  >
                    <span>{portal.cta[lang] || portal.cta.gu}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. DEEP-DIVE ADVANCED ASTROLOGICAL CAPABILITIES
          ========================================================================= */}
      <Card className="rounded-3xl border border-[var(--border-gold)] glass-panel p-6 sm:p-10 shadow-xl backdrop-blur-xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
          <div>
            <Chip className="bg-amber-500/10 border border-[var(--border-gold)] text-[var(--text-gold)] px-3 py-1 font-semibold text-xs mb-2">
              <Chip.Label className="flex items-center gap-1.5">
                <Crown className="h-3.5 w-3.5" />
                <span>વિશેષ શાસ્ત્રીય સુવિધાઓ (Advanced Capabilities)</span>
              </Chip.Label>
            </Chip>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]">
              ઉચ્ચ સ્તરનું જ્યોતિષ વિશ્લેષણ & દસ્તાવેજીકરણ
            </h2>
          </div>

          {/* Interactive Feature Selectors */}
          <div className="flex flex-wrap gap-1.5 rounded-xl glass-pill p-1">
            {[
              { id: 'dasha', label: '૫-સ્તરીય દશા', icon: Clock },
              { id: 'astrocarto', label: 'એસ્ટ્રોકાર્ટોગ્રાફી', icon: Globe },
              { id: 'medical', label: 'મેડિકલ એસ્ટ્રોલોજી', icon: HeartPulse },
              { id: 'pdf', label: 'A4 PDF ડોસિયર', icon: Printer },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeFeatureTab === tab.id;
              return (
                <Button
                  key={tab.id}
                  type="button"
                  onPress={() => setActiveFeatureTab(tab.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                    isSelected
                      ? 'glass-button-primary shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-transparent'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Feature Detail Showcase Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {activeFeatureTab === 'dasha' && (
            <>
              <div className="lg:col-span-7 space-y-4">
                <Chip className="glass-badge-gold text-xs font-bold px-3 py-1">
                  <Chip.Label>વિંશોત્તરી ૧૨૦ વર્ષ ચક્ર</Chip.Label>
                </Chip>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  મહાદશાથી લઈને પ્રાણદશા સુધીનું ૫-સ્તરીય માઇક્રો-ટાઇમિંગ
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  શાસ્ત્રોક્ત વિંશોત્તરી દશા પદ્ધતિ દ્વારા જીવનની પ્રત્યેક ક્ષણનું ફળાદેશ મેળવો.
                  મહાદશા, અંતર્દશા, પ્રત્યંતર્દશા, સૂક્ષ્મ દશા અને પ્રાણ દશાની ચોક્કસ શરૂઆત અને અંત
                  તારીખ સાથેનું સંપૂર્ણ આયોજન.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl glass-card">
                    <strong className="text-[var(--text-primary)] block font-serif">
                      લાઈવ સક્રિય દશા
                    </strong>
                    <span className="text-[var(--text-muted)]">આજના દિવસની ચાલુ દશા પરિસ્થિતિ</span>
                  </div>
                  <div className="p-3 rounded-xl glass-card">
                    <strong className="text-[var(--text-primary)] block font-serif">
                      વાર્ષિક ભવિષ્યવાણી
                    </strong>
                    <span className="text-[var(--text-muted)]">
                      કારકિર્દી, સ્વાસ્થ્ય અને ધનલાભ તબક્કા
                    </span>
                  </div>
                </div>
              </div>
              <Card className="lg:col-span-5 rounded-2xl border border-[var(--border-gold)] bg-[var(--bg-card)] p-5 text-center space-y-3">
                <Clock className="h-12 w-12 text-[var(--text-gold)] mx-auto animate-pulse" />
                <p className="font-serif text-sm font-bold text-[var(--text-primary)]">
                  સૂક્ષ્મ દશા પરિભ્રમણ ચાર્ટ
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  ચંદ્ર નક્ષત્રના ભોગ્યાંશ આધારે ૧૨૦ વર્ષના નક્ષત્ર સ્વામીઓની ચોક્કસ ગણતરી.
                </p>
              </Card>
            </>
          )}

          {activeFeatureTab === 'astrocarto' && (
            <>
              <div className="lg:col-span-7 space-y-4">
                <Chip className="glass-badge-gold text-xs font-bold px-3 py-1">
                  <Chip.Label>વિશ્વ નકશો & ભૌગોલિક રેખાઓ</Chip.Label>
                </Chip>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  એસ્ટ્રોકાર્ટોગ્રાફી (AstroCartography Global Angularity)
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  વિશ્વના કયા શહેરમાં અથવા દેશમાં તમારા ગ્રહો શક્તિશાળી કેન્દ્ર સ્થાનો (Ascendant,
                  Midheaven, Descendant, IC) પર બિરાજમાન થાય છે તેનું ભૌગોલિક વિશ્વ નકશા પર જીવંત
                  પ્રદર્શન.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl glass-card">
                    <strong className="text-[var(--text-primary)] block font-serif">
                      વિદેશ યાત્રા & સ્થળાંતર
                    </strong>
                    <span className="text-[var(--text-muted)]">
                      કારકિર્દી અને સમૃદ્ધિ માટે શ્રેષ્ઠ શહેરો
                    </span>
                  </div>
                  <div className="p-3 rounded-xl glass-card">
                    <strong className="text-[var(--text-primary)] block font-serif">
                      ગ્રહ રેખાઓ
                    </strong>
                    <span className="text-[var(--text-muted)]">
                      સૂર્ય, ગુરુ, શુક્ર વગેરેની આંતરરાષ્ટ્રીય અસર
                    </span>
                  </div>
                </div>
              </div>
              <Card className="lg:col-span-5 rounded-2xl border border-[var(--border-gold)] bg-[var(--bg-card)] p-5 text-center space-y-3">
                <Globe className="h-12 w-12 text-blue-500 mx-auto" />
                <p className="font-serif text-sm font-bold text-[var(--text-primary)]">
                  વૈશ્વિક ગ્રહ પ્રભાવ નકશો
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  વિશ્વના ૨૦+ મુખ્ય શહેરોમાં તમારી કુંડળીના ગ્રહ પ્રભાવનું તુલનાત્મક વિશ્લેષણ.
                </p>
              </Card>
            </>
          )}

          {activeFeatureTab === 'medical' && (
            <>
              <div className="lg:col-span-7 space-y-4">
                <Chip className="glass-badge-gold text-xs font-bold px-3 py-1">
                  <Chip.Label>આયુર્વેદિક ત્રિદોષ & સ્વાસ્થ્ય</Chip.Label>
                </Chip>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  આયુર્વેદિક મેડિકલ એસ્ટ્રોલોજી & શારીરિક સંરચના
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  વાત, પિત્ત અને કફ દોષનું જ્યોતિષીય વિશ્લેષણ, ૧૨ ભાવોની અંગ સંવેદનશીલતા અને સંભવિત
                  રોગોના નિવારણ માટે આયુર્વેદિક ઉપચાર તથા પથ્ય-અપથ્ય માર્ગદર્શન.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl glass-card">
                    <strong className="text-[var(--text-primary)] block font-serif">
                      ત્રિદોષ ટકાવારી
                    </strong>
                    <span className="text-[var(--text-muted)]">
                      વાત, પિત્ત, કફ પ્રકૃતિનું વિશ્લેષણ
                    </span>
                  </div>
                  <div className="p-3 rounded-xl glass-card">
                    <strong className="text-[var(--text-primary)] block font-serif">
                      ઋતુચર્યા & ઉપાય
                    </strong>
                    <span className="text-[var(--text-muted)]">
                      નક્ષત્ર આધારિત આહાર અને પ્રાકૃતિક ચિકિત્સા
                    </span>
                  </div>
                </div>
              </div>
              <Card className="lg:col-span-5 rounded-2xl border border-[var(--border-gold)] bg-[var(--bg-card)] p-5 text-center space-y-3">
                <HeartPulse className="h-12 w-12 text-rose-500 mx-auto" />
                <p className="font-serif text-sm font-bold text-[var(--text-primary)]">
                  શારીરિક પ્રકૃતિ અને અંગ રક્ષા
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  ૬ઠ્ઠા અને ૮મા ભાવના ગ્રહો તથા રાશિ તત્વ મુજબ સ્વાસ્થ્ય સંભાળ.
                </p>
              </Card>
            </>
          )}

          {activeFeatureTab === 'pdf' && (
            <>
              <div className="lg:col-span-7 space-y-4">
                <Chip className="glass-badge-gold text-xs font-bold px-3 py-1">
                  <Chip.Label>સંપૂર્ણ મુદ્રણ & A4 આર્કાઇવ</Chip.Label>
                </Chip>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  પ્રકાશન-સ્તરનું વૈદિક જન્મ કુંડળી PDF ડોસિયર
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  A4 મલ્ટિ-પેજ પ્રિન્ટ-રેડી લેઆઉટમાં ઉત્તર & દક્ષિણ ભારતીય કુંડળી, નવમાંશ, ગ્રહ
                  સ્પષ્ટ કોષ્ટક, ષડ્બળ બળ, વિંશોત્તરી દશા અને રત્ન ઉપાયો સાથે સંપૂર્ણ પારિવારિક
                  આર્કાઇવ સેવ કરો.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl glass-card">
                    <strong className="text-[var(--text-primary)] block font-serif">
                      શાસ્ત્રીય લેટરહેડ
                    </strong>
                    <span className="text-[var(--text-muted)]">
                      ૐ શ્રી ગણેશાય નમઃ પારંપરિક મુદ્રણ
                    </span>
                  </div>
                  <div className="p-3 rounded-xl glass-card">
                    <strong className="text-[var(--text-primary)] block font-serif">
                      ૧-ક્લિક PDF સેવ
                    </strong>
                    <span className="text-[var(--text-muted)]">
                      તમામ બ્રાઉઝર્સ અને પ્રિન્ટરમાં પરફેક્ટ પેજિનેશન
                    </span>
                  </div>
                </div>
              </div>
              <Card className="lg:col-span-5 rounded-2xl border border-[var(--border-gold)] bg-[var(--bg-card)] p-5 text-center space-y-3">
                <Printer className="h-12 w-12 text-[var(--text-gold)] mx-auto" />
                <p className="font-serif text-sm font-bold text-[var(--text-primary)]">
                  સંપૂર્ણ પારિવારિક જ્યોતિષ પુસ્તિકા
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  વ્યાવસાયિક જ્યોતિષીઓ અને પારિવારિક સંદર્ભ માટે ઉચ્ચ-ગુણવત્તાનું દસ્તાવેજીકરણ.
                </p>
              </Card>
            </>
          )}
        </div>
      </Card>

      {/* =========================================================================
          4. FOOTER CALL TO ACTION & TRADITIONAL VEDIC BLESSING
          ========================================================================= */}
      <Card className="text-center space-y-8 rounded-3xl border border-[var(--border-gold)] bg-gradient-to-b from-[var(--bg-card)] to-[var(--bg-panel)] p-8 sm:p-12 shadow-2xl backdrop-blur-2xl">
        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl glass-button-dark shadow-md">
            <Compass className="h-8 w-8 text-[var(--text-gold)] animate-spin-slow" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)]">
            તમારું આકાશી ચક્ર અને જન્મ કુંડળી હમણાં જ જુઓ
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            કોઈપણ રજીસ્ટ્રેશન કે ઇન્ટરનેટ નિર્ભરતા વગર સંપૂર્ણપણે ઑફલાઇન સચોટ ગણતરી.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            type="button"
            onPress={() => {
              setMainSection('kundli');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 rounded-xl glass-button-primary px-8 py-3.5 text-sm font-bold shadow-xl transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>કુંડળી સોફ્ટવેર શરૂ કરો (Open Workspace)</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Traditional Vedic Sanskrit Inscription */}
        <div className="pt-8 border-t border-[var(--border-subtle)] space-y-2">
          <p className="font-serif text-xs font-bold tracking-widest text-[var(--text-gold)]">
            || ૐ સર્વે ભવન્તુ સુખિનઃ સર્વે સન્તુ નિરામયાઃ । સર્વે ભદ્રાણિ પશ્યન્તુ મા
            કશ્ચિદ્દુઃખભાગ્ભવેત્ ||
          </p>
          <p className="text-[11px] text-[var(--text-muted)]">
            ચિત્રા પક્ષીય લાહિડી અયનાંશ આધારિત ઉચ્ચ-ચોક્કસાઈ વૈદિક જ્યોતિષ ગણતરી સોફ્ટવેર
          </p>
        </div>
      </Card>
    </div>
  );
}
