"use client";

import { GalleryManager } from "@/components/GalleryManager";
import { GalleryUpload } from "@/components/GalleryUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Lock, Settings, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type TabType = "upload" | "manage";

export default function GalleryAdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("upload");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/gallery/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
      } else {
        setError(data.error || "Mot de passe incorrect");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setError("Erreur de connexion");
    }
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
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Entrez le mot de passe"
                  required
                />
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>
              <Button
                type="submit"
                className="w-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Se connecter
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
