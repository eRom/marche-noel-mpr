"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { faFacebook, faLinkedin, faWhatsapp, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShareSection() {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://mpr-noel.romain-ecarnot.com";
  const shareText = "Découvrez le Marché de Noël du MPR de Nantes - Le 27 nov. - 11, 13 et 16 déc. 2025";

  const handleShare = (platform: "facebook" | "whatsapp" | "twitter" | "linkedin") => {
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
    <section className="py-16 bg-noel-snow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fadeInUp">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Partagez l&apos;événement
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Partagez le Marché de Noël du MPR avec vos proches sur les réseaux sociaux
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 max-w-4xl mx-auto">
              <button
                onClick={() => handleShare("facebook")}
                className="group flex items-center justify-center gap-3 px-8 py-4 min-h-[60px] bg-[#1877F2] text-white rounded-lg font-semibold text-lg hover:bg-[#145dbf] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 focus:ring-2 focus:ring-[#1877F2] focus:ring-offset-2 w-full md:w-auto md:flex-1"
                aria-label="Partager sur Facebook"
              >
                <FontAwesomeIcon 
                  icon={faFacebook} 
                  className="w-6 h-6 transition-transform group-hover:scale-110" 
                  aria-hidden="true"
                />
                <span>Facebook</span>
              </button>

              <button
                onClick={() => handleShare("whatsapp")}
                className="group flex items-center justify-center gap-3 px-8 py-4 min-h-[60px] bg-[#25D366] text-white rounded-lg font-semibold text-lg hover:bg-[#1da851] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 w-full md:w-auto md:flex-1"
                aria-label="Partager sur WhatsApp"
              >
                <FontAwesomeIcon 
                  icon={faWhatsapp} 
                  className="w-6 h-6 transition-transform group-hover:scale-110" 
                  aria-hidden="true"
                />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => handleShare("twitter")}
                className="group flex items-center justify-center gap-3 px-8 py-4 min-h-[60px] bg-[#000000] text-white rounded-lg font-semibold text-lg hover:bg-[#333333] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 focus:ring-2 focus:ring-[#000000] focus:ring-offset-2 w-full md:w-auto md:flex-1"
                aria-label="Partager sur Twitter (X)"
              >
                <FontAwesomeIcon 
                  icon={faXTwitter} 
                  className="w-6 h-6 transition-transform group-hover:scale-110" 
                  aria-hidden="true"
                />
                <span>Twitter</span>
              </button>

              <button
                onClick={() => handleShare("linkedin")}
                className="group flex items-center justify-center gap-3 px-8 py-4 min-h-[60px] bg-[#0A66C2] text-white rounded-lg font-semibold text-lg hover:bg-[#004182] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 focus:ring-2 focus:ring-[#0A66C2] focus:ring-offset-2 w-full md:w-auto md:flex-1"
                aria-label="Partager sur LinkedIn"
              >
                <FontAwesomeIcon 
                  icon={faLinkedin} 
                  className="w-6 h-6 transition-transform group-hover:scale-110" 
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

