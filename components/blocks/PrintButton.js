'use client';

import { useEffect } from 'react';

export default function PrintButton() {
  useEffect(() => {
    // Vor dem Drucken: alle Projekt-Akkordeons aufklappen
    const beforePrint = () => {
      document.querySelectorAll('details.dp-project-item').forEach(d => { d.open = true; });
    };
    // Danach: wieder zuklappen
    const afterPrint = () => {
      document.querySelectorAll('details.dp-project-item').forEach(d => { d.open = false; });
    };
    window.addEventListener('beforeprint', beforePrint);
    window.addEventListener('afterprint', afterPrint);
    return () => {
      window.removeEventListener('beforeprint', beforePrint);
      window.removeEventListener('afterprint', afterPrint);
    };
  }, []);

  return (
    <button className="dp-print-btn" onClick={() => window.print()} aria-label="Als PDF drucken">
      ↓ PDF / Drucken
    </button>
  );
}
