'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('[kenalu] Seitenfehler:', error);
  }, [error]);

  return (
    <main className="error-page">
      <div className="container">
        <p className="section-label">Fehler</p>
        <h1 className="error-headline">Da ist etwas schiefgelaufen.</h1>
        <p className="error-sub">
          Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.
        </p>
        <div className="error-actions">
          <button className="btn btn-primary" onClick={reset}>
            Nochmals versuchen →
          </button>
          <a href="/" className="error-link">Zur Startseite</a>
        </div>
      </div>
    </main>
  );
}
