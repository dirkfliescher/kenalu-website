// CMS-SERVICES-01: "Ehrliche Einordnung" für Service-Detailseiten
export default function ServiceHonestFit({ blok }) {
  const listItems = blok.list_items || [];

  return (
    <section className="sd-honest-fit">
      <div className="container container--narrow">
        {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
        {blok.headline && <h2 className="sd-honest-h2">{blok.headline}</h2>}
        {listItems.length > 0 && (
          <ul className="sd-honest-list">
            {listItems.map((item, i) => (
              <li key={item._uid || i}>{item.text}</li>
            ))}
          </ul>
        )}
        {blok.alt_text && <p className="sd-honest-alt">{blok.alt_text}</p>}
      </div>
    </section>
  );
}
