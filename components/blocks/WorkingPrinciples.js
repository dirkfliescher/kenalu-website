export default function WorkingPrinciples({ blok }) {
  return (
    <section className="wp-section">
      <div className="container">
        <div className="wp-header">
          {blok.eyebrow && <div className="section-label">{blok.eyebrow}</div>}
          {blok.headline && <h2 className="wp-headline">{blok.headline}</h2>}
          {blok.intro && <p className="wp-intro">{blok.intro}</p>}
        </div>
        <div className="wp-grid">
          {blok.principles?.map((p) => (
            <div key={p._uid} className="wp-card">
              <h3 className="wp-card-title">{p.title}</h3>
              <p className="wp-card-text">{p.text}</p>
            </div>
          ))}
        </div>
        {blok.link_label && blok.internal_link && (
          <div className="wp-link">
            <a href={blok.internal_link} className="link-arrow">
              {blok.link_label} →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
