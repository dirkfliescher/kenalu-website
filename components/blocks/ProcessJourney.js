'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProcessJourney({ blok }) {
  const steps = blok.pj_steps || [];
  const [active, setActive] = useState(0);

  if (steps.length === 0) return null;

  const current = steps[active];
  const fits = current.ps_fits
    ? current.ps_fits.split('\n').map(l => l.trim()).filter(Boolean)
    : [];

  return (
    <section className="pj-section">
      <div className="container">
        {blok.pj_eyebrow && (
          <p className="pj-eyebrow">{blok.pj_eyebrow}</p>
        )}

        {/* Schritt-Leiste */}
        <div className="pj-steps">
          {steps.map((step, i) => (
            <button
              key={step._uid}
              className={`pj-step${i === active ? ' pj-step--active' : ''}`}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
            >
              <span className="pj-step-n">{step.ps_number || String(i + 1).padStart(2, '0')}</span>
              <span className="pj-step-name">{step.ps_name}</span>
              <span className="pj-step-bar" />
            </button>
          ))}
        </div>

        {/* Inhalts-Panel */}
        <div className="pj-panel" key={active}>
          {current.ps_meta && (
            <p className="pj-panel-meta">{current.ps_meta}</p>
          )}
          {current.ps_headline && (
            <h3 className="pj-panel-headline">{current.ps_headline}</h3>
          )}
          {current.ps_description && (
            <p className="pj-panel-desc">{current.ps_description}</p>
          )}
          {fits.length > 0 && (
            <div className="pj-fits">
              {fits.map((fit, i) => (
                <p key={i} className="pj-fit">{fit}</p>
              ))}
            </div>
          )}
          {current.ps_link && (
            <div className="pj-panel-footer">
              <Link href={current.ps_link} className="pj-link">
                {current.ps_link_label || 'Alle Details →'}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
