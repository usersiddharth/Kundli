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
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[#e6dfd3] space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-button-dark text-[#e6a86c]">
            <Share2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2c2825] tracking-tight">
              સોશિયલ મીડિયા સ્ટોરી ગ્રાફિક (WhatsApp / Insta Story Generator)
            </h2>
            <p className="text-xs sm:text-sm text-[#736a60]">
              વોટ્સએપ સ્ટેટસ અને ઇન્સ્ટાગ્રામ સ્ટોરી માટે સુંદર કુંડળી કાર્ડ જનરેટર
            </p>
          </div>
        </div>
      </div>

      {/* Controls & Preview */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[#e6dfd3] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setRatio('9:16')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                ratio === '9:16' ? 'glass-button-dark text-[#f4ebd9]' : 'glass-card text-[#2c2825]'
              }`}
            >
              ૯:૧૬ (Story Status)
            </button>

            <button
              onClick={() => setRatio('1:1')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                ratio === '1:1' ? 'glass-button-dark text-[#f4ebd9]' : 'glass-card text-[#2c2825]'
              }`}
            >
              ૧:૧ (Square Post)
            </button>
          </div>

          <button
            onClick={() => alert('Story Graphic card saved to downloads!')}
            className="glass-panel-accent px-4 py-2 rounded-xl text-xs font-bold text-[#b85d19] flex items-center gap-1.5 shadow-xs"
          >
            <Download className="h-3.5 w-3.5" />
            <span>ડાઉનલોડ ગ્રાફિક (Download Card)</span>
          </button>
        </div>

        {/* Card Mockup Preview */}
        <div className="flex justify-center py-4">
          <div
            className={`rounded-3xl p-6 bg-[#15100c] text-[#f4ebd9] shadow-2xl border border-[#c59b27]/40 flex flex-col justify-between transition-all ${
              ratio === '9:16' ? 'w-[280px] h-[480px]' : 'w-[320px] h-[320px]'
            }`}
          >
            <div>
              <span className="text-[10px] font-serif font-bold uppercase text-[#c59b27] tracking-widest block">
                વૈદિક જ્યોતિષ કાર્ડ
              </span>
              <h3 className="font-serif text-xl font-bold text-[#facc15] mt-1">{personName}</h3>
              <span className="text-[10px] font-mono text-[#a39a8e] block">{dateStr}</span>
            </div>

            <div className="text-center py-4 border-y border-[#382d24]">
              <span className="text-[10px] font-serif text-[#e6a86c] block">
                દૈનિક ભાગ્યોદય મંત્ર
              </span>
              <h4 className="font-serif text-sm font-bold text-[#4ade80] mt-1">ॐ नमः शिवाय</h4>
            </div>

            <div className="text-center">
              <span className="text-[9px] font-mono text-[#a39a8e] tracking-widest uppercase">
                POWERED BY VEDIC ASTRO SOFTWARE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
