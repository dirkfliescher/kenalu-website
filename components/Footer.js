import Link from 'next/link';
import StoryblokClient from 'storyblok-js-client';

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function getFooterContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/config/footer', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data.story.content;
  } catch (e) {
    return null;
  }
}

export default async function Footer() {
  const f = await getFooterContent();

  const tagline   = f?.footer_tagline   || 'Strategie, Experience und Engineering für digitale Produkte, die tragen.';
  const email     = f?.footer_email     || 'dirk@fliescher.ch';
  const address   = f?.footer_address   || 'Zürich, Schweiz';
  const copyright = f?.footer_copyright || `© ${new Date().getFullYear()} kenalu – dirk fliescher consulting gmbh`;

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
              <li><Link href="/about">Arbeitsweise</Link></li>
              <li><Link href="/team">Team</Link></li>
              <li><Link href="/insights">Insights</Link></li>
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
