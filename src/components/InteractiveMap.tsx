"use client";

import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamic import de react-leaflet pour éviter les erreurs SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// Coordonnées de l'Hôpital Saint-Jacques, Nantes 47.197298025581624, -1.5335702623423675
const HOSPITAL_LAT = 47.197298025581624;
const HOSPITAL_LNG = -1.5335702623423675;

interface InteractiveMapProps {
  className?: string;
}

export default function InteractiveMap({ className }: InteractiveMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [shouldLoadLeaflet, setShouldLoadLeaflet] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Délai pour éviter les problèmes de chargement initial
    const timer = setTimeout(() => {
      setShouldLoadLeaflet(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Configurer les icônes de marqueur pour Next.js côté client uniquement
  useEffect(() => {
    if (!isClient) return;

    // Configurer les icônes de marqueur pour Next.js
    import("leaflet").then((L) => {
      // Fix pour les icônes Leaflet avec Next.js
      const iconPrototype = L.Icon.Default.prototype as unknown as Record<
        string,
        unknown
      >;
      if (iconPrototype._getIconUrl) {
        delete iconPrototype._getIconUrl;
      }
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });
    });
  }, [isClient]);

  // Alternative textuelle pour l'accessibilité
  const addressText = (
    <div className="text-muted-foreground bg-card border-border space-y-2 rounded-lg border p-4 text-sm">
      <h3 className="text-foreground mb-2 font-semibold">
        Hôpital Saint-Jacques – CHU de Nantes
      </h3>
      <p>85 Rue Saint-Jacques</p>
      <p>44093 Nantes Cedex 1</p>
      <p className="mt-4 text-xs">
        <strong>Coordonnées GPS :</strong> {HOSPITAL_LAT}, {HOSPITAL_LNG}
      </p>
    </div>
  );

  if (!isClient || !shouldLoadLeaflet) {
    return (
      <div className={className}>
        <div className="bg-muted flex h-[400px] w-full items-center justify-center rounded-lg md:h-[600px]">
          <div className="text-center">
            <div className="text-muted-foreground animate-pulse">
              Chargement de la carte...
            </div>
          </div>
        </div>
        {/* Alternative textuelle même pendant le chargement */}
        <div className="mt-4">{addressText}</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        className="border-border h-[400px] w-full overflow-hidden rounded-lg border md:h-[600px]"
        aria-label="Carte interactive de localisation de l'Hôpital Saint-Jacques"
      >
        <MapContainer
          center={[HOSPITAL_LAT, HOSPITAL_LNG]}
          zoom={15}
          scrollWheelZoom={true}
          className="h-full w-full"
          attributionControl={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[HOSPITAL_LAT, HOSPITAL_LNG]}>
            <Popup>
              <div className="text-sm">
                <h3 className="mb-2 font-semibold">Hôpital Saint-Jacques</h3>
                <p className="mb-1">85 Rue Saint-Jacques</p>
                <p className="mb-1">44093 Nantes Cedex 1</p>
                <p className="text-muted-foreground mt-2 text-xs">
                  Marché de Noël du MPR
                </p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      {/* Alternative textuelle pour l'accessibilité */}
      <div className="mt-4">{addressText}</div>
    </div>
  );
}
