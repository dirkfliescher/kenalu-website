import Link from 'next/link';
import ProductMomentBuilder from '../../../components/blocks/ProductMomentBuilder';

export const revalidate = 60;

export const metadata = {
  title: 'Produktmoment | Aus einer Idee wird ein erster konkreter Produktausschnitt | kenalu Lab',
  description:
    'Produktmoment hilft dabei, aus einer offenen Idee einen ersten konkreten, besprechbaren und testbaren Produktausschnitt zu machen.',
  alternates: { canonical: 'https://www.kenalu.ch/lab/produktmoment' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Produktmoment | Kenalu Lab',
    description:
      'Ein Prototyp, der offene Ideen in konkrete erste Produktmomente übersetzt.',
    url: 'https://www.kenalu.ch/lab/produktmoment',
    siteName: 'kenalu',
    locale: 'de_CH',
    type: 'website',
  },
};

// ── Seitenkomponente ──────────────────────────────────────────────────────────

export default function ProduktmomentPage() {
  return (
    <main className="pm-page">

      {/* ── 1. Hero ──────────────────────────────────────────────── */}
      <section className="pm-hero">
        <div className="container">
          <p className="section-label">Prototyp</p>
          <h1 className="pm-hero-headline">
            Aus einer offenen Idee wird ein erster Produktmoment.
          </h1>
          <p className="pm-hero-text">
            Eine Idee muss nicht schon ein ganzes Produkt sein. Es reicht, wenn klar wird,
            für wen sich was verändern soll und welcher erste Moment das sichtbar machen
            kann.
          </p>
          <p className="pm-hero-meta">
            Produktmoment ist eine Arbeitsprobe von kenalu.
          </p>
        </div>
      </section>

      {/* ── 2. Kurze Einordnung ──────────────────────────────────── */}
      <section className="pm-einordnung">
        <div className="container">
          <p className="section-label">Worum es geht</p>
          <h2 className="pm-einordnung-headline">
            Nicht die ganze Plattform. Der erste sinnvolle Moment.
          </h2>
          <p className="pm-einordnung-text">
            Viele Produktideen werden zu gross, bevor sie konkret genug sind. Produktmoment
            hilft euch, einen kleinen Ausschnitt zu finden, der etwas Relevantes sichtbar
            macht.
          </p>

          <div className="pm-einordnung-points">
            <div className="pm-einordnung-point">
              <p className="pm-point-title">Für jemanden</p>
              <p className="pm-point-text">
                Ein konkreter Mensch oder eine konkrete Rolle, nicht «alle Nutzer».
              </p>
            </div>
            <div className="pm-einordnung-point">
              <p className="pm-point-title">In einer echten Situation</p>
              <p className="pm-point-text">
                Ein Moment aus dem Alltag, nicht eine abstrakte Funktionsliste.
              </p>
            </div>
            <div className="pm-einordnung-point">
              <p className="pm-point-title">Mit einer prüfbaren Veränderung</p>
              <p className="pm-point-text">
                Etwas, das danach einfacher, klarer, schneller oder verlässlicher sein soll.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Interaktiver Builder + Kai ────────────────────────── */}
      <ProductMomentBuilder />

      {/* ── 4. Was damit weitergeht ──────────────────────────────── */}
      <section className="pm-next-steps">
        <div className="container">
          <p className="section-label">Und danach?</p>
          <h2 className="pm-next-headline">
            Ein Produktmoment ist noch kein Projektplan. Aber er verändert das Gespräch.
          </h2>
          <p className="pm-next-text">
            Wenn ein Moment klar genug ist, lässt sich besser entscheiden, was als Nächstes
            sinnvoll ist.
          </p>

          <div className="pm-next-cards">
            <div className="pm-next-card">
              <p className="pm-next-card-title">Zuerst Klarheit</p>
              <p className="pm-next-card-text">
                Wenn die zentrale Entscheidung, Priorität oder Wirkung noch offen ist.
              </p>
              <Link href="/services/klarheit" className="pm-next-card-link">
                Klarheit ansehen →
              </Link>
            </div>
            <div className="pm-next-card">
              <p className="pm-next-card-title">Rapid Build</p>
              <p className="pm-next-card-text">
                Wenn dieser Moment sichtbar und testbar gemacht werden soll.
              </p>
              <Link href="/services/rapid-build" className="pm-next-card-link">
                Rapid Build ansehen →
              </Link>
            </div>
            <div className="pm-next-card">
              <p className="pm-next-card-title">Produkt</p>
              <p className="pm-next-card-text">
                Wenn die Richtung bestätigt ist und daraus eine tragfähige Grundlage
                entstehen soll.
              </p>
              <Link href="/services/produkt" className="pm-next-card-link">
                Produkt ansehen →
              </Link>
            </div>
          </div>

          <p className="pm-next-note">
            Diese Verweise sind keine automatische Empfehlung. Sie zeigen mögliche nächste
            Räume, nicht «den passenden Service».
          </p>
        </div>
      </section>

      {/* ── 5. Transparenzhinweis ────────────────────────────────── */}
      <section className="pm-transparency">
        <div className="container container--narrow">
          <p className="section-label">Transparenz</p>
          <h2 className="pm-transparency-headline">
            Ein Prototyp zum Denken, nicht zum Entscheiden.
          </h2>
          <p className="pm-transparency-text">
            Produktmoment hilft dabei, eine Idee konkret zu formulieren. Die Ergebnisse
            sind kein vollständiges Produktkonzept, keine technische Spezifikation und
            keine verbindliche Empfehlung.
          </p>
          <p className="pm-transparency-text">
            Eine gute Entscheidung braucht weiterhin Kontext, Menschen und eine ehrliche
            Prüfung der Voraussetzungen.
          </p>
        </div>
      </section>

      {/* ── 6. Abschluss-CTA ─────────────────────────────────────── */}
      <section className="pm-cta">
        <div className="container container--narrow">
          <p className="section-label">Nächster Schritt</p>
          <h2 className="pm-cta-headline">
            Soll aus eurem Moment etwas Tragfähiges werden?
          </h2>
          <p className="pm-cta-text">
            Wenn ihr einen ersten Produktmoment weiterdenken, testen oder in ein echtes
            Vorhaben überführen möchtet, lasst uns gemeinsam auf die nächste Frage
            schauen.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Gespräch starten →
          </Link>
        </div>
      </section>

    </main>
  );
}
