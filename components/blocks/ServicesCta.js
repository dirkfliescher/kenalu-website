// CMS-SERVICES-01: Abschluss-CTA für /services Übersicht
import Link from 'next/link';

export default function ServicesCta({ blok }) {
  return (
    <section className="sov-closing">
      <div className="container container--narrow">
        {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
        {blok.headline && (
          <h2 className="sov-closing-headline">{blok.headline}</h2>
        )}
        {blok.body && <p className="sov-closing-text">{blok.body}</p>}
        {blok.button_url && blok.button_label && (
          <Link href={blok.button_url} className="btn btn-primary">
            {blok.button_label}
          </Link>
        )}
      </div>
    </section>
  );
}
