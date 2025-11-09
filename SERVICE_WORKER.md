# 🚀 Service Worker - Marché de Noël MPR

## Vue d'ensemble

Le Service Worker implémente une stratégie de cache intelligente pour améliorer les performances et permettre le fonctionnement hors ligne de l'application.

## 📦 Fonctionnalités

### 1. **Stratégies de Cache**

#### 🎯 Cache First (Assets Statiques)

- **Utilisation**: CSS, JavaScript, Fonts
- **Fonctionnement**: Sert depuis le cache si disponible, sinon depuis le réseau
- **Avantages**: Chargement ultra-rapide des assets statiques

#### 🌐 Network First (Pages HTML & API)

- **Utilisation**: Pages HTML, routes API
- **Fonctionnement**: Essaie le réseau d'abord, fallback sur le cache
- **Avantages**: Contenu toujours à jour quand en ligne, disponible hors ligne

#### 🔄 Stale While Revalidate (Images)

- **Utilisation**: Toutes les images (PNG, JPG, WEBP, AVIF, etc.)
- **Fonctionnement**: Sert le cache immédiatement, met à jour en arrière-plan
- **Avantages**: Chargement instantané + contenu frais

### 2. **Mode Hors Ligne**

Quand l'utilisateur est hors ligne :

- ✅ Pages visitées précédemment accessibles
- ✅ Images en cache disponibles
- ✅ Page de fallback élégante avec bouton "Réessayer"

### 3. **Gestion du Cache**

- **Limite cache dynamique**: 50 entrées
- **Limite cache images**: 100 images
- **Nettoyage automatique**: Les anciennes versions sont supprimées lors des mises à jour
- **Cache statique**: Assets critiques mis en cache lors de l'installation

## 📁 Structure des Fichiers

```
public/
  └── sw.js                                    # Service Worker
src/
  ├── app/
  │   └── register-sw.ts                       # Enregistrement & lifecycle
  └── components/
      └── ServiceWorkerRegistration.tsx        # Composant React
```

## 🔧 Configuration

### Assets Mis en Cache (Installation)

```javascript
const STATIC_ASSETS = [
  "/",
  "/programme",
  "/galerie",
  "/a-propos",
  "/merci",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/favicon.ico",
];
```

### Versions de Cache

```javascript
const CACHE_VERSION = "marche-noel-mpr-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
```

## 🎮 Utilisation

### Enregistrement Automatique

Le Service Worker s'enregistre automatiquement en production :

```typescript
// src/app/layout.tsx
<ServiceWorkerRegistration />
```

### Fonctions Utilitaires

```typescript
import {
  registerServiceWorker,
  unregisterServiceWorker,
  clearCache,
} from "@/app/register-sw";

// Enregistrer le Service Worker
registerServiceWorker();

// Désinscrire (dev uniquement)
unregisterServiceWorker();

// Vider le cache
clearCache();
```

## 🔄 Cycle de Vie

### 1. Installation

- Téléchargement du Service Worker
- Mise en cache des assets statiques
- `skipWaiting()` pour activation immédiate

### 2. Activation

- Suppression des anciens caches
- Prise de contrôle des clients existants

### 3. Fetch (Interception)

- Application des stratégies de cache selon le type de ressource
- Gestion des erreurs réseau

### 4. Mise à Jour

- Vérification automatique toutes les heures
- Notification à l'utilisateur si nouvelle version disponible
- Option de rechargement immédiat

## 📊 Stratégie par Type de Ressource

| Type de Ressource | Stratégie              | Cache   | Limite |
| ----------------- | ---------------------- | ------- | ------ |
| HTML (pages)      | Network First          | Dynamic | 50     |
| CSS / JS          | Cache First            | Static  | ∞      |
| Images            | Stale While Revalidate | Images  | 100    |
| Fonts             | Cache First            | Static  | ∞      |
| API               | Network First          | Dynamic | 50     |

## 🧪 Tests

### Test du Mode Hors Ligne

1. Ouvrir l'application en ligne
2. Naviguer sur plusieurs pages
3. Ouvrir DevTools > Application > Service Workers
4. Cocher "Offline"
5. Naviguer sur les pages visitées → ✅ Fonctionnel
6. Visiter une nouvelle page → ⚠️ Page de fallback

### Test du Cache

```javascript
// Console DevTools
caches.keys().then(console.log); // Liste des caches
caches.open("marche-noel-mpr-v1-static").then((cache) => {
  cache.keys().then(console.log); // Contenu du cache
});
```

### Forcer la Mise à Jour

```javascript
// Console DevTools
navigator.serviceWorker.getRegistration().then((reg) => {
  reg.update(); // Force la vérification de mise à jour
});
```

## 🐛 Débogage

### Chrome DevTools

1. Ouvrir **DevTools** (F12)
2. Aller dans **Application** > **Service Workers**
3. Options disponibles :
   - 🔄 Update : Force la vérification de mise à jour
   - 🗑️ Unregister : Désinstalle le Service Worker
   - 📡 Offline : Simule le mode hors ligne

### Console Logs

Le Service Worker logge ses actions :

```
[SW] Installation...
[SW] Mise en cache des assets statiques
[SW] Activation...
[SW] Suppression ancien cache: marche-noel-mpr-v0-static
[SW] Service Worker registered: /
```

## 🔐 Sécurité

- ✅ HTTPS obligatoire (ou localhost en dev)
- ✅ Scope limité à `/`
- ✅ Pas d'accès aux cookies sensibles
- ✅ Isolation par domaine

## 📈 Performance

### Gains Attendus

- **FCP (First Contentful Paint)**: -30% (assets en cache)
- **LCP (Largest Contentful Paint)**: -25% (images en cache)
- **TTI (Time to Interactive)**: -40% (JS/CSS en cache)
- **Offline**: 100% de disponibilité pour les pages visitées

### Métriques

```javascript
// Mesurer l'efficacité du cache
caches.open("marche-noel-mpr-v1-images").then((cache) => {
  cache.keys().then((keys) => {
    console.log(`Images en cache: ${keys.length}`);
  });
});
```

## 🚧 Limitations

- ⚠️ Ne fonctionne qu'en HTTPS (ou localhost)
- ⚠️ Limite de stockage navigateur (~50MB sur mobile, ~100MB sur desktop)
- ⚠️ Nécessite un rechargement pour les mises à jour

## 🔮 Améliorations Futures

- [ ] Background Sync pour les formulaires hors ligne
- [ ] Push Notifications pour les événements
- [ ] Précaching prédictif basé sur l'historique de navigation
- [ ] Compression Brotli/Gzip des assets en cache
- [ ] Analytics hors ligne avec queue

## 📚 Ressources

- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Workbox (library Google)](https://developers.google.com/web/tools/workbox)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Cache Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)

---

**Version**: 1.0.0  
**Dernière mise à jour**: Novembre 2025  
**Compatibilité**: Chrome 40+, Firefox 44+, Safari 11.1+, Edge 17+
