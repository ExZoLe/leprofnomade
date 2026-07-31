import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mentions légales & vie privée | LeProfNomade',
  description:
    'Conditions d’utilisation et politique de confidentialité de LeProfNomade : quelles données, pourquoi, où — en langage humain.',
};

const ink = '#3D2D14';
const soft = '#8B7355';

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl mt-10 mb-4" style={{ color: ink }}>
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed my-3" style={{ color: '#5F5E5A' }}>
      {children}
    </p>
  );
}

export default function CguPage() {
  return (
    <div style={{ background: '#EFE7D9', minHeight: '100vh' }}>
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <p className="text-xs font-bold tracking-[0.1em] uppercase mb-3" style={{ color: soft }}>
          Mentions légales
        </p>
        <h1 className="font-display text-3xl sm:text-4xl leading-tight mb-3" style={{ color: ink }}>
          Avant de décoller, quelques règles du voyage
        </h1>
        <p className="text-sm leading-relaxed mb-2" style={{ color: soft }}>
          Version du 31 juillet 2026 — écrite pour être lue, pas pour décourager.
        </p>

        {/* ============ CONDITIONS D'UTILISATION ============ */}
        <H2>1. Le service</H2>
        <P>
          LeProfNomade est une plateforme gratuite d&apos;apprentissage des langues
          (anglais, coréen, italien) éditée à titre personnel. Le service est fourni
          « tel quel » : nous faisons de notre mieux pour qu&apos;il soit disponible et
          exact, sans pouvoir le garantir à 100 %. Le contenu pédagogique est conçu
          avec soin mais ne constitue pas une formation certifiante.
        </P>

        <H2>2. Ton compte</H2>
        <P>
          Le compte (facultatif — les leçons sont accessibles sans) sert uniquement à
          sauvegarder ta progression et ton pseudo. Tu es responsable de la
          confidentialité de ton mot de passe. Tu peux supprimer ton compte à tout
          moment depuis ton profil : la suppression est immédiate et irréversible.
        </P>

        <H2>3. Propriété intellectuelle</H2>
        <P>
          Le contenu du site (leçons, quiz, articles, design) est protégé — tous
          droits réservés. Tu peux l&apos;utiliser librement pour apprendre, pas le
          republier ni le revendre. Les photos proviennent d&apos;
          <a href="https://unsplash.com" className="underline" style={{ color: ink }} target="_blank" rel="noopener noreferrer">
            Unsplash
          </a>{' '}
          (licence Unsplash) — merci aux photographes. Le site est construit avec des
          bibliothèques open source (Next.js, React, Tailwind CSS, Supabase JS),
          chacune sous sa propre licence.
        </P>

        {/* ============ VIE PRIVÉE ============ */}
        <H2>4. Tes données — la liste complète</H2>
        <P>
          Pas de télémétrie cachée, pas de tracking publicitaire, pas de cookies
          tiers, pas de Google Analytics, pas de revente de données. Voici{' '}
          <strong style={{ color: ink }}>tout</strong> ce que nous stockons, et
          uniquement si tu crées un compte :
        </P>
        <div className="overflow-x-auto my-5">
          <table className="w-full text-sm border-collapse bg-[#FAF6F0] rounded-xl overflow-hidden">
            <thead>
              <tr style={{ background: '#E8DDD0' }}>
                <th className="text-left p-3 font-semibold" style={{ color: ink }}>Donnée</th>
                <th className="text-left p-3 font-semibold" style={{ color: ink }}>Pourquoi</th>
                <th className="text-left p-3 font-semibold" style={{ color: ink }}>Où</th>
                <th className="text-left p-3 font-semibold" style={{ color: ink }}>Durée</th>
              </tr>
            </thead>
            <tbody style={{ color: '#5F5E5A' }}>
              <tr className="border-t border-black/5">
                <td className="p-3">Email</td>
                <td className="p-3">Créer et retrouver ton compte</td>
                <td className="p-3">Supabase (auth)</td>
                <td className="p-3">Jusqu&apos;à suppression du compte</td>
              </tr>
              <tr className="border-t border-black/5">
                <td className="p-3">Pseudo</td>
                <td className="p-3">Personnaliser ta carte d&apos;embarquement</td>
                <td className="p-3">Supabase</td>
                <td className="p-3">Idem</td>
              </tr>
              <tr className="border-t border-black/5">
                <td className="p-3">Progression</td>
                <td className="p-3">Retrouver tes leçons terminées</td>
                <td className="p-3">Supabase</td>
                <td className="p-3">Idem</td>
              </tr>
            </tbody>
          </table>
        </div>

        <H2>5. Les connexions réseau, expliquées</H2>
        <P>
          Chaque connexion que fait le site a une raison précise :{' '}
          <strong style={{ color: ink }}>Supabase</strong> pour l&apos;authentification
          et la sauvegarde de ta progression,{' '}
          <strong style={{ color: ink }}>Unsplash</strong> pour charger les photos
          d&apos;illustration, <strong style={{ color: ink }}>Vercel</strong> qui
          héberge le site, et <strong style={{ color: ink }}>YouTube</strong> uniquement
          si tu lances une chanson d&apos;alphabet. C&apos;est tout. Le site fonctionne
          partiellement hors-ligne grâce à un service worker (PWA) qui garde en cache
          la page hors-ligne et les fichiers audio de l&apos;alphabet — sur ton
          appareil, pas chez nous.
        </P>

        <H2>6. Tes droits (RGPD)</H2>
        <P>
          Accès, rectification, suppression : le bouton « Supprimer mon compte » de
          ton profil efface immédiatement ton email, ton pseudo et ta progression.
          Pour toute autre demande :{' '}
          <a
            href="mailto:contact.leprofnomade@gmail.com"
            className="underline"
            style={{ color: ink }}
          >
            contact.leprofnomade@gmail.com
          </a>
          .
        </P>

        <H2>7. Évolution de ces règles</H2>
        <P>
          Si ces conditions changent de façon importante, la page « Quoi de neuf »
          l&apos;annoncera clairement. La date de version en haut de cette page fait foi.
        </P>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-block bg-[#C86E46] text-white text-sm font-semibold px-6 py-3 rounded-xl no-underline hover:opacity-90 transition-opacity"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
