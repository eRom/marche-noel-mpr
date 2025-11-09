"use client";

import type { GalleryImage, LightboxProps } from "@/types/gallery";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Share2, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

const categoryColors: Record<GalleryImage["category"], string> = {
  stands: "bg-red-600",
  animations: "bg-green-600",
  visiteurs: "bg-blue-600",
  ambiance: "bg-purple-600",
  MPR: "bg-yellow-600",
  IA: "bg-pink-600",
};

export function Lightbox({
  image,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: LightboxProps) {
  // Gestion navigation clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0)
        onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1)
        onNavigate(currentIndex + 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    // Empêcher le scroll du body
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [currentIndex, onClose, onNavigate, images.length]);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share !== undefined) {
      try {
        await navigator.share({
          title: image.title,
          text: `Photo du Marché de Noël du MPR : ${image.title}`,
          url: window.location.href,
        });
      } catch {
        // L'utilisateur a annulé le partage ou le partage a échoué
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Visionneuse d'image en plein écran"
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/50 focus:outline-none"
          aria-label="Fermer la galerie"
          type="button"
        >
          <X size={24} />
        </button>

        {/* Navigation gauche */}
        {currentIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex - 1);
            }}
            className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/50 focus:outline-none"
            aria-label="Photo précédente"
            type="button"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Image principale - Le conteneur empêche la fermeture du lightbox lors du clic */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className="relative mx-4 h-[95vh] max-h-full w-[95vw] max-w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-full w-full">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="rounded-lg object-contain"
              quality={90}
              priority
              sizes="95vw"
            />

            {/* Info panel */}
            <div className="absolute right-0 bottom-0 left-0 z-20 rounded-b-lg bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h3 className="mb-1 text-xl font-semibold">{image.title}</h3>
              <div className="mb-3 flex items-center gap-4">
                <p className="text-sm opacity-80">{image.date}</p>
                <span
                  className={`${categoryColors[image.category]} rounded-full px-2 py-1 text-xs capitalize`}
                >
                  {image.category}
                </span>
              </div>

              <div className="flex gap-3">
                {typeof navigator !== "undefined" &&
                  navigator.share !== undefined && (
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm transition-colors hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none"
                      aria-label="Partager cette photo"
                      type="button"
                    >
                      <Share2 size={18} />
                      Partager
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation droite */}
        {currentIndex < images.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex + 1);
            }}
            className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/50 focus:outline-none"
            aria-label="Photo suivante"
            type="button"
          >
            <ChevronRight size={32} />
          </button>
        )}

        {/* Compteur */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white"
          aria-live="polite"
          aria-atomic="true"
        >
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
