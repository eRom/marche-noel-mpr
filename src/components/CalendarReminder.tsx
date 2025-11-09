"use client";

import { Button } from "@/components/ui/button";
import { downloadICS } from "@/lib/calendar";
import { track } from "@vercel/analytics";
import { Calendar } from "lucide-react";

interface CalendarReminderProps {
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export default function CalendarReminder({
  variant = "default",
  size = "default",
  className = "",
}: CalendarReminderProps) {
  const handleDownloadICS = () => {
    try {
      downloadICS();
      track("calendar_reminder_download", { type: "ics" });

      // Toast notification si disponible
      if (typeof window !== "undefined" && "toast" in window) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).toast?.success?.("✅ Calendrier téléchargé !", {
          description: "Les 4 dates ont été ajoutées à votre calendrier",
        });
      }
    } catch (error) {
      console.error("Erreur lors du téléchargement du calendrier:", error);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleDownloadICS}
      className={`cursor-pointer gap-2 transition-transform hover:scale-105 ${className}`}
      aria-label="Télécharger les dates du marché de Noël dans votre calendrier"
    >
      <Calendar className="h-5 w-5" aria-hidden="true" />
      <span>Me rappeler le jour de l&apos;ouverture</span>
    </Button>
  );
}
