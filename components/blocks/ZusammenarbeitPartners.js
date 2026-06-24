import PartnerCard from './PartnerCard';

export default function ZusammenarbeitPartners({ blok }) {
  const items = blok.zusammenarbeit_partners_items || [];

  // In zwei Gruppen aufteilen
  const techPartner    = items.filter((i) => i.partner_card_category === 'technologie');
  const servicePartner = items.filter((i) => i.partner_card_category === 'service');

  // Fallback: keine Kategorie gesetzt → alles in einer Gruppe
  const hasCategories = items.some((i) => i.partner_card_category);

  return (
    <section className="zusammenarbeit-partners">
      <div className="container container--wide">
        {blok.zusammenarbeit_partners_label && (
          <p className="section-label">{blok.zusammenarbeit_partners_label}</p>
        )}
        {blok.zusammenarbeit_partners_headline && (
          <h2>{blok.zusammenarbeit_partners_headline}</h2>
        )}
        {blok.zusammenarbeit_partners_intro && (
          <p className="section-sub">{blok.zusammenarbeit_partners_intro}</p>
        )}

        {hasCategories ? (
          <div className="partners-grouped">
            {techPartner.length > 0 && (
              <div className="partners-group">
                <h3 className="partners-group-label">Technologiepartner</h3>
                <div className="partners-grid">
                  {techPartner.map((item) => (
                    <PartnerCard key={item._uid} blok={item} />
                  ))}
                </div>
              </div>
            )}
            {servicePartner.length > 0 && (
              <div className="partners-group">
                <h3 className="partners-group-label">Servicepartner</h3>
                <div className="partners-grid">
                  {servicePartner.map((item) => (
                    <PartnerCard key={item._uid} blok={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          items.length > 0 && (
            <div className="partners-grid">
              {items.map((item) => (
                <PartnerCard key={item._uid} blok={item} />
              ))}
            </div>
          )
        )}
      </div>
    </section>
  );
}
