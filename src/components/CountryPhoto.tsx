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
    imageUrl: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=900&q=80&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&q=80&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=80&fit=crop",
    facts: [
      { label: "Population", value: "67,7M" },
      { label: "Capitale", value: "Londres" },
      { label: "Monnaie", value: "£ Pound" },
      { label: "Langue", value: "English" },
    ],
  },
};

// ===== DESKTOP — Colonne droite sticky =====
export function CountryPhoto({ langKey, color }: { langKey: string; color: string }) {
  const data = countryData[langKey];
  if (!data) return null;

  return (
    <div className="rounded-2xl overflow-hidden border border-black/5 relative" style={{ minHeight: '600px' }}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${data.imageUrl})` }} />
      <div className="absolute inset-0" style={{
        background: `linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0.65) 55%, rgba(255,255,255,0.92) 100%)`
      }} />
      <div className="relative z-10 p-5 h-full flex flex-col" style={{ minHeight: '600px' }}>
        <div className="mt-6 mb-auto">
          <p className="font-display text-4xl font-bold drop-shadow-sm" style={{ color }}>{data.city}</p>
          <p className="text-sm text-gray-600 font-medium mt-1">{data.country}</p>
        </div>
        <div className="flex flex-col gap-3 mt-8">
          {data.facts.map((fact, idx) => (
            <div key={idx} className="bg-white/75 backdrop-blur-sm rounded-xl px-4 py-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-none font-semibold">{fact.label}</p>
              <p className="text-sm font-bold text-gray-700 mt-1">{fact.value}</p>
            </div>
          ))}
        </div>
        <div className="h-1.5 rounded-full mt-5 w-14" style={{ background: color }} />
      </div>
    </div>
  );
}

// ===== MOBILE — Bandeau horizontal =====
export function CountryPhotoBanner({ langKey, color }: { langKey: string; color: string }) {
  const data = countryData[langKey];
  if (!data) return null;

  return (
    <div className="rounded-2xl overflow-hidden relative mb-6" style={{ height: '220px' }}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${data.imageUrl})` }} />
      <div className="absolute inset-0" style={{
        background: `linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)`
      }} />
      <div className="relative z-10 p-5 h-full flex flex-col justify-end">
        <p className="font-display text-3xl font-bold text-white drop-shadow-lg">{data.city}</p>
        <p className="text-sm text-white/80 font-medium mt-0.5">{data.country}</p>
        <div className="flex gap-3 mt-3 flex-wrap">
          {data.facts.map((fact, idx) => (
            <div key={idx} className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1.5">
              <p className="text-[9px] text-white/60 uppercase tracking-wider leading-none">{fact.label}</p>
              <p className="text-xs font-bold text-white mt-0.5">{fact.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
