export default function FeatureItem({ blok }) {
  return (
    <div className="feature">
      {blok.feature_item_title && <div className="feature-title">{blok.feature_item_title}</div>}
      {blok.feature_item_text && <div className="feature-desc">{blok.feature_item_text}</div>}
    </div>
  );
}
