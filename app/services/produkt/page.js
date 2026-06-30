import Link from 'next/link';
import StoryblokClient from 'storyblok-js-client';
import KaiDialogue from '../../../components/blocks/KaiDialogue';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

const SEO_DEFAULTS = {
  title: 'Digitale Produkte entwickeln, die im Alltag funktionieren | kenalu',
  description:
    'Kenalu entwickelt digitale Produkte, bei denen Nutzererlebnis, Produktlogik, Systeme und Engineering von Anfang an zusammenpassen.',
};

async function getSEO() {
  try {
    const { data } = await Storyblok.get('cdn/stories/service-detail/produkt', {
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
    alternates: { canonical: 'https://kenalu.ch/services/produkt' },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: 'https://kenalu.ch/services/produkt',
      siteName: 'kenalu',
      locale: 'de_CH',
      type: 'website',
    },
  };
}

// ── Produktfundament (4 Ebenen) ───────────────────────────────────────────────

const FOUNDATION_LAYERS = [
  {
    num: '01',
    title: 'Was Menschen erleben',
    text: 'Wie Nutzer verstehen, handeln, Vertrauen aufbauen und wiederkommen.',
  },
  {
    num: '02',
    title: 'Was das Produkt verspricht',
    text: 'Welche Regeln, Inhalte, Entscheidungen und Service-Momente das Produkt tragen.',
  },
  {
    num: '03',
    title: 'Woran es anschliesst',
    text: 'Wie Daten, Plattformen, Teams und bestehende Abläufe sinnvoll zusammenspielen.',
  },
  {
    num: '04',
    title: 'Wie es weiterwächst',
    text: 'Welche nächsten Schritte vorbereitet sind – und was bewusst erst später folgt.',
  },
];

const OUTCOME_ITEMS = [
  {
    title: 'Der erste Umfang wird klarer.',
    text: 'Nicht alles, was möglich wäre, muss zum Start entstehen. Aber das, was entsteht, hat einen klaren Zweck.',
  },
  {
    title: 'Entscheidungen bleiben verbunden.',
    text: 'Experience, Inhalte, Systeme und Engineering werden nicht nacheinander abgearbeitet, sondern in einer gemeinsamen Produktlogik geführt.',
  },
  {
    title: 'Weiterentwicklung wird vorbereitet.',
    text: 'Nach dem ersten Release beginnt nicht wieder eine Grundsatzdiskussion. Es ist klarer, was vertieft, ergänzt oder bewusst nicht gebaut werden sollte.',
  },
];

const RELATED = [
  {
    label: 'Klarheit',
    text: 'Wenn zuerst Wirkung, Priorität oder Richtung geklärt werden müssen.',
    href: '/services/klarheit',
  },
  {
    label: 'Rapid Build',
    text: 'Wenn ein begrenzter Produktausschnitt sichtbar getestet werden soll.',
    href: '/services/rapid-build',
  },
  {
    label: 'Urteil',
    text: 'Wenn ein bestehendes Produkt oder Konzept unabhängig eingeordnet werden soll.',
    href: '/services/urteil',
  },
];

// ── Seite ─────────────────────────────────────────────────────────────────────

export default function ProduktPage() {
  return (
    <main className="sd-page sd-page--produkt">

      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="sd-hero sd-hero--foundation">
        <div className="container">
          <p className="section-label">03 · Produkt</p>
          <h1 className="sd-hero-h1 sd-hero-h1--wide">
            Ein Produkt beginnt nicht mit dem Release. Es beginnt damit, dass jemand seinen
            Alltag anders macht.
          </h1>
          <p className="sd-hero-intro">
            Die Richtung ist klar. Die Präsentation überzeugt. Vielleicht gibt es bereits erste
            Screens oder Anforderungen. Tragfähig wird ein Produkt aber erst, wenn Menschen es
            verstehen, Systeme es mittragen und die nächste Entwicklung nicht wieder bei null
            anfängt.
          </p>
          <p className="sd-hero-meta">
            Ein gemeinsames Produktvorhaben · Umfang abhängig von Ausgangslage und Produktmoment
          </p>
          <Link href="/contact" className="btn btn-primary sd-hero-cta">
            Den Produktmoment besprechen →
          </Link>
        </div>
      </section>

      {/* ── 2. Szene ────────────────────────────────────────────── */}
      <section className="sd-scene">
        <div className="container container--narrow">
          <p className="section-label">Der Moment davor</p>
          <h2 className="sd-scene-h2">Der erste echte Alltag beginnt nach dem Go-live.</h2>
          <p className="sd-scene-text">
            Ein Produkt kann im Konzept überzeugend aussehen und trotzdem im Alltag scheitern.
            Menschen finden ihren Weg nicht. Inhalte fehlen. Ein Prozess läuft ausserhalb des
            Systems weiter. Eine Schnittstelle wird erst jetzt relevant. Oder die erste sinnvolle
            Weiterentwicklung ist nicht vorgesehen.
          </p>
          <p className="sd-scene-text">
            Produkt bedeutet deshalb nicht nur bauen. Es bedeutet, Erlebnis, Produktlogik,
            Systeme und Weiterentwicklung von Anfang an zusammenzubringen.
          </p>
        </div>
      </section>

      {/* ── 3. Produktfundament (Arbeitsprobe) ───────────────────── */}
      <section className="sd-artifact sd-artifact--foundation">
        <div className="container">
          <p className="section-label">Was daraus entsteht</p>
          <h2 className="sd-artifact-h2">Ein Fundament, auf dem Alltag stattfinden kann.</h2>
          <p className="sd-artifact-lead">
            Das Produktfundament ist keine technische Architekturzeichnung und kein Wireframe.
            Es zeigt die vier Ebenen, die zusammenpassen müssen, damit ein Produkt nicht nur
            startet, sondern weiterträgt.
          </p>

          <div
            className="artifact-foundation"
            role="img"
            aria-label="Produktfundament: vier Ebenen — Was Menschen erleben, Was das Produkt verspricht, Woran es anschliesst, Wie es weiterwächst"
          >
            {FOUNDATION_LAYERS.map((layer, i) => (
              <div
                key={i}
                className={`afound-layer afound-layer--${i + 1}`}
                style={{ '--layer-depth': i }}
              >
                <span className="afound-layer-num">{layer.num}</span>
                <div className="afound-layer-content">
                  <p className="afound-layer-title">{layer.title}</p>
                  <p className="afound-layer-text">{layer.text}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="sd-artifact-note">
            Das Produktfundament ist eine Arbeitsform von kenalu. Es ist kein Kundenprojekt.
          </p>
        </div>
      </section>

      {/* ── 4. Danach ───────────────────────────────────────────── */}
      <section className="sd-danach">
        <div className="container">
          <p className="section-label">Danach</p>
          <h2 className="sd-danach-h2">Nicht nur ein Release. Eine tragfähige nächste Grundlage.</h2>
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

      {/* ── 5. Kai ──────────────────────────────────────────────── */}
      <KaiDialogue
        eyebrow="Den Alltag mitdenken"
        headline="Was soll für eure Nutzer oder Teams künftig spürbar einfacher werden?"
        intro="Beschreibt Kai kurz, wo ihr mit eurem Produkt steht. Er hilft euch, die nächste entscheidende Produktfrage einzuordnen."
        contextKey="produkt-story"
        initialMessage="Hallo, ich bin Kai. Erzählt mir kurz, was bereits steht und was für Menschen im Alltag künftig besser funktionieren soll."
        inputPlaceholder="Was soll für eure Nutzer oder Teams konkret einfacher werden?"
        suggestedPrompts={[
          'Wir haben eine klare Idee, brauchen aber ein tragfähiges Produktkonzept.',
          'Unser Produkt funktioniert grundsätzlich, aber Nutzer und Systeme wachsen auseinander.',
          'Wir müssen Experience, Technologie und Weiterentwicklung besser zusammenbringen.',
        ]}
        privacyNotice="Bitte keine vertraulichen Projekt-, Kunden- oder Personendaten eingeben. Kai ist ein KI-Assistent von kenalu."
        showContactCta={true}
      />

      {/* ── 6. Ehrliche Einordnung ──────────────────────────────── */}
      <section className="sd-honest-fit">
        <div className="container container--narrow">
          <p className="section-label">Ehrliche Einordnung</p>
          <h2 className="sd-honest-h2">Produkt ist nicht immer der richtige erste Schritt.</h2>
          <ul className="sd-honest-list">
            <li>Ihr wisst noch nicht, welches Problem ihr wirklich lösen wollt oder wo der Nutzen liegt.</li>
            <li>Ihr wollt zuerst nur eine einzelne Hypothese prüfen, bevor ein grösseres Vorhaben entsteht.</li>
            <li>Ihr sucht ausschliesslich kurzfristige Zusatzkapazität für bereits vollständig spezifizierte Entwicklungstickets.</li>
          </ul>
          <p className="sd-honest-alt">
            Wenn Nutzen, Priorität oder Richtung noch offen sind, beginnt ihr besser mit
            Klarheit. Wenn nur eine zentrale Annahme geprüft werden soll, ist Rapid Build
            wahrscheinlich der passendere Start.
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
          <h2 className="sd-cta-h2">Lasst uns den ersten echten Alltag mitdenken.</h2>
          <p className="sd-cta-text">
            In einem ersten Gespräch klären wir, was ein tragfähiger Start für euer Produkt
            wirklich braucht.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Gespräch starten →
          </Link>
        </div>
      </section>

    </main>
  );
}
