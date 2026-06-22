'use client';

const OUTCOMES = [
  {
    number: '01',
    headline: 'Software, die passt',
    body: 'Kein Kompromiss mehr. Kein Anpassen an ein System, das nicht für euch gebaut wurde. Sondern genau das, was gebraucht wird.',
    area: 'Fit',
  },
  {
    number: '02',
    headline: 'Teams, die entlastet sind',
    body: 'Intelligente Workflows, die repetitive Aufgaben übernehmen. Mehr Zeit für das, was Menschen wirklich gut können.',
    area: 'Intern',
  },
  {
    number: '03',
    headline: 'Kunden, die besser geführt werden',
    body: 'Experiences, die verstehen und führen – nicht Oberflächen, die einfach vorhanden sind. Das ist der Unterschied.',
    area: 'Kunde',
  },
  {
    number: '04',
    headline: 'Lösungen, die wachsen',
    body: 'Enterprise-ready von Tag 1. Skalierbar, integrierbar, wartbar – gebaut für echte Anforderungen, nicht für den Demo-Tag.',
    area: 'Scale',
  },
];

export default function OutcomesSection() {
  return (
    <section className="outcomes-section">
      <div className="container">
        <div className="outcomes-header">
          <p className="section-label">Was entsteht</p>
          <h2>Ergebnisse, die zählen</h2>
          <p className="section-sub">
            Massgeschneiderte AI-Produkte, die wirklich passen – für Kunden, Teams und das Unternehmen als Ganzes.
          </p>
        </div>
        <div className="outcomes-grid">
          {OUTCOMES.map((item) => (
            <div key={item.number} className="outcome-card">
              <div className="outcome-meta">
                <span className="outcome-number">{item.number}</span>
                <span className="outcome-area">{item.area}</span>
              </div>
              <h3 className="outcome-headline">{item.headline}</h3>
              <p className="outcome-body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
