import CeremonyTimer from "@/components/CeremonyTimer";
import MagicSnowflake from "@/components/MagicSnowflake";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Heart, ShoppingBag, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

// Import StaggerItem for animations
import { StaggerItem } from "@/components/AnimatedSection";

// Lazy load all non-critical components
const Header = dynamic(() => import("@/components/Header"), {
  loading: () => <div className="bg-background h-16" />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="bg-muted h-32" />,
});

const HeroSection = dynamic(() => import("@/components/HeroSection"), {
  loading: () => <div className="bg-muted h-96 animate-pulse" />,
});

const AnimatedSection = dynamic(() => import("@/components/AnimatedSection"), {
  loading: () => <div />,
  ssr: true,
});

const QRCodeSection = dynamic(() => import("@/components/QRCodeSection"), {
  loading: () => <div className="bg-muted h-32 animate-pulse rounded-lg" />,
});

const ImageSection = dynamic(() => import("@/components/ImageSection"), {
  loading: () => <div className="bg-muted h-64 animate-pulse rounded-2xl" />,
});

const ShareSection = dynamic(() => import("@/components/ShareSection"), {
  loading: () => <div className="bg-muted h-32 animate-pulse rounded-lg" />,
});

export default function Home2025() {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main id="main-content" role="main">
        {/* Magic Snowflakes for Hunt Game */}
        <MagicSnowflake id={1} page="home" />
        <MagicSnowflake id={2} page="home" />

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
        <section
          className="bg-background"
          aria-label="Compte à rebours avant l'événement"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <CeremonyTimer />
            </AnimatedSection>
          </div>
        </section>

        {/* Features Section */}
        <section
          className="bg-noel-snow py-16"
          aria-labelledby="features-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="mb-12 text-center">
                <h2
                  id="features-heading"
                  className="text-foreground mb-4 text-3xl font-bold sm:text-4xl"
                >
                  Pourquoi nous choisir ?
                </h2>
                <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                  Un marché de Noël de l&apos;exemplarité, où
                  l&apos;accompagnement, la réadaptation et la créativité sont
                  partagés par les patients, les soignants et la communauté.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection staggerChildren staggerDelay={0.15}>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <StaggerItem className="flex">
                  <Link href="/programme" className="flex w-full">
                    <Card className="card-3d hover:bg-primary/10 bg-card border-border focus-within:ring-primary flex h-full w-full cursor-pointer flex-col p-6 text-center focus-within:ring-2 focus-within:ring-offset-2">
                      <CardContent className="pt-6">
                        <Calendar
                          className="text-primary mx-auto mb-4 h-12 w-12"
                          aria-hidden="true"
                        />
                        <h2 className="text-card-foreground mb-2 text-xl font-semibold">
                          Programme riche
                        </h2>
                        <p className="text-muted-foreground">
                          Des animations et des ateliers proposés par le MPR.
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>

                <StaggerItem className="flex">
                  <Card className="card-3d bg-card border-border flex h-full w-full flex-col p-6 text-center">
                    <CardContent className="pt-6">
                      <ShoppingBag
                        className="text-secondary mx-auto mb-4 h-12 w-12"
                        aria-hidden="true"
                      />
                      <h2 className="text-card-foreground mb-2 text-xl font-semibold">
                        Artisans patients
                      </h2>
                      <p className="text-muted-foreground">
                        Découvrez des créateurs talentueux et des patients
                        volontaires.
                      </p>
                    </CardContent>
                  </Card>
                </StaggerItem>

                <StaggerItem className="flex">
                  <Link href="/a-propos" className="flex w-full">
                    <Card className="card-3d hover:bg-accent/10 bg-card border-border focus-within:ring-accent flex h-full w-full cursor-pointer flex-col p-6 text-center focus-within:ring-2 focus-within:ring-offset-2">
                      <CardContent className="pt-6">
                        <Heart
                          className="text-accent mx-auto mb-4 h-12 w-12"
                          aria-hidden="true"
                        />
                        <h2 className="text-card-foreground mb-2 text-xl font-semibold">
                          Esprit de Noël
                        </h2>
                        <p className="text-muted-foreground">
                          Une ambiance chaleureuse et festive pour créer des
                          souvenirs inoubliables.
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
        <section
          className="from-primary to-primary-dark bg-gradient-to-r py-16"
          aria-label="Appel à l'action"
        >
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <h2 className="text-primary-foreground mb-4 text-3xl font-bold sm:text-4xl">
                Prêt à vivre la magie de Noël ?
              </h2>
              <p className="text-primary-foreground/90 mx-auto mb-8 max-w-2xl text-xl">
                Rejoignez-nous le 27 nov. - 11, 13 et 16 déc. pour une
                expérience inoubliable au cœur du MPR
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="/programme"
                  className="rounded-lg bg-white px-8 py-3 text-lg font-semibold text-red-600 transition-colors hover:border hover:border-white hover:bg-transparent hover:text-white focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                >
                  Voir le programme complet
                </a>
                <a
                  href="/a-propos"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary-dark rounded-lg border px-8 py-3 text-lg font-semibold transition-colors"
                >
                  À propos
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Mon MPR Section */}
        <section
          className="bg-noel-snow py-16"
          aria-labelledby="mon-mpr-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-12 lg:flex-row">
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <div className="flex-shrink-0">
                  <Link href="/builder" className="block">
                    <Image
                      src="/builder.webp"
                      alt="Mon MPR - Décorez votre espace avec l'intelligence artificielle"
                      width={600}
                      height={400}
                      className="mx-auto h-auto w-full max-w-md rounded-lg shadow-lg transition-transform hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight" delay={400}>
                <div className="max-w-2xl text-center lg:text-left">
                  <div className="mb-6 flex items-center justify-center gap-3 lg:justify-start">
                    <Sparkles
                      className="text-primary h-8 w-8"
                      aria-hidden="true"
                    />
                    <h2
                      id="mon-mpr-heading"
                      className="text-foreground text-3xl font-bold sm:text-4xl"
                    >
                      Mon MPR
                    </h2>
                  </div>
                  <div className="text-muted-foreground space-y-4">
                    <p className="text-lg">
                      Décorez votre espace de manière unique grâce à notre outil
                      de décorations.
                    </p>
                    <p>
                      Transformez votre environnement et choisissez parmi
                      différents styles et créez une ambiance qui vous
                      ressemble.
                    </p>
                    <div className="pt-4">
                      <Link
                        href="/builder"
                        className="text-primary-foreground bg-primary hover:bg-primary/90 focus:ring-primary inline-flex items-center rounded-lg px-6 py-3 font-semibold transition-colors focus:ring-2 focus:ring-offset-2"
                        aria-label="Accéder à l'outil de décoration Mon MPR"
                      >
                        Décorer mon espace
                        <svg
                          className="ml-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* APRAIH Section */}
        <section
          className="from-background to-primary/5 bg-gradient-to-b py-16"
          aria-labelledby="apraih-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="mb-12 text-center">
                <h2
                  id="apraih-heading"
                  className="text-foreground mb-4 text-3xl font-bold sm:text-4xl"
                >
                  Au profit de l&apos;APRAIH
                </h2>
                <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
                  L&apos;Association pour la Promotion de la Réadaptation et
                  l&apos;Accompagnement des personnes en situation de Handicap
                  accompagne depuis 30 ans les personnes touchées par les
                  accidents de la vie vers le retour à leur quotidien.
                </p>
              </div>
            </AnimatedSection>

            <div className="flex flex-col items-center justify-center gap-12 lg:flex-row">
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <div className="flex-shrink-0">
                  <Image
                    src="/apraih-logo.png"
                    alt="Logo APRAIH - Association pour la Promotion de la Réadaptation"
                    width={300}
                    height={205}
                    className="mx-auto h-auto w-64"
                    loading="lazy"
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight" delay={400}>
                <div className="max-w-2xl text-center lg:text-left">
                  <h3 className="text-foreground mb-6 text-2xl font-bold">
                    Une association dévouée
                  </h3>
                  <div className="text-muted-foreground space-y-4">
                    <p>
                      Encadrée par une équipe de bénévoles dévoués, de soignants
                      et rééducateurs, l&apos;APRAIH propose aux patients
                      hospitalisés de participer à des activités variées pour
                      rompre l&apos;isolement et favoriser la socialisation.
                    </p>
                    <p>
                      Sorties concerts, ateliers cuisine, soirées cinéma, et
                      sorties exceptionnelles comme assister à un match de foot
                      à Paris, découvrir les Jeux Paralympiques, ou participer à
                      des séjours thérapeutiques de plusieurs jours à la
                      montagne.
                    </p>
                    <div className="pt-4">
                      <a
                        href="https://www.apraih.fr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-foreground inline-flex items-center rounded-lg bg-[#3d6db4] px-6 py-3 font-semibold transition-colors hover:bg-[#2d4d84]"
                      >
                        Découvrir l&apos;APRAIH
                        <svg
                          className="ml-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
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
