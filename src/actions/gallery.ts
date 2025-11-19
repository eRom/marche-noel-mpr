"use server";

import { del, list, put } from "@vercel/blob";
import { z } from "zod";

// Types de retour
export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// Schémas de validation
const authSchema = z.object({
  password: z.string().min(1),
});

const uploadSchema = z.object({
  file: z.instanceof(File),
  category: z.enum(["stands", "animations", "visiteurs", "ambiance", "MPR", "IA"]),
  title: z.string().min(1).max(50),
});

const deleteSchema = z.object({
  pathname: z.string().min(1),
});

const renameSchema = z.object({
  pathname: z.string().min(1),
  newTitle: z.string().min(1).max(50),
});

// Fonction utilitaire pour vérifier le mot de passe
function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  return password === adminPassword;
}

// Fonction pour créer un slug URL-safe
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
    .replace(/[^a-z0-9\s-]/g, "") // Supprimer caractères spéciaux
    .replace(/\s+/g, "-") // Espaces → tirets
    .replace(/-+/g, "-") // Multiples tirets → un seul
    .replace(/^-+|-+$/g, "") // Supprimer tirets début/fin
    .substring(0, 50); // Max 50 chars
}

// Constantes
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

/**
 * Authentification admin
 */
export async function authenticateAdmin(
  formData: FormData,
): Promise<ActionResult<boolean>> {
  try {
    const password = formData.get("password") as string;

    const validatedFields = authSchema.safeParse({ password });

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Mot de passe requis",
      };
    }

    if (verifyPassword(validatedFields.data.password)) {
      return { success: true, data: true };
    }

    return {
      success: false,
      error: "Mot de passe incorrect",
    };
  } catch (error) {
    console.error("Erreur auth:", error);
    return {
      success: false,
      error: "Erreur de vérification",
    };
  }
}

/**
 * Upload d'une image
 */
export async function uploadImage(
  formData: FormData,
): Promise<ActionResult<{ url: string; pathname: string }>> {
  try {
    const password = formData.get("password") as string;
    const file = formData.get("file") as File;
    const category = formData.get("category") as string;
    const customTitle = formData.get("title") as string | null;

    // Vérifier l'authentification
    if (!verifyPassword(password)) {
      return {
        success: false,
        error: "Non autorisé",
      };
    }

    // Valider les champs
    if (!file) {
      return {
        success: false,
        error: "Aucun fichier fourni",
      };
    }

    if (!customTitle || customTitle.trim() === "") {
      return {
        success: false,
        error: "Le titre est obligatoire",
      };
    }

    const validatedFields = uploadSchema.safeParse({
      file,
      category,
      title: customTitle.trim(),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Données invalides",
      };
    }

    // Validation du fichier
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        success: false,
        error: "Type de fichier non autorisé. Utilisez JPG, PNG ou WebP.",
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: "Fichier trop volumineux. Maximum 10MB.",
      };
    }

    // Créer un slug URL-safe à partir du titre
    const timestamp = Date.now();
    const slug = createSlug(customTitle.trim());

    if (!slug || slug.length === 0) {
      return {
        success: false,
        error: "Le titre ne contient aucun caractère valide",
      };
    }

    // Encoder le titre original en base64 pour préserver les majuscules
    const titleBase64 = Buffer.from(customTitle.trim()).toString("base64url");

    const extension = file.name.split(".").pop() || "jpg";
    // Format: slug-timestamp-base64Title.ext
    const filename = `${slug}-${timestamp}-${titleBase64}.${extension}`;

    // Structure : gallery/category/filename
    const pathname = `gallery/${category}/${filename}`;

    // Upload vers Vercel Blob
    const blob = await put(pathname, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN!,
      addRandomSuffix: false,
      cacheControlMaxAge: 31536000, // 1 an
      contentType: file.type,
    });

    return {
      success: true,
      data: {
        url: blob.url,
        pathname: blob.pathname,
      },
    };
  } catch (error) {
    console.error("Erreur upload:", error);
    return {
      success: false,
      error: "Erreur lors de l'upload",
    };
  }
}

/**
 * Lister les images
 */
export async function listImages(
  password: string,
): Promise<ActionResult<Array<{
  id: string;
  url: string;
  filename: string;
  titleSlug: string;
  category: string;
  uploadedAt: string;
}>>> {
  try {
    // Vérifier l'authentification
    if (!verifyPassword(password)) {
      return {
        success: false,
        error: "Non autorisé",
      };
    }

    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN!,
      prefix: "gallery/",
    });

    const images = blobs
      .filter((blob) => {
        const parts = blob.pathname.split("/");
        const hasThreeParts = parts.length === 3;
        const hasFilename = parts[2] && parts[2].length > 0;
        const notEndingWithSlash = !blob.pathname.endsWith("/");

        return hasThreeParts && hasFilename && notEndingWithSlash;
      })
      .map((blob) => {
        const parts = blob.pathname.split("/");
        const category = parts[1];
        const filename = parts[2] || "";

        // Extraire le titre (nom sans extension et sans timestamp)
        // Format: slug-timestamp-base64Title.ext ou slug-timestamp.ext (anciennes images)
        const filenameWithoutExt = filename.replace(/\.[^/.]+$/, "");
        // Supprimer le timestamp et le base64Title s'il existe
        const titleSlug = filenameWithoutExt.replace(/-\d{13}(-.+)?$/, "");

        return {
          id: blob.pathname,
          url: blob.url,
          filename,
          titleSlug,
          category,
          uploadedAt: blob.uploadedAt,
        };
      })
      .sort((a, b) => {
        return (
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        );
      });

    return {
      success: true,
      data: images,
    };
  } catch (error) {
    console.error("Erreur list images:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération des images",
    };
  }
}

/**
 * Supprimer une image
 */
export async function deleteImage(
  password: string,
  pathname: string,
): Promise<ActionResult<boolean>> {
  try {
    // Vérifier l'authentification
    if (!verifyPassword(password)) {
      return {
        success: false,
        error: "Non autorisé",
      };
    }

    const validatedFields = deleteSchema.safeParse({ pathname });

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Pathname requis",
      };
    }

    // Supprimer le blob
    await del(validatedFields.data.pathname, {
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });

    return {
      success: true,
      data: true,
    };
  } catch (error) {
    console.error("Erreur suppression:", error);
    return {
      success: false,
      error: "Erreur lors de la suppression",
    };
  }
}

/**
 * Renommer une image
 */
export async function renameImage(
  password: string,
  pathname: string,
  newTitle: string,
): Promise<ActionResult<{ newPathname: string; newUrl: string }>> {
  try {
    // Vérifier l'authentification
    if (!verifyPassword(password)) {
      return {
        success: false,
        error: "Non autorisé",
      };
    }

    const validatedFields = renameSchema.safeParse({ pathname, newTitle });

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Données invalides",
      };
    }

    // Récupérer le blob actuel
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN!,
      limit: 1000,
    });

    const currentBlob = blobs.find((b) => b.pathname === pathname);

    if (!currentBlob) {
      return {
        success: false,
        error: "Image introuvable",
      };
    }

    // Télécharger le blob actuel
    const blobResponse = await fetch(currentBlob.url);
    const blobData = await blobResponse.blob();

    // Créer un nouveau slug à partir du nouveau titre
    const timestamp = Date.now();
    const slug = createSlug(newTitle.trim());

    if (!slug || slug.length === 0) {
      return {
        success: false,
        error: "Le titre ne contient aucun caractère valide",
      };
    }

    // Extraire la catégorie et l'extension du pathname actuel
    const parts = pathname.split("/");
    const category = parts[1];
    const oldFilename = parts[2] || "";
    const extension = oldFilename.split(".").pop() || "jpg";

    // Encoder le nouveau titre en base64
    const titleBase64 = Buffer.from(newTitle.trim()).toString("base64url");

    // Créer le nouveau pathname
    const newFilename = `${slug}-${timestamp}-${titleBase64}.${extension}`;
    const newPathname = `gallery/${category}/${newFilename}`;

    // Créer le nouveau blob
    const file = new File([blobData], newFilename, { type: blobData.type });
    const newBlob = await put(newPathname, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN!,
      cacheControlMaxAge: 31536000,
      contentType: blobData.type,
    });

    // Supprimer l'ancien blob
    await del(pathname, {
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });

    return {
      success: true,
      data: {
        newPathname: newBlob.pathname,
        newUrl: newBlob.url,
      },
    };
  } catch (error) {
    console.error("Erreur rename:", error);
    return {
      success: false,
      error: "Erreur lors du renommage",
    };
  }
}
