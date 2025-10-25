module.exports = {
  // Configuration axe-core/cli pour le projet Marché de Noël MPR
  
  // URLs à tester
  urls: [
    'http://localhost:3000',
    'http://localhost:3000/programme',
    'http://localhost:3000/merci',
  ],
  
  // Règles d'accessibilité à appliquer
  rules: {
    // Règles critiques pour un site événementiel
    'color-contrast': { enabled: true },
    'keyboard-navigation': { enabled: true },
    'focus-order-semantics': { enabled: true },
    'aria-allowed-attr': { enabled: true },
    'aria-required-attr': { enabled: true },
    'aria-roles': { enabled: true },
    'aria-valid-attr-value': { enabled: true },
    'alt-text': { enabled: true },
    'button-name': { enabled: true },
    'form-field-multiple-labels': { enabled: true },
    'heading-order': { enabled: true },
    'html-has-lang': { enabled: true },
    'image-alt': { enabled: true },
    'label': { enabled: true },
    'link-name': { enabled: true },
    'list': { enabled: true },
    'page-has-heading-one': { enabled: true },
    'region': { enabled: true },
    'tabindex': { enabled: true },
    
    // Règles spécifiques pour les composants interactifs
    'aria-expanded': { enabled: true },
    'aria-hidden-focus': { enabled: true },
    'aria-unsupported-elements': { enabled: true },
    'click-events-have-key-events': { enabled: true },
    'interactive-supports-focus': { enabled: true },
    'no-autofocus': { enabled: true },
    'role-has-required-aria-props': { enabled: true },
    'role-supports-aria-props': { enabled: true },
  },
  
  // Tags à inclure (WCAG 2.1 AA par défaut)
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
  
  // Options de rapport
  reporter: 'json',
  output: './aria-reports',
  
  // Options de navigation
  timeout: 30000,
  delay: 1000,
  
  // Configuration du navigateur
  browser: 'chrome',
  headless: true,
  
  // Options de performance
  maxParallel: 1,
  
  // Configuration spécifique au projet
  viewport: {
    width: 1280,
    height: 720,
  },
  
  // Règles spécifiques pour les thèmes sombre/clair
  // (axe-core testera automatiquement les deux si détectés)
};
