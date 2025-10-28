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
        
        // Extraire le titre depuis le filename
        let title = 'Photo';
        const filenameWithoutExt = filenameWithExt.replace(/\.[^/.]+$/, '');
        const filenameParts = filenameWithoutExt.split('-');
        
        // Nouveau format: slug-timestamp-base64Title
        // Ancien format: slug-timestamp
        if (filenameParts.length >= 3) {
          const lastPart = filenameParts[filenameParts.length - 1];
          const secondLastPart = filenameParts[filenameParts.length - 2];
          
          // Vérifier si c'est le nouveau format (dernière partie = base64)
          // et avant-dernière partie = timestamp (13 chiffres)
          if (/^\d{13}$/.test(secondLastPart)) {
            try {
              // Décoder le titre depuis base64url
              title = Buffer.from(lastPart, 'base64url').toString('utf-8');
            } catch {
              // Si le décodage échoue, c'est l'ancien format
              // Retirer le timestamp et formater depuis le slug
              const titleSlug = filenameWithoutExt.replace(/-\d{13}$/, '');
              title = titleSlug
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ') || 'Photo';
            }
          } else {
            // Ancien format : formater depuis le slug
            const titleSlug = filenameWithoutExt.replace(/-\d{13}$/, '');
            title = titleSlug
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ') || 'Photo';
          }
        }

        return {
          id: blob.pathname,
          url: blob.url,
          title: title,
          category: category || 'ambiance',
          date: new Date(blob.uploadedAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          alt: `Photo ${category} - Marché de Noël MPR`,
        };
      });

    // Mélanger les images de façon aléatoire
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }

    return images;
  } catch (error) {
    console.error('Erreur récupération images:', error);
    return [];
  }
}


