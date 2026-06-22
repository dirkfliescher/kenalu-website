import TeamMemberTeaser from './TeamMemberTeaser';

export default function AboutTeam({ members }) {
  if (!members?.length) return null;

  return (
    <section className="about-team">
      <div className="container">
        <p className="section-label">Das Team</p>
        <h2>Zwei Köpfe. Ein Ansatz.</h2>
        <p className="section-sub">
          kenalu ist klein und bewusst so. Dirk bringt Strategie, Discovery und Konzept.
          Stanislav bringt technische Tiefe und Umsetzungskraft. Zusammen bauen wir AI-Produkte,
          die wirklich funktionieren.
        </p>
        <div className="team-grid">
          {members.map((member) => (
            <TeamMemberTeaser key={member.uuid} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
