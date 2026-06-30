import Link from 'next/link';

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

      {/* ── Kai-Hinweis ── */}
      <div className="sdp-kai-hint">
        <div className="container container--narrow">
          <p>
            Noch nicht sicher, ob das passt?{' '}
            <Link href="/#einstiege" className="sdp-kai-link">
              Kai hilft beim Einordnen →
            </Link>
          </p>
        </div>
      </div>

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
