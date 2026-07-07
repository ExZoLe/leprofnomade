'use client';

import Link from 'next/link';
import { LanguageCard } from '@/components/LanguageCard';
import { languages } from '@/lib/languages';
import { HeroAnimatedCity } from '@/components/HeroAnimatedCity';

export default function HomePage() {
  return (
    <div className="page-enter">
      {/* ===== HERO ===== */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-cream via-warm to-[#E3D5BE]">
        {/* Decorative */}
        <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-coral/[0.04]" />
        <div className="absolute -bottom-16 -left-24 w-72 h-72 rounded-full bg-teal/[0.04]" />

        <div className="max-w-3xl text-center relative z-10">
          <div className="inline-block bg-gold/25 border border-gold/40 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider text-ink mb-7">
            100% GRATUIT · POUR TOUJOURS
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6">
            Apprends comme si tu étais à{' '}
            <HeroAnimatedCity />.
            <br />
            Comprends comme si un prof t&apos;expliquait.
          </h1>

          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Pas de mini-jeux. Pas de phrases absurdes. Des vraies situations,
            des vraies explications, et la culture qu&apos;aucune app ne t&apos;enseigne.
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            {Object.values(languages).map((lang) => (
              <Link
                key={lang.slug}
                href={`/${lang.slug}`}
                className="flex items-center gap-2.5 bg-[#FAF6F0] border-2 rounded-xl px-6 py-3.5 text-base font-semibold no-underline transition-all hover:-translate-y-0.5"
                style={{
                  color: lang.color,
                  borderColor: `${lang.color}20`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = lang.color;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 20px ${lang.color}20`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${lang.color}20`;
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <span className="text-xl">{lang.flag}</span>
                {lang.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROBLEM / PROMISE ===== */}
      <section className="bg-ink py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-gold text-xs font-bold tracking-[0.1em] uppercase mb-3">
            Pourquoi c&apos;est différent
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-white leading-tight mb-12 max-w-xl">
            Tu mérites mieux que «{' '}
            <span className="text-coral italic">the cat is on the table</span>{' '}
            ».
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* What you know */}
            <div className="bg-white/[0.04] rounded-2xl p-8 border border-white/[0.06]">
              <p className="text-3xl mb-4">😩</p>
              <p className="text-white/40 text-xs font-bold tracking-wider mb-4">
                CE QUE TU CONNAIS
              </p>
              {[
                'Mini-jeux répétitifs qui donnent l\'illusion de progresser',
                'Phrases hors-sol qu\'aucun natif ne prononce',
                'Grammaire balancée sans explication, juste « retiens »',
                'Zéro culture, zéro contexte, zéro immersion',
              ].map((t) => (
                <div key={t} className="flex gap-2.5 mb-2.5 items-start">
                  <span className="text-coral text-sm mt-0.5 flex-shrink-0">✕</span>
                  <span className="text-white/50 text-sm leading-relaxed">{t}</span>
                </div>
              ))}
            </div>

            {/* What we offer */}
            <div
              className="rounded-2xl p-8 border border-teal/20"
              style={{
                background: 'linear-gradient(135deg, rgba(107,123,62,0.10), rgba(107,123,62,0.04))',
              }}
            >
              <p className="text-3xl mb-4">🔥</p>
              <p className="text-teal text-xs font-bold tracking-wider mb-4">
                CE QU&apos;ON TE PROPOSE
              </p>
              {[
                "Un vrai prof qui t'explique le pourquoi, pas juste le quoi",
                'Des scénarios tirés de la vraie vie : l\'aéroport, le resto, la rue',
                'La grammaire démystifiée avec de la logique, pas du par-cœur',
                'Les codes culturels que les natifs nous apprennent',
              ].map((t) => (
                <div key={t} className="flex gap-2.5 mb-2.5 items-start">
                  <span className="text-teal text-sm mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-white text-sm leading-relaxed">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== METHOD ===== */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-5xl mx-auto">
          <p className="text-coral text-xs font-bold tracking-[0.1em] uppercase mb-3">
            La méthode
          </p>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight mb-14">
            Chaque leçon, un voyage en 3 temps.
          </h2>

          <div className="flex flex-col gap-8">
            {[
              {
                emoji: '🎙️',
                title: 'Le Prof raconte',
                desc: "Une anecdote ou un échange avec un natif qui pose le décor. Tu comprends le contexte avant d'apprendre un seul mot.",
                example:
                  "« L'autre jour, Marco, un Napolitain, m'a dit que dire 'espresso' en Italie, c'est le marqueur n°1 du touriste… »",
                color: '#C86E46',
              },
              {
                emoji: '🗺️',
                title: 'Tu es sur le terrain',
                desc: "Dialogue immersif, audio, expressions de la rue. Comme si tu y étais, avec le droit de te tromper.",
                example:
                  '— Scusi, un caffè per favore.\n— Lungo, ristretto, macchiato?\n— (Et là, tu apprends la différence.)',
                color: '#6B7B3E',
              },
              {
                emoji: '🔍',
                title: 'On décortique ensemble',
                desc: 'La grammaire expliquée avec logique. Le « pourquoi » derrière la règle. Tu comprends, tu ne récites pas.',
                example:
                  "En italien, « un caffè » ne prend pas d'article indéfini devant le comptoir — voici pourquoi…",
                color: '#D6A23D',
              },
            ].map((step) => (
              <div
                key={step.title}
                className="grid md:grid-cols-2 bg-[#FAF6F0] rounded-2xl overflow-hidden border border-black/5"
              >
                <div className="p-8 sm:p-10">
                  <span className="text-3xl block mb-3">{step.emoji}</span>
                  <h3
                    className="font-display text-xl sm:text-2xl mb-3"
                    style={{ color: step.color }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div
                  className="p-8 sm:p-10 flex items-center border-t md:border-t-0 md:border-l"
                  style={{
                    background: `${step.color}08`,
                    borderColor: `${step.color}14`,
                  }}
                >
                  <p className="font-display text-sm italic leading-relaxed text-ink/65 whitespace-pre-line">
                    {step.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LANGUAGES ===== */}
      <section id="langues" className="py-20 px-6 bg-warm">
        <div className="max-w-5xl mx-auto">
          <p className="text-teal text-xs font-bold tracking-[0.1em] uppercase mb-3 text-center">
            Choisis ta destination
          </p>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight mb-12 text-center">
            Où veux-tu aller ?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(languages).map((lang) => (
              <LanguageCard key={lang.slug} {...lang} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-4xl mx-auto grid md:grid-cols-[200px_1fr] gap-10 items-center">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-coral/15 to-teal/15 flex items-center justify-center text-6xl mx-auto md:mx-0 flex-shrink-0">
            ✈️
          </div>
          <div className="text-center md:text-left">
            <p className="text-coral text-xs font-bold tracking-[0.1em] uppercase mb-3">
              Qui est derrière tout ça
            </p>
            <h2 className="font-display text-2xl sm:text-3xl leading-tight mb-4">
              Un rêve, un clavier, et une conviction.
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-3">
              Je n&apos;ai pas encore mis les pieds à Londres, Séoul ou Rome. Ce sont mes rêves,
              pas (encore) mes souvenirs. Mais j&apos;ai passé des centaines d&apos;heures à
              apprendre ces langues, à décortiquer leur grammaire, à échanger avec des natifs,
              et à comprendre leurs cultures de l&apos;intérieur.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              LeProfNomade, c&apos;est le site que j&apos;aurais voulu trouver. On apprend ensemble,
              on se prépare ensemble, et un jour — on partira prêts. En attendant, c&apos;est
              gratuit, parce que l&apos;accès aux langues ne devrait pas dépendre de ton
              portefeuille.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
