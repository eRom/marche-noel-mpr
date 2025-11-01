"use client";

import { Button } from "@/components/ui/button";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * CinematicVideo - Composant pour la vidéo testimoniale
 * Vidéo pausée par défaut avec contrôles accessibles
 */
export default function CinematicVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>("");

  // Détection de la taille d'écran pour choisir la bonne vidéo
  useEffect(() => {
    const updateVideoSrc = () => {
      const isMobile = window.innerWidth < 640;
      setVideoSrc(isMobile ? "/cinematic-portrait.mp4" : "/cinematic.mp4");
    };

    // Initialisation
    updateVideoSrc();

    // Écoute des changements de taille
    window.addEventListener("resize", updateVideoSrc);
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      // Revenir au début de la vidéo en utilisant videoRef.current
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, [videoSrc]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className={`relative overflow-hidden rounded-lg bg-foreground/10 shadow-2xl ${videoSrc.includes('portrait') ? 'aspect-[9/16]' : 'aspect-video'}`}>
        {videoSrc && (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted={isMuted}
            preload="metadata"
            playsInline
            aria-label="Vidéo testimoniale du Marché de Noël MPR"
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
            <track 
              kind="captions" 
              src="/cinematic-subtitles.vtt" 
              srcLang="fr" 
              label="Français"
            />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        )}

        {/* Contrôles */}
        <div className="absolute inset-0 flex items-center justify-center md:items-center" style={{ paddingTop: 'clamp(0px, 8vh, 100px)' }}>
          {/* Play/Pause Button - Center on desktop, lower on mobile */}
          {!isPlaying && (
            <Button
              onClick={togglePlay}
              size="lg"
              className="bg-primary/90 hover:bg-primary rounded-full shadow-2xl text-primary-foreground border-2 border-white/20 px-8 py-6 backdrop-blur-sm md:mt-0 mt-12"
              aria-label="Lire la vidéo"
            >
              <Play className="h-8 w-8 mr-2" aria-hidden="true" />
              <span className="font-semibold">Lire la vidéo</span>
            </Button>
          )}
        </div>

        {/* Sound Toggle & Pause - Top Right */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            onClick={toggleMute}
            variant="secondary"
            size="icon"
            className="bg-black/50 hover:bg-black/70 rounded-full shadow-lg text-white backdrop-blur-sm"
            aria-label={isMuted ? "Activer le son" : "Désactiver le son"}
            aria-live="polite"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Volume2 className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>

          {isPlaying && (
            <Button
              onClick={togglePlay}
              variant="secondary"
              size="icon"
              className="bg-black/50 hover:bg-black/70 rounded-full shadow-lg text-white backdrop-blur-sm"
              aria-label="Mettre en pause"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6"
                />
              </svg>
            </Button>
          )}
        </div>

        {/* Gradient overlay for better button visibility */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
        )}
      </div>
    </div>
  );
}

