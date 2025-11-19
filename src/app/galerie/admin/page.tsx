"use client";

import { GalleryManager } from "@/components/GalleryManager";
import { GalleryUpload } from "@/components/GalleryUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Lock, Settings, Upload } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { authenticateAdmin } from "@/actions/gallery";
import { useState } from "react";

type TabType = "upload" | "manage";

export default function GalleryAdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("upload");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const formData = new FormData();
      formData.append("password", password);

      const result = await authenticateAdmin(formData);

      if (result.success) {
        setIsAuthenticated(true);
      } else {
        setError(result.error);
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-950">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-center text-2xl">
              <Lock className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              Administration Galerie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe"
                  required
                  aria-label="Mot de passe admin"
                  aria-required="true"
                  disabled={isPending}
                />
                {error && (
                  <p className="text-sm text-red-600" role="alert">
                    {error}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                disabled={isPending}
                aria-busy={isPending}
                aria-label={isPending ? "Connexion en cours..." : "Se connecter"}
              >
                {isPending ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Link
                href="/galerie"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
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
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
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
          <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("upload")}
                className={`flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === "upload"
                    ? "border-gray-900 text-gray-900 dark:border-gray-100 dark:text-gray-100"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <Upload size={18} />
                Upload
              </button>
              <button
                onClick={() => setActiveTab("manage")}
                className={`flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === "manage"
                    ? "border-gray-900 text-gray-900 dark:border-gray-100 dark:text-gray-100"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <Settings size={18} />
                Gestion
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === "upload" && <GalleryUpload password={password} />}
            {activeTab === "manage" && <GalleryManager password={password} />}
          </div>
        </div>
      </div>
    </div>
  );
}
