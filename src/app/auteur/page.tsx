import AnimatedSection from "@/components/AnimatedSection";
import CinematicVideo from "@/components/CinematicVideo";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TechShowcase from "@/components/TechShowcase";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Globe } from "lucide-react";
import { Metadata } from "next";
import MagicSnowflake from "@/components/MagicSnowflake";

export const metadata: Metadata = {
  title: "Romain Ecarnot — Créateur du Marché de Noël du MPR",
  description:
    "Architecte de solutions digitales, Romain Ecarnot conçoit des expériences web modernes et performantes. Découvrez l'expertise technique derrière ce site.",
};

export default function AuteurPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-16" role="main">
        {/* Magic Snowflake for Hunt Game */}
        <MagicSnowflake id={11} page="auteur" />

        {/* Hero Section */}
        <section className="bg-background">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp" className="">
              <div className="space-y-1 text-center">
                <h1 className="text-3xl font-bold md:text-4xl">
                  Romain Ecarnot
                </h1>
                <p className="text-muted-foreground text-lg">
                  Solutions digitales
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Video Section */}
        <section className="bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <CinematicVideo />
            </AnimatedSection>
          </div>
        </section>

        {/* Support Section - Tipeee */}
        <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-800 to-gray-900">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="space-y-6 text-center">
                <h2 className="text-3xl font-bold text-white md:text-4xl">
                  Soutenez mon parcours
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-white/90">
                  Rebondir après un AVC et continuer ma carrière dans la tech.
                  <br />
                  Votre soutien fait la différence.
                </p>
                <div className="pt-4">
                  <a
                    href="https://fr.tipeee.com/rebondir-apres-lavc-ma-carriere-dans-la-tech/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-red-600 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-red-50 hover:shadow-2xl"
                  >
                    <svg
                      className="h-6 w-6"
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
          <div
            className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-red-900/20 blur-3xl"
            aria-hidden="true"
          />
        </section>

        {/* Tech Showcase */}
        <section className="bg-background">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <TechShowcase />
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section - Réseaux sociaux */}
        <section className="from-noel-snow-light to-noel-snow bg-gradient-to-b">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="space-y-8 text-center">
                <h2 className="text-3xl font-bold md:text-4xl">
                  Retrouvez-moi
                </h2>
                <p className="text-muted-foreground text-lg">
                  Suivez mon parcours et restons connectés
                </p>

                <div className="grid grid-cols-2 gap-6 pt-4 md:grid-cols-4">
                  {/* Linktree / Site perso */}
                  <a
                    href="https://www.romain-ecarnot.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-noel-snow hover:bg-primary/10 flex flex-col items-center gap-3 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    aria-label="Visiter mon site web personnel"
                  >
                    <div className="bg-primary/10 group-hover:bg-primary flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                      <Globe className="text-primary group-hover:text-primary-foreground h-6 w-6 transition-colors" />
                    </div>
                    <span className="text-sm font-semibold">Site Web</span>
                  </a>

                  {/* X (Twitter) */}
                  <a
                    href="https://x.com/CloudinNantes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-noel-snow flex flex-col items-center gap-3 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:bg-black hover:shadow-lg"
                    aria-label="Suivez-moi sur X (Twitter)"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/10 transition-colors group-hover:bg-white">
                      <FontAwesomeIcon
                        icon={faXTwitter}
                        className="text-2xl text-black transition-colors group-hover:text-black"
                      />
                    </div>
                    <span className="text-sm font-semibold group-hover:text-white">
                      X (Twitter)
                    </span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/romainecarnot/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-noel-snow flex flex-col items-center gap-3 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:bg-[#0A66C2] hover:shadow-lg"
                    aria-label="Connectez-vous avec moi sur LinkedIn"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0A66C2]/10 transition-colors group-hover:bg-white">
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        className="text-2xl text-[#0A66C2] transition-colors"
                      />
                    </div>
                    <span className="text-sm font-semibold group-hover:text-white">
                      LinkedIn
                    </span>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/eRom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-noel-snow flex flex-col items-center gap-3 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:bg-gray-800 hover:shadow-lg dark:hover:bg-white"
                    aria-label="Consultez mes projets sur GitHub"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800/10 transition-colors group-hover:bg-white dark:bg-white/10 dark:group-hover:bg-gray-800">
                      <FontAwesomeIcon
                        icon={faGithub}
                        className="text-2xl transition-colors group-hover:text-gray-800 dark:text-white dark:group-hover:text-white"
                      />
                    </div>
                    <span className="text-sm font-semibold group-hover:text-white dark:group-hover:text-gray-800">
                      GitHub
                    </span>
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
