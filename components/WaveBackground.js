'use client';

import { useEffect, useRef } from 'react';

/**
 * WaveBackground
 * Dekorative Wellenform mit dezentem Scroll-Parallax (kenalu = die Welle).
 * variant "light" für helle Sections (Hero), "dark" für dunkle Sections (CTA).
 * Bewegung respektiert prefers-reduced-motion.
 */
export default function WaveBackground({ variant = 'light', lines = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let frame = null;

    const update = () => {
      frame = null;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // Fortschritt: -0.5 (Section unten am Bildschirmrand) ... +0.5 (oben raus)
      const progress = (viewport - rect.top) / (viewport + rect.height) - 0.5;
      const offset = progress * 36; // max. ~18px in jede Richtung
      el.style.transform = `translateY(${offset.toFixed(1)}px)`;
    };

    const onScroll = () => {
      if (frame === null) {
        frame = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const isDark = variant === 'dark';
  const fillA = isDark ? 'rgba(255,255,255,0.05)' : 'var(--sage)';
  const fillB = isDark ? 'rgba(255,255,255,0.035)' : 'var(--terracotta)';

  if (lines) {
    const strokeA = isDark ? 'rgba(255,255,255,0.18)' : 'var(--sage)';
    const strokeB = isDark ? 'rgba(255,255,255,0.1)' : 'var(--terracotta)';
    const strokeC = isDark ? 'rgba(255,255,255,0.07)' : 'var(--softline)';

    return (
      <svg
        ref={ref}
        className="wave-bg"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ opacity: isDark ? 1 : 0.5 }}
      >
        <path
          d="M0,140 C160,80 340,210 520,140 C700,80 880,200 1060,130 C1140,100 1190,110 1200,118"
          fill="none"
          stroke={strokeA}
          strokeWidth="1.5"
        />
        <path
          d="M0,220 C200,160 380,290 600,220 C820,150 1000,270 1200,210"
          fill="none"
          stroke={strokeB}
          strokeWidth="1.5"
        />
        <path
          d="M0,300 C220,250 420,360 660,300 C880,245 1040,340 1200,290"
          fill="none"
          stroke={strokeC}
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg
      ref={ref}
      className="wave-bg"
      viewBox="0 0 1200 500"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ opacity: isDark ? 1 : 0.16 }}
    >
      <path
        d="M0,260 C160,180 340,340 520,260 C700,180 880,320 1060,240 C1140,205 1190,220 1200,230 L1200,500 L0,500 Z"
        fill={fillA}
      />
      <path
        d="M0,320 C200,260 380,400 600,330 C820,260 1000,380 1200,320 L1200,500 L0,500 Z"
        fill={fillB}
        opacity={isDark ? '1' : '0.7'}
      />
    </svg>
  );
}
