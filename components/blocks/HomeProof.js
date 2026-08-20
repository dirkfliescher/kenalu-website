// home_proof — Konkrete Zahlen / Beweis-Sektion auf der Homepage
export default function HomeProof({ blok }) {
  const stats = [
    { value: blok.stat_1_value, label: blok.stat_1_label, note: blok.stat_1_note },
    { value: blok.stat_2_value, label: blok.stat_2_label, note: blok.stat_2_note },
    { value: blok.stat_3_value, label: blok.stat_3_label, note: blok.stat_3_note },
  ].filter((s) => s.value);

  return (
    <section className="home-proof">
      <div className="container">
        {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
        <div className="home-proof-grid">
          {stats.map((s, i) => (
            <div key={i} className="home-proof-item">
              <p className="home-proof-value">{s.value}</p>
              <p className="home-proof-label">{s.label}</p>
              {s.note && <p className="home-proof-note">{s.note}</p>}
            </div>
          ))}
        </div>
        {blok.footnote && <p className="home-proof-footnote">{blok.footnote}</p>}
      </div>
    </section>
  );
}
