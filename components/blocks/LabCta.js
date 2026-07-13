import Link from 'next/link';

/**
 * LabCta — Abschluss-CTA für Lab-Artikel
 *
 * Storyblok-Felder:
 *   label      (text)     — Section-Label
 *   headline   (text)     — H2
 *   text       (textarea) — Text
 *   cta_label  (text)     — Button-Text
 *   cta_link   (text)     — Button-URL
 */
export default function LabCta({ blok }) {
  return (
    <section className="lca-cta-section">
      <div className="container container--narrow">
        {blok.label    && <p className="section-label">{blok.label}</p>}
        {blok.headline && <h2 className="lca-h2">{blok.headline}</h2>}
        {blok.text     && <p className="lca-text">{blok.text}</p>}
        {blok.cta_label && blok.cta_link && (
          <Link href={blok.cta_link} className="btn btn-primary">
            {blok.cta_label}
          </Link>
        )}
      </div>
    </section>
  );
}
