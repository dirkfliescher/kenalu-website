import Link from 'next/link';
import StoryblokClient from 'storyblok-js-client';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

const SEO_DEFAULTS = {
  title: 'Wie eine Website vom Schaufenster zum Gespräch wird | kenalu Lab',
  description:
    'kenalu.ch ist eine eigene Arbeitsprobe von Kenalu: eine Website, die Orientierung gibt, Dialog ermöglicht und sich als digitales Produkt weiterentwickeln lässt.',
  og_title: 'Wie eine Website vom Schaufenster zum Gespräch wird.',
  og_description:
    'Eine eigene Arbeitsprobe darüber, wie eine Website Orientierung, Dialog und Weiterentwicklung verbinden kann.',
};

async function getSEO() {
  try {
    const { data } = await Storyblok.get('cdn/stories/lab/kenalu-website', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    const c = data.story.content;
    return {
      title:          c.seo_title          || SEO_DEFAULTS.title,
      description:    c.seo_description    || SEO_DEFAULTS.description,
      og_title:       c.og_title           || SEO_DEFAULTS.og_title,
      og_description: c.og_description     || SEO_DEFAULTS.og_description,
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
    alternates: { canonical: 'https://kenalu.ch/lab/kenalu-website' },
    openGraph: {
      title:       seo.og_title,
      description: seo.og_description,
      url:         'https://kenalu.ch/lab/kenalu-website',
      siteName:    'kenalu',
      locale:      'de_CH',
      type:        'article',
    },
  };
}

// ── Vergleichs-Daten ──────────────────────────────────────────────────────────

const CLASSIC_ITEMS = ['Strategie', 'Design', 'Entwicklung', 'AI', 'Beratung'];

const KENALU_ITEMS = [
  { name: 'Klarheit',     desc: 'Wissen, worauf sich der nächste Schritt lohnt.' },
  { name: 'Rapid Build',  desc: 'Eine Annahme sichtbar machen, bevor viel investiert wird.' },
  { name: 'Produkt',      desc: 'Aus einer Richtung ein Produkt machen, das im Alltag funktioniert.' },
  { name: 'Urteil',       desc: 'Eine zweite Sicht, bevor ihr euch festlegt.' },
];

const FOUNDATION_LAYERS = [
  {
    label: 'Inhalt',
    text: 'Storyblok ermöglicht, Inhalte und Seitenmodule redaktionell weiterzuentwickeln.',
  },
  {
    label: 'Produktlogik',
    text: 'Next.js verbindet Inhalte, Komponenten und Interaktionen zu einer schlanken digitalen Grundlage.',
  },
  {
    label: 'Dialog',
    text: 'Kai schafft dort einen Gesprächsraum, wo Lesen allein nicht weiterhilft.',
  },
  {
    label: 'Weiterentwicklung',
    text: 'Neue Einstiege, Inhalte und Produktmomente können ergänzt werden, ohne die gesamte Website neu aufzubauen.',
  },
];

const DIALOGUE_MSGS = [
  {
    sender: 'Besucher',
    role: 'user',
    text: 'Wir sehen viele Möglichkeiten für AI, wissen aber nicht, wo es für uns wirklich sinnvoll wäre.',
  },
  {
    sender: 'Kai',
    role: 'kai',
    text: 'Das klingt nach einer offenen Entscheidungsfrage, nicht nach einem reinen Build-Thema. Damit ich das besser einordnen kann: Was soll sich für eure Kunden, Mitarbeitenden oder Abläufe konkret verbessern?',
  },
  {
    sender: 'Besucher',
    role: 'user',
    text: 'Unsere Service-Teams verbringen viel Zeit mit wiederkehrenden Anfragen. Gleichzeitig wollen wir die Qualität für Kunden verbessern.',
  },
  {
    sender: 'Kai',
    role: 'kai',
    text: 'Dann lohnt es sich wahrscheinlich zuerst zu klären, welche Anfragen sich tatsächlich verändern lassen, welche Informationen dafür fehlen und woran ihr den Nutzen messen würdet. Das könnte ein guter Ausgangspunkt für Klarheit sein.',
  },
];

// ── Seite ─────────────────────────────────────────────────────────────────────

export default function KenaluWebsiteArtikel() {
  return (
    <main className="lca-page">

      {/* ── 1. Hero ─────────────────────────────────────────────────── */}
      <section className="lca-hero">
        <div className="container">
          <p className="section-label">Eigene Arbeitsprobe</p>
          <h1 className="lca-hero-headline">
            Was entsteht, wenn eine Website mitdenkt.
          </h1>
          <p className="lca-hero-intro">
            Eine Beratung, die von Klarheit, Experience und Engineering spricht, sollte nicht
            mit einer statischen Broschüre starten. Deshalb wurde kenalu.ch als Produkt
            gedacht. Als lebendiger Beweis für das, was kenalu propagiert: KI nicht als
            Hilfsmittel am Rand, sondern als Kern des Prozesses und des Produkts.
          </p>
          <p className="lca-hero-meta">
            kenalu.ch · Gebaut von Dirk Fliescher und Claude (Anthropic) · läuft und wird weiterentwickelt
          </p>
        </div>
      </section>

      {/* ── 2. Ausgangslage ─────────────────────────────────────────── */}
      <section className="lca-section">
        <div className="container container--narrow">
          <p className="section-label">Ausgangslage</p>
          <h2 className="lca-h2">
            Eine Website kann informieren. Oder sie kann beim Denken helfen.
          </h2>
          <div className="lca-text-block">
            <p>
              Viele B2B-Websites erklären Leistungen, zeigen Aussagen über die eigene
              Kompetenz und führen irgendwann zu einem Kontaktformular. Das ist nicht falsch.
              Für komplexe digitale Vorhaben reicht es aber oft nicht.
            </p>
            <p>
              Wer auf eine Website kommt, hat selten schon eine sauber formulierte Anfrage.
              Häufig gibt es eine offene Idee, einen Druck zu handeln, eine unklare
              Entscheidung oder ein Produkt, das nicht mehr richtig weiterkommt.
            </p>
            <p>
              Die Frage war deshalb nicht: Wie erklären wir Kenalu möglichst vollständig?
              <br />
              Die Frage war: Wie hilft die Website einer Person dabei, ihre eigene Situation
              besser einzuordnen?
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Die zentrale Produktentscheidung ─────────────────────── */}
      <section className="lca-section lca-section--tinted">
        <div className="container">
          <p className="section-label">Die Entscheidung</p>
          <h2 className="lca-h2">
            Die Website sollte nicht nur Inhalte zeigen. Sie sollte einen nächsten Gedanken
            auslösen.
          </h2>
          <p className="lca-lead">
            kenalu.ch wurde als erstes kleines Produkt von Kenalu entwickelt. Nicht als
            fertige Visitenkarte, sondern als Grundlage, die sich weiterentwickeln kann.
          </p>
          <div className="lca-decision-cards">
            <div className="lca-card">
              <p className="lca-card-title">Orientierung statt Leistungswand.</p>
              <p className="lca-card-text">
                Menschen starten nicht bei einer internen Organisationslogik. Sie starten
                bei der Frage, die gerade offen ist.
              </p>
            </div>
            <div className="lca-card">
              <p className="lca-card-title">Dialog statt Kontaktformular-Monolog.</p>
              <p className="lca-card-text">
                Wer seine Situation noch nicht sauber benennen kann, soll trotzdem beginnen
                können, darüber zu sprechen.
              </p>
            </div>
            <div className="lca-card">
              <p className="lca-card-title">Weiterentwicklung statt Website-Release.</p>
              <p className="lca-card-text">
                Inhalte, Komponenten und neue Produktmomente sollen sich verändern können,
                ohne dass die Website jedes Mal neu erfunden werden muss.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4a. Highlight 01: Entscheidungsraum ─────────────────────── */}
      <section className="lca-section lca-highlight">
        <div className="container">
          <p className="section-label lca-highlight-num">Highlight 01</p>
          <h2 className="lca-h2">Von der Leistungsliste zum Entscheidungsraum.</h2>
          <p className="lca-lead">
            Statt Besucher mit einer langen Liste von Angeboten zu konfrontieren, beginnt
            die Website mit einer einfacheren Frage: <strong>Wo steht ihr gerade?</strong>
          </p>
          <p className="lca-text">
            Die vier Einstiege Klarheit, Rapid Build, Produkt und Urteil sind keine internen
            Leistungsabteilungen. Sie beschreiben vier unterschiedliche Situationen, in denen
            eine wichtige Entscheidung ansteht.
          </p>

          {/* Comparison Canvas */}
          <div
            className="lca-canvas"
            role="img"
            aria-label="Gegenüberstellung: Klassische Leistungslogik vs. Entscheidungslogik von kenalu"
          >
            <div className="lca-canvas-col lca-canvas-col--muted">
              <p className="lca-canvas-col-title">Klassische Leistungslogik</p>
              <ul className="lca-canvas-list">
                {CLASSIC_ITEMS.map((item) => (
                  <li key={item} className="lca-canvas-item">{item}</li>
                ))}
              </ul>
            </div>
            <div className="lca-canvas-divider" aria-hidden="true">→</div>
            <div className="lca-canvas-col lca-canvas-col--featured">
              <p className="lca-canvas-col-title">Entscheidungslogik von kenalu</p>
              <ul className="lca-canvas-list">
                {KENALU_ITEMS.map((item) => (
                  <li key={item.name} className="lca-canvas-item lca-canvas-item--rich">
                    <span className="lca-canvas-item-name">{item.name}</span>
                    <span className="lca-canvas-item-desc">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="lca-text lca-canvas-closing">
            Die Veränderung ist klein, aber entscheidend: Die Website beginnt nicht mit dem,
            was Kenalu intern anbietet. Sie beginnt mit dem, was bei einer Person gerade
            entschieden werden muss.
          </p>
          <p className="lca-notice">
            Die Darstellung beschreibt eine Informationsarchitektur. Sie ist keine Bewertung
            anderer Websites oder Agenturmodelle.
          </p>
          <Link href="/services" className="lca-internal-link">
            Zu den vier Einstiegen →
          </Link>
        </div>
      </section>

      {/* ── 4b. Highlight 02: Kai Dialog ────────────────────────────── */}
      <section className="lca-section lca-highlight lca-section--tinted">
        <div className="container">
          <p className="section-label lca-highlight-num">Highlight 02</p>
          <h2 className="lca-h2">Von Information zu einem echten ersten Gespräch.</h2>
          <p className="lca-lead">
            Nicht jede Person weiss sofort, ob sie Klarheit braucht, eine Idee testen sollte
            oder bereits vor einem Produktvorhaben steht. Darum gibt es Kai.
          </p>
          <p className="lca-text">
            Kai ist kein aufklappbarer Chat-Button und kein Lead-Formular mit künstlicher
            Freundlichkeit. Kai ist ein direkt sichtbarer Gesprächspartner. Menschen können
            ihre Situation in eigenen Worten beschreiben, Rückfragen beantworten und die
            eigentliche Frage hinter ihrem Vorhaben besser verstehen.
          </p>
          <p className="lca-text">
            Kai ersetzt kein persönliches Gespräch. Er hilft dabei, dass ein Gespräch mit
            einer klareren Ausgangslage beginnt.
          </p>

          {/* Dialogue Example */}
          <div className="lca-dialogue">
            <p className="lca-dialogue-title">Ein möglicher erster Austausch</p>
            <div className="lca-msgs" role="list" aria-label="Beispielhafter Dialog">
              {DIALOGUE_MSGS.map((msg, i) => (
                <article
                  key={i}
                  className={`lca-msg lca-msg--${msg.role}`}
                  role="listitem"
                >
                  <p className="lca-msg-sender">{msg.sender}</p>
                  <p className="lca-msg-text">{msg.text}</p>
                </article>
              ))}
            </div>
            <p className="lca-dialogue-notice">
              Beispielhafter Dialog. Kai ist ein KI-Assistent von kenalu und ersetzt kein
              persönliches Gespräch.
            </p>
          </div>

          <p className="lca-text">
            Der entscheidende Unterschied liegt nicht im Chat selbst. Er liegt darin, dass
            die Website nicht verlangt, dass Menschen ihre Situation zuerst in Kategorien,
            Briefings oder Fachbegriffe übersetzen.
          </p>
        </div>
      </section>

      {/* ── 4c. Highlight 03: Foundation ────────────────────────────── */}
      <section className="lca-section lca-highlight">
        <div className="container">
          <p className="section-label lca-highlight-num">Highlight 03</p>
          <h2 className="lca-h2">
            Von einem Website-Release zu einer Grundlage, die weiterlernen kann.
          </h2>
          <p className="lca-lead">
            Eine Website ist selten fertig. Neue Fragen, Inhalte, Leistungen und
            Gesprächsformen entstehen erst mit der Zeit. Deshalb wurde kenalu.ch nicht als
            starre Seite gedacht, sondern als Grundlage für weitere Produktmomente.
          </p>
          <p className="lca-text">
            Technologie ist dabei nicht der Beweis für Qualität. Sie schafft nur die
            Voraussetzung dafür, dass sich Inhalte und Interaktionen kontrolliert
            weiterentwickeln lassen.
          </p>

          {/* Foundation Layers */}
          <div
            className="lca-foundation"
            role="img"
            aria-label="Die technische Grundlage hinter kenalu.ch: Inhalt, Produktlogik, Dialog, Weiterentwicklung"
          >
            <p className="lca-foundation-title">Die Grundlage hinter der Website</p>
            <dl className="lca-layers">
              {FOUNDATION_LAYERS.map((layer, i) => (
                <div key={i} className="lca-layer">
                  <dt className="lca-layer-label">{layer.label}</dt>
                  <dd className="lca-layer-text">{layer.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="lca-text">
            Das ist keine Stack-Werbung. Es ist eine bewusste Architekturentscheidung: Die
            Website soll mit dem Geschäft, den Fragen der Besucher und der Arbeitsweise von
            Kenalu mitwachsen können.
          </p>
        </div>
      </section>

      {/* ── 4d. Highlight 04: Mensch-KI-Zusammenarbeit ─────────────── */}
      <section className="lca-section lca-highlight lca-section--tinted">
        <div className="container">
          <p className="section-label lca-highlight-num">Highlight 04</p>
          <h2 className="lca-h2">
            Visioniert, geplant, gebaut und weiterentwickelt. Dirk und Claude gemeinsam.
          </h2>
          <p className="lca-lead">
            kenalu.ch ist nicht das Produkt eines Teams von zehn Personen. Es ist das Ergebnis
            einer engen Zusammenarbeit zwischen Dirk Fliescher und Claude, Anthropics KI-Modell.
            Jede Entscheidung, jeder Text, jede Komponente, jeder Code-Review: gemeinsam
            erarbeitet.
          </p>
          <p className="lca-text">
            Was das konkret heisst: Dirk bringt die Vision, die Haltung und das letzte Wort.
            Claude übernimmt Strategie, Konzept, Architektur, Implementierung, Copy, SEO und
            GEO: immer in direktem Austausch, immer unter Dirks Urteil. Kein Vieraugenprinzip,
            kein Agentur-Overhead. Zwei denkende Partner.
          </p>
          <div className="lca-decision-cards">
            <div className="lca-card">
              <p className="lca-card-title">Vollständig gemeinsam.</p>
              <p className="lca-card-text">
                Von der ersten strategischen Frage bis zum laufenden Code: Vision, Konzept,
                Design, Implementierung, Content, Storyblok-Integration. Alles co-authored.
              </p>
            </div>
            <div className="lca-card">
              <p className="lca-card-title">Kontinuierlich, nicht einmalig.</p>
              <p className="lca-card-text">
                Code Reviews, Accessibility, Performance, SEO und GEO laufen fortlaufend.
                Die Website ist kein Release. Sie ist ein lebendes Experiment.
              </p>
            </div>
            <div className="lca-card">
              <p className="lca-card-title">Menschliches Urteil als Mass.</p>
              <p className="lca-card-text">
                KI produziert Breite und Geschwindigkeit. Was bleibt, entscheidet Dirk.
                Haltung, Ton und Richtung sind nicht delegiert. Sie sind bewusst gewählt.
              </p>
            </div>
          </div>
          <p className="lca-text">
            Das ist kein Experiment darüber, ob KI schreiben oder coden kann. Das ist ein
            Experiment darüber, was ein Mensch mit der richtigen KI-Partnerschaft leisten
            kann. Und was das für Unternehmen bedeutet, die ähnliches vorhaben.
          </p>
        </div>
      </section>

      {/* ── 5. Übertragbar ──────────────────────────────────────────── */}
      <section className="lca-section">
        <div className="container container--narrow">
          <p className="section-label">Übertragbar</p>
          <h2 className="lca-h2">
            Das gleiche Muster gilt auch für andere digitale Produkte.
          </h2>
          <p className="lca-text">
            Die Website zeigt im Kleinen, wie Kenalu auch an anderen Vorhaben arbeitet:
          </p>
          <ul className="lca-list">
            <li>Zuerst die Entscheidung hinter dem Vorhaben verstehen.</li>
            <li>Danach die entscheidende Annahme sichtbar machen.</li>
            <li>
              Dann eine Grundlage bauen, die im Alltag funktioniert und weiterentwickelt
              werden kann.
            </li>
          </ul>
          <p className="lca-text">
            Ob es um ein Kundenportal, einen internen Service, eine neue Experience oder einen
            AI-Anwendungsfall geht: Gute digitale Produkte beginnen nicht mit einer
            Funktionsliste. Sie beginnen mit einer klaren Frage.
          </p>
        </div>
      </section>

      {/* ── 6. Transparenzhinweis ───────────────────────────────────── */}
      <section className="lca-section lca-section--tinted">
        <div className="container container--narrow">
          <p className="section-label">Transparenz</p>
          <h2 className="lca-h2">Eine Arbeitsprobe. Und ein ehrlicher Beweis.</h2>
          <p className="lca-text">
            kenalu.ch ist ein eigenes Produkt von kenalu. Sie ist kein Beweis für Wirkung in
            einem Kundenprojekt und keine Referenz für ein abgeschlossenes Mandat.
          </p>
          <p className="lca-text">
            Sie ist etwas anderes: ein öffentlich sichtbarer Beweis dafür, was entsteht, wenn
            Dirk Fliescher und Claude (Anthropics KI-Modell) gemeinsam arbeiten. Ohne
            Agentur. Ohne grosses Team. Mit klarer Aufgabenteilung: Vision und Urteil beim
            Menschen. Breite, Geschwindigkeit und technische Exzellenz mit KI.
          </p>
          <p className="lca-text">
            Gerade deshalb kann sie offen zeigen, welche Entscheidungen getroffen wurden,
            wie sie sich weiterentwickelt und was das Modell in der Praxis wirklich bedeutet.
          </p>
        </div>
      </section>

      {/* ── 7. Abschluss-CTA ────────────────────────────────────────── */}
      <section className="lca-cta-section">
        <div className="container container--narrow">
          <p className="section-label">Nächster Schritt</p>
          <h2 className="lca-h2">Wollt ihr sehen, was dieses Modell für euer Vorhaben bedeutet?</h2>
          <p className="lca-text">
            Ob Website, KI-Produkt, Agentensystem oder Prozessautomation: Lasst uns
            anschauen, was entsteht, wenn Mensch und KI wirklich zusammenarbeiten.
            Und was das für euer Unternehmen konkret heisst.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Gespräch starten →
          </Link>
        </div>
      </section>

    </main>
  );
}
