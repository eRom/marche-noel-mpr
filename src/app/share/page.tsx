"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Link2, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SharePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold sm:text-5xl">
            Partagez la magie de Noël
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Faites découvrir le Marché de Noël du MPR de Nantes à vos proches et
            partagez vos moments préférés.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Link2 className="text-primary h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Partager le lien</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                Partagez l&apos;URL du site avec vos amis et votre famille.
              </p>
              <Button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Marché de Noël MPR",
                      text: "Découvrez la magie de Noël au cœur de Nantes !",
                      url: window.location.origin,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.origin);
                    alert("Lien copié dans le presse-papiers !");
                  }
                }}
                className="w-full"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-accent/10 rounded-lg p-2">
                  <FileText className="text-accent h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Partager un avis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                Partagez votre expérience sur l&apos;événement.
              </p>
              <Button
                onClick={() => {
                  const text = prompt(
                    "Partagez votre avis sur le Marché de Noël MPR :"
                  );
                  if (text) {
                    if (navigator.share) {
                      navigator.share({
                        title: "Mon avis sur le Marché de Noël MPR",
                        text: text,
                        url: window.location.origin,
                      });
                    } else {
                      navigator.clipboard.writeText(text);
                      alert("Avis copié dans le presse-papiers !");
                    }
                  }
                }}
                variant="outline"
                className="w-full"
              >
                <FileText className="mr-2 h-4 w-4" />
                Partager un avis
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="from-primary/5 to-secondary/5 border-primary/20 bg-gradient-to-r">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-foreground mb-4 text-xl font-semibold">
                QR Code pour partage rapide
              </h3>
              <p className="text-muted-foreground mb-6">
                Scannez ce QR code pour accéder rapidement au site depuis votre
                téléphone.
              </p>
              <div className="flex justify-center">
                <div className="rounded-lg bg-white p-4 shadow-lg">
                  <Image
                    src="/qr-code.png"
                    alt="QR code - Scannez pour accéder au site du Marché de Noël du MPR"
                    width={128}
                    height={128}
                    className="h-32 w-32"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline">Retour à l&apos;accueil</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
