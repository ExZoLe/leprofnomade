// ============================================================
// LeProfNomade — Thème voyage centralisé
// Toutes les données par pays : couleurs, aéroports, tampons,
// carnet de vocabulaire, faits. Un seul endroit à maintenir.
// ============================================================

export interface CountryTheme {
  // Identité
  city: string;
  country: string;
  flag: string;

  // Couleurs du pays (le cœur du système)
  primary: string;      // couleur dominante
  deep: string;         // version foncée (titres serif)
  soft: string;         // version très claire (fonds)
  accent: string;       // couleur secondaire du pays

  // Vol
  departureCode: string;   // PAR
  arrivalCode: string;     // ICN / FCO / LHR
  arrivalName: string;     // Séoul-Incheon...

  // Photo d'ambiance
  imageUrl: string;

  // Faits du pays
  facts: { label: string; value: string }[];

  // Un tampon de passeport par escale (index 0 = escale 1)
  stamps: { emoji: string; label: string }[];

  // Carnet : quelques mots-clés par escale (index 0 = escale 1)
  carnet: {
    words: { native: string; fr: string }[];
    culturalNote?: string;
  }[];
}

// Palette de base commune (fond kraft chaleureux)
export const palette = {
  pageBg: '#EFE7D9',   // fond de page — kraft doux (remplace le blanc)
  surface: '#FAF6F0',  // cartes — blanc cassé chaud, moins agressif
  cream: '#F5EDE3',
  sand: '#E8DDD0',
  ink: '#3D3D3F',
  inkSoft: '#8B7355',
  white: '#FFFFFF',
  success: '#6B7B3E',
  successSoft: '#A4B494',
  border: 'rgba(61,45,20,0.08)', // bordure chaude subtile
};

export const countryThemes: Record<string, CountryTheme> = {
  // ===================== CORÉE =====================
  coreen: {
    city: 'Séoul',
    country: 'Corée du Sud',
    flag: '🇰🇷',
    primary: '#C86E46',   // terracotta
    deep: '#8B4513',      // rust
    soft: '#C86E4614',
    accent: '#D6A23D',    // mustard en secondaire
    departureCode: 'PAR',
    arrivalCode: 'ICN',
    arrivalName: 'Séoul-Incheon',
    imageUrl: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=900&q=80&fit=crop',
    facts: [
      { label: 'Capitale', value: 'Séoul' },
      { label: 'Monnaie', value: '₩ Won' },
      { label: 'Population', value: '51,7 M' },
      { label: 'Alphabet', value: 'Hangul 한글' },
    ],
    stamps: [
      { emoji: '🈵', label: 'Hangul' },
      { emoji: '👋', label: 'Bonjour' },
      { emoji: '✈️', label: 'Incheon' },
      { emoji: '🚇', label: 'Métro' },
      { emoji: '🏨', label: 'Hôtel' },
      { emoji: '🏪', label: 'Konbini' },
      { emoji: '🍲', label: 'Resto' },
      { emoji: '🎎', label: 'Culture' },
      { emoji: '💊', label: 'Santé' },
      { emoji: '🎭', label: 'Sorties' },
      { emoji: '🤝', label: 'Rencontres' },
      { emoji: '🛫', label: 'Départ' },
    ],
    carnet: [
      { words: [{ native: '안녕하세요', fr: 'bonjour' }, { native: '감사합니다', fr: 'merci' }, { native: '네 / 아니요', fr: 'oui / non' }], culturalNote: 'Le Hangul a été inventé en 1443 pour que tout le monde puisse lire.' },
      { words: [{ native: '주세요', fr: 's’il vous plaît' }, { native: '얼마예요?', fr: 'combien ?' }, { native: '죄송합니다', fr: 'pardon' }], culturalNote: 'Le coréen a 7 niveaux de politesse. Le « -yo » final rend une phrase polie.' },
      { words: [{ native: '여권', fr: 'passeport' }, { native: '출구', fr: 'sortie' }, { native: '택시', fr: 'taxi' }], culturalNote: 'À Incheon, l’AREX rejoint Séoul en 43 min.' },
      { words: [{ native: '지하철', fr: 'métro' }, { native: '어디예요?', fr: 'où est ?' }, { native: '표', fr: 'ticket' }] },
      { words: [{ native: '예약', fr: 'réservation' }, { native: '방', fr: 'chambre' }, { native: '와이파이', fr: 'wifi' }] },
      { words: [{ native: '편의점', fr: 'supérette' }, { native: '물', fr: 'eau' }, { native: '봉투', fr: 'sac' }] },
      { words: [{ native: '맛있어요', fr: 'délicieux' }, { native: '메뉴', fr: 'menu' }, { native: '계산서', fr: 'addition' }] },
      { words: [{ native: '문화', fr: 'culture' }, { native: '감사', fr: 'gratitude' }, { native: '여행', fr: 'voyage' }] },
      { words: [{ native: '약국', fr: 'pharmacie' }, { native: '병원', fr: 'hôpital' }, { native: '열이 나요', fr: 'j’ai de la fièvre' }], culturalNote: 'Urgences : le 119 (médical/pompiers), le 112 (police). Les soins sont rapides et abordables.' },
      { words: [{ native: '표', fr: 'billet' }, { native: '매진', fr: 'complet' }, { native: '등산', fr: 'randonnée' }], culturalNote: 'En hanbok, l’entrée des palais est gratuite. La rando (등산) est le loisir national du week-end.' },
      { words: [{ native: '반가워요', fr: 'enchanté' }, { native: '취미', fr: 'hobby' }, { native: '카톡', fr: 'KakaoTalk' }], culturalNote: 'On échange son 카톡 (KakaoTalk), pas son numéro. Demander l’âge sert à ajuster la politesse.' },
      { words: [{ native: '분실물', fr: 'objet perdu' }, { native: '환전', fr: 'change' }, { native: '안녕히 가세요', fr: 'au revoir (à qui part)' }], culturalNote: '안녕히 가세요 (à celui qui part) vs 안녕히 계세요 (à celui qui reste) : deux adieux distincts.' },
    ],
  },

  // ===================== ITALIE =====================
  italien: {
    city: 'Rome',
    country: 'Italie',
    flag: '🇮🇹',
    primary: '#6B7B3E',   // olive
    deep: '#4F5E2C',
    soft: '#6B7B3E14',
    accent: '#A4B494',    // sage
    departureCode: 'PAR',
    arrivalCode: 'FCO',
    arrivalName: 'Rome-Fiumicino',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&q=80&fit=crop',
    facts: [
      { label: 'Capitale', value: 'Rome' },
      { label: 'Monnaie', value: '€ Euro' },
      { label: 'Population', value: '58,9 M' },
      { label: 'Langue', value: 'Italiano' },
    ],
    stamps: [
      { emoji: '🔤', label: 'Alfabeto' },
      { emoji: '👋', label: 'Ciao' },
      { emoji: '✈️', label: 'Aeroporto' },
      { emoji: '🚆', label: 'Treni' },
      { emoji: '🏨', label: 'Hotel' },
      { emoji: '🛒', label: 'Mercato' },
      { emoji: '🍝', label: 'Ristorante' },
      { emoji: '☕', label: 'Aperitivo' },
      { emoji: '💊', label: 'Salute' },
      { emoji: '🎭', label: 'Uscite' },
      { emoji: '🤝', label: 'Amicizia' },
      { emoji: '🛫', label: 'Partenza' },
    ],
    carnet: [
      { words: [{ native: 'ciao', fr: 'salut' }, { native: 'grazie', fr: 'merci' }, { native: 'per favore', fr: 's’il te plaît' }], culturalNote: 'L’italien est quasi phonétique : ce que tu lis, tu le prononces.' },
      { words: [{ native: 'come ti chiami?', fr: 'comment t’appelles-tu ?' }, { native: 'piacere', fr: 'enchanté' }, { native: 'sono francese', fr: 'je suis français' }], culturalNote: 'Scusa (tu) vs Scusi (vous) : la politesse change le mot.' },
      { words: [{ native: 'biglietto', fr: 'billet' }, { native: 'uscita', fr: 'sortie' }, { native: 'quanto costa?', fr: 'combien ?' }], culturalNote: 'Au café, « pronto » ne se dit qu’au téléphone.' },
      { words: [{ native: 'binario', fr: 'quai' }, { native: 'convalidare', fr: 'composter' }, { native: 'a che ora?', fr: 'à quelle heure ?' }], culturalNote: 'Composte ton billet papier, sinon 50 € d’amende.' },
      { words: [{ native: 'prenotazione', fr: 'réservation' }, { native: 'colazione', fr: 'petit-déj' }, { native: 'non funziona', fr: 'ça ne marche pas' }] },
      { words: [{ native: 'un etto', fr: '100 g' }, { native: 'basta così', fr: 'c’est tout' }, { native: 'quanto viene?', fr: 'ça fait combien ?' }] },
      { words: [{ native: 'un tavolo', fr: 'une table' }, { native: 'il conto', fr: 'l’addition' }, { native: 'senza', fr: 'sans' }] },
      { words: [{ native: 'un caffè', fr: 'un café' }, { native: 'cin cin!', fr: 'santé !' }, { native: 'gelato', fr: 'glace' }], culturalNote: 'Pas de cappuccino après 11 h — règle sacrée.' },
      { words: [{ native: 'farmacia', fr: 'pharmacie' }, { native: 'ho mal di...', fr: 'j’ai mal à...' }, { native: 'la febbre', fr: 'la fièvre' }], culturalNote: 'Urgence : le 112 (numéro européen unique). La croix verte signale la farmacia.' },
      { words: [{ native: 'biglietto ridotto', fr: 'tarif réduit' }, { native: 'tutto esaurito', fr: 'complet' }, { native: 'ti va di...?', fr: 'ça te dit de... ?' }], culturalNote: 'Réserve les grands musées à l’avance : les files sont légendaires.' },
      { words: [{ native: 'di dove sei?', fr: 'd’où viens-tu ?' }, { native: 'mi piace', fr: 'j’aime' }, { native: 'secondo me', fr: 'selon moi' }], culturalNote: 'Mi piace (singulier) vs mi piacciono (pluriel) : l’accord suit ce qui plaît.' },
      { words: [{ native: 'oggetti smarriti', fr: 'objets trouvés' }, { native: 'vorrei', fr: 'je voudrais' }, { native: 'arrivederci', fr: 'au revoir' }], culturalNote: 'Arrivederci (on se reverra) est plus doux qu’addio (adieu définitif).' },
    ],
  },

  // ===================== ANGLETERRE =====================
  anglais: {
    city: 'Londres',
    country: 'Royaume-Uni',
    flag: '🇬🇧',
    primary: '#D6A23D',   // mustard
    deep: '#8B6914',
    soft: '#D6A23D14',
    accent: '#5B3A30',    // deep brown
    departureCode: 'PAR',
    arrivalCode: 'LHR',
    arrivalName: 'London-Heathrow',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=80&fit=crop',
    facts: [
      { label: 'Capitale', value: 'Londres' },
      { label: 'Monnaie', value: '£ Pound' },
      { label: 'Population', value: '67,7 M' },
      { label: 'Langue', value: 'English' },
    ],
    stamps: [
      { emoji: '🔤', label: 'Alphabet' },
      { emoji: '👋', label: 'Small talk' },
      { emoji: '✈️', label: 'Heathrow' },
      { emoji: '🚇', label: 'The Tube' },
      { emoji: '🏨', label: 'B&B' },
      { emoji: '🛍️', label: 'Shopping' },
      { emoji: '🍺', label: 'Pub' },
      { emoji: '☕', label: 'Tea time' },
      { emoji: '💊', label: 'Health' },
      { emoji: '🎭', label: 'Out & about' },
      { emoji: '🤝', label: 'Friends' },
      { emoji: '🛫', label: 'Departure' },
    ],
    carnet: [
      { words: [{ native: 'hello', fr: 'bonjour' }, { native: 'thanks / cheers', fr: 'merci' }, { native: 'sorry?', fr: 'pardon ?' }], culturalNote: 'L’anglais n’est PAS phonétique : le « a » a 5 sons différents.' },
      { words: [{ native: 'how’s it going?', fr: 'ça va ?' }, { native: 'lovely', fr: 'super' }, { native: 'mate', fr: 'pote' }], culturalNote: 'Un Britannique dit « sorry » ~8 fois par jour.' },
      { words: [{ native: 'passport control', fr: 'immigration' }, { native: 'way out', fr: 'sortie' }, { native: 'top up', fr: 'recharger' }], culturalNote: 'Oyster card = la carte de transport de Londres.' },
      { words: [{ native: 'mind the gap', fr: 'attention à l’espace' }, { native: 'single', fr: 'aller simple' }, { native: 'platform', fr: 'quai' }] },
      { words: [{ native: 'ground floor', fr: 'rez-de-chaussée' }, { native: 'kettle', fr: 'bouilloire' }, { native: 'lift', fr: 'ascenseur' }] },
      { words: [{ native: 'a tenner', fr: 'billet de 10 £' }, { native: 'here you go', fr: 'tenez' }, { native: 'quid', fr: 'livre (£)' }] },
      { words: [{ native: 'a pint', fr: 'une pinte' }, { native: 'my round', fr: 'ma tournée' }, { native: 'last orders', fr: 'dernières commandes' }], culturalNote: 'Au pub, on commande au bar. Et on paie sa tournée.' },
      { words: [{ native: 'fancy a cuppa?', fr: 'un thé ?' }, { native: 'take away', fr: 'à emporter' }, { native: 'brilliant', fr: 'génial' }] },
      { words: [{ native: 'the chemist’s', fr: 'la pharmacie' }, { native: 'painkillers', fr: 'antidouleurs' }, { native: 'under the weather', fr: 'patraque' }], culturalNote: 'Urgence : le 999. Le pharmacien (chemist) conseille sans ordonnance pour les petits maux.' },
      { words: [{ native: 'sold out', fr: 'complet' }, { native: 'do you fancy...?', fr: 'ça te dit... ?' }, { native: 'the West End', fr: 'quartier des théâtres' }], culturalNote: 'Beaucoup de grands musées londoniens sont gratuits (un don est apprécié).' },
      { words: [{ native: 'I’m into...', fr: 'je suis fan de...' }, { native: 'I reckon', fr: 'je trouve' }, { native: 'keep in touch', fr: 'rester en contact' }], culturalNote: 'Have you ever...? ouvre sur l’expérience. On échange volontiers ses « socials ».' },
      { words: [{ native: 'lost property', fr: 'objets trouvés' }, { native: 'a stamp', fr: 'un timbre' }, { native: 'safe travels', fr: 'bon voyage' }], culturalNote: 'Se plaindre à la britannique : ferme mais poli — « I’m sorry to bother you, but... ».' },
    ],
  },
};

export function getTheme(langKey: string): CountryTheme | null {
  return countryThemes[langKey] ?? null;
}