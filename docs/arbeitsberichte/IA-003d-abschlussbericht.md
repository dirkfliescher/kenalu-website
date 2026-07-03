# IA-003d – Doppelten KAI-Dialog auf /team entfernt

## Status

- Ticket: IA-003d
- Datum: 2026-07-03
- Status: Lokal umgesetzt, Veröffentlichung ausstehend
- Baseline-Commit: `39c614b` — "fix: refine team collaboration flow"
- Umsetzungs-Commit: `ed15c30` — "fix: remove duplicate team kai dialogue"
- Push: Nein
- Deploy: Nein

## Ziel

Den allgemeinen KAI-Dialog auf `/team` entfernen, weil TeamIntro bereits einen persönlichen Chat-Modus enthält und zwei nahe beieinanderliegende Gesprächsangebote den Seitenfluss überladen.

## Umgesetzt

- Direkten Import von `KaiDialogue` aus `app/team/page.js` entfernt.
- Direktes `KaiDialogue`-Rendering aus `app/team/page.js` entfernt.
- TeamIntro unverändert belassen.
- Seitenfluss vereinfacht zu:
  Hero → Team-Profile → TeamIntro → Mitwirken → FitTest → Gesprächs-CTA.

## Nicht verändert

- `TeamIntro.js`
- `FitTest.js`
- `CollaborationIntro.js`
- `/about`
- Storyblok
- API-Routen
- CSS
- Navigation und Footer
- die acht staged Arbeitsweise-Dateien

## Betroffene Dateien

| Datei | Änderung |
|---|---|
| `app/team/page.js` | Allgemeines KaiDialogue-Rendering entfernt |
| `docs/IA-Aenderungsprotokoll.md` | IA-003d abgeschlossen |

## Qualitätssicherung

- Code-Prüfung: Keine verbleibende `KaiDialogue`-Referenz in `app/team/page.js`.
- Lokaler Mac-Build: Ausstehend.
- Lokale visuelle Prüfung Desktop/Mobile: Ausstehend.
- Push/Deploy: Nicht erfolgt.

## Rollback

```bash
git revert ed15c30
```

## Offene Punkte

- `npm run build` lokal auf dem Mac ausführen.
- Lokale visuelle Prüfung von `/team` durchführen.
- Erst danach separat über Push und Deploy entscheiden.

## Nächster Schritt

Lokalen Mac-Build sowie visuelle QA der vereinfachten Teamseite durchführen.
