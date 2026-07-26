# Charte de développement unifiée — Desktop & Web

**Version 2.0** — Juillet 2026
Bible commune à tous les projets (desktop et web). À respecter intégralement.
Fusionne la Charte Desktop v1.0 et la Charte Web v1.0.

> Sur ce projet (LeProfNomade, 100% web), seuls les articles tagués `🖥🌐 Commun` et `🌐 Web` s'appliquent. Les sections `🖥 Desktop` sont conservées pour référence transverse mais non pertinentes ici.

---

## Article 00 — La règle d'or

`🖥🌐 Commun`

Le développement ne commence QUE lorsque plus aucune question n'est en suspens ET que le Trello est complet (jusqu'aux détails les plus futiles).

Avant de commencer, Claude liste explicitement toutes les questions ouvertes et attend les réponses. Il ne devine jamais à la place d'une réponse manquante.

Deux questions posées systématiquement en premier :
- Le projet est-il public ou privé/perso ?
- Quel langage / framework / stack utiliser ? (chaque option expliquée et justifiée)

---

## Article 01 — Démarrage d'un projet (ordre obligatoire)

**Tronc commun** `🖥🌐 Commun`
- Définition des besoins.
- Proposition des technologies (langages, frameworks, bibliothèques, BDD, hébergement) expliquées et justifiées.
- Trello : architecture complète du projet, chaque tâche et détail y figurent.
- On ne choisit jamais un langage/framework par habitude, mais parce qu'il est adapté au projet.

**Spécifique Desktop** `🖥 Desktop`
- Fichier `.bat` qui accompagne tout le développement.
- Présentation HTML ultra détaillée expliquant chaque détail (cette charte en fait partie).

**Spécifique Web** `🌐 Web`
- `README.md` qui accompagne tout le développement.
- Présentation détaillée expliquant chaque choix technique.

---

## Article 02 — Langages & nommage

`🖥🌐 Commun`

Convention de nommage UNIQUE par projet (variables, fonctions, classes, fichiers), proposée par Claude selon le langage/framework. Jamais de mélange type `Save()` / `saveFile()` / `SAVE()` / `save_file()` dans un même projet.

**Spécifique Web** `🌐 Web`
- camelCase pour les variables/fonctions, PascalCase pour les composants, kebab-case pour les fichiers et routes.

---

## Article 03 — APIs & dépendances

`🖥🌐 Commun`
- APIs : gratuites, open source, libres. Une API payante n'est acceptée que si elle apporte une amélioration réellement importante impossible autrement.
- Dépendances limitées au strict nécessaire. On écarte une dépendance/framework si elle est payante, trop chère ou inutile.
- Si le projet repose sur de l'IA : 100% locale, sans accès Internet (desktop) ou sans requête vers un serveur tiers sans accord (web).

**Spécifique Web** `🌐 Web`
- `npm audit` régulier pour surveiller les vulnérabilités des dépendances.

---

## Article 04 — Livraison & distribution

**Desktop** `🖥 Desktop`
- Les `.bat` sont des outils de test réservés au développeur, pendant le dev.
- L'utilisateur final ne reçoit jamais de `.bat` ni de code source : uniquement un `.exe` portable final.
- Le `.exe` est généré une fois le projet terminé. Tout projet finit par un `.exe` portable.
- Projet PUBLIC : GitHub (uniquement le `.exe`, aucun code source) + site vitrine hébergé gratuitement via Cloudflare avec bouton Télécharger.
- Projet PRIVÉ/PERSO : pas de site, pas de GitHub, mais toujours un `.exe` portable final.

**Web** `🌐 Web`
- Le code source est privé (repo GitHub privé). L'utilisateur accède au site déployé, jamais au code.
- Le site est déployé via un hébergeur gratuit ou peu coûteux (Vercel, Netlify, Cloudflare Pages…).
- Chaque `git push` sur la branche principale déclenche un déploiement automatique.
- Pas de `.exe`, pas de site vitrine séparé : le site EST le produit.

**Commun** `🖥🌐 Commun`
- Publicités tolérées uniquement si le projet est coûteux et doit être rentabilisé (serveur, nom de domaine), et seulement non gênantes et éthiques.

---

## Article 05 — Documentation & versions

`🖥🌐 Commun`
- Chaque projet possède : numéro de version (semver), changelog, date de publication, historique des modifications.
- Chaque mise à jour est documentée (ce qui change, pourquoi). On ne casse jamais volontairement une ancienne fonctionnalité sans prévenir.
- Toute dette technique connue est documentée.
- Licence du projet : propriétaire — jamais de code source distribué. Crédits des bibliothèques open source utilisées.
- Droits identiques en privé comme en public. Chaque projet précise : licence des bibliothèques, licence du projet, crédits, CGU.

**Spécifique Web** `🌐 Web`
- Une page « Quoi de neuf » visible par l'utilisateur sur le site.
- Le `CHANGELOG.md` technique reste dans le repo (développeur).

---

## Article 06 — Gestion des erreurs

`🖥🌐 Commun`

L'utilisateur ne voit jamais une exception brute, un stack trace ou une page blanche/vieux `.txt` illisible.

**Desktop** `🖥 Desktop`
- Tout crash produit un rapport HTML clair, rangé par défaut dans `/logs` (dossier modifiable dans les paramètres).
- Toute erreur contient : ce qui s'est passé ; pourquoi (si connu) ; comment corriger ; un identifiant unique ; les infos techniques dans une section repliable.
- Le rapport HTML contient aussi : résumé, niveau de gravité, étapes probables, configuration PC, version, captures éventuelles, bouton Copier, bouton Exporter.

**Web** `🌐 Web`
- Toute erreur affiche une page stylée cohérente avec le design du site, avec : ce qui s'est passé (en langage humain), un bouton pour revenir à l'accueil, un bouton pour signaler le problème.
- Page 404 personnalisée (`not-found.tsx`).
- Page d'erreur générale personnalisée (`error.tsx`).
- Page hors-ligne (offline) si PWA.
- Côté développeur : monitoring des erreurs (Sentry, logs Vercel, ou error boundaries loggés).

---

## Article 07 — Structure & commentaires

`🖥🌐 Commun`

Chaque dossier a un rôle. Tout code non évident est commenté (logique, choix techniques, conséquences). Pas de commentaires redondants qui décrivent juste une instruction.

**Structure Desktop** `🖥 Desktop`
`assets/`, `core/`, `ui/`, `api/`, `settings/`, `logs/`, `cache/`, `temp/`, `docs/`.

**Structure Web (Next.js App Router)** `🌐 Web`
- `src/app/` → pages et routes (App Router)
- `src/components/` → composants React réutilisables
- `src/lib/` → fonctions utilitaires, clients API, config
- `src/data/` → données statiques (JSON, constantes)
- `src/styles/` → CSS global (si séparé de Tailwind)
- `public/brand/` → logos, icônes
- `public/audio/` → fichiers audio
- `public/icons/` → icônes PWA
- `docs/` → documentation, chartes

---

## Article 08 — Interface & UX

`🖥🌐 Commun`
- Interface toujours moderne, cohérente, propre, intuitive.
- Chaque écran répond à : Où suis-je ? Que puis-je faire ? Comment revenir en arrière ?
- Un menu/page/bouton « Aide » (ou page FAQ pour le web) explique le fonctionnement général et l'intérêt de tout.
- Chaque bouton complexe a un « ? » / tooltip avec explication.
- Le logiciel/site ne demande jamais de chercher sur Google.
- Animations : subtiles, améliorent la compréhension, ne ralentissent jamais. Désactivables/ajustables dans les paramètres.
- Pop-ups/modales : uniquement quand c'est la meilleure solution (confirmation de suppression, erreur critique). Panneaux, onglets, tiroirs préférés sinon.

**Spécifique Desktop** `🖥 Desktop`
- Le clic droit offre toujours de nombreuses fonctionnalités, jamais mis à l'écart.
- Animations : maximum possible mais MINIMUM activé par défaut, ajustable dans les paramètres.

**Spécifique Web** `🌐 Web`
- Pas de clic droit personnalisé (on laisse le menu natif du navigateur).

---

## Article 09 — Paramètres (Settings)

`🖥🌐 Commun`
- Section Settings ultra libre, poussée, détaillée. L'utilisateur personnalise un maximum : thème, langue, sauvegardes, performances, comportement, notifications, options avancées.
- AUCUN raccourci clavier (ni ici ni en accessibilité) : trop de bugs.
- Export/import des paramètres. Sauvegarde automatique ET manuelle.
- Toute modification importante peut être annulée/restaurée quand c'est techniquement possible.

**Spécifique Desktop** `🖥 Desktop`
- Fichiers de config lisibles, documentés, facilement sauvegardables et réinitialisables.
- Sauvegardes conservées en rotation (les plus récentes gardées), nombre adapté au projet.

**Spécifique Web** `🌐 Web`
- Settings accessibles depuis le profil ou une page dédiée.
- Compte : pseudo, email, supprimer mon compte.
- Progression : réinitialiser, exporter ses données.
- Sauvegarde des préférences via JSON ou Supabase.

---

## Article 10 — Accessibilité

`🖥🌐 Commun`
- Mode sombre (palette alternative complète).
- Zoom : supporté nativement, rien ne casse à 150%+.
- Police ajustable (slider dans les settings / variable CSS).
- Contrastes soignés (WCAG AA minimum pour le web).
- Aucun raccourci clavier (cohérent avec l'article 09).
- Langues : toujours en français ; ajout de l'anglais (FR + EN) en toute dernière étape avant le déploiement de la 1.0.

---

## Article 11 — Vie privée

`🖥🌐 Commun`
- Aucune télémétrie cachée. Aucune donnée envoyée sans accord.
- Chaque connexion Internet est expliquée. Fonctionnement hors ligne privilégié dès que raisonnablement possible.
- Quand une connexion est nécessaire, on répond à : pourquoi ? quelles données ? vers quel service ? pendant combien de temps ?
- Le réseau reste du bon sens selon le projet (mises à jour, APIs, fonctions en ligne) tant que c'est déclaré.

**Spécifique Web** `🌐 Web`
- Pas de cookies tiers, pas de tracking, pas de Google Analytics sans consentement.
- Page CGU / Politique de confidentialité accessible depuis le footer.
- Bouton supprimer mon compte avec confirmation.
- Données collectées listées clairement : email, pseudo, progression.
- Fonctionnement hors-ligne via PWA (service worker) quand possible.

---

## Article 12 — Performances & compatibilité

**Desktop** `🖥 Desktop`
- Léger par principe (sauf projet volontairement lourd) : démarrage rapide, faible RAM, faible CPU, faible taille.
- Compatibilité : Windows 10 et 11 minimum, architecture x64.

**Web** `🌐 Web`
- Léger par principe : First Contentful Paint < 2s, bundle JS minimal.
- Images optimisées (`next/image`, WebP, lazy loading).
- Compatibilité : Chrome, Firefox, Safari, Edge (dernières 2 versions).
- Mobile-first : responsive, testé sur plusieurs résolutions (360px → 1920px).
- Core Web Vitals surveillés (Lighthouse, PageSpeed Insights).

---

## Article 13 — Qualité & tests

`🖥🌐 Commun`

Toute fonctionnalité est testée avant d'être considérée terminée.
- Tests manuels.
- Tests automatiques quand pertinent.
- Tests de régression : vérifier que les nouvelles fonctionnalités ne cassent pas l'existant.
- Vérification sur plusieurs résolutions.
- Vérification des performances.

**Spécifique Web** `🌐 Web`
- Tests unitaires (Jest) : fonctions utilitaires, validation des données.
- Tests end-to-end (Cypress) : parcours utilisateur critiques, navigation, responsive.
- Vérification des performances via Lighthouse.

---

## Article 14 — Philosophie & évolutivité

`🖥🌐 Commun`
- Tout projet est honnête, sincère, clair, bienveillant, professionnel, franc.
- Conçu pour durer : modularité, séparation des responsabilités, ajout de fonctionnalités sans tout casser, code réutilisable.
- Avant toute nouvelle fonctionnalité : vérifier qu'une existante ne peut pas être améliorée (éviter dix boutons qui font presque la même chose).
- Règle des trois piliers : chaque décision doit améliorer au moins l'un de — expérience utilisateur, qualité technique, pérennité. Sinon elle est remise en question.
- Mises à jour : l'utilisateur garde le contrôle (vérifier, désactiver, reporter pour le desktop ; page « Quoi de neuf » pour le web).

---

*Charte de Développement Unifiée v2.0 — Juillet 2026. Fusionne la Charte Desktop v1.0 et la Charte Web v1.0.*
