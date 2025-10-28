'use client';

import { GalleryManager } from '@/components/GalleryManager';
import { GalleryUpload } from '@/components/GalleryUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Lock, Settings, Upload } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type TabType = 'upload' | 'manage';

export default function GalleryAdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('upload');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/gallery/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
      } else {
        setError(data.error || 'Mot de passe incorrect');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError('Erreur de connexion');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Lock className="h-6 w-6 text-gray-600 dark:text-gray-400" />
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Entrez le mot de passe"
                  required
                />
                {error && (
                  <p className="text-red-600 text-sm mt-2">{error}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900"
              >
                Se connecter
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Link
                href="/galerie"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Administration Galerie
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gérez vos photos de galerie
              </p>
            </div>
            <Link href="/galerie">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft size={18} />
                Retour
              </Button>
            </Link>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-6 py-3 font-medium text-sm transition-colors flex items-center gap-2 border-b-2 ${
                  activeTab === 'upload'
                    ? 'border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Upload size={18} />
                Upload
              </button>
              <button
                onClick={() => setActiveTab('manage')}
                className={`px-6 py-3 font-medium text-sm transition-colors flex items-center gap-2 border-b-2 ${
                  activeTab === 'manage'
                    ? 'border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Settings size={18} />
                Gestion
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === 'upload' && <GalleryUpload password={password} />}
            {activeTab === 'manage' && <GalleryManager password={password} />}
          </div>
        </div>
      </div>
    </div>
  );
}

