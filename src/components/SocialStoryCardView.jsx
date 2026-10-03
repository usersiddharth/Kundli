import React, { useState } from 'react';
import { Share2, Download, Sparkles, Smartphone, Image } from 'lucide-react';

export default function SocialStoryCardView({ kundliData, formData, t, lang = 'gu' }) {
  const [ratio, setRatio] = useState('9:16'); // '9:16' | '1:1'

  const personName = formData && formData.name ? formData.name : 'જાતક (Native)';
  const dateStr = new Date().toLocaleDateString('gu-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#faeee2] border border-[#e8b992]/60 text-[#b85d19]">
            <Share2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              ॥ સોશિયલ મીડિયા સ્ટોરી પત્રિકા (Vedic Social Story Card) ॥
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              વોટ્સએપ સ્ટેટસ અને ઇન્સ્ટાગ્રામ સ્ટોરી માટે શાસ્ત્રીય વૈદિક જ્યોતિષ કાર્ડ
            </p>
          </div>
        </div>
      </div>

      {/* Controls & Preview */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setRatio('9:16')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                ratio === '9:16'
                  ? 'spatial-btn-primary'
                  : 'spatial-btn-ghost border border-[#e5dac6]'
              }`}
            >
              ૯:૧૬ (Story Status)
            </button>

            <button
              onClick={() => setRatio('1:1')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                ratio === '1:1'
                  ? 'spatial-btn-primary'
                  : 'spatial-btn-ghost border border-[#e5dac6]'
              }`}
            >
              ૧:૧ (Square Post)
            </button>
          </div>

          <button
            onClick={() => alert('Story Graphic card saved to downloads!')}
            className="spatial-btn-primary px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>ડાઉનલોડ ગ્રાફિક (Download Card)</span>
          </button>
        </div>

        {/* Card Mockup Preview - Authentic Sandalwood Parchment Patrika */}
        <div className="flex justify-center py-4">
          <div
            className={`rounded-3xl p-6 bg-[#fffdf9] text-[#1f1a16] shadow-xl border-2 border-[#b85d19]/40 flex flex-col justify-between transition-all relative overflow-hidden ${
              ratio === '9:16' ? 'w-[280px] h-[480px]' : 'w-[320px] h-[320px]'
            }`}
            style={{
              backgroundImage:
                'radial-gradient(ellipse at top, rgba(250,238,226,0.5) 0%, rgba(255,253,249,1) 80%)',
            }}
          >
            {/* Corner Decorative Borders */}
            <div className="border border-[#e8b992] rounded-2xl p-4 h-full flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-serif font-bold text-[#8b2500] tracking-widest block text-center border-b border-[#e8b992]/60 pb-1.5">
                  ॥ ૐ શ્રી ગણેશાય નમઃ ॥
                </span>
                <div className="text-center mt-3">
                  <span className="text-[10px] font-serif uppercase tracking-wider text-[#b85d19]">
                    વૈદિક જન્મપત્રિકા
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1f1a16] mt-0.5">
                    {personName}
                  </h3>
                  <span className="text-[10px] font-mono text-[#756858] block mt-0.5">
                    {dateStr}
                  </span>
                </div>
              </div>

              <div className="text-center py-4 px-3 rounded-xl bg-[#faeee2]/80 border border-[#e8b992]/60 my-auto">
                <span className="text-[10px] font-serif text-[#8b2500] font-semibold block">
                  ॥ દૈનિક ભાગ્યોદય મંત્ર ॥
                </span>
                <h4 className="font-serif text-base font-bold text-[#1f1a16] mt-1 tracking-wide">
                  ॐ नमः शिवाय
                </h4>
                <p className="text-[9px] text-[#756858] mt-1 font-serif">
                  સર્વ મંગલ માંગલ્યે શિવે સર્વાર્થ સાધિકે
                </p>
              </div>

              <div className="text-center border-t border-[#e8b992]/60 pt-2">
                <span className="text-[9px] font-serif text-[#8b2500] font-medium tracking-wider block">
                  ॥ શ્રી જગદંબા પ્રસન્ન • વિક્રમ સંવત ૨૦૮૧ ॥
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
