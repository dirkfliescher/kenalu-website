import Link from 'next/link';

export default function ServiceDetail({ blok }) {
  const items = (blok.service_detail_list || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  const anchor = blok.service_detail_number
    ? `service-${blok.service_detail_number}`
    : undefined;

  return (
    <div className="service-detail-item" id={anchor}>
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
          <h3 className="sdi-was-entsteht">Was dabei entsteht</h3>
          <ul className="sdi-list">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {blok.service_detail_link && (
        <div className="sdi-link">
          <Link href={blok.service_detail_link} className="link-arrow">
            {blok.service_detail_link_label || 'Zur Leistung →'}
          </Link>
        </div>
      )}
    </div>
  );
}
