"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="bg-muted h-9 w-9 animate-pulse rounded-full" />;
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggle}
      className="bg-muted hover:bg-muted/80 focus:ring-primary flex h-9 w-9 items-center justify-center rounded-full transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      aria-pressed={isDark ? "true" : "false"}
    >
      {isDark ? (
        <Sun className="text-foreground h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="text-foreground h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
