"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "stagger";
  delay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

export default function AnimatedSection({
  children,
  className,
  animation = "fadeInUp",
  delay = 0,
  staggerChildren = false,
  staggerDelay = 0.1,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  // Utiliser Framer Motion pour les stagger animations
  if (staggerChildren) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  const animationClasses = {
    fadeInUp: "animate-fade-in-up",
    fadeInLeft: "animate-fade-in-left",
    fadeInRight: "animate-fade-in-right",
    stagger: "",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0",
        isVisible && animationClasses[animation],
        className
      )}
    >
      {children}
    </div>
  );
}

// Composant pour les enfants stagger
export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
