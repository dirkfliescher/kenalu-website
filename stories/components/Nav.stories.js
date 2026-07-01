/**
 * stories/components/Nav.stories.js
 *
 * Nav ist ein Client Component. usePathname() wird von @storybook/nextjs
 * automatisch gemockt. Der aktive Link wird via parameters.nextjs.navigation.pathname
 * pro Story gesetzt.
 *
 * Scroll- und Mobile-Zustände sind interaktiv – einfach im Canvas scrollen
 * oder die Viewport-Breite reduzieren.
 */

import Nav from '../../components/Nav';

export default {
  title: 'Components / Nav',
  component: Nav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Nav** ist die Hauptnavigation von kenalu.

- Client Component mit Scroll-State und Mobile-Toggle
- Erkennt automatisch, ob sie auf einem dunklen Hero steht (heller Text)
- Dark-Hero-Seiten: \`/services\`, \`/about\`, \`/insights\`, \`/team\`
- CTA «Gespräch starten» wird auf \`/contact\` ausgeblendet
- Voller Accessibility-Support: Focus Trap, Escape-Key, \`aria-expanded\`

**Props:** Keine – alle States aus \`usePathname()\` und \`window.scrollY\`.
        `,
      },
    },
  },
};

// ── Varianten ──────────────────────────────────────────────────────────────────

export const Homepage = {
  name: 'Homepage (heller Hintergrund)',
  parameters: {
    nextjs: {
      navigation: { pathname: '/' },
    },
    backgrounds: { default: 'ivory' },
  },
};

export const AufDunkelHero = {
  name: 'Auf dunklem Hero (Leistungen)',
  parameters: {
    nextjs: {
      navigation: { pathname: '/services' },
    },
    backgrounds: { default: 'ocean' },
    docs: {
      description: {
        story: 'Auf Seiten mit dunklem Hero-Hintergrund startet die Nav mit hellen Texten. Beim Scrollen wechselt sie auf dunklen Hintergrund.',
      },
    },
  },
};

export const LeistungenAktiv = {
  name: 'Leistungen – aktiver Link',
  parameters: {
    nextjs: {
      navigation: { pathname: '/services/klarheit' },
    },
    backgrounds: { default: 'ivory' },
    docs: {
      description: {
        story: '«Leistungen» ist aktiv, weil pathname mit /services beginnt (startsWith-Logik, nicht exakter Vergleich).',
      },
    },
  },
};

export const InsightsAktiv = {
  name: 'Insights – aktiver Link',
  parameters: {
    nextjs: {
      navigation: { pathname: '/insights' },
    },
    backgrounds: { default: 'ocean' },
  },
};

export const UeberKenaluAktiv = {
  name: 'Über kenalu – aktiver Link',
  parameters: {
    nextjs: {
      navigation: { pathname: '/team' },
    },
    backgrounds: { default: 'ocean' },
  },
};

export const KontaktseiteOhneCTA = {
  name: 'Kontaktseite (CTA ausgeblendet)',
  parameters: {
    nextjs: {
      navigation: { pathname: '/contact' },
    },
    backgrounds: { default: 'ivory' },
    docs: {
      description: {
        story: 'Auf /contact wird der CTA «Gespräch starten» ausgeblendet, weil der Besucher schon auf der Kontaktseite ist.',
      },
    },
  },
};
