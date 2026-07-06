/**
 * stories/components/Footer.stories.js
 *
 * Footer ist ein async Server Component, der Storyblok fetcht.
 * In Storybook funktioniert der Fetch nicht – deshalb verwenden wir
 * eine FooterPreview-Wrapper-Komponente mit direkten Props.
 *
 * FooterPreview rendert denselben JSX wie Footer, nur ohne den Storyblok-Fetch.
 */

import Link from 'next/link';

// Statischer Footer-Wrapper für Storybook
function FooterPreview({ tagline, email, address, copyright }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="footer-logo">kenalu</span>
            <p>{tagline}</p>
          </div>
          <div className="footer-nav">
            <h4>Navigation</h4>
            <ul>
              <li><Link href="/services">Leistungen</Link></li>
              <li><Link href="/approach">Arbeitsweise</Link></li>
              <li><Link href="/insights">Insights</Link></li>
              <li><Link href="/about">Über kenalu</Link></li>
              <li><Link href="/contact">Kontakt</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Kontakt</h4>
            <p><a href={`mailto:${email}`}>{email}</a></p>
            <p>{address}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{copyright}</p>
          <nav className="footer-legal">
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
          </nav>
          <p className="footer-built">
            Built with{' '}
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js</a>
            {' & '}
            <a href="https://www.storyblok.com" target="_blank" rel="noopener noreferrer">Storyblok</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default {
  title: 'Components / Footer',
  component: FooterPreview,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Footer** ist ein async Server Component. Er fetcht Tagline, E-Mail, Adresse und Copyright aus Storyblok (\`config/footer\`).

Diese Story verwendet **FooterPreview** – eine statische Variante mit denselben Props, damit Storybook keinen Netzwerkzugang braucht.

**Storyblok-Felder:**
- \`footer_tagline\` – Beschreibungstext unter dem Logo
- \`footer_email\` – E-Mail-Adresse (Link + sichtbarer Text)
- \`footer_address\` – Standort
- \`footer_copyright\` – Copyright-Zeile

**Fallbacks** (wenn Storyblok nicht erreichbar):
- Tagline: «Strategie, Experience Design und Engineering…»
- E-Mail: \`dirk@fliescher.ch\`
- Copyright: \`© [Jahr] kenalu. Dirk Fliescher Consulting GmbH\`
        `,
      },
    },
  },
  argTypes: {
    tagline: { control: 'text' },
    email: { control: 'text' },
    address: { control: 'text' },
    copyright: { control: 'text' },
  },
};

// ── Varianten ──────────────────────────────────────────────────────────────────

export const Default = {
  name: 'Standard (Fallback-Werte)',
  args: {
    tagline: 'Strategie, Experience Design und Engineering für digitale Produkte und AI-Lösungen, die tragen.',
    email: 'dirk@fliescher.ch',
    address: 'Zürich, Schweiz',
    copyright: `© ${new Date().getFullYear()} kenalu. Dirk Fliescher Consulting GmbH`,
  },
};

export const KuerzerTagline = {
  name: 'Kürzere Tagline',
  args: {
    ...Default.args,
    tagline: 'AI Products. Gebaut, nicht konfiguriert.',
  },
};
