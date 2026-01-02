import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
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
    </div>
  );
}
