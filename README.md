# 🌍 LeProfNomade

**Site 100% gratuit pour apprendre l'anglais, le coréen et l'italien depuis le français.**

Pas de mini-jeux. Des vraies situations, des vraies explications, et la culture qu'aucune app ne t'enseigne.

## Stack technique

- **Next.js 14** — Front-end React avec App Router
- **Tailwind CSS** — Design system
- **Supabase** — Base de données PostgreSQL + Authentification
- **Vercel** — Hébergement gratuit
- **MDX** — Contenu des leçons en Markdown enrichi

## Installation locale

```bash
# 1. Clone le repo
git clone https://github.com/TON-PSEUDO/leprofnomade.git
cd leprofnomade

# 2. Installe les dépendances
npm install

# 3. Configure les variables d'environnement
cp .env.example .env.local
# → Remplis avec tes clés Supabase

# 4. Lance le serveur de développement
npm run dev
# → Ouvre http://localhost:3000
```

## Structure du projet

```
src/
├── app/                  # Pages Next.js (App Router)
│   ├── page.tsx          # Page d'accueil
│   ├── [lang]/page.tsx   # Dashboard par langue
│   ├── lecon/[slug]/     # Page de leçon
│   └── methode/          # Page "La méthode"
├── components/           # Composants réutilisables
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── LanguageCard.tsx
│   ├── LessonComponents.tsx  # Dialogue, Quiz, Grammar, etc.
│   └── LessonRenderer.tsx
├── content/              # Leçons en MDX
│   ├── anglais/
│   ├── coreen/
│   └── italien/
└── lib/                  # Utilitaires
    ├── supabase.ts
    ├── languages.ts
    └── lessons.ts
```

## Ajouter une leçon

1. Copie un fichier `.mdx` existant dans `src/content/[langue]/`
2. Modifie le contenu (anecdote, dialogue, grammaire, quiz)
3. `git add -A && git commit -m "Ajout leçon" && git push`
4. Vercel redéploie automatiquement ✅

## Licence

Ce projet est un projet éducatif gratuit.
