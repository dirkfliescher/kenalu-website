import Link from 'next/link';

export default function InsightAuthor({ author }) {
  if (!author) return null;
  const { content, slug } = author;
  if (!content?.team_member_name) return null;

  return (
    <Link href={`/zusammenarbeit/${slug}`} className="insight-author">
      <div className="insight-author-photo">
        {content.team_member_photo?.filename ? (
          <img
            src={content.team_member_photo.filename}
            alt={content.team_member_photo_alt || content.team_member_photo.alt || ''}
          />
        ) : (
          <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" fill="none">
            <circle cx="60" cy="55" r="30" fill="#D8D4CE" />
            <path d="M 10 150 Q 60 100 110 150" fill="#D8D4CE" />
          </svg>
        )}
      </div>
      <div className="insight-author-info">
        <span className="insight-author-label">Geschrieben von</span>
        <span className="insight-author-name">{content.team_member_name}</span>
        {content.team_member_role && <span className="insight-author-role">{content.team_member_role}</span>}
      </div>
    </Link>
  );
}
