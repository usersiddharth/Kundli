import React from 'react';

export default function CosmicLoader({ message = 'નક્ષત્ર ગણતરી લોડ થઈ રહી છે...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 space-y-4 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] backdrop-blur-md animate-fade-in-up">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-[var(--border-subtle)] border-t-[var(--text-gold)] animate-spin" />
        <div className="absolute w-6 h-6 rounded-full bg-[var(--gold-primary)]/10 animate-ping" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-xs font-serif font-bold text-[var(--text-primary)] tracking-wide">
          {message}
        </p>
        <p className="text-[10px] text-[var(--text-muted)] tracking-wider uppercase font-mono">
          Loading Astrological Calculation
        </p>
      </div>
    </div>
  );
}
