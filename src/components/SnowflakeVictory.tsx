"use client";

import { useSnowflakeHunt } from "@/contexts/SnowflakeHuntContext";
import { playVictorySound } from "@/lib/snowflakeSound";
import { useEffect, useState } from "react";

export default function SnowflakeVictory() {
  const { hasFoundAll } = useSnowflakeHunt();
  const [showVictory, setShowVictory] = useState(false);

  useEffect(() => {
    if (hasFoundAll) {
      setShowVictory(true);
      
      // Jouer le son de victoire
      playVictorySound();
      
      // Hide after 5 seconds
      const timer = setTimeout(() => {
        setShowVictory(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [hasFoundAll]);

  if (!showVictory) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Explosion de flocons magiques */}
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={`victory-snow-${i}`}
          className="absolute text-3xl animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${1 + Math.random()}s`,
            filter: "drop-shadow(0 0 10px rgba(147, 197, 253, 0.9))",
          }}
        >
          ❄️
        </div>
      ))}
      
      {/* Étoiles scintillantes */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={`victory-star-${i}`}
          className="absolute text-2xl animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.3}s`,
            animationDuration: `${1.5 + Math.random()}s`,
          }}
        >
          ⭐
        </div>
      ))}
      
      {/* Message de félicitation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="bg-primary/95 text-primary-foreground px-12 py-8 rounded-3xl shadow-2xl animate-bounce backdrop-blur-sm border-4 border-white/30">
          <p className="text-4xl md:text-6xl font-bold mb-4">🎉 Bravo ! 🎊</p>
          <p className="text-xl md:text-2xl">
            Tous les flocons magiques trouvés !
          </p>
          <p className="text-lg md:text-xl mt-2 text-primary-foreground/90">
            ❄️ 11/11 ❄️
          </p>
        </div>
      </div>
      
      {/* Confettis qui tombent */}
      {Array.from({ length: 50 }).map((_, i) => {
        const colors = ["🔴", "🟢", "🔵", "🟡", "🟣", "🟠"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <div
            key={`confetti-${i}`}
            className="absolute text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-50px`,
              animation: `fall ${3 + Math.random() * 2}s linear forwards`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          >
            {color}
          </div>
        );
      })}
    </div>
  );
}

