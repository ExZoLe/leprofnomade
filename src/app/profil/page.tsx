'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { signOut, getProfileStats, getProgress } from '@/lib/supabase';

interface Stats {
  totalLessons: number;
  totalScore: number;
  byLang: { anglais: number; coreen: number; italien: number };
}

interface ProgressItem {
  lesson_slug: string;
  lang: string;
  score: number;
  completed_at: string;
}

export default function ProfilPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      Promise.all([
        getProfileStats(user.id),
        getProgress(user.id),
      ]).then(([statsRes, progressRes]) => {
        if (statsRes.stats) setStats(statsRes.stats);
        if (progressRes.data) setRecent(progressRes.data.slice(0, 10) as ProgressItem[]);
        setLoading(false);
      });
    }
  }, [user, authLoading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream pt-20">
        <p className="text-gray-400">Chargement...</p>
      </div>
    );
  }

  if (!user) return null;

  const langCards = [
    { key: 'anglais', name: 'Anglais', flag: '🇬🇧', color: '#1B4965', count: stats?.byLang.anglais || 0 },
    { key: 'coreen', name: 'Coréen', flag: '🇰🇷', color: '#8338EC', count: stats?.byLang.coreen || 0 },
    { key: 'italien', name: 'Italien', flag: '🇮🇹', color: '#E63946', count: stats?.byLang.italien || 0 },
  ];

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20 px-6 page-enter">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-coral/20 to-teal/20 flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <h1 className="font-display text-2xl text-ink">Mon parcours</h1>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-400 hover:text-coral transition-colors cursor-pointer bg-transparent border-none"
          >
            Se déconnecter
          </button>
        </div>

        {/* Stats globales */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl p-5 border border-black/5 text-center">
            <p className="font-display text-3xl text-ink">{stats?.totalLessons || 0}</p>
            <p className="text-xs text-gray-400 mt-1">Leçons terminées</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-black/5 text-center">
            <p className="font-display text-3xl text-ink">{stats?.totalScore || 0}</p>
            <p className="text-xs text-gray-400 mt-1">Score total</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-black/5 text-center">
            <p className="font-display text-3xl text-ink">{langCards.filter(l => l.count > 0).length}</p>
            <p className="text-xs text-gray-400 mt-1">Langues actives</p>
          </div>
        </div>

        {/* Progression par langue */}
        <h2 className="font-display text-xl text-ink mb-4">Mes langues</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {langCards.map((lang) => (
            <Link
              key={lang.key}
              href={`/${lang.key}`}
              className="bg-white rounded-xl p-5 border border-black/5 no-underline hover:-translate-y-0.5 transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-semibold text-ink">{lang.name}</span>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-display" style={{ color: lang.color }}>
                  {lang.count}
                </p>
                <p className="text-xs text-gray-400">leçons</p>
              </div>
              <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min((lang.count / 150) * 100, 100)}%`,
                    background: lang.color,
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">{lang.count}/150</p>
            </Link>
          ))}
        </div>

        {/* Activité récente */}
        <h2 className="font-display text-xl text-ink mb-4">Activité récente</h2>
        {recent.length > 0 ? (
          <div className="bg-white rounded-xl border border-black/5 divide-y divide-black/5">
            {recent.map((item, i) => {
              const langEmoji = item.lang === 'anglais' ? '🇬🇧' : item.lang === 'coreen' ? '🇰🇷' : '🇮🇹';
              const date = new Date(item.completed_at).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
              });
              const slug = item.lesson_slug
                .replace(/-/g, ' ')
                .replace(/escale \d+ lecon \d+/, (m) => m.charAt(0).toUpperCase() + m.slice(1));

              return (
                <Link
                  key={i}
                  href={`/lecon/${item.lesson_slug}`}
                  className="flex items-center gap-4 px-5 py-4 no-underline hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg">{langEmoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{slug}</p>
                    <p className="text-xs text-gray-400">{date}</p>
                  </div>
                  <div className="text-sm font-semibold text-teal">
                    {item.score} pts
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 border border-black/5 text-center">
            <p className="text-3xl mb-3">🚀</p>
            <p className="text-sm text-gray-500">Aucune leçon terminée pour l&apos;instant. Lance-toi !</p>
            <Link
              href="/#langues"
              className="inline-block mt-4 px-6 py-2.5 bg-coral text-white text-sm font-semibold rounded-xl no-underline"
            >
              Choisir une langue
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
