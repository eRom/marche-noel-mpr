"use client";

import { Button } from "@/components/ui/button";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnded = () => {
      setIsVideoEnded(true);
    };

    video.addEventListener('ended', handleVideoEnded);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayedOnce) {
            video
              .play()
              .then(() => {
                setHasPlayedOnce(true);
              })
              .catch((error) => {
                // Autoplay failed, user interaction required
                console.debug("Autoplay prevented:", error);
              });
          } else if (!entry.isIntersecting && !video.paused) {
            video.pause();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(video);

    return () => {
      video.removeEventListener('ended', handleVideoEnded);
      observer.disconnect();
    };
  }, [hasPlayedOnce]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const replayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsVideoEnded(false);
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-foreground/10">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted={isMuted}
          preload="metadata"
          playsInline
          aria-label="Animation ludique du marché de Noël MPR avec musique de fond"
        >
          <source src="/video.mp4" type="video/mp4" />
          <track kind="captions" srcLang="fr" label="Sous-titres" default={false} />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>

        {/* Sound Toggle Button */}
        <div className="absolute top-4 right-4 z-10">
          <Button
            onClick={toggleMute}
            variant="secondary"
            size="icon"
            className="bg-transparent hover:bg-white/10 rounded-full shadow-lg text-white"
            aria-label={isMuted ? "Activer le son" : "Désactiver le son"}
            aria-live="polite"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Volume2 className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>

        {/* Replay Button - Shows when video has ended */}
        {isVideoEnded && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 backdrop-blur-sm">
            <Button
              onClick={replayVideo}
              size="lg"
              className="bg-primary/90 hover:bg-primary rounded-full shadow-lg text-foreground border border-foreground/10 px-6"
              aria-label="Relancer la vidéo"
            >
              <Play className="h-6 w-6 mr-2" aria-hidden="true" />
              Revoir
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

