import TeamMemberTeaser from './TeamMemberTeaser';

export default function AboutTeam({ blok, members }) {
  if (!members?.length) return null;

  const label    = blok?.about_team_label    || 'Das Team';
  const headline = blok?.about_team_headline || 'Zwei Köpfe. Ein Ansatz.';
  const sub      = blok?.about_team_sub      || 'kenalu ist klein und bewusst so. Dirk bringt Strategie, Discovery und Konzept. Stanislav bringt technische Tiefe und Umsetzungskraft. Zusammen bauen wir AI-Produkte, die wirklich funktionieren.';

  return (
    <section className="about-team">
      <div className="container">
        <p className="section-label">{label}</p>
        <h2>{headline}</h2>
        <p className="section-sub">{sub}</p>
        <div className="team-grid">
          {members.map((member) => (
            <TeamMemberTeaser key={member.uuid} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
