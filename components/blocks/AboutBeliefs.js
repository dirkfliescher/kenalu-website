import BeliefItem from './BeliefItem';

export default function AboutBeliefs({ blok }) {
  return (
    <section className="about-beliefs">
      <div className="container">
        {blok.about_beliefs_label && <p className="section-label">{blok.about_beliefs_label}</p>}
        {blok.about_beliefs_headline && <h2 style={{ margin: '0.5rem 0 3rem' }}>{blok.about_beliefs_headline}</h2>}
        {blok.about_beliefs_items?.length > 0 && (
          <div className="beliefs-grid">
            {blok.about_beliefs_items.map((item) => (
              <BeliefItem key={item._uid} blok={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
