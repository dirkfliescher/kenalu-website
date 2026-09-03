import Link from 'next/link';

/**
 * LabExperiment — Experiment-Seite mit Frage / Experiment / Erkenntnis
 *
 * Storyblok-Felder:
 *   question          (textarea) — Die Produktfrage / Annahme
 *   context           (textarea) — Kontext, optional
 *   experiment        (textarea) — Was konkret gebaut / getestet wurde
 *   learning          (textarea) — Was daraus gelernt wurde
 *   next_step         (textarea) — Was als Nächstes, optional
 *   related_service_label (text) — Label für Service-Link
 *   related_service_url   (text) — URL für Service-Link
 *   related_insight_label (text) — Label für Insight-Link
 *   related_insight_url   (text) — URL für Insight-Link
 *
 * Naming Convention: lca-exp-* (Lab Article / Experiment)
 */

function TextBlock({ text }) {
  if (!text) return null;
  return (
    <div className="lca-text-block">
      {text.split('\n\n').filter(Boolean).map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}

export default function LabExperiment({ blok }) {
  const hasRelated = blok.related_service_url || blok.related_insight_url;

  return (
    <div className="lca-experiment">

      {/* ── 1. Frage ──────────────────────────────────────────── */}
      {blok.question && (
        <section className="lca-section">
          <div className="container container--narrow">
            <div className="lca-exp-block">
              <p className="lca-exp-num">01</p>
              <p className="section-label">Frage</p>
              <p className="lca-lead">{blok.question}</p>
            </div>
          </div>
        </section>
      )}

      {/* ── 2. Kontext (optional) ─────────────────────────────── */}
      {blok.context && (
        <section className="lca-section lca-section--tinted">
          <div className="container container--narrow">
            <div className="lca-exp-block">
              <p className="section-label">Kontext</p>
              <TextBlock text={blok.context} />
            </div>
          </div>
        </section>
      )}

      {/* ── 3. Experiment ─────────────────────────────────────── */}
      {blok.experiment && (
        <section className="lca-section">
          <div className="container container--narrow">
            <div className="lca-exp-block">
              <p className="lca-exp-num">02</p>
              <p className="section-label">Experiment</p>
              <TextBlock text={blok.experiment} />
            </div>
          </div>
        </section>
      )}

      {/* ── 4. Erkenntnis ─────────────────────────────────────── */}
      {blok.learning && (
        <section className="lca-section lca-exp-section--learning">
          <div className="container container--narrow">
            <div className="lca-exp-block">
              <p className="lca-exp-num">03</p>
              <p className="section-label">Erkenntnis</p>
              <TextBlock text={blok.learning} />
            </div>
          </div>
        </section>
      )}

      {/* ── 5. Was als Nächstes (optional) ───────────────────── */}
      {blok.next_step && (
        <section className="lca-section lca-section--tinted">
          <div className="container container--narrow">
            <div className="lca-exp-block">
              <p className="section-label">Was als Nächstes</p>
              <TextBlock text={blok.next_step} />
            </div>
          </div>
        </section>
      )}

      {/* ── 6. Verwandte Inhalte (optional) ──────────────────── */}
      {hasRelated && (
        <section className="lca-section">
          <div className="container container--narrow">
            <p className="section-label">Verwandt</p>
            <div className="lca-exp-related">
              {blok.related_service_url && blok.related_service_label && (
                <Link href={blok.related_service_url} className="lca-internal-link">
                  {blok.related_service_label}
                </Link>
              )}
              {blok.related_insight_url && blok.related_insight_label && (
                <Link href={blok.related_insight_url} className="lca-internal-link">
                  {blok.related_insight_label}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
