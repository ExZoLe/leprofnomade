import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { blogPays, getAllPosts, getPost } from '@/lib/blog';
import { getTheme } from '@/lib/travel-theme';
import { BlogRenderer } from '@/components/BlogRenderer';

// kr- / it- / en- selon le pays (même convention que les leçons)
const lessonPrefix: Record<string, string> = {
  coreen: 'kr',
  italien: 'it',
  anglais: 'en',
};

export function generateStaticParams() {
  const params: { pays: string; slug: string }[] = [];
  for (const pays of blogPays) {
    for (const post of getAllPosts(pays)) {
      params.push({ pays, slug: post.slug });
    }
  }
  return params;
}

export function generateMetadata({
  params,
}: {
  params: { pays: string; slug: string };
}): Metadata {
  const post = getPost(params.pays, params.slug);
  if (!post) return {};
  return {
    title: `${post.meta.title} | LeProfNomade`,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      images: post.meta.image ? [post.meta.image] : undefined,
    },
  };
}

export default function BlogArticlePage({
  params,
}: {
  params: { pays: string; slug: string };
}) {
  const theme = getTheme(params.pays);
  const post = getPost(params.pays, params.slug);
  if (!theme || !post) notFound();

  const { meta, content } = post!;
  const escale: number = meta.relatedEscale || 1;
  const stamp = theme!.stamps[escale - 1];
  const firstLessonSlug = `${lessonPrefix[params.pays]}-escale-${escale}-lecon-1`;

  return (
    <div style={{ background: '#EFE7D9', minHeight: '100vh' }}>
      {/* Photo hero */}
      <div className="relative h-64 sm:h-80">
        <Image
          src={meta.image}
          alt={meta.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${theme!.deep}D9, ${theme!.deep}26)`,
          }}
        />
        <div className="absolute inset-x-0 bottom-0 max-w-3xl mx-auto px-6 pb-7">
          <Link
            href={`/blog/${params.pays}`}
            className="text-xs text-white/80 no-underline hover:text-white"
          >
            ← Carnet {theme!.country}
          </Link>
          <div className="flex items-center gap-2.5 mt-2 mb-2">
            <span
              className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full text-white"
              style={{ background: theme!.primary }}
            >
              {meta.category}
            </span>
            <span className="text-xs text-white/85">⏱ {meta.readTime} min</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-white leading-tight">
            {meta.title}
          </h1>
        </div>
      </div>

      {/* Corps de l'article */}
      <article className="max-w-3xl mx-auto px-6 py-10">
        <p className="text-base sm:text-lg text-[#3D2D14]/80 leading-relaxed italic mb-2">
          {meta.excerpt}
        </p>

        <BlogRenderer content={content} accent={theme!.primary} />

        {/* Vocabulaire lié — renvoi vers l'escale du cours */}
        <div
          className="rounded-2xl p-6 mt-10 border"
          style={{ background: '#FAF6F0', borderColor: `${theme!.primary}30` }}
        >
          <p
            className="text-xs font-bold tracking-wider uppercase mb-2"
            style={{ color: theme!.primary }}
          >
            📚 Vocabulaire lié
          </p>
          <p className="text-sm text-[#5F5E5A] leading-relaxed mb-4">
            Les mots et expressions qui vont avec cet article s&apos;apprennent à
            l&apos;escale {escale} {stamp ? `« ${stamp.label} »` : ''} du parcours{' '}
            {theme!.country}.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href={`/lecon/${firstLessonSlug}`}
              className="inline-block text-sm font-semibold text-white px-5 py-2.5 rounded-xl no-underline hover:opacity-90 transition-opacity"
              style={{ background: theme!.primary }}
            >
              Commencer l&apos;escale {escale} →
            </Link>
            <Link
              href={`/carnet/${params.pays}`}
              className="inline-block text-sm font-semibold px-5 py-2.5 rounded-xl no-underline border transition-colors"
              style={{ color: theme!.deep, borderColor: `${theme!.primary}40` }}
            >
              Le Passeport lexical
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
