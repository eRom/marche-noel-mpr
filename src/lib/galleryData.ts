import type { GalleryImage } from '@/types/gallery';
import { list } from '@vercel/blob';

// Images locales pour le développement (fallback)
const localImages: GalleryImage[] = [
  {
    id: 'local-mpr-001',
    url: '/maquette-image.webp',
    title: 'MPR 001',
    category: 'MPR',
    date: new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    alt: 'Photo MPR - Marché de Noël MPR',
  },
  {
    id: 'local-hero',
    url: '/hero-placeholder.webp',
    title: 'Ambiance festive',
    category: 'ambiance',
    date: new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    alt: 'Photo ambiance - Marché de Noël MPR',
  },
];

export async function getGalleryImages(): Promise<GalleryImage[]> {
  // En développement sans token, utiliser les images locales
  if (
    process.env.NODE_ENV === 'development' &&
    !process.env.BLOB_READ_WRITE_TOKEN
  ) {
    console.log('Mode développement : utilisation des images locales');
    return localImages;
  }

  try {
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN!,
      prefix: 'gallery/',
    });

    const images: GalleryImage[] = blobs
      .filter((blob) => blob.pathname.startsWith('gallery/'))
      .map((blob) => {
        // Parser metadata depuis pathname : gallery/stands/photo-001.jpg
        const parts = blob.pathname.split('/');
        const category = parts[1] as GalleryImage['category'];
        const filename = parts[2]?.replace(/\.[^/.]+$/, '') || 'Photo';

        // Formatter le titre : "photo-001" → "Photo 001"
        const formattedTitle = filename
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());

        return {
          id: blob.pathname,
          url: blob.url,
          title: formattedTitle,
          category: category || 'ambiance',
          date: new Date(blob.uploadedAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          alt: `Photo ${category} - Marché de Noël MPR`,
        };
      })
      .sort((a, b) => {
        // Trier par date de upload (plus récent en premier)
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });

    // Si aucune image sur Vercel Blob, utiliser les images locales en dev
    if (images.length === 0 && process.env.NODE_ENV === 'development') {
      console.log('Aucune image sur Vercel Blob : utilisation des images locales');
      return localImages;
    }

    return images;
  } catch (error) {
    console.error('Erreur récupération images:', error);

    // En développement, retourner les images locales en cas d'erreur
    if (process.env.NODE_ENV === 'development') {
      console.log('Erreur Vercel Blob : utilisation des images locales');
      return localImages;
    }

    return [];
  }
}


