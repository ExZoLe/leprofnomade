'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FaqItem {
  question: string;
  answer: string;
}

const sections: { title: string; emoji: string; items: FaqItem[] }[] = [
  {
    title: 'Premiers pas',
    emoji: '🚀',
    items: [
      {
        question: 'Comment commencer à apprendre ?',
        answer:
          "Choisis une langue sur la page d'accueil, puis ouvre l'Escale 1 pour lancer ta première leçon. Chaque escale contient 5 leçons progressives autour d'un thème de voyage.",
      },
      {
        question: 'Est-ce que le site est vraiment gratuit ?',
        answer:
          "Oui, 100 % gratuit, sans publicité, sans abonnement. LeProfNomade est un projet indépendant, conçu pour le plaisir d'apprendre.",
      },
      {
        question: 'Quelles langues puis-je apprendre ?',
        answer:
          "Actuellement : l'anglais (destination Londres), le coréen (destination Séoul) et l'italien (destination Rome). D'autres langues sont à l'étude.",
      },
    ],
  },
  {
    title: 'Mon compte',
    emoji: '👤',
    items: [
      {
        question: "Pourquoi créer un compte ?",
        answer:
          "Le compte permet de sauvegarder ta progression (leçons terminées, scores) et de la retrouver sur n'importe quel appareil. Sans compte, tu peux quand même accéder à toutes les leçons.",
      },
      {
        question: 'Comment modifier mon pseudo ?',
        answer:
          "Va sur ta page Profil (icône en haut à droite) et clique sur le champ pseudo pour le modifier. 20 caractères maximum.",
      },
      {
        question: 'Comment supprimer mon compte ?',
        answer:
          "Sur ta page Profil, en bas, clique sur « Supprimer mon compte ». Attention : cette action efface définitivement ton email, ton pseudo et toute ta progression. C'est irréversible.",
      },
    ],
  },
  {
    title: 'Les leçons',
    emoji: '📚',
    items: [
      {
        question: "Comment fonctionne une leçon ?",
        answer:
          "Chaque leçon présente du vocabulaire et de la grammaire autour d'un thème lié au voyage. Tu lis la leçon à ton rythme, puis tu passes au quiz pour valider tes acquis.",
      },
      {
        question: "Dois-je suivre les leçons dans l'ordre ?",
        answer:
          "Ce n'est pas obligatoire, mais c'est recommandé. Les leçons sont conçues pour progresser du niveau débutant (escale 1) à intermédiaire (escale 12). Chaque escale s'appuie sur les précédentes.",
      },
      {
        question: 'Puis-je écouter la prononciation ?',
        answer:
          'Oui, certaines leçons contiennent des extraits audio. Clique sur le bouton lecture à côté du mot ou de la phrase pour écouter la prononciation.',
      },
    ],
  },
  {
    title: 'Les quiz',
    emoji: '✏️',
    items: [
      {
        question: 'Comment fonctionnent les quiz ?',
        answer:
          "Chaque escale se termine par un quiz de 20 questions à choix multiples. Tes résultats sont sauvegardés si tu es connecté. Tu peux refaire un quiz autant de fois que tu veux pour améliorer ton score.",
      },
      {
        question: 'Quel score faut-il pour valider ?',
        answer:
          "Il n'y a pas de score minimum. Le quiz sert à t'entraîner, pas à te bloquer. L'idée est d'apprendre de tes erreurs, pas de stresser sur une note.",
      },
    ],
  },
  {
    title: 'Le passeport lexical',
    emoji: '🧳',
    items: [
      {
        question: "C'est quoi le passeport lexical ?",
        answer:
          "C'est ton carnet de vocabulaire personnalisé. Il regroupe tous les mots et expressions des leçons, organisés par escale et par thème. Tu peux le consulter à tout moment pour réviser.",
      },
      {
        question: 'Comment chercher un mot ?',
        answer:
          'Utilise la barre de recherche en haut du lexique. La recherche fonctionne en français et dans la langue cible, et propose aussi des mots proches si ta recherche est approximative.',
      },
    ],
  },
  {
    title: 'La carte',
    emoji: '🗺️',
    items: [
      {
        question: 'À quoi sert la carte ?',
        answer:
          "Chaque langue a sa carte interactive de la capitale (Londres, Séoul, Rome). Les quartiers correspondent aux escales : clique sur un quartier pour accéder directement aux leçons liées.",
      },
    ],
  },
  {
    title: 'Le blog',
    emoji: '📓',
    items: [
      {
        question: "Quel est le rapport entre le blog et les leçons ?",
        answer:
          "Le blog propose des articles culturels qui complètent les leçons : recettes, lieux, traditions… Chaque article est relié à une escale pour enrichir ton immersion sans quitter le parcours.",
      },
    ],
  },
  {
    title: 'Problèmes techniques',
    emoji: '🔧',
    items: [
      {
        question: "Le site ne se met pas à jour sur mobile",
        answer:
          "LeProfNomade fonctionne aussi hors-ligne grâce au mode PWA. Si tu vois une version ancienne, ferme complètement l'application puis rouvre-la. Cela force le rechargement de la dernière version.",
      },
      {
        question: "J'ai trouvé un bug, comment le signaler ?",
        answer:
          "Écris-nous à contact.leprofnomade@gmail.com en décrivant le problème (page concernée, ce que tu as fait, ce qui s'est passé). On corrige au plus vite !",
      },
      {
        question: 'Le site fonctionne-t-il sur tous les navigateurs ?',
        answer:
          "Oui, LeProfNomade est compatible avec Chrome, Firefox, Safari et Edge, sur ordinateur comme sur mobile. Pour la meilleure expérience, utilise un navigateur à jour.",
      },
    ],
  },
];

function Accordion({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/5 last:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 px-1 text-left bg-transparent border-none cursor-pointer group"
      >
        <span className="text-sm font-medium text-ink group-hover:text-ink/80 transition-colors">
          {item.question}
        </span>
        <span
          className={`text-gray-300 text-sm flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          ▾
        </span>
      </button>
      {open && (
        <p className="text-sm text-[#8B7355] leading-relaxed pb-4 px-1 m-0">
          {item.answer}
        </p>
      )}
    </div>
  );
}

export default function AidePage() {
  return (
    <div className="min-h-screen bg-[#EFE7D9] pt-24 pb-20 px-6 page-enter">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-4xl mb-3">🧭</p>
          <h1 className="font-display text-3xl text-ink mb-2">Centre d&apos;aide</h1>
          <p className="text-sm text-[#8B7355]">
            Tout ce qu&apos;il faut savoir pour profiter du voyage.
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-[#FAF6F0] rounded-2xl border border-[#3D2D1414] overflow-hidden"
            >
              <div className="px-5 pt-5 pb-2 flex items-center gap-2.5">
                <span className="text-lg">{section.emoji}</span>
                <h2 className="font-display text-lg text-ink m-0">{section.title}</h2>
              </div>
              <div className="px-5 pb-2">
                {section.items.map((item) => (
                  <Accordion key={item.question} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#FAF6F0] rounded-2xl border border-[#3D2D1414] p-6 text-center">
          <p className="text-2xl mb-2">💬</p>
          <p className="text-sm font-semibold text-ink mb-1">
            Tu n&apos;as pas trouvé ta réponse ?
          </p>
          <p className="text-xs text-[#8B7355] mb-4">
            Écris-nous, on répond vite !
          </p>
          <a
            href="mailto:contact.leprofnomade@gmail.com?subject=Aide%20LeProfNomade"
            className="inline-block px-6 py-2.5 bg-[#C86E46] text-white text-sm font-semibold rounded-xl no-underline hover:opacity-90 transition-opacity"
          >
            Nous contacter
          </a>
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
