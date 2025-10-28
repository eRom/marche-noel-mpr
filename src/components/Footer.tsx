import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/icon-192.png"
                alt="Logo Marché de Noël MPR"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-bold text-lg">Marché de Noël du MPR</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Marché de Noël du MPR de Nantes<br />
              27 nov. - 11, 13 et 16 déc. 2025
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Liens rapides</h3>
            <nav className="space-y-2" aria-label="Liens du pied de page">
              <Link href="/" className="block text-muted-foreground hover:text-card-foreground transition-colors">
                Accueil
              </Link>
              <Link href="/programme" className="block text-muted-foreground hover:text-card-foreground transition-colors">
                Programme
              </Link>
              <Link href="/galerie" className="block text-muted-foreground hover:text-card-foreground transition-colors">
                Galerie
              </Link>
              <Link href="/a-propos" className="block text-muted-foreground hover:text-card-foreground transition-colors">
                À propos
              </Link>
            </nav>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Hôpital Saint-Jacques – CHU de Nantes</p>
              <p>85 Rue Saint-Jacques, Nantes</p>
              <p>44093 Nantes Cedex 1</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2025 MPR de Nantes. Tous droits réservés.
            </p>
           
            <div className="mt-4 md:mt-0">
            <a
                href="https://fr.tipeee.com/rebondir-apres-lavc-ma-carriere-dans-la-tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground text-sm hover:text-card-foreground transition-colors"
              >
                Fait avec ❤️ pour la communauté
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
