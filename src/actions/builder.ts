"use server";

import {
  createChatPrompt,
  createStylePrompt,
  createSurprisePrompt,
  generateImage,
} from "@/lib/gemini";
import { z } from "zod";

// Schémas de validation
const generateImageSchema = z.object({
  imageUrl: z
    .string()
    .refine((url) => url.startsWith("http") || url.startsWith("/"), {
      message: "URL d'image invalide",
    }),
  style: z.string().min(1),
});

const chatGenerateSchema = z.object({
  imageUrl: z
    .string()
    .refine((url) => url.startsWith("http") || url.startsWith("/"), {
      message: "URL d'image invalide",
    }),
  prompt: z.string().min(1),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .optional(),
});

// Types de retour
export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// Server Action pour générer une image stylisée
export async function generateStyledImage(
  imageUrl: string,
  style: string
): Promise<ActionResult<{ imageUrl: string }>> {
  try {
    // Validation
    const validation = generateImageSchema.safeParse({ imageUrl, style });
    if (!validation.success) {
      return {
        success: false,
        error: "Données invalides",
      };
    }

    // Créer le prompt
    const prompt = createStylePrompt(style, imageUrl);

    // Récupérer l'image en base64
    const base64Data = await fetchImageAsBase64(imageUrl);
    const mimeType = imageUrl.endsWith(".webp")
      ? "image/webp"
      : imageUrl.endsWith(".png")
        ? "image/png"
        : "image/jpeg";

    // Générer l'image avec Gemini
    const generatedImageData = await generateImage(
      base64Data,
      mimeType,
      prompt
    );

    // Convertir l'image base64 en URL blob temporaire (côté client)
    const imageDataUrl = `data:${mimeType};base64,${generatedImageData}`;

    return {
      success: true,
      data: { imageUrl: imageDataUrl },
    };
  } catch (error) {
    console.error("Erreur génération image stylisée:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erreur lors de la génération de l'image",
    };
  }
}

// Server Action pour générer depuis le chat
export async function generateFromChat(
  imageUrl: string,
  prompt: string,
  conversationHistory?: Array<{ role: string; content: string }>
): Promise<ActionResult<{ imageUrl: string }>> {
  try {
    // Validation
    const validation = chatGenerateSchema.safeParse({
      imageUrl,
      prompt,
      conversationHistory,
    });
    if (!validation.success) {
      return {
        success: false,
        error: "Données invalides",
      };
    }

    // Créer le prompt contextuel
    const chatPrompt = createChatPrompt(prompt, imageUrl, conversationHistory);

    // Récupérer l'image en base64
    const base64Data = await fetchImageAsBase64(imageUrl);
    const mimeType = imageUrl.endsWith(".webp")
      ? "image/webp"
      : imageUrl.endsWith(".png")
        ? "image/png"
        : "image/jpeg";

    // Générer l'image avec Gemini
    const generatedImageData = await generateImage(
      base64Data,
      mimeType,
      chatPrompt
    );

    const imageDataUrl = `data:${mimeType};base64,${generatedImageData}`;

    return {
      success: true,
      data: { imageUrl: imageDataUrl },
    };
  } catch (error) {
    console.error("Erreur génération depuis chat:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erreur lors de la génération de l'image",
    };
  }
}

// Server Action pour "Surprenez-moi"
export async function generateSurpriseImage(
  imageUrl: string
): Promise<ActionResult<{ imageUrl: string }>> {
  try {
    if (
      !imageUrl ||
      (!imageUrl.startsWith("http") && !imageUrl.startsWith("/"))
    ) {
      return {
        success: false,
        error: "URL d'image invalide",
      };
    }

    // Créer le prompt surprise
    const prompt = createSurprisePrompt(imageUrl);

    // Récupérer l'image en base64
    const base64Data = await fetchImageAsBase64(imageUrl);
    const mimeType = imageUrl.endsWith(".webp")
      ? "image/webp"
      : imageUrl.endsWith(".png")
        ? "image/png"
        : "image/jpeg";

    // Générer l'image avec Gemini
    const generatedImageData = await generateImage(
      base64Data,
      mimeType,
      prompt
    );

    const imageDataUrl = `data:${mimeType};base64,${generatedImageData}`;

    return {
      success: true,
      data: { imageUrl: imageDataUrl },
    };
  } catch (error) {
    console.error("Erreur génération surprise:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erreur lors de la génération de l'image",
    };
  }
}

// Fonction utilitaire pour récupérer une image et la convertir en base64
async function fetchImageAsBase64(imageUrl: string): Promise<string> {
  try {
    // Si c'est un chemin local (public/), lire directement depuis le système de fichiers
    if (imageUrl.startsWith("/")) {
      const fs = await import("fs/promises");
      const path = await import("path");
      
      // Construire le chemin vers le fichier dans public/
      const publicPath = path.join(process.cwd(), "public", imageUrl);
      
      try {
        const fileBuffer = await fs.readFile(publicPath);
        return fileBuffer.toString("base64");
      } catch (fsError) {
        // Si la lecture du fichier échoue, essayer avec fetch en utilisant VERCEL_URL
        const baseUrl =
          process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        imageUrl = `${baseUrl}${imageUrl}`;
      }
    }

    // Pour les URLs externes ou après construction de l'URL
    if (imageUrl.startsWith("http")) {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(
          `Erreur lors de la récupération de l'image: ${response.statusText}`
        );
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return buffer.toString("base64");
    }

    throw new Error("URL d'image invalide");
  } catch (error) {
    console.error("Erreur conversion image en base64:", error);
    throw error;
  }
}
