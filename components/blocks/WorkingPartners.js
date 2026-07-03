export default function WorkingPartners({ blok }) {
  return (
    <section className="aw-partners">
      <div className="container container--narrow">
        {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
        {blok.headline && <h2 className="aw-partners-headline">{blok.headline}</h2>}
        {blok.text && <p className="aw-partners-text">{blok.text}</p>}
      </div>
    </section>
  );
}
