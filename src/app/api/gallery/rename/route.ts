import { del, list, put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

// Fonction pour créer un slug URL-safe
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

export async function POST(request: NextRequest) {
  try {
    // Vérifier le token d'authentification
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { pathname, newTitle } = await request.json();

    if (!pathname || typeof pathname !== 'string') {
      return NextResponse.json(
        { error: 'Pathname requis' },
        { status: 400 }
      );
    }

    if (!newTitle || typeof newTitle !== 'string' || newTitle.trim() === '') {
      return NextResponse.json(
        { error: 'Nouveau titre requis' },
        { status: 400 }
      );
    }

    // Récupérer le blob actuel
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN!,
      limit: 1000,
    });

    const currentBlob = blobs.find((b) => b.pathname === pathname);

    if (!currentBlob) {
      return NextResponse.json(
        { error: 'Image introuvable' },
        { status: 404 }
      );
    }

    // Télécharger le blob actuel
    const blobResponse = await fetch(currentBlob.url);
    const blobData = await blobResponse.blob();

    // Créer un nouveau slug à partir du nouveau titre
    const timestamp = Date.now();
    const slug = createSlug(newTitle);
    
    if (!slug || slug.length === 0) {
      return NextResponse.json(
        { error: 'Le titre ne contient aucun caractère valide' },
        { status: 400 }
      );
    }

    // Extraire la catégorie et l'extension du pathname actuel
    const parts = pathname.split('/');
    const category = parts[1];
    const oldFilename = parts[2] || '';
    const extension = oldFilename.split('.').pop() || 'jpg';

    // Créer le nouveau pathname
    const newFilename = `${slug}-${timestamp}.${extension}`;
    const newPathname = `gallery/${category}/${newFilename}`;

    // Créer le nouveau blob
    const file = new File([blobData], newFilename, { type: blobData.type });
    const newBlob = await put(newPathname, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });

    // Supprimer l'ancien blob
    await del(pathname, {
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });

    return NextResponse.json({
      success: true,
      message: 'Image renommée avec succès',
      newPathname: newBlob.pathname,
      newUrl: newBlob.url,
    });
  } catch (error) {
    console.error('Erreur rename:', error);
    return NextResponse.json(
      { error: "Erreur lors du renommage" },
      { status: 500 }
    );
  }
}

