import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  imageSrc = "/hero-placeholder.svg",
  imageAlt = "Image du Marché de Noël MPR",
  primaryButtonText = "Découvrir le programme",
  primaryButtonHref = "/programme",
  secondaryButtonText,
  secondaryButtonHref,
}: HeroSectionProps) {
  return (
    <section className="from-noel-snow to-background relative overflow-hidden bg-gradient-to-br">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          {/* Content */}
          <div className="animate-fade-in-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-foreground text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="text-primary text-xl font-semibold sm:text-2xl">
                {subtitle}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground px-8 py-3 text-lg"
              >
                <Link href={primaryButtonHref}>{primaryButtonText}</Link>
              </Button>
              {secondaryButtonText && secondaryButtonHref && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-3 text-lg font-semibold"
                >
                  <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Image Section */}
          <div className="animate-fade-in-right relative">
            <div className="relative h-96 w-full overflow-hidden rounded-2xl shadow-2xl lg:h-[500px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 384px, (max-width: 768px) 500px, (max-width: 1024px) 450px, 600px"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating decorative elements */}
            <div
              className="bg-noel-gold animate-twinkle absolute -top-4 -right-4 h-8 w-8 rounded-full"
              aria-hidden="true"
            />
            <div
              className="bg-noel-red animate-twinkle absolute -bottom-4 -left-4 h-6 w-6 rounded-full"
              style={{ animationDelay: "1s" }}
              aria-hidden="true"
            />
            <div
              className="bg-noel-green animate-twinkle absolute top-1/2 -left-8 h-4 w-4 rounded-full"
              style={{ animationDelay: "2s" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div
        className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden"
        aria-hidden="true"
      >
        <div className="bg-noel-gold animate-twinkle absolute top-20 left-10 h-2 w-2 rounded-full" />
        <div
          className="bg-noel-red animate-twinkle absolute top-40 right-20 h-3 w-3 rounded-full"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="bg-noel-green animate-twinkle absolute bottom-20 left-1/4 h-2 w-2 rounded-full"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="bg-noel-gold animate-twinkle absolute right-1/3 bottom-40 h-3 w-3 rounded-full"
          style={{ animationDelay: "2.5s" }}
        />
      </div>
    </section>
  );
}
