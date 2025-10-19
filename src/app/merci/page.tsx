import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Heart, Star, Users } from "lucide-react";

export const metadata = {
  title: "Merci - Marché de Noël du MPR",
  description: "Remerciements et informations sur le Marché de Noël du MPR",
};

export default function Merci() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-noel-gold to-yellow-600 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection animation="fadeInUp">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Merci !
              </h1>
              <p className="text-xl text-yellow-100 max-w-2xl mx-auto">
                Un grand merci à tous ceux qui ont rendu ce Marché de Noël possible.
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
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Un événement réussi grâce à vous
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Le Marché de Noël MPR 2025 a été un véritable succès grâce à la participation 
                  de tous : visiteurs, artisans, bénévoles et organisateurs. Votre enthousiasme 
                  et votre soutien ont créé une ambiance magique qui restera dans nos mémoires.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <Card className="text-center p-6">
                  <CardContent className="pt-6">
                    <Users className="w-12 h-12 text-noel-red mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Visiteurs
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Plus de 5000 visiteurs ont découvert notre marché
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={400}>
                <Card className="text-center p-6">
                  <CardContent className="pt-6">
                    <Gift className="w-12 h-12 text-noel-green mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Artisans
                    </h3>
                    <p className="text-gray-600 text-sm">
                      25 artisans locaux ont participé à l&apos;événement
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={600}>
                <Card className="text-center p-6">
                  <CardContent className="pt-6">
                    <Heart className="w-12 h-12 text-noel-gold mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Bénévoles
                    </h3>
                    <p className="text-gray-600 text-sm">
                      50 bénévoles ont donné de leur temps
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight" delay={800}>
                <Card className="text-center p-6">
                  <CardContent className="pt-6">
                    <Star className="w-12 h-12 text-noel-red mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Satisfaction
                    </h3>
                    <p className="text-gray-600 text-sm">
                      98% de satisfaction des visiteurs
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Acknowledgments */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Remerciements
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <Card className="p-6">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Nos partenaires
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Ville de Nantes</li>
                      <li>• Chambre de Commerce</li>
                      <li>• Office de Tourisme</li>
                      <li>• Associations locales</li>
                      <li>• Médias partenaires</li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight" delay={400}>
                <Card className="p-6">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Équipe organisatrice
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Comité d&apos;organisation MPR</li>
                      <li>• Équipe technique</li>
                      <li>• Service sécurité</li>
                      <li>• Service communication</li>
                      <li>• Logistique et accueil</li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="py-16 bg-gradient-to-r from-noel-red to-red-700">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection animation="fadeInUp">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Restez connectés
              </h2>
              <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                Suivez-nous sur les réseaux sociaux pour ne rien rater de nos prochains événements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#"
                  className="bg-white text-noel-red hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="bg-white text-noel-red hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="bg-white text-noel-red hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                >
                  Twitter
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Next Year */}
        <section className="py-16 bg-noel-snow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection animation="fadeInUp">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                À l&apos;année prochaine !
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Nous vous donnons rendez-vous l&apos;année prochaine pour une nouvelle édition 
                encore plus magique du Marché de Noël du MPR.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-noel-red mb-2">
                  Marché de Noël du MPR 2026
                </h3>
                <p className="text-gray-600">
                  Dates à confirmer<br />
                  Restez informés !
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
