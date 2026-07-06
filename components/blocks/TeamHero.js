// TeamHero — /team Hero aus Storyblok
export default function TeamHero({ blok }) {
  const eyebrow  = blok.eyebrow  || 'Team';
  const headline = blok.headline || 'Die Menschen hinter kenalu.';
  const body     = blok.body     || '';

  return (
    <section className="team-hero">
      <div className="container">
        {eyebrow && <p className="section-label">{eyebrow}</p>}
        <h1 className="team-hero-headline">{headline}</h1>
        {body && <p className="team-hero-sub">{body}</p>}
      </div>
    </section>
  );
}
