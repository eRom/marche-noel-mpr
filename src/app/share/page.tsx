"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Image, Link, Share2 } from "lucide-react";

export default function SharePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Partagez la magie de Noël
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Faites découvrir le Marché de Noël MPR à vos proches et partagez vos moments préférés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Link className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Partager le lien</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Partagez l&apos;URL du site avec vos amis et votre famille.
              </p>
              <Button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Marché de Noël MPR',
                      text: 'Découvrez la magie de Noël au cœur de Nantes !',
                      url: window.location.origin
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.origin);
                    alert('Lien copié dans le presse-papiers !');
                  }
                }}
                className="w-full"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Image className="w-6 h-6 text-secondary" aria-label="Icône photo" />
                </div>
                <CardTitle className="text-lg">Partager des photos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Partagez vos photos du marché de Noël avec la communauté.
              </p>
              <Button 
                onClick={() => {
                  // Ouvrir un sélecteur de fichiers
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.multiple = true;
                  input.onchange = (e) => {
                    const target = e.target as HTMLInputElement;
                    const files = Array.from(target.files || []);
                    if (files.length > 0) {
                      alert(`${files.length} photo(s) sélectionnée(s) !`);
                      // Ici vous pourriez implémenter l'upload
                    }
                  };
                  input.click();
                }}
                variant="outline"
                className="w-full"
              >
                <Image className="w-4 h-4 mr-2" aria-label="Icône photo" />
                Sélectionner des photos
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-lg">Partager un avis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Partagez votre expérience et vos impressions sur l&apos;événement.
              </p>
              <Button 
                onClick={() => {
                  const text = prompt('Partagez votre avis sur le Marché de Noël MPR :');
                  if (text) {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Mon avis sur le Marché de Noël MPR',
                        text: text,
                        url: window.location.origin
                      });
                    } else {
                      navigator.clipboard.writeText(text);
                      alert('Avis copié dans le presse-papiers !');
                    }
                  }
                }}
                variant="outline"
                className="w-full"
              >
                <FileText className="w-4 h-4 mr-2" />
                Partager un avis
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                QR Code pour partage rapide
              </h3>
              <p className="text-muted-foreground mb-6">
                Scannez ce QR code pour accéder rapidement au site depuis votre téléphone.
              </p>
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <img
                    src="/qr-code.png"
                    alt="QR code pour le Marché de Noël MPR"
                    width={128}
                    height={128}
                    className="w-32 h-32"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Link href="/">
            <Button variant="outline">
              Retour à l&apos;accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
