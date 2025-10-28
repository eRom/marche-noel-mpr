'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [category, setCategory] = useState<string>('ambiance');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/')
    );

    addFiles(droppedFiles);
  }, []);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const uploadFiles: UploadFile[] = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'pending',
    }));

    setFiles((prev) => [...prev, ...uploadFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const uploadFile = async (file: File, index: number) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('title', file.name.replace(/\.[^/.]+$/, ''));

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

      setFiles((prev) => {
        const newFiles = [...prev];
        newFiles[index] = {
          ...newFiles[index],
          status: 'success',
          url: data.url,
        };
        return newFiles;
      });
    } catch (error) {
      setFiles((prev) => {
        const newFiles = [...prev];
        newFiles[index] = {
          ...newFiles[index],
          status: 'error',
          error: error instanceof Error ? error.message : 'Erreur inconnue',
        };
        return newFiles;
      });
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);

    const pendingFiles = files
      .map((file, index) => ({ file, index }))
      .filter(({ file }) => file.status === 'pending');

    // Marquer comme uploading
    setFiles((prev) =>
      prev.map((file) =>
        file.status === 'pending' ? { ...file, status: 'uploading' } : file
      )
    );

    // Upload séquentiel pour éviter de surcharger
    for (const { file, index } of pendingFiles) {
      await uploadFile(file.file, index);
    }

    setIsUploading(false);
  };

  const clearAll = () => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    setFiles([]);
  };

  const pendingCount = files.filter((f) => f.status === 'pending').length;
  const successCount = files.filter((f) => f.status === 'success').length;
  const errorCount = files.filter((f) => f.status === 'error').length;

  return (
    <div className="space-y-6">
      {/* Zone de catégorie */}
      <Card>
        <CardContent className="pt-6">
          <label
            htmlFor="category-select"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Catégorie
          </label>
          <select
            id="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            disabled={isUploading}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Zone de drop */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          isDragging
            ? 'border-red-500 bg-red-50 dark:bg-red-900/10'
            : 'border-gray-300 dark:border-gray-600 hover:border-red-400'
        }`}
      >
        <input
          type="file"
          id="file-upload"
          multiple
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
          <span className="font-semibold text-red-600 dark:text-red-400 hover:text-red-500">
            Cliquez pour choisir
          </span>{' '}
          ou glissez-déposez vos images
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          PNG, JPG, WebP jusqu&apos;à 10MB
        </p>
      </div>

      {/* Preview des fichiers */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Fichiers ({files.length})
            </h3>
            <div className="flex gap-2">
              {successCount > 0 && (
                <span className="text-sm text-green-600 dark:text-green-400">
                  ✓ {successCount} uploadé{successCount > 1 ? 's' : ''}
                </span>
              )}
              {errorCount > 0 && (
                <span className="text-sm text-red-600 dark:text-red-400">
                  ✗ {errorCount} erreur{errorCount > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((uploadFile, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={uploadFile.preview}
                    alt={`Preview ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Status overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                  {uploadFile.status === 'uploading' && (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                  )}
                  {uploadFile.status === 'success' && (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  )}
                  {uploadFile.status === 'error' && (
                    <AlertCircle className="h-8 w-8 text-red-500" />
                  )}
                </div>

                {/* Bouton supprimer */}
                {uploadFile.status === 'pending' && (
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Supprimer"
                    type="button"
                  >
                    <X size={16} />
                  </button>
                )}

                {/* Message d'erreur */}
                {uploadFile.status === 'error' && uploadFile.error && (
                  <p className="absolute bottom-2 left-2 right-2 text-xs text-white bg-red-500 px-2 py-1 rounded">
                    {uploadFile.error}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleUpload}
              disabled={pendingCount === 0 || isUploading}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              {isUploading ? 'Upload en cours...' : `Uploader ${pendingCount} image${pendingCount > 1 ? 's' : ''}`}
            </Button>
            <Button
              onClick={clearAll}
              disabled={isUploading}
              variant="outline"
            >
              Tout effacer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

