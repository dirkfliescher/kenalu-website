import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Services – kenalu',
  description: 'Strategie, Discovery, Konzept, Prototyping und Umsetzungsbegleitung.',
};

const services = [
  { num: '01', id: 'strategie', tag: 'Strategie', title: 'Klare Richtung.', desc1: 'Bevor irgendetwas gebaut wird, braucht es Klarheit. Über das Ziel, die Nutzer, den Kontext und die Möglichkeiten.', desc2: 'Strategie bei kenalu bedeutet nicht: Folien-Stapel mit generischen Empfehlungen. Es bedeutet: konkrete Orientierung.', items: ['Klares Bild von Ziel, Scope und Erfolgskriterien', 'Strategische Optionen mit Abwägungen', 'Priorisierungsrahmen für nächste Schritte', 'Stakeholder-Alignment-Grundlage'] },
  { num: '02', id: 'discovery', tag: 'Discovery', title: 'Verstehen, bevor gestaltet wird.', desc1: 'Die teuersten Fehler passieren, wenn man baut, ohne wirklich zu verstehen. Discovery schafft die Grundlage.', desc2: 'Ich führe strukturierte Recherche durch — qualitativ und quantitativ — und übersetze die Erkenntnisse in Entscheidungsgrundlagen.', items: ['User Research (Interviews, Beobachtungen)', 'Nutzerprofile und Journey Maps', 'Kontextanalyse und Markteinordnung', 'Insights-Report mit Handlungsempfehlungen'] },
  { num: '03', id: 'konzept', tag: 'Konzept', title: 'Von der Idee zur Struktur.', desc1: 'Ein gutes Konzept ist mehr als eine Skizze. Es ist die gedankliche Architektur einer Experience — durchdacht, abgestimmt, erklärbar.', desc2: 'Ich entwickle Konzepte, die Orientierung geben und gleichzeitig Raum für gute Umsetzungsentscheidungen lassen.', items: ['Experience-Konzept und -Logik', 'Informationsarchitektur und Navigation', 'Wireframes und erste Flows', 'Designprinzipien für das Projekt'] },
  { num: '04', id: 'prototyping', tag: 'Prototyping', title: 'Testen, bevor es teuer wird.', desc1: 'Der wertvollste Moment in einem Projekt ist der, wenn man sieht, ob eine Idee wirklich funktioniert — bevor man viel Geld investiert hat.', desc2: 'Je nach Fragestellung baue ich Low-Fidelity-Skizzen oder hochwertige, interaktive Prototypen.', items: ['Interaktiver Prototyp (Figma oder Code)', 'Usability-Tests und Auswertung', 'Iterations-Dokumentation', 'Klare Umsetzungsempfehlung'] },
  { num: '05', id: 'umsetzung', tag: 'Umsetzungsbegleitung', title: 'Die Vision wirklich umsetzen.', desc1: 'Zwischen dem fertigen Konzept und einem live gegangenen Produkt liegen viele Entscheidungen.', desc2: 'Für die technische Umsetzung arbeite ich mit ausgewählten, starken Partnern zusammen.', items: ['Design-QA und Abnahme', 'Begleitung des Entwicklungsteams', 'Stakeholder-Kommunikation', 'Launch-Readiness-Assessment'] },
];

export default function Services() {
  return (
    <>
      <Nav active="services" />

      <section className="page-hero">
        <div className="container">
          <p className="section-label">Services</p>
          <h1>Was ich tue – und wie.</h1>
          <p>Ich begleite Unternehmen durch den gesamten Prozess: von der strategischen Klärung bis zum fertigen Prototyp.</p>
        </div>
      </section>

      <section style={{ padding: '7rem var(--gutter)' }}>
        <div className="container">
          {services.map(({ num, id, tag, title, desc1, desc2, items }) => (
            <div key={id} id={id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: '3rem', padding: '4rem 0', borderTop: '1px solid var(--mineral)' }}>
              <div style={{ fontFamily: 'var(--font-headline)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--sage)', paddingTop: '0.4rem' }}>{num}</div>
              <div>
                <span style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--mineral)', color: 'var(--stone)', padding: '0.3rem 0.8rem', borderRadius: '20px', marginBottom: '1.5rem' }}>{tag}</span>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{title}</h2>
                <p style={{ color: 'var(--stone)', lineHeight: '1.7', marginBottom: '1rem' }}>{desc1}</p>
                <p style={{ color: 'var(--stone)', lineHeight: '1.7' }}>{desc2}</p>
              </div>
              <div>
                <h4 style={{ marginBottom: '1.25rem' }}>Was dabei entsteht</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {items.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--stone)' }}>
                      <span style={{ color: 'var(--sage)', fontWeight: 700, flexShrink: 0 }}>–</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-inner">
            <p className="cta-label">Loslegen</p>
            <h2 className="cta-headline">Welche Challenge willst du anpacken?</h2>
            <p className="cta-sub">Lass uns in einem ersten Gespräch herausfinden, wo kenalu ansetzen kann.</p>
            <Link href="/contact" className="btn btn-light">Gespräch buchen <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
