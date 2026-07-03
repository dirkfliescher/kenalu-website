# CMS-002a1 — Release-State-Reconciliation

## Status

| Feld | Wert |
|---|---|
| Ticket | CMS-002a1 |
| Datum | 2026-07-03 |
| Lokaler HEAD | `3125371d4e0e0ad9542728a93efdc8a6a4775a8d` |
| origin/main | `3125371d4e0e0ad9542728a93efdc8a6a4775a8d` |
| Push | Bereits vor diesem Ticket erfolgt (lokal durch Dirk ausgeführt) |
| Deploy | Nicht verifiziert — kein Code-Commit gepusht, daher kein Vercel-Build ausgelöst |
| Storyblok-Write in diesem Ticket | Nein |

---

## Zusammenfassung

Zwischen dem letzten bekannten Stand von `origin/main` (`5ee73ee`) und dem aktuellen Stand (`3125371d`) wurden drei Docs-Commits gepusht. Keiner dieser Commits enthält produktiven Next.js-Code, Scripts oder die acht staged Arbeitsweise-Dateien.

Die öffentliche Website ist durch den Push unverändert geblieben. Es besteht kein Rückrollbedarf.

Die Story `about` war in Storyblok bereits vor CMS-002a mit den sieben erlaubten Blöcken publiziert — Zeitpunkt: `2026-07-02T08:58:12.875Z`. Der auslösende Commit oder das auslösende Script ist aus dem Git-Log nicht mehr eindeutig zuordenbar (alle Scripts sind gitignored und tauchen in keinem Commit auf). CMS-002a hat am 2026-07-03 einen neuen Draft-Stand gespeichert (ohne Publish), erkennbar am `updated_at: 2026-07-03T10:30:21.884Z`.

---

## Commit- und Dateirekonstruktion

### Commits zwischen `5ee73ee` und `3125371d`

| Hash | Nachricht |
|---|---|
| `2d93bb5` | docs: define Storyblok-first target architecture |
| `e90d3ca` | docs: prepare Storyblok draft for working method pilot |
| `3125371` | docs: finalize CMS-002a — local preview confirmed, rollback snapshots added |

### Tatsächlich gepushte Dateien (ausschliesslich docs)

| Datei | Operation |
|---|---|
| `docs/IA-Aenderungsprotokoll.md` | M (Einträge ergänzt) |
| `docs/arbeitsberichte/CMS-001-abschlussbericht.md` | A (neu) |
| `docs/arbeitsberichte/CMS-002a-abschlussbericht.md` | A (neu) |
| `docs/rollback/2026-07-03-cms-002a/about-story-before.json` | A (neu) |
| `docs/rollback/2026-07-03-cms-002a/storyblok-write-plan.md` | A (neu) |
| `docs/rollback/2026-07-03-cms-002a/working-schema-before.json` | A (neu) |
| `docs/storyblok/CMS-002a-About-Draft-Contract.md` | A (neu) |
| `docs/storyblok/CMS-Migrationsplan.md` | A (neu) |
| `docs/storyblok/CMS-Zielarchitektur.md` | A (neu) |
| `docs/storyblok/Headless-Showcase-Konzept.md` | A (neu) |

**Kein produktiver Next.js-Code, kein Script, keine der acht staged Arbeitsweise-Dateien ist auf `origin/main` gelangt.**

### Kein Rückrollbedarf

Der Push hat keine sichtbare Website-Funktion verändert. Die öffentliche `/about`-Route ist identisch mit dem Zustand vor dem Push.

---

## Status der Arbeitsweise-Migration

| Punkt | Stand |
|---|---|
| Öffentliche `/about`-Version (origin/main) | Statisch — JSX, kein Storyblok, kein `revalidate` |
| Staged Storyblok-First-Version | Im Index (staged), noch nicht committed |
| Status der acht geschützten Dateien | Staged, unverändert — kein unstaged diff, kein untracked |
| Storyblok-Story `about` | Published (`published: true`, published_at: 2026-07-02) |
| Draft-/Published-Nachweis | Aus `docs/rollback/2026-07-03-cms-002a/about-story-before.json` direkt lesbar |

### Zusätzliche staged Datei (ausserhalb der acht)

`docs/arbeitsberichte/CMS-002a0-scope-audit.md` ist staged (A), weil der `git add`-Aufruf im Ticket CMS-002a0 erfolgreich war, der anschliessende Commit aber wegen eines Sandbox-Locks scheiterte. Diese Datei muss beim nächsten Docs-Commit separat oder zusammen mit diesem Bericht committed werden.

---

## Script-Status

### Git-Historie

Alle drei Scripts erscheinen in keinem Commit — weder in `HEAD` noch in `origin/main` noch in der vollständigen Git-History. Die Ursache: `.gitignore` Zeile 37 (`/scripts/`) schliesst das gesamte Verzeichnis aus.

| Script | Git-Status | In Git-History | Auf origin/main | Hardcoded Token | Tatsächliche Wirkung | Freigabe |
|---|---|---|---|---|---|---|
| `cms-002a-backup.js` | Nur auf Disk (gitignored) | Nie committed | Nein | Ja | GET-Requests auf Management API, schreibt JSON lokal | Nur read-only verwendbar |
| `cms-002a-build-draft.js` | Nur auf Disk (gitignored) | Nie committed | Nein | Ja | Upsert Schemas (vollständige Überschreibung) + Story als Draft (kein Publish) | Gesperrt bis Script-Hardening |
| `rebuild-about-arbeitsweise.js` | Nur auf Disk (gitignored) | Nie committed | Nein | Ja | Identisch zu Build-Draft, aber mit `publish: 1` — publiziert sofort | **Gesperrt** |

Alle Scripts enthalten hardcodierte Zugangswerte. Diese Werte sind in diesem Dokument nicht aufgeführt.

---

## Storyblok-Zustand (aus vorhandenen Belegen)

Quelle: `docs/rollback/2026-07-03-cms-002a/about-story-before.json` (committed, lesbar ohne API-Zugriff)

| Feld | Wert |
|---|---|
| Story-ID | 186589241977666 |
| Slug | `about` |
| `published` | `true` |
| `published_at` | 2026-07-02T08:58:12.875Z |
| `created_at` | 2026-06-12T05:53:34.142Z |
| `updated_at` | 2026-07-03T10:30:21.884Z |
| Blöcke im Body | `page_hero`, `working_why`, `working_steps`, `working_benefits`, `working_team_ref`, `working_partners`, `working_cta` |

### Was technisch verifiziert ist

Die Story `about` war bereits am 2026-07-02 publiziert — vor dem Start von CMS-002a (2026-07-03). Sie enthielt bereits die sieben erlaubten Blöcke.

Am 2026-07-03 hat `cms-002a-build-draft.js` (lokal ausgeführt) einen neuen Draft gespeichert — erkennbar am `updated_at`. Dieser Draft wurde lokal als korrekt bestätigt.

### Was nicht technisch verifiziert ist

Welches Script die Published-Version am 2026-07-02 erzeugt hat, ist aus Git nicht ableitbar (Scripts sind gitignored, erscheinen in keinem Commit). Der Zeitstempel `published_at: 2026-07-02` legt nahe, dass `rebuild-about-arbeitsweise.js` in einer früheren Session ausgeführt wurde — dieser Schluss ist plausibel, aber technisch nicht zweifelsfrei zuordenbar.

Ob aktuell ein getrennter Draft-Stand in Storyblok existiert, der sich vom Published-Stand unterscheidet, ist ohne API-Zugriff nicht direkt prüfbar. Der `updated_at`-Wert (2026-07-03, nach `published_at`) deutet darauf hin.

---

## Sicherheitsbefund

### Aktueller Fallback der staged `/about`-Version

Die staged `app/about/page.js` enthält:

```javascript
async function getContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/about', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data.story.content;
  } catch (e) {
    return null;          // ← jeder Fetch-Fehler → null
  }
}

const body = content?.body || [];  // ← null → leeres Array → leere Seite
```

### Warum das ein Release-Blocker ist

Bei einem Commit und Deploy der acht staged Dateien rendern folgende Szenarien eine **vollständig leere `/about`-Seite**:

- Storyblok Content Delivery API nicht erreichbar (Netzwerkfehler, Timeout)
- Story `about` versehentlich depubliziert oder gelöscht
- `content.body` leer oder kein Array (z.B. nach einem fehlerhaften Storyblok-Edit)
- `STORYBLOK_TOKEN` in Vercel nicht gesetzt oder ungültig

Eine leere `/about`-Seite in Produktion ist kein akzeptables Verhalten für eine Unternehmenswebsite.

### Erforderliche Absicherung vor CMS-002b

Vor einem Code-Release der acht staged Dateien muss mindestens eines der folgenden Muster implementiert sein:

1. **Statischer Fallback-Content:** Bei `body = []` oder `content = null` wird ein hartcodierter Minimal-Inhalt gerendert (analog zur aktuellen statischen Version).
2. **`notFound()`-Weiterleitung:** Bei `content = null` wird Next.js `notFound()` aufgerufen, statt eine leere Seite zu rendern.
3. **Blockdaten-Validierung:** Prüfung, ob `body` ein nichtleeres Array ist, bevor gerendert wird.

---

## Verbindliche Schutzentscheidung

```
CMS-002b darf nicht als „Publish-Schritt" behandelt werden.
Vor einem Code-Commit der acht staged Dateien braucht es zuerst einen
produktiven Fallback für Storyblok-Ausfall, fehlende Story und ungültige Blockdaten.
Die beiden schreibenden Storyblok-Skripte sind bis zu einem eigenen,
separaten Script-Hardening-Ticket gesperrt.
```

---

## Entscheidung

- Keine weitere Storyblok-Ausführung.
- Kein Publish-Schritt.
- CMS-002b wird ein Code-Hardening-Ticket für Fallback und Datenvalidierung in `app/about/page.js`.
- Danach erst kontrollierter Code-Release (Commit der acht Dateien + Push).

---

## Nicht verändert

- Storyblok (kein Read, kein Write in diesem Ticket)
- Produktivcode
- Die acht staged Arbeitsweise-Dateien (unberührt)
- Git-History
- Push und Deploy

---

## Nächster Schritt

**CMS-002b — `/about` gegen Storyblok-Ausfall und unvollständige Blockdaten absichern.**

Scope: Nur `app/about/page.js` (staged) anpassen — Fallback-Logik ergänzen. Danach Commit der acht Dateien + Push + Deploy + Live-Check.
