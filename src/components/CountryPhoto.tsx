'use client';

import type { CountryTheme } from '@/lib/travel-theme';

// ============================================================
// Photo pays — desktop (grande, sticky) + bandeau mobile.
// Prend directement le thème du pays (couleurs + image + faits).
// ============================================================

export function CountryPhoto({ theme }: { theme: CountryTheme }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-black/5 relative" style={{ minHeight: 600 }}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${theme.imageUrl})` }} />
      <div className="absolute inset-0" style={{
        background: `linear-gradient(to bottom, rgba(245,237,227,0.1) 0%, rgba(245,237,227,0.3) 30%, rgba(245,237,227,0.7) 62%, rgba(245,237,227,0.94) 100%)`
      }} />
      <div className="relative z-10 p-5 h-full flex flex-col" style={{ minHeight: 600 }}>
        <div className="mt-6 mb-auto">
          <p className="text-3xl mb-1">{theme.flag}</p>
          <p className="font-display text-4xl font-bold drop-shadow-sm" style={{ color: theme.deep }}>{theme.city}</p>
          <p className="text-sm font-medium mt-1" style={{ color: theme.inkSoft ?? '#8B7355' }}>{theme.country}</p>
        </div>
        <div className="flex flex-col gap-2.5 mt-8">
          {theme.facts.map((f, i) => (
            <div key={i} className="bg-white/75 backdrop-blur-sm rounded-xl px-4 py-2.5">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-none font-semibold">{f.label}</p>
              <p className="text-sm font-bold text-gray-700 mt-1">{f.value}</p>
            </div>
          ))}
        </div>
        <div className="h-1.5 rounded-full mt-5 w-14" style={{ background: theme.primary }} />
      </div>
    </div>
  );
}

export function CountryPhotoBanner({ theme }: { theme: CountryTheme }) {
  return (
    <div className="rounded-2xl overflow-hidden relative mb-5" style={{ height: 200 }}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${theme.imageUrl})` }} />
      <div className="absolute inset-0" style={{
        background: `linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)`
      }} />
      <div className="relative z-10 p-5 h-full flex flex-col justify-end">
        <p className="font-display text-3xl font-bold text-white drop-shadow-lg">{theme.city}</p>
        <p className="text-sm text-white/80 font-medium mt-0.5">{theme.country}</p>
        <div className="flex gap-3 mt-3 flex-wrap">
          {theme.facts.slice(0, 3).map((f, i) => (
            <div key={i} className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1.5">
              <p className="text-[9px] text-white/60 uppercase tracking-wider leading-none">{f.label}</p>
              <p className="text-xs font-bold text-white mt-0.5">{f.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
