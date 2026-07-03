export default function AboutHero({ blok }) {
  return (
    <section className="page-hero">
      <div className="container">
        {blok.eyebrow && (
          <div className="hero-label">{blok.eyebrow}</div>
        )}
        <div className="page-hero-inner">
          {blok.headline && <h1>{blok.headline}</h1>}
          {blok.body && <p>{blok.body}</p>}
        </div>
      </div>
    </section>
  );
}
