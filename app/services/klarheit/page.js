import Link from 'next/link';
import StoryblokClient from 'storyblok-js-client';
import KaiDialogue from '../../../components/blocks/KaiDialogue';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

const SEO_DEFAULTS = {
  title: 'Klarheit für digitale Produkt- und AI-Entscheidungen | kenalu',
  description:
    'Klarheit hilft Teams, aus vielen Möglichkeiten eine begründete Richtung zu machen – bevor Budget, Teams und Erwartungen in die falsche Richtung laufen.',
};

async function getSEO() {
  try {
    const { data } = await Storyblok.get('cdn/stories/service-detail/klarheit', {
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
    alternates: { canonical: 'https://kenalu.ch/services/klarheit' },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: 'https://kenalu.ch/services/klarheit',
      siteName: 'kenalu',
      locale: 'de_CH',
      type: 'website',
    },
  };
}

// ── Entscheidungskarte (visuelle Arbeitsprobe) ────────────────────────────────

const DECISION_FIELDS = [
  {
    title: 'Was liegt auf dem Tisch?',
    text: 'Die Themen, Möglichkeiten und Erwartungen, die gerade gleichzeitig um Aufmerksamkeit konkurrieren.',
  },
  {
    title: 'Welche Frage zählt?',
    text: 'Die eine Entscheidung, ohne die das Vorhaben nicht sinnvoll weiterkommt.',
  },
  {
    title: 'Was spricht dafür?',
    text: 'Nutzen, Voraussetzungen, Risiken und Abhängigkeiten, die für diese Entscheidung relevant sind.',
  },
  {
    title: 'Was folgt daraus?',
    text: 'Eine begründete Richtung und der nächste Schritt, der jetzt sinnvoll ist.',
  },
];

const OUTCOME_ITEMS = [
  {
    title: 'Prioritäten werden begründbar.',
    text: 'Nicht alles muss gleichzeitig passieren. Aber es wird klar, worauf sich Aufmerksamkeit und Investition zuerst richten sollten.',
  },
  {
    title: 'Risiken werden früh sichtbar.',
    text: 'Offene Annahmen, fehlende Voraussetzungen und mögliche Sackgassen liegen auf dem Tisch, bevor sie teuer werden.',
  },
  {
    title: 'Der nächste Schritt wird kleiner und klarer.',
    text: 'Vielleicht folgt ein Rapid Build. Vielleicht ein Produktvorhaben. Vielleicht bewusst noch nichts. Entscheidend ist, dass diese Wahl begründet ist.',
  },
];

const RELATED = [
  {
    label: 'Rapid Build',
    text: 'Wenn eine Annahme sichtbar getestet werden soll.',
    href: '/services/rapid-build',
  },
  {
    label: 'Produkt',
    text: 'Wenn eine bestätigte Richtung in ein tragfähiges Produkt überführt werden soll.',
    href: '/services/produkt',
  },
  {
    label: 'Urteil',
    text: 'Wenn ein bestehendes Vorhaben unabhängig eingeordnet werden soll.',
    href: '/services/urteil',
  },
];

// ── Seite ─────────────────────────────────────────────────────────────────────

export default function KlarheitPage() {
  return (
    <main className="sd-page sd-page--klarheit">

      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="sd-hero">
        <div className="container">
          <p className="section-label">01 · Klarheit</p>
          <h1 className="sd-hero-h1">
            Alle sehen Möglichkeiten. Niemand kann sagen, welche jetzt zählt.
          </h1>
          <p className="sd-hero-intro">
            Neue AI-Ideen, Wünsche aus dem Business, ein digitales Angebot, das besser werden
            sollte, und vielleicht auch Druck, endlich etwas zu tun. Jede Richtung klingt
            plausibel. Genau deshalb fällt keine Entscheidung.
          </p>
          <p className="sd-hero-meta">Ein konzentrierter Entscheidungsraum · häufig 4–8 Arbeitstage</p>
          <Link href="/contact" className="btn btn-primary sd-hero-cta">
            Die offene Entscheidung besprechen →
          </Link>
        </div>
      </section>

      {/* ── 2. Szene ────────────────────────────────────────────── */}
      <section className="sd-scene">
        <div className="container container--narrow">
          <p className="section-label">Der Moment davor</p>
          <h2 className="sd-scene-h2">Der Tisch wird voller. Die Richtung nicht klarer.</h2>
          <p className="sd-scene-text">
            Im Lauf der Zeit kommen immer neue Gedanken dazu. Vertrieb sieht Chancen. Das
            Produktteam sieht Lücken. IT sieht Abhängigkeiten. Die Führung erwartet Bewegung.
            Jede Perspektive ist relevant – aber keine beantwortet allein die entscheidende Frage.
          </p>
          <p className="sd-scene-text">
            Klarheit beginnt deshalb nicht mit einer weiteren Idee. Sie beginnt damit, sichtbar
            zu machen, welche Entscheidung gerade wirklich offen ist.
          </p>
        </div>
      </section>

      {/* ── 3. Entscheidungskarte (Arbeitsprobe) ─────────────────── */}
      <section className="sd-artifact sd-artifact--decision">
        <div className="container">
          <p className="section-label">Was daraus entsteht</p>
          <h2 className="sd-artifact-h2">
            Nicht alles wird klar. Aber das Entscheidende wird entscheidbar.
          </h2>
          <p className="sd-artifact-lead">
            Eine Entscheidungskarte verdichtet die Ausgangslage so, dass eine nächste
            Entscheidung nicht länger vertagt werden muss.
          </p>

          <div
            className="artifact-decision-map"
            role="img"
            aria-label="Entscheidungskarte: vier Felder — Was liegt auf dem Tisch, Welche Frage zählt, Was spricht dafür, Was folgt daraus"
          >
            {DECISION_FIELDS.map((field, i) => (
              <div key={i} className={`adm-field adm-field--${i + 1}`}>
                <p className="adm-field-title">{field.title}</p>
                <p className="adm-field-text">{field.text}</p>
              </div>
            ))}
            <div className="adm-center-mark" aria-hidden="true">
              <span>→</span>
            </div>
          </div>

          <p className="sd-artifact-note">
            Die Entscheidungskarte ist eine Arbeitsform von kenalu. Sie ist kein Kundenbeispiel.
          </p>
        </div>
      </section>

      {/* ── 4. Kai ──────────────────────────────────────────────── */}
      <KaiDialogue
        eyebrow="Einmal laut denken"
        headline="Was liegt bei euch seit Wochen auf dem Tisch?"
        intro="Beschreibt Kai kurz, worüber ihr intern gerade diskutiert. Er hilft euch, die eigentliche Entscheidungsfrage herauszuarbeiten."
        contextKey="klarheit-story"
        initialMessage="Hallo, ich bin Kai. Erzählt mir kurz, welche Entscheidung bei euch offen ist und warum sie bisher noch nicht gefallen ist."
        inputPlaceholder="Welche Entscheidung wird bei euch gerade vertagt?"
        suggestedPrompts={[
          'Wir sehen viele Möglichkeiten für AI, aber keine klare Priorität.',
          'Wir wollen ein digitales Angebot verbessern, wissen aber nicht, wo der Hebel liegt.',
          'Wir haben mehrere gute Ideen und können sie nicht sinnvoll vergleichen.',
        ]}
        privacyNotice="Bitte keine vertraulichen Projekt-, Kunden- oder Personendaten eingeben. Kai ist ein KI-Assistent von kenalu."
        showContactCta={true}
      />

      {/* ── 5. Danach ───────────────────────────────────────────── */}
      <section className="sd-danach">
        <div className="container">
          <p className="section-label">Danach</p>
          <h2 className="sd-danach-h2">Aus Diskussion wird ein nächster Schritt.</h2>
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
          <h2 className="sd-honest-h2">Klarheit ist nicht immer der richtige Beginn.</h2>
          <ul className="sd-honest-list">
            <li>Ihr habt bereits eine bestätigte Richtung und müsst vor allem einen konkreten Produktausschnitt bauen.</li>
            <li>Ihr wollt ausschliesslich zusätzliche Entwicklungskapazität für ein klar definiertes Backlog.</li>
            <li>Ihr sucht eine allgemeine Inspirationssession ohne konkrete Entscheidung.</li>
          </ul>
          <p className="sd-honest-alt">
            Wenn ihr bereits wisst, was sichtbar getestet werden soll, passt Rapid Build
            wahrscheinlich besser. Wenn ein Produktvorhaben klar genug umrissen ist, ist
            Produkt der passendere nächste Raum.
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
          <h2 className="sd-cta-h2">Lasst uns die offene Entscheidung sortieren.</h2>
          <p className="sd-cta-text">
            In einem ersten Gespräch klären wir, welche Frage gerade wirklich beantwortet
            werden muss.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Gespräch starten →
          </Link>
        </div>
      </section>

    </main>
  );
}
