import Footer from '@/components/Footer';
import { GalleryGrid } from '@/components/GalleryGrid';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import { getGalleryImages } from '@/lib/galleryData';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const AnimatedSection = dynamic(() => import('@/components/AnimatedSection'), {
  loading: () => <div />,
  ssr: true,
});

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

// Revalider la page toutes les 60 secondes pour afficher les nouvelles images
export const revalidate = 60;

export default async function GalleriePage() {
  const images = await getGalleryImages();

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fadeInUp">
              <header className="text-center mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-red-700 dark:text-red-500">
                  Galerie Photos
                </h1>
                <Separator className="my-6 mx-auto w-24" />
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Vivez les moments magiques du Marché de Noël du MPR
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
            </AnimatedSection>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-12">
          <GalleryGrid images={images} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

