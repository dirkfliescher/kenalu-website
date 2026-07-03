# CMS-Rebuild-Inventory — kenalu-website

Stand: 2026-07-03

Übersicht aller Routen: aktueller Zustand, Zielzustand und Priorität für Storyblok-Migration.

---

## /about — Arbeitsweise

| Feld | Wert |
|------|------|
| **Aktueller Zustand** | Code fertig (CMS-REBUILD-01). Fallback-Mode aktiv (Storyblok noch nicht konfiguriert). |
| **Zielzustand** | Storyblok-first mit `about_*`-Komponenten, Fallback bei CMS-Ausfall |
| **CMS-Story** | `about` (ID: `186589241977666`) |
| **Komponenten** | `about_hero`, `about_working_why`, `about_working_steps`, `about_working_benefits`, `about_team_reference`, `about_ecosystem_partners`, `about_cta` |
| **React-Dateien** | `app/about/page.js`, `app/about/_fallback-content.js`, `components/blocks/About*.js` |
| **Fallback** | `app/about/_fallback-content.js` — vollständiger Snapshot des Produktionsstands |
| **Migration-Script** | `scripts/cms-rebuild-about.mjs` (gitignored, lokal ausführen) |
| **Priorität** | 🔴 Aktiv (CMS-REBUILD-01) |
| **Status** | Code committed (`17c86f7`). Build + QA ausstehend. Storyblok-Apply ausstehend (Management-Token lokal vorhanden). |
| **Abhängigkeiten** | `STORYBLOK_MANAGEMENT_TOKEN` in `.env.local`, lokaler Build-Check, lokale visuelle QA |

---

## / — Homepage

| Feld | Wert |
|------|------|
| **Aktueller Zustand** | Storyblok-first (stabil) |
| **Zielzustand** | Beibehalten |
| **CMS-Story** | `home` (ID: `185993926251643`) |
| **Priorität** | ⚪ Kein Handlungsbedarf |
| **Status** | Stabil |

---

## /services — Leistungsübersicht

| Feld | Wert |
|------|------|
| **Aktueller Zustand** | Storyblok-first |
| **Zielzustand** | Beibehalten. Fallback-Pattern von /about übertragbar. |
| **CMS-Story** | `services` (ID: `186361777859852`) |
| **Priorität** | 🟡 Mittelfristig |
| **Status** | Stabil |

---

## /services/klarheit, /rapid-build, /produkt, /urteil

| Feld | Wert |
|------|------|
| **Aktueller Zustand** | Vollständig statisch |
| **Zielzustand** | Langfristig: Storyblok-first |
| **Priorität** | 🟢 Niedrig |
| **Status** | Stabil |

---

## /team

| Feld | Wert |
|------|------|
| **Aktueller Zustand** | Vollständig statisch |
| **Zielzustand** | Storyblok-first für Personen und Texte |
| **Priorität** | 🟡 Mittelfristig |
| **Status** | Stabil. Kandidat für nächsten CMS-REBUILD. |

---

## /lab

| Feld | Wert |
|------|------|
| **Aktueller Zustand** | Vollständig statisch |
| **Zielzustand** | Storyblok-first für Lab-Übersicht und Artikel |
| **Priorität** | 🟡 Mittelfristig |
| **Status** | Stabil |

---

## /insights — Blog

| Feld | Wert |
|------|------|
| **Aktueller Zustand** | Storyblok-first (dynamisch via Stories) |
| **Zielzustand** | Beibehalten |
| **Priorität** | ⚪ Kein Handlungsbedarf |
| **Status** | Stabil |

---

## /contact

| Feld | Wert |
|------|------|
| **Aktueller Zustand** | Hybrid: statischer Code + Calendly-Widget |
| **Zielzustand** | Beibehalten |
| **Priorität** | ⚪ Kein Handlungsbedarf |
| **Status** | Stabil |

---

## /check — Fit-Test

| Feld | Wert |
|------|------|
| **Aktueller Zustand** | Vollständig statisch |
| **Priorität** | ⚪ Kein Handlungsbedarf |
| **Status** | Stabil |

---

## Empfohlene Migrations-Reihenfolge

1. 🔴 `/about` — CMS-REBUILD-01 (Code fertig, Apply + QA ausstehend)
2. `/services` — Fallback-Pattern ergänzen (niedrige Komplexität)
3. `/team` — Personen-Content CMS-gesteuert
4. `/lab` — Artikel-Content CMS-gesteuert
