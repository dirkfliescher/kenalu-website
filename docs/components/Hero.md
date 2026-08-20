# Komponente: Hero

**Datei:** `components/blocks/Hero.js`  
**Storyblok-Komponente:** `hero`  
**Verwendet auf:** Homepage (`/`)

---

## Zweck

Haupt-Hero der Homepage. Zeigt Headline mit optionalem Akzentwort (terracotta), Subline, Body-Text und CTA-Button.

---

## Felder (Storyblok)

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| `eyebrow` | String | Kleiner Text über der Headline |
| `headline` | String | Haupt-Headline |
| `hero_accent_word` | String | Wort in der Headline, das terracotta hervorgehoben wird |
| `subline` | String | Unter-Headline / Einleitung |
| `body` | String | Fliesstext |
| `cta_label` | String | Beschriftung des CTA-Buttons |
| `cta_url` | String | Ziel-URL des CTA-Buttons |

---

## Akzent-Mechanismus

Das Wort in `hero_accent_word` wird in der Headline mit der CSS-Klasse `.hero-accent` gerendert (Farbe: terracotta).

Aktueller Wert: `verändert`  
Gesetzt via: `scripts/patch-hero-accent.mjs`

---

## CSS

`.hero-accent` in `app/globals.css` — terracotta Textfarbe.

---

## Anmerkungen

- Akzentwort muss exakt so geschrieben sein wie in der Headline (case-sensitive)
- Nur ein Akzentwort möglich
