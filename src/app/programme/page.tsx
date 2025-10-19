import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Programme - Marché de Noël MPR",
  description: "Découvrez le programme complet du Marché de Noël MPR du 15 au 24 décembre 2024",
};

export default function Programme() {
  const events = [
    {
      day: "15 décembre",
      title: "Ouverture officielle",
      time: "10h00",
      description: "Cérémonie d'ouverture avec les autorités locales et les artisans",
      type: "Cérémonie"
    },
    {
      day: "16 décembre",
      title: "Atelier de décoration",
      time: "14h00 - 16h00",
      description: "Apprenez à créer vos propres décorations de Noël",
      type: "Atelier"
    },
    {
      day: "17 décembre",
      title: "Concert de chorale",
      time: "18h00 - 19h30",
      description: "Chants de Noël par la chorale locale",
      type: "Concert"
    },
    {
      day: "18 décembre",
      title: "Marché des artisans",
      time: "10h00 - 20h00",
      description: "Rencontrez nos artisans et découvrez leurs créations",
      type: "Marché"
    },
    {
      day: "19 décembre",
      title: "Contes de Noël",
      time: "15h00 - 16h00",
      description: "Histoires magiques pour petits et grands",
      type: "Animation"
    },
    {
      day: "20 décembre",
      title: "Dégustation de spécialités",
      time: "16h00 - 18h00",
      description: "Découvrez les saveurs locales et les spécialités de Noël",
      type: "Dégustation"
    },
    {
      day: "21 décembre",
      title: "Spectacle de marionnettes",
      time: "14h30 - 15h30",
      description: "Spectacle interactif pour toute la famille",
      type: "Spectacle"
    },
    {
      day: "22 décembre",
      title: "Marché nocturne",
      time: "18h00 - 22h00",
      description: "Marché illuminé avec ambiance festive",
      type: "Marché"
    },
    {
      day: "23 décembre",
      title: "Grande tombola",
      time: "17h00",
      description: "Tirage au sort avec de nombreux lots à gagner",
      type: "Animation"
    },
    {
      day: "24 décembre",
      title: "Fermeture festive",
      time: "16h00",
      description: "Dernière journée avec animations spéciales",
      type: "Cérémonie"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          {/* Background Image */}
         
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-placeholder.png"
              alt="Marché de Noël MPR"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay with blur and opacity */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection animation="fadeInUp">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Programme du Marché de Noël
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Du 15 au 24 décembre 2024, découvrez un programme riche en animations, 
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
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Événements quotidiens
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Chaque jour, de nouvelles surprises vous attendent au Marché de Noël MPR.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <AnimatedSection 
                  key={event.day} 
                  animation="fadeInUp" 
                  delay={index * 100}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg text-noel-red">
                          {event.day}
                        </CardTitle>
                        <span className="text-xs bg-noel-gold text-white px-2 py-1 rounded-full">
                          {event.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {event.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
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
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Informations pratiques
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <Card className="text-center p-6 h-full flex flex-col">
                  <CardContent className="pt-6 flex-1 flex flex-col justify-center">
                    <Calendar className="w-12 h-12 text-noel-red mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Dates
                    </h3>
                    <p className="text-gray-600 text-sm">
                      15 - 24 décembre 2024
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={400}>
                <Card className="text-center p-6 h-full flex flex-col">
                  <CardContent className="pt-6 flex-1 flex flex-col justify-center">
                    <Clock className="w-12 h-12 text-noel-green mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Horaires
                    </h3>
                    <p className="text-gray-600 text-sm">
                      10h00 - 20h00<br />
                      (varie selon les jours)
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={600}>
                <Card className="text-center p-6 h-full flex flex-col">
                  <CardContent className="pt-6 flex-1 flex flex-col justify-center">
                    <MapPin className="w-12 h-12 text-noel-gold mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Lieu
                    </h3>
                    <p className="text-gray-600 text-sm">
                      MPR Nantes<br />
                      Centre-ville
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight" delay={800}>
                <Card className="text-center p-6 h-full flex flex-col">
                  <CardContent className="pt-6 flex-1 flex flex-col justify-center">
                    <Users className="w-12 h-12 text-noel-red mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Accès
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Gratuit<br />
                      Tous publics
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
