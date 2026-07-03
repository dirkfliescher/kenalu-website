# OPS-002 — Wiederherstellung der unbeabsichtigten About-Dateien

## Status

| Feld | Wert |
|---|---|
| Ticket | OPS-002 |
| Datum | 2026-07-03 |
| Ausgangslage | Commit `49f0eb2` (SEC-003) enthielt unbeabsichtigt 8 geschützte CMS-002-Dateien |
| Massnahme | Correction-Commit + WIP-Branch zur Sicherung des CMS-002-Stands |
| Push | Nein |
| Deploy | Nein |
| Storyblok-Write | Nein |

---

## Ausgangslage

SEC-003 (Storyblok-Script-Hardening) wurde lokal als Commit `49f0eb276a7de504d22c272dc4047c51d03c2ffa` gespeichert.
Dieser Commit enthielt neben den 5 gehärteten Scripts, `CLAUDE.md`, `PROJEKT.md` und der SEC-003-Dokumentation
auch 8 Dateien, die im Rahmen von CMS-002 (Storyblok-first Arbeitsweise) staged, aber noch nicht bereit für `main` waren.

Die 8 betroffenen Dateien (nachfolgend "Arbeitsweise-Dateien"):

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

Diese Dateien enthalten den neuen Storyblok-first Entwurf für die `/about`-Seite (CMS-002a),
der erst nach Abschluss von CMS-002b (Fallback-Härtung) auf `main` kommen soll.

---

## Preflight-Verifikation

Vor der Korrektur wurde der Ist-Stand verifiziert (read-only):

```
HEAD:         49f0eb276a7de504d22c272dc4047c51d03c2ffa
origin/main:  3125371d4e0e0ad9542728a93efdc8a6a4775a8d

Diff origin/main..HEAD:
  app/ und components/: genau die 8 Arbeitsweise-Dateien ✓
  scripts/: genau die 5 gehärteten SEC-003-Scripts ✓
  public/: keine Änderung ✓

git status: MM auf allen 8 Dateien
  → staged: origin/main-Inhalt (korrekt, aus vorgängigem git restore --staged)
  → worktree: 49f0eb2-Inhalt (sandbox-bedingt nicht überschreibbar)
index.lock: vorhanden (stale, 0 Bytes)
```

---

## Durchgeführte Schritte

### Schritt 1 — WIP-Branch anlegen

Branch als Sicherungspunkt für CMS-002a-Arbeit:

```bash
git branch wip/cms-002-about-storyblok-first 49f0eb2
```

Verifikation:
```
49f0eb276a7de504d22c272dc4047c51d03c2ffa refs/heads/wip/cms-002-about-storyblok-first ✓
```

### Schritt 2 — Index vorbereiten (Vorarbeit aus OPS-002-Preflight)

In der vorangegangenen Session wurde `git restore --source=origin/main --staged` für alle 8 Dateien
ausgeführt. Der `--staged`-Teil war erfolgreich; der `--worktree`-Teil scheiterte an Sandbox-Berechtigungen.

Resultat: Index enthält korrekte origin/main-Versionen der 8 Dateien. Worktree bleibt bei 49f0eb2 (irrelevant für den Commit).

### Schritt 3 — Correction-Commit

```bash
git commit --only -m "fix: restore static about pending CMS-002b" -- \
  app/about/page.js \
  components/DynamicBlock.js \
  components/blocks/WorkingBenefits.js \
  components/blocks/WorkingCta.js \
  components/blocks/WorkingPartners.js \
  components/blocks/WorkingSteps.js \
  components/blocks/WorkingTeamRef.js \
  components/blocks/WorkingWhy.js
```

Dieser Commit enthält:
- Die 8 Arbeitsweise-Dateien im origin/main-Zustand (Zurücksetzung)
- Alle SEC-003-Änderungen aus 49f0eb2 bleiben erhalten (5 Scripts, CLAUDE.md, PROJEKT.md, SEC-003-Doku)

**Voraussetzung:** `rm -f .git/index.lock` — muss Dirk lokal ausführen (Sandbox hat kein Schreibrecht auf Lock-Datei).

---

## Blockierender Zwischenschritt

`index.lock` verhinderte den Commit aus der Claude-Sandbox.
Die Datei ist 0 Bytes gross (stale) und wurde durch einen abgebrochenen `git restore`-Befehl hinterlassen.

**Dirk muss lokal ausführen:**

```bash
rm -f /Users/dirkfliescher/Documents/kenalu-website/.git/index.lock
```

Danach kann der Correction-Commit entweder erneut aus der Sandbox oder direkt lokal ausgeführt werden.

**Lokale Alternative (alles in einem Block):**

```bash
cd /Users/dirkfliescher/Documents/kenalu-website
rm -f .git/index.lock

git commit --only -m "fix: restore static about pending CMS-002b" -- \
  app/about/page.js \
  components/DynamicBlock.js \
  components/blocks/WorkingBenefits.js \
  components/blocks/WorkingCta.js \
  components/blocks/WorkingPartners.js \
  components/blocks/WorkingSteps.js \
  components/blocks/WorkingTeamRef.js \
  components/blocks/WorkingWhy.js
```

---

## Nicht in diesem Ticket

- Kein Push, kein Deploy
- Keine Storyblok-Write-Operation
- Kein neuer Token
- Kein Reset, Rebase, Squash, Amend oder Cherry-Pick
- Keine Änderung an Git-History
- Keine Änderung an CLAUDE.md, PROJEKT.md oder Scripts (ausserhalb SEC-003)
- Keine Wiederherstellung der staged CMS-002a-Version (bleibt auf WIP-Branch)
- Keine Entfernung oder Änderung von SEC-003

---

## Nächste Schritte nach OPS-002

| Schritt | Ticket | Voraussetzung |
|---|---|---|
| SEC-003-Commit push | — | Nach OPS-002-Correction-Commit |
| History-Cleanup (git filter-repo) | SEC-004 | Separate Absprache, Voraussetzungen in SEC-002 |
| Neuen Management-Token erstellen | — | Nach SEC-003-Commit und Script-Freigabe |
| CMS-002b: /about Fallback-Härtung | CMS-002b | Nach Token-Rotation |
