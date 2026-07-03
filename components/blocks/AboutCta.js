import Link from 'next/link';

export default function AboutCta({ blok }) {
  return (
    <section className="aw-cta">
      <div className="container container--narrow">
        {blok.eyebrow && (
          <p className="section-label">{blok.eyebrow}</p>
        )}
        {blok.headline && (
          <h2 className="aw-cta-headline">{blok.headline}</h2>
        )}
        {blok.body && (
          <p className="aw-cta-text">{blok.body}</p>
        )}
        {(blok.primary_label || blok.secondary_label) && (
          <div className="aw-cta-actions">
            {blok.primary_label && (
              <Link href={blok.primary_url || '/contact'} className="btn btn-light">
                {blok.primary_label}
              </Link>
            )}
            {blok.secondary_label && (
              <Link href={blok.secondary_url || '/services'} className="link-arrow aw-cta-link">
                {blok.secondary_label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
