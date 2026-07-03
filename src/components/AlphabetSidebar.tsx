'use client';

import { useState } from 'react';

interface AlphabetChar {
  char: string;
  name?: string;
  phonetic: string;
  example?: string;
  exampleTranslation?: string;
}

interface AlphabetGroup {
  title: string;
  shortTitle: string;
  chars: AlphabetChar[];
}

const alphabetData: Record<string, { label: string; groups: AlphabetGroup[] }> = {
  coreen: {
    label: "Hangul 한글",
    groups: [
      {
        title: "Consonnes (자음)", shortTitle: "자음",
        chars: [
          { char: "ㄱ", name: "giyeok", phonetic: "g/k" },
          { char: "ㄴ", name: "nieun", phonetic: "n" },
          { char: "ㄷ", name: "digeut", phonetic: "d/t" },
          { char: "ㄹ", name: "rieul", phonetic: "r/l" },
          { char: "ㅁ", name: "mieum", phonetic: "m" },
          { char: "ㅂ", name: "bieup", phonetic: "b/p" },
          { char: "ㅅ", name: "siot", phonetic: "s" },
          { char: "ㅇ", name: "ieung", phonetic: "—/ng" },
          { char: "ㅈ", name: "jieut", phonetic: "j" },
          { char: "ㅊ", name: "chieut", phonetic: "tch" },
          { char: "ㅋ", name: "kieuk", phonetic: "k" },
          { char: "ㅌ", name: "tieut", phonetic: "t" },
          { char: "ㅍ", name: "pieup", phonetic: "p" },
          { char: "ㅎ", name: "hieut", phonetic: "h" },
        ],
      },
      {
        title: "Voyelles (모음)", shortTitle: "모음",
        chars: [
          { char: "ㅏ", phonetic: "a" },
          { char: "ㅑ", phonetic: "ya" },
          { char: "ㅓ", phonetic: "eo" },
          { char: "ㅕ", phonetic: "yeo" },
          { char: "ㅗ", phonetic: "o" },
          { char: "ㅛ", phonetic: "yo" },
          { char: "ㅜ", phonetic: "ou" },
          { char: "ㅠ", phonetic: "you" },
          { char: "ㅡ", phonetic: "eu" },
          { char: "ㅣ", phonetic: "i" },
        ],
      },
      {
        title: "Syllabes (조합)", shortTitle: "조합",
        chars: [
          { char: "가", phonetic: "ga", example: "ㄱ+ㅏ" },
          { char: "한", phonetic: "han", example: "ㅎ+ㅏ+ㄴ" },
          { char: "글", phonetic: "geul", example: "ㄱ+ㅡ+ㄹ" },
          { char: "서", phonetic: "seo", example: "ㅅ+ㅓ" },
          { char: "울", phonetic: "ul", example: "ㅇ+ㅜ+ㄹ" },
          { char: "밥", phonetic: "bap", example: "ㅂ+ㅏ+ㅂ" },
        ],
      },
    ],
  },
  italien: {
    label: "Alfabeto italiano",
    groups: [
      {
        title: "Lettres (21)", shortTitle: "A-Z",
        chars: [
          { char: "A", phonetic: "a" }, { char: "B", phonetic: "bi" },
          { char: "C", phonetic: "tchi" }, { char: "D", phonetic: "di" },
          { char: "E", phonetic: "é" }, { char: "F", phonetic: "èffé" },
          { char: "G", phonetic: "dji" }, { char: "H", phonetic: "akka", example: "muet !" },
          { char: "I", phonetic: "i" }, { char: "L", phonetic: "èllé" },
          { char: "M", phonetic: "èmmé" }, { char: "N", phonetic: "ènné" },
          { char: "O", phonetic: "o" }, { char: "P", phonetic: "pi" },
          { char: "Q", phonetic: "kou" }, { char: "R", phonetic: "èrré", example: "roulé !" },
          { char: "S", phonetic: "èssé" }, { char: "T", phonetic: "ti" },
          { char: "U", phonetic: "ou" }, { char: "V", phonetic: "vou" },
          { char: "Z", phonetic: "dzèta" },
        ],
      },
      {
        title: "Pièges prononciation", shortTitle: "Pièges",
        chars: [
          { char: "CE CI", phonetic: "tché tchi", example: "cena, cinema" },
          { char: "CA CO", phonetic: "ka ko", example: "casa, cosa" },
          { char: "CHE", phonetic: "ké", example: "che, chiave" },
          { char: "GE GI", phonetic: "djé dji", example: "gelato, giro" },
          { char: "GHE", phonetic: "gué", example: "spaghetti" },
          { char: "GLI", phonetic: "lli", example: "famiglia" },
          { char: "GN", phonetic: "gn", example: "gnocchi, bagno" },
          { char: "SC+E", phonetic: "ch", example: "scena, uscire" },
          { char: "SC+A", phonetic: "sk", example: "scala, scuola" },
        ],
      },
    ],
  },
  anglais: {
    label: "English alphabet",
    groups: [
      {
        title: "Alphabet (26)", shortTitle: "A-Z",
        chars: [
          { char: "A", phonetic: "éi" }, { char: "B", phonetic: "bi" },
          { char: "C", phonetic: "si" }, { char: "D", phonetic: "di" },
          { char: "E", phonetic: "i" }, { char: "F", phonetic: "èf" },
          { char: "G", phonetic: "dji" }, { char: "H", phonetic: "éitch" },
          { char: "I", phonetic: "aï" }, { char: "J", phonetic: "djéi" },
          { char: "K", phonetic: "kéi" }, { char: "L", phonetic: "èl" },
          { char: "M", phonetic: "èm" }, { char: "N", phonetic: "èn" },
          { char: "O", phonetic: "ôou" }, { char: "P", phonetic: "pi" },
          { char: "Q", phonetic: "kiou" }, { char: "R", phonetic: "ar" },
          { char: "S", phonetic: "ès" }, { char: "T", phonetic: "ti" },
          { char: "U", phonetic: "iou" }, { char: "V", phonetic: "vi" },
          { char: "W", phonetic: "deub-liou" }, { char: "X", phonetic: "èks" },
          { char: "Y", phonetic: "ouaï" }, { char: "Z", phonetic: "zèd" },
        ],
      },
      {
        title: "Sons difficiles", shortTitle: "Sons",
        chars: [
          { char: "TH", phonetic: "langue entre les dents", example: "the, think" },
          { char: "H", phonetic: "souffle (aspiré)", example: "hello, house" },
          { char: "W", phonetic: "ou-a (lèvres rondes)", example: "water, what" },
          { char: "R", phonetic: "langue ne touche pas", example: "red, right" },
          { char: "-ING", phonetic: "ng nasal", example: "going, eating" },
          { char: "Schwa", phonetic: "/ə/ eu très court", example: "about, banana" },
        ],
      },
    ],
  },
};

export function AlphabetSidebar({
  langKey,
  color,
  collapsible = false,
}: {
  langKey: string;
  color: string;
  collapsible?: boolean;
}) {
  const [activeGroup, setActiveGroup] = useState(0);
  const [isOpen, setIsOpen] = useState(!collapsible);

  const data = alphabetData[langKey];
  if (!data) return null;

  const content = (
    <>
      {/* Tabs */}
      <div className="flex gap-1.5 mb-3">
        {data.groups.map((group, idx) => (
          <button
            key={idx}
            onClick={() => setActiveGroup(idx)}
            className={`flex-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold border-none cursor-pointer transition-all leading-tight ${
              activeGroup === idx
                ? 'text-white'
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
            style={activeGroup === idx ? { background: color } : {}}
          >
            {group.shortTitle}
          </button>
        ))}
      </div>

      {/* Grille */}
      <div className="flex flex-col gap-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 scrollbar-thin">
        {data.groups[activeGroup]?.chars.map((c, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span
              className="text-lg font-bold w-8 text-center flex-shrink-0 leading-none"
              style={{ color }}
            >
              {c.char}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1">
                {c.name && (
                  <span className="text-[11px] font-semibold text-gray-700">{c.name}</span>
                )}
                <span className="text-[10px] text-gray-400">[{c.phonetic}]</span>
              </div>
              {c.example && (
                <p className="text-[10px] text-gray-400 truncate leading-tight mt-0.5">{c.example}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );

  if (collapsible) {
    return (
      <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-3 p-4 bg-transparent border-none cursor-pointer text-left hover:bg-gray-50/50 transition-colors"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
            style={{ background: `${color}12`, color }}
          >
            {langKey === 'coreen' ? 'ㄱ' : 'Aa'}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold" style={{ color }}>{data.label}</p>
            <p className="text-[10px] text-gray-400">
              {isOpen ? 'Replier' : 'Voir l\'alphabet'}
            </p>
          </div>
          <span className={`text-gray-300 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
        </button>
        {isOpen && (
          <div className="px-4 pb-4 border-t border-black/5 pt-3">
            {content}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-black/5 p-4 overflow-hidden">
      {/* Label */}
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: `${color}12`, color }}
        >
          {langKey === 'coreen' ? 'ㄱ' : 'Aa'}
        </div>
        <p className="text-xs font-bold tracking-wide uppercase" style={{ color }}>
          {data.label}
        </p>
      </div>
      {content}
    </div>
  );
}
