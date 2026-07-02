import Link from 'next/link';
import StoryblokClient from 'storyblok-js-client';
import KaiDialogue from '../../../components/blocks/KaiDialogue';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

const SEO_DEFAULTS = {
  title: 'Rapid Build: Ideen sichtbar und testbar machen | kenalu',
  description:
    'Rapid Build macht aus einer Hypothese einen erlebbaren Produktausschnitt – damit Teams nicht länger nur über eine Idee sprechen, sondern sie fundiert prüfen können.',
};

async function getSEO() {
  try {
    const { data } = await Storyblok.get('cdn/stories/service-detail/rapid-build', {
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
    alternates: { canonical: 'https://kenalu.ch/services/rapid-build' },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: 'https://kenalu.ch/services/rapid-build',
      siteName: 'kenalu',
      locale: 'de_CH',
      type: 'website',
    },
  };
}

// ── Testbarer Produktausschnitt (3 Schritte) ─────────────────────────────────

const SEQUENCE_STEPS = [
  {
    step: '01',
    title: 'Die Annahme',
    text: 'Was muss wahr sein, damit sich dieser Build lohnt?',
  },
  {
    step: '02',
    title: 'Der Moment',
    text: 'Welche Interaktion, welcher Service-Ablauf oder welche Entscheidung muss jemand erleben, damit diese Annahme sichtbar wird?',
  },
  {
    step: '03',
    title: 'Die Reaktion',
    text: 'Was verstehen, erwarten, übersehen oder brauchen Menschen tatsächlich?',
  },
];

const OUTCOME_ITEMS = [
  {
    title: 'Was funktioniert',
    text: 'Welche Teile der Idee Menschen sofort verstehen, nutzen oder als hilfreich erleben.',
  },
  {
    title: 'Was fehlt',
    text: 'Wo Erwartungen, Inhalt, Ablauf oder technische Realität noch nicht zusammenpassen.',
  },
  {
    title: 'Was als Nächstes zählt',
    text: 'Ob die Idee weiterverfolgt, angepasst, vertieft oder bewusst gestoppt werden sollte.',
  },
];

const RELATED = [
  {
    label: 'Klarheit',
    text: 'Wenn zuerst die entscheidende Richtung gefunden werden muss.',
    href: '/services/klarheit',
  },
  {
    label: 'Produkt',
    text: 'Wenn aus dem getesteten Moment eine tragfähige Grundlage werden soll.',
    href: '/services/produkt',
  },
  {
    label: 'Urteil',
    text: 'Wenn ein bestehender Ansatz oder erster Build unabhängig eingeordnet werden soll.',
    href: '/services/urteil',
  },
];

// ── Seite ─────────────────────────────────────────────────────────────────────

export default function RapidBuildPage() {
  return (
    <main className="sd-page sd-page--rapid-build">

      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="sd-hero sd-hero--dynamic">
        <div className="container">
          <p className="section-label">02 / Rapid Build</p>
          <h1 className="sd-hero-h1">
            Eine Idee verändert sich, sobald jemand sie benutzen kann.
          </h1>
          <p className="sd-hero-intro">
            Solange eine Idee nur beschrieben wird, stellt sich jede Person etwas anderes
            darunter vor. Im Meeting nicken alle. Im nächsten Gespräch beginnt die Diskussion
            von vorn. Rapid Build schafft den einen Moment, an dem eine Annahme nicht mehr
            erklärt werden muss, weil man sie erleben kann.
          </p>
          <p className="sd-hero-meta">Ein fokussierter Build · oft rund zwei Wochen</p>
          <Link href="/contact" className="btn btn-primary sd-hero-cta">
            Die entscheidende Annahme besprechen →
          </Link>
        </div>
      </section>

      {/* ── 2. Szene ────────────────────────────────────────────── */}
      <section className="sd-scene">
        <div className="container container--narrow">
          <p className="section-label">Der Moment davor</p>
          <h2 className="sd-scene-h2">Im Meeting nicken alle. Aber niemand sieht dasselbe.</h2>
          <p className="sd-scene-text">
            Eine Idee kann in einer Präsentation plausibel wirken und trotzdem noch zu offen
            sein. Was passiert wirklich? Versteht jemand den Ablauf? Entsteht Nutzen? Würde
            jemand ihn wieder nutzen? Solange das nur beschrieben wird, bleiben Antworten
            Vermutungen.
          </p>
          <p className="sd-scene-text">
            Rapid Build baut nicht möglichst viel Produkt. Es baut gerade genug, damit eine
            zentrale Frage für Menschen sichtbar wird.
          </p>
        </div>
      </section>

      {/* ── 3. Testbarer Produktausschnitt (Arbeitsprobe) ────────── */}
      <section className="sd-artifact sd-artifact--sequence">
        <div className="container">
          <p className="section-label">Was daraus entsteht</p>
          <h2 className="sd-artifact-h2">
            Ein kleiner Moment, der eine grosse Frage beantwortet.
          </h2>
          <p className="sd-artifact-lead">
            Nicht ein möglichst grosses MVP. Sondern ein begrenzter Produktausschnitt, der
            eine zentrale Annahme erlebbar und überprüfbar macht.
          </p>

          <div
            className="artifact-sequence"
            role="img"
            aria-label="Testbarer Produktausschnitt: drei verbundene Schritte — Die Annahme, Der Moment, Die Reaktion"
          >
            {SEQUENCE_STEPS.map((step, i) => (
              <div key={i} className="aseq-step">
                <div className="aseq-step-header">
                  <span className="aseq-step-num">{step.step}</span>
                  {i < SEQUENCE_STEPS.length - 1 && (
                    <span className="aseq-connector" aria-hidden="true">→</span>
                  )}
                </div>
                <p className="aseq-step-title">{step.title}</p>
                <p className="aseq-step-text">{step.text}</p>
              </div>
            ))}
          </div>

          <p className="sd-artifact-note">
            Die Darstellung beschreibt eine Arbeitsform von kenalu und kein Kundenprodukt.
          </p>
        </div>
      </section>

      {/* ── 4. Danach ───────────────────────────────────────────── */}
      <section className="sd-danach sd-danach--highlighted">
        <div className="container">
          <p className="section-label">Danach</p>
          <h2 className="sd-danach-h2">Aus Meinungen wird beobachtbares Feedback.</h2>
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
        eyebrow="Den Gedanken greifbar machen"
        headline="Was müsste jemand erleben, damit ihr nicht mehr raten müsst?"
        intro="Beschreibt Kai kurz eure Idee oder Hypothese. Er hilft euch, die eine Annahme zu finden, die zuerst sichtbar gemacht werden sollte."
        contextKey="rapid-build-story"
        initialMessage="Hallo, ich bin Kai. Erzählt mir kurz, welche Idee ihr nicht länger nur diskutieren, sondern erlebbar machen möchtet."
        inputPlaceholder="Was soll jemand sehen oder erleben können?"
        suggestedPrompts={[
          'Wir müssen intern zeigen, wie unsere Idee konkret funktionieren könnte.',
          'Wir möchten prüfen, ob Nutzer diese Idee wirklich verstehen oder brauchen.',
          'Wir wollen nicht weiter diskutieren, sondern eine zentrale Annahme testen.',
        ]}
        privacyNotice="Bitte keine vertraulichen Projekt-, Kunden- oder Personendaten eingeben. Kai ist ein KI-Assistent von kenalu."
        showContactCta={true}
      />

      {/* ── 6. Ehrliche Einordnung ──────────────────────────────── */}
      <section className="sd-honest-fit">
        <div className="container container--narrow">
          <p className="section-label">Ehrliche Einordnung</p>
          <h2 className="sd-honest-h2">
            Rapid Build ist nicht für jede offene Situation der beste Start.
          </h2>
          <ul className="sd-honest-list">
            <li>Die grundlegende Richtung und der erwartete Nutzen sind noch völlig offen.</li>
            <li>Ihr braucht primär eine langfristige Produkt- oder Plattformarchitektur.</li>
            <li>Ihr wollt nur eine schöne Oberfläche, ohne eine konkrete Annahme prüfen zu wollen.</li>
          </ul>
          <p className="sd-honest-alt">
            Wenn die zentrale Frage noch nicht klar genug ist, beginnt ihr wahrscheinlich mit
            Klarheit. Wenn die Richtung bestätigt ist und ein vollständigerer Produktaufbau
            ansteht, passt Produkt besser.
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
          <h2 className="sd-cta-h2">Lasst uns die entscheidende Annahme sichtbar machen.</h2>
          <p className="sd-cta-text">
            In einem ersten Gespräch klären wir, was ein Build wirklich zeigen muss – und was
            noch nicht.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Gespräch starten →
          </Link>
        </div>
      </section>

    </main>
  );
}
