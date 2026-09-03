import Link from 'next/link';
import StoryblokClient from 'storyblok-js-client';
import KaiDialogue from '@/components/blocks/KaiDialogue';

export const revalidate = 60;

export const metadata = {
  title: 'Lab | kenalu',
  description:
    'Im kenalu Lab entsteht, was Teams sehen, testen und entscheiden können – Arbeitsproben, Prototypen und eigene Produkte.',
  alternates: { canonical: 'https://kenalu.ch/lab' },
  openGraph: {
    title: 'Lab | kenalu',
    description:
      'Im kenalu Lab entsteht, was Teams sehen, testen und entscheiden können – Arbeitsproben, Prototypen und eigene Produkte.',
    url: 'https://kenalu.ch/lab',
    siteName: 'kenalu',
    locale: 'de_CH',
    type: 'website',
  },
};

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

/**
 * Lädt alle Lab-Projekte aus Storyblok.
 * Projekte mit project_featured = true erscheinen zuerst (im Featured-Format),
 * alle anderen folgen als Grid-Cards.
 */
async function getLabProjects() {
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      starts_with: 'lab/',
      sort_by: 'content.project_featured:desc,first_published_at:desc',
      per_page: 25,
    });
    // Nur Stories mit project_status oder project_teaser_1 anzeigen
    return (data.stories || []).filter(
      (s) => s.content?.project_status || s.content?.project_teaser_1,
    );
  } catch {
    return [];
  }
}

export default async function LabPage() {
  const projects = await getLabProjects();

  const featuredProjects = projects.filter((p) => p.content?.project_featured);
  const otherProjects    = projects.filter((p) => !p.content?.project_featured);

  return (
    <main className="lab-page-v2">

      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="lpv2-hero">
        <div className="container">
          <p className="section-label">kenalu Lab</p>
          <h1 className="lpv2-hero-headline">
            Aus offenen Fragen wird etwas, das man sehen, testen und entscheiden kann.
          </h1>
          <p className="lpv2-hero-text">
            Ein Experiment muss nicht gross sein. Es muss eine wichtige Frage beantworten.
            Im Lab zeigen wir, wie wir konkrete Produktannahmen überprüfen: mit einer Frage,
            einem gezielten Versuch und einer ehrlichen Erkenntnis.
            Die Erkenntnisse, Muster und Entwicklungslogiken aus diesen Experimenten fliessen
            in zukünftige Produkte ein – jeweils neu angepasst an ihren Kontext.
          </p>
        </div>
      </section>

      {/* ── 2. Projekte (dynamisch aus Storyblok) ───────────────── */}
      {projects.length > 0 && (
        <section className="lpv2-featured">
          <div className="container">

            {/* Featured-Projekte — gross, mit zwei Textblöcken */}
            {featuredProjects.map((project) => (
              <div key={project.uuid} className="lfw-inner lfw-inner--single">
                <div className="lfw-content">
                  {project.content.project_status && (
                    <p className="lfw-status-badge">{project.content.project_status}</p>
                  )}
                  <h2 className="lfw-title">{project.name}</h2>
                  {project.content.project_teaser_1 && (
                    <p className="lfw-teaser">{project.content.project_teaser_1}</p>
                  )}
                  {project.content.project_teaser_2 && (
                    <p className="lfw-teaser lfw-teaser--space">{project.content.project_teaser_2}</p>
                  )}
                  <Link href={`/${project.full_slug}`} className="btn btn-primary lfw-cta">
                    {project.content.project_cta_label || 'Arbeitsprobe ansehen →'}
                  </Link>
                </div>
              </div>
            ))}

            {/* Weitere Projekte — kompaktere Cards */}
            {otherProjects.length > 0 && (
              <div className="lfw-grid">
                {otherProjects.map((project) => (
                  <div key={project.uuid} className="lfw-grid-card">
                    {project.content.project_status && (
                      <p className="lfw-status-badge">{project.content.project_status}</p>
                    )}
                    <h2 className="lfw-grid-card-title">{project.name}</h2>
                    {project.content.project_teaser_1 && (
                      <p className="lfw-grid-card-teaser">{project.content.project_teaser_1}</p>
                    )}
                    <Link href={`/${project.full_slug}`} className="lca-internal-link">
                      {project.content.project_cta_label || 'Ansehen →'}
                    </Link>
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>
      )}

      {/* ── 3. Wie das Lab funktioniert ─────────────────────────── */}
      <section className="lpv2-what">
        <div className="container">
          <p className="section-label">Wie das Lab funktioniert</p>
          <h2 className="lpv2-what-headline">
            Das Lab ist kein Showroom. Es ist ein Ort, an dem wir konkrete
            Produktannahmen überprüfen.
          </h2>
          <div className="lpv2-what-cards">

            <div className="lpv2-what-card">
              <p className="lpv2-what-card-num">01</p>
              <h3 className="lpv2-what-card-title">Die Frage vor der Lösung</h3>
              <p className="lpv2-what-card-text">
                Jedes Experiment beginnt mit einer konkreten Produktfrage oder Annahme,
                nicht mit einer Technologie. Was wollen wir herausfinden?
              </p>
            </div>

            <div className="lpv2-what-card">
              <p className="lpv2-what-card-num">02</p>
              <h3 className="lpv2-what-card-title">Gezielt und begrenzt bauen</h3>
              <p className="lpv2-what-card-text">
                Wir bauen gerade genug, um die Annahme zu prüfen. Kein vollständiges
                Produkt, keine Demo. Etwas, das eine wichtige Frage sichtbar beantwortet.
              </p>
            </div>

            <div className="lpv2-what-card">
              <p className="lpv2-what-card-num">03</p>
              <h3 className="lpv2-what-card-title">Ehrliche Erkenntnis</h3>
              <p className="lpv2-what-card-text">
                Auch ein negatives Ergebnis ist ein Ergebnis. Wir dokumentieren, was wir
                gelernt haben — nicht nur, was funktioniert hat.
              </p>
            </div>

            <div className="lpv2-what-card">
              <p className="lpv2-what-card-num">04</p>
              <h3 className="lpv2-what-card-title">Bewusst entscheiden was folgt</h3>
              <p className="lpv2-what-card-text">
                Danach ist klarer, ob wir weiterbauen, anders weiterdenken oder bewusst
                nicht investieren. Auf Basis von Erkenntnissen, nicht von Annahmen.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. Think big. Start narrow. ─────────────────────────── */}
      <section className="lpv2-process">
        <div className="container">
          <p className="section-label">Jedes Experiment folgt derselben Logik</p>
          <h2 className="lpv2-process-headline">
            Gross denken. Eng beginnen. Lernen. Dann entscheiden.
          </h2>
          <p className="lpv2-process-intro">
            Wir beginnen mit einer grossen Produktfrage, isolieren eine konkrete Annahme
            und bauen gerade genug, um sie zu prüfen. Was wir daraus lernen, bestimmt,
            was als Nächstes sinnvoll ist.
          </p>
          <div className="lpv2-process-steps">

            <div className="lpv2-process-step">
              <p className="lpv2-process-step-num">01</p>
              <h3 className="lpv2-process-step-title">Annahme isolieren</h3>
              <p className="lpv2-process-step-text">
                Welche konkrete Produktfrage wollen wir beantworten?
                Was muss stimmen, damit eine Idee funktioniert?
              </p>
            </div>

            <div className="lpv2-process-step">
              <p className="lpv2-process-step-num">02</p>
              <h3 className="lpv2-process-step-title">Gezielt bauen</h3>
              <p className="lpv2-process-step-text">
                Wir bauen das Minimum, das nötig ist, um die Annahme zu prüfen —
                nicht mehr und nicht weniger.
              </p>
            </div>

            <div className="lpv2-process-step">
              <p className="lpv2-process-step-num">03</p>
              <h3 className="lpv2-process-step-title">Am echten Fall testen</h3>
              <p className="lpv2-process-step-text">
                Mit echten Situationen, nicht Sandboxes. Erkenntnisse entstehen
                am Produkt, nicht am Papier.
              </p>
            </div>

            <div className="lpv2-process-step">
              <p className="lpv2-process-step-num">04</p>
              <h3 className="lpv2-process-step-title">Auf Basis von Erkenntnissen entscheiden</h3>
              <p className="lpv2-process-step-text">
                Weiterbauen, anders ansetzen oder bewusst nicht investieren.
                Die Erkenntnis entscheidet, nicht die Annahme.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── 6. Kai – interaktiv ─────────────────────────────────── */}
      <KaiDialogue
        contextKey="lab"
        eyebrow="Eine Frage konkret machen"
        headline="Welche Frage soll bei euch sichtbar werden?"
        intro="Beschreibt nicht zuerst die gewünschte Lösung. Beschreibt, was für Kunden, Mitarbeitende oder Prozesse besser möglich werden soll. Kai hilft euch, die Frage einzuordnen und einen sinnvollen nächsten Schritt zu erkennen."
        initialMessage="Hallo. Ich bin Kai. Was soll bei euch künftig einfacher, klarer oder besser möglich sein?"
        suggestedPrompts={[
          'Wir stehen vor einer wichtigen Produktentscheidung.',
          'Wir möchten eine Idee früh sichtbar machen.',
          'Wir wissen nicht, wo AI bei uns wirklich helfen kann.',
        ]}
        inputPlaceholder="Was beschäftigt euch?"
        privacyNotice="Bitte keine vertraulichen Projekt-, Kunden- oder Personendaten eingeben. Kai nutzt OpenAI und dient einer ersten Einordnung."
        showContactCta={true}
        contactCtaLabel="Gespräch starten"
        contactCtaLink="/contact"
      />

      {/* ── 7. Abschluss-CTA ────────────────────────────────────── */}
      <section className="lpv2-cta">
        <div className="container container--narrow">
          <p className="section-label">Nächster Schritt</p>
          <h2 className="lpv2-cta-headline">
            Eine offene Frage verdient etwas Besseres als noch eine Präsentation.
          </h2>
          <p className="lpv2-cta-text">
            Wenn ihr eine Idee, einen Prozess oder eine Produktfrage konkret machen wollt,
            schauen wir gemeinsam, welche Form dafür sinnvoll ist: Klarheit, ein Prototyp,
            ein Rapid Build oder ein tragfähiges Produkt.
          </p>
          <div className="lpv2-cta-actions">
            <Link href="/contact" className="btn btn-primary">Gespräch starten →</Link>
            <Link href="/services" className="btn btn-outline">Leistungen ansehen</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
