'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { languages, type LangKey } from '@/lib/languages';
import { getAllLessons } from '@/lib/lessons';
import { useAuth } from '@/components/AuthProvider';
import { getProgress } from '@/lib/supabase';

interface ProgressItem {
  lesson_slug: string;
  completed: boolean;
}

export default function LanguageDashboard({
  params,
}: {
  params: { lang: string };
}) {
  const langKey = params.lang as LangKey;
  const lang = languages[langKey];
  if (!lang) notFound();

  const lessons = getAllLessons(langKey);
  const { user } = useAuth();
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());
  const [openEscales, setOpenEscales] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  // Charger la progression
  useEffect(() => {
    if (user) {
      getProgress(user.id, langKey).then(({ data }) => {
        if (data) {
          const slugs = new Set(
            (data as ProgressItem[])
              .filter(p => p.completed)
              .map(p => p.lesson_slug)
          );
          setCompletedSlugs(slugs);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user, langKey]);

  // Grouper les leçons par escale
  const escales = lessons.reduce(
    (acc, lesson) => {
      const key = lesson.escale;
      if (!acc[key]) {
        acc[key] = { title: lesson.escaleTitle, lessons: [] };
      }
      acc[key].lessons.push(lesson);
      return acc;
    },
    {} as Record<number, { title: string; lessons: typeof lessons }>
  );

  const escaleEntries = Object.entries(escales).sort(
    ([a], [b]) => Number(a) - Number(b)
  );

  // Trouver la prochaine leçon non terminée
  const nextLesson = lessons.find(l => !completedSlugs.has(l.slug));

  // Toggle une escale
  const toggleEscale = (num: number) => {
    const next = new Set(openEscales);
    next.has(num) ? next.delete(num) : next.add(num);
    setOpenEscales(next);
  };

  // Tout ouvrir / tout fermer
  const toggleAll = () => {
    if (openEscales.size === escaleEntries.length) {
      setOpenEscales(new Set());
    } else {
      setOpenEscales(new Set(escaleEntries.map(([n]) => Number(n))));
    }
  };

  // Stats
  const totalLessons = lessons.length;
  const completedCount = lessons.filter(l => completedSlugs.has(l.slug)).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="page-enter pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{lang.flag}</span>
            <div>
              <h1
                className="font-display text-3xl sm:text-4xl"
                style={{ color: lang.color }}
              >
                {lang.name}
              </h1>
              <p className="text-sm text-gray-500">{lang.tagline}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
            {lang.description}
          </p>
        </div>

        {/* Barre de progression globale */}
        {user && !loading && (
          <div className="bg-white rounded-xl p-5 border border-black/5 mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-ink">Ta progression</p>
              <p className="text-sm text-gray-400">
                {completedCount}/{totalLessons} leçons · {progressPercent}%
              </p>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressPercent}%`,
                  background: lang.color,
                }}
              />
            </div>
          </div>
        )}

        {/* Bouton Reprendre */}
        {nextLesson && (
          <Link
            href={`/lecon/${nextLesson.slug}`}
            className="flex items-center justify-between bg-white rounded-xl p-5 border-2 no-underline mb-8 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ borderColor: `${lang.color}40` }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = lang.color;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = `${lang.color}40`;
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold"
                style={{ background: lang.color }}
              >
                ▶
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider uppercase" style={{ color: lang.color }}>
                  {completedCount > 0 ? 'Reprendre' : 'Commencer'}
                </p>
                <p className="text-sm font-semibold text-ink">
                  {nextLesson.title}
                </p>
                <p className="text-xs text-gray-400">
                  Escale {nextLesson.escale} · Leçon {nextLesson.lesson}
                </p>
              </div>
            </div>
            <span className="text-gray-300 text-xl">→</span>
          </Link>
        )}

        {/* Contrôle tout ouvrir / fermer */}
        {escaleEntries.length > 0 && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-ink">
              {escaleEntries.length} escales · {totalLessons} leçons
            </p>
            <button
              onClick={toggleAll}
              className="text-xs font-medium text-gray-400 hover:text-ink transition-colors bg-transparent border-none cursor-pointer"
            >
              {openEscales.size === escaleEntries.length ? 'Tout fermer' : 'Tout ouvrir'}
            </button>
          </div>
        )}

        {/* Escales en accordéon */}
        {escaleEntries.length > 0 ? (
          <div className="flex flex-col gap-3">
            {escaleEntries.map(([escaleNum, escale]) => {
              const num = Number(escaleNum);
              const isOpen = openEscales.has(num);
              const escaleCompleted = escale.lessons.filter(l => completedSlugs.has(l.slug)).length;
              const escaleTotal = escale.lessons.length;
              const escalePercent = Math.round((escaleCompleted / escaleTotal) * 100);
              const allDone = escaleCompleted === escaleTotal;

              return (
                <div
                  key={escaleNum}
                  className={`bg-white rounded-xl border overflow-hidden transition-colors ${
                    isOpen ? 'border-black/10' : 'border-black/5'
                  }`}
                >
                  {/* En-tête cliquable */}
                  <button
                    onClick={() => toggleEscale(num)}
                    className="w-full flex items-center gap-4 p-4 sm:p-5 bg-transparent border-none cursor-pointer text-left hover:bg-gray-50/50 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                        allDone ? 'text-white' : ''
                      }`}
                      style={{
                        background: allDone ? lang.color : `${lang.color}12`,
                        color: allDone ? '#fff' : lang.color,
                      }}
                    >
                      {allDone ? '✓' : escaleNum}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                          Escale {escaleNum}
                        </p>
                        {user && !loading && (
                          <span className="text-xs text-gray-300">
                            {escaleCompleted}/{escaleTotal}
                          </span>
                        )}
                      </div>
                      <p className="font-display text-base sm:text-lg text-ink truncate">
                        {escale.title}
                      </p>
                      {/* Mini barre de progression */}
                      {user && !loading && escaleCompleted > 0 && (
                        <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden max-w-[200px]">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${escalePercent}%`, background: lang.color }}
                          />
                        </div>
                      )}
                    </div>
                    <span
                      className={`text-gray-300 text-lg transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  {/* Leçons déroulantes */}
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                      <div className="border-t border-black/5 pt-3 flex flex-col gap-2">
                        {escale.lessons.map((lesson) => {
                          const isDone = completedSlugs.has(lesson.slug);
                          return (
                            <Link
                              key={lesson.slug}
                              href={`/lecon/${lesson.slug}`}
                              className={`flex items-center gap-3 p-3 rounded-lg no-underline transition-all hover:-translate-y-0.5 ${
                                isDone
                                  ? 'bg-emerald-50/50 hover:bg-emerald-50'
                                  : 'bg-gray-50/50 hover:bg-gray-50'
                              }`}
                            >
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                  isDone
                                    ? 'bg-emerald-100 text-emerald-600'
                                    : 'bg-gray-100 text-gray-400'
                                }`}
                              >
                                {isDone ? '✓' : lesson.lesson}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm font-medium truncate ${
                                    isDone ? 'text-emerald-700' : 'text-ink'
                                  }`}
                                >
                                  {lesson.title}
                                </p>
                                {lesson.description && (
                                  <p className="text-xs text-gray-400 truncate mt-0.5">
                                    {lesson.description}
                                  </p>
                                )}
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
        ) : (
          <div className="bg-white rounded-2xl p-10 border border-black/5 text-center">
            <p className="text-4xl mb-4">🚧</p>
            <h3 className="font-display text-xl mb-2 text-ink">
              Premières leçons en préparation
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              On travaille sur les premières escales en {lang.name.toLowerCase()}.
              Reviens bientôt — et en attendant, explore les autres langues !
            </p>
            <Link
              href="/#langues"
              className="inline-block mt-6 bg-ink text-white text-sm font-semibold px-6 py-3 rounded-xl no-underline hover:opacity-90 transition-opacity"
            >
              ← Voir les autres langues
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
