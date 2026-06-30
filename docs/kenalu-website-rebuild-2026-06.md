# kenalu Website Rebuild — Juni 2026

Dokumentation der vollständigen Website-Überarbeitung, umgesetzt in zwei Arbeitssessions.

---

## 1. Ausgangslage und Ziel

Die kenalu-Website wurde einer umfassenden inhaltlichen und strukturellen Überarbeitung unterzogen. Auslöser war eine neue strategische Positionierung: kenalu fokussiert auf **Intelligent Experiences** – die Verbindung von Strategie, Nutzerverständnis, Technologie und Umsetzung für digitale Produkte, die tragen.

**Neue zentrale Botschaft:**
> „Von der richtigen Entscheidung zu einem Produkt, das trägt."

**Neue Footer-Claim:**
> „Strategie, Experience und Engineering für digitale Produkte, die tragen."

---

## 2. Navigation und globale Struktur

### Neue Navigation
| Link | Ziel | Vorher |
|------|------|--------|
| Leistungen | /services | Services |
| Arbeitsweise | /about | About |
| Insights | /insights | Insights |
| Gespräch buchen (CTA) | /contact | — |

Entfernt: Home (mobile), Team, Lab aus der Hauptnavigation.

### Geänderte Dateien
- `components/Nav.js` — NAV_LINKS angepasst, DARK_HERO_PAGES aktualisiert
- `components/Footer.js` — Tagline-Fallback und Footer-Nav angepasst

---

## 3. Homepage

**Neue Struktur: 5 Blöcke** (vorher: 6+ Blöcke)

| Reihenfolge | Komponente | Storyblok-Block |
|-------------|-----------|-----------------|
| 1 | Hero | `hero` |
| 2 | Service-Triage (4 Einstiegskarten) | `service_entry_grid` |
| 3 | Kai-Hilfekarte (AssistantCallout) | `assistant_callout` |
| 4 | Arbeitsweise (WorkingPrinciples) | `working_principles` |
| 5 | CTA | `cta_section` |

Entfernt: provocation, alte assistant_callout, process_section.

**Storyblok-Story:** ID 186589154480136, published.

### Neue React-Komponenten (erstellt)
- `components/blocks/ServiceEntryGrid.js` — 4 Service-Einstiegskarten
- `components/blocks/AssistantCallout.js` — Kai-Hilfekarte
- `components/blocks/WorkingPrinciples.js` — Arbeitsweise mit principle_cards

---

## 4. Services-Übersicht

**Storyblok-Story:** `services` (ID aus Storyblok)

Hero + 4 Karten + CTA. Kein Kai-Block auf der Übersichtsseite.

### Service-Karten
| Kicker | Name | Slug |
|--------|------|------|
| 01 · Klarheit | Klarheit | /services/klarheit |
| 02 · Rapid Build | Rapid Build | /services/rapid-build |
| 03 · Produkt | Produkt | /services/produkt |
| 04 · Urteil | Urteil | /services/urteil |

Umbenennung: „AI-Produkt" → „Produkt"

---

## 5. Service-Detailseiten (4 Seiten)

Alle 4 Seiten wurden vollständig überarbeitet.

### Entfernte Elemente
- „Eine Situation"-Story-Abschnitt (ServiceDetailPage.js)
- Kai-Chat-Komponente (ServiceChat.js) — ersetzt durch passiven Hinweis
- Props `storyText`, `servicePrompts`

### Neue Elemente
- `approachText` — Prop für „Wie wir arbeiten"-Abschnitt
- Passiver Kai-Hinweis: „Noch nicht sicher, ob das passt? Kai hilft beim Einordnen →"
- Abschnittstitel: „Passt für euch, wenn …" und „Was dabei klarer wird oder entsteht"

### Storyblok-Inhalte (publiziert)

**01 · Klarheit** (ID 192817282147653)
- Headline: „Finden, worauf es sich wirklich lohnt zu setzen."
- 3 Outcome-Points, 3 Fit-Points, Approach-Text

**02 · Rapid Build** (ID 192817286141254)
- Headline: „Eine Idee testen, bevor sie zum grossen Projekt wird."
- 3 Outcome-Points, 3 Fit-Points, Approach-Text

**03 · Produkt** (ID 192817290282311)
- Headline: „Aus einer klaren Richtung ein tragfähiges Produkt machen."
- 3 Outcome-Points, 3 Fit-Points, Approach-Text

**04 · Urteil** (ID 192817294423369)
- Headline: „Eine unabhängige Sicht, bevor ihr euch festlegt."
- 3 Outcome-Points, 3 Fit-Points, Approach-Text

### Geänderte Dateien
- `components/blocks/ServiceDetailPage.js` — komplett überarbeitet
- `app/services/klarheit/page.js`
- `app/services/rapid-build/page.js`
- `app/services/produkt/page.js`
- `app/services/urteil/page.js`

---

## 6. About → Arbeitsweise

**URL bleibt:** `/about`  
**Nav-Label:** Arbeitsweise

### Storyblok-Update (ID 186589241977666)
- `page_hero_label`: „About" → „Arbeitsweise"
- `page_hero_headline`: „Wie wir arbeiten, ist Teil des Ergebnisses."
- `page_hero_subline`: „Strategie, Experience und Engineering aus einer Hand."
- `page_hero_text`: Aktualisiert auf neue Positionierung

---

## 7. Lab → Arbeitsproben

**URL bleibt:** `/lab`

### Storyblok-Update (lab/index, ID 190573598031390)
- `lp_label`: „Lab" → „Arbeitsproben"
- `lp_headline`: „Was wir gebaut haben.\nNicht beschrieben.\nGezeigt."
- `lp_sub`: Aktualisiert

### Code-Update
- `app/lab/page.js` — metadata title und DEFAULTS angepasst

---

## 8. Weitere Seitenänderungen

### Team
- `app/team/page.js` — Hero-Text vereinfacht, metadata description korrigiert (ihr/euch)
- Hero-Headline: „Die Menschen hinter kenalu."

### Insights
- `app/insights/page.js` — Hero-Sektion hinzugefügt
- `app/globals.css` — `.insights-hero` Klassen ergänzt

### Contact (Storyblok, ID 188835951094742)
- `contact_headline`: „Gespräch starten."
- `contact_intro`: Aktualisiert
- `contact_note`: Aktualisiert
- `contact_booking_headline`: „Termin buchen"

---

## 9. CSS-Ergänzungen

### Neue Klassen in globals.css
```
.insights-hero
.insights-hero-headline
.insights-hero-sub
.sdp-approach
.sdp-approach-text
.sdp-kai-hint
.sdp-kai-link
```

---

## 10. Storyblok-Konfiguration

### Space
- **Name:** kenalu
- **Space-ID:** 293099469334951
- **Preview Token:** in `.env.local` als `STORYBLOK_TOKEN`
- **Management API Token:** `sb_pat_mYxxSxpmsSJe1k7UEAJ39mH4006srhlIoypsU2rtf4I` — **NICHT committen**

### Komponenten-Registry (DynamicBlock.js)
Alle Blöcke sind registriert. Relevante neue Einträge:
- `service_entry_grid` → ServiceEntryGrid.js
- `assistant_callout` → AssistantCallout.js
- `working_principles` → WorkingPrinciples.js
- `service_entry_card` → ServiceEntryCard.js (Nested)
- `principle_card` → PrincipleCard.js (Nested)

---

## 11. Offene Punkte

- `zusammenarbeit_partners`-Block: Schema in Storyblok vorhanden (`partner_card`, `partner_card_category` als Filter), aber noch kein Ort auf der Website bestimmt (Team, About oder eigene Seite)
- Pre-existing Lint-Fehler in `app/error.js` und `InsightsFilter.js` (setState in useEffect) — nicht durch diesen Rebuild verursacht
- `ServiceChat.js` und API-Route `/api/service-chat` verbleiben im Code (Legacy, kann später entfernt werden)

---

## 13. Kai als direkt eingebetteter Gesprächspartner

**Entscheidung:** Kai wird nicht mehr als Link oder passiver Callout genutzt, sondern als direkt eingebetteter Gesprächspartner auf allen relevanten Seiten.

### Prinzip

- Immer sichtbare Gesprächsfläche (kein Click-to-Open)
- Erste Kai-Nachricht ist sofort sichtbar
- Kontextsensitiv: jede Platzierung hat eigenen `context_key`
- Ansprache: ihr/euch/eure — konsequent, keine Ausnahmen
- Datenschutzhinweis immer sichtbar
- Kein Verkaufsdruck: Kai hilft beim Einordnen, nicht beim Überzeugen

### Neue Dateien

| Datei | Zweck |
|-------|-------|
| `app/api/kai/route.js` | Neue Kai-API mit context_key und neuem Kai-Persona |
| `components/blocks/KaiDialogue.js` | Wiederverwendbare React-Komponente |
| `scripts/setup-kai-storyblok.mjs` | Storyblok-Setup-Script (einmalig ausführen) |

### Neue Storyblok-Komponente: `kai_dialogue`

Felder: `eyebrow`, `headline`, `intro`, `context_key`, `initial_message`, `input_placeholder`, `suggested_prompts` (Textarea, zeilengetrennt), `privacy_notice`, `show_contact_cta`, `contact_cta_label`, `contact_cta_link`

### Einbettungen

| Seite | Platzierung | context_key | Methode |
|-------|------------|-------------|---------|
| Homepage | Nach service_entry_grid, vor working_principles | `homepage` | Storyblok-Block |
| /services | Vor cta_section | `services` | Storyblok-Block |
| /services/klarheit | Nach Approach-Abschnitt | `service_klarheit` | Code (ServiceDetailPage.js) |
| /services/rapid-build | Nach Approach-Abschnitt | `service_rapid_build` | Code (ServiceDetailPage.js) |
| /services/produkt | Nach Approach-Abschnitt | `service_produkt` | Code (ServiceDetailPage.js) |
| /services/urteil | Nach Approach-Abschnitt | `service_urteil` | Code (ServiceDetailPage.js) |
| /contact | Vor contact_section | `contact` | Storyblok-Block |
| /insights | Zwischen Featured und Browse-Liste | `insights` | Code (insights/page.js) |

### Nicht auf diesen Seiten

`/about`, `/team`, `/lab`, Impressum, Datenschutz

### Kai-Persona (neue API `/api/kai`)

- Ruhig, klar, neugierig — keine Verkaufssprache
- Schweizer Schriftsprache (ss statt ß)
- Gesprächslogik: spiegeln → rückfragen → einordnen → verweisen → Gespräch vorschlagen
- `showContact: true` nur bei konkreter Projektsituation / Preis-/Ablauf-Fragen

### Geänderte Dateien

- `components/blocks/ServiceDetailPage.js` — `sdp-kai-hint` durch `<KaiDialogue>` ersetzt, `KAI_CONFIG` pro Service
- `app/insights/page.js` — `InsightsChat` durch `<KaiDialogue contextKey="insights">` ersetzt
- `components/DynamicBlock.js` — `kai_dialogue` registriert
- `app/globals.css` — vollständige `kai-dialogue`-CSS-Sektion ergänzt

### Storyblok-Setup

Einmalig ausführen:
```bash
cd /Users/dirkfliescher/Documents/kenalu-website
node scripts/setup-kai-storyblok.mjs
```

Das Script erstellt die `kai_dialogue`-Komponente und befüllt Homepage, /services und /contact.

---

## 14. Deployment

Hosting: Vercel (auto-deploy aus `main` Branch)

### Terminal-Befehle: Kai-Redesign deployen

```bash
cd /Users/dirkfliescher/Documents/kenalu-website

# 1. Storyblok-Setup (einmalig — Komponente + Stories)
node scripts/setup-kai-storyblok.mjs

# 2. Optionaler lokaler Build-Check
npm run build

# 3. Git-Commit und Push
git add -A
git status
git commit -m "feat: Kai als direkt eingebetteter Gesprächspartner (KaiDialogue, /api/kai, alle Seiten)"
git push origin main
```

Vercel deployt automatisch nach `git push`.
