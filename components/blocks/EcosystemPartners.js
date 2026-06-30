export default function EcosystemPartners({ blok }) {
  const solutionPartners = blok.solution_partners || [];
  const servicePartners = blok.service_partners || [];
  // tools ist ein Textarea-Feld: eine Zeile pro Tool-Name
  const tools = blok.tools
    ? blok.tools.split('\n').map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <section className="ep-section">
      <div className="container">

        {/* ── Section Header ── */}
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

        {/* ── Solution Partner ── */}
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
                <PartnerItem key={item._uid} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* ── Service Partner ── */}
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
                <PartnerItem key={item._uid} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* ── Werkzeuge ── */}
        {(blok.tools_headline || blok.tools_text || tools.length > 0) && (
          <div className="ep-tools">
            <div className="ep-tools-meta">
              {blok.tools_headline && (
                <p className="ep-tools-headline">{blok.tools_headline}</p>
              )}
              {blok.tools_text && (
                <p className="ep-tools-text">{blok.tools_text}</p>
              )}
            </div>
            {tools.length > 0 && (
              <div className="ep-tool-labels" aria-label="Werkzeuge">
                {tools.map((tool, i) => (
                  <span key={i} className="ep-tool-label">{tool}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Abschlusshinweis ── */}
        {blok.closing_note && (
          <p className="ep-closing">{blok.closing_note}</p>
        )}

      </div>
    </section>
  );
}

// ── Partner-Karte ─────────────────────────────────────────────────────────────
function PartnerItem({ item }) {
  const name = item.name || '';
  const description = item.description || '';
  const url = item.url || '';
  const logo = item.logo?.filename || '';
  const logoAlt = item.logo?.alt || `${name} Logo`;
  const relationshipNote = item.relationship_note || '';

  const inner = (
    <div className="ep-card-inner">
      {/* Logo oder Textlabel */}
      <div className="ep-card-logo-area">
        {logo ? (
          <img
            className="ep-card-logo"
            src={logo}
            alt={logoAlt}
            loading="lazy"
          />
        ) : (
          <span className="ep-card-name-label">{name}</span>
        )}
      </div>

      {/* Name (nur wenn Logo vorhanden) */}
      {logo && name && (
        <p className="ep-card-name">{name}</p>
      )}

      {/* Beschreibung */}
      {description && (
        <p className="ep-card-desc">{description}</p>
      )}

      {/* Relationship Note */}
      {relationshipNote && (
        <p className="ep-card-note">{relationshipNote}</p>
      )}
    </div>
  );

  if (url) {
    return (
      <a
        href={url}
        rel="noopener noreferrer"
        className="ep-card ep-card--link"
        aria-label={`${name} (externer Link)`}
      >
        {inner}
      </a>
    );
  }

  return <div className="ep-card">{inner}</div>;
}
