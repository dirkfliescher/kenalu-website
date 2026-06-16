export default function ServiceDetail({ blok }) {
  const items = (blok.service_detail_list || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="service-detail-item">
      <span className="sdi-bignum" aria-hidden="true">{blok.service_detail_number}</span>
      <div className="sdi-main">
        {blok.service_detail_tag && <span className="service-tag">{blok.service_detail_tag}</span>}
        {blok.service_detail_headline && <h2>{blok.service_detail_headline}</h2>}
        {blok.service_detail_text
          ?.split('\n')
          .map((s) => s.trim())
          .filter(Boolean)
          .map((p, i) => <p key={i}>{p}</p>)}
      </div>
      {items.length > 0 && (
        <div className="sdi-details">
          <h4>Was dabei entsteht</h4>
          <ul className="sdi-list">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
