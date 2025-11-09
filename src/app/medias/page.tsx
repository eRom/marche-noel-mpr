import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { VideoCard } from "@/components/VideoCard";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const AnimatedSection = dynamic(() => import("@/components/AnimatedSection"), {
  loading: () => <div />,
  ssr: true,
});

export const metadata: Metadata = {
  title: "Médias - Marché de Noël du MPR",
  description:
    "Découvrez les vidéos du marché de Noël du MPR à Nantes. Revivez les moments magiques, les animations et l'ambiance festive de cet événement exceptionnel.",
  openGraph: {
    title: "Médias - Marché de Noël du MPR",
    description:
      "Revivez les moments magiques du Marché de Noël du MPR à travers nos vidéos.",
    type: "website",
  },
};

const videos = [
  {
    src: "/medias/video.mp4",
    title: "Animation du marché de Noël",
    description:
      "Découvrez l'ambiance festive du marché de Noël du MPR de Nantes !",
  },
  {
    src: "/medias/marche-noel-mpr-paysage.mp4",
    title: "Joyeux Noël !",
    description: "Joyeux Noël du MPR de Nantes !",
  },
];

export default function MediasPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main id="main-content" role="main">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fadeInUp">
              <header className="mb-6 text-center">
                <h1 className="text-primary text-4xl font-bold md:text-5xl">
                  Médias
                </h1>
                <Separator className="mx-auto my-6 w-24" />
                <p className="text-muted-foreground text-lg">
                  Découvrez les vidéos du Marché de Noël du MPR
                </p>
                <p className="text-muted-foreground mt-2 text-sm">
                  {videos.length} vidéo{videos.length > 1 ? "s" : ""} disponible
                  {videos.length > 1 ? "s" : ""}
                </p>
              </header>
            </AnimatedSection>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {videos.map((video, index) => (
              <AnimatedSection
                key={video.src}
                animation="fadeInUp"
                delay={index * 100}
                className="h-full"
              >
                <VideoCard
                  src={video.src}
                  title={video.title}
                  description={video.description}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
