# Neo Theme Add - Ajouter un Nouveau Thème

Ajoute un nouveau thème au système multi-thèmes en convertissant automatiquement les CSS variables de Tweakcn.

## Instructions

Vous devez créer un nouveau thème en suivant ces étapes EXACTES. L'utilisateur fournira :
- Le nom du thème (ex: "Ocean", "Sunset", "Forest")
- Les CSS variables copiées depuis Tweakcn (format `:root` et `.dark`)

## Processus d'Ajout

### Étape 1: Extraire les Informations du CSS Tweakcn

À partir du CSS fourni par l'utilisateur, extraire :

1. **Variables de couleur** (36 variables obligatoires) :
   - `--background`, `--foreground`
   - `--card`, `--card-foreground`
   - `--popover`, `--popover-foreground`
   - `--primary`, `--primary-foreground`
   - `--secondary`, `--secondary-foreground`
   - `--muted`, `--muted-foreground`
   - `--accent`, `--accent-foreground`
   - `--destructive`, `--destructive-foreground`
   - `--border`, `--input`, `--ring`
   - `--chart-1` à `--chart-5` (5 variables)
   - `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring` (8 variables)

2. **Fonts** (3 variables) :
   - `--font-sans` (ex: "Inter, sans-serif")
   - `--font-serif` (ex: "Source Serif 4, serif")
   - `--font-mono` (ex: "JetBrains Mono, monospace")

3. **Radius** :
   - `--radius` (ex: "0.375rem")

4. **Shadows** (8 variables) :
   - `--shadow-2xs`, `--shadow-xs`, `--shadow-sm`, `--shadow`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`, `--shadow-2xl`

5. **Google Fonts** : Extraire les noms de fonts de `--font-sans`, `--font-serif`, `--font-mono`
   - Exemple: "Inter, sans-serif" → "Inter"
   - Exemple: "Source Serif 4, serif" → "Source Serif 4"
   - Ne PAS inclure les fonts système (system-ui, -apple-system, sans-serif, serif, monospace, ui-monospace, etc.)

### Étape 2: Générer l'ID du Thème

1. Convertir le nom en ID :
   - Mettre en minuscules
   - Remplacer les espaces par des tirets
   - Supprimer les caractères spéciaux
   - Exemples :
     - "Ocean Blue" → "ocean-blue"
     - "Sunset!" → "sunset"
     - "My Theme" → "my-theme"

### Étape 3: Créer le Fichier CSS

Créer `src/styles/themes/{theme-id}.css` avec cette STRUCTURE EXACTE :

```css
/* Thème {Theme Name} - {Description} */

/* Mode Light */
[data-color-theme="{theme-id}"] {
  /* Couleurs principales */
  --background: {valeur du :root};
  --foreground: {valeur du :root};
  --card: {valeur du :root};
  --card-foreground: {valeur du :root};
  --popover: {valeur du :root};
  --popover-foreground: {valeur du :root};
  --primary: {valeur du :root};
  --primary-foreground: {valeur du :root};
  --secondary: {valeur du :root};
  --secondary-foreground: {valeur du :root};
  --muted: {valeur du :root};
  --muted-foreground: {valeur du :root};
  --accent: {valeur du :root};
  --accent-foreground: {valeur du :root};
  --destructive: {valeur du :root};
  --destructive-foreground: {valeur du :root};
  --border: {valeur du :root};
  --input: {valeur du :root};
  --ring: {valeur du :root};
  
  /* Charts */
  --chart-1: {valeur du :root};
  --chart-2: {valeur du :root};
  --chart-3: {valeur du :root};
  --chart-4: {valeur du :root};
  --chart-5: {valeur du :root};
  
  /* Sidebar */
  --sidebar: {valeur du :root};
  --sidebar-foreground: {valeur du :root};
  --sidebar-primary: {valeur du :root};
  --sidebar-primary-foreground: {valeur du :root};
  --sidebar-accent: {valeur du :root};
  --sidebar-accent-foreground: {valeur du :root};
  --sidebar-border: {valeur du :root};
  --sidebar-ring: {valeur du :root};
  
  /* Fonts */
  --font-sans: {valeur du :root};
  --font-serif: {valeur du :root};
  --font-mono: {valeur du :root};
  
  /* Radius */
  --radius: {valeur du :root};
  
  /* Shadows */
  --shadow-2xs: {valeur du :root};
  --shadow-xs: {valeur du :root};
  --shadow-sm: {valeur du :root};
  --shadow: {valeur du :root};
  --shadow-md: {valeur du :root};
  --shadow-lg: {valeur du :root};
  --shadow-xl: {valeur du :root};
  --shadow-2xl: {valeur du :root};
}

/* Mode Dark */
[data-color-theme="{theme-id}"].dark {
  /* Couleurs principales */
  --background: {valeur du .dark};
  --foreground: {valeur du .dark};
  --card: {valeur du .dark};
  --card-foreground: {valeur du .dark};
  --popover: {valeur du .dark};
  --popover-foreground: {valeur du .dark};
  --primary: {valeur du .dark};
  --primary-foreground: {valeur du .dark};
  --secondary: {valeur du .dark};
  --secondary-foreground: {valeur du .dark};
  --muted: {valeur du .dark};
  --muted-foreground: {valeur du .dark};
  --accent: {valeur du .dark};
  --accent-foreground: {valeur du .dark};
  --destructive: {valeur du .dark};
  --destructive-foreground: {valeur du .dark};
  --border: {valeur du .dark};
  --input: {valeur du .dark};
  --ring: {valeur du .dark};
  
  /* Charts */
  --chart-1: {valeur du .dark};
  --chart-2: {valeur du .dark};
  --chart-3: {valeur du .dark};
  --chart-4: {valeur du .dark};
  --chart-5: {valeur du .dark};
  
  /* Sidebar */
  --sidebar: {valeur du .dark};
  --sidebar-foreground: {valeur du .dark};
  --sidebar-primary: {valeur du .dark};
  --sidebar-primary-foreground: {valeur du .dark};
  --sidebar-accent: {valeur du .dark};
  --sidebar-accent-foreground: {valeur du .dark};
  --sidebar-border: {valeur du .dark};
  --sidebar-ring: {valeur du .dark};
  
  /* Note: Fonts, radius et shadows ne changent pas en dark mode */
}
```

**IMPORTANT** :
- Remplacer `{theme-id}` par l'ID généré
- Copier les valeurs EXACTES de `:root` vers `[data-color-theme="{theme-id}"]`
- Copier les valeurs EXACTES de `.dark` vers `[data-color-theme="{theme-id}"].dark`
- NE PAS inclure `@theme inline` (c'est dans base.css)
- Ignorer les variables non essentielles comme `--shadow-x`, `--shadow-y`, `--tracking-normal`, `--spacing`

### Étape 4: Mettre à Jour la Configuration

Dans `src/config/themes.ts`, ajouter le nouveau thème dans le tableau `themes` :

```typescript
{
  id: "{theme-id}",
  name: "{Theme Name}",
  description: "Description du thème (optionnel)",
  cssFile: "/styles/themes/{theme-id}.css",
  fonts: {
    sans: "{valeur de --font-sans}",
    serif: "{valeur de --font-serif}",
    mono: "{valeur de --font-mono}",
    googleFonts: ["{Liste des fonts Google}"],
  },
}
```

**Extraction des Google Fonts** :
- Parser les variables `--font-sans`, `--font-serif`, `--font-mono`
- Extraire uniquement les noms de fonts NON système
- Exemple :
  - `--font-sans: Inter, sans-serif;` → `["Inter"]`
  - `--font-serif: Source Serif 4, serif;` → `["Source Serif 4"]`
  - `--font-mono: JetBrains Mono, monospace;` → `["JetBrains Mono"]`
  - `--font-sans: system-ui, -apple-system, sans-serif;` → `[]` (pas de Google Fonts)

**Fonts système à EXCLURE** :
- system-ui
- -apple-system
- BlinkMacSystemFont
- sans-serif
- serif
- monospace
- ui-monospace
- ui-sans-serif
- ui-serif
- Georgia
- Courier

### Étape 5: Vérification

Après la création, vérifier :

1. ✅ Le fichier CSS existe dans `src/styles/themes/{theme-id}.css`
2. ✅ Le thème est ajouté dans `src/config/themes.ts`
3. ✅ Toutes les 36 variables de couleur sont présentes (light et dark)
4. ✅ Les 3 variables de fonts sont présentes
5. ✅ Le radius et les 8 shadows sont présents
6. ✅ Les Google Fonts sont correctement listées (sans fonts système)
7. ✅ Le format `[data-color-theme="id"]` est utilisé (pas `:root`)

### Étape 6: Confirmation

Afficher un message de confirmation :

```
✅ Thème "{Theme Name}" ajouté avec succès !

Fichiers créés/modifiés :
- src/styles/themes/{theme-id}.css (nouveau)
- src/config/themes.ts (mis à jour)

Le thème est maintenant disponible dans le sélecteur.
Google Fonts à charger : {liste ou "Aucune (fonts système)"}

Pour tester :
- Recharger l'application
- Ouvrir le ThemeSelector
- Sélectionner "{Theme Name}"
```

## Exemple Complet de Conversion

### Input Utilisateur :

**Nom** : Ocean Blue

**CSS Tweakcn** :
```css
:root {
  --background: oklch(0.98 0.01 220);
  --foreground: oklch(0.15 0.02 220);
  --primary: oklch(0.55 0.15 220);
  --primary-foreground: oklch(0.98 0 0);
  /* ... autres variables ... */
  --font-sans: Poppins, sans-serif;
  --font-serif: Merriweather, serif;
  --font-mono: Fira Code, monospace;
  --radius: 0.5rem;
  /* ... shadows ... */
}

.dark {
  --background: oklch(0.12 0.02 220);
  --foreground: oklch(0.95 0.01 220);
  /* ... autres variables ... */
}
```

### Output Attendu :

**Fichier** : `src/styles/themes/ocean-blue.css`
```css
/* Thème Ocean Blue - Thème inspiré de l'océan */

[data-color-theme="ocean-blue"] {
  --background: oklch(0.98 0.01 220);
  --foreground: oklch(0.15 0.02 220);
  --primary: oklch(0.55 0.15 220);
  --primary-foreground: oklch(0.98 0 0);
  /* ... toutes les autres variables ... */
  --font-sans: Poppins, sans-serif;
  --font-serif: Merriweather, serif;
  --font-mono: Fira Code, monospace;
  --radius: 0.5rem;
  /* ... shadows ... */
}

[data-color-theme="ocean-blue"].dark {
  --background: oklch(0.12 0.02 220);
  --foreground: oklch(0.95 0.01 220);
  /* ... toutes les autres variables ... */
}
```

**Config** : Ajout dans `src/config/themes.ts`
```typescript
{
  id: "ocean-blue",
  name: "Ocean Blue",
  description: "Thème inspiré de l'océan",
  cssFile: "/styles/themes/ocean-blue.css",
  fonts: {
    sans: "Poppins, sans-serif",
    serif: "Merriweather, serif",
    mono: "Fira Code, monospace",
    googleFonts: ["Poppins", "Merriweather", "Fira Code"],
  },
}
```

## Règles de Parsing STRICTES

### Variables à EXTRAIRE (obligatoires) :

**Couleurs (36)** :
- background, foreground
- card, card-foreground
- popover, popover-foreground
- primary, primary-foreground
- secondary, secondary-foreground
- muted, muted-foreground
- accent, accent-foreground
- destructive, destructive-foreground
- border, input, ring
- chart-1, chart-2, chart-3, chart-4, chart-5
- sidebar, sidebar-foreground, sidebar-primary, sidebar-primary-foreground, sidebar-accent, sidebar-accent-foreground, sidebar-border, sidebar-ring

**Fonts (3)** :
- font-sans, font-serif, font-mono

**Radius (1)** :
- radius

**Shadows (8)** :
- shadow-2xs, shadow-xs, shadow-sm, shadow, shadow-md, shadow-lg, shadow-xl, shadow-2xl

### Variables à IGNORER (non utilisées par le système) :
- shadow-x, shadow-y, shadow-blur, shadow-spread, shadow-opacity, shadow-color
- tracking-normal, tracking-* (autres valeurs)
- spacing
- Toute autre variable personnalisée

## Gestion des Cas Particuliers

### Si une variable manque :
- Utiliser une valeur par défaut sensée
- Afficher un warning dans la console
- Continuer le processus

### Si le nom contient des caractères spéciaux :
- Les supprimer pour l'ID
- Garder le nom original pour l'affichage

### Si aucune Google Font n'est détectée :
- Laisser le tableau `googleFonts` vide : `[]`
- C'est normal pour les thèmes utilisant des fonts système

### Si le fichier CSS existe déjà :
- Demander confirmation à l'utilisateur
- Proposer d'écraser ou de créer une variante (ex: theme-2)

## Points de Vigilance

1. **Format OKLCH** : Garder le format exact `oklch(L C H)` ou `oklch(L C H / A)`
2. **Sélecteurs CSS** : TOUJOURS utiliser `[data-color-theme="id"]` et `[data-color-theme="id"].dark`
3. **Pas de duplication** : Ne PAS copier `@theme inline` dans le nouveau fichier
4. **Fonts Google** : Parser correctement et exclure les fonts système
5. **Ordre des variables** : Respecter l'ordre pour la lisibilité
6. **Commentaires** : Ajouter des commentaires de section pour clarté

## Workflow Complet

1. ✅ Demander le nom du thème à l'utilisateur
2. ✅ Demander les CSS variables de Tweakcn
3. ✅ Parser et extraire toutes les variables
4. ✅ Générer l'ID du thème
5. ✅ Créer le fichier CSS avec la bonne structure
6. ✅ Mettre à jour src/config/themes.ts
7. ✅ Vérifier que tout est correct
8. ✅ Afficher un message de confirmation

Le thème est maintenant opérationnel ! 🎨

