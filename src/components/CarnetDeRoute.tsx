'use client';

import { useState } from 'react';
import type { CountryTheme } from '@/lib/travel-theme';

// ============================================================
// Carnet de route — se remplit au fil des escales.
// Chaque escale débloquée révèle ses mots-clés + un point
// culturel. Les escales verrouillées restent estompées.
// ============================================================

export function CarnetDeRoute({
  theme,
  escaleStatus,
  escaleTitles, // titre de chaque escale (index 0 = escale 1)
}: {
  theme: CountryTheme;
  escaleStatus: ('done' | 'current' | 'locked')[];
  escaleTitles: string[];
}) {
  const [expanded, setExpanded] = useState(false);

  const totalWords = theme.carnet.reduce((sum, e, i) => {
    const st = escaleStatus[i];
    return st === 'done' || st === 'current' ? sum + e.words.length : sum;
  }, 0);

  // par défaut on montre les escales entamées, sinon tout si "expanded"
  const visible = theme.carnet
    .map((entry, i) => ({ entry, i, status: escaleStatus[i] ?? 'locked' }))
    .filter(({ status }, i) => expanded || status !== 'locked');

  const accents = [theme.primary, theme.accent, theme.deep];

  return (
    <section className="bg-[#FAF6F0] rounded-2xl border border-[#3D2D1414] p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-lg" style={{ color: theme.deep }}>
          Carnet de route
        </h2>
        <span className="text-xs font-semibold" style={{ color: theme.primary }}>
          {totalWords} mots
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {visible.map(({ entry, i, status }) => {
          const accent = accents[i % accents.length];
          const locked = status === 'locked';
          return (
            <div
              key={i}
              className="bg-[#F3ECE0] pl-3 pr-3 py-2.5"
              style={{
                borderLeft: `3px solid ${locked ? '#00000012' : accent}`,
                opacity: locked ? 0.45 : 1,
              }}
            >
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1.5">
                Escale {i + 1} — {escaleTitles[i] ?? ''}
                {status === 'current' && <span style={{ color: theme.primary }}> · en cours</span>}
              </p>

              {!locked && (
                <>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.words.map((w, k) => (
                      <span
                        key={k}
                        className="text-[11px] px-2 py-0.5 rounded"
                        style={{ background: `${accent}12`, color: theme.deep }}
                        title={w.fr}
                      >
                        {w.native}
                        <span className="text-gray-400"> · {w.fr}</span>
                      </span>
                    ))}
                  </div>
                  {entry.culturalNote && (
                    <p
                      className="text-[11px] italic text-gray-500 mt-2 pl-2"
                      style={{ borderLeft: `2px solid ${accent}40` }}
                    >
                      💡 {entry.culturalNote}
                    </p>
                  )}
                </>
              )}

              {locked && (
                <p className="text-[11px] text-gray-400">🔒 Termine l'escale pour révéler ces mots</p>
              )}
            </div>
          );
        })}
      </div>

      {/* bouton voir tout / réduire */}
      {theme.carnet.some((_, i) => (escaleStatus[i] ?? 'locked') === 'locked') && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full mt-3 py-2 rounded-lg text-[11px] font-semibold border-none cursor-pointer transition-colors"
          style={{ background: theme.soft, color: theme.primary }}
        >
          {expanded ? 'Réduire' : 'Voir tout le carnet (escales verrouillées comprises)'}
        </button>
      )}
    </section>
  );
}
