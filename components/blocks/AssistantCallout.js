'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// HomeChat wird erst geladen, wenn der Nutzer explizit auf den CTA klickt
const HomeChat = dynamic(() => import('./HomeChat'), { ssr: false });

export default function AssistantCallout({ blok }) {
  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return <HomeChat />;
  }

  return (
    <section className="ac-section">
      <div className="container container--narrow">
        <div className="ac-card">
          {blok.eyebrow && <p className="section-label ac-eyebrow">{blok.eyebrow}</p>}
          {blok.headline && <h2 className="ac-headline">{blok.headline}</h2>}
          {blok.text && <p className="ac-text">{blok.text}</p>}
          <button
            className="btn btn-outline ac-btn"
            onClick={() => setExpanded(true)}
            type="button"
          >
            {blok.cta_label || 'Situation mit Kai einordnen →'}
          </button>
          {blok.notice && <p className="ac-notice">{blok.notice}</p>}
        </div>
      </div>
    </section>
  );
}
