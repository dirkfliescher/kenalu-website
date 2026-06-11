import ProcessStep from './ProcessStep';

export default function ProcessSection({ blok }) {
  return (
    <section className="process-section">
      <div className="container">
        {blok.process_section_label && <p className="section-label">{blok.process_section_label}</p>}
        {blok.process_section_headline && <h2>{blok.process_section_headline}</h2>}
        {blok.process_section_steps?.length > 0 && (
          <div className="process-steps">
            {blok.process_section_steps.map((item) => (
              <ProcessStep key={item._uid} blok={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
