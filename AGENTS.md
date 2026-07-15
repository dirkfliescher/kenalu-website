<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# kenalu-website — Regeln für alle Agents und Claude-Sessions

> **Vor dem ersten Tool-Call:** `PROJEKT.md` lesen.
> Diese Datei enthält den vollständigen Projektstand, alle offenen Punkte und Konventionen.
> Ohne diesen Kontext entstehen Fehler.

---

## Was ist dieses Projekt?

Next.js 15 (App Router) Website für **kenalu** — Dirk Flieschers Unternehmung für Intelligent Experiences.

- **URL:** https://kenalu.ch
- **Hosting:** Vercel (auto-deploy via `git push` auf `main`)
- **CMS:** Storyblok (Space-ID: `293099469334951`)
- **KI-Chat:** OpenAI `gpt-4o-mini` via `/api/kai`
- **Repo lokal:** `/Users/dirkfliescher/Documents/kenalu-website`

---

## REGEL №1 — KEIN CONTENT AUSSERHALB VON STORYBLOK

**Alle sichtbaren Inhalte gehören nach Storyblok. Keine Ausnahmen.**

Das bedeutet konkret:

- **Neue Texte, Labels, Headlines, Beschreibungen** → niemals als String-Literal in JS-Dateien anlegen
- **Neue interaktive Komponenten** → blok-first: `{ blok = {} }` als Prop, Inhalte aus `blok.*` lesen
- **Fallbacks in JS** → erlaubt, aber nur als vorübergehende Brücke, nicht als dauerhafter Zustand
- **Kein neuer Hardcode-Inhalt in `const DATEN = [...]`-Blöcken** → stattdessen Storyblok-Schema + Migration-Script

**Muster für jede neue Komponente:**

```js
// ✅ Richtig: Inhalte aus Storyblok, JS-Fallback als Brücke
const DEFAULT_ITEMS = [ /* Fallback-Daten */ ];

export default function MeineKomponente({ blok = {} }) {
  const items = blok.items?.length > 0
    ? blok.items.map(parseItem)
    : DEFAULT_ITEMS;
  // ...
}
```

```js
// ❌ Falsch: Inhalt fest im Code
const MEIN_TEXT = 'Dieser Text gehört nach Storyblok';
export default function MeineKomponente() {
  return <p>{MEIN_TEXT}</p>;
}
```

**Wann ein Migration-Script nötig ist:**
- Neue Komponente mit eigenem Content-Schema
- Bestehende Komponente bekommt editierbaren Content
- Storyblok-Story muss mit Daten befüllt werden

**Script-Vorlage:** `scripts/cms-interactive-content.mjs` (SEC-003-konform, mit Rate-Limiting)

---

## Sprach- und Tonkonventionen — KRITISCH

- **Anrede:** `ihr / euch / euer` — NIEMALS `du / dich / dein`, NIEMALS `Sie / Ihnen`
- **Sprache:** Deutsch, Schweizer Schriftsprache (kein `ß` → immer `ss`)
- **Ton:** klar, menschlich, eigenständig — nicht KI-generiert klingend, nicht Beratungsfloskeln
- **Kein Gedankenstrich (—)** in sichtbarem Fliesstext oder Headlines → stattdessen Punkt, Doppelpunkt oder Umformulierung
- **Hero-Headlines:** unter ~8 Wörter — keine langen Sätze als Headline

Diese Regeln gelten für Code, Storyblok-Inhalte und Scripts gleichermassen.

---

## Storyblok — Zugang und Konfiguration

| | |
|--|--|
| **Space-ID** | `293099469334951` |
| **Content Delivery Token** | in `.env.local` als `STORYBLOK_TOKEN` |
| **Management API Token** | nur lokal als `STORYBLOK_MANAGEMENT_TOKEN` — nie ins Repo |
| **Management API Base** | `https://mapi.storyblok.com/v1/spaces/293099469334951` |
| **Rate Limit** | 6 req/s → Scripts mit `await sleep(300)` vor jedem API-Call |

**Aus der Claude-Sandbox:** Management API nicht erreichbar (Proxy-Block).
Scripts **immer lokal** ausführen: `STORYBLOK_MANAGEMENT_TOKEN=<token> node scripts/xxx.mjs`

**Bekannte Story-IDs:**
- Home: `185993926251643`
- Services: `186361777859852`
- About: `186589241977666`
- Check: `197986053803078` (erstellt 2026-07-14)

---

## Script-Sicherheitsregeln — SEC-003 (seit 2026-07-03)

**Alle Storyblok-Scripts müssen diese Regeln einhalten:**

- Kein Tokenwert im Code — ausschliesslich `process.env.STORYBLOK_MANAGEMENT_TOKEN`
- Env-Var-Name: immer `STORYBLOK_MANAGEMENT_TOKEN` (nicht `STORYBLOK_PAT` oder andere)
- Safe-Abort-Guard: Script bricht ab, wenn Variable fehlt
- Kein Fallback-Token (`process.env.X || '<token>'` ist verboten)
- Publish: standardmässig deaktiviert — nur mit `--publish` UND `STORYBLOK_ALLOW_PUBLISH=YES`
- Schema-Overwrite: standardmässig deaktiviert — nur mit `--migrate-schema`
- Kein Token in Console-Ausgaben, Fehlern oder Logs

**Ausführungs-Pattern:**
```bash
# Schema erstellen + Inhalte befüllen (kein Publish)
STORYBLOK_MANAGEMENT_TOKEN=<token> node scripts/mein-script.mjs --migrate-schema

# Alles inkl. Publish
STORYBLOK_MANAGEMENT_TOKEN=<token> STORYBLOK_ALLOW_PUBLISH=YES \
  node scripts/mein-script.mjs --migrate-schema --publish
```

---

## Architektur — wichtige Dateien

```
app/
  page.js                    Homepage (Storyblok-first)
  globals.css                ALLE Styles — eine Datei, kein CSS-in-JS
  layout.js                  Root Layout (Nav + Footer, Metadata)
  api/
    kai/route.js             KI-Chat API (OpenAI gpt-4o-mini, alle Seiten)
  check/page.js              AI Readiness Check (Storyblok-first seit 2026-07-14)
  dirk/page.js               Verstecktes Profil (robots: noindex, Storyblok-first)

components/
  blocks/                    Storyblok-Block-Komponenten (eine Datei pro Block-Typ)
  DynamicBlock.js            Registry: Block-Key → React-Komponente
  Nav.js, Footer.js          Navigation + Footer

scripts/                     Storyblok-Scripts (gitignored, lokal ausführen)
  cms-interactive-content.mjs  Migration: 5 interaktive Komponenten nach Storyblok

docs/                        Projektdokumentation (.md Files)
PROJEKT.md                   Vollständiger Projektstand — vor jeder Session lesen
```

---

## Blok-First-Pattern — Pflichtmuster für alle Komponenten

Jede Komponente, die sichtbaren Content rendert, muss diesem Muster folgen:

```js
// 1. Fallback-Daten als Konstante (Brücke bis Storyblok befüllt ist)
const DEFAULT_ITEMS = [ { text: 'Fallback-Text' } ];

// 2. Parse-Funktion: Storyblok-Daten → interne Struktur
function parseItems(blokItems) {
  if (!blokItems?.length) return DEFAULT_ITEMS;
  return blokItems.map((item) => ({ text: item.text || '' }));
}

// 3. Komponente: blok als Prop, Fallback greift automatisch
export default function MeineKomponente({ blok = {} }) {
  const items = parseItems(blok.items);
  return <ul>{items.map((i, idx) => <li key={idx}>{i.text}</li>)}</ul>;
}
```

**Alle `'use client'`-Komponenten** (FitTest, TeamIntro, CheckTool usw.) bekommen den `blok`-Prop vom Server-Component (page.js), das die Story lädt.

---

## DynamicBlock.js — bei neuen Komponenten aktualisieren

Jede neue Storyblok-Block-Komponente muss in `components/DynamicBlock.js` registriert werden:

```js
import MeineKomponente from './blocks/MeineKomponente';

const components = {
  // ... bestehende
  meine_komponente: MeineKomponente,  // ← muss dem Storyblok-Component-Namen entsprechen
};
```

**Ohne diesen Eintrag bleibt der Block in Storyblok unsichtbar.**

---

## Storyblok-Komponenten (Stand 2026-07-14)

### Interaktive Komponenten — alle jetzt blok-aware

| React-Datei | Storyblok-Block | Felder in Storyblok |
|-------------|----------------|---------------------|
| `ServicesCompare.js` | `services_compare` | `label`, `items` → `services_compare_card` |
| `FitTest.js` | `fit_test` | `label`, `headline`, `sub_headline`, `intro_text`, `intro_sub`, `fragen` → `fit_frage`, `ergebnisse` → `fit_ergebnis` |
| `TeamIntro.js` | `team_intro` | `label`, `headline`, `sub`, `dirk_runden` → `team_intro_runde`, `stan_runden`, `quiz_fragen` → `team_intro_quiz_frage` |
| `CheckTool.js` | `check_tool` | `questions` → `check_frage`, `profile_klarheit_*`, `profile_rapidbuild_*`, `profile_produkt_*`, `profile_urteil_*`, Label-Felder |
| `DirkProfile.js` | `dirk_profile` | `stations` → `dirk_station`, `projects` → `dirk_project`, `themes` → `dirk_theme` |

**Scoring-Algorithmus in `CheckTool.js` bleibt in JS** — nur die Texte sind in Storyblok.

### Nested-Komponenten (nicht-root, nicht direkt verwendbar)

`services_compare_card`, `fit_frage`, `fit_option`, `fit_ergebnis`, `team_intro_runde`, `team_intro_quiz_frage`, `check_frage`, `check_option`, `dirk_station`, `dirk_project`, `dirk_theme`

---

## Neue Inhalte anlegen — Checkliste

Bei jeder neuen Komponente mit sichtbarem Content:

1. **React-Komponente:** `{ blok = {} }` Prop, `parseX(blok.x)` Hilfsfunktionen, `DEFAULT_X` Fallback
2. **Storyblok-Schema:** Nested-Typen zuerst erstellen, dann Parent-Schema erweitern
3. **Migration-Script:** SEC-003-konform, mit `sleep(300)`, `--migrate-schema` Flag
4. **DynamicBlock.js:** neuen Block registrieren (falls über DynamicBlock gerendert)
5. **Script lokal ausführen** (aus Sandbox nicht erreichbar)
6. **PROJEKT.md** aktualisieren

---

## CSS — Konventionen

- **Eine Datei:** `app/globals.css` — kein CSS-in-JS, keine separaten Stylesheets
- **Namespaces pro Bereich:**
  - `sd-` Service-Detail, `sov-` Services-Übersicht
  - `lpv2-` / `lca-` Lab, `pm-` Produktmoment
  - `kw-` Kai-Widgets, `dp-` DirkProfile
  - `ti-` TeamIntro, `fit-` FitTest, `svc-` ServicesCompare
  - `check-` CheckTool, `lb-` LabBuilder
- **Design-Variablen:** `var(--charcoal)`, `var(--sage)`, `var(--ivory)`, `var(--mineral)`, `var(--stone)`, `var(--gutter)`, `var(--softline)`

---

## PROJEKT.md aktuell halten — Pflicht

Am Ende jeder Session mit relevanten Änderungen:

- Betreffenden Abschnitt in `PROJEKT.md` anpassen
- Offene Punkte-Tabelle aktualisieren (erledigt → ✅, neu entstanden → hinzufügen)
- Neue Komponenten / Scripts eintragen

**Was als relevant gilt:** neue Komponenten oder Seiten, CSS-Änderungen, Kai-System-Anpassungen, neue Scripts, gelöste oder neue offene Punkte, Konventionsänderungen.
