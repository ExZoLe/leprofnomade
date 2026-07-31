// ============================================================
// LeProfNomade — Bibliothèque d'images Unsplash centralisée
// Toutes les photos du site (hero, bannières pays, escales,
// leçons) vivent ici. Un seul endroit à maintenir.
// Chaque URL a été vérifiée (HTTP 200) au moment de l'ajout.
// Critères : lumière chaude, ambiance voyage, pas de visages
// identifiables en gros plan.
// ============================================================

const BASE = 'https://images.unsplash.com/';

// w=400 pour les vignettes, w=900 pour les bannières/héros
function u(id: string, w: 400 | 900): string {
  return `${BASE}${id}?w=${w}&q=80&fit=crop`;
}

// ---------- Hero de la page d'accueil ----------
export const heroImages = {
  // Flatlay appareil photo / carnet / sac — couverture du guide
  flatlay: u('photo-1488646953014-85cb44e25828', 900),
  // Aile d'avion au-dessus des nuages — l'envol
  wing: u('photo-1529947327457-8f5cb53bc1b6', 900),
  // Carnet de voyage, crayon — l'esprit carnet de route
  journal: u('photo-1452421822248-d4c2b47f0c81', 900),
};

// ---------- Bannières pays (dashboards, blog, cartes) ----------
// Mêmes visuels que travel-theme.ts pour la cohérence.
export const countryBanners: Record<string, string> = {
  coreen: u('photo-1538485399081-7191377e8241', 900),   // Gyeongbokgung
  italien: u('photo-1552832230-c0197dd311b5', 900),     // Colisée
  anglais: u('photo-1513635269975-59663e0ac1ad', 900),  // Londres
};

// ---------- Photos d'escales (index 0 = escale 1) ----------
export const escaleImages: Record<string, string[]> = {
  coreen: [
    u('photo-1643033237995-284236887811', 400), // 1 · Hangul — enseigne coréenne
    u('photo-1565837938839-c177e70af08f', 400), // 2 · Salutations — rue d'Insadong
    u('photo-1610870596605-d293eaf5a1ad', 400), // 3 · Incheon — avion au sol
    u('photo-1737969925456-ef52fbec2c55', 400), // 4 · Métro — station de Séoul
    u('photo-1616627042766-2190228f1881', 400), // 5 · Hôtel — toits de hanok
    u('photo-1758570764602-d57bc2922dea', 400), // 6 · Konbini — devanture GS25
    u('photo-1498654896293-37aacf113fd9', 400), // 7 · Resto — table de banchan
    u('photo-1638964663550-e2123ac8900b', 400), // 8 · Culture — Gyeongbokgung
    u('photo-1642055514517-7b52288890ec', 400), // 9 · Santé — rayons de pharmacie
    u('photo-1639905808227-4c987d4a71bd', 400), // 10 · Sorties — nuit sur Namsan
    u('photo-1619273470666-807cde79d0b9', 400), // 11 · Rencontres — café de Séoul
    u('photo-1490430657723-4d607c1503fc', 400), // 12 · Départ — tableau d'embarquement
  ],
  italien: [
    u('photo-1603668279554-631d92eaef9b', 400), // 1 · Alfabeto — rue de Rome
    u('photo-1771409529794-c2c7290e76aa', 400), // 2 · Ciao — piazza au crépuscule
    u('photo-1747021597378-3222b65cb571', 400), // 3 · Aeroporto — terminal moderne
    u('photo-1766776963775-772e5e7a913c', 400), // 4 · Treni — Frecciarossa à quai
    u('photo-1696854649609-1fd6e5abf87f', 400), // 5 · Hotel — fenêtre sur l'eau
    u('photo-1767725162365-5916169466d3', 400), // 6 · Mercato — étal de fruits
    u('photo-1699183385736-5c8d99251875', 400), // 7 · Ristorante — nappes à carreaux
    u('photo-1615830783066-26a99bc9d959', 400), // 8 · Aperitivo — spritz
    u('photo-1663555619070-f0fb695bfbde', 400), // 9 · Salute — enseigne de farmacia
    u('photo-1509024644558-2f56ce76c490', 400), // 10 · Uscite — Colisée heure dorée
    u('photo-1515859005217-8a1f08870f59', 400), // 11 · Amicizia — scooter romain
    u('photo-1768213021718-9f738eabb363', 400), // 12 · Partenza — train en gare
  ],
  anglais: [
    u('photo-1486299267070-83823f5448dd', 400), // 1 · Alphabet — Big Ben
    u('photo-1594230381998-da6f0b256b63', 400), // 2 · Small talk — cabine rouge
    u('photo-1573076978602-a16914734d61', 400), // 3 · Heathrow — terminal
    u('photo-1546452612-548364041a03', 400),    // 4 · The Tube — Baker Street
    u('photo-1688396538097-af54bb314ab6', 400), // 5 · B&B — cottage en pierre
    u('photo-1514729797186-944d57303199', 400), // 6 · Shopping — bus la nuit
    u('photo-1784125850830-814a8ae6d3e1', 400), // 7 · Pub — façade de pub
    u('photo-1671627601461-e0a4f94daa62', 400), // 8 · Tea time — plateau + thé
    u('photo-1584308666744-24d5c474f2ae', 400), // 9 · Health — médicaments
    u('photo-1631029175974-2b2f7a566228', 400), // 10 · Out & about — Piccadilly
    u('photo-1546502207-2e241f6992bf', 400),    // 11 · Friends — coffee shop
    u('photo-1647898166385-2b5354da8c99', 400), // 12 · Departure — horloge de gare
  ],
};

// ---------- Photos de leçons (par slug) ----------
// Démarré avec l'escale 9 (Santé) ; les autres escales
// s'ajouteront ici au fil de la refonte.
export const lessonImages: Record<string, string> = {
  // Corée — escale 9 · Santé
  'kr-escale-9-lecon-1': u('photo-1576602976047-174e57a47881', 400), // pharmacie
  'kr-escale-9-lecon-2': u('photo-1558160074-4d7d8bdf4256', 400),    // thé traditionnel
  'kr-escale-9-lecon-3': u('photo-1485848395967-65dff62dc35b', 400), // couloir d'hôpital
  'kr-escale-9-lecon-4': u('photo-1580917922805-f8f57e08c0ae', 400), // thermomètre
  'kr-escale-9-lecon-5': u('photo-1644131447497-8723db691320', 400), // bol de juk
  // Italie — escale 9 · Salute
  'it-escale-9-lecon-1': u('photo-1539899755132-d3b7666567ca', 400), // farmacia
  'it-escale-9-lecon-2': u('photo-1664344589345-a60139995adc', 400), // thé au citron
  'it-escale-9-lecon-3': u('photo-1517120026326-d87759a7b63b', 400), // hôpital
  'it-escale-9-lecon-4': u('photo-1577401132921-cb39bb0adcff', 400), // plaquettes
  'it-escale-9-lecon-5': u('photo-1764015939059-2c5dee249315', 400), // soupe
  // Angleterre — escale 9 · Health
  'en-escale-9-lecon-1': u('photo-1579105878454-bf8d4cc5081e', 400), // chemist's
  'en-escale-9-lecon-2': u('photo-1712056407267-1a38c7024a8f', 400), // thé citron-miel
  'en-escale-9-lecon-3': u('photo-1713111392225-e6a33d1210dd', 400), // ambulance
  'en-escale-9-lecon-4': u('photo-1600091474842-83bb9c05a723', 400), // trousse de secours
  'en-escale-9-lecon-5': u('photo-1764015939108-7963106fa73b', 400), // bol de soupe
};

// Photo d'escale d'une langue (escale de 1 à 12)
export function getEscaleImage(langKey: string, escale: number): string | null {
  const list = escaleImages[langKey];
  if (!list || escale < 1 || escale > list.length) return null;
  return list[escale - 1];
}

// Photo d'une leçon si elle existe (sinon null)
export function getLessonImage(slug: string): string | null {
  return lessonImages[slug] ?? null;
}
