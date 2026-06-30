import Link from 'next/link';

interface LanguageCardProps {
  flag: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  slug: string;
  escales?: number;
  lecons?: number;
}

export function LanguageCard({
  flag,
  name,
  tagline,
  description,
  color,
  slug,
  escales = 0,
  lecons = 0,
}: LanguageCardProps) {
  return (
    <Link
      href={`/${slug}`}
      className="group block bg-white rounded-2xl p-8 border border-black/5 hover:border-transparent transition-all duration-300 no-underline relative overflow-hidden hover:-translate-y-1"
      style={{
        boxShadow: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 12px 32px ${color}18`;
        e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all"
        style={{ background: color }}
      />
      <span className="text-4xl block mb-4">{flag}</span>
      <h3
        className="font-display text-2xl mb-1"
        style={{ color }}
      >
        {name}
      </h3>
      <p className="text-sm font-semibold text-ink mb-3">{tagline}</p>
      <p className="text-sm text-gray-500 leading-relaxed mb-5">
        {description}
      </p>
      {(escales > 0 || lecons > 0) && (
        <div className="flex gap-4 text-xs text-gray-400 mb-5">
          {escales > 0 && <span>{escales} escales</span>}
          {escales > 0 && lecons > 0 && <span>·</span>}
          {lecons > 0 && <span>{lecons} leçons</span>}
        </div>
      )}
      <div
        className="w-full py-3 text-center text-white font-semibold rounded-xl text-sm transition-opacity group-hover:opacity-90"
        style={{ background: color }}
      >
        Explorer le parcours →
      </div>
    </Link>
  );
}
