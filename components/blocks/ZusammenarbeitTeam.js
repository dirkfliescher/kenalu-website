import TeamMemberCard from './TeamMemberCard';

export default function ZusammenarbeitTeam({ blok }) {
  return (
    <section className="zusammenarbeit-team">
      <div className="container">
        {blok.zusammenarbeit_team_label && <p className="section-label">{blok.zusammenarbeit_team_label}</p>}
        {blok.zusammenarbeit_team_headline && <h2>{blok.zusammenarbeit_team_headline}</h2>}
        {blok.zusammenarbeit_team_intro && <p className="section-sub">{blok.zusammenarbeit_team_intro}</p>}
        {blok.zusammenarbeit_team_items?.length > 0 && (
          <div className="team-grid">
            {blok.zusammenarbeit_team_items.map((item) => (
              <TeamMemberCard key={item._uid} blok={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
