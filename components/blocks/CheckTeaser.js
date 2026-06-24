import Link from 'next/link';

const SIGNALS = ['Klarheit', 'Rapid Build', 'Produkt', 'Urteil'];

export default function CheckTeaser() {
  return (
    <section className="check-teaser">
      {/* Ambient-Text: die vier Leistungen als Hintergrundrauschen */}
      <div className="check-teaser-ambient" aria-hidden="true">
        {SIGNALS.join(' · ')}
      </div>

      <div className="container">
        <div className="check-teaser-inner">
          <p className="check-teaser-label">AI Readiness · 6 Fragen · 2 Minuten</p>
          <h2 className="check-teaser-headline">
            Wo stehst du<br />
            mit AI?
          </h2>
          <p className="check-teaser-sub">
            Nicht jedes Unternehmen braucht dasselbe. Sechs Fragen zeigen, welche kenalu-Leistung zu deiner Situation passt.
          </p>
          <Link href="/check" className="btn btn-primary check-teaser-btn">
            Einschätzung starten →
          </Link>
        </div>
      </div>
    </section>
  );
}
