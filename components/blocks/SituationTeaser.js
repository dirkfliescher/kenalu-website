import Link from 'next/link';

export default function SituationTeaser({ blok }) {
  const items = blok.items || [];

  return (
    <section className="st-section">
      <div className="container">
        <div className="st-grid">
          {items.map((item) => (
            <div key={item._uid} className="st-item">
              <p className="st-text">{item.text}</p>
              {item.link_label && item.internal_link && (
                <Link href={item.internal_link} className="st-link">
                  {item.link_label} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
