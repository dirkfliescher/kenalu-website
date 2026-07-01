import Link from 'next/link';
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

export default function LabPage() {
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
            Im Lab machen wir sichtbar, wie kenalu arbeitet: strategische Fragen konkretisieren,
            Experience Design und Engineering zusammenbringen und neue Ansätze früh erlebbar
            machen. Hier entstehen eigene Produkte, Experimente und – wo Kontext und Zustimmung
            es erlauben – Prototypen aus konkreter Arbeit.
          </p>
          <p className="lpv2-hero-subtext">
            Nicht alles, was entsteht, wird veröffentlicht. Aber alles hier zeigt etwas davon,
            wie aus einer Idee eine tragfähige Richtung werden kann.
          </p>
        </div>
      </section>

      {/* ── 2. kenalu.ch als Live Prototype ─────────────────────── */}
      <section className="lpv2-featured">
        <div className="container">
          <div className="lfw-inner lfw-inner--single">
            <div className="lfw-content">
              <p className="lfw-status-badge">Live Prototype · wird weiterentwickelt</p>
              <h2 className="lfw-title">
                kenalu.ch – ein Prototyp unseres Vorgehens
              </h2>
              <p className="lfw-teaser">
                kenalu.ch ist kein Kunden-Case. Es ist eine eigene Arbeitsprobe: ein sichtbares
                Beispiel dafür, wie Positionierung, Content, Experience Design, AI und Engineering
                in einem fokussierten Produkt zusammenfinden.
              </p>
              <p className="lfw-teaser lfw-teaser--space">
                Die Website wird in den kommenden Wochen weiterentwickelt, getestet und mit neuen
                Funktionen, Prototypen und Erkenntnissen ergänzt. Sie zeigt nicht nur ein fertiges
                Ergebnis, sondern auch, wie kenalu an Produkte herangeht: früh konkret, klar im
                Zweck und offen für Weiterentwicklung.
              </p>
              <Link href="/lab/kenalu-website" className="btn btn-primary lfw-cta">
                Arbeitsprobe ansehen →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Was dieses Produkt sichtbar macht ────────────────── */}
      <section className="lpv2-what">
        <div className="container">
          <p className="section-label">Was dieses Produkt sichtbar macht</p>
          <h2 className="lpv2-what-headline">
            Nicht nur eine Website. Eine Arbeitsprobe für bessere Produktentscheidungen.
          </h2>
          <div className="lpv2-what-cards">

            <div className="lpv2-what-card">
              <p className="lpv2-what-card-num">01</p>
              <h3 className="lpv2-what-card-title">Entscheidungen werden früher sichtbar</h3>
              <p className="lpv2-what-card-text">
                Statt eine Idee nur zu beschreiben, wird sie in eine Form gebracht, die Teams
                anschauen, diskutieren und beurteilen können.
              </p>
            </div>

            <div className="lpv2-what-card">
              <p className="lpv2-what-card-num">02</p>
              <h3 className="lpv2-what-card-title">Content bleibt beweglich</h3>
              <p className="lpv2-what-card-text">
                Inhalte können sich mit dem Produkt weiterentwickeln, ohne dass jede kleine
                Änderung zu einem technischen Projekt wird.
              </p>
            </div>

            <div className="lpv2-what-card">
              <p className="lpv2-what-card-num">03</p>
              <h3 className="lpv2-what-card-title">AI bekommt eine klare Aufgabe</h3>
              <p className="lpv2-what-card-text">
                Kai ist kein Chatbot als Dekoration. Er hilft Interessierten, ihre Situation
                einzuordnen und einen passenden nächsten Schritt zu erkennen.
              </p>
            </div>

            <div className="lpv2-what-card">
              <p className="lpv2-what-card-num">04</p>
              <h3 className="lpv2-what-card-title">Bestehendes und Eigenes greifen zusammen</h3>
              <p className="lpv2-what-card-text">
                Bewährte Plattformen bilden das Fundament. Eigenständig entwickelt wird dort,
                wo Nutzererlebnis, Differenzierung oder Wirkung es verlangen.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. Wie es aufgebaut ist (Tech Stack – nachrangig) ───── */}
      <section className="lpv2-stack">
        <div className="container container--narrow">
          <p className="section-label">Wie es aufgebaut ist</p>
          <p className="lpv2-stack-intro">
            Der Stack unterstützt eine schnelle, flexible und weiterentwickelbare
            Produktentwicklung.
          </p>
          <div className="lpv2-stack-items">
            <div className="lpv2-stack-item">
              <p className="lpv2-stack-tech">Next.js</p>
              <p className="lpv2-stack-desc">
                Für eine schnelle, moderne und flexibel erweiterbare Produktoberfläche.
              </p>
            </div>
            <div className="lpv2-stack-item">
              <p className="lpv2-stack-tech">Storyblok</p>
              <p className="lpv2-stack-desc">
                Damit Inhalte ohne Code gepflegt und weiterentwickelt werden können.
              </p>
            </div>
            <div className="lpv2-stack-item">
              <p className="lpv2-stack-tech">OpenAI</p>
              <p className="lpv2-stack-desc">
                Für AI-gestützte Interaktionen dort, wo sie wirklich sinnvoll sind.
              </p>
            </div>
            <div className="lpv2-stack-item">
              <p className="lpv2-stack-tech">Vercel</p>
              <p className="lpv2-stack-desc">
                Für eine schlanke, zuverlässige Auslieferung und schnelle Weiterentwicklung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Vom Gedanken zur Grundlage (Prozesslogik) ────────── */}
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

      {/* ── 6. Kai – einmal, interaktiv ─────────────────────────── */}
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
