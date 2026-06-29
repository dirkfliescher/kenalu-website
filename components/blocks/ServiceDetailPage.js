import Link from 'next/link';
import ServiceChat from './ServiceChat';

/**
 * Service Detail Page — v3
 * Props:
 *   headline       – H1, aus Storyblok
 *   intro          – Lead-Text, aus Storyblok
 *   fitPoints      – Array<string>, aus Storyblok
 *   storyText      – String, Situationsvignette (Absätze mit \n\n), aus Storyblok
 *   outcomePoints  – Array<string>, aus Storyblok
 *   ctaLabel       – Button-Label, aus Storyblok
 *   serviceName    – Kontext für Kai, hardcoded in page.js
 *   servicePrompts – Starter-Prompts für Kai, hardcoded in page.js
 *   serviceKicker  – Kurzes Kategorie-Label (ersetzt "Leistung 01"), hardcoded in page.js
 *   processMeta    – Zeitrahmen z.B. "2 Wochen", hardcoded in page.js
 *   serviceIndex   – Ziffer für dekoratives Hintergrund-Element (1–4), hardcoded in page.js
 */
export default function ServiceDetailPage({
  headline,
  intro,
  fitPoints = [],
  storyText,
  outcomePoints = [],
  ctaLabel = 'Gespräch anfragen',
  serviceName = '',
  servicePrompts = [],
  serviceKicker = '',
  processMeta = '',
  serviceIndex = '',
}) {
  const storyParagraphs = storyText
    ? storyText.split('\n\n').map(p => p.trim()).filter(Boolean)
    : [];

  const numDisplay = serviceIndex ? String(serviceIndex).padStart(2, '0') : '';

  return (
    <div>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="sdp-hero">
        {numDisplay && (
          <span className="sdp-hero-num" aria-hidden="true">{numDisplay}</span>
        )}
        <div className="container sdp-hero-inner">
          {serviceKicker && <p className="sdp-kicker">{serviceKicker}</p>}
          <h1 className="sdp-headline">{headline}</h1>
          {(intro || processMeta) && (
            <div className="sdp-hero-foot">
              {intro && <p className="sdp-intro">{intro}</p>}
              {processMeta && (
                <div className="sdp-process-meta">
                  <span className="sdp-process-meta-label">Rahmen</span>
                  <span className="sdp-process-meta-value">{processMeta}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Substance: Was entsteht + Passt für euch ────────────────── */}
      {(outcomePoints.length > 0 || fitPoints.length > 0) && (
        <section className="sdp-substance">
          <div className="container sdp-substance-grid">
            {outcomePoints.length > 0 && (
              <div className="sdp-col">
                <p className="sdp-col-label">Was entsteht</p>
                <ul className="sdp-outcomes">
                  {outcomePoints.map((point, i) => (
                    <li key={i} className="sdp-outcome">{point}</li>
                  ))}
                </ul>
              </div>
            )}
            {fitPoints.length > 0 && (
              <div className={`sdp-col${outcomePoints.length > 0 ? ' sdp-col--divided' : ''}`}>
                <p className="sdp-col-label">Passt für euch, wenn…</p>
                <div className="sdp-fit">
                  {fitPoints.map((point, i) => (
                    <p key={i} className="sdp-fit-item">{point}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Situation ───────────────────────────────────────────────── */}
      {storyParagraphs.length > 0 && (
        <section className="sdp-story">
          <div className="container">
            <p className="sdp-col-label sdp-col-label--light">Eine Situation</p>
            <p className="sdp-story-lead">{storyParagraphs[0]}</p>
            {storyParagraphs.length > 1 && (
              <div className="sdp-story-rest">
                {storyParagraphs.slice(1).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Kai – Service-spezifischer Chat ─────────────────────────── */}
      <ServiceChat serviceName={serviceName} servicePrompts={servicePrompts} />

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="sdp-cta">
        <div className="container container--narrow">
          <Link href="/contact" className="btn btn-primary">
            {ctaLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
