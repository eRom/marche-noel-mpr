export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: 'stands' | 'animations' | 'visiteurs' | 'ambiance' | 'MPR';
  date: string;
  alt: string;
}

export interface LightboxProps {
  image: GalleryImage;
  onClose: () => void;
  images: GalleryImage[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

