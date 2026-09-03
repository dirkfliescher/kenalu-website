// REPO2-01: "Unsere Haltung" — Positionierungsabschnitt auf der Homepage
// Storyblok-Schema: home_positioning
// Felder: eyebrow, headline, text_1, text_2, text_3, highlight_text
export default function HomePositioning({ blok }) {
  return (
    <section className="hpos-section">
      <div className="container container--narrow">
        {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
        {blok.headline && <h2 className="hpos-headline">{blok.headline}</h2>}
        <div className="hpos-body">
          {blok.text_1 && <p className="hpos-text">{blok.text_1}</p>}
          {blok.text_2 && <p className="hpos-text">{blok.text_2}</p>}
          {blok.text_3 && <p className="hpos-text">{blok.text_3}</p>}
        </div>
        {blok.highlight_text && (
          <p className="hpos-quote">{blok.highlight_text}</p>
        )}
      </div>
    </section>
  );
}
