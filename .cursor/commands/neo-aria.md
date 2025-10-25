---
description: Audit project for accessibility
---

## Objectifs
Auditer et corriger l'application Next.js pour assurer la conformité avec :

- **RGAA 4.1.2** (Référentiel Général d'Amélioration de l'Accessibilité)
- **WCAG 2.1 niveau AA** (Web Content Accessibility Guidelines)
- **WAI-ARIA 1.2** (Accessible Rich Internet Applications)


## Steps

### 1. Audit ESLint
**Outil :** `npm run lint:audit`
**Description :** Analyse statique du code JSX/TSX pour détecter les violations des règles d'accessibilité (attributs ARIA manquants, images sans `alt`, formulaires sans labels, etc.).
**Sortie :** `aria-reports/eslint-a11y-report.json` avec la liste des problèmes détectés.

### 2. Audit Axe-core
**Outil :** `npm run axe`
**Description :** Exécute Axe-core via CLI pour tester automatiquement la page contre les critères WCAG 2.1 niveau AA. Génère un rapport JSON détaillé des violations, avertissements et réussites.
**Sortie :** `aria-reports/lighthouse.json` avec la liste des problèmes détectés.

### 3. Audit Lighthouse
**Outil :** `npm run lighthouse:audit`
**Description :** Génère un audit complet d'accessibilité via Google Lighthouse. Score de 0 à 100 basé sur les meilleures pratiques WCAG et les recommandations d'accessibilité web.
**Sortie :** `aria-reports/lighthouse.json` avec score global et détails des vérifications.

### Documentation Officielle si besoin
- RGAA 4.1.2 : https://accessibilite.numerique.gouv.fr/
- WCAG 2.1 : https://www.w3.org/TR/WCAG21/
- WAI-ARIA APG : https://www.w3.org/WAI/ARIA/apg/
- Next.js Accessibility : https://nextjs.org/docs/architecture/accessibility

## Résumé Exécutif
- **Score Lighthouse** : X/100
- **Violations Axe-core** : X critiques, X modérées, X mineures
- **Conformité ESLint** : X% (X erreurs corrigées)
- **Conformité RGAA 4.1.2** : X%
- **Conformité WCAG 2.1 AA** : X%
