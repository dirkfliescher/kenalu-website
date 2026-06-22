import Link from 'next/link';

const PROFILES = ['Der Gefangene', 'Der Bereite', 'Der Vorsichtige', 'Der Zufriedene'];

export default function CheckTeaser() {
  return (
    <section className="check-teaser">
      <div className="container">
        <div className="check-teaser-inner">

          <div className="check-teaser-content">
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

          <div className="check-teaser-profiles">
            {PROFILES.map((name) => (
              <div key={name} className="check-teaser-profile">
                <span className="check-teaser-profile-name">{name}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
