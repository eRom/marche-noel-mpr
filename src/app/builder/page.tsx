"use client";

import { generateStyledImage } from "@/actions/builder";
import AnimatedSection from "@/components/AnimatedSection";
import ImageSelector from "@/components/builder/ImageSelector";
import StyleCarousel from "@/components/builder/StyleCarousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { BuilderImage, DecorationStyle } from "@/types/builder";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

export default function BuilderPage() {
  const [selectedImage, setSelectedImage] = useState<BuilderImage | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<DecorationStyle | null>(
    null
  );
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const scrollPositionRef = useRef<number>(0);
  const shouldRestoreScrollRef = useRef<boolean>(false);

  // Empêcher le scroll automatique lors des changements d'état
  useEffect(() => {
    if (shouldRestoreScrollRef.current) {
      const savedScroll = scrollPositionRef.current;
      // Utiliser requestAnimationFrame pour restaurer après le rendu
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: savedScroll,
            behavior: "auto",
          });
          shouldRestoreScrollRef.current = false;
        });
      });
    }
  });

  // Gérer la sélection d'image
  const handleImageSelect = useCallback((image: BuilderImage) => {
    // Sauvegarder la position de scroll avant le changement
    scrollPositionRef.current = window.scrollY;
    shouldRestoreScrollRef.current = true;

    setSelectedImage(image);
    setGeneratedImage(null);
    setSelectedStyle(null);
    setError(null);
  }, []);

  // Fonction pour générer une image avec retry automatique
  const generateWithRetry = useCallback(
    async (imageUrl: string, style: DecorationStyle, attempt: number = 0) => {
      const MAX_RETRIES = 2;

      try {
        const result = await generateStyledImage(imageUrl, style);
        if (result.success && result.data) {
          setGeneratedImage(result.data.imageUrl);
          toast.success("Décoration générée avec succès !");
          return true;
        } else {
          // Erreur de génération
          if (attempt < MAX_RETRIES) {
            // Réessayer automatiquement
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Attendre 1 seconde
            return await generateWithRetry(imageUrl, style, attempt + 1);
          } else {
            // Toutes les tentatives ont échoué
            setError("RETRY_FAILED");
            return false;
          }
        }
      } catch {
        // Erreur réseau ou autre
          if (attempt < MAX_RETRIES) {
          // Réessayer automatiquement
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Attendre 1 seconde
          return await generateWithRetry(imageUrl, style, attempt + 1);
        } else {
          // Toutes les tentatives ont échoué
          setError("RETRY_FAILED");
          return false;
        }
      }
    },
    []
  );

  // Gérer la sélection de style
  const handleStyleSelect = useCallback(
    (style: DecorationStyle) => {
      if (!selectedImage) {
        toast.error("Veuillez d'abord sélectionner une image");
        return;
      }

      setSelectedStyle(style);
      setError(null);
      setIsLoading(true);

      startTransition(async () => {
        await generateWithRetry(selectedImage.url, style);
        setIsLoading(false);
      });
    },
    [selectedImage, generateWithRetry, startTransition]
  );

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main id="main-content" role="main">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fadeInUp">
              <header className="mb-6 text-center">
                <h1 className="text-4xl font-bold text-red-700 md:text-5xl dark:text-red-500">
                  Mon MPR - Assistant de décoration
                </h1>
              </header>
            </AnimatedSection>
          </div>
        </section>

        <div className="container mx-auto space-y-8 px-4 pb-12">
          {/* Sélecteur d'image avec slider intégré */}
          <ImageSelector
            onSelect={handleImageSelect}
            selectedImage={selectedImage}
            generatedImage={generatedImage}
            isLoading={isLoading || isPending}
            error={error}
          />

          {selectedImage && (
            <>
              {/* Carrousel de styles */}
              <StyleCarousel
                onStyleSelect={handleStyleSelect}
                selectedStyle={selectedStyle}
                isLoading={isLoading || isPending}
              />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
