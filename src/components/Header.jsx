import React, { useState, useRef, useEffect } from 'react';
import { Tooltip } from '@heroui/react';
import {
  Sun,
  Home,
  Sparkles,
  Calendar,
  Heart,
  Clock,
  CalendarDays,
  Hash,
  Orbit,
  ChevronDown,
  LayoutGrid,
  Globe,
  Printer,
  Bookmark,
} from 'lucide-react';

export default function Header({
  lang,
  setLang,
  t,
  mainSection,
  setMainSection,
  onOpenVault,
  savedProfilesCount = 0,
}) {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const toolsMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target)) {
        setIsToolsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavItems = [
    {
      id: 'landing',
      label: lang === 'gu' ? 'મુખ્ય' : lang === 'hi' ? 'मुख्य' : 'Home',
      icon: Home,
    },
    {
      id: 'kundli',
      label: lang === 'gu' ? 'કુંડળી' : lang === 'hi' ? 'कुंडली' : 'Kundli',
      icon: Sparkles,
    },
    {
      id: 'panchang',
      label: lang === 'gu' ? 'પંચાંગ' : lang === 'hi' ? 'पंचांग' : 'Panchang',
      icon: Calendar,
    },
    {
      id: 'matchmaking',
      label: lang === 'gu' ? 'ગુણ મિલન' : lang === 'hi' ? 'गुण मिलान' : 'Matchmaking',
      icon: Heart,
    },
  ];

  const secondaryTools = [
    {
      id: 'vedicClock',
      label: lang === 'gu' ? 'વૈદિક ઘડિયાળ' : lang === 'hi' ? 'वैदिक घड़ी' : 'Vedic clock',
      desc:
        lang === 'gu'
          ? 'કાળ ચક્ર અને ઘટી-પળ'
          : lang === 'hi'
            ? 'काल चक्र व घटी-पल'
            : 'Kaal chakra & real-time ghatis',
      icon: Clock,
    },
    {
      id: 'calendar',
      label: lang === 'gu' ? 'ગુજ. કૅલેન્ડર' : lang === 'hi' ? 'कैलेंडर' : 'Gujarati calendar',
      desc:
        lang === 'gu'
          ? 'તહેવારો અને તિથિ પત્રિકા'
          : lang === 'hi'
            ? 'त्योहार एवं तिथि पत्रिका'
            : 'Vikram Samvat monthly view',
      icon: CalendarDays,
    },
    {
      id: 'numerology',
      label: lang === 'gu' ? 'અંકશાસ્ત્ર' : lang === 'hi' ? 'अंकशास्त्र' : 'Numerology',
      desc:
        lang === 'gu'
          ? 'મૂળાંક, ભાગ્યાંક અને નામ બળ'
          : lang === 'hi'
            ? 'मूलांक व भाग्यांक'
            : 'Life path, destiny & name grid',
      icon: Hash,
    },
    {
      id: 'upcomingEvents',
      label: lang === 'gu' ? 'ગ્રહ ઘટનાઓ' : lang === 'hi' ? 'ग्रह घटनाएं' : 'Transits',
      desc:
        lang === 'gu'
          ? 'ગ્રહ ગોચર અને ગ્રહણ'
          : lang === 'hi'
            ? 'ग्रह गोचर एवं ग्रहण'
            : 'Upcoming gochar & eclipses',
      icon: Orbit,
    },
    {
      id: 'rashifal',
      label: lang === 'gu' ? 'રાશિફળ' : lang === 'hi' ? 'राशिफल' : 'Rashifal',
      desc:
        lang === 'gu'
          ? 'દૈનિક, સાપ્તાહિક રાશિફળ'
          : lang === 'hi'
            ? 'दैनिक राशिफल'
            : 'Daily, weekly & annual forecast',
      icon: Sparkles,
    },
  ];

  const isSecondaryActive = secondaryTools.some((item) => item.id === mainSection);
  const activeSecondaryItem = secondaryTools.find((item) => item.id === mainSection);

  const auspiciousInvocation =
    lang === 'gu'
      ? '॥ ૐ શ્રી ગણેશાય નમઃ ॥ • શ્રી જગદંબા પ્રસન્ન • વિક્રમ સંવત ૨૦૮૧'
      : lang === 'hi'
        ? '॥ ॐ श्री गणेशाय नमः ॥ • श्री जगदम्बा प्रसन्न • विक्रम संवत २०८१'
        : '॥ Om Sri Ganeshaya Namah ॥ • Classical Vedic Jyotish';

  return (
    <header className="sticky top-2 z-50 px-3 sm:px-6 pointer-events-none print:hidden flex flex-col items-center">
      {/* ── Traditional Auspicious Invocation Masthead Ribbon ── */}
      <div className="pointer-events-auto mb-1 hidden sm:inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-[10.5px] font-serif text-[#8b2500] bg-[#faf3e7]/90 border border-[#e5dac6]/80 backdrop-blur-xs shadow-2xs tracking-wider select-none">
        {auspiciousInvocation}
      </div>

      <div className="pointer-events-auto mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 sm:px-5 transition-all spatial-header">
        {/* ── Brand Mark ── */}
        <button
          type="button"
          onClick={() => {
            setMainSection('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 text-left focus-visible:outline-hidden group cursor-pointer shrink-0"
          aria-label="Return to home"
        >
          {/* Logo emblem */}
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center shrink-0 rounded-xl bg-[#faeee2] border border-[#e8b992]/70 text-[#b85d19] shadow-xs transition-colors group-hover:bg-[#f3d7bf]/80">
            <Sun className="h-5 w-5" />
          </div>

          {/* Title text */}
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <h1
                className="text-sm font-medium tracking-tight leading-tight transition-colors font-serif"
                style={{
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                {t.appTitle}
              </h1>
              <span className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-mono spatial-badge-gold">
                Vedic
              </span>
            </div>
            <p
              className="text-[10.5px] leading-tight mt-0.5 font-serif"
              style={{ color: 'var(--text-muted)' }}
            >
              {t.appSubtitle}
            </p>
          </div>
        </button>

        {/* ── Center Navigation (Desktop md+) ── */}
        <nav aria-label="Portal navigation" className="hidden md:block">
          <div
            role="tablist"
            aria-label="Portal switcher"
            className="flex items-center rounded-xl p-1 gap-0.5 spatial-pill"
          >
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = mainSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setMainSection(item.id);
                    setIsToolsOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-hidden cursor-pointer ${
                    isActive ? 'spatial-btn-primary' : 'spatial-btn-ghost'
                  }`}
                  style={isActive ? { borderRadius: 8 } : {}}
                >
                  <Icon style={{ width: 13, height: 13 }} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* More tools dropdown */}
            <div className="relative" ref={toolsMenuRef}>
              <button
                type="button"
                aria-expanded={isToolsOpen}
                aria-haspopup="true"
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-hidden cursor-pointer ${
                  isSecondaryActive ? 'spatial-btn-primary' : 'spatial-btn-ghost'
                }`}
              >
                <LayoutGrid style={{ width: 13, height: 13 }} />
                <span>
                  {isSecondaryActive
                    ? activeSecondaryItem?.label
                    : lang === 'gu'
                      ? 'સાધનો'
                      : lang === 'hi'
                        ? 'साधन'
                        : 'Tools'}
                </span>
                <ChevronDown
                  style={{ width: 11, height: 11 }}
                  className={`transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown panel */}
              {isToolsOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 rounded-2xl p-2 z-50 animate-scale-in spatial-raised"
                  style={{
                    border: '1px solid var(--border-gold)',
                    boxShadow: 'var(--shadow-gold)',
                  }}
                >
                  <div
                    className="text-[11px] font-medium px-2.5 py-1.5 mb-1 pb-2"
                    style={{
                      color: 'var(--text-muted)',
                      borderBottom: '1px solid var(--border-subtle)',
                    }}
                  >
                    {lang === 'gu' ? 'વૈદિક સાધનો' : lang === 'hi' ? 'वैदिक साधन' : 'Vedic tools'}
                  </div>
                  {secondaryTools.map((tool) => {
                    const ToolIcon = tool.icon;
                    const isSelected = mainSection === tool.id;
                    return (
                      <button
                        key={tool.id}
                        type="button"
                        onClick={() => {
                          setMainSection(tool.id);
                          setIsToolsOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full flex items-start gap-3 px-2.5 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                          isSelected ? 'spatial-card-gold' : 'spatial-btn-ghost hover:bg-[#f5f0e6]'
                        }`}
                        style={isSelected ? { border: '1px solid var(--border-gold)' } : {}}
                      >
                        <div
                          className="flex items-center justify-center rounded-lg mt-0.5 shrink-0"
                          style={{
                            width: 30,
                            height: 30,
                            background: isSelected ? 'var(--gold-100)' : 'var(--depth-2)',
                            color: isSelected ? 'var(--gold-600)' : 'var(--text-tertiary)',
                            border: `1px solid ${isSelected ? 'var(--border-gold)' : 'var(--border-subtle)'}`,
                          }}
                        >
                          <ToolIcon style={{ width: 15, height: 15 }} />
                        </div>
                        <div>
                          <div
                            className="text-xs font-medium leading-tight"
                            style={{
                              color: isSelected ? 'var(--gold-600)' : 'var(--text-primary)',
                            }}
                          >
                            {tool.label}
                          </div>
                          <div
                            className="text-[10.5px] leading-tight mt-0.5"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            {tool.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* ── Right: Vault + Print + Language switcher ── */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Kundli Vault */}
          <Tooltip>
            <Tooltip.Trigger>
              <button
                type="button"
                onClick={onOpenVault}
                aria-label={
                  lang === 'gu'
                    ? 'કુંડળી વોલ્ટ'
                    : lang === 'hi'
                      ? 'कुंडली वॉल्ट'
                      : 'Saved charts vault'
                }
                className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium transition-all print:hidden cursor-pointer spatial-btn-ghost"
                style={{ border: '1px solid var(--border-subtle)' }}
              >
                <Bookmark style={{ width: 14, height: 14, color: 'var(--gold-500)' }} />
                <span className="hidden sm:inline" style={{ color: 'var(--text-secondary)' }}>
                  {lang === 'gu' ? 'વોલ્ટ' : lang === 'hi' ? 'वॉल्ट' : 'Vault'}
                </span>
                {savedProfilesCount > 0 && (
                  <span
                    className="px-1.5 py-0.5 text-[10px] rounded-full font-mono font-semibold leading-none"
                    style={{
                      backgroundColor: 'rgba(212,160,23,0.18)',
                      color: 'var(--gold-400)',
                      border: '1px solid rgba(212,160,23,0.3)',
                    }}
                  >
                    {savedProfilesCount}
                  </span>
                )}
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content
              className="rounded-lg text-xs px-2 py-1 shadow-lg"
              style={{
                background: 'var(--depth-4)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-default)',
              }}
            >
              Open saved birth charts & profiles
            </Tooltip.Content>
          </Tooltip>

          {/* Print */}
          <Tooltip>
            <Tooltip.Trigger>
              <button
                type="button"
                onClick={() => window.print()}
                aria-label={t.tabPrint || 'Print'}
                className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium transition-all print:hidden cursor-pointer spatial-btn-ghost"
                style={{ border: '1px solid var(--border-subtle)' }}
              >
                <Printer style={{ width: 14, height: 14, color: 'var(--gold-500)' }} />
                <span className="hidden xl:inline" style={{ color: 'var(--text-secondary)' }}>
                  {t.tabPrint || 'Print'}
                </span>
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content
              className="rounded-lg text-xs px-2 py-1 shadow-lg"
              style={{
                background: 'var(--depth-4)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-default)',
              }}
            >
              Print or export PDF report
            </Tooltip.Content>
          </Tooltip>

          {/* Language switcher */}
          <div
            role="group"
            aria-label="Language selection"
            className="flex items-center rounded-xl p-1 gap-0.5 spatial-pill"
          >
            <Globe
              style={{
                width: 12,
                height: 12,
                color: 'var(--text-muted)',
                marginLeft: 4,
                marginRight: 2,
              }}
              aria-hidden="true"
            />
            {[
              { code: 'gu', label: 'ગુ' },
              { code: 'hi', label: 'हि' },
              { code: 'en', label: 'EN' },
            ].map(({ code, label }) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-label={`Switch to ${code}`}
                aria-pressed={lang === code}
                className={`rounded-lg px-2 py-1 text-xs font-medium transition-all cursor-pointer ${
                  lang === code ? 'spatial-btn-primary' : 'spatial-btn-ghost'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
