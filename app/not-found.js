import Link from 'next/link';

export const metadata = {
  title: 'Seite nicht gefunden – kenalu',
};

export default function NotFound() {
  return (
    <main className="error-page">
      <div className="container">
        <p className="section-label">404</p>
        <h1 className="error-headline">Diese Seite existiert nicht.</h1>
        <p className="error-sub">
          Möglicherweise wurde der Link geändert oder die Seite wurde verschoben.
        </p>
        <div className="error-actions">
          <Link href="/" className="btn btn-primary">Zur Startseite →</Link>
          <Link href="/contact" className="error-link">Oder direkt Kontakt aufnehmen</Link>
        </div>
      </div>
    </main>
  );
}
