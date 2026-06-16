export default function AboutName({ blok }) {
  return (
    <section className="about-name">
      <div className="container container--narrow about-name-grid">
        <div>
          {blok.about_name_label && <p className="section-label" style={{ color: 'var(--sage)' }}>{blok.about_name_label}</p>}
          {blok.about_name_headline && <h2 style={{ color: 'var(--ivory)', margin: '0.5rem 0 2rem' }}>{blok.about_name_headline}</h2>}
          {blok.about_name_text_1 && <p>{blok.about_name_text_1}</p>}
          {blok.about_name_text_2 && <p>{blok.about_name_text_2}</p>}
        </div>
        <svg className="about-name-wave" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" fill="none">
          <g stroke="#A7B5A6" strokeWidth="1.2">
            <path d="M 20 150 Q 100 80 200 150 Q 300 220 380 150" />
            <path d="M 20 170 Q 100 100 200 170 Q 300 240 380 170" />
            <path d="M 20 130 Q 100 60 200 130 Q 300 200 380 130" />
            <path d="M 20 190 Q 100 120 200 190 Q 300 260 380 190" />
            <path d="M 20 110 Q 100 40 200 110 Q 300 180 380 110" />
          </g>
        </svg>
      </div>
    </section>
  );
}
