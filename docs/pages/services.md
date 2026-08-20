# Page: Services (/services)

**Route:** `/services`  
**Storyblok Story ID:** `186361777859852`  
**Slug:** `services`  
**page.js:** `app/services/page.js`  
**Letztes Update:** 2026-08-20

---

## Positionierung

Übersichtsseite für alle Leistungsbereiche. Neue Struktur (ab 2026-08): Zwei primäre Leistungsbereiche (`custom-ai-product`, `ai-development-consulting`) als Primär-Einstieg, vier Arbeitsformen (`klarheit`, `rapid-build`, `produkt`, `urteil`) als untergeordnete Arbeitsweisen.

---

## Blöcke (Storyblok body)

| # | Komponente | Inhalt |
|---|-----------|--------|
| 1 | `services_hero` | "Wir bauen für euch. Wir verändern mit euch, wie ihr baut." |
| 2 | `services_card_grid` | 2 primäre Leistungsbereiche |
| 3 | `services_card_grid` | 4 Arbeitsformen |
| 4 | `kai_dialogue` | Kai-Chat: "Noch nicht sicher, wo ihr steht?" |
| 5 | `services_approach` | Verweis auf /approach — Produktkreislauf-Kurzerklärung |
| 6 | `services_cta` | Abschluss-CTA |

---

## Migration

Script: `scripts/migrate-services.mjs`

**Status (2026-08-20):** Als Draft gespeichert (Storyblok Publish-Limit erreicht).  
Publizieren: `STORYBLOK_ALLOW_PUBLISH=YES node scripts/migrate-services.mjs --publish`

---

## Kai-Kontext

`context_key`: `services-story`  
`suggested_prompts`: Newline-separierter String (nicht Array!)

---

## SEO

- Title: `Leistungen — kenalu`
- Canonical: `https://kenalu.ch/services`

---

## Anmerkungen

- Neue Struktur ist als Draft, noch nicht live (Stand: 2026-08-20)
- Vorgänger-Block `services_section` (ehemals "Wie wir vorgehen") ist nicht mehr Teil des neuen Bodys
- `service_card_item.visual_type` steuert visuelle Variante der Arbeitsform-Karten
