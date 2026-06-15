import TeamMemberTeaser from './TeamMemberTeaser';

export default function ZusammenarbeitTeam({ blok, members }) {
  return (
    <section className="zusammenarbeit-team">
      <div className="container">
        {blok.zusammenarbeit_team_label && <p className="section-label">{blok.zusammenarbeit_team_label}</p>}
        {blok.zusammenarbeit_team_headline && <h2>{blok.zusammenarbeit_team_headline}</h2>}
        {blok.zusammenarbeit_team_intro && <p className="section-sub">{blok.zusammenarbeit_team_intro}</p>}
        {members?.length > 0 && (
          <div className="team-grid">
            {members.map((member) => (
              <TeamMemberTeaser key={member.uuid} member={member} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
