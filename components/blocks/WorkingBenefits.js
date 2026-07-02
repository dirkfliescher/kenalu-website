const BENEFITS = [
  {
    title: 'Direkte Verantwortung',
    text: 'Die Menschen, die eure Situation verstehen und die Richtung mitentwickeln, bleiben auch in der Umsetzung nah dran.',
  },
  {
    title: 'Früher etwas Greifbares',
    text: 'Zentrale Fragen werden nicht nur diskutiert. Sie werden so konkret, dass Teams sie sehen, testen und fundierter beurteilen können.',
  },
  {
    title: 'Bestehendes sinnvoll nutzen',
    text: 'Wir setzen auf Plattformen, Standards und Systeme, wenn sie ein gutes Fundament schaffen. Eigenständig entwickeln wir dort, wo Nutzererlebnis, Differenzierung oder Zukunftsfähigkeit es verlangen.',
  },
  {
    title: 'Keine künstliche Komplexität',
    text: 'Nicht jedes Vorhaben braucht ein grosses Programm. Wir arbeiten in einer Form, die zur Frage, zum Kontext und zur tatsächlichen Entscheidung passt.',
  },
];

export default function WorkingBenefits() {
  return (
    <section className="aw-benefits">
      <div className="container">
        <div className="aw-benefits-header">
          <p className="section-label">Was das für euch bedeutet</p>
          <h2 className="aw-benefits-headline">
            Weniger Reibung. Frühere Klarheit. Bessere Voraussetzungen für das, was folgt.
          </h2>
        </div>
        <div className="aw-benefits-grid">
          {BENEFITS.map((b) => (
            <div key={b.title} className="aw-benefit">
              <h3 className="aw-benefit-title">{b.title}</h3>
              <p className="aw-benefit-text">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
