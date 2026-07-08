'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

// ============================================================
// AlphabetSidebar — corrige le chevauchement IT/EN.
//   • Coréen  : liste détaillée (nom + phonétique + audio)
//   • IT / EN : grille compacte 3 colonnes (plus de débordement)
// Audio : MP3 locaux /audio/alphabet/*.mp3 (ElevenLabs).
// Chanson : embed YouTube en modale. Couleurs = thème du pays.
// ============================================================

const alphabetSongs: Record<string, { title: string; subtitle: string; youtubeId: string }> = {
  coreen: { title: '가나다 송', subtitle: 'La chanson du Hangul', youtubeId: 'oH_82As0g-8' },
  italien: { title: "Canzone dell'Alfabeto", subtitle: "L'alphabet italien en chanson", youtubeId: 'A7_IyjPjzn0' },
  anglais: { title: 'ABC Song (British)', subtitle: 'Version UK avec « zed »', youtubeId: 'XC6wQQHo8uU' },
};

function SongModal({ song, color, onClose }: { song: { title: string; subtitle: string; youtubeId: string }; color: string; onClose: () => void; }) {
  const [mounted, setMounted] = useState(false);

  // Verrouille le scroll de la page + monte le portal côté client
  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 2147483647 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl overflow-hidden w-full max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold" style={{ color }}>🎵 {song.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{song.subtitle}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 border-none cursor-pointer text-sm">✕</button>
        </div>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${song.youtubeId}?rel=0`} title={song.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ border: 'none' }} />
        </div>
        <div className="p-3 text-center">
          <p className="text-[10px] text-gray-400">Chante avec la vidéo pour mémoriser plus vite 🎤</p>
        </div>
      </div>
    </div>,
    document.body
  );
}

function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const play = useCallback((id: string) => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    const audio = new Audio(`/audio/alphabet/${id}.mp3`);
    audioRef.current = audio;
    setPlayingId(id);
    audio.onended = () => setPlayingId(null);
    audio.onerror = () => setPlayingId(null);
    audio.play().catch(() => setPlayingId(null));
  }, []);
  const stop = useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    setPlayingId(null);
  }, []);
  return { play, stop, playingId };
}

interface AChar { char: string; name?: string; phonetic: string; audioId: string; example?: string; }
interface AGroup { shortTitle: string; layout: 'list' | 'grid'; chars: AChar[]; }

const alphabetData: Record<string, { label: string; groups: AGroup[] }> = {
  coreen: {
    label: 'Hangul 한글',
    groups: [
      { shortTitle: '자음', layout: 'list', chars: [
        { char: 'ㄱ', name: 'giyeok', phonetic: 'g/k', audioId: 'kr-giyeok' },
        { char: 'ㄴ', name: 'nieun', phonetic: 'n', audioId: 'kr-nieun' },
        { char: 'ㄷ', name: 'digeut', phonetic: 'd/t', audioId: 'kr-digeut' },
        { char: 'ㄹ', name: 'rieul', phonetic: 'r/l', audioId: 'kr-rieul' },
        { char: 'ㅁ', name: 'mieum', phonetic: 'm', audioId: 'kr-mieum' },
        { char: 'ㅂ', name: 'bieup', phonetic: 'b/p', audioId: 'kr-bieup' },
        { char: 'ㅅ', name: 'siot', phonetic: 's', audioId: 'kr-siot' },
        { char: 'ㅇ', name: 'ieung', phonetic: '—/ng', audioId: 'kr-ieung' },
        { char: 'ㅈ', name: 'jieut', phonetic: 'j', audioId: 'kr-jieut' },
        { char: 'ㅊ', name: 'chieut', phonetic: 'tch', audioId: 'kr-chieut' },
        { char: 'ㅋ', name: 'kieuk', phonetic: 'k', audioId: 'kr-kieuk' },
        { char: 'ㅌ', name: 'tieut', phonetic: 't', audioId: 'kr-tieut' },
        { char: 'ㅍ', name: 'pieup', phonetic: 'p', audioId: 'kr-pieup2' },
        { char: 'ㅎ', name: 'hieut', phonetic: 'h', audioId: 'kr-hieut' },
      ]},
      { shortTitle: '모음', layout: 'list', chars: [
        { char: 'ㅏ', phonetic: 'a', audioId: 'kr-a' }, { char: 'ㅑ', phonetic: 'ya', audioId: 'kr-ya' },
        { char: 'ㅓ', phonetic: 'eo', audioId: 'kr-eo' }, { char: 'ㅕ', phonetic: 'yeo', audioId: 'kr-yeo' },
        { char: 'ㅗ', phonetic: 'o', audioId: 'kr-o' }, { char: 'ㅛ', phonetic: 'yo', audioId: 'kr-yo' },
        { char: 'ㅜ', phonetic: 'ou', audioId: 'kr-u' }, { char: 'ㅠ', phonetic: 'you', audioId: 'kr-yu' },
        { char: 'ㅡ', phonetic: 'eu', audioId: 'kr-eu' }, { char: 'ㅣ', phonetic: 'i', audioId: 'kr-i' },
      ]},
      { shortTitle: '조합', layout: 'list', chars: [
        { char: '가', phonetic: 'ga', audioId: 'kr-ga', example: 'ㄱ+ㅏ' },
        { char: '한', phonetic: 'han', audioId: 'kr-han', example: 'ㅎ+ㅏ+ㄴ' },
        { char: '글', phonetic: 'geul', audioId: 'kr-geul', example: 'ㄱ+ㅡ+ㄹ' },
        { char: '서', phonetic: 'seo', audioId: 'kr-seo', example: 'ㅅ+ㅓ' },
        { char: '울', phonetic: 'ul', audioId: 'kr-ul', example: 'ㅇ+ㅜ+ㄹ' },
        { char: '밥', phonetic: 'bap', audioId: 'kr-bap', example: 'ㅂ+ㅏ+ㅂ' },
      ]},
    ],
  },
  italien: {
    label: 'Alfabeto',
    groups: [
      { shortTitle: 'A-Z', layout: 'grid', chars: [
        { char: 'A', phonetic: 'a', audioId: 'it-a' }, { char: 'B', phonetic: 'bi', audioId: 'it-b' },
        { char: 'C', phonetic: 'tchi', audioId: 'it-c' }, { char: 'D', phonetic: 'di', audioId: 'it-d' },
        { char: 'E', phonetic: 'é', audioId: 'it-e' }, { char: 'F', phonetic: 'èffé', audioId: 'it-f' },
        { char: 'G', phonetic: 'dji', audioId: 'it-g' }, { char: 'H', phonetic: 'akka', audioId: 'it-h' },
        { char: 'I', phonetic: 'i', audioId: 'it-i' }, { char: 'L', phonetic: 'èllé', audioId: 'it-l' },
        { char: 'M', phonetic: 'èmmé', audioId: 'it-m' }, { char: 'N', phonetic: 'ènné', audioId: 'it-n' },
        { char: 'O', phonetic: 'o', audioId: 'it-o' }, { char: 'P', phonetic: 'pi', audioId: 'it-p' },
        { char: 'Q', phonetic: 'kou', audioId: 'it-q' }, { char: 'R', phonetic: 'èrré', audioId: 'it-r' },
        { char: 'S', phonetic: 'èssé', audioId: 'it-s' }, { char: 'T', phonetic: 'ti', audioId: 'it-t' },
        { char: 'U', phonetic: 'ou', audioId: 'it-u' }, { char: 'V', phonetic: 'vou', audioId: 'it-v' },
        { char: 'Z', phonetic: 'dzèta', audioId: 'it-z' },
      ]},
      { shortTitle: 'Pièges', layout: 'list', chars: [
        { char: 'CE CI', phonetic: 'tché tchi', audioId: 'it-ce-ci', example: 'cena, cinema' },
        { char: 'CA CO', phonetic: 'ka ko', audioId: 'it-ca-co', example: 'casa, cosa' },
        { char: 'CHE', phonetic: 'ké', audioId: 'it-che', example: 'chiave' },
        { char: 'GE GI', phonetic: 'djé dji', audioId: 'it-ge-gi', example: 'gelato' },
        { char: 'GHE', phonetic: 'gué', audioId: 'it-ghe', example: 'spaghetti' },
        { char: 'GLI', phonetic: 'lli', audioId: 'it-gli', example: 'famiglia' },
        { char: 'GN', phonetic: 'gn', audioId: 'it-gn', example: 'gnocchi' },
        { char: 'SC+E', phonetic: 'ch', audioId: 'it-sce', example: 'scena' },
        { char: 'SC+A', phonetic: 'sk', audioId: 'it-sca', example: 'scala' },
      ]},
    ],
  },
  anglais: {
    label: 'Alphabet',
    groups: [
      { shortTitle: 'A-Z', layout: 'grid', chars: [
        { char: 'A', phonetic: 'éi', audioId: 'en-a' }, { char: 'B', phonetic: 'bi', audioId: 'en-b' },
        { char: 'C', phonetic: 'si', audioId: 'en-c' }, { char: 'D', phonetic: 'di', audioId: 'en-d' },
        { char: 'E', phonetic: 'i', audioId: 'en-e' }, { char: 'F', phonetic: 'èf', audioId: 'en-f' },
        { char: 'G', phonetic: 'dji', audioId: 'en-g' }, { char: 'H', phonetic: 'éitch', audioId: 'en-h' },
        { char: 'I', phonetic: 'aï', audioId: 'en-i' }, { char: 'J', phonetic: 'djéi', audioId: 'en-j' },
        { char: 'K', phonetic: 'kéi', audioId: 'en-k' }, { char: 'L', phonetic: 'èl', audioId: 'en-l' },
        { char: 'M', phonetic: 'èm', audioId: 'en-m' }, { char: 'N', phonetic: 'èn', audioId: 'en-n' },
        { char: 'O', phonetic: 'ôou', audioId: 'en-o' }, { char: 'P', phonetic: 'pi', audioId: 'en-p' },
        { char: 'Q', phonetic: 'kiou', audioId: 'en-q' }, { char: 'R', phonetic: 'ar', audioId: 'en-r' },
        { char: 'S', phonetic: 'ès', audioId: 'en-s' }, { char: 'T', phonetic: 'ti', audioId: 'en-t' },
        { char: 'U', phonetic: 'iou', audioId: 'en-u' }, { char: 'V', phonetic: 'vi', audioId: 'en-v' },
        { char: 'W', phonetic: 'd-liou', audioId: 'en-w' }, { char: 'X', phonetic: 'èks', audioId: 'en-x' },
        { char: 'Y', phonetic: 'ouaï', audioId: 'en-y' }, { char: 'Z', phonetic: 'zèd', audioId: 'en-z' },
      ]},
      { shortTitle: 'Sons', layout: 'list', chars: [
        { char: 'TH', phonetic: 'langue entre les dents', audioId: 'en-th', example: 'the, think' },
        { char: 'H', phonetic: 'souffle aspiré', audioId: 'en-h-asp', example: 'hello, house' },
        { char: 'W', phonetic: 'ou-a', audioId: 'en-w-snd', example: 'water, what' },
        { char: 'R', phonetic: 'langue ne touche pas', audioId: 'en-r-snd', example: 'red, right' },
        { char: '-ING', phonetic: 'ng nasal', audioId: 'en-ing', example: 'going' },
        { char: 'Schwa', phonetic: '/ə/ eu court', audioId: 'en-schwa', example: 'about, banana' },
      ]},
    ],
  },
};

export function AlphabetSidebar({ langKey, color, collapsible = false }: { langKey: string; color: string; collapsible?: boolean; }) {
  const [activeGroup, setActiveGroup] = useState(0);
  const [isOpen, setIsOpen] = useState(!collapsible);
  const [showSong, setShowSong] = useState(false);
  const { play, stop, playingId } = useAudioPlayer();

  const data = alphabetData[langKey];
  const song = alphabetSongs[langKey];
  if (!data) return null;
  const currentGroup = data.groups[activeGroup];

  const playAll = useCallback(() => {
    const chars = data.groups[activeGroup]?.chars;
    if (!chars?.length) return;
    stop();
    let index = 0;
    const next = () => {
      if (index >= chars.length) return;
      const audio = new Audio(`/audio/alphabet/${chars[index].audioId}.mp3`);
      audio.onended = () => { index++; setTimeout(next, 350); };
      audio.onerror = () => { index++; setTimeout(next, 150); };
      audio.play().catch(() => { index++; setTimeout(next, 150); });
    };
    next();
  }, [data, activeGroup, stop]);

  const renderGrid = (chars: AChar[]) => (
    <div className="grid grid-cols-3 gap-1 max-h-[calc(100vh-300px)] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
      {chars.map((c, idx) => (
        <button key={idx} onClick={() => play(c.audioId)}
          className="flex flex-col items-center py-2 px-1 rounded-lg hover:bg-[#F3ECE0] transition-colors cursor-pointer border-none bg-transparent"
          style={{ outline: playingId === c.audioId ? `2px solid ${color}` : 'none' }}
          title={`${c.char} [${c.phonetic}]`}>
          <span className="text-xl font-bold leading-none" style={{ color }}>{c.char}</span>
          <span className="text-[9px] text-gray-400 mt-1 leading-none">[{c.phonetic}]</span>
        </button>
      ))}
    </div>
  );

  const renderList = (chars: AChar[]) => (
    <div className="flex flex-col gap-0.5 max-h-[calc(100vh-300px)] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
      {chars.map((c, idx) => (
        <div key={idx} className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-[#F3ECE0] transition-colors">
          <span
            className="font-bold flex-shrink-0 leading-tight text-center"
            style={{ color, minWidth: '2.75rem', maxWidth: '3.5rem', fontSize: c.char.length > 3 ? '0.78rem' : '1.05rem' }}
          >
            {c.char}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col leading-tight">
              {c.name && <span className="text-[11px] font-semibold text-gray-700 leading-tight">{c.name}</span>}
              <span className="text-[10px] text-gray-400 leading-tight">[{c.phonetic}]</span>
            </div>
            {c.example && <p className="text-[10px] text-gray-400 truncate leading-tight mt-0.5">{c.example}</p>}
          </div>
          <button onClick={(e) => { e.stopPropagation(); play(c.audioId); }}
            className="w-5 h-5 rounded-full flex items-center justify-center border-none cursor-pointer flex-shrink-0 text-[10px] transition-transform hover:scale-110"
            style={{ background: playingId === c.audioId ? color : `${color}15`, color: playingId === c.audioId ? '#fff' : color }}
            aria-label="Écouter">
            {playingId === c.audioId ? '◼' : '▶'}
          </button>
        </div>
      ))}
    </div>
  );

  const content = (
    <>
      <div className="flex gap-1.5 mb-3">
        {data.groups.map((g, idx) => (
          <button key={idx} onClick={() => setActiveGroup(idx)}
            className={`flex-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold border-none cursor-pointer transition-all ${activeGroup === idx ? 'text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
            style={activeGroup === idx ? { background: color } : {}}>
            {g.shortTitle}
          </button>
        ))}
      </div>
      <div className="flex gap-1.5 mb-3">
        <button onClick={playAll} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border-none cursor-pointer text-[11px] font-semibold hover:opacity-80" style={{ background: `${color}10`, color }}>
          <span>▶</span> Tout
        </button>
        {song && (
          <button onClick={() => setShowSong(true)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border cursor-pointer text-[11px] font-semibold hover:shadow-sm" style={{ borderColor: `${color}30`, background: 'white', color }}>
            🎵 Chanson
          </button>
        )}
      </div>
      {showSong && song && <SongModal song={song} color={color} onClose={() => setShowSong(false)} />}
      {currentGroup?.layout === 'grid' ? renderGrid(currentGroup.chars) : renderList(currentGroup?.chars || [])}
    </>
  );

  if (collapsible) {
    return (
      <div className="bg-[#FAF6F0] rounded-2xl border border-[#3D2D1414] overflow-hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center gap-3 p-4 bg-transparent border-none cursor-pointer text-left hover:bg-gray-50/50">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ background: `${color}12`, color }}>
            {langKey === 'coreen' ? 'ㄱ' : 'Aa'}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold" style={{ color }}>{data.label}</p>
            <p className="text-[10px] text-gray-400">{isOpen ? 'Replier' : 'Alphabet et prononciation 🔊'}</p>
          </div>
          <span className={`text-gray-300 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
        </button>
        {isOpen && <div className="px-4 pb-4 border-t border-black/5 pt-3">{content}</div>}
      </div>
    );
  }

  return (
    <div className="bg-[#FAF6F0] rounded-2xl border border-[#3D2D1414] p-4">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: `${color}12`, color }}>
          {langKey === 'coreen' ? 'ㄱ' : 'Aa'}
        </div>
        <p className="text-xs font-bold tracking-wide uppercase" style={{ color }}>{data.label}</p>
      </div>
      {content}
    </div>
  );
}
