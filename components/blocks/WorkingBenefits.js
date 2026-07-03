export default function WorkingBenefits({ blok }) {
  const benefits = [
    { title: blok.b1_title, text: blok.b1_text },
    { title: blok.b2_title, text: blok.b2_text },
    { title: blok.b3_title, text: blok.b3_text },
    { title: blok.b4_title, text: blok.b4_text },
  ].filter((b) => b.title);

  return (
    <section className="aw-benefits">
      <div className="container">
        <div className="aw-benefits-header">
          {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
          {blok.headline && <h2 className="aw-benefits-headline">{blok.headline}</h2>}
        </div>
        {benefits.length > 0 && (
          <div className="aw-benefits-grid">
            {benefits.map((b) => (
              <div key={b.title} className="aw-benefit">
                <h3 className="aw-benefit-title">{b.title}</h3>
                {b.text && <p className="aw-benefit-text">{b.text}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
