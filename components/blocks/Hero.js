import WaveBackground from '../WaveBackground';

// Hebt ein einzelnes Wort im Headline-Text in Terracotta hervor.
// In Storyblok: hero_accent_word = "Experiences" (das Wort exakt so wie im Headline-Text)
function renderHeadline(text, accentWord) {
  if (!accentWord || !text.includes(accentWord)) return text;
  const parts = text.split(accentWord);
  return (
    <>
      {parts[0]}
      <em className="hero-accent">{accentWord}</em>
      {parts[1]}
    </>
  );
}

export default function Hero({ blok }) {
  return (
    <section className="hero">
      <div className="hero-wave">
        <WaveBackground variant="light" />
      </div>
      <div className="hero-content">
        {blok.hero_label && <div className="hero-label">{blok.hero_label}</div>}
        {blok.hero_headline && (
          <h1 className="hero-headline">
            {renderHeadline(blok.hero_headline, blok.hero_accent_word)}
          </h1>
        )}
        {blok.hero_subline && <p className="hero-sub">{blok.hero_subline}</p>}
        <div className="hero-ctas">
          {blok.hero_cta_text && (
            <a href={blok.hero_cta_link || '#'} className="btn btn-primary">
              {blok.hero_cta_text} <span className="arrow">→</span>
            </a>
          )}
          {blok.hero_secondary_cta_text && (
            <a href={blok.hero_secondary_cta_link || '#'} className="btn btn-ghost">
              {blok.hero_secondary_cta_text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
