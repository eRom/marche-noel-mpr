"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  targetX: number;
}

export default function SnowfallEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Générer des flocons de neige
    const flakes: Snowflake[] = [];
    const flakeCount = 50; // Nombre de flocons

    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100, // Position horizontale aléatoire (%)
        size: Math.random() * 3 + 2, // Taille entre 2 et 5px
        duration: Math.random() * 10 + 15, // Durée entre 15 et 25s
        delay: Math.random() * 5, // Délai initial aléatoire
        targetX: (Math.random() - 0.5) * 100, // Dérive horizontale
      });
    }

    setSnowflakes(flakes);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute rounded-full bg-white opacity-70"
          style={{
            left: `${flake.left}%`,
            top: '-5%',
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, flake.targetX, flake.targetX * 0.5, flake.targetX],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

