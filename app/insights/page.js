import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Insights – kenalu',
  description: 'Gedanken zu Intelligent Experiences, Strategie und Design.',
};

const articles = [
  { tag: 'Strategie', date: 'Mai 2025', title: 'Warum "User-Centered" nicht reicht.', desc: 'Echte Experiences entstehen erst, wenn man über den einzelnen Nutzer hinausdenkt – und das System versteht, in dem er sich bewegt.' },
  { tag: 'Design', date: 'April 2025', title: 'Prototypen als Entscheidungswerkzeug – nicht als Präsentation.', desc: 'Die meisten Prototypen werden gebaut, um zu überzeugen. Die besten werden gebaut, um zu lernen. Ein fundamentaler Unterschied.' },
  { tag: 'AI', date: 'März 2025', title: 'Was AI-Features in Produkten wirklich schwierig macht.', desc: 'Nicht die Technologie. Nicht die Daten. Das schwierigste an KI in Produkten ist die Experience – und die wird noch zu selten richtig durchgedacht.' },
];

export default function Insights() {
  return (
    <>
      <Nav active="insights" />

      <section className="page-hero">
        <div className="container">
          <p className="section-label">Insights</p>
          <h1>Gedanken, die bewegen.</h1>
          <p>Perspektiven zu Intelligent Experiences, Strategie, Design und dem Digitalen. Keine News – Einschätzungen.</p>
        </div>
      </section>

      <section style={{ background: 'var(--charcoal)', padding: '5rem var(--gutter)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <p className="section-label" style={{ color: 'var(--sage)' }}>Neuester Beitrag</p>
              <h2 style={{ color: 'var(--ivory)', margin: '0.5rem 0 1.5rem' }}>Warum &quot;User-Centered&quot; nicht reicht.</h2>
              <p style={{ color: 'var(--softline)', lineHeight: '1.7', marginBottom: '1rem' }}>User-Centered Design ist heute Standard. Jedes Unternehmen behauptet, es zu machen. Aber echte Experiences entstehen erst, wenn man über den Nutzer hinausdenkt.</p>
              <a href="#" className="btn btn-light" style={{ marginTop: '0.5rem' }}>Beitrag lesen <span className="arrow">→</span></a>
            </div>
            <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" fill="none" style={{ opacity: 0.3 }}>
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

      <section style={{ padding: '5rem var(--gutter) 7rem' }}>
        <div className="container">
          <p className="section-label">Alle Beiträge</p>
          <div className="insights-grid">
            {articles.map(({ tag, date, title, desc }) => (
              <a key={title} href="#" className="insight-card">
                <div className="insight-card-image">
                  <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" fill="none" style={{ width: '80%', opacity: 0.4 }}>
                    <g stroke="#A7B5A6" strokeWidth="1.5">
                      <path d="M 10 60 Q 50 30 100 60 Q 150 90 190 60"/>
                      <path d="M 10 75 Q 50 45 100 75 Q 150 105 190 75"/>
                      <path d="M 10 45 Q 50 15 100 45 Q 150 75 190 45"/>
                    </g>
                  </svg>
                </div>
                <div className="insight-card-body">
                  <div className="insight-meta">
                    <span className="insight-tag">{tag}</span>
                    <span className="insight-date">{date}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <div className="insight-card-footer">
                    <span className="link-arrow">Lesen <span>→</span></span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-inner">
            <p className="cta-label">Austauschen</p>
            <h2 className="cta-headline">Ein Thema bewegt dich?</h2>
            <p className="cta-sub">Ich freue mich über gute Gespräche – auch wenn kein konkretes Projekt dahintersteckt.</p>
            <Link href="/contact" className="btn btn-light">Gespräch buchen <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
