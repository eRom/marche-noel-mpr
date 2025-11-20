# Correction du mode Dark/Light

## What was done
Correction du problème de basculement entre le mode clair et sombre (Light/Dark mode) qui ne s'appliquait pas correctement.

## Key decisions and changes

1.  **Tailwind CSS v4 Configuration**:
    - Ajout de la directive `@custom-variant dark (&:where(.dark, .dark *));` dans `src/app/globals.css`.
    - Ceci active la stratégie de classe pour le mode sombre, nécessaire pour le fonctionnement avec `next-themes`.

2.  **CSS Variables Unification**:
    - Suppression du bloc `@media (prefers-color-scheme: dark)` dans `src/app/globals.css`.
    - Les variables CSS du mode sombre sont désormais gérées uniquement via la classe `.dark`.
    - Cela résout le conflit où la préférence système prenait le pas sur la sélection manuelle (ex: utilisateur sur système sombre forçant le mode clair).

3.  **ThemeToggle Refactoring**:
    - Simplification du composant `ThemeToggle.tsx`.
    - Suppression de la manipulation manuelle du DOM (`document.documentElement.classList`) qui était redondante et potentiellement conflictuelle.
    - Utilisation exclusive de l'API `next-themes` pour la gestion du changement de thème.

## Code examples

### globals.css
```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

/* ... */

/* Dark theme colors controlled by class */
.dark {
  --background: #0a0a0a;
  /* ... autres variables */
}
```

### ThemeToggle.tsx
```tsx
const handleToggle = () => {
  setTheme(isDark ? "light" : "dark");
};
```

## Next steps
- Vérifier visuellement que le basculement fonctionne dans les deux sens, indépendamment de la préférence système.
- S'assurer que les utilitaires Tailwind `dark:` s'appliquent correctement.

