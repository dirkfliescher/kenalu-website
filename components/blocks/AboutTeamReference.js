import Link from 'next/link';

export default function AboutTeamReference({ blok }) {
  const people = [
    { name: blok.person_1_name, role: blok.person_1_role },
    { name: blok.person_2_name, role: blok.person_2_role },
  ].filter((p) => p.name);

  return (
    <section className="aw-team">
      <div className="container">
        <div className="aw-team-header">
          {blok.eyebrow && (
            <p className="section-label">{blok.eyebrow}</p>
          )}
          {blok.headline && (
            <h2 className="aw-team-headline">{blok.headline}</h2>
          )}
          {blok.body && (
            <p className="aw-team-text">{blok.body}</p>
          )}
        </div>
        {people.length > 0 && (
          <div className="aw-team-people">
            {people.map((p) => (
              <div key={p.name} className="aw-person">
                <strong className="aw-person-name">{p.name}</strong>
                <span className="aw-person-sep">—</span>
                <span className="aw-person-role">{p.role}</span>
              </div>
            ))}
          </div>
        )}
        {blok.link_label && (
          <Link href={blok.link_url || '/about'} className="link-arrow">
            {blok.link_label}
          </Link>
        )}
      </div>
    </section>
  );
}
