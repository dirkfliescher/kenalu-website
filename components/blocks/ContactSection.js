import ContactBookingWidget from './ContactBookingWidget';

export default function ContactSection({ blok }) {
  return (
    <section className="contact-page">
      <div className="container">
        <div className="contact-layout">

          {/* ── Linke Spalte: Info ───────────────────────────────── */}
          <div className="contact-info">
            {blok.contact_label && (
              <p className="section-label">{blok.contact_label}</p>
            )}
            {blok.contact_headline && (
              <h1>{blok.contact_headline}</h1>
            )}
            {blok.contact_intro && (
              <p className="contact-intro-text">{blok.contact_intro}</p>
            )}
            {blok.contact_note && (
              <p className="contact-intro-text">{blok.contact_note}</p>
            )}

            <div className="contact-details">
              {blok.contact_email && (
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">✉</div>
                  <div className="contact-detail-text">
                    <strong>E-Mail</strong>
                    <a href={`mailto:${blok.contact_email}`}>{blok.contact_email}</a>
                  </div>
                </div>
              )}
              {blok.contact_location && (
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">◎</div>
                  <div className="contact-detail-text">
                    <strong>Standort</strong>
                    <span>{blok.contact_location}</span>
                  </div>
                </div>
              )}
              {blok.contact_linkedin_url && (
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">in</div>
                  <div className="contact-detail-text">
                    <strong>LinkedIn</strong>
                    <a
                      href={blok.contact_linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {blok.contact_linkedin_label || 'Dirk Fliescher'}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Rechte Spalte: Booking-Widget (Client Component) ── */}
          <ContactBookingWidget
            headline={blok.booking_headline}
            intro={blok.booking_intro}
            calendlyUrl={blok.booking_calendly_url}
            qualifierResponses={blok.booking_qualifier_responses}
          />

        </div>
      </div>
    </section>
  );
}
