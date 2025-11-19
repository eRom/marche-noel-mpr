"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Edit2, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { listImages, deleteImage, renameImage } from "@/actions/gallery";
import { toast } from "sonner";

interface ImageInfo {
  id: string;
  url: string;
  filename: string;
  titleSlug: string;
  category: string;
  uploadedAt: string;
}

interface GalleryManagerProps {
  password: string;
}

export function GalleryManager({ password }: GalleryManagerProps) {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const loadImages = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const result = await listImages(password);

      if (result.success) {
        setImages(result.data);
      } else {
        setError(result.error);
      }
    } catch {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  // Focus sur l'input quand on passe en mode édition
  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  const handleDelete = (imageId: string, pathname: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
      return;
    }

    setDeletingId(imageId);

    startTransition(async () => {
      const result = await deleteImage(password, pathname);

      if (result.success) {
        await loadImages();
        toast.success("Image supprimée avec succès");
      } else {
        toast.error("Erreur lors de la suppression", {
          description: result.error,
        });
      }
      setDeletingId(null);
    });
  };

  const handleRenameStart = (image: ImageInfo) => {
    setEditingId(image.id);
    setEditingTitle(image.titleSlug);
  };

  const handleRenameCancel = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const handleRenameSave = (pathname: string) => {
    if (!editingTitle.trim()) {
      return;
    }

    startTransition(async () => {
      const result = await renameImage(password, pathname, editingTitle.trim());

      if (result.success) {
        await loadImages();
        setEditingId(null);
        setEditingTitle("");
        toast.success("Image renommée avec succès");
      } else {
        toast.error("Erreur lors du renommage", {
          description: result.error,
        });
      }
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900 dark:border-gray-100"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Aucune image dans la galerie
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Gestion des images
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {images.length} image{images.length > 1 ? "s" : ""} disponible
            {images.length > 1 ? "s" : ""}
          </p>
        </div>
        <Button 
          onClick={loadImages} 
          variant="outline" 
          disabled={loading || isPending}
          aria-label="Actualiser la liste des images"
        >
          Actualiser
        </Button>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => {
          const isEditing = editingId === image.id;
          const isDeleting = deletingId === image.id;

          return (
            <div
              key={image.id}
              className="group overflow-hidden rounded-lg border bg-white dark:bg-gray-800"
            >
              {/* Image */}
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-700">
                <Image
                  src={image.url}
                  alt={image.titleSlug}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay pendant la suppression */}
                {isDeleting && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white" />
                  </div>
                )}
              </div>

              {/* Info et actions */}
              <div className="space-y-2 p-3">
                {/* Catégorie */}
                <div className="text-xs text-gray-500 uppercase dark:text-gray-400">
                  {image.category}
                </div>

                {/* Titre - affichage ou édition */}
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      ref={inputRef}
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      placeholder="Nouveau titre"
                      className="text-sm"
                      aria-label="Nouveau titre de l'image"
                      maxLength={50}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleRenameSave(image.id)}
                        size="sm"
                        className="h-8 flex-1 bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                        disabled={!editingTitle.trim() || isDeleting || isPending}
                        aria-label="Enregistrer le nouveau titre"
                      >
                        <Check size={14} />
                      </Button>
                      <Button
                        onClick={handleRenameCancel}
                        size="sm"
                        variant="outline"
                        className="h-8 flex-1"
                        disabled={isDeleting || isPending}
                        aria-label="Annuler le renommage"
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="truncate text-sm font-medium">
                    {image.titleSlug
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </div>
                )}

                {/* Date */}
                <div className="text-xs text-gray-400 dark:text-gray-500">
                  {new Date(image.uploadedAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>

                {/* Actions */}
                {!isEditing && (
                  <div className="flex gap-2 border-t pt-2">
                    <Button
                      onClick={() => handleRenameStart(image)}
                      variant="outline"
                      size="sm"
                      className="h-8 flex-1 text-xs"
                      disabled={isDeleting || isPending}
                      aria-label={`Renommer ${image.titleSlug}`}
                    >
                      <Edit2 size={14} className="mr-1" />
                      Renommer
                    </Button>
                    <Button
                      onClick={() => handleDelete(image.id, image.id)}
                      variant="destructive"
                      size="sm"
                      className="h-8 flex-1 text-xs"
                      disabled={isDeleting || isPending}
                      aria-label={`Supprimer ${image.titleSlug}`}
                      aria-busy={isDeleting}
                    >
                      <Trash2 size={14} className="mr-1" />
                      Supprimer
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
