# CMS-002a — Arbeitsweise-Draft in Storyblok aufgebaut

## Status

| Feld | Inhalt |
|---|---|
| Ticket | CMS-002a |
| Datum | 2026-07-03 |
| Status | ✅ Abgeschlossen — lokale Preview bestätigt durch Dirk Fliescher |
| Typ | CMS-Draft / Lokale Preview |
| Baseline-Commit | `2d93bb5` — "docs: define Storyblok-first target architecture" |
| Abschluss-Commit | `e90d3ca` — "docs: prepare Storyblok draft for working method pilot" |
| Push | Nein |
| Deploy | Nein |
| Storyblok Publish | Nein |

---

## Analyse der staged Dateien

### `app/about/page.js` (staged)

- Lädt Story `cdn/stories/about`
- `version: 'draft'` in Development, `version: 'published'` in Production
- `body = content?.body || []` — sicherer Fallback auf leeres Array
- Rendert alle Blöcke via `DynamicBlock`
- Kein `page_hero`-Filter, kein Block-Ausschluss (anders als `/team`)

### `components/DynamicBlock.js` (staged)

Alle sieben erlaubten Komponenten sind registriert:

| Storyblok-Key | Registriert | React-Komponente |
|---|---|---|
| `page_hero` | ✅ | `PageHero.js` |
| `working_why` | ✅ | `WorkingWhy.js` |
| `working_steps` | ✅ | `WorkingSteps.js` |
| `working_benefits` | ✅ | `WorkingBenefits.js` |
| `working_team_ref` | ✅ | `WorkingTeamRef.js` |
| `working_partners` | ✅ | `WorkingPartners.js` |
| `working_cta` | ✅ | `WorkingCta.js` |

`page_hero` ist in `NO_REVEAL`-Set — rendert ohne Scroll-Animation.

### Fallbacks bei leeren Feldern

Alle Felder in allen Komponenten sind mit `&&` conditional gerendert. Leere Felder verschwinden, führen nie zum Absturz.

---

## Storyblok-Backup

Backup-Verzeichnis: `docs/rollback/2026-07-03-cms-002a/`

| Datei | Inhalt | Status |
|---|---|---|
| `about-story-before.json` | Aktueller Storyblok-Zustand der `about`-Story | ✅ Vorhanden |
| `working-schema-before.json` | Aktuelle `working_*`-Schemas | ✅ Vorhanden |
| `storyblok-write-plan.md` | Was das Build-Script verändert | ✅ Vorhanden |

---

## Erstellte Scripts

Beide Scripts liegen in `scripts/` (gitignored, nie committen):

| Script | Zweck |
|---|---|
| `scripts/cms-002a-backup.js` | Sichert aktuelle `about`-Story und Schemas nach `docs/rollback/` |
| `scripts/cms-002a-build-draft.js` | Upsert Schemas + baut Draft (kein Publish) |

---

## Ausführungsreihenfolge (lokal durch Dirk)

```bash
# 1. Backup
node scripts/cms-002a-backup.js

# 2. Draft aufbauen
node scripts/cms-002a-build-draft.js

# 3. Lokale Preview
npm run dev
# → http://localhost:3000/about

# 4. Storyblok Visual Editor
# Story "about" → Draft-Modus → alle 7 Blöcke prüfen
```

---

## Erwartetes Draft-Ergebnis

7 Blöcke in dieser Reihenfolge:

1. `page_hero` — "Wie wir arbeiten, ist Teil des Ergebnisses."
2. `working_why` — "Gute Entscheidungen verlieren Wirkung..."
3. `working_steps` — 4 nummerierte Schritte (01–04)
4. `working_benefits` — 4 Kundennutzen-Kacheln
5. `working_team_ref` — Dirk + Stanislav, Link zu /team
6. `working_partners` — "Die richtige Tiefe, wenn sie wirklich nötig ist."
7. `working_cta` — "Gespräch starten →" + "Leistungen ansehen →"

---

## Lokales Build- und Preview-Ergebnis

| Prüfpunkt | Status |
|---|---|
| `node scripts/cms-002a-backup.js` | ✅ |
| `node scripts/cms-002a-build-draft.js` | ✅ |
| `npm run dev` — lokaler Start | ✅ |
| Alle 7 Abschnitte sichtbar | ✅ |
| Verbotene Blöcke nicht sichtbar | ✅ |
| Mobile ca. 390 px | ✅ |
| Storyblok Visual Editor Draft-Check | ✅ |

---

## Was nicht verändert wurde

- Öffentliche Produktionsseite `/about` (statisch, unverändert)
- Die 8 staged Dateien: unberührt, staging status unverändert
- Keine Navigation, Footer, API, CSS, SEO
- Keine anderen Routen oder Stories
- Kein Push, kein Deploy, kein Publish

---

## Rollback

Die Story `about` bleibt unveröffentlicht. Kein Rollback nötig für die Produktionsseite.

Falls der Draft-Inhalt in Storyblok wiederhergestellt werden muss:
```
docs/rollback/2026-07-03-cms-002a/about-story-before.json
```
manuell im Storyblok-Editor eintragen oder via API-Script zurückschreiben.

---

## Offene Risiken

| Risiko | Wahrscheinlichkeit | Massnahme |
|---|---|---|
| `working_*`-Schemas existieren nicht mehr | Niedrig (wurden früher erstellt) | Build-Script erstellt sie neu via `upsertComponent` |
| `about`-Story-Body hat andere Struktur als erwartet | Niedrig | Script überschreibt Body explizit |
| Draft wird versehentlich publisht | Sehr niedrig | Script setzt kein `publish: 1` |
| `npm run dev` schlägt fehl wegen Storyblok-Fehler | Möglich | `body = []` Fallback → leere Seite, kein Absturz |

---

## Empfehlung für CMS-002b

Nach erfolgter lokaler Preview und Abnahme:

1. Story `about` in Storyblok manuell publishen
2. Die 8 staged Dateien committen: `feat: enable storyblok-first on /about`
3. `git push origin main`
4. Vercel deployt automatisch
5. `https://www.kenalu.ch/about` prüfen (ISR, 60s)
