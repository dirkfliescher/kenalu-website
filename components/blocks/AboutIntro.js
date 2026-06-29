export default function AboutIntro({ blok }) {
  const hasImage = !!blok.about_intro_image?.filename;

  return (
    <section className="about-intro">
      <div className={`container ${hasImage ? 'container--wide about-intro-grid' : 'container--narrow about-intro-solo'}`}>
        {hasImage && (
          <div>
            <div className="about-intro-image">
              <img src={blok.about_intro_image.filename} alt={blok.about_intro_image_alt || blok.about_intro_image.alt || ''} />
            </div>
            {blok.about_intro_caption && (
              <p className="about-intro-caption">{blok.about_intro_caption}</p>
            )}
          </div>
        )}
        <div className="about-intro-content">
          {blok.about_intro_label && <p className="section-label">{blok.about_intro_label}</p>}
          {blok.about_intro_headline && <h2 className="about-intro-headline">{blok.about_intro_headline}</h2>}
          {blok.about_intro_text_1 && <p>{blok.about_intro_text_1}</p>}
          {blok.about_intro_text_2 && <p>{blok.about_intro_text_2}</p>}
          {blok.about_intro_text_3 && <p>{blok.about_intro_text_3}</p>}
          {blok.about_intro_text_4 && (
            <>
              <div className="about-intro-divider" />
              <p className="about-intro-footnote">{blok.about_intro_text_4}</p>
            </>
          )}
          {blok.about_intro_link_text && (
            <a href={blok.about_intro_link_url || '#'} className="link-arrow" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
              {blok.about_intro_link_text} <span>→</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
