import Link from 'next/link';
import KaiDialogue from './KaiDialogue';

const ALL_SERVICES = [
  {
    name: 'Klarheit',
    label: '01 · Klarheit',
    meta: '4–8 Arbeitstage',
    href: '/services/klarheit',
    desc: 'Finden, worauf es sich wirklich lohnt zu setzen.',
  },
  {
    name: 'Rapid Build',
    label: '02 · Rapid Build',
    meta: 'Rund zwei Wochen',
    href: '/services/rapid-build',
    desc: 'Eine Idee testen, bevor sie zum grossen Projekt wird.',
  },
  {
    name: 'Produkt',
    label: '03 · Produkt',
    meta: 'Individuell',
    href: '/services/produkt',
    desc: 'Aus einer klaren Richtung ein tragfähiges Produkt machen.',
  },
  {
    name: 'Urteil',
    label: '04 · Urteil',
    meta: '1–2 Wochen',
    href: '/services/urteil',
    desc: 'Eine unabhängige Sicht, bevor ihr euch festlegt.',
  },
];

// Kai-Inhalte pro Service
const KAI_CONFIG = {
  Klarheit: {
    contextKey: 'service_klarheit',
    headline: 'Passt Klarheit zu eurer Situation?',
    intro: 'Stellt eine Frage — Kai hilft euch einordnen.',
    initialMessage:
      'Was steht bei euch zur Entscheidung? Ich kann euch sagen, ob und wie eine externe Einschätzung helfen würde.',
    inputPlaceholder: 'Was steht zur Entscheidung?',
    suggestedPrompts: [
      'Wir wissen nicht, welche Richtung wir einschlagen sollen.',
      'Wir brauchen eine ehrliche Ausseneinschätzung.',
      'Wir wollen sicher sein, bevor wir investieren.',
    ],
  },
  'Rapid Build': {
    contextKey: 'service_rapid_build',
    headline: 'Ist Rapid Build der richtige nächste Schritt?',
    intro: 'Erzählt von eurer Idee — Kai hilft beim Einordnen.',
    initialMessage:
      'Erzählt mir von eurer Idee. Was soll der Prototyp zeigen oder beweisen?',
    inputPlaceholder: 'Was wollt ihr testen?',
    suggestedPrompts: [
      'Wir haben eine Idee, wissen aber nicht, wie wir sie testen sollen.',
      'Wir brauchen etwas Vorzeigbares für Investoren.',
      'Wir wollen schnell sehen, ob das funktioniert.',
    ],
  },
  Produkt: {
    contextKey: 'service_produkt',
    headline: 'Ist ein massgeschneidertes AI-Produkt der richtige Weg?',
    intro: 'Beschreibt, was Standardsoftware bei euch nicht löst.',
    initialMessage:
      'Was macht Standardsoftware bei euch zum Problem? Ich helfe euch einordnen, ob ein massgeschneidertes Produkt Sinn ergibt.',
    inputPlaceholder: 'Wo stösst Standardsoftware an Grenzen?',
    suggestedPrompts: [
      'Wir haben Anforderungen, die kein Tool erfüllt.',
      'Wir wollen uns von Vendor-Lock-in lösen.',
      'Wir suchen eine skalierbare Eigenentwicklung.',
    ],
  },
  Urteil: {
    contextKey: 'service_urteil',
    headline: 'Braucht ihr eine externe Einschätzung?',
    intro: 'Beschreibt, worum es geht — Kai hilft beim Einordnen.',
    initialMessage:
      'Um was geht es bei eurem Projekt? Ich helfe euch einordnen, ob und wie eine externe Einschätzung helfen würde.',
    inputPlaceholder: 'Was soll beurteilt werden?',
    suggestedPrompts: [
      'Wir sind unsicher, ob wir auf dem richtigen Weg sind.',
      'Wir wollen ein laufendes Projekt von aussen einschätzen lassen.',
      'Wir brauchen eine zweite Meinung, bevor wir weitermachen.',
    ],
  },
};

export default function ServiceDetailPage({
  headline,
  intro,
  fitPoints = [],
  outcomePoints = [],
  approachText = '',
  ctaLabel = 'Gespräch starten →',
  serviceName = '',
  serviceKicker = '',
  processMeta = '',
  serviceIndex = '',
  kaiBlok = null,   // Optionaler Storyblok-Block (kai_block[0])
}) {
  const numDisplay = serviceIndex ? String(serviceIndex).padStart(2, '0') : '';
  const relatedServices = ALL_SERVICES.filter(s => s.name !== serviceName);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="sdp-hero">
        {numDisplay && (
          <span className="sdp-hero-num" aria-hidden="true">{numDisplay}</span>
        )}
        <div className="container sdp-hero-inner">
          {serviceKicker && <p className="sdp-kicker">{serviceKicker}</p>}
          <h1 className="sdp-headline">{headline}</h1>
          <div className="sdp-hero-foot">
            {intro && <p className="sdp-intro">{intro}</p>}
            {processMeta && (
              <div className="sdp-process-meta">
                <span className="sdp-process-meta-label">Typischer Rahmen</span>
                <span className="sdp-process-meta-value">{processMeta}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Was dabei klarer wird oder entsteht ── */}
      {outcomePoints.length > 0 && (
        <section className="sdp-outcomes-section">
          <div className="container">
            <p className="sdp-col-label">Was dabei klarer wird oder entsteht</p>
            <div className="sdp-outcomes-grid">
              {outcomePoints.map((point, i) => (
                <div key={i} className="sdp-outcome-card">
                  <span className="sdp-outcome-n">{String(i + 1).padStart(2, '0')}</span>
                  <p className="sdp-outcome-t">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Passt für euch, wenn … ── */}
      {fitPoints.length > 0 && (
        <section className="sdp-recognition">
          <div className="container container--narrow">
            <p className="sdp-recognition-lead">Passt für euch, wenn …</p>
            <div className="sdp-recognition-list">
              {fitPoints.map((point, i) => (
                <p key={i} className="sdp-recognition-item">{point}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Wie wir arbeiten ── */}
      {approachText && (
        <section className="sdp-approach">
          <div className="container container--narrow">
            <p className="sdp-col-label">Wie wir arbeiten</p>
            <p className="sdp-approach-text">{approachText}</p>
          </div>
        </section>
      )}

      {/* ── Kai-Dialog ── */}
      {(() => {
        const kai = KAI_CONFIG[serviceName] || KAI_CONFIG['Klarheit'];
        return (
          <KaiDialogue
            blok={kaiBlok || {}}
            contextKey={kai.contextKey}
            eyebrow="Kai"
            headline={kai.headline}
            intro={kai.intro}
            initialMessage={kai.initialMessage}
            inputPlaceholder={kai.inputPlaceholder}
            suggestedPrompts={kai.suggestedPrompts}
          />
        );
      })()}

      {/* ── Weitere Leistungen ── */}
      {relatedServices.length > 0 && (
        <section className="sdp-related">
          <div className="container">
            <p className="sdp-col-label">Weitere Leistungen</p>
            <div className="sdp-related-grid">
              {relatedServices.map(s => (
                <Link key={s.href} href={s.href} className="sdp-related-card">
                  <span className="sdp-related-kicker">{s.label}</span>
                  <p className="sdp-related-name">{s.name}</p>
                  <p className="sdp-related-desc">{s.desc}</p>
                  <span className="sdp-related-meta">{s.meta} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="sdp-cta">
        <div className="container container--narrow">
          <Link href="/contact" className="btn btn-primary">
            {ctaLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
