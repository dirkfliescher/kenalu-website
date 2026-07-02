# Storybook Setup – kenalu-website

> **Status: Historische Umsetzungsnotiz.**
> Diese Datei beschreibt einen früheren Arbeitsstand oder eine damalige Entscheidung.
> Sie ist nicht automatisch ein Abbild des aktuellen Live-, Code- oder Storyblok-Zustands.
> Aktueller Referenzpunkt: `docs/Informationsarchitektur.md`.

Datum: Juli 2026

---

## Was wurde eingerichtet

- `.storybook/main.js` – Konfiguration: Framework `@storybook/nextjs`, Stories-Pattern, Addons
- `.storybook/preview.js` – Globale Imports: `globals.css`, Next.js App Router Mocking, Hintergrundfarben
- `stories/Welcome.mdx` – Startseite des Storybooks
- `stories/design-system/DesignTokens.mdx` – Farben, Typografie, Spacing-Tokens
- `stories/design-system/CSSConventions.mdx` – Präfix-System (pm-*, kai-*, sov-*, etc.)
- `stories/architecture/Overview.mdx` – Projektstruktur, Verzeichnisbaum, Routing-Pattern
- `stories/architecture/Storyblok.mdx` – Storyblok-Setup, Block-Registry, ContextKey-Logik
- `stories/architecture/APIRoutes.mdx` – `/api/kai` und `/api/lab-builder` dokumentiert
- `stories/components/KaiDialogue.stories.js` – 7 Varianten (Homepage, alle Services, Kontakt, Produktmoment)
- `stories/components/Nav.stories.js` – 6 Varianten (hell/dunkel, aktive Links, ohne CTA)
- `stories/components/Footer.stories.js` – Statischer Wrapper, 2 Varianten
- `package.json` – Scripts `storybook` + `build-storybook` ergänzt; 4 Storybook-devDependencies

---

## Installation (einmalig ausführen)

```bash
cd /Users/dirkfliescher/Documents/kenalu-website

# Storybook-Packages installieren
# React 19 braucht ggf. --legacy-peer-deps
npm install --save-dev storybook@^8.6.0 @storybook/nextjs@^8.6.0 @storybook/addon-essentials@^8.6.0 @storybook/blocks@^8.6.0 --legacy-peer-deps
```

Falls `--legacy-peer-deps` Fehler gibt:

```bash
npm install --save-dev storybook@^8.6.0 @storybook/nextjs@^8.6.0 @storybook/addon-essentials@^8.6.0 @storybook/blocks@^8.6.0 --force
```

---

## Storybook starten

```bash
cd /Users/dirkfliescher/Documents/kenalu-website
npm run storybook
```

Öffnet sich auf `http://localhost:6006`.

---

## Technische Hinweise

### Next.js App Router

`@storybook/nextjs` mit `appDirectory: true` in `preview.js` mockt automatisch:
- `usePathname()` – überschreibbar pro Story via `parameters.nextjs.navigation.pathname`
- `useRouter()`, `useSearchParams()`, `Link` – funktionieren ohne echten Next.js-Server

### Footer (Server Component)

Footer ist ein `async` Server Component, der Storyblok fetcht. In Storybook ist kein API-Zugang aktiv. Die `Footer.stories.js` verwendet deshalb einen statischen `FooterPreview`-Wrapper mit denselben Props.

### KaiDialogue (API-Calls)

KaiDialogue ruft `/api/kai` auf, wenn der Nutzer etwas eingibt. Im Storybook:
- Initial-State (mit `initialMessage`) wird korrekt angezeigt
- Wenn man etwas eintippt und sendet, schlägt der API-Call fehl (kein Dev-Server)
- → Für vollständiges Testing: Next.js Dev-Server parallel starten (`npm run dev`)

### React 19 + Storybook 8.6

Storybook 8.5+ unterstützt React 19. Falls Peer-Dependency-Warnungen erscheinen: mit `--legacy-peer-deps` installieren (harmlos, da Storybook nur ein Dev-Tool ist).

---

## Nächste Stories (Ideen)

- `Hero.stories.js` – Hero-Komponente (dunkel/hell, mit/ohne CTA)
- `CtaSection.stories.js` – CTA-Blocks
- `EcosystemPartners.stories.js` – Partner-Grid
- `ProductMomentBuilder.stories.js` – komplexer Lab-Builder (interaktiv)
- `ServiceDetailPage.stories.js` – Statische Service-Detail-Layouts
