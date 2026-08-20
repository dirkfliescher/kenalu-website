# Page: Approach (/approach)

**Route:** `/approach`  
**Storyblok Story ID:** `186589241977666`  
**Slug:** `approach`  
**page.js:** `app/approach/page.js`  
**Letztes Update:** 2026-08-20

---

## Positionierung

Beschreibt das kenalu-Arbeitsmodell: **Von der Projektkette zum Produktkreislauf.**

Kernthese: AI verändert nicht nur die Entwicklungsgeschwindigkeit, sondern die Reihenfolge, in der Entscheidungen getroffen werden. Das agile Versprechen wird jetzt wirtschaftlich einlösbar.

---

## Blöcke (Storyblok body)

| # | Komponente | Inhalt |
|---|-----------|--------|
| 1 | `about_hero` | "Von der Projektkette zum Produktkreislauf." |
| 2 | `about_working_why` | "Das agile Versprechen war immer richtig. Jetzt wird es wirtschaftlich einlösbar." |
| 3 | `about_working_steps` | 4 Schritte: Verstehen → Bauen → Lernen → Verbessern |
| 4 | `about_working_benefits` | 4 Vorteile: Früher am echten Produkt / Durchgängige Verantwortung / Evolutionär ≠ beliebig / Enterprise-ready ≠ enterprise-sized |
| 5 | `about_team_reference` | Dirk Fliescher + Stanislav Raskin; Link → /about |
| 6 | `about_ecosystem_partners` | Technologie- und Service-Partner (unverändert) |
| 7 | `about_cta` | "Bereit, früher am echten Produkt zu denken?" → /contact |

---

## Feldstruktur

### about_hero
`eyebrow`, `headline`, `body`

### about_working_why
`eyebrow`, `headline`, `body_1`, `body_2`, `body_3`

### about_working_steps
`eyebrow`, `headline`, `intro`, `step_N_number`, `step_N_title`, `step_N_body` (N = 1–4)

### about_working_benefits
`eyebrow`, `headline`, `bN_title`, `bN_body` (N = 1–4)

### about_team_reference
`eyebrow`, `headline`, `body`, `person_1_name`, `person_1_role`, `person_2_name`, `person_2_role`, `link_label`, `link_url`

### about_ecosystem_partners
`solution_partners[]`, `service_partners[]` (komplexe Arrays, nicht verändern ohne Script)

### about_cta
`eyebrow`, `headline`, `body`, `primary_label`, `primary_url`, `secondary_label`, `secondary_url`

---

## Migration

Script: `scripts/migrate-approach.mjs`  
Merkt: `about_ecosystem_partners` wird NICHT überschrieben (Pattern: `{ ...blok, ...update }` — fehlende UPDATES-Keys bleiben erhalten).

**Status (2026-08-20):** Script erstellt, noch nicht ausgeführt.  
Ausführen:
```
export STORYBLOK_MANAGEMENT_TOKEN=$(sed -n 's/^STORYBLOK_MANAGEMENT_TOKEN=//p' app/.env.local)
node scripts/migrate-approach.mjs --dry-run
node scripts/migrate-approach.mjs
STORYBLOK_ALLOW_PUBLISH=YES node scripts/migrate-approach.mjs --publish
```

---

## Fallback-Content

`app/approach/_fallback-content.js` — enthält alle Feldnamen und Beispielinhalte. Wird gerendert, wenn Storyblok-Story leer ist.

---

## SEO

- Canonical: `https://kenalu.ch/approach`
