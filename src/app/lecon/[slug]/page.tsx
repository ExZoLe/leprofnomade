import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllLessons, getLessonContent } from '@/lib/lessons';
import { LessonRenderer } from '@/components/LessonRenderer';

export function generateStaticParams() {
  const allLangs = ['anglais', 'coreen', 'italien'];
  const params: { slug: string }[] = [];
  for (const lang of allLangs) {
    const lessons = getAllLessons(lang);
    for (const lesson of lessons) {
      params.push({ slug: lesson.slug });
    }
  }
  return params;
}

export default function LessonPage({
  params,
}: {
  params: { slug: string };
}) {
  // Détecte la langue à partir du préfixe du slug (kr-, it-, en-)
  const prefixMap: Record<string, string> = {
    'kr-': 'coreen',
    'it-': 'italien',
    'en-': 'anglais',
  };

  const prefix = params.slug.substring(0, 3);
  const targetLang = prefixMap[prefix];

  let lessonData = null;
  let lessonLang = '';

  if (targetLang) {
    // Cherche directement dans la bonne langue
    const data = getLessonContent(targetLang, params.slug);
    if (data) {
      lessonData = data;
      lessonLang = targetLang;
    }
  } else {
    // Fallback : cherche dans toutes les langues (pour les anciennes leçons sans préfixe)
    const allLangs = ['anglais', 'coreen', 'italien'];
    for (const lang of allLangs) {
      const data = getLessonContent(lang, params.slug);
      if (data) {
        lessonData = data;
        lessonLang = lang;
        break;
      }
    }
  }

  if (!lessonData) notFound();

  const { meta, content } = lessonData;

  // Détecte si le prochain slug est un quiz d'escale
  const nextIsQuiz = meta.nextSlug && meta.nextSlug.includes('quiz-escale');

  return (
    <div className="page-enter pt-20 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <header className="mb-8 pb-6 border-b border-black/5">
          <div className="flex items-center justify-between mb-3">
            <Link
              href={`/${lessonLang}`}
              className="text-sm text-gray-400 hover:text-ink transition-colors no-underline"
            >
              ← Retour au parcours
            </Link>
            <span className="text-xs text-gray-400">
              Leçon {meta.lesson}
            </span>
          </div>
          <p
            className="text-xs font-bold tracking-wider uppercase mb-2"
            style={{ color: meta.color || '#E8553D' }}
          >
            Escale {meta.escale} — {meta.escaleTitle}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl leading-tight text-ink">
            {meta.title}
          </h1>
          {meta.context && (
            <div className="mt-4 flex items-start gap-3 bg-gold/10 border border-gold/30 rounded-lg p-3">
              <span className="text-lg">📍</span>
              <p className="text-sm text-ink leading-relaxed">
                <strong>Contexte :</strong> {meta.context}
              </p>
            </div>
          )}
        </header>

        {/* Lesson content */}
        <LessonRenderer content={content} />

        {/* Next button — detects quiz OR next lesson */}
        {meta.nextSlug && (
          <Link
            href={
              nextIsQuiz
                ? `/quiz-escale/${meta.nextSlug}`
                : `/lecon/${meta.nextSlug}`
            }
            className="block w-full mt-10 py-4 text-center text-white font-bold rounded-xl text-base no-underline hover:opacity-90 transition-opacity"
            style={{ background: meta.color || '#E63946' }}
          >
            {nextIsQuiz
              ? "🎯 Quiz final de l'escale →"
              : 'Leçon suivante →'}
          </Link>
        )}
      </div>
    </div>
  );
}
