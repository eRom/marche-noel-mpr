import MagicSnowflake from "@/components/MagicSnowflake";
import MapSection from "@/components/MapSection";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";

// Lazy load non-critical components
const Header = dynamic(() => import("@/components/Header"), {
  loading: () => <div className="bg-background h-16" />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="bg-muted h-32" />,
});

const AnimatedSection = dynamic(() => import("@/components/AnimatedSection"), {
  loading: () => <div />,
  ssr: true,
});

export const metadata = {
  title: "Plan d'accès - Marché de Noël du MPR de Nantes",
  description:
    "Localisation de l'Hôpital Saint-Jacques – CHU de Nantes. 85 Rue Saint-Jacques, 44093 Nantes Cedex 1. Plan d'accès interactif au Marché de Noël du MPR.",
};

export default function PlanPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main id="main-content" role="main">
        {/* Magic Snowflakes for Hunt Game */}
        <MagicSnowflake id={7} page="plan" />
        <MagicSnowflake id={8} page="plan" />

        {/* Hero Section */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <h1 className="text-foreground text-4xl font-bold sm:text-5xl">
                Plan d&apos;accès
              </h1>
              <Separator className="mx-auto my-6 w-24" />
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                Hôpital Saint-Jacques – CHU de Nantes
              </p>
              <p className="text-muted-foreground mx-auto mt-2 max-w-2xl text-lg">
                85 Rue Saint-Jacques, 44093 Nantes Cedex 1
              </p>
              <p className="text-muted-foreground mx-auto mt-2 max-w-2xl text-lg font-bold">
                MPR - Hall d&apos;intégration
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-noel-snow py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <MapSection />
            </AnimatedSection>
          </div>
        </section>

        {/* Practical Information */}
        <section className="bg-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="mb-12 text-center">
                <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
                  Informations pratiques
                </h2>
              </div>
            </AnimatedSection>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <div className="bg-card border-border rounded-lg border p-6">
                  <h3 className="text-card-foreground mb-3 text-lg font-semibold">
                    Accès en transport
                  </h3>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li>• Tramway : Ligne 2 ou 3 arrêt Pirmil</li>
                    <li>• Busway : Ligne 4 arrêt Bonne-Garde</li>
                    <li>
                      • Bus : Lignes 27, 28, 29, 36, 39, 98, C4 (station
                      Châtelets)
                    </li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight" delay={400}>
                <div className="bg-card border-border rounded-lg border p-6">
                  <h3 className="text-card-foreground mb-3 text-lg font-semibold">
                    Accès véhicule
                  </h3>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li>• Périphérique sud, porte de Vertou n°47</li>
                    <li>• Périphérique sud, porte de Basse-Goulaine n°45</li>
                    <li>• GPS : 47.1965486, -1.539049</li>
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
