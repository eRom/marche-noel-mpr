'use client';

import { GalleryUpload } from '@/components/GalleryUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Lock } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function GalleryAdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérification simple du mot de passe
    // En production, utilisez une vraie authentification
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Lock className="h-6 w-6 text-red-600" />
              Administration Galerie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Entrez le mot de passe"
                  required
                />
                {error && (
                  <p className="text-red-600 text-sm mt-2">{error}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Se connecter
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Link
                href="/galerie"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              >
                ← Retour à la galerie
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-red-700 dark:text-red-500 mb-2">
                Administration Galerie
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Uploadez de nouvelles photos pour la galerie
              </p>
            </div>
            <Link href="/galerie">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft size={18} />
                Retour
              </Button>
            </Link>
          </div>

          {/* Upload Component */}
          <GalleryUpload password={password} />

          {/* Instructions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>• Sélectionnez la catégorie appropriée avant d&apos;uploader</p>
              <p>• Les images seront automatiquement optimisées</p>
              <p>• Formats acceptés : JPG, PNG, WebP (max 10MB)</p>
              <p>• Vous pouvez uploader plusieurs images à la fois</p>
              <p>• Les images apparaîtront immédiatement dans la galerie</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

