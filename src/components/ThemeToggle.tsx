"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-2 rounded-md animate-pulse bg-muted" aria-hidden="true">
        <div className="h-5 w-5 rounded bg-muted-foreground/20" />
      </div>
    );
  }

  const isDark = theme === "dark";
  const iconColor = isDark ? "text-noel-gold" : "text-noel-gold-dark";
  const hoverBg = isDark ? "hover:bg-noel-snow-dark" : "hover:bg-noel-snow";
  const buttonBg = isDark ? "bg-noel-snow" : "bg-noel-snow-light";
  
  return;
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`p-2 rounded-lg transition-all duration-300 ${hoverBg} ${buttonBg} border border-border shadow-sm hover:shadow-md`}
      aria-label={`Basculer vers le thème ${isDark ? "clair" : "sombre"}`}
      title={`Basculer vers le thème ${isDark ? "clair" : "sombre"}`}
    >
      <div className="relative w-5 h-5">
        {isDark ? (
          <Sun
            className={`absolute inset-0 h-5 w-5 ${iconColor} transition-all duration-300`}
            aria-hidden="true"
          />
        ) : (
          <Moon
            className={`absolute inset-0 h-5 w-5 ${iconColor} transition-all duration-300`}
            aria-hidden="true"
          />
        )}
      </div>
      <span className="sr-only">
        {isDark ? "Passer au thème clair" : "Passer au thème sombre"}
      </span>
    </button>
  );
}
