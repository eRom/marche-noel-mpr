"use client";

import Image from "next/image";
import Link from "next/link";
import SnowflakeCounter from "@/components/SnowflakeCounter";

export default function Footer() {
  return (
    <footer
      className="bg-card text-card-foreground border-t"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/icon-192.png"
                alt="Logo Marché de Noël MPR"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-bold">Marché de Noël du MPR</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Marché de Noël du MPR de Nantes
              <br />
              27 nov. - 11, 13 et 16 déc. 2025
            </p>

            {/* Snowflake Hunt Counter */}
            <SnowflakeCounter />
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liens rapides</h3>
            <nav className="space-y-2" aria-label="Liens du pied de page">
              <Link
                href="/"
                className="text-muted-foreground hover:text-card-foreground block transition-colors"
              >
                Accueil
              </Link>
              <Link
                href="/programme"
                className="text-muted-foreground hover:text-card-foreground block transition-colors"
              >
                Programme
              </Link>
              <Link
                href="/galerie"
                className="text-muted-foreground hover:text-card-foreground block transition-colors"
              >
                Galerie
              </Link>
              <Link
                href="/a-propos"
                className="text-muted-foreground hover:text-card-foreground block transition-colors"
              >
                À propos
              </Link>
            </nav>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="text-muted-foreground space-y-2 text-sm">
              <p>Hôpital Saint-Jacques – CHU de Nantes</p>
              <p>85 Rue Saint-Jacques, Nantes</p>
              <p>44093 Nantes Cedex 1</p>
            </div>
          </div>
        </div>

        <div className="border-border mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-muted-foreground text-sm">
              © 2025 MPR de Nantes. Tous droits réservés.
            </p>

            <div className="mt-4 md:mt-0">
              <Link
                href="/auteur"
                className="text-muted-foreground hover:text-card-foreground text-sm transition-colors"
              >
                Fait avec ❤️ pour la communauté
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
