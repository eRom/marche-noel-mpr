"use client";

import { useEffect } from 'react';
import { registerServiceWorker } from '@/app/register-sw';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    // Enregistrer le Service Worker uniquement en production
    if (process.env.NODE_ENV === 'production') {
      registerServiceWorker();
    }
  }, []);

  // Ce composant ne rend rien
  return null;
}

