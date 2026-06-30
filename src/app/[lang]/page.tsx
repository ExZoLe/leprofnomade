import { notFound } from 'next/navigation';
import Link from 'next/link';
import { languages, type LangKey } from '@/lib/languages';
import { getAllLessons } from '@/lib/lessons';

export function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }));
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

  // Group lessons by escale
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

  return (
    <div className="page-enter pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
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

        {/* Escales */}
        {escaleEntries.length > 0 ? (
          <div className="flex flex-col gap-8">
            {escaleEntries.map(([escaleNum, escale]) => (
              <div key={escaleNum}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: lang.color }}
                  >
                    {escaleNum}
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                      Escale {escaleNum}
                    </p>
                    <p className="font-display text-lg text-ink">
                      {escale.title}
                    </p>
                  </div>
                </div>
                <div className="ml-5 border-l-2 pl-8 flex flex-col gap-3" style={{ borderColor: `${lang.color}20` }}>
                  {escale.lessons.map((lesson) => (
                    <Link
                      key={lesson.slug}
                      href={`/lecon/${lesson.slug}`}
                      className="block bg-white rounded-xl p-5 border border-black/5 no-underline hover:border-transparent transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">
                            Leçon {lesson.lesson}
                          </p>
                          <p className="text-sm font-semibold text-ink">
                            {lesson.title}
                          </p>
                          {lesson.description && (
                            <p className="text-xs text-gray-400 mt-1">
                              {lesson.description}
                            </p>
                          )}
                        </div>
                        <span className="text-gray-300 text-lg">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
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
