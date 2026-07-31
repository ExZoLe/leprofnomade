import Link from 'next/link';

interface Change {
  type: 'new' | 'improved' | 'fixed';
  text: string;
}

interface Release {
  version: string;
  date: string;
  changes: Change[];
}

const releases: Release[] = [
  {
    version: 'v0.9.0',
    date: 'Août 2026',
    changes: [
      { type: 'new', text: 'Page Aide / FAQ — 8 sections, 16 questions en accordéon' },
      { type: 'new', text: 'Suppression de compte — modale de confirmation + API sécurisée' },
      { type: 'new', text: 'Page CGU / Confidentialité — droits RGPD, données collectées' },
      { type: 'new', text: "Pages d'erreur stylées — 404 « Escale introuvable » + page turbulences" },
      { type: 'improved', text: 'Progression profil corrigée sur 60 leçons par langue' },
      { type: 'improved', text: 'Footer avec vrais liens (CGU, blog, aide, contact)' },
    ],
  },
  {
    version: 'v0.8.0',
    date: 'Juillet 2026',
    changes: [
      { type: 'new', text: "Refonte page d'accueil — couverture de guide avec photo plein cadre" },
      { type: 'new', text: 'Blog — hub + 30 articles culturels (10 par langue)' },
      { type: 'new', text: 'Cartes SVG — plans interactifs de Séoul, Londres et Rome' },
      { type: 'new', text: 'Refonte dashboard pays — bannière, raccourcis, grille photos' },
      { type: 'new', text: "Bibliothèque Unsplash — 57 photos centralisées" },
      { type: 'improved', text: 'Recherche lexique — expansion thématique limitée pour moins de bruit' },
    ],
  },
  {
    version: 'v0.7.0',
    date: 'Juillet 2026',
    changes: [
      { type: 'new', text: 'Charte de développement v2.0 — 15 articles, desktop + web unifié' },
      { type: 'improved', text: 'README aligné sur le Trello (phases, stats, liens)' },
    ],
  },
  {
    version: 'v0.6.0',
    date: 'Juin 2026',
    changes: [
      { type: 'new', text: 'Passeport lexical — recherche floue + expansion thématique' },
      { type: 'new', text: 'Escales 9 à 12 — 4 nouvelles escales par langue (60 leçons + quiz)' },
      { type: 'fixed', text: 'Compatibilité TypeScript (Array.from au lieu du spread de Map)' },
    ],
  },
  {
    version: 'v0.5.0',
    date: 'Mai 2026',
    changes: [
      { type: 'new', text: 'PWA installable — fonctionne hors-ligne, icônes, manifest' },
      { type: 'new', text: 'Logo officiel intégré dans la navbar' },
      { type: 'new', text: 'Pseudo personnalisable depuis le profil' },
      { type: 'improved', text: 'Header profil responsive mobile' },
    ],
  },
  {
    version: 'v0.4.0',
    date: 'Avril 2026',
    changes: [
      { type: 'new', text: "Carte d'embarquement, passeport et carnet de route sur le dashboard" },
      { type: 'new', text: "Quiz d'escale complets pour les 3 langues" },
      { type: 'new', text: 'Alphabet sidebar + audio ElevenLabs + chanson YouTube' },
      { type: 'improved', text: 'Palette warm — fond kraft, couleurs terracotta/olive/moutarde' },
    ],
  },
  {
    version: 'v0.3.0',
    date: 'Mars 2026',
    changes: [
      { type: 'new', text: 'Escales 1 à 8 — cours MDX pour anglais, coréen, italien' },
      { type: 'new', text: 'Traduction cachée/révélable dans les dialogues' },
      { type: 'new', text: "Accordéon escales + bouton « Reprendre »" },
      { type: 'fixed', text: 'Redirection auto après connexion Google' },
    ],
  },
  {
    version: 'v0.1.0',
    date: 'Février 2026',
    changes: [
      { type: 'new', text: 'Lancement initial de LeProfNomade' },
      { type: 'new', text: 'Escale 1 Coréen (Hangul)' },
      { type: 'new', text: 'Authentification email + Google' },
    ],
  },
];

const typeConfig = {
  new: { label: 'Nouveau', color: '#6B7B3E', bg: '#6B7B3E14' },
  improved: { label: 'Amélioré', color: '#D6A23D', bg: '#D6A23D14' },
  fixed: { label: 'Corrigé', color: '#C86E46', bg: '#C86E4614' },
};

export default function QuoiDeNeufPage() {
  return (
    <div className="min-h-screen bg-[#EFE7D9] pt-24 pb-20 px-6 page-enter">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-4xl mb-3">🚀</p>
          <h1 className="font-display text-3xl text-ink mb-2">Quoi de neuf ?</h1>
          <p className="text-sm text-[#8B7355]">
            Toutes les évolutions de LeProfNomade, version par version.
          </p>
        </div>

        <div className="space-y-6">
          {releases.map((release, i) => (
            <div
              key={release.version}
              className="bg-[#FAF6F0] rounded-2xl border border-[#3D2D1414] overflow-hidden"
            >
              <div className="px-5 pt-5 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: i === 0 ? '#C86E46' : '#3D2D1414',
                      color: i === 0 ? '#fff' : '#8B7355',
                    }}
                  >
                    {release.version}
                  </span>
                  <span className="text-sm font-semibold text-ink">{release.date}</span>
                </div>
                {i === 0 && (
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#6B7B3E]">
                    Dernière
                  </span>
                )}
              </div>
              <div className="px-5 pb-5 space-y-2">
                {release.changes.map((change, j) => {
                  const cfg = typeConfig[change.type];
                  return (
                    <div key={j} className="flex items-start gap-2.5">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 flex-shrink-0"
                        style={{ background: cfg.bg, color: cfg.color }}
                      >
                        {cfg.label}
                      </span>
                      <p className="text-sm text-ink/80 leading-relaxed m-0">{change.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[#8B7355] mt-8">
          <Link href="/" className="text-[#8B7355] hover:text-ink transition-colors">
            ← Retour à l&apos;accueil
          </Link>
        </p>
      </div>
    </div>
  );
}
