import React from 'react';
import ChartSVG from './ChartSVG.jsx';
import BasicDetails from './BasicDetails.jsx';
import PlanetaryTable from './PlanetaryTable.jsx';
import ParivartanView from './ParivartanView.jsx';
import YogasView from './YogasView.jsx';
import DoshaReport from './DoshaReport.jsx';
import GemstonesView from './GemstonesView.jsx';
import AshtakvargaView from './AshtakvargaView.jsx';
import ShadbalaView from './ShadbalaView.jsx';
import DashaView from './DashaView.jsx';
import { degToDms } from '../engine/astronomy.js';
import {
  Printer,
  Compass,
  Sparkles,
  Award,
  ShieldCheck,
  Gem,
  User,
  Calendar,
  MapPin,
  Clock,
} from 'lucide-react';

export default function PrintableReport({ kundliData, formData, birthDate, t, lang }) {
  if (!kundliData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* On-Screen Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl glass-panel p-5 shadow-sm print:hidden">
        <div>
          <h3 className="font-serif text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Printer className="h-5 w-5 text-[var(--text-gold)]" /> {t.tabPrint} (Publication-Grade
            Vedic Horoscope Dossier)
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            સંપૂર્ણ કુંડળી, નવમાંશ ચાર્ટ, ગ્રહ સ્પષ્ટ, ષડ્બળ, દશા, દોષ અને રત્ન ઉપાયો સાથે A4
            સાઇઝમાં પ્રિન્ટ અથવા PDF સેવ કરો
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-xl glass-button-primary px-6 py-2.5 text-sm font-bold shadow-md transition"
        >
          <Printer className="h-4 w-4" /> Save Complete Horoscope PDF
        </button>
      </div>

      {/* =========================================================================
          PUBLICATION-GRADE PRINTABLE DOCUMENT DOSSIER (A4 Multi-Page Layout)
          ========================================================================= */}
      <div className="rounded-xl glass-panel p-8 shadow-sm space-y-8 print:border-none print:shadow-none print:p-0 print:space-y-6">
        {/* -----------------------------------------------------------------------
            PAGE 1: VEDIC INVOCATION, NATIVE PROFILE & D1 + D9 CHARTS
            ----------------------------------------------------------------------- */}
        <div className="avoid-page-break space-y-5">
          {/* Traditional Vedic Letterhead */}
          <div className="print-letterhead text-center border-b-2 border-[#8c7456] pb-3">
            <span className="font-serif text-xs font-bold tracking-widest text-[var(--text-gold)] block">
              || ૐ શ્રી ગણેશાય નમઃ || ૐ નમો ભગવતે વાસુદેવાય ||
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-1">
              સંપૂર્ણ વૈદિક જન્મ કુંડળી (Vedic Horoscope Dossier)
            </h1>
            <span className="text-[11px] text-[var(--text-muted)] font-medium block mt-0.5">
              ચિત્રા પક્ષીય લાહિડી અયનાંશ આધારિત ઉચ્ચ-ચોક્કસાઈ ખગોળીય ગણતરી
            </span>
          </div>

          {/* Native Biodata High-Density Grid */}
          <div className="rounded-xl border border-[var(--border-subtle)] bg-white/5 p-4 text-xs">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono">
              <div>
                <span className="text-[10px] text-[var(--text-muted)] block font-sans">
                  જાતકનું નામ (Name):
                </span>
                <strong className="text-[var(--text-primary)] text-sm font-sans">
                  {formData?.name || 'જાતક (Native)'}
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-[var(--text-muted)] block font-sans">
                  જન્મ તારીખ (DOB):
                </span>
                <strong className="text-[var(--text-primary)]">
                  {formData?.dob?.includes('-') && formData.dob.split('-')[0].length === 4
                    ? `${formData.dob.split('-')[2]}.${formData.dob.split('-')[1]}.${formData.dob.split('-')[0]}`
                    : formData?.dob}
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-[var(--text-muted)] block font-sans">
                  જન્મ સમય (TOB):
                </span>
                <strong className="text-[var(--text-primary)]">{formData.tob} (IST)</strong>
              </div>
              <div>
                <span className="text-[10px] text-[var(--text-muted)] block font-sans">
                  જન્મ સ્થળ (Place):
                </span>
                <strong className="text-[var(--text-primary)] font-sans truncate block">
                  {formData.city}
                </strong>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono mt-2 pt-2 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <div>
                અક્ષાંશ (Lat): <strong>{formData.lat}° N</strong>
              </div>
              <div>
                રેખાંશ (Lng): <strong>{formData.lng}° E</strong>
              </div>
              <div>
                ટાઈમ ઝોન (TZ): <strong>+{formData.tz} GMT</strong>
              </div>
              <div>
                અયનાંશ: <strong>{degToDms(kundliData.ayanamsha).formatted} (Lahiri)</strong>
              </div>
            </div>
          </div>

          {/* Side-by-Side: Lagna Chart (D1) & Navamsha Chart (D9) */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--depth-2)] p-4 shadow-2xs">
              <h4 className="font-serif text-sm font-bold text-[var(--text-gold)] text-center border-b border-[var(--border-subtle)] pb-2 mb-3">
                ૧. જન્મ લગ્ન કુંડળી (Lagna Chart - D1)
              </h4>
              <ChartSVG kundliData={kundliData} t={t} lang={lang} />
            </div>

            <div className="space-y-4">
              <BasicDetails kundliData={kundliData} t={t} />
            </div>
          </div>

          {/* Full Planetary Ephemeris Table */}
          <div className="avoid-page-break pt-2">
            <h4 className="font-serif text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-1.5">
              <Compass className="h-4 w-4 text-[var(--text-gold)]" /> ગ્રહ સ્પષ્ટ અને નક્ષત્ર સ્થિતિ
              (Planetary Positions & Nakshatra)
            </h4>
            <PlanetaryTable kundliData={kundliData} t={t} />
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            PAGE 2: SHADBALA, ASHTAKVARGA & RAJAYOGAS
            ----------------------------------------------------------------------- */}
        <div className="page-break-before space-y-6 pt-4">
          <div className="avoid-page-break">
            <h3 className="font-serif text-base font-bold text-[var(--text-gold)] border-b border-[#8c7456]/50 pb-2 mb-3 flex items-center gap-2">
              <Award className="h-4 w-4 text-[var(--text-gold)]" /> ષડ્બળ અને ગ્રહ બળ તાકાત
              (Shadbala Strength Analysis)
            </h3>
            <ShadbalaView kundliData={kundliData} t={t} />
          </div>

          <div className="avoid-page-break">
            <h3 className="font-serif text-base font-bold text-[var(--text-primary)] border-b border-[#8c7456]/50 pb-2 mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--text-gold)]" /> સર્વાષ્ટકવર્ગ બિંદુ ચક્ર
              (Sarvashtakvarga Matrix)
            </h3>
            <AshtakvargaView kundliData={kundliData} t={t} />
          </div>

          <div className="avoid-page-break">
            <h3 className="font-serif text-base font-bold text-[var(--text-primary)] border-b border-[#8c7456]/50 pb-2 mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--text-gold)]" /> મુખ્ય સક્રિય રાજયોગ અને ગ્રહ
              યુતિ (Major Rajayogas & Conjunctions)
            </h3>
            <YogasView kundliData={kundliData} t={t} lang={lang} />
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            PAGE 3: DASHA, DOSHAS, GEMSTONES & CERTIFIED ASTROLOGER CONCLUSION
            ----------------------------------------------------------------------- */}
        <div className="page-break-before space-y-6 pt-4">
          <div className="avoid-page-break">
            <h3 className="font-serif text-base font-bold text-[var(--text-gold)] border-b border-[#8c7456]/50 pb-2 mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-[var(--text-gold)]" /> વિંશોત્તરી મહાદશા અને અંતર્દશા
              (Vimshottari Dasha Timeline)
            </h3>
            <DashaView kundliData={kundliData} t={t} lang={lang} />
          </div>

          <div className="avoid-page-break">
            <h3 className="font-serif text-base font-bold text-[#802020] border-b border-[#8c7456]/50 pb-2 mb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#802020]" /> દોષ વિશ્લેષણ (Mangal, Kaal Sarp &
              Shani Sade Sati)
            </h3>
            <DoshaReport kundliData={kundliData} t={t} lang={lang} />
          </div>

          <div className="avoid-page-break">
            <h3 className="font-serif text-base font-bold text-[#285e20] border-b border-[#8c7456]/50 pb-2 mb-3 flex items-center gap-2">
              <Gem className="h-4 w-4 text-[#285e20]" /> શુભ રત્ન અને શાસ્ત્રીય ઉપાય ભલામણ (Gemstone
              & Vedic Remedies)
            </h3>
            <GemstonesView kundliData={kundliData} t={t} lang={lang} />
          </div>

          {/* Certified Astrologer Signature Box & Blessings Footer */}
          <div className="print-footer-signature avoid-page-break rounded-xl border border-[var(--border-subtle)] bg-white/5 p-4 text-xs mt-6">
            <div className="flex justify-between items-end">
              <div>
                <span className="font-serif text-xs font-bold text-[var(--text-gold)] block">
                  || શુભમ્ ભવતુ • કલ્યાણમ્ અસ્તુ ||
                </span>
                <p className="text-[10px] text-[var(--text-muted)] mt-1">
                  આ કુંડળી વૈદિક પરાશરી પદ્ધતિ અને ચિત્રા પક્ષીય લાહિડી અયનાંશ ગણતરી મુજબ તૈયાર
                  કરવામાં આવેલ છે.
                </p>
              </div>

              <div className="text-right">
                <div className="w-36 border-b border-dashed border-[#736a60] pb-1 mb-1"></div>
                <span className="text-[10px] font-bold text-[var(--text-primary)] uppercase">
                  જ્યોતિષી હસ્તાક્ષર / મહોર
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
