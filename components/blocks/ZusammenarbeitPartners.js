import PartnerCard from './PartnerCard';

export default function ZusammenarbeitPartners({ blok }) {
  return (
    <section className="zusammenarbeit-partners">
      <div className="container">
        {blok.zusammenarbeit_partners_label && <p className="section-label">{blok.zusammenarbeit_partners_label}</p>}
        {blok.zusammenarbeit_partners_headline && <h2>{blok.zusammenarbeit_partners_headline}</h2>}
        {blok.zusammenarbeit_partners_intro && <p className="section-sub">{blok.zusammenarbeit_partners_intro}</p>}
        {blok.zusammenarbeit_partners_items?.length > 0 && (
          <div className="partners-grid">
            {blok.zusammenarbeit_partners_items.map((item) => (
              <PartnerCard key={item._uid} blok={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
