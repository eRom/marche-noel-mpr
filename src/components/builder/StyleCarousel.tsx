"use client";

import { Button } from "@/components/ui/button";
import { DECORATION_STYLES } from "@/lib/builder-styles";
import { cn } from "@/lib/utils";
import type { DecorationStyle } from "@/types/builder";
import { motion } from "framer-motion";
import { useState } from "react";

interface StyleCarouselProps {
  onStyleSelect: (style: DecorationStyle) => void;
  selectedStyle?: DecorationStyle | null;
  isLoading?: boolean;
}

export default function StyleCarousel({
  onStyleSelect,
  selectedStyle,
  isLoading = false,
}: StyleCarouselProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleKeyDown = (
    event: React.KeyboardEvent,
    style: DecorationStyle,
    index: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onStyleSelect(style);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = (index + 1) % DECORATION_STYLES.length;
      setFocusedIndex(nextIndex);
      // Auto-select on arrow navigation
      onStyleSelect(DECORATION_STYLES[nextIndex]);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      const prevIndex =
        (index - 1 + DECORATION_STYLES.length) % DECORATION_STYLES.length;
      setFocusedIndex(prevIndex);
      onStyleSelect(DECORATION_STYLES[prevIndex]);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Choisissez un style de décoration
      </h2>
      <div
        className="flex justify-between gap-3 pb-4"
        role="tablist"
        aria-label="Carrousel de styles de décoration"
      >
        {DECORATION_STYLES.map((style, index) => {
          const isSelected = selectedStyle === style;
          return (
            <motion.div
              key={style}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-1"
            >
              <Button
                variant={isSelected ? "default" : "outline"}
                size="lg"
                className={cn(
                  "w-full whitespace-nowrap transition-all duration-200",
                  isSelected && "shadow-lg",
                  focusedIndex === index && "ring-primary ring-2 ring-offset-2"
                )}
                aria-label={`Appliquer le style ${style}`}
                aria-pressed={isSelected}
                aria-busy={isLoading && isSelected}
                disabled={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onStyleSelect(style);
                }}
                onKeyDown={(e) => handleKeyDown(e, style, index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                onMouseDown={(e) => {
                  // Empêcher le focus automatique au clic pour éviter le scroll
                  e.preventDefault();
                }}
              >
                {style}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
