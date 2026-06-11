import FeatureItem from './FeatureItem';

export default function FeatureList({ blok }) {
  return (
    <section className="why">
      <div className="container why-grid">
        <div className="why-text">
          {blok.feature_list_label && <div className="section-label">{blok.feature_list_label}</div>}
          {blok.feature_list_headline && <h2>{blok.feature_list_headline}</h2>}
          {blok.feature_list_text && <p>{blok.feature_list_text}</p>}
          {blok.feature_list_link_text && (
            <a href={blok.feature_list_link_url || '#'} className="link-arrow">
              {blok.feature_list_link_text} <span>→</span>
            </a>
          )}
        </div>
        {blok.feature_list_items?.length > 0 && (
          <div className="why-features">
            {blok.feature_list_items.map((item) => (
              <FeatureItem key={item._uid} blok={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
