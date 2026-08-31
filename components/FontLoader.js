'use client';

import { useEffect } from 'react';

/**
 * FontLoader — lädt Satoshi von Fontshare nicht-blockierend.
 * Verhindert "render-blocking requests" im PageSpeed-Audit.
 * Wird in layout.js im <body> eingebunden.
 */
export default function FontLoader() {
  useEffect(() => {
    if (document.querySelector('link[data-font="satoshi"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap';
    link.crossOrigin = 'anonymous';
    link.setAttribute('data-font', 'satoshi');
    document.head.appendChild(link);
  }, []);

  return null;
}
