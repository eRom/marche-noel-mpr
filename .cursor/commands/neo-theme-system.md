# Neo Theme System - Système Multi-Thèmes Next.js

Implémente un système complet de gestion multi-thèmes avec next-themes, CSS variables, Google Fonts dynamiques, et transitions smooth.

## Prérequis

- Next.js 14+ (App Router)
- Tailwind CSS v4
- shadcn/ui configuré
- TypeScript

## Étape 1: Installation des Dépendances

```bash
npm install next-themes
npx shadcn@latest add dropdown-menu card badge button
```

## Étape 2: Structure des Fichiers CSS

**⚠️ IMPORTANT** : Cette section décrit la structure théorique. En pratique, **tout sera consolidé dans `globals.css`** (voir Étape 8).

Les fichiers séparés (`base.css`, `default.css`) sont présentés ici pour la compréhension, mais **ne doivent PAS être créés**.

### Structure théorique de `base.css` (sera dans globals.css)

```css
/* Base configuration commune à tous les thèmes */
@custom-variant dark (&:is(.dark *));

/* Mapping des variables CSS vers les utilitaires Tailwind */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
}

/* Transitions smooth pour les changements de thème */
:root {
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
}

* {
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
}

/* Exclure les transitions pour les éléments animés et interactifs */
*[class*="animate-"],
*[class*="transition-"],
button,
a,
input,
textarea,
select {
  transition: none !important;
}

/* Réactiver les transitions pour les états hover/focus sur les éléments interactifs */
button:not([class*="animate-"]),
a:not([class*="animate-"]) {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease !important;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Créer `src/styles/themes/default.css`

```css
/* Thème par défaut - Default Theme */
[data-color-theme="default"] {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);

  --font-sans: system-ui, -apple-system, sans-serif;
  --font-serif: Georgia, serif;
  --font-mono: ui-monospace, monospace;

  --radius: 0.625rem;

  --shadow-2xs: 0px 1px 2px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0px 1px 2px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm:
    0px 1px 3px 0px hsl(0 0% 0% / 0.1), 0px 1px 2px -1px hsl(0 0% 0% / 0.1);
  --shadow:
    0px 1px 3px 0px hsl(0 0% 0% / 0.1), 0px 1px 2px -1px hsl(0 0% 0% / 0.1);
  --shadow-md:
    0px 4px 6px -1px hsl(0 0% 0% / 0.1), 0px 2px 4px -2px hsl(0 0% 0% / 0.1);
  --shadow-lg:
    0px 10px 15px -3px hsl(0 0% 0% / 0.1), 0px 4px 6px -4px hsl(0 0% 0% / 0.1);
  --shadow-xl:
    0px 20px 25px -5px hsl(0 0% 0% / 0.1), 0px 8px 10px -6px hsl(0 0% 0% / 0.1);
  --shadow-2xl: 0px 25px 50px -12px hsl(0 0% 0% / 0.25);
}

[data-color-theme="default"].dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}
```

## Étape 3: Configuration TypeScript

### Créer `src/config/themes.ts`

```typescript
export interface ThemeConfig {
  id: string;
  name: string;
  description?: string;
  cssFile: string;
  fonts: {
    sans: string;
    serif?: string;
    mono?: string;
    googleFonts: string[];
  };
}

export const themes: ThemeConfig[] = [
  {
    id: "default",
    name: "Default",
    description: "Thème par défaut en noir et blanc",
    cssFile: "/styles/themes/default.css",
    fonts: {
      sans: "system-ui, -apple-system, sans-serif",
      serif: "Georgia, serif",
      mono: "ui-monospace, monospace",
      googleFonts: [],
    },
  },
];

export const defaultTheme = themes[0];

export function getThemeById(id: string): ThemeConfig | undefined {
  return themes.find((theme) => theme.id === id);
}

export function getAllThemes(): ThemeConfig[] {
  return themes;
}
```

## Étape 4: Utilitaires de Thème

### Créer `src/lib/theme-utils.ts`

```typescript
import type { ThemeConfig } from "@/config/themes";

const THEME_CSS_PREFIX = "theme-css-";
const FONT_LINK_PREFIX = "theme-font-";

export function loadThemeCSS(theme: ThemeConfig): Promise<void> {
  return new Promise((resolve, reject) => {
    const linkId = `${THEME_CSS_PREFIX}${theme.id}`;
    if (document.getElementById(linkId)) {
      resolve();
      return;
    }

    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = theme.cssFile;
    link.onload = () => resolve();
    link.onerror = () =>
      reject(new Error(`Failed to load theme CSS: ${theme.cssFile}`));
    document.head.appendChild(link);
  });
}

export function unloadThemeCSS(themeId: string): void {
  const linkId = `${THEME_CSS_PREFIX}${themeId}`;
  const link = document.getElementById(linkId);
  if (link) link.remove();
}

export function getFontImportUrl(fonts: string[]): string {
  if (fonts.length === 0) return "";
  const fontFamilies = fonts
    .map((font) => font.replace(/\s+/g, "+"))
    .map((font) => `family=${font}:wght@300;400;500;600;700`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${fontFamilies}&display=swap`;
}

export function loadGoogleFonts(theme: ThemeConfig): Promise<void> {
  return new Promise((resolve, reject) => {
    const { googleFonts } = theme.fonts;
    if (googleFonts.length === 0) {
      resolve();
      return;
    }

    const linkId = `${FONT_LINK_PREFIX}${theme.id}`;
    if (document.getElementById(linkId)) {
      resolve();
      return;
    }

    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = getFontImportUrl(googleFonts);
    link.onload = () => resolve();
    link.onerror = () => {
      console.warn(`Failed to load Google Fonts for theme: ${theme.id}`);
      resolve();
    };
    document.head.appendChild(link);
  });
}

export function unloadGoogleFonts(themeId: string): void {
  const linkId = `${FONT_LINK_PREFIX}${themeId}`;
  const link = document.getElementById(linkId);
  if (link) link.remove();
}

export function preloadThemeFonts(theme: ThemeConfig): void {
  const { googleFonts } = theme.fonts;
  if (googleFonts.length === 0) return;

  googleFonts.forEach(() => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://fonts.googleapis.com";
    document.head.appendChild(link);

    const linkCrossOrigin = document.createElement("link");
    linkCrossOrigin.rel = "preconnect";
    linkCrossOrigin.href = "https://fonts.gstatic.com";
    linkCrossOrigin.crossOrigin = "anonymous";
    document.head.appendChild(linkCrossOrigin);
  });
}

export function applyThemeAttribute(themeId: string): void {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-color-theme", themeId);
  }
}

export function getCurrentThemeAttribute(): string | null {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-color-theme");
  }
  return null;
}

export async function loadCompleteTheme(theme: ThemeConfig): Promise<void> {
  try {
    await Promise.all([loadThemeCSS(theme), loadGoogleFonts(theme)]);
    applyThemeAttribute(theme.id);
  } catch (error) {
    console.error("Error loading theme:", error);
    throw error;
  }
}

export async function switchTheme(
  oldTheme: ThemeConfig | null,
  newTheme: ThemeConfig
): Promise<void> {
  try {
    await loadCompleteTheme(newTheme);
  } catch (error) {
    console.error("Error switching theme:", error);
    throw error;
  }
}
```

## Étape 5: Provider React

### Créer `src/providers/theme-provider.tsx`

**Note** : Version simplifiée car les CSS sont dans `globals.css` (pas de chargement dynamique nécessaire).

```typescript
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { defaultTheme, getThemeById, getAllThemes } from "@/config/themes";
import type { ThemeConfig } from "@/config/themes";
import {
  applyThemeAttribute,
  preloadThemeFonts,
  loadGoogleFonts,
} from "@/lib/theme-utils";

const COLOR_THEME_STORAGE_KEY = "color-theme";

interface ColorThemeContextType {
  colorTheme: ThemeConfig;
  setColorTheme: (themeId: string) => Promise<void>;
  availableThemes: ThemeConfig[];
  isLoading: boolean;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
  enableSystem?: boolean;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [colorTheme, setColorThemeState] = useState<ThemeConfig>(defaultTheme);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || isInitialized) return;

    const initializeTheme = () => {
      try {
        const savedThemeId = localStorage.getItem(COLOR_THEME_STORAGE_KEY);
        const themeToLoad = savedThemeId
          ? getThemeById(savedThemeId) || defaultTheme
          : defaultTheme;

        // Les CSS sont déjà dans globals.css, on applique juste l'attribut
        applyThemeAttribute(themeToLoad.id);

        // Charger les Google Fonts si nécessaire
        if (themeToLoad.fonts.googleFonts.length > 0) {
          preloadThemeFonts(themeToLoad);
          loadGoogleFonts(themeToLoad);
        }

        setColorThemeState(themeToLoad);
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize theme:", error);
        setColorThemeState(defaultTheme);
        setIsInitialized(true);
      } finally {
        setIsLoading(false);
      }
    };

    initializeTheme();
  }, [isInitialized]);

  const setColorTheme = async (themeId: string): Promise<void> => {
    const newTheme = getThemeById(themeId);

    if (!newTheme) {
      console.error(`Theme not found: ${themeId}`);
      return;
    }

    if (newTheme.id === colorTheme.id) {
      return;
    }

    setIsLoading(true);

    try {
      // Les CSS sont déjà dans globals.css, on change juste l'attribut
      applyThemeAttribute(newTheme.id);

      // Charger les Google Fonts si nécessaire
      if (newTheme.fonts.googleFonts.length > 0) {
        await loadGoogleFonts(newTheme);
      }

      setColorThemeState(newTheme);
      localStorage.setItem(COLOR_THEME_STORAGE_KEY, newTheme.id);
    } catch (error) {
      console.error("Failed to change theme:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: ColorThemeContextType = {
    colorTheme,
    setColorTheme,
    availableThemes: getAllThemes(),
    isLoading,
  };

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="app-theme-mode"
      {...props}
    >
      <ColorThemeContext.Provider value={contextValue}>
        {children}
      </ColorThemeContext.Provider>
    </NextThemesProvider>
  );
}

export function useColorThemeContext() {
  const context = useContext(ColorThemeContext);
  if (context === undefined) {
    throw new Error(
      "useColorThemeContext must be used within a ThemeProvider"
    );
  }
  return context;
}
```

**Changements clés** :

- ❌ Plus de `loadCompleteTheme()` ou `switchTheme()`
- ✅ Simple `applyThemeAttribute()` (changement d'attribut HTML)
- ✅ Chargement Google Fonts uniquement si nécessaire
- ✅ Plus rapide et plus fiable

## Étape 6: Hook Personnalisé

### Créer `src/hooks/use-color-theme.ts`

```typescript
"use client";

import { useTheme } from "next-themes";
import { useColorThemeContext } from "@/providers/theme-provider";
import type { ThemeConfig } from "@/config/themes";

export interface UseColorThemeReturn {
  colorTheme: ThemeConfig;
  setColorTheme: (themeId: string) => Promise<void>;
  availableThemes: ThemeConfig[];
  isThemeLoading: boolean;
  mode: string | undefined;
  setMode: (theme: string) => void;
  systemTheme: string | undefined;
  resolvedMode: string | undefined;
  isReady: boolean;
}

export function useColorTheme(): UseColorThemeReturn {
  const {
    colorTheme,
    setColorTheme,
    availableThemes,
    isLoading: isThemeLoading,
  } = useColorThemeContext();

  const {
    theme: mode,
    setTheme: setMode,
    systemTheme,
    resolvedTheme: resolvedMode,
  } = useTheme();

  const isReady = !isThemeLoading && mode !== undefined;

  return {
    colorTheme,
    setColorTheme,
    availableThemes,
    isThemeLoading,
    mode,
    setMode,
    systemTheme,
    resolvedMode,
    isReady,
  };
}
```

## Étape 7: Composants UI

### Créer `src/components/theme-selector.tsx`

```typescript
"use client";

import React from "react";
import { Moon, Sun, Monitor, Palette, Check } from "lucide-react";
import { useColorTheme } from "@/hooks/use-color-theme";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ThemeSelector() {
  const {
    colorTheme,
    setColorTheme,
    availableThemes,
    mode,
    setMode,
    isReady,
  } = useColorTheme();

  const handleThemeChange = async (themeId: string) => {
    try {
      await setColorTheme(themeId);
    } catch (error) {
      console.error("Failed to change theme:", error);
    }
  };

  const getModeIcon = () => {
    switch (mode) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  if (!isReady) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Thème</CardTitle>
          <CardDescription>Chargement...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sélecteur de Thème</CardTitle>
        <CardDescription>
          Personnalisez l'apparence de votre application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Thème de couleur</label>
            <Badge variant="outline">{colorTheme.name}</Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  {colorTheme.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {colorTheme.description}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Choisir un thème</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {availableThemes.map((theme) => (
                <DropdownMenuItem
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className="flex items-center justify-between"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{theme.name}</span>
                    {theme.description && (
                      <span className="text-xs text-muted-foreground">
                        {theme.description}
                      </span>
                    )}
                  </div>
                  {colorTheme.id === theme.id && (
                    <Check className="h-4 w-4" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Mode d'affichage</label>
            <Badge variant="outline" className="capitalize">
              {mode}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={mode === "light" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("light")}
              className="flex items-center gap-2"
            >
              <Sun className="h-4 w-4" />
              <span>Clair</span>
            </Button>

            <Button
              variant={mode === "dark" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("dark")}
              className="flex items-center gap-2"
            >
              <Moon className="h-4 w-4" />
              <span>Sombre</span>
            </Button>

            <Button
              variant={mode === "system" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("system")}
              className="flex items-center gap-2"
            >
              <Monitor className="h-4 w-4" />
              <span>Auto</span>
            </Button>
          </div>
        </div>

        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Thème actif:</span>
            <span className="font-medium">{colorTheme.name}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Mode:</span>
            <span className="font-medium capitalize flex items-center gap-1">
              {getModeIcon()}
              {mode}
            </span>
          </div>
          {colorTheme.fonts.googleFonts.length > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Fonts:</span>
              <span className="font-medium text-xs">
                {colorTheme.fonts.googleFonts.join(", ")}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function ThemeModeToggle() {
  const { mode, setMode, isReady } = useColorTheme();

  if (!isReady) return null;

  const cycleMode = () => {
    const modes = ["light", "dark", "system"];
    const currentIndex = modes.indexOf(mode || "system");
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setMode(nextMode);
  };

  const getModeIcon = () => {
    switch (mode) {
      case "light":
        return <Sun className="h-5 w-5" />;
      case "dark":
        return <Moon className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={cycleMode}
      title={`Mode actuel: ${mode}`}
    >
      {getModeIcon()}
      <span className="sr-only">Changer de mode</span>
    </Button>
  );
}

export function ColorThemeDropdown() {
  const { colorTheme, setColorTheme, availableThemes, isReady } = useColorTheme();

  if (!isReady) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Changer de thème</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Thèmes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableThemes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => setColorTheme(theme.id)}
            className="flex items-center justify-between"
          >
            <span>{theme.name}</span>
            {colorTheme.id === theme.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Étape 8: Mise à Jour de globals.css

**IMPORTANT** : Les thèmes doivent être consolidés directement dans `globals.css` pour éviter les problèmes de chargement avec Tailwind v4.

Remplacez le contenu de `src/app/globals.css` par :

```css
/* Imports principaux */
@import "tailwindcss";

/* Base configuration commune à tous les thèmes */
@custom-variant dark (&:is(.dark *));

/* Mapping des variables CSS vers les utilitaires Tailwind */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
}

/* Transitions smooth pour les changements de thème */
:root {
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
}

* {
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
}

/* Exclure les transitions pour les éléments animés et interactifs */
*[class*="animate-"],
*[class*="transition-"],
button,
a,
input,
textarea,
select {
  transition: none !important;
}

/* Réactiver les transitions pour les états hover/focus sur les éléments interactifs */
button:not([class*="animate-"]),
a:not([class*="animate-"]) {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease !important;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* ============================================ */
/* THÈME PAR DÉFAUT - DEFAULT THEME */
/* ============================================ */

/* Mode Light */
[data-color-theme="default"] {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);

  --font-sans: system-ui, -apple-system, sans-serif;
  --font-serif: Georgia, serif;
  --font-mono: ui-monospace, monospace;

  --radius: 0.625rem;

  --shadow-2xs: 0px 1px 2px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0px 1px 2px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm:
    0px 1px 3px 0px hsl(0 0% 0% / 0.1), 0px 1px 2px -1px hsl(0 0% 0% / 0.1);
  --shadow:
    0px 1px 3px 0px hsl(0 0% 0% / 0.1), 0px 1px 2px -1px hsl(0 0% 0% / 0.1);
  --shadow-md:
    0px 4px 6px -1px hsl(0 0% 0% / 0.1), 0px 2px 4px -2px hsl(0 0% 0% / 0.1);
  --shadow-lg:
    0px 10px 15px -3px hsl(0 0% 0% / 0.1), 0px 4px 6px -4px hsl(0 0% 0% / 0.1);
  --shadow-xl:
    0px 20px 25px -5px hsl(0 0% 0% / 0.1), 0px 8px 10px -6px hsl(0 0% 0% / 0.1);
  --shadow-2xl: 0px 25px 50px -12px hsl(0 0% 0% / 0.25);
}

/* Mode Dark */
[data-color-theme="default"].dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}
```

**Note** : Les `@import` relatifs vers des fichiers séparés ne fonctionnent pas correctement avec Tailwind v4. Tous les thèmes doivent être dans `globals.css`.

## Étape 9: Mise à Jour du Layout

**CRITIQUE** : Le layout doit inclure un script inline pour appliquer `data-color-theme` avant le premier rendu.

Dans `src/app/layout.tsx`, utilisez cette structure :

```typescript
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "Your App",
  description: "Your app description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning data-color-theme="default">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('color-theme') || 'default';
                document.documentElement.setAttribute('data-color-theme', savedTheme);
              } catch (e) {
                document.documentElement.setAttribute('data-color-theme', 'default');
              }
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Pourquoi c'est essentiel** :

- ✅ Le script s'exécute **avant** le rendu
- ✅ Applique le thème sauvegardé **immédiatement**
- ✅ Évite le flash de contenu non stylé (FOUC)
- ✅ L'attribut `data-color-theme="default"` sert de fallback pendant le SSR

## Étape 10: Utilisation

### Dans un composant :

```typescript
"use client";

import { useColorTheme } from "@/hooks/use-color-theme";

export function MyComponent() {
  const { colorTheme, setColorTheme, mode, setMode } = useColorTheme();

  return (
    <div>
      <button onClick={() => setColorTheme("default")}>
        Thème Default
      </button>
      <button onClick={() => setMode("dark")}>
        Mode Sombre
      </button>
    </div>
  );
}
```

### Ou utiliser les composants prêts :

```typescript
import { ThemeSelector, ThemeModeToggle, ColorThemeDropdown } from "@/components/theme-selector";

<ThemeSelector />
// ou
<ThemeModeToggle />
<ColorThemeDropdown />
```

## Points Critiques à Vérifier

1. **Paths absolus** : Vérifiez que `@/*` est bien configuré dans `tsconfig.json`
2. **Tailwind v4** : Le système utilise `@theme inline` qui nécessite Tailwind v4
3. **shadcn/ui** : Les composants Button, Card, Badge, DropdownMenu doivent être installés
4. **next-themes** : Version 0.4+ recommandée

## Ajouter un Nouveau Thème

**⚠️ IMPORTANT** : Ajouter le thème dans `globals.css`, PAS dans un fichier séparé.

1. **Ajouter à la fin de `src/app/globals.css`** :

```css
/* ============================================ */
/* THÈME MON-THEME */
/* ============================================ */

[data-color-theme="mon-theme"] {
  /* light mode - 36 variables + fonts + radius + shadows */
}
[data-color-theme="mon-theme"].dark {
  /* dark mode - 36 variables */
}
```

2. **Ajouter dans `src/config/themes.ts`** :

```typescript
{
  id: "mon-theme",
  name: "Mon Thème",
  description: "...",
  cssFile: "/styles/themes/mon-theme.css",  // Non utilisé mais gardé pour compatibilité
  fonts: {
    sans: "...",
    serif: "...",
    mono: "...",
    googleFonts: ["..."],  // Uniquement les fonts Google, pas les fonts système
  },
}
```

## Variables CSS Obligatoires (36 couleurs + 3 fonts + radius + 8 shadows)

Chaque thème DOIT définir toutes ces variables pour light et dark mode.

## Points Critiques ✅

### 1. Script Inline dans Layout (OBLIGATOIRE)

```typescript
<html data-color-theme="default">
  <head>
    <script dangerouslySetInnerHTML={{
      __html: `
        try {
          const savedTheme = localStorage.getItem('color-theme') || 'default';
          document.documentElement.setAttribute('data-color-theme', savedTheme);
        } catch (e) {
          document.documentElement.setAttribute('data-color-theme', 'default');
        }
      `
    }} />
  </head>
```

**Pourquoi** : Applique le thème AVANT le rendu, évite le FOUC (flash de contenu non stylé).

### 2. Tous les Thèmes dans globals.css (OBLIGATOIRE)

```css
/* Ne PAS utiliser @import pour les thèmes */
/* ❌ @import "../styles/themes/default.css"; */

/* ✅ Directement dans globals.css */
[data-color-theme="default"] {
  /* ... */
}
[data-color-theme="amethyst"] {
  /* ... */
}
```

**Pourquoi** : Les `@import` relatifs ne fonctionnent pas avec Tailwind v4.

### 3. Provider Simplifié (PAS de chargement dynamique)

```typescript
// ❌ Ne PAS utiliser
await loadCompleteTheme(theme);
await switchTheme(oldTheme, newTheme);

// ✅ Utiliser
applyThemeAttribute(theme.id);
await loadGoogleFonts(theme); // Seulement si googleFonts.length > 0
```

**Pourquoi** : Les CSS sont déjà chargés, on change juste l'attribut HTML.

## Architecture Finale

```
src/
├── app/
│   ├── globals.css          ← TOUS les thèmes ici (base + default + autres)
│   └── layout.tsx            ← Script inline + data-color-theme
├── config/
│   └── themes.ts             ← Configuration des thèmes
├── providers/
│   └── theme-provider.tsx    ← Provider simplifié (pas de chargement CSS)
├── hooks/
│   └── use-color-theme.ts    ← Hook personnalisé
├── components/
│   └── theme-selector.tsx    ← UI du sélecteur
└── lib/
    └── theme-utils.ts        ← Utilitaires (fonts, attributs)
```

## Workflow de Chargement

```
1. SSR (Serveur)
   └─> <html data-color-theme="default">

2. Script Inline (Navigateur - Immédiat)
   └─> localStorage.getItem('color-theme')
   └─> document.documentElement.setAttribute('data-color-theme', themeId)

3. globals.css (Navigateur - Immédiat)
   └─> [data-color-theme="..."] styles s'appliquent

4. ThemeProvider (Navigateur - Après hydratation)
   └─> Synchronise React state
   └─> Charge Google Fonts si nécessaire
```

## Dépannage

### Problème : Le thème ne s'applique pas

✅ Vérifier que `data-color-theme` est présent sur `<html>`
✅ Vérifier que le CSS est dans `globals.css`
✅ Vérifier le sélecteur `[data-color-theme="..."]`

### Problème : Flash de contenu non stylé (FOUC)

✅ Ajouter le script inline dans le `<head>`
✅ Ajouter `data-color-theme="default"` sur `<html>`

### Problème : Les thèmes ne se chargent pas

✅ Ne PAS utiliser `@import` pour les thèmes
✅ Mettre tous les thèmes dans `globals.css`

Le système est maintenant opérationnel ! 🎉
