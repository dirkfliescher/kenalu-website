import Link from 'next/link';

/**
 * Shared template for all 4 service detail pages.
 * Props:
 *   eyebrow        – small label above the H1
 *   headline       – H1
 *   intro          – lead paragraph
 *   fitPoints      – Array<string> (3 items)  "Passt für euch, wenn…"
 *   outcomePoints  – Array<string> (3 items)  "Was ihr bekommt"
 *   approachText   – Paragraph(s) about how kenalu works on this
 *   ctaLabel       – Button label
 */
export default function ServiceDetailPage({
  eyebrow,
  headline,
  intro,
  fitPoints = [],
  outcomePoints = [],
  approachText,
  ctaLabel = 'Gespräch anfragen',
}) {
  return (
    <div>
      {/* Hero */}
      <section className="sdp-hero">
        <div className="container container--narrow">
          {eyebrow && <p className="section-label">{eyebrow}</p>}
          <h1>{headline}</h1>
          {intro && <p className="sdp-hero-intro">{intro}</p>}
        </div>
      </section>

      {/* Fit */}
      <section className="sdp-section">
        <div className="container container--narrow">
          <p className="sdp-section-title">Passt für euch, wenn…</p>
          <ul className="sdp-points">
            {fitPoints.map((point, i) => (
              <li key={i} className="sdp-point">{point}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Outcomes */}
      <section className="sdp-section">
        <div className="container container--narrow">
          <p className="sdp-section-title">Was ihr bekommt</p>
          <ul className="sdp-points">
            {outcomePoints.map((point, i) => (
              <li key={i} className="sdp-point">{point}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach */}
      {approachText && (
        <section className="sdp-approach">
          <div className="container container--narrow">
            <p className="sdp-section-title">Wie wir vorgehen</p>
            <p className="sdp-approach-text">{approachText}</p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="sdp-section" style={{ textAlign: 'center' }}>
        <div className="container container--narrow">
          <Link href="/contact" className="btn btn-primary">
            {ctaLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
