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
- **Management API Base:** `https://mapi.storyblok.com/v1/spaces/293099469334951`
  → Aus der Claude-Sandbox nicht erreichbar (Proxy-Block). Scripts immer lokal ausführen: `node scripts/xxx.js`

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
  about/page.js                  Über kenalu / Arbeitsweise
  services/page.js               Leistungsübersicht
  services/klarheit/page.js      Service-Detail (statisch)
  services/rapid-build/page.js   Service-Detail (statisch)
  services/produkt/page.js       Service-Detail (statisch)
  services/urteil/page.js        Service-Detail (statisch)
  insights/page.js               Blog/Insights (Storyblok-dynamisch)
  insights/[slug]/page.js        Artikel-Detailseite
  lab/page.js                    Lab-Übersicht
  lab/kenalu-website/page.js     Lab-Artikel (statisch)
  lab/produktmoment/page.js      Prototyp: Produktmoment-Builder
  team/page.js                   Team
  contact/page.js                Kontakt + Calendly Booking
  globals.css                    ALLE Styles — eine Datei
  layout.js                      Root Layout (Nav + Footer)
  api/
    kai/route.js                 KI-Chat API (OpenAI) — einheitliche Route für alle Seiten

components/
  blocks/
    KaiDialogue.js               Universeller KI-Chat-Block (alle Seiten)
    Hero.js                      Homepage-Hero
    ContactSection.js            Kontaktseite
    ContactBookingWidget.js      Calendly-Integration
    EcosystemPartners.js         Partner-Sektion (About)
    CollaborationIntro.js        Zusammenarbeit-Intro
    ProductMomentBuilder.js      Lab: Produktmoment-Builder
    FitTest.js                   Fit-Test
    ...weitere Storyblok-Blöcke
  DynamicBlock.js                Registry aller Storyblok-Block-Komponenten
  Nav.js, Footer.js, WaveBackground.js

scripts/
  update-hero-labels.js          Storyblok: hero_label + contact_label leeren

docs/                            Projektdokumentation (Markdown)
```

---

## Hero-System (vollständig implementiert)

**Grundregel:** Nav ist `position: fixed`, ~72px Höhe. Alle Heroes brauchen genug `padding-top`, damit Content klar unterhalb der Nav beginnt (Desktop: ≥96px Luft, Mobile: ≥72px).

### Desktop-Paddings (aktuell in globals.css)

Alle Heroes haben `min-height: 100svh`, `display: flex; flex-direction: column; justify-content: center` und `position: relative` (für Scroll-Indikator).

| Seite | CSS-Klasse | Padding |
|-------|-----------|---------|
| Homepage | `.hero` | `12rem var(--gutter) 8rem` |
| About | `.page-hero` | `12rem var(--gutter) 7rem` |
| Insights | `.insights-hero` | `12rem var(--gutter) 7rem` |
| Team | `.team-hero` | `12rem var(--gutter) 7rem` |
| Services-Übersicht | `.sov-hero` | `12rem 0 7rem` |
| Service-Detail | `.sd-hero` | `12rem 0 7rem` |
| Lab | `.lpv2-hero` | `12rem 0 8rem` + `background: var(--charcoal)` |
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

- **Homepage:** hero_label per CSS ausgeblendet → `.hero .hero-label { display: none; }`
- **Service-Details:** `01 / KLARHEIT`, `02 / RAPID BUILD`, `03 / PRODUKT`, `04 / URTEIL`
- **Lab:** `KENALU LAB`
- **Contact:** kein Label — `"Gespräch starten."` direkt als erste dominante Überschrift

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

## Offene Punkte (Stand: Juli 2026)

| Punkt | Status | Details |
|-------|--------|---------|
| About "Über kenalu"-Dopplung | 🔧 Script bereit | `scripts/update-hero-labels.js` prüft und behebt die Dopplung. Lokal ausführen: `node scripts/update-hero-labels.js`. Scripts-Verzeichnis ist gitignored. |
| Homepage hero_label in Storyblok | ℹ️ Workaround | Per CSS ausgeblendet. Kann via `scripts/update-hero-labels.js` geleert werden. |
| DynamicBlock.js vollständig? | ℹ️ Prüfen | Bei neuen Komponenten immer sicherstellen, dass Block-Key registriert ist |

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

## Was vollständig erledigt ist

- ✅ Vollständige Website (alle Seiten, alle Komponenten)
- ✅ Storyblok-Integration (CMS, ISR)
- ✅ Vier Service-Detailseiten (statisch, vollständig getextet und gestaltet)
- ✅ Lab mit zwei Artikeln + Produktmoment-Prototyp
- ✅ Einheitlicher Kai-Chat (alle Seiten, eine Route)
- ✅ Hero-System (alle Heroes: flex-centered, 100svh, Scroll-Indikator)
- ✅ Widget-System (5 visuell verschiedene Typen, Pflichtregeln im Prompt)
- ✅ Ihr/euch/euer durchgängig (Code + Storyblok)
- ✅ Typewriter-Effekt im Kai-Chat
- ✅ EcosystemPartners, CollaborationIntro, FitTest
- ✅ Navigation und Footer bereinigt
