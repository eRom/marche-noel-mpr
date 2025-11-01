import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TechShowcase from "@/components/TechShowcase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Romain Ecarnot — Créateur du Marché de Noël du MPR à Nantes",
  description: "Découvrez l’univers et l’expertise de Romain Ecarnot, architecte de solutions digitales et passionné par l’innovation. À l’origine de ce site, il façonne chaque détail pour offrir une expérience unique autour du Marché de Noël du MPR à Nantes.",
};

export default function AuteurPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <AnimatedSection animation="fadeInUp" className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Romain Ecarnot
              </h1>
              <p className="text-xl text-muted-foreground">
                Solutions digitales
              </p>
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Passionné par l&apos;innovation et l&apos;excellence technique,
                  <br />
                  je façonne des expériences modernes et performantes.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Tech Showcase */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <AnimatedSection animation="fadeInUp">
            <TechShowcase />
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </>
  );
}

