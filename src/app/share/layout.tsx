import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partager - Marché de Noël MPR Nantes",
  description: "Partagez la magie du Marché de Noël MPR avec vos proches ! Partagez le lien, vos photos et téléchargez le programme complet. Faites découvrir cette expérience festive à votre famille et vos amis.",
};

export default function ShareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
