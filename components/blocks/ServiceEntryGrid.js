import Link from 'next/link';

function ServiceEntryCard({ blok }) {
  return (
    <Link href={blok.internal_link || '#'} className="seg-card">
      <div className="seg-card-top">
        <span className="seg-card-num">{blok.number}</span>
        <span className="seg-card-label">{blok.label}</span>
      </div>
      <h3 className="seg-card-title">{blok.title}</h3>
      <p className="seg-card-text">{blok.text}</p>
      <span className="seg-card-cta">{blok.cta_label} →</span>
    </Link>
  );
}

export default function ServiceEntryGrid({ blok }) {
  return (
    <section className="seg-section" id={blok.anchor_id || 'leistung-finden'}>
      <div className="container">
        <div className="seg-header">
          {blok.eyebrow && <div className="section-label">{blok.eyebrow}</div>}
          {blok.headline && <h2 className="seg-headline">{blok.headline}</h2>}
          {blok.intro && <p className="seg-intro">{blok.intro}</p>}
        </div>
        <div className="seg-grid">
          {blok.cards?.map((card) => (
            <ServiceEntryCard key={card._uid} blok={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
