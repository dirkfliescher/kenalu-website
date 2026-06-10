import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="footer-logo">kenalu</span>
            <p>Intelligent Experiences for a more human digital world.</p>
          </div>
          <div className="footer-nav">
            <h4>Navigation</h4>
            <ul>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/insights">Insights</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Kontakt</h4>
            <p><a href="mailto:dirk@kenalu.ch">dirk@kenalu.ch</a></p>
            <p>Zürich, Schweiz</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 kenalu – dirk fliescher consulting gmbh</p>
        </div>
      </div>
    </footer>
  );
}
