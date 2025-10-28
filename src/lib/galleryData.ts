import type { GalleryImage } from '@/types/gallery';
import { list } from '@vercel/blob';

export async function getGalleryImages(): Promise<GalleryImage[]> {
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

    return images;
  } catch (error) {
    console.error('Erreur récupération images:', error);
    return [];
  }
}


