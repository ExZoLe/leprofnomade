'use client';

import { useState } from 'react';

// ===== DONNÉES ALPHABET PAR LANGUE =====

interface AlphabetChar {
  char: string;
  name?: string;
  phonetic: string;
  example?: string;
  exampleTranslation?: string;
}

interface AlphabetGroup {
  title: string;
  description?: string;
  chars: AlphabetChar[];
}

const alphabetData: Record<string, { intro: string; groups: AlphabetGroup[] }> = {
  coreen: {
    intro: "Le Hangul (한글) a été inventé en 1443 par le roi Sejong pour que tout le monde puisse lire et écrire. C'est l'un des alphabets les plus logiques au monde — chaque lettre imite la position de la bouche quand tu prononces le son.",
    groups: [
      {
        title: "Consonnes de base (자음)",
        description: "14 consonnes. Chacune imite la forme de ta bouche ou de ta langue quand tu prononces le son.",
        chars: [
          { char: "ㄱ", name: "giyeok", phonetic: "g / k", example: "가방", exampleTranslation: "sac" },
          { char: "ㄴ", name: "nieun", phonetic: "n", example: "나라", exampleTranslation: "pays" },
          { char: "ㄷ", name: "digeut", phonetic: "d / t", example: "다리", exampleTranslation: "pont" },
          { char: "ㄹ", name: "rieul", phonetic: "r / l", example: "라면", exampleTranslation: "ramyeon" },
          { char: "ㅁ", name: "mieum", phonetic: "m", example: "물", exampleTranslation: "eau" },
          { char: "ㅂ", name: "bieup", phonetic: "b / p", example: "밥", exampleTranslation: "riz" },
          { char: "ㅅ", name: "siot", phonetic: "s", example: "사람", exampleTranslation: "personne" },
          { char: "ㅇ", name: "ieung", phonetic: "— (muet) / ng", example: "아이", exampleTranslation: "enfant" },
          { char: "ㅈ", name: "jieut", phonetic: "j / ch", example: "자다", exampleTranslation: "dormir" },
          { char: "ㅊ", name: "chieut", phonetic: "tch (aspiré)", example: "차", exampleTranslation: "thé / voiture" },
          { char: "ㅋ", name: "kieuk", phonetic: "k (aspiré)", example: "커피", exampleTranslation: "café" },
          { char: "ㅌ", name: "tieut", phonetic: "t (aspiré)", example: "토끼", exampleTranslation: "lapin" },
          { char: "ㅍ", name: "pieup", phonetic: "p (aspiré)", example: "파", exampleTranslation: "oignon vert" },
          { char: "ㅎ", name: "hieut", phonetic: "h", example: "하늘", exampleTranslation: "ciel" },
        ],
      },
      {
        title: "Voyelles de base (모음)",
        description: "10 voyelles. Construites à partir de 3 éléments : un trait vertical (ㅣ= humain), un point/trait court (· = ciel), un trait horizontal (ㅡ = terre).",
        chars: [
          { char: "ㅏ", name: "a", phonetic: "a (comme papa)" },
          { char: "ㅑ", name: "ya", phonetic: "ya (comme yaourt)" },
          { char: "ㅓ", name: "eo", phonetic: "eo (entre o et eu)" },
          { char: "ㅕ", name: "yeo", phonetic: "yeo" },
          { char: "ㅗ", name: "o", phonetic: "o (fermé, comme eau)" },
          { char: "ㅛ", name: "yo", phonetic: "yo" },
          { char: "ㅜ", name: "u", phonetic: "ou (comme cou)" },
          { char: "ㅠ", name: "yu", phonetic: "you" },
          { char: "ㅡ", name: "eu", phonetic: "eu (lèvres étirées)" },
          { char: "ㅣ", name: "i", phonetic: "i (comme lit)" },
        ],
      },
      {
        title: "Comment ça s'assemble",
        description: "Chaque syllabe coréenne est un bloc : consonne + voyelle (+ consonne finale optionnelle). Exemples :",
        chars: [
          { char: "가", phonetic: "ga", example: "ㄱ + ㅏ", exampleTranslation: "consonne g + voyelle a" },
          { char: "한", phonetic: "han", example: "ㅎ + ㅏ + ㄴ", exampleTranslation: "h + a + n" },
          { char: "글", phonetic: "geul", example: "ㄱ + ㅡ + ㄹ", exampleTranslation: "g + eu + l" },
          { char: "서", phonetic: "seo", example: "ㅅ + ㅓ", exampleTranslation: "s + eo" },
          { char: "울", phonetic: "ul", example: "ㅇ + ㅜ + ㄹ", exampleTranslation: "— + ou + l" },
        ],
      },
    ],
  },
  italien: {
    intro: "L'alphabet italien a 21 lettres (pas de j, k, w, x, y sauf dans les mots étrangers). La prononciation est très régulière — chaque lettre se prononce presque toujours de la même façon. Le piège pour les Français : les c, g, gl, gn, sc qui changent selon la voyelle qui suit.",
    groups: [
      {
        title: "L'alphabet italien",
        description: "21 lettres + 5 étrangères (j, k, w, x, y). La prononciation est quasi-phonétique — ce que tu lis est ce que tu prononces.",
        chars: [
          { char: "A", phonetic: "a", example: "amore", exampleTranslation: "amour" },
          { char: "B", phonetic: "bi", example: "bello", exampleTranslation: "beau" },
          { char: "C", phonetic: "tchi", example: "ciao / casa", exampleTranslation: "salut / maison" },
          { char: "D", phonetic: "di", example: "dove", exampleTranslation: "où" },
          { char: "E", phonetic: "é", example: "estate", exampleTranslation: "été" },
          { char: "F", phonetic: "èf-fé", example: "fare", exampleTranslation: "faire" },
          { char: "G", phonetic: "dji", example: "gelato / gatto", exampleTranslation: "glace / chat" },
          { char: "H", phonetic: "ak-ka", example: "hotel", exampleTranslation: "hôtel (H toujours muet !)" },
          { char: "I", phonetic: "i", example: "italia", exampleTranslation: "Italie" },
          { char: "L", phonetic: "èl-lé", example: "luna", exampleTranslation: "lune" },
          { char: "M", phonetic: "èm-mé", example: "mare", exampleTranslation: "mer" },
          { char: "N", phonetic: "èn-né", example: "notte", exampleTranslation: "nuit" },
          { char: "O", phonetic: "o", example: "oro", exampleTranslation: "or" },
          { char: "P", phonetic: "pi", example: "pasta", exampleTranslation: "pâtes" },
          { char: "Q", phonetic: "kou", example: "quando", exampleTranslation: "quand" },
          { char: "R", phonetic: "èr-ré", example: "Roma", exampleTranslation: "Rome (R roulé !)" },
          { char: "S", phonetic: "ès-sé", example: "sole", exampleTranslation: "soleil" },
          { char: "T", phonetic: "ti", example: "tempo", exampleTranslation: "temps" },
          { char: "U", phonetic: "ou", example: "uva", exampleTranslation: "raisin" },
          { char: "V", phonetic: "vou", example: "vino", exampleTranslation: "vin" },
          { char: "Z", phonetic: "dzè-ta", example: "pizza", exampleTranslation: "pizza" },
        ],
      },
      {
        title: "Les pièges de prononciation",
        description: "Les combinaisons de lettres qui changent de son selon la voyelle qui suit.",
        chars: [
          { char: "CE/CI", phonetic: "tché / tchi", example: "cena, cinema", exampleTranslation: "dîner, cinéma (son 'tch')" },
          { char: "CA/CO/CU", phonetic: "ka / ko / kou", example: "casa, cosa, cuore", exampleTranslation: "maison, chose, cœur (son 'k')" },
          { char: "CHE/CHI", phonetic: "ké / ki", example: "che, chiave", exampleTranslation: "que, clé (H rend le C dur)" },
          { char: "GE/GI", phonetic: "djé / dji", example: "gelato, giro", exampleTranslation: "glace, tour (son 'dj')" },
          { char: "GA/GO/GU", phonetic: "ga / go / gou", example: "gatto, gonna", exampleTranslation: "chat, jupe (G dur)" },
          { char: "GHE/GHI", phonetic: "gué / gui", example: "spaghetti", exampleTranslation: "spaghetti (H rend le G dur)" },
          { char: "GLI", phonetic: "lli (mouillé)", example: "famiglia, figlio", exampleTranslation: "famille, fils" },
          { char: "GN", phonetic: "gn (comme agneau)", example: "gnocchi, bagno", exampleTranslation: "gnocchi, salle de bain" },
          { char: "SC+E/I", phonetic: "ch (comme chien)", example: "scena, uscire", exampleTranslation: "scène, sortir" },
          { char: "SC+A/O/U", phonetic: "sk", example: "scala, scuola", exampleTranslation: "escalier, école" },
        ],
      },
    ],
  },
  anglais: {
    intro: "L'alphabet anglais a 26 lettres — les mêmes qu'en français. Mais la prononciation est un cauchemar : l'anglais n'est PAS phonétique. La même lettre peut avoir 5 sons différents (le 'a' de cat, car, care, call, about). L'essentiel : les sons qui n'existent pas en français.",
    groups: [
      {
        title: "L'alphabet anglais — prononciation",
        description: "26 lettres. L'alphabet se prononce différemment du français — important pour épeler ton nom au téléphone.",
        chars: [
          { char: "A", phonetic: "éi", example: "apple, car, cake", exampleTranslation: "pomme, voiture, gâteau" },
          { char: "B", phonetic: "bi", example: "bus", exampleTranslation: "bus" },
          { char: "C", phonetic: "si", example: "cat, city", exampleTranslation: "chat, ville" },
          { char: "D", phonetic: "di", example: "dog", exampleTranslation: "chien" },
          { char: "E", phonetic: "i (long)", example: "egg, even", exampleTranslation: "œuf, même" },
          { char: "F", phonetic: "èf", example: "fish", exampleTranslation: "poisson" },
          { char: "G", phonetic: "dji", example: "go, gym", exampleTranslation: "aller, salle de sport" },
          { char: "H", phonetic: "éitch", example: "hello", exampleTranslation: "bonjour (H aspiré !)" },
          { char: "I", phonetic: "aï", example: "ice, sit", exampleTranslation: "glace, s'asseoir" },
          { char: "J", phonetic: "djéi", example: "just", exampleTranslation: "juste" },
          { char: "K", phonetic: "kéi", example: "king", exampleTranslation: "roi" },
          { char: "L", phonetic: "èl", example: "love", exampleTranslation: "amour" },
          { char: "M", phonetic: "èm", example: "map", exampleTranslation: "carte" },
          { char: "N", phonetic: "èn", example: "night", exampleTranslation: "nuit" },
          { char: "O", phonetic: "ôou", example: "open, hot", exampleTranslation: "ouvrir, chaud" },
          { char: "P", phonetic: "pi", example: "park", exampleTranslation: "parc" },
          { char: "Q", phonetic: "kiou", example: "queen", exampleTranslation: "reine" },
          { char: "R", phonetic: "ar", example: "red", exampleTranslation: "rouge (R non roulé !)" },
          { char: "S", phonetic: "ès", example: "sun", exampleTranslation: "soleil" },
          { char: "T", phonetic: "ti", example: "time", exampleTranslation: "temps" },
          { char: "U", phonetic: "iou", example: "up, use", exampleTranslation: "haut, utiliser" },
          { char: "V", phonetic: "vi", example: "very", exampleTranslation: "très" },
          { char: "W", phonetic: "deub-liou", example: "water", exampleTranslation: "eau" },
          { char: "X", phonetic: "èks", example: "box", exampleTranslation: "boîte" },
          { char: "Y", phonetic: "ouaï", example: "yes", exampleTranslation: "oui" },
          { char: "Z", phonetic: "zèd (UK) / zi (US)", example: "zero", exampleTranslation: "zéro" },
        ],
      },
      {
        title: "Les sons qui n'existent pas en français",
        description: "Les sons anglais que les Français ont le plus de mal à prononcer.",
        chars: [
          { char: "TH (doux)", phonetic: "langue entre les dents, vibration", example: "the, this, that", exampleTranslation: "le, ceci, cela" },
          { char: "TH (dur)", phonetic: "langue entre les dents, souffle", example: "think, thank, three", exampleTranslation: "penser, merci, trois" },
          { char: "H aspiré", phonetic: "souffle (comme embuer un miroir)", example: "hello, house, happy", exampleTranslation: "bonjour, maison, heureux" },
          { char: "W", phonetic: "ou-a (lèvres arrondies)", example: "water, well, what", exampleTranslation: "eau, bien, quoi" },
          { char: "R anglais", phonetic: "langue NE touche PAS le palais", example: "red, right, around", exampleTranslation: "rouge, droite, autour" },
          { char: "-ING", phonetic: "ng nasal (pas 'ingue')", example: "going, eating, learning", exampleTranslation: "aller, manger, apprendre" },
          { char: "Schwa /ə/", phonetic: "eu très court (son le plus courant !)", example: "about, banana, the", exampleTranslation: "à propos, banane, le/la" },
        ],
      },
    ],
  },
};

// ===== COMPOSANT =====

export function AlphabetSection({
  langKey,
  color,
}: {
  langKey: string;
  color: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);

  const data = alphabetData[langKey];
  if (!data) return null;

  const langLabel =
    langKey === 'coreen' ? 'Hangul (한글)' :
    langKey === 'italien' ? 'Alphabet italien' :
    'English alphabet';

  return (
    <div className="bg-white rounded-xl border border-black/5 mb-6 overflow-hidden">
      {/* Header repliable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-4 sm:p-5 bg-transparent border-none cursor-pointer text-left hover:bg-gray-50/50 transition-colors"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: `${color}12`, color }}
        >
          {langKey === 'coreen' ? 'ㄱ' : langKey === 'italien' ? 'Aa' : 'Aa'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold tracking-wider uppercase" style={{ color }}>
            {langLabel}
          </p>
          <p className="text-sm text-gray-500">
            {isOpen ? 'Cliquer pour replier' : 'Voir l\'alphabet et la prononciation'}
          </p>
        </div>
        <span
          className={`text-gray-300 text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          ▾
        </span>
      </button>

      {/* Contenu déplié */}
      {isOpen && (
        <div className="px-4 sm:px-5 pb-5 pt-0">
          <div className="border-t border-black/5 pt-4">
            {/* Intro */}
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              {data.intro}
            </p>

            {/* Tabs pour les groupes */}
            <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
              {data.groups.map((group, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGroup(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border-none cursor-pointer transition-all ${
                    activeGroup === idx
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                  style={activeGroup === idx ? { background: color } : {}}
                >
                  {group.title}
                </button>
              ))}
            </div>

            {/* Description du groupe */}
            {data.groups[activeGroup]?.description && (
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                {data.groups[activeGroup].description}
              </p>
            )}

            {/* Grille de caractères */}
            <div className={`grid gap-2 ${
              langKey === 'coreen' && activeGroup < 2
                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                : langKey === 'anglais' && activeGroup === 0
                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2'
            }`}>
              {data.groups[activeGroup]?.chars.map((c, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-3 p-3 rounded-lg bg-gray-50/70 hover:bg-gray-100/80 transition-colors"
                >
                  <span
                    className="text-xl sm:text-2xl font-bold flex-shrink-0 w-10 text-center"
                    style={{ color }}
                  >
                    {c.char}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-1.5">
                      {c.name && (
                        <span className="text-xs font-semibold text-ink">{c.name}</span>
                      )}
                      <span className="text-xs text-gray-400">[{c.phonetic}]</span>
                    </div>
                    {c.example && (
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        <span className="font-medium" style={{ color: `${color}cc` }}>
                          {c.example}
                        </span>
                        {c.exampleTranslation && (
                          <span className="text-gray-400"> — {c.exampleTranslation}</span>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
