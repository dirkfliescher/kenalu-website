// CMS-SERVICES-01: "Danach"-Sektion für Service-Detailseiten
// variant: '' | 'highlighted' | 'editorial'
export default function ServiceOutcome({ blok }) {
  const items = blok.items || [];
  const variantClass = blok.variant ? ` sd-danach--${blok.variant}` : '';

  return (
    <section className={`sd-danach${variantClass}`}>
      <div className="container">
        {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
        {blok.headline && <h2 className="sd-danach-h2">{blok.headline}</h2>}
        <div className="sd-danach-grid">
          {items.map((item, i) => (
            <div key={item._uid || i} className="sd-danach-item">
              <p className="sd-danach-item-title">{item.title}</p>
              <p className="sd-danach-item-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
