'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/components/AuthProvider';
import { getProgress, getUsername } from '@/lib/supabase';
import { AlphabetSidebar } from '@/components/AlphabetSidebar';
import { BoardingPass } from '@/components/BoardingPass';
import { Passport } from '@/components/Passport';
import { CarnetDeRoute } from '@/components/CarnetDeRoute';
import { getTheme } from '@/lib/travel-theme';
import type { LangKey } from '@/lib/languages';
import type { LessonMeta } from '@/lib/lessons';

interface LangInfo { name: string; flag: string; color: string; tagline: string; description: string; slug: string; }
interface ProgressItem { lesson_slug: string; completed: boolean; }

export function LangDashboardClient({
  lang, langKey, lessons,
}: { lang: LangInfo; langKey: LangKey; lessons: LessonMeta[]; }) {
  const { user } = useAuth();
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());
  const [openEscales, setOpenEscales] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  const theme = getTheme(langKey);

  useEffect(() => {
    if (user) {
      getProgress(user.id, langKey).then(({ data }) => {
        if (data) {
          setCompletedSlugs(new Set((data as ProgressItem[]).filter(p => p.completed).map(p => p.lesson_slug)));
        }
        setLoading(false);
      });
      getUsername(user.id).then((name) => { if (name) setUsername(name); });
    } else setLoading(false);
  }, [user, langKey]);

  // Regroupe par escale
  const escales = lessons.reduce((acc, l) => {
    if (!acc[l.escale]) acc[l.escale] = { title: l.escaleTitle, lessons: [] };
    acc[l.escale].lessons.push(l);
    return acc;
  }, {} as Record<number, { title: string; lessons: LessonMeta[] }>);

  const escaleEntries = Object.entries(escales).sort(([a], [b]) => Number(a) - Number(b));
  const nextLesson = lessons.find(l => !completedSlugs.has(l.slug));
  const totalLessons = lessons.length;
  const completedCount = lessons.filter(l => completedSlugs.has(l.slug)).length;

  // Statut par escale : done / current / locked
  const escaleStatus = escaleEntries.map(([, esc]) => {
    const done = esc.lessons.filter(l => completedSlugs.has(l.slug)).length;
    if (done === esc.lessons.length && done > 0) return 'done' as const;
    if (done > 0) return 'current' as const;
    return 'locked' as const;
  });
  if (!escaleStatus.includes('current')) {
    const firstLocked = escaleStatus.indexOf('locked');
    if (firstLocked >= 0) escaleStatus[firstLocked] = 'current';
  }
  const escaleTitles = escaleEntries.map(([, e]) => e.title);

  const currentEscale = nextLesson?.escale ?? escaleEntries.length;
  const currentLesson = nextLesson?.lesson ?? 5;
  const passengerName = username || (user?.email?.split('@')[0]) || 'Voyageur';

  const toggleEscale = (n: number) => {
    const next = new Set(openEscales);
    next.has(n) ? next.delete(n) : next.add(n);
    setOpenEscales(next);
  };
  const toggleAll = () => {
    if (openEscales.size === escaleEntries.length) setOpenEscales(new Set());
    else setOpenEscales(new Set(escaleEntries.map(([n]) => Number(n))));
  };

  const color = theme?.primary ?? lang.color;

  if (!theme) {
    return <div className="pt-24 text-center text-gray-500">Langue en préparation…</div>;
  }

  // Encadrés culturels tirés du carnet (données existantes du thème)
  const introNote = theme.carnet[0]?.culturalNote ?? null;
  const currentNote =
    theme.carnet[currentEscale - 1]?.culturalNote ??
    theme.carnet
      .slice(0, currentEscale)
      .map((c) => c.culturalNote)
      .filter(Boolean)
      .pop() ??
    null;

  // Les 4 raccourcis du dashboard
  const shortcuts = [
    {
      emoji: '▶',
      label: completedCount > 0 ? 'Reprendre' : 'Commencer',
      sub: nextLesson ? `Escale ${nextLesson.escale} · Leçon ${nextLesson.lesson}` : 'Parcours terminé !',
      href: nextLesson ? `/lecon/${nextLesson.slug}` : `/${langKey}`,
    },
    { emoji: '🗺️', label: 'La carte', sub: theme.city, href: `/carte/${langKey}` },
    { emoji: '📓', label: 'Le blog', sub: 'Carnet de route', href: `/blog/${langKey}` },
    { emoji: '🧳', label: 'Lexique', sub: 'Passeport lexical', href: `/carnet/${langKey}` },
  ];

  return (
    <div className="page-enter pt-24 pb-20 px-4 sm:px-6 min-h-screen" style={{ ['--cream' as any]: '#EFE7D9', background: '#EFE7D9' }}>
      <div className="max-w-[1200px] mx-auto flex gap-6">

        {/* ===== GAUCHE — Alphabet sticky (desktop) ===== */}
        <div className="hidden lg:block w-[240px] xl:w-[280px] flex-shrink-0">
          <div className="sticky top-24">
            <AlphabetSidebar langKey={langKey} color={color} />
          </div>
        </div>

        {/* ===== CENTRE ===== */}
        <div className="flex-1 min-w-0 max-w-4xl">

          {/* Bannière pays */}
          <div className="relative h-48 sm:h-60 rounded-2xl overflow-hidden mb-5">
            <Image
              src={theme.imageUrl}
              alt={`${theme.city}, ${theme.country}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${theme.deep}D9, ${theme.deep}26)` }}
            />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <div className="flex items-end justify-between gap-3 flex-wrap">
                <div>
                  <h1 className="font-display text-3xl sm:text-4xl text-white leading-tight m-0">
                    {theme.flag} {lang.name}
                  </h1>
                  <p className="text-sm text-white/85 m-0 mt-1">{lang.tagline}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {theme.facts.slice(0, 2).map((f) => (
                    <span key={f.label} className="text-[11px] font-semibold text-white bg-white/15 border border-white/25 rounded-full px-2.5 py-1">
                      {f.label} · {f.value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ★ SIGNATURE : carte d'embarquement */}
          <BoardingPass
            theme={theme}
            passengerName={passengerName}
            completedCount={completedCount}
            totalLessons={totalLessons}
            currentEscale={currentEscale}
            currentLesson={currentLesson}
          />

          {/* 4 raccourcis */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {shortcuts.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="bg-[#FAF6F0] rounded-xl border p-3.5 no-underline text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ borderColor: `${color}26` }}
              >
                <span
                  className="mx-auto mb-2 w-9 h-9 rounded-lg flex items-center justify-center text-base text-white"
                  style={{ background: color }}
                >
                  {s.emoji}
                </span>
                <p className="text-sm font-semibold text-ink m-0">{s.label}</p>
                <p className="text-[11px] text-gray-400 m-0 mt-0.5 truncate">{s.sub}</p>
              </Link>
            ))}
          </div>

          {/* Code culturel de l'escale en cours */}
          {currentNote && (
            <aside
              className="rounded-r-xl border-l-4 p-4 mb-5"
              style={{ borderColor: color, background: `${color}0D` }}
            >
              <p className="text-[11px] font-bold tracking-wider uppercase mb-1" style={{ color }}>
                🧭 Code culturel — escale {currentEscale}
              </p>
              <p className="text-sm text-[#5F5E5A] leading-relaxed m-0">{currentNote}</p>
            </aside>
          )}

          {/* Alphabet mobile */}
          <div className="lg:hidden mb-5">
            <AlphabetSidebar langKey={langKey} color={color} collapsible />
          </div>

          {/* Escales — grille 2 colonnes avec photos */}
          {escaleEntries.length > 0 && (
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-ink">{escaleEntries.length} escales · {totalLessons} leçons</p>
              <button onClick={toggleAll} className="text-xs font-medium text-gray-400 hover:text-ink bg-transparent border-none cursor-pointer">
                {openEscales.size === escaleEntries.length ? 'Tout fermer' : 'Tout ouvrir'}
              </button>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4 mb-5 items-start">
            {escaleEntries.map(([num, esc]) => {
              const n = Number(num);
              const isOpen = openEscales.has(n);
              const done = esc.lessons.filter(l => completedSlugs.has(l.slug)).length;
              const total = esc.lessons.length;
              const pct = Math.round((done / total) * 100);
              const allDone = done === total && done > 0;
              const photo = theme.escaleImages[n - 1];
              return (
                <div key={num} className={`bg-[#FAF6F0] rounded-2xl border overflow-hidden transition-colors ${isOpen ? 'border-black/10' : 'border-black/5'}`}>
                  <button onClick={() => toggleEscale(n)} className="w-full bg-transparent border-none cursor-pointer text-left p-0 block">
                    {/* Photo d'escale */}
                    <div className="relative h-28">
                      {photo && (
                        <Image
                          src={photo}
                          alt={esc.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 350px"
                          className="object-cover"
                        />
                      )}
                      <div
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(to top, ${theme.deep}CC, transparent 65%)` }}
                      />
                      <span
                        className="absolute top-2.5 left-2.5 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: allDone ? color : '#FAF6F0', color: allDone ? '#fff' : color }}
                      >
                        {allDone ? '✓' : num}
                      </span>
                      <span className={`absolute top-2.5 right-2.5 text-white/90 text-sm transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
                      <div className="absolute inset-x-0 bottom-0 px-3.5 pb-2.5">
                        <p className="text-[10px] font-bold tracking-wider text-white/75 uppercase m-0">
                          Escale {num}{user && !loading ? ` · ${done}/${total}` : ''}
                        </p>
                        <p className="font-display text-base text-white leading-snug m-0 truncate">{esc.title}</p>
                      </div>
                    </div>
                    {/* Barre de progression */}
                    {user && !loading && done > 0 && (
                      <div className="h-1 bg-black/[0.06]">
                        <div className="h-full" style={{ width: `${pct}%`, background: color }} />
                      </div>
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 pt-2">
                      <div className="flex flex-col gap-2">
                        {esc.lessons.map((lesson) => {
                          const isDone = completedSlugs.has(lesson.slug);
                          return (
                            <Link key={lesson.slug} href={`/lecon/${lesson.slug}`}
                              className={`flex items-center gap-3 p-2.5 rounded-lg no-underline transition-all hover:-translate-y-0.5 ${isDone ? 'bg-emerald-50/50 hover:bg-emerald-50' : 'bg-gray-50/50 hover:bg-gray-50'}`}>
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${isDone ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                                {isDone ? '✓' : lesson.lesson}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-[13px] font-medium truncate m-0 ${isDone ? 'text-emerald-700' : 'text-ink'}`}>{lesson.title}</p>
                              </div>
                              <span className="text-gray-200 text-sm">→</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Le saviez-vous ? */}
          {introNote && (
            <aside className="rounded-r-xl border-l-4 p-4 mb-5 bg-[#F5EDE3]" style={{ borderColor: '#D6A23D' }}>
              <p className="text-[11px] font-bold tracking-wider uppercase mb-1 text-[#8B6914]">
                💡 Le saviez-vous ?
              </p>
              <p className="text-sm text-[#5F5E5A] leading-relaxed m-0">{introNote}</p>
            </aside>
          )}

          {/* Passeport + carnet de route, en bas */}
          <Passport theme={theme} escaleStatus={escaleStatus} />
          <CarnetDeRoute theme={theme} escaleStatus={escaleStatus} escaleTitles={escaleTitles} />
        </div>
      </div>
    </div>
  );
}
