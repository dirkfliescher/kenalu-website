import Link from 'next/link';

export default function WorkingCta() {
  return (
    <section className="aw-cta">
      <div className="container container--narrow">
        <p className="section-label">Nächster Schritt</p>
        <h2 className="aw-cta-headline">Lasst uns klären, was bei euch wirklich sinnvoll ist.</h2>
        <p className="aw-cta-text">
          Ob ihr zuerst Klarheit braucht, eine Idee sichtbar machen wollt oder schon vor einem
          konkreten Produktentscheid steht: Wir schauen gemeinsam auf eure Situation und sagen
          euch ehrlich, welcher nächste Schritt sinnvoll sein könnte.
        </p>
        <div className="aw-cta-actions">
          <Link href="/contact" className="btn btn-light">Gespräch starten →</Link>
          <Link href="/services" className="link-arrow aw-cta-link">Leistungen ansehen →</Link>
        </div>
      </div>
    </section>
  );
}
