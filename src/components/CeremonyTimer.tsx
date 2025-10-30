'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type Snowflake = {
  initialX: number;
  targetX: number;
  duration: number;
};

const SNOWFLAKE_COUNT = 16;
const SNOWFLAKE_RANGE = 800;

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createSnowflakes(count: number): Snowflake[] {
  return Array.from({ length: count }, (_, index) => {
    const rand = mulberry32(0xabc123 + index);
    return {
      initialX: rand() * SNOWFLAKE_RANGE,
      targetX: rand() * SNOWFLAKE_RANGE,
      duration: rand() * 5 + 5,
    };
  });
}

function getTimeLeft(target: Date): TimeLeft {
  const now = new Date();
  const diffMs = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function CeremonyTimer() {
  // Ouverture officielle: 27 novembre 2025, 16:00 (heure locale)
  // new Date(2025, 10, 27, 16, 0, 0) 
  const targetDate = useMemo(() => new Date(2025, 10, 27, 16, 0, 0), []); // month is 0-indexed
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const isFinished =
    timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isFinished) return null;

  const snowflakes = useMemo(
    () => createSnowflakes(SNOWFLAKE_COUNT),
    []
  ); // deterministic values prevent hydration mismatches

  const blocks: Array<{ label: string; value: number; color: string; icon: string }> = [
    { label: 'Jours', value: timeLeft.days, color: 'text-red-600', icon: '🎄' },
    { label: 'Heures', value: timeLeft.hours, color: 'text-green-600', icon: '🎁' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'text-yellow-600', icon: '⭐' },
    { label: 'Secondes', value: timeLeft.seconds, color: 'text-blue-600', icon: '✨' },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 shadow-xl bg-transparent">
      {/* Flocons animés en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none">
        {snowflakes.map((flake, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-200/70 dark:text-blue-300/20 text-xl"
            initial={{ y: -20, x: flake.initialX }}
            animate={{ y: 600, x: flake.targetX, rotate: 360 }}
            transition={{ duration: flake.duration, repeat: Infinity, ease: 'linear' }}
          >
            ❄️
          </motion.div>
        ))}
      </div>

      {/* Timer principal */}
      <div className="relative z-10 flex flex-wrap gap-4 sm:gap-6 justify-center items-stretch">
        {blocks.map((b, idx) => (
          <motion.div
            key={b.label}
            className="bg-white/90 dark:bg-white/10 backdrop-blur rounded-xl px-5 py-4 sm:px-6 sm:py-6 shadow-lg border border-red-100/70 dark:border-white/10 min-w-[110px] text-center"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.div
              className={`text-4xl sm:text-5xl font-bold tracking-tight ${b.color}`}
              style={{ fontFamily: 'Inter, Poppins, Montserrat, ui-sans-serif, system-ui' }}
              key={`${b.label}-${b.value}`}
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              {b.value.toString().padStart(2, '0')}
            </motion.div>
            
            <div className="text-lg sm:text-xl mt-1 sm:mt-2" aria-hidden>
              {b.icon}
            </div>
          </motion.div>
        ))}

        {/* Séparateurs animés entre blocs (optionnel sur grands écrans) */}
        <div className="hidden" aria-hidden />
      </div>

      {/* Guirlande lumineuse en bas */}
      <div className="relative z-10 mt-6 flex justify-center gap-2">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: ['#ef4444', '#22c55e', '#eab308', '#3b82f6'][i % 4] }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.15, 0.85] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}
