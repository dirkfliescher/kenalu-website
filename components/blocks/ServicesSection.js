import ServiceItem from './ServiceItem';

export default function ServicesSection({ blok }) {
  return (
    <section className="services">
      <div className="container container--wide">
        <div className="section-header">
          {blok.services_section_label && <div className="section-label">{blok.services_section_label}</div>}
          {blok.services_section_headline && <h2>{blok.services_section_headline}</h2>}
        </div>
        {blok.services_section_items?.length > 0 && (
          <div className="services-grid">
            {blok.services_section_items.map((item) => (
              <ServiceItem key={item._uid} blok={item} />
            ))}
          </div>
        )}
        {blok.services_section_cta_text && (
          <div className="services-cta">
            <a href={blok.services_section_cta_link || '#'} className="link-arrow">
              {blok.services_section_cta_text} <span>→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
