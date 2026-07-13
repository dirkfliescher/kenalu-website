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
            Im Lab entstehen eigene Produkte, Experimente und — wo Kontext und Zustimmung es
            erlauben — Prototypen aus konkreter Arbeit. Alles hier zeigt, wie kenalu aus einer
            offenen Frage eine tragfähige Richtung macht.
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

      {/* ── 3. Was das Lab zeigt ────────────────────────────────── */}
      <section className="lpv2-what">
        <div className="container">
          <p className="section-label">Was das Lab zeigt</p>
          <h2 className="lpv2-what-headline">
            Intelligente Erlebnisse entstehen nicht aus Briefings. Sie entstehen aus
            echten Experimenten.
          </h2>
          <div className="lpv2-what-cards">

            <div className="lpv2-what-card">
              <p className="lpv2-what-card-num">01</p>
              <h3 className="lpv2-what-card-title">KI nicht als Tool, sondern als Partner</h3>
              <p className="lpv2-what-card-text">
                Im Lab zeigen wir, was entsteht, wenn KI nicht zur Ausführung gerufen
                wird, sondern von Anfang an mitdenkt — in Strategie, Konzept, Code
                und Copy.
              </p>
            </div>

            <div className="lpv2-what-card">
              <p className="lpv2-what-card-num">02</p>
              <h3 className="lpv2-what-card-title">Vom Experiment zum Produkt</h3>
              <p className="lpv2-what-card-text">
                Hier wird nicht demonstriert, was KI theoretisch kann. Es wird gebaut:
                konkret, nutzbar, mit echten Qualitätsansprüchen.
              </p>
            </div>

            <div className="lpv2-what-card">
              <p className="lpv2-what-card-num">03</p>
              <h3 className="lpv2-what-card-title">Menschliches Urteil als Massstab</h3>
              <p className="lpv2-what-card-text">
                KI produziert Breite, Geschwindigkeit und Varianten. Was davon bleibt,
                entscheidet ein Mensch. Haltung, Ton und Richtung werden nie delegiert.
              </p>
            </div>

            <div className="lpv2-what-card">
              <p className="lpv2-what-card-num">04</p>
              <h3 className="lpv2-what-card-title">Sichtbar sein — auch für KI</h3>
              <p className="lpv2-what-card-text">
                Was entsteht, wird nicht nur für Menschen gemacht. GEO — wie Produkte
                in KI-gestützten Antworten auftauchen — ist Teil der Arbeit vom ersten
                Tag an.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. Vom Gedanken zur Grundlage (Prozesslogik) ────────── */}
      <section className="lpv2-process">
        <div className="container">
          <p className="section-label">Vom Gedanken zur Grundlage</p>
          <h2 className="lpv2-process-headline">
            Ein Prototyp muss nicht gross sein. Er muss eine wichtige Frage beantworten.
          </h2>
          <p className="lpv2-process-intro">
            Nicht jede Idee braucht sofort ein grosses Projekt. Manchmal braucht es zuerst
            etwas Sichtbares, damit Teams eine offene Frage besser verstehen, intern diskutieren
            oder mit ersten Nutzern prüfen können.
          </p>
          <div className="lpv2-process-steps">

            <div className="lpv2-process-step">
              <p className="lpv2-process-step-num">01</p>
              <h3 className="lpv2-process-step-title">Die eigentliche Frage finden</h3>
              <p className="lpv2-process-step-text">
                Was soll für Kunden, Mitarbeitende oder Prozesse besser werden?
                Welche Entscheidung ist noch offen?
              </p>
            </div>

            <div className="lpv2-process-step">
              <p className="lpv2-process-step-num">02</p>
              <h3 className="lpv2-process-step-title">Etwas Greifbares bauen</h3>
              <p className="lpv2-process-step-text">
                Eine Idee wird in einen Prototypen, ein MVP oder eine konkrete Produktlogik
                übersetzt.
              </p>
            </div>

            <div className="lpv2-process-step">
              <p className="lpv2-process-step-num">03</p>
              <h3 className="lpv2-process-step-title">Sichtbar prüfen</h3>
              <p className="lpv2-process-step-text">
                Teams, Stakeholder oder erste Nutzer können sehen, verstehen und Rückmeldung
                geben.
              </p>
            </div>

            <div className="lpv2-process-step">
              <p className="lpv2-process-step-num">04</p>
              <h3 className="lpv2-process-step-title">Bewusst entscheiden</h3>
              <p className="lpv2-process-step-text">
                Danach ist klarer, ob ihr weiterbaut, anders weiterdenkt oder bewusst nicht
                investiert.
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
