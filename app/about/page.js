import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'About – kenalu',
  description: 'Dirk Fliescher – Gründer von kenalu.',
};

const beliefs = [
  { quote: '"Gute Experiences entstehen durch Klarheit, nicht durch Komplexität."', desc: 'Die besten Lösungen sind oft die einfachsten — aber einfach ist schwer.' },
  { quote: '"Qualität hat Priorität. Immer."', desc: 'Ich nehme wenige Projekte an, damit jedes die Aufmerksamkeit bekommt, die es verdient.' },
  { quote: '"Strategie und Design sind dasselbe."', desc: 'Echte Lösungen entstehen, wenn strategisches Denken und gestalterische Intelligenz zusammenwirken.' },
  { quote: '"Menschen zuerst. Technologie danach."', desc: 'Technologie ist ein Mittel, kein Ziel.' },
  { quote: '"Ehrlichkeit ist der wichtigste Service."', desc: 'Ich sage, was ich denke — auch wenn es unbequem ist.' },
  { quote: '"Partner, nicht Lieferant."', desc: 'Mich interessiert, ob das Projekt wirklich erfolgreich ist.' },
];

export default function About() {
  return (
    <>
      <Nav active="about" />

      <section style={{ padding: '7rem var(--gutter)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '6rem', alignItems: 'start' }}>
            <div>
              <div style={{ width: '100%', aspectRatio: '3/4', background: 'var(--mineral)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" fill="none" style={{ width: '60%' }}>
                  <circle cx="60" cy="55" r="30" fill="#D8D4CE"/>
                  <path d="M 10 150 Q 60 100 110 150" fill="#D8D4CE"/>
                </svg>
              </div>
              <p style={{ marginTop: '1.25rem', fontSize: '0.875rem', color: 'var(--stone)' }}>
                Dirk Fliescher<br />Gründer, kenalu
              </p>
            </div>
            <div>
              <p className="section-label">About</p>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2rem' }}>Strategie trifft<br />Erlebnis.</h1>
              <p style={{ color: 'var(--stone)', lineHeight: '1.75', marginBottom: '1.25rem', fontSize: '1.05rem' }}>
                Ich bin Dirk Fliescher. Als Berater begleite ich Unternehmen dabei, digitale Experiences zu gestalten, die wirklich funktionieren — nicht nur technisch, sondern menschlich.
              </p>
              <p style={{ color: 'var(--stone)', lineHeight: '1.75', marginBottom: '1.25rem', fontSize: '1.05rem' }}>
                Mein Hintergrund ist breit: <strong style={{ color: 'var(--charcoal)', fontWeight: 600 }}>Strategie, UX, Produktentwicklung und Business.</strong> Was mich unterscheidet, ist die Fähigkeit, diese Perspektiven zu verbinden.
              </p>
              <p style={{ color: 'var(--stone)', lineHeight: '1.75', marginBottom: '1.25rem', fontSize: '1.05rem' }}>
                Ich denke gerne ausserhalb der üblichen Muster. Ich mag klare Thesen, starke Ideen und mutige Perspektiven.
              </p>
              <div style={{ width: '40px', height: '2px', background: 'var(--sage)', margin: '2.5rem 0' }} />
              <p style={{ color: 'var(--stone)', lineHeight: '1.75', marginBottom: '1.25rem', fontSize: '1.05rem' }}>
                kenalu ist der fokussiertere, eigenständigere nächste Schritt — mit klarer Positionierung auf das, was ich wirklich gut kann.
              </p>
              <Link href="/contact" className="link-arrow" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
                Gespräch buchen <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--mineral)', padding: '7rem var(--gutter)' }}>
        <div className="container">
          <p className="section-label">Was ich glaube</p>
          <h2 style={{ margin: '0.5rem 0 3rem' }}>Meine Haltung.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3rem' }}>
            {beliefs.map(({ quote, desc }) => (
              <div key={quote} style={{ padding: '2rem 0', borderTop: '2px solid var(--charcoal)' }}>
                <p style={{ fontFamily: 'var(--font-headline)', fontSize: '1.15rem', fontWeight: 600, lineHeight: '1.4', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>{quote}</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--stone)', lineHeight: '1.6' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '7rem var(--gutter)', background: 'var(--charcoal)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <p className="section-label" style={{ color: 'var(--sage)' }}>Der Name</p>
              <h2 style={{ color: 'var(--ivory)', margin: '0.5rem 0 2rem' }}>Warum kenalu.</h2>
              <p style={{ color: 'var(--softline)', lineHeight: '1.75', marginBottom: '1.25rem', fontSize: '1.05rem' }}>
                kenalu ist vom Hawaiianischen inspiriert — das Wort steht für die Welle. Kraftvoll, gerichtet, bedeutungsvoll.
              </p>
              <p style={{ color: 'var(--softline)', lineHeight: '1.75', marginBottom: '1.25rem', fontSize: '1.05rem' }}>
                Für mich steht kenalu für fünf Dinge: <strong style={{ color: 'var(--ivory)' }}>Bewegung, Wandel, Intelligenz, Tiefe und starke Erlebnisse.</strong>
              </p>
            </div>
            <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" fill="none" style={{ opacity: 0.5 }}>
              <g stroke="#A7B5A6" strokeWidth="1.2">
                <path d="M 20 150 Q 100 80 200 150 Q 300 220 380 150"/>
                <path d="M 20 170 Q 100 100 200 170 Q 300 240 380 170"/>
                <path d="M 20 130 Q 100 60 200 130 Q 300 200 380 130"/>
                <path d="M 20 190 Q 100 120 200 190 Q 300 260 380 190"/>
                <path d="M 20 110 Q 100 40 200 110 Q 300 180 380 110"/>
              </g>
            </svg>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-inner">
            <p className="cta-label">Zusammenarbeiten</p>
            <h2 className="cta-headline">Du willst mit jemandem arbeiten, der wirklich mitdenkt?</h2>
            <p className="cta-sub">Dann lass uns reden. Ein kurzes Erstgespräch zeigt schnell, ob und wie kenalu helfen kann.</p>
            <Link href="/contact" className="btn btn-light">Gespräch buchen <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
