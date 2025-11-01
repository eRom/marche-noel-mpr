// Service Worker - Marché de Noël MPR
// Version 1.0.0

const CACHE_VERSION = 'marche-noel-mpr-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// Ressources à mettre en cache immédiatement
const STATIC_ASSETS = [
  '/',
  '/programme',
  '/galerie',
  '/a-propos',
  '/merci',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/favicon.ico',
];

// Limites de cache
const MAX_CACHE_SIZE = 50; // Nombre max d'entrées dans le cache dynamique
const MAX_IMAGE_CACHE_SIZE = 100; // Nombre max d'images en cache

// Helper: Limiter la taille du cache
async function limitCacheSize(cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxSize) {
    await cache.delete(keys[0]);
    await limitCacheSize(cacheName, maxSize);
  }
}

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installation...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Mise en cache des assets statiques');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activation...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE && name !== IMAGE_CACHE)
            .map((name) => {
              console.log('[SW] Suppression ancien cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Stratégies de cache
const cacheStrategies = {
  // Cache First: Pour les assets statiques
  cacheFirst: async (request) => {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    try {
      const networkResponse = await fetch(request);
      if (networkResponse && networkResponse.status === 200) {
        const cache = await caches.open(STATIC_CACHE);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      console.log('[SW] Fetch failed:', error);
      throw error;
    }
  },

  // Network First: Pour les pages HTML et API
  networkFirst: async (request, cacheName = DYNAMIC_CACHE) => {
    try {
      const networkResponse = await fetch(request);
      if (networkResponse && networkResponse.status === 200) {
        const cache = await caches.open(cacheName);
        cache.put(request, networkResponse.clone());
        limitCacheSize(cacheName, MAX_CACHE_SIZE);
      }
      return networkResponse;
    } catch (error) {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        console.log('[SW] Serving from cache:', request.url);
        return cachedResponse;
      }
      
      // Page hors ligne de fallback
      if (request.mode === 'navigate') {
        return new Response(
          `<!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mode Hors Ligne - Marché de Noël MPR</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-align: center;
                padding: 20px;
              }
              .container {
                max-width: 500px;
              }
              h1 {
                font-size: 2.5rem;
                margin-bottom: 1rem;
              }
              p {
                font-size: 1.2rem;
                margin-bottom: 2rem;
                opacity: 0.9;
              }
              .icon {
                font-size: 5rem;
                margin-bottom: 2rem;
              }
              button {
                background: white;
                color: #667eea;
                border: none;
                padding: 15px 30px;
                font-size: 1rem;
                font-weight: bold;
                border-radius: 8px;
                cursor: pointer;
                transition: transform 0.2s;
              }
              button:hover {
                transform: scale(1.05);
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="icon">📡</div>
              <h1>Mode Hors Ligne</h1>
              <p>Vous êtes actuellement hors ligne. Vérifiez votre connexion internet et réessayez.</p>
              <button onclick="window.location.reload()">Réessayer</button>
            </div>
          </body>
          </html>`,
          {
            headers: { 'Content-Type': 'text/html' },
          }
        );
      }
      
      throw error;
    }
  },

  // Stale While Revalidate: Pour les images
  staleWhileRevalidate: async (request) => {
    const cachedResponse = await caches.match(request);
    
    const fetchPromise = fetch(request).then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200) {
        const cache = caches.open(IMAGE_CACHE);
        cache.then((c) => {
          c.put(request, networkResponse.clone());
          limitCacheSize(IMAGE_CACHE, MAX_IMAGE_CACHE_SIZE);
        });
      }
      return networkResponse;
    });
    
    return cachedResponse || fetchPromise;
  },
};

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorer les requêtes vers d'autres domaines (sauf les fonts et images)
  if (url.origin !== location.origin && !url.pathname.match(/\.(woff2?|ttf|eot|svg|png|jpg|jpeg|webp|avif|gif)$/)) {
    return;
  }

  // Stratégie pour les images
  if (request.destination === 'image' || url.pathname.match(/\.(png|jpg|jpeg|webp|avif|gif|svg)$/)) {
    event.respondWith(cacheStrategies.staleWhileRevalidate(request));
    return;
  }

  // Stratégie pour les fonts
  if (request.destination === 'font' || url.pathname.match(/\.(woff2?|ttf|eot)$/)) {
    event.respondWith(cacheStrategies.cacheFirst(request));
    return;
  }

  // Stratégie pour les assets statiques (CSS, JS)
  if (request.destination === 'style' || request.destination === 'script' || url.pathname.match(/\.(css|js)$/)) {
    event.respondWith(cacheStrategies.cacheFirst(request));
    return;
  }

  // Stratégie pour les pages HTML et API
  if (request.destination === 'document' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(cacheStrategies.networkFirst(request));
    return;
  }

  // Stratégie par défaut: Network First
  event.respondWith(cacheStrategies.networkFirst(request));
});

// Message handler pour les communications avec le client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => caches.delete(name))
        );
      })
    );
  }
});

// Notification de mise à jour disponible
self.addEventListener('controllerchange', () => {
  console.log('[SW] Nouvelle version disponible');
});

