import { Card, CardContent } from "@/components/ui/card";
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
                À propos
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
        <section className="py-16 bg-gradient-to-r from-primary to-primary-dark flex items-center min-h-[200px]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <AnimatedSection animation="fadeInUp">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground text-center">
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

