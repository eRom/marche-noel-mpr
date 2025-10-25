import { Card, CardContent } from "@/components/ui/card";
import { Gift, Heart, Star, Users } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

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
  title: "Merci - Marché de Noël MPR Nantes 2024",
  description: "Remerciements pour votre participation au Marché de Noël MPR de Nantes. Découvrez les points forts de cette édition, les moments magiques partagés et les informations pour l'année prochaine.",
};

export default function Merci() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          {/* Background Image */}
         
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-placeholder-md.webp"
              alt="Marché de Noël MPR"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay with blur and opacity */}
            <div className="absolute inset-0 bg-accent/30 backdrop-blur-sm" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection animation="fadeInUp">
              <h1 className="text-4xl sm:text-5xl font-bold text-background mb-4">
                Merci
              </h1>
              <p className="text-xl text-background/90 max-w-2xl mx-auto">
                Un grand merci à tous ceux qui ont rendu ce Marché de Noël possible.
              </p>
              <p className="text-xl text-background/90 max-w-2xl mx-auto">
                Votre participation fait la magie de cet événement.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Thank You Message */}
        <section className="py-16 bg-noel-snow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Un événement réussi grâce à vous
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Le Marché de Noël MPR 2025 a été un véritable succès grâce à la participation
                  de tous : visiteurs, artisans, bénévoles et organisateurs. Votre enthousiasme
                  et votre soutien ont créé une ambiance magique qui restera dans nos mémoires.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <Card className="text-center p-6 bg-card border-border">
                  <CardContent className="pt-6">
                    <Users className="w-12 h-12 text-primary mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      Visiteurs
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Plus de 5000 visiteurs ont découvert notre marché
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={400}>
                <Card className="text-center p-6 bg-card border-border">
                  <CardContent className="pt-6">
                    <Gift className="w-12 h-12 text-secondary mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      Artisans
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      25 artisans locaux ont participé à l&apos;événement
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={600}>
                <Card className="text-center p-6 bg-card border-border">
                  <CardContent className="pt-6">
                    <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      Bénévoles
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      50 bénévoles ont donné de leur temps
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight" delay={800}>
                <Card className="text-center p-6 bg-card border-border">
                  <CardContent className="pt-6">
                    <Star className="w-12 h-12 text-primary mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      Satisfaction
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      98% de satisfaction des visiteurs
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Acknowledgments */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Remerciements
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <Card className="p-6 bg-card border-border">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-card-foreground mb-4">
                      Nos partenaires
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Ville de Nantes</li>
                      <li>• Chambre de Commerce</li>
                      <li>• Office de Tourisme</li>
                      <li>• Associations locales</li>
                      <li>• Médias partenaires</li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight" delay={400}>
                <Card className="p-6 bg-card border-border">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-card-foreground mb-4">
                      Équipe organisatrice
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Comité d&apos;organisation MPR</li>
                      <li>• Équipe technique</li>
                      <li>• Service sécurité</li>
                      <li>• Service communication</li>
                      <li>• Logistique et accueil</li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection animation="fadeInUp">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                Restez connectés
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Suivez-nous sur les réseaux sociaux pour ne rien rater de nos prochains événements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="button"
                  className="bg-background text-primary hover:bg-muted px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                  aria-label="Suivre sur Facebook"
                >
                  Facebook
                </button>
                <button
                  type="button"
                  className="bg-background text-primary hover:bg-muted px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                  aria-label="Suivre sur Instagram"
                >
                  Instagram
                </button>
                <button
                  type="button"
                  className="bg-background text-primary hover:bg-muted px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                  aria-label="Suivre sur Twitter"
                >
                  Twitter
                </button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Next Year */}
        <section className="py-16 bg-noel-snow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection animation="fadeInUp">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                À l&apos;année prochaine !
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Nous vous donnons rendez-vous l&apos;année prochaine pour une nouvelle édition
                encore plus magique du Marché de Noël du MPR.
              </p>
              <div className="bg-card p-6 rounded-lg shadow-lg max-w-md mx-auto border-border">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Marché de Noël du MPR 2026
                </h3>
                <p className="text-muted-foreground">
                  Dates à confirmer<br />
                  Restez informés !
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
