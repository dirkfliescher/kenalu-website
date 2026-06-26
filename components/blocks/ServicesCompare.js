import Link from 'next/link';

const SERVICES = [
  {
    number: '01',
    name: 'Klarheit',
    anchor: '#service-01',
    tagline: 'Verstehen, was wirklich zählt',
    when: [
      'Du weisst noch nicht, wo AI konkret helfen würde',
      'Du willst vor einer Investition die richtige Richtung kennen',
      'Du brauchst eine fundierte Entscheidungsgrundlage',
    ],
  },
  {
    number: '02',
    name: 'Rapid Build',
    anchor: '#service-02',
    tagline: 'In Tagen zu einem greifbaren Prototyp',
    when: [
      'Du hast eine klare Idee und willst sie schnell testbar machen',
      'Du willst intern zeigen, was möglich ist — bevor du gross investierst',
      'Du brauchst ein MVP, das funktioniert — nicht poliert, aber echt',
    ],
  },
  {
    number: '03',
    name: 'Produkt',
    anchor: '#service-03',
    tagline: 'AI als Kern des Produkts',
    when: [
      'Du willst kein Feature, sondern ein Produkt rund um AI bauen',
      'Du hast Klarheit über Ziel und Zielgruppe',
      'Du bist bereit, in mehreren Iterationen zu denken',
    ],
  },
  {
    number: '04',
    name: 'Urteil',
    anchor: '#service-04',
    tagline: 'Unabhängige Einschätzung, klare Aussage',
    when: [
      'Du hast ein Angebot, eine Strategie oder einen Plan — und willst eine ehrliche Meinung',
      'Du vertraust dem Lieferanten nicht blind und willst eine zweite Stimme',
      'Du brauchst jemanden, der klar sagt, was er sieht',
    ],
  },
];

export default function ServicesCompare() {
  return (
    <section className="svc-compare">
      <div className="container container--wide">
        <p className="section-label">Was passt zu dir?</p>
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
