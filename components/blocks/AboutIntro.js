export default function AboutIntro({ blok }) {
  return (
    <section className="about-intro">
      <div className="container container--wide about-intro-grid">
        <div>
          <div className="about-intro-image">
            {blok.about_intro_image?.filename ? (
              <img src={blok.about_intro_image.filename} alt={blok.about_intro_image_alt || blok.about_intro_image.alt || ''} />
            ) : (
              <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" fill="none" style={{ width: '60%' }}>
                <circle cx="60" cy="55" r="30" fill="#D8D4CE" />
                <path d="M 10 150 Q 60 100 110 150" fill="#D8D4CE" />
              </svg>
            )}
          </div>
          {blok.about_intro_caption && (
            <p className="about-intro-caption">{blok.about_intro_caption}</p>
          )}
        </div>
        <div className="about-intro-content">
          {blok.about_intro_label && <p className="section-label">{blok.about_intro_label}</p>}
          {blok.about_intro_headline && <h1>{blok.about_intro_headline}</h1>}
          {blok.about_intro_text_1 && <p>{blok.about_intro_text_1}</p>}
          {blok.about_intro_text_2 && <p>{blok.about_intro_text_2}</p>}
          {blok.about_intro_text_3 && <p>{blok.about_intro_text_3}</p>}
          {blok.about_intro_text_4 && (
            <>
              <div className="about-intro-divider" />
              <p>{blok.about_intro_text_4}</p>
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
