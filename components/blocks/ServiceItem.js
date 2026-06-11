export default function ServiceItem({ blok }) {
  return (
    <div className="service-card">
      {blok.service_item_number && <div className="service-number">{blok.service_item_number}</div>}
      {blok.service_item_title && <h3>{blok.service_item_title}</h3>}
      {blok.service_item_text && <p>{blok.service_item_text}</p>}
    </div>
  );
}
