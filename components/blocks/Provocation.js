import ValueItem from './ValueItem';

export default function Provocation({ blok }) {
  return (
    <section className="provocation">
      <span className="provocation-mark" aria-hidden="true">&#8220;</span>
      <div className="container container--narrow provocation-grid">
        <div>
          {blok.provocation_label && <div className="section-label">{blok.provocation_label}</div>}
          {blok.provocation_headline && <p className="lead">{blok.provocation_headline}</p>}
          {blok.provocation_text && <p className="body-text">{blok.provocation_text}</p>}
        </div>
        {blok.provocation_values?.length > 0 && (
          <div className="provocation-values">
            {blok.provocation_values.map((item) => (
              <ValueItem key={item._uid} blok={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
