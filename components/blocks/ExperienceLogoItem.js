export default function ExperienceLogoItem({ blok }) {
  const hasLogo = blok.experience_item_logo?.filename;

  return (
    <div className="experience-logo-item">
      {hasLogo ? (
        <img
          src={blok.experience_item_logo.filename}
          alt={blok.experience_item_name || ''}
          title={blok.experience_item_name || ''}
        />
      ) : (
        <span className="experience-logo-name">{blok.experience_item_name}</span>
      )}
    </div>
  );
}
