'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);

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

  // Focus Trap + Escape-Key wenn Mobile-Menü offen
  useEffect(() => {
    if (!open) return;
    const nav = navRef.current;
    if (!nav) return;

    const focusable = nav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    first?.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const isActive = (path) => pathname?.startsWith(path);

  // Seiten mit dunklem Hero-Hintergrund → Nav startet mit hellem Text
  const DARK_HERO_PAGES = ['/services', '/approach', '/insights', '/about', '/lab', '/contact', '/dirk', '/profile'];
  const onDark = DARK_HERO_PAGES.some((p) => pathname?.startsWith(p));

  // Hauptnavigation
  const NAV_LINKS = [
    { href: '/services',  label: 'Leistungen'    },
    { href: '/approach',  label: 'Arbeitsweise'  },
    { href: '/lab',       label: 'Lab'           },
    { href: '/insights',  label: 'Insights'      },
    { href: '/about',     label: 'Über kenalu'   },
  ];

  return (
    <nav ref={navRef} className={`nav${scrolled ? ' scrolled' : ''}${onDark ? ' on-dark' : ''}${open ? ' menu-open' : ''}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo">kenalu</Link>
        <ul className={`nav-links${open ? ' open' : ''}`}>
          {NAV_LINKS.map(({ href, label, mobileOnly }) => (
            <li key={href} className={mobileOnly ? 'nav-mobile-only' : ''}>
              <Link href={href} className={isActive(href) ? 'active' : ''}>{label}</Link>
            </li>
          ))}
          {pathname !== '/contact' && (
            <li>
              <Link href="/contact" className="btn btn-sm btn-primary">Gespräch starten</Link>
            </li>
          )}
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
