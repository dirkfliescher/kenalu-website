# PROJEKT: kenalu-website — Aktueller Stand

> **Für Claude:** Diese Datei vor dem ersten Tool-Call lesen.
> Sie enthält den kompletten Projektstand, alle Konventionen und offene Punkte.

---

## Was ist das?

Next.js (App Router) Website für **kenalu** — Dirk Flieschers Unternehmung für Intelligent Experiences.

- **URL:** https://kenalu.ch
- **Hosting:** Vercel (auto-deploy via `git push` auf `main`)
- **CMS:** Storyblok (Space-ID: `293099469334951`)
- **KI-Chat:** OpenAI `gpt-4o-mini` via `/api/kai`
- **Repo lokal:** `/Users/dirkfliescher/Documents/kenalu-website`

---

## Sprach- und Tonkonventionen — IMMER EINHALTEN

- Anrede: **ihr/euch/euer** — NIEMALS du/dich/dein, NIEMALS Sie/Ihnen
- Sprache: Deutsch, Schweizer Schriftsprache (kein ß → immer ss)
- Ton: klar, menschlich, eigenständig — nicht nach KI, nicht nach klassischer Beratung
- Keine Floskeln, kein Buzzword-Bingo, keine Superlative

---

## Storyblok-Zugang

- **Content Delivery Token:** `UjST5D2IbHlQxZqnpC03xQtt` (in `.env.local` als `STORYBLOK_TOKEN`)
- **Management API Token:** Storyblok-Management-Zugang: über lokale Umgebungsvariablen; nicht im Repository speichern.
  ⚠️ Nicht ins Git-Repo pushen. Nur lokal in Scripts verwenden.
  **Env-Var-Name:** `STORYBLOK_MANAGEMENT_TOKEN` (nicht STORYBLOK_PAT oder andere)
- **Management API Base:** `https://mapi.storyblok.com/v1/spaces/293099469334951`
  → Aus der Claude-Sandbox nicht erreichbar (Proxy-Block). Scripts immer lokal ausführen: `node scripts/xxx.js`

### Script-Sicherheitsregeln (seit SEC-003, 2026-07-03)

Alle Storyblok-Scripts (in `scripts/`) folgen diesen Pflichtregeln:

- Token ausschliesslich aus `process.env.STORYBLOK_MANAGEMENT_TOKEN` — kein Hardcoding, kein Fallback
- Safe-Abort-Guard: bricht ab wenn Variable fehlt
- Publish: standardmässig deaktiviert — nur mit `--publish` UND `STORYBLOK_ALLOW_PUBLISH=YES`
- Schema-Overwrite: standardmässig deaktiviert — nur mit `--migrate-schema`

Fünf getrackte Scripts auf `origin/main` wurden in SEC-003 gehärtet:
`setup-ecosystem-storyblok.mjs`, `setup-kai-storyblok.mjs`, `setup-lab-kenalu.mjs`,
`cleanup-storyblok-2026-07.mjs`, `cleanup-storyblok-2026-07b.mjs`

**Bekannte Story-IDs:**
- Home: `185993926251643`
- Services: `186361777859852`
- About: `186589241977666`
- Rate Limit: 6 Requests/Sekunde → Scripts mit `await sleep(300)` vor jedem Request

---

## Verzeichnisstruktur (aktueller Stand)

```
app/
  page.js                        Homepage (statisch + Storyblok)
  approach/page.js               Arbeitsweise (/approach — Storyblok-Slug: about)
  approach/_fallback-content.js  Statischer Fallback /approach
  approach/_static-content.js   Produktiver Seiteninhalt (blok-förmig)
  about/page.js                  Über kenalu (/about — früher /team)
  services/
    page.js                      Leistungsübersicht (CMS-SERVICES-01: Storyblok-first)
    _fallback-content.js         Statischer Fallback /services
    klarheit/page.js             Service-Detail (CMS-SERVICES-01: Storyblok-first)
    klarheit/_fallback-content.js
    rapid-build/page.js          Service-Detail (CMS-SERVICES-01: Storyblok-first)
    rapid-build/_fallback-content.js
    produkt/page.js              Service-Detail (CMS-SERVICES-01: Storyblok-first)
    produkt/_fallback-content.js
    urteil/page.js               Service-Detail (CMS-SERVICES-01: Storyblok-first)
    urteil/_fallback-content.js
  insights/page.js               Blog/Insights (Storyblok-dynamisch)
  insights/[slug]/page.js        Artikel-Detailseite
  lab/page.js                    Lab-Übersicht
  lab/kenalu-website/page.js     Lab-Artikel (statisch)
  lab/produktmoment/page.js      Prototyp: Produktmoment-Builder
  contact/page.js                Kontakt + Booking-Widget
  globals.css                    ALLE Styles — eine Datei
  layout.js                      Root Layout (Nav + Footer)
  api/
    kai/route.js                 KI-Chat API (OpenAI) — einheitliche Route für alle Seiten
    qualify/route.js             Chat-API für Kontakt-Booking-Widget (OpenAI gpt-4o-mini)

components/
  blocks/
    KaiDialogue.js               Universeller KI-Chat-Block (alle Seiten)
    Hero.js                      Homepage-Hero
    ContactSection.js            Kontaktseite
    ContactBookingWidget.js      Calendly-Integration
    EcosystemPartners.js         Partner-Sektion (nicht mehr für /about)
    CollaborationIntro.js        Zusammenarbeit-Intro
    ProductMomentBuilder.js      Lab: Produktmoment-Builder
    FitTest.js                   Fit-Test
    AboutHero.js                 /about Hero (CMS-REBUILD-01)
    AboutWorkingWhy.js           /about Warum-Abschnitt (CMS-REBUILD-01)
    AboutWorkingSteps.js         /about Schritte (CMS-REBUILD-01)
    AboutWorkingBenefits.js      /about Vorteile (CMS-REBUILD-01)
    AboutTeamReference.js        /about Team-Verweis (CMS-REBUILD-01)
    AboutEcosystemPartners.js    /about Partner-Ökosystem (CMS-REBUILD-01)
    AboutCta.js                  /about CTA (CMS-REBUILD-01)
    ServicesHero.js              /services Hero (CMS-SERVICES-01)
    ServicesCardGrid.js          /services Karten-Grid mit SVG-Visuals (CMS-SERVICES-01)
    ServicesApproach.js          /services Arbeitsweise-Abschnitt (CMS-SERVICES-01)
    ServicesCta.js               /services Abschluss-CTA (CMS-SERVICES-01)
    ServiceHero.js               Service-Detail Hero, hero_variant + h1_wide (CMS-SERVICES-01)
    ServiceScene.js              Service-Detail Szene/Moment davor (CMS-SERVICES-01)
    ServiceArtifact.js           Service-Detail Arbeitsprobe, 4 Typen (CMS-SERVICES-01)
    ServiceOutcome.js            Service-Detail Danach/Outcome (CMS-SERVICES-01)
    ServiceHonestFit.js          Service-Detail Ehrliche Einordnung (CMS-SERVICES-01)
    ServiceRelated.js            Service-Detail Andere Einstiege (CMS-SERVICES-01)
    ServiceDetailCta.js          Service-Detail Abschluss-CTA (CMS-SERVICES-01)
    TeamHero.js                  /about Hero (Storyblok-first, Fallback: hardcoded)
    ...weitere Storyblok-Blöcke
  DynamicBlock.js                Registry (about_* + services_* + service_* + team_hero registriert)
  Nav.js, Footer.js, WaveBackground.js

scripts/ (gitignored — nie committen)
  cms-rebuild-about.mjs          CMS-REBUILD-01: about_* in Storyblok aufbauen (lokal ausführen)
  cms-services.mjs               CMS-SERVICES-01: services_* + service_* + 5 Stories (lokal ausführen)
  cms-team-hero.mjs              TEAM-HERO-01: team_hero Komponente + team-page Story (lokal ausführen)
  cms-fix-after-slug-rename.mjs  POST-SLUG: Story-Namen umbenennen, team_hero befüllen, /team-Links → /about
  update-hero-labels.js          Storyblok: hero_label + contact_label leeren

docs/                            Projektdokumentation (Markdown)
```

---

## Hero-System (vollständig implementiert)

**Grundregel:** Nav ist `position: fixed`, ~72px Höhe. Alle Heroes brauchen genug `padding-top`, damit Content klar unterhalb der Nav beginnt (Desktop: ≥96px Luft, Mobile: ≥72px).

### Hintergrundfarben — Regel

**Nur die Homepage** hat einen ivory Hero. Alle anderen Seiten starten mit `background: var(--charcoal)`.

| Seite | Hero-Klasse | Hintergrund |
|-------|------------|-------------|
| Homepage | `.hero` | ivory (bewusste Ausnahme) |
| Approach | `.page-hero` | charcoal |
| Insights | `.insights-hero` | charcoal |
| Über kenalu | `.team-hero` | charcoal |
| Services-Übersicht | `.sov-hero` | charcoal |
| Service-Detail | `.sd-hero` | charcoal |
| Lab | `.lpv2-hero` | charcoal |
| Contact | `.contact-page` | charcoal |

### Desktop-Paddings (aktuell in globals.css)

Alle Heroes haben `min-height: 100svh`, `display: flex; flex-direction: column; justify-content: center` und `position: relative` (für Scroll-Indikator).

| Seite | CSS-Klasse | Padding |
|-------|-----------|---------|
| Homepage | `.hero` | `12rem var(--gutter) 8rem` |
| Approach | `.page-hero` | `12rem var(--gutter) 7rem` |
| Insights | `.insights-hero` | `12rem var(--gutter) 7rem` |
| Über kenalu | `.team-hero` | `12rem var(--gutter) 7rem` |
| Services-Übersicht | `.sov-hero` | `12rem 0 7rem` |
| Service-Detail | `.sd-hero` | `12rem 0 7rem` |
| Lab | `.lpv2-hero` | `12rem 0 8rem` |
| Contact | `.contact-page` | `12rem var(--gutter) 7rem` |

### Scroll-Indikator

Alle Full-Viewport-Heroes (ausser Homepage) zeigen unten mittig einen animierten Chevron via `::after`-Pseudo-Element. Farbe: `currentColor` (ivory auf dark, charcoal auf light). Animation: `hero-scroll-hint` (bouncing, 2.4s). Versteckt bei `prefers-reduced-motion: reduce`.

### Mobile (max-width: 640px)

| Klasse | Padding |
|--------|---------|
| `.hero` | `9rem var(--gutter) 4rem` |
| `.page-hero`, `.insights-hero`, `.team-hero` | `8rem var(--gutter) 5rem` |
| `.lpv2-hero` | `9rem 0 6rem` |
| `.sov-hero`, `.sd-hero` | `8rem 0 5rem` |
| `.contact-page` | `8rem var(--gutter) 4rem` |

### Nav — DARK_HERO_PAGES

```js
const DARK_HERO_PAGES = ['/services', '/approach', '/insights', '/about', '/lab', '/contact'];
```

Nav startet auf diesen Seiten mit hellem Text (ivory). Nach Scroll: dunkles Nav-Band.
Auf `/contact` wird der CTA «Gespräch starten» ausgeblendet (Besucher ist bereits dort).

### Section-Labels

```css
.section-label {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sage);
  margin-bottom: 0.5rem;
}
```

Auf dunklem Hero: `color: rgba(255, 255, 255, 0.42)` überschreibt den sage-Wert.

- **Homepage:** hero_label per CSS ausgeblendet → `.hero .hero-label { display: none; }`
- **Service-Details:** `01 / KLARHEIT`, `02 / RAPID BUILD`, `03 / PRODUKT`, `04 / URTEIL`
- **Lab:** `KENALU LAB`
- **Contact:** Section-Label vorhanden; `<h1>` dominant

---

## Kai-System (KI-Chat)

### API-Route: `app/api/kai/route.js`

Einheitliche Route für alle Seiten. Kontext wird über `contextKey` gesteuert.

- **Modell:** `gpt-4o-mini`
- **Response-Format:** `{ answer: string, showContact: boolean, widgets: Widget[] }`
- **Artikel-Cache:** 10 Minuten (in-memory)

**Context-Keys (alle verfügbar):**
`homepage`, `services`, `services-story`, `klarheit-story`, `rapid-build-story`, `produkt-story`, `urteil-story`, `about`, `team`, `contact`, `insights`, `lab`, `produktmoment`

### Widget-System (5 Typen — visuell komplett verschieden)

**Pflichtregeln — Kai MUSS Widgets ausgeben:**
- Leistung namentlich erwähnt → **IMMER** `service`-Widget
- Insights-Artikel passend → **IMMER** `article`-Widget
- Lab-Beitrag relevant → **IMMER** `lab_article`-Widget
- Nach Team/Personen gefragt → **IMMER** `team`-Widget
- Gespräch wäre nächster Schritt → `contact`-Widget
- Kein Widget NUR bei kurzer Begrüssung ohne Inhalt

**CSS-Klassen der 5 Typen (in globals.css):**

| Typ | Klasse | Visuelles Profil |
|-----|--------|-----------------|
| Insights-Artikel | `.kw-article` | Weiss, grüne Linie links (`border-left: 3px solid #6b8f7a`) |
| Lab-Artikel | `.kw-lab-article` | Dunkel (`var(--charcoal)`), ivory Text, teal Akzente (`#6fbfa8`) |
| Service | `.kw-service` | Helles Sagegreen BG (`#eef5f1`), sage Top-Border, fette Überschrift |
| Team | `.kw-team` | Horizontal-Flex, 42px Avatar-Circle (charcoal BG) |
| Contact | `.kw-contact` | Dunkel, volle Breite, klarer CTA |

### KaiDialogue.js (Komponente)

- Typewriter-Effekt für alle Antworten
- Widgets erscheinen erst nach Ende des Typewriters
- Props: `eyebrow`, `headline`, `intro`, `contextKey`, `initialMessage`, `inputPlaceholder`, `suggestedPrompts`, `privacyNotice`, `showContactCta`

---

## Design-System (CSS-Variablen)

```css
var(--charcoal)    /* Dunkel: #1a1f2e — Primärfarbe */
var(--sage)        /* Grün: #6b8f7a — Akzent */
var(--mineral)     /* Mittleres Grau */
var(--ivory)       /* Hell: #f8f5ef */
var(--stone)       /* Textgrau: #6b7280 */
var(--gutter)      /* Seitenabstand */
var(--softline)    /* Trennlinien: #e5e7eb */
```

### CSS-Namenskonventionen (alle in globals.css)

| Präfix | Bereich |
|--------|---------|
| `sd-` | Service-Detail-Pages |
| `sov-` | Services-Übersicht |
| `lpv2-` | Lab-Seite |
| `lca-` | Lab-Artikel |
| `pm-` | Produktmoment-Builder |
| `kw-` | Kai-Widgets |
| `page-hero` | About-Hero |
| `insights-hero` | Insights-Hero |
| `team-hero` | Team-Hero |
| `sc-` | Service-Chat (veraltet, ersetzt durch kw-) |

---

## Offene Punkte (Stand: 2026-07-06)

| Punkt | Status | Details |
|-------|--------|---------|
| SEC-003 + OPS-002 | ✅ Abgeschlossen | Scripts gehärtet, Correction-Commit, Docs — gepusht als `19a233f` (2026-07-03). |
| OPS-002: WIP-Branch | ✅ Vorhanden | `wip/cms-002-about-storyblok-first` → zeigt auf `49f0eb2`. CMS-002a-Arbeit lokal gesichert (Worktree + Branch). |
| SEC-004: History-Cleanup | 📋 Geplant | `git filter-repo` für veralteten Token aus Git-History. Separate Absprache erforderlich. Voraussetzungen in `docs/arbeitsberichte/SEC-002-token-remediation-plan.md`. |
| Neuer Management-Token | 🔓 Freigegeben | SEC-003 ist committed und gepusht. Token kann jetzt erstellt werden: scoped auf Space, nur in `.env.local`, nie committen. Env-Var: `STORYBLOK_MANAGEMENT_TOKEN`. |
| CMS-REBUILD-01: /about Storyblok-first | 🔧 Lokal ausführen | 7 React-Komponenten (`about_*`), `page.js`, `_fallback-content.js` und `DynamicBlock.js` fertig. Script `scripts/cms-rebuild-about.mjs` bereit. Merge-Commit fehlt noch wegen `.git/index.lock`: `rm .git/index.lock && git commit -m "merge: feat/cms-rebuild-about → main (about_* Komponenten)" && git push origin main`. Danach `STORYBLOK_ALLOW_WRITE=YES node scripts/cms-rebuild-about.mjs --apply`. |
| CMS-SERVICES-01: /services Storyblok-first | 🔧 Lokal ausführen | 11 React-Komponenten (`services_*` + `service_*`), 5 `page.js` + 5 `_fallback-content.js`, `DynamicBlock.js` fertig. Script `scripts/cms-services.mjs` bereit. **Reihenfolge:** (1) `npm run build` — Build prüfen. (2) `git add -A && git commit -m "feat: CMS-SERVICES-01 — /services Storyblok-first" && git push`. (3) `node scripts/cms-services.mjs` (dry-run). (4) `STORYBLOK_ALLOW_WRITE=YES node scripts/cms-services.mjs --apply`. (5) Stories in Storyblok Visual Editor manuell publizieren. |
| About "Über kenalu"-Dopplung | 🔧 Script bereit | `scripts/update-hero-labels.js` prüft und behebt die Dopplung. Lokal ausführen: `node scripts/update-hero-labels.js`. Scripts-Verzeichnis ist gitignored. |
| Homepage hero_label in Storyblok | ℹ️ Workaround | Per CSS ausgeblendet. Kann via `scripts/update-hero-labels.js` geleert werden. |
| DynamicBlock.js vollständig? | ✅ Aktuell | about_* + services_* + service_* + team_hero registriert. NO_REVEAL-Set enthält `services_hero`, `service_hero` und `team_hero`. Bei neuen Komponenten immer sicherstellen, dass Block-Key eingetragen ist. |
| TEAM-HERO-01: /about Hero Storyblok-first | 🔧 Story noch Draft | `components/blocks/TeamHero.js`, `DynamicBlock.js`, `app/about/page.js` fertig. Script `scripts/cms-team-hero.mjs` wurde ausgeführt (Draft gesetzt). **Noch ausstehend:** Story im Storyblok Visual Editor manuell publizieren. |
| POST-SLUG: Storyblok-Namen + Links bereinigen | ✅ Script ausgeführt | `scripts/cms-fix-after-slug-rename.mjs` mit --apply ausgeführt (2026-07-06). Story-Namen umbenannt, team_hero befüllt, /team-Links → /about ersetzt. **Noch ausstehend:** Geänderte Stories im Storyblok Visual Editor publizieren (insb. "Über kenalu" / team-page). |

---

## Deployment

```bash
# Änderungen deployen
cd /Users/dirkfliescher/Documents/kenalu-website
git add -A
git commit -m "kurze beschreibung"
git push
# → Vercel deployed automatisch

# Storyblok-Scripts lokal ausführen
node scripts/update-hero-labels.js
```

---

## Was vollständig erledigt ist (Stand: 2026-07-06)

- ✅ Vollständige Website (alle Seiten, alle Komponenten)
- ✅ Storyblok-Integration (CMS, ISR)
- ✅ Vier Service-Detailseiten (statisch, vollständig getextet und gestaltet)
- ✅ Lab mit zwei Artikeln + Produktmoment-Prototyp
- ✅ Einheitlicher Kai-Chat (alle Seiten, eine Route)
- ✅ Hero-System (alle Heroes: flex-centered, 100svh, Scroll-Indikator)
- ✅ Hintergrundfarben: nur Homepage ivory, alle anderen Seiten charcoal
- ✅ Widget-System (5 visuell verschiedene Typen, Pflichtregeln im Prompt)
- ✅ Ihr/euch/euer durchgängig (Code + Storyblok)
- ✅ Typewriter-Effekt im Kai-Chat
- ✅ EcosystemPartners, CollaborationIntro, FitTest
- ✅ Navigation und Footer bereinigt
- ✅ Slugs korrigiert: `/about` → `/approach`, `/team` → `/about` (15 Dateien)
- ✅ Nav-Bug auf /contact behoben (CSS-Selektor `li:last-child` → `.btn-primary`)
- ✅ Booking-Widget repariert: `/api/qualify` ist jetzt echte Chat-API (OpenAI), Calendly-CTA erscheint erst nach 3 Exchanges
- ✅ SEC-003: Alle Scripts gehärtet (kein Token, kein Fallback, Safe-Abort-Guard, Publish-Schutz)
- ✅ OPS-002: Unbeabsichtigter Commit korrigiert, WIP-Branch gesichert
- ✅ Security-Release gepusht (2026-07-03, Commit `19a233f`)
