'use client';

// Filet de sécurité ultime : si le layout racine lui-même plante,
// Next.js affiche ce composant (il doit fournir <html> et <body>).
// Version minimale, sans dépendance au reste de l'app.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#EFE7D9',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: 420 }}>
          <p style={{ fontSize: 56, margin: '0 0 16px' }}>✈️</p>
          <h1 style={{ color: '#3D2D14', fontSize: 28, margin: '0 0 12px' }}>
            Grosses turbulences !
          </h1>
          <p style={{ color: '#8B7355', fontSize: 14, lineHeight: 1.6, margin: '0 0 24px' }}>
            Le site a rencontré un problème inattendu. Réessaie — si ça
            persiste, écris-nous à contact.leprofnomade@gmail.com
            {error.digest ? ` (référence : ${error.digest})` : ''}.
          </p>
          <button
            onClick={reset}
            style={{
              background: '#C86E46',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '12px 24px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
