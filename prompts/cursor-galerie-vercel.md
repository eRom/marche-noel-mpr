# Prompt Cursor - Page Galerie Photos Marché de Noël du MPR (Vercel Blob)

## Contexte
Je veux ajouter une page `/galerie` à mon site Next.js du Marché de Noël du MPR hébergé sur Vercel.
Stack technique : Next.js 15, Tailwind CSS, TypeScript, Vercel.

**STOCKAGE IMAGES : Vercel Blob Storage** (< 50 images)

## Objectif
Créer une page galerie photo simple et efficace pour afficher les photos du marché avec :
- Grille responsive (masonry/Pinterest style)
- Lightbox plein écran pour voir les photos en détail
- Navigation clavier et souris
- Accessibilité WCAG/RGAA
- Design festif Noël
- Images stockées sur Vercel Blob avec optimisation Next.js

## Spécifications détaillées

### 1. Structure de la page

**Route** : `/app/galerie/page.tsx`

**Header simple** :
- Titre : "Galerie Photos"
- Sous-titre : "Vivez les moments magiques du Marché de Noël du MPR"
- Pas de filtres
- Pas de barre de navigation supplémentaire

### 2. Configuration Next.js pour Vercel Blob

**`next.config.js`** :
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

module.exports = nextConfig
```

### 3. Grille de photos (Masonry layout)

**Disposition responsive** :
- Mobile (< 768px) : 1 colonne
- Tablette (768px - 1024px) : 2 colonnes
- Desktop (> 1024px) : 3-4 colonnes

**Chaque carte photo doit avoir** :
- Image avec lazy loading (Next.js Image component)
- Badge de catégorie (top-right) : "Stands", "Animations", "Visiteurs", "Ambiance", "MPR"
- Hover effect : zoom smooth (scale 1.05) + overlay sombre
- Info au survol : titre de la photo + date
- Coins arrondis (rounded-lg)
- Ombre (shadow-md → shadow-xl au survol)
- Transition smooth (300ms ease)
- Quality 85 pour optimisation

### 4. Lightbox/Modal

**Comportement** :
- Click sur photo → ouvre lightbox en fullscreen
- Backdrop sombre (bg-black/95)
- Animation fade-in smooth
- Empêche le scroll du body

**Contenu** :
- Image centrée et responsive (max-w-7xl, max-h-[90vh])
- Bouton fermer (X) en top-right
- Flèches navigation (< >) sur les côtés (gauche/droite)
- Info panel en bas : titre, date, catégorie
- Boutons d'action : Partager, Télécharger
- Compteur position : "3 / 24" en bas au centre

**Interactions** :
- Clavier : Escape = fermer, Flèche gauche = photo précédente, Flèche droite = photo suivante
- Souris : Clic backdrop = fermer, Clic X = fermer
- Les flèches de navigation s'affichent/masquent selon la position

### 5. Structure des données et Vercel Blob

**Structure JSON pour chaque photo** :
```json
{
  "id": "gallery/stands/photo-001.jpg",
  "url": "https://xxx.public.blob.vercel-storage.com/gallery/stands/photo-001.jpg",
  "title": "Stand de vin chaud",
  "category": "stands",
  "date": "14 décembre 2024",
  "alt": "Photo du stand de vin chaud - Marché de Noël MPR"
}
```

**Organisation Vercel Blob** :
```
/gallery/
  /stands/
    - photo-001.jpg
    - ae-002.jpg
  /animations/
    - ani223.jpg
  /visiteurs/
    - photo-004.jpg
  /ambiance/
    - photo-123.jpg
  /MPR/
    - azaz.png
```

### 6. Variables d'environnement

**`.env.local`** :
```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_xxx
```

### 7. Design & Styling

**Couleurs** :
- Prendre les couleurs de l'app (global.css)

**Typographie** :
- Titre : text-4xl md:text-5xl font-bold text-red-700
- Sous-titre : text-lg text-gray-600
- Info photo : text-sm opacity-80

**Thème festif** :
- Dégradé background : from-red-50 to-white
- Animations smooth avec framer-motion
- Effets hover fluides

### 8. Accessibilité (WCAG/RGAA)

- ✅ Alt text sur toutes les images
- ✅ Attributs ARIA (role, aria-label, aria-pressed) sur les boutons
- ✅ Navigation complète au clavier
- ✅ Focus visible sur tous les éléments interactifs
- ✅ Contraste suffisant (texte sur background)
- ✅ Sémantique HTML correcte (h1, h2, button, etc.)

### 9. Performance

- Image optimization avec Next.js Image component
- Lazy loading natif
- Préchargement des images adjacentes dans lightbox
- Quality 85 pour équilibre poids/qualité
- Format WebP/AVIF automatique

## Fichiers à créer

### 1. **`lib/galleryData.ts`** - Récupération des images depuis Vercel Blob

```typescript
import { list } from '@vercel/blob'

export interface GalleryImage {
  id: string
  url: string
  title: string
  category: 'stands' | 'animations' | 'visiteurs' | 'ambiance'
  date: string
  alt: string
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN!,
      prefix: 'gallery/',
    })

    const images: GalleryImage[] = blobs
      .filter(blob => blob.pathname.startsWith('gallery/'))
      .map((blob) => {
        // Parser metadata depuis pathname : gallery/stands/photo-001.jpg
        const parts = blob.pathname.split('/')
        const category = parts[1] as GalleryImage['category']
        const filename = parts[2]?.replace(/\.[^/.]+$/, '') || 'Photo'

        return {
          id: blob.pathname,
          url: blob.url,
          title: filename.replace(/-/g, ' '),
          category: category || 'ambiance',
          date: new Date(blob.uploadedAt).toLocaleDateString('fr-FR'),
          alt: `Photo ${category} - Marché de Noël MPR`
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return images

  } catch (error) {
    console.error('Erreur récupération images:', error)
    return []
  }
}
```

### 2. **`app/galerie/page.tsx`** - Page principale

```typescript
import { getGalleryImages } from '@/lib/galleryData'
import { GalleryGrid } from '@/components/GalleryGrid'

export const metadata = {
  title: 'Galerie Photos - Marché de Noël du MPR',
  description: 'Découvrez les moments magiques capturés lors du marché de Noël'
}

export default async function GalleriePage() {
  const images = await getGalleryImages()

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-4">
            Galerie Photos
          </h1>
          <p className="text-lg text-gray-600">
            Revivez les moments magiques du Marché de Noël du MPR
          </p>
        </header>

        <GalleryGrid images={images} />
      </div>
    </main>
  )
}
```

### 3. **`components/GalleryGrid.tsx`** - Grille avec Next.js Image

```typescript
'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { GalleryImage } from '@/lib/galleryData'

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {images.map((image) => (
          <div key={image.id} className="break-inside-avoid">
            <button
              onClick={() => setSelectedImage(image)}
              className="relative group w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer"
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
              <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full capitalize">
                {image.category}
              </span>
              
              {/* Overlay info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-sm font-medium">{image.title}</p>
                  <p className="text-xs opacity-80">{image.date}</p>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox ici */}
    </>
  )
}
```

### 4. **`components/Lightbox.tsx`** - Modal plein écran

```typescript
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Download, Share2 } from 'lucide-react'
import type { GalleryImage } from '@/lib/galleryData'

interface LightboxProps {
  image: GalleryImage
  onClose: () => void
  images: GalleryImage[]
  currentIndex: number
  onNavigate: (index: number) => void
}

export function Lightbox({ image, onClose, images, currentIndex, onNavigate }: LightboxProps) {
  // Gestion clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1)
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1)
    }
    
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden' // Empêcher scroll
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [currentIndex, onClose, onNavigate, images.length])

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: image.title,
        text: `Photo du Marché de Noël du MPR : ${image.title}`,
        url: window.location.href
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Bouton fermer */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
        aria-label="Fermer la galerie"
      >
        <X size={24} />
      </button>

      {/* Navigation gauche */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1) }}
          className="absolute left-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          aria-label="Photo précédente"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Image principale */}
      <div 
        className="relative max-w-7xl max-h-[90vh] w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.url}
          alt={image.alt}
          width={1920}
          height={1080}
          className="w-full h-full object-contain"
          quality={90}
          priority
        />
        
        {/* Info panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <h3 className="text-xl font-semibold mb-1">{image.title}</h3>
          <div className="flex items-center gap-4 mb-3">
            <p className="text-sm opacity-80">{image.date}</p>
            <span className="bg-red-600 text-xs px-2 py-1 rounded-full capitalize">
              {image.category}
            </span>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm"
            >
              <Share2 size={18} />
              Partager
            </button>
            <a
              href={image.url}
              download={`${image.title}.jpg`}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm"
            >
              <Download size={18} />
              Télécharger
            </a>
          </div>
        </div>
      </div>

      {/* Navigation droite */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1) }}
          className="absolute right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          aria-label="Photo suivante"
        >
          <ChevronRight size={32} />
        </button>
      )}

      {/* Compteur */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  )
}
```

### 5. **`app/api/galerie/upload/route.ts`** - API pour uploader

```typescript
import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string
    const title = formData.get('title') as string

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    // Créer filename sécurisé
    const safeTitle = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
    const extension = file.name.split('.').pop()
    const filename = `${safeTitle}.${extension}`
    
    // Structure : gallery/category/filename
    const pathname = `gallery/${category}/${filename}`

    // Upload vers Vercel Blob
    const blob = await put(pathname, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    })

    return NextResponse.json({
      success: true,
      url: blob.url,
      pathname: blob.pathname
    })

  } catch (error) {
    console.error('Erreur upload:', error)
    return NextResponse.json({ error: 'Erreur lors de l\'upload' }, { status: 500 })
  }
}
```

### 6. **`types/gallery.ts`** - Types TypeScript

```typescript
export interface GalleryImage {
  id: string
  url: string
  title: string
  category: 'stands' | 'animations' | 'visiteurs' | 'ambiance'
  date: string
  alt: string
}

export interface LightboxProps {
  image: GalleryImage
  onClose: () => void
  images: GalleryImage[]
  currentIndex: number
  onNavigate: (index: number) => void
}
```

## Packages requis

```bash
npm install @vercel/blob framer-motion lucide-react
```

## Notes importantes

- Utiliser `'use client'` pour les composants interactifs
- Le composant Image de Next.js optimise automatiquement depuis Vercel Blob
- Structure de dossier Vercel Blob : `gallery/{category}/{filename}`
- Token Vercel Blob nécessaire en variable d'environnement
- Photos organisées par catégorie dans Vercel Blob
- Quality 85 pour équilibre performance/qualité

