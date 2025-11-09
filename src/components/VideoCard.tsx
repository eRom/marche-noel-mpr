"use client";

import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { useRef, useState } from "react";

interface VideoCardProps {
  src: string;
  title: string;
  description: string;
}

export function VideoCard({ src, title, description }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = src;
    link.download = src.split("/").pop() || "video.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    const shareText = `${title} - ${description}`;
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    // Utiliser Web Share API si disponible
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // L'utilisateur a annulé ou le partage a échoué, on continue avec le fallback
      }
    }

    // Fallback : copier le lien dans le presse-papier
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback si clipboard API n'est pas disponible
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Échec de la copie:", err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="bg-card border-border flex h-full flex-col overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md">
      <div className="bg-foreground/10 relative aspect-video max-h-[300px]">
        <video
          ref={videoRef}
          src={src}
          muted
          controls
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          aria-label={`${title} - ${description}`}
        >
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
      </div>

      <div className="flex flex-grow flex-col gap-3 p-4">
        <div className="flex-grow">
          <h3 className="text-card-foreground mb-1 font-semibold">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>

        <div className="mt-2 flex gap-2">
          <Button
            onClick={handleDownload}
            variant="outline"
            size="sm"
            className="flex-1"
            aria-label={`Télécharger ${title}`}
          >
            <Download className="mr-2 h-4 w-4" aria-hidden="true" />
            Télécharger
          </Button>

          <Button
            onClick={handleShare}
            variant="outline"
            size="sm"
            className="flex-1"
            aria-label={`Partager ${title}`}
          >
            <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
            {isCopied ? "Copié !" : "Partager"}
          </Button>
        </div>
      </div>
    </div>
  );
}
