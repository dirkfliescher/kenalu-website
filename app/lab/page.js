import Link from 'next/link';

export const revalidate = 60;

export const metadata = {
  title: 'Lab | Arbeitsproben und Prototypen von kenalu',
  description:
    'Im Kenalu Lab werden Arbeitsproben, Prototypen und konkrete Produktentscheidungen sichtbar – als nachvollziehbare Ergänzung zu Strategie, Experience und Engineering.',
  alternates: { canonical: 'https://kenalu.ch/lab' },
  openGraph: {
    title: 'Lab | Arbeitsproben und Prototypen von kenalu',
    description:
      'Im Kenalu Lab werden Arbeitsproben, Prototypen und konkrete Produktentscheidungen sichtbar – als nachvollziehbare Ergänzung zu Strategie, Experience und Engineering.',
    url: 'https://kenalu.ch/lab',
    siteName: 'kenalu',
    locale: 'de_CH',
    type: 'website',
  },
};

// ── Visuelle Struktur für Featured Work Sample ────────────────────────────────
// Drei verbundene Bereiche: Orientierung / Dialog / Weiterentwicklung

function FeaturedVisual() {
  return (
    <div
      className="lfw-visual"
      role="img"
      aria-label="Drei verbundene Produktbereiche von kenalu.ch: Orientierung, Dialog und Weiterentwicklung"
    >
      <div className="lfw-visual-node lfw-visual-node--orientation">
        <span className="lfw-visual-node-label">Orientierung</span>
        <p className="lfw-visual-node-desc">Situationen und Entscheidungen statt Leistungslisten</p>
      </div>
      <div className="lfw-visual-connector" aria-hidden="true">→</div>
      <div className="lfw-visual-node lfw-visual-node--dialog">
        <span className="lfw-visual-node-label">Dialog</span>
        <p className="lfw-visual-node-desc">Kai dort, wo Lesen allein nicht reicht</p>
      </div>
      <div className="lfw-visual-connector" aria-hidden="true">→</div>
      <div className="lfw-visual-node lfw-visual-node--foundation">
        <span className="lfw-visual-node-label">Weiterentwicklung</span>
        <p className="lfw-visual-node-desc">Grundlage, die mitwächst ohne Neustart</p>
      </div>
    </div>
  );
}

// ── Seite ─────────────────────────────────────────────────────────────────────

export default function LabPage() {
  return (
    <main className="lab-page-v2">

      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="lpv2-hero">
        <div className="container">
          <p className="section-label">Lab</p>
          <h1 className="lpv2-hero-headline">
            Arbeitsproben, Prototypen und Gedanken, die man ausprobieren kann.
          </h1>
          <p className="lpv2-hero-text">
            Im Lab zeigt Kenalu eigene Produkte, konkrete Arbeitsweisen und ausgewählte
            Experimente. Nicht als Kundenreferenzen, sondern als nachvollziehbare Beispiele
            dafür, wie aus Fragen, Ideen und Technik etwas Greifbares wird.
          </p>
        </div>
      </section>

      {/* ── 2. Featured Work Sample: kenalu.ch ──────────────────── */}
      <section className="lpv2-featured">
        <div className="container">
          <p className="section-label">Eigene Arbeitsprobe</p>
          <div className="lfw-inner">

            {/* Inhalt links */}
            <div className="lfw-content">
              <h2 className="lfw-title">
                Wie eine Website vom Schaufenster zum Gespräch wird.
              </h2>
              <p className="lfw-teaser">
                kenalu.ch ist nicht dazu da, Kenalu möglichst schön zu erklären. Die Website
                soll Menschen helfen, ihre eigene Situation besser zu verstehen und ein
                sinnvolles Gespräch zu beginnen.
              </p>

              {/* Drei Highlights */}
              <div className="lfw-highlights">
                <div className="lfw-highlight">
                  <p className="lfw-highlight-title">Orientierung statt Leistungswand</p>
                  <p className="lfw-highlight-text">
                    Die Website beginnt mit Situationen und Entscheidungen, nicht mit einer
                    internen Liste von Leistungen.
                  </p>
                </div>
                <div className="lfw-highlight">
                  <p className="lfw-highlight-title">Dialog mit Kai</p>
                  <p className="lfw-highlight-text">
                    Kai eröffnet dort ein Gespräch, wo Lesen allein nicht reicht.
                  </p>
                </div>
                <div className="lfw-highlight">
                  <p className="lfw-highlight-title">Weiterentwickelbare Grundlage</p>
                  <p className="lfw-highlight-text">
                    Inhalte, Komponenten und neue Produktmomente können sich verändern, ohne
                    dass die Website jedes Mal neu gebaut werden muss.
                  </p>
                </div>
              </div>

              <Link href="/lab/kenalu-website" className="btn btn-primary lfw-cta">
                Arbeitsprobe ansehen →
              </Link>
            </div>

            {/* Visuelle Arbeitsprobe rechts */}
            <div className="lfw-visual-wrap">
              <FeaturedVisual />
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. Weitere im Lab ───────────────────────────────────── */}
      <section className="lpv2-more">
        <div className="container">
          <p className="section-label">Weitere im Lab</p>
          <h2 className="lpv2-more-headline">Dinge, die noch wachsen dürfen.</h2>
          <p className="lpv2-more-text">
            Nicht alles im Lab ist fertig. Entscheidend ist, dass ein Gedanke bereits konkret
            genug ist, um ihn anzuschauen, auszuprobieren oder weiterzudenken.
          </p>
          {/* Noch keine weiteren veröffentlichten Einträge — direkt zum nächsten Block */}
        </div>
      </section>

      {/* ── 4. In Vorbereitung ──────────────────────────────────── */}
      <section className="lpv2-preparing">
        <div className="container container--narrow">
          <p className="section-label">In Vorbereitung</p>
          <h2 className="lpv2-preparing-headline">Weitere Arbeitsproben folgen.</h2>
          <p className="lpv2-preparing-text">
            Sobald ein Beispiel genügend Substanz bietet, wird es hier dokumentiert.
          </p>
        </div>
      </section>

      {/* ── 5. Abschluss-CTA ────────────────────────────────────── */}
      <section className="lpv2-cta">
        <div className="container container--narrow">
          <p className="section-label">Nächster Schritt</p>
          <h2 className="lpv2-cta-headline">
            Habt ihr eine Frage, die nicht länger abstrakt bleiben soll?
          </h2>
          <p className="lpv2-cta-text">
            Wenn aus einer offenen Idee ein konkreter Moment werden soll, lasst uns
            anschauen, welche Annahme zuerst sichtbar werden muss.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Gespräch starten →
          </Link>
        </div>
      </section>

    </main>
  );
}
