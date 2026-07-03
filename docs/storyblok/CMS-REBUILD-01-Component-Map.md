# CMS-REBUILD-01 — Component Map: about_* Komponenten

**Status:** Lokal vorbereitet, Storyblok-Schemas noch nicht angelegt, kein API-Write erfolgt.

---

## 1. about_hero

| Storyblok-Feld | Typ | Pflicht | React-Prop | Render |
|----------------|-----|---------|------------|--------|
| `eyebrow` | text | — | `blok.eyebrow` | `<div class="hero-label">` |
| `headline` | text | ✅ | `blok.headline` | `<h1>` |
| `body` | textarea | — | `blok.body` | `<p>` |

**Komponente:** `components/blocks/AboutHero.js`
**CSS:** `.page-hero`, `.hero-label`, `.page-hero-inner`
**Reveal:** Nein (in `NO_REVEAL`)

---

## 2. about_working_why

| Storyblok-Feld | Typ | Pflicht | React-Prop | Render |
|----------------|-----|---------|------------|--------|
| `eyebrow` | text | — | `blok.eyebrow` | `<p class="section-label">` |
| `headline` | text | ✅ | `blok.headline` | `<h2 class="aw-why-headline">` |
| `body_1` | textarea | — | `blok.body_1` | `<p>` |
| `body_2` | textarea | — | `blok.body_2` | `<p>` |
| `body_3` | textarea | — | `blok.body_3` | `<p>` |

**Komponente:** `components/blocks/AboutWorkingWhy.js`
**CSS:** `.aw-why`, `.section-label`, `.aw-why-headline`, `.aw-why-text`

---

## 3. about_working_steps

| Storyblok-Feld | Typ | Pflicht | React-Prop | Render |
|----------------|-----|---------|------------|--------|
| `eyebrow` | text | — | `blok.eyebrow` | `<p class="section-label">` |
| `headline` | text | ✅ | `blok.headline` | `<h2 class="aw-steps-headline">` |
| `intro` | textarea | — | `blok.intro` | `<p class="aw-steps-intro">` |
| `step_1_number` | text | — | `blok.step_1_number` | `<span class="aw-step-num">` |
| `step_1_title` | text | ✅ | `blok.step_1_title` | `<h3 class="aw-step-title">` |
| `step_1_body` | textarea | — | `blok.step_1_body` | `<p class="aw-step-text">` |
| `step_2_*` / `step_3_*` / `step_4_*` | | — | | Wie step_1, title = Filter |

Schritte ohne `title` werden gefiltert.

**Komponente:** `components/blocks/AboutWorkingSteps.js`
**CSS:** `.aw-steps`, `.aw-steps-header`, `.aw-steps-grid`, `.aw-step`, `.aw-step-num`, `.aw-step-title`, `.aw-step-text`

---

## 4. about_working_benefits

| Storyblok-Feld | Typ | Pflicht | React-Prop | Render |
|----------------|-----|---------|------------|--------|
| `eyebrow` | text | — | `blok.eyebrow` | `<p class="section-label">` |
| `headline` | text | ✅ | `blok.headline` | `<h2 class="aw-benefits-headline">` |
| `b1_title` | text | ✅ | `blok.b1_title` | `<h3 class="aw-benefit-title">` |
| `b1_body` | textarea | — | `blok.b1_body` | `<p class="aw-benefit-text">` |
| `b2_*` / `b3_*` / `b4_*` | | — | | Wie b1, title = Filter |

**Komponente:** `components/blocks/AboutWorkingBenefits.js`
**CSS:** `.aw-benefits`, `.aw-benefits-header`, `.aw-benefits-grid`, `.aw-benefit`, `.aw-benefit-title`, `.aw-benefit-text`

---

## 5. about_team_reference

| Storyblok-Feld | Typ | Pflicht | React-Prop | Render |
|----------------|-----|---------|------------|--------|
| `eyebrow` | text | — | `blok.eyebrow` | `<p class="section-label">` |
| `headline` | text | ✅ | `blok.headline` | `<h2 class="aw-team-headline">` |
| `body` | textarea | — | `blok.body` | `<p class="aw-team-text">` |
| `person_1_name` | text | — | `blok.person_1_name` | `<strong class="aw-person-name">` |
| `person_1_role` | text | — | `blok.person_1_role` | `<span class="aw-person-role">` |
| `person_2_name` | text | — | | Wie person_1 |
| `person_2_role` | text | — | | |
| `link_label` | text | — | `blok.link_label` | `<Link class="link-arrow">` |
| `link_url` | text | — | `blok.link_url` | href (Fallback: `/team`) |

**Komponente:** `components/blocks/AboutTeamReference.js`
**CSS:** `.aw-team`, `.aw-team-header`, `.aw-team-people`, `.aw-person`, `.aw-person-name`, `.aw-person-sep`, `.aw-person-role`, `.link-arrow`

---

## 6. about_ecosystem_partners

| Storyblok-Feld | Typ | Pflicht | React-Prop | Render |
|----------------|-----|---------|------------|--------|
| `eyebrow` | text | — | `blok.eyebrow` | `<p class="section-label">` |
| `headline` | text | ✅ | `blok.headline` | `<h2 class="ep-headline">` |
| `intro` | textarea | — | `blok.intro` | `<p class="ep-intro">` |
| `solution_partner_intro` | textarea | — | | `<p class="ep-group-intro">` |
| `solution_partners` | bloks | ✅ | `blok.solution_partners` | 2-col Grid |
| `service_partner_intro` | textarea | — | | `<p class="ep-group-intro">` |
| `service_partners` | bloks | ✅ | `blok.service_partners` | 3-col Grid |

### Nested: about_partner_item

| Feld | Typ | Render |
|------|-----|--------|
| `name` | text | Textlabel oder unter Logo |
| `description` | textarea | `<p class="ep-card-desc">` |
| `url` | text | `<a>` statt `<div>` wenn gesetzt |
| `logo` | asset | `<img class="ep-card-logo">` wenn `filename` truthy |
| `relationship_note` | text | `<p class="ep-card-note">` |

Kein `tools`-Abschnitt. Kein Claude. Kein OpenAI.

**Komponente:** `components/blocks/AboutEcosystemPartners.js`
**CSS:** `.ep-section`, `.ep-header`, `.ep-group`, `.ep-group-meta`, `.ep-group-title`, `.ep-group-intro`, `.ep-cards--2col`, `.ep-cards--3col`, `.ep-card`, `.ep-card--link`, `.ep-card-inner`, `.ep-card-logo-area`, `.ep-card-logo`, `.ep-card-name-label`, `.ep-card-desc`, `.ep-card-note`

---

## 7. about_cta

| Storyblok-Feld | Typ | Pflicht | React-Prop | Render |
|----------------|-----|---------|------------|--------|
| `eyebrow` | text | — | `blok.eyebrow` | `<p class="section-label">` |
| `headline` | text | ✅ | `blok.headline` | `<h2 class="aw-cta-headline">` |
| `body` | textarea | — | `blok.body` | `<p class="aw-cta-text">` |
| `primary_label` | text | — | `blok.primary_label` | `<Link class="btn btn-light">` |
| `primary_url` | text | — | `blok.primary_url` | href (Fallback: `/contact`) |
| `secondary_label` | text | — | `blok.secondary_label` | `<Link class="link-arrow aw-cta-link">` |
| `secondary_url` | text | — | `blok.secondary_url` | href (Fallback: `/services`) |

**Komponente:** `components/blocks/AboutCta.js`
**CSS:** `.aw-cta`, `.aw-cta-headline`, `.aw-cta-text`, `.aw-cta-actions`, `.btn`, `.btn-light`, `.link-arrow`, `.aw-cta-link`

---

## DynamicBlock.js — Registrierungen

```js
about_hero: AboutHero,
about_working_why: AboutWorkingWhy,
about_working_steps: AboutWorkingSteps,
about_working_benefits: AboutWorkingBenefits,
about_team_reference: AboutTeamReference,
about_ecosystem_partners: AboutEcosystemPartners,
about_cta: AboutCta,
```

`NO_REVEAL`: `about_hero` ergänzt (neben `hero`, `page_hero`).

---

## Bestehende Komponenten — unverändert

`WorkingWhy.js`, `WorkingSteps.js`, `WorkingBenefits.js`, `WorkingTeamRef.js`, `WorkingPartners.js`, `WorkingCta.js`, `EcosystemPartners.js`, `PageHero.js` — alle bleiben im Repository und werden von keiner Änderung berührt.
