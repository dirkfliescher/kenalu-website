import Link from 'next/link';

export default function TeamMemberTeaser({ member }) {
  if (!member) return null;
  const { content, slug } = member;

  return (
    <Link href={`/zusammenarbeit/${slug}`} className="team-card">
      <div className="team-card-photo">
        {content.team_member_photo?.filename ? (
          <img
            src={content.team_member_photo.filename}
            alt={content.team_member_photo_alt || content.team_member_photo.alt || ''}
          />
        ) : (
          <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" fill="none" style={{ width: '50%' }}>
            <circle cx="60" cy="55" r="30" fill="#D8D4CE" />
            <path d="M 10 150 Q 60 100 110 150" fill="#D8D4CE" />
          </svg>
        )}
      </div>
      <div className="team-card-body">
        {content.team_member_tag && <span className="insight-tag">{content.team_member_tag}</span>}
        {content.team_member_name && <h3>{content.team_member_name}</h3>}
        {content.team_member_role && <p className="team-role">{content.team_member_role}</p>}
        {content.team_member_teaser && <p>{content.team_member_teaser}</p>}
        <div className="team-card-footer">
          <span className="link-arrow">Mehr erfahren <span>→</span></span>
        </div>
      </div>
    </Link>
  );
}
