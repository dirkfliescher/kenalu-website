// REPO2-04: "Was mit jedem Projekt wächst" — Fähigkeitsabschnitt auf /approach
// Storyblok-Schema: approach_capability
// Felder: eyebrow, headline, intro, highlight_text,
//         item_1_title..item_4_title, item_1_text..item_4_text
export default function ApproachCapability({ blok }) {
  const items = [
    { title: blok.item_1_title, text: blok.item_1_text },
    { title: blok.item_2_title, text: blok.item_2_text },
    { title: blok.item_3_title, text: blok.item_3_text },
    { title: blok.item_4_title, text: blok.item_4_text },
  ].filter((i) => i.title);

  return (
    <section className="apc-section">
      <div className="container">
        <div className="apc-header">
          {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
          {blok.headline && <h2 className="apc-headline">{blok.headline}</h2>}
          {blok.intro && <p className="apc-intro">{blok.intro}</p>}
        </div>
        {blok.highlight_text && (
          <p className="apc-highlight">{blok.highlight_text}</p>
        )}
        {items.length > 0 && (
          <div className="apc-grid">
            {items.map((item, i) => (
              <div key={`${item.title}-${i}`} className="apc-item">
                <h3 className="apc-item-title">{item.title}</h3>
                {item.text && <p className="apc-item-text">{item.text}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
