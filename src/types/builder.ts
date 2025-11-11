export type DecorationStyle =
  | "Accueil Festif"
  | "Scandinave"
  | "Moderne"
  | "Industriel"
  | "Luxe"
  | "Vintage"
  | "Marché de Noël"
  | "Nature & Végétal"
  | "Minimaliste"
  | "Futuriste"
  | "Lounge";

export interface BuilderImage {
  id: string;
  filename: string;
  url: string;
}

export interface GenerationResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

