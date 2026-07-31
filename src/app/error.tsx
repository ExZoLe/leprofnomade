'use client';

import { useEffect } from 'react';
import Link from 'next/link';

// Error boundary global (charte Article 06) : jamais d'erreur brute.
// Ton voyage, boutons clairs, détails techniques repliés.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Trace côté console pour le debug (visible dans les logs Vercel côté serveur)
    console.error('[LeProfNomade] Erreur capturée :', error);
  }, [error]);

  const mailBody = encodeURIComponent(
    `Bonjour,\n\nJ'ai rencontré un problème sur LeProfNomade.\n\nPage : ${
      typeof window !== 'undefined' ? window.location.href : ''
    }\nRéférence : ${error.digest ?? 'n/a'}\n\nCe que je faisais :\n`
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: '#EFE7D9' }}
    >
      <div className="max-w-md text-center">
        <p className="text-6xl mb-6">✈️</p>
        <h1 className="font-display text-3xl sm:text-4xl text-[#3D2D14] mb-3">
          Turbulences !
        </h1>
        <p className="text-sm text-[#8B7355] leading-relaxed mb-8">
          Quelque chose s&apos;est mal passé de notre côté. Notre équipage
          travaille à résoudre le problème — en attendant, tu peux réessayer
          ou revenir à l&apos;accueil.
        </p>
        <div className="flex gap-3 justify-center flex-wrap mb-8">
          <button
            onClick={reset}
            className="bg-[#C86E46] text-white text-sm font-semibold px-6 py-3 rounded-xl border-none cursor-pointer hover:opacity-90 transition-opacity"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-block text-sm font-semibold px-6 py-3 rounded-xl no-underline border border-[#C86E46]/40 text-[#8B4513] hover:border-[#C86E46] transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
          <a
            href={`mailto:contact.leprofnomade@gmail.com?subject=${encodeURIComponent('Problème sur LeProfNomade')}&body=${mailBody}`}
            className="inline-block text-sm font-semibold px-6 py-3 rounded-xl no-underline border border-black/10 text-[#8B7355] hover:border-black/25 transition-colors"
          >
            Signaler le problème
          </a>
        </div>

        {/* Détails techniques repliés (charte Article 06) */}
        <details className="text-left bg-[#FAF6F0] rounded-xl border border-black/5 p-4">
          <summary className="text-xs font-semibold text-[#8B7355] cursor-pointer">
            Détails techniques
          </summary>
          <p className="text-xs text-[#8B7355] font-mono mt-3 break-all m-0">
            {error.message || 'Erreur inconnue'}
            {error.digest && (
              <>
                <br />
                Référence : {error.digest}
              </>
            )}
          </p>
        </details>
      </div>
    </div>
  );
}
