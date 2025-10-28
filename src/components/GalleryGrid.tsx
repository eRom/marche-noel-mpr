'use client';

import type { GalleryImage } from '@/types/gallery';
import Image from 'next/image';
import { useState } from 'react';
import { Lightbox } from './Lightbox';

interface GalleryGridProps {
  images: GalleryImage[];
}

// Badge couleur par catégorie
const categoryColors: Record<GalleryImage['category'], string> = {
  stands: 'bg-red-600',
  animations: 'bg-green-600',
  visiteurs: 'bg-blue-600',
  ambiance: 'bg-purple-600',
  MPR: 'bg-yellow-600',
  IA: 'bg-pink-600',
};

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (index: number) => {
    if (index >= 0 && index < images.length) {
      setSelectedImage(images[index]);
      setCurrentIndex(index);
    }
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">Aucune photo disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {images.map((image, index) => (
          <div key={image.id} className="break-inside-avoid">
            <button
              onClick={() => openLightbox(image, index)}
              className="relative group w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label={`Voir ${image.title} en plein écran`}
              type="button"
            >
              <Image
                src={image.url}
                alt={image.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                quality={85}
                loading="lazy"
              />

              {/* Badge catégorie */}
              <span
                className={`absolute top-3 right-3 ${categoryColors[image.category]} text-white text-xs px-3 py-1 rounded-full capitalize shadow-lg`}
              >
                {image.category}
              </span>

              {/* Overlay info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-sm font-medium">{image.title}</p>
                  <p className="text-xs opacity-80">{image.date}</p>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={closeLightbox}
          images={images}
          currentIndex={currentIndex}
          onNavigate={navigateImage}
        />
      )}
    </>
  );
}

