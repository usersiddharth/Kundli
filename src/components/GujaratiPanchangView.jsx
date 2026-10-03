import React, { useState, useEffect } from 'react';
import { Button, Card, Chip } from '@heroui/react';
import { calculateDetailedGujaratiPanchang } from '../engine/gujaratiPanchang.js';
import {
  Sun,
  Moon,
  Sparkles,
  AlertTriangle,
  ShieldCheck,
  Compass,
  Award,
  Printer,
} from 'lucide-react';

export default function GujaratiPanchangView({ birthDate, t, lang, initialCustomDate }) {
  const now = new Date();
  const [selectedDateMode, setSelectedDateMode] = useState(initialCustomDate ? 'custom' : 'birth'); // 'birth' | 'today' | 'custom'
  const [customDate, setCustomDate] = useState(
    initialCustomDate || now.toISOString().split('T')[0]
  );

  useEffect(() => {
    if (initialCustomDate) {
      setCustomDate(initialCustomDate);
      setSelectedDateMode('custom');
    }
  }, [initialCustomDate]);

  const birthDateStr = birthDate.toISOString().split('T')[0];
  const todayDateStr = now.toISOString().split('T')[0];

  // Determine active date object
  let activeYear = birthDate.getFullYear();
  let activeMonth = birthDate.getMonth() + 1;
  let activeDay = birthDate.getDate();

  if (selectedDateMode === 'today') {
    activeYear = now.getFullYear();
    activeMonth = now.getMonth() + 1;
    activeDay = now.getDate();
  } else if (selectedDateMode === 'custom') {
    const [y, m, d] = customDate.split('-').map(Number);
    activeYear = y;
    activeMonth = m;
    activeDay = d;
  }

  const currentDateInputVal =
    selectedDateMode === 'birth'
      ? birthDateStr
      : selectedDateMode === 'today'
        ? todayDateStr
        : customDate;

  const pData = calculateDetailedGujaratiPanchang(activeYear, activeMonth, activeDay);

  const handlePrint = () => {
    window.print();
  };

  const activeDateFormatted = `${String(activeDay).padStart(2, '0')}-${String(activeMonth).padStart(2, '0')}-${activeYear}`;

  return (
    <Card className="rounded-2xl glass-panel p-6 shadow-sm space-y-6 print:border-none print:p-0 print:bg-white border border-[var(--border-subtle)]">
      {/* Auspicious Vedic Invocation Ribbon (Visible in Web & Screen) */}
      <div className="text-center font-serif text-xs font-semibold text-[#8b2500] tracking-widest pb-1 border-b border-[var(--border-subtle)] select-none print:hidden">
        ॥ ૐ શ્રી ગણેશાય નમઃ ॥ • વિગતવાર દૈનિક પંચાંગ પત્રિકા
      </div>

      {/* Dedicated Printable PDF Top Banner (Visible Only in Print/PDF) */}
      <div className="hidden print:block text-center border-b-2 border-[#8c7456] pb-3 mb-4">
        <span className="font-serif text-xs font-bold tracking-widest text-[var(--text-gold)]">
          || ૐ શ્રી ગણેશાય નમઃ ||
        </span>
        <h1 className="font-serif text-2xl font-bold text-[var(--text-primary)] mt-1">
          વિગતવાર ગુજરાતી પંચાંગ (Gujarati Panchang)
        </h1>
        <p className="text-xs text-[var(--text-secondary)]">
          તારીખ: {activeDateFormatted} • વિક્રમ સંવત {pData.vikramSamvat} • {pData.gujMonthName}
        </p>
      </div>

      {/* Header & Date Controls (Hidden in Print) */}
      <Card.Header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4 p-0 print:hidden">
        <div>
          <Card.Title className="text-lg sm:text-xl font-medium text-[var(--text-primary)] font-serif flex items-center gap-2">
            <Sun className="h-5 w-5 text-[var(--text-gold)]" /> વિગતવાર ગુજરાતી પંચાંગ (Detailed
            Gujarati Panchang)
          </Card.Title>
          <Card.Description className="text-xs text-[var(--text-muted)]">
            તિથિ, વાર, નક્ષત્ર, યોગ, કરણ, સૂર્યોદય-સૂર્યાસ્ત, શુભ ચોઘડિયા અને દિશા શૂળ પરિહાર
          </Card.Description>
        </div>

        {/* Date Selector & PDF Action */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex rounded-xl glass-pill p-1 gap-1">
            <Button
              type="button"
              onPress={() => setSelectedDateMode('birth')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                selectedDateMode === 'birth'
                  ? 'spatial-btn-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:bg-[#faf5eb] bg-transparent'
              }`}
            >
              જન્મ પંચાંગ ({String(birthDate.getDate()).padStart(2, '0')}-
              {String(birthDate.getMonth() + 1).padStart(2, '0')}-{birthDate.getFullYear()})
            </Button>
            <Button
              type="button"
              onPress={() => setSelectedDateMode('today')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                selectedDateMode === 'today'
                  ? 'spatial-btn-primary shadow-xs'
                  : 'text-[var(--text-secondary)] hover:bg-[#faf5eb] bg-transparent'
              }`}
            >
              આજનું પંચાંગ (Today)
            </Button>
          </div>

          <input
            type="date"
            value={currentDateInputVal}
            onChange={(e) => {
              setCustomDate(e.target.value);
              setSelectedDateMode('custom');
            }}
            className="rounded-xl glass-input px-3 py-1.5 text-xs font-mono text-[var(--text-primary)] focus:outline-none"
          />

          {/* Save as PDF / Print Button */}
          <Button
            type="button"
            onPress={handlePrint}
            title="Save panchang as PDF / print"
            className="flex items-center gap-1.5 rounded-xl glass-card px-3.5 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition shadow-xs cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-[var(--text-gold)]" />
            <span>Save as PDF</span>
          </Button>
        </div>
      </Card.Header>

      {/* Main Vikram Samvat & Month Banner */}
      <Card className="rounded-2xl glass-panel-accent p-5 shadow-xs space-y-3 print:border print:border-[#8c7456] print:shadow-none border border-[var(--border-gold)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              પરંપરાગત કાલગણના
            </span>
            <h3 className="font-serif text-2xl font-bold text-[var(--text-gold)] mt-0.5">
              વિક્રમ સંવત {pData.vikramSamvat} • {pData.gujMonthName}
            </h3>
            <span className="text-xs font-medium text-[var(--text-secondary)]">
              શક સંવત {pData.shakaSamvat} | {pData.pakshaName} | {pData.ritu}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <Chip className="rounded-xl glass-pill px-3 py-1 text-[var(--text-primary)]">
              <Chip.Label>{pData.ayanaName}</Chip.Label>
            </Chip>
            <Chip className="rounded-xl glass-badge-success px-3 py-1">
              <Chip.Label>{pData.vaar}</Chip.Label>
            </Chip>
          </div>
        </div>

        {/* Solar & Lunar Highlights */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-1 text-xs">
          <Card className="flex flex-row items-center space-x-2 rounded-xl glass-card p-2 border border-[var(--border-subtle)]">
            <Sun className="h-4 w-4 text-[var(--text-gold)]" />
            <div>
              <span className="text-[var(--text-muted)] text-[10px] block">
                સૂર્યોદય / સૂર્યાસ્ત
              </span>
              <span className="font-mono font-bold text-[var(--text-primary)]">
                {pData.sun.sunrise} - {pData.sun.sunset}
              </span>
            </div>
          </Card>

          <Card className="flex flex-row items-center space-x-2 rounded-xl glass-card p-2 border border-[var(--border-subtle)]">
            <Compass className="h-4 w-4 text-[var(--text-muted)]" />
            <div>
              <span className="text-[var(--text-muted)] text-[10px] block">સૂર્ય રાશિ</span>
              <span className="font-serif font-bold text-[var(--text-primary)]">
                {t[pData.sun.rashi] || pData.sun.rashi} ({pData.sun.deg}°)
              </span>
            </div>
          </Card>

          <Card className="flex flex-row items-center space-x-2 rounded-xl glass-card p-2 border border-[var(--border-subtle)]">
            <Moon className="h-4 w-4 text-[var(--text-secondary)]" />
            <div>
              <span className="text-[var(--text-muted)] text-[10px] block">ચંદ્ર રાશિ</span>
              <span className="font-serif font-bold text-[var(--text-primary)]">
                {t[pData.moon.rashi] || pData.moon.rashi} ({pData.moon.deg}°)
              </span>
            </div>
          </Card>

          <Card className="flex flex-row items-center space-x-2 rounded-xl glass-card p-2 border border-[var(--border-subtle)]">
            <Sparkles className="h-4 w-4 text-[var(--text-gold)]" />
            <div>
              <span className="text-[var(--text-muted)] text-[10px] block">અયનાંશ</span>
              <span className="font-mono font-bold text-[var(--text-primary)]">
                લાહિડી (ચિત્રા પક્ષ)
              </span>
            </div>
          </Card>
        </div>
      </Card>

      {/* 5 Core Limbs Grid (૫ મહા અંગો) */}
      <div className="space-y-3">
        <h3 className="font-serif text-base font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
          <Award className="h-4 w-4 text-[var(--text-gold)]" /> પંચાંગના ૫ મુખ્ય અંગો (5 Core Limbs)
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 print:grid-cols-5">
          {/* 1. Tithi */}
          <Card className="rounded-2xl glass-card p-4 text-xs shadow-2xs space-y-2 border border-[var(--border-subtle)]">
            <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-1.5">
              <span className="font-semibold text-[var(--text-muted)] uppercase text-[10px]">
                ૧. તિથિ (Tithi)
              </span>
              <Chip className="glass-badge-gold text-[10px] font-bold px-1.5 py-0.5">
                <Chip.Label>{pData.tithi.nature}</Chip.Label>
              </Chip>
            </div>
            <h4 className="font-serif text-base font-bold text-[var(--text-primary)]">
              {pData.tithi.name}
            </h4>
            <span className="text-[var(--text-secondary)] block text-[11px]">
              {pData.pakshaName}
            </span>
            <div className="text-[10px] text-[var(--text-muted)] pt-1">
              દેવતા: <strong>{pData.tithi.deity}</strong>
            </div>
          </Card>

          {/* 2. Vaar */}
          <Card className="rounded-2xl glass-card p-4 text-xs shadow-2xs space-y-2 border border-[var(--border-subtle)]">
            <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-1.5">
              <span className="font-semibold text-[var(--text-muted)] uppercase text-[10px]">
                ૨. વાર (Vaar)
              </span>
              <Chip className="glass-pill text-[10px] font-bold px-1.5 py-0.5 text-[var(--text-primary)]">
                <Chip.Label>દિવસ</Chip.Label>
              </Chip>
            </div>
            <h4 className="font-serif text-base font-bold text-[var(--text-primary)]">
              {pData.vaar}
            </h4>
            <span className="text-[var(--text-secondary)] block text-[11px]">
              દિશા શૂળ: {pData.dishaShool.badDir}
            </span>
            <div className="text-[10px] text-[var(--text-muted)] pt-1">
              સ્વામી: <strong>{pData.vaarLord || pData.dishaShool.lord}</strong>
            </div>
          </Card>

          {/* 3. Nakshatra */}
          <Card className="rounded-2xl glass-card p-4 text-xs shadow-2xs space-y-2 border border-[var(--border-subtle)]">
            <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-1.5">
              <span className="font-semibold text-[var(--text-muted)] uppercase text-[10px]">
                ૩. નક્ષત્ર (Nakshatra)
              </span>
              <Chip className="glass-badge-gold text-[10px] font-bold px-1.5 py-0.5">
                <Chip.Label>પદ {pData.nakshatra.pada}</Chip.Label>
              </Chip>
            </div>
            <h4 className="font-serif text-base font-bold text-[var(--text-primary)]">
              {pData.nakshatra.name}
            </h4>
            <span className="text-[var(--text-secondary)] block text-[11px]">
              સ્વામી: {t[pData.nakshatra.lord] || pData.nakshatra.lord}
            </span>
            <div className="text-[10px] text-[var(--text-muted)] pt-1">
              ગણ: <strong>{pData.nakshatra.gana}</strong> | યોનિ:{' '}
              <strong>{pData.nakshatra.yoni}</strong>
            </div>
          </Card>

          {/* 4. Yoga */}
          <Card className="rounded-2xl glass-card p-4 text-xs shadow-2xs space-y-2 border border-[var(--border-subtle)]">
            <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-1.5">
              <span className="font-semibold text-[var(--text-muted)] uppercase text-[10px]">
                ૪. યોગ (Nitya Yoga)
              </span>
              <Chip
                className={`text-[10px] font-bold px-1.5 py-0.5 ${
                  pData.yoga.nature === 'Auspicious' ? 'glass-badge-success' : 'glass-badge-danger'
                }`}
              >
                <Chip.Label>{pData.yoga.nature === 'Auspicious' ? 'શુભ' : 'અશુભ'}</Chip.Label>
              </Chip>
            </div>
            <h4 className="font-serif text-base font-bold text-[var(--text-primary)]">
              {pData.yoga.name}
            </h4>
            <span className="text-[var(--text-secondary)] block text-[11px]">
              દેવતા: {pData.yoga.deity}
            </span>
            <div className="text-[10px] text-[var(--text-muted)] pt-1">૨૭ નિત્ય યોગ ક્રમ</div>
          </Card>

          {/* 5. Karana */}
          <Card className="rounded-2xl glass-card p-4 text-xs shadow-2xs space-y-2 border border-[var(--border-subtle)]">
            <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-1.5">
              <span className="font-semibold text-[var(--text-muted)] uppercase text-[10px]">
                ૫. કરણ (Karana)
              </span>
              <Chip className="glass-pill text-[10px] font-bold px-1.5 py-0.5 text-[var(--text-secondary)]">
                <Chip.Label>{pData.karana.type.split(' ')[0]}</Chip.Label>
              </Chip>
            </div>
            <h4 className="font-serif text-base font-bold text-[var(--text-primary)]">
              {pData.karana.name}
            </h4>
            <span className="text-[var(--text-secondary)] block text-[11px]">
              સ્વામી: {pData.karana.lord}
            </span>
            <div className="text-[10px] text-[var(--text-muted)] pt-1">
              {pData.isBhadraActive ? '⚠️ ભદ્રા કાળ ઉપસ્થિત' : '✅ સામાન્ય કરણ'}
            </div>
          </Card>
        </div>
      </div>

      {/* Shubh & Ashubh Muhurat Timings */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 print:grid-cols-2">
        {/* Auspicious Muhurats */}
        <Card className="rounded-2xl bg-[#f4faf4] border-[#c6e7cc] p-5 space-y-3 print:border-gray-300 print:bg-white border shadow-xs">
          <h3 className="font-serif text-base font-medium text-[#1c6432] flex items-center gap-2 border-b border-[#c6e7cc] pb-2">
            <ShieldCheck className="h-5 w-5 text-[#1c6432]" /> શુભ મુહૂર્ત કાળ (Auspicious Timings)
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <Card className="rounded-xl bg-[#ffffff] p-3 border border-[#c6e7cc] shadow-2xs">
              <span className="font-semibold text-[#1c6432] block">
                અભિજિત મુહૂર્ત (સર્વશ્રેષ્ઠ)
              </span>
              <span className="font-mono text-[var(--text-primary)] font-bold text-xs">
                {pData.muhurats.abhijit}
              </span>
            </Card>
            <Card className="rounded-xl bg-[#ffffff] p-3 border border-[#c6e7cc] shadow-2xs">
              <span className="font-semibold text-[#1c6432] block">બ્રહ્મ મુહૂર્ત (સાધના કાળ)</span>
              <span className="font-mono text-[var(--text-primary)] font-bold text-xs">
                {pData.muhurats.brahma}
              </span>
            </Card>
            <Card className="rounded-xl bg-[#ffffff] p-3 border border-[#c6e7cc] shadow-2xs">
              <span className="font-semibold text-[#1c6432] block">વિજય મુહૂર્ત (વિજય કાળ)</span>
              <span className="font-mono text-[var(--text-primary)] font-bold text-xs">
                {pData.muhurats.vijay}
              </span>
            </Card>
            <Card className="rounded-xl bg-[#ffffff] p-3 border border-[#c6e7cc] shadow-2xs">
              <span className="font-semibold text-[#1c6432] block">
                ગોધૂલિ મુહૂર્ત (સંધ્યા કાળ)
              </span>
              <span className="font-mono text-[var(--text-primary)] font-bold text-xs">
                {pData.muhurats.godhuli}
              </span>
            </Card>
          </div>
        </Card>

        {/* Inauspicious Periods */}
        <Card className="rounded-2xl bg-[#fdf4f2] border-[#f8b4a6] p-5 space-y-3 print:border-gray-300 print:bg-white border shadow-xs">
          <h3 className="font-serif text-base font-medium text-[#8b2500] flex items-center gap-2 border-b border-[#f8b4a6] pb-2">
            <AlertTriangle className="h-5 w-5 text-[#8b2500]" /> વર્જ્ય / અશુભ કાળ (Inauspicious
            Periods)
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <Card className="rounded-xl bg-[#ffffff] p-3 border border-[#f8b4a6] shadow-2xs">
              <span className="font-semibold text-[#8b2500] block">રાહુ કાળ (ત્યાજ્ય સમય)</span>
              <span className="font-mono text-[var(--text-primary)] font-bold text-xs">
                {pData.muhurats.rahuKaal}
              </span>
            </Card>
            <Card className="rounded-xl bg-[#ffffff] p-3 border border-[#f8b4a6] shadow-2xs">
              <span className="font-semibold text-[#8b2500] block">યમગંડ કાળ</span>
              <span className="font-mono text-[var(--text-primary)] font-bold text-xs">
                {pData.muhurats.yamaghanta}
              </span>
            </Card>
            <Card className="rounded-xl bg-[#ffffff] p-3 border border-[#f8b4a6] shadow-2xs">
              <span className="font-semibold text-[#8b2500] block">ગુલિક કાળ</span>
              <span className="font-mono text-[var(--text-primary)] font-bold text-xs">
                {pData.muhurats.gulikaKaal}
              </span>
            </Card>
            <Card className="rounded-xl bg-[#ffffff] p-3 border border-[#f8b4a6] shadow-2xs">
              <span className="font-semibold text-[#8b2500] block">ભદ્રા / વિષ્ટિ સ્થિતિ</span>
              <span className="font-semibold text-[var(--text-primary)] text-xs">
                {pData.isBhadraActive ? '⚠️ ભદ્રા સક્રિય (અશુભ)' : '✅ ભદ્રા મુક્ત (નિર્દોષ)'}
              </span>
            </Card>
          </div>
        </Card>
      </div>

      {/* Disha Shool & Remedial Measures */}
      <Card className="rounded-2xl glass-panel p-5 space-y-3 shadow-2xs print:border-gray-300 border border-[var(--border-gold)]">
        <h3 className="font-serif text-base font-semibold text-[var(--text-primary)] flex items-center gap-2">
          <Compass className="h-5 w-5 text-[var(--text-gold)]" /> દિશા શૂળ અને યાત્રા પરિહાર (Disha
          Shool & Travel Remedy)
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs print:grid-cols-2">
          <Card className="rounded-xl bg-[#fdf4f2] p-3.5 border border-[#f8b4a6]">
            <span className="font-semibold text-[#8b2500] block mb-1">આજનો વાર & વર્જિત દિશા:</span>
            <p className="text-sm font-bold text-[#8b2500]">
              {pData.dishaShool.day} — {pData.dishaShool.badDir} દિશામાં દિશા શૂળ છે.
            </p>
            <span className="text-[11px] text-[var(--text-secondary)] block mt-1">
              આ દિશામાં અત્યંત જરૂરી ન હોય તો પ્રવાસ ટાળવો.
            </span>
          </Card>

          <Card className="rounded-xl bg-[#f4faf4] p-3.5 border border-[#c6e7cc]">
            <span className="font-semibold text-[#1c6432] block mb-1">
              શાસ્ત્રીય પરિહાર (ઉપાય):
            </span>
            <p className="text-sm font-bold text-[#1c6432]">{pData.dishaShool.remedy}</p>
            <span className="text-[11px] text-[var(--text-secondary)] block mt-1">
              આ ઉપાય કરીને પ્રસ્થાન કરવાથી યાત્રા નિર્વિઘ્ન રહે છે.
            </span>
          </Card>
        </div>
      </Card>

      {/* Printable Astrological Footer & Shloka (Visible Only in Print) */}
      <div className="hidden print:block print-footer-signature rounded-xl border border-[var(--border-subtle)] bg-white/5 p-3 text-xs text-center">
        <span className="font-serif font-bold text-[var(--text-gold)]">
          || ૐ સર્વે ભવન્તુ સુખિનઃ સર્વે સન્તુ નિરામયાઃ ||
        </span>
        <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
          શ્રી ગુજરાતી પંચાંગ ગણતરી • અમાનત માસ પદ્ધતિ • સ્થાનિક પ્રમાણભૂત સમય (IST)
        </p>
      </div>
    </Card>
  );
}
