"use client";

/**
 * Skip Link - Lien d'évitement pour l'accessibilité
 * Conforme RGAA 12.7 - Permet aux utilisateurs de lecteurs d'écran
 * de sauter directement au contenu principal
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      Aller au contenu principal
    </a>
  );
}

