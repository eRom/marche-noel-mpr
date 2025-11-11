export type DecorationStyle =
  | "Scandinave"
  | "Moderne"
  | "Industriel"
  | "Vintage"
  | "Noël"
  | "Nature"
  | "Futuriste";

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
