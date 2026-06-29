'use client';
import { useEffect } from 'react';

export default function SpacebarNav() {
  useEffect(() => {
    function getSections() {
      return Array.from(document.querySelectorAll('section'));
    }

    function onKeyDown(e) {
      if (e.code !== 'Space') return;

      // Nicht abfangen wenn Focus in Formularfeldern
      const tag = document.activeElement?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(tag)) return;
      if (document.activeElement?.isContentEditable) return;

      e.preventDefault();

      const sections = getSections();
      const scrollY = window.scrollY;
      const tolerance = 10; // px Toleranz damit die aktuelle Sektion nicht nochmal zählt

      if (e.shiftKey) {
        // Shift+Space: vorherige Sektion
        const prev = [...sections]
          .reverse()
          .find(s => s.offsetTop < scrollY - tolerance);
        if (prev) {
          window.scrollTo({ top: prev.offsetTop, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        // Space: nächste Sektion
        const next = sections.find(s => s.offsetTop > scrollY + tolerance);
        if (next) {
          window.scrollTo({ top: next.offsetTop, behavior: 'smooth' });
        }
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return null;
}
