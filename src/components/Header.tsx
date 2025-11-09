"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Programme", href: "/programme" },
  { name: "Galerie", href: "/galerie" },
  { name: "Plan", href: "/plan" },
  { name: "À propos", href: "/a-propos" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle keyboard navigation on the button
  const handleButtonKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  };

  return (
    <header
      className="bg-background/95 border-border sticky top-0 z-50 border-b backdrop-blur-sm"
      role="banner"
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Navigation principale"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button - Left */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              onKeyDown={handleButtonKeyDown}
              className="text-muted-foreground hover:text-primary focus:text-primary transition-colors focus:outline-none"
              aria-label={
                isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Logo/Title - Center on mobile, Left on desktop */}
          <div className="absolute left-1/2 flex -translate-x-1/2 items-center md:relative md:left-auto md:translate-x-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/icon-192.png"
                alt="Logo Marché de Noël du MPR"
                width={32}
                height={32}
                className="hidden h-8 w-8 md:block"
                loading="lazy"
              />
              <span className="text-primary pt-1 text-lg font-bold">
                Marché de Noël
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "border-b-2 px-3 py-2 text-sm font-medium transition-all duration-200",
                  pathname === item.href
                    ? "text-primary border-primary"
                    : "text-muted-foreground hover:text-primary hover:border-primary border-transparent"
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}

            {/* Theme Toggle - Desktop */}
            <ThemeToggle />
          </div>

          {/* Theme Toggle - Mobile (Right) */}
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          id="mobile-menu"
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out md:hidden",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="bg-background/95 border-border space-y-1 border-t px-2 pt-2 pb-3 backdrop-blur-sm">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileMenu}
                className={cn(
                  "block border-l-4 px-3 py-2 text-base font-medium transition-all duration-200",
                  pathname === item.href
                    ? "text-primary border-primary"
                    : "text-muted-foreground hover:text-primary hover:border-primary border-transparent hover:scale-105"
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
