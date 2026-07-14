import Link from 'next/link';

// ── Fallback-Daten (aktiver Inhalt, wenn Storyblok leer) ─────────────
const DEFAULT_SERVICES = [
  {
    number: '01',
    name: 'Klarheit',
    anchor: '#service-01',
    tagline: 'Verstehen, was wirklich zählt',
    when: [
      'Ihr wisst noch nicht, wo AI konkret helfen würde',
      'Ihr wollt vor einer Investition die richtige Richtung kennen',
      'Ihr braucht eine fundierte Entscheidungsgrundlage',
    ],
  },
  {
    number: '02',
    name: 'Rapid Build',
    anchor: '#service-02',
    tagline: 'In Tagen zu einem greifbaren Prototyp',
    when: [
      'Ihr habt eine klare Idee und wollt sie schnell testbar machen',
      'Ihr wollt intern zeigen, was möglich ist, bevor ihr gross investiert',
      'Ihr braucht ein MVP, das funktioniert: nicht poliert, aber echt',
    ],
  },
  {
    number: '03',
    name: 'Produkt',
    anchor: '#service-03',
    tagline: 'AI als Kern des Produkts',
    when: [
      'Ihr wollt kein Feature, sondern ein Produkt rund um AI bauen',
      'Ihr habt Klarheit über Ziel und Zielgruppe',
      'Ihr seid bereit, in mehreren Iterationen zu denken',
    ],
  },
  {
    number: '04',
    name: 'Urteil',
    anchor: '#service-04',
    tagline: 'Unabhängige Einschätzung, klare Aussage',
    when: [
      'Ihr habt ein Angebot, eine Strategie oder einen Plan und wollt eine ehrliche Meinung dazu',
      'Ihr vertraut dem Lieferanten nicht blind und wollt eine zweite Stimme',
      'Ihr braucht jemanden, der klar sagt, was er sieht',
    ],
  },
];

// ── Storyblok → interne Struktur ─────────────────────────────────────
function parseItems(blokItems) {
  if (!blokItems?.length) return DEFAULT_SERVICES;
  return blokItems.map((item) => ({
    number:  item.number  || '',
    name:    item.name    || '',
    anchor:  item.anchor  || '#',
    tagline: item.tagline || '',
    // when_items: Textarea mit einem Eintrag pro Zeile
    when: (item.when_items || '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean),
  }));
}

export default function ServicesCompare({ blok = {} }) {
  const services = parseItems(blok.items);
  const label    = blok.label || 'Was passt zu euch?';

  return (
    <section className="svc-compare">
      <div className="container container--wide">
        <p className="section-label">{label}</p>
        <div className="svc-compare-grid">
          {services.map((svc) => (
            <Link key={svc.number} href={`/services${svc.anchor}`} className="svc-compare-card">
              <div className="svc-compare-head">
                <span className="svc-compare-number">{svc.number}</span>
                <span className="svc-compare-name">{svc.name}</span>
              </div>
              <p className="svc-compare-tagline">{svc.tagline}</p>
              <div className="svc-compare-when">
                <p className="svc-compare-when-label">Richtige Wahl, wenn …</p>
                <ul>
                  {svc.when.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <span className="svc-compare-link">Mehr erfahren →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
