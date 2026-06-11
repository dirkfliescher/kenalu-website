export default function CtaSection({ blok }) {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        {blok.cta_section_label && <div className="cta-label">{blok.cta_section_label}</div>}
        {blok.cta_section_headline && <h2 className="cta-headline">{blok.cta_section_headline}</h2>}
        {blok.cta_section_subline && <p className="cta-sub">{blok.cta_section_subline}</p>}
        {blok.cta_section_cta_text && (
          <a href={blok.cta_section_cta_link || '#'} className="btn btn-light">
            {blok.cta_section_cta_text} <span className="arrow">→</span>
          </a>
        )}
      </div>
    </section>
  );
}
