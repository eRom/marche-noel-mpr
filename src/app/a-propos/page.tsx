import MagicSnowflake from "@/components/MagicSnowflake";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Gift, Heart, Users } from "lucide-react";
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
  title: "À propos - Marché de Noël MPR Nantes 2025",
  description: "À propos du Marché de Noël du MPR. Découvrez les équipes soignantes, les patients volontaires et les partenaires qui rendent cet événement possible.",
};

export default function APropos() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main id="main-content" role="main">
        {/* Magic Snowflakes for Hunt Game */}
        <MagicSnowflake id={9} page="a-propos" />
        <MagicSnowflake id={10} page="a-propos" />
        
        {/* Hero Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection animation="fadeInUp">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                À propos
              </h1>
              <Separator className="my-6 mx-auto w-24" />
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Un grand merci à tous ceux qui ont rendu ce Marché de Noël possible.
              </p>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                  Un événement possible grâce à vous
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Le Marché de Noël du MPR 2025 est rendu possible grâce à l&apos;engagement exceptionnel 
                de nos équipes soignantes et à la participation active de nos patients. 
                Votre collaboration et votre détermination font la magie de cet événement.  
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-12">
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <Card className="text-center p-6 bg-card border-border">
                  <CardContent className="pt-6">
                    <Users className="w-12 h-12 text-primary mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      Soignants
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Toutes l&apos;équipe des ergothérapeutes
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={400}>
                <Card className="text-center p-6 bg-card border-border">
                  <CardContent className="pt-6">
                    <Gift className="w-12 h-12 text-secondary mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      Patients
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Les patients vontontaires du MPR 
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={600}>
                <Card className="text-center p-6 bg-card border-border">
                  <CardContent className="pt-6">
                    <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
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
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Remerciements
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <AnimatedSection animation="fadeInLeft" delay={200} className="h-full">
                <Card className="p-6 bg-card border-border h-full flex flex-col">
                  <CardContent className="pt-6 flex-1">
                    <h3 className="text-xl font-semibold text-card-foreground mb-4">
                      Nos partenaires
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                    <li>• CHU de Nantes</li>
                      <li>• MPR de Nantes</li>
                      <li>• APRAIH</li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight" delay={400} className="h-full">
                <Card className="p-6 bg-card border-border h-full flex flex-col">
                  <CardContent className="pt-6 flex-1">
                    <h3 className="text-xl font-semibold text-card-foreground mb-4">
                      Équipe organisatrice
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Toute l&apos;équipe d&apos;ergothérapeutes du MPR</li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* APRAIH Section */}
        <section className="py-16 bg-gradient-to-br from-red-50 via-red-100 to-red-200 dark:from-red-950 dark:via-red-900 dark:to-red-800">
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

