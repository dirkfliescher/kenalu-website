import Link from 'next/link';

export default function WorkingCta({ blok }) {
  return (
    <section className="aw-cta">
      <div className="container container--narrow">
        {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
        {blok.headline && <h2 className="aw-cta-headline">{blok.headline}</h2>}
        {blok.text && <p className="aw-cta-text">{blok.text}</p>}
        <div className="aw-cta-actions">
          {blok.cta_label && (
            <Link href={blok.cta_url || '/contact'} className="btn btn-light">
              {blok.cta_label}
            </Link>
          )}
          {blok.link_label && (
            <Link href={blok.link_url || '/services'} className="link-arrow aw-cta-link">
              {blok.link_label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
