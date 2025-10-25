# Tests d'accessibilité avec axe-core/cli

Ce projet utilise `axe-core/cli` pour tester l'accessibilité du site du Marché de Noël MPR.

## Scripts disponibles

### Tests de base
```bash
# Test rapide sur localhost:3000
npm run axe:dev

# Test complet avec toutes les URLs configurées
npm run axe

# Test complet avec rapport JSON
npm run axe:all

# Test pour CI/CD (exit avec code d'erreur si problèmes)
npm run axe:ci
```

## Configuration

Le fichier `axe.config.js` contient :
- **URLs à tester** : `/`, `/programme`, `/merci`
- **Règles WCAG 2.1 AA** : Contrastes, navigation clavier, ARIA, etc.
- **Rapports** : Sauvegardés dans `./axe-reports/`

## Règles testées

### Critiques pour un site événementiel
- ✅ **Contraste de couleurs** : Vérifie les contrastes sur votre thème Noël
- ✅ **Navigation clavier** : Teste la navigation avec Tab/Enter
- ✅ **Attributs ARIA** : Valide les rôles et propriétés ARIA
- ✅ **Images** : Vérifie les textes alternatifs
- ✅ **Formulaires** : Contrôle les labels et champs
- ✅ **Structure** : Valide les titres et la hiérarchie

### Spécifiques aux composants interactifs
- ✅ **Boutons** : Vérifie les noms accessibles
- ✅ **Menus** : Teste les états expanded/collapsed
- ✅ **Focus** : Contrôle la gestion du focus
- ✅ **Rôles** : Valide les rôles ARIA appropriés

## Intégration dans le workflow

### Développement
```bash
# Démarrer le serveur de dev
npm run dev

# Dans un autre terminal, tester l'accessibilité
npm run axe:dev
```

### CI/CD
```bash
# Build et test d'accessibilité
npm run build
npm run axe:ci
```

## Rapports

Les rapports sont générés dans `./axe-reports/` au format JSON, permettant :
- Analyse détaillée des violations
- Suivi des améliorations
- Intégration dans des outils de monitoring

## Bonnes pratiques

1. **Tester régulièrement** : Lancez `npm run axe:dev` pendant le développement
2. **Avant déploiement** : Utilisez `npm run axe:ci` pour valider
3. **Corriger progressivement** : axe-core classe les violations par criticité
4. **Tester les thèmes** : axe-core détecte automatiquement les changements de thème

## Complémentarité

- **eslint-plugin-jsx-a11y** : Analyse statique du code JSX
- **axe-core/cli** : Test du DOM rendu dans le navigateur
- **Lighthouse** : Performance et accessibilité globale

Cette combinaison offre une couverture complète de l'accessibilité pour votre projet.
