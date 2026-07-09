// ============================================================
// LeProfNomade — Service Worker
// Stratégie : network-first pour le contenu (leçons toujours
// fraîches), cache-first pour les fichiers statiques (audio,
// icônes). Une page hors-ligne s'affiche si aucun réseau.
// ============================================================

const CACHE_VERSION = 'lpn-v1';
const OFFLINE_URL = '/offline';

// Installation : on pré-cache la page hors-ligne
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.add(OFFLINE_URL))
  );
  self.skipWaiting();
});

// Activation : on nettoie les anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // On ne gère que les GET (jamais les écritures Supabase)
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // On ne touche jamais aux appels Supabase / API : toujours le réseau
  if (url.hostname.includes('supabase') || url.pathname.startsWith('/api')) {
    return;
  }

  // Fichiers audio : cache-first (ils ne changent pas, gain de rapidité)
  if (url.pathname.startsWith('/audio/')) {
    event.respondWith(
      caches.open(CACHE_VERSION).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
      })
    );
    return;
  }

  // Navigation (pages) : network-first → contenu toujours frais,
  // page hors-ligne en secours si pas de réseau
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }
});
