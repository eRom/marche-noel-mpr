import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Star, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Boutique - Marché de Noël MPR",
  description: "Découvrez notre boutique avec les créations des artisans locaux du Marché de Noël MPR",
};

export default function Boutique() {
  const artisans = [
    {
      name: "Atelier du Sapin",
      specialty: "Décorations en bois",
      description: "Créations artisanales en bois massif, décorations de Noël uniques",
      products: ["Sapins en bois", "Décorations", "Cadeaux personnalisés"],
      rating: 5,
      location: "Stand A1"
    },
    {
      name: "Douceurs de Noël",
      specialty: "Pâtisseries artisanales",
      description: "Spécialités sucrées et salées, biscuits de Noël traditionnels",
      products: ["Biscuits", "Chocolats", "Confitures"],
      rating: 5,
      location: "Stand B2"
    },
    {
      name: "Laine & Cie",
      specialty: "Textiles et tricots",
      description: "Vêtements chauds, écharpes et accessoires en laine naturelle",
      products: ["Écharpes", "Bonnets", "Gants"],
      rating: 4,
      location: "Stand C3"
    },
    {
      name: "Poteries du Terroir",
      specialty: "Céramique artisanale",
      description: "Vaisselle et objets décoratifs en céramique faits main",
      products: ["Vaisselle", "Vases", "Décorations"],
      rating: 5,
      location: "Stand D4"
    },
    {
      name: "Savons Naturels",
      specialty: "Cosmétiques bio",
      description: "Savons, crèmes et produits de beauté à base d'ingrédients naturels",
      products: ["Savons", "Crèmes", "Huiles essentielles"],
      rating: 4,
      location: "Stand E5"
    },
    {
      name: "Bijoux d'Art",
      specialty: "Bijouterie artisanale",
      description: "Créations uniques en métaux précieux et pierres naturelles",
      products: ["Colliers", "Bagues", "Boucles d'oreilles"],
      rating: 5,
      location: "Stand F6"
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
                Notre Boutique
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Découvrez les créations uniques de nos artisans locaux. 
                Des produits authentiques et de qualité pour vos cadeaux de Noël.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Artisans Section */}
        <section className="py-16 bg-noel-snow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Nos Artisans
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Rencontrez les créateurs talentueux qui participent à notre marché de Noël.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artisans.map((artisan, index) => (
                <AnimatedSection 
                  key={artisan.name} 
                  animation="fadeInUp" 
                  delay={index * 100}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-xl text-gray-900">
                          {artisan.name}
                        </CardTitle>
                        <div className="flex items-center">
                          {[...Array(artisan.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-noel-gold text-noel-gold" />
                          ))}
                        </div>
                      </div>
                      <Badge variant="secondary" className="w-fit bg-noel-red text-white">
                        {artisan.specialty}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {artisan.description}
                        </p>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Produits :</h4>
                          <div className="flex flex-wrap gap-1">
                            {artisan.products.map((product) => (
                              <Badge key={product} variant="outline" className="text-xs">
                                {product}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{artisan.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Informations Boutique
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Besoin d&apos;informations sur nos produits ou nos artisans ? Contactez-nous !
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <Card className="p-6">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Horaires de la boutique
                    </h3>
                    <div className="space-y-2 text-gray-600">
                      <p><strong>Lundi - Dimanche :</strong> 10h00 - 20h00</p>
                      <p><strong>24 décembre :</strong> 10h00 - 16h00</p>
                      <p className="text-sm text-gray-500 mt-4">
                        * Horaires susceptibles de varier selon les artisans
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight" delay={400}>
                <Card className="p-6">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Contact
                    </h3>
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-3 text-noel-red" />
                        <span>MPR Nantes - Centre-ville</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-3 text-noel-green" />
                        <span>02 XX XX XX XX</span>
                      </div>
                      <div className="flex items-center">
                        <ShoppingBag className="w-5 h-5 mr-3 text-noel-gold" />
                        <span>Boutique ouverte du 15 au 24 décembre</span>
                      </div>
                    </div>
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
