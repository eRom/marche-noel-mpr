# Gemini Project Context: Marché de Noël MPR (Nantes 2025)

## Project Overview

**Marché de Noël du MPR** is a Progressive Web App (PWA) built with Next.js 15 for the Christmas Market at the Physical Medicine and Rehabilitation (MPR) pole of CHU Nantes. The application serves as an event guide, featuring programs, maps, and interactive elements like a decoration builder ("Mon MPR") and a gamified snowflake hunt. It supports the APRAIH association.

## Tech Stack

- **Framework:** Next.js 15 (App Router), React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, Radix UI (Primitives/Shadcn), `lucide-react` icons
- **Animation:** Framer Motion (`framer-motion`)
- **Maps:** Leaflet (`react-leaflet`, `@types/leaflet`)
- **Performance:** `@vercel/analytics`, `@vercel/speed-insights`, extensive `next.config.ts` optimizations
- **Assets:** Vercel Blob Storage (`@vercel/blob`)
- **PWA:** Custom Service Worker, Manifest, Offline support

## Architecture & Structure

### Key Directories

- **`src/app/`**: App Router structure.
  - `/`: Landing page with dynamic sections (Hero, Features, CTA).
  - `/programme`: Event schedule.
  - `/galerie`: Image gallery.
  - `/builder`: "Mon MPR" interactive decoration builder.
  - `/medias`: Media resources.
  - `/a-propos`: Information about APRAIH and the event.
  - `/api`: Backend API routes.
- **`src/components/`**:
  - `ui/`: Reusable primitive components (likely Shadcn UI based).
  - `builder/`: Components specific to the decoration builder feature.
  - Feature Components: `SnowfallEffect`, `ChristmasLights`, `MagicSnowflake` (Game), `CeremonyTimer`.
- **`public/`**: Static assets, PWA `manifest.json`, `sw.js` (Service Worker).
- **`scripts/`**: Utility scripts for maintenance (icons, screenshots, lighthouse, image optimization).

### Key Features

1.  **Gamification:** A "Snowflake Hunt" game is embedded throughout the site (`SnowflakeHuntContext`, `MagicSnowflake`).
2.  **Decoration Builder:** Users can create custom decorations in `/builder`.
3.  **Accessibility (A11y):** Strong focus with `axe-core`, custom ESLint a11y configs, and `SkipLink` components.
4.  **Performance:** Heavy use of `next/dynamic` for code splitting (visible in `page.tsx`), image optimization scripts.

## Development Workflow

### Standard Commands

- **Start Dev Server:** `npm run dev` (Uses Turbopack)
- **Build:** `npm run build`
- **Start Production:** `npm run start`
- **Lint:** `npm run lint` (Prettier check)
- **Format:** `npm run format` (Prettier write)

### Specialized Scripts

- **Accessibility Audit:** `npm run lint:audit` (ESLint A11y JSON report), `npm run axe`
- **Performance Audit:** `npm run lighthouse` (Runs Lighthouse CI)
- **Image Optimization:** `npm run optimize:images` (Compresses images in public)
- **PWA Assets:** `npm run icons` (Generates icons from `logo.png`), `npm run screenshots`

## Coding Conventions

- **Styling:** Use Tailwind CSS utility classes. Avoid inline styles.
- **Components:** Prefer composition. Use `next/dynamic` for heavy components below the fold.
- **Images:** Always use `next/image` with proper sizing or `fill`. Use WebP/AVIF formats (enforced by `next.config.ts`).
- **Type Safety:** Strict TypeScript usage.
- **Routing:** Use `next/link` for internal navigation.

## Deployment

- **Platform:** Vercel
- **Configuration:** `next.config.ts` handles headers, caching policies, and CSP.
- **Environment:** Requires Vercel Blob storage configuration for media assets.
