# Service Worker Configuration Template

```javascript
// public/sw.js
const CACHE_NAME = 'marche-noel-mpr-v1';
const urlsToCache = [
  '/',
  '/programme',
  '/merci',
  '/share',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```
