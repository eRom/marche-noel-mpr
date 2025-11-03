// Service Worker Registration
// This file handles the registration and lifecycle of the service worker

export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('[SW] Service Workers not supported');
    return;
  }

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('[SW] Service Worker registered:', registration.scope);

      // Vérifier les mises à jour toutes les heures
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000);

      // Gérer les mises à jour du Service Worker
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Nouvelle version disponible
              console.log('[SW] New version available');
              
              // Notifier l'utilisateur (optionnel)
              if (confirm('Une nouvelle version est disponible. Voulez-vous la charger ?')) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
              }
            }
          });
        }
      });

      // Détecter le changement de contrôleur (nouvelle version activée)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[SW] Controller changed, reloading page');
        window.location.reload();
      });

    } catch (error) {
      console.error('[SW] Registration failed:', error);
    }
  });
}

// Fonction pour désinscrire le Service Worker (utile pour le dev)
export function unregisterServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  navigator.serviceWorker.ready
    .then((registration) => {
      registration.unregister();
      console.log('[SW] Service Worker unregistered');
    })
    .catch((error) => {
      console.error('[SW] Unregistration failed:', error);
    });
}

// Fonction pour vider le cache
export async function clearCache() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  if (registration.active) {
    registration.active.postMessage({ type: 'CLEAR_CACHE' });
    console.log('[SW] Cache clear requested');
  }
}

