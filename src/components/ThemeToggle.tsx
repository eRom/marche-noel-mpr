"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="bg-muted h-9 w-9 animate-pulse rounded-full" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-muted hover:bg-muted/80 focus:ring-primary flex h-9 w-9 items-center justify-center rounded-full transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
      aria-label={
        theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"
      }
      aria-pressed={theme === "dark" ? "true" : "false"}
    >
      {theme === "dark" ? (
        <Sun className="text-foreground h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="text-foreground h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
