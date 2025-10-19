"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Programme", href: "/programme" },
  { name: "Boutique", href: "/boutique" },
  { name: "Merci", href: "/merci" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navigation principale">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/icon-192.png"
                alt="Logo Marché de Noël du MPR"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-bold text-lg text-gray-900 dark:text-white">Marché de Noël du MPR</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-noel-red bg-red-50 dark:bg-red-900/20"
                    : "text-gray-700 dark:text-gray-300 hover:text-noel-red hover:bg-red-50 dark:hover:bg-red-900/20"
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              className="text-gray-700 dark:text-gray-300 hover:text-noel-red focus:outline-none focus:text-noel-red"
              aria-label="Ouvrir le menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
