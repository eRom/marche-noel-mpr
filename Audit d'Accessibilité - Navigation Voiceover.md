# Audit d'Accessibilité - Navigation VoiceOver

## Synthèse Exécutive

Le site du Marché de Noël du MPR présente une **structure de navigation accceptable mais avec plusieurs opportunités d'amélioration** pour une meilleure expérience avec VoiceOver. Des éléments fondamentaux sont présents, mais des ajustements importants sont nécessaires pour atteindre une conformité WCAG 2.1 AA optimale.

---

## Points Positifs ✅

**Skip Link présent**
La page inclut un lien "Aller au contenu principal" vers l'ID `#main-content`, permettant aux utilisateurs VoiceOver de passer la navigation principale.

**Navigation principale structurée**
Les liens de navigation (Accueil, Programme, Galerie, Plan, À propos) sont clairement énumérés et logiquement organisés.

**Structure HTML sémantique de base**
L'utilisation de titres (`<h1>`, `<h2>`, `<h3>`) crée une hiérarchie logique pour VoiceOver.

**Contenu en français**
Les labels et textes sont entièrement en français, facilitant la navigation pour les utilisateurs francophones.

---

## Problèmes Identifiés ⚠️

### 1. **Landmarks HTML manquants ou insuffisamment marqués**
- **Absence de `<nav>` explicite** : La barre de navigation principale devrait être enveloppée dans un élément `<nav>` avec l'attribut `role="navigation"`
- **Absence de `<main>`** : Le contenu principal devrait être dans une balise `<main>` plutôt qu'un simple div avec ID
- **Footer sans `<footer>` explicite** : La section footer devrait utiliser la balise `<footer>`

**Impact VoiceOver** : Les utilisateurs ne peuvent pas naviguer rapidement vers les sections principales en utilisant les raccourcis de landmarks (N pour "navigation" dans VoiceOver).

***

### 2. **Structure de titres incohérente**
- Le premier titre est un `<h1>` (correct), mais ensuite on retrouve directement des `<h2>` et `<h3>` sans hiérarchie logique
- Les sections du contenu ne sont pas toutes encadrées par des titres explicites

**Impact VoiceOver** : Les utilisateurs utilisant la navigation par titres ne comprennent pas la structure complète du page.

***

### 3. **Boutons et éléments interactifs mal labellisés**
- Le bouton "Passer en mode sombre" devrait avoir un `aria-label` descriptif comme `"Activer le mode sombre"` ou `"Basculer le thème"`
- Les boutons CTA ("Voir le programme", "À propos") pourraient bénéficier de contexte additionnel

**Impact VoiceOver** : L'intention de chaque bouton n'est pas toujours claire.

***

### 4. **Images décoratives vs informatives**
- Les flocons (❄️) et autres éléments visuels peuvent être lus par VoiceOver comme du texte inutile
- Les images ne semblent pas avoir d'`alt` texte approprié (notamment "Image du Marché de Noël MPR")

**Impact VoiceOver** : VoiceOver énonce chaque flocon individuellement, créant du bruit auditif.

***

### 5. **Compteur dynamique ("11 flocons trouvés")**
- Cet élément semble interactif mais sa fonction n'est pas claire pour VoiceOver
- Manque de `role="status"` ou `aria-live="polite"` si le nombre change dynamiquement

**Impact VoiceOver** : Les mises à jour dynamiques ne sont pas annoncées.

***

### 6. **Sections de contenu sans `<section>`**
- Les groupes de contenu ("Pourquoi nous choisir?", "Au profit de l'APRAIH", etc.) ne sont pas explicitement marqués comme des `<section>`

**Impact VoiceOver** : Navigation moins granulaire, structure moins claire.

***

### 7. **Boutons de réseaux sociaux non accessibles**
- Les boutons Facebook, WhatsApp, Twitter, LinkedIn ne semblent pas avoir de texte alternatif ou d'`aria-label`

**Impact VoiceOver** : Les utilisateurs ne savent pas quel réseau social chaque bouton représente.

***

### 8. **QR Code sans description**
- L'alt text "Image du Marché de Noël MPR" n'est pas descriptif pour le QR code
- Devrait être : "QR code - Scannez pour accéder au site du Marché de Noël du MPR"

**Impact VoiceOver** : Les utilisateurs de lecteurs d'écran ne comprennent pas le purpose du code.

***

### 9. **Contraste et lisibilité du mode sombre**
- Le bouton de mode sombre devrait inclure l'état actuel (`aria-pressed="false"` ou `"true"`)

**Impact VoiceOver** : Pas de retour sur l'état du mode actuellement actif.

***

## Conclusion

Le site possède une **base solide** mais nécessite des **améliorations structurelles importantes** pour une accessibilité VoiceOver optimale. Les priorités doivent se concentrer sur les landmarks HTML, la hiérarchie des titres et les labels ARIA. Ces corrections rendront la navigation **significativement plus fluide** pour les utilisateurs de VoiceOver.

[1](https://marche-noel-mpr-git-feature-game-romain-ecarnots-projects.vercel.app/)