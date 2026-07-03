export default function AboutWorkingWhy({ blok }) {
  return (
    <section className="aw-why">
      <div className="container container--narrow">
        {blok.eyebrow && (
          <p className="section-label">{blok.eyebrow}</p>
        )}
        {blok.headline && (
          <h2 className="aw-why-headline">{blok.headline}</h2>
        )}
        <div className="aw-why-text">
          {blok.body_1 && <p>{blok.body_1}</p>}
          {blok.body_2 && <p>{blok.body_2}</p>}
          {blok.body_3 && <p>{blok.body_3}</p>}
        </div>
      </div>
    </section>
  );
}
