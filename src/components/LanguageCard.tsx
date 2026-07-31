import Link from 'next/link';
import Image from 'next/image';

interface LanguageCardProps {
  flag: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  slug: string;
  escales?: number;
  lecons?: number;
  imageUrl?: string;
  // Nombre de leçons terminées (undefined = utilisateur non connecté)
  leconsFaites?: number;
}

export function LanguageCard({
  flag,
  name,
  tagline,
  description,
  color,
  slug,
  escales = 12,
  lecons = 60,
  imageUrl,
  leconsFaites,
}: LanguageCardProps) {
  const pct =
    typeof leconsFaites === 'number' && lecons > 0
      ? Math.min(100, Math.round((leconsFaites / lecons) * 100))
      : null;

  return (
    <Link
      href={`/${slug}`}
      className="group block bg-[#FAF6F0] rounded-2xl border border-black/5 hover:border-transparent transition-all duration-300 no-underline relative overflow-hidden hover:-translate-y-1"
      style={{ boxShadow: 'none' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 12px 32px ${color}18`;
        e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
      }}
    >
      {/* Photo destination */}
      {imageUrl && (
        <div className="relative h-36 overflow-hidden">
          <Image
            src={imageUrl}
            alt={`Voyage — ${name}`}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${color}30, transparent 55%)` }}
          />
          <span className="absolute top-3 left-3 bg-white/90 rounded-full px-2.5 py-1 text-lg leading-none shadow-sm">
            {flag}
          </span>
        </div>
      )}

      <div className="p-6 sm:p-7">
        {!imageUrl && <span className="text-4xl block mb-4">{flag}</span>}
        <h3 className="font-display text-2xl mb-1" style={{ color }}>
          {name}
        </h3>
        <p className="text-sm font-semibold text-ink mb-3">{tagline}</p>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">{description}</p>

        {/* Progression (connecté) ou volume du parcours (visiteur) */}
        {pct !== null ? (
          <div className="mb-5">
            <div className="flex justify-between text-xs text-gray-400 mb-1.5">
              <span>
                {leconsFaites} / {lecons} leçons
              </span>
              <span style={{ color }} className="font-semibold">
                {pct}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-black/[0.07] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, background: color }}
              />
            </div>
          </div>
        ) : (
          <div className="flex gap-4 text-xs text-gray-400 mb-5">
            <span>{escales} escales</span>
            <span>·</span>
            <span>{lecons} leçons</span>
          </div>
        )}

        <div
          className="w-full py-3 text-center text-white font-semibold rounded-xl text-sm transition-opacity group-hover:opacity-90"
          style={{ background: color }}
        >
          Explorer le parcours →
        </div>
      </div>
    </Link>
  );
}
