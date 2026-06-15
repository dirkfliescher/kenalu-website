export default function TestimonialItem({ blok }) {
  // testimonial_photo kann ein Single-Asset-Objekt ODER (falls als Multi-Asset
  // angelegt) ein Array von Asset-Objekten sein – beide Fälle abdecken.
  const rawPhoto = blok.testimonial_photo;
  const photo = Array.isArray(rawPhoto) ? rawPhoto[0] : rawPhoto;
  const photoSrc = photo?.filename;

  return (
    <div className="testimonial-item">
      {blok.testimonial_quote && <p className="testimonial-quote">&#x201E;{blok.testimonial_quote}&#x201C;</p>}

      {(blok.testimonial_name || blok.testimonial_role || photoSrc) && (
        <div className="testimonial-author-row">
          <div className="testimonial-photo">
            {photoSrc ? (
              <img
                src={photoSrc}
                alt={blok.testimonial_photo_alt || photo?.alt || blok.testimonial_name || ''}
              />
            ) : (
              <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" fill="none">
                <circle cx="60" cy="55" r="30" fill="#D8D4CE" />
                <path d="M 10 150 Q 60 100 110 150" fill="#D8D4CE" />
              </svg>
            )}
          </div>
          {(blok.testimonial_name || blok.testimonial_role) && (
            <p className="testimonial-author">
              {blok.testimonial_name}
              {blok.testimonial_name && blok.testimonial_role && <br />}
              {blok.testimonial_role && <span>{blok.testimonial_role}</span>}
            </p>
          )}
        </div>
      )}

      {(blok.testimonial_customer_logo?.filename || blok.testimonial_customer_name) && (
        <div className="testimonial-customer">
          {blok.testimonial_customer_logo?.filename && (
            <img
              className="testimonial-customer-logo"
              src={blok.testimonial_customer_logo.filename}
              alt={blok.testimonial_customer_logo_alt || blok.testimonial_customer_logo.alt || blok.testimonial_customer_name || ''}
            />
          )}
          {blok.testimonial_customer_name && (
            <span className="testimonial-customer-name">{blok.testimonial_customer_name}</span>
          )}
        </div>
      )}
    </div>
  );
}
