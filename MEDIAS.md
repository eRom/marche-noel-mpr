# 🎨 Système de Médias - Marché de Noël MPR

Ce document décrit le système de gestion des médias et icônes pour l'application Marché de Noël MPR.

## 📁 Structure des fichiers

### Logo source

- **Fichier** : `logo.png` (racine du projet)
- **Usage** : Source unique pour générer toutes les icônes

### Icônes générées (dossier `public/`)

| Fichier                | Type | Taille  | Description       | Usage                                 |
| ---------------------- | ---- | ------- | ----------------- | ------------------------------------- |
| `apple-touch-icon.png` | PNG  | 180x180 | Icône Apple Touch | iOS Safari, ajout à l'écran d'accueil |
| `favicon-16x16.png`    | PNG  | 16x16   | Favicon petit     | Navigateurs modernes                  |
| `favicon-32x32.png`    | PNG  | 32x32   | Favicon moyen     | Navigateurs modernes                  |
| `favicon.ico`          | PNG  | 32x32   | Favicon classique | Compatibilité navigateurs             |
| `icon-192.png`         | PNG  | 192x192 | Icône PWA         | Progressive Web App                   |
| `icon-512.png`         | PNG  | 512x512 | Icône PWA         | Progressive Web App                   |
| `icon.png`             | PNG  | 64x64   | Icône standard    | Interface générale                    |
| `icon.svg`             | SVG  | 64x64   | Icône vectorielle | Interface moderne                     |
| `logo.svg`             | SVG  | 64x64   | Logo vectoriel    | Branding                              |

## 🚀 Commandes disponibles

### Génération des icônes

```bash
# Générer toutes les icônes
npm run icons

# Surveiller les changements du logo source
npm run icons:watch
```

### Script manuel

```bash
node scripts/generate-icons.js
```

## ⚙️ Configuration

### Manifest PWA (`public/manifest.json`)

- Configuration complète pour Progressive Web App
- Référence toutes les icônes nécessaires
- Métadonnées optimisées pour le marché de Noël

### Layout Next.js (`src/app/layout.tsx`)

- Métadonnées complètes intégrées
- Support Apple Web App
- Configuration viewport optimisée
- Langue française par défaut

## 🔧 Personnalisation

### Modifier les icônes

1. Remplacez le fichier `logo.png` à la racine
2. Exécutez `npm run icons`
3. Toutes les icônes seront régénérées automatiquement

### Ajuster les tailles

Modifiez le fichier `scripts/generate-icons.js` :

```javascript
const iconConfigs = [
  { name: "apple-touch-icon.png", size: 180, format: "png" },
  // Ajoutez ou modifiez les configurations ici
];
```

## 📊 Résumé des fichiers générés

- **Total** : 9 fichiers d'images/icônes
- **Formats** : PNG (7), SVG (2), ICO (1)
- **Taille totale** : Variable selon le logo source
- **Optimisation** : Qualité 90% pour les PNG, fond transparent

## 🎯 Bonnes pratiques

1. **Logo source** : Utilisez un logo carré ou avec un ratio 1:1 pour de meilleurs résultats
2. **Qualité** : Le logo source doit être de haute résolution (minimum 512x512)
3. **Format** : PNG avec transparence recommandé pour le logo source
4. **Régénération** : Régénérez les icônes après chaque modification du logo source

## 🔍 Vérification

Pour vérifier que toutes les icônes sont correctement générées :

```bash
ls -la public/ | grep -E "\.(png|svg|ico)$"
```

## 📱 Support des appareils

- ✅ **iOS Safari** : Apple Touch Icon
- ✅ **Android Chrome** : PWA Icons (192x192, 512x512)
- ✅ **Navigateurs modernes** : Favicons multiples
- ✅ **Compatibilité** : Favicon ICO pour anciens navigateurs
- ✅ **PWA** : Manifest complet avec toutes les icônes
