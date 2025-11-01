"use client";

import { motion } from 'framer-motion';

export default function ChristmasLights() {
  // Générer des lumières avec des couleurs de Noël
  const colors = ['#dc2626', '#16a34a', '#eab308', '#3b82f6', '#dc2626', '#16a34a'];
  const lights = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    delay: i * 0.1,
  }));

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none overflow-hidden h-8" aria-hidden="true">
      {/* Fil de guirlande */}
      <svg
        className="absolute top-0 left-0 w-full h-8"
        preserveAspectRatio="none"
        viewBox="0 0 1200 50"
      >
        <path
          d="M 0 25 Q 60 15, 120 25 T 240 25 T 360 25 T 480 25 T 600 25 T 720 25 T 840 25 T 960 25 T 1080 25 T 1200 25"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-border opacity-30"
        />
      </svg>

      {/* Lumières */}
      <div className="flex justify-between items-start px-4 pt-1">
        {lights.map((light) => (
          <motion.div
            key={light.id}
            className="relative"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 2,
              delay: light.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Bulbe de lumière */}
            <div
              className="w-3 h-4 rounded-b-full relative"
              style={{
                backgroundColor: light.color,
                boxShadow: `0 0 10px ${light.color}, 0 0 20px ${light.color}`,
              }}
            >
              {/* Reflet */}
              <div
                className="absolute top-0 left-1/2 w-1 h-2 bg-white/40 rounded-full transform -translate-x-1/2"
              />
            </div>

            {/* Douille */}
            <div className="w-2 h-1 mx-auto bg-gray-600 rounded-t-sm" />

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full blur-sm"
              style={{
                backgroundColor: light.color,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2,
                delay: light.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

