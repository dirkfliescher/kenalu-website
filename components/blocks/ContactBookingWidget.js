export default function ContactBookingWidget({ headline, intro, calendlyUrl }) {
  const bookingUrl = calendlyUrl || 'https://calendly.com/dirk-kenalu';

  return (
    <div className="booking-widget">
      {headline && <h2 className="booking-headline">{headline}</h2>}
      {intro && <p className="booking-intro">{intro}</p>}

      <div className="booking-cta-block">
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary booking-btn-large"
        >
          Termin buchen <span className="arrow">→</span>
        </a>
        <p className="booking-note">30 Minuten · Öffnet Calendly in einem neuen Tab</p>
      </div>
    </div>
  );
}
