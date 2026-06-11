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
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => pathname?.startsWith(path);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo">kenalu</Link>
        <ul className={`nav-links${open ? ' open' : ''}`}>
          <li><Link href="/services" style={isActive('/services') ? { color: 'var(--charcoal)' } : {}}>Services</Link></li>
          <li><Link href="/about" style={isActive('/about') ? { color: 'var(--charcoal)' } : {}}>About</Link></li>
          <li><Link href="/insights" style={isActive('/insights') ? { color: 'var(--charcoal)' } : {}}>Insights</Link></li>
          <li>
            <Link href="/contact" className="btn btn-sm btn-primary">Gespräch buchen</Link>
          </li>
        </ul>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}