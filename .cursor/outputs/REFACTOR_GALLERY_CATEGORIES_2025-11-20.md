# Refactorisation de la gestion des catégories de la galerie

## Ce qui a été fait

J'ai centralisé la gestion des catégories de la galerie photo pour résoudre le problème de fragmentation du code (types, couleurs, validation, labels dispersés).

### 1. Création d'une configuration centrale

Un nouveau fichier `src/config/gallery.ts` contient désormais la source unique de vérité pour les catégories :

```typescript
export const GALLERY_CATEGORIES = {
  stands: { label: "Stands", color: "bg-red-600" },
  animations: { label: "Animations", color: "bg-green-600" },
  visiteurs: { label: "Visiteurs", color: "bg-blue-600" },
  ambiance: { label: "Ambiance", color: "bg-purple-600" },
  MPR: { label: "MPR", color: "bg-yellow-600" },
  IA: { label: "IA", color: "bg-pink-600" },
} as const;
```

### 2. Mise à jour des types

Le type `GalleryImage` dans `src/types/gallery.ts` utilise maintenant dynamiquement les clés de cette configuration.

### 3. Refactorisation des composants et de l'API

Tous les fichiers suivants utilisent désormais la configuration centrale :

- **`src/components/GalleryGrid.tsx`** : Utilise `getCategoryColor` et `getCategoryLabel` pour l'affichage des badges.
- **`src/components/Lightbox.tsx`** : Idem pour la lightbox.
- **`src/components/GalleryUpload.tsx`** : Génère les options du select dynamiquement depuis `GALLERY_CATEGORIES`.
- **`src/lib/galleryData.ts`** : Valide les catégories lors de la lecture des blobs avec `VALID_CATEGORIES`.
- **`src/app/api/gallery/upload/route.ts`** : Utilise `VALID_CATEGORIES` pour valider les uploads côté serveur.

## Avantages

- **Maintenance simplifiée** : Ajouter ou modifier une catégorie se fait à un seul endroit (`src/config/gallery.ts`).
- **Robustesse** : Les types TypeScript garantissent que seules les catégories valides sont utilisées.
- **Cohérence UI/API** : Le front et le back partagent strictement les mêmes définitions.

## Prochaines étapes

- Si vous souhaitez ajouter de nouvelles catégories, il suffit de les ajouter dans `src/config/gallery.ts`.
- Vous pouvez modifier les couleurs ou les libellés directement dans ce même fichier.
