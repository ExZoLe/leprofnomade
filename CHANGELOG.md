# Changelog

Toutes les évolutions notables de LeProfNomade, dans un format lisible.

## v0.9.0 — Août 2026

### Nouveau
- **Page Aide / FAQ** — 8 sections, 16 questions en accordéon (`/aide`)
- **Suppression de compte** — modale de confirmation + API serveur sécurisée
- **Page CGU / Confidentialité** — droits RGPD, données collectées (`/cgu`)
- **Pages d'erreur stylées** — 404 « Escale introuvable » + page turbulences

### Amélioré
- Progression profil corrigée sur 60 leçons par langue (au lieu de 40)
- Footer avec vrais liens (CGU, blog, aide, contact)

---

## v0.8.0 — Juillet 2026

### Nouveau
- **Refonte page d'accueil** — couverture de guide avec photo plein cadre, badges, progression connectée
- **Blog** — hub + 30 articles culturels (10 par langue) avec renderer MDX
- **Cartes SVG** — plans interactifs de Séoul, Londres et Rome avec quartiers + escales
- **Refonte dashboard pays** — bannière photo, raccourcis, escales en grille avec photos, encadrés culturels
- **Bibliothèque Unsplash** — 57 photos centralisées (héros, bannières, escales)
- Lien blog dans la navbar

### Amélioré
- Recherche Passeport lexical — expansion par thème limitée à 8 résultats pour éviter le bruit

---

## v0.7.0 — Juillet 2026

### Nouveau
- **Charte de développement v2.0** — 15 articles, desktop + web unifié
- README aligné sur le Trello (phases, stats, liens)

---

## v0.6.0 — Juin 2026

### Nouveau
- **Passeport lexical** — recherche floue + expansion thématique, 3 langues
- **Escales 9 à 12** — 4 nouvelles escales par langue (60 leçons + quiz)

### Corrigé
- `Array.from` au lieu du spread de Map (compatibilité TS target)

---

## v0.5.0 — Mai 2026

### Nouveau
- **PWA installable** — manifest, service worker (cache audio offline), icônes
- **Logo officiel** — intégré dans la navbar et les icônes PWA
- **Pseudo personnalisable** — réglage depuis le profil, affiché sur le billet

### Amélioré
- Header profil responsive mobile

---

## v0.4.0 — Avril 2026

### Nouveau
- **Refonte dashboard** — carte d'embarquement, passeport, carnet de route, alphabets par langue
- **Quiz d'escale** — quiz complets pour les 3 langues
- **Photo pays + alphabet sidebar** sur le dashboard langue
- **Chanson alphabet YouTube** par langue
- Audio alphabet ElevenLabs

### Amélioré
- Palette warm (fond kraft, couleurs langues terracotta/olive/moutarde)

---

## v0.3.0 — Mars 2026

### Nouveau
- **Escales 1 à 8** — cours MDX complets pour anglais, coréen, italien
- Traduction cachée/révélable dans dialogues et grammaire
- Navigation par préfixe langue + quiz d'escale
- Accordéon escales + bouton « Reprendre »

### Corrigé
- Redirection auto après connexion Google
- Slugs par langue

---

## v0.1.0 — Février 2026

### Nouveau
- **Lancement initial** — LeProfNomade v1
- Escale 1 Coréen (Hangul)
- Authentification email + Google (Supabase)
- Système de progression (scores, leçons terminées)
