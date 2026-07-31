import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTheme } from '@/lib/travel-theme';
import { SeoulMap } from '@/components/maps/SeoulMap';
import { LondonMap } from '@/components/maps/LondonMap';
import { RomeMap } from '@/components/maps/RomeMap';

const langues = ['coreen', 'anglais', 'italien'] as const;

const lessonPrefix: Record<string, string> = {
  coreen: 'kr',
  italien: 'it',
  anglais: 'en',
};

// Légende : quartier ↔ escale du cours
const legends: Record<string, { escale: number; quartier: string; note: string }[]> = {
  coreen: [
    { escale: 8, quartier: 'Gyeongbokgung · Bukchon', note: 'Palais royal et village de hanoks' },
    { escale: 2, quartier: 'Insadong', note: 'Maisons de thé et politesse coréenne' },
    { escale: 4, quartier: 'Gangnam', note: 'Le métro et la Séoul moderne' },
    { escale: 6, quartier: 'Myeongdong', note: 'Konbini et shopping de rue' },
    { escale: 7, quartier: 'Gwangjang', note: 'Le marché où Séoul mange' },
    { escale: 9, quartier: 'Itaewon', note: 'Pharmacies et quartier international' },
    { escale: 10, quartier: 'Namsan', note: 'Sorties et vue sur la ville' },
    { escale: 11, quartier: 'Hongdae', note: 'Cafés, musique et rencontres' },
  ],
  anglais: [
    { escale: 2, quartier: 'Westminster', note: 'Big Ben et le small talk au parc' },
    { escale: 4, quartier: 'Baker Street', note: 'Le Tube historique' },
    { escale: 5, quartier: 'Notting Hill', note: 'B&B et façades pastel' },
    { escale: 6, quartier: 'La City', note: 'Shopping et St Paul’s' },
    { escale: 7, quartier: 'Borough Market', note: 'Pubs et gastronomie' },
    { escale: 8, quartier: 'Tower Bridge', note: 'Tea time avec vue' },
    { escale: 10, quartier: 'West End', note: 'Théâtres et sorties' },
    { escale: 11, quartier: 'Camden', note: 'Marchés et rencontres' },
  ],
  italien: [
    { escale: 2, quartier: 'Vatican', note: 'Salutations et files légendaires' },
    { escale: 4, quartier: 'Termini', note: 'Trains et grandes lignes' },
    { escale: 6, quartier: 'Centro storico', note: 'Marchés et Pantheon' },
    { escale: 7, quartier: 'Testaccio', note: 'La cuisine romaine authentique' },
    { escale: 8, quartier: 'Trastevere', note: 'Aperitivo sur les pavés' },
    { escale: 10, quartier: 'Colisée · Forum', note: 'Sorties et 2 000 ans d’histoire' },
  ],
};

export function generateStaticParams() {
  return langues.map((langue) => ({ langue }));
}

export function generateMetadata({ params }: { params: { langue: string } }): Metadata {
  const theme = getTheme(params.langue);
  if (!theme) return {};
  return {
    title: `La carte de ${theme.city} | LeProfNomade`,
    description: `Carte illustrée de ${theme.city} : les quartiers reliés aux escales de ton parcours ${theme.country}.`,
  };
}

export default function CartePage({ params }: { params: { langue: string } }) {
  const theme = getTheme(params.langue);
  if (!theme || (langues as readonly string[]).indexOf(params.langue) === -1) {
    notFound();
  }

  const legend = legends[params.langue] ?? [];
  const prefix = lessonPrefix[params.langue];

  return (
    <div style={{ background: '#EFE7D9', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <Link
          href={`/${params.langue}`}
          className="text-xs no-underline"
          style={{ color: theme!.deep }}
        >
          ← Retour au parcours {theme!.country}
        </Link>
        <h1 className="font-display text-3xl sm:text-4xl text-[#3D2D14] leading-tight mt-2 mb-2">
          {theme!.flag} La carte de {theme!.city}
        </h1>
        <p className="text-sm text-[#8B7355] mb-8 max-w-xl leading-relaxed">
          Chaque quartier de ta destination correspond à une escale du cours :
          repère-les ici, puis pars les explorer en leçons.
        </p>

        {/* La carte */}
        <div className="bg-[#FAF6F0] rounded-2xl border border-black/5 p-3 sm:p-5 mb-10 overflow-x-auto">
          {params.langue === 'coreen' && <SeoulMap />}
          {params.langue === 'anglais' && <LondonMap />}
          {params.langue === 'italien' && <RomeMap />}
        </div>

        {/* Légende : quartiers ↔ escales */}
        <h2 className="font-display text-2xl text-[#3D2D14] mb-5">
          Les quartiers, escale par escale
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {legend.map((item) => {
            const stamp = theme!.stamps[item.escale - 1];
            return (
              <Link
                key={`${item.escale}-${item.quartier}`}
                href={`/lecon/${prefix}-escale-${item.escale}-lecon-1`}
                className="flex items-center gap-4 bg-[#FAF6F0] rounded-xl border border-black/5 p-4 no-underline transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: theme!.primary }}
                >
                  {item.escale}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#3D2D14] m-0">
                    {item.quartier}
                    {stamp && (
                      <span className="ml-2 text-xs font-normal" style={{ color: theme!.deep }}>
                        {stamp.emoji} {stamp.label}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-[#8B7355] m-0 mt-0.5">{item.note}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
