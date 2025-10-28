'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { AlertCircle, CheckCircle, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState, type ChangeEvent, type DragEvent } from 'react';

interface UploadFile {
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  url?: string;
}

interface GalleryUploadProps {
  password: string;
}

const categories = [
  { value: 'stands', label: 'Stands' },
  { value: 'animations', label: 'Animations' },
  { value: 'visiteurs', label: 'Visiteurs' },
  { value: 'ambiance', label: 'Ambiance' },
  { value: 'MPR', label: 'MPR' },
  { value: 'IA', label: 'IA' },
];

export function GalleryUpload({ password }: GalleryUploadProps) {
  const [file, setFile] = useState<UploadFile | null>(null);
  const [category, setCategory] = useState<string>('ambiance');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [title, setTitle] = useState<string>('');

  const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processImage = async (originalFile: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.onload = () => {
          // Calculer les nouvelles dimensions (max 1440px)
          let width = img.width;
          let height = img.height;
          const maxSize = 1440;

          // Redimensionner seulement si l'image dépasse 1440px
          if (width > maxSize || height > maxSize) {
            if (width > height) {
              // Image paysage : limiter la largeur
              height = Math.round((height / width) * maxSize);
              width = maxSize;
            } else {
              // Image portrait : limiter la hauteur
              width = Math.round((width / height) * maxSize);
              height = maxSize;
            }
          }

          // Créer un canvas avec les nouvelles dimensions
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Impossible de créer le contexte canvas'));
            return;
          }

          // Dessiner l'image redimensionnée avec interpolation de haute qualité
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Convertir en WebP avec qualité 85
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Échec de la conversion WebP'));
                return;
              }

              // Créer un nouveau fichier .webp
              const nameWithoutExt = originalFile.name.replace(/\.[^/.]+$/, '');
              const newFile = new File([blob], `${nameWithoutExt}.webp`, {
                type: 'image/webp',
                lastModified: Date.now(),
              });

              resolve(newFile);
            },
            'image/webp',
            0.85 // Qualité 85%
          );
        };

        img.onerror = () => {
          reject(new Error('Échec du chargement de l\'image'));
        };

        img.src = e.target?.result as string;
      };

      reader.onerror = () => {
        reject(new Error('Échec de la lecture du fichier'));
      };

      reader.readAsDataURL(originalFile);
    });
  };

  const addFile = useCallback(async (newFile: File) => {
    // Nettoyer le fichier précédent si existe
    if (file) {
      URL.revokeObjectURL(file.preview);
    }

    setIsProcessing(true);

    try {
      // Traiter l'image (redimensionner si > 1440px + convertir en WebP)
      const processedFile = await processImage(newFile);

      setFile({
        file: processedFile,
        preview: URL.createObjectURL(processedFile),
        status: 'pending',
      });
      setTitle(''); // Réinitialiser le titre
    } catch (error) {
      console.error('Erreur de traitement de l\'image:', error);
      // En cas d'erreur, utiliser le fichier original
      setFile({
        file: newFile,
        preview: URL.createObjectURL(newFile),
        status: 'pending',
      });
      setTitle('');
    } finally {
      setIsProcessing(false);
    }
  }, [file]);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith('image/')
    );

    if (droppedFiles[0]) {
      addFile(droppedFiles[0]);
    }
  }, [addFile]);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      addFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    if (file) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
    setTitle('');
  };

  const updateTitle = (newTitle: string) => {
    // Limiter à 50 caractères (garder les majuscules)
    const cleanTitle = newTitle.substring(0, 50);
    setTitle(cleanTitle);
  };

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      return;
    }

    setIsUploading(true);
    setFile({ ...file, status: 'uploading' });

    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('category', category);
    formData.append('title', title.trim());

    try {
      const response = await fetch('/api/gallery/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${password}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'upload');
      }

      setFile({
        ...file,
        status: 'success',
        url: data.url,
      });
    } catch (error) {
      setFile({
        ...file,
        status: 'error',
        error: error instanceof Error ? error.message : 'Erreur inconnue',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const reset = () => {
    if (file) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
    setTitle('');
  };

  const charCount = title.length;
  const canUpload = file && file.status === 'pending' && title.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Upload d&apos;images
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Ajoutez de nouvelles photos à la galerie
        </p>
      </div>

      {/* Zone de catégorie */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label htmlFor="category-select">Catégorie</Label>
            <Select
              value={category}
              onValueChange={setCategory}
              disabled={isUploading}
            >
              <SelectTrigger id="category-select">
                <SelectValue placeholder="Choisir une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Zone de drop - affichée uniquement si pas de fichier */}
      {!file && !isProcessing && (
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            isDragging
              ? 'border-gray-600 bg-gray-50 dark:bg-gray-800'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
          }`}
        >
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
          <Upload
            className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4"
            aria-hidden="true"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-gray-600 dark:text-gray-300"
          >
            <span className="font-semibold text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
              Cliquez pour choisir
            </span>{' '}
            ou glissez-déposez une image
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            PNG, JPG, WebP jusqu&apos;à 10MB
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Conversion automatique en WebP (max 1440px)
          </p>
        </div>
      )}

      {/* Indicateur de traitement */}
      {isProcessing && (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Traitement en cours...
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Redimensionnement et conversion WebP
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Preview du fichier en pleine largeur */}
      {file && (
        <div className="space-y-4">
          {/* Input titre - 100% du bloc */}
          {file.status === 'pending' && (
            <div className="space-y-2">
              <Label htmlFor="image-title">
                Titre de l&apos;image <span className="text-gray-500">*</span>
              </Label>
              <Input
                id="image-title"
                type="text"
                value={title}
                onChange={(e) => updateTitle(e.target.value)}
                placeholder="Titre de l'image (obligatoire)"
                maxLength={50}
                className={
                  title.trim() === '' ? 'border-orange-300 focus-visible:ring-orange-500' : ''
                }
              />
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm ${
                    title.trim() === ''
                      ? 'text-orange-500'
                      : 'text-muted-foreground'
                  }`}
                >
                  {title.trim() === '' ? 'Titre requis' : 'Majuscules conservées'}
                </span>
                <span className="text-sm text-muted-foreground">
                  {charCount}/50
                </span>
              </div>
            </div>
          )}

          {/* Image - 100% du bloc */}
          <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 group">
            <div className="aspect-video relative">
              <Image
                src={file.preview}
                alt="Preview"
                fill
                className="object-contain"
              />

              {/* Status overlay */}
              {(file.status === 'uploading' || file.status === 'success' || file.status === 'error') && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  {file.status === 'uploading' && (
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
                  )}
                  {file.status === 'success' && (
                    <CheckCircle className="h-12 w-12 text-green-500" />
                  )}
                  {file.status === 'error' && (
                    <AlertCircle className="h-12 w-12 text-red-500" />
                  )}
                </div>
              )}

              {/* Bouton supprimer */}
              {file.status === 'pending' && (
                <button
                  onClick={removeFile}
                  className="absolute top-4 right-4 p-2 bg-gray-900 dark:bg-gray-800 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  aria-label="Supprimer"
                  type="button"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Message d'erreur */}
          {file.status === 'error' && file.error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">
                ❌ {file.error}
              </p>
            </div>
          )}

          {/* Message de succès */}
          {file.status === 'success' && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                ✓ Image uploadée avec succès : {title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                L&apos;image apparaîtra dans la galerie dans ~60 secondes
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {file.status === 'pending' && (
              <>
                <Button
                  onClick={handleUpload}
                  disabled={!canUpload || isUploading}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900 disabled:opacity-50"
                >
                  {isUploading ? 'Upload en cours...' : 'Uploader l\'image'}
                </Button>
                <Button
                  onClick={removeFile}
                  disabled={isUploading}
                  variant="outline"
                >
                  Annuler
                </Button>
              </>
            )}
            {(file.status === 'success' || file.status === 'error') && (
              <Button
                onClick={reset}
                className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900"
              >
                Uploader une autre image
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

