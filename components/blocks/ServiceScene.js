// CMS-SERVICES-01: "Der Moment davor" für Service-Detailseiten
export default function ServiceScene({ blok }) {
  return (
    <section className="sd-scene">
      <div className="container container--narrow">
        {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
        {blok.headline && <h2 className="sd-scene-h2">{blok.headline}</h2>}
        {blok.text_1 && <p className="sd-scene-text">{blok.text_1}</p>}
        {blok.text_2 && <p className="sd-scene-text">{blok.text_2}</p>}
        {blok.text_3 && <p className="sd-scene-text">{blok.text_3}</p>}
      </div>
    </section>
  );
}
