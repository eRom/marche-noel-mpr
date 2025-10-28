import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

// Taille maximale : 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Types MIME autorisés
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// Fonction pour créer un slug URL-safe
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/[^a-z0-9\s-]/g, '')     // Supprimer caractères spéciaux
    .replace(/\s+/g, '-')              // Espaces → tirets
    .replace(/-+/g, '-')               // Multiples tirets → un seul
    .replace(/^-+|-+$/g, '')           // Supprimer tirets début/fin
    .substring(0, 50);                 // Max 50 chars
}

export async function POST(request: NextRequest) {
  try {
    // Vérifier le token d'authentification simple
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const customTitle = formData.get('title') as string | null;

    // Validation du fichier
    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    // Validation du titre (obligatoire)
    if (!customTitle || customTitle.trim() === '') {
      return NextResponse.json(
        { error: 'Le titre est obligatoire' },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non autorisé. Utilisez JPG, PNG ou WebP.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Fichier trop volumineux. Maximum 10MB.' },
        { status: 400 }
      );
    }

    // Validation de la catégorie
    const validCategories = ['stands', 'animations', 'visiteurs', 'ambiance', 'MPR', 'IA'];
    if (!category || !validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Catégorie invalide' },
        { status: 400 }
      );
    }

    // Créer un slug URL-safe à partir du titre
    const timestamp = Date.now();
    const slug = createSlug(customTitle);
    
    if (!slug || slug.length === 0) {
      return NextResponse.json(
        { error: 'Le titre ne contient aucun caractère valide' },
        { status: 400 }
      );
    }

    const extension = file.name.split('.').pop() || 'jpg';
    const filename = `${slug}-${timestamp}.${extension}`;

    // Structure : gallery/category/filename
    const pathname = `gallery/${category}/${filename}`;

    // Upload vers Vercel Blob
    const blob = await put(pathname, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      pathname: blob.pathname,
      message: 'Image uploadée avec succès',
    });
  } catch (error) {
    console.error('Erreur upload:', error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload" },
      { status: 500 }
    );
  }
}

