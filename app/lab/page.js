import Link from 'next/link';

export const revalidate = 60;

export const metadata = {
  title: 'Lab – kenalu',
  description: 'Was kenalu gebaut hat. Nicht beschrieben – gezeigt.',
};

const CASE = {
  number: '01',
  date: 'Jun 2026',
  slug: 'kenalu-ch',
  name: 'kenalu.ch',
  tagline: 'Das Studio als erstes Produkt',
  tags: ['Laufend', 'AI Product'],
  situation: 'Ein AI Product Studio, das über sich selbst sagt, es baut intelligente Dinge – aber eine Standardwebsite betreibt. Das passt nicht. kenalu.ch musste selbst ein Proof of Concept sein: gebaut mit den gleichen Methoden, den gleichen Überzeugungen, dem gleichen Anspruch an KI als Kern.',
  decisions: [
    {
      title: 'KI als primärer Touchpoint',
      text: 'Statt eines Kontaktformulars: Kai – ein AI-Assistent, der Unternehmen in Echtzeit hilft zu verstehen, ob und wie kenalu helfen kann. Kein Gimmick. Der erste echte Gesprächspartner, der qualifiziert, einordnet und weiterführt.',
    },
    {
      title: 'Content-Ownership ohne Deployments',
      text: 'Alle Seiteninhalte laufen über Storyblok. Texte, Sektionen, Artikel – editierbar ohne Code-Änderung. Nach dem ersten Deploy gehört der Content dem Team, nicht dem Entwickler.',
    },
    {
      title: 'Inhalte gebaut mit AI',
      text: '14 Insights-Artikel – konzipiert, geschrieben, mit AI-Unterstützung finalisiert. Nicht als Shortcut, sondern als Demonstration: So arbeiten wir. Schnell, eigenständig, mit echtem Inhalt.',
    },
    {
      title: 'ISR statt statischer Build',
      text: 'Storyblok-Änderungen erscheinen innerhalb von 60 Sekunden live – ohne Redeploy. Incremental Static Regeneration kombiniert Performance mit Content-Flexibilität.',
    },
  ],
  stack: ['Next.js', 'Storyblok', 'OpenAI GPT-4o-mini', 'Vercel', 'Satoshi'],
  metrics: [
    { value: '60s', label: 'Content-Update live' },
    { value: '100%', label: 'CMS-gesteuert' },
    { value: 'Kai', label: 'AI-Assistent live' },
    { value: '0', label: 'Agenturen beteiligt' },
  ],
  url: 'https://kenalu.ch',
};

export default function Lab() {
  return (
    <main className="lab-page">

      {/* ── Intro ─────────────────────────────────────────────────── */}
      <section className="lab-intro">
        <div className="container">
          <p className="section-label">Lab</p>
          <h1 className="lab-intro-headline">
            Wir reden nicht<br />über Bauen.<br />Wir bauen.
          </h1>
          <p className="lab-intro-sub">
            Lab ist der Ort, wo kenalu zeigt, was es kann – nicht als Case-Study-Hochglanz, sondern als ehrlicher Blick auf echte Projekte. Was war die Situation? Welche Entscheidungen haben wir getroffen? Was ist entstanden?
          </p>
        </div>
      </section>

      {/* ── Case ──────────────────────────────────────────────────── */}
      <section className="lab-cases">
        <div className="container">
          <div className="lab-case">

            {/* Header */}
            <div className="lab-case-header">
              <span className="lab-case-number">Projekt {CASE.number}</span>
              <div className="lab-case-tags">
                {CASE.tags.map((t) => (
                  <span key={t} className="lab-case-tag">{t}</span>
                ))}
              </div>
              <span className="lab-case-date">{CASE.date}</span>
            </div>

            {/* Title */}
            <div className="lab-case-title-block">
              <h2 className="lab-case-name">{CASE.name}</h2>
              <p className="lab-case-tagline">{CASE.tagline}</p>
            </div>

            {/* Situation */}
            <div className="lab-case-section">
              <span className="lab-case-section-label">Ausgangslage</span>
              <p className="lab-case-text">{CASE.situation}</p>
            </div>

            {/* Decisions */}
            <div className="lab-case-section">
              <span className="lab-case-section-label">Was wir entschieden haben</span>
              <div className="lab-case-decisions">
                {CASE.decisions.map((d, i) => (
                  <div key={i} className="lab-case-decision">
                    <p className="lab-case-decision-title">{d.title}</p>
                    <p className="lab-case-decision-text">{d.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="lab-case-section lab-case-section--metrics">
              {CASE.metrics.map((m, i) => (
                <div key={i} className="lab-case-metric">
                  <span className="lab-case-metric-value">{m.value}</span>
                  <span className="lab-case-metric-label">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Stack + Link */}
            <div className="lab-case-footer">
              <div className="lab-case-stack">
                {CASE.stack.map((s) => (
                  <span key={s} className="lab-stack-chip">{s}</span>
                ))}
              </div>
              <a
                href={CASE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="lab-case-link"
              >
                Live ansehen →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── Next ──────────────────────────────────────────────────── */}
      <section className="lab-next">
        <div className="container">
          <p className="lab-next-eyebrow">Projekt 02</p>
          <p className="lab-next-text">
            Das nächste Projekt entsteht gerade.<br />
            Oder es ist deines.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Gespräch starten →
          </Link>
        </div>
      </section>

    </main>
  );
}
