"use client";

import { motion } from "framer-motion";
import {
  Accessibility,
  CheckCircle2,
  Search,
  Share2,
  Shield,
  Smartphone,
  TrendingUp,
  Zap,
} from "lucide-react";
import CircularProgress from "./CircularProgress";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

interface TechMetric {
  id: string;
  title: string;
  icon: React.ReactNode;
  score?: number;
  badge?: string;
  description: string;
  metrics?: { label: string; value: string }[];
  gridClass: string;
}

export default function TechShowcase() {
  // Première ligne : Performance, SEO, Accessibilité, Best Practices
  const mainMetrics: TechMetric[] = [
    {
      id: "performance",
      title: "Performance",
      icon: <Zap className="h-6 w-6" />,
      score: 100,
      description: "Optimisations poussées pour une expérience ultra-rapide",
      metrics: [
        { label: "LCP", value: "0.6s" },
        { label: "FID", value: "< 100ms" },
        { label: "CLS", value: "0.001" },
      ],
      gridClass: "",
    },
    {
      id: "seo",
      title: "SEO",
      icon: <Search className="h-6 w-6" />,
      score: 100,
      description: "Référencement naturel optimisé",
      metrics: [
        { label: "Sitemap", value: "✓" },
        { label: "Meta Tags", value: "✓" },
        { label: "Schema.org", value: "✓" },
      ],
      gridClass: "",
    },
    {
      id: "accessibility",
      title: "Accessibilité",
      icon: <Accessibility className="h-6 w-6" />,
      score: 100,
      description: "WCAG AA conforme",
      metrics: [
        { label: "ARIA", value: "✓" },
        { label: "Contraste", value: "✓" },
        { label: "Navigation clavier", value: "✓" },
      ],
      gridClass: "",
    },
    {
      id: "best-practices",
      title: "Best Practices",
      icon: <TrendingUp className="h-6 w-6" />,
      score: 100,
      description: "Respect des standards web modernes",
      metrics: [
        { label: "HTTPS", value: "✓" },
        { label: "Dépendances", value: "À jour" },
        { label: "CSP", value: "✓" },
      ],
      gridClass: "",
    },
  ];

  // Deuxième ligne : Responsive, OpenGraph, PWA, RGPD
  const secondaryMetrics: TechMetric[] = [
    {
      id: "responsive",
      title: "Responsive",
      icon: <Smartphone className="h-6 w-6" />,
      badge: "Mobile-First",
      description: "Design adaptatif pour tous les écrans",
      metrics: [
        { label: "Breakpoints", value: "5" },
        { label: "Touch-friendly", value: "✓" },
      ],
      gridClass: "md:col-span-1",
    },
    {
      id: "opengraph",
      title: "OpenGraph",
      icon: <Share2 className="h-6 w-6" />,
      badge: "Optimisé",
      description: "Partage social enrichi et optimisé",
      metrics: [
        { label: "Twitter Card", value: "✓" },
        { label: "OG Images", value: "✓" },
        { label: "Structured Data", value: "✓" },
      ],
      gridClass: "md:col-span-1",
    },
    {
      id: "pwa",
      title: "PWA",
      icon: <CheckCircle2 className="h-6 w-6" />,
      badge: "Installable",
      description: "Progressive Web App complète avec mode offline",
      metrics: [
        { label: "Service Worker", value: "✓" },
        { label: "Manifest", value: "✓" },
        { label: "Cache stratégies", value: "3" },
      ],
      gridClass: "md:col-span-1",
    },
    {
      id: "rgpd",
      title: "RGPD",
      icon: <Shield className="h-6 w-6" />,
      badge: "Conforme",
      description: "Respect total de la vie privée",
      metrics: [
        { label: "Cookies", value: "0" },
        { label: "Tracking", value: "0" },
        { label: "Analytics", value: "0" },
      ],
      gridClass: "md:col-span-1",
    },
  ];

  return (
    <section className="py-12">
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Excellence Technique
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Un site pensé pour la performance, l&apos;accessibilité et
            l&apos;expérience utilisateur
          </p>
        </motion.div>

        {/* Première grille : Scores principaux */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {mainMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group relative h-full overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                {/* Glow effect on hover */}
                <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10 flex h-full flex-col">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 text-primary rounded-lg p-2">
                        {metric.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {metric.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Score gauge */}
                  {metric.score !== undefined && (
                    <div className="my-6 flex justify-center">
                      <CircularProgress
                        value={metric.score}
                        size={100}
                        strokeWidth={8}
                        delay={index * 0.1}
                      />
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 flex-grow text-sm">
                    {metric.description}
                  </p>

                  {/* Metrics */}
                  {metric.metrics && (
                    <div className="border-border space-y-2 border-t pt-4">
                      {metric.metrics.map((m, i) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">
                            {m.label}
                          </span>
                          <span className="font-medium">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Deuxième grille : Features complémentaires */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
          {secondaryMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className={metric.gridClass}
            >
              <Card className="group relative h-full overflow-hidden p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                {/* Glow effect on hover */}
                <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10 flex h-full flex-col">
                  {/* Header */}
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 text-primary rounded-lg p-1.5">
                        {metric.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold">
                          {metric.title}
                        </h3>
                        {metric.badge && (
                          <Badge variant="secondary" className="mt-1">
                            {metric.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-3 text-sm">
                    {metric.description}
                  </p>

                  {/* Metrics */}
                  {metric.metrics && (
                    <div className="border-border mt-auto space-y-1 border-t pt-2">
                      {metric.metrics.map((m, i) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">
                            {m.label}
                          </span>
                          <span className="font-medium">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
