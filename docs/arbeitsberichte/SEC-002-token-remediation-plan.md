# SEC-002 — Token-Bereinigung und History-Cleanup-Vorbereitung

## Status

| Feld | Wert |
|---|---|
| Ticket | SEC-002 |
| Datum | 2026-07-03 |
| Voraussetzung | Storyblok-Management-Token manuell widerrufen durch Dirk Fliescher |
| Status | Aktueller Bestand bereinigt — History-Cleanup steht aus |
| Push | Nein |
| Deploy | Nein |
| Storyblok-Write | Nein |

---

## Token-Widerruf bestätigt

Der betroffene Storyblok-Management-Token wurde vor diesem Ticket manuell im Storyblok-Account widerrufen. Er ist ab diesem Zeitpunkt deaktiviert. Alle lokalen Scripts, die diesen Token enthalten, können keine API-Aufrufe mehr ausführen.

---

## Secret-Suche: Befunde (ohne Tokenwerte)

### Aktueller Stand (vor Bereinigung)

| Datei | Typ | Treffer vorhanden | Auf origin/main | Aktion |
|---|---|---|---|---|
| `CLAUDE.md` | Getrackte Projektdatei | Ja | Ja | Bereinigt in diesem Ticket |
| `PROJEKT.md` | Getrackte Projektdatei | Ja | Ja | Bereinigt in diesem Ticket |
| `docs/kenalu-website-rebuild-2026-06.md` | Dokumentation | Ja | Ja | Bereinigt in diesem Ticket |
| `scripts/setup-ecosystem-storyblok.mjs` | Getrackte Script-Datei | Ja | Ja | Nicht in diesem Scope (scripts/) — History-Cleanup |
| `scripts/setup-kai-storyblok.mjs` | Getrackte Script-Datei | Ja | Ja | Nicht in diesem Scope (scripts/) — History-Cleanup |
| `scripts/setup-lab-kenalu.mjs` | Getrackte Script-Datei | Ja | Ja | Nicht in diesem Scope (scripts/) — History-Cleanup |
| `scripts/cleanup-storyblok-2026-07.mjs` | Getrackte Script-Datei | Ja | Ja | Nicht in diesem Scope (scripts/) — History-Cleanup |
| `scripts/cleanup-storyblok-2026-07b.mjs` | Getrackte Script-Datei | Ja | Ja | Nicht in diesem Scope (scripts/) — History-Cleanup |

**Wichtig:** Die 5 Script-Dateien sind trotz `/scripts/` in `.gitignore` getrackt — sie wurden vor Einführung der Gitignore-Regel committed. Sie liegen vollständig auf `origin/main` und sind in mehreren Commits der Git-History vorhanden.

### Nach Bereinigung (aktueller Stand)

Die drei bereinigten Dateien enthalten keinen Tokenwert mehr (verifiziert via `grep`). Der Ersatz lautet:

```
Storyblok-Management-Zugang: über lokale Umgebungsvariablen; nicht im Repository speichern.
```

---

## Warum ein normaler Commit nicht ausreicht

Ein `git commit` entfernt einen Tokenwert nur aus dem aktuellen Stand (HEAD). Ältere Commits in der Git-History enthalten den Token weiterhin. Das bedeutet:

- `git log -p -- CLAUDE.md` zeigt den Token in früheren Diff-Einträgen.
- `git show <commit>:CLAUDE.md` gibt ältere Versionen mit Token zurück.
- Jeder Klon des Repositories (`git clone`) erhält die vollständige History inklusive Token.

Der Token ist zwar widerrufen, aber seine Anwesenheit in der History ist eine organisatorische und Compliance-Frage.

---

## Vorgeschlagener History-Cleanup (separates Ticket)

### Tool-Empfehlung

`git filter-repo` (bevorzugt) oder BFG Repo Cleaner. Kein `git filter-branch` — deprecated.

Befehl (Beispiel, nicht ausführen ohne Vorbereitung):

```bash
git filter-repo --replace-text <(echo "sb_pat_<token>==><REMOVED>")
```

### Voraussetzungen vor einem Force-Push

1. **Vollständiges Repository-Backup:** Lokale Kopie des `.git`-Verzeichnisses vor jedem History-Rewrite.

2. **Team- und Zugriffsabstimmung:** Alle Personen mit lokalem Klon müssen informiert werden — ihre lokalen Branches werden nach einem Force-Push inkompatibel mit `origin/main`.

3. **Vercel-/GitHub-Integrationscheck:**
   - Vercel löst Deployments auf Push aus — sicherstellen, dass ein Force-Push keinen unerwünschten Build auslöst.
   - GitHub-Branch-Schutz für `main` prüfen (`Settings → Branches`): Force-Push muss ggf. vorübergehend erlaubt werden.

4. **Alle Branches und Tags prüfen:** Falls andere Branches oder Tags existieren, die den Token enthalten, müssen diese ebenfalls im Filter-Repo-Lauf berücksichtigt werden.

5. **Nachkontrolle auf Remote:** Nach Force-Push verifizieren, dass `git grep sb_pat_ origin/main` keine Treffer mehr liefert.

6. **GitHub Secret-Scanning:** GitHub's automatisches Secret-Scanning prüfen — bestehende Alerts schliessen, sobald die History bereinigt ist.

---

## Neuer Storyblok-Token: Voraussetzungen

Ein neuer Storyblok-Management-Token darf erst nach folgenden Schritten eingesetzt werden:

1. **Script-Hardening abgeschlossen** — Scripts lesen Zugangswerte ausschliesslich aus Umgebungsvariablen (`process.env.STORYBLOK_MGMT_TOKEN`), nicht aus hardcoded Werten.
2. **Scoped / Space-restricted** — Token auf minimale notwendige Berechtigungen einschränken (nur der relevante Space, nur notwendige Aktionen).
3. **Nur in `.env.local`** — niemals in Dokumentation, Commits oder Chat.
4. **Nicht in `scripts/` commitzen** — Scripts bleiben gitignored; Management-Token nie im Repository.

---

## Nicht in diesem Ticket

- Kein History-Rewrite (`git filter-repo`, BFG, Rebase)
- Kein Force-Push
- Keine Änderungen an `scripts/`-Dateien
- Kein neuer Storyblok-Token
- Kein Push und kein Deploy
