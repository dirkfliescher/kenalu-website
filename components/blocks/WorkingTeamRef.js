import Link from 'next/link';

const PEOPLE = [
  { name: 'Dirk Fliescher', role: 'Strategie & Experience Design' },
  { name: 'Stanislav Raskin', role: 'Engineering & Architektur' },
];

export default function WorkingTeamRef() {
  return (
    <section className="aw-team">
      <div className="container">
        <div className="aw-team-header">
          <p className="section-label">Wer daran arbeitet</p>
          <h2 className="aw-team-headline">Direkt mit den Menschen, die Verantwortung tragen.</h2>
          <p className="aw-team-text">
            Kenalu verbindet Strategie und Experience Design mit technischer Architektur und
            Engineering. Die Menschen, die ein Vorhaben verstehen, bleiben nah an den wichtigen
            Entscheidungen – vom ersten Gespräch bis zur Umsetzung.
          </p>
        </div>
        <div className="aw-team-people">
          {PEOPLE.map((p) => (
            <div key={p.name} className="aw-person">
              <strong className="aw-person-name">{p.name}</strong>
              <span className="aw-person-sep">—</span>
              <span className="aw-person-role">{p.role}</span>
            </div>
          ))}
        </div>
        <Link href="/team" className="link-arrow">
          Team kennenlernen →
        </Link>
      </div>
    </section>
  );
}
