import React from 'react';
import { Card, Chip } from '@heroui/react';
import { evaluateDoshas } from '../engine/doshas.js';
import { ShieldAlert, AlertTriangle, Flame } from 'lucide-react';

export default function DoshaReport({ kundliData, t, lang }) {
  if (!kundliData) return null;

  const doshaData = evaluateDoshas(kundliData);
  const { mangalDosha, kalsarpaDosha, sadeSati } = doshaData;

  return (
    <div className="space-y-6">
      {/* Mangal Dosha Card */}
      <Card className="rounded-2xl border border-[var(--border-gold)] glass-panel p-6 shadow-sm">
        <Card.Header className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-4 p-0">
          <Card.Title className="text-xl font-medium text-[var(--text-primary)] font-serif flex items-center gap-2">
            <Flame className="h-5 w-5 text-[var(--text-gold)]" /> {t.mangalDosha}
          </Card.Title>

          <Chip
            className={`px-3 py-1 text-xs font-semibold ${
              mangalDosha.isCancelled
                ? 'glass-badge-success'
                : mangalDosha.isPresent
                  ? 'glass-badge-danger'
                  : 'glass-badge-success'
            }`}
          >
            <Chip.Label>
              {mangalDosha.isCancelled
                ? t.mangalCancelled
                : mangalDosha.isPresent
                  ? t.mangalDoshaPresent
                  : t.mangalDoshaAbsent}
            </Chip.Label>
          </Chip>
        </Card.Header>

        {mangalDosha.isCancelled && (
          <p className="mt-3 text-sm text-emerald-800 dark:text-emerald-300 glass-badge-success p-3 rounded-xl border">
            <strong>Cancellation Note:</strong> {mangalDosha.reason}
          </p>
        )}

        <div className="mt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
            {t.remedies}:
          </h4>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-[var(--text-primary)]">
            {(mangalDosha.remedies[lang] || mangalDosha.remedies.en).map((rem, i) => (
              <li key={i}>{rem}</li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Kalsarpa Dosha Card */}
      <Card className="rounded-2xl border border-[var(--border-gold)] glass-panel p-6 shadow-sm">
        <Card.Header className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-4 p-0">
          <Card.Title className="text-xl font-medium text-[var(--text-primary)] font-serif flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-[var(--text-gold)]" /> {t.kalsarpaDosha}
          </Card.Title>

          <Chip
            className={`px-3 py-1 text-xs font-semibold ${
              kalsarpaDosha.isPresent ? 'glass-badge-danger' : 'glass-badge-success'
            }`}
          >
            <Chip.Label>
              {kalsarpaDosha.isPresent ? `Present (${kalsarpaDosha.type})` : 'Absent'}
            </Chip.Label>
          </Chip>
        </Card.Header>

        <div className="mt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
            {t.remedies}:
          </h4>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-[var(--text-primary)]">
            {(kalsarpaDosha.remedies[lang] || kalsarpaDosha.remedies.en).map((rem, i) => (
              <li key={i}>{rem}</li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Sade Sati Card */}
      <Card className="rounded-2xl border border-[var(--border-gold)] glass-panel p-6 shadow-sm">
        <Card.Header className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-4 p-0">
          <Card.Title className="text-xl font-medium text-[var(--text-primary)] font-serif flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-[var(--text-gold)]" /> {t.sadeSati}
          </Card.Title>

          <Chip className="glass-pill px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
            <Chip.Label>Current Status: {sadeSati.phase}</Chip.Label>
          </Chip>
        </Card.Header>

        <div className="mt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
            {t.remedies}:
          </h4>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-[var(--text-primary)]">
            {(sadeSati.remedies[lang] || sadeSati.remedies.en).map((rem, i) => (
              <li key={i}>{rem}</li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
