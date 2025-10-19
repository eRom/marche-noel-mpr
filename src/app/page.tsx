import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Heart, ShoppingBag } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <HeroSection
          title="Bienvenue au Marché de Noël du MPR de Nantes"
          subtitle="Du 15 au 24 décembre 2024"
          description="Découvrez la magie de Noël au cœur de Nantes avec notre marché traditionnel. Artisans locaux, produits authentiques et ambiance festive vous attendent."
          imageSrc="/hero-placeholder.png"
          imageAlt="Marché de Noël MPR - Marché traditionnel dans un village de montagne enneigé"
          primaryButtonText="Voir le programme"
          primaryButtonHref="/programme"
          secondaryButtonText="Découvrir la boutique"
          secondaryButtonHref="/boutique"
        />

        {/* Features Section */}
        <section className="py-16 bg-noel-snow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Pourquoi nous choisir ?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Un marché de Noël authentique qui célèbre les traditions locales et l&apos;artisanat français.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Calendar className="w-12 h-12 text-noel-red mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Programme riche
                    </h3>
                    <p className="text-gray-600">
                      Des animations quotidiennes et des ateliers pour toute la famille.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={400}>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <ShoppingBag className="w-12 h-12 text-noel-green mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Artisans patients
                    </h3>
                    <p className="text-gray-600">
                      Découvrez des créateurs talentueux et des produits uniques de notre région.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight" delay={600}>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Heart className="w-12 h-12 text-noel-gold mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Esprit de Noël
                    </h3>
                    <p className="text-gray-600">
                      Une ambiance chaleureuse et festive pour créer des souvenirs inoubliables.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-noel-red to-red-700">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection animation="fadeInUp">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Prêt à vivre la magie de Noël ?
              </h2>
              <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                Rejoignez-nous du 15 au 24 décembre pour une expérience inoubliable au cœur de Nantes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/programme"
                  className="bg-white text-noel-red hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                >
                  Voir le programme complet
                </a>
                <a
                  href="/boutique"
                  className="border-2 border-white text-white hover:bg-white hover:text-noel-red px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                >
                  Explorer la boutique
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
