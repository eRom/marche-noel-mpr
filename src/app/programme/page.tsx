import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Users } from "lucide-react";
import dynamic from "next/dynamic";

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
  title: "Programme Festivités - Marché de Noël du MPR de Nantes",
  description: "Programme complet du Marché de Noël au sein du pôle de Médecine Physique et de Réadaptation du CHU de Nantes.",
};

export default function Programme() {
  const events = [
    {
      day: "27 novembre",
      title: "Ouverture officielle",
      time: "16h00",
      description: "Découvrez les animations et les ateliers de Noël",
      type: "Cérémonie"
    },
    {
      day: "27 novembre",
      title: "Marché des artisans",
      time: "16h00 - 19h00",
      description: "Vente de décorations de Noël, créations artisanales",
      type: "Marché"
    },
    {
      day: "11 décembre",
      title: "TODO_TITLE",
      time: "16h00 - 19h00",
      description: "TODO_DESCRIPTION",
      type: "Concert"
    },
    {
      day: "13 décembre",
      title: "Marché de Noël",
      time: "14h00 - 18h00",
      description: "TODO_DESCRIPTION",
      type: "Marché"
    },
    {
      day: "16 décembre",
      title: "TODO_TITLE",
      time: "16h00 - 19h00",
      description: "TODO_DESCRIPTION",
      type: "Concert"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection animation="fadeInUp">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                Programme 2025
              </h1>
              <Separator className="my-6 mx-auto w-24" />
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Le 27 nov. - 11, 13 et 16 déc.
              </p>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Découvrez un programme riche en animations,
                concerts et activités pour toute la famille.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Programme Details */}
        <section className="py-16 bg-noel-snow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Événements
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Chaque jour, de nouvelles surprises vous attendent au Marché de Noël du MPR.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <AnimatedSection 
                  key={`${event.day}-${event.title}-${index}`} 
                  animation="fadeInUp" 
                  delay={index * 100}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg text-primary">
                          {event.day}
                        </CardTitle>
                        <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                          {event.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-card-foreground">
                        {event.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <Card className="text-center p-6 h-full flex flex-col bg-card border-border">
                  <CardContent className="pt-6 flex-1 flex flex-col justify-center">
                    <Calendar className="w-12 h-12 text-primary mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      Dates
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      27 nov. - 11, 13 et 16 déc. 2025
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={400}>
                <Card className="text-center p-6 h-full flex flex-col bg-card border-border">
                  <CardContent className="pt-6 flex-1 flex flex-col justify-center">
                    <Clock className="w-12 h-12 text-secondary mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      Horaires
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      16h00 - 19h00 le 27 nov. et le 11, 16 déc.<br />
                      14h00 - 18h00 le 13 déc.<br />
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight" delay={600}>
                <Card className="text-center p-6 h-full flex flex-col bg-card border-border">
                  <CardContent className="pt-6 flex-1 flex flex-col justify-center">
                    <Users className="w-12 h-12 text-accent mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      Accès
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Hall d&apos;intégration du MPR<br />
                      Gratuit
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Video Section */}
        {/* <section className="py-16 bg-noel-snow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <VideoSection />
            </AnimatedSection>
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
}
