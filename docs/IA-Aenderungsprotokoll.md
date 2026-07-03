# IA-Änderungsprotokoll – kenalu.ch

## Zweck und Regeln

Dieses Protokoll ist **append-only**. Keine Einträge werden gelöscht oder überschrieben.

Jede Änderung an der Informationsarchitektur, den Routen, der Navigation, Komponenten-Platzierungen oder Storyblok-Strukturen wird hier **vor der Umsetzung geplant** und **nach der Umsetzung mit dem tatsächlichen Ergebnis** abgeschlossen.

### Format eines Eintrags

```
## [IA-XXX] Kurztitel

| Feld | Inhalt |
|---|---|
| **Datum** | YYYY-MM-DD |
| **Initiiert von** | Dirk Fliescher / kenalu |
| **Typ** | Neue Seite / Slug-Änderung / Komponente hinzugefügt / Komponente entfernt / Navigation geändert / Archivierung / Dokumentation |
| **Status** | Geplant / In Bearbeitung / Abgeschlossen / Abgebrochen |
| **Baseline-Commit** | Git-Commit-Hash vor der Änderung |
| **Abschluss-Commit** | Git-Commit-Hash nach der Änderung (nur bei Abschluss) |

### Was und Warum

[Kurze Beschreibung der geplanten Änderung und der Begründung]

### Rollback-Weg

[Wie die Änderung rückgängig gemacht werden kann]

### Tatsächliches Ergebnis

[Nach Abschluss: Was genau umgesetzt wurde, was abweicht, was offen blieb]
```

---

## Einträge

---

## [IA-000] Dokumentations- und Rollback-Grundlage

| Feld | Inhalt |
|---|---|
| **Datum** | 2026-07-02 |
| **Initiiert von** | Dirk Fliescher / kenalu |
| **Typ** | Dokumentation |
| **Status** | Abgeschlossen |
| **Baseline-Commit** | `fd9160e8c84f186b3bb1a0d7014b3e8d685626df` |
| **Abschluss-Commit** | _(Docs-Commit ausstehend — siehe Anmerkung unten)_ |

### Was und Warum

Vollständige IA-Inventur der kenalu.ch-Website als Grundlage für alle zukünftigen Architekturveränderungen. Ziel: Kein Element darf verloren gehen, ohne dass es dokumentiert, bewusst depubliziert und explizit freigegeben wurde.

Die Inventur umfasst:
- Alle Seiten und Routen (inklusive versteckter wie `/check`)
- Alle React-Komponenten (aktiv, legacy, nicht eingebunden, deprecated)
- Alle Storyblok-Stories und Komponenten-Schemas
- Alle API-Routen und deren Status
- KAI-Landschaft mit allen Instanzen
- Bekannte Architekturprobleme
- Offene IA-Entscheidungen

Ergebnis: drei Dokumentationsdateien in `docs/`:
- `docs/ia-inventur-2026-07.md` — vollständiger Rohinventar-Bericht (untracked, zu commiten)
- `docs/Informationsarchitektur.md` — strukturierte IA-Übersicht (dieses Dokument)
- `docs/Komponenten-Inventar.md` — vollständiges Komponenten-Inventar
- `docs/IA-Aenderungsprotokoll.md` — dieses Änderungsprotokoll

### Was nicht gemacht wurde

- Keine sichtbaren Website-Änderungen
- Keine Storyblok-Bearbeitungen
- Keine Skript-Ausführungen
- Keine Slug-Änderungen
- Kein Löschen von Dateien oder Komponenten
- Kein Commit (Begründung siehe unten)

### Rollback-Weg

Keine Rollback-Aktion nötig, da ausschliesslich Dokumentationsdateien erstellt wurden. Die drei Dateien können jederzeit gelöscht werden, ohne die Website zu beeinflussen.

### Anmerkung: Git-Commit-Situation

Ein sauberer docs-only Commit war zum Zeitpunkt der Erstellung **nicht möglich**, weil aus einer früheren Session bereits 8 Dateien staged waren:

```
app/about/page.js
components/DynamicBlock.js
components/blocks/WorkingBenefits.js
components/blocks/WorkingCta.js
components/blocks/WorkingPartners.js
components/blocks/WorkingSteps.js
components/blocks/WorkingTeamRef.js
components/blocks/WorkingWhy.js
```

Diese 8 Dateien sind Teil des /about-Arbeitsweise-Umbaus (ein separater, inhaltlicher Commit). Laut expliziter Instruktion dürfen keine fremden oder unklaren Arbeitsstände gemischt werden. Deshalb: **kein Commit erstellt.**

Empfehlung: Zuerst die 8 staged Dateien in einem eigenen Commit abschliessen (`about: Storyblok-basierte Arbeitsweise`), dann die 4 Dokumentationsdateien separat committen mit:

```
git add docs/ia-inventur-2026-07.md docs/Informationsarchitektur.md docs/Komponenten-Inventar.md docs/IA-Aenderungsprotokoll.md
git commit -m "docs: establish IA baseline and rollback protocol"
```

---

---

## [IA-001] Baseline gesichert und Dokumentation konsolidiert

| Feld | Inhalt |
|---|---|
| **Datum** | 2026-07-02 |
| **Initiiert von** | Dirk Fliescher / kenalu |
| **Typ** | Dokumentation / Sicherung |
| **Status** | Abgeschlossen |
| **Baseline-Commit** | `ac4e7bc4c4e650abb15628c93fe9cc828564e74d` (lokal HEAD, 1 ahead of origin) |
| **Abschluss-Commit** | `2d11c162826bbbf24cbafeb4c50b799deda4d869` — "docs: reconcile IA baseline and preserve rollback state" |

### Was und Warum

Die Dokumentation aus IA-000 wurde auf Basis direkter Code-Prüfung korrigiert und konsolidiert. Mehrere Fehler in der initialen Dokumentation wurden identifiziert und behoben. Die Dokumente wurden in aktuelle Referenzdokumente, historische Umsetzungsnotizen und technische Sicherungen getrennt.

Korrekturen gegenüber IA-000:
- `/about` in Produktion: STATISCH (nicht Storyblok-gesteuert). Working\*-Komponenten mit hardcodiertem Content sind live. Die staged Storyblok-First-Version ist noch nicht committed.
- `CollaborationIntro.js`: NICHT eingebunden — kein Import in keiner Seite (war fälschlicherweise als aktiv dokumentiert)
- `ServiceDetailPage.js`: NICHT eingebunden — kein Import in keiner Service-Seite
- `/api/qualify`: LIVE (nicht deprecated) — aktiv aufgerufen von `ContactBookingWidget.js` auf `/contact`
- KAI auf `/about`: nicht live, nur für staged Storyblok-Version geplant
- `globals 2.css`: bestätigt nicht importiert, kein Einfluss auf Build

### Was nicht gemacht wurde

- Keine sichtbaren Website-Änderungen
- Keine Storyblok-Bearbeitungen
- Kein Script ausgeführt
- Keine Komponente geändert
- Keine API geändert
- Keine CSS-Datei geändert
- Keine staged Dateien verändert, unstaged oder committed
- Keine Slugs oder Navigation geändert

### Rollback-Weg

Der lokale HEAD `ac4e7bc` ist über den Branch `archive/ia-prework-2026-07-02` referenziert. Staged Änderungen (8 Working\*-Dateien) sind als Patch unter `docs/rollback/2026-07-02-ia-001/staged-changes-before.patch` gesichert. Alle Dokumentationsänderungen dieses Tickets können über den Abschluss-Commit `git revert` oder `git reset` zurückgedreht werden.

### Tatsächliches Ergebnis

- IA-001b (Folgeticket) hat verbliebene Dokumentationswidersprüche bereinigt und den finalen Baseline-Commit abgeschlossen.
- `docs/rollback/2026-07-02-ia-001/` angelegt mit 6 Snapshot-Dateien
- Branch `archive/ia-prework-2026-07-02` auf HEAD `ac4e7bc` gesetzt
- `docs/Informationsarchitektur.md`: Dokumentenstatus-Abschnitt, Markenlogik, /about-Korrektur, KAI-Korrektur, CollaborationIntro-Korrektur
- `docs/Komponenten-Inventar.md`: CollaborationIntro, ServiceDetailPage, /api/qualify, alle Empfehlungsformulierungen korrigiert, Statusübersicht neu gegliedert
- `docs/IA-Aenderungsprotokoll.md`: Eintrag IA-001 (dieser Eintrag)
- 9 historische Umsetzungsnotizen: Statushinweis nach H1 eingefügt
- `docs/ia-inventur-2026-07.md`: Statushinweis eingefügt

---

---

## [IA-001b] Dokumentationsabschluss und Baseline-Commit

| Feld | Inhalt |
|---|---|
| **Datum** | 2026-07-02 |
| **Initiiert von** | Dirk Fliescher / kenalu |
| **Typ** | Dokumentation / Konsolidierung |
| **Status** | Abgeschlossen |
| **Baseline-Commit** | `2d11c162826bbbf24cbafeb4c50b799deda4d869` (HEAD vor diesem Commit) |
| **Abschluss-Commit** | `f9524da` — "docs: finalize IA baseline and clarify live vs staged state" |

### Was und Warum

Bereinigung verbliebener Widersprüche aus IA-001. Insbesondere:
- Navigationstabelle: `/about` korrekt als statisch live dokumentiert (war fälschlicherweise als "Storyblok → DynamicBlock / leer" eingetragen)
- Rendering-Architektur: `/about` aus der Storyblok-Seiten-Liste entfernt, eigene Kategorie für geplante Umbauten ergänzt
- Architekturproblem 7: Von "Seite zeigt leeren Content" auf "Produktion statisch live, Storyblok-Variante staged" korrigiert
- Working\*-Komponenten-Sektion: Zwei Versionen (A live / B staged) klar getrennt
- Vercel Production Deploy: Explizit als "Zu verifizieren" dokumentiert

### Rollback-Weg

Der ursprüngliche lokale HEAD ist weiterhin über `archive/ia-prework-2026-07-02` referenziert. Staged Arbeitsweise-Änderungen bleiben unverändert und über den Patch in `docs/rollback/2026-07-02-ia-001/` gesichert. Dieser Dokumentations-Commit kann separat mit `git revert <commit-hash>` zurückgenommen werden.

### Tatsächliches Ergebnis

Commit `f9524da` enthält ausschliesslich Änderungen unter `docs/`. Die 8 staged Arbeitsweise-Dateien sind unverändert und weiterhin staged. Alle Dokumentationswidersprüche zu `/about`, den Working\*-Komponenten und dem Vercel-Production-Status sind bereinigt. Die IA-Baseline ist formal abgeschlossen.

---

---

## [IA-002] Arbeitsweise und Über kenalu – Vergleich, Seitenrollen und Entscheidungsgrundlage

| Feld | Inhalt |
|---|---|
| **Datum** | 2026-07-02 |
| **Initiiert von** | Dirk Fliescher / kenalu |
| **Typ** | Analyse / Dokumentation |
| **Status** | Abgeschlossen |
| **Baseline-Commit** | `f9524da` (HEAD, lokal, 3 ahead of origin/main) |
| **Abschluss-Commit** | _(Docs-Commit ausstehend — lokal ausführen, siehe unten)_ |

### Was und Warum

Reine Analyse der Produktionsseiten `/about` und `/team` sowie der nicht eingebundenen Komponenten `FitTest.js` und `CollaborationIntro.js`. Ziel: klare Seitenrollen definieren, Entscheidungsgrundlage für die nächsten Schritte schaffen.

Keine sichtbaren Website-Änderungen, keine Storyblok-Änderungen, kein Deploy.

### Umfang der Analyse

- **Tabelle A:** Produktion /about — alle 7 Sektionen (Komponente / Inhalt / Seitenrolle / Zielgruppe / Empfehlung)
- **Tabelle B:** Produktion vs. Staged /about — Vergleich Rendering, Content-Quelle, Deploy-Bereitschaft
- **Tabelle C:** Produktion /team — alle 6 Elemente (Sektionsanalyse)
- **Tabelle D:** Seitenrollen-Definition für /about und /team, inklusive Abgrenzungstabelle
- **Tabelle E:** FitTest.js, CollaborationIntro.js und TeamIntro.js — Platzierungs-Evaluation
- **Abschnitt F:** 5 offene Entscheidungen mit Priorität und Abhängigkeiten

Vollständiger Abschlussbericht: `docs/ia-002-arbeitsweise-analyse.md`

### Kernerkenntnisse

- /about und /team haben unterschiedliche aber komplementäre Rollen (Arbeitsweise vs. Team-Kennenlernen). Die Abgrenzung ist bereits implizit klar, sollte aber explizit in der Architektur verankert werden.
- `/team` verlinkt auf `/about#mitwirken` — dieser Anker existiert nicht. `CollaborationIntro.js` + `FitTest.js` würden diese Lücke schliessen.
- `FitTest.js` gehört thematisch auf `/about` (Mitwirken-Bereich), nicht auf `/team`.
- `CollaborationIntro.js` ist der natürliche Section-Header vor `FitTest.js`.
- Die staged Storyblok-Variante von `/about` ist **nicht deploy-bereit** — `scripts/rebuild-about-arbeitsweise.js` muss zuerst lokal ausgeführt werden.
- `TeamIntro.js` nutzt legacy `/api/team-chat` (nicht `/api/kai`) — bekanntes Problem, kein sofortiger Handlungsbedarf.

### Was nicht gemacht wurde

- Keine sichtbaren Website-Änderungen
- Keine Storyblok-Bearbeitungen
- Kein Script ausgeführt
- Keine Komponente geändert, hinzugefügt oder entfernt
- Keine staged Dateien verändert, unstaged oder committed
- Kein Deploy, kein Push

### Rollback-Weg

Ausschliesslich Dokumentation. Die Datei `docs/ia-002-arbeitsweise-analyse.md` kann jederzeit gelöscht werden, ohne die Website zu beeinflussen.

### Commit (lokal ausführen)

```
cd /Users/dirkfliescher/Documents/kenalu-website
git add docs/ia-002-arbeitsweise-analyse.md docs/IA-Aenderungsprotokoll.md
git commit docs/ia-002-arbeitsweise-analyse.md docs/IA-Aenderungsprotokoll.md -m "docs: define working method and about page roles"
```

### Tatsächliches Ergebnis

_(Nach Commit ausfüllen)_

---

---

## [IA-003a] FitTest auf Über kenalu lokal eingebunden

| Feld | Inhalt |
|---|---|
| **Datum** | 2026-07-02 |
| **Initiiert von** | Dirk Fliescher / kenalu |
| **Typ** | Komponente eingebunden / IA-Umsetzung |
| **Status** | Lokal umgesetzt, Veröffentlichung ausstehend |
| **Baseline-Commit** | `0d2a254135da63c2ae2045522c6398f457439bc1` — "docs: define working method and about page roles" |
| **Abschluss-Commit** | _(nach lokalem Commit ergänzen)_ |

### Was und Warum

Der eigenständige FitTest wird als Mitwirken-Bereich auf `/team` eingebunden. `/about` bleibt die reine Kunden- und Arbeitsweise-Seite. Bestehende aktive Mitwirken-Links werden bereinigt.

Seitenrollen (verbindlich ab diesem Ticket):
- `/about`: Wie kenalu arbeitet — für potenzielle Kunden
- `/team`: Wer hinter kenalu steht, wie Zusammenarbeit funktioniert und ob diese Art zu jemandem passt

### Umfang der Änderungen

**`app/team/page.js`:**
- Imports: `CollaborationIntro` und `FitTest` hinzugefügt; `Link` (nicht mehr benötigt) entfernt
- Neuer Abschnitt `<section id="mitwirken">` mit `CollaborationIntro` und `FitTest`, nach Storyblok-PageBlocks, vor KaiDialogue
- Alter Mitwirken-Teaser (mit kaputtem Link `/about#mitwirken`) entfernt

**Angepasste aktive Links:**
- `app/team/page.js:121` — `<Link href="/about#mitwirken">` — **entfernt** (war Teil des alten Mitwirken-Teasers; der Link existierte im Code, führte aber zu einem nicht existierenden Anker). Durch `id="mitwirken"` auf der gleichen Seite ersetzt.

**Keine Änderungen an:**
- `app/about/page.js` (unverändert — weder staged noch working-tree)
- `app/globals.css` (alle benötigten CSS-Klassen bereits vorhanden)
- Storyblok, Scripts, API-Routen, Navigation, Footer, KAI-Logik
- `FitTest.js`, `CollaborationIntro.js` (Komponentendateien unverändert)
- Die 8 staged Arbeitsweise-Dateien (unverändert und weiterhin staged)

### Rollback-Weg

Der isolierte Commit kann mit `git revert <commit-hash>` vollständig zurückgenommen werden. Die acht staged Arbeitsweise-Dateien bleiben unverändert und sind nicht Teil dieses Commits. `FitTest.js` und `CollaborationIntro.js` bleiben als Dateien erhalten.

### Commit (lokal ausführen)

```bash
cd /Users/dirkfliescher/Documents/kenalu-website
git add app/team/page.js docs/Informationsarchitektur.md docs/Komponenten-Inventar.md docs/IA-Aenderungsprotokoll.md
git commit --only -m "feat: restore fit test in team collaboration section" -- \
  app/team/page.js \
  docs/Informationsarchitektur.md \
  docs/Komponenten-Inventar.md \
  docs/IA-Aenderungsprotokoll.md
```

### Tatsächliches Ergebnis

_(Nach Commit und visueller QA ausfüllen)_

---

---

## [IA-003b] Commit-Referenz FitTest-Einbindung

| Feld | Inhalt |
|---|---|
| **Datum** | 2026-07-02 |
| **Initiiert von** | Dirk Fliescher / kenalu |
| **Typ** | Dokumentation |
| **Status** | Abgeschlossen |
| **Referenz-Commit** | `9cae2b4` |

### Was und Warum

Referenziert den isolierten lokalen Commit für die Einbindung von CollaborationIntro und FitTest auf `/team#mitwirken`.

### Rollback-Weg

`git revert 9cae2b4`

### Tatsächliches Ergebnis

Die acht staged Arbeitsweise-Dateien blieben unverändert und waren nicht Teil des Commits. Kein Push, kein Deploy und keine Storyblok-Änderung.

---

---

## [IA-003c] Mitwirken-Dramaturgie auf Über kenalu verfeinert

| Feld | Inhalt |
|---|---|
| **Datum** | 2026-07-03 |
| **Initiiert von** | Dirk Fliescher / kenalu |
| **Typ** | Inhaltliche Reihenfolge / Komponentenkonfiguration |
| **Status** | Lokal umgesetzt, Veröffentlichung ausstehend |
| **Baseline-Commit** | `d92c0c4f6b3a1ba1a84c01a0d0fb7be2d90026da` |
| **Abschluss-Commit** | _(nach Commit ergänzen)_ |

### Was und Warum

Der Mitwirken-Bereich mit CollaborationIntro und FitTest bleibt auf `/team#mitwirken`. Der allgemeine Gesprächs-CTA ("Bereit für ein Gespräch?", aus Storyblok PageBlocks) wird ans tatsächliche Seitenende verschoben. KaiDialogue rückt als persönliches/interaktives Element vor den Mitwirken-Bereich. Der redundante Kontakt-Link im Mitwirken-Intro entfällt (via `ctaLabel={null}`). Das FitTest-Label wird präzisiert, damit die Frage "Passt du zu der Art, wie wir arbeiten?" nicht unmittelbar zweimal erscheint.

### Änderungen

- `app/team/page.js`: Reihenfolge KaiDialogue → Mitwirken → PageBlocks (war: TeamIntro → PageBlocks → Mitwirken → KaiDialogue). CollaborationIntro mit `ctaLabel={null}` aufgerufen.
- `components/blocks/FitTest.js`: section-label von "Passt du zu der Art, wie wir arbeiten?" → "Eine ehrliche Einschätzung."
- `CollaborationIntro.js`: keine Änderung (CTA bereits per Prop steuerbar).

### Hinweis zur h2 in FitTest

Die h2 lautet `6 Fragen. / Eine ehrliche Einschätzung.` (zweizeilig). Nach der Label-Änderung lautet das Label ebenfalls "Eine ehrliche Einschätzung." — dies ist eine bewusste Wiederholung in unterschiedlichen Hierarchieebenen (label vs. h2) und visuell durch die CSS-Gewichtung differenziert.

### Rollback-Weg

`git revert [Commit-Hash]`

### Tatsächliches Ergebnis

_(Nach Commit und QA ausfüllen)_

---

_Ende der bestehenden Einträge. Neue Einträge werden unten angefügt._
