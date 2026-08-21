import React, { useState } from 'react';
import { Volume2, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';

export default function JapaMalaView({ t, lang = 'gu' }) {
  const [beadCount, setBeadCount] = useState(0);
  const [completedMalas, setCompletedMalas] = useState(0);
  const [selectedMantra, setSelectedMantra] = useState('surya');

  const MANTRAS = [
    {
      id: 'surya',
      name: { gu: 'સૂર્ય બીજ મંત્ર', hi: 'सूर्य बीज मंत्र', en: 'Surya Beeja Mantra' },
      text: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः',
    },
    {
      id: 'chandra',
      name: { gu: 'ચંદ્ર બીજ મંત્ર', hi: 'चन्द्र बीज मंत्र', en: 'Chandra Beeja Mantra' },
      text: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः',
    },
    {
      id: 'mangal',
      name: { gu: 'મંગળ બીજ મંત્ર', hi: 'मंगल बीज मंत्र', en: 'Mangal Beeja Mantra' },
      text: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः',
    },
    {
      id: 'budh',
      name: { gu: 'બુધ બીજ મંત્ર', hi: 'बुध बीज मंत्र', en: 'Budh Beeja Mantra' },
      text: 'ॐ ब्रां ब्रीम ब्रौं सः बुधाय नमः',
    },
    {
      id: 'guru',
      name: { gu: 'ગુરુ બીજ મંત્ર', hi: 'गुरु बीज मंत्र', en: 'Guru Beeja Mantra' },
      text: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः',
    },
    {
      id: 'shukra',
      name: { gu: 'શુક્ર બીજ મંત્ર', hi: 'शुक्र बीज मंत्र', en: 'Shukra Beeja Mantra' },
      text: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः',
    },
    {
      id: 'shani',
      name: { gu: 'શનિ બીજ મંત્ર', hi: 'शनि बीज मंत्र', en: 'Shani Beeja Mantra' },
      text: 'ॐ शं शनैश्चराय नमः',
    },
  ];

  const activeMantraObj = MANTRAS.find((m) => m.id === selectedMantra) || MANTRAS[0];

  const handleBeadClick = () => {
    // Play synthetic audio click tone using Web Audio API
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, audioCtx.currentTime); // 528 Hz Solfeggio Love frequency
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      // Audio fallback
    }

    if (beadCount + 1 >= 108) {
      setBeadCount(0);
      setCompletedMalas((prev) => prev + 1);
    } else {
      setBeadCount((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setBeadCount(0);
    setCompletedMalas(0);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-button-dark text-[var(--text-gold)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              ૧૦૮ મંત્ર જાપ માળા કૌન્ટર (Interactive 108 Japa Mala)
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              નવગ્રહ બીજ મંત્ર જાપ ટ્રેકર અને ૧૦૮ મણકા સાધના કૌન્ટર
            </p>
          </div>
        </div>
      </div>

      {/* Mantra Selector */}
      <div className="glass-panel rounded-2xl p-5 shadow-sm border border-[var(--border-subtle)] space-y-4">
        <label className="text-xs font-serif font-bold text-[var(--text-gold)] uppercase tracking-wider block">
          જાપ માટે મંત્ર પસંદ કરો (Select Mantra)
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {MANTRAS.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMantra(m.id)}
              className={`p-2.5 rounded-xl border text-xs font-bold transition ${
                selectedMantra === m.id
                  ? 'glass-panel-accent border-[#b85d19] text-[var(--text-gold)] ring-2 ring-[#b85d19]/40'
                  : 'glass-card text-[var(--text-primary)] hover:bg-white/10'
              }`}
            >
              {m.name[lang] || m.name.gu}
            </button>
          ))}
        </div>

        {/* Selected Mantra Text Display */}
        <div className="glass-card p-4 rounded-xl text-center space-y-1 border border-[var(--border-subtle)]">
          <span className="text-xs font-serif text-[var(--text-muted)] uppercase block">
            સક્રિય મંત્ર (Active Sacred Text)
          </span>
          <h3 className="font-serif text-xl font-bold text-[var(--text-gold)]">{activeMantraObj.text}</h3>
        </div>
      </div>

      {/* Interactive 108 Bead Clicker Button */}
      <div className="glass-panel-accent rounded-2xl p-8 shadow-sm border border-[#b85d19]/40 flex flex-col items-center justify-center text-center space-y-4">
        <div className="flex items-center space-x-6">
          <div>
            <span className="text-xs text-[var(--text-muted)] font-serif uppercase block">વર્તમાન મણકો</span>
            <span className="font-mono text-5xl font-bold text-[var(--text-gold)]">{beadCount}</span>
            <span className="text-xs font-mono text-[var(--text-muted)]"> / 108</span>
          </div>

          <div className="h-12 w-px bg-[#e6dfd3]" />

          <div>
            <span className="text-xs text-[var(--text-muted)] font-serif uppercase block">
              પૂર્ણ થયેલ માળા
            </span>
            <span className="font-mono text-5xl font-bold text-[#285e20]">{completedMalas}</span>
            <span className="text-xs font-mono text-[var(--text-muted)]"> માળા</span>
          </div>
        </div>

        {/* Big Bead Click Button */}
        <button
          onClick={handleBeadClick}
          className="w-44 h-44 rounded-full glass-button-dark flex flex-col items-center justify-center text-[#f4ebd9] shadow-xl hover:scale-105 active:scale-95 transition cursor-pointer border-4 border-[#c59b27]"
        >
          <span className="text-xs font-serif font-bold tracking-widest uppercase">મણકો ફેરવો</span>
          <span className="text-3xl font-mono font-bold text-[#facc15] mt-1">{beadCount + 1}</span>
          <span className="text-[10px] opacity-75 mt-1">CLICK TO COUNT</span>
        </button>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-gold)] transition"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>કૌન્ટર રીસેટ કરો (Reset Counter)</span>
        </button>
      </div>
    </div>
  );
}
