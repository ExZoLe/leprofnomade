'use client';

import type { CountryTheme } from '@/lib/travel-theme';

// ============================================================
// Passeport — un tampon rond par escale.
// Complété = tampon rempli (légèrement penché, comme un vrai
// coup de tampon). En cours = pointillé. À venir = cadenas.
// ============================================================

export function Passport({
  theme,
  escaleStatus, // pour chaque escale (1..8) : 'done' | 'current' | 'locked'
}: {
  theme: CountryTheme;
  escaleStatus: ('done' | 'current' | 'locked')[];
}) {
  const doneCount = escaleStatus.filter((s) => s === 'done').length;

  return (
    <section className="bg-white rounded-2xl border border-black/5 p-4 mb-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-lg" style={{ color: theme.deep }}>
          Passeport
        </h2>
        <span className="text-xs text-gray-400">
          {doneCount}/{theme.stamps.length} tampons
        </span>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
        {theme.stamps.map((stamp, i) => {
          const status = escaleStatus[i] ?? 'locked';
          const tilt = [-6, 4, -3, 5, -5, 3, -4, 6][i % 8];

          if (status === 'done') {
            return (
              <div key={i} className="flex-shrink-0 text-center" style={{ width: 60 }}>
                <div
                  className="w-14 h-14 mx-auto rounded-full flex flex-col items-center justify-center"
                  style={{
                    border: `2.5px solid ${theme.primary}`,
                    background: theme.soft,
                    transform: `rotate(${tilt}deg)`,
                  }}
                >
                  <span className="text-base leading-none">{stamp.emoji}</span>
                  <span
                    className="text-[7px] font-bold uppercase tracking-wide mt-0.5 px-0.5 text-center leading-tight"
                    style={{ color: theme.deep }}
                  >
                    {stamp.label}
                  </span>
                </div>
                <span className="text-[9px] mt-1 block" style={{ color: theme.accent }}>
                  ✓ Escale {i + 1}
                </span>
              </div>
            );
          }

          if (status === 'current') {
            return (
              <div key={i} className="flex-shrink-0 text-center" style={{ width: 60 }}>
                <div
                  className="w-14 h-14 mx-auto rounded-full flex flex-col items-center justify-center animate-pulse"
                  style={{ border: `2.5px dashed ${theme.primary}`, background: 'transparent' }}
                >
                  <span className="text-base leading-none opacity-50">{stamp.emoji}</span>
                  <span className="text-[7px] font-bold uppercase mt-0.5" style={{ color: theme.primary }}>
                    En cours
                  </span>
                </div>
                <span className="text-[9px] mt-1 block text-gray-400">Escale {i + 1}</span>
              </div>
            );
          }

          return (
            <div key={i} className="flex-shrink-0 text-center" style={{ width: 60 }}>
              <div
                className="w-14 h-14 mx-auto rounded-full flex items-center justify-center"
                style={{ border: `2px dashed ${theme.primary}20` }}
              >
                <span className="text-sm" style={{ color: `${theme.primary}30` }}>🔒</span>
              </div>
              <span className="text-[9px] mt-1 block text-gray-300">Escale {i + 1}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
