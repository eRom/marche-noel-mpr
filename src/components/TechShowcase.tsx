"use client";

import { motion } from 'framer-motion';
import {
  Accessibility,
  CheckCircle2,
  Search,
  Share2,
  Shield,
  Smartphone,
  TrendingUp,
  Zap
} from 'lucide-react';
import CircularProgress from './CircularProgress';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

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
      id: 'performance',
      title: 'Performance',
      icon: <Zap className="w-6 h-6" />,
      score: 95,
      description: 'Optimisations poussées pour une expérience ultra-rapide',
      metrics: [
        { label: 'LCP', value: '1.2s' },
        { label: 'FID', value: '< 100ms' },
        { label: 'CLS', value: '0.02' },
      ],
      gridClass: '',
    },
    {
      id: 'seo',
      title: 'SEO',
      icon: <Search className="w-6 h-6" />,
      score: 100,
      description: 'Référencement naturel optimisé',
      metrics: [
        { label: 'Sitemap', value: '✓' },
        { label: 'Meta Tags', value: '✓' },
        { label: 'Schema.org', value: '✓' },
      ],
      gridClass: '',
    },
    {
      id: 'accessibility',
      title: 'Accessibilité',
      icon: <Accessibility className="w-6 h-6" />,
      score: 100,
      description: 'WCAG AA conforme',
      metrics: [
        { label: 'ARIA', value: '✓' },
        { label: 'Contraste', value: '✓' },
        { label: 'Navigation clavier', value: '✓' },
      ],
      gridClass: '',
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      icon: <TrendingUp className="w-6 h-6" />,
      score: 100,
      description: 'Respect des standards web modernes',
      metrics: [
        { label: 'HTTPS', value: '✓' },
        { label: 'Dépendances', value: 'À jour' },
        { label: 'CSP', value: '✓' },
      ],
      gridClass: '',
    },
  ];

  // Deuxième ligne : Responsive, OpenGraph, PWA, RGPD
  const secondaryMetrics: TechMetric[] = [
    {
      id: 'responsive',
      title: 'Responsive',
      icon: <Smartphone className="w-6 h-6" />,
      badge: 'Mobile-First',
      description: 'Design adaptatif pour tous les écrans',
      metrics: [
        { label: 'Breakpoints', value: '5' },
        { label: 'Touch-friendly', value: '✓' },
      ],
      gridClass: 'md:col-span-1',
    },
    {
      id: 'opengraph',
      title: 'OpenGraph',
      icon: <Share2 className="w-6 h-6" />,
      badge: 'Optimisé',
      description: 'Partage social enrichi et optimisé',
      metrics: [
        { label: 'Twitter Card', value: '✓' },
        { label: 'OG Images', value: '✓' },
        { label: 'Structured Data', value: '✓' },
      ],
      gridClass: 'md:col-span-1',
    },
    {
      id: 'pwa',
      title: 'PWA',
      icon: <CheckCircle2 className="w-6 h-6" />,
      badge: 'Installable',
      description: 'Progressive Web App complète avec mode offline',
      metrics: [
        { label: 'Service Worker', value: '✓' },
        { label: 'Manifest', value: '✓' },
        { label: 'Cache stratégies', value: '3' },
      ],
      gridClass: 'md:col-span-1',
    },
    {
      id: 'rgpd',
      title: 'RGPD',
      icon: <Shield className="w-6 h-6" />,
      badge: 'Conforme',
      description: 'Respect total de la vie privée',
      metrics: [
        { label: 'Cookies', value: '0' },
        { label: 'Tracking', value: '0' },
        { label: 'Analytics', value: '0' },
      ],
      gridClass: 'md:col-span-1',
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
          className="text-center space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Excellence Technique
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un site pensé pour la performance, l&apos;accessibilité et l&apos;expérience utilisateur
          </p>
        </motion.div>

        {/* Première grille : Scores principaux */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mainMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {metric.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{metric.title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Score gauge */}
                  {metric.score !== undefined && (
                    <div className="flex justify-center my-6">
                      <CircularProgress
                        value={metric.score}
                        size={100}
                        strokeWidth={8}
                        delay={index * 0.1}
                      />
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    {metric.description}
                  </p>

                  {/* Metrics */}
                  {metric.metrics && (
                    <div className="space-y-2 pt-4 border-t border-border">
                      {metric.metrics.map((m, i) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{m.label}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          {secondaryMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className={metric.gridClass}
            >
              <Card className="h-full p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                        {metric.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">{metric.title}</h3>
                        {metric.badge && (
                          <Badge variant="secondary" className="mt-1">
                            {metric.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-3">
                    {metric.description}
                  </p>

                  {/* Metrics */}
                  {metric.metrics && (
                    <div className="space-y-1 pt-2 border-t border-border mt-auto">
                      {metric.metrics.map((m, i) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{m.label}</span>
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

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center pt-8"
        >
          <p className="text-sm text-muted-foreground">
            Scores basés sur les derniers audits Lighthouse • Tests automatisés et manuels
          </p>
        </motion.div>
      </div>
    </section>
  );
}

