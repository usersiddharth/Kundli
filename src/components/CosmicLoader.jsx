import React from 'react';
import { Sun } from 'lucide-react';

export default function CosmicLoader({ message }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[35vh] gap-4 py-12">
      {/* Refined Sacred Surya Emblem Loader */}
      <div className="relative flex items-center justify-center w-12 h-12">
        <div
          className="absolute inset-0 rounded-full border-2 border-[#e8b992]/40 border-t-[#b85d19] animate-spin"
          style={{ animationDuration: '1.2s' }}
        />
        <Sun className="w-5 h-5 text-[#b85d19]" />
      </div>

      {/* Message */}
      {message && (
        <p className="text-xs text-[var(--text-secondary)] font-serif font-medium animate-fade-in-up">
          {message}
        </p>
      )}
    </div>
  );
}
