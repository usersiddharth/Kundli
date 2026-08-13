import React, { useState, useEffect } from 'react';
import { calculateDetailedGujaratiPanchang } from '../engine/gujaratiPanchang.js';
import { Calendar, Sun, Moon, Sparkles, Clock, AlertTriangle, ShieldCheck, Compass, CheckCircle2, Award, Printer, FileDown } from 'lucide-react';

export default function GujaratiPanchangView({ kundliData, birthDate, t, lang, initialCustomDate }) {
  const now = new Date();
  const [selectedDateMode, setSelectedDateMode] = useState(initialCustomDate ? 'custom' : 'birth'); // 'birth' | 'today' | 'custom'
  const [customDate, setCustomDate] = useState(initialCustomDate || now.toISOString().split('T')[0]);

  useEffect(() => {
    if (initialCustomDate) {
      setCustomDate(initialCustomDate);
      setSelectedDateMode('custom');
    }
  }, [initialCustomDate]);

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

  const pData = calculateDetailedGujaratiPanchang(activeYear, activeMonth, activeDay);

  const handlePrint = () => {
    window.print();
  };

  const activeDateFormatted = `${String(activeDay).padStart(2, '0')}-${String(activeMonth).padStart(2, '0')}-${activeYear}`;

  return (
    <div className="rounded-xl glass-panel p-6 shadow-sm space-y-6 print:border-none print:p-0 print:bg-white">
      {/* Dedicated Printable PDF Top Banner (Visible Only in Print/PDF) */}
      <div className="hidden print:block text-center border-b-2 border-[#8c7456] pb-3 mb-4">
        <span className="font-serif text-xs font-bold tracking-widest text-[#8c7456]">|| ૐ શ્રી ગણેશાય નમઃ ||</span>
        <h1 className="font-serif text-2xl font-bold text-[#2c2825] mt-1">વિગતવાર ગુજરાતી પંચાંગ (Gujarati Panchang)</h1>
        <p className="text-xs text-[#544d44]">તારીખ: {activeDateFormatted} • વિક્રમ સંવત {pData.vikramSamvat} • {pData.gujMonthName}</p>
      </div>

      {/* Header & Date Controls (Hidden in Print) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e6dfd3]/80 pb-4 print:hidden">
        <div>
          <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
            <Sun className="h-5 w-5 text-[#b85d19]" /> વિગતવાર ગુજરાતી પંચાંગ (Detailed Gujarati Panchang)
          </h2>
          <p className="text-xs text-[#736a60]">
            તિથિ, વાર, નક્ષત્ર, યોગ, કરણ, સૂર્યોદય-સૂર્યાસ્ત, શુભ ચોઘડિયા અને દિશા શૂળ પરિહાર
          </p>
        </div>

        {/* Date Selector & PDF Action */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex rounded-lg glass-pill p-1">
            <button
              onClick={() => setSelectedDateMode('birth')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                selectedDateMode === 'birth' ? 'glass-button-dark text-[#f4ebd9] shadow-xs' : 'text-[#544d44] hover:bg-white/70'
              }`}
            >
              જન્મ પંચાંગ ({birthDate.toISOString().split('T')[0]})
            </button>
            <button
              onClick={() => setSelectedDateMode('today')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                selectedDateMode === 'today' ? 'glass-button-dark text-[#f4ebd9] shadow-xs' : 'text-[#544d44] hover:bg-white/70'
              }`}
            >
              આજનું પંચાંગ (Today)
            </button>
          </div>

          <input
            type="date"
            value={customDate}
            onChange={(e) => {
              setCustomDate(e.target.value);
              setSelectedDateMode('custom');
            }}
            className="rounded-lg glass-input px-3 py-1.5 text-xs font-mono text-[#2c2825] focus:outline-none"
          />

          {/* Save as PDF / Print Button */}
          <button
            onClick={handlePrint}
            title="Save Panchang as PDF / Print"
            className="flex items-center gap-1.5 rounded-lg glass-card px-3.5 py-1.5 text-xs font-medium text-[#544d44] hover:bg-white/90 hover:text-[#2c2825] transition shadow-xs"
          >
            <Printer className="h-3.5 w-3.5 text-[#b85d19]" />
            <span>Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Main Vikram Samvat & Month Banner */}
      <div className="rounded-xl glass-panel-accent p-5 shadow-xs space-y-3 print:border print:border-[#8c7456] print:shadow-none">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e6dfd3]/80 pb-3 print:border-[#8c7456]/40">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#736a60]">પરંપરાગત કાલગણના</span>
            <h3 className="font-serif text-2xl font-bold text-[#b85d19] mt-0.5">
              વિક્રમ સંવત {pData.vikramSamvat} • {pData.gujMonthName}
            </h3>
            <span className="text-xs font-medium text-[#544d44]">
              શક સંવત {pData.shakaSamvat} | {pData.pakshaName} | {pData.ritu}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-lg glass-pill px-3 py-1.5 text-[#2c2825]">
              {pData.ayanaName}
            </span>
            <span className="rounded-lg glass-badge-success px-3 py-1.5">
              {pData.vaar}
            </span>
          </div>
        </div>

        {/* Solar & Lunar Highlights */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-1 text-xs">
          <div className="flex items-center space-x-2 rounded-lg glass-card p-2">
            <Sun className="h-4 w-4 text-[#b85d19]" />
            <div>
              <span className="text-[#736a60] text-[10px] block">સૂર્યોદય / સૂર્યાસ્ત</span>
              <span className="font-mono font-bold text-[#2c2825]">{pData.sun.sunrise} - {pData.sun.sunset}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 rounded-lg glass-card p-2">
            <Compass className="h-4 w-4 text-[#736a60]" />
            <div>
              <span className="text-[#736a60] text-[10px] block">સૂર્ય રાશિ</span>
              <span className="font-serif font-bold text-[#2c2825]">{t[pData.sun.rashi] || pData.sun.rashi} ({pData.sun.deg}°)</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 rounded-lg glass-card p-2">
            <Moon className="h-4 w-4 text-[#736a60]" />
            <div>
              <span className="text-[#736a60] text-[10px] block">ચંદ્ર રાશિ</span>
              <span className="font-serif font-bold text-[#2c2825]">{t[pData.moon.rashi] || pData.moon.rashi} ({pData.moon.deg}°)</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 rounded-lg glass-card p-2">
            <Sparkles className="h-4 w-4 text-[#b85d19]" />
            <div>
              <span className="text-[#736a60] text-[10px] block">અયનાંશ</span>
              <span className="font-mono font-bold text-[#2c2825]">લાહિડી (ચિત્રા પક્ષ)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Core Limbs Grid (૫ મહા અંગો) */}
      <div>
        <h3 className="font-serif text-base font-semibold text-[#2c2825] mb-3 flex items-center gap-1.5">
          <Award className="h-4 w-4 text-[#b85d19]" /> પંચાંગના ૫ મુખ્ય અંગો (5 Core Limbs)
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 print:grid-cols-5">
          {/* 1. Tithi */}
          <div className="rounded-xl glass-card p-4 text-xs shadow-2xs space-y-2 print:border-gray-300">
            <div className="flex justify-between items-center border-b border-[#e6dfd3]/80 pb-1.5">
              <span className="font-semibold text-[#736a60] uppercase text-[10px]">૧. તિથિ (Tithi)</span>
              <span className="rounded glass-pill px-1.5 py-0.5 text-[10px] font-bold text-[#b85d19]">{pData.tithi.nature}</span>
            </div>
            <h4 className="font-serif text-base font-bold text-[#2c2825]">{pData.tithi.name}</h4>
            <span className="text-[#544d44] block text-[11px]">{pData.pakshaName}</span>
            <div className="text-[10px] text-[#736a60] pt-1">
              દેવતા: <strong>{pData.tithi.deity}</strong>
            </div>
          </div>

          {/* 2. Vaar */}
          <div className="rounded-xl glass-card p-4 text-xs shadow-2xs space-y-2 print:border-gray-300">
            <div className="flex justify-between items-center border-b border-[#e6dfd3]/80 pb-1.5">
              <span className="font-semibold text-[#736a60] uppercase text-[10px]">૨. વાર (Vaar)</span>
              <span className="rounded glass-pill px-1.5 py-0.5 text-[10px] font-bold text-[#2c2825]">દિવસ</span>
            </div>
            <h4 className="font-serif text-base font-bold text-[#2c2825]">{pData.vaar}</h4>
            <span className="text-[#544d44] block text-[11px]">દિશા શૂળ: {pData.dishaShool.badDir}</span>
            <div className="text-[10px] text-[#736a60] pt-1">
              સ્વામી: <strong>{pData.vaar.split(' ')[0]}</strong>
            </div>
          </div>

          {/* 3. Nakshatra */}
          <div className="rounded-xl glass-card p-4 text-xs shadow-2xs space-y-2 print:border-gray-300">
            <div className="flex justify-between items-center border-b border-[#e6dfd3]/80 pb-1.5">
              <span className="font-semibold text-[#736a60] uppercase text-[10px]">૩. નક્ષત્ર (Nakshatra)</span>
              <span className="rounded glass-pill px-1.5 py-0.5 text-[10px] font-bold text-[#b85d19]">પદ {pData.nakshatra.pada}</span>
            </div>
            <h4 className="font-serif text-base font-bold text-[#2c2825]">{pData.nakshatra.name}</h4>
            <span className="text-[#544d44] block text-[11px]">સ્વામી: {t[pData.nakshatra.lord] || pData.nakshatra.lord}</span>
            <div className="text-[10px] text-[#736a60] pt-1">
              ગણ: <strong>{pData.nakshatra.gana}</strong> | યોનિ: <strong>{pData.nakshatra.yoni}</strong>
            </div>
          </div>

          {/* 4. Yoga */}
          <div className="rounded-xl glass-card p-4 text-xs shadow-2xs space-y-2 print:border-gray-300">
            <div className="flex justify-between items-center border-b border-[#e6dfd3]/80 pb-1.5">
              <span className="font-semibold text-[#736a60] uppercase text-[10px]">૪. યોગ (Nitya Yoga)</span>
              <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                pData.yoga.nature === 'Auspicious' ? 'glass-badge-success' : 'glass-badge-danger'
              }`}>
                {pData.yoga.nature === 'Auspicious' ? 'શુભ' : 'અશુભ'}
              </span>
            </div>
            <h4 className="font-serif text-base font-bold text-[#2c2825]">{pData.yoga.name}</h4>
            <span className="text-[#544d44] block text-[11px]">દેવતા: {pData.yoga.deity}</span>
            <div className="text-[10px] text-[#736a60] pt-1">
              ૨૭ નિત્ય યોગ ક્રમ
            </div>
          </div>

          {/* 5. Karana */}
          <div className="rounded-xl glass-card p-4 text-xs shadow-2xs space-y-2 print:border-gray-300">
            <div className="flex justify-between items-center border-b border-[#e6dfd3]/80 pb-1.5">
              <span className="font-semibold text-[#736a60] uppercase text-[10px]">૫. કરણ (Karana)</span>
              <span className="rounded glass-pill px-1.5 py-0.5 text-[10px] font-bold text-[#544d44]">{pData.karana.type.split(' ')[0]}</span>
            </div>
            <h4 className="font-serif text-base font-bold text-[#2c2825]">{pData.karana.name}</h4>
            <span className="text-[#544d44] block text-[11px]">સ્વામી: {pData.karana.lord}</span>
            <div className="text-[10px] text-[#736a60] pt-1">
              {pData.isBhadraActive ? '⚠️ ભદ્રા કાળ ઉપસ્થિત' : '✅ સામાન્ય કરણ'}
            </div>
          </div>
        </div>
      </div>

      {/* Shubh & Ashubh Muhurat Timings */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 print:grid-cols-2">
        {/* Auspicious Muhurats */}
        <div className="rounded-xl glass-badge-success p-5 space-y-3 print:border-gray-300 print:bg-white">
          <h3 className="font-serif text-base font-bold text-[#285e20] flex items-center gap-2 border-b border-[#c1dec4]/80 pb-2">
            <ShieldCheck className="h-5 w-5 text-[#285e20]" /> શુભ મુહૂર્ત કાળ (Auspicious Timings)
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg glass-card p-3">
              <span className="font-semibold text-[#285e20] block">અભિજિત મુહૂર્ત (સર્વશ્રેષ્ઠ)</span>
              <span className="font-mono text-[#2c2825] font-bold text-xs">{pData.muhurats.abhijit}</span>
            </div>
            <div className="rounded-lg glass-card p-3">
              <span className="font-semibold text-[#285e20] block">બ્રહ્મ મુહૂર્ત (સાધના કાળ)</span>
              <span className="font-mono text-[#2c2825] font-bold text-xs">{pData.muhurats.brahma}</span>
            </div>
            <div className="rounded-lg glass-card p-3">
              <span className="font-semibold text-[#285e20] block">વિજય મુહૂર્ત (વિજય કાળ)</span>
              <span className="font-mono text-[#2c2825] font-bold text-xs">{pData.muhurats.vijay}</span>
            </div>
            <div className="rounded-lg glass-card p-3">
              <span className="font-semibold text-[#285e20] block">ગોધૂલિ મુહૂર્ત (સંધ્યા કાળ)</span>
              <span className="font-mono text-[#2c2825] font-bold text-xs">{pData.muhurats.godhuli}</span>
            </div>
          </div>
        </div>

        {/* Inauspicious Periods */}
        <div className="rounded-xl glass-badge-danger p-5 space-y-3 print:border-gray-300 print:bg-white">
          <h3 className="font-serif text-base font-bold text-[#802020] flex items-center gap-2 border-b border-[#e4b5b5]/80 pb-2">
            <AlertTriangle className="h-5 w-5 text-[#802020]" /> વર્જ્ય / અશુભ કાળ (Inauspicious Periods)
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg glass-card p-3">
              <span className="font-semibold text-[#802020] block">રાહુ કાળ (ત્યાજ્ય સમય)</span>
              <span className="font-mono text-[#2c2825] font-bold text-xs">{pData.muhurats.rahuKaal}</span>
            </div>
            <div className="rounded-lg glass-card p-3">
              <span className="font-semibold text-[#802020] block">યમગંડ કાળ</span>
              <span className="font-mono text-[#2c2825] font-bold text-xs">{pData.muhurats.yamaghanta}</span>
            </div>
            <div className="rounded-lg glass-card p-3">
              <span className="font-semibold text-[#802020] block">ગુલિક કાળ</span>
              <span className="font-mono text-[#2c2825] font-bold text-xs">{pData.muhurats.gulikaKaal}</span>
            </div>
            <div className="rounded-lg glass-card p-3">
              <span className="font-semibold text-[#802020] block">ભદ્રા / વિષ્ટિ સ્થિતિ</span>
              <span className="font-semibold text-[#2c2825] text-xs">
                {pData.isBhadraActive ? '⚠️ ભદ્રા સક્રિય (અશુભ)' : '✅ ભદ્રા મુક્ત (નિર્દોષ)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Disha Shool & Remedial Measures */}
      <div className="rounded-xl glass-panel p-5 space-y-3 shadow-2xs print:border-gray-300">
        <h3 className="font-serif text-base font-semibold text-[#2c2825] flex items-center gap-2">
          <Compass className="h-5 w-5 text-[#b85d19]" /> દિશા શૂળ અને યાત્રા પરિહાર (Disha Shool & Travel Remedy)
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs print:grid-cols-2">
          <div className="rounded-lg glass-card p-3.5 print:border-gray-200">
            <span className="font-semibold text-[#736a60] block mb-1">આજનો વાર & વર્જિત દિશા:</span>
            <p className="text-sm font-bold text-[#802020]">
              {pData.dishaShool.day} — {pData.dishaShool.badDir} દિશામાં દિશા શૂળ છે.
            </p>
            <span className="text-[11px] text-[#544d44] block mt-1">આ દિશામાં અત્યંત જરૂરી ન હોય તો પ્રવાસ ટાળવો.</span>
          </div>

          <div className="rounded-lg glass-badge-success p-3.5 print:border-gray-200">
            <span className="font-semibold text-[#285e20] block mb-1">શાસ્ત્રીય પરિહાર (ઉપાય):</span>
            <p className="text-sm font-bold text-[#285e20]">
              {pData.dishaShool.remedy}
            </p>
            <span className="text-[11px] text-[#544d44] block mt-1">આ ઉપાય કરીને પ્રસ્થાન કરવાથી યાત્રા નિર્વિઘ્ન રહે છે.</span>
          </div>
        </div>
      </div>

      {/* Printable Astrological Footer & Shloka (Visible Only in Print) */}
      <div className="hidden print:block print-footer-signature rounded-xl border border-[#d4c8b8] bg-[#fcfbf7] p-3 text-xs text-center">
        <span className="font-serif font-bold text-[#8c7456]">|| ૐ સર્વે ભવન્તુ સુખિનઃ સર્વે સન્તુ નિરામયાઃ ||</span>
        <p className="text-[10px] text-[#736a60] mt-0.5">
          શ્રી ગુજરાતી પંચાંગ ગણતરી • અમાનત માસ પદ્ધતિ • સ્થાનિક પ્રમાણભૂત સમય (IST)
        </p>
      </div>
    </div>
  );
}
