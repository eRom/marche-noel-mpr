import MapSection from "@/components/MapSection";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";
import MagicSnowflake from "@/components/MagicSnowflake";

// Lazy load non-critical components
const Header = dynamic(() => import("@/components/Header"), {
  loading: () => <div className="h-16 bg-background" />
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-32 bg-muted" />
});

const AnimatedSection = dynamic(() => import("@/components/AnimatedSection"), {
  loading: () => <div />,
  ssr: true
});

export const metadata = {
  title: "Plan d'accès - Marché de Noël du MPR de Nantes",
  description: "Localisation de l'Hôpital Saint-Jacques – CHU de Nantes. 85 Rue Saint-Jacques, 44093 Nantes Cedex 1. Plan d'accès interactif au Marché de Noël du MPR.",
};

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main id="main-content" role="main">
        {/* Magic Snowflakes for Hunt Game */}
        <MagicSnowflake id={7} page="plan" />
        <MagicSnowflake id={8} page="plan" />
        
        {/* Hero Section */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection animation="fadeInUp">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                Plan d&apos;accès
              </h1>
              <Separator className="my-6 mx-auto w-24" />
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Hôpital Saint-Jacques – CHU de Nantes
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
                85 Rue Saint-Jacques, 44093 Nantes Cedex 1
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-noel-snow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <MapSection />
            </AnimatedSection>
          </div>
        </section>

        {/* Practical Information */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Informations pratiques
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold text-card-foreground mb-3">
                    Accès en transport
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Tramway : Ligne 2 ou 3 arrêt Pirmil</li>
                    <li>• Busway : Ligne 4 arrêt Bonne-Garde</li>
                    <li>• Bus : Lignes 27, 28, 29, 36, 39, 98, C4 (station Châtelets)</li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight" delay={400}>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold text-card-foreground mb-3">
                    Accès véhicule
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
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
