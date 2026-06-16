import ExperienceLogoItem from './ExperienceLogoItem';

export default function ExperienceWall({ blok }) {
  return (
    <section className="experience-wall">
      <div className="container">
        {blok.experience_wall_label && (
          <p className="section-label">{blok.experience_wall_label}</p>
        )}
        {blok.experience_wall_headline && (
          <h2 style={{ margin: '0.5rem 0 1rem' }}>{blok.experience_wall_headline}</h2>
        )}
        {blok.experience_wall_note && (
          <p className="experience-wall-note">{blok.experience_wall_note}</p>
        )}
        {blok.experience_wall_items?.length > 0 && (
          <div className="experience-wall-grid">
            {blok.experience_wall_items.map((item) => (
              <ExperienceLogoItem key={item._uid} blok={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
