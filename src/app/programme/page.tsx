import CalendarReminder from "@/components/CalendarReminder";
import MagicSnowflake from "@/components/MagicSnowflake";
import MapSection from "@/components/MapSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import VideoSection from "@/components/VideoSection";
import { Calendar, Clock, Users } from "lucide-react";
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
  title: "Programme Festivités - Marché de Noël du MPR de Nantes",
  description:
    "Programme complet du Marché de Noël au sein du pôle de Médecine Physique et de Réadaptation du CHU de Nantes.",
};

export default function Programme() {
  const events = [
    {
      day: "27 novembre",
      title: "Ouverture de marché de noël",
      time: "16h00",
      description: "Découvrez les animations et les ateliers de Noël",
      type: "Ouverture",
      bg: "bg-primary",
      color: "text-destructive-foreground",
    },
    {
      day: "27 novembre",
      title: "Marché des créations",
      time: "16h00 - 19h00",
      description: "Vente de décorations de Noël, créations patients",
      type: "Marché",
      bg: "bg-accent",
      color: "text-accent-foreground",
    },
    {
      day: "11 décembre",
      title: "Marché de noël",
      time: "16h00 - 19h00",
      description: "Décorations, petits cadeaux, bijoux",
      type: "Marché",
      bg: "bg-accent",
      color: "text-accent-foreground",
    },
    {
      day: "11 décembre",
      title: "Gouter, concert",
      time: "16h00 - 19h00",
      description: "Goûter et concert organisés par le service animation",
      type: "Événement",
      bg: "bg-secondary",
      color: "text-accent-foreground",
    },
    {
      day: "13 décembre",
      title: "Marché de Noël",
      time: "14h00 - 18h00",
      description: "Décorations, petits cadeaux, bijoux",
      type: "Marché",
      bg: "bg-accent",
      color: "text-accent-foreground",
    },
    {
      day: "16 décembre",
      title: "Marché & Pâtisseries",
      time: "16h00 - 19h00",
      description:
        "Vente de pâtisseries faites par les patients et l’équipe d'ergothérapie",
      type: "Événement",
      bg: "bg-secondary",
      color: "text-accent-foreground",
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main id="main-content" role="main">
        {/* Magic Snowflakes for Hunt Game */}
        <MagicSnowflake id={3} page="programme" />
        <MagicSnowflake id={4} page="programme" />

        {/* Hero Section */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <h1 className="text-foreground text-4xl font-bold sm:text-5xl">
                Programme 2025
              </h1>
              <Separator className="mx-auto my-6 w-24" />
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                Le 27 nov. - 11, 13 et 16 déc.
              </p>
              <p className="text-muted-foreground mx-auto mb-6 max-w-2xl text-xl">
                Découvrez un programme riche en animations et en activités.
              </p>
              <div className="mt-6 flex justify-center">
                <CalendarReminder variant="default" size="default" />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Programme Details */}
        <section className="bg-noel-snow py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="mb-12 text-center">
                <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
                  Événements
                </h2>
                <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                  Chaque jour, de nouvelles surprises vous attendent au Marché
                  de Noël du MPR.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => (
                <AnimatedSection
                  key={`${event.day}-${event.title}-${index}`}
                  animation="fadeInUp"
                  delay={index * 100}
                >
                  <Card className="bg-card border-border h-full transition-shadow hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-2 flex items-center justify-between">
                        <CardTitle className="text-primary text-lg">
                          {event.day}
                        </CardTitle>
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${event.bg} ${event.color}`}
                        >
                          {event.type}
                        </span>
                      </div>
                      <h3 className="text-card-foreground text-xl font-semibold">
                        {event.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-muted-foreground flex items-center">
                          <Clock className="mr-2 h-4 w-4" aria-hidden="true" />
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
        <section className="bg-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="mb-12 text-center">
                <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
                  Informations pratiques
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <Card className="bg-card border-border flex h-full flex-col p-6 text-center">
                  <CardContent className="flex flex-1 flex-col justify-center pt-6">
                    <Calendar
                      className="text-primary mx-auto mb-4 h-12 w-12"
                      aria-hidden="true"
                    />
                    <h3 className="text-card-foreground mb-2 text-lg font-semibold">
                      Dates
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      27 nov. - 11, 13 et 16 déc. 2025
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={400}>
                <Card className="bg-card border-border flex h-full flex-col p-6 text-center">
                  <CardContent className="flex flex-1 flex-col justify-center pt-6">
                    <Clock
                      className="text-secondary mx-auto mb-4 h-12 w-12"
                      aria-hidden="true"
                    />
                    <h3 className="text-card-foreground mb-2 text-lg font-semibold">
                      Horaires
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      16h00 - 19h00 le 27 nov. et le 11, 16 déc.
                      <br />
                      14h00 - 18h00 le 13 déc.
                      <br />
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={500}>
                <Card className="bg-card border-border flex h-full flex-col p-6 text-center">
                  <CardContent className="flex flex-1 flex-col justify-center pt-6">
                    <Users
                      className="text-accent mx-auto mb-4 h-12 w-12"
                      aria-hidden="true"
                    />
                    <h3 className="text-card-foreground mb-2 text-lg font-semibold">
                      Accès
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Hall d&apos;intégration du MPR
                      <br />
                      Gratuit
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
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

        {/* Video Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <VideoSection showSoundToggle={false} />
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
