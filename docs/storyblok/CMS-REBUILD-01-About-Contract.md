# CMS-REBUILD-01 — Verbindlicher Contract: /about mit about_* Komponenten

**Status:** Lokal vorbereitet, Build + visuelle QA ausstehend, kein Storyblok-Write erfolgt.

---

## Verbindliche Regel

Die Seite `/about` akzeptiert genau **7 Blöcke** in exakt dieser Reihenfolge:

| Position | Storyblok-Typ | Pflichtfelder | React-Komponente |
|----------|--------------|---------------|-----------------|
| 1 | `about_hero` | `headline` | `AboutHero.js` |
| 2 | `about_working_why` | `headline` | `AboutWorkingWhy.js` |
| 3 | `about_working_steps` | `headline`, `step_1_title` | `AboutWorkingSteps.js` |
| 4 | `about_working_benefits` | `headline`, `b1_title` | `AboutWorkingBenefits.js` |
| 5 | `about_team_reference` | `headline` | `AboutTeamReference.js` |
| 6 | `about_ecosystem_partners` | `headline`, `solution_partners[]`, `service_partners[]` | `AboutEcosystemPartners.js` |
| 7 | `about_cta` | `headline` | `AboutCta.js` |

**Jede Abweichung** (falsche Anzahl, falsche Reihenfolge, fehlende Pflichtfelder, leere Partnerarrays) führt zum Fallback auf `FALLBACK_ABOUT_BODY`.

---

## Partner-Regeln

- **Kein `tools`-Abschnitt** in `about_ecosystem_partners`
- **Kein Claude**, kein OpenAI in den Partnergruppen
- `solution_partners`: mindestens 1 Eintrag, jeder mit `name` (nicht leer)
- `service_partners`: mindestens 1 Eintrag, jeder mit `name` (nicht leer)
- Logos: Optional. Falls `logo.filename` leer → Textlabel (`ep-card-name-label`)

### Erwartete Partner (Produktionsstand)

**Solution Partner:**
- Emporix — Headless Commerce
- Storyblok — Headless CMS

**Service Partner:**
- Beebase — UX-Design
- Skyquest — Frontend-Engineering
- Soulcode — Backend-Engineering

---

## Fallback-Logik (in `app/about/page.js`)

```js
function isValidBody(body) {
  if (!Array.isArray(body)) return false;
  if (body.length !== 7) return false;
  return ALLOWED_SEQUENCE.every((type, i) => isValidBlok(body[i], type));
}

const blocks = isValidBody(cmsBody) ? cmsBody : FALLBACK_ABOUT_BODY;
```

Der Fallback rendert identisch wie der CMS-Pfad — selbe Komponenten, selbe CSS-Klassen.

---

## Storyblok-Setup (ausstehend, lokal ausführen)

```bash
# Dry-Run — zeigt was erstellt würde
node scripts/cms-rebuild-about.mjs --dry-run

# Apply — erstellt Komponenten + befüllt Story als Draft
STORYBLOK_ALLOW_WRITE=YES node scripts/cms-rebuild-about.mjs --apply

# Verify — prüft Ergebnis
node scripts/cms-rebuild-about.mjs --verify
```

Voraussetzung: `STORYBLOK_MANAGEMENT_TOKEN` in `.env.local`. Token wird nie geloggt, committet oder ausgegeben.

---

## Was nicht geändert werden darf

- `globals.css` — kein neues CSS für about_* notwendig; alle Klassen existieren bereits
- `working_*` und `ecosystem_partners` Storyblok-Schemas — werden nicht überschrieben
- Andere Seiten — /team, /services, /lab, /contact bleiben unverändert
