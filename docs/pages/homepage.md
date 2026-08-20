# Page: Homepage (/)

**Route:** `/`  
**Storyblok Story ID:** `185993926251643`  
**Slug:** `home`  
**page.js:** `app/page.js`  
**Letztes Update:** 2026-08-20

---

## Positionierung

Zentraler Einstiegspunkt. Transportiert die Kernthese: **"AI verändert, wie Software entsteht. Und damit, was sich individuell zu bauen lohnt."**

Terracotta-Akzent auf `verändert` (hero_accent_word).

---

## Blöcke (Storyblok body)

| # | Komponente | Inhalt |
|---|-----------|--------|
| 1 | `hero` | Headline mit Akzentwort, Subline, CTA |
| 2 | `service_entry_grid` | 2 primäre + 4 untergeordnete Leistungsbereiche |
| 3 | `working_principles` | 3 Arbeitsprinzipien (agentenunterstützt, menschlich verantwortet, evolutionär) |
| 4 | `cta_section` | Abschluss-CTA Richtung /contact |

---

## Schlüsselfelder

- `hero.headline`: Haupttitel
- `hero.hero_accent_word`: Wort, das terracotta hervorgehoben wird (aktuell: `verändert`)
- `hero.subline`: Unter-Headline
- `hero.cta_label` / `hero.cta_url`: Primärer CTA

---

## Migration

Script: `scripts/migrate-homepage.mjs`  
Patch Akzentwort: `scripts/patch-hero-accent.mjs`

---

## SEO

- Title: `kenalu — Intelligent Experiences`
- Description: In page.js definiert als Fallback, primär via Storyblok `seo_title`/`seo_description`
- Canonical: `https://kenalu.ch/`

---

## Anmerkungen

- Story ist publiziert (Stand: 2026-08-20)
- `hero_accent_word` = `verändert` gesetzt und live
