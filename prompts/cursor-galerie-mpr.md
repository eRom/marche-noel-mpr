# Prompt Cursor - Page Galerie Photos Marché de Noël du MPR

## Contexte
Je veux ajouter une page `/galerie` à mon site Next.js du Marché de Noël du MPR hébergé sur Vercel avec Cloudflare.
Stack technique : Next.js 15, Tailwind CSS, TypeScript, Vercel, Cloudflare.

## Objectif
Créer une page galerie photo simple et efficace pour afficher les photos du marché avec :
- Grille responsive (masonry/Pinterest style)
- Lightbox plein écran pour voir les photos en détail
- Navigation clavier et souris
- Accessibilité WCAG/RGAA
- Design festif Noël

## Spécifications détaillées

### 1. Structure de la page

**Route** : `/app/galerie/page.tsx`

**Header simple** :
- Titre : "Galerie Photos"
- Sous-titre : "Revivez les moments magiques du Marché de Noël du MPR"
- Pas de filtres
- Pas de barre de navigation supplémentaire
- Pas de footer

### 2. Grille de photos (Masonry layout)

**Disposition responsive** :
- Mobile (< 768px) : 1 colonne
- Tablette (768px - 1024px) : 2 colonnes
- Desktop (> 1024px) : 3-4 colonnes

**Chaque carte photo doit avoir** :
- Image avec lazy loading
- Badge de catégorie (top-right) : "Stands", "Animations", "Visiteurs", "Ambiance"
- Hover effect : zoom smooth (scale 1.05) + overlay sombre
- Info au survol : titre de la photo + date
- Coins arrondis (rounded-lg)
- Ombre (shadow-md → shadow-xl au survol)
- Transition smooth (300ms ease)

### 3. Lightbox/Modal

**Comportement** :
- Click sur photo → ouvre lightbox en fullscreen
- Backdrop sombre (bg-black/95)
- Animation fade-in smooth
- Empêche le scroll du body

**Contenu** :
- Image centrée et responsive (max-w-7xl, max-h-[90vh])
- Bouton fermer (X) en top-right
- Flèches navigation (< >) sur les côtés (gauche/droite)
- Info panel en bas : titre, date, catégorie
- Boutons d'action : Partager, Télécharger
- Compteur position : "3 / 24" en bas au centre

**Interactions** :
- Clavier : Escape = fermer, Flèche gauche = photo précédente, Flèche droite = photo suivante
- Souris : Clic backdrop = fermer, Clic X = fermer
- Les flèches de navigation s'affichent/masquent selon la position (disabled si première/dernière photo)

### 4. Données des photos

Structure JSON pour chaque photo :
```json
{
  "id": "photo-001",
  "url": "/images/galerie/photo-001.jpg",
  "thumbnail": "/images/galerie/photo-001-thumb.jpg",
  "alt": "Description pour l'accessibilité",
  "title": "Titre de la photo",
  "date": "14 décembre 2024",
  "category": "stands" // ou animations, visiteurs, ambiance
}
```

**Source des photos** : à définir (Cloudflare Images, dossier public/images, ou API)

### 5. Design & Styling

**Couleurs** :
- Primary : #DC2626 (rouge Noël)
- Secondary : #B91C1C (rouge foncé)
- Accent : #FEF3C7 (or/doré)
- Background : #FEFEFE (blanc cassé)
- Text : #1F2937 (gris foncé)

**Typographie** :
- Titre : text-4xl md:text-5xl font-bold text-red-700
- Sous-titre : text-lg text-gray-600
- Info photo : text-sm opacity-80

**Thème festif** :
- Dégradé background : from-red-50 to-white
- Animations smooth avec framer-motion
- Effets hover fluides

### 6. Accessibilité (WCAG/RGAA)

- ✅ Alt text sur toutes les images
- ✅ Attributs ARIA (role, aria-label, aria-pressed) sur les boutons
- ✅ Navigation complète au clavier
- ✅ Focus visible sur tous les éléments interactifs
- ✅ Contraste suffisant (texte sur background)
- ✅ Sémantique HTML correcte (h1, h2, button, etc.)

### 7. Performance

- Image optimization avec Next.js Image component
- Lazy loading natif
- Préchargement des images adjacentes dans lightbox
- Pas de blocker (CSS/JS bien optimisé)

## Fichiers à créer

1. **`app/galerie/page.tsx`** - Page principale
2. **`components/GalleryGrid.tsx`** - Composant grille
3. **`components/Lightbox.tsx`** - Composant lightbox
4. **`lib/galleryData.ts`** - Données des photos
5. **`types/gallery.ts`** - Types TypeScript

## Packages requis

```bash
npm install framer-motion lucide-react
```

## Notes additionnelles

- Utiliser `'use client'` pour les composants interactifs
- Préférer Tailwind CSS pour le styling
- Pas de CSS-in-JS supplémentaire
- Code TypeScript strict
- Composants réutilisables et modulaires
- Gestion des erreurs (image not found, etc.)

---

## Démarrage

1. Copy-paste ce prompt dans Cursor
2. Cursor génère les fichiers nécessaires
3. Ajuste les données des photos (URLs, titres, dates)
4. Teste la navigation et l'accessibilité
5. Déploie sur Vercel

---

**Exemple d'utilisation** :
```bash
# Dans Cursor, sélectionner le dossier du projet et demander :
# "Crée la page galerie avec la structure décrite dans ce prompt"
```
