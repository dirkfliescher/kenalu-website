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

_Ende der bestehenden Einträge. Neue Einträge werden unten angefügt._
