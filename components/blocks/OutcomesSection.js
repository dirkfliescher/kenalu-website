'use client';

// Fallback-Daten falls noch kein Storyblok-Content vorhanden
const FALLBACK = [
  { number: '01', headline: 'Software, die passt', body: 'Kein Kompromiss mehr. Kein Anpassen an ein System, das nicht für euch gebaut wurde. Sondern genau das, was gebraucht wird.', area: 'Fit' },
  { number: '02', headline: 'Teams, die entlastet sind', body: 'Intelligente Workflows, die repetitive Aufgaben übernehmen. Mehr Zeit für das, was Menschen wirklich gut können.', area: 'Intern' },
  { number: '03', headline: 'Kunden, die besser geführt werden', body: 'Experiences, die verstehen und führen. Nicht Oberflächen, die einfach vorhanden sind. Das ist der Unterschied.', area: 'Kunde' },
  { number: '04', headline: 'Lösungen, die wachsen', body: 'Enterprise-ready von Tag 1. Skalierbar, integrierbar, wartbar. Gebaut für echte Anforderungen, nicht für den Demo-Tag.', area: 'Scale' },
];

export default function OutcomesSection({ blok }) {
  const items = blok?.outcomes_section_items?.length
    ? blok.outcomes_section_items
    : FALLBACK.map(f => ({
        outcome_number:   f.number,
        outcome_headline: f.headline,
        outcome_body:     f.body,
        outcome_area:     f.area,
      }));

  const label    = blok?.outcomes_section_label    || 'Was entsteht';
  const headline = blok?.outcomes_section_headline || 'Ergebnisse, die zählen';
  const sub      = blok?.outcomes_section_sub      || 'Massgeschneiderte AI-Produkte, die wirklich passen: für Kunden, Teams und das Unternehmen als Ganzes.';

  return (
    <section className="outcomes-section">
      <div className="container">
        <div className="outcomes-header">
          <p className="section-label">{label}</p>
          <h2>{headline}</h2>
          <p className="section-sub">{sub}</p>
        </div>
        <div className="outcomes-grid">
          {items.map((item, i) => (
            <div key={item._uid || i} className="outcome-card">
              <div className="outcome-meta">
                <span className="outcome-number">{item.outcome_number}</span>
                <span className="outcome-area">{item.outcome_area}</span>
              </div>
              <h3 className="outcome-headline">{item.outcome_headline}</h3>
              <p className="outcome-body">{item.outcome_body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
