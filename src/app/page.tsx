import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main
        id="main-content"
        role="main"
        className="flex flex-grow items-center justify-center"
      >
        <div className="p-8 text-center">
          <Image
            src="/souvenir-2025.webp"
            alt="Souvenir du Marché de Noël 2025"
            width={1200}
            height={655}
            className="mx-auto mb-8 h-auto w-full max-w-2xl rounded-lg shadow-lg"
            priority
          />
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Marché de Noël terminé
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            L&apos;édition 2025 est terminée. Merci à tous pour votre
            participation !
          </p>
        </div>
      </main>
    </div>
  );
}
