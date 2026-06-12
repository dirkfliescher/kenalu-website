export default function PartnerCard({ blok }) {
  const content = (
    <>
      <div className="partner-card-logo">
        {blok.partner_card_logo?.filename && (
          <img
            src={blok.partner_card_logo.filename}
            alt={blok.partner_card_logo_alt || blok.partner_card_logo.alt || blok.partner_card_name || ''}
          />
        )}
      </div>
      <div className="partner-card-body">
        <div className="partner-card-header">
          {blok.partner_card_name && <h3>{blok.partner_card_name}</h3>}
          {blok.partner_card_tag && <span className="partner-card-tag">{blok.partner_card_tag}</span>}
        </div>
        {blok.partner_card_description && <p>{blok.partner_card_description}</p>}
      </div>
    </>
  );

  if (blok.partner_card_url) {
    return (
      <a href={blok.partner_card_url} target="_blank" rel="noopener noreferrer" className="partner-card">
        {content}
      </a>
    );
  }

  return <div className="partner-card">{content}</div>;
}
