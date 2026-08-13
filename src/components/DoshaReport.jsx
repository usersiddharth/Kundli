import React from 'react';
import { evaluateDoshas } from '../engine/doshas.js';
import { ShieldAlert, CheckCircle, AlertTriangle, Flame } from 'lucide-react';

export default function DoshaReport({ kundliData, t, lang }) {
  if (!kundliData) return null;

  const doshaData = evaluateDoshas(kundliData);
  const { mangalDosha, kalsarpaDosha, sadeSati } = doshaData;

  return (
    <div className="space-y-6">
      {/* Mangal Dosha Card */}
      <div className="rounded-xl border border-[#e6dfd3] bg-[#fcfbf7] p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e6dfd3] pb-4">
          <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
            <Flame className="h-5 w-5 text-[#b85d19]" /> {t.mangalDosha}
          </h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              mangalDosha.isCancelled
                ? 'bg-[#e0edd8] text-[#285e20]'
                : mangalDosha.isPresent
                ? 'bg-[#f0d5d5] text-[#802020]'
                : 'bg-[#e0edd8] text-[#285e20]'
            }`}
          >
            {mangalDosha.isCancelled
              ? t.mangalCancelled
              : mangalDosha.isPresent
              ? t.mangalDoshaPresent
              : t.mangalDoshaAbsent}
          </span>
        </div>

        {mangalDosha.isCancelled && (
          <p className="mt-3 text-sm text-[#285e20] bg-[#e0edd8]/50 p-3 rounded-lg border border-[#c1dec4]">
            <strong>Cancellation Note:</strong> {mangalDosha.reason}
          </p>
        )}

        <div className="mt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#544d44] mb-2">{t.remedies}:</h4>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-[#2c2825]">
            {(mangalDosha.remedies[lang] || mangalDosha.remedies.en).map((rem, i) => (
              <li key={i}>{rem}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Kalsarpa Dosha Card */}
      <div className="rounded-xl border border-[#e6dfd3] bg-[#fcfbf7] p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e6dfd3] pb-4">
          <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-[#b85d19]" /> {t.kalsarpaDosha}
          </h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              kalsarpaDosha.isPresent ? 'bg-[#f0d5d5] text-[#802020]' : 'bg-[#e0edd8] text-[#285e20]'
            }`}
          >
            {kalsarpaDosha.isPresent ? `Present (${kalsarpaDosha.type})` : 'Absent'}
          </span>
        </div>

        <div className="mt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#544d44] mb-2">{t.remedies}:</h4>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-[#2c2825]">
            {(kalsarpaDosha.remedies[lang] || kalsarpaDosha.remedies.en).map((rem, i) => (
              <li key={i}>{rem}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sade Sati Card */}
      <div className="rounded-xl border border-[#e6dfd3] bg-[#fcfbf7] p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e6dfd3] pb-4">
          <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-[#b85d19]" /> {t.sadeSati}
          </h2>

          <span className="rounded-full bg-[#f5efe6] px-3 py-1 text-xs font-semibold text-[#544d44]">
            Current Status: {sadeSati.phase}
          </span>
        </div>

        <div className="mt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#544d44] mb-2">{t.remedies}:</h4>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-[#2c2825]">
            {(sadeSati.remedies[lang] || sadeSati.remedies.en).map((rem, i) => (
              <li key={i}>{rem}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
