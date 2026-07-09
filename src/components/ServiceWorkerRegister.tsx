'use client';

import { useEffect } from 'react';

// Enregistre le service worker au chargement (côté client uniquement).
// À placer une seule fois dans le layout racine.
export function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const register = () => {
        navigator.serviceWorker
          .register('/sw.js')
          .catch((err) => console.warn('SW non enregistré :', err));
      };
      // On attend que la page soit chargée pour ne pas ralentir le démarrage
      if (document.readyState === 'complete') register();
      else window.addEventListener('load', register);
    }
  }, []);

  return null;
}
