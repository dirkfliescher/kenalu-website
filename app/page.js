import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Link from 'next/link';
import StoryblokClient from 'storyblok-js-client';
const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function getHomeContent() {
  try {
    console.log('Token:', process.env.STORYBLOK_TOKEN ? 'vorhanden' : 'FEHLT');
    const { data } = await Storyblok.get('cdn/stories/home', {
      version: 'draft',
    });
    console.log('Storyblok OK:', data.story.content.headline);
    return data.story.content;
  } catch (e) {
    console.error('Storyblok Fehler:', e.message);
    return null;
  }
}

export default async function Home() {
  const content = await getHomeContent();

  const headline = content?.headline || 'Digitale Erlebnisse,\ndie wirklich\nfunktionieren.';
  const subline = content?.subline || 'kenalu verbindet Strategie, Nutzerverständnis und Technologie — für digitale Experiences, die Menschen bewegen und Unternehmen voranbringen.';
  const intro = content?.intro || 'Zu viele digitale Produkte sind für Unternehmen gebaut — nicht für Menschen. kenalu hilft, das zu ändern.';
  const ctaText = content?.cta || 'Gespräch buchen';

  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">Intelligent Experiences</p>
          <h1 className="hero-headline">{headline}</h1>
          <p className="hero-sub">{subline}</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">
              {ctaText} <span className="arrow">→</span>
            </Link>
            <Link href="/services" className="btn btn-outline">
              Services ansehen
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <svg className="wave-hero" viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg" fill="none">
            <g stroke="#A7B5A6" strokeWidth="1.2" opacity="0.6">
              <path d="M 20 250 Q 150 120 300 250 Q 450 380 580 250"/>
              <path d="M 20 280 Q 150 150 300 280 Q 450 410 580 280"/>
              <path d="M 20 220 Q 150 90 300 220 Q 450 350 580 220"/>
              <path d="M 20 310 Q 150 180 300 310 Q 450 440 580 310"/>
              <path d="M 20 190 Q 150 60 300 190 Q 450 320 580 190"/>
              <path d="M 20 340 Q 150 210 300 340 Q 450 470 580 340"/>
              <path d="M 20 160 Q 150 30 300 160 Q 450 290 580 160"/>
            </g>
          </svg>
        </div>
      </section>

      {/* Provocation */}
      <section className="provocation">
        <div className="container">
          <div className="provocation-grid">
            <div>
              <p className="lead">{intro}</p>
              <p className="body-text">
                Wir gestalten Experiences, die echte Bedürfnisse adressieren,
                technologische Möglichkeiten sinnvoll nutzen und Unternehmen
                langfristig stärken.
              </p>
            </div>
            <div className="provocation-values">
              {[
                { icon: '◎', label: 'Bewegung' },
                { icon: '∿', label: 'Tiefe' },
                { icon: '◈', label: 'Intelligenz' },
                { icon: '◑', label: 'Wandel' },
              ].map(({ icon, label }) => (
                <div key={label} className="value-item">
                  <span className="value-icon">{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Services</p>
            <h2>Was ich tue.</h2>
            <p className="section-sub">
              Von der strategischen Klärung bis zum fertigen Prototyp —
              kenalu begleitet durch den gesamten Prozess.
            </p>
          </div>
          <div className="services-grid">
            {[
              { num: '01', title: 'Strategie', desc: 'Klare Richtung. Bevor irgendetwas gebaut wird, braucht es Klarheit über Ziel, Nutzer und Kontext.' },
              { num: '02', title: 'Discovery', desc: 'Verstehen, bevor gestaltet wird. Strukturierte Recherche — qualitativ und quantitativ.' },
              { num: '03', title: 'Konzept', desc: 'Von der Idee zur Struktur. Die gedankliche Architektur einer Experience — durchdacht, abgestimmt, erklärbar.' },
              { num: '04', title: 'Prototyping', desc: 'Testen, bevor es teuer wird. Interaktive Prototypen, um echte Erkenntnisse zu gewinnen.' },
              { num: '05', title: 'Umsetzung', desc: 'Die Vision wirklich umsetzen. Begleitung des Teams, damit Qualität bis zum Launch erhalten bleibt.' },
            ].map(({ num, title, desc }) => (
              <Link key={num} href="/services" className="service-card">
                <div className="service-number">{num}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </Link>
            ))}
          </div>
          <div className="services-cta">
            <Link href="/services" className="link-arrow">
              Alle Services ansehen <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why kenalu */}
      <section className="why">
        <div className="container">
          <div className="why-grid">
            <div className="why-text">
              <p className="section-label">Warum kenalu</p>
              <h2>Strategie trifft Erlebnis.</h2>
              <p>Ich verbinde strategisches Denken mit gestalterischer Intelligenz. Das Ergebnis sind Lösungen, die nicht nur funktionieren — sondern die Menschen wirklich bewegen.</p>
              <p>Kein Agentur-Overhead. Kein Pitch-Theater. Direkte, ehrliche Zusammenarbeit mit jemandem, der wirklich mitdenkt.</p>
              <Link href="/about" className="link-arrow">Mehr über kenalu <span>→</span></Link>
            </div>
            <div className="why-features">
              {[
                { title: 'Verbindend', desc: 'Business, Design und Technologie zusammendenken — nicht in Silos.' },
                { title: 'Ehrlich', desc: 'Ich sage, was ich denke. Auch wenn es unbequem ist.' },
                { title: 'Fokussiert', desc: 'Wenige Projekte. Dafür vollständige Aufmerksamkeit für jedes.' },
                { title: 'Erfahren', desc: 'Breiter Hintergrund — von Strategie über UX bis zur Umsetzung.' },
              ].map(({ title, desc }) => (
                <div key={title} className="feature">
                  <div className="feature-title">{title}</div>
                  <div className="feature-desc">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-wave">
          <svg viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg" fill="none">
            <g stroke="#A7B5A6" strokeWidth="1" opacity="0.2">
              <path d="M 0 200 Q 300 80 600 200 Q 900 320 1200 200"/>
              <path d="M 0 230 Q 300 110 600 230 Q 900 350 1200 230"/>
              <path d="M 0 170 Q 300 50 600 170 Q 900 290 1200 170"/>
            </g>
          </svg>
        </div>
        <div className="container">
          <div className="cta-inner">
            <p className="cta-label">Loslegen</p>
            <h2 className="cta-headline">Bereit für eine bessere digitale Experience?</h2>
            <p className="cta-sub">Lass uns in einem ersten Gespräch herausfinden, wo kenalu helfen kann. Kein Pitch — ein echtes Gespräch.</p>
            <Link href="/contact" className="btn btn-light">
              {ctaText} <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
