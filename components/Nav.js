'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile-Menü: Hintergrund-Scroll sperren, solange das Menü offen ist
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Menü beim Navigieren auf eine neue Seite automatisch schliessen
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (path) => pathname?.startsWith(path);

  // Seiten mit dunklem Hero-Hintergrund → Nav startet mit hellem Text
  // Alle anderen Seiten starten mit dunklem Text auf hellem Hintergrund
  const DARK_HERO_PAGES = ['/services', '/about', '/insights', '/zusammenarbeit', '/team'];
  const onDark = DARK_HERO_PAGES.some((p) => pathname?.startsWith(p));

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}${onDark ? ' on-dark' : ''}${open ? ' menu-open' : ''}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo">kenalu</Link>
        <ul className={`nav-links${open ? ' open' : ''}`}>
          <li><Link href="/services" className={isActive('/services') ? 'active' : ''}>Services</Link></li>
          <li><Link href="/about" className={isActive('/about') ? 'active' : ''}>About</Link></li>
          <li><Link href="/team" className={isActive('/team') ? 'active' : ''}>Team</Link></li>
          <li><Link href="/insights" className={isActive('/insights') ? 'active' : ''}>Insights</Link></li>

          <li>
            <Link href="/contact" className="btn btn-sm btn-primary">Gespräch buchen</Link>
          </li>
        </ul>
        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
