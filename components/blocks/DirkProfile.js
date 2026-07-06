export default function DirkProfile({ blok = {} }) {
  const {
    hero_eyebrow    = 'Dirk Fliescher',
    hero_headline   = 'Strategie, Nutzerperspektive, Umsetzung — in einer Person.',
    hero_intro      = 'Ich begleite digitale Vorhaben von der ersten Frage bis zum fertigen Produkt. Nicht als Generalist, der alles macht — sondern als jemand, der die Perspektiven früh zusammenbringt, die am Ende den Unterschied machen.',
    hero_location   = 'Zürich',
    hero_linkedin   = 'https://www.linkedin.com/in/dirkfliescher/',
    bio_headline    = 'Wer ich bin',
    bio_text        = 'Seit über 25 Jahren arbeite ich an digitalen Projekten — in Banken, Beratungen, Agenturen und als selbstständiger Berater. Den Grundstein habe ich bei GFT Technologies und Credit Suisse gelegt: Projektmanagement in anspruchsvollen, regulierten Umgebungen. Danach habe ich mich auf Informationsarchitektur und strategische Beratung spezialisiert, bei Infocentric Research AG.\n\nSeit 2013 bin ich mit meiner eigenen Consulting GmbH unterwegs. Über elf Jahre war ich Partner bei viu, einem Schweizer Studio für digitale Produkte. Diese Kombination — strategische Tiefe, Nutzerperspektive und echte Umsetzungserfahrung — ist die Basis von kenalu.',
    stations        = [],
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
      text: 'Projektemangement und Key Account Management im Bereich Public Sector und Finanzdienstleistungen.',
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
  const resolvedThemes   = themes.length > 0 ? themes : defaultThemes;
  const bioLines = bio_text.split('\n\n');

  return (
    <>
      {/* ── Hero ── */}
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
        </div>
      </section>

      {/* ── Bio ── */}
      <section className="dp-bio">
        <div className="container dp-bio-inner">
          <div className="dp-bio-label">
            <p className="section-label">{bio_headline}</p>
          </div>
          <div className="dp-bio-text">
            {bioLines.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
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
