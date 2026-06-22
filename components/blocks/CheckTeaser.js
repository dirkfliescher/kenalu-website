import Link from 'next/link';

const PROFILES = ['Der Gefangene', 'Der Bereite', 'Der Vorsichtige', 'Der Zufriedene'];

export default function CheckTeaser() {
  return (
    <section className="check-teaser">
      {/* Ambient-Text: die vier Profile als Hintergrundrauschen */}
      <div className="check-teaser-ambient" aria-hidden="true">
        {PROFILES.join(' · ')}
      </div>

      <div className="container">
        <div className="check-teaser-inner">
          <p className="check-teaser-label">Selbstcheck</p>
          <h2 className="check-teaser-headline">
            Leidest du an deiner Software<br />
            oder fürchtest du die Alternative?
          </h2>
          <p className="check-teaser-sub">
            6 Fragen. 2 Minuten. Eine ehrliche Einschätzung: Wo stehst du zwischen Frust und Angst, und was bedeutet das?
          </p>
          <Link href="/check" className="btn btn-primary check-teaser-btn">
            Jetzt einschätzen →
          </Link>
        </div>
      </div>
    </section>
  );
}
