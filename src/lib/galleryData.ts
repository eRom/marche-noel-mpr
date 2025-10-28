import type { GalleryImage } from '@/types/gallery';
import { list } from '@vercel/blob';

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN!,
      prefix: 'gallery/',
    });

    // Logging pour debug
    console.log(`📸 Nombre de blobs récupérés: ${blobs.length}`);
    console.log('📸 Pathnames:', blobs.map(b => b.pathname));

    const images: GalleryImage[] = blobs
      .filter((blob) => {
        // Filtrer les blobs valides
        const hasValidPath = blob.pathname.startsWith('gallery/');
        const hasValidUrl = blob.url && blob.url.startsWith('https://');
        
        // Vérifier qu'il y a bien un nom de fichier (pas juste un dossier)
        const parts = blob.pathname.split('/');
        const hasThreeParts = parts.length === 3; // gallery/category/filename
        const hasFilename = parts[2] && parts[2].length > 0 && !parts[2].endsWith('/');
        const notEndingWithSlash = !blob.pathname.endsWith('/');
        
        const isValid = hasValidPath && hasValidUrl && hasThreeParts && hasFilename && notEndingWithSlash;
        
        if (!isValid) {
          console.log(`❌ Blob invalide filtré: ${blob.pathname}`);
        }
        
        return isValid;
      })
      .map((blob) => {
        // Parser metadata depuis pathname : gallery/category/filename.ext
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
        // Trier par ID (pathname) pour un ordre cohérent
        return a.id.localeCompare(b.id);
      });

    console.log(`📸 Nombre d'images finales après filtrage: ${images.length}`);
    console.log('📸 Images retenues:', images.map(i => ({ id: i.id, url: i.url })));
    
    return images;
  } catch (error) {
    console.error('Erreur récupération images:', error);
    return [];
  }
}


