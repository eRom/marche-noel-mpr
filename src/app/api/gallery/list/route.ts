import { list } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Vérifier le token d'authentification
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN!,
      prefix: 'gallery/',
    });

    const images = blobs
      .filter((blob) => {
        const parts = blob.pathname.split('/');
        const hasThreeParts = parts.length === 3;
        const hasFilename = parts[2] && parts[2].length > 0;
        const notEndingWithSlash = !blob.pathname.endsWith('/');
        
        return hasThreeParts && hasFilename && notEndingWithSlash;
      })
      .map((blob) => {
        const parts = blob.pathname.split('/');
        const category = parts[1];
        const filename = parts[2] || '';
        
        // Extraire le titre (nom sans extension et sans timestamp)
        const filenameWithoutExt = filename.replace(/\.[^/.]+$/, '');
        const titleSlug = filenameWithoutExt.replace(/-\d{13}$/, '');
        
        return {
          id: blob.pathname,
          url: blob.url,
          filename,
          titleSlug,
          category,
          uploadedAt: blob.uploadedAt,
        };
      })
      .sort((a, b) => {
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      });

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error('Erreur list images:', error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des images" },
      { status: 500 }
    );
  }
}

