---
description: Audit project for accessibility
---

## Objectifs

Auditer et corriger l'application Next.js pour assurer la conformité avec :

- **RGAA 4.1.2** (Référentiel Général d'Amélioration de l'Accessibilité)
- **WCAG 2.1 niveau AA** (Web Content Accessibility Guidelines)
- **WAI-ARIA 1.2** (Accessible Rich Internet Applications)

**Résultats attendus :**
- Score Lighthouse Accessibility ≥ 90
- 100% de conformité ESLint jsx-a11y
- Navigation clavier complète fonctionnelle


## Steps

### 1. Audit Automatisé ESLint

```bash
npx eslint . --ext .js,.jsx,.ts,.tsx
```

**Description :** Analyse statique du code JSX/TSX pour détecter les violations des règles d'accessibilité (attributs ARIA manquants, images sans `alt`, formulaires sans labels, etc.).

**Critères vérifiés :**
- Attributs `alt` sur les images
- Labels associés aux champs de formulaire
- Rôles ARIA valides
- Navigation clavier accessible
- Éléments interactifs avec événements clavier

### 2. Audit Axe-core

```bash
npm run axe:ci
```

**Description :** Exécute Axe-core via CLI pour tester automatiquement la page contre les critères WCAG 2.1 niveau AA. Génère un rapport JSON détaillé des violations, avertissements et réussites.

**Critères vérifiés :**
- Contraste des couleurs (ratio 4.5:1 minimum)
- Structure des titres (hiérarchie logique)
- Landmarks ARIA
- Formulaires accessibles
- Alternatives textuelles
- Navigation clavier
- État et propriétés ARIA

**Sortie :** `aria-reports/` avec la liste des problèmes détectés.

### 3. Audit Lighthouse

```bash
npm run lighthouse:audit
```
**Description :** Génère un audit complet d'accessibilité via Google Lighthouse. Score de 0 à 100 basé sur les meilleures pratiques WCAG et les recommandations d'accessibilité web.

**Critères vérifiés :**
- Contraste des couleurs
- Noms accessibles pour les boutons et liens
- Attributs ARIA valides
- Images avec texte alternatif
- Métadonnées de la page (`<title>`, `<html lang>`)
- Navigation clavier
- Éléments `<frame>` et `<iframe>` avec titres
- Formulaires accessibles
- Ordre logique des titres

**Sortie :** `aria-reports/lighthouse.json` avec score global et détails des vérifications.

### Documentation Officielle
- RGAA 4.1.2 : https://accessibilite.numerique.gouv.fr/
- WCAG 2.1 : https://www.w3.org/TR/WCAG21/
- WAI-ARIA APG : https://www.w3.org/WAI/ARIA/apg/
- Next.js Accessibility : https://nextjs.org/docs/architecture/accessibility
- 
## Deliverables

1. **Analyser** automatiquement les problèmes détectés
2. **Prioriser** les corrections (Critiques > Majeurs > Mineurs)
3. **Appliquer** les modifications au code
4. **Valider** que les corrections ne cassent rien

**Catégories de corrections :**
- Structure HTML et landmarks ARIA
- Navigation et gestion du focus
- Alternatives textuelles (images, SVG, icônes)
- Formulaires (labels, erreurs, autocomplete)
- Composants interactifs (modals, dropdowns, tabs)
- Couleurs et contrastes
- Métadonnées et SEO

**Critères de succès :**
- 0 erreur ESLint accessibilité
- 0 violation critique Axe-core
- Score Lighthouse ≥ 90
- Navigation clavier 100% fonctionnelle

## Résumé Exécutif
- **Score Lighthouse** : X/100
- **Violations Axe-core** : X critiques, X modérées, X mineures
- **Conformité ESLint** : X% (X erreurs corrigées)
- **Conformité RGAA 4.1.2** : X%
- **Conformité WCAG 2.1 AA** : X%
