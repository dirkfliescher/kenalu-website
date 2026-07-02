# Informationsarchitektur-Inventur — kenalu.ch

> **Status: Historische Umsetzungsnotiz.**
> Diese Datei beschreibt einen früheren Arbeitsstand oder eine damalige Entscheidung.
> Sie ist nicht automatisch ein Abbild des aktuellen Live-, Code- oder Storyblok-Zustands.
> Aktueller Referenzpunkt: `docs/Informationsarchitektur.md`.
**Stand:** Juli 2026 · Erstellt durch: vollständige Codebase-Analyse  
**Zweck:** Basis für IA-Entscheidungen. Keine Änderungen vorgenommen.

---

## A. Aktuelle Informationsarchitektur

### Hauptnavigation (produktiv, aus Nav.js)

| Label | Route | Storyblok-Story | Rendering |
|---|---|---|---|
| _(Logo)_ | `/` | `home` | Storyblok → DynamicBlock |
| Leistungen | `/services` | — | Statisches JSX |
| Arbeitsweise | `/about` | `about` | Storyblok → DynamicBlock |
| Lab | `/lab` | — | Statisches JSX |
| Insights | `/insights` | `insights` | Storyblok + statischer Frame |
| Über kenalu | `/team` | `team-page` + `team/*` | Hybrid |
| [CTA] Gespräch starten | `/contact` | `contact` | Storyblok → DynamicBlock |

**Unterseiten:**

| Route | Funktion | Rendering |
|---|---|---|
| `/services/klarheit` | Service-Detail | Statisches JSX + Storyblok-SEO |
| `/services/rapid-build` | Service-Detail | Statisches JSX + Storyblok-SEO |
| `/services/produkt` | Service-Detail | Statisches JSX + Storyblok-SEO |
| `/services/urteil` | Service-Detail | Statisches JSX + Storyblok-SEO |
| `/team/[slug]` | Team-Profil | Storyblok |
| `/insights/[slug]` | Artikel | Storyblok |
| `/lab/kenalu-website` | Lab-Artikel | Statisch + Storyblok-SEO |
| `/lab/produktmoment` | Lab-Prototyp (Produktmoment) | Statisch |
| `/check` | AI Readiness Check | Statisch, ⚠️ nicht in Nav |
| `/datenschutz` | Datenschutz | Statisch, ⚠️ nicht in Sitemap |
| `/impressum` | Impressum | Statisch, ⚠️ nicht in Sitemap |

**Footer-Navigation (aus Footer.js, via Storyblok `config/footer`):**  
Leistungen → Arbeitsweise → Lab → Insights → Über kenalu → Kontakt → Impressum → Datenschutz

---

## B. Vollständige Komponentenübersicht

### Globale Struktur-Komponenten

| Komponente | Datei | Status | Anmerkung |
|---|---|---|---|
| Nav | `Nav.js` | ✅ Live | Alle Links hardcoded in JS |
| Footer | `Footer.js` | ✅ Live | Content via Storyblok `config/footer` |
| Reveal | `Reveal.js` | ✅ Live | Scroll-Animation, alle nicht-Hero-Blöcke |
| WaveBackground | `WaveBackground.js` | ❓ Unbekannt | Im Verzeichnis, aber keine Verwendung gefunden |
| SpacebarNav | `SpacebarNav.js` | ❓ Unbekannt | Keyboard-Navigation mit Space-Taste; keine Verwendung in layout.js gefunden |
| DynamicBlock | `DynamicBlock.js` | ✅ Live | Registry, 30+ Komponenten registriert |

---

### Hero- und Seitenauftakt-Komponenten

| Komponente | Typ | Status | Verwendet auf | Anmerkung |
|---|---|---|---|---|
| `Hero` | Storyblok-Block | ✅ Live | Homepage | Eigene CSS-Klasse `.hero`, kein Scroll-Indikator |
| `PageHero` | Storyblok-Block | ✅ Live | `/about` (und potentiell andere) | `.page-hero`, Scroll-Indikator |
| `.insights-hero` | Statisch in `insights/page.js` | ✅ Live | `/insights` | Kein eigener Block, nur CSS-Klasse |
| `.team-hero` | Statisch in `team/page.js` | ✅ Live | `/team` | Kein eigener Block |
| `.sov-hero` | Statisch in `services/page.js` | ✅ Live | `/services` | Kein eigener Block |
| `.sd-hero` | Statisch in Service-Detail-Pages | ✅ Live | `/services/*` | Kein eigener Block |
| `.lpv2-hero` | Statisch in `lab/page.js` | ✅ Live | `/lab` | Charcoal BG, kein Kai |
| `.pm-hero` | Statisch in `lab/produktmoment/page.js` | ✅ Live | `/lab/produktmoment` | |
| `.contact-page` | In ContactSection.js | ✅ Live | `/contact` | |
| `.check-intro` | In `CheckTool.js` | ✅ Live | `/check` | Eigener Full-Page-Einstieg |

**⚠️ Befund:** Nur `/about` und Homepage haben Storyblok-verwaltete Heroes. Alle anderen Seiten haben Heroes direkt im JS-Code — kein CMS-Zugriff auf deren Content möglich.

---

### Leistungs- und Service-Komponenten

| Komponente | Datei | Status | Kontext | Anmerkung |
|---|---|---|---|---|
| `ServicesSection` | `ServicesSection.js` | Registriert | Storyblok-Block | War in älterer Homepage/Services-Story |
| `ServicesDetailSection` | `ServicesDetailSection.js` | Registriert | Storyblok-Block | Alte Service-Detail-Architektur |
| `ServiceDetail` | `ServiceDetail.js` | Registriert | Sub-Komponente | Unklar ob noch in Storyblok-Body |
| `ServiceDetailPage` | `ServiceDetailPage.js` | Registriert (?) | Frühere statische Pages | Möglicherweise deprecated |
| `ServiceEntryGrid` | `ServiceEntryGrid.js` | ✅ Registriert | Storyblok | Raster-Einstieg zu Services |
| `ServicesCompare` | `ServicesCompare.js` | ✅ Registriert | Storyblok | Vergleichstabelle |
| `ServiceItem` | `ServiceItem.js` | Sub-Komponente | — | Sub-Komponente für ServicesSection |
| `FeatureList` | `FeatureList.js` | ✅ Registriert | Storyblok | Feature-Liste |
| `FeatureItem` | `FeatureItem.js` | Sub-Komponente | — | |
| `OutcomesSection` | `OutcomesSection.js` | ✅ Registriert | Storyblok | Ergebnisse/Outcomes |
| `ProcessSection` | `ProcessSection.js` | ✅ Registriert | Storyblok | Prozess-Schritte |
| `ProcessStep` | `ProcessStep.js` | Sub-Komponente | — | |
| `ProcessJourney` | `ProcessJourney.js` | ✅ Registriert | Storyblok | Interaktiver Prozess-Step-Wähler |
| `HelpSection` | `HelpSection.js` | ✅ Registriert | Storyblok | Hilf-mir-Bereich |
| `HelpItem` | `HelpItem.js` | Sub-Komponente | — | |
| `SituationTeaser` | `SituationTeaser.js` | ✅ Registriert | Storyblok | Situations-Liste mit Links |
| `WorkingPrinciples` | `WorkingPrinciples.js` | ✅ Registriert | Storyblok | Prinzipien-Grid |
| `ServicesFinder` | `ServicesFinder.js` | ⚠️ Unregistriert | War in Services | Rotierender Scenario-Finder; ersetzt durch Kai |
| `ServiceChat` | `ServiceChat.js` | ⚠️ Unregistriert | War in Service-Details | Alter Kai-Vorläufer pro Service |

---

### Kai und AI-Interaktionen

| Komponente/Route | Typ | Status | Seite | Verwendet |
|---|---|---|---|---|
| `KaiDialogue` | Storyblok-Block + direkt | ✅ Live | Services, Klarheit, Rapid Build, Produkt, Urteil, About, Team, Insights, Lab | Einheitlich, `/api/kai` |
| `HomeChat` | Client-Komponente | ✅ Live | Homepage | Via AssistantCallout, aber **⚠️ `/api/home-chat` (legacy!)** |
| `AssistantCallout` | Wrapper | ✅ Registriert | Homepage (via Storyblok) | Wrapper für HomeChat |
| `InsightsChat` | Client-Komponente | ⚠️ Unregistriert | War auf `/insights` | Ersetzt durch KaiDialogue |
| `/api/kai` | API-Route | ✅ Live | Alle Seiten | Unified, contextKey-basiert |
| `/api/home-chat` | API-Route | ⚠️ Legacy | Homepage (HomeChat) | Noch aktiv, aber sollte auf `/api/kai` migriert werden |
| `/api/service-chat` | API-Route | ⚠️ Legacy | Alte Service-Pages | ServiceChat.js referenziert sie |
| `/api/services-chat` | API-Route | ⚠️ Legacy | Alter ServicesFinder | Noch vorhanden |
| `/api/team-chat` | API-Route | ⚠️ Aktiv-legacy | `/team` → TeamIntro.js | **Wird noch live verwendet!** |
| `/api/insights-chat` | API-Route | ⚠️ Legacy | War auf Insights | Durch /api/kai ersetzt |
| `/api/qualify` | API-Route | ⚠️ Legacy | Unklar | OpenAI-Embeddings, keine aktive Verwendung gefunden |
| `/api/produktmoment` | API-Route | ✅ Live | `/lab/produktmoment` | Aktiv genutzt |
| `/api/check-result` | API-Route | ✅ Aktiv | `/check` | E-Mail-Versand noch nicht konfiguriert (Resend-TODO) |
| `/api/revalidate` | API-Route | ✅ Live | Storyblok-Webhook | ISR-Cache-Invalidierung |
| `/api/lab-builder` | API-Route | ⚠️ Ohne Frontend | War im LabBuilder | Kein öffentlicher Zugriff mehr |

---

### Lab und Experimente

| Komponente | Datei | Status | Anmerkung |
|---|---|---|---|
| `ProductMomentBuilder` | `ProductMomentBuilder.js` | ✅ Live | 4-Felder-Formular + Kai; auf `/lab/produktmoment` |
| `LabBuilder` | `LabBuilder.js` | ⚠️ Ohne Frontend | UI-Codegenerator (React/HTML-Komponenten aus Prompt); `/api/lab-builder` noch aktiv; kein öffentlicher Einstieg |

**Statische Lab-Artikel (JS-Pages):**
- `/lab/kenalu-website` — vollständiger Artikel, Storyblok nur für SEO
- `/lab/produktmoment` — Prototyp-Seite

---

### Tests, Quiz und Checks

| Komponente | Datei | Status | Zweck | Anmerkung |
|---|---|---|---|---|
| **FitTest** | `FitTest.js` | ⚠️ Vorhanden, nicht eingebunden | 6 Fragen, Arbeitsweise-Fit, Einzelperson (du-Form) | **→ Das ist die gesuchte "Passt du zu uns?"-Komponente** (s. Abschnitt D) |
| `CheckTool` | `CheckTool.js` | ✅ Live (unter `/check`) | AI Readiness Check, 6 Fragen, empfiehlt kenalu-Leistung | In Sitemap, aber in robots.txt disallowed |
| `CheckTeaser` | `CheckTeaser.js` | ⚠️ Nicht registriert | Teaser-Block für `/check` | Wurde nie öffentlich eingebaut |

**TeamIntro.js** (auf `/team`) enthält 3 interaktive Modi:
1. **Fragen stellen** (Chat mit Dirk/Stan über `/api/team-chat`)
2. **3 Aussagen, 1 Lüge** (statisch, kein API)
3. **Wer bist du eher?** (statisch, kein API)

---

### Team, Vertrauen und Persönlichkeit

| Komponente | Datei | Status | Anmerkung |
|---|---|---|---|
| `TeamIntro` | `TeamIntro.js` | ✅ Live | `/team` — 3 interaktive Modi, legacy API für Chat |
| `TeamMemberTeaser` | `TeamMemberTeaser.js` | ✅ Live | Card-Grid auf `/team` |
| `TeamMemberCard` | `TeamMemberCard.js` | Sub-Komponente | Unklar ob noch verwendet |
| `TestimonialItem` | `TestimonialItem.js` | ✅ Live | Team-Profil-Detail `/team/[slug]` |
| `AboutIntro` | `AboutIntro.js` | ⚠️ Registriert, fraglich aktiv | War in altem `/about` — ob noch in Storyblok-Body? |
| `AboutBeliefs` | `AboutBeliefs.js` | ⚠️ Registriert, fraglich aktiv | War in altem `/about` |
| `AboutName` | `AboutName.js` | ⚠️ Registriert, fraglich aktiv | War in altem `/about` — Wellen-SVG + Namensherkunft |
| `BeliefItem` | `BeliefItem.js` | Sub-Komponente | Für AboutBeliefs |
| `ValueItem` | `ValueItem.js` | Sub-Komponente | Unklar ob noch verwendet |
| `CollaborationIntro` | `CollaborationIntro.js` | ⚠️ Nicht registriert | War Mitwirken-Block in altem `/about`; "Passt du zu der Art..." |
| `ExperienceWall` | `ExperienceWall.js` | ✅ Registriert | Partner-/Experience-Logos |
| `ExperienceLogoItem` | `ExperienceLogoItem.js` | Sub-Komponente | |
| `EcosystemPartners` | `EcosystemPartners.js` | ✅ Registriert | Partner-Sektion (war in /about) |
| `PartnerCard` | `PartnerCard.js` | Sub-Komponente | |
| `ThinkingSection` | `ThinkingSection.js` | ✅ Registriert | |
| `ThinkingItem` | `ThinkingItem.js` | Sub-Komponente | |

---

### Arbeitsweise-Komponenten (neue `/about`-Architektur, noch nicht live)

| Komponente | Datei | Status | Anmerkung |
|---|---|---|---|
| `WorkingWhy` | `WorkingWhy.js` | 🔧 Bereit, Script nötig | Warum-Sektion |
| `WorkingSteps` | `WorkingSteps.js` | 🔧 Bereit, Script nötig | Vier-Schritte-Sektion |
| `WorkingBenefits` | `WorkingBenefits.js` | 🔧 Bereit, Script nötig | Kundennutzen |
| `WorkingTeamRef` | `WorkingTeamRef.js` | 🔧 Bereit, Script nötig | Team-Verweis |
| `WorkingPartners` | `WorkingPartners.js` | 🔧 Bereit, Script nötig | Partner-Verweis |
| `WorkingCta` | `WorkingCta.js` | 🔧 Bereit, Script nötig | Abschluss-CTA |

Alle 6 sind in DynamicBlock registriert. Storyblok-Schemas und Story-Content werden via `scripts/rebuild-about-arbeitsweise.js` gebaut (lokal ausführen).

---

### Zusammenarbeit-Komponenten (Archiv-Kandidaten)

| Komponente | Datei | Status | Anmerkung |
|---|---|---|---|
| `ZusammenarbeitPartners` | `ZusammenarbeitPartners.js` | ⚠️ Registriert, vermutlich inaktiv | War in alter About-/Zusammenarbeit-Architektur |
| `ZusammenarbeitTeam` | `ZusammenarbeitTeam.js` | ⚠️ Registriert, vermutlich inaktiv | War in alter About-/Zusammenarbeit-Architektur |
| `ZusammenarbeitOpen` | `ZusammenarbeitOpen.js` | ⚠️ Registriert, vermutlich inaktiv | CTA für Mitwirken in alter Architektur |

---

### Kontakt, Conversion, Buchung

| Komponente | Datei | Status | Anmerkung |
|---|---|---|---|
| `ContactSection` | `ContactSection.js` | ✅ Live | Hauptkontakt-Block mit Calendly-Widget |
| `ContactBookingWidget` | `ContactBookingWidget.js` | ✅ Live | Calendly-Integration |
| `ContactIntro` | `ContactIntro.js` | ⚠️ Unklar | Registriert? Wird es im Storyblok-Body verwendet? |
| `CtaSection` | `CtaSection.js` | ✅ Registriert | Generischer CTA-Block |
| `Provocation` | `Provocation.js` | ✅ Registriert | Provokations-Statement |
| `AssistantCallout` | `AssistantCallout.js` | ✅ Registriert | Wraps HomeChat |

---

### Insights und Content

| Komponente | Datei | Status | Anmerkung |
|---|---|---|---|
| `InsightsFeatured` | `InsightsFeatured.js` | ✅ Live | Featured-Artikel auf Insights-Übersicht |
| `InsightsFilter` | `InsightsFilter.js` | ✅ Live | Filter + Grid für Artikel |
| `InsightCard` | `InsightCard.js` | Sub-Komponente | |
| `InsightAuthor` | `InsightAuthor.js` | Sub-Komponente | |
| `InsightsChat` | `InsightsChat.js` | ⚠️ Legacy | War alte Insights-Kai-Variante; ersetzt durch KaiDialogue |
| `TextBlock` | `TextBlock.js` | ✅ Registriert | Generischer Text-Block |

---

### Technische Hilfskomponenten / Utilities

| Datei | Status | Anmerkung |
|---|---|---|
| `app/lib/storyblok.js` | ✅ Live | Storyblok-Client-Instanz |
| `app/lib/richtext.js` | ✅ Live | Rich-Text-Renderer für Storyblok |
| `app/robots.js` | ✅ Live | `/check` wird disallowed gesetzt |
| `app/sitemap.js` | ✅ Live | `/check` ist drin — **⚠️ Widerspruch zu robots.txt** |
| `app/not-found.js` | ✅ Live | 404-Seite |
| `app/error.js` | ✅ Live | Globale Fehlerseite |
| `app/global-error.js` | ✅ Live | Root-Level-Fehler |
| `app/loading.js` | ✅ Live | Loading-State |
| `app/icon.svg` | ✅ Live | Favicon |
| `app/globals.css` | ✅ Live | 9060 Zeilen, ALLE Styles |
| `app/globals 2.css` | ⚠️ Duplikat | 1318 Zeilen — altes Backup, sollte gelöscht werden |

---

## C. Doppelte, unklare oder fehlgeleitete Inhalte

### 1. About vs. Arbeitsweise vs. Über kenalu
- URL `/about` — Nav-Label **Arbeitsweise** — H1 auf Seite: **"Wie wir arbeiten, ist Teil des Ergebnisses."**
- URL `/team` — Nav-Label **Über kenalu** — H1 auf Seite: **"Die Menschen hinter kenalu."**
- **Problem:** "Über kenalu" klingt wie eine typische About-Seite, ist aber die Team-Seite. Neues Besucher liest "Über kenalu" und erwartet Unternehmens-Geschichte, Werte, Positionierung — und findet die Personen.
- Die Inhalte, die man unter "Über kenalu" erwarten würde (Warum kenalu, Werte, Arbeitsweise), liegen auf `/about`.
- Das ist semantisch vertauscht.

### 2. KAI-Doppelungen (Homepage)
- Homepage: **HomeChat** via AssistantCallout → `/api/home-chat` (legacy)
- Alle anderen Seiten: **KaiDialogue** → `/api/kai` (unified)
- Technisch: Homepage nutzt einen anderen API-Pfad mit anderen Prompts. Das macht Kai auf der Homepage zu einer anderen Instanz als überall sonst.

### 3. KAI — TeamIntro-Chat als Legacy
- TeamIntro.js (auf `/team`) hat Modus "Fragen stellen" → `/api/team-chat` (legacy route)
- Diese API-Route ist noch aktiv, aber inhaltlich nicht mit dem einheitlichen Kai-System abgestimmt
- Faktisch gibt es auf `/team` zwei Kai-Instanzen nebeneinander: TeamIntro-Chat (legacy) + KaiDialogue (unified)

### 4. FitTest vs. CollaborationIntro vs. CheckTool
Drei verschiedene interaktive Elemente mit ähnlichem Themenbezug:
- **FitTest.js** — 6 Fragen, für einzelne Personen (du-Form), Arbeitsweise-Fit → "Passt du zu uns?"
- **CollaborationIntro.js** — statischer Text-Block, Mitwirken → "Passt du zu der Art, wie wir arbeiten?"
- **CheckTool.js** — 6 Fragen, für Teams (ihr-Form), AI Readiness → empfiehlt Service
- Keiner der drei ist klar positioniert oder in der Navigation sichtbar.

### 5. `/check` — widersprüchliche Sichtbarkeit
- In Sitemap: ja (Priority 0.7)
- In robots.txt: disallowed
- In Navigation: nein
- `CheckTeaser.js` existiert, ist aber nirgends eingebaut
- Das ist ein verwirrendes Signal für Suchmaschinen und User.

### 6. Service-Detail-Pages nicht in Sitemap
- `/services/klarheit`, `/services/rapid-build`, `/services/produkt`, `/services/urteil` fehlen in der Sitemap
- Diese Seiten sind aber inhaltlich die wichtigsten SEO-Seiten.

### 7. Storyblok-Seite `services`
- Es gibt eine Storyblok-Story `services` (ID: 186361777859852)
- Die Services-Seite `app/services/page.js` ist aber vollständig statisch in JSX — die Storyblok-Story wird nicht genutzt
- Unklar ob die Story überhaupt noch Content hat

### 8. Lab-Seiten nicht in Sitemap
- `/lab/kenalu-website` und `/lab/produktmoment` fehlen in der Sitemap

---

## D. Gefundene Komponenten und verschwundene Inhalte

### "Passt du zu uns?" — vollständig gefunden ✅

**Komponente:** `FitTest.js`  
**Pfad:** `/components/blocks/FitTest.js`  
**Technischer Name:** `FitTest`  
**Aktueller Status:** Vorhanden im Code, nirgends eingebunden, nicht live

**Inhalt:**
- Label: "Passt du zu der Art, wie wir arbeiten?"
- Headline: "6 Fragen. Eine ehrliche Einschätzung."
- 6 Fragen zu Arbeitsweise, Entscheidungsstil, Umgang mit Problemen, Meetings, Produktverständnis, Arbeitsform
- Ansprache: **du-Form** (einzelne Person, nicht ihr/euch — bewusste Entscheidung, dokumentiert in CollaborationIntro.js-Kommentar)
- Scoring: Punkte pro Antwort → 3 Ergebnisse:
  - 15+ Punkte: "Du passt." + CTA → `/contact`
  - 8–14 Punkte: "Wir müssten reden." (kein CTA)
  - 0–7 Punkte: "Nicht jetzt." (kein CTA)
- **Keine API-Abhängigkeit** — komplett eigenständig
- **Keine Storyblok-Felder** — alles hardcoded in JS

**Geschichte:**
- War früher auf `/about` eingebunden
- Wurde via Task #48 von `/team` entfernt ("FitTest entfernen")
- Liegt seit mindestens Task #46 im Code ("FitTest.js: Titel und Einleitungstext anpassen")
- CollaborationIntro.js war als textueller Nachfolger gedacht, ist aber auch nicht aktiv

**Zustand:** Funktionsfähig, deploybar, CSS-Klassen (`fit-*`) vermutlich in `globals.css` vorhanden

**Unterschied zu CheckTool:**
| | FitTest | CheckTool |
|---|---|---|
| Zielgruppe | Einzelperson (Mitarbeitende, Freelancer) | Team / Unternehmen |
| Ansprache | du | ihr |
| Thema | Kulturfit / Arbeitsweise | AI-Reife / Leistungsauswahl |
| Ergebnis | "Passt / Reden / Nicht jetzt" | Empfehlung kenalu-Service |
| CTA | /contact (nur wenn "Passt") | /services/[service] |
| API | keine | /api/check-result (E-Mail, nicht aktiviert) |

---

### Weitere interaktive Experimente

**TeamIntro.js** (live auf `/team`)  
3 Modi:
1. Chat: Fragen an Dirk/Stan → `/api/team-chat`
2. Spiel: "3 Aussagen, 1 Lüge" — statisch, keine API
3. Quiz: "Wer bist du eher?" — statisch, keine API

**LabBuilder.js** (vorhanden, nicht erreichbar)  
- Generiert React/HTML-UI-Komponenten via ChatGPT aus Nutzereingaben
- `/api/lab-builder` ist noch aktiv
- Kein öffentlicher Einstieg mehr vorhanden
- War früher vermutlich im Lab eingebettet

**ServicesFinder.js** (vorhanden, nicht registriert)  
- Zeigt rotierende Situationsszenarien
- War als Einstieg zur Service-Auswahl gedacht
- Ersetzt durch Kai

---

### Alte Storyblok-Architekturen die noch im Code sind

**Alte About-Komponenten (DynamicBlock registriert, fraglich ob noch aktiv in Stories):**
- `AboutIntro`, `AboutBeliefs`, `AboutName` — waren Bausteine des alten `/about`
- Mit der neuen `working_*`-Architektur (noch nicht live) werden sie nicht mehr gebraucht

**Alte Zusammenarbeit-Komponenten:**
- `ZusammenarbeitPartners`, `ZusammenarbeitTeam`, `ZusammenarbeitOpen`
- Waren Teil einer früheren Mitwirken/Team-Sektion

---

## E. Archivierungsfähige Inhalte

| Element | Aktueller Ort | Öffentliche Rolle | Mögliche spätere Nutzung | Empfehlung |
|---|---|---|---|---|
| **FitTest.js** | `components/blocks/FitTest.js` | Keine — nicht eingebunden | Mitwirken-Check auf `/team` oder `/about`; eigenständige Seite `/passt` | Als Draft erhalten, im Code mit Kommentar `// archived — candidate for /team or /mitwirken` markieren |
| **CollaborationIntro.js** | `components/blocks/` | Keine — nicht eingebunden | Statischer Einstiegstext für Mitwirken-Bereich | Als Draft erhalten |
| **CheckTeaser.js** | `components/blocks/` | Keine — nicht registriert | Teaser für `/check` auf Services-Seite oder Homepage | Als Draft erhalten |
| **LabBuilder.js** | `components/blocks/` | Nicht erreichbar | Lab-Experiment "UI-Generator" — könnte als Lab-Artikel + Prototyp wiederbelebt werden | Im Code behalten, als Lab-Experiment dokumentieren |
| **ServiceChat.js** | `components/blocks/` | Keine — nicht registriert | War Kai pro Service; ersetzt durch KaiDialogue | Deprecated markieren |
| **InsightsChat.js** | `components/blocks/` | Keine — nicht registriert | War Kai für Insights; ersetzt durch KaiDialogue | Deprecated markieren |
| **ServicesFinder.js** | `components/blocks/` | Keine — nicht registriert | Rotierender Scenario-Finder | Deprecated markieren oder als Experiment erhalten |
| **AboutIntro/AboutBeliefs/AboutName** | `components/blocks/` | Fraglich ob noch in Storyblok-Body | Inhalte über Positionierung und Name — könnten auf anderer Seite Platz finden | Storyblok-Story prüfen; wenn leer → als Draft behalten |
| **ZusammenarbeitPartners/Team/Open** | `components/blocks/` | Fraglich ob noch in Storyblok-Body | Mitwirken-Architektur | Storyblok-Story prüfen; wenn leer → Deprecated markieren |
| **HomeChat.js** (API-legacy) | `components/blocks/` | Via AssistantCallout auf Homepage | Sollte auf `/api/kai` migriert werden | Migration planen |
| `/api/home-chat` | `app/api/home-chat/` | Aktiv via HomeChat | Nach Migration: deprecated | Nach Migration entfernen |
| `/api/service-chat` | `app/api/service-chat/` | Keine aktive Verwendung | — | Deprecated markieren |
| `/api/services-chat` | `app/api/services-chat/` | Keine aktive Verwendung | — | Deprecated markieren |
| `/api/qualify` | `app/api/qualify/` | Keine aktive Verwendung gefunden | Embedding-basierter Semantic Search — Potenzial | Als Experiment erhalten |
| `/api/insights-chat` | `app/api/insights-chat/` | Keine aktive Verwendung | — | Deprecated markieren |
| `/api/team-chat` | `app/api/team-chat/` | Aktiv via TeamIntro.js | Nach TeamIntro-Migration: deprecated | Vorerst erhalten |
| **SpacebarNav.js** | `components/` | Unbekannt ob eingebunden | Keyboard-Navigation | Prüfen ob in layout.js verwendet |
| **WaveBackground.js** | `components/` | Unbekannt | Hintergrundanimation | Prüfen ob noch verwendet |
| `app/globals 2.css` | `app/` | Kein Effekt (nicht importiert) | Altes CSS-Backup | Löschen |

---

## F. Empfohlene Ziel-Informationsarchitektur (Vorschlag, noch nichts umsetzen)

```
/                     Homepage          → Positionierung, Einstieg, Kai (unified)
/services             Leistungen        → Vier Einstiege (statisch bleibt OK)
  /services/klarheit
  /services/rapid-build
  /services/produkt
  /services/urteil
/how-we-work          Arbeitsweise      → Warum / Wie / Was (neu: /about umbenennen?)
/team                 Über kenalu       → Team + Persönlichkeit + Interaktiv
  /team/[slug]        Profil
/lab                  Lab               → Experimente, Arbeitsproben, Prototypen
  /lab/kenalu-website
  /lab/produktmoment
  /lab/[künftige Einträge]
/insights             Insights          → Artikel, Perspektiven
  /insights/[slug]
/check                AI Readiness      → Eigenständig, sichtbar machen oder entfernen
/contact              Kontakt           → Gespräch starten
/datenschutz
/impressum
```

**Offene IA-Fragen für Entscheidung:**
1. Bleibt `/about` der Slug für Arbeitsweise oder wird er umbenannt?
2. Wo landet der FitTest? `/team` → "Mitwirken"-Tab, `/about` → Ende der Seite, oder eigene Route `/passt`?
3. Wird `/check` öffentlich sichtbar gemacht (Navigation, Teaser) oder bleibt er hidden?
4. Wird Lab zu einem richtigen Artikel-System oder bleibt es eine kuratierte manuelle Liste?

---

## G. Empfohlene Umsetzungsreihenfolge

### Ticket 1: /about Storyblok-Script ausführen + QA
- `node scripts/rebuild-about-arbeitsweise.js` lokal ausführen
- Git commit + push (Arbeitsweise-Komponenten sind bereits staged)
- Visueller Check auf Desktop + Mobile
- Abnahme: Alle 7 Sektionen sichtbar, kein leerer Render

### Ticket 2: Homepage Kai auf /api/kai migrieren
- `HomeChat.js` → API-Call von `/api/home-chat` auf `/api/kai` (contextKey: "homepage") umschreiben
- Widget-Rendering prüfen (HomeChat hat eigenes Widget-Design)
- `/api/home-chat` als deprecated markieren (Datei erhalten, Kommentar setzen)
- Abnahme: Kai auf Homepage antwortet, Widgets erscheinen

### Ticket 3: Sitemap + robots.txt bereinigen
- Service-Detail-Pages zur Sitemap hinzufügen
- Lab-Unterseiten zur Sitemap hinzufügen
- Entscheidung `/check`: sichtbar (→ aus robots.txt entfernen) oder wirklich versteckt (→ aus Sitemap entfernen)
- Abnahme: `kenalu.ch/sitemap.xml` korrekt

### Ticket 4: Legacy-Komponenten dokumentieren
- `globals 2.css` löschen
- `ServiceChat.js`, `InsightsChat.js`, `ServicesFinder.js` mit `// @deprecated`-Kommentar versehen
- `FitTest.js` mit Archivierungs-Kommentar versehen
- `SpacebarNav.js` + `WaveBackground.js` klären: in layout.js importiert?
- Abnahme: Keine unbemerkten Löschungen, alle Archivierungen dokumentiert

### Ticket 5: IA-Entscheidung + Slug-Strategie
- Offene Fragen aus Abschnitt F klären
- Entscheidung: Slug `/about` behalten oder umbenennen (Redirects nötig!)
- FitTest-Platzierung entscheiden
- Danach: einen klaren Umsetzungsplan ableiten

---

## H. Technische Risiken und offene Punkte

### Kritisch

| Risiko | Beschreibung |
|---|---|
| **Homepage Kai = andere Instanz** | HomeChat nutzt `/api/home-chat` mit anderen Prompts als `/api/kai`. Ein Nutzer erlebt auf der Homepage einen anderen Kai als überall sonst. |
| **TeamIntro nutzt legacy /api/team-chat** | Der Chat-Modus in TeamIntro ist live, aber technisch entkoppelt vom unified Kai. Wenn `/api/team-chat` Fehler hat, bemerkt man es nicht sofort. |
| **/check in Sitemap + robots.txt widersprüchlich** | Google erhält widersprüchliche Signale. |
| **Service-Detail-Pages fehlen in Sitemap** | Die SEO-wichtigsten Seiten fehlen — potenzielle Indexierungslücke. |

### Mittel

| Risiko | Beschreibung |
|---|---|
| **Storyblok-Story `about` noch leer** | `scripts/rebuild-about-arbeitsweise.js` wurde noch nicht ausgeführt. `/about` zeigt aktuell leere Seite (oder fallback). |
| **Storyblok-Story `services` hat unklaren Status** | Services-Page ist statisch — ob die Storyblok-Story veraltet ist, wurde nicht geprüft. |
| **`AboutIntro/Beliefs/Name` und `Zusammenarbeit*`** | Diese sind in DynamicBlock registriert. Wenn die Storyblok-Body-Arrays dieser alten Stories noch diese Blocks enthalten, werden sie weiterhin gerendert. Prüfen. |
| **`/api/check-result` ohne E-Mail** | CheckTool sammelt E-Mails (opt-in), aber kein Versand konfiguriert. Resend-Integration fehlt. |
| **`globals 2.css`** | Datei existiert neben `globals.css`. Falls irgendwo importiert, überschreibt sie Styles. |

### Klein

| Risiko | Beschreibung |
|---|---|
| **Lab-Artikel nicht in Sitemap** | `/lab/kenalu-website` + `/lab/produktmoment` fehlen |
| **`/api/qualify` unklar** | OpenAI-Embeddings-Route ohne nachweisbare aktive Nutzung |
| **SpacebarNav/WaveBackground unklar** | Ob diese Komponenten noch in layout.js importiert werden, wurde nicht geprüft |
| **TeamMemberCard.js vs. TeamMemberTeaser.js** | Zwei sehr ähnlich klingende Komponenten — welche ist die aktive? |

---

*Inventur-Regel (ab sofort gültig): Keine Inhalte, Komponenten, Stories oder API-Routen endgültig löschen, ohne vorherige Dokumentation und explizite Freigabe. Depublizieren und als deprecated markieren statt löschen.*
