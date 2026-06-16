import ServiceDetail from './ServiceDetail';

export default function ServicesDetailSection({ blok }) {
  return (
    <section className="services-detail">
      <div className="container container--wide">
        {blok.services_detail_section_items?.map((item) => (
          <ServiceDetail key={item._uid} blok={item} />
        ))}
      </div>
    </section>
  );
}
