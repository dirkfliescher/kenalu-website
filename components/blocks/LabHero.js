/**
 * LabHero — Hero für Lab-Projektseiten
 * Storyblok-Felder: eyebrow, headline, intro, meta
 */
export default function LabHero({ blok }) {
  return (
    <section className="lca-hero">
      <div className="container">
        {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
        {blok.headline && <h1 className="lca-hero-headline">{blok.headline}</h1>}
        {blok.intro    && <p className="lca-hero-intro">{blok.intro}</p>}
        {blok.meta     && <p className="lca-hero-meta">{blok.meta}</p>}
      </div>
    </section>
  );
}
