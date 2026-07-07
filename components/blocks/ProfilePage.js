/**
 * ProfilePage.js
 * Generische Profil-Seite — rendert den Content Type "person_profile" aus Storyblok.
 * Kein hardcoded Inhalt. Alle Daten kommen aus dem blok-Prop.
 *
 * Verwendet dieselben dp-* CSS-Klassen wie DirkProfile.js.
 * Eingebunden via: app/profile/[slug]/page.js
 */

import PrintButton from './PrintButton';

export default function ProfilePage({ blok = {} }) {
  const {
    profile_photo    = null,
    hero_eyebrow     = '',
    hero_headline    = '',
    hero_intro       = '',
    hero_location    = '',
    hero_linkedin    = '',
    bio_headline     = 'Wer ich bin',
    bio_text         = '',
    contact_title    = '',
    contact_org      = '',
    contact_city     = '',
    contact_email    = '',
    contact_phone    = '',
    contact_website  = '',
    languages        = [],
    education        = [],
    stations         = [],
    projects         = [],
    themes           = [],
    testimonials     = [],
    cta_headline     = 'Interesse an einem Gespräch?',
    cta_text         = '30 Minuten, unverbindlich. Kein Pitch — ein ehrliches Gespräch über eure Ausgangslage.',
    cta_label        = 'Gespräch starten',
    cta_href         = '/contact',
  } = blok;

  const photo    = profile_photo;
  const photoAlt = photo?.alt || hero_eyebrow || '';
  const bioLines = bio_text ? bio_text.split('\n\n') : [];

  return (
    <>
      {/* ── Cover: Hero + Kontakt (im Druck 50:50) ── */}
      <div className="dp-cover">
        <section className="dp-hero">
          <div className="dp-hero-inner container">
            {hero_eyebrow  && <p className="section-label dp-hero-label">{hero_eyebrow}</p>}
            {hero_headline && <h1 className="dp-hero-h1">{hero_headline}</h1>}
            {hero_intro    && <p className="dp-hero-intro">{hero_intro}</p>}
            <div className="dp-hero-meta">
              {hero_location && <span className="dp-meta-item">◎ {hero_location}</span>}
              {hero_linkedin && (
                <a
                  href={hero_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dp-meta-item dp-meta-link"
                >
                  in LinkedIn
                </a>
              )}
            </div>
            <PrintButton />
          </div>
        </section>

        {/* ── Kontaktblock (nur Print: Titelseite rechts) ── */}
        <div className="dp-print-contact" aria-hidden="true">
          <div className="dp-print-contact-inner">
            {photo?.filename && (
              <div className="dp-print-contact-photo">
                <img src={photo.filename} alt={photoAlt} />
              </div>
            )}
            <div>
              <strong>{hero_eyebrow}</strong>
              {contact_title   && <span>{contact_title}</span>}
              {contact_org     && <span>{contact_org}</span>}
              {contact_city    && <span>{contact_city}</span>}
            </div>
            {(contact_email || contact_phone || contact_website) && (
              <div>
                {contact_email   && <span>{contact_email}</span>}
                {contact_phone   && <span>{contact_phone}</span>}
                {contact_website && <span>{contact_website}</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bio ── */}
      {bio_text && (
        <section className="dp-bio">
          <div className="container dp-bio-inner">
            <div className="dp-bio-label">
              <p className="section-label">{bio_headline}</p>
              {photo?.filename && (
                <div className="dp-bio-photo">
                  <img src={photo.filename} alt={photoAlt} />
                </div>
              )}
            </div>
            <div className="dp-bio-text">
              {bioLines.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
        </section>
      )}

      {/* ── Sprachen ── */}
      {languages.length > 0 && (
        <section className="dp-languages">
          <div className="container dp-languages-inner">
            <div className="dp-languages-label">
              <p className="section-label">Sprachen</p>
            </div>
            <div className="dp-languages-list">
              {languages.map((l, i) => (
                <div key={l._uid || i} className="dp-language-row">
                  <span className="dp-language-name">{l.language_name}</span>
                  <span className="dp-language-level">{l.language_level}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Ausbildung ── */}
      {education.length > 0 && (
        <section className="dp-education">
          <div className="container dp-education-inner">
            <div className="dp-education-label">
              <p className="section-label">Ausbildung</p>
            </div>
            <div className="dp-education-list">
              {education.map((e, i) => (
                <div key={e._uid || i} className="dp-edu-item">
                  <div className="dp-edu-meta">
                    {e.edu_period && <span className="dp-edu-period">{e.edu_period}</span>}
                    {e.edu_note   && <span className="dp-edu-note">{e.edu_note}</span>}
                  </div>
                  <div className="dp-edu-content">
                    <strong className="dp-edu-degree">{e.edu_degree}</strong>
                    {e.edu_school  && <span className="dp-edu-school">{e.edu_school}</span>}
                    {e.edu_remark  && <p className="dp-edu-remark">{e.edu_remark}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Werdegang ── */}
      {stations.length > 0 && (
        <section className="dp-stations">
          <div className="container">
            <p className="section-label dp-stations-label">Werdegang</p>
            <div className="dp-stations-list">
              {stations.map((s, i) => (
                <div key={s._uid || i} className="dp-station">
                  <div className="dp-station-period">{s.station_period}</div>
                  <div className="dp-station-content">
                    <strong className="dp-station-role">{s.station_role}</strong>
                    <span className="dp-station-org">
                      {s.station_org}{s.station_location ? ` · ${s.station_location}` : ''}
                    </span>
                    {s.station_text && <p className="dp-station-text">{s.station_text}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Projekte ── */}
      {projects.length > 0 && (
        <section className="dp-projects">
          <div className="container">
            <p className="section-label dp-projects-label">Ausgewählte Projekte</p>
            <div className="dp-projects-list">
              {projects.map((p, i) => (
                <details key={p._uid || i} className="dp-project-item">
                  <summary className="dp-project-summary">
                    <div className="dp-project-summary-main">
                      <strong className="dp-project-client">{p.project_client}</strong>
                      {p.project_sector && <span className="dp-project-sector">{p.project_sector}</span>}
                    </div>
                    <div className="dp-project-summary-right">
                      <span className="dp-project-period">{p.project_period}</span>
                      <span className="dp-project-chevron" aria-hidden="true">›</span>
                    </div>
                  </summary>
                  <div className="dp-project-body">
                    {p.project_text   && <p className="dp-project-text">{p.project_text}</p>}
                    {p.project_detail && <p className="dp-project-detail">{p.project_detail}</p>}
                    {p.project_award  && (
                      <div className="dp-project-award">
                        <span className="dp-award-icon">◆</span>
                        {p.project_award}
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Kompetenzen ── */}
      {themes.length > 0 && (
        <section className="dp-themes">
          <div className="container">
            <p className="section-label dp-themes-label">Was ich einbringe</p>
            <div className="dp-themes-grid">
              {themes.map((t, i) => (
                <div key={t._uid || i} className="dp-theme-card">
                  <strong className="dp-theme-label">{t.theme_label}</strong>
                  <p className="dp-theme-text">{t.theme_text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials ── */}
      {testimonials.length > 0 && (
        <section className="dp-testimonials">
          <div className="container">
            <p className="section-label dp-testimonials-label">Was andere sagen</p>
            <div className="dp-testimonials-grid">
              {testimonials.map((t, i) => {
                const photoSrc = t.testimonial_photo?.filename;
                return (
                  <div key={t._uid || i} className="dp-testimonial-card">
                    {t.testimonial_quote && (
                      <p className="dp-testimonial-quote">&#x201E;{t.testimonial_quote}&#x201C;</p>
                    )}
                    <div className="dp-testimonial-author-row">
                      <div className="dp-testimonial-photo">
                        {photoSrc ? (
                          <img
                            src={photoSrc}
                            alt={t.testimonial_photo_alt || t.testimonial_photo?.alt || t.testimonial_name || ''}
                          />
                        ) : (
                          <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fill="none">
                            <circle cx="40" cy="33" r="18" fill="#D8D4CE" />
                            <path d="M 8 76 Q 40 56 72 76" fill="#D8D4CE" />
                          </svg>
                        )}
                      </div>
                      <div className="dp-testimonial-author-info">
                        {t.testimonial_name && (
                          <strong className="dp-testimonial-name">{t.testimonial_name}</strong>
                        )}
                        {t.testimonial_role && (
                          <span className="dp-testimonial-role">{t.testimonial_role}</span>
                        )}
                        {t.testimonial_customer_name && (
                          <span className="dp-testimonial-customer">{t.testimonial_customer_name}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="dp-cta">
        <div className="container dp-cta-inner">
          <h2 className="dp-cta-h2">{cta_headline}</h2>
          <p className="dp-cta-text">{cta_text}</p>
          <a href={cta_href} className="btn btn-primary">
            {cta_label} <span className="arrow">→</span>
          </a>
        </div>
      </section>
    </>
  );
}
