"use client";

import { useSnowflakeHunt } from "@/contexts/SnowflakeHuntContext";

export default function SnowflakeCounter() {
  const { foundSnowflakes, totalSnowflakes } = useSnowflakeHunt();

  return (
    <div 
      className="hidden md:flex items-center gap-2 text-sm text-muted-foreground mb-4"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="text-2xl" aria-hidden="true">❄️</span>
      <span>
        <strong className="text-foreground">{foundSnowflakes.size}</strong>/{totalSnowflakes} flocons trouvés
      </span>
    </div>
  );
}

