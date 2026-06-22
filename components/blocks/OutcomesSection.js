'use client';

const OUTCOMES = [
  {
    number: '01',
    headline: 'Aus Besuchern werden Kunden',
    body: 'Kundenseitige Experiences, die den richtigen nächsten Schritt zeigen – und damit Konversionen steigern.',
    area: 'Kundenorientiert',
  },
  {
    number: '02',
    headline: 'Aus Aufwand wird Leichtigkeit',
    body: 'Interne Tools und Prozesse, die Teams entlasten statt behindern – durch Intelligenz, nicht durch Bürokratie.',
    area: 'Intern',
  },
  {
    number: '03',
    headline: 'Aus Investitionen werden Erträge',
    body: 'Digitale Produkte, die messbar zum Wachstum beitragen – weil sie auf echten Bedürfnissen und klarer Strategie aufbauen.',
    area: 'Business',
  },
  {
    number: '04',
    headline: 'Aus Erlebnissen wird Loyalität',
    body: 'Kunden und Mitarbeitende, die bleiben, weiterempfehlen und sich verstanden fühlen – das ist der Massstab.',
    area: 'Wirkung',
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
            kenalu verbindet Strategie, Nutzerverständnis und KI – und schafft damit konkrete Wirkung auf beiden Seiten: aussen wie innen.
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
