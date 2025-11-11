/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { BuilderImage } from "@/types/builder";
import { AlertCircle, Construction, Download, Share2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ImageSelectorProps {
  onSelect: (image: BuilderImage) => void;
  selectedImage?: BuilderImage | null;
  generatedImage?: string | null;
  isLoading?: boolean;
  error?: string | null;
}

// Liste des images disponibles dans public/builder/
const AVAILABLE_IMAGES: BuilderImage[] = [
  {
    id: "1",
    filename: "IMG_0713.webp",
    url: "/builder/IMG_0713.webp",
  },
  {
    id: "2",
    filename: "IMG_0714.webp",
    url: "/builder/IMG_0714.webp",
  },
  {
    id: "3",
    filename: "IMG_0715.webp",
    url: "/builder/IMG_0715.webp",
  },
];

export default function ImageSelector({
  onSelect,
  selectedImage,
  generatedImage = null,
  isLoading = false,
  error = null,
}: ImageSelectorProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sélectionner IMG_0713.webp par défaut
  useEffect(() => {
    if (!selectedImage) {
      const defaultImage = AVAILABLE_IMAGES.find(
        (img) => img.filename === "IMG_0713.webp"
      );
      if (defaultImage) {
        onSelect(defaultImage);
      }
    }
  }, [selectedImage, onSelect]);

  // Réinitialiser le slider à 50% quand une nouvelle image est générée
  useEffect(() => {
    if (generatedImage) {
      setSliderPosition(50);
    }
  }, [generatedImage]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.addEventListener("touchend", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, [isDragging]);

  const handleDownload = async () => {
    if (!generatedImage) return;

    try {
      setIsDownloading(true);
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `hall-decore-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Image téléchargée avec succès");
    } catch (err) {
      console.error("Erreur téléchargement:", err);
      toast.error("Erreur lors du téléchargement");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!generatedImage) return;

    try {
      if (navigator.share) {
        const response = await fetch(generatedImage);
        const blob = await response.blob();
        const file = new File([blob], "hall-decore.png", { type: "image/png" });
        await navigator.share({
          title: "Hall du MPR décoré",
          text: "Découvrez cette décoration générée par IA",
          files: [file],
        });
        toast.success("Image partagée avec succès");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Lien copié dans le presse-papiers");
      }
    } catch (err) {
      console.error("Erreur partage:", err);
      toast.error("Erreur lors du partage");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr]">
        {/* Vignettes en colonne à gauche sur desktop */}
        <div className="flex flex-col gap-4 md:order-1 md:h-full">
          {AVAILABLE_IMAGES.map((image) => {
            const isSelected = selectedImage?.id === image.id;
            return (
              <Card
                key={image.id}
                className={cn(
                  "flex flex-col overflow-hidden !p-0 !py-0 transition-all duration-200 md:flex-1",
                  isSelected
                    ? "ring-primary shadow-lg ring-2"
                    : "hover:shadow-md",
                  isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                )}
                role="button"
                tabIndex={isLoading ? -1 : -1}
                aria-label={`Sélectionner l'image ${image.filename}`}
                aria-pressed={isSelected}
                aria-disabled={isLoading}
                onClick={(e) => {
                  if (isLoading) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  e.preventDefault();
                  e.stopPropagation();
                  onSelect(image);
                }}
                onKeyDown={(e) => {
                  if (isLoading) {
                    e.preventDefault();
                    return;
                  }
                  // Permettre la navigation au clavier uniquement quand l'élément est déjà focus
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(image);
                  }
                }}
                onMouseDown={(e) => {
                  if (isLoading) {
                    e.preventDefault();
                    return;
                  }
                  // Empêcher le focus automatique au clic pour éviter le scroll
                  e.preventDefault();
                }}
              >
                <CardContent className="m-0 h-full w-full flex-1 !p-0 !px-0">
                  <div className="relative h-full w-full overflow-hidden rounded-xl">
                    <Image
                      src={image.url}
                      alt={`Hall du MPR - ${image.filename}`}
                      fill
                      className={cn(
                        "object-cover transition-transform duration-300",
                        isSelected ? "scale-105" : "hover:scale-105"
                      )}
                      sizes="(max-width: 768px) 100vw, 200px"
                      loading="lazy"
                    />
                    {isSelected && (
                      <div className="bg-primary/20 absolute inset-0 flex items-center justify-center">
                        <div className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs font-medium">
                          ✓
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Image sélectionnée en grand à droite sur desktop */}
        {selectedImage ? (
          <div className="space-y-2 md:order-2">
            {error ? (
              <div className="border-destructive relative aspect-video w-full overflow-hidden rounded-lg border-2 shadow-lg">
                <div className="bg-background/95 absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                  {error === "RETRY_FAILED" ? (
                    <>
                      <Construction
                        className="text-destructive h-16 w-16"
                        aria-hidden="true"
                      />
                      <div className="space-y-2 text-center">
                        <h3 className="text-destructive text-xl font-semibold">
                          Oups, les artisans sont en grève...
                        </h3>
                        <p
                          className="text-muted-foreground text-sm"
                          role="alert"
                        >
                          N&apos;hésitez pas à recommencer dans un court instant
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertCircle
                        className="text-destructive h-12 w-12"
                        aria-hidden="true"
                      />
                      <div className="text-center">
                        <h3 className="text-destructive text-lg font-semibold">
                          Erreur de génération
                        </h3>
                        <p
                          className="text-muted-foreground mt-2 text-sm"
                          role="alert"
                        >
                          {error}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : isLoading ? (
              <div className="border-primary relative aspect-video w-full overflow-hidden rounded-lg border-2 shadow-lg">
                <Image
                  src={selectedImage.url}
                  alt={`Hall du MPR sélectionné - ${selectedImage.filename}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, calc(100vw - 250px - 2rem)"
                  priority
                />
                {/* Overlay de chargement */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center">
                    <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
                    <p className="text-sm font-medium text-white">
                      Merci de laisser du temps à nos artisans...
                    </p>
                  </div>
                </div>
              </div>
            ) : generatedImage ? (
              <div
                className={cn(
                  "border-primary relative aspect-video w-full overflow-hidden rounded-lg border-2 shadow-lg"
                )}
                ref={containerRef}
                role="application"
                aria-label="Comparaison avant/après avec slider interactif"
                tabIndex={0}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
                onKeyDown={handleKeyDown}
              >
                {/* Image originale */}
                <div className="relative h-full w-full">
                  <Image
                    src={selectedImage.url}
                    alt="Hall du MPR - Original"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, calc(100vw - 250px - 2rem)"
                    priority
                  />
                </div>

                {/* Image générée avec clip */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={generatedImage}
                      alt="Hall du MPR - Décoré par IA"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, calc(100vw - 250px - 2rem)"
                      priority
                    />
                  </div>
                </div>

                {/* Slider handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 cursor-ew-resize bg-white shadow-lg"
                  style={{
                    left: `${sliderPosition}%`,
                    transform: "translateX(-50%)",
                  }}
                  role="slider"
                  tabIndex={0}
                  aria-label="Comparaison avant/après"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={sliderPosition}
                  aria-valuetext={`${Math.round(sliderPosition)}% - Décoré`}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleMouseDown}
                  onKeyDown={handleKeyDown}
                >
                  <div className="ring-primary absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg ring-2">
                    <svg
                      className="text-primary h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </div>
                </div>

                {/* Instructions */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded bg-black/70 px-4 py-2 text-xs text-white">
                  <span className="sr-only">
                    Utilisez les flèches gauche/droite ou faites glisser pour
                    comparer
                  </span>
                  <span aria-hidden="true">
                    ← Glissez ou utilisez les flèches →
                  </span>
                </div>
              </div>
            ) : (
              <div className="border-primary relative aspect-video w-full overflow-hidden rounded-lg border-2 shadow-lg">
                <Image
                  src={selectedImage.url}
                  alt={`Hall du MPR sélectionné - ${selectedImage.filename}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, calc(100vw - 250px - 2rem)"
                  priority
                />
              </div>
            )}
          </div>
        ) : (
          <div className="border-muted-foreground/30 flex aspect-video items-center justify-center rounded-lg border-2 border-dashed md:order-2">
            <p className="text-muted-foreground p-8 text-center">
              Sélectionnez une image pour commencer
            </p>
          </div>
        )}
      </div>
      {/* Boutons d'action (uniquement si image générée et pas en cours de chargement) */}
      {generatedImage && !error && !isLoading && selectedImage && (
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={isDownloading}
            aria-label="Télécharger l'image générée"
            aria-busy={isDownloading}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Télécharger</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            aria-label="Partager l'image générée"
          >
            <Share2 className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Partager</span>
          </Button>
        </div>
      )}
    </div>
  );
}

