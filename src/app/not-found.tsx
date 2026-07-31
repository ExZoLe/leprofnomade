import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Escale introuvable | LeProfNomade',
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: '#EFE7D9' }}
    >
      <div className="max-w-md text-center">
        <p className="text-6xl mb-6">🧭</p>
        <h1 className="font-display text-3xl sm:text-4xl text-[#3D2D14] mb-3">
          Escale introuvable
        </h1>
        <p className="text-sm text-[#8B7355] leading-relaxed mb-8">
          On dirait que cette destination n&apos;existe pas sur notre carte.
          Elle a peut-être changé d&apos;adresse, ou le lien s&apos;est égaré en route.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/"
            className="inline-block bg-[#C86E46] text-white text-sm font-semibold px-6 py-3 rounded-xl no-underline hover:opacity-90 transition-opacity"
          >
            ← Retour à l&apos;accueil
          </Link>
          <Link
            href="/#langues"
            className="inline-block text-sm font-semibold px-6 py-3 rounded-xl no-underline border border-[#C86E46]/40 text-[#8B4513] hover:border-[#C86E46] transition-colors"
          >
            Voir les destinations
          </Link>
        </div>
      </div>
    </div>
  );
}
