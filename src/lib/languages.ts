export const languages = {
  anglais: {
    name: 'Anglais',
    flag: '🇬🇧',
    color: '#D6A23D',
    tagline: "L'anglais qu'on parle vraiment",
    description: "Pas l'anglais scolaire. Celui du pub, du bureau, de la rue londonienne.",
    slug: 'anglais',
  },
  coreen: {
    name: 'Coréen',
    flag: '🇰🇷',
    color: '#C86E46',
    tagline: 'Le coréen sans panique',
    description: 'Du Hangul à ta première commande au 편의점. Avec les clés culturelles.',
    slug: 'coreen',
  },
  italien: {
    name: 'Italien',
    flag: '🇮🇹',
    color: '#6B7B3E',
    tagline: "L'italien avec l'accent",
    description: 'Apprends à parler (et à manger) comme un vrai local. Dai, andiamo!',
    slug: 'italien',
  },
} as const;

export type LangKey = keyof typeof languages;
