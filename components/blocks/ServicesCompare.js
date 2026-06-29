import Link from 'next/link';

const SERVICES = [
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
      'Ihr wollt intern zeigen, was möglich ist — bevor ihr gross investiert',
      'Ihr braucht ein MVP, das funktioniert — nicht poliert, aber echt',
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
      'Ihr habt ein Angebot, eine Strategie oder einen Plan — und wollt eine ehrliche Meinung',
      'Ihr vertraut dem Lieferanten nicht blind und wollt eine zweite Stimme',
      'Ihr braucht jemanden, der klar sagt, was er sieht',
    ],
  },
];

export default function ServicesCompare() {
  return (
    <section className="svc-compare">
      <div className="container container--wide">
        <p className="section-label">Was passt zu euch?</p>
        <div className="svc-compare-grid">
          {SERVICES.map((svc) => (
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
