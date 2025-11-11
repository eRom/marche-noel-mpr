import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_API_KEY is not defined");
}

export const genAI = new GoogleGenerativeAI(apiKey);

// Modèle pour génération d'images (gemini-2.5-flash-image)
export const imageModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-image",
});

// Modèle pour chat (gemini-2.5-flash)
export const chatModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// Fonction utilitaire pour convertir un fichier en GenerativePart
export function fileToGenerativePart(
  base64Data: string,
  mimeType: string
) {
  return {
    inlineData: {
      data: base64Data,
      mimeType: mimeType,
    },
  };
}

// Fonction pour générer une image avec Gemini
export async function generateImage(
  base64Data: string,
  mimeType: string,
  prompt: string
): Promise<string> {
  const imagePart = fileToGenerativePart(base64Data, mimeType);

  const result = await imageModel.generateContent([
    imagePart,
    { text: prompt },
  ]);

  const response = result.response;
  
  // Debug: logger la structure de la réponse
  console.log("Response structure:", JSON.stringify(response, null, 2));
  console.log("Candidates:", response.candidates);
  
  const firstCandidate = response.candidates?.[0];
  if (!firstCandidate) {
    const errorMsg = response.promptFeedback?.blockReason 
      ? `Blocked: ${response.promptFeedback.blockReason}`
      : "No candidates in response";
    console.error("Error:", errorMsg);
    throw new Error(`Failed to generate image. ${errorMsg}`);
  }

  // Vérifier s'il y a un finishReason qui indique un problème
  if (firstCandidate.finishReason && firstCandidate.finishReason !== "STOP") {
    console.error("Finish reason:", firstCandidate.finishReason);
    throw new Error(
      `Failed to generate image. Finish reason: ${firstCandidate.finishReason}`
    );
  }

  const parts = firstCandidate.content?.parts;
  if (!parts || parts.length === 0) {
    console.error("No parts in candidate content");
    throw new Error("Failed to generate image. No parts in response.");
  }

  // Chercher une partie avec inlineData (image générée)
  for (const part of parts) {
    // Vérifier inlineData
    if ((part as any).inlineData?.data) {
      return (part as any).inlineData.data;
    }
    // Vérifier aussi la structure alternative
    if (part.inlineData && (part.inlineData as any).data) {
      return (part.inlineData as any).data;
    }
    // Si c'est du texte, logger pour debug
    if ((part as any).text) {
      console.log("Text response instead of image:", (part as any).text);
    }
  }

  // Si aucune image n'est trouvée, logger pour debug
  console.error("Response parts structure:", JSON.stringify(parts, null, 2));
  console.error("Full response:", JSON.stringify(response, null, 2));
  
  throw new Error(
    "Failed to generate image. The model did not return image data. Check console for details."
  );
}

// Descriptions des styles pour les prompts
const styleDescriptions: Record<string, string> = {
  "Accueil Festif":
    "Un hall d'accueil chaleureux et festif avec des décorations de Noël élégantes, des guirlandes lumineuses, un sapin décoré, une ambiance conviviale et accueillante avec des couleurs chaudes (rouge, or, vert).",
  Scandinave:
    "Un hall d'accueil de style scandinave avec un design épuré, des lignes minimalistes, des matériaux naturels (bois clair, pierre), une palette de couleurs douces (blanc, beige, gris clair), et une ambiance lumineuse et apaisante.",
  Moderne:
    "Un hall d'accueil moderne et contemporain avec un design épuré, des matériaux high-tech (verre, métal, béton), un comptoir d'accueil moderne, des éclairages LED intégrés, et une esthétique minimaliste et fonctionnelle.",
  Industriel:
    "Un hall d'accueil de style industriel avec des matériaux bruts (briques apparentes, métal, béton), des éclairages suspendus, des éléments vintage, une palette de couleurs neutres (gris, noir, beige), et une ambiance authentique et urbaine.",
  Luxe:
    "Un hall d'accueil luxueux et raffiné avec des matériaux nobles (marbre, cuir, bois précieux), des éclairages élégants, des éléments décoratifs sophistiqués, une palette de couleurs riches (or, bordeaux, noir), et une ambiance prestigieuse.",
  Vintage:
    "Un hall d'accueil de style vintage avec des meubles rétro, des éléments décoratifs d'époque, des couleurs chaudes et patinées, des textures authentiques, et une ambiance nostalgique et chaleureuse.",
  "Marché de Noël":
    "Un hall d'accueil transformé en marché de Noël avec des stands décoratifs, des sapins, des guirlandes, des lumières festives, une ambiance chaleureuse et conviviale, des couleurs traditionnelles de Noël (rouge, vert, or).",
  "Nature & Végétal":
    "Un hall d'accueil intégrant la nature avec des plantes vertes, des murs végétalisés, des matériaux naturels (bois, pierre), une lumière naturelle, une palette de couleurs vertes et terreuses, et une ambiance apaisante et biophilique.",
  Minimaliste:
    "Un hall d'accueil minimaliste avec un design épuré, peu d'éléments décoratifs, des lignes simples, une palette de couleurs neutres (blanc, gris, beige), beaucoup d'espace vide, et une ambiance calme et sereine.",
  Futuriste:
    "Un hall d'accueil futuriste avec des technologies intégrées, des écrans interactifs, des éclairages LED dynamiques, des matériaux innovants, des formes géométriques audacieuses, et une ambiance high-tech et innovante.",
  Lounge:
    "Un hall d'accueil de style lounge avec des canapés confortables, des espaces de détente, des éclairages tamisés, des matériaux doux (tissus, moquette), une palette de couleurs chaudes et apaisantes, et une ambiance relaxante et accueillante.",
};

// Fonction pour créer un prompt de style
export function createStylePrompt(style: string, imageUrl: string): string {
  const description = styleDescriptions[style] || style;
  return `Tu es un expert en décoration d'intérieur. Transforme cette photo d'un hall d'accueil selon le style "${style}".

Style demandé: ${description}

Instructions:
- Réinvente l'espace selon ce style décoratif
- Si la photo n'inclut pas clairement une zone d'accueil représentative d'un hall, ajoute les éléments clés adaptés au style sélectionné
- Conserve la structure générale de l'espace mais adapte la décoration, les couleurs, les matériaux et l'ambiance
- Crée une version stylisée cohérente et réaliste
- Assure-toi que le résultat soit visuellement attrayant et professionnel

Image source: ${imageUrl}`;
}

// Fonction pour créer un prompt de chat
export function createChatPrompt(
  prompt: string,
  imageUrl: string,
  history?: Array<{ role: string; content: string }>
): string {
  let contextPrompt = `Tu es un assistant décorateur d'intérieur expert. L'utilisateur veut modifier la décoration de ce hall d'accueil.

Image actuelle: ${imageUrl}

Demande de l'utilisateur: ${prompt}

Instructions:
- Applique les modifications demandées de manière cohérente et réaliste
- Conserve la structure générale de l'espace
- Adapte la décoration, les couleurs, les matériaux et l'ambiance selon la demande
- Assure-toi que le résultat soit visuellement attrayant et professionnel
`;

  if (history && history.length > 0) {
    contextPrompt += "\n\nHistorique de la conversation:\n";
    history.forEach((msg) => {
      contextPrompt += `${msg.role === "user" ? "Utilisateur" : "Assistant"}: ${msg.content}\n`;
    });
  }

  return contextPrompt;
}

// Fonction pour combinaison créative de styles (Surprenez-moi)
export function createSurprisePrompt(imageUrl: string): string {
  const styles = Object.keys(styleDescriptions);
  const randomStyles = styles
    .sort(() => Math.random() - 0.5)
    .slice(0, 2)
    .join(" + ");

  return `Tu es un expert en décoration d'intérieur créatif. Crée une décoration innovante et surprenante pour ce hall d'accueil en combinant les styles suivants: ${randomStyles}.

Image source: ${imageUrl}

Instructions:
- Combine harmonieusement les éléments caractéristiques des deux styles
- Crée une décoration unique et créative
- Assure-toi que le résultat soit cohérent et visuellement attrayant
- Sois audacieux mais élégant dans la combinaison`;
}

