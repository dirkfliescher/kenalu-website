'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('[kenalu] Kritischer Fehler:', error);
  }, [error]);

  return (
    <html lang="de">
      <body style={{ fontFamily: 'Inter, sans-serif', background: '#FAF8F5', color: '#1A1F23', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', margin: 0 }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C5694A', marginBottom: '1rem' }}>Fehler</p>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem' }}>Unerwarteter Fehler</h1>
          <p style={{ color: '#6F7478', marginBottom: '2rem' }}>Bitte lade die Seite neu oder versuche es später erneut.</p>
          <button
            onClick={reset}
            style={{ padding: '0.75rem 1.5rem', background: '#12384B', color: '#FAF8F5', border: 'none', borderRadius: '6px', fontFamily: 'inherit', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Neu laden →
          </button>
        </div>
      </body>
    </html>
  );
}
