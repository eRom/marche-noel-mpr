import type { GalleryImage } from '@/types/gallery';
import { list } from '@vercel/blob';

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN!,
      prefix: 'gallery/',
    });

    const images: GalleryImage[] = blobs
      .filter((blob) => {
        // Filtrer uniquement les fichiers valides (pas les dossiers vides)
        const hasValidPath = blob.pathname.startsWith('gallery/');
        const hasValidUrl = blob.url && blob.url.startsWith('https://');
        
        // Vérifier qu'il y a bien un nom de fichier (pas juste un dossier)
        const parts = blob.pathname.split('/');
        const hasThreeParts = parts.length === 3; // gallery/category/filename
        const hasFilename = parts[2] && parts[2].length > 0;
        const notEndingWithSlash = !blob.pathname.endsWith('/');
        
        return hasValidPath && hasValidUrl && hasThreeParts && hasFilename && notEndingWithSlash;
      })
      .map((blob) => {
        // Parser metadata depuis pathname : gallery/category/filename.ext
        const parts = blob.pathname.split('/');
        const category = parts[1] as GalleryImage['category'];
        const filenameWithExt = parts[2] || '';
        
        // Extraire le nom sans extension : "marche-de-noel-1699876543210.webp" → "marche-de-noel-1699876543210"
        const filenameWithoutExt = filenameWithExt.replace(/\.[^/.]+$/, '');
        
        // Retirer le timestamp (13 chiffres) : "marche-de-noel-1699876543210" → "marche-de-noel"
        const titleSlug = filenameWithoutExt.replace(/-\d{13}$/, '');
        
        // Formatter le titre : "marche-de-noel" → "Marche De Noel"
        const formattedTitle = titleSlug
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ') || 'Photo';

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
        // Trier par ID (pathname) pour un ordre cohérent
        return a.id.localeCompare(b.id);
      });

    return images;
  } catch (error) {
    console.error('Erreur récupération images:', error);
    return [];
  }
}


