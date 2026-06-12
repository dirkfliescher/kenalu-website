export default function TeamMemberCard({ blok }) {
  return (
    <div className="team-card">
      <div className="team-card-photo">
        {blok.team_member_card_photo?.filename ? (
          <img
            src={blok.team_member_card_photo.filename}
            alt={blok.team_member_card_photo_alt || blok.team_member_card_photo.alt || ''}
          />
        ) : (
          <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" fill="none" style={{ width: '50%' }}>
            <circle cx="60" cy="55" r="30" fill="#D8D4CE" />
            <path d="M 10 150 Q 60 100 110 150" fill="#D8D4CE" />
          </svg>
        )}
      </div>
      <div className="team-card-body">
        {blok.team_member_card_name && <h3>{blok.team_member_card_name}</h3>}
        {blok.team_member_card_role && <p className="team-role">{blok.team_member_card_role}</p>}
        {blok.team_member_card_bio && <p>{blok.team_member_card_bio}</p>}
      </div>
    </div>
  );
}
