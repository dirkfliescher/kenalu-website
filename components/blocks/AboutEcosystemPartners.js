// CMS-REBUILD-01: Partner-Sektion für /about
// Kein tools-Abschnitt, kein closing_note, kein Claude, kein OpenAI.

function PartnerItem({ item }) {
  const logo = item.logo?.filename || '';
  const Tag = item.url ? 'a' : 'div';
  const linkProps = item.url
    ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Tag className={item.url ? 'ep-card ep-card--link' : 'ep-card'} {...linkProps}>
      <div className="ep-card-inner">
        <div className="ep-card-logo-area">
          {logo ? (
            <img
              src={logo}
              alt={item.name}
              className="ep-card-logo"
              loading="lazy"
            />
          ) : (
            <span className="ep-card-name-label">{item.name}</span>
          )}
        </div>
        {item.description && (
          <p className="ep-card-desc">{item.description}</p>
        )}
        {item.relationship_note && (
          <p className="ep-card-note">{item.relationship_note}</p>
        )}
      </div>
    </Tag>
  );
}

export default function AboutEcosystemPartners({ blok }) {
  const solutionPartners = blok.solution_partners || [];
  const servicePartners = blok.service_partners || [];

  return (
    <section className="ep-section">
      <div className="container">
        <div className="ep-header">
          {blok.eyebrow && (
            <p className="section-label">{blok.eyebrow}</p>
          )}
          {blok.headline && (
            <h2 className="ep-headline">{blok.headline}</h2>
          )}
          {blok.intro && (
            <p className="ep-intro">{blok.intro}</p>
          )}
        </div>

        {solutionPartners.length > 0 && (
          <div className="ep-group">
            <div className="ep-group-meta">
              <h3 className="ep-group-title">Solution Partner</h3>
              {blok.solution_partner_intro && (
                <p className="ep-group-intro">{blok.solution_partner_intro}</p>
              )}
            </div>
            <div className="ep-cards ep-cards--2col">
              {solutionPartners.map((item) => (
                <PartnerItem key={item._uid || item.name} item={item} />
              ))}
            </div>
          </div>
        )}

        {servicePartners.length > 0 && (
          <div className="ep-group">
            <div className="ep-group-meta">
              <h3 className="ep-group-title">Service Partner</h3>
              {blok.service_partner_intro && (
                <p className="ep-group-intro">{blok.service_partner_intro}</p>
              )}
            </div>
            <div className="ep-cards ep-cards--3col">
              {servicePartners.map((item) => (
                <PartnerItem key={item._uid || item.name} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
