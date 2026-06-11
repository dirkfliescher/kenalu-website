export default function PageHero({ blok }) {
  return (
    <section className="page-hero">
      <div className="container">
        {blok.page_hero_label && <div className="hero-label">{blok.page_hero_label}</div>}
        {blok.page_hero_headline && <h1>{blok.page_hero_headline}</h1>}
        {blok.page_hero_text && <p>{blok.page_hero_text}</p>}
      </div>
    </section>
  );
}
