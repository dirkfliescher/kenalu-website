import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Gespräch buchen – kenalu',
  description: 'Buch ein Erstgespräch mit Dirk Fliescher von kenalu.',
};

export default function Contact() {
  return (
    <>
      <Nav active="contact" />

      <section className="page-hero">
        <div className="container">
          <p className="section-label">Kontakt</p>
          <h1>Lass uns reden.</h1>
          <p>Ein gutes Erstgespräch dauert 30 Minuten. Kein Pitch, kein Druck.</p>
        </div>
      </section>

      <section style={{ padding: '7rem var(--gutter)', minHeight: '50vh' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
            <div>
              <p style={{ color: 'var(--stone)', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '1.25rem' }}>
                Ich höre zu, stelle Fragen — und sage dir ehrlich, ob und wie kenalu helfen kann.
              </p>
              <p style={{ color: 'var(--stone)', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '3rem' }}>
                Du kannst direkt einen Termin buchen oder mir zuerst kurz schreiben.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '36px', height: '36px', background: 'var(--mineral)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✉</div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: '0.2rem' }}>E-Mail</strong>
                    <a href="mailto:dirk@kenalu.ch" style={{ color: 'var(--charcoal)' }}>dirk@kenalu.ch</a>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '36px', height: '36px', background: 'var(--mineral)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>◎</div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: '0.2rem' }}>Standort</strong>
                    <span>Zürich, Schweiz</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '36px', height: '36px', background: 'var(--mineral)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>in</div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: '0.2rem' }}>LinkedIn</strong>
                    <a href="https://www.linkedin.com/in/dirkfliescher" target="_blank" rel="noopener noreferrer">Dirk Fliescher</a>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--mineral)', borderRadius: 'var(--radius)', padding: '2.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Erstgespräch buchen</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--stone)', marginBottom: '2rem' }}>
                Wähle einen Termin für dein 30-minütiges Erstgespräch.
              </p>
              <div style={{ background: 'var(--charcoal)', borderRadius: 'var(--radius)', padding: '3rem 2rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--softline)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Wähle einen Termin für dein 30-minütiges Erstgespräch.
                </p>
                <a href="https://calendly.com/dirk-kenalu" target="_blank" rel="noopener noreferrer" className="btn btn-light">
                  Termin wählen <span className="arrow">→</span>
                </a>
                <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--stone)' }}>Öffnet Calendly in einem neuen Tab</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
