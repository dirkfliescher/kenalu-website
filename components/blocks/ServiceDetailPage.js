import Link from 'next/link';
import ServiceChat from './ServiceChat';

/**
 * Shared template for all 4 service detail pages.
 * Props:
 *   eyebrow        – small label above H1, e.g. "Leistung 01"
 *   headline       – H1
 *   intro          – lead paragraph
 *   fitPoints      – Array<string>   "Passt für euch, wenn…"
 *   storyText      – String          Narrative Fliesstext (Absätze mit \n\n)
 *   outcomePoints  – Array<string>   "Was ihr bekommt"
 *   ctaLabel       – Button label
 *   serviceName    – String for ServiceChat context (e.g. "Klarheit")
 *   servicePrompts – Array<string> starter prompts for ServiceChat
 */
export default function ServiceDetailPage({
  eyebrow,
  headline,
  intro,
  fitPoints = [],
  storyText,
  outcomePoints = [],
  ctaLabel = 'Gespräch anfragen',
  serviceName = '',
  servicePrompts = [],
}) {
  const storyParagraphs = storyText
    ? storyText.split('\n\n').map((p) => p.trim()).filter(Boolean)
    : [];

  // Grosse Zahl aus Eyebrow extrahieren (z.B. "Leistung 01" → "01")
  const heroNumber = eyebrow ? eyebrow.replace(/[^0-9]/g, '') : '';

  return (
    <div>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="sdp-hero">
        {heroNumber && (
          <span className="sdp-hero-number" aria-hidden="true">{heroNumber}</span>
        )}
        <div className="container container--narrow sdp-hero-content">
          {eyebrow && <p className="section-label sdp-hero-eyebrow">{eyebrow}</p>}
          <h1>{headline}</h1>
          {intro && <p className="sdp-hero-intro">{intro}</p>}
        </div>
      </section>

      {/* ── Fit ─────────────────────────────────────────────────────── */}
      {fitPoints.length > 0 && (
        <section className="sdp-fit">
          <div className="container container--narrow">
            <p className="sdp-section-label">Passt für euch, wenn…</p>
            <div className="sdp-fit-grid">
              {fitPoints.map((point, i) => (
                <div key={i} className="sdp-fit-item">
                  <span className="sdp-fit-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="sdp-fit-text">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Story ───────────────────────────────────────────────────── */}
      {storyParagraphs.length > 0 && (
        <section className="sdp-story">
          <div className="container container--narrow">
            <p className="sdp-section-label sdp-section-label--light">So könnte es aussehen</p>
            <div className="sdp-story-inner">
              <p className="sdp-story-lede">{storyParagraphs[0]}</p>
              {storyParagraphs.length > 1 && (
                <div className="sdp-story-body">
                  {storyParagraphs.slice(1).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Outcomes ────────────────────────────────────────────────── */}
      {outcomePoints.length > 0 && (
        <section className="sdp-outcomes">
          <div className="container container--narrow">
            <p className="sdp-section-label">Was ihr bekommt</p>
            <div className="sdp-outcome-list">
              {outcomePoints.map((point, i) => (
                <div key={i} className="sdp-outcome-item">
                  <span className="sdp-outcome-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="sdp-outcome-text">{point}</p>
                </div>
              ))}
            </div>
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
