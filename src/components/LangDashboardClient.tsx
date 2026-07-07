'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { getProgress } from '@/lib/supabase';
import { AlphabetSidebar } from '@/components/AlphabetSidebar';
import { CountryPhoto, CountryPhotoBanner } from '@/components/CountryPhoto';
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

  const theme = getTheme(langKey);

  useEffect(() => {
    if (user) {
      getProgress(user.id, langKey).then(({ data }) => {
        if (data) {
          setCompletedSlugs(new Set((data as ProgressItem[]).filter(p => p.completed).map(p => p.lesson_slug)));
        }
        setLoading(false);
      });
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
  const progressPercent = totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Statut par escale : done / current / locked
  const escaleStatus = escaleEntries.map(([, esc]) => {
    const done = esc.lessons.filter(l => completedSlugs.has(l.slug)).length;
    if (done === esc.lessons.length && done > 0) return 'done' as const;
    if (done > 0) return 'current' as const;
    return 'locked' as const;
  });
  // la première escale "locked" après des "done" devient la courante si rien n'est en cours
  if (!escaleStatus.includes('current')) {
    const firstLocked = escaleStatus.indexOf('locked');
    if (firstLocked >= 0) escaleStatus[firstLocked] = 'current';
  }
  const escaleTitles = escaleEntries.map(([, e]) => e.title);

  const currentEscale = nextLesson?.escale ?? escaleEntries.length;
  const currentLesson = nextLesson?.lesson ?? 5;
  const passengerName = (user?.email?.split('@')[0]) || 'Voyageur';

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

  // Fallback si le thème n'existe pas
  if (!theme) {
    return <div className="pt-24 text-center text-gray-500">Langue en préparation…</div>;
  }

  return (
    <div className="page-enter pt-24 pb-20 px-4 sm:px-6" style={{ ['--cream' as any]: '#F5EDE3' }}>
      <div className="max-w-[1400px] mx-auto flex gap-6">

        {/* ===== GAUCHE — Alphabet sticky (desktop) ===== */}
        <div className="hidden lg:block w-[240px] xl:w-[280px] flex-shrink-0">
          <div className="sticky top-24">
            <AlphabetSidebar langKey={langKey} color={color} />
          </div>
        </div>

        {/* ===== CENTRE ===== */}
        <div className="flex-1 min-w-0 max-w-3xl">
          {/* Titre langue */}
          <div className="mb-5">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{theme.flag}</span>
              <div>
                <h1 className="font-display text-3xl sm:text-4xl" style={{ color }}>{lang.name}</h1>
                <p className="text-sm text-gray-500">{lang.tagline}</p>
              </div>
            </div>
          </div>

          {/* Photo mobile */}
          <div className="lg:hidden">
            <CountryPhotoBanner theme={theme} />
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

          {/* Bouton reprendre */}
          {nextLesson && (
            <Link href={`/lecon/${nextLesson.slug}`}
              className="flex items-center justify-between bg-white rounded-2xl p-4 border-2 no-underline mb-5 transition-all hover:-translate-y-0.5 hover:shadow-lg group"
              style={{ borderColor: `${color}30` }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = color; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${color}30`; }}>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-base font-bold" style={{ background: color }}>▶</div>
                <div>
                  <p className="text-[11px] font-bold tracking-wider uppercase" style={{ color }}>{completedCount > 0 ? 'Reprendre' : 'Commencer'}</p>
                  <p className="text-sm font-semibold text-ink">{nextLesson.title}</p>
                  <p className="text-xs text-gray-400">Escale {nextLesson.escale} · Leçon {nextLesson.lesson}</p>
                </div>
              </div>
              <span className="text-gray-300 text-xl group-hover:text-gray-500">→</span>
            </Link>
          )}

          {/* Alphabet mobile */}
          <div className="lg:hidden mb-5">
            <AlphabetSidebar langKey={langKey} color={color} collapsible />
          </div>

          {/* Passeport */}
          <Passport theme={theme} escaleStatus={escaleStatus} />

          {/* Escales */}
          {escaleEntries.length > 0 && (
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-ink">{escaleEntries.length} escales · {totalLessons} leçons</p>
              <button onClick={toggleAll} className="text-xs font-medium text-gray-400 hover:text-ink bg-transparent border-none cursor-pointer">
                {openEscales.size === escaleEntries.length ? 'Tout fermer' : 'Tout ouvrir'}
              </button>
            </div>
          )}

          <div className="flex flex-col gap-3 mb-5">
            {escaleEntries.map(([num, esc], idx) => {
              const n = Number(num);
              const isOpen = openEscales.has(n);
              const done = esc.lessons.filter(l => completedSlugs.has(l.slug)).length;
              const total = esc.lessons.length;
              const pct = Math.round((done / total) * 100);
              const allDone = done === total && done > 0;
              return (
                <div key={num} className={`bg-white rounded-2xl border overflow-hidden transition-colors ${isOpen ? 'border-black/10' : 'border-black/5'}`}>
                  <button onClick={() => toggleEscale(n)} className="w-full flex items-center gap-4 p-4 bg-transparent border-none cursor-pointer text-left hover:bg-gray-50/50">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ background: allDone ? color : `${color}12`, color: allDone ? '#fff' : color }}>
                      {allDone ? '✓' : num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">Escale {num}</p>
                        {user && !loading && <span className="text-xs text-gray-300">{done}/{total}</span>}
                      </div>
                      <p className="font-display text-base sm:text-lg text-ink truncate">{esc.title}</p>
                      {user && !loading && done > 0 && (
                        <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden max-w-[200px]">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                        </div>
                      )}
                    </div>
                    <span className={`text-gray-300 text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-0">
                      <div className="border-t border-black/5 pt-3 flex flex-col gap-2">
                        {esc.lessons.map((lesson) => {
                          const isDone = completedSlugs.has(lesson.slug);
                          return (
                            <Link key={lesson.slug} href={`/lecon/${lesson.slug}`}
                              className={`flex items-center gap-3 p-3 rounded-lg no-underline transition-all hover:-translate-y-0.5 ${isDone ? 'bg-emerald-50/50 hover:bg-emerald-50' : 'bg-gray-50/50 hover:bg-gray-50'}`}>
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isDone ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                                {isDone ? '✓' : lesson.lesson}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium truncate ${isDone ? 'text-emerald-700' : 'text-ink'}`}>{lesson.title}</p>
                                {lesson.description && <p className="text-xs text-gray-400 truncate mt-0.5">{lesson.description}</p>}
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

          {/* Carnet de route */}
          <CarnetDeRoute theme={theme} escaleStatus={escaleStatus} escaleTitles={escaleTitles} />
        </div>

        {/* ===== DROITE — Photo pays (desktop) ===== */}
        <div className="hidden lg:block w-[320px] xl:w-[380px] flex-shrink-0">
          <div className="sticky top-24">
            <CountryPhoto theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}
