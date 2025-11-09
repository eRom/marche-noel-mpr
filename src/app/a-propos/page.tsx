import MagicSnowflake from "@/components/MagicSnowflake";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Facebook, Gift, Heart, Mail, Users, Youtube } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

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

const TeamApraih = dynamic(() => import("@/components/TeamApraih"), {
  loading: () => <div />,
  ssr: true,
});

export const metadata = {
  title: "À propos - Marché de Noël MPR Nantes 2025",
  description:
    "À propos du Marché de Noël du MPR. Découvrez les équipes soignantes, les patients volontaires et les partenaires qui rendent cet événement possible.",
};

export default function APropos() {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main id="main-content" role="main">
        {/* Magic Snowflakes for Hunt Game */}
        <MagicSnowflake id={9} page="a-propos" />
        <MagicSnowflake id={10} page="a-propos" />

        {/* Hero Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <h1 className="text-foreground text-4xl font-bold sm:text-5xl">
                À propos
              </h1>
              <Separator className="mx-auto my-6 w-24" />
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                Un grand merci à tous ceux qui ont rendu ce Marché de Noël
                possible.
              </p>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                Votre participation fait la magie de cet événement.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Thank You Message */}
        <section className="bg-noel-snow py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="mb-12 text-center">
                <h2 className="text-foreground mb-6 text-3xl font-bold sm:text-4xl">
                  Un événement possible grâce à vous
                </h2>
                <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed">
                  Le Marché de Noël du MPR 2025 est rendu possible grâce à
                  l&apos;engagement exceptionnel de nos équipes soignantes et à
                  la participation active de nos patients. Votre collaboration
                  et votre détermination font la magie de cet événement.
                </p>
              </div>
            </AnimatedSection>

            <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <Card className="bg-card border-border p-6 text-center">
                  <CardContent className="pt-6">
                    <Users
                      className="text-primary mx-auto mb-4 h-12 w-12"
                      aria-hidden="true"
                    />
                    <h3 className="text-card-foreground mb-2 text-lg font-semibold">
                      Soignants
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Toutes l&apos;équipe des ergothérapeutes
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={400}>
                <Card className="bg-card border-border p-6 text-center">
                  <CardContent className="pt-6">
                    <Gift
                      className="text-secondary mx-auto mb-4 h-12 w-12"
                      aria-hidden="true"
                    />
                    <h3 className="text-card-foreground mb-2 text-lg font-semibold">
                      Patients
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Les patients vontontaires du MPR
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={600}>
                <Card className="bg-card border-border p-6 text-center">
                  <CardContent className="pt-6">
                    <Heart className="text-accent mx-auto mb-4 h-12 w-12" />
                    <h3 className="text-card-foreground mb-2 text-lg font-semibold">
                      Partenaires
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Tous les partenaires du MPR
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Acknowledgments */}
        <section className="bg-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="mb-12 text-center">
                <h2 className="text-foreground mb-6 text-3xl font-bold sm:text-4xl">
                  Remerciements
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
              <AnimatedSection
                animation="fadeInLeft"
                delay={200}
                className="h-full"
              >
                <Card className="bg-card border-border flex h-full flex-col p-6">
                  <CardContent className="flex-1 pt-6">
                    <h3 className="text-card-foreground mb-4 text-xl font-semibold">
                      Nos partenaires
                    </h3>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• CHU de Nantes</li>
                      <li>• MPR de Nantes</li>
                      <li>• APRAIH</li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection
                animation="fadeInRight"
                delay={400}
                className="h-full"
              >
                <Card className="bg-card border-border flex h-full flex-col p-6">
                  <CardContent className="flex-1 pt-6">
                    <h3 className="text-card-foreground mb-4 text-xl font-semibold">
                      Équipe organisatrice
                    </h3>
                    <ul className="text-muted-foreground space-y-2">
                      <li>
                        • Toute l&apos;équipe d&apos;ergothérapeutes du MPR
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* APRAIH Section */}
        <section className="bg-gradient-to-br from-red-50 via-red-100 to-red-200 py-16 dark:from-red-950 dark:via-red-900 dark:to-red-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="mb-12 text-center">
                <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
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
                    <div className="flex flex-col gap-4 pt-4">
                      {/* Ligne 1 - Desktop: seul, Mobile: empilé */}
                      <div className="flex justify-center lg:justify-start">
                        <a
                          href="https://www.apraih.fr/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-foreground inline-flex w-full items-center justify-center rounded-lg bg-[#3d6db4] px-6 py-3 font-semibold transition-colors hover:bg-[#2d4d84] lg:w-auto"
                          aria-label="Découvrir le site web de l'APRAIH"
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
                      {/* Ligne 2 - Desktop: 3 boutons côte à côte, Mobile: empilés */}
                      <div className="flex flex-col gap-4 lg:flex-row lg:justify-start">
                        <a
                          href="https://www.youtube.com/@apraih7979"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-foreground inline-flex w-full items-center justify-center rounded-lg bg-[#FF0000] px-6 py-3 font-semibold transition-colors hover:bg-[#CC0000] lg:w-auto"
                          aria-label="Suivre l'APRAIH sur YouTube"
                        >
                          <Youtube
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          YouTube
                        </a>
                        <a
                          href="https://www.facebook.com/profile.php?id=100064394481247"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-foreground inline-flex w-full items-center justify-center rounded-lg bg-[#1877F2] px-6 py-3 font-semibold transition-colors hover:bg-[#1565C0] lg:w-auto"
                          aria-label="Suivre l'APRAIH sur Facebook"
                        >
                          <Facebook
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          Facebook
                        </a>
                        <a
                          href="https://apraih.fr/contact/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-foreground inline-flex w-full items-center justify-center rounded-lg bg-[#10b981] px-6 py-3 font-semibold transition-colors hover:bg-[#059669] lg:w-auto"
                          aria-label="Contacter l'APRAIH"
                        >
                          <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
                          Contact
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Team APRAIH */}
            <AnimatedSection animation="fadeInUp" delay={600}>
              <div className="mt-12 w-full">
                <TeamApraih />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Next Year - Cachée temporairement */}
        {/* <section className="py-16 bg-noel-snow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#ba55f1] text-center mb-8">
                A l&apos;année prochaine
              </h2>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={150}>
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/MPR-ambiance-cyber.webp"
                  alt="Ambiance du MPR - à l'année prochaine"
                  width={1600}
                  height={900}
                  className="w-full h-auto object-cover"
                  priority={false}
                />
              </div>
            </AnimatedSection>
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
}
