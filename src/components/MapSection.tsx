"use client";

import dynamic from "next/dynamic";

// Lazy load de la carte (composant lourd) - côté client uniquement
const InteractiveMap = dynamic(() => import("@/components/InteractiveMap"), {
  loading: () => (
    <div className="bg-muted flex h-[400px] w-full items-center justify-center rounded-lg md:h-[600px]">
      <div className="text-center">
        <div className="text-muted-foreground animate-pulse">
          Chargement de la carte...
        </div>
      </div>
    </div>
  ),
  ssr: false,
});

export default function MapSection() {
  return <InteractiveMap />;
}
