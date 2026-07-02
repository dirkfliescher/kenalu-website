# Kenalu Lab Recovery – Juni 2026

> **Status: Historische Umsetzungsnotiz.**
> Diese Datei beschreibt einen früheren Arbeitsstand oder eine damalige Entscheidung.
> Sie ist nicht automatisch ein Abbild des aktuellen Live-, Code- oder Storyblok-Zustands.
> Aktueller Referenzpunkt: `docs/Informationsarchitektur.md`.

## 1. Ziel

Das Lab war im Lauf der Service-Überarbeitung aus der Navigation gefallen und auf der Lab-Startseite mit einem veralteten Builder-Block belastet worden, der öffentlich sichtbar war. Ziel dieses Eingriffs war:

- Lab wieder in Navigation und Footer aufnehmen
- Lab-Startseite komplett neu aufbauen (klare Struktur, keine unvollständigen Builder-Elemente öffentlich)
- Den bestehenden Artikel kenalu.ch schärfen und als Featured Work Sample präsentieren
- Auf /about und /insights kleine Lab-Verweise ergänzen

---

## 2. Was sich verändert hat

### Navigation und Footer

| Datei | Änderung |
| ----- | -------- |
| `components/Nav.js` | `{ href: '/lab', label: 'Lab' }` zwischen Arbeitsweise und Insights ergänzt |
| `components/Footer.js` | `<li><Link href="/lab">Lab</Link></li>` zwischen Team und Insights ergänzt |

### Lab-Startseite

`app/lab/page.js` wurde vollständig neu geschrieben. Die alte Version enthielt `LabBuilder`, Storyblok-Content-Fetching für Cases und einen unvollständigen Featured-Teaser aus einem früheren Arbeitsschritt.

**Neue Struktur:**

| Sektion | Klassen | Inhalt |
| ------- | ------- | ------ |
| Hero | `lpv2-hero` | Eyebrow "Lab", H1, Einleitungstext |
| Featured Work Sample | `lpv2-featured`, `lfw-*` | kenalu.ch Artikel mit 3 Highlights + visuelle Arbeitsprobe |
| Weitere im Lab | `lpv2-more` | H2 + Text, noch keine weiteren Einträge |
| In Vorbereitung | `lpv2-preparing` | Ruhiger Platzhalter-Block |
| Abschluss-CTA | `lpv2-cta` | H2 + Text + Link zu /contact |

**Was entfernt wurde:**
- `LabBuilder` Komponente (Datei bleibt, ist aber nicht mehr auf der öffentlichen Seite sichtbar)
- Storyblok-Fetch für alte Case-Blöcke
- Alter "Projekt 01 / Projekt 02"-Fallback-Block
- Kai-Dialog auf der Lab-Übersicht (gemäss Spec: kein Kai auf der Übersicht)

### Lab-Artikel kenalu.ch

`app/lab/kenalu-website/page.js` — keine Änderungen notwendig. Der Artikel war bereits vollständig und korrekt:

- 8 Sektionen (Hero, Ausgangslage, Entscheidung, 3 Highlights, Übertragbar, Transparenz, CTA)
- Kein Stack-Protzerei, kein fiktiver Case
- Transparenzhinweis sauber formuliert ("Eine Arbeitsprobe, keine Kundenreferenz")
- `generateMetadata()` mit Storyblok-Fallback

### Lab-Verweise auf anderen Seiten

| Seite | Ort | Inhalt |
| ----- | --- | ------ |
| `app/about/page.js` | Nach `afterMitwirken`-Blöcken (Ende der Seite) | `lab-ref-strip` mit Eyebrow, Text, Link zu /lab |
| `app/insights/page.js` | Nach `bottomBlocks` (Ende der Seite) | `lab-ref-strip` mit Eyebrow, Text, Link zu /lab (insights-spezifischer Text) |

---

## 3. CSS-Präfixe

| Prefix | Datei | Zweck |
| ------ | ----- | ----- |
| `lpv2-*` | `globals.css` | Lab-Startseite v2 — Sektionsstruktur |
| `lfw-*` | `globals.css` | Featured Work Sample (Inhalt + visuelle Arbeitsprobe) |
| `lab-ref-strip` | `globals.css` | Kleiner Lab-Verweis auf /about und /insights |
| `lca-*` | `globals.css` | Lab-Artikel kenalu.ch (unverändert) |

---

## 4. Visuelle Arbeitsprobe auf der Lab-Startseite

Die `FeaturedVisual`-Komponente in `app/lab/page.js` ist eine semantische HTML-Struktur mit drei verbundenen Nodes:

- **Orientierung** — Situationen und Entscheidungen statt Leistungslisten
- **Dialog** — Kai dort, wo Lesen allein nicht reicht
- **Weiterentwicklung** — Grundlage, die mitwächst ohne Neustart

Zugänglichkeit: `role="img"` + `aria-label` auf dem Wrapper. Verbindungspfeile (`→`) mit `aria-hidden="true"`.

---

## 5. Qualitätssicherung

| Prüfpunkt | Status |
| --------- | ------ |
| Lab in Navigation sichtbar | ✓ |
| Lab in Footer sichtbar | ✓ |
| Kein LabBuilder auf der öffentlichen Seite | ✓ |
| Kein Kai-Dialog auf der Lab-Übersicht | ✓ |
| Genau eine H1 auf Lab-Startseite | ✓ |
| Visuelle Arbeitsprobe mit role + aria-label | ✓ |
| Artikel kenalu.ch erreichbar unter /lab/kenalu-website | ✓ (unverändert) |
| Keine Kundenreferenzen, keine erfundenen Zahlen | ✓ |
| Lab-Verweis auf /about | ✓ |
| Lab-Verweis auf /insights | ✓ |
| Lint: keine neuen Fehler in neuen Dateien | ✓ |
| Build-Check lokal | Muss mit `npm run build` geprüft werden |

---

## 6. Storyblok

Die neue Lab-Startseite fetcht **keine** Storyblok-Inhalte mehr. Alle Inhalte sind hardcoded im JSX. Der `metadata`-Export ist statisch.

Der Lab-Artikel `app/lab/kenalu-website/page.js` fetcht weiterhin SEO-Felder aus Storyblok (`lab/kenalu-website`) mit Fallback auf `SEO_DEFAULTS`. Das Setup-Script `scripts/setup-lab-kenalu.mjs` existiert und kann bei Bedarf ausgeführt werden.

---

## 7. Deploy-Befehle

```bash
cd /Users/dirkfliescher/Documents/kenalu-website

npm run lint
npm run build

git add -A
git commit -m "feat: Lab Recovery – Navigation, neue Startseite, Featured Work Sample, Lab-Verweise"
git push origin main
```

---

## 8. Neue Dateien

| Datei | Art |
| ----- | --- |
| `app/lab/page.js` | Vollständig neu (ersetzt vorherige Version) |
| `docs/kenalu-lab-recovery-2026-06.md` | Neue Dokumentation |

## Geänderte Dateien

| Datei | Änderung |
| ----- | -------- |
| `components/Nav.js` | Lab-Link ergänzt |
| `components/Footer.js` | Lab-Link ergänzt |
| `app/about/page.js` | `lab-ref-strip` am Ende ergänzt |
| `app/insights/page.js` | `Link`-Import + `lab-ref-strip` am Ende ergänzt |
| `app/globals.css` | `lab-ref-strip` + `lpv2-*` + `lfw-*` Klassen ergänzt |
