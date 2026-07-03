'use client';

const countryData: Record<string, {
  city: string;
  country: string;
  imageUrl: string;
  facts: { label: string; value: string }[];
}> = {
  coreen: {
    city: "Séoul",
    country: "Corée du Sud",
    imageUrl: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=600&q=80&fit=crop",
    facts: [
      { label: "Population", value: "51,7M" },
      { label: "Capitale", value: "Séoul" },
      { label: "Monnaie", value: "₩ Won" },
      { label: "Alphabet", value: "Hangul 한글" },
    ],
  },
  italien: {
    city: "Rome",
    country: "Italie",
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80&fit=crop",
    facts: [
      { label: "Population", value: "58,9M" },
      { label: "Capitale", value: "Rome" },
      { label: "Monnaie", value: "€ Euro" },
      { label: "Langue", value: "Italiano" },
    ],
  },
  anglais: {
    city: "Londres",
    country: "Royaume-Uni",
    imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80&fit=crop",
    facts: [
      { label: "Population", value: "67,7M" },
      { label: "Capitale", value: "Londres" },
      { label: "Monnaie", value: "£ Pound" },
      { label: "Langue", value: "English" },
    ],
  },
};

export function CountryPhoto({
  langKey,
  color,
}: {
  langKey: string;
  color: string;
}) {
  const data = countryData[langKey];
  if (!data) return null;

  return (
    <div
      className="rounded-xl overflow-hidden border border-black/5 relative"
      style={{ minHeight: '420px' }}
    >
      {/* Photo de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.imageUrl})` }}
      />

      {/* Overlay gradient — plus opaque en bas pour la lisibilité */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(255,255,255,0.35) 0%,
            rgba(255,255,255,0.55) 40%,
            rgba(255,255,255,0.85) 75%,
            rgba(255,255,255,0.95) 100%
          )`,
        }}
      />

      {/* Contenu par-dessus */}
      <div className="relative z-10 p-4 h-full flex flex-col">
        {/* Titre ville */}
        <div className="mt-2 mb-auto">
          <p
            className="font-display text-2xl font-bold drop-shadow-sm"
            style={{ color }}
          >
            {data.city}
          </p>
          <p className="text-xs text-gray-600 font-medium mt-0.5">
            {data.country}
          </p>
        </div>

        {/* Facts */}
        <div className="flex flex-col gap-2 mt-8">
          {data.facts.map((fact, idx) => (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-sm rounded-lg px-3 py-2"
            >
              <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-none">
                {fact.label}
              </p>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">
                {fact.value}
              </p>
            </div>
          ))}
        </div>

        {/* Accent line */}
        <div
          className="h-1 rounded-full mt-4 w-12"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}
