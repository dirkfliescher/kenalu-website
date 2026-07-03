# SEC-003 — Storyblok-Script-Hardening

## Status

| Feld | Wert |
|---|---|
| Ticket | SEC-003 |
| Datum | 2026-07-03 |
| Voraussetzung | SEC-002 abgeschlossen; Storyblok-Management-Token widerrufen |
| Status | Hardening abgeschlossen — Commit durch Dirk lokal ausstehend |
| Push | Nein |
| Deploy | Nein |
| Storyblok-Write | Nein |

---

## Ausgangslage

Fünf getrackte Script-Dateien enthielten hardcodierte Storyblok-Management-Tokens (bereits widerrufen). Die Dateien lagen auf `origin/main` und waren trotz `/scripts/` in `.gitignore` getrackt, da sie vor Einführung der Gitignore-Regel committed wurden.

In SEC-002 wurden die drei nicht-Script-Dateien bereinigt. SEC-003 härtete die fünf Scripts.

---

## Betroffene Scripts

| Script | Auf origin/main | Token-Muster vor Hardening | Publish | Schema-Overwrite |
|---|---|---|---|---|
| `setup-ecosystem-storyblok.mjs` | Ja | `const MGMT_TOKEN = 'sb_pat_...'` (hardcoded) | `publish: 1` in updateAboutStory | Whitelist-PUT in addEcosystemToWhitelists |
| `setup-kai-storyblok.mjs` | Ja | `const MGMT_TOKEN = 'sb_pat_...'` (hardcoded) | `publish: 1` in 5 Funktionen | Whitelist-PUT in addToWhitelists |
| `setup-lab-kenalu.mjs` | Ja | `process.env.STORYBLOK_PAT \|\| 'sb_pat_...'` (Fallback) | `publish: 1` in ensureStory (2×) | PUT auf bestehende lab_article-Komponente |
| `cleanup-storyblok-2026-07.mjs` | Ja | `process.env.STORYBLOK_PAT \|\| 'sb_pat_...'` (Fallback) | `publish: true` als Default-Parameter | Nein |
| `cleanup-storyblok-2026-07b.mjs` | Ja | `process.env.STORYBLOK_PAT \|\| 'sb_pat_...'` (Fallback) | `publish: 1` hardcoded | Nein |

---

## Angewandte Härtungsregeln

### Token-Bereinigung

- Alle hardcodierten Tokenwerte (`sb_pat_...`) entfernt.
- Alle Fallback-Werte (`process.env.X || 'sb_pat_...'`) entfernt.
- Verweis auf veralteten Env-Var-Namen (`STORYBLOK_PAT`) durch standardisierten Namen ersetzt:
  `process.env.STORYBLOK_MANAGEMENT_TOKEN`
- CDN-Token (`UjST5D2IbHlQxZqnpC03xQtt`) ebenfalls aus Code entfernt:
  wird aus `process.env.STORYBLOK_TOKEN` gelesen (bereits in `.env.local`).

### Safe-Abort-Guard

Jedes Script bricht vor dem ersten API-Aufruf ab, wenn `STORYBLOK_MANAGEMENT_TOKEN` nicht gesetzt ist:

```javascript
const MGMT_TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN;

if (!MGMT_TOKEN) {
  console.error('Fehler: STORYBLOK_MANAGEMENT_TOKEN ist nicht gesetzt.');
  console.error('Variable vor dem Ausführen setzen:');
  console.error('  export STORYBLOK_MANAGEMENT_TOKEN=<wert>');
  process.exit(1);
}
```

### Publish-Schutz

Publish ist standardmässig deaktiviert. Ein Publish erfolgt nur wenn **beide** Bedingungen erfüllt sind:
1. CLI-Parameter `--publish` gesetzt
2. Umgebungsvariable `STORYBLOK_ALLOW_PUBLISH` hat exakt den Wert `YES`

```javascript
const ALLOW_PUBLISH =
  process.argv.includes('--publish') &&
  process.env.STORYBLOK_ALLOW_PUBLISH === 'YES';
```

Alle `publish: 1`-Stellen wurden durch `publish: ALLOW_PUBLISH ? 1 : 0` ersetzt.

### Schema-Migrationsschutz

Scripts, die bestehende Storyblok-Komponenten-Schemas modifizieren könnten, brechen ohne `--migrate-schema` ab:

```javascript
const MIGRATION_MODE = process.argv.includes('--migrate-schema');

// Vor jedem Schema-PUT:
if (!MIGRATION_MODE) {
  console.error('Abbruch: Schema-Änderungen erfordern einen expliziten Migrationsschritt.');
  console.error('Script mit --migrate-schema ausführen, wenn die Änderung freigegeben ist.');
  process.exit(1);
}
```

Betroffen: `setup-ecosystem-storyblok.mjs` (addEcosystemToWhitelists), `setup-kai-storyblok.mjs` (addToWhitelists), `setup-lab-kenalu.mjs` (ensureComponent bei bestehender Komponente).

---

## Verifikation

### Syntax-Check (node --check)

```
✓ scripts/setup-ecosystem-storyblok.mjs
✓ scripts/setup-kai-storyblok.mjs
✓ scripts/setup-lab-kenalu.mjs
✓ scripts/cleanup-storyblok-2026-07.mjs
✓ scripts/cleanup-storyblok-2026-07b.mjs
```

### Token-Grep (sb_pat_)

```
✓ Kein Token-Wert in keinem Script
```

### STORYBLOK_MANAGEMENT_TOKEN — Vorkommen pro Script

Alle Scripts: je 5 Treffer (Deklaration + Guard + 2–3 Verwendungen).

### Fallback-Token (||)

```
✓ Kein Fallback-Token in keinem Script
```

### ALLOW_PUBLISH

Alle Scripts: vorhanden (9–16 Treffer je nach Publish-Anzahl im Script).

---

## Ausstehender Schritt: Commit

`index.lock` verhindert Commits aus der Claude-Sandbox. Dirk führt lokal aus:

```bash
rm -f /Users/dirkfliescher/Documents/kenalu-website/.git/index.lock

cd /Users/dirkfliescher/Documents/kenalu-website

git add scripts/setup-ecosystem-storyblok.mjs
git add scripts/setup-kai-storyblok.mjs
git add scripts/setup-lab-kenalu.mjs
git add scripts/cleanup-storyblok-2026-07.mjs
git add scripts/cleanup-storyblok-2026-07b.mjs
git add CLAUDE.md PROJEKT.md
git add docs/arbeitsberichte/SEC-003-storyblok-script-hardening.md

git commit -m "security: harden Storyblok script credentials (SEC-003)"
```

⚠️ Die acht geschützten Working*-Dateien sind staged und dürfen nicht committed werden.
Der Commit-Befehl muss explizite Pfade verwenden (kein `git add -A`).

---

## Nicht in diesem Ticket

- Kein Storyblok-Write, kein API-Aufruf
- Kein History-Cleanup (`git filter-repo`) — wird in SEC-004 separat behandelt
- Kein neuer Storyblok-Token — erst nach Commit und Script-Freigabe
- Kein Push, kein Deploy
- Keine Änderung an den acht staged Arbeitsweise-Dateien

---

## Nächste Schritte

| Schritt | Ticket | Voraussetzung |
|---|---|---|
| SEC-003-Commit lokal ausführen | — | `index.lock` entfernen |
| History-Cleanup (git filter-repo) | SEC-004 | Separate Absprache |
| Neuen Management-Token erstellen | — | Nach SEC-003-Commit, scoped auf Space |
| CMS-002b: `/about`-Fallback-Härtung | CMS-002b | Nach Token-Rotation |
