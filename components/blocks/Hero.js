import WaveBackground from '../WaveBackground';

export default function Hero({ blok }) {
  return (
    <section className="hero">
      <div className="hero-wave">
        <WaveBackground variant="light" />
      </div>
      <div className="hero-content">
        {blok.hero_label && <div className="hero-label">{blok.hero_label}</div>}
        {blok.hero_headline && <h1 className="hero-headline">{blok.hero_headline}</h1>}
        {blok.hero_subline && <p className="hero-sub">{blok.hero_subline}</p>}
        {blok.hero_cta_text && (
          <a href={blok.hero_cta_link || '#'} className="btn btn-primary">
            {blok.hero_cta_text} <span className="arrow">→</span>
          </a>
        )}
      </div>
    </section>
  );
}
