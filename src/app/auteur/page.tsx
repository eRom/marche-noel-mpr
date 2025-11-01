import AnimatedSection from "@/components/AnimatedSection";
import CinematicVideo from "@/components/CinematicVideo";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TechShowcase from "@/components/TechShowcase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Romain Ecarnot — Créateur du Marché de Noël du MPR",
  description: "Architecte de solutions digitales, Romain Ecarnot conçoit des expériences web modernes et performantes. Découvrez l'expertise technique derrière ce site.",
};

export default function AuteurPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-16">
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

            
          </AnimatedSection>
        </div>

        {/* Video Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <AnimatedSection animation="fadeInUp">
            <CinematicVideo />
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

