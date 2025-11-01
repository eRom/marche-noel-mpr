import CeremonyTimer from "@/components/CeremonyTimer";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Heart, ShoppingBag } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

// Import StaggerItem for animations
import { StaggerItem } from "@/components/AnimatedSection";

// Lazy load all non-critical components
const Header = dynamic(() => import("@/components/Header"), {
  loading: () => <div className="h-16 bg-background" />
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-32 bg-muted" />
});

const HeroSection = dynamic(() => import("@/components/HeroSection"), {
  loading: () => <div className="h-96 bg-muted animate-pulse" />
});

const AnimatedSection = dynamic(() => import("@/components/AnimatedSection"), {
  loading: () => <div />,
  ssr: true
});

const QRCodeSection = dynamic(() => import("@/components/QRCodeSection"), {
  loading: () => <div className="h-32 bg-muted animate-pulse rounded-lg" />
});

const ImageSection = dynamic(() => import("@/components/ImageSection"), {
  loading: () => <div className="h-64 bg-muted animate-pulse rounded-2xl" />
});

const ShareSection = dynamic(() => import("@/components/ShareSection"), {
  loading: () => <div className="h-32 bg-muted animate-pulse rounded-lg" />
});

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main id="main-content">
        {/* Hero Section */}
        <HeroSection
          title="Bienvenue au Marché de Noël du MPR de Nantes"
          subtitle="Le 27 nov. - 11, 13 et 16 déc. 2025"
          description="Découvrez la magie de Noël au sein du pôle de Médecine Physique et de Réadaptation du CHU de Nantes (site de Saint Jacques), avec notre marché traditionnel. Patients, soignants, produits authentiques et ambiance festive vous attendent."
          imageSrc="/hero-placeholder.webp"
          imageAlt="Marché de Noël MPR - Marché traditionnel dans un village de montagne enneigé"
          primaryButtonText="Voir le programme"
          primaryButtonHref="/programme"
        />

        {/* Ceremony Timer Section (no title/description) */}
        <section className="bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <CeremonyTimer />
            </AnimatedSection>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-noel-snow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Pourquoi nous choisir ?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto"> 
                Un marché de Noël de l&apos;exemplarité, où l&apos;accompagnement, la réadaptation et la créativité sont partagés par les patients, les soignants et la communauté. 
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection staggerChildren staggerDelay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StaggerItem>
                <Link href="/programme" className="block">
                    <Card className="card-3d text-center p-6 cursor-pointer hover:bg-primary/10 bg-card border-border focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 h-full">
                    <CardContent className="pt-6">
                      <Calendar className="w-12 h-12 text-primary mx-auto mb-4" aria-hidden="true" />
                      <h3 className="text-xl font-semibold text-card-foreground mb-2">
                        Programme riche
                      </h3>
                      <p className="text-muted-foreground">
                        Des animations quotidiennes et des ateliers pour toute la famille.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                </StaggerItem>

                <StaggerItem>
                  <Card className="card-3d text-center p-6 bg-card border-border h-full">
                  <CardContent className="pt-6">
                    <ShoppingBag className="w-12 h-12 text-secondary mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">
                      Artisans patients
                    </h3>
                    <p className="text-muted-foreground">
                      Découvrez des créateurs talentueux et des produits uniques de notre région.
                    </p>
                  </CardContent>
                </Card>
                </StaggerItem>

                <StaggerItem>
                <Link href="/a-propos" className="block">
                    <Card className="card-3d text-center p-6 cursor-pointer hover:bg-accent/10 bg-card border-border focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 h-full">
                    <CardContent className="pt-6">
                      <Heart className="w-12 h-12 text-accent mx-auto mb-4" aria-hidden="true" />
                      <h3 className="text-xl font-semibold text-card-foreground mb-2">
                        Esprit de Noël
                      </h3>
                      <p className="text-muted-foreground">
                        Une ambiance chaleureuse et festive pour créer des souvenirs inoubliables.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                </StaggerItem>
              </div>
              </AnimatedSection>
          </div>
        </section>

        

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection animation="fadeInUp">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                Prêt à vivre la magie de Noël ?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Rejoignez-nous le 27 nov. - 11, 13 et 16 déc. pour une expérience inoubliable au cœur du MPR
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/programme"
                  className="bg-background text-primary hover:bg-transparent hover:border-2 hover:border-primary hover:text-foreground px-8 py-3 rounded-lg font-semibold text-lg transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Voir le programme complet
                </a>
                <a
                  href="/a-propos"
                  className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary-dark px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                >
                  À propos
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* APRAIH Section */}
        <section className="py-16 bg-gradient-to-b from-background to-primary/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Au profit de l&apos;APRAIH
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  L&apos;Association pour la Promotion de la Réadaptation et l&apos;Accompagnement 
                  des personnes en situation de Handicap accompagne depuis 30 ans les personnes 
                  touchées par les accidents de la vie vers le retour à leur quotidien.
                </p>
              </div>
            </AnimatedSection>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <div className="flex-shrink-0">
                  <Image
                    src="/apraih-logo.png"
                    alt="Logo APRAIH - Association pour la Promotion de la Réadaptation"
                    width={300}
                    height={205}
                    className="w-64 h-auto mx-auto"
                    loading="lazy"
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight" delay={400}>
                <div className="text-center lg:text-left max-w-2xl">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Une association dévouée
                  </h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                    Encadrée par une équipe de bénévoles dévoués, de soignants et rééducateurs, l&apos;APRAIH propose aux 
                    patients hospitalisés de participer à des activités variées pour rompre l&apos;isolement et favoriser la socialisation.
                    </p>
                    <p>
                    Sorties concerts, ateliers cuisine, soirées cinéma, et sorties exceptionnelles comme assister à un match de foot à Paris, 
                    découvrir les Jeux Paralympiques, ou participer à des séjours thérapeutiques de plusieurs jours à la montagne.
                    </p>
                    <div className="pt-4">
                      <a
                        href="https://www.apraih.fr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-[#3d6db4] text-primary-foreground rounded-lg font-semibold hover:bg-[#2d4d84] transition-colors"
                      >
                        Découvrir l&apos;APRAIH
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Share Section */}
        <ShareSection />

        {/* QR Code Section */}
        <QRCodeSection />

        {/* Image Section */}
        <ImageSection />

        
      </main>

      <Footer />
    </div>
  );
}
