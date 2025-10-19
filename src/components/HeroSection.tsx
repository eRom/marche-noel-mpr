import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
  secondaryButtonText = "Visiter la boutique",
  secondaryButtonHref = "/boutique",
}: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-noel-snow to-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {title}
              </h1>
              <p className="text-xl sm:text-2xl text-primary font-semibold">
                {subtitle}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-3 text-lg font-semibold"
              >
                <Link href={primaryButtonHref}>
                  {primaryButtonText}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-3 text-lg font-semibold"
              >
                <Link href={secondaryButtonHref}>
                  {secondaryButtonText}
                </Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in-right">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
              />
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-noel-gold rounded-full animate-twinkle" />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-noel-red rounded-full animate-twinkle" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 -left-8 w-4 h-4 bg-noel-green rounded-full animate-twinkle" style={{ animationDelay: "2s" }} />
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-noel-gold rounded-full animate-twinkle" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-noel-red rounded-full animate-twinkle" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-noel-green rounded-full animate-twinkle" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-noel-gold rounded-full animate-twinkle" style={{ animationDelay: "2.5s" }} />
      </div>
    </section>
  );
}
