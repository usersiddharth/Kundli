import React, { useState, useRef, useEffect } from 'react';
import { cityData } from '../engine/cityData.js';
import {
  Compass,
  Sparkles,
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
  Crown,
  X,
  RotateCcw,
  Orbit,
  Star,
  Layers,
  Moon,
} from 'lucide-react';

/* ─── Labels ─────────────────────────────────────────── */
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
  heroCtaSec: { gu: 'પ્રદર્શન', hi: 'डेमो देखें', en: 'View demo' },
  formName: { gu: 'પૂર્ણ નામ', hi: 'पूरा नाम', en: 'Full name' },
  formDob:  { gu: 'જન્મ તારીખ', hi: 'जन्म तिथि', en: 'Date of birth' },
  formTob:  { gu: 'જન્મ સમય', hi: 'जन्म समय', en: 'Time of birth' },
  formCity: { gu: 'જન્મ સ્થળ', hi: 'जन्म स्थान', en: 'Birth place' },
  formGender: { gu: 'જાતિ', hi: 'लिंग', en: 'Gender' },
  formMale:   { gu: 'પુરુષ', hi: 'पुरुष', en: 'Male' },
  formFemale: { gu: 'સ્ત્રી', hi: 'स्त्री', en: 'Female' },
  formSubmit: { gu: 'કુંડળી જુઓ →', hi: 'कुंडली देखें →', en: 'View kundli →' },
  formClear:  { gu: 'સ્પષ્ટ', hi: 'साफ', en: 'Clear' },
  formLat: { gu: 'અક્ષ', hi: 'अक्षांश', en: 'Lat' },
  formLng: { gu: 'રેખ', hi: 'देशांतर', en: 'Lng' },
  portalsTitle: { gu: 'આઠ જ્ઞાન-મંડળ', hi: 'आठ ज्ञान मंडल', en: 'Eight knowledge portals' },
  portalsDesc: {
    gu: 'પ્રાચીન ગ્રંથોથી ગણના — ચોકસ, સ્થળ-આધારિત, ૧૦૦% ઓફ-લાઇન',
    hi: 'प्राचीन ग्रंथों की गणना — सटीक, स्थान-आधारित, १००% ऑफ़लाइन',
    en: 'Computed from ancient texts — precise, location-based, 100% offline',
  },
  featTitle: { gu: 'ગ્રહ ગ્રંથ', hi: 'ग्रह ग्रंथ', en: 'What\'s inside' },
  statsLabel1: { gu: 'ગ્રહ ગ્રંથ', hi: 'ग्रंथ', en: 'Sanskrit texts' },
  statsLabel2: { gu: 'ગ્રહ ગ્રંથ', hi: 'विशेषताएं', en: 'Features' },
  statsLabel3: { gu: 'ભાષાઓ', hi: 'भाषाएं', en: 'Languages' },
};

/* ─── Portal Data ────────────────────────────────────── */
const PORTALS = [
  {
    id: 'kundli', icon: Compass, color: '#f59e0b', glow: 'rgba(245,158,11,0.15)',
    badge: { gu: 'D1–D60', hi: 'D1–D60', en: 'D1–D60' },
    title: { gu: 'જન્મ કુંડળી', hi: 'जन्म कुंडली', en: 'Birth Kundli' },
    desc: { gu: '૧૬ વર્ગ ચાર્ટ, ૫-સ્તરીય દશા, શડ-બળ, જૈમિની', hi: '१६ वर्ग, ५-स्तरीय दशा, षड्बल', en: '16 divisional charts, 5-tier dasha, Shadbala' },
  },
  {
    id: 'panchang', icon: Calendar, color: '#a78bfa', glow: 'rgba(167,139,250,0.15)',
    badge: { gu: 'લાઈવ', hi: 'लाइव', en: 'Live' },
    title: { gu: 'ગુ. પંચાંગ', hi: 'गुजराती पंचांग', en: 'Gujarati Panchang' },
    desc: { gu: 'તિથિ, નક્ષત્ર, ચોઘડિયા, રાહુ કાળ', hi: 'तिथि, नक्षत्र, चौघड़िया', en: 'Tithi, Nakshatra, Choghadiya, Rahu Kaal' },
  },
  {
    id: 'matchmaking', icon: Heart, color: '#f43f5e', glow: 'rgba(244,63,94,0.15)',
    badge: { gu: '36 ગુણ', hi: '36 गुण', en: '36 Gunas' },
    title: { gu: 'ગુણ મિલન', hi: 'गुण मिलान', en: 'Kundli Matching' },
    desc: { gu: 'અષ્ટ-કૂટ મૂઝ, નાડી, ભ-કૂટ', hi: 'अष्ट-कूट, नाड़ी, भ-कूट', en: 'Ashtakoot, Nadi, Bhakoot matching' },
  },
  {
    id: 'vedicClock', icon: Clock, color: '#34d399', glow: 'rgba(52,211,153,0.15)',
    badge: { gu: 'રીઅલ-ટાઈમ', hi: 'रीयल-टाइम', en: 'Real-time' },
    title: { gu: 'વૈદિક ઘડિયાળ', hi: 'वैदिक घड़ी', en: 'Vedic Clock' },
    desc: { gu: '૬૦ ઘટી, ૩૦ મુહૂર્ત, કાળ ચક્ર', hi: '६० घटी, ३० मुहूर्त', en: '60 Ghatis, 30 Muhurtas, Kaal Chakra' },
  },
  {
    id: 'calendar', icon: CalendarDays, color: '#60a5fa', glow: 'rgba(96,165,250,0.15)',
    badge: { gu: '2082–83', hi: '२०८२–८३', en: 'VS 2082–83' },
    title: { gu: 'ભીંત કેલેન્ડર', hi: 'दीवार कैलेंडर', en: 'Wall Calendar' },
    desc: { gu: 'વિ. સં. ૨૦૮૨–૨૦૮૩ હિન્દુ તહેવારો', hi: 'विक्रम संवत पर्व', en: 'Vikram Samvat with festivals' },
  },
  {
    id: 'numerology', icon: Hash, color: '#fb923c', glow: 'rgba(251,146,60,0.15)',
    badge: { gu: 'Lo Shu', hi: 'लो शु', en: 'Lo Shu' },
    title: { gu: 'અંકશાસ્ત્ર', hi: 'अंकशास्त्र', en: 'Numerology' },
    desc: { gu: 'મૂળાંક, ભાગ્યાંક, Lo Shu ગ્રીડ', hi: 'मूलांक, भाग्यांक, Lo Shu ग्रिड', en: 'Life path, destiny, Lo Shu grid' },
  },
  {
    id: 'upcomingEvents', icon: Orbit, color: '#c084fc', glow: 'rgba(192,132,252,0.15)',
    badge: { gu: 'ગ્રહ ગોચર', hi: 'गोचर', en: 'Gochar' },
    title: { gu: 'ગ્રહ ઘટનાઓ', hi: 'ग्रह घटनाएं', en: 'Planetary Transits' },
    desc: { gu: 'ગ્રહ ગોચર, ગ્રહણ, ઉત્ક્રમણ', hi: 'ग्रह गोचर, ग्रहण, वक्री', en: 'Transits, eclipses, retrogrades' },
  },
  {
    id: 'rashifal', icon: Star, color: '#facc15', glow: 'rgba(250,204,21,0.15)',
    badge: { gu: 'દૈનિક', hi: 'दैनिक', en: 'Daily' },
    title: { gu: 'રાશિ ભવિષ્ય', hi: 'राशिफल', en: 'Rashifal' },
    desc: { gu: 'દૈનિક, સાપ્તાહિક, માસિક, વાર્ષિક', hi: 'दैनिक, साप्ताहिक, मासिक', en: 'Daily, weekly, monthly horoscope' },
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
  const [showCustomCoords, setShowCustomCoords] = useState(false);
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
    setFormData((prev) => ({ ...prev, city: city.name, lat: city.lat, lng: city.lng, tz: city.tz }));
    setCitySearch(city.name);
    setShowCityDropdown(false);
  };

  const handleCityInputChange = (e) => {
    const val = e.target.value;
    setCitySearch(val);
    setFormData((prev) => ({ ...prev, city: val, ...(val === '' ? { lat: null, lng: null } : {}) }));
    setShowCityDropdown(val.length > 0);
    const exact = cityData.find((c) => c.name.toLowerCase() === val.toLowerCase());
    if (exact) setFormData((prev) => ({ ...prev, city: exact.name, lat: exact.lat, lng: exact.lng, tz: exact.tz }));
  };

  const handleClearCity = () => {
    setCitySearch('');
    setFormData((prev) => ({ ...prev, city: '', lat: null, lng: null }));
    setShowCityDropdown(false);
  };

  const handleClearBirthForm = () => {
    setFormData({ name: '', gender: 'male', dob: '', tob: '', city: '', lat: 23.0225, lng: 72.5714, tz: 5.5 });
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
    if (!formData.dob || !formData.tob) { setFormData(fallback); generateKundli(fallback); }
    else generateKundli(formData);
    setMainSection('kundli');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ── Shared styles ── */
  const inputStyle = {
    background: 'rgba(7,7,13,0.5)',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--r-md)',
    color: 'var(--text-primary)',
    padding: '10px 14px',
    fontSize: 14,
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'Inter, sans-serif',
  };
  const labelStyle = {
    display: 'block',
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    marginBottom: 6,
    fontFamily: 'JetBrains Mono, monospace',
  };

  return (
    <div className="animate-depth-rise">

      {/* ════════════════════════════════════════════════════
          SECTION 1: HERO
          ════════════════════════════════════════════════════ */}
      <section className="relative pt-8 pb-6 sm:pt-16 sm:pb-10 overflow-hidden">

        {/* Background orbital rings — decorative only */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Large outer ring */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow"
            style={{
              width: 700, height: 700,
              border: '1px solid rgba(245,158,11,0.06)',
            }}
          />
          {/* Mid ring */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-reverse"
            style={{
              width: 460, height: 460,
              border: '1px solid rgba(99,102,241,0.08)',
            }}
          />
          {/* Inner ring */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow"
            style={{
              width: 280, height: 280,
              border: '1px solid rgba(245,158,11,0.1)',
              animationDuration: '25s',
            }}
          />
          {/* Nebula glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 320, height: 320,
              background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative text-center max-w-3xl mx-auto px-4">
          {/* Om badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 animate-fade-in-up"
            style={{
              background: 'rgba(245,158,11,0.08)',
              border: '1px solid rgba(245,158,11,0.2)',
              animationDelay: '0.05s',
            }}
          >
            <Moon style={{ width: 13, height: 13, color: 'var(--gold-400)' }} />
            <span className="font-mono text-[11px] tracking-widest" style={{ color: 'var(--gold-400)' }}>
              {lang === 'gu' ? 'વૈદિક જ્યોતિષ' : lang === 'hi' ? 'वैदिक ज्योतिष' : 'Vedic Jyotish'}
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight mb-4 animate-fade-in-up animate-gold-glow"
            style={{
              fontFamily: 'Syne, sans-serif',
              color: 'var(--text-primary)',
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              animationDelay: '0.1s',
            }}
          >
            {l(L.heroTitle)}
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg max-w-xl mx-auto mb-8 animate-fade-in-up"
            style={{
              color: 'var(--text-secondary)',
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.6,
              animationDelay: '0.18s',
            }}
          >
            {l(L.heroSub)}
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
            <button
              type="button"
              onClick={handleQuickSubmit}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer spatial-btn-primary"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <Sparkles style={{ width: 16, height: 16 }} />
              {l(L.heroCta)}
            </button>
            <button
              type="button"
              onClick={() => { setMainSection('kundli'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium cursor-pointer spatial-btn-outline"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {l(L.heroCtaSec)}
              <ChevronRight style={{ width: 15, height: 15 }} />
            </button>
          </div>

          {/* Stat bar */}
          <div
            className="flex items-center justify-center gap-6 sm:gap-10 mt-10 pt-8 animate-fade-in-up"
            style={{
              borderTop: '1px solid var(--border-void)',
              animationDelay: '0.32s',
            }}
          >
            {[
              { num: '8', label: lang === 'gu' ? 'જ્ઞાન-મંડળ' : lang === 'hi' ? 'ज्ञान मंडल' : 'Portals' },
              { num: '40+', label: lang === 'gu' ? 'સાધનો' : lang === 'hi' ? 'विशेषताएं' : 'Tools' },
              { num: '3', label: lang === 'gu' ? 'ભાષાઓ' : lang === 'hi' ? 'भाषाएं' : 'Languages' },
              { num: '100%', label: lang === 'gu' ? 'ઓફ-લાઇન' : lang === 'hi' ? 'ऑफ़लाइन' : 'Offline' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div
                  className="text-xl sm:text-2xl font-bold"
                  style={{ fontFamily: 'Syne, sans-serif', color: 'var(--gold-400)', letterSpacing: '-0.03em' }}
                >
                  {num}
                </div>
                <div className="text-[10px] sm:text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 2: BIRTH FORM
          ════════════════════════════════════════════════════ */}
      <section className="max-w-2xl mx-auto px-4 pb-12">
        <form onSubmit={handleQuickSubmit}>
          <div
            className="rounded-2xl p-6 sm:p-8 spatial-panel animate-fade-in-up"
            style={{
              animationDelay: '0.3s',
              border: '1px solid var(--border-gold)',
              boxShadow: 'var(--shadow-gold)',
            }}
          >
            {/* Form header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: 36, height: 36,
                    background: 'rgba(245,158,11,0.12)',
                    border: '1px solid rgba(245,158,11,0.2)',
                    color: 'var(--gold-400)',
                  }}
                >
                  <Compass style={{ width: 17, height: 17 }} />
                </div>
                <div>
                  <h2
                    className="text-sm font-medium"
                    style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                  >
                    {lang === 'gu' ? 'જન્મ-પત્રિકા વિગત' : lang === 'hi' ? 'जन्म विवरण' : 'Birth details'}
                  </h2>
                  <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    {lang === 'gu' ? 'ખાલી છોડો — ઉદ્દાહરણ ડેટા વાપરવામાં આવશે' : lang === 'hi' ? 'खाली छोड़ें — उदाहरण डेटा प्रयुक्त होगा' : 'Leave blank to use example data'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClearBirthForm}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer spatial-btn-ghost"
                style={{ color: 'var(--text-muted)' }}
              >
                <RotateCcw style={{ width: 12, height: 12 }} />
                {l(L.formClear)}
              </button>
            </div>

            {/* Fields grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Name */}
              <div>
                <label style={labelStyle}>{l(L.formName)}</label>
                <div className="relative">
                  <User style={{ width: 14, height: 14, position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                  <input
                    type="text"
                    placeholder={lang === 'gu' ? 'દા.ત. રાધા શ્રીવાસ્તવ' : lang === 'hi' ? 'जैसे राधा श्रीवास्तव' : 'e.g. Radha Srivastava'}
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    style={{ ...inputStyle, paddingLeft: 34 }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--gold-500)'; e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border-default)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label style={labelStyle}>{l(L.formGender)}</label>
                <div className="flex gap-2">
                  {['male', 'female'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, gender: g }))}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        background: formData.gender === g ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${formData.gender === g ? 'rgba(245,158,11,0.3)' : 'var(--border-subtle)'}`,
                        color: formData.gender === g ? 'var(--gold-300)' : 'var(--text-secondary)',
                      }}
                    >
                      {g === 'male' ? l(L.formMale) : l(L.formFemale)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date of birth */}
              <div>
                <label style={labelStyle}>{l(L.formDob)}</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData((p) => ({ ...p, dob: e.target.value }))}
                  style={{
                    ...inputStyle,
                    colorScheme: 'dark',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--gold-500)'; e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-default)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              {/* Time of birth */}
              <div>
                <label style={labelStyle}>{l(L.formTob)}</label>
                <input
                  type="time"
                  value={formData.tob}
                  onChange={(e) => setFormData((p) => ({ ...p, tob: e.target.value }))}
                  style={{
                    ...inputStyle,
                    colorScheme: 'dark',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--gold-500)'; e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-default)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              {/* City autocomplete — spans full width */}
              <div className="sm:col-span-2" ref={cityDropdownRef}>
                <label style={labelStyle}>{l(L.formCity)}</label>
                <div className="relative">
                  <MapPin style={{ width: 14, height: 14, position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                  <input
                    type="text"
                    placeholder={lang === 'gu' ? 'દા.ત. Ahmedabad' : lang === 'hi' ? 'जैसे Ahmedabad' : 'e.g. Ahmedabad'}
                    value={citySearch || formData.city}
                    onChange={handleCityInputChange}
                    onFocus={() => { if ((citySearch || formData.city).length > 0) setShowCityDropdown(true); }}
                    style={{ ...inputStyle, paddingLeft: 34, paddingRight: formData.city ? 34 : 14 }}
                    onFocus2={(e) => { e.target.style.borderColor = 'var(--gold-500)'; e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border-default)'; e.target.style.boxShadow = 'none'; }}
                  />
                  {formData.city && (
                    <button
                      type="button"
                      onClick={handleClearCity}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <X style={{ width: 13, height: 13 }} />
                    </button>
                  )}

                  {/* Dropdown */}
                  {showCityDropdown && filteredCities.length > 0 && (
                    <div
                      className="absolute left-0 right-0 mt-1 rounded-xl overflow-hidden z-20 animate-scale-in"
                      style={{
                        background: 'var(--depth-4)',
                        border: '1px solid var(--border-default)',
                        boxShadow: 'var(--shadow-xl)',
                      }}
                    >
                      {filteredCities.map((city) => (
                        <button
                          key={city.name}
                          type="button"
                          onMouseDown={() => handleCitySelect(city)}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors cursor-pointer"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            color: 'var(--text-primary)',
                            borderBottom: '1px solid var(--border-void)',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <MapPin style={{ width: 12, height: 12, color: 'var(--gold-500)', flexShrink: 0 }} />
                          <span>{city.name}</span>
                          <span className="ml-auto font-mono text-[10px]" style={{ color: 'var(--text-muted)' }}>
                            {city.lat?.toFixed(2)}°N
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Coord display when city is selected */}
                {formData.lat && formData.lng && (
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', border: '1px solid var(--border-void)' }}>
                      {l(L.formLat)} {formData.lat?.toFixed(4)}°
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', border: '1px solid var(--border-void)' }}>
                      {l(L.formLng)} {formData.lng?.toFixed(4)}°
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', border: '1px solid var(--border-void)' }}>
                      UTC +{formData.tz}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6 pt-5" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold cursor-pointer spatial-btn-primary"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Sparkles style={{ width: 16, height: 16 }} />
                {l(L.formSubmit)}
              </button>
              <p className="text-center text-[11px] mt-3" style={{ color: 'var(--text-muted)' }}>
                {lang === 'gu'
                  ? '🔒 ૧૦૦% ઓફ-લાઈન • ડેટા ક્યારેય સર્વર પર જતો નથી'
                  : lang === 'hi'
                    ? '🔒 १००% ऑफ़लाइन • डेटा कभी सर्वर पर नहीं जाता'
                    : '🔒 100% offline · Your data never leaves this device'}
              </p>
            </div>
          </div>
        </form>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 3: EIGHT PORTALS BENTO GRID
          ════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        {/* Section header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)' }}
          >
            <Layers style={{ width: 12, height: 12, color: 'var(--text-tertiary)' }} />
            <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-tertiary)' }}>
              {lang === 'gu' ? 'ચોકઠો' : lang === 'hi' ? 'पोर्टल' : 'Portals'}
            </span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-medium tracking-tight"
            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
          >
            {l(L.portalsTitle)}
          </h2>
          <p className="text-sm mt-2 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {l(L.portalsDesc)}
          </p>
        </div>

        {/* Bento grid — 4-column on lg, 2-column on sm */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {PORTALS.map((portal, i) => {
            const Icon = portal.icon;
            return (
              <button
                key={portal.id}
                type="button"
                onClick={() => { setMainSection(portal.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="group text-left p-4 rounded-2xl cursor-pointer transition-all animate-fade-in-up"
                style={{
                  background: 'rgba(16,16,30,0.7)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  animationDelay: `${0.05 * i}s`,
                  // Taller first card (Kundli featured)
                  gridRow: i === 0 ? 'span 2' : undefined,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = portal.glow;
                  e.currentTarget.style.borderColor = portal.color + '40';
                  e.currentTarget.style.boxShadow = `0 8px 32px ${portal.glow}, var(--shadow-md)`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(16,16,30,0.7)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Icon + badge row */}
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="flex items-center justify-center rounded-xl"
                    style={{
                      width: i === 0 ? 44 : 36,
                      height: i === 0 ? 44 : 36,
                      background: portal.glow,
                      border: `1px solid ${portal.color}30`,
                      color: portal.color,
                      flexShrink: 0,
                    }}
                  >
                    <Icon style={{ width: i === 0 ? 20 : 16, height: i === 0 ? 20 : 16 }} />
                  </div>
                  <span
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                    style={{
                      background: portal.glow,
                      border: `1px solid ${portal.color}25`,
                      color: portal.color,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {l(portal.badge)}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-medium mb-1 leading-tight"
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: i === 0 ? 18 : 14,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {l(portal.title)}
                </h3>

                {/* Description */}
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}
                >
                  {l(portal.desc)}
                </p>

                {/* Open arrow — visible on hover */}
                <div
                  className="flex items-center gap-1 mt-3 text-[11px] font-medium transition-all opacity-0 group-hover:opacity-100"
                  style={{ color: portal.color }}
                >
                  {lang === 'gu' ? 'ખોલો' : lang === 'hi' ? 'खोलें' : 'Open'}
                  <ArrowRight style={{ width: 12, height: 12 }} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 4: TRUST FOOTER STRIP
          ════════════════════════════════════════════════════ */}
      <section className="max-w-3xl mx-auto px-4 pb-12">
        <div
          className="rounded-2xl px-6 py-5 flex flex-wrap items-center justify-center gap-6 spatial-panel"
          style={{ border: '1px solid var(--border-subtle)' }}
        >
          {[
            { icon: CheckCircle2, label: lang === 'gu' ? '૧૦૦% ઓફ-લાઇન' : lang === 'hi' ? '१००% ऑफलाइन' : '100% offline', color: '#34d399' },
            { icon: Globe,        label: lang === 'gu' ? '3 ભાષાઓ' : lang === 'hi' ? '3 भाषाएं' : '3 languages', color: '#60a5fa' },
            { icon: Crown,        label: lang === 'gu' ? 'ઓ.એ. ગણના' : lang === 'hi' ? 'सटीक गणना' : 'Swiss Ephemeris', color: '#f59e0b' },
            { icon: Layers,       label: lang === 'gu' ? '40+ સાધનો' : lang === 'hi' ? '40+ विशेषताएं' : '40+ tools', color: '#c084fc' },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon style={{ width: 15, height: 15, color }} />
              <span className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
