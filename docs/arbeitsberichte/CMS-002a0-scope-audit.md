# CMS-002a0 — Scope-Audit und Draft-Sicherheitsprüfung

## Status

| Feld | Wert |
|---|---|
| Ticket | CMS-002a0 |
| Datum | 2026-07-03 |
| Status | Abgeschlossen — keine Storyblok-Änderung erfolgt |
| Lokaler HEAD | `3125371d4e0e0ad9542728a93efdc8a6a4775a8d` |
| origin/main | `3125371d4e0e0ad9542728a93efdc8a6a4775a8d` |
| Push | Nein (origin/main war bereits synchron) |
| Deploy | Nein |

---

## Arbeitsbaum vor der Prüfung

| Status | Dateien | Bedeutung |
|---|---|---|
| Staged, geschützt | 8 Dateien (siehe unten) | Bestehende Arbeitsweise-Migration, nicht committed |
| Unstaged | — | Keine |
| Untracked | — | Keine |
| Bereits committed | `3125371`, `e90d3ca`, `2d93bb5` | Docs-Commits CMS-001 + CMS-002a |

HEAD und origin/main sind identisch — der Push wurde durch den Nutzer lokal ausgeführt.

---

## Geschützte Arbeitsweise-Dateien

Alle acht Dateien sind staged (Index `M `) und unverändert. Kein unstaged diff vorhanden.

| # | Datei | Status im Index |
|---|---|---|
| 1 | `app/about/page.js` | staged (M) |
| 2 | `components/DynamicBlock.js` | staged (M) |
| 3 | `components/blocks/WorkingBenefits.js` | staged (M) |
| 4 | `components/blocks/WorkingCta.js` | staged (M) |
| 5 | `components/blocks/WorkingPartners.js` | staged (M) |
| 6 | `components/blocks/WorkingSteps.js` | staged (M) |
| 7 | `components/blocks/WorkingTeamRef.js` | staged (M) |
| 8 | `components/blocks/WorkingWhy.js` | staged (M) |

---

## Gefundene CMS-002a-Artefakte

| Datei | Status | Zweck laut Code | Darf vor Freigabe ausgeführt werden? |
|---|---|---|---|
| `scripts/cms-002a-backup.js` | Vorhanden (gitignored) | Liest About-Story und Working-Schemas via Management API, speichert JSON in `docs/rollback/` — kein Write | Ja (read-only) |
| `scripts/cms-002a-build-draft.js` | Vorhanden (gitignored) | Upsert Working-Schemas + Story-Body als Draft (kein Publish) | Bereits ausgeführt, lokale Preview bestätigt |
| `scripts/rebuild-about-arbeitsweise.js` | Vorhanden (gitignored) | Wie build-draft, aber mit `publish: 1` — publiziert sofort | **Nein — publiziert ohne Abnahme** |

---

## Script-Prüfung

### `scripts/cms-002a-backup.js`

| Kriterium | Befund |
|---|---|
| Liest Storyblok | Ja — GET `/stories/?with_slug=about` + GET `/stories/{id}` + GET `/components/` |
| Schreibt Storyblok | Nein |
| Ändert Schemas | Nein |
| Erstellt/ändert Story | Nein |
| Publish möglich | Nein — kein Publish-Parameter |
| Rollback-Verhalten | Erstellt Backup, kein Rollback nötig |
| Ausführungsreife | Bereits ausgeführt. Ergebnis: `docs/rollback/2026-07-03-cms-002a/about-story-before.json` + `working-schema-before.json` committed |
| API-Token im Code | Ja — `sb_pat_mYxx...` hardcoded. Script ist gitignored. Kein Token in Git-History. |
| Fehlerverhalten | Wirft Fehler wenn Story nicht gefunden — bricht ab |

### `scripts/cms-002a-build-draft.js`

| Kriterium | Befund |
|---|---|
| Liest Storyblok | Ja — `listComponents()` + `getStory('about')` |
| Schreibt Storyblok | Ja — `updateComponent` / `createComponent` + `saveDraft` |
| Ändert Schemas | Ja — `upsertComponent` für 6 Working-Schemas |
| Schema-Update-Art | **Vollständige Überschreibung** — `updateComponent` sendet das gesamte `schema`-Objekt via PUT. Nicht additiv. Felder, die im Script nicht definiert sind, würden entfernt. |
| Erstellt/ändert Story | Ja — `saveDraft` ersetzt `content.body` der Story `about` |
| Publish möglich | **Nein** — `saveDraft` enthält kein `publish: 1`. Verifiziert in Zeilen 79–93. Kommentar: "Kein 'publish: 1' — bewusst weggelassen" |
| Backup vor Schreiben | Nein — Script prüft nicht, ob Backup existiert. Setzt voraus, dass `cms-002a-backup.js` vorher ausgeführt wurde. Keine technische Absicherung. |
| Fehlerverhalten | `createComponent`/`updateComponent`: wirft bei `data.error`. `saveDraft`: wirft wenn kein `data.story`. Fehler stoppen die Ausführung zuverlässig. |
| API-Token im Code | Ja — `sb_pat_mYxx...` hardcoded. Script ist gitignored. |
| Ausführungsreife | Bereits ausgeführt. Lokale Preview bestätigt ("bestätigt."). |

### `scripts/rebuild-about-arbeitsweise.js`

| Kriterium | Befund |
|---|---|
| Liest Storyblok | Ja |
| Schreibt Storyblok | Ja |
| Ändert Schemas | Ja — identisches `upsertComponent`-Pattern (vollständige Überschreibung) |
| Erstellt/ändert Story | Ja |
| **Publish möglich** | **Ja — `publish: 1` in `updateStory` (Zeile 78): `body: JSON.stringify({ story, publish: 1 })`** |
| Backup vor Schreiben | Nein — kein Backup-Mechanismus |
| Fehlerverhalten | Wirft bei fehlgeschlagenem Story-Update |
| API-Token im Code | Ja — `sb_pat_mYxx...` hardcoded. Script ist gitignored. |
| Ausführungsreife | **Nicht ausführen.** Publiziert die Story `about` sofort ohne Abnahme. |

---

## Draft-Preview-Prüfung

### Technischer Mechanismus

Die staged `app/about/page.js` (Index-Version) enthält:

```javascript
version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
```

Entscheidend ist `NODE_ENV`:
- `npm run dev` → Next.js setzt `NODE_ENV=development` automatisch → `version: 'draft'`
- `npm run build` / Vercel-Deploy → `NODE_ENV=production` → `version: 'published'`

Kein Draft Mode, kein Preview-Token, kein Query-Parameter — ausschliesslich `NODE_ENV`.

Die staged Version instanziiert ihren eigenen `StoryblokClient` direkt (nicht via `app/lib/storyblok.js`), mit demselben `STORYBLOK_TOKEN` aus `.env.local`.

### Antworten auf die Prüffragen

| Frage | Antwort |
|---|---|
| Staged `/about` lädt | `draft` (wenn `NODE_ENV=development`) / `published` (wenn `NODE_ENV=production`) |
| Mechanismus | `process.env.NODE_ENV === 'development'` — einfache Umgebungsvariable |
| Reicht `npm run dev` allein | **Ja** — setzt `NODE_ENV=development`, lädt Draft aus Storyblok |
| Lokale Preview-URL | `http://localhost:3000/about` — kein Header oder Parameter nötig |
| Fallback bei fehlendem Content | `catch(e) { return null }` → `body = content?.body \|\| []` → leere Seite (kein Absturz, keine Fehler) |
| Risiko leere Story | Ja — wenn die Draft-Story leer ist oder Storyblok nicht erreichbar ist, rendert `/about` leer. Das ist ein bewusstes Fallback-Verhalten, kein Bug. |

### Fazit

Ein belastbarer Preview-Mechanismus ist vorhanden. `npm run dev` + `STORYBLOK_TOKEN` in `.env.local` reicht.

---

## Storyblok-Read-Status

Direkt verifiziert via Rollback-JSON (`docs/rollback/2026-07-03-cms-002a/about-story-before.json`), der vom Nutzer lokal erstellt und committed wurde.

### Story `about`

| Feld | Wert |
|---|---|
| Story-ID | `186589241977666` |
| Name | `about` |
| Slug | `about` |
| Published | **true** — war bereits published vor CMS-002a |
| Body-Blöcke (vor Build-Script) | `page_hero`, `working_why`, `working_steps`, `working_benefits`, `working_team_ref`, `working_partners`, `working_cta` |

**Kritische Beobachtung:** Die Story `about` war zum Zeitpunkt des Backups bereits mit den 7 korrekten Blöcken publiziert. Das bedeutet: Ein früheres Script (vermutlich `rebuild-about-arbeitsweise.js`) hat die Story in einer früheren Session bereits published. CMS-002a hat diese Story als Draft neu gespeichert (ohne Publish) — die Published-Version in Storyblok entspricht inhaltlich dem Draft.

### Working-Schemas (vor Build-Script)

Alle 6 Schemas bereits vorhanden mit den erwarteten Feldern:

| Schema | Felder |
|---|---|
| `working_benefits` | eyebrow, headline, b1_title, b1_text, b2_title, b2_text, b3_title, b3_text, b4_title, b4_text |
| `working_cta` | eyebrow, headline, text, cta_label, cta_url, link_label, link_url |
| `working_partners` | eyebrow, headline, text |
| `working_steps` | eyebrow, headline, intro, step_1_num/title/text (×4) |
| `working_team_ref` | eyebrow, headline, text, person_1_name/role, person_2_name/role, link_label, link_url |
| `working_why` | eyebrow, headline, text_1, text_2, text_3 |

Die Felder stimmen 1:1 mit dem Build-Script überein. Der `upsertComponent`-Call hat bei Ausführung keine Felder verloren.

---

## Identifizierte Risiken

| Risiko | Einschätzung | Massnahme |
|---|---|---|
| `rebuild-about-arbeitsweise.js` enthält `publish: 1` | Hoch (wenn ausgeführt) | Script darf nicht ausgeführt werden. Klar dokumentiert. |
| `upsertComponent` überschreibt Schemas vollständig (nicht additiv) | Mittel (bei manuell ergänzten Feldern) | Im aktuellen Fall kein Datenverlust — Felder stimmen überein |
| Kein interner Backup-Check im Build-Script | Niedrig | Backup-Script muss manuell zuerst ausgeführt werden |
| HEAD.lock in Sandbox vorhanden | Sandbox-intern, kein Risiko für lokales Git | Commit lokal ohne HEAD.lock möglich |
| Story war bereits Published (vor CMS-002a) | Dokumentation | Kein Risiko für CMS-002b — Published-Version ist korrekt |

---

## Entscheidung

| Punkt | Wert |
|---|---|
| CMS-002a kann sicher fortgesetzt werden | **Ja** |
| Voraussetzung | Story `about` in Storyblok manuell publishen (CMS-002b Schritt 1) |
| Empfohlener nächster Schritt | **CMS-002b: Story publishen → 8 staged Dateien committen → Push → Deploy** |

---

## Nicht verändert

- Storyblok (kein Read, kein Write in diesem Ticket)
- Die acht staged Arbeitsweise-Dateien (unberührt, staging status identisch)
- Code ausserhalb des Berichts
- Git-History
- Push und Deploy
- `docs/IA-Aenderungsprotokoll.md`
