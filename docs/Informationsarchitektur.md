# Informationsarchitektur – kenalu.ch

## Dokumentstatus

| Feld | Wert |
|---|---|
| Stand | Juli 2026 |
| Verantwortlich | Dirk Fliescher / kenalu |
| Letzte technische Prüfung | 2026-07-02 (IA-001, vollständige Codebase-Analyse) |
| Git-Baseline Produktion | `fd9160e8c84f186b3bb1a0d7014b3e8d685626df` (origin/main) |
| Git-Baseline Lokal | `ac4e7bc4c4e650abb15628c93fe9cc828564e74d` (1 Commit ahead) |
| Backup-Branch | `archive/ia-prework-2026-07-02` → `ac4e7bc` |
| Branch | `main` |
| Storyblok Space-ID | `293099469334951` |
| Storyblok-Umgebung | Produktion (published) / Development (draft) |
| Gültigkeit | Bis zur nächsten IA-Entscheidung |
| Änderungsregel | Jede Änderung wird vor und nach Umsetzung im IA-Änderungsprotokoll eingetragen |

---

## Archivierungs- und Rückbauprinzip (verbindlich)

> Keine Komponenten, Seiten, Storyblok-Stories, API-Routen, CSS-Dateien oder interaktiven Elemente endgültig löschen, ausser eine explizite Freigabe liegt vor.
>
> Nicht mehr benötigte Elemente werden zuerst dokumentiert, dann aus dem öffentlichen Rendering entfernt oder depubliziert und anschliessend als `archived`, `deprecated` oder `experimental` markiert.
>
> Vor einer CMS-Änderung wird der bisherige Inhalt gesichert. Vor einer Code-Änderung wird der Ausgangs-Commit dokumentiert.
>
> Jede Veränderung erhält einen klaren Rollback-Weg.

---

## Dokumentenstatus und Quellenhierarchie

### Verbindliche aktuelle Dokumente
- `docs/Informationsarchitektur.md`
- `docs/Komponenten-Inventar.md`
- `docs/IA-Aenderungsprotokoll.md`

### Technische Sicherungen
- `docs/rollback/…`

### Historische Umsetzungsnotizen
Diese Dokumente beschreiben frühere Entscheidungen oder Zwischenstände.
Sie sind keine verlässliche Beschreibung des aktuellen Produktionsstands:
- `docs/kenalu-website-rebuild-2026-06.md`
- `docs/kenalu-services-storytelling-rebuild-2026-06.md`
- `docs/kenalu-lab-recovery-2026-06.md`
- `docs/kenalu-productmoment-prototype-2026-06.md`
- `docs/kenalu-cleanup-2026-07.md`
- `docs/kai-audit-2026-07.md`
- `docs/storybook-setup-2026-07.md`
- `docs/storyblok-partner-blocks.md`
- `docs/ia-inventur-2026-07.md`

### Regel
Bei Widersprüchen gilt:
1. direkt geprüfter Live- oder Code-Zustand
2. `Informationsarchitektur.md`
3. `Komponenten-Inventar.md`
4. `IA-Aenderungsprotokoll.md`
5. historische Umsetzungsnotizen

---

## Zweck der Website

kenalu.ch ist die primäre digitale Präsenz von kenalu. kenalu entwickelt AI-Produkte und intelligente digitale Experiences. AI Products beschreibt, was kenalu entwickelt. Intelligent Experiences beschreibt, wie kenalu denkt: kontextorientiert, auf echte Aufgaben ausgerichtet, nutzerzentriert und geschäftlich wirksam. Die Website soll:

- Potenziellen Kunden verständlich machen, womit kenalu helfen kann und wie die Zusammenarbeit aussieht
- Die vier Leistungsangebote (Klarheit, Rapid Build, Produkt, Urteil) konkret und unterscheidbar darstellen
- Konversation ermöglichen — durch KAI, durch Direktkontakt und durch Inhalte
- Als Arbeitsprobe dienen: die Website selbst ist ein Beispiel für kenalusches Vorgehen
- Vertrauen aufbauen durch Transparenz über Arbeitsweise, Team und Haltung

---

## Aktuelle Hauptnavigation

Quelle: `components/Nav.js` (hardcoded in JS, nicht via Storyblok steuerbar)

| Label | Route | Tatsächliche Seitenrolle | Rendering | Status |
|---|---|---|---|---|
| _(Logo kenalu)_ | `/` | Positionierung, Einstieg, Kai | Storyblok → DynamicBlock | ✅ Live |
| Leistungen | `/services` | Vier Einstiege in die Zusammenarbeit | Statisches JSX | ✅ Live |
| Arbeitsweise | `/about` | Wie kenalu arbeitet | Storyblok → DynamicBlock | ⚠️ Aktuell leer — Storyblok-Script nötig |
| Lab | `/lab` | Prototypen, Arbeitsproben, Experimente | Statisches JSX | ✅ Live |
| Insights | `/insights` | Artikel und Perspektiven | Storyblok + statischer Frame | ✅ Live |
| Über kenalu | `/team` | Team, Persönlichkeit, Mitwirken | Hybrid: Storyblok + statisch | ✅ Live |
| [CTA] Gespräch starten | `/contact` | Erstgespräch, Terminbuchung | Storyblok → DynamicBlock | ✅ Live |

**⚠️ Slug-Anmerkung:** Die Slugs `/about` und `/team` spiegeln ihre aktuellen Navigationstitel nicht direkt wider. `/about` heisst in der Nav "Arbeitsweise", `/team` heisst "Über kenalu". Diese Differenz ist bekannt und wird **in einem separaten Entscheid** behandelt — derzeit keine Slug-Änderung.

**Footer-Navigation:** Quelle `components/Footer.js` + Storyblok `config/footer`. Enthält: Leistungen, Arbeitsweise, Lab, Insights, Über kenalu, Kontakt, Impressum, Datenschutz.

---

## Aktuelle Zielgruppen und Nutzerwege

| Zielgruppe | Typische Frage | Sinnvoller Einstieg | Zielhandlung |
|---|---|---|---|
| Potenzielle Kunden (digital orientierte Unternehmen, Entscheider) | Wer ist kenalu, was kann kenalu für uns tun? | Homepage → Leistungen | Kontakt aufnehmen |
| Entscheider mit konkretem Vorhaben | Welche Leistung passt zu unserer Situation? | `/services` → Service-Detail | Kai nutzen, Gespräch starten |
| Interessierte, die mehr verstehen wollen | Wie arbeitet kenalu eigentlich? | `/about` (Arbeitsweise) | Kontext aufbauen, Vertrauen gewinnen |
| Personen, die potenziell mitwirken wollen | Passe ich zu kenalu? | `/team` → Mitwirken-Bereich | Kontakt aufnehmen |
| Inhaltlich Neugierige | Was denkt kenalu über Strategie / AI / UX? | `/insights` | Lesen, Kai fragen, Newsletter |
| Technisch Interessierte / Partner | Was baut kenalu eigentlich selbst? | `/lab` | Lab erkunden, Gespräch starten |

---

## Aktuelle Seitenarchitektur

### `/` — Homepage

- **Navigationstitel:** — (Logo)
- **H1:** Aus Storyblok (Story `home`) — aktueller Stand zu verifizieren
- **Rolle:** Erster Eindruck, Positionierung, Einstieg in Leistungen und Konversation
- **Rendering:** Storyblok → `DynamicBlock` (ISR, 60s)
- **Hauptkomponenten:** `Hero`, `AssistantCallout` (→ HomeChat → KAI via `/api/home-chat`)
- **KAI:** HomeChat, contextKey `homepage` — ⚠️ nutzt Legacy-Route `/api/home-chat`, nicht `/api/kai`
- **Unklarheiten:** Welche Blöcke genau in der Storyblok-Story `home` aktiv sind, wurde nicht vollständig geprüft

---

### `/services` — Leistungen

- **Navigationstitel:** Leistungen
- **H1:** "Nicht jede gute Idee braucht denselben Anfang."
- **Rolle:** Übersicht der vier Leistungsangebote, situativer Einstieg
- **Rendering:** Statisches JSX — `app/services/page.js`
- **Hauptkomponenten:** Vier Service Cards (SVG-Visuals), KaiDialogue
- **KAI:** KaiDialogue, contextKey `services-story`, `/api/kai`
- **Anmerkung:** Es existiert eine Storyblok-Story `services` (ID: 186361777859852) — ob diese Story noch Content hat oder wie sie genutzt wird, ist zu verifizieren

---

### `/services/klarheit` — Klarheit

- **H1:** Aus Storyblok `service-detail/klarheit` (SEO-Fallback hardcoded)
- **Rolle:** Detailseite Leistung 01
- **Rendering:** Statisches JSX + Storyblok für SEO — `app/services/klarheit/page.js`
- **KAI:** KaiDialogue, contextKey `klarheit-story`, `/api/kai`
- **Status:** ✅ Live. Nicht in Sitemap — ⚠️ SEO-Lücke

### `/services/rapid-build` — Rapid Build

- **Rendering:** Statisches JSX + Storyblok für SEO — `app/services/rapid-build/page.js`
- **KAI:** KaiDialogue, contextKey `rapid-build-story`, `/api/kai`
- **Status:** ✅ Live. Nicht in Sitemap — ⚠️ SEO-Lücke

### `/services/produkt` — Produkt

- **Rendering:** Statisches JSX + Storyblok für SEO — `app/services/produkt/page.js`
- **KAI:** KaiDialogue, contextKey `produkt-story`, `/api/kai`
- **Status:** ✅ Live. Nicht in Sitemap — ⚠️ SEO-Lücke

### `/services/urteil` — Urteil

- **Rendering:** Statisches JSX + Storyblok für SEO — `app/services/urteil/page.js`
- **KAI:** KaiDialogue, contextKey `urteil-story`, `/api/kai`
- **Status:** ✅ Live. Nicht in Sitemap — ⚠️ SEO-Lücke

---

### `/about` — Arbeitsweise

- **Navigationstitel:** Arbeitsweise
- **H1:** "Wie wir arbeiten, ist Teil des Ergebnisses."
- **Rolle:** Darstellung der Arbeitsweise — Warum / Wie / Was / Team-Verweis / Partner / CTA
- **Rendering (Produktion):** `Live` — STATISCH. `app/about/page.js` rendert Working\*-Komponenten direkt (kein Storyblok, kein DynamicBlock). Inhalt ist im Code hardcoded.
- **Rendering (Staged, nicht committed):** `Staged / noch nicht committed` — `app/about/page.js` ist auf Storyblok-First (DynamicBlock) umgestellt. Working\*-Komponenten akzeptieren `blok`-Props.
- **Hauptkomponenten Produktion:** `WorkingWhy`, `WorkingSteps`, `WorkingBenefits`, `WorkingTeamRef`, `WorkingPartners`, `WorkingCta` — alle mit hardcodiertem Content, kein Storyblok
- **KAI:** `Zu verifizieren` — KaiDialogue auf `/about` war für Storyblok-Block geplant; in der aktuellen statischen Produktion nicht eingebunden
- **DynamicBlock:** `Staged / noch nicht committed` — Working\*-Registrierung ist staged, aber noch nicht deployed
- **Storyblok-Script:** `Geplant / noch nicht umgesetzt` — `scripts/rebuild-about-arbeitsweise.js` wurde **nicht** ausgeführt. Die Storyblok-Story `about` ist nicht auf dem neuen Stand.
- **Staged-Dateien (8):** `app/about/page.js`, `components/DynamicBlock.js`, `WorkingWhy.js`, `WorkingSteps.js`, `WorkingBenefits.js`, `WorkingTeamRef.js`, `WorkingPartners.js`, `WorkingCta.js`

---

### `/team` — Über kenalu

- **Navigationstitel:** Über kenalu
- **H1:** "Die Menschen hinter kenalu."
- **Rolle:** Team vorstellen, Mitwirken anbieten, interaktive Persönlichkeit zeigen
- **Rendering:** Hybrid — `app/team/page.js` (statisch + Storyblok für Team-Profile + Storyblok für PageBlocks)
- **Hauptkomponenten:** Hero (statisch), `TeamMemberTeaser`-Grid, `TeamIntro` (3 interaktive Modi), Mitwirken-Teaser, `KaiDialogue`
- **KAI:** KaiDialogue (contextKey `team`, `/api/kai`) + TeamIntro-Chat-Modus (⚠️ nutzt `/api/team-chat`, Legacy)
- **Anmerkung:** Die Seite lädt Blöcke aus Storyblok-Story `team-page`, Team-Profile aus `team/*`

---

### `/team/[slug]` — Team-Profil

- **Rendering:** Storyblok — `app/team/[slug]/page.js`
- **Hauptkomponenten:** `TestimonialItem`, `InsightsFilter`
- **KAI:** Keine eigene KAI-Instanz auf Profilseiten

---

### `/lab` — Lab

- **Navigationstitel:** Lab
- **H1:** "Aus offenen Fragen wird etwas, das man sehen, testen und entscheiden kann."
- **Rolle:** Experimente, Arbeitsproben, Prototypen von kenalu
- **Rendering:** Statisches JSX — `app/lab/page.js`
- **Hauptkomponenten:** Hero (statisch), Featured-Karte (kenalu-website), What-Cards, Stack, Prozess-Schritte, `KaiDialogue`, CTA
- **KAI:** KaiDialogue, contextKey `lab`, `/api/kai`

### `/lab/kenalu-website` — Lab-Artikel

- **Rendering:** Statisches JSX + Storyblok für SEO — `app/lab/kenalu-website/page.js`
- **KAI:** Keine eigene Instanz
- **Nicht in Sitemap** — ⚠️ SEO-Lücke

### `/lab/produktmoment` — Produktmoment-Prototyp

- **Rendering:** Statisches JSX — `app/lab/produktmoment/page.js`
- **Hauptkomponenten:** `ProductMomentBuilder` (4-Felder-Formular + Kai intern)
- **KAI:** Embedded in ProductMomentBuilder, contextKey `produktmoment`, `/api/kai`
- **Nicht in Sitemap** — ⚠️ SEO-Lücke

---

### `/insights` — Insights

- **Navigationstitel:** Insights
- **H1:** "Perspektiven auf digitale Produkte und AI."
- **Rendering:** Storyblok + statischer Frame — `app/insights/page.js`
- **Hauptkomponenten:** Hero (statisch), `InsightsFeatured`, `KaiDialogue`, `InsightsFilter`
- **KAI:** KaiDialogue, contextKey `insights`, `/api/kai`

### `/insights/[slug]` — Insight-Artikel

- **Rendering:** Storyblok — `app/insights/[slug]/page.js`
- **KAI:** Keine eigene Instanz auf Artikelseiten

---

### `/contact` — Kontakt

- **Navigationstitel:** Gespräch starten (CTA-Button)
- **H1:** Aus Storyblok (Story `contact`)
- **Rendering:** Storyblok → DynamicBlock — `app/contact/page.js`
- **Hauptkomponenten:** `ContactSection` (enthält `ContactBookingWidget` → Calendly)
- **KAI:** Via Storyblok-Block (contextKey `contact`, `/api/kai`) — Status zu verifizieren

---

### `/check` — AI Readiness Check

- **Navigationstitel:** Nicht in Navigation
- **H1:** "Wo steht ihr mit AI?"
- **Rolle:** 6-Fragen-Check zur AI-Reife, empfiehlt kenalu-Leistung
- **Rendering:** Statisch — `app/check/page.js` → `CheckTool`
- **KAI:** Keine (statische Logik)
- **⚠️ Konflikte:** In Sitemap (Priority 0.7), aber in robots.txt disallowed. Nicht in Navigation. E-Mail-Versand via `/api/check-result` nicht konfiguriert (Resend-TODO).

---

### `/datenschutz` und `/impressum`

- **Rendering:** Statisch
- **Nicht in Sitemap** (für Rechtseiten korrekt)
- **Im Footer verlinkt** ✅

---

## Rendering-Architektur

### Storyblok-gesteuerte Seiten (Content vollständig im CMS)
- Homepage `/` (Story `home`)
- About `/about` (Story `about`) — ⚠️ Script nötig
- Contact `/contact` (Story `contact`)

### Statische JSX-Seiten (Content im Code)
- `/services` (vollständig statisch)
- `/services/klarheit` `/services/rapid-build` `/services/produkt` `/services/urteil` (statisch, SEO via Storyblok)
- `/lab` (vollständig statisch)
- `/lab/kenalu-website` (statisch, SEO via Storyblok)
- `/lab/produktmoment` (statisch)
- `/check` (statisch)
- `/datenschutz` `/impressum` (statisch)

### Hybride Seiten (Mix aus Storyblok und statischem JSX)
- `/insights` (Frame statisch, Content dynamisch aus Storyblok)
- `/insights/[slug]` (Content aus Storyblok)
- `/team` (Frame statisch, Profile + PageBlocks aus Storyblok)
- `/team/[slug]` (vollständig aus Storyblok)

### Globale Komponenten (in `app/layout.js`)
- `Nav` (statisch in JS, nicht via Storyblok)
- `Footer` (Content via Storyblok `config/footer`)
- `SpacebarNav` — Status zu verifizieren (ob tatsächlich in layout.js eingebunden)

---

## Aktuelle KAI-Landschaft

| Route | Komponente | API-Route | contextKey | Status | Besonderheit |
|---|---|---|---|---|---|
| `/` | HomeChat (via AssistantCallout) | `/api/home-chat` | `homepage` | ⚠️ Live, Legacy | Eigenes Widget-Design, andere API als alle anderen |
| `/services` | KaiDialogue | `/api/kai` | `services-story` | ✅ Live | |
| `/services/klarheit` | KaiDialogue | `/api/kai` | `klarheit-story` | ✅ Live | |
| `/services/rapid-build` | KaiDialogue | `/api/kai` | `rapid-build-story` | ✅ Live | |
| `/services/produkt` | KaiDialogue | `/api/kai` | `produkt-story` | ✅ Live | |
| `/services/urteil` | KaiDialogue | `/api/kai` | `urteil-story` | ✅ Live | |
| `/about` | KaiDialogue | `/api/kai` | `about` | `Geplant / noch nicht umgesetzt` — nur in staged Version; in Produktion nicht eingebunden | |
| `/team` | KaiDialogue | `/api/kai` | `team` | ✅ Live | |
| `/team` (TeamIntro) | TeamIntro Chat-Modus | `/api/team-chat` | — | ⚠️ Live, Legacy | Separate Instanz im interaktiven Block |
| `/insights` | KaiDialogue | `/api/kai` | `insights` | ✅ Live | |
| `/lab` | KaiDialogue | `/api/kai` | `lab` | ✅ Live | |
| `/lab/produktmoment` | (embedded in ProductMomentBuilder) | `/api/kai` | `produktmoment` | ✅ Live | Nicht KaiDialogue-Komponente, direkt in Builder |

**Fazit KAI:** 12 Kai-Einstiegspunkte insgesamt. 10 nutzen `/api/kai`. 2 nutzen Legacy-Routen (Homepage, TeamIntro-Chat). Inhaltlich sind die Prompts unterschiedlich (contextKey steuert den Seiten-Kontext). Das Widget-Design auf der Homepage weicht vom Standard ab.

---

## Interaktive Komponenten

| Komponente | Zielgruppe | Zweck | Status | Öffentliche Platzierung |
|---|---|---|---|---|
| KaiDialogue | Website-Besucher (ihr/euch) | Konversation, Einordnung, Weiterleitung | ✅ Live (10 Instanzen) | Services, About, Team, Insights, Lab |
| HomeChat | Website-Besucher (ihr/euch) | Konversation auf Homepage | ✅ Live (1 Instanz, Legacy) | Homepage |
| TeamIntro | Neugierige, potenzielle Partner | Fragen stellen, Lüge finden, Vergleichen | ✅ Live | `/team` |
| ProductMomentBuilder | Teams mit Produktideen | Idee in Produktmoment übersetzen | ✅ Live | `/lab/produktmoment` |
| CheckTool | Unternehmen (ihr) | AI-Reife einschätzen, Service empfehlen | `Live` (versteckt) | `/check` (kein Nav-Eintrag) |
| FitTest | Einzelpersonen (du) | Kultur-/Arbeitsweisen-Fit einschätzen | `Vorhanden, nicht eingebunden` | Nirgends — nicht löschen |
| CollaborationIntro | Einzelpersonen (du) | Mitwirken-Teaser (Datei vorhanden) | `Vorhanden, nicht eingebunden` | Nirgends — kein Import in keiner Seite |

---

## Bekannte Architekturprobleme

**1. Semantische Vertauschung Slug/Navigationstitel:**
- `/about` heisst in der Nav "Arbeitsweise" — die Seite erklärt, wie kenalu arbeitet
- `/team` heisst in der Nav "Über kenalu" — zeigt aber primär die Personen
- Neues Besucher, die "Über kenalu" suchen, könnten Positionierungs-Content erwarten, nicht eine Team-Seite

**2. KAI-Inkonsistenz Homepage:**
- `HomeChat` nutzt `/api/home-chat` mit eigenen Prompts und eigenem Widget-Design
- Alle anderen Seiten nutzen `KaiDialogue` + `/api/kai`
- Ergibt zwei unterschiedliche Kai-Erlebnisse

**3. TeamIntro nutzt Legacy-API:**
- Der Chat-Modus in `TeamIntro` (live auf `/team`) nutzt `/api/team-chat`
- Diese Route ist inhaltlich nicht mit `/api/kai` abgestimmt

**4. `/check` widersprüchlich:**
- In `app/sitemap.js` enthalten (Priority 0.7)
- In `app/robots.js` disallowed (`disallow: ['/api/', '/check']`)
- Kein Eintrag in Navigation oder Footer
- E-Mail-Funktion nicht konfiguriert

**5. Service-Detail-Pages fehlen in Sitemap:**
- `/services/klarheit`, `/services/rapid-build`, `/services/produkt`, `/services/urteil` sind nicht in `app/sitemap.js`
- Potenziell relevante SEO-Lücke

**6. Lab-Unterseiten fehlen in Sitemap:**
- `/lab/kenalu-website` und `/lab/produktmoment` nicht in Sitemap

**7. `/about` Storyblok-Story leer:**
- Das Script `scripts/rebuild-about-arbeitsweise.js` wurde noch nicht ausgeführt
- 8 Code-Änderungen sind staged, aber noch nicht committed und noch nicht in Storyblok umgesetzt
- Die öffentliche Seite `/about` zeigt aktuell vermutlich leeren Content

---

## Offene IA-Entscheidungen

Die folgenden Fragen wurden absichtlich noch nicht entschieden:

1. **Slug-Migration `/about`:** Soll der Slug `/about` für die Arbeitsweise bleiben, oder soll er (mit Redirect) in `/arbeitsweise` oder ähnliches umbenannt werden?

2. **Slug-Migration `/team`:** Soll `/team` als "Über kenalu"-Seite in `/ueber-kenalu` umbenannt werden, oder bleibt der technische Slug?

3. **FitTest-Platzierung:** Wo soll `FitTest.js` künftig platziert werden? Optionen: `/team` (Mitwirken-Tab), Ende von `/about`, eigenständige Route `/passt` oder `/mitwirken`

4. **`/check` sichtbar machen:** Soll der AI Readiness Check in die Navigation, als Teaser auf `/services` oder via `CheckTeaser.js` sichtbarer werden? Oder soll er vorerst versteckt bleiben?

5. **Lab als Artikel-System:** Soll das Lab zu einem dynamischen Artikel-System mit Storyblok-CMS werden, oder bleibt es eine kuratierte statische Liste?

6. **Homepage KAI vereinheitlichen:** Soll `HomeChat` auf `/api/kai` migriert werden, um KAI auf allen Seiten einheitlich zu machen?

---

## Referenzen

- **Komponenten-Inventar:** `docs/Komponenten-Inventar.md`
- **IA-Änderungsprotokoll:** `docs/IA-Aenderungsprotokoll.md`
- **Technische Inventur (Rohbericht):** `docs/ia-inventur-2026-07.md`
- **Projektstand:** `PROJEKT.md`
