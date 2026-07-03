# IA-003e – Doppelten Seitenabschluss auf /team bereinigt

## Status

- Ticket: IA-003e
- Datum: 2026-07-03
- Status: Lokal umgesetzt, Veröffentlichung ausstehend
- Baseline-Commit: `8b2319f` — "docs: add IA-003d completion report"
- Umsetzungs-Commit: `db23bc8` — "fix: keep team page ending focused"
- Push: Nein
- Deploy: Nein

## Ziel

Den allgemeinen Kunden-CTA „Bereit für ein Gespräch?" auf `/team` entfernen. Nach dem FitTest soll kein zweites Gesprächsangebot erscheinen, das sich an Kunden richtet — die Seite schliesst mit dem Mitwirken-Bereich für potenzielle Partner.

## Herkunft des allgemeinen CTA

Der Block „Bereit für ein Gespräch?" stammt aus den Storyblok PageBlocks der `team-page`-Story und wird als `cta_section`-Block via `DynamicBlock` gerendert. Belege:

- Script `scripts/setup-kai-storyblok.mjs` identifiziert den allgemeinen CTA-Block explizit über `blok.component === 'cta_section'`
- `CtaSection.js` rendert `cta_section_headline` und `cta_section_cta_text` — passt zur QA-Beobachtung „Bereit für ein Gespräch?" / „Gespräch anfragen"
- IA-003c-Changelog bestätigt: `"allgemeiner Gesprächs-CTA ('Bereit für ein Gespräch?', aus Storyblok PageBlocks)"`

## Umsetzung

In `app/team/page.js` wurde ein `.filter()` vor `.map()` eingefügt:

```javascript
{pageBlocks
  .filter((blok) => blok.component !== 'cta_section')
  .map((blok) => (
    <Reveal key={blok._uid}>
      <DynamicBlock blok={blok} />
    </Reveal>
  ))}
```

Die Filterung gilt ausschliesslich auf `/team`. Die Storyblok-Story `team-page` bleibt unverändert — `cta_section` ist weiterhin im CMS vorhanden und rendert auf allen anderen Seiten normal.

## Betroffene Dateien

| Datei | Änderung |
|---|---|
| `app/team/page.js` | `cta_section`-Filter vor `pageBlocks.map()` eingefügt |
| `docs/IA-Aenderungsprotokoll.md` | IA-003e eingetragen und abgeschlossen |

## Nicht verändert

- `TeamIntro.js`, `FitTest.js`, `CollaborationIntro.js`
- Storyblok (kein CMS-Eingriff)
- `/about`
- API-Routen, CSS, Navigation, Footer
- Die acht staged Arbeitsweise-Dateien

## Seitenfluss nach Umsetzung

Hero → Team-Profile → TeamIntro → Mitwirken (CollaborationIntro + FitTest) → Footer

## Qualitätssicherung

- Code-Prüfung: Filter exakt auf `cta_section` begrenzt, kein anderer Block betroffen.
- Lokaler Mac-Build: Ausstehend.
- Lokale visuelle Prüfung Desktop/Mobile: Ausstehend.
- Push/Deploy: Nicht erfolgt.

## Rollback

```bash
git revert db23bc8
```

## Offene Punkte

- `npm run build` lokal auf dem Mac ausführen.
- Lokale visuelle Prüfung von `/team` durchführen: nach FitTest direkt Footer, kein „Bereit für ein Gespräch?".
- Prüfen, dass `cta_section` auf anderen Seiten (z.B. `/services`, `/about`) unverändert rendert.
- Erst danach separat über Push und Deploy entscheiden.
