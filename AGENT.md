# CLAUDE.md / AGENT.md

This file provides guidance to IA agent when working with code in this repository.

## Project Overview

This is a Next.js 15 project using the App Router, TypeScript, and Tailwind CSS. The project is set up with Shadcn/ui components and includes both light and dark theme support. Based on `PROJECT_IDEA.md`, this appears to be a French-language web application focused on SEO optimization and accessibility.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack (http://localhost:3000)
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Formatting
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without changing files
- `npm run format:staged` - Format staged files (likely for git hooks)

### Build System
- Uses Turbopack for both development and production builds
- No test framework is currently configured
- Prettier with Tailwind CSS plugin for code formatting

## Architecture

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with CSS-in-JS theming system
- **UI Components**: Shadcn/ui (New York style) with Radix UI primitives
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode switching
- **Animations**: tw-animate-css for Tailwind animations
- **Notifications**: Sonner for toast notifications

### Project Structure
```
src/
├── app/
│   ├── globals.css          # Tailwind CSS with custom theme variables
│   ├── layout.tsx           # Root layout with Geist fonts
│   └── page.tsx             # Home page (currently Next.js default)
├── components/
│   └── ui/                  # Shadcn/ui components
├── lib/
│   └── utils.ts             # Utility functions (cn helper)
```

### Theme System
- Uses CSS custom properties for theming
- Light/dark themes with oklch color space
- Comprehensive design tokens for colors, spacing, and components
- Theme switching through next-themes

### Component System
- Shadcn/ui configured with "new-york" style
- Path aliases configured: `@/components`, `@/lib`, `@/lib/utils`
- RSC (React Server Components) enabled
- Components include: Button, Card, Badge, Separator, Checkbox, Avatar, Switch, Spinner, Sonner

## Development Notes

### Code Style
- ESLint configured with Next.js rules
- TypeScript with strict configuration
- No test framework currently set up
- Prettier configured with Tailwind CSS plugin for consistent formatting

### French Language Support
- PROJECT_IDEA.md indicates this is a French-language project
- Consider using `react/no-unescaped-entities` ESLint rule for French text
- SEO optimization with schema.org JSON-LD planned

### Accessibility
- WCAG AA compliance is a project requirement
- Mobile-first design approach
- Semantic HTML and proper ARIA attributes expected

### SEO Requirements
- Meta tags optimization required
- Social preview tags needed
- JSON-LD structured data (Person schema) planned