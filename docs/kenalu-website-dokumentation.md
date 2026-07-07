# kenalu.ch — Technische Dokumentation

> Stand: Juli 2026 — gepflegt für Dirk Fliescher und zukünftige Mitarbeiter

---

## Inhalt

1. [Was ist das?](#1-was-ist-das)
2. [Technologie-Stack](#2-technologie-stack)
3. [Architektur](#3-architektur)
4. [Seitenstruktur und Inhalte](#4-seitenstruktur-und-inhalte)
5. [Deployment — Schritt für Schritt](#5-deployment--schritt-für-schritt)
6. [CMS: Storyblok](#6-cms-storyblok)
7. [Kai — der KI-Assistent](#7-kai--der-ki-assistent)
8. [Design-System](#8-design-system)
9. [Profil-System](#9-profil-system)
10. [Scripts und Automatisierung](#10-scripts-und-automatisierung)
11. [Sicherheitsregeln](#11-sicherheitsregeln)
12. [Umgebungsvariablen](#12-umgebungsvariablen)
13. [Lokale Entwicklung](#13-lokale-entwicklung)

---

## 1. Was ist das?

kenalu.ch ist die Website von kenalu, Dirk Flieschers Unternehmung für Intelligent Experiences.

Die Site dient als Kompetenznachweis und Kontaktpunkt. Sie erklärt, was kenalu tut, wie die Zusammenarbeit funktioniert und gibt Einblick in die Denkweise dahinter. Ein integrierter KI-Assistent (Kai) beantwortet Fragen und leitet zum Gespräch über.

**URL:** https://kenalu.ch  
**Hosting:** Vercel (automatisches Deploy bei jedem Push auf `main`)  
**Repo:** `/Users/dirkfliescher/Documents/kenalu-website` (lokal), GitHub: `dirkfliescher/kenalu-website`

---

## 2. Technologie-Stack

| Schicht | Technologie | Version | Zweck |
|---------|------------|---------|-------|
| Framework | Next.js (App Router) | 16.2.9 | Server-Side Rendering, ISR, API Routes |
| UI | React | 19.2.4 | Komponenten-System |
| CMS | Storyblok | — | Inhaltsverwaltung (Headless CMS) |
| KI | OpenAI API | gpt-4o-mini | Kai-Chat-Assistent |
| Hosting | Vercel | — | Deployment, CDN, Edge Functions |
| Styling | CSS (eine Datei) | — | `app/globals.css` — kein CSS-in-JS, kein Tailwind im Build |
| Fonts | Google Fonts (Inter) + Fontshare (Satoshi) | — | Body: Inter, Headline: Satoshi |
| Storybook | Storybook 8 | — | Komponenten-Entwicklung (lokal) |

**Keine Datenbank.** Alle Inhalte kommen entweder aus Storyblok (via API) oder sind direkt im Code.

---

## 3. Architektur

### 3.1 Datenflusskette

```
Storyblok CMS
    │
    ▼ (Content Delivery API — read-only)
Next.js page.js (Server Component)
    │
    ├── blok-Daten → DynamicBlock.js → Komponente
    │
    └── fallback-content.js (wenn Storyblok nicht erreichbar)
            │
            ▼
        React-Komponente (Client- oder Server-Component)
                │
                ▼
            Browser
```

### 3.2 Rendering-Strategie

Alle Seiten verwenden **Incremental Static Regeneration (ISR)**:

```js
export const revalidate = 60; // Seite wird max. alle 60 Sekunden neu generiert
```

Das bedeutet: Die Seite wird beim ersten Aufruf statisch gerendert und für 60 Sekunden gecacht. Nach Ablauf wird sie im Hintergrund neu generiert — der Besucher sieht immer eine ausgelieferte Seite, nie eine Wartezeit.

### 3.3 Komponenten-System

Es gibt zwei Typen von Komponenten:

**Server Components** (Standard in Next.js App Router)  
Lesen Daten aus Storyblok. Keine `useState`, kein `useEffect`. Werden auf dem Server gerendert. Beispiele: alle `page.js`-Dateien.

**Client Components** (`'use client'` am Dateianfang)  
Brauchen Browser-APIs oder interaktive State-Logik. Beispiele: `Nav.js`, `KaiDialogue.js`, `PrintButton.js`, `MarkdownDownloadButton.js`, `ContactBookingWidget.js`.

### 3.4 Storyblok-Integration

Storyblok ist das Headless CMS. Es liefert Seiteninhalte als JSON. Die Integration funktioniert so:

1. `page.js` fragt die Storyblok Content Delivery API an: `cdn/stories/{slug}`
2. Das zurückgegebene `content`-Objekt enthält ein Array von `body`-Blöcken
3. `DynamicBlock.js` mapped den `component`-Schlüssel jedes Blocks auf die passende React-Komponente
4. Jede Komponente rendert sich selbst aus dem `blok`-Prop

```js
// DynamicBlock.js — Auszug
const components = {
  hero:              Hero,
  about_hero:        AboutHero,
  services_hero:     ServicesHero,
  service_hero:      ServiceHero,
  team_hero:         TeamHero,
  person_profile:    ProfilePage,
  kai_dialogue:      KaiDialogue,
  // …
};
```

### 3.5 Fallback-Content

Jede wichtige Seite hat eine `_fallback-content.js`-Datei. Falls Storyblok nicht erreichbar ist (Timeout, API-Problem), rendert die Seite trotzdem korrekt — mit dem letzten bekannten Inhalt aus dem Code. Das ist kein Notbehelf, sondern bewusste Architektur.

### 3.6 Verzeichnisstruktur

```
kenalu-website/
├── app/
│   ├── layout.js                   Root Layout (Nav + Footer + Fonts + Metadata)
│   ├── globals.css                 ALLE Styles (eine einzige Datei)
│   ├── page.js                     Homepage
│   ├── approach/                   Seite: Arbeitsweise
│   ├── services/                   Leistungsübersicht + 4 Detailseiten
│   │   ├── klarheit/
│   │   ├── rapid-build/
│   │   ├── produkt/
│   │   └── urteil/
│   ├── about/                      Über kenalu
│   ├── insights/                   Blog/Insights (dynamisch aus Storyblok)
│   │   └── [slug]/                 Artikel-Detailseite
│   ├── lab/                        Lab-Übersicht
│   │   ├── kenalu-website/         Lab-Artikel: Website-Entwicklung
│   │   └── produktmoment/          Lab-Prototyp: Produktmoment-Builder
│   ├── contact/                    Kontaktseite + Booking-Widget
│   ├── dirk/                       Profil-Seite (noindex, für Kunden)
│   ├── profile/
│   │   └── [slug]/                 Generische Profil-Route (noindex)
│   └── api/
│       ├── kai/route.js            KI-Chat (Kai) — alle Seiten
│       └── qualify/route.js        Chat für Kontakt-Booking-Widget
│
├── components/
│   ├── Nav.js                      Hauptnavigation (fixed, scrolled-State)
│   ├── Footer.js                   Footer
│   ├── DynamicBlock.js             Storyblok Block → Komponente Registry
│   ├── Reveal.js                   Scroll-Animationskomponente
│   ├── WaveBackground.js           Animierter Wellenhintergrund
│   └── blocks/                     Alle inhaltlichen Komponenten (80+ Dateien)
│
├── docs/                           Projektdokumentation
├── scripts/                        Storyblok-Scripts (nur lokal ausführen)
├── public/                         Statische Assets (og-image.png, favicon)
├── .env.local                      Umgebungsvariablen (nicht im Repo)
└── next.config.js                  Next.js-Konfiguration
```

---

## 4. Seitenstruktur und Inhalte

### 4.1 Seitenübersicht

| URL | Inhalt | CMS | Hero-Hintergrund |
|-----|--------|-----|-----------------|
| `/` | Homepage: Kernaussage, Leistungsüberblick, Kai | Storyblok (teilweise) | ivory |
| `/approach` | Arbeitsweise: Wie kenalu vorgeht (Schritte, Prinzipien, Warum) | Storyblok | charcoal |
| `/services` | Leistungsübersicht: 4 Einstiege als Karten | Storyblok | charcoal |
| `/services/klarheit` | Strategische Einschätzung vor dem nächsten Schritt | Storyblok | charcoal |
| `/services/rapid-build` | Funktionierender Prototyp in Wochen | Storyblok | charcoal |
| `/services/produkt` | Durchdachte digitale Lösung | Storyblok | charcoal |
| `/services/urteil` | Unabhängige Projekteinschätzung | Storyblok | charcoal |
| `/about` | Über kenalu: Hintergrund, Werte, Ökosystem | Storyblok | charcoal |
| `/insights` | Blog-Übersicht (Artikel aus Storyblok) | Storyblok | charcoal |
| `/insights/[slug]` | Einzelner Artikel | Storyblok | charcoal |
| `/lab` | Lab-Übersicht: Experimente und Artikel | statisch | charcoal |
| `/lab/kenalu-website` | Artikel: Wie diese Website entstand | statisch | charcoal |
| `/lab/produktmoment` | Prototyp: KI-gestützter Produktmoment-Builder | statisch | charcoal |
| `/contact` | Kontakt: Buchungsassistent + Calendly-Integration | Storyblok | charcoal |
| `/dirk` | Profil Dirk Fliescher (noindex, für Kunden) | Storyblok | charcoal |
| `/profile/[slug]` | Generische Profil-Route (noindex) | Storyblok | charcoal |

### 4.2 Inhaltliche Struktur je Seite

**Homepage (`/`)**  
Einzige Seite mit ivory Hintergrund. Einstieg mit Kernaussage kenalus, Überblick über die vier Leistungen, Kai-Chat-Block.

**Arbeitsweise (`/approach`)**  
Erklärt den Arbeitsprozess in konkreten Schritten. Warum-Abschnitt beschreibt die Haltung hinter der Arbeit. Ökosystem-Sektion zeigt ausgewählte Partner. CTA zum Gespräch.

**Leistungen (`/services`)**  
Übersicht der vier Einstiegspunkte als Karten-Grid mit SVG-Visuals. Jede Karte führt auf die Detailseite. Darunter: Kurzübersicht der Arbeitsweise.

**Service-Detailseiten**  
Einheitliche Struktur: Hero mit Sequenznummer → Szene (Moment davor) → Arbeitsprobe (was entsteht) → Outcome (was danach anders ist) → Ehrliche Einordnung (für wen, für wen nicht) → andere Einstiege → CTA.

**Über kenalu (`/about`)**  
Hintergrundseite: wer hinter kenalu steht, Überzeugungen, Team-Verweis, Ökosystem-Partner, CTA.

**Insights (`/insights`)**  
Dynamisch aus Storyblok. Filterfunktion nach Tags. Jeder Artikel hat: Titel, Datum, Tag, Teaser, Bild, Inhalt (Richtext).

**Lab (`/lab`)**  
Statische Seite. Zeigt Experimente, Prototypen und Artikel. Aktuell: zwei Artikel (Website-Entwicklung, Produktmoment) + Verlinkung zum Produktmoment-Builder.

**Kontakt (`/contact`)**  
KI-gestützter Vorgespräch-Assistent: Kai begleitet durch 3 Austausche, danach erscheint der Calendly-Button. Ziel: qualifizierte, vorbereitete Gespräche.

### 4.3 Navigation

Festgepinnt (fixed), scrollt mit:
- Beim Scrollen: Hintergrund erscheint (`scrolled`-Klasse)
- Auf dunklen Seiten: startet mit hellem Text (ivory), wird nach Scroll dunkel
- Links: Leistungen / Arbeitsweise / Lab / Insights / Über kenalu / Gespräch starten
- Auf `/contact`: CTA «Gespräch starten» ausgeblendet
- Mobile: Burger-Menü mit Overlay, Scroll-Lock, Focus Trap, Escape-Key

---

## 5. Deployment — Schritt für Schritt

### 5.1 Normaler Änderungs-Workflow

Das Deployment ist vollständig automatisiert. Jeder Push auf `main` triggert Vercel.

```bash
# 1. Lokales Repo öffnen
cd /Users/dirkfliescher/Documents/kenalu-website

# 2. Änderungen machen (Code oder Storyblok-Scripts)

# 3. Build lokal prüfen (optional, empfohlen bei grösseren Änderungen)
npm run build

# 4. Committen und pushen
git add -A
git commit -m "Kurze Beschreibung der Änderung"
git push

# → Vercel erkennt den Push und deployed automatisch
# → Live in ca. 60–90 Sekunden unter kenalu.ch
```

Vercel benachrichtigt per Mail bei Deployment-Fehlern. Der Status ist einsehbar unter vercel.com.

### 5.2 Storyblok-Inhalte ändern

Für reine Textänderungen braucht es keinen Code-Deploy:

1. Storyblok-Editor öffnen: app.storyblok.com
2. Story auswählen (z.B. "Home", "Services")
3. Inhalt ändern
4. Story publizieren (blauer Button oben rechts)
5. kenalu.ch zeigt die Änderung nach spätestens 60 Sekunden (ISR)

### 5.3 Neue Storyblok-Inhalte über Scripts

Für strukturelle CMS-Änderungen (neue Komponenten, neue Stories) gibt es Scripts. Diese laufen **ausschliesslich lokal**, nie über die Claude-Sandbox.

```bash
# 1. Management Token setzen
export STORYBLOK_MANAGEMENT_TOKEN=dein_token_hier

# 2. Dry-Run (zeigt, was passieren würde)
node scripts/cms-beispiel.mjs

# 3. Scharf schalten
node scripts/cms-beispiel.mjs --apply

# 4. Publizieren (nur wenn wirklich bereit)
STORYBLOK_ALLOW_PUBLISH=YES node scripts/cms-beispiel.mjs --apply --publish
```

### 5.4 Lokale Entwicklungsumgebung starten

```bash
cd /Users/dirkfliescher/Documents/kenalu-website
npm run dev
# → http://localhost:3000
```

Für Storyblok-Draft-Inhalte (unveröffentlichte Entwürfe) im lokalen Modus: `NODE_ENV` ist automatisch `development`, Storyblok liefert dann auch Draft-Stories.

### 5.5 Häufige Fehler beim Deployment

**Build-Fehler wegen JSX-Syntax:**  
`npm run build` vorher ausführen. Vercel zeigt denselben Fehler, aber erst nach dem Push.

**Storyblok-Inhalte erscheinen nicht:**  
ISR-Cache abwarten (max. 60 Sekunden). Falls nach 2 Minuten noch nichts — prüfen, ob die Story publiziert (nicht nur gespeichert) ist.

**Lock-File verhindert Git-Commit:**  
```bash
rm /Users/dirkfliescher/Documents/kenalu-website/.git/HEAD.lock
rm /Users/dirkfliescher/Documents/kenalu-website/.git/index.lock
```

**Vercel-Deploy schlägt fehl:**  
In Vercel-Dashboard → Deployment → Logs nachschauen. Häufigste Ursache: fehlende Umgebungsvariable oder Syntax-Fehler.

---

## 6. CMS: Storyblok

### 6.1 Was ist Storyblok?

Storyblok ist ein Headless CMS. Es verwaltet alle Seiteninhalte als strukturierte Stories. Das Frontend (Next.js) fragt die Inhalte per API ab und rendert sie. Storyblok selbst ist kein Template-System — das Design liegt vollständig im Code.

### 6.2 Zugang

- **Space-ID:** `293099469334951`
- **Editor:** app.storyblok.com
- **Content Delivery Token (Preview):** in `.env.local` als `STORYBLOK_TOKEN`
- **Management API Token:** nur lokal als Umgebungsvariable `STORYBLOK_MANAGEMENT_TOKEN`

### 6.3 Story-Struktur

Jede Seite hat eine Story in Storyblok. Eine Story besteht aus Feldern und/oder einem `body`-Array mit Blöcken. Jeder Block hat einen `component`-Typ, der auf eine React-Komponente mapped.

**Bekannte Story-IDs:**

| Story | ID |
|-------|----|
| Home | `185993926251643` |
| Services | `186361777859852` |
| About (Über kenalu) | `186589241977666` |

### 6.4 Content Types (Komponenten-Typen)

Alle registrierten Storyblok-Komponenten und ihre React-Pendants:

| Storyblok-Typ | React-Komponente | Seite |
|---------------|-----------------|-------|
| `hero` | `Hero.js` | Homepage |
| `about_hero` | `AboutHero.js` | /approach |
| `about_working_why` | `AboutWorkingWhy.js` | /approach |
| `about_working_steps` | `AboutWorkingSteps.js` | /approach |
| `about_working_benefits` | `AboutWorkingBenefits.js` | /approach |
| `about_team_reference` | `AboutTeamReference.js` | /approach |
| `about_ecosystem_partners` | `AboutEcosystemPartners.js` | /approach |
| `about_cta` | `AboutCta.js` | /approach |
| `services_hero` | `ServicesHero.js` | /services |
| `services_card_grid` | `ServicesCardGrid.js` | /services |
| `services_approach` | `ServicesApproach.js` | /services |
| `services_cta` | `ServicesCta.js` | /services |
| `service_hero` | `ServiceHero.js` | /services/* |
| `service_scene` | `ServiceScene.js` | /services/* |
| `service_artifact` | `ServiceArtifact.js` | /services/* |
| `service_outcome` | `ServiceOutcome.js` | /services/* |
| `service_honest_fit` | `ServiceHonestFit.js` | /services/* |
| `service_related` | `ServiceRelated.js` | /services/* |
| `service_detail_cta` | `ServiceDetailCta.js` | /services/* |
| `team_hero` | `TeamHero.js` | /about |
| `kai_dialogue` | `KaiDialogue.js` | alle Seiten |
| `person_profile` | `ProfilePage.js` | /profile/[slug] |

### 6.5 ISR und Cache

Storyblok-Inhalte werden mit ISR gecacht (60 Sekunden). Das bedeutet: eine Änderung in Storyblok ist nach spätestens 60 Sekunden auf kenalu.ch sichtbar, ohne dass ein neues Deployment nötig ist.

---

## 7. Kai — der KI-Assistent

### 7.1 Was ist Kai?

Kai ist der integrierte KI-Assistent auf kenalu.ch. Er beantwortet Fragen zu kenalus Leistungen, Arbeitsweise und Hintergründen — und leitet gegebenenfalls zum Gespräch über.

Kai ist auf fast allen Seiten eingebunden (via `KaiDialogue.js`), hat aber je nach Seite einen anderen Kontext und andere Beispielfragen.

### 7.2 Technische Architektur

```
Browser → POST /api/kai → OpenAI gpt-4o-mini → strukturierte Antwort → KaiDialogue.js
```

**API-Route:** `app/api/kai/route.js`  
**Modell:** OpenAI `gpt-4o-mini`  
**Antwortformat:** `{ answer: string, showContact: boolean, widgets: Widget[] }`

Der `contextKey` steuert, welche Zusatzinformationen Kai erhält. Die Route liest den Key und baut den System-Prompt dynamisch.

### 7.3 Widget-System

Kai gibt strukturierte Widgets zurück, die neben der Textantwort erscheinen. Es gibt 5 Typen, die bewusst visuell verschieden sind:

| Typ | Aussehen | Wann |
|-----|----------|------|
| `service` | Sagegreen-Hintergrund, fetter Titel | Leistung erwähnt |
| `article` | Weiss, grüne Linie links | passender Insights-Artikel |
| `lab_article` | Dunkel, ivory Text | Lab-Beitrag relevant |
| `team` | Horizontal-Flex, Avatar-Circle | nach Team/Person gefragt |
| `contact` | Dunkel, voller CTA | Gespräch wäre nächster Schritt |

### 7.4 Artikel-Cache

Kai lädt alle Insights-Artikel aus Storyblok mit einem 10-Minuten-Cache. So kann er passende Artikel als Widgets empfehlen, ohne bei jeder Anfrage die CMS-API zu befragen.

### 7.5 KaiDialogue-Komponente

Props:

| Prop | Bedeutung |
|------|-----------|
| `contextKey` | Welchen Kontext Kai erhält (z.B. `'services'`, `'contact'`) |
| `eyebrow` | Kleines Label über dem Headline |
| `headline` | Hauptüberschrift der Kai-Box |
| `intro` | Einleitungstext |
| `initialMessage` | Erste Nachricht von Kai (bevor der Nutzer tippt) |
| `inputPlaceholder` | Platzhalter im Eingabefeld |
| `suggestedPrompts` | Array von Beispielfragen als klickbare Chips |
| `privacyNotice` | Datenschutzhinweis unter dem Chat |
| `showContactCta` | Ob ein direkter Kontakt-Link erscheint |

---

## 8. Design-System

### 8.1 Farben (CSS-Variablen)

```css
--charcoal:  #1a1f2e   /* Dunkel — Primärfarbe, Hintergründe */
--sage:      #6b8f7a   /* Grün — Akzentfarbe */
--mineral:   /* mittleres Grau */
--ivory:     #f8f5ef   /* Hell — Homepage-Hintergrund, helle Texte */
--stone:     #6b7280   /* Textgrau */
--terracotta: #C5694A  /* Warm-Orange — sparsam eingesetzt */
--softline:  #e5e7eb   /* Trennlinien */
--gutter:    /* Seitenabstand (responsiv) */
```

### 8.2 Typografie

- **Body:** Inter (Google Fonts) — 300, 400, 500
- **Headlines:** Satoshi (Fontshare) — 400, 500, 700, 900

Beide Fonts werden im `<head>` geladen. Satoshi kommt über Fontshare (kein Google CDN), Inter über Next.js `next/font/google`.

### 8.3 Hero-System

**Grundregel:** Nur die Homepage hat einen hellen (ivory) Hero. Alle anderen Seiten starten mit `background: var(--charcoal)`.

Die Nav ist `position: fixed` (~72px Höhe). Alle Heroes brauchen `padding-top: 12rem` (Desktop), damit der Inhalt klar unterhalb beginnt.

Alle Full-Viewport-Heroes zeigen einen animierten Scroll-Chevron via `::after`-Pseudo-Element (`hero-scroll-hint`-Animation).

**DARK_HERO_PAGES** (Nav startet mit weissem Text):

```js
['/services', '/approach', '/insights', '/about', '/lab', '/contact', '/dirk', '/profile']
```

### 8.4 CSS-Namenskonventionen

Alle Styles leben in `app/globals.css` — eine einzige Datei. CSS-Klassen sind nach Bereich präfixiert:

| Präfix | Bereich |
|--------|---------|
| `dp-` | Dirk-Profil (/dirk, /profile) |
| `sd-` | Service-Detail-Pages |
| `sov-` | Services-Übersicht |
| `lpv2-` | Lab-Seite (v2) |
| `lca-` | Lab-Artikel |
| `pm-` | Produktmoment-Builder |
| `kw-` | Kai-Widgets |
| `page-hero` | Approach-Hero |
| `insights-hero` | Insights-Hero |
| `team-hero` | Team-Hero (/about) |

### 8.5 Print-CSS

Für die Profil-Seiten gibt es einen umfangreichen `@media print`-Block. Er sorgt für ein sauberes A4-PDF:

- **Seite 1 (Cover):** 50:50-Grid aus Hero (links) und Kontaktblock mit Foto (rechts)
- **Seite 2:** Bio + Sprachen + Ausbildung im 33/66-Layout
- **Seite 3+:** Werdegang im CV-Raster (Datum links, Inhalt rechts)
- **Weitere Seiten:** Projekte, Kompetenzen, Testimonials
- Alle Buttons, Nav, Footer ausgeblendet
- Alle `<details>`-Akkordeons werden vor dem Druck automatisch aufgeklappt (via `beforeprint`-Event in `PrintButton.js`)

---

## 9. Profil-System

Das Profil-System erlaubt es, Dirks Profil als strukturierte Seite zu teilen — primär für potenzielle Kunden.

### 9.1 /dirk

**URL:** kenalu.ch/dirk  
**Robots:** noindex, nofollow (nicht in Suchmaschinen)  
**Komponente:** `DirkProfile.js`  
**Datenquelle:** Storyblok-Story `dirk` (Content Type: `dirk_profile`) + Foto aus `team/dirk-fliescher`

Enthält: Hero, Bio, Sprachen, Ausbildung, Werdegang (Stationen), Projekte (Akkordeon), Kompetenzen, Testimonials, CTA.

### 9.2 /profile/[slug]

**URL:** kenalu.ch/profile/{slug}  
**Robots:** noindex, nofollow  
**Komponente:** `ProfilePage.js`  
**Datenquelle:** Storyblok-Stories unter `profiles/{slug}` (Content Type: `person_profile`)

Generische Route für beliebige Profile. Dirks Profil ist unter `/profile/dirk` erreichbar (gespiegelt von der migrierten Story).

### 9.3 Export-Funktionen

Beide Profil-Seiten bieten zwei Download-Optionen:

**↓ PDF / Drucken** (PrintButton.js)  
Triggert `window.print()`. Klappt vorher alle Projekt-Akkordeons auf, danach wieder zu.

**↓ Markdown** (MarkdownDownloadButton.js)  
Generiert client-seitig eine `.md`-Datei mit allen Profildaten in sauberem Markdown-Format. Filename: `{name}.md` (z.B. `dirk-fliescher.md`). Nützlich für KI-Tools, ATS-Systeme oder eigene Templates.

---

## 10. Scripts und Automatisierung

Alle Scripts liegen in `/scripts/` und werden ausschliesslich lokal ausgeführt. Sie sind **nicht** im Git-Repo getrackt (mit Ausnahmen für SEC-003-gehärtete Scripts).

### 10.1 Aktuelle Scripts

| Script | Zweck |
|--------|-------|
| `cms-rebuild-about.mjs` | `about_*`-Blöcke in Storyblok aufbauen |
| `cms-services.mjs` | `services_*` + `service_*` + 5 Stories aufbauen |
| `cms-team-hero.mjs` | `team_hero`-Komponente + team-page Story |
| `cms-migrate-dirk-profile.mjs` | Dirks Profil von `dirk_profile` → `person_profile` migrieren |
| `cms-person-profile.mjs` | `person_profile` Storyblok-Schema erstellen |
| `cms-fix-after-slug-rename.mjs` | Story-Namen + Links nach Slug-Umbenennungen korrigieren |
| `update-dirk-bio.mjs` | Bio-Text für /dirk in Storyblok aktualisieren |
| `update-hero-labels.js` | hero_label + contact_label in Storyblok leeren |
| `cleanup-storyblok-2026-07.mjs` | Veraltete Storyblok-Blöcke entfernen |
| `cms-publish-stories.mjs` | Stories publizieren (nach --publish + STORYBLOK_ALLOW_PUBLISH=YES) |

### 10.2 Script-Ausführungsmuster

Alle Scripts folgen demselben Muster:

```bash
# Dry-Run (immer zuerst)
STORYBLOK_MANAGEMENT_TOKEN=xxx node scripts/cms-xyz.mjs

# Scharf schalten
STORYBLOK_MANAGEMENT_TOKEN=xxx node scripts/cms-xyz.mjs --apply

# Publizieren
STORYBLOK_MANAGEMENT_TOKEN=xxx STORYBLOK_ALLOW_PUBLISH=YES node scripts/cms-xyz.mjs --apply --publish
```

---

## 11. Sicherheitsregeln

### 11.1 Storyblok-Token-Regeln (SEC-003, seit 2026-07-03)

Für alle Storyblok-Management-Scripts gelten diese Pflichtregeln:

- **Kein Token im Code** — ausschliesslich `process.env.STORYBLOK_MANAGEMENT_TOKEN`
- **Env-Var-Name:** immer `STORYBLOK_MANAGEMENT_TOKEN` (nicht `STORYBLOK_PAT` oder andere)
- **Safe-Abort-Guard:** Script bricht ab, wenn Variable fehlt
- **Kein Fallback-Token** — `process.env.X || 'token'` ist verboten
- **Publish deaktiviert** — nur mit `--publish` UND `STORYBLOK_ALLOW_PUBLISH=YES`
- **Schema-Overwrite deaktiviert** — nur mit `--migrate-schema`
- **Kein Token in Console-Ausgaben oder Logs**

### 11.2 Was nicht ins Repo darf

- `.env.local` (Storyblok-Tokens, OpenAI-Key)
- Storyblok-Management-Token in irgendeiner Form
- Scripts mit hardcodierten Credentials

### 11.3 Ausstehend: Git-History-Cleanup (SEC-004)

Ein veralteter Token befand sich kurze Zeit in der Git-History. Bereinigung via `git filter-repo` ist geplant aber noch nicht durchgeführt. Details: `docs/arbeitsberichte/SEC-002-token-remediation-plan.md`.

---

## 12. Umgebungsvariablen

### Vercel (Production + Preview)

Diese Variablen müssen in Vercel unter Settings → Environment Variables hinterlegt sein:

| Variable | Wert | Zweck |
|----------|------|-------|
| `STORYBLOK_TOKEN` | Content Delivery Preview Token | Storyblok-API-Zugriff |
| `OPENAI_API_KEY` | OpenAI API Key | Kai-Chat-Assistent |

### Lokal (.env.local)

```bash
STORYBLOK_TOKEN=UjST5D2IbHlQxZqnpC03xQtt
OPENAI_API_KEY=sk-...
STORYBLOK_MANAGEMENT_TOKEN=...  # Nur für Scripts, nie commiten
```

`.env.local` ist in `.gitignore` eingetragen und wird nie ins Repo gepusht.

---

## 13. Lokale Entwicklung

### Erstsetup

```bash
cd /Users/dirkfliescher/Documents/kenalu-website
npm install
# .env.local mit Tokens erstellen (siehe oben)
npm run dev
```

### Verfügbare Befehle

| Befehl | Zweck |
|--------|-------|
| `npm run dev` | Lokaler Dev-Server auf localhost:3000 |
| `npm run build` | Production Build (Fehler prüfen) |
| `npm run lint` | ESLint |
| `npm run storybook` | Storybook auf localhost:6006 |

### Storybook

Storybook ist für Komponenten-Entwicklung eingerichtet. Es läuft unabhängig vom Next.js-Dev-Server auf Port 6006.

```bash
npm run storybook
```

### Git-Workflow

```bash
# Status prüfen
git status

# Alles committen
git add -A
git commit -m "Kurze Beschreibung"
git push
# → Vercel deployed automatisch

# Spezifische Dateien committen
git add components/Nav.js app/globals.css
git commit -m "fix(nav): Logo auf Profilseiten sichtbar"
git push
```

Alle Commits gehen direkt auf `main`. Es gibt keinen separaten Deploy-Branch. Vercel deployed jeden Push automatisch.

---

*Dokument erstellt: Juli 2026. Bitte bei grösseren Änderungen aktualisieren.*
