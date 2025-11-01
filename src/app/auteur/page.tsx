import AnimatedSection from "@/components/AnimatedSection";
import CinematicVideo from "@/components/CinematicVideo";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TechShowcase from "@/components/TechShowcase";
import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Globe } from "lucide-react";
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
        <section className="bg-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
            <AnimatedSection animation="fadeInUp" className="">
              <div className="text-center space-y-1">
                <h1 className="text-3xl md:text-4xl font-bold">
                  Romain Ecarnot
                </h1>
                <p className="text-lg text-muted-foreground">
                  Solutions digitales
                </p>
              </div>

              
            </AnimatedSection>
          </div>
        </section>

        {/* Video Section */}
        <section className="bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <AnimatedSection animation="fadeInUp">
              <CinematicVideo />
            </AnimatedSection>
          </div>
        </section>

        {/* Support Section - Tipeee */}
        <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-800 to-gray-900">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Soutenez mon parcours
                </h2>
                <p className="text-lg text-white/90 max-w-2xl mx-auto">
                  Rebondir après un AVC et continuer ma carrière dans la tech.
                  <br />
                  Votre soutien fait la différence.
                </p>
                <div className="pt-4">
                  <a
                    href="https://fr.tipeee.com/rebondir-apres-lavc-ma-carriere-dans-la-tech/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-red-50 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    Soutenir sur Tipeee
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true" />
        </section>

        {/* Tech Showcase */}
        <section className="bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <AnimatedSection animation="fadeInUp">
              <TechShowcase />
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section - Réseaux sociaux */}
        <section className="bg-gradient-to-b from-noel-snow-light to-noel-snow">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Retrouvez-moi
                </h2>
                <p className="text-lg text-muted-foreground">
                  Suivez mon parcours et restons connectés
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                  {/* Linktree / Site perso */}
                  <a
                    href="https://www.romain-ecarnot.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-gray-200/90 hover:bg-primary/10 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-colors">
                      <Globe className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <span className="font-semibold text-sm">Site Web</span>
                  </a>

                  {/* X (Twitter) */}
                  <a
                    href="https://x.com/CloudinNantes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-gray-200/90 hover:bg-black transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 rounded-full bg-black/10 group-hover:bg-white flex items-center justify-center transition-colors">
                      <FontAwesomeIcon
                        icon={faXTwitter}
                        className="text-2xl text-black group-hover:text-black transition-colors"
                      />
                    </div>
                    <span className="font-semibold text-sm group-hover:text-white">X (Twitter)</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/romainecarnot/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-gray-200/90 hover:bg-[#0A66C2] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#0A66C2]/10 group-hover:bg-white flex items-center justify-center transition-colors">
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        className="text-2xl text-[#0A66C2] transition-colors"
                      />
                    </div>
                    <span className="font-semibold text-sm group-hover:text-white">LinkedIn</span>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/eRom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-gray-200/90 hover:bg-gray-800 dark:hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-800/10 dark:bg-white/10 group-hover:bg-white dark:group-hover:bg-gray-800 flex items-center justify-center transition-colors">
                      <FontAwesomeIcon
                        icon={faGithub}
                        className="text-2xl text-gray-800 dark:text-white group-hover:text-gray-800 dark:group-hover:text-white transition-colors"
                      />
                    </div>
                    <span className="font-semibold text-sm group-hover:text-white dark:group-hover:text-gray-800">GitHub</span>
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

