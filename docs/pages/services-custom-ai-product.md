# Page: Custom AI Product Development (/services/custom-ai-product)

**Route:** `/services/custom-ai-product`  
**Storyblok Story ID:** `211100241791605`  
**Slug:** `custom-ai-product` _(Root-Level, kein Ordner-Prefix)_  
**page.js:** `app/services/custom-ai-product/page.js`  
**Letztes Update:** 2026-08-20

---

## Positionierung

Primärer Leistungsbereich: Individuelle Software- und AI-Produkte, die mit AI-Agenten wirtschaftlicher werden.

Kernbotschaft: "Ihr braucht Software, die es so nicht gibt."  
Mikro-Claim: "Agentenunterstützt. Von Menschen verantwortet."

---

## Blöcke (Storyblok body)

Stand 2026-08-20 — vollständiger Inhalt wurde im Script `migrate-new-services.mjs` hinterlegt.

| # | Komponente | Inhalt |
|---|-----------|--------|
| 1 | `sd_hero` | Eyebrow: CUSTOM AI PRODUCT DEVELOPMENT; Headline: "Individuelle Software wird häufiger die richtige Wahl." |
| 2 | `sd_why` | "Warum individuelle Software wieder sinnvoll wird" |
| 3 | `sd_what` | 4 Leistungen (Strategie & Konzept, Entwicklung & Prototyping, Launch & Betrieb, Weiterentwicklung) |
| 4 | `sd_how` | Verweis auf Produktkreislauf / Arbeitsweise |
| 5 | `sd_fit` | Ehrliche Einschätzung: für wen es passt / nicht passt |
| 6 | `kai_dialogue` | Kai: "Macht individuelle Software für euch Sinn?" |
| 7 | `sd_cta` | "Bereit für das Gespräch?" → /contact |

---

## Technische Details

- page.js fetcht von: `cdn/stories/custom-ai-product` (Root-Level, NICHT `service-detail/...`)
- Dev-Modus: `version: 'draft'`; Prod: `version: 'published'`
- Fallback (leerer Body): `<main className="sd-page sd-page--custom-ai-product" />`

---

## Migration

Script: `scripts/migrate-new-services.mjs`  
Publish: `scripts/publish-new-services.mjs` (Story-ID direkt ansprechen)

**Status (2026-08-20):** Draft — noch nicht publiziert (Publish-Limit erreicht).  
Publizieren: `node scripts/publish-new-services.mjs`

---

## SEO

- Title: `Custom AI Product Development — Individuelle Software und AI-Produkte | kenalu`
- Description: `kenalu entwickelt individuelle Software und AI-Produkte. Agentenunterstützt entwickelt, von Menschen verantwortet. Von der ersten Frage bis zum Betrieb.`
- Canonical: `https://kenalu.ch/services/custom-ai-product`

---

## Anmerkungen

- Story liegt auf Root-Level (slug: `custom-ai-product`), weil `service-detail`-Ordner nicht existiert
- page.js und Storyblok-Slug stimmen überein — beide auf Root-Level
- /services verlinkt: `href: '/services/custom-ai-product'`
