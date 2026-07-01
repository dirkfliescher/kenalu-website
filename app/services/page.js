import Link from 'next/link';
import KaiDialogue from '../../components/blocks/KaiDialogue';

export const revalidate = 60;

export const metadata = {
  title: 'Leistungen für digitale Produktentscheidungen | kenalu',
  description:
    'Vier Einstiege für digitale Vorhaben: Klarheit schaffen, eine Idee sichtbar machen, ein Produkt entwickeln oder eine unabhängige zweite Sicht einholen.',
  alternates: { canonical: 'https://kenalu.ch/services' },
  openGraph: {
    title: 'Leistungen für digitale Produktentscheidungen | kenalu',
    description:
      'Vier Einstiege für digitale Vorhaben: Klarheit schaffen, eine Idee sichtbar machen, ein Produkt entwickeln oder eine unabhängige zweite Sicht einholen.',
    url: 'https://kenalu.ch/services',
    siteName: 'kenalu',
    locale: 'de_CH',
    type: 'website',
  },
};

// ── Visuelle Akzente als SVG ──────────────────────────────────────────────────

function VisualKlarheit() {
  return (
    <svg className="sov-card-svg" viewBox="0 0 200 120" aria-hidden="true" fill="none">
      {/* Loose cards converging to a central question */}
      <rect x="10" y="10" width="52" height="32" rx="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.45"/>
      <rect x="75" y="6" width="52" height="32" rx="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.35"/>
      <rect x="140" y="14" width="52" height="32" rx="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.45"/>
      {/* Converging lines */}
      <line x1="36" y1="42" x2="90" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="101" y1="38" x2="100" y2="76" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="166" y1="46" x2="110" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      {/* Central question card */}
      <rect x="60" y="74" width="80" height="36" rx="5" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="72" y1="88" x2="128" y2="88" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
      <line x1="72" y1="98" x2="110" y2="98" stroke="currentColor" strokeWidth="1.2" opacity="0.3"/>
    </svg>
  );
}

function VisualRapidBuild() {
  return (
    <svg className="sov-card-svg" viewBox="0 0 200 120" aria-hidden="true" fill="none">
      {/* Sketch line transforming into defined interface moment */}
      <path d="M16 90 Q 30 60 50 72 Q 65 80 80 55 Q 95 35 115 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" opacity="0.4"/>
      {/* Arrow */}
      <line x1="118" y1="50" x2="132" y2="50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M128 44 L134 50 L128 56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      {/* Concrete interaction card */}
      <rect x="138" y="28" width="52" height="64" rx="5" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
      <rect x="144" y="36" width="40" height="8" rx="2" fill="currentColor" opacity="0.15"/>
      <rect x="144" y="50" width="28" height="6" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="144" y="62" width="34" height="6" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="144" y="74" width="20" height="10" rx="3" fill="currentColor" opacity="0.25"/>
    </svg>
  );
}

function VisualProdukt() {
  return (
    <svg className="sov-card-svg" viewBox="0 0 200 120" aria-hidden="true" fill="none">
      {/* Four connected layers forming a stable foundation */}
      <rect x="24" y="20" width="152" height="20" rx="3" stroke="currentColor" strokeWidth="1.2" opacity="0.25" fill="currentColor" fillOpacity="0.04"/>
      <rect x="18" y="44" width="164" height="20" rx="3" stroke="currentColor" strokeWidth="1.2" opacity="0.35" fill="currentColor" fillOpacity="0.06"/>
      <rect x="12" y="68" width="176" height="20" rx="3" stroke="currentColor" strokeWidth="1.2" opacity="0.5" fill="currentColor" fillOpacity="0.08"/>
      <rect x="6" y="92" width="188" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.7" fill="currentColor" fillOpacity="0.12"/>
      {/* Connecting lines */}
      <line x1="100" y1="40" x2="100" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="100" y1="64" x2="100" y2="68" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="100" y1="88" x2="100" y2="92" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    </svg>
  );
}

function VisualUrteil() {
  return (
    <svg className="sov-card-svg" viewBox="0 0 200 120" aria-hidden="true" fill="none">
      {/* Three clear editorial fields */}
      <rect x="14" y="20" width="52" height="80" rx="4" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.06" opacity="0.7"/>
      <rect x="74" y="20" width="52" height="80" rx="4" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.04" opacity="0.5"/>
      <rect x="134" y="20" width="52" height="80" rx="4" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.03" opacity="0.4"/>
      {/* Labels */}
      <line x1="22" y1="36" x2="58" y2="36" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
      <line x1="82" y1="36" x2="118" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
      <line x1="142" y1="36" x2="178" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    </svg>
  );
}

// ── Service Cards ─────────────────────────────────────────────────────────────

const SERVICE_CARDS = [
  {
    label: '01 · Klarheit',
    title: 'Der Tisch ist voll. Die Entscheidung fehlt.',
    text:
      'Es gibt Ideen, Erwartungen und mögliche Richtungen. Alles klingt plausibel. Genau deshalb wird nichts entschieden.',
    micro: 'Klarheit macht sichtbar, welche Frage jetzt wirklich beantwortet werden muss.',
    cta: 'Die offene Entscheidung sortieren →',
    href: '/services/klarheit',
    Visual: VisualKlarheit,
  },
  {
    label: '02 · Rapid Build',
    title: 'Die Idee ist da. Aber noch niemand hat sie erlebt.',
    text:
      'Solange eine Idee nur beschrieben wird, stellt sich jede Person etwas anderes darunter vor. Erst ein konkreter Moment schafft eine gemeinsame Grundlage.',
    micro: 'Rapid Build macht die entscheidende Annahme sichtbar und testbar.',
    cta: 'Die Idee erlebbar machen →',
    href: '/services/rapid-build',
    Visual: VisualRapidBuild,
  },
  {
    label: '03 · Produkt',
    title: 'Die Richtung steht. Jetzt beginnt der erste echte Alltag.',
    text:
      'Ein Produkt wird nicht durch ein Release tragfähig. Es wird tragfähig, wenn Menschen es verstehen, Systeme es mittragen und die nächste Entwicklung nicht wieder bei null beginnt.',
    micro: 'Produkt verbindet Erlebnis, Logik, Systeme und Weiterentwicklung.',
    cta: 'Den Produktmoment weiterdenken →',
    href: '/services/produkt',
    Visual: VisualProdukt,
  },
  {
    label: '04 · Urteil',
    title: 'Viel Arbeit ist schon da. Jetzt braucht es eine ungeschönte Sicht.',
    text:
      'Ein Konzept, Angebot oder Produkt liegt vor. Gerade weil schon viel investiert wurde, braucht es einen ruhigen Blick darauf, was wirklich trägt.',
    micro: 'Urteil schafft Klarheit über Tragfähigkeit, offene Fragen und Konsequenzen.',
    cta: 'Die Prüfungsfrage klären →',
    href: '/services/urteil',
    Visual: VisualUrteil,
  },
];

// ── Seite ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <main className="sov-page">

      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="sov-hero">
        <div className="container">
          <p className="section-label">Leistungen</p>
          <div className="sov-hero-inner">
            <h1 className="sov-hero-headline">
              Nicht jede gute Idee braucht denselben Anfang.
            </h1>
            <p className="sov-hero-text">
              Manche Vorhaben brauchen zuerst eine Entscheidung. Manche einen sichtbaren Beweis.
              Manche ein Produkt, das im Alltag trägt. Und manchmal braucht es eine ehrliche
              zweite Sicht, bevor etwas weiterläuft.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Vier Momente ─────────────────────────────────────── */}
      <section className="sov-moments">
        <div className="container">
          <p className="section-label">Vier Einstiege</p>
          <h2 className="sov-moments-headline">Wo steht ihr gerade?</h2>
          <p className="sov-moments-intro">
            Die Frage ist nicht, welche Leistung am besten klingt. Die Frage ist, an welchem
            Moment euer Vorhaben gerade feststeckt.
          </p>
          <div className="sov-grid" role="list">
            {SERVICE_CARDS.map(({ label, title, text, micro, cta, href, Visual }) => (
              <Link
                key={href}
                href={href}
                className="sov-card"
                role="listitem"
              >
                <div className="sov-card-visual" aria-hidden="true">
                  <Visual />
                </div>
                <div className="sov-card-body">
                  <p className="sov-card-label">{label}</p>
                  <p className="sov-card-title">{title}</p>
                  <p className="sov-card-text">{text}</p>
                  <p className="sov-card-micro">{micro}</p>
                  <span className="sov-card-cta">{cta}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Kai ──────────────────────────────────────────────── */}
      <KaiDialogue
        eyebrow="Ein Gespräch beginnen"
        headline="Erzählt Kai, an welchem Moment ihr gerade steht."
        intro="Ihr müsst eure Situation nicht zuerst in Leistungsnamen übersetzen. Beschreibt kurz, was bei euch gerade nicht weitergeht. Kai hilft euch, die Frage dahinter sichtbar zu machen."
        contextKey="services-story"
        initialMessage="Hallo, ich bin Kai. Erzählt mir kurz, an welchem Punkt euer Vorhaben gerade feststeckt. Ich helfe euch, die eigentliche Frage zu sortieren."
        inputPlaceholder="Was ist bei euch gerade der Moment, an dem es nicht weitergeht?"
        suggestedPrompts={[
          'Wir haben zu viele mögliche Richtungen und kommen nicht zu einer Entscheidung.',
          'Wir glauben an eine Idee, können sie aber noch nicht zeigen.',
          'Unser Produkt funktioniert grundsätzlich, aber im Alltag wird es immer komplizierter.',
        ]}
        privacyNotice="Bitte keine vertraulichen Projekt-, Kunden- oder Personendaten eingeben. Kai ist ein KI-Assistent von kenalu."
        showContactCta={true}
      />

      {/* ── 4. Arbeitsweise ─────────────────────────────────────── */}
      <section className="sov-approach">
        <div className="container container--narrow">
          <p className="section-label">Was alle vier Einstiege verbindet</p>
          <h2 className="sov-approach-headline">
            Die richtige Frage bleibt nah an der Umsetzung.
          </h2>
          <p className="sov-approach-text">
            Kenalu verbindet strategische Klarheit, Experience Design und Engineering. Damit
            wichtige Annahmen nicht zwischen Konzept, Übergabe und Umsetzung verloren gehen.
          </p>
          <Link href="/about" className="sov-approach-link">
            So arbeitet Kenalu →
          </Link>
        </div>
      </section>

      {/* ── 5. Abschluss-CTA ────────────────────────────────────── */}
      <section className="sov-closing">
        <div className="container container--narrow">
          <p className="section-label">Nächster Schritt</p>
          <h2 className="sov-closing-headline">Lieber mit einem Menschen sortieren?</h2>
          <p className="sov-closing-text">
            In einem ersten Gespräch klären wir eure Ausgangslage, offene Fragen und den
            nächsten sinnvollen Schritt.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Gespräch starten →
          </Link>
        </div>
      </section>

    </main>
  );
}
