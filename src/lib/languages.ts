export const languages = {
  anglais: {
    name: 'Anglais',
    flag: '🇬🇧',
    color: '#1B4965',
    tagline: "L'anglais qu'on parle vraiment",
    description: "Pas l'anglais scolaire. Celui du pub, du bureau, de la rue londonienne.",
    slug: 'anglais',
  },
  coreen: {
    name: 'Coréen',
    flag: '🇰🇷',
    color: '#8338EC',
    tagline: 'Le coréen sans panique',
    description: 'Du Hangul à ta première commande au 편의점. Avec les clés culturelles.',
    slug: 'coreen',
  },
  italien: {
    name: 'Italien',
    flag: '🇮🇹',
    color: '#E63946',
    tagline: "L'italien avec l'accent",
    description: 'Apprends à parler (et à manger) comme un vrai local. Dai, andiamo!',
    slug: 'italien',
  },
} as const;

export type LangKey = keyof typeof languages;
