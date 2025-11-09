"use client";

import { useEffect, useState } from "react";
import { playKonamiSound } from "@/lib/snowflakeSound";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "Enter",
];

const COOLDOWN_DURATION = 30000; // 30 secondes en millisecondes

export default function KonamiCode() {
  const [, setKeys] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);
  const [lastActivation, setLastActivation] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Verifier si on est en cooldown
      const now = Date.now();
      if (now - lastActivation < COOLDOWN_DURATION) {
        return; // Ignorer les touches pendant le cooldown
      }

      // Ajouter la touche pressee
      setKeys((prev) => {
        const newKeys = [...prev, e.key];

        // Garder seulement les dernieres touches (longueur de la sequence)
        if (newKeys.length > KONAMI_SEQUENCE.length) {
          newKeys.shift();
        }

        // Verifier si la sequence est complete
        if (newKeys.join(",") === KONAMI_SEQUENCE.join(",")) {
          setActivated(true);
          setLastActivation(Date.now());

          // 🎵 Jouer le son "Ho Ho Ho !"
          playKonamiSound();

          // Desactiver l'animation apres 5 secondes
          setTimeout(() => setActivated(false), 5000);

          // Reset les touches
          return [];
        }

        return newKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lastActivation]);

  if (!activated) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Explosion de flocons */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={`snow-${i}`}
          className="absolute animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${1 + Math.random()}s`,
          }}
        >
          ❄️
        </div>
      ))}

      {/* Emojis de Noel qui tombent */}
      {Array.from({ length: 30 }).map((_, i) => {
        const emojis = ["🎁", "🎄", "⭐", "🎅", "🔔", "🕯️"];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];

        return (
          <div
            key={`emoji-${i}`}
            className="absolute animate-bounce text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-50px`,
              animation: `fall ${3 + Math.random() * 2}s linear forwards`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          >
            {emoji}
          </div>
        );
      })}

      {/* Message de felicitation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="bg-primary/90 text-primary-foreground animate-bounce rounded-2xl border-4 border-white/20 px-8 py-6 shadow-2xl backdrop-blur-sm">
          <p className="mb-2 text-3xl font-bold md:text-5xl">
            🎄 Ho Ho Ho ! 🎅
          </p>
          <p className="text-lg md:text-xl">
            Joyeux Noël ! Vous avez trouvé l&apos;Easter Egg !
          </p>
        </div>
      </div>
    </div>
  );
}
