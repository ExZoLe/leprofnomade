'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getTheme } from '@/lib/travel-theme';

interface Entry {
  native: string;
  roman: string | null;
  fr: string;
  escale: number;
  theme: string;
  slug: string;
}

interface Props {
  langue: string;
  entries: Entry[];
}

export default function CarnetClient({ langue, entries }: Props) {
  const theme = getTheme(langue);
  const [query, setQuery] = useState('');
  const [activeTheme, setActiveTheme] = useState<string>('Toutes');

  const accent = theme?.primary ?? '#C86E46';
  const deep = theme?.deep ?? '#8B4513';

  // Liste des thèmes présents, dans l'ordre des escales
  const themes = useMemo(() => {
    const byEscale = new Map<number, string>();
    entries.forEach((e) => byEscale.set(e.escale, e.theme));
    const ordered = Array.from(byEscale.entries())
      .sort((a, b) => a[0] - b[0])
      .map((pair) => pair[1]);
    return ['Toutes', ...ordered];
  }, [entries]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      if (activeTheme !== 'Toutes' && e.theme !== activeTheme) return false;
      if (!q) return true;
      return (
        e.fr.toLowerCase().includes(q) ||
        e.native.toLowerCase().includes(q) ||
        (e.roman ?? '').toLowerCase().includes(q)
      );
    });
  }, [entries, query, activeTheme]);

  return (
    <div style={{ background: '#EFE7D9', minHeight: '100vh' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '2rem 1.25rem 4rem' }}>
        {/* En-tête */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <span style={{ fontSize: 30 }}>{theme?.flag}</span>
          <div>
            <h1
              className="font-display"
              style={{ fontSize: 30, color: '#3D2D14', margin: 0, lineHeight: 1.1 }}
            >
              Le Passeport lexical ✈️
            </h1>
            <p style={{ fontSize: 14, color: '#8B7355', margin: '2px 0 0' }}>
              Ton vocabulaire {theme?.country ? `— ${theme.country}` : ''}, escale par escale
            </p>
          </div>
        </div>

        {/* Recherche */}
        <div style={{ position: 'relative', margin: '18px 0 14px' }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#8B7355' }}>
            🔍
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cherche un mot en français ou dans la langue…"
            aria-label="Rechercher un mot"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '12px 14px 12px 42px',
              background: '#FAF6F0',
              border: '1px solid rgba(61,45,20,0.15)',
              borderRadius: 12,
              color: '#3D2D14',
              fontSize: 15,
              outline: 'none',
            }}
          />
        </div>

        {/* Filtres par thème */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
          {themes.map((t) => {
            const active = t === activeTheme;
            return (
              <button
                key={t}
                onClick={() => setActiveTheme(t)}
                style={{
                  fontSize: 13,
                  padding: '6px 14px',
                  borderRadius: 20,
                  cursor: 'pointer',
                  border: active ? 'none' : '1px solid rgba(61,45,20,0.12)',
                  background: active ? accent : '#FAF6F0',
                  color: active ? '#FAF6F0' : deep,
                  fontWeight: active ? 600 : 400,
                }}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Compteur */}
        <p style={{ fontSize: 13, color: '#8B7355', margin: '0 0 12px' }}>
          {results.length} mot{results.length > 1 ? 's' : ''}
        </p>

        {/* Résultats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {results.map((e, i) => (
            <Link
              key={`${e.slug}-${e.native}-${i}`}
              href={`/lecon/${e.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  background: '#FAF6F0',
                  borderRadius: 12,
                  border: '1px solid rgba(61,45,20,0.10)',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 17, color: '#3D2D14' }}>
                    {e.native}
                    {e.roman && (
                      <span style={{ fontSize: 13, color: '#8B7355', marginLeft: 8 }}>{e.roman}</span>
                    )}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: 14, color: '#5F5E5A' }}>{e.fr}</p>
                </div>
                <span
                  style={{
                    flexShrink: 0,
                    fontSize: 12,
                    color: accent,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Escale {e.escale} →
                </span>
              </div>
            </Link>
          ))}

          {results.length === 0 && (
            <div
              style={{
                background: '#F5EDE3',
                borderRadius: 12,
                padding: '24px 16px',
                textAlign: 'center',
                color: '#8B7355',
                fontSize: 14,
              }}
            >
              Aucun mot ne correspond. Essaie un autre terme.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
