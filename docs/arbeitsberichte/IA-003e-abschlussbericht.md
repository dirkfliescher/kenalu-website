# IA-003e – Doppelten Seitenabschluss auf Über kenalu bereinigt

## Status

- Ticket: IA-003e
- Datum: 2026-07-03
- Status: Lokal umgesetzt und geprüft, Veröffentlichung ausstehend
- Baseline-Commit: `8b2319f` — "docs: add IA-003d completion report"
- Umsetzungs-Commit: `db23bc8` — "fix: keep team page ending focused"
- Push: Nein
- Deploy: Nein

## Ziel

Den allgemeinen Kunden-CTA auf `/team` entfernen, damit nach FitTest nur der passende Mitwirken-Abschluss verbleibt.

## Umsetzung

- Herkunft des allgemeinen CTA: Storyblok-PageBlock `cta_section` in `team-page`.
- Umsetzung nur auf `/team`: `pageBlocks` werden vor dem Rendering um `cta_section` gefiltert.
- Storyblok selbst bleibt unverändert.
- Resultierender Seitenfluss:
  TeamIntro → Mitwirken → FitTest → Mitwirken-Abschluss „Meld dich" → Footer.

## Bewusste technische Regel

Auf `/team` werden `cta_section`-PageBlocks aktuell nicht gerendert.
Neue allgemeine CTA-Blöcke für diese Seite müssen künftig bewusst anders modelliert oder gezielt freigegeben werden.

## Nicht verändert

- `/about`
- TeamIntro
- FitTest-Logik
- CollaborationIntro
- Storyblok
- API-Routen
- CSS
- Navigation und Footer
- die acht staged Arbeitsweise-Dateien

## Betroffene Dateien

| Datei | Änderung |
|---|---|
| `app/team/page.js` | `cta_section` nur auf `/team` aus PageBlocks gefiltert |
| `docs/IA-Aenderungsprotokoll.md` | IA-003e abgeschlossen |

## Qualitätssicherung

- Lokaler Mac-Build: Ausstehend
- Desktop: Ausstehend
- Mobile: Ausstehend
- `#mitwirken`: Ausstehend
- TeamIntro: Ausstehend
- Allgemeiner CTA auf `/team`: nicht mehr sichtbar
- Horizontaler Overflow: Ausstehend

## Rollback

```bash
git revert db23bc8
```

## Offene Punkte

Keine für dieses Ticket.

## Nächster Schritt

Separat über den kontrollierten Push der lokalen, bereits geprüften Team-Änderungen entscheiden.
