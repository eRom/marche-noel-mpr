import Footer from '@/components/Footer';
import { GalleryGrid } from '@/components/GalleryGrid';
import Header from '@/components/Header';
import { getGalleryImages } from '@/lib/galleryData';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Galerie Photos - Marché de Noël du MPR',
  description:
    'Découvrez les moments magiques capturés lors du marché de Noël du MPR à Nantes. Photos des stands, animations, visiteurs et ambiance festive.',
  openGraph: {
    title: 'Galerie Photos - Marché de Noël du MPR',
    description:
      'Revivez les moments magiques du Marché de Noël du MPR à travers notre galerie photo.',
    type: 'website',
  },
};

export default async function GalleriePage() {
  const images = await getGalleryImages();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-red-700 dark:text-red-500 mb-4">
              Galerie Photos
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Revivez les moments magiques du Marché de Noël du MPR
            </p>
            {images.length > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {images.length} photo{images.length > 1 ? 's' : ''} disponible
                {images.length > 1 ? 's' : ''}
              </p>
            )}
            {process.env.NODE_ENV === 'development' && (
              <Link
                href="/galerie/admin"
                className="inline-block mt-4 text-sm text-red-600 dark:text-red-400 hover:underline"
              >
                → Administration (dev)
              </Link>
            )}
          </header>

          <GalleryGrid images={images} />
        </div>
      </main>
      <Footer />
    </>
  );
}

