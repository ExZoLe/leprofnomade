import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogPays, getAllPosts } from '@/lib/blog';
import { getTheme } from '@/lib/travel-theme';
import { countryBanners } from '@/lib/unsplash-images';

export const metadata: Metadata = {
  title: 'Le blog — Carnets de route | LeProfNomade',
  description:
    'Culture, cuisine, histoire et vie quotidienne en Corée, en Italie et au Royaume-Uni. Les carnets de route du ProfNomade.',
};

export default function BlogHubPage() {
  return (
    <div style={{ background: '#EFE7D9', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <p className="text-xs font-bold tracking-[0.1em] uppercase mb-3 text-[#8B7355]">
          Le blog
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-[#3D2D14] leading-tight mb-4">
          Carnets de route 📓
        </h1>
        <p className="text-base text-[#8B7355] max-w-xl mb-12 leading-relaxed">
          La culture qui donne du sens aux mots : cuisine, histoire, codes
          sociaux et pop culture de tes trois destinations.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPays.map((pays) => {
            const theme = getTheme(pays);
            const count = getAllPosts(pays).length;
            if (!theme) return null;
            return (
              <Link
                key={pays}
                href={`/blog/${pays}`}
                className="group block bg-[#FAF6F0] rounded-2xl border border-black/5 overflow-hidden no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={countryBanners[pays]}
                    alt={`Carnet de route — ${theme.country}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, ${theme.deep}B3, transparent 60%)`,
                    }}
                  />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="text-2xl">{theme.flag}</span>
                    <span className="font-display text-xl text-white">
                      {theme.country}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <span className="text-sm text-[#8B7355]">
                    {count} article{count > 1 ? 's' : ''}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: theme.primary }}
                  >
                    Ouvrir le carnet →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
