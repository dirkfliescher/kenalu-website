export default function WorkingWhy({ blok }) {
  return (
    <section className="aw-why">
      <div className="container container--narrow">
        {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
        {blok.headline && <h2 className="aw-why-headline">{blok.headline}</h2>}
        <div className="aw-why-text">
          {blok.text_1 && <p>{blok.text_1}</p>}
          {blok.text_2 && <p>{blok.text_2}</p>}
          {blok.text_3 && <p>{blok.text_3}</p>}
        </div>
      </div>
    </section>
  );
}
