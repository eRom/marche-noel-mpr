import { GalleryCategory } from "@/config/gallery";

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: GalleryCategory;
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
