import { Card, CardContent } from "@/components/ui/card";
import { Gift, Heart, Users } from "lucide-react";
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

export const metadata = {
  title: "Merci - Marché de Noël MPR Nantes 2025",
  description:
    "Remerciements pour votre participation au Marché de Noël MPR de Nantes. Découvrez les points forts de cette édition, les moments magiques partagés et les informations pour l'année prochaine.",
};

export default function Merci() {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main id="main-content" role="main">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16">
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
            <div className="bg-accent/30 absolute inset-0 backdrop-blur-sm" />
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <h1 className="text-background mb-4 text-4xl font-bold sm:text-5xl">
                Merci
              </h1>
              <p className="text-background/90 mx-auto max-w-2xl text-xl">
                Un grand merci à tous ceux qui ont rendu ce Marché de Noël
                possible.
              </p>
              <p className="text-background/90 mx-auto max-w-2xl text-xl">
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
                      <li>• TODO_NAME</li>
                      <li>• TODO_NAME</li>
                      <li>• TODO_NAME</li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Next Year */}
        <section className="from-primary to-primary-dark flex min-h-[200px] items-center bg-gradient-to-r py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <h2 className="text-primary-foreground text-center text-3xl font-bold sm:text-4xl">
                A l&apos;année prochaine !
              </h2>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
