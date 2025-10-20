# 📱 Guide d'Utilisation PWA - Marché de Noël MPR

## 🚀 Installation de l'Application

### Sur Mobile (Android/iOS)

1. **Ouvrez le site** dans Chrome/Safari
2. **Touchez l'icône d'installation** dans la barre d'adresse
3. **Confirmez l'installation** dans la popup
4. **L'app apparaît** sur votre écran d'accueil

### Sur Desktop (Windows/Mac/Linux)

1. **Ouvrez le site** dans Chrome/Edge
2. **Cliquez sur l'icône d'installation** dans la barre d'adresse
3. **Confirmez l'installation** dans la popup
4. **L'app s'ouvre** comme une application native

## ⚡ Raccourcis Disponibles

### Sur Mobile
- **Appui long** sur l'icône de l'app
- **Sélectionnez** le raccourci désiré :
  - 📅 **Programme** : Accès direct au programme
  - 🛍️ **Boutique** : Accès direct à la boutique
  - 💝 **Merci** : Accès direct aux remerciements

### Sur Desktop
- **Clic droit** sur l'icône de l'app
- **Sélectionnez** le raccourci dans le menu contextuel

## 🔗 Partage Natif

### Depuis d'Autres Applications

1. **Sélectionnez du contenu** (texte, image, lien)
2. **Touchez "Partager"**
3. **Choisissez "Marché de Noël MPR"**
4. **Le contenu s'ouvre** dans l'app

### Types de Contenu Supportés

- ✅ **Texte** : Partage de messages
- ✅ **Images** : Partage de photos
- ✅ **Liens** : Partage d'URLs
- ✅ **Fichiers** : Partage de documents

## 📸 Fonctionnalités de Partage

### Page de Partage (/share)

Accédez à la page de partage pour :

#### 🔗 Partager le Lien
- Partage natif du site
- Copie automatique dans le presse-papiers
- Support Web Share API

#### 📷 Partager des Photos
- Sélection de fichiers image
- Upload et partage
- Support multi-fichiers

#### 💬 Partager un Avis
- Saisie de témoignages
- Partage automatique
- Support des réseaux sociaux

#### 📱 QR Code
- Accès rapide via QR code
- Partage offline
- Compatible tous appareils

## 🎨 Personnalisation

### Thème Sombre/Clair
- **Basculement automatique** selon les préférences système
- **Bouton de basculement** dans l'interface
- **Persistance** des préférences

### Orientation
- **Portrait privilégié** pour mobile
- **Adaptation automatique** desktop
- **Support complet** des rotations

## 🔧 Configuration Technique

### Manifest.json

Le manifest inclut :

```json
{
  "name": "Marché de Noël du MPR de Nantes",
  "short_name": "Marché Noël MPR",
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#dc2626",
  "background_color": "#ffffff"
}
```

### Fonctionnalités Avancées

- **Display Override** : Contrôles de fenêtre modernes
- **Launch Handler** : Gestion intelligente des lancements
- **Edge Side Panel** : Support du panneau latéral
- **Share Target** : Partage natif
- **Shortcuts** : Raccourcis d'accès rapide

## 📊 Performance

### Métriques Optimisées

- **LCP** : < 2.5s (Largest Contentful Paint)
- **FID** : < 100ms (First Input Delay)
- **CLS** : < 0.1 (Cumulative Layout Shift)

### Optimisations

- **Images WebP/AVIF** : Formats modernes
- **Lazy Loading** : Chargement différé
- **Service Worker** : Cache intelligent
- **Bundle Splitting** : Code optimisé

## 🛠️ Développement

### Scripts Disponibles

```bash
# Générer les screenshots pour le manifest
npm run screenshots

# Setup PWA complet
npm run pwa:setup

# Tests Lighthouse
npm run lighthouse:both
```

### Configuration Puppeteer

Le script de screenshots utilise :
- **Configuration mobile** : iPhone 12 (390x844)
- **Configuration desktop** : HD (1280x720)
- **Qualité optimale** : PNG 100%
- **Capture complète** : Full page

## 🔍 Dépannage

### Problèmes Courants

#### Installation Impossible
- ✅ Vérifiez que HTTPS est activé
- ✅ Vérifiez que le manifest.json est accessible
- ✅ Vérifiez la console pour les erreurs

#### Raccourcis Non Disponibles
- ✅ Vérifiez la version du navigateur
- ✅ Vérifiez la configuration du manifest
- ✅ Testez sur différents appareils

#### Partage Non Fonctionnel
- ✅ Vérifiez la page /share
- ✅ Vérifiez les permissions
- ✅ Testez avec différents contenus

### Support Navigateur

| Navigateur | Installation | Raccourcis | Partage |
|------------|-------------|------------|---------|
| Chrome | ✅ | ✅ | ✅ |
| Edge | ✅ | ✅ | ✅ |
| Firefox | ✅ | ⚠️ | ⚠️ |
| Safari | ✅ | ✅ | ⚠️ |
| Samsung Internet | ✅ | ✅ | ✅ |

## 📚 Ressources

### Documentation Officielle
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Lighthouse PWA](https://web.dev/lighthouse-pwa/)

### Outils de Test
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PWA Builder](https://www.pwabuilder.com/)
- [Web App Manifest Validator](https://manifest-validator.appspot.com/)

---

## 🎉 Résultat

Votre **Marché de Noël MPR** est maintenant une **PWA complète** avec :

✅ **Installation native** sur tous les appareils  
✅ **Raccourcis intelligents** pour un accès rapide  
✅ **Partage natif** depuis d'autres applications  
✅ **Performance optimale** avec Lighthouse 100/100  
✅ **Expérience utilisateur** de niveau application native  

**Profitez d'une expérience utilisateur exceptionnelle !** 🚀
