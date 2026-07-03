// CMS-SERVICES-01: Abschluss-CTA für Service-Detailseiten
import Link from 'next/link';

export default function ServiceDetailCta({ blok }) {
  return (
    <section className="sd-cta">
      <div className="container container--narrow">
        {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
        {blok.headline && <h2 className="sd-cta-h2">{blok.headline}</h2>}
        {blok.body && <p className="sd-cta-text">{blok.body}</p>}
        {blok.button_url && blok.button_label && (
          <Link href={blok.button_url} className="btn btn-primary">
            {blok.button_label}
          </Link>
        )}
      </div>
    </section>
  );
}
