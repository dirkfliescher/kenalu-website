# Komponente: ServicesCardGrid

**Datei:** `components/blocks/ServicesCardGrid.js`  
**Storyblok-Komponente:** `services_card_grid`  
**Verwendet auf:** /services

---

## Zweck

Gitter von Service-Karten. Auf /services zweimal verwendet: einmal für die 2 primären Leistungsbereiche, einmal für die 4 Arbeitsformen.

---

## Felder (Storyblok)

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| `eyebrow` | String | Abschnitts-Label |
| `headline` | String | Abschnitts-Überschrift |
| `intro` | String | Einleitungstext (optional) |
| `cards` | Array | Liste von `service_card_item`-Blöcken |

---

## Unter-Komponente: service_card_item

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| `label` | String | Kleines Label (z.B. "01 · Klarheit") |
| `title` | String | Karten-Titel |
| `text` | String | Karten-Text |
| `micro` | String | Mikro-Claim unter dem Text |
| `cta_label` | String | Link-Text |
| `href` | String | Ziel-URL |
| `visual_type` | String | Varianten-Kenner (z.B. `klarheit`, `rapid-build`, `produkt`, `urteil`) |

---

## Struktur auf /services

**Grid 1 — Primäre Leistungsbereiche:**
- `custom-ai-product` → "Ihr braucht Software, die es so nicht gibt."
- `ai-development-consulting` → "Ihr wollt, dass eure Teams anders entwickeln."

**Grid 2 — Arbeitsformen:**
- `01 · Klarheit` → /services/klarheit
- `02 · Rapid Build` → /services/rapid-build
- `03 · Produkt` → /services/produkt
- `04 · Urteil` → /services/urteil

---

## Anmerkungen

- `visual_type` für die 2 primären Leistungsbereiche ist leer `''` (kein spezielles Visual)
- Arbeitsformen nutzen `visual_type` für animierte oder ikonische Varianten
