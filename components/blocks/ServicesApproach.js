// CMS-SERVICES-01: "Was alle vier Einstiege verbindet" für /services Übersicht
import Link from 'next/link';

export default function ServicesApproach({ blok }) {
  return (
    <section className="sov-approach">
      <div className="container container--narrow">
        {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
        {blok.headline && (
          <h2 className="sov-approach-headline">{blok.headline}</h2>
        )}
        {blok.body && <p className="sov-approach-text">{blok.body}</p>}
        {blok.link_url && blok.link_label && (
          <Link href={blok.link_url} className="sov-approach-link">
            {blok.link_label}
          </Link>
        )}
      </div>
    </section>
  );
}
