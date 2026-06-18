import ContactBookingWidget from './ContactBookingWidget';

export default function ContactSection({ blok }) {
  const {
    contact_label,
    contact_headline,
    contact_intro,
    contact_note,
    contact_email,
    contact_location,
    contact_linkedin_url,
    contact_linkedin_label,
    contact_booking_headline,
    booking_intro,
    booking_calendly_url,
    booking_qualifier_responses,
  } = blok;

  return (
    <section className="contact-page">
      <div className="contact-layout">
        {/* Linke Spalte: Info */}
        <div className="contact-info">
          {contact_label && (
            <p className="section-label">{contact_label}</p>
          )}
          {contact_headline && (
            <h1>{contact_headline}</h1>
          )}
          {contact_intro && (
            <p className="contact-intro-text">{contact_intro}</p>
          )}
          {contact_note && (
            <p className="contact-intro-text" style={{ opacity: 0.7 }}>{contact_note}</p>
          )}

          <div className="contact-details">
            {contact_email && (
              <div className="contact-detail-item">
                <div className="contact-detail-icon">✉</div>
                <div className="contact-detail-text">
                  <strong>E-Mail</strong>
                  <a href={`mailto:${contact_email}`}>{contact_email}</a>
                </div>
              </div>
            )}
            {contact_location && (
              <div className="contact-detail-item">
                <div className="contact-detail-icon">◎</div>
                <div className="contact-detail-text">
                  <strong>Standort</strong>
                  <span>{contact_location}</span>
                </div>
              </div>
            )}
            {contact_linkedin_url && (
              <div className="contact-detail-item">
                <div className="contact-detail-icon">in</div>
                <div className="contact-detail-text">
                  <strong>LinkedIn</strong>
                  <a href={contact_linkedin_url} target="_blank" rel="noopener noreferrer">
                    {contact_linkedin_label || 'Dirk Fliescher'}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rechte Spalte: Booking Widget */}
        <div className="contact-booking">
          <ContactBookingWidget
            headline={contact_booking_headline}
            intro={booking_intro}
            calendlyUrl={booking_calendly_url}
            qualifierResponses={booking_qualifier_responses}
          />
        </div>
      </div>
    </section>
  );
}
