export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#EFE7D9' }}>
      <div className="text-center max-w-sm">
        <p className="text-5xl mb-4">✈️</p>
        <h1 className="font-display text-2xl mb-3" style={{ color: '#8B4513' }}>
          Ton avion est encore à quai
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Pas de connexion pour l&apos;instant. Vérifie ton réseau et réessaie —
          ton voyage reprend dès que tu es de nouveau en ligne.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold text-white border-none cursor-pointer"
          style={{ background: '#C86E46' }}
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
