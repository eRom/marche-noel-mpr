# Correction CLS sur la page "À propos"

## What was done
Amélioration du score CLS (Cumulative Layout Shift) sur la page `src/app/a-propos/page.tsx` en supprimant les imports dynamiques (`next/dynamic`) pour les composants structurels critiques.

## Key decisions and changes

1.  **Suppression des Imports Dynamiques** :
    -   Les composants `Header`, `Footer`, `AnimatedSection` et `TeamApraih` étaient chargés dynamiquement avec des "placeholders" de taille incorrecte ou nulle.
    -   Cela provoquait un décalage important du contenu lors du chargement effectif des composants (pop-in effect), pénalisant le score CLS (0.36 → objectif < 0.1).

2.  **Passage en Imports Statiques** :
    -   Remplacement par des `import` standards.
    -   Cela permet au serveur (SSR) de générer le HTML complet avec les dimensions correctes dès le départ, assurant une stabilité visuelle immédiate.

## Code examples

**Avant (Dynamic Import) :**
```typescript
const Header = dynamic(() => import("@/components/Header"), {
  loading: () => <div className="bg-background h-16" />,
});
```

**Après (Static Import) :**
```typescript
import Header from "@/components/Header";
```

## Next steps
-   Surveiller les rapports Vercel/Lighthouse pour confirmer que le CLS est redescendu dans la zone verte ("Good").
-   Appliquer la même logique aux autres pages si des problèmes de CLS similaires sont détectés sur des éléments de mise en page critiques.

