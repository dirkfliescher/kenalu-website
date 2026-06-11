export default function TextBlock({ blok }) {
  return (
    <section className="services">
      <div className="container">
        {blok.text_block_label && <div className="section-label">{blok.text_block_label}</div>}
        {blok.text_block_headline && <h2>{blok.text_block_headline}</h2>}
        {blok.text_block_text && <p className="section-sub">{blok.text_block_text}</p>}
      </div>
    </section>
  );
}
