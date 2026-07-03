# CMS-001 – Storyblok-Zielarchitektur und Migrationsplan

## Status

| Feld | Inhalt |
|---|---|
| Ticket | CMS-001 |
| Datum | 2026-07-03 |
| Status | Abgeschlossen |
| Typ | Docs-only — keine Code-, CMS- oder Website-Änderungen |
| Baseline-Commit | `5ee73ee` — "docs: finalize IA-003e completion report" |
| Abschluss-Commit | wird nach Commit ergänzt |
| Push | Nein |
| Deploy | Nein |

## Ziel

Eine verbindliche Grundlage für die Storyblok-Migration schaffen: Route-Inventar, Zielarchitektur, Migrationsreihenfolge und Headless-Showcase-Konzept. Kein technischer Umbau — ausschliesslich Dokumentation.

## Erstellte Dokumente

| Datei | Zweck |
|---|---|
| `docs/storyblok/CMS-Zielarchitektur.md` | Route-Inventar, Rendering-Strategie pro Seite, vollständiges Zielmodell (Global Config, Seiten, Blöcke, Sammlungen, Hybrid-Komponenten, Governance) |
| `docs/storyblok/CMS-Migrationsplan.md` | Migrationsreihenfolge CMS-002 bis CMS-008 mit Scope, Code-Arbeit, Storyblok-Arbeit, Risiko und Abnahmekriterien pro Ticket |
| `docs/storyblok/Headless-Showcase-Konzept.md` | Konzept für Lab-Artikel: kenalu.ch als Headless-Arbeitsprobe — Gliederung, Ton, visuelle Elemente, Abgrenzung |
| `docs/IA-Aenderungsprotokoll.md` | Eintrag CMS-001 angefügt (append-only) |

## Die drei wichtigsten Architekturentscheidungen

### 1. Strikte Grenze: Inhalt vs. Logik

Storyblok steuert Inhalte, Reihenfolge und Konfiguration. Code steuert Verhalten, Sicherheit und Designsystem. Diese Grenze ist schriftlich festgehalten und pro Komponente definiert — besonders für FitTest, KaiDialogue, TeamIntro, CheckTool und ProductMomentBuilder.

### 2. `/about` als Pilot (CMS-002 erste Priorität)

Die staged Version von `/about` (8 Dateien) ist die am weitesten vorbereitete CMS-Migration. Sie ist der natürliche erste echte Migrationsschritt: minimales Risiko, maximaler Hebel für redaktionelle Autonomie und Showcase-Qualität.

### 3. Navigation via Storyblok (CMS-003 zweite Priorität)

Menüänderungen erfordern heute einen Code-Commit. `config/navigation` als Storyblok-Story gibt Dirk die Kontrolle, ohne einen Deploy auszulösen. Das ist der grösste redaktionelle Hebel nach `/about`.

## Empfohlener erster echter Migrationsschritt

**CMS-002 — `/about` deployen.**

Die technische Arbeit ist erledigt (8 staged Dateien). Was fehlt: Preview-Prüfung der Storyblok-Story `about`, vollständiges Ausfüllen aller Felder, lokaler Build-Check, dann Push und Story-Publish.

Zeitaufwand: 1–2 Arbeitssessions.

## Was nicht gemacht wurde

- Keine Storyblok-Stories, Schemas oder Inhalte erstellt, geändert oder publiziert
- Keine Scripts ausgeführt
- Keine Datei ausserhalb von `docs/` geändert
- Die acht staged Arbeitsweise-Dateien wurden nicht angetastet, unstaged, committed oder gepusht
- Keine sichtbare Website-Änderung
- Kein Push, kein Deploy

## Unangetastete staged Dateien

Folgende acht Dateien sind weiterhin staged und unverändert:

```text
app/about/page.js
components/DynamicBlock.js
components/blocks/WorkingBenefits.js
components/blocks/WorkingCta.js
components/blocks/WorkingPartners.js
components/blocks/WorkingSteps.js
components/blocks/WorkingTeamRef.js
components/blocks/WorkingWhy.js
```

## Rollback

Dieser Commit enthält ausschliesslich neue Markdown-Dateien in `docs/`. Rollback via `git revert [Commit-Hash]` entfernt alle vier erstellten Dokumente und den Changelog-Eintrag vollständig.

## Offene Punkte

Keine für dieses Ticket. Alle Folgepunkte sind in den erstellten Dokumenten beschrieben und den CMS-002 bis CMS-008 Tickets zugeordnet.

## Nächster Schritt

CMS-002 starten: Storyblok-Story `about` prüfen und vervollständigen, lokalen Build testen, dann die acht staged Dateien committen und deployen.
