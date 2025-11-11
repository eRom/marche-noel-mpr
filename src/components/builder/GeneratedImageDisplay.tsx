"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Download, Share2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface GeneratedImageDisplayProps {
  originalImage: string;
  generatedImage?: string | null;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

export default function GeneratedImageDisplay({
  originalImage,
  generatedImage,
  isLoading = false,
  error = null,
  className,
}: GeneratedImageDisplayProps) {
  const [isDownloading, setIsDownloading] = useState(false);

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
        // Fallback: copier le lien
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Lien copié dans le presse-papiers");
      }
    } catch (err) {
      console.error("Erreur partage:", err);
      toast.error("Erreur lors du partage");
    }
  };

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="flex flex-col items-center justify-center gap-4 py-8">
          <AlertCircle className="h-12 w-12 text-destructive" aria-hidden="true" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-destructive">
              Erreur de génération
            </h3>
            <p className="mt-2 text-sm text-muted-foreground" role="alert">
              {error}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!generatedImage && !isLoading) {
    return (
      <Card className={className}>
        <CardContent className="py-8 text-center text-muted-foreground">
          <p>
            Sélectionnez un style ou utilisez le chat pour générer une
            décoration
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Résultat généré</h3>
          {generatedImage && (
            <div className="flex gap-2">
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

        {isLoading ? (
          <div className="flex aspect-video w-full items-center justify-center rounded-lg border bg-muted">
            <div className="text-center">
              <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">
                Génération en cours...
              </p>
            </div>
          </div>
        ) : generatedImage ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
            <Image
              src={generatedImage}
              alt="Hall du MPR décoré par IA"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        ) : (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
            <Image
              src={originalImage}
              alt="Hall du MPR original"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

