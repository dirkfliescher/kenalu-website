# SEC-001 – Storyblok-Script-Credential-Hygiene

## Status

- Datum: 2026-07-03
- Status: Lokale Zugangswerte identifiziert, Script-Ausführung gesperrt
- Push: Nein
- Deploy: Nein

## Befund

Drei lokale, gitignored Storyblok-Scripts enthalten hardcodierte Zugangswerte. Sie wurden nicht committed und nicht auf `origin/main` veröffentlicht.

## Betroffene lokale Scripts

- `scripts/cms-002a-backup.js`
- `scripts/cms-002a-build-draft.js`
- `scripts/rebuild-about-arbeitsweise.js`

## Sofortentscheidung

- Keines der Scripts darf ausgeführt werden.
- Keine Zugangswerte dürfen in Git, Dokumentation oder Chat übernommen werden.
- Der aktuell verwendete Storyblok-Management-Zugang muss ausserhalb des Repositories ersetzt werden.
- Künftige Scripts beziehen Zugangswerte ausschliesslich aus Umgebungsvariablen.

## Zielzustand

- Zugangswerte nur in `.env.local` oder einer sicheren Deployment-Konfiguration.
- `.env.local` bleibt gitignored.
- Scripts lesen ausschliesslich benannte Umgebungsvariablen.
- Scripts brechen mit einer verständlichen Fehlermeldung ab, wenn Variablen fehlen.
- Kein Script kann ohne explizite Freigabe publishen.

## Nicht in diesem Ticket

- Kein Token-Rotation-Vorgang über CLI.
- Keine Script-Änderung.
- Keine Storyblok-Änderung.

---

## Sicherheitsprüfung getrackter Dateien

| Prüfpunkt | Ergebnis |
|---|---|
| `.env.local` durch `.gitignore` geschützt | **Ja** — `.env*` in Zeile 34 von `.gitignore` |
| Die drei Scripts durch `.gitignore` geschützt | **Ja** — `/scripts/` in Zeile 37 von `.gitignore` |
| Zugangswerte in getrackten Dateien | **Nein (Befund: vorhanden)** — siehe unten |
| Zugangswerte in `docs/` | **Nein (Befund: vorhanden)** — siehe unten |

### Kritischer Befund: Token in committed Dateien

`git grep` auf getrackten Dateien hat folgende Treffer ergeben:

| Datei | Commit-Status | Massnahme |
|---|---|---|
| `CLAUDE.md` | Committed, auf origin/main | Token-Rotation, Datei bereinigen |
| `PROJEKT.md` | Committed, auf origin/main | Token-Rotation, Datei bereinigen |
| `docs/kenalu-website-rebuild-2026-06.md` | Committed, auf origin/main | Token-Rotation, Datei bereinigen |
| `docs/arbeitsberichte/CMS-002a0-scope-audit.md` | Staged, noch nicht committed | Vor Commit bereinigt (Teilreferenz entfernt) |

**Konsequenz:** Der betroffene Management API Token ist in der Git-History von `origin/main` vorhanden. Eine Bereinigung der Git-History (z.B. `git filter-branch` oder BFG) liegt ausserhalb dieses Tickets. Die notwendige Massnahme ist Token-Rotation im Storyblok-Account — der alte Token ist als kompromittiert zu behandeln.

### Erforderliche Schritte ausserhalb dieses Tickets

1. **Token-Rotation:** Im Storyblok-Account einen neuen Management API Token generieren und den alten widerrufen.
2. **Datei-Bereinigung:** In `CLAUDE.md`, `PROJEKT.md` und `docs/kenalu-website-rebuild-2026-06.md` den Token durch einen Platzhalter ersetzen und committen.
3. **Optionale Git-History-Bereinigung:** Mit BFG Repo Cleaner oder `git filter-repo` den Token aus der History entfernen und Force-Push auf `origin/main` (koordiniert, da History-Rewrite).
4. **Script-Bereinigung:** Scripts auf Umgebungsvariablen umstellen, sobald das Script-Hardening-Ticket freigegeben ist.
