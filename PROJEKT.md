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
- About (Arbeitsweise/approach): `186589241977666`
- Über kenalu (about): `192824515818108`
- Custom AI Product Development: `211100241791605` (slug: `custom-ai-product`, Root-Ebene — noch nicht in service-detail-Ordner)
- AI Development Consulting: `211100245330550` (slug: `ai-development-consulting`, Root-Ebene — noch nicht in service-detail-Ordner)
- Insights-Artikel "Wann es sich lohnt, selbst zu bauen": `211146866159718` (Draft, slug: `wann-es-sich-lohnt-selbst-zu-bauen`)
- Insights-Ordner parent_id: `186603415195063`
- Rate Limit: 6 Requests/Sekunde → Scripts mit `await sleep(300)` vor jedem Request

**Publish-Backlog (3 Publishes nötig — ab morgen verfügbar):**
1. `STORYBLOK_ALLOW_PUBLISH=YES node scripts/migrate-approach.mjs --publish` (Approach-Seite)
2. `STORYBLOK_ALLOW_PUBLISH=YES node scripts/patch-custom-ai-scenarios.mjs --publish` (sd_scenarios auf custom-ai-product)
3. `STORYBLOK_ALLOW_PUBLISH=YES node scripts/patch-homepage-proof.mjs --publish` (home_proof auf Homepage)
4. `STORYBLOK_ALLOW_PUBLISH=YES node scripts/create-insight-wann-bauen.mjs --publish` (Insights-Artikel)
→ Alle 4 brauchen je 1 Publish → auf 2 Tage aufteilen

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
  lab/page.js                    Lab-Übersicht (dynamische Projektliste aus Storyblok)
  lab/[slug]/page.js             Dynamische Lab-Projektseite (CMS-LAB-01: Storyblok-first)
  lab/kenalu-website/page.js     Lab-Artikel (statisch — nach Script-Ausführung löschen)
  lab/produktmoment/page.js      Prototyp: Produktmoment-Builder (interaktiv, bleibt statisch)
  contact/page.js                Kontakt + Booking-Widget
  dirk/page.js                   Verstecktes Profil (robots: noindex) — Storyblok-first + Testimonials
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
    FitTest.js                   Fit-Test — blok-aware: parseFragen/parseErgebnisse, MAX aus Daten, Ergebnis bekommt Props (CONTENT-MIGRATE-01)
    CheckTool.js                 AI Readiness Check — blok-aware: parseQuestions/parseProfiles, Scoring bleibt in JS (CONTENT-MIGRATE-01)
    TeamIntro.js                 Team Intro — blok-aware: ModeSpiel bekommt runden-Prop, ModeQuiz bekommt quiz-Prop (CONTENT-MIGRATE-01)
    ServicesCompare.js           Services Compare — blok-aware: parseItems, label aus blok (CONTENT-MIGRATE-01)
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
    DirkProfile.js               /dirk Profil-Seite (Storyblok-first, 8 Projekte, Foto, Sprachen, Testimonials, Print)
    LabHero.js                   Lab-Projektseite Hero (CMS-LAB-01)
    LabTextSection.js            Lab-Textsektion, optional tinted (CMS-LAB-01)
    LabHighlight.js              Lab-Highlight mit Cards (CMS-LAB-01)
    LabComparison.js             Lab-Vergleichs-Canvas (CMS-LAB-01)
    LabDialogue.js               Lab-Dialog-Demo mit Nachrichten (CMS-LAB-01)
    LabFoundation.js             Lab-Foundation-Layers (CMS-LAB-01)
    LabCta.js                    Lab-CTA-Sektion (CMS-LAB-01)
    LabExperiment.js             Lab-Experiment Frage/Experiment/Erkenntnis (LAB-EXPERIMENT-01) — lca-exp-* CSS
    HomePositioning.js           Homepage Haltungsabschnitt (REPO2) — hpos-* CSS
    ApproachCapability.js        Approach "Was mit jedem Projekt wächst" (REPO2) — apc-* CSS
    ...weitere Storyblok-Blöcke
  DynamicBlock.js                Registry (about_* + services_* + service_* + team_hero + lab_* + lab_experiment registriert)
  Nav.js, Footer.js, WaveBackground.js

scripts/ (gitignored — nie committen)
  cms-rebuild-about.mjs          CMS-REBUILD-01: about_* in Storyblok aufbauen (lokal ausführen)
  cms-services.mjs               CMS-SERVICES-01: services_* + service_* + 5 Stories (lokal ausführen)
  cms-service-detail-create.mjs  CMS-SERVICES-02: 4 service-detail/* Stories erstellen (lokal ausführen, NEU 2026-07-14)
  cms-ux-writing-update.mjs      UX-Writing: services Hero + service-detail Headlines (Slugs korrigiert 2026-07-14)
  cms-team-hero.mjs              TEAM-HERO-01: team_hero Komponente + team-page Story (lokal ausführen)
  cms-fix-after-slug-rename.mjs  POST-SLUG: Story-Namen umbenennen, team_hero befüllen, /team-Links → /about
  cms-ki-repositioning.mjs       KI-REPO-01: Homepage, Services, Approach, Footer, 4 Service-Details (ausgeführt 2026-07-13)
  cms-ki-about.mjs               KI-REPO-02: About-Seite — team_hero + KI-Inhalte in Storyblok (lokal ausführen)
  cms-lab-migration.mjs          CMS-LAB-01: lab_* Komponenten + kenalu-website Story migrieren (lokal ausführen)
  update-hero-labels.js          Storyblok: hero_label + contact_label leeren
  update-dirk-bio.mjs            /dirk Bio-Text aktualisieren (Syntheseversion) — slugsToTry: ['dirk', 'team/dirk-fliescher']
  reset-team-bio.mjs             team/dirk-fliescher bio_text entfernen (SEC-003-konform)
  cms-interactive-content.mjs    CONTENT-MIGRATE-01: Inhalte aus 5 Komponenten nach Storyblok (lokal ausführen — NEU 2026-07-14)
  update-approach-emporix.mjs   REPO-01: Emporix neutralisieren in about_ecosystem_partners (2026-09-02)
  update-about-ki.mjs           REPO-02: KI-Formulierung in team_hero + collaboration_intro (2026-09-02)
  update-lab-framing.mjs        REPO-03: Lab-Hero Framing "Experimente = Produktfragen" (2026-09-02)
  update-homepage-card.mjs      REPO-04: Homepage Karte 01 Custom-AI Beschreibung (2026-09-02)
  update-custom-ai-b2b.mjs      REPO-05: Custom AI Product — B2B-Beispiel + Produkt-These (2026-09-02)
  create-insight-commerce-plattform.mjs  REPO-06: Insights-Artikel Commerce-Plattform 2026 (2026-09-02)
  setup-lab-experiment-schema.mjs       LAB-EXP-01: Storyblok-Schema lab_experiment erstellen/aktualisieren (2026-09-02)
  create-lab-experiment-01.mjs          LAB-EXP-02: Experiment 01 "Wenn Software anfängt zu handeln" erstellen (2026-09-02)
  create-lab-experiments-drafts.mjs     LAB-EXP-03: Experimente 02+03 als Draft erstellen (2026-09-02)
  reposition-schemas.mjs                REPO2-01: Schemas home_positioning + approach_capability (2026-09-03)
  reposition-homepage.mjs               REPO2-02: Hero, home_positioning, service_entry_grid (2026-09-03)
  reposition-services.mjs               REPO2-03: /services Hero + CardGrid (2026-09-03)
  reposition-custom-ai.mjs              REPO2-04: service_hero intro + Adoption-Block (2026-09-03)
  reposition-approach.mjs               REPO2-05: approach_capability Block (2026-09-03)
  reposition-about.mjs                  REPO2-06: team_hero body /about (2026-09-03)
  reposition-footer.mjs                 REPO2-07: footer_tagline (2026-09-03)
  reposition-ai-consulting.mjs          REPO2-08: AI Development Consulting Konsistenz (2026-09-03)

docs/                            Projektdokumentation (Markdown)
  pages/                         Per-Page-Docs (homepage.md, services.md, approach.md, etc.)
  components/                    Per-Komponenten-Docs (Hero.md, KaiDialogue.md, etc.)
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
// /lab ist EXAKT-MATCH — Artikel-Seiten (/lab/*) haben hellen Hero
const DARK_HERO_PAGES = ['/services', '/approach', '/insights', '/about', '/contact', '/dirk', '/profile'];
const onDark = DARK_HERO_PAGES.some((p) => pathname?.startsWith(p)) || pathname === '/lab';
```

Nav startet auf diesen Seiten mit hellem Text (ivory). Nach Scroll: dunkles Nav-Band.
Auf `/contact` wird der CTA «Gespräch starten» ausgeblendet (Besucher ist bereits dort).
**Wichtig:** `/lab` nur als Exakt-Match — sonst wäre das Logo auf Lab-Artikel-Seiten unsichtbar.

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
| `dp-` | DirkProfile (/dirk) |
| `sc-` | Service-Chat (veraltet, ersetzt durch kw-) |

---

## UX-Writing-Regeln (etabliert 2026-07-14)

Neue Pflichtregeln für alle Texte — gilt für Code UND Storyblok:

- **Hero-Headlines:** unter ~8 Wörter. Keine langen Sätze als Headline.
- **Kein Gedankenstrich (—)** in sichtbarem Fliesstext oder Headlines.
- **Wenn eine Pause nötig ist:** Punkt oder Doppelpunkt statt Gedankenstrich.
- **Nicht einfach streichen — Texte verbessern.**
- **Anrede:** durchgängig ihr/euch/euer — auch in interaktiven Spielen, Quiz-Texten und Ergebnis-Meldungen.

**Umfassende Sweep-Session 2026-07-14 — alle Code-Dateien bereinigt:**

20+ Dateien, ~60 em-Dashes ersetzt, zusätzliche du/dir/dich-Formen behoben:
- `app/layout.js`, `app/about/page.js`, `app/check/page.js`, `app/dirk/page.js`
- `app/lab/kenalu-website/page.js` (10 em-Dashes)
- `app/profile/[slug]/page.js`: Seitentitel `—` → `–` (en-dash, konsistent mit Template)
- `components/blocks/ServicesCompare.js`, `CollaborationIntro.js`, `ServiceDetailPage.js`
- `components/blocks/ServiceChat.js`, `ServiceArtifact.js` (aria-labels)
- `components/blocks/ProductMomentBuilder.js`, `KaiDialogue.js`
- `components/blocks/CheckTool.js` (7 em-Dashes)
- `components/blocks/TeamIntro.js`: em-Dashes + du/dir → ihr/euch in Spiel-Ergebnissen + Quiz-Beschreibungen
- `components/blocks/DirkProfile.js`: bio_text (2×), cta_text, 3 Projekt-Texte, 4 Client-Namen, 1 Kompetenz-Text
- `components/blocks/FitTest.js`: 2 em-Dashes + alle FRAGEN (du/dir → ihr/euch), Ergebnistitel + CTA
- `components/blocks/LabBuilder.js`: "Optional — du" → "Optional. Ihr könnt..."
- `app/api/kai/route.js`: Nutzersichtige Off-Topic-Antwort bereinigt
- `scripts/cms-ux-writing-update.mjs`: Services Hero Headline-Patch hinzugefügt

Bewusst ausgelassen (nicht nutzersichtig): Code-Kommentare (`//`), KI-System-Prompts in API-Routes, CSS-Separator `<span class="aw-person-sep">—</span>`, Storybook-Dateien, Placeholder-Strings (`'—'` für leere Felder).

---

## Offene Punkte (Stand: 2026-09-03, REPO2 + Korrekturen)

**Morgen koordiniert veröffentlichen (alles als Draft bereit):**

Reihenfolge:
1. `node scripts/reposition-schemas.mjs` — Schemas (home_positioning, approach_capability, service_scene.text_3, **hero.hero_headline_emphasis neu**)
2. `node scripts/reposition-homepage.mjs` — Hero (Split-Headline, kein Pfeil im CTA), home_positioning, service_entry_grid
3. `node scripts/reposition-services.mjs` — /services Hero + CardGrid
4. `node scripts/reposition-custom-ai.mjs` — service_hero intro + Adoption-Block
5. `node scripts/reposition-approach.mjs` — approach_capability-Block
6. `node scripts/reposition-about.mjs` — team_hero body
7. `node scripts/reposition-footer.mjs` — footer_tagline
8. `node scripts/reposition-ai-consulting.mjs` — Konsistenzcheck AI Consulting

Danach: `git add -A && git commit -m "feat: REPO2 + CORR1 — Positionierung, Headline-Split, Metadaten, Canonicals" && git push`

Dann max. 3 Publishes/Tag:
- `STORYBLOK_ALLOW_PUBLISH=YES node scripts/reposition-homepage.mjs --publish`
- `STORYBLOK_ALLOW_PUBLISH=YES node scripts/reposition-services.mjs --publish`
- `STORYBLOK_ALLOW_PUBLISH=YES node scripts/reposition-about.mjs --publish`
(Rest am Folgetag)

| Punkt | Status | Details |
|-------|--------|---------|
| **CORR1: Scripts lokal ausführen (alle als Draft)** | 🔧 Morgen | Alle 8 reposition-*.mjs in Reihenfolge oben. Kein --publish. |
| **CORR1: Git push** | 🔧 Ausstehend | `git add -A && git commit -m "feat: REPO2 + CORR1 — Positionierung, Headline-Split, Metadaten, Canonicals" && git push` |
| **CORR1: Storyblok-Inhalte publizieren** | 🔧 Morgen (max. 3/Tag) | Homepage zuerst, dann Services, dann About — Rest am Folgetag |
| **CORR1: Visuell prüfen** | 🔧 Nach Publish | Homepage: kein Doppelpfeil, Headline-Umbruch korrekt. /services, /services/custom-ai-product (Adoption), /approach (Capability), /about, Footer |

## Offene Punkte (Stand: 2026-09-02, Session 2)

| Punkt | Status | Details |
|-------|--------|---------|
| **Lab Experiment Framework: Schema erstellen** | 🔧 Lokal ausführen | `node scripts/setup-lab-experiment-schema.mjs` — erstellt/aktualisiert `lab_experiment` in Storyblok (Frage / Kontext / Experiment / Erkenntnis / next_step + related links). Idempotent: PUT wenn vorhanden. |
| **Lab Experiment 01 erstellen** | 🔧 Lokal ausführen | `node scripts/create-lab-experiment-01.mjs` — erstellt/aktualisiert "Wenn Software anfängt zu handeln" (lab/wenn-software-handelt). Mit `STORYBLOK_ALLOW_PUBLISH=YES ... --publish` direkt publizieren oder manuell im Editor. |
| **Lab Experimente 02+03 erstellen** | 🔧 Lokal ausführen | `node scripts/create-lab-experiments-drafts.mjs` — erstellt "Beschreiben statt navigieren" + "Wissen wann man nicht handeln sollte" als Draft. Zuerst Schema-Script ausführen. |
| **Git push (Lab Experiment Framework)** | 🔧 Ausstehend | `LabExperiment.js`, `DynamicBlock.js`, `globals.css` (lca-exp-* CSS), `lab/page.js`, `PROJEKT.md` + 3 neue Scripts committen: `git add -A && git commit -m "feat: LAB-EXPERIMENT-01 — Frage/Experiment/Erkenntnis Framework" && git push` |
| **Über kenalu (about) publizieren** | 🔧 Morgen | Publish-Limit erreicht. Direkt im Storyblok-Editor oder: `STORYBLOK_ALLOW_PUBLISH=YES node scripts/update-about-ki.mjs --publish` |

## Offene Punkte (Stand: 2026-09-02)

| Punkt | Status | Details |
|-------|--------|---------|
| **Inhalts-Repositionierung: Emporix neutralisieren** | 🔧 Lokal ausführen | `node scripts/update-approach-emporix.mjs --dry-run`, dann `node scripts/update-approach-emporix.mjs`. Entfernt "Zertifizierter Solution Partner"-Label, plattform-agnostische Formulierung. Dann publish. |
| **Inhalts-Repositionierung: About KI-Formulierung** | 🔧 Lokal ausführen | `node scripts/update-about-ki.mjs --dry-run`, dann `node scripts/update-about-ki.mjs`. Aktualisiert team_hero body + collaboration_intro. |
| **Inhalts-Repositionierung: Lab Framing** | 🔧 Lokal ausführen | `node scripts/update-lab-framing.mjs --dry-run`, dann `node scripts/update-lab-framing.mjs`. Stärkt "Experimente beantworten konkrete Produktfragen". |
| **Inhalts-Repositionierung: Homepage Karte** | 🔧 Lokal ausführen | `node scripts/update-homepage-card.mjs --dry-run`, dann `node scripts/update-homepage-card.mjs`. Schärft Custom-AI-Product-Beschreibung (criteria-based statt Feature-Liste). |
| **Inhalts-Repositionierung: Custom AI B2B-Beispiel** | 🔧 Lokal ausführen | `node scripts/update-custom-ai-b2b.mjs --dry-run`, dann `node scripts/update-custom-ai-b2b.mjs`. Ergänzt konkretes B2B-Szenario in service_scene. |
| **Insights: Commerce-Plattform-Artikel** | 🔧 Lokal ausführen | `node scripts/create-insight-commerce-plattform.mjs --dry-run`, dann `node scripts/create-insight-commerce-plattform.mjs`. Slug: `commerce-plattform-2026`. Kriterienbasiert, kein Emporix-Vorzug. |
| **Insights-Artikel publizieren** | 🔧 Lokal ausführen | 3 Artikel als Draft; Scripts jetzt mit Slug-Lookup. Befehle: `STORYBLOK_ALLOW_PUBLISH=YES node scripts/create-insight-ai-wollen-nicht-koennen.mjs --publish`, `STORYBLOK_ALLOW_PUBLISH=YES node scripts/create-insight-standard-plus-ai.mjs --publish`, `STORYBLOK_ALLOW_PUBLISH=YES node scripts/create-insight-was-wir-bauen.mjs --publish`. **wann-es-sich-lohnt** (ID: 211146866159718) direkt mit `STORYBLOK_ALLOW_PUBLISH=YES node scripts/create-insight-wann-bauen.mjs --publish`. |
| **Arbeitsformen in Storyblok erstellen** | 🔧 Lokal ausführen | `scripts/migrate-arbeitsformen.mjs` gefixt: sucht jetzt unter `service-detail/*` (nicht `services/*`), erstellt Ordner + 4 Stories wenn nicht vorhanden. Befehl: `node scripts/migrate-arbeitsformen.mjs --dry-run`, dann `node scripts/migrate-arbeitsformen.mjs`. Dann mit `--publish`. |
| **lab/kenalu-website publizieren** | 🔧 Lokal ausführen | Draft-ID 193186167349853. Direkt via API: `curl -X GET "https://mapi.storyblok.com/v1/spaces/293099469334951/stories/193186167349853/publish" -H "Authorization: $STORYBLOK_MANAGEMENT_TOKEN"` |
| **home_proof auf Homepage publizieren** | 🔧 Lokal ausführen | Draft-Block bereit. Script: `STORYBLOK_ALLOW_PUBLISH=YES node scripts/patch-homepage-proof.mjs --publish` (Story ID 185993926251643). |
| **Git push nach Session** | 🔧 Ausstehend | Neue Scripts in `scripts/` committen. `git add -A && git commit -m "feat: insight-scripts slug-lookup, migrate-arbeitsformen fix" && git push` |

## Offene Punkte (Stand: 2026-08-20)

| Punkt | Status | Details |
|-------|--------|---------|
| FOKUS-REPOSITIONIERUNG: Homepage | ✅ Published (2026-08-20) | `scripts/migrate-homepage.mjs` ausgeführt. Neue These, zwei CTAs, Produktkreislauf. hero_accent_word = "verändert" (Terracotta). |
| FOKUS-REPOSITIONIERUNG: Neue Service-Stories | 🔧 Draft — publizieren morgen | `scripts/migrate-new-services.mjs` ausgeführt. Stories als Draft: custom-ai-product (ID: 211100241791605), ai-development-consulting (ID: 211100245330550). Slugs auf Root-Ebene (nicht im service-detail-Ordner). Script `scripts/publish-new-services.mjs` bereit. |
| FOKUS-REPOSITIONIERUNG: /services | 🔧 Draft — publizieren morgen | `scripts/migrate-services.mjs` ausgeführt (Draft). Neue Struktur: 2 primäre Bereiche + 4 Arbeitsformen. Mit `STORYBLOK_ALLOW_PUBLISH=YES node scripts/migrate-services.mjs --publish` publizieren. |
| FOKUS-REPOSITIONIERUNG: /approach | 🔧 Script bereit — lokal ausführen | `scripts/migrate-approach.mjs` erstellt (2026-08-20). Felder: about_hero, about_working_why, about_working_steps, about_working_benefits, about_team_reference, about_cta aktualisiert. about_ecosystem_partners bleibt unverändert. **Ausführen:** `node scripts/migrate-approach.mjs --dry-run`, dann `node scripts/migrate-approach.mjs`, dann mit STORYBLOK_ALLOW_PUBLISH=YES publizieren. |
| FOKUS-REPOSITIONIERUNG: Footer-Tagline | 📋 Ausstehend | `config/footer` in Storyblok. Neue Tagline: "Individuelle Software und AI-Produkte. Agentenunterstützt entwickelt, von Menschen verantwortet." Script fehlt noch. |
| FOKUS-REPOSITIONIERUNG: Kai-Prompts | ✅ Erledigt (2026-08-20) | `/api/kai/route.js` aktualisiert: KENALU_BASE neu (Kernthese + 2 Leistungsbereiche), KENALU_SERVICES um Custom AI Product + AI Consulting erweitert, CONTEXT_CONFIG homepage/services/about überarbeitet, neue Keys `custom-ai-product` und `ai-development-consulting` hinzugefügt. Widget-Pflichtregeln angepasst. |
| FOKUS-REPOSITIONIERUNG: sd_scenarios — Custom AI Product | 🔧 Lokal ausführen | `SdScenarios.js` erstellt, in DynamicBlock.js registriert, CSS hinzugefügt. Script: `scripts/patch-custom-ai-scenarios.mjs`. 3 Erkennungsmomente: falsche Logik / Wissen in Köpfen / zu komplex für Standard. `node scripts/patch-custom-ai-scenarios.mjs --dry-run`, dann ohne --dry-run. |
| FOKUS-REPOSITIONIERUNG: page.js git push | 🔧 Lokal ausführen | `app/services/custom-ai-product/page.js`, `app/services/ai-development-consulting/page.js`, `components/blocks/SdScenarios.js`, `components/DynamicBlock.js`, `app/globals.css`, `app/api/kai/route.js` geändert — noch nicht gepusht. `rm -f .git/HEAD.lock && git add -A && git commit -m "feat: neue Service-Seiten, Kai-Update, sd_scenarios" && git push` |
| Storyblok Free Plan: 3 Publishes/Tag | ⚠️ Limit beachten | Nach 3 Publishes pro Tag bricht PUT mit 422 ab. Morgen: publish-new-services.mjs + migrate-services.mjs --publish. |

## Offene Punkte (Altbestand, Stand: 2026-08-19)

| Punkt | Status | Details |
|-------|--------|---------|
| CMS-SERVICES-02: Service-Detail-Stories erstellen | 🔧 Lokal ausführen | Script `scripts/cms-service-detail-create.mjs` bereit. Erstellt Ordner `service-detail` + 4 Stories: klarheit, rapid-build, produkt, urteil. **Befehl:** `STORYBLOK_ALLOW_WRITE=YES node scripts/cms-service-detail-create.mjs` (Draft), dann mit `--publish` publizieren. Danach greifen die page.js-Dateien auf Storyblok-Inhalte statt Fallbacks zu. |
| Nav.js: Logo-Bug auf Lab-Artikel-Seiten | ✅ Behoben | `/lab` war in `DARK_HERO_PAGES` als `startsWith`, was `/lab/*` fälschlicherweise erfasste. Jetzt Exakt-Match. **Git push ausstehend.** |
| UX-Writing: Vollständige Sweep-Session | ✅ Erledigt | 20+ Code-Dateien bereinigt: ~60 em-Dashes ersetzt, du/dir → ihr/euch in FitTest/TeamIntro/LabBuilder/DirkProfile. Storyblok-Headline (Services Hero) via `cms-ux-writing-update.mjs` patchbar. **Git push ausstehend.** |
| CONTENT-MIGRATE-01: cms-interactive-content.mjs ausführen | 🔧 Lokal ausführen | Überführt Inhalte aus 5 Komponenten nach Storyblok. **Reihenfolge:** (1) `git add -A && git commit -m "feat: CONTENT-MIGRATE-01 — 5 Komponenten blok-aware, cms-interactive-content.mjs" && git push`. (2) Schema erstellen: `STORYBLOK_MANAGEMENT_TOKEN=<token> node scripts/cms-interactive-content.mjs --migrate-schema`. (3) Inhalte + Publish: `STORYBLOK_MANAGEMENT_TOKEN=<token> STORYBLOK_ALLOW_PUBLISH=YES node scripts/cms-interactive-content.mjs --migrate-schema --publish`. **Was das Script macht:** Erstellt 11 nested Component-Schemas (services_compare_card, fit_frage, fit_option, fit_ergebnis, team_intro_runde, team_intro_quiz_frage, check_frage, check_option, dirk_station, dirk_project, dirk_theme). Erweitert 5 Parent-Schemas. Befüllt 5 Stories (services, mitwirken, about/home, check, dirk). |
| FitTest-Inhalte nach Storyblok migriert | ✅ Erledigt (2026-08-19) | `scripts/migrate-fittest.mjs` ausgeführt. 6 Fragen + 3 Ergebnisse in Story `192824515818108` (Über kenalu) in Block `fit_test` (Index 3) geschrieben und publiziert. Fallbacks in `FitTest.js` bleiben als Sicherheitsnetz erhalten. |
| Git push: Session-Änderungen deployen | ✅ Erledigt | Commit `1f94a53` auf main gepusht (2026-07-14). 6 Files, 253 Insertions, 116 Deletions. Vercel deployed automatisch. |
| KI-Repositionierung: Script ausgeführt | ✅ Ausgeführt | `scripts/cms-ki-repositioning.mjs` läuft. Homepage, Services, Approach, Footer, 4 Service-Details mit KI-Inhalten aktualisiert (2026-07-13). Stories in Storyblok publizieren nicht vergessen. |
| KI-Repositionierung: layout.js | ✅ Erledigt | Meta-Description, OG-Titel, JSON-LD auf KI-Positionierung aktualisiert (2026-07-13). |
| KI-Repositionierung: About-Seite Storyblok | 🔧 Lokal ausführen | `scripts/cms-ki-about.mjs` bereit. Fügt `team_hero`-Block in die `about`-Story ein, aktualisiert `about_intro`, `about_beliefs` (neues KI-Belief), `about_team`. **Befehl:** `STORYBLOK_ALLOW_WRITE=YES node scripts/cms-ki-about.mjs --apply` — dann Story in Storyblok publizieren. |
| CollaborationIntro.js Default-Text | ✅ Erledigt | KI-Dimension ergänzt ("KI-kompetent und bewusst klein", "KI-Engineering, Experience Design oder Strategie"). |
| Kai-System-Prompts: KI-Produkt-Fokus | 📋 Geplant | `/api/kai` System-Prompts sollen KI-Produkt-Positionierung reflektieren (Agenten, intelligente UX, Assistenzsysteme als Kern). |
| Build-Check + Commit KI-Repositionierung | 📋 Geplant | Nach Storyblok-Publizierung: `npm run build` prüfen, dann `git add -A && git commit -m "feat: KI-Repositionierung — layout.js, CollaborationIntro, about page" && git push`. |
| SEC-003 + OPS-002 | ✅ Abgeschlossen | Scripts gehärtet, Correction-Commit, Docs — gepusht als `19a233f` (2026-07-03). |
| OPS-002: WIP-Branch | ✅ Vorhanden | `wip/cms-002-about-storyblok-first` → zeigt auf `49f0eb2`. CMS-002a-Arbeit lokal gesichert (Worktree + Branch). |
| SEC-004: History-Cleanup | 📋 Geplant | `git filter-repo` für veralteten Token aus Git-History. Separate Absprache erforderlich. Voraussetzungen in `docs/arbeitsberichte/SEC-002-token-remediation-plan.md`. |
| Neuer Management-Token | 🔓 Freigegeben | SEC-003 ist committed und gepusht. Token kann jetzt erstellt werden: scoped auf Space, nur in `.env.local`, nie committen. Env-Var: `STORYBLOK_MANAGEMENT_TOKEN`. |
| CMS-REBUILD-01: /about Storyblok-first | 🔧 Lokal ausführen | 7 React-Komponenten (`about_*`), `page.js`, `_fallback-content.js` und `DynamicBlock.js` fertig. Script `scripts/cms-rebuild-about.mjs` bereit. Merge-Commit fehlt noch wegen `.git/index.lock`: `rm .git/index.lock && git commit -m "merge: feat/cms-rebuild-about → main (about_* Komponenten)" && git push origin main`. Danach `STORYBLOK_ALLOW_WRITE=YES node scripts/cms-rebuild-about.mjs --apply`. |
| CMS-SERVICES-01: /services Storyblok-first | 🔧 Lokal ausführen | 11 React-Komponenten (`services_*` + `service_*`), 5 `page.js` + 5 `_fallback-content.js`, `DynamicBlock.js` fertig. Script `scripts/cms-services.mjs` bereit. **Reihenfolge:** (1) `npm run build` — Build prüfen. (2) `git add -A && git commit -m "feat: CMS-SERVICES-01 — /services Storyblok-first" && git push`. (3) `node scripts/cms-services.mjs` (dry-run). (4) `STORYBLOK_ALLOW_WRITE=YES node scripts/cms-services.mjs --apply`. (5) Stories in Storyblok Visual Editor manuell publizieren. |
| About "Über kenalu"-Dopplung | 🔧 Script bereit | `scripts/update-hero-labels.js` prüft und behebt die Dopplung. Lokal ausführen: `node scripts/update-hero-labels.js`. Scripts-Verzeichnis ist gitignored. |
| Homepage hero_label in Storyblok | ℹ️ Workaround | Per CSS ausgeblendet. Kann via `scripts/update-hero-labels.js` geleert werden. |
| DynamicBlock.js vollständig? | ✅ Aktuell | about_* + services_* + service_* + team_hero + **lab_*** registriert. NO_REVEAL-Set enthält `services_hero`, `service_hero`, `team_hero` und **`lab_hero`**. Bei neuen Komponenten immer sicherstellen, dass Block-Key eingetragen ist. |
| CMS-LAB-01: Lab Storyblok-Migration | 🔧 Lokal ausführen | 7 neue lab_* Blöcke, dynamische Route `/lab/[slug]`, Übersicht holt Projekte aus Storyblok. Script `scripts/cms-lab-migration.mjs` bereit. **Reihenfolge:** (1) `git add -A && git commit -m "feat: CMS-LAB-01 — dynamische Lab-Seiten" && git push`. (2) `STORYBLOK_ALLOW_WRITE=YES node scripts/cms-lab-migration.mjs --migrate-schema`. (3) `STORYBLOK_ALLOW_WRITE=YES STORYBLOK_ALLOW_PUBLISH=YES node scripts/cms-lab-migration.mjs --apply --publish`. (4) `/lab/kenalu-website` im Browser testen — dann `app/lab/kenalu-website/page.js` löschen (damit greift die dynamische Route). |
| TEAM-HERO-01: /about Hero Storyblok-first | 🔧 Story noch Draft | `components/blocks/TeamHero.js`, `DynamicBlock.js`, `app/about/page.js` fertig. Script `scripts/cms-team-hero.mjs` wurde ausgeführt (Draft gesetzt). **Noch ausstehend:** Story im Storyblok Visual Editor manuell publizieren. |
| POST-SLUG: Storyblok-Namen + Links bereinigen | ✅ Script ausgeführt | `scripts/cms-fix-after-slug-rename.mjs` mit --apply ausgeführt (2026-07-06). Story-Namen umbenannt, team_hero befüllt, /team-Links → /about ersetzt. **Noch ausstehend:** Geänderte Stories im Storyblok Visual Editor publizieren (insb. "Über kenalu" / team-page). |
| /dirk Testimonials-Inhalt | ⌛ Manuell in Storyblok | Sektion ist gebaut und bereit (dp-testimonials). Testimonials aus `cdn/stories/team/dirk` werden automatisch geladen. **Aktion:** Im Storyblok Visual Editor die Story `team/dirk` öffnen, Feld `team_member_testimonials` mit Einträgen befüllen, Story publizieren. |
| /dirk PDF-Printbarkeit | ✅ Implementiert | `@media print`: A4 Portrait, 50:50 Cover-Grid (Hero + Kontaktblock), 33/66 Sektionslayout (Bio, Sprachen), Stationen als CV-Raster, Projekte immer aufgeklappt, PrintButton-Komponente. Commit: `82f3186`. |

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

## Was vollständig erledigt ist (Stand: 2026-07-13)

- ✅ Vollständige Website (alle Seiten, alle Komponenten)
- ✅ Storyblok-Integration (CMS, ISR)
- ✅ Vier Service-Detailseiten (statisch, vollständig getextet und gestaltet)
- ✅ Lab mit zwei Artikeln + Produktmoment-Prototyp
- ✅ CMS-LAB-01: Lab vollständig Storyblok-first (7 neue Blöcke, dynamische Route, Übersicht holt Projekte aus CMS — Script lokal ausführen)
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
- ✅ /dirk — Verstecktes Profil (robots: noindex): Hero, Bio, Sprachen, Werdegang, 8 Projekte (Accordion), Kompetenzen, Testimonials (aus team/dirk Story), CTA
- ✅ /dirk Projekte: Storyblok-Schema (dirk_station, dirk_project, dirk_theme) + Script cms-dirk-profile.mjs
- ✅ /dirk Foto: aus `team/dirk-fliescher` geladen via `getTeamData()` in `page.js` — erscheint in Bio (Screen) + Kontaktblock (Print)
- ✅ /dirk Sprachen: Deutsch (Muttersprache), Englisch (Verhandlungssicher), Französisch (Grundkenntnisse) — hardcoded in DirkProfile.js, mit 33/66 Print-Layout
- ✅ /dirk Bio-Text: Syntheseversion publiziert via `scripts/update-dirk-bio.mjs` (Story: `dirk`, Feld: `bio_text`)
- ✅ /dirk Print-Layout: vollständig mit A4, Cover-Grid, CV-Raster, Seitenumbrüchen
- ✅ KI-Repositionierung: `layout.js` Meta-Description, OG-Titel, JSON-LD auf KI-Produkte ausgerichtet
- ✅ KI-Repositionierung: `cms-ki-repositioning.mjs` ausgeführt — Homepage, Services, Approach, Footer, 4 Service-Details aktualisiert
- ✅ KI-Repositionierung: `CollaborationIntro.js` Default-Text mit KI-Dimension ergänzt
- ✅ KI-Repositionierung: `app/about/page.js` FALLBACK_HERO und Metadata auf KI-Positionierung aktualisiert
- ✅ KI-Repositionierung: `cms-ki-about.mjs` Script erstellt — About-Seite Storyblok-Integration (lokal ausführen)
- ✅ UX-Writing: Umfassende Sweep-Session — alle Code-Dateien bereinigt (2026-07-14): ~60 em-Dashes in 20+ Dateien ersetzt, zusätzlich du/dir/dich → ihr/euch/euer in FitTest, TeamIntro, LabBuilder, DirkProfile
- ✅ Nav.js: Logo-Bug auf Lab-Artikel-Seiten behoben — `/lab` jetzt Exakt-Match (2026-07-14)
- ✅ `cms-service-detail-create.mjs`: Script für 4 Service-Detail-Stories erstellt — SEC-003-konform, mit Ordner-Erstellung und Upsert-Logik (2026-07-14)
- ✅ CONTENT-MIGRATE-01: 5 Komponenten blok-aware gemacht (2026-07-14):
  - `ServicesCompare.js` → `parseItems(blok.items)`, `blok.label`
  - `FitTest.js` → `parseFragen(blok.fragen)`, `parseErgebnisse(blok.ergebnisse)`, MAX aus Daten, Ergebnis bekommt Props (nicht mehr Modul-Scope)
  - `TeamIntro.js` → `parseRunden(blok.dirk_runden/stan_runden)`, `parseQuiz(blok.quiz_fragen)`, ModeSpiel/ModeQuiz bekommen Daten als Props
  - `CheckTool.js` → `parseQuestions(blok.questions)`, `parseProfiles(blok)`, `getProfile(answers, profiles)`, Scoring-Algorithmus bleibt in JS
  - `DirkProfile.js` → war bereits blok-aware (nur Schema/Daten ausstehend)
  - `app/check/page.js` → Storyblok-first: lädt "check"-Story, gibt `blok` an CheckTool weiter
  - `scripts/cms-interactive-content.mjs` → SEC-003-konform, erstellt 11 Schemas + befüllt 5 Stories (lokal ausführen)
