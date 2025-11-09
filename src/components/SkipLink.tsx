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
      className="focus:bg-primary focus:text-primary-foreground focus:ring-ring sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-md focus:px-4 focus:py-2 focus:shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
    >
      Aller au contenu principal
    </a>
  );
}
