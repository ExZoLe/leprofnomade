'use client';

import { useState, useCallback } from 'react';

// ===== SPEECH HELPER =====
function speak(text: string, lang: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  
  // Stop any current speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.75; // Plus lent pour bien entendre
  utterance.pitch = 1;
  utterance.volume = 1;
  
  // Try to find the best voice for this language
  const voices = window.speechSynthesis.getVoices();
  const langVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
  if (langVoice) utterance.voice = langVoice;
  
  window.speechSynthesis.speak(utterance);
}

// Map langKey to BCP-47 speech lang codes
const speechLangs: Record<string, string> = {
  coreen: 'ko-KR',
  italien: 'it-IT',
  anglais: 'en-GB',
};

// ===== PLAY BUTTON COMPONENT =====
function PlayButton({ 
  text, 
  langKey, 
  color,
  size = 'sm',
}: { 
  text: string; 
  langKey: string; 
  color: string;
  size?: 'sm' | 'md';
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    
    const lang = speechLangs[langKey] || 'en-GB';
    
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.75;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      const voices = window.speechSynthesis.getVoices();
      const langVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
      if (langVoice) utterance.voice = langVoice;
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
      
      // Fallback timeout in case onend doesn't fire
      setTimeout(() => setIsPlaying(false), 3000);
    }
  }, [text, langKey]);

  const dims = size === 'md' ? 'w-7 h-7 text-sm' : 'w-5 h-5 text-[10px]';

  return (
    <button
      onClick={handlePlay}
      className={`${dims} rounded-full flex items-center justify-center border-none cursor-pointer transition-all flex-shrink-0 ${
        isPlaying 
          ? 'scale-110' 
          : 'hover:scale-110'
      }`}
      style={{
        background: isPlaying ? color : `${color}15`,
        color: isPlaying ? '#fff' : color,
      }}
      title={`Écouter "${text}"`}
      aria-label={`Écouter la prononciation de ${text}`}
    >
      {isPlaying ? '◼' : '▶'}
    </button>
  );
}

// ===== DATA =====

interface AlphabetChar {
  char: string;
  name?: string;
  phonetic: string;
  speakText: string; // What to actually say via TTS
  example?: string;
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
          { char: "ㄱ", name: "giyeok", phonetic: "g/k", speakText: "기역" },
          { char: "ㄴ", name: "nieun", phonetic: "n", speakText: "니은" },
          { char: "ㄷ", name: "digeut", phonetic: "d/t", speakText: "디귿" },
          { char: "ㄹ", name: "rieul", phonetic: "r/l", speakText: "리을" },
          { char: "ㅁ", name: "mieum", phonetic: "m", speakText: "미음" },
          { char: "ㅂ", name: "bieup", phonetic: "b/p", speakText: "비읍" },
          { char: "ㅅ", name: "siot", phonetic: "s", speakText: "시옷" },
          { char: "ㅇ", name: "ieung", phonetic: "—/ng", speakText: "이응" },
          { char: "ㅈ", name: "jieut", phonetic: "j", speakText: "지읒" },
          { char: "ㅊ", name: "chieut", phonetic: "tch", speakText: "치읓" },
          { char: "ㅋ", name: "kieuk", phonetic: "k", speakText: "키읔" },
          { char: "ㅌ", name: "tieut", phonetic: "t", speakText: "티읕" },
          { char: "ㅍ", name: "pieup", phonetic: "p", speakText: "피읖" },
          { char: "ㅎ", name: "hieut", phonetic: "h", speakText: "히읗" },
        ],
      },
      {
        title: "Voyelles (모음)", shortTitle: "모음",
        chars: [
          { char: "ㅏ", phonetic: "a", speakText: "아" },
          { char: "ㅑ", phonetic: "ya", speakText: "야" },
          { char: "ㅓ", phonetic: "eo", speakText: "어" },
          { char: "ㅕ", phonetic: "yeo", speakText: "여" },
          { char: "ㅗ", phonetic: "o", speakText: "오" },
          { char: "ㅛ", phonetic: "yo", speakText: "요" },
          { char: "ㅜ", phonetic: "ou", speakText: "우" },
          { char: "ㅠ", phonetic: "you", speakText: "유" },
          { char: "ㅡ", phonetic: "eu", speakText: "으" },
          { char: "ㅣ", phonetic: "i", speakText: "이" },
        ],
      },
      {
        title: "Syllabes (조합)", shortTitle: "조합",
        chars: [
          { char: "가", phonetic: "ga", speakText: "가", example: "ㄱ+ㅏ" },
          { char: "한", phonetic: "han", speakText: "한", example: "ㅎ+ㅏ+ㄴ" },
          { char: "글", phonetic: "geul", speakText: "글", example: "ㄱ+ㅡ+ㄹ" },
          { char: "서", phonetic: "seo", speakText: "서", example: "ㅅ+ㅓ" },
          { char: "울", phonetic: "ul", speakText: "울", example: "ㅇ+ㅜ+ㄹ" },
          { char: "밥", phonetic: "bap", speakText: "밥", example: "ㅂ+ㅏ+ㅂ" },
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
          { char: "A", phonetic: "a", speakText: "a" },
          { char: "B", phonetic: "bi", speakText: "bi" },
          { char: "C", phonetic: "tchi", speakText: "ci" },
          { char: "D", phonetic: "di", speakText: "di" },
          { char: "E", phonetic: "é", speakText: "e" },
          { char: "F", phonetic: "èffé", speakText: "effe" },
          { char: "G", phonetic: "dji", speakText: "gi" },
          { char: "H", phonetic: "akka", speakText: "acca", example: "muet !" },
          { char: "I", phonetic: "i", speakText: "i" },
          { char: "L", phonetic: "èllé", speakText: "elle" },
          { char: "M", phonetic: "èmmé", speakText: "emme" },
          { char: "N", phonetic: "ènné", speakText: "enne" },
          { char: "O", phonetic: "o", speakText: "o" },
          { char: "P", phonetic: "pi", speakText: "pi" },
          { char: "Q", phonetic: "kou", speakText: "cu" },
          { char: "R", phonetic: "èrré", speakText: "erre", example: "roulé !" },
          { char: "S", phonetic: "èssé", speakText: "esse" },
          { char: "T", phonetic: "ti", speakText: "ti" },
          { char: "U", phonetic: "ou", speakText: "u" },
          { char: "V", phonetic: "vou", speakText: "vu" },
          { char: "Z", phonetic: "dzèta", speakText: "zeta" },
        ],
      },
      {
        title: "Pièges prononciation", shortTitle: "Pièges",
        chars: [
          { char: "CE CI", phonetic: "tché tchi", speakText: "ce, ci", example: "cena, cinema" },
          { char: "CA CO", phonetic: "ka ko", speakText: "ca, co", example: "casa, cosa" },
          { char: "CHE", phonetic: "ké", speakText: "che", example: "che, chiave" },
          { char: "GE GI", phonetic: "djé dji", speakText: "ge, gi", example: "gelato, giro" },
          { char: "GHE", phonetic: "gué", speakText: "ghe", example: "spaghetti" },
          { char: "GLI", phonetic: "lli", speakText: "gli", example: "famiglia" },
          { char: "GN", phonetic: "gn", speakText: "gn", example: "gnocchi, bagno" },
          { char: "SC+E", phonetic: "ch", speakText: "sce", example: "scena, uscire" },
          { char: "SC+A", phonetic: "sk", speakText: "sca", example: "scala, scuola" },
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
          { char: "A", phonetic: "éi", speakText: "A" },
          { char: "B", phonetic: "bi", speakText: "B" },
          { char: "C", phonetic: "si", speakText: "C" },
          { char: "D", phonetic: "di", speakText: "D" },
          { char: "E", phonetic: "i", speakText: "E" },
          { char: "F", phonetic: "èf", speakText: "F" },
          { char: "G", phonetic: "dji", speakText: "G" },
          { char: "H", phonetic: "éitch", speakText: "H" },
          { char: "I", phonetic: "aï", speakText: "I" },
          { char: "J", phonetic: "djéi", speakText: "J" },
          { char: "K", phonetic: "kéi", speakText: "K" },
          { char: "L", phonetic: "èl", speakText: "L" },
          { char: "M", phonetic: "èm", speakText: "M" },
          { char: "N", phonetic: "èn", speakText: "N" },
          { char: "O", phonetic: "ôou", speakText: "O" },
          { char: "P", phonetic: "pi", speakText: "P" },
          { char: "Q", phonetic: "kiou", speakText: "Q" },
          { char: "R", phonetic: "ar", speakText: "R" },
          { char: "S", phonetic: "ès", speakText: "S" },
          { char: "T", phonetic: "ti", speakText: "T" },
          { char: "U", phonetic: "iou", speakText: "U" },
          { char: "V", phonetic: "vi", speakText: "V" },
          { char: "W", phonetic: "deub-liou", speakText: "W" },
          { char: "X", phonetic: "èks", speakText: "X" },
          { char: "Y", phonetic: "ouaï", speakText: "Y" },
          { char: "Z", phonetic: "zèd", speakText: "Z" },
        ],
      },
      {
        title: "Sons difficiles", shortTitle: "Sons",
        chars: [
          { char: "TH", phonetic: "langue entre les dents", speakText: "the, think, three", example: "the, think" },
          { char: "H", phonetic: "souffle (aspiré)", speakText: "hello, house, happy", example: "hello, house" },
          { char: "W", phonetic: "ou-a (lèvres rondes)", speakText: "water, what, well", example: "water, what" },
          { char: "R", phonetic: "langue ne touche pas", speakText: "red, right, around", example: "red, right" },
          { char: "-ING", phonetic: "ng nasal", speakText: "going, eating, learning", example: "going, eating" },
          { char: "Schwa", phonetic: "/ə/ eu très court", speakText: "about, banana, the", example: "about, banana" },
        ],
      },
    ],
  },
};

// ===== MAIN COMPONENT =====

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

  const playAll = useCallback(() => {
    const chars = data.groups[activeGroup]?.chars;
    if (!chars || chars.length === 0) return;
    
    const lang = speechLangs[langKey] || 'en-GB';
    
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    let index = 0;
    const speakNext = () => {
      if (index >= chars.length) return;
      const c = chars[index];
      const utterance = new SpeechSynthesisUtterance(c.speakText);
      utterance.lang = lang;
      utterance.rate = 0.65;
      utterance.pitch = 1;
      
      const voices = window.speechSynthesis.getVoices();
      const langVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
      if (langVoice) utterance.voice = langVoice;
      
      utterance.onend = () => {
        index++;
        setTimeout(speakNext, 400); // Pause between letters
      };
      
      window.speechSynthesis.speak(utterance);
    };
    speakNext();
  }, [data, activeGroup, langKey]);

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

      {/* Play All button */}
      <button
        onClick={playAll}
        className="w-full flex items-center justify-center gap-2 py-2 mb-3 rounded-lg border-none cursor-pointer text-[11px] font-semibold transition-all hover:opacity-80"
        style={{ background: `${color}10`, color }}
      >
        <span>▶</span>
        Écouter tout
      </button>

      {/* Grille */}
      <div className="flex flex-col gap-0.5 max-h-[calc(100vh-280px)] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
        {data.groups[activeGroup]?.chars.map((c, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            {/* Character */}
            <span
              className="text-lg font-bold w-8 text-center flex-shrink-0 leading-none"
              style={{ color }}
            >
              {c.char}
            </span>

            {/* Info */}
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

            {/* Play button */}
            <PlayButton text={c.speakText} langKey={langKey} color={color} />
          </div>
        ))}
      </div>
    </>
  );

  // ===== COLLAPSIBLE VERSION (mobile) =====
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
              {isOpen ? 'Replier' : 'Voir l\'alphabet et écouter la prononciation'}
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

  // ===== STICKY VERSION (desktop) =====
  return (
    <div className="bg-white rounded-xl border border-black/5 p-4 overflow-hidden">
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
