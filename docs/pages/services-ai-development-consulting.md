# Page: AI Development Consulting (/services/ai-development-consulting)

**Route:** `/services/ai-development-consulting`  
**Storyblok Story ID:** `211100245330550`  
**Slug:** `ai-development-consulting` _(Root-Level, kein Ordner-Prefix)_  
**page.js:** `app/services/ai-development-consulting/page.js`  
**Letztes Update:** 2026-08-20

---

## Positionierung

Primärer Leistungsbereich: Agentenunterstützte Entwicklung in Organisationen und Teams einführen.

Kernbotschaft: "Ihr wollt, dass eure Teams anders entwickeln."  
Mikro-Claim: "Von Assessment bis zur verankerten Fähigkeit."

---

## Blöcke (Storyblok body)

Stand 2026-08-20 — vollständiger Inhalt wurde im Script `migrate-new-services.mjs` hinterlegt.

| # | Komponente | Inhalt |
|---|-----------|--------|
| 1 | `sd_hero` | Eyebrow: AI DEVELOPMENT CONSULTING; Headline: "Agentenunterstützte Entwicklung einführen heisst nicht, Tools umzustellen." |
| 2 | `sd_why` | "Warum der Wandel mehr als Tool-Einführung ist" |
| 3 | `sd_what` | 4 Leistungen (Assessment, Pilotprojekt, Befähigung, Begleitung) |
| 4 | `sd_how` | Verweis auf Produktkreislauf / Arbeitsweise |
| 5 | `sd_fit` | Ehrliche Einschätzung: für wen es passt / nicht passt |
| 6 | `kai_dialogue` | Kai: "Bereit für agentenunterstützte Entwicklung?" |
| 7 | `sd_cta` | "Den Wandel starten?" → /contact |

---

## Technische Details

- page.js fetcht von: `cdn/stories/ai-development-consulting` (Root-Level)
- Dev-Modus: `version: 'draft'`; Prod: `version: 'published'`
- Fallback (leerer Body): `<main className="sd-page sd-page--ai-development-consulting" />`

---

## Migration

Script: `scripts/migrate-new-services.mjs`  
Publish: `scripts/publish-new-services.mjs` (Story-ID direkt ansprechen)

**Status (2026-08-20):** Draft — noch nicht publiziert (Publish-Limit erreicht).  
Publizieren: `node scripts/publish-new-services.mjs`

---

## SEO

- Title: `AI Development Consulting — Agentenunterstützte Entwicklung einführen | kenalu`
- Description: `kenalu begleitet Entwicklungsteams und Organisationen beim Einführen agentenunterstützter Produktentwicklung. Nicht durch Schulungen. Durch gemeinsames Arbeiten an echter Software.`
- Canonical: `https://kenalu.ch/services/ai-development-consulting`

---

## Anmerkungen

- Story liegt auf Root-Level (slug: `ai-development-consulting`)
- /services verlinkt: `href: '/services/ai-development-consulting'`
- Navigation-Link von Homepage zu diesem Service: Anfang der Session war er nicht klickbar (route fehlte), jetzt behoben
