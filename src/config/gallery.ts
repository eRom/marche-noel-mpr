export const GALLERY_CATEGORIES = {
  stands: { label: "Stands", color: "bg-red-600" },
  animations: { label: "Animations", color: "bg-green-600" },
  visiteurs: { label: "Visiteurs", color: "bg-blue-600" },
  ambiance: { label: "Ambiance", color: "bg-purple-600" },
  MPR: { label: "MPR", color: "bg-yellow-600" },
  IA: { label: "IA", color: "bg-pink-600" },
  produits: { label: "Produits", color: "bg-orange-600" },
} as const;

export type GalleryCategory = keyof typeof GALLERY_CATEGORIES;

export const VALID_CATEGORIES = Object.keys(
  GALLERY_CATEGORIES
) as GalleryCategory[];

export const getCategoryLabel = (category: string): string => {
  const cat = GALLERY_CATEGORIES[category as GalleryCategory];
  return cat ? cat.label : category;
};

export const getCategoryColor = (category: string): string => {
  const cat = GALLERY_CATEGORIES[category as GalleryCategory];
  return cat ? cat.color : "bg-gray-600";
};
