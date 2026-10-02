import React, { useState, useRef, useEffect } from 'react';
import { cityData } from '../engine/cityData.js';
import {
  Compass,
  Calendar,
  Clock,
  CalendarDays,
  Hash,
  Heart,
  Globe,
  ChevronRight,
  ArrowRight,
  MapPin,
  User,
  CheckCircle2,
  X,
  RotateCcw,
  Orbit,
  Star,
  Layers,
  Moon,
  Sparkles,
  BookOpen,
} from 'lucide-react';

/* ─── Labels (Sentence Case) ─────────────────────────── */
const L = {
  heroTitle: {
    gu: 'ૐ શ્રી ગણેશાય નમઃ',
    hi: 'ॐ श्री गणेशाय नमः',
    en: 'Vedic Astrology Suite',
  },
  heroSub: {
    gu: 'ભારતની પ્રાચીન જ્યોતિષ વિદ્યા — ડિજિટલ સ્વરૂપે',
    hi: 'भारत की प्राचीन ज्योतिष विद्या — डिजिटल रूप में',
    en: 'Ancient Indian astronomy, computed with precision',
  },
  heroCta: { gu: 'કુંડળી બનાવો', hi: 'कुंडली बनाएं', en: 'Generate kundli' },
  heroCtaSec: { gu: 'પ્રદર્શન', hi: 'ડેમો જુઓ', en: 'View demo' },
  formName: { gu: 'પૂર્ણ નામ', hi: 'पूरा नाम', en: 'Full name' },
  formDob: { gu: 'જન્મ તારીખ', hi: 'जन्म तिथि', en: 'Date of birth' },
  formTob: { gu: 'જન્મ સમય', hi: 'जन्म समय', en: 'Time of birth' },
  formCity: { gu: 'જન્મ સ્થળ', hi: 'जन्म स्थान', en: 'Birth place' },
  formGender: { gu: 'જાતિ', hi: 'लिंग', en: 'Gender' },
  formMale: { gu: 'પુરુષ', hi: 'पुरुष', en: 'Male' },
  formFemale: { gu: 'સ્ત્રી', hi: 'स्त्री', en: 'Female' },
  formSubmit: { gu: 'કુંડળી જુઓ →', hi: 'कुंडली देखें →', en: 'View kundli →' },
  formClear: { gu: 'સાફ કરો', hi: 'साफ करें', en: 'Clear' },
  formLat: { gu: 'અક્ષાંશ', hi: 'अक्षांश', en: 'Lat' },
  formLng: { gu: 'રેખાંશ', hi: 'देशांतर', en: 'Lng' },
  portalsTitle: { gu: 'આઠ જ્ઞાન-મંડળ', hi: 'आठ ज्ञान मंडल', en: 'Eight knowledge portals' },
  portalsDesc: {
    gu: 'પ્રાચીન ગ્રંથોથી ગણના — સચોટ, સ્થળ-આધારિત, ૧૦૦% ઓફ-લાઇન',
    hi: 'प्राचीन ग्रंथों की गणना — सटीक, स्थान-आधारित, १००% ऑफ़लाइन',
    en: 'Computed from ancient texts — precise, location-based, 100% offline',
  },
  featTitle: { gu: 'ગ્રહ ગ્રંથ', hi: 'ग्रह ग्रंथ', en: "What's inside" },
  statsLabel1: { gu: 'જ્ઞાન-મંડળ', hi: 'ज्ञान मंडल', en: 'Portals' },
  statsLabel2: { gu: 'સાધનો', hi: 'विशेषताएं', en: 'Tools' },
  statsLabel3: { gu: 'ભાષાઓ', hi: 'भाषाएं', en: 'Languages' },
  statsLabel4: { gu: 'ઓફ-લાઇન', hi: 'ऑफ़लाइन', en: 'Offline' },
};

/* ─── Portal Data ────────────────────────────────────── */
const PORTALS = [
  {
    id: 'kundli',
    icon: Compass,
    badge: { gu: 'D1–D60', hi: 'D1–D60', en: 'D1–D60' },
    title: { gu: 'જન્મ કુંડળી', hi: 'जन्म कुंडली', en: 'Birth Kundli' },
    desc: {
      gu: '૧૬ વર્ગ ચાર્ટ, ૫-સ્તરીય દશા, શડ-બળ, જૈમિની',
      hi: '१६ वर्ग, ५-स्तरीय दशा, षड्बल',
      en: '16 divisional charts, 5-tier dasha, Shadbala',
    },
  },
  {
    id: 'panchang',
    icon: Calendar,
    badge: { gu: 'દૈનિક', hi: 'दैनिक', en: 'Daily' },
    title: { gu: 'ગુ. પંચાંગ', hi: 'गुजराती पंचांग', en: 'Gujarati Panchang' },
    desc: {
      gu: 'તિથિ, નક્ષત્ર, ચોઘડિયા, રાહુ કાળ',
      hi: 'तिथि, नक्षत्र, चौघड़िया',
      en: 'Tithi, Nakshatra, Choghadiya, Rahu Kaal',
    },
  },
  {
    id: 'matchmaking',
    icon: Heart,
    badge: { gu: '36 ગુણ', hi: '36 गुण', en: '36 Gunas' },
    title: { gu: 'ગુણ મિલન', hi: 'गुण मिलान', en: 'Kundli Matching' },
    desc: {
      gu: 'અષ્ટ-કૂટ મૂઝ, નાડી, ભ-કૂટ',
      hi: 'अष्ट-कूट, नाड़ी, भ-कूट',
      en: 'Ashtakoot, Nadi, Bhakoot matching',
    },
  },
  {
    id: 'vedicClock',
    icon: Clock,
    badge: { gu: 'સમય', hi: 'समय', en: 'Real-time' },
    title: { gu: 'વૈદિક ઘડિયાળ', hi: 'वैदिक घड़ी', en: 'Vedic Clock' },
    desc: {
      gu: '૬૦ ઘટી, ૩૦ મુહૂર્ત, કાળ ચક્ર',
      hi: '६० घटी, ३० मुहूर्त',
      en: '60 Ghatis, 30 Muhurtas, Kaal Chakra',
    },
  },
  {
    id: 'calendar',
    icon: CalendarDays,
    badge: { gu: '૨૦૮૨–૮૩', hi: '२०८२–८३', en: 'VS 2082–83' },
    title: { gu: 'ભીંત કેલેન્ડર', hi: 'दीवार कैलेंडर', en: 'Wall Calendar' },
    desc: {
      gu: 'વિ. સં. ૨૦૮૨–૨૦૮૩ હિન્દુ તહેવારો',
      hi: 'विक्रम संवत पर्व',
      en: 'Vikram Samvat with festivals',
    },
  },
  {
    id: 'numerology',
    icon: Hash,
    badge: { gu: 'Lo Shu', hi: 'लो शु', en: 'Lo Shu' },
    title: { gu: 'અંકશાસ્ત્ર', hi: 'अंकशास्त्र', en: 'Numerology' },
    desc: {
      gu: 'મૂળાંક, ભાગ્યાંક, Lo Shu ગ્રીડ',
      hi: 'मूलांक, भाग्यांक, Lo Shu ग्रिड',
      en: 'Life path, destiny, Lo Shu grid',
    },
  },
  {
    id: 'upcomingEvents',
    icon: Orbit,
    badge: { gu: 'ગોચર', hi: 'गोचर', en: 'Transits' },
    title: { gu: 'ગ્રહ ઘટનાઓ', hi: 'ग्रह घटनाएं', en: 'Planetary Transits' },
    desc: {
      gu: 'ગ્રહ ગોચર, ગ્રહણ, વક્રી ગ્રહો',
      hi: 'ग्रह गोचर, ग्रहण, वक्री',
      en: 'Transits, eclipses, retrogrades',
    },
  },
  {
    id: 'rashifal',
    icon: Star,
    badge: { gu: 'રાશિફળ', hi: 'राशिफल', en: 'Forecast' },
    title: { gu: 'રાશિ ભવિષ્ય', hi: 'राशिफल', en: 'Rashifal' },
    desc: {
      gu: 'દૈનિક, સાપ્તાહિક, માસિક, વાર્ષિક',
      hi: 'दैनिक, साप्ताहिक, मासिक',
      en: 'Daily, weekly, monthly horoscope',
    },
  },
];

/* ─── Component ──────────────────────────────────────── */
export default function LandingPage({
  formData,
  setFormData,
  generateKundli,
  setMainSection,
  _t,
  lang = 'gu',
}) {
  const [citySearch, setCitySearch] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const cityDropdownRef = useRef(null);

  const l = (obj) => obj?.[lang] ?? obj?.en ?? '';

  useEffect(() => {
    function handleClickOutside(event) {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setShowCityDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    if (exact)
      setFormData((prev) => ({
        ...prev,
        city: exact.name,
        lat: exact.lat,
        lng: exact.lng,
        tz: exact.tz,
      }));
  };

  const handleClearCity = () => {
    setCitySearch('');
    setFormData((prev) => ({ ...prev, city: '', lat: null, lng: null }));
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
    if (!formData.dob || !formData.tob) {
      setFormData(fallback);
      generateKundli(fallback);
    } else generateKundli(formData);
    setMainSection('kundli');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ── Shared Parchment Form Styles ── */
  const inputStyle = {
    background: '#ffffff',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--r-md)',
    color: 'var(--text-primary)',
    padding: '10px 14px',
    fontSize: 14,
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'Outfit, sans-serif',
  };

  const labelStyle = {
    display: 'block',
    fontSize: 12,
    fontWeight: 500,
    color: 'var(--text-secondary)',
    marginBottom: 6,
    fontFamily: 'Outfit, sans-serif',
  };

  return (
    <div className="animate-depth-rise space-y-12">
      {/* ════════════════════════════════════════════════════
          SECTION 1: HERO
          ════════════════════════════════════════════════════ */}
      <section className="relative pt-6 pb-4 sm:pt-14 sm:pb-8">
        <div className="relative text-center max-w-3xl mx-auto px-4">
          {/* Subtle Vedic Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 bg-[#faeee2] border border-[#e8b992]/80 text-[#9c4b0f]">
            <Moon className="w-3.5 h-3.5" />
            <span className="text-xs font-medium tracking-wide">
              {lang === 'gu'
                ? 'વૈદિક જ્યોતિષ વિદ્યા'
                : lang === 'hi'
                  ? 'वैदिक ज्योतिष विद्या'
                  : 'Vedic astrology'}
            </span>
          </div>

          {/* Main Headline (Rule: text-3xl for major headings, font-medium, tracking-tight) */}
          <h1
            className="text-3xl font-medium tracking-tight mb-3 text-[var(--text-primary)]"
            style={{ fontFamily: 'Cinzel, Outfit, serif', letterSpacing: '-0.025em' }}
          >
            {l(L.heroTitle)}
          </h1>

          {/* Subtitle (Rule: text-lg for section copy) */}
          <p
            className="text-lg max-w-xl mx-auto mb-7 text-[var(--text-secondary)] font-normal leading-relaxed"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            {l(L.heroSub)}
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleQuickSubmit}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium cursor-pointer spatial-btn-primary"
            >
              <Compass className="w-4 h-4" />
              {l(L.heroCta)}
            </button>
            <button
              type="button"
              onClick={() => {
                setMainSection('kundli');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer spatial-btn-outline"
            >
              {l(L.heroCtaSec)}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Stat bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto mt-10 pt-7 border-t border-[var(--border-subtle)]">
            {[
              { num: '8', label: l(L.statsLabel1) },
              { num: '40+', label: l(L.statsLabel2) },
              { num: '3', label: l(L.statsLabel3) },
              { num: '100%', label: l(L.statsLabel4) },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-medium font-mono text-[var(--gold-500)]">{num}</div>
                <div className="text-xs text-[var(--text-secondary)] mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 2: BIRTH DETAILS FORM
          ════════════════════════════════════════════════════ */}
      <section className="max-w-2xl mx-auto px-4">
        <form onSubmit={handleQuickSubmit}>
          <div className="rounded-2xl p-6 sm:p-8 spatial-panel">
            {/* Form header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#faeee2] border border-[#e8b992]/80 text-[#b85d19]">
                  <Compass className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h2 className="text-base font-medium text-[var(--text-primary)]">
                    {lang === 'gu' ? 'જન્મ વિગત' : lang === 'hi' ? 'जन्म विवरण' : 'Birth details'}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    {lang === 'gu'
                      ? 'ખાલી છોડો — નમૂના ડેટા વાપરવામાં આવશે'
                      : lang === 'hi'
                        ? 'खाली छोड़ें — उदाहरण डेटा प्रयुक्त होगा'
                        : 'Leave blank to use example profile'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClearBirthForm}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer spatial-btn-ghost"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {l(L.formClear)}
              </button>
            </div>

            {/* Fields grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label style={labelStyle}>{l(L.formName)}</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
                  <input
                    type="text"
                    placeholder={
                      lang === 'gu'
                        ? 'દા.ત. રાધા શ્રીવાસ્તવ'
                        : lang === 'hi'
                          ? 'जैसे राधा श्रीवास्तव'
                          : 'e.g. Radha Srivastava'
                    }
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    style={{ ...inputStyle, paddingLeft: 34 }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--gold-500)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(184,93,25,0.12)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border-default)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label style={labelStyle}>{l(L.formGender)}</label>
                <div className="flex gap-2">
                  {['male', 'female'].map((g) => {
                    const isSelected = formData.gender === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, gender: g }))}
                        className="flex-1 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all"
                        style={{
                          background: isSelected ? 'var(--gold-100)' : '#ffffff',
                          border: `1px solid ${isSelected ? 'var(--border-gold)' : 'var(--border-default)'}`,
                          color: isSelected ? 'var(--gold-600)' : 'var(--text-secondary)',
                        }}
                      >
                        {g === 'male' ? l(L.formMale) : l(L.formFemale)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date of birth */}
              <div>
                <label style={labelStyle}>{l(L.formDob)}</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData((p) => ({ ...p, dob: e.target.value }))}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--gold-500)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(184,93,25,0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-default)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Time of birth */}
              <div>
                <label style={labelStyle}>{l(L.formTob)}</label>
                <input
                  type="time"
                  value={formData.tob}
                  onChange={(e) => setFormData((p) => ({ ...p, tob: e.target.value }))}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--gold-500)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(184,93,25,0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-default)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* City autocomplete */}
              <div className="sm:col-span-2" ref={cityDropdownRef}>
                <label style={labelStyle}>{l(L.formCity)}</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
                  <input
                    type="text"
                    placeholder={
                      lang === 'gu'
                        ? 'દા.ત. Ahmedabad'
                        : lang === 'hi'
                          ? 'जैसे Ahmedabad'
                          : 'e.g. Ahmedabad'
                    }
                    value={citySearch || formData.city}
                    onChange={handleCityInputChange}
                    onFocus={() => {
                      if ((citySearch || formData.city).length > 0) setShowCityDropdown(true);
                    }}
                    style={{
                      ...inputStyle,
                      paddingLeft: 34,
                      paddingRight: formData.city ? 34 : 14,
                    }}
                    onFocusCapture={(e) => {
                      e.target.style.borderColor = 'var(--gold-500)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(184,93,25,0.12)';
                    }}
                    onBlurCapture={(e) => {
                      e.target.style.borderColor = 'var(--border-default)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  {formData.city && (
                    <button
                      type="button"
                      onClick={handleClearCity}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Dropdown */}
                  {showCityDropdown && filteredCities.length > 0 && (
                    <div className="absolute left-0 right-0 mt-1 rounded-xl overflow-hidden z-20 bg-white border border-[var(--border-default)] shadow-lg">
                      {filteredCities.map((city) => (
                        <button
                          key={city.name}
                          type="button"
                          onMouseDown={() => handleCitySelect(city)}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left text-sm transition-colors cursor-pointer hover:bg-[#faf6ef] border-b border-[var(--border-void)] last:border-b-0 text-[var(--text-primary)]"
                        >
                          <MapPin className="w-3.5 h-3.5 text-[var(--gold-500)] shrink-0" />
                          <span>{city.name}</span>
                          <span className="ml-auto font-mono text-xs text-[var(--text-muted)]">
                            {city.lat?.toFixed(2)}°N
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Coordinates display when city is selected */}
                {formData.lat && formData.lng && (
                  <div className="flex items-center gap-2.5 mt-2.5">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-[var(--depth-2)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                      {l(L.formLat)} {formData.lat?.toFixed(4)}°
                    </span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-[var(--depth-2)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                      {l(L.formLng)} {formData.lng?.toFixed(4)}°
                    </span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-[var(--depth-2)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                      UTC +{formData.tz}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6 pt-5 border-t border-[var(--border-subtle)]">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium cursor-pointer spatial-btn-primary"
              >
                <Compass className="w-4 h-4" />
                {l(L.formSubmit)}
              </button>
              <p className="text-center text-xs mt-3 text-[var(--text-muted)]">
                {lang === 'gu'
                  ? '૧૦૦% ઓફ-લાઇન ગણના • આપનો ડેટા સંપૂર્ણ સુરક્ષિત છે'
                  : lang === 'hi'
                    ? '१००% ऑफ़लाइन गणना • आपका डेटा इस डिवाइस पर सुरक्षित है'
                    : '100% offline computations · Data never leaves your device'}
              </p>
            </div>
          </div>
        </form>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 3: EIGHT PORTALS GRID
          ════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        {/* Section header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 bg-[#faeee2] border border-[#e8b992]/80 text-[#9c4b0f]">
            <Layers className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">
              {lang === 'gu' ? 'જ્ઞાન-મંડળ' : lang === 'hi' ? 'ज्ञान मंडल' : 'Knowledge portals'}
            </span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]"
            style={{ fontFamily: 'Cinzel, Outfit, serif' }}
          >
            {l(L.portalsTitle)}
          </h2>
          <p className="text-base mt-2 max-w-md mx-auto text-[var(--text-secondary)] font-normal">
            {l(L.portalsDesc)}
          </p>
        </div>

        {/* Portals grid: 4 columns on desktop, 2 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {PORTALS.map((portal) => {
            const Icon = portal.icon;
            return (
              <button
                key={portal.id}
                type="button"
                onClick={() => {
                  setMainSection(portal.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group text-left p-4 rounded-2xl cursor-pointer transition-all bg-white border border-[var(--border-subtle)] shadow-xs hover:border-[var(--border-gold)] hover:bg-[#faf6ef] hover:shadow-sm"
              >
                {/* Icon + badge row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#faeee2] border border-[#e8b992]/60 text-[#b85d19] transition-colors group-hover:bg-[#f3d7bf]/80">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--depth-2)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                    {l(portal.badge)}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-medium text-sm mb-1.5 text-[var(--text-primary)] group-hover:text-[var(--gold-600)] transition-colors"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {l(portal.title)}
                </h3>

                {/* Description */}
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {l(portal.desc)}
                </p>

                {/* Open arrow */}
                <div className="flex items-center gap-1 mt-3 text-xs font-medium text-[var(--gold-500)] opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  <span>{lang === 'gu' ? 'ખોલો' : lang === 'hi' ? 'खोलें' : 'Open'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 4: TRUST FOOTER STRIP
          ════════════════════════════════════════════════════ */}
      <section className="max-w-3xl mx-auto px-4 pb-10">
        <div className="rounded-2xl px-6 py-4 flex flex-wrap items-center justify-center gap-6 sm:gap-8 bg-white border border-[var(--border-subtle)] shadow-xs">
          {[
            {
              icon: CheckCircle2,
              label:
                lang === 'gu' ? '૧૦૦% ઓફ-લાઇન' : lang === 'hi' ? '१००% ऑफलाइन' : '100% offline',
            },
            {
              icon: Globe,
              label: lang === 'gu' ? '૩ ભાષાઓ' : lang === 'hi' ? '३ भाषाएं' : '3 languages',
            },
            {
              icon: BookOpen,
              label:
                lang === 'gu'
                  ? 'સ્વિસ એફેમેરિસ'
                  : lang === 'hi'
                    ? 'सटीक गणना'
                    : 'Astronomical precision',
            },
            {
              icon: Layers,
              label: lang === 'gu' ? '૪૦+ સાધનો' : lang === 'hi' ? '४०+ विशेषताएं' : '40+ tools',
            },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-[var(--gold-500)]" />
              <span className="text-xs text-[var(--text-secondary)] font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
