// CMS-SERVICES-01: Service-Karten-Grid für /services Übersicht
// SVGs bleiben im Code (currentColor-Theming), Typ wird via visual_type aus Storyblok gesteuert.
import Link from 'next/link';

function VisualKlarheit() {
  return (
    <svg className="sov-card-svg" viewBox="0 0 200 120" aria-hidden="true" fill="none">
      <rect x="10" y="10" width="52" height="32" rx="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.45"/>
      <rect x="75" y="6" width="52" height="32" rx="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.35"/>
      <rect x="140" y="14" width="52" height="32" rx="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.45"/>
      <line x1="36" y1="42" x2="90" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="101" y1="38" x2="100" y2="76" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="166" y1="46" x2="110" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <rect x="60" y="74" width="80" height="36" rx="5" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="72" y1="88" x2="128" y2="88" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
      <line x1="72" y1="98" x2="110" y2="98" stroke="currentColor" strokeWidth="1.2" opacity="0.3"/>
    </svg>
  );
}

function VisualRapidBuild() {
  return (
    <svg className="sov-card-svg" viewBox="0 0 200 120" aria-hidden="true" fill="none">
      <path d="M16 90 Q 30 60 50 72 Q 65 80 80 55 Q 95 35 115 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" opacity="0.4"/>
      <line x1="118" y1="50" x2="132" y2="50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M128 44 L134 50 L128 56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      <rect x="138" y="28" width="52" height="64" rx="5" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
      <rect x="144" y="36" width="40" height="8" rx="2" fill="currentColor" opacity="0.15"/>
      <rect x="144" y="50" width="28" height="6" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="144" y="62" width="34" height="6" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="144" y="74" width="20" height="10" rx="3" fill="currentColor" opacity="0.25"/>
    </svg>
  );
}

function VisualProdukt() {
  return (
    <svg className="sov-card-svg" viewBox="0 0 200 120" aria-hidden="true" fill="none">
      <rect x="24" y="20" width="152" height="20" rx="3" stroke="currentColor" strokeWidth="1.2" opacity="0.25" fill="currentColor" fillOpacity="0.04"/>
      <rect x="18" y="44" width="164" height="20" rx="3" stroke="currentColor" strokeWidth="1.2" opacity="0.35" fill="currentColor" fillOpacity="0.06"/>
      <rect x="12" y="68" width="176" height="20" rx="3" stroke="currentColor" strokeWidth="1.2" opacity="0.5" fill="currentColor" fillOpacity="0.08"/>
      <rect x="6" y="92" width="188" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.7" fill="currentColor" fillOpacity="0.12"/>
      <line x1="100" y1="40" x2="100" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="100" y1="64" x2="100" y2="68" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="100" y1="88" x2="100" y2="92" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    </svg>
  );
}

function VisualUrteil() {
  return (
    <svg className="sov-card-svg" viewBox="0 0 200 120" aria-hidden="true" fill="none">
      <rect x="14" y="20" width="52" height="80" rx="4" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.06" opacity="0.7"/>
      <rect x="74" y="20" width="52" height="80" rx="4" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.04" opacity="0.5"/>
      <rect x="134" y="20" width="52" height="80" rx="4" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.03" opacity="0.4"/>
      <line x1="22" y1="36" x2="58" y2="36" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
      <line x1="82" y1="36" x2="118" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
      <line x1="142" y1="36" x2="178" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    </svg>
  );
}

const VISUALS = {
  klarheit: VisualKlarheit,
  'rapid-build': VisualRapidBuild,
  produkt: VisualProdukt,
  urteil: VisualUrteil,
};

function ServiceCard({ card }) {
  const Visual = VISUALS[card.visual_type] || null;
  return (
    <Link href={card.href} className="sov-card" role="listitem">
      {Visual && (
        <div className="sov-card-visual" aria-hidden="true">
          <Visual />
        </div>
      )}
      <div className="sov-card-body">
        {card.label && <p className="sov-card-label">{card.label}</p>}
        <p className="sov-card-title">{card.title}</p>
        <p className="sov-card-text">{card.text}</p>
        {card.micro && <p className="sov-card-micro">{card.micro}</p>}
        {card.cta_label && <span className="sov-card-cta">{card.cta_label}</span>}
      </div>
    </Link>
  );
}

export default function ServicesCardGrid({ blok }) {
  const cards = blok.cards || [];
  return (
    <section className="sov-moments">
      <div className="container">
        {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
        {blok.headline && <h2 className="sov-moments-headline">{blok.headline}</h2>}
        {blok.intro && <p className="sov-moments-intro">{blok.intro}</p>}
        <div className="sov-grid" role="list">
          {cards.map((card) => (
            <ServiceCard key={card._uid || card.href} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
