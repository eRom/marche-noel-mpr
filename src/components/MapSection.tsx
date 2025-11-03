"use client";

import dynamic from "next/dynamic";

// Lazy load de la carte (composant lourd) - côté client uniquement
const InteractiveMap = dynamic(() => import("@/components/InteractiveMap"), {
  loading: () => (
    <div className="w-full h-[400px] md:h-[600px] bg-muted rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse text-muted-foreground">
          Chargement de la carte...
        </div>
      </div>
    </div>
  ),
  ssr: false
});

export default function MapSection() {
  return <InteractiveMap />;
}
