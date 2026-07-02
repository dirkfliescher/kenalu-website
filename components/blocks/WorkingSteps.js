const STEPS = [
  {
    num: '01',
    title: 'Die richtige Frage finden',
    text: 'Wir beginnen nicht bei der Technologie. Wir klären, was für Nutzer, Mitarbeitende, Kunden oder Prozesse besser möglich werden soll – und welche Entscheidung tatsächlich offen ist.',
  },
  {
    num: '02',
    title: 'Annahmen sichtbar machen',
    text: 'Statt lange über abstrakte Ideen zu sprechen, übersetzen wir zentrale Annahmen in Szenarien, Produktlogik, Prototypen oder klare Entscheidungsgrundlagen.',
  },
  {
    num: '03',
    title: 'Gemeinsam bauen',
    text: 'Strategie, Experience Design und Engineering arbeiten eng zusammen. So bleiben Kontext, Prioritäten und technische Konsequenzen während der Umsetzung sichtbar.',
  },
  {
    num: '04',
    title: 'Tragfähig weiterdenken',
    text: 'Nicht alles muss im ersten Release fertig sein. Aber Architektur, Integrationen, Betrieb und Weiterentwicklung werden früh genug berücksichtigt, damit die Richtung langfristig trägt.',
  },
];

export default function WorkingSteps() {
  return (
    <section className="aw-steps">
      <div className="container">
        <div className="aw-steps-header">
          <p className="section-label">Wie wir arbeiten</p>
          <h2 className="aw-steps-headline">Von der offenen Frage zu einer tragfähigen Lösung.</h2>
          <p className="aw-steps-intro">
            Nicht jedes Vorhaben beginnt gleich. Manche Teams brauchen zuerst Klarheit. Andere
            müssen eine Idee sichtbar machen oder ein bestehendes Produkt weiterentwickeln. Die
            Arbeitsweise bleibt dabei dieselbe: früh konkret werden, bewusst entscheiden und
            Umsetzung von Anfang an mitdenken.
          </p>
        </div>
        <div className="aw-steps-grid">
          {STEPS.map((step) => (
            <div key={step.num} className="aw-step">
              <span className="aw-step-num">{step.num}</span>
              <h3 className="aw-step-title">{step.title}</h3>
              <p className="aw-step-text">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
