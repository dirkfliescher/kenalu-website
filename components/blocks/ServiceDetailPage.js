import Link from 'next/link';

/**
 * Shared template for all 4 service detail pages.
 * Props:
 *   eyebrow        – small label above H1
 *   headline       – H1
 *   intro          – lead paragraph
 *   fitPoints      – Array<string>   "Passt für euch, wenn…"
 *   storyText      – String          Narrative Fliesstext (Absätze mit \n\n)
 *   outcomePoints  – Array<string>   "Was ihr bekommt"
 *   ctaLabel       – Button label
 */
export default function ServiceDetailPage({
  eyebrow,
  headline,
  intro,
  fitPoints = [],
  storyText,
  outcomePoints = [],
  ctaLabel = 'Gespräch anfragen',
}) {
  const storyParagraphs = storyText
    ? storyText.split('\n\n').map(p => p.trim()).filter(Boolean)
    : [];

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
      {fitPoints.length > 0 && (
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
      )}

      {/* Projekt-Story */}
      {storyParagraphs.length > 0 && (
        <section className="sdp-story">
          <div className="container container--narrow">
            <p className="sdp-section-title">So könnte es aussehen</p>
            <div className="sdp-story-text">
              {storyParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Outcomes */}
      {outcomePoints.length > 0 && (
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
      )}

      {/* CTA */}
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
