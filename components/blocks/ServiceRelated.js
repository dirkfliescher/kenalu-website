// CMS-SERVICES-01: "Andere Einstiege" für Service-Detailseiten
import Link from 'next/link';

export default function ServiceRelated({ blok }) {
  const items = blok.items || [];
  return (
    <section className="sd-related">
      <div className="container">
        <div className="sd-related-cards">
          {items.map((r) => (
            <Link key={r._uid || r.href} href={r.href} className="sd-related-card">
              <p className="sd-related-card-label">{r.label}</p>
              <p className="sd-related-card-text">{r.text}</p>
              <span className="sd-related-card-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
