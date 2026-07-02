import Link from 'next/link';
import StoryblokClient from 'storyblok-js-client';
import KaiDialogue from '../../../components/blocks/KaiDialogue';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

const SEO_DEFAULTS = {
  title: 'Unabhängige Einschätzung für digitale Produkt- und AI-Vorhaben | kenalu',
  description:
    'Urteil bringt eine unabhängige Sicht auf Konzepte, Angebote und digitale Produkte: Was trägt, was fehlt und welche Konsequenz als Nächstes folgt.',
};

async function getSEO() {
  try {
    const { data } = await Storyblok.get('cdn/stories/service-detail/urteil', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    const c = data.story.content;
    return {
      title: c?.seo_title || SEO_DEFAULTS.title,
      description: c?.seo_description || SEO_DEFAULTS.description,
    };
  } catch {
    return SEO_DEFAULTS;
  }
}

export async function generateMetadata() {
  const seo = await getSEO();
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: 'https://kenalu.ch/services/urteil' },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: 'https://kenalu.ch/services/urteil',
      siteName: 'kenalu',
      locale: 'de_CH',
      type: 'website',
    },
  };
}

// ── Begründetes Urteil (3 Bereiche + Konsequenz) ──────────────────────────────

const JUDGEMENT_AREAS = [
  {
    title: 'Trägt',
    text: 'Was bereits nachvollziehbar, relevant und tragfähig ist.',
    variant: 'positive',
  },
  {
    title: 'Muss geklärt werden',
    text: 'Welche Annahmen, Risiken, Abhängigkeiten oder Lücken vor der nächsten Entscheidung noch offen sind.',
    variant: 'open',
  },
  {
    title: 'Sollte nicht weiterverfolgt werden',
    text: 'Welche Wege unverhältnismässig, unklar oder nicht sinnvoll sind.',
    variant: 'stop',
  },
];

const OUTCOME_ITEMS = [
  {
    title: 'Blinde Flecken werden sichtbar.',
    text: 'Nicht jede offene Frage ist ein Risiko. Aber es wird klarer, welche Fragen für die nächste Entscheidung wirklich zählen.',
  },
  {
    title: 'Erwartungen werden sortiert.',
    text: 'Es wird sichtbar, was ein Konzept, Angebot oder Produkt leisten kann – und was nicht.',
  },
  {
    title: 'Der nächste Schritt wird ehrlicher.',
    text: 'Weiterführen, verändern, vertiefen oder stoppen wird nicht emotionaler, sondern begründbarer.',
  },
];

const RELATED = [
  {
    label: 'Klarheit',
    text: 'Wenn zuerst eine begründete Richtung entstehen muss.',
    href: '/services/klarheit',
  },
  {
    label: 'Rapid Build',
    text: 'Wenn eine Idee oder Annahme sichtbar getestet werden soll.',
    href: '/services/rapid-build',
  },
  {
    label: 'Produkt',
    text: 'Wenn die Richtung steht und daraus ein tragfähiges Produkt werden soll.',
    href: '/services/produkt',
  },
];

// ── Seite ─────────────────────────────────────────────────────────────────────

export default function UrteilPage() {
  return (
    <main className="sd-page sd-page--urteil">

      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="sd-hero sd-hero--editorial">
        <div className="container">
          <p className="section-label">04 / Urteil</p>
          <h1 className="sd-hero-h1">
            Manchmal braucht ein Vorhaben nicht mehr Energie. Sondern eine ungeschönte Sicht.
          </h1>
          <p className="sd-hero-intro">
            Es gibt ein Konzept, ein Angebot, einen Prototypen oder ein laufendes Produkt. Viel
            Arbeit ist bereits hineingeflossen. Genau deshalb wird es schwierig, die
            entscheidende Frage noch offen zu stellen.
          </p>
          <p className="sd-hero-meta">Eine unabhängige Einordnung · meist 1–2 Wochen</p>
          <Link href="/contact" className="btn btn-primary sd-hero-cta">
            Die Prüfungsfrage besprechen →
          </Link>
        </div>
      </section>

      {/* ── 2. Szene ────────────────────────────────────────────── */}
      <section className="sd-scene">
        <div className="container container--narrow">
          <p className="section-label">Der Moment davor</p>
          <h2 className="sd-scene-h2">
            Viel Arbeit ist bereits da. Die entscheidende Frage vielleicht noch nicht.
          </h2>
          <p className="sd-scene-text">
            Unterlagen sehen überzeugend aus. Es gibt Argumente, Erwartungen und vielleicht
            auch schon erste Resultate. Aber je weiter ein Vorhaben voranschreitet, desto
            schwieriger wird es, ruhig zu fragen: Trägt das wirklich? Was fehlt? Welche Annahme
            wird gerade übersehen?
          </p>
          <p className="sd-scene-text">
            Urteil schafft Raum für genau diese Fragen. Nicht, um Arbeit kleinzureden. Sondern
            damit die nächste Entscheidung auf etwas Belastbarem steht.
          </p>
        </div>
      </section>

      {/* ── 3. Begründetes Urteil (Arbeitsprobe) ─────────────────── */}
      <section className="sd-artifact sd-artifact--judgement">
        <div className="container">
          <p className="section-label">Was daraus entsteht</p>
          <h2 className="sd-artifact-h2">Ein Urteil mit Konsequenz.</h2>
          <p className="sd-artifact-lead">
            Nicht eine lange Liste von Beobachtungen. Sondern eine verständliche Einordnung,
            die klar trennt, was trägt, was noch geklärt werden muss und was nicht
            weiterverfolgt werden sollte.
          </p>

          <div
            className="artifact-judgement"
            role="img"
            aria-label="Begründetes Urteil: drei Bereiche — Trägt, Muss geklärt werden, Sollte nicht weiterverfolgt werden — plus nächste Konsequenz"
          >
            <div className="ajudge-areas">
              {JUDGEMENT_AREAS.map((area) => (
                <div key={area.variant} className={`ajudge-area ajudge-area--${area.variant}`}>
                  <p className="ajudge-area-title">{area.title}</p>
                  <p className="ajudge-area-text">{area.text}</p>
                </div>
              ))}
            </div>
            <div className="ajudge-conclusion">
              <p className="ajudge-conclusion-title">Nächste Konsequenz</p>
              <p className="ajudge-conclusion-text">
                Welche Entscheidung vorbereitet, verändert oder bewusst vertagt werden sollte.
              </p>
            </div>
          </div>

          <p className="sd-artifact-note">
            Das Urteil ist eine Arbeitsform von kenalu. Es ist keine juristische, regulatorische,
            finanzielle oder sicherheitstechnische Prüfung.
          </p>
        </div>
      </section>

      {/* ── 4. Kai ──────────────────────────────────────────────── */}
      <KaiDialogue
        eyebrow="Die Prüfungsfrage finden"
        headline="Welche Entscheidung braucht bei euch eine zweite Sicht?"
        intro="Beschreibt Kai kurz, was bereits vorliegt. Er hilft euch, die wichtigste Prüfungsfrage zu formulieren."
        contextKey="urteil-story"
        initialMessage="Hallo, ich bin Kai. Erzählt mir kurz, was ihr prüfen möchtet und welche Entscheidung davon abhängt."
        inputPlaceholder="Was möchtet ihr unabhängig einordnen?"
        suggestedPrompts={[
          'Wir haben ein Konzept und sind uns bei der Richtung nicht mehr sicher.',
          'Unser Vorhaben läuft, aber wir sehen Risiken, die wir nicht sauber einordnen können.',
          'Wir brauchen eine klare externe Sicht auf ein Angebot, Produkt oder einen geplanten nächsten Schritt.',
        ]}
        privacyNotice="Bitte keine vertraulichen Projekt-, Kunden- oder Personendaten eingeben. Kai ist ein KI-Assistent von kenalu."
        showContactCta={true}
      />

      {/* ── 5. Danach ───────────────────────────────────────────── */}
      <section className="sd-danach sd-danach--editorial">
        <div className="container">
          <p className="section-label">Danach</p>
          <h2 className="sd-danach-h2">Aus einem Gefühl wird eine begründete Konsequenz.</h2>
          <div className="sd-danach-grid">
            {OUTCOME_ITEMS.map((item, i) => (
              <div key={i} className="sd-danach-item">
                <p className="sd-danach-item-title">{item.title}</p>
                <p className="sd-danach-item-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Ehrliche Einordnung ──────────────────────────────── */}
      <section className="sd-honest-fit">
        <div className="container container--narrow">
          <p className="section-label">Ehrliche Einordnung</p>
          <h2 className="sd-honest-h2">
            Urteil ist nicht immer die sinnvollste erste Investition.
          </h2>
          <ul className="sd-honest-list">
            <li>Ihr habt noch keine Unterlagen, Richtung oder konkrete Fragestellung, die geprüft werden kann.</li>
            <li>Ihr möchtet vor allem eine neue Idee sichtbar und testbar machen.</li>
            <li>Ihr erwartet eine rechtliche, regulatorische, finanzielle oder sicherheitstechnische Zertifizierung.</li>
          </ul>
          <p className="sd-honest-alt">
            Wenn zuerst eine Richtung entwickelt werden muss, beginnt ihr besser mit Klarheit.
            Wenn eine Idee sichtbar getestet werden soll, ist Rapid Build wahrscheinlich der
            sinnvollere Einstieg.
          </p>
        </div>
      </section>

      {/* ── 7. Andere Einstiege ─────────────────────────────────── */}
      <section className="sd-related">
        <div className="container">
          <div className="sd-related-cards">
            {RELATED.map((r) => (
              <Link key={r.href} href={r.href} className="sd-related-card">
                <p className="sd-related-card-label">{r.label}</p>
                <p className="sd-related-card-text">{r.text}</p>
                <span className="sd-related-card-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Abschluss-CTA ────────────────────────────────────── */}
      <section className="sd-cta">
        <div className="container container--narrow">
          <p className="section-label">Nächster Schritt</p>
          <h2 className="sd-cta-h2">Lasst uns die Prüfungsfrage klar machen.</h2>
          <p className="sd-cta-text">
            In einem ersten Gespräch klären wir, worauf euer Vorhaben wirklich geprüft werden
            sollte.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Gespräch starten →
          </Link>
        </div>
      </section>

    </main>
  );
}
