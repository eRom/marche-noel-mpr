"use client";

import { useSnowflakeHunt } from "@/contexts/SnowflakeHuntContext";
import { playSnowflakeCollectSound } from "@/lib/snowflakeSound";
import { useEffect, useMemo, useState } from "react";

interface MagicSnowflakeProps {
  id: number;
  page: string;
}

// Simple pseudo-random number generator with seed
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function MagicSnowflake({ id, page }: MagicSnowflakeProps) {
  const { foundSnowflakes, collectSnowflake } = useSnowflakeHunt();
  const [isCollecting, setIsCollecting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isFound = foundSnowflakes.has(id);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Generate consistent random position for this snowflake
  const position = useMemo(() => {
    const seed = page.charCodeAt(0) * 1000 + id;
    const left = 10 + seededRandom(seed) * 80; // 10-90%
    const top = 20 + seededRandom(seed + 1) * 60; // 20-80%
    return { left: `${left}%`, top: `${top}%` };
  }, [id, page]);

  const handleClick = () => {
    if (isFound || isCollecting) return;

    setIsCollecting(true);
    collectSnowflake(id);

    // Jouer le son
    playSnowflakeCollectSound();

    // Animation duration before removal
    setTimeout(() => {
      setIsCollecting(false);
    }, 1000);
  };

  // Don't render if already found or on mobile
  if (isFound || isMobile) return null;

  return (
    <div
      className={`magic-snowflake ${isCollecting ? "collecting" : ""}`}
      style={{
        position: "fixed",
        left: position.left,
        top: position.top,
        zIndex: 1500,
        cursor: "pointer",
        fontSize: "2rem",
        filter: "drop-shadow(0 0 10px rgba(147, 197, 253, 0.8))",
        animation: "float-magic 3s ease-in-out infinite",
        transition: "all 0.3s ease",
      }}
      onClick={handleClick}
      aria-hidden="true"
    >
      ❄️
    </div>
  );
}
