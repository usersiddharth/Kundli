import React from 'react';

/**
 * CosmicLoader — Spatial UI edition
 * Concentric orbital rings in saffron + indigo, floating on the void.
 */
export default function CosmicLoader({ message }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-8 py-16">
      {/* Orbital ring system */}
      <div className="relative flex items-center justify-center" style={{ width: 96, height: 96 }}>
        {/* Outermost ring — slow, wide orbit */}
        <div
          className="absolute rounded-full border border-transparent animate-spin-slow"
          style={{
            width: 96,
            height: 96,
            borderTopColor: 'rgba(245,158,11,0.35)',
            borderRightColor: 'rgba(99,102,241,0.15)',
          }}
        />
        {/* Mid ring — medium speed, reverse */}
        <div
          className="absolute rounded-full border border-transparent animate-spin-reverse"
          style={{
            width: 68,
            height: 68,
            borderTopColor: 'rgba(245,158,11,0.55)',
            borderLeftColor: 'rgba(139,92,246,0.2)',
            animationDuration: '18s',
          }}
        />
        {/* Inner ring — faster, pure gold */}
        <div
          className="absolute rounded-full border border-transparent"
          style={{
            width: 44,
            height: 44,
            borderTopColor: 'rgba(245,158,11,0.85)',
            borderRightColor: 'rgba(245,158,11,0.3)',
            animation: 'spinSlow 8s linear infinite',
          }}
        />
        {/* Core glow dot */}
        <div
          className="absolute rounded-full animate-cosmic-pulse"
          style={{
            width: 12,
            height: 12,
            background: 'radial-gradient(circle, #fbbf24 0%, rgba(245,158,11,0.4) 60%, transparent 100%)',
          }}
        />
      </div>

      {/* Message */}
      {message && (
        <p
          className="text-sm tracking-wide animate-fade-in-up"
          style={{
            color: 'var(--text-tertiary)',
            fontFamily: 'Inter, sans-serif',
            animationDelay: '0.15s',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
