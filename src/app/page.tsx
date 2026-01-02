import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load all non-critical components
const Header = dynamic(() => import("@/components/Header"), {
  loading: () => <div className="bg-background h-16" />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="bg-muted h-32" />,
});

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main
        id="main-content"
        role="main"
        className="flex flex-grow items-center justify-center"
      >
        <div className="p-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Marché de Noël terminé
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            L&apos;édition 2025 est terminée. Merci à tous pour votre
            participation !
          </p>
          <Link
            href="/2025"
            className="text-primary font-medium hover:underline"
          >
            Voir les souvenirs de 2025
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
