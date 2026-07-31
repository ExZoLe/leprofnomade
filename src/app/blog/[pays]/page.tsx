import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { blogPays, getAllPosts, getCategories } from '@/lib/blog';
import { getTheme } from '@/lib/travel-theme';
import { countryBanners } from '@/lib/unsplash-images';

export function generateStaticParams() {
  return blogPays.map((pays) => ({ pays }));
}

export function generateMetadata({ params }: { params: { pays: string } }): Metadata {
  const theme = getTheme(params.pays);
  if (!theme) return {};
  return {
    title: `Carnet de route — ${theme.country} | LeProfNomade`,
    description: `Culture, cuisine, histoire et vie quotidienne : les articles du carnet de route ${theme.country}.`,
  };
}

export default function BlogPaysPage({ params }: { params: { pays: string } }) {
  const theme = getTheme(params.pays);
  if (!theme || (blogPays as readonly string[]).indexOf(params.pays) === -1) {
    notFound();
  }

  const posts = getAllPosts(params.pays);
  const categories = getCategories(params.pays);

  return (
    <div style={{ background: '#EFE7D9', minHeight: '100vh' }}>
      {/* Bannière pays */}
      <div className="relative h-56 sm:h-72">
        <Image
          src={countryBanners[params.pays]}
          alt={`${theme!.country}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${theme!.deep}CC, ${theme!.deep}40)`,
          }}
        />
        <div className="absolute inset-x-0 bottom-0 max-w-5xl mx-auto px-6 pb-6">
          <Link
            href="/blog"
            className="text-xs text-white/80 no-underline hover:text-white"
          >
            ← Tous les carnets
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl text-white leading-tight mt-1">
            {theme!.flag} Carnet de route — {theme!.country}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Catégories présentes */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <span
              key={cat}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#FAF6F0] border border-black/5"
              style={{ color: theme!.deep }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Articles */}
        <div className="grid sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${params.pays}/${post.slug}`}
              className="group block bg-[#FAF6F0] rounded-2xl border border-black/5 overflow-hidden no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className="absolute top-3 left-3 text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full text-white"
                  style={{ background: theme!.primary }}
                >
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <h2 className="font-display text-xl text-[#3D2D14] leading-snug mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-[#8B7355] leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <span className="text-xs text-[#8B7355]">
                  ⏱ {post.readTime} min de lecture
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
