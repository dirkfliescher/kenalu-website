export default function ZusammenarbeitOpen({ blok }) {
  return (
    <section className="zusammenarbeit-open">
      <div className="container zusammenarbeit-open-inner">
        {blok.zusammenarbeit_open_label && <p className="section-label">{blok.zusammenarbeit_open_label}</p>}
        {blok.zusammenarbeit_open_headline && <h2>{blok.zusammenarbeit_open_headline}</h2>}
        {blok.zusammenarbeit_open_text && <p>{blok.zusammenarbeit_open_text}</p>}
        {blok.zusammenarbeit_open_cta_text && (
          <a href={blok.zusammenarbeit_open_cta_link || '#'} className="btn btn-light">
            {blok.zusammenarbeit_open_cta_text} <span className="arrow">→</span>
          </a>
        )}
      </div>
    </section>
  );
}
