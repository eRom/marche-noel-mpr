"use client";

import AnimatedSection from "@/components/AnimatedSection";
import {
  faFacebook,
  faLinkedin,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShareSection() {
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://mpr-noel.romain-ecarnot.com";
  const shareText =
    "Découvrez le Marché de Noël du MPR de Nantes - Le 27 nov. - 11, 13 et 16 déc. 2025";

  const handleShare = (
    platform: "facebook" | "whatsapp" | "twitter" | "linkedin"
  ) => {
    let url = "";

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
    }

    // Open in new window
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  return (
    <section className="bg-noel-snow py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fadeInUp">
          <div className="text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
              Partagez l&apos;événement
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
              Partagez le Marché de Noël du MPR avec vos proches sur les réseaux
              sociaux
            </p>

            <div className="mx-auto flex max-w-4xl flex-col items-stretch justify-center gap-4 md:flex-row">
              <button
                onClick={() => handleShare("facebook")}
                className="group flex min-h-[60px] w-full items-center justify-center gap-3 rounded-lg bg-[#1877F2] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#145dbf] hover:shadow-xl focus:ring-2 focus:ring-[#1877F2] focus:ring-offset-2 md:w-auto md:flex-1"
                aria-label="Partager sur Facebook"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="h-6 w-6 transition-transform group-hover:scale-110"
                  aria-hidden="true"
                />
                <span>Facebook</span>
              </button>

              <button
                onClick={() => handleShare("whatsapp")}
                className="group flex min-h-[60px] w-full items-center justify-center gap-3 rounded-lg bg-[#25D366] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#1da851] hover:shadow-xl focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 md:w-auto md:flex-1"
                aria-label="Partager sur WhatsApp"
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className="h-6 w-6 transition-transform group-hover:scale-110"
                  aria-hidden="true"
                />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => handleShare("twitter")}
                className="group flex min-h-[60px] w-full items-center justify-center gap-3 rounded-lg bg-[#000000] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#333333] hover:shadow-xl focus:ring-2 focus:ring-[#000000] focus:ring-offset-2 md:w-auto md:flex-1"
                aria-label="Partager sur Twitter (X)"
              >
                <FontAwesomeIcon
                  icon={faXTwitter}
                  className="h-6 w-6 transition-transform group-hover:scale-110"
                  aria-hidden="true"
                />
                <span>Twitter</span>
              </button>

              <button
                onClick={() => handleShare("linkedin")}
                className="group flex min-h-[60px] w-full items-center justify-center gap-3 rounded-lg bg-[#0A66C2] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#004182] hover:shadow-xl focus:ring-2 focus:ring-[#0A66C2] focus:ring-offset-2 md:w-auto md:flex-1"
                aria-label="Partager sur LinkedIn"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="h-6 w-6 transition-transform group-hover:scale-110"
                  aria-hidden="true"
                />
                <span>LinkedIn</span>
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
