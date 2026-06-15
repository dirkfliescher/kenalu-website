import HelpItem from './HelpItem';

export default function HelpSection({ blok }) {
  return (
    <section className="help-section">
      <div className="container">
        <div className="section-header">
          {blok.help_section_label && <div className="section-label">{blok.help_section_label}</div>}
          {blok.help_section_headline && <h2>{blok.help_section_headline}</h2>}
          {blok.help_section_intro && <p className="section-sub">{blok.help_section_intro}</p>}
        </div>

        {blok.help_section_items?.length > 0 && (
          <div className="help-grid">
            {blok.help_section_items.map((item) => (
              <HelpItem key={item._uid} blok={item} />
            ))}
          </div>
        )}

        {blok.help_section_connector && (
          <p className="help-connector">{blok.help_section_connector}</p>
        )}
      </div>
    </section>
  );
}
