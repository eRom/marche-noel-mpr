# 🎨 Animations - Marché de Noël MPR

## Vue d'ensemble

Le site intègre un ensemble d'animations festives pour créer une expérience immersive et moderne pour les visiteurs du marché de Noël.

## ❄️ Animations Implémentées

### 1. **Flocons de Neige Globaux**

**Fichier**: `src/components/SnowfallEffect.tsx`

- ✨ 50 flocons de neige animés sur toute la page
- 🎯 Mouvement réaliste avec dérive horizontale
- 💫 Opacité variable pour l'effet de profondeur
- 🎭 Boucle infinie avec delays aléatoires
- 🚫 `pointer-events: none` pour ne pas gêner l'interaction

**Caractéristiques** :
```typescript
- Nombre de flocons : 50
- Taille : 2-5px
- Durée : 15-25 secondes
- Dérive horizontale : ±50px
- Z-index : 50 (au-dessus du contenu)
```

---

### 2. **Stagger Animations sur les Cards**

**Fichier**: `src/components/AnimatedSection.tsx` + `src/app/page.tsx`

- 📦 Cards qui apparaissent en cascade (stagger)
- ⏱️ Délai de 0.15s entre chaque card
- 🎬 Animation `fadeInUp` avec Framer Motion
- 👀 Déclenchée par Intersection Observer

**Utilisation** :
```tsx
<AnimatedSection staggerChildren staggerDelay={0.15}>
  <StaggerItem>Card 1</StaggerItem>
  <StaggerItem>Card 2</StaggerItem>
  <StaggerItem>Card 3</StaggerItem>
</AnimatedSection>
```

**Effet** :
- Opacité 0 → 1
- Translation Y : 20px → 0
- Durée : 0.5s
- Easing : `easeOut`

---

### 3. **Hover Effects 3D Subtils**

**Fichier**: `src/app/globals.css`

Classe CSS `.card-3d` pour les cards interactives :

```css
.card-3d:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 20px 40px -10px rgba(0, 0, 0, 0.15),
    0 0 20px rgba(220, 38, 38, 0.1);
}
```

**Caractéristiques** :
- ⬆️ Élévation de 8px au survol
- 🔍 Scale légère (1.02x)
- 💡 Ombre portée dynamique
- 🎨 Glow rouge subtil (thème Noël)
- ⚡ Transition fluide : `cubic-bezier(0.23, 1, 0.32, 1)`
- 👆 État actif avec réduction (UX feedback)

---

### 4. **Guirlandes Lumineuses Animées**

**Fichier**: `src/components/ChristmasLights.tsx`

Guirlande festive en haut de page avec lumières clignotantes :

- 💡 20 lumières colorées
- 🎨 Couleurs de Noël : rouge, vert, or, bleu
- ✨ Animation de clignotement indépendante
- 🌊 Fil ondulé (SVG path)
- 🔆 Effet de glow autour de chaque lumière

**Animation** :
```typescript
animate={{
  opacity: [0.3, 1, 0.3],
  scale: [0.9, 1.1, 0.9],
}}
transition={{
  duration: 2s,
  delay: staggered (0.1s * index),
  repeat: Infinity,
}}
```

**Structure** :
- Fil de guirlande (SVG path ondulé)
- Douille grise pour chaque bulbe
- Bulbe coloré avec reflet blanc
- Effet de glow animé en arrière-plan

---

### 5. **Smooth Scroll**

**Fichiers**: 
- `src/app/globals.css` - CSS global
- `src/components/SmoothScroll.tsx` - Script custom

**CSS Global** :
```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* Compense header fixe */
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto; /* Accessibilité */
  }
}
```

**Script Custom** :
- Intercepte les clics sur les ancres `#`
- Utilise `scrollIntoView({ behavior: 'smooth' })`
- Met à jour l'URL sans rechargement
- Respecte `prefers-reduced-motion`

---

## 🎭 Animations Existantes (Conservées)

### **AnimatedSection Component**
- `fadeInUp` - Apparition depuis le bas
- `fadeInLeft` - Apparition depuis la gauche
- `fadeInRight` - Apparition depuis la droite
- Déclenchement au scroll via Intersection Observer

### **Twinkle Effect**
```css
@keyframes twinkle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```
- Utilisé sur les éléments décoratifs du HeroSection
- Scintillement doux et continu

### **CeremonyTimer**
- Flocons de neige animés (Framer Motion)
- Countdown avec animation des chiffres
- Émojis animés

### **Lightbox Gallery**
- AnimatePresence (Framer Motion)
- Fade in/out
- Transitions entre images

### **ShareSection**
- Hover scale sur les boutons sociaux
- Scale 1.05 + shadow-xl
- Icon rotation au survol

---

## 📊 **Performance**

### ✅ **Optimisations Appliquées**

1. **GPU Acceleration**
   - `will-change: transform` sur `.card-3d`
   - `transform-style: preserve-3d`

2. **Réduction des Re-renders**
   - `pointer-events: none` sur les effets décoratifs
   - `aria-hidden="true"` sur les animations

3. **Respect Accessibilité**
   - `@media (prefers-reduced-motion: reduce)`
   - Désactivation automatique si demandée

4. **Lazy Loading**
   - Framer Motion chargé uniquement où nécessaire
   - Intersection Observer pour déclenchement au scroll

### 📈 **Métriques Estimées**

| Animation | CPU Impact | GPU Impact | Bundle Size |
|-----------|-----------|-----------|-------------|
| Snowfall | Faible | Moyen | ~2KB |
| Stagger | Minimal | Faible | ~1KB |
| Hover 3D | Minimal | Faible | <1KB |
| Christmas Lights | Faible | Moyen | ~2KB |
| Smooth Scroll | Minimal | Minimal | <1KB |

**Total Overhead** : ~6KB + Framer Motion (déjà utilisé)

---

## 🎯 **Configuration**

### **Désactiver Certaines Animations**

#### Flocons de Neige
```tsx
// src/app/layout.tsx
// Commenter cette ligne :
<SnowfallEffect />
```

#### Guirlandes Lumineuses
```tsx
// src/app/layout.tsx
// Commenter cette ligne :
<ChristmasLights />
```

#### Smooth Scroll
```css
/* src/app/globals.css */
html {
  scroll-behavior: auto; /* Au lieu de smooth */
}
```

### **Ajuster les Paramètres**

#### Nombre de Flocons
```tsx
// src/components/SnowfallEffect.tsx
const flakeCount = 50; // Modifier ce nombre
```

#### Vitesse de Clignotement des Lumières
```tsx
// src/components/ChristmasLights.tsx
transition={{
  duration: 2, // Augmenter pour ralentir
  // ...
}}
```

#### Délai Stagger
```tsx
// src/app/page.tsx
<AnimatedSection staggerChildren staggerDelay={0.15}>
  {/* Modifier staggerDelay */}
</AnimatedSection>
```

---

## 🧪 **Tests**

### Test Visuel
```bash
npm run dev
# Ouvrir http://localhost:3000
# Vérifier :
# - Flocons tombent correctement
# - Cards apparaissent en cascade
# - Hover 3D fonctionne
# - Guirlandes clignotent
# - Scroll est fluide
```

### Test Performance
```bash
npm run build
npm run start
npm run lighthouse:both
```

Vérifier que :
- ✅ LCP < 2.5s
- ✅ CLS < 0.1
- ✅ FID < 100ms

### Test Accessibilité
```bash
# Dans Chrome DevTools
# Activer : "Emulate CSS prefers-reduced-motion"
# Vérifier que les animations se désactivent
```

---

## 🎨 **Personnalisation**

### Couleurs des Guirlandes
```tsx
// src/components/ChristmasLights.tsx
const colors = [
  '#dc2626', // Rouge
  '#16a34a', // Vert
  '#eab308', // Or
  '#3b82f6', // Bleu
  // Ajouter vos couleurs
];
```

### Effet Hover 3D
```css
/* src/app/globals.css */
.card-3d:hover {
  transform: translateY(-8px) scale(1.02);
  /* Modifier l'élévation et le scale */
}
```

### Vitesse des Animations
```css
/* src/app/globals.css */
@keyframes fadeInUp {
  /* Modifier la durée dans les classes */
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
  /* Changer 0.6s */
}
```

---

## 🐛 **Dépannage**

### Animations Saccadées

**Cause** : Performance CPU/GPU insuffisante
**Solution** :
```css
/* Réduire le nombre de flocons */
const flakeCount = 25; // Au lieu de 50

/* Ou désactiver les flocons */
// <SnowfallEffect />
```

### Scroll Pas Fluide

**Cause** : Trop d'animations simultanées
**Solution** :
```css
html {
  scroll-behavior: auto; /* Désactiver */
}
```

### Guirlandes Ne S'affichent Pas

**Cause** : Z-index ou overflow
**Solution** :
```tsx
// Vérifier dans ChristmasLights.tsx
className="fixed top-0 ... z-40"
// Augmenter z-index si nécessaire
```

---

## 📚 **Ressources**

- [Framer Motion Docs](https://www.framer.com/motion/)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Prefers Reduced Motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

---

**Version** : 1.0.0  
**Dernière mise à jour** : Novembre 2025  
**Compatibilité** : Tous navigateurs modernes

