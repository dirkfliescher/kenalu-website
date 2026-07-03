// CMS-SERVICES-01: Hero für /services Übersicht
export default function ServicesHero({ blok }) {
  return (
    <section className="sov-hero">
      <div className="container">
        {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
        <div className="sov-hero-inner">
          <h1 className="sov-hero-headline">{blok.headline}</h1>
          {blok.body && <p className="sov-hero-text">{blok.body}</p>}
        </div>
      </div>
    </section>
  );
}
