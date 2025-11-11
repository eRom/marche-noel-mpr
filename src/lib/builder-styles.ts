import type { DecorationStyle } from "@/types/builder";

// Liste des styles de décoration disponibles
export const DECORATION_STYLES: DecorationStyle[] = [
  "Scandinave",
  "Moderne",
  "Industriel",
  "Vintage",
  "Marché de Noël",
  "Nature & Végétal",
  "Futuriste",
];

// Descriptions des styles pour les prompts
export const STYLE_DESCRIPTIONS: Record<DecorationStyle, string> = {
  Scandinave:
    "Un hall d'accueil de style scandinave avec un design épuré, des lignes minimalistes, des matériaux naturels (bois clair, pierre), une palette de couleurs douces (blanc, beige, gris clair), et une ambiance lumineuse et apaisante.",
  Moderne:
    "Un hall d'accueil moderne et contemporain avec un design épuré, des matériaux high-tech (verre, métal, béton), un comptoir d'accueil moderne, des éclairages LED intégrés, et une esthétique minimaliste et fonctionnelle.",
  Industriel:
    "Un hall d'accueil de style industriel avec des matériaux bruts (briques apparentes, métal, béton), des éclairages suspendus, des éléments vintage, une palette de couleurs neutres (gris, noir, beige), et une ambiance authentique et urbaine.",
  Vintage:
    "Un hall d'accueil de style vintage avec des meubles rétro, des éléments décoratifs d'époque, des couleurs chaudes et patinées, des textures authentiques, et une ambiance nostalgique et chaleureuse.",
  "Marché de Noël":
    "Un hall d'accueil transformé en marché de Noël avec des stands décoratifs, des sapins, des guirlandes, des lumières festives, une ambiance chaleureuse et conviviale, des couleurs traditionnelles de Noël (rouge, vert, or).",
  "Nature & Végétal":
    "Un hall d'accueil intégrant la nature avec des plantes vertes, des murs végétalisés, des matériaux naturels (bois, pierre), une lumière naturelle, une palette de couleurs vertes et terreuses, et une ambiance apaisante et biophilique.",
  Futuriste:
    "Un hall d’accueil inspiré du cyberpunk, mêlant technologies avancées et ambiance dystopique : enseignes et néons multicolores, hologrammes animés, écrans interactifs customisés, éclairages LED vifs avec dominantes violettes et bleues, matériaux métalliques et effets usés, câbles apparents, graffitis futuristes, mobilier aux formes angulaires, et une atmosphère urbaine high-tech entre exubérance et underground.",
};

// Fonction utilitaire pour obtenir la description d'un style
export function getStyleDescription(style: DecorationStyle): string {
  return STYLE_DESCRIPTIONS[style] || style;
}

// Fonction utilitaire pour vérifier si un style est valide
export function isValidStyle(style: string): style is DecorationStyle {
  return style in STYLE_DESCRIPTIONS;
}

