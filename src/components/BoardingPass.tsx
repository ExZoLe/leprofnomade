'use client';

import { useEffect, useState } from 'react';
import type { CountryTheme } from '@/lib/travel-theme';

// ============================================================
// LA TOUCHE UNIQUE : carte d'embarquement
// Le header de chaque langue est un vrai billet d'avion.
// L'avion progresse sur la route Paris → capitale selon
// le pourcentage de leçons complétées, et le tracé se dessine
// à l'ouverture de la page (animation SVG).
// Les champs "PORTE" et "SIÈGE" mappent la progression réelle.
// ============================================================

export function BoardingPass({
  theme,
  passengerName,
  completedCount,
  totalLessons,
  currentEscale,
  currentLesson,
}: {
  theme: CountryTheme;
  passengerName: string;
  completedCount: number;
  totalLessons: number;
  currentEscale: number;
  currentLesson: number;
}) {
  const pct = totalLessons > 0 ? completedCount / totalLessons : 0;
  const [progress, setProgress] = useState(0);

  // Animation d'entrée : l'avion glisse vers sa position réelle
  useEffect(() => {
    const t = setTimeout(() => setProgress(pct), 250);
    return () => clearTimeout(t);
  }, [pct]);

  const planeLeft = `${8 + progress * 84}%`;

  return (
    <div
      className="boarding-pass relative rounded-2xl overflow-hidden mb-5"
      style={{
        background: theme.primary,
        boxShadow: `0 20px 40px -24px ${theme.primary}90`,
      }}
    >
      {/* En-tête compagnie */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🌍</span>
          <span className="text-[11px] font-bold tracking-[0.15em] text-white/90 uppercase">
            LeProfNomade · Carte d'embarquement
          </span>
        </div>
        <span className="text-[11px] font-mono text-white/70">
          {theme.flag} {theme.arrivalCode}
        </span>
      </div>

      {/* Route avec avion animé */}
      <div className="px-5 pb-4">
        <div className="flex items-end justify-between mb-1">
          <div>
            <p className="font-mono text-2xl font-bold text-white leading-none">{theme.departureCode}</p>
            <p className="text-[10px] text-white/70 mt-1">Paris</p>
          </div>

          {/* Piste de vol */}
          <div className="flex-1 relative mx-3 pb-3">
            {/* ligne pointillée de fond */}
            <div
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed"
              style={{ borderColor: 'rgba(255,255,255,0.35)' }}
            />
            {/* ligne parcourue */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full transition-all duration-[1400ms] ease-out"
              style={{ width: planeLeft, background: 'rgba(255,255,255,0.95)' }}
            />
            {/* avion */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-[1400ms] ease-out"
              style={{ left: planeLeft }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{ background: '#fff', color: theme.primary, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
              >
                ✈️
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="font-mono text-2xl font-bold text-white leading-none">{theme.arrivalCode}</p>
            <p className="text-[10px] text-white/70 mt-1">{theme.city}</p>
          </div>
        </div>
      </div>

      {/* Perforation + souche */}
      <div className="relative">
        {/* encoches */}
        <div
          className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
          style={{ background: 'var(--cream, #F5EDE3)' }}
        />
        <div
          className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
          style={{ background: 'var(--cream, #F5EDE3)' }}
        />
        <div className="border-t-2 border-dashed border-white/30 mx-3" />
      </div>

      {/* Détails du billet — mappés sur la progression réelle */}
      <div className="px-5 py-4 flex items-end justify-between gap-3">
        <div className="grid grid-cols-3 gap-x-5 gap-y-2 flex-1">
          <Field label="Passager" value={passengerName || 'Voyageur'} />
          <Field label="Vol" value={`${theme.arrivalCode}-${completedCount}/${totalLessons}`} mono />
          <Field label="Classe" value={pct >= 1 ? 'Arrivé' : 'En vol'} />
          <Field label="Porte" value={`Escale ${currentEscale}`} />
          <Field label="Siège" value={`Leçon ${currentLesson}`} mono />
          <Field label="Statut" value={`${Math.round(pct * 100)}%`} mono />
        </div>

        {/* code-barres */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <div className="flex items-end gap-[2px] h-9">
            {barcode.map((h, i) => (
              <span key={i} className="w-[2px] bg-white/85 rounded-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
          <span className="font-mono text-[8px] text-white/60 tracking-widest">
            {theme.departureCode}{theme.arrivalCode}{completedCount}{totalLessons}
          </span>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-wider text-white/55 leading-none">{label}</p>
      <p className={`text-[13px] font-semibold text-white mt-1 leading-tight ${mono ? 'font-mono' : ''}`}>
        {value}
      </p>
    </div>
  );
}

// hauteurs pseudo-aléatoires stables pour le code-barres
const barcode = [90, 40, 100, 60, 30, 80, 50, 100, 45, 70, 35, 90, 55, 100, 40, 65, 85, 30, 95];
