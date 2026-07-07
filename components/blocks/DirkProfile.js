import PrintButton from './PrintButton';

export default function DirkProfile({ blok = {}, testimonials = [], photo = null, photoAlt = 'Dirk Fliescher' }) {
  const {
    hero_eyebrow    = 'Dirk Fliescher',
    hero_headline   = 'Strategie, Nutzerperspektive, Umsetzung — in einer Person.',
    hero_intro      = 'Ich begleite digitale Vorhaben von der ersten Frage bis zum fertigen Produkt. Nicht als Generalist, der alles macht — sondern als jemand, der die Perspektiven früh zusammenbringt, die am Ende den Unterschied machen.',
    hero_location   = 'Zürich',
    hero_linkedin   = 'https://www.linkedin.com/in/dirkfliescher/',
    bio_headline    = 'Wer ich bin',
    bio_text        = 'Seit über 25 Jahren arbeite ich an digitalen Projekten — in Banken, Beratungen, Agenturen und als selbstständiger Berater. Den Grundstein habe ich bei GFT Technologies und Credit Suisse gelegt: Projektmanagement in anspruchsvollen, regulierten Umgebungen. Danach habe ich mich auf Informationsarchitektur und strategische Beratung spezialisiert, bei Infocentric Research AG.\n\nSeit 2013 bin ich mit meiner eigenen Consulting GmbH unterwegs. Über elf Jahre war ich Partner bei viu, einem Schweizer Studio für digitale Produkte. Diese Kombination — strategische Tiefe, Nutzerperspektive und echte Umsetzungserfahrung — ist die Basis von kenalu.',
    stations        = [],
    projects        = [],
    themes          = [],
    cta_headline    = 'Interesse an einem Gespräch?',
    cta_text        = '30 Minuten, unverbindlich. Kein Pitch — ein ehrliches Gespräch über eure Ausgangslage.',
    cta_label       = 'Gespräch starten',
    cta_href        = '/contact',
  } = blok;

  const defaultStations = [
    {
      period: '2013 – heute',
      role: 'Founder & Principal Consultant',
      org: 'Dirk Fliescher Consulting GmbH / kenalu',
      location: 'Zürich',
      text: 'Unabhängige Beratung und Umsetzungsbegleitung für digitale Vorhaben. Seit 2025 unter dem Namen kenalu mit dem Fokus auf Intelligent Experiences.',
    },
    {
      period: '2014 – 2026',
      role: 'Partner',
      org: 'viu',
      location: 'Zürich',
      text: 'Über elf Jahre als Partner bei einem der führenden Schweizer Studios für digitale Produkte. Commerce, Innovation, strategisches Prototyping, Online Services.',
    },
    {
      period: '2009 – 2013',
      role: 'Principal Strategic Consultant',
      org: 'Infocentric Research AG',
      location: 'Zürich',
      text: 'Spezialisierung auf Information Management (ECM), Informationsarchitektur, Strategiedefinition und Business Engineering.',
    },
    {
      period: '2008 – 2009',
      role: 'Assistant Vice President',
      org: 'Credit Suisse',
      location: 'Zürich',
      text: 'Business Engineering und Projektleitung in einem der grössten Finanzinstitute der Schweiz.',
    },
    {
      period: '2001 – 2007',
      role: 'Senior Project Manager / Key Account Manager',
      org: 'GFT Technologies Schweiz AG',
      location: 'Wallisellen',
      text: 'Projektmanagement und Key Account Management im Bereich Public Sector und Finanzdienstleistungen.',
    },
  ];

  const defaultProjects = [
    {
      _uid: 'proj-1',
      client: 'Saferparty.ch',
      period: '2021 – 2022',
      sector: 'NGO · Public Health',
      text: 'Relaunch der deutschsprachigen Informationsplattform zum sicheren Umgang mit Substanzen. Klare Informationsarchitektur, nutzerfreundliches Design — für eine Zielgruppe, die Vertrauen braucht, keine Belehrung.',
      award: 'Best of Swiss Web 2022 — Silber, Public Value',
    },
    {
      _uid: 'proj-2',
      client: 'Pax Lebensversicherung',
      period: '2020 – 2021',
      sector: 'Finanzdienstleistungen',
      text: 'Relaunch der Online-Präsenz der Pax Schweizerischen Lebensversicherungs AG. Neues Design, neue Informationsarchitektur, neue technische Plattform auf Basis von Sitecore. End-to-end — von der Strategie bis zur Umsetzungsbegleitung.',
      award: null,
    },
    {
      _uid: 'proj-3',
      client: 'Kantonspolizei',
      period: '2021 – 2023',
      sector: 'Public Sector · Commerce',
      text: 'Internes Bestellsystem für eine grosse Schweizer Kantonspolizei — für persönliches, verbrauchsgebundenes und Einsatzmaterial. Komplexe Anforderungen, klare Lösung auf Basis von SAP Commerce.',
      award: null,
    },
    {
      _uid: 'proj-4',
      client: 'Thurbo AG',
      period: '2022 – 2023',
      sector: 'Transport · Interne Kommunikation',
      text: 'Konzeption, Design und Entwicklung der neuen internen Kommunikationsplattform für den Regionalbahnbetreiber Thurbo in Winterthur. Nutzerzentrierter Ansatz, agile Umsetzung.',
      award: null,
    },
    {
      _uid: 'proj-5',
      client: 'SIX Group — Advanced Tax Services',
      period: '2019 – 2020',
      sector: 'Finanzmarktinfrastruktur',
      text: 'Digitales Steuerprojekt bei SIX Group. Konzeption und Umsetzungsbegleitung im regulierten Finanzumfeld.',
      award: null,
    },
    {
      _uid: 'proj-6',
      client: 'SIX Group — Cyber Security Operations Center',
      period: '2018',
      sector: 'Finanzdienstleistungen · Cybersecurity',
      text: 'Aufbau und Unterstützung der Sales-Aktivitäten für das Cyber Security Operations Center bei SIX — für institutionelle Kunden aus der Finanzwelt.',
      award: null,
    },
    {
      _uid: 'proj-7',
      client: 'SIX Payment Services — Website Relaunch',
      period: '2017 – 2019',
      sector: 'Finanzmarktinfrastruktur · Digital',
      text: 'Relaunch der Website von SIX Payment Services. Neukonzeption, Design und Umsetzungsbegleitung im komplexen Konzernumfeld.',
      award: null,
    },
    {
      _uid: 'proj-8',
      client: 'SIX Group — Digital ID',
      period: '2018',
      sector: 'Finanzmarktinfrastruktur · Digital Identity',
      text: 'Konzeption und Umsetzungsbegleitung für ein Digital Identity-Vorhaben bei SIX Group.',
      award: null,
    },
  ];

  const defaultThemes = [
    {
      label: 'Strategie vor Lösung',
      text: 'Ich helfe Teams, das richtige Problem zu verstehen, bevor in Lösungen investiert wird.',
    },
    {
      label: 'Nutzerperspektive',
      text: 'Digitale Produkte gelingen, wenn sie zu dem passen, wie Menschen wirklich denken und handeln.',
    },
    {
      label: 'Technisches Verständnis',
      text: 'Ich spreche die Sprache von Engineering-Teams — ohne selbst zu coden. Das verhindert teure Missverständnisse.',
    },
    {
      label: 'Unabhängige Einschätzung',
      text: 'Kein Interesse an langen Mandaten um des Mandats willen. Meine Empfehlungen sind ehrlich, auch wenn sie unbequem sind.',
    },
  ];

  const resolvedStations = stations.length > 0 ? stations : defaultStations;
  const resolvedProjects = projects.length > 0 ? projects : defaultProjects;
  const resolvedThemes   = themes.length > 0 ? themes : defaultThemes;
  const bioLines = bio_text.split('\n\n');

  return (
    <>
      {/* ── Cover: Hero + Kontakt (im Druck 50:50) ── */}
      <div className="dp-cover">
        <section className="dp-hero">
          <div className="dp-hero-inner container">
            <p className="section-label dp-hero-label">{hero_eyebrow}</p>
            <h1 className="dp-hero-h1">{hero_headline}</h1>
            <p className="dp-hero-intro">{hero_intro}</p>
            <div className="dp-hero-meta">
              <span className="dp-meta-item">◎ {hero_location}</span>
              <a
                href={hero_linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="dp-meta-item dp-meta-link"
              >
                in LinkedIn
              </a>
            </div>
            <PrintButton />
          </div>
        </section>

        {/* ── Kontakt (nur Print: erscheint auf Titelseite rechts) ── */}
        <div className="dp-print-contact" aria-hidden="true">
          <div className="dp-print-contact-inner">
            {photo?.filename && (
              <div className="dp-print-contact-photo">
                <img src={photo.filename} alt={photoAlt} />
              </div>
            )}
            <div>
              <strong>Dirk Fliescher</strong>
              <span>Principal Consultant</span>
              <span>kenalu · a Brand of Dirk Fliescher Consulting GmbH</span>
              <span>Zürich, Switzerland</span>
            </div>
            <div>
              <span>dirk@fliescher.ch</span>
              <span>+41 79 301 54 63</span>
              <span>kenalu.ch</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bio ── */}
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
            {bioLines.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sprachen ── */}
      <section className="dp-languages">
        <div className="container dp-languages-inner">
          <div className="dp-languages-label">
            <p className="section-label">Sprachen</p>
          </div>
          <div className="dp-languages-list">
            <div className="dp-language-row"><span className="dp-language-name">Deutsch</span><span className="dp-language-level">Muttersprache</span></div>
            <div className="dp-language-row"><span className="dp-language-name">Englisch</span><span className="dp-language-level">Verhandlungssicher</span></div>
            <div className="dp-language-row"><span className="dp-language-name">Französisch</span><span className="dp-language-level">Grundkenntnisse</span></div>
          </div>
        </div>
      </section>

      {/* ── Stationen ── */}
      <section className="dp-stations">
        <div className="container">
          <p className="section-label dp-stations-label">Werdegang</p>
          <div className="dp-stations-list">
            {resolvedStations.map((s, i) => (
              <div key={i} className="dp-station">
                <div className="dp-station-period">{s.period}</div>
                <div className="dp-station-content">
                  <strong className="dp-station-role">{s.role}</strong>
                  <span className="dp-station-org">{s.org}{s.location ? ` · ${s.location}` : ''}</span>
                  {s.text && <p className="dp-station-text">{s.text}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projekte ── */}
      <section className="dp-projects">
        <div className="container">
          <p className="section-label dp-projects-label">Ausgewählte Projekte</p>
          <div className="dp-projects-list">
            {resolvedProjects.map((p, i) => (
              <details key={p._uid || i} className="dp-project-item">
                <summary className="dp-project-summary">
                  <div className="dp-project-summary-main">
                    <strong className="dp-project-client">{p.client}</strong>
                    {p.sector && <span className="dp-project-sector">{p.sector}</span>}
                  </div>
                  <div className="dp-project-summary-right">
                    <span className="dp-project-period">{p.period}</span>
                    <span className="dp-project-chevron" aria-hidden="true">›</span>
                  </div>
                </summary>
                <div className="dp-project-body">
                  <p className="dp-project-text">{p.text}</p>
                  {p.detail && <p className="dp-project-detail">{p.detail}</p>}
                  {p.award && (
                    <div className="dp-project-award">
                      <span className="dp-award-icon">◆</span>
                      {p.award}
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Themen ── */}
      <section className="dp-themes">
        <div className="container">
          <p className="section-label dp-themes-label">Was ich einbringe</p>
          <div className="dp-themes-grid">
            {resolvedThemes.map((t, i) => (
              <div key={i} className="dp-theme-card">
                <strong className="dp-theme-label">{t.label}</strong>
                <p className="dp-theme-text">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      {testimonials.length > 0 && (
        <section className="dp-testimonials">
          <div className="container">
            <p className="section-label dp-testimonials-label">Was andere sagen</p>
            <div className="dp-testimonials-grid">
              {testimonials.map((t, i) => {
                const rawPhoto = t.testimonial_photo;
                const photo = Array.isArray(rawPhoto) ? rawPhoto[0] : rawPhoto;
                const photoSrc = photo?.filename;
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
                            alt={t.testimonial_photo_alt || photo?.alt || t.testimonial_name || ''}
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
