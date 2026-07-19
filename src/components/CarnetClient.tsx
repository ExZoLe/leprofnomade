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

// Normalise : minuscules + suppression des accents (café -> cafe)
function norm(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Distance de Levenshtein (nb d'éditions entre deux mots)
function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  let curr = new Array<number>(n + 1);
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

// Tolérance : 1 faute pour les mots courts, 2 pour les plus longs
function closeEnough(query: string, word: string): boolean {
  if (word.includes(query) || query.includes(word)) return true;
  const tolerance = query.length <= 5 ? 1 : 2;
  // évite d'apparier des mots de longueurs trop différentes
  if (Math.abs(word.length - query.length) > tolerance) return false;
  return levenshtein(query, word) <= tolerance;
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

  const { matches, related } = useMemo(() => {
    const q = norm(query);

    // Filtre thème actif d'abord
    const pool = activeTheme === 'Toutes'
      ? entries
      : entries.filter((e) => e.theme === activeTheme);

    if (!q) return { matches: pool, related: [] as Entry[] };

    // 1) Correspondance directe (sous-chaîne) sur fr / natif / romanisation
    const direct = pool.filter((e) =>
      norm(e.fr).includes(q) ||
      norm(e.native).includes(q) ||
      norm(e.roman ?? '').includes(q)
    );

    // 2) Tolérance aux fautes de frappe (Levenshtein, longueurs comparables)
    const fuzzy = pool.filter((e) => {
      if (direct.includes(e)) return false;
      const words = (norm(e.fr) + ' ' + norm(e.native) + ' ' + norm(e.roman ?? '')).split(/\s+/);
      return words.some((w) => w.length > 2 && closeEnough(q, w));
    });

    const found = [...direct, ...fuzzy];

    // 3) Expansion par thème : tous les mots des thèmes touchés par une correspondance
    const hitThemes = new Set(found.map((e) => e.theme));
    const sameTheme = pool.filter(
      (e) => hitThemes.has(e.theme) && !found.includes(e)
    );

    return { matches: found, related: sameTheme };
  }, [entries, query, activeTheme]);

  const hasQuery = query.trim().length > 0;
  const totalShown = matches.length + related.length;

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
          {totalShown} mot{totalShown > 1 ? 's' : ''}
          {hasQuery && related.length > 0 && ` · dont ${matches.length} correspondance${matches.length > 1 ? 's' : ''}`}
        </p>

        {/* Résultats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {matches.map((e, i) => (
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

          {/* Séparateur + mots du même thème */}
          {hasQuery && related.length > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '10px 2px 2px' }}>
                <span style={{ flex: 1, height: 1, background: 'rgba(61,45,20,0.10)' }} />
                <span style={{ fontSize: 12, color: '#8B7355', whiteSpace: 'nowrap' }}>
                  Autres mots du même thème
                </span>
                <span style={{ flex: 1, height: 1, background: 'rgba(61,45,20,0.10)' }} />
              </div>
              {related.map((e, i) => (
                <Link
                  key={`rel-${e.slug}-${e.native}-${i}`}
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
                      opacity: 0.85,
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
            </>
          )}

          {totalShown === 0 && (
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
