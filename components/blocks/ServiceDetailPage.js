import Link from 'next/link';
import ServiceChat from './ServiceChat';

const ALL_SERVICES = [
  {
    name: 'Klarheit',
    kicker: 'Discovery',
    meta: '4–8 Tage',
    href: '/services/klarheit',
    desc: 'Das richtige AI-Produkt definieren — bevor ihr investiert.',
  },
  {
    name: 'Rapid Build',
    kicker: 'Prototyping',
    meta: '2 Wochen',
    href: '/services/rapid-build',
    desc: 'Von der Idee zum lauffähigen Prototyp.',
  },
  {
    name: 'AI-Produkt',
    kicker: 'Produktentwicklung',
    meta: 'Individuell',
    href: '/services/produkt',
    desc: 'Euer AI-Produkt — von der Idee bis zum Deployment.',
  },
  {
    name: 'Urteil',
    kicker: 'Einschätzung',
    meta: '1–2 Wochen',
    href: '/services/urteil',
    desc: 'Unabhängige Einschätzung vor einer AI-Investition.',
  },
];

export default function ServiceDetailPage({
  headline,
  intro,
  fitPoints = [],
  storyText,
  outcomePoints = [],
  ctaLabel = 'Gespräch anfragen',
  serviceName = '',
  servicePrompts = [],
  serviceKicker = '',
  processMeta = '',
  serviceIndex = '',
}) {
  const storyParagraphs = storyText
    ? storyText.split('\n\n').map(p => p.trim()).filter(Boolean)
    : [];

  const numDisplay = serviceIndex ? String(serviceIndex).padStart(2, '0') : '';
  const relatedServices = ALL_SERVICES.filter(s => s.name !== serviceName);

  return (
    <div>
      {/* ── Akt 1: Die Welt des Kunden ── */}
      <section className="sdp-hero">
        {numDisplay && (
          <span className="sdp-hero-num" aria-hidden="true">{numDisplay}</span>
        )}
        <div className="container sdp-hero-inner">
          {serviceKicker && <p className="sdp-kicker">{serviceKicker}</p>}
          <h1 className="sdp-headline">{headline}</h1>
          {(intro || processMeta) && (
            <div className="sdp-hero-foot">
              {intro && <p className="sdp-intro">{intro}</p>}
              {processMeta && (
                <div className="sdp-process-meta">
                  <span className="sdp-process-meta-label">Rahmen</span>
                  <span className="sdp-process-meta-value">{processMeta}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Akt 2: Erkenntnis — "Klingt das bekannt?" ── */}
      {fitPoints.length > 0 && (
        <section className="sdp-recognition">
          <div className="container container--narrow">
            <p className="sdp-recognition-lead">Klingt das bekannt?</p>
            <div className="sdp-recognition-list">
              {fitPoints.map((point, i) => (
                <p key={i} className="sdp-recognition-item">{point}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Akt 3: Die Story — Problem, Wendepunkt, Lösung ── */}
      {storyParagraphs.length > 0 && (
        <section className="sdp-story">
          <div className="container">
            <p className="sdp-col-label sdp-col-label--light">Eine Situation</p>
            <p className="sdp-story-lead">{storyParagraphs[0]}</p>
            {storyParagraphs.length > 1 && (
              <div className="sdp-story-rest">
                {storyParagraphs.slice(1).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Akt 4: Was am Ende steht ── */}
      {outcomePoints.length > 0 && (
        <section className="sdp-outcomes-section">
          <div className="container">
            <p className="sdp-col-label">Was am Ende steht</p>
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

      {/* ── Kai Chat ── */}
      <ServiceChat serviceName={serviceName} servicePrompts={servicePrompts} />

      {/* ── Weitere Leistungen ── */}
      {relatedServices.length > 0 && (
        <section className="sdp-related">
          <div className="container">
            <p className="sdp-col-label">Weitere Leistungen</p>
            <div className="sdp-related-grid">
              {relatedServices.map(s => (
                <Link key={s.href} href={s.href} className="sdp-related-card">
                  <span className="sdp-related-kicker">{s.kicker}</span>
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
